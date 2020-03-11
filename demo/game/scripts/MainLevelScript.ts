/**
 * @File   : MainLevelScript.tsx
 * @Author : dtysky (dtysky@outlook.com)
 * @Date   : Sun Jul 28 2019
 * @Description: MainLevelScript.
 */
import * as Sein from 'seinjs';
import 'seinjs-camera-controls/lib/CameraOrbitControlComponent';
import '../../../src';
import FloatingComponent from '../components/FloatingComponent';
import MyAnimation from './MyAnimation';
import * as CANNON from 'cannon-dtysky';

export default class MainLevelScript extends Sein.LevelScriptActor {
  public onPreload() {
    const game = this.getGame();

    game.resource.load({
      type: 'GlTF',
      name: 'miku.gltf',
      url: '/assets/gltfs/miku.gltf'
    });
    game.resource.load({
      type: 'Image',
      name: 'paradise.jpg',
      url: '/assets/paradise.jpg'
    });
    game.resource.load({
      type: 'Texture',
      name: 'paradise.tex',
      url: '/assets/paradise.jpg'
    });
    game.resource.load({
      type: 'Atlas',
      name: '22.atlas',
      url: '/assets/sprites/22.json'
    });
    game.resource.load({
      type: 'CubeTexture',
      name: 'snow.tex',
      url: '/assets/skybox/snow',
      images: {
        left: 'left.jpg',
        right: 'right.jpg',
        top: 'top.jpg',
        bottom: 'bottom.jpg',
        front: 'front.jpg',
        back: 'back.jpg'
      }
    });
  }

  public onLoading(state: Sein.IResourceState) {
    // console.log(state.current, state.progress);
  }

