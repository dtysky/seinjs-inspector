/**
 * @File   : AxisActor.ts
 * @Author : 瞬光 (shunguang.dty@alibaba-inc.com)
 * @Date   : 10/15/2019, 4:29:10 PM
 * 
 */
import * as Sein from 'seinjs';

import InspectorActor from '../Actor/InspectorActor';

export interface IAxisActorOptions extends Sein.ISceneComponentState {

}

export function isAxisActor(value: Sein.SObject): value is AxisActor {
  return (value as AxisActor).isAxisActor;
}

@Sein.SClass({className: 'AxisActor'})
export default class AxisActor extends Sein.SceneActor<IAxisActorOptions, Sein.SceneComponent> {
  public isAxisActor = true;

  public onInit(initOptions: IAxisActorOptions) {

  }

  public onAdd(initOptions: IAxisActorOptions) {
    this.addComponent('Y', Sein.BSPBoxComponent, {
      width: 0.02,
      height: 20,
      depth: 0.02,
      material: new Sein.BasicMaterial({
        diffuse: new Sein.Color(0, 1, 0),
        lightType: 'NONE',
        shininess: 0
      })
    }).translate(new Sein.Vector3(0, 1, 0), 10);

    this.addComponent('X', Sein.BSPBoxComponent, {
      width: 20,
      height: 0.02,
      depth: 0.02,
      material: new Sein.BasicMaterial({
        diffuse: new Sein.Color(1, 0, 0),
        lightType: 'NONE',
        shininess: 0
      })
    }).translate(new Sein.Vector3(1, 0, 0), 10);

    this.addComponent('Z', Sein.BSPBoxComponent, {
      width: 0.02,
      height: 0.02,
      depth: 20,
      material: new Sein.BasicMaterial({
        diffuse: new Sein.Color(0, 0, 1),
        lightType: 'NONE',
        shininess: 0
      })
    }).translate(new Sein.Vector3(0, 0, 1), 10);
  }
}
