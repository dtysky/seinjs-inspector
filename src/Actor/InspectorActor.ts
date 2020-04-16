/**
 * @File   : InspectorActor.ts
 * @Author : dtysky (dtysky@outlook.com)
 * @Date   : 2019/7/28 下午2:08:42
 *
 */
import * as Sein from "seinjs";

import {ISystemInfo, IControlEvent, EControlType} from '../types';
import render from '../UI/index';
import AxisActor from '../Components/AxisActor';
import {initCore} from '../Controllers';

export interface IInspectorActorOptions {
  /**
   * 指定渲染容器，不指定渲染到body下
   *
   * @defalut document.body
   */
  dom?: HTMLElement;
  /**
   * 更新率，一秒更新几次。
   *
   * @default 10
   */
  updateRate?: number;
}

export function isInspectorActor(value: Sein.SObject): value is InspectorActor {
  return (value as InspectorActor).isInspectorActor;
}

@Sein.SClass({ className: "InspectorActor" })
export default class InspectorActor extends Sein.InfoActor<
  IInspectorActorOptions
> {
  public isInspectorActor = true;
  public updatePriority = Sein.InfoActor.UPDATE_PRIORITY.Others;

  protected _hiddenObjects: {[uuid: string]: Sein.SObject} = {};
  protected _selfHidden: Sein.SObject[] = [];
  protected _info: ISystemInfo = {
    system: null,
    engine: null,
    game: null,
    cameras: null,
    world: null,
    level: null,
    render: null,
    physic: null,
    resource: null,
    events: null
  };
  protected _actor: Sein.SceneActor = null;
  protected _updateRate: number = 10;
  protected _delta: number = 0;
  protected _levelAlive = false;
  protected _physicAlive = false;
  protected _enableSync = false;
  protected _container: HTMLElement = document.body;
  protected _dom: HTMLDivElement;

  /**
   * 事件管理器。
   */
  get event() {
    return this._root.event as Sein.EventManager<{
      Update: { info: ISystemInfo };
      Control: IControlEvent;
    }>;
  }

  public addHidden(object: Sein.SObject) {
    this._hiddenObjects[object.uuid] = object;
  }

  public removeHidden(object: Sein.SObject) {
    delete this._hiddenObjects[object.uuid];
  }

  public isHidden(object: Sein.SObject) {
    return !!this._hiddenObjects[object.uuid];
  }

  private addSelfHidden(object: Sein.SObject) {
    this._hiddenObjects[object.uuid] = object;
    this._selfHidden.push(object);
  }

  public onInit(initOptions: IInspectorActorOptions) {
    this.event.register("Update");
    this.event.add("Control", this.handleControl);

    initCore();

    if (!initOptions) {
      return;
    }

    const {updateRate, dom} = initOptions;

    dom && (this._container = initOptions.dom);
    updateRate && (this._updateRate = initOptions.updateRate);
  }

  public onAdd(initOptions: IInspectorActorOptions) {
    const game = this.getGame();

    game.event.add("LevelDidInit", this.generateActor);
    game.event.add("WorldWillDestroy", this.clearActor);

    if (game.level) {
      this.generateActor();
    }

    this.sync(0, true);

    this.renderUI();
  }

  private generateActor = () => {
    if (this._actor) {
      return;
    }

    const actor = (this._actor = this.getWorld().addActor(
      "forMonitor",
      Sein.SceneActor
    ));

    actor.persistent = true;
    actor.onUpdate = () => {
      this._levelAlive = true;
    };
    this.addSelfHidden(actor);

    if (this.getPhysicWorld()) {
      const rigidBody = actor.addComponent(
        "rigidBody",
        Sein.RigidBodyComponent,
        { mass: 0, sleeping: true }
      );

      rigidBody.onUpdate = () => {
        this._physicAlive = true;
      };
    }

    // const axis = this.getWorld().addActor('Axis', AxisActor);
    // this.addSelfHidden(axis);
  }

  private clearActor = () => {
    this._actor = null;
    this._selfHidden.forEach(obj => this.removeHidden(obj));
    this._selfHidden = [];
  }

  private handleControl = (event: IControlEvent) => {
    if (event.type === EControlType.StartSync) {
      this._enableSync = true;
    } else if (event.type === EControlType.EndSync) {
      this._enableSync = false;
    }
  }

  public onError(error: Sein.BaseException, details: any) {
    return true;
  }

  public onUpdate(delta: number) {
    if (!this._enableSync) {
      return;
    }

    this._delta += delta;

    if (this._delta >= (1000 / this._updateRate)) {
      this._delta = 0;
      this.sync(delta);
    }
  }

  protected sync(delta: number, first: boolean = false) {
    const game = this.getGame();
    const engine = game.parent as any;
    const world = this.getWorld();
    const level = this.getLevel();
    const physicWorld = this.getPhysicWorld();

    let bufferBytes = 0;

    Object.keys((Sein.Buffer.cache as any)._cache).forEach(key => {
      bufferBytes += (Sein.Buffer.cache as any)._cache[key].data.byteLength || 0;
    });

    const {gl} = game.renderer as any;
    const mBytes = 1024 * 1024;

    this._info = {
      system: {
        fps: 1000 / delta,
        memory: (performance as any).memory ? (performance as any).memory.totalJSHeapSize : null,
        cpu: null
      },
      engine: {
        tickerRunning: !game.ticker.paused,
        gamesCount: engine._games.length,
        runningGamesCount: engine._runningGames.length
      },
      game: {
        name: game.name.value,
        paused: engine._runningGames.indexOf(game) < 0,
        structure: null,
        actorsCount: game.actors.length,
        actors: game.actors
      },
      cameras: world.mainCamera
        ? [
            {
              refer: world.mainCamera,
              name: world.mainCamera.name.value,
              ownerName: world.mainCamera.getOwner().name.value,
              isMain: true,
              alive: world.mainCamera.rendererAlive
            }
          ]
        : [],
      world: {
        name: world.name.value,
        cameraAlive: world.mainCamera ? world.mainCamera.rendererAlive : false
      },
      level: {
        name: level.name.value,
        alive: this._levelAlive,
        actorsCount: level.actors.length,
        actors: level.actors
      },
      render: {
        bufferBytes: bufferBytes,
        totalTriangles: this._info && this._info.render && (this._info.render.totalTriangles || null),
        totalVertices: this._info && this._info.render && (this._info.render.totalVertices || null),
        drawCallCount: game.renderer.renderInfo.drawCount,
        drawFaceCount: game.renderer.renderInfo.faceCount,
        totalGpuMemory: (gl && gl.getTotalGpuMemoryUsage) ? gl.getTotalGpuMemoryUsage() / mBytes : undefined,
        contextGpuMemory: (gl && gl.getContextGpuMemoryUsage) ? gl.getContextGpuMemoryUsage() / mBytes : undefined,
      },
      resource: this.getResource(),
      events: {
        global: Object.keys((this._game.event as any)._observables).length,
        hid: Object.keys((this._game.hid as any)._observables).length
      },
      physic: {
        active: !!physicWorld,
        alive: this._physicAlive
      }
    };
    this.event.trigger('Update', this._info);
  }

  public syncVerticesInfo() {
    let totalVertices = 0;
    let totalTriangles = 0;

    this.getWorld().actors.forEach(actor => {
      actor.findComponentsByFilter<Sein.PrimitiveComponent>(c => Sein.isPrimitiveComponent(c)).forEach(component => {
        component.getMaterials().forEach(mat => {
          const geometry = component.getGeometry(mat.name);
          if (geometry.vertices) {
            totalVertices += geometry.vertices.count;

            if (geometry.indices) {
              totalTriangles += geometry.indices.count / 3;
            } else {
              totalTriangles += totalVertices / 3;
            }
          }
        });
      });
    });

    this._info.render.totalVertices = totalVertices;
    this._info.render.totalTriangles = totalTriangles;
  }

  protected getResource() {
    const info: ISystemInfo['resource'] = {};

    const store = (this._game.resource as any)._store;

    Object.keys(store).forEach(name => {
      const item: Sein.IResourceEntity = store[name];
      const type = item.type;
      info[type] = info[type] || 0;
      info[type] += 1;
    });

    return info;
  }

  public onDestroy() {
    if (this._actor) {
      this._actor.removeFromParent();
      this._actor = null;
    }

    if (this._dom) {
      this._container.removeChild(this._dom);
      this._dom = null;
    }
  }

  protected renderUI() {
    if (!this._dom) {
      this._dom = document.createElement('div');
      this._container.appendChild(this._dom);  
    }

    render(this._dom, this);
  }
}