  public onCreate() {
    const game = this.getGame();
    const world = this.getWorld();

    const inspector = game.addActor('inspector', Sein.Inspector.Actor, {
      dom: document.body,
      updateRate: 10
    });

    const camera = world.addActor('camera', Sein.PerspectiveCameraActor, {
      far: 1000,
      near: 2,
      fov: 60,
      aspect: game.screenWidth / game.screenHeight,
      position: new Sein.Vector3(0, 12, 25)
    });
    camera.lookAt(new Sein.Vector3(0, 12, 0));

    // const aspect = game.screenAspect;
    // const camera = world.addActor('camera', Sein.OrthographicCameraActor, {
    //   left: -22 / aspect,
    //   right: 22 / aspect,
    //   top: 22 / aspect,
    //   bottom: -22 / aspect,
    //   far: 100,
    //   near: 0.01,
    //   position: new Sein.Vector3(0, 12, -25)
    // });

    // var target = new Sein.Vector3(0, 12, 0);
    // camera.transform.lookAt(target);

    camera.addComponent(
      'control',
      Sein.CameraControls.CameraOrbitControlComponent,
      {
        enableDamping: true,
        dampingFactor: 0.2,
        zoomMax: 100,
        zoomMin: 0.1,
        target: new Sein.Vector3(0, 12, 0)
      }
    );

    const box1 = world.addActor('box1', Sein.BSPBoxActor, {
      width: 2,
      height: 2,
      depth: 2,
      material: new Sein.PBRMaterial({ baseColor: new Sein.Color(1, 0, 0) }),
      position: new Sein.Vector3(-8, 10, 0)
    });
    box1.addComponent('floating', FloatingComponent, { amp: 1, omega: 2 });

    world.addActor('box2', Sein.BSPBoxActor, {
      width: 2,
      height: 2,
      depth: 2,
      material: new Sein.PBRMaterial({ baseColor: new Sein.Color(0, 1, 0) }),
      position: new Sein.Vector3(8, 10, 0)
    });

    world.addActor('cylinder', Sein.BSPCylinderActor, {
      radiusTop: 1,
      radiusBottom: 2,
      height: 2,
      radialSegments: 16,
      material: new Sein.PBRMaterial({ baseColor: new Sein.Color(0, 0, 1) })
    });

    world.addActor('aLight', Sein.AmbientLightActor, {
      color: new Sein.Color(1, 1, 1),
      amount: 0.5
    });
    world.addActor('dLight', Sein.DirectionalLightActor, {
      direction: new Sein.Vector3(-1, -1, -1),
      color: new Sein.Color(1, 1, 1),
      amount: 2
    });

    world.addActor('plight', Sein.PointLightActor, {
      color: new Sein.Color(1, 1, 1),
      amount: 100,
      range: 10,
      position: new Sein.Vector3(0, 8, -8)
    });

    world.addActor('slight', Sein.SpotLightActor, {
      color: new Sein.Color(1, 1, 1),
      direction: new Sein.Vector3(-1, -1, 0.5),
      amount: 400,
      range: 10,
      outerCutoff: 30,
      cutoff: 15,
      position: new Sein.Vector3(0, 8, 8)
    });

    const miku = game.resource.instantiate<'GlTF'>('miku.gltf').get(0);
    miku.transform.setPosition(0, 0, 4);

    // add animator component
    miku.addComponent('animator', Sein.AnimatorComponent);
    miku.animator.register('custom', new MyAnimation({ speed: 1 }));
    miku.animator.play('custom', 180);

    miku.animator.register('custom1', new MyAnimation({ speed: 2 }));
    // add physic engin
    world.enablePhysic(
      new Sein.CannonPhysicWorld(CANNON, new Sein.Vector3(0, -9.81, 0))
    );
    // add ground
    const ground = world.addActor('ground', Sein.BSPBoxActor, {
      position: new Sein.Vector3(0, -6, 0),
      width: 50,
      height: 1,
      depth: 50,
      material: new Sein.BasicMaterial({
        diffuse: new Sein.Color(0.3, 0.3, 0.3),
        lightType: 'PHONG'
      })
    });

    ground.addComponent('groundRigidBody', Sein.RigidBodyComponent, {
      mass: 0,
      physicStatic: true,
      restitution: 1
    });
    ground.addComponent('grounCollider', Sein.BoxColliderComponent, {
      size: [50, 1, 50]
    });

    // add physic ball
    const sphere = world.addActor('physicball', Sein.BSPSphereActor, {
      radius: 2,
      widthSegments: 32,
      material: new Sein.BasicMaterial({
        diffuse: new Sein.Color(1, 0.3, 0.3),
        lightType: 'PHONG'
      })
    });
    sphere.transform.setPosition(-5, 10, 0);
    sphere.addComponent('ballRigidBody', Sein.RigidBodyComponent, {
      mass: 1,
      restitution: 0.7,
      unControl: true
    });
    sphere.addComponent('ballCollider', Sein.SphereColliderComponent, {
      radius: 2
    });

    // world.addActor('snow', Sein.BSPBoxActor, {
    //   width: 150,
    //   height: 150,
    //   depth: 150,
    //   material: new Sein.BasicMaterial({
    //     diffuse: game.resource.get<'CubeTexture'>('snow.tex'),
    //     lightType: 'NONE',
    //     side: Sein.Constants.FRONT_AND_BACK
    //   })
    // });

    world.addActor('plane', Sein.BSPPlaneActor, {
      width: 2.56,
      height: 1.92,
      position: new Sein.Vector3(-4, 4, 0),
      material: new Sein.BasicMaterial({
        diffuse: game.resource.get<'Texture'>('paradise.tex'),
        lightType: 'NONE',
        side: Sein.Constants.FRONT_AND_BACK
      })
    });

    world.addActor('plane2', Sein.BSPPlaneActor, {
      width: 2.56,
      height: 1.92,
      position: new Sein.Vector3(4, 4, 0),
      material: new Sein.BasicMaterial({
        diffuse: new Sein.Texture({
          image: game.resource.get<'Image'>('paradise.jpg'),
          flipY: true
        }),
        lightType: 'NONE',
        side: Sein.Constants.FRONT_AND_BACK
      })
    });

    world.addActor('22', Sein.SpriteActor, {
      atlas: game.resource.get<'Atlas'>('22.atlas'),
      frameName: '01',
      width: 0.66 * 20,
      height: 0.9 * 20,
      materialOptions: {
        transparent: true
      }
    });

    inspector.syncVerticesInfo();
  }

  public onUpdate() {
    const box2 = Sein.findActorByName(this.getWorld(), 'box2');
    const ground = Sein.findActorByName(this.getWorld(), 'ground');
    box2.transform.rotate(box2.transform.upVector, 0.02);
    // ground.transform.rotate(ground.transform.upVector, 0.01);
  }
}
