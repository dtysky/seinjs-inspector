/**
 * @File   : index.ts
 * @Author : dtysky (dtysky@outlook.com)
 * @Date   : 3/6/2020, 11:42:36 AM
 * @Description:
 */
import * as Sein from 'seinjs';

import {registerController, unregisterController, getController} from './utils';
import VectorController from './VectorController';
import BasicController from './BasicController';
import ColorController from './ColorController';
import LayersController from './LayersController';
import EventController from './EventController';
import ShadowController from './ShadowController';
import NumberArrayController from './NumberArrayController';
import ColliderActionController from './ColliderActionController';
import './base.scss';

export {registerController, unregisterController, getController};

export function initCore() {
  registerController('basic', BasicController);
  registerController('vector', VectorController);
  registerController('color', ColorController);
  registerController('layers', LayersController);
  registerController('event', EventController);
  registerController('shadow', ShadowController);
  registerController('number-array', NumberArrayController);
  registerController('collider-action', ColliderActionController);
  // Texture, CubeTexture, Image, Material, Atlas

  initInspectableClasses();
}

function initInspectableClasses() {
  Sein.InfoActor.INSPECTABLE_PROPERTIES = {
    updatePriority: {type: 'basic', readonly: true, options: {}}
  };

  Sein.ChildActorComponent.INSPECTABLE_PROPERTIES = {

  };

  Sein.CameraComponent.INSPECTABLE_PROPERTIES = {
    // _backgroundMat: {type: 'material', readonly: true},
    // __action: {type: 'camera-actions', readonly: false},
    isMainCamera: {type: 'basic', readonly: true, options: {}},
    rendererAlive: {type: 'basic', readonly: true, options: {}},
  };
  Sein.PerspectiveCameraComponent.INSPECTABLE_PROPERTIES = Object.assign({}, Sein.CameraComponent.INSPECTABLE_PROPERTIES, {
    fov: {type: 'basic', readonly: false, options: {}},
    aspect: {type: 'basic', readonly: false, options: {}},
    near: {type: 'basic', readonly: false, options: {}},
    far: {type: 'basic', readonly: false, options: {}}
  });
  Sein.OrthographicCameraComponent.INSPECTABLE_PROPERTIES = Object.assign({}, Sein.CameraComponent.INSPECTABLE_PROPERTIES, {
    left: {type: 'basic', readonly: false, options: {}},
    right: {type: 'basic', readonly: false, options: {}},
    top: {type: 'basic', readonly: false, options: {}},
    bottom: {type: 'basic', readonly: false, options: {}},
    near: {type: 'basic', readonly: false, options: {}},
    far: {type: 'basic', readonly: false, options: {}}
  });

  Sein.LightComponent.INSPECTABLE_PROPERTIES = {
    amount: {type: 'basic', readonly: false, options: {}},
    color: {type: 'color', readonly: false, options: {}},
    shadow: {type: 'shadow', readonly: true, options: {}}
  };
  Sein.DirectionalLightComponent.INSPECTABLE_PROPERTIES = Object.assign({}, Sein.LightComponent.INSPECTABLE_PROPERTIES, {});
  Sein.DirectionalLightComponent.INSPECTABLE_PROPERTIES = Object.assign({}, Sein.LightComponent.INSPECTABLE_PROPERTIES, {
    direction: {type: 'vector', readonly: false, options: {}},
  });
  Sein.PointLightComponent.INSPECTABLE_PROPERTIES = Object.assign({}, Sein.LightComponent.INSPECTABLE_PROPERTIES, {
    range: {type: 'basic', readonly: false, options: {}},
    constantAttenuation: {type: 'basic', readonly: true, options: {}},
    linearAttenuation: {type: 'basic', readonly: true, options: {}},
    quadraticAttenuation: {type: 'basic', readonly: true, options: {}},
  });
  Sein.SpotLightComponent.INSPECTABLE_PROPERTIES = Object.assign({}, Sein.LightComponent.INSPECTABLE_PROPERTIES, {
    direction: {type: 'vector', readonly: false, options: {}},
    cutoff: {type: 'basic', readonly: false, options: {}},
    outerCutoff: {type: 'basic', readonly: false, options: {}},
    range: {type: 'basic', readonly: false, options: {}},
    constantAttenuation: {type: 'basic', readonly: true, options: {}},
    linearAttenuation: {type: 'basic', readonly: true, options: {}},
    quadraticAttenuation: {type: 'basic', readonly: true, options: {}},
  });

  Sein.RigidBodyComponent.INSPECTABLE_PROPERTIES = {
    mass: {type: 'basic', readonly: false, options: {}},
    friction: {type: 'basic', readonly: false, options: {}},
    restitution: {type: 'basic', readonly: false, options: {}},
    filterMask: {type: 'basic', readonly: false, options: {}},
    filterGroup: {type: 'basic', readonly: false, options: {}},
    unControl: {type: 'basic', readonly: false, options: {}},
    physicStatic: {type: 'basic', readonly: false, options: {}},
    sleeping: {type: 'basic', readonly: true, options: {}}
  };

  Sein.ColliderComponent.INSPECTABLE_PROPERTIES = {
    isTrigger: {type: 'basic', readonly: false, options: {}},
    __action: {type: 'collider-action', readonly: true, options: {initState: {
      offset: {type: 'number-array', readonly: true, options: {}},
      quaternion: {type: 'number-array', readonly: true, options: {}},
    }}},
  };
  Sein.BoxColliderComponent.INSPECTABLE_PROPERTIES = Object.assign({}, Sein.ColliderComponent.INSPECTABLE_PROPERTIES, {
    __action: {type: 'collider-action', readonly: true, options: {initState: {
      offset: {type: 'number-array', readonly: true, options: {}},
      quaternion: {type: 'number-array', readonly: true, options: {}},
      size: {type: 'number-array', readonly: true, options: {}},
    }}},
  });
  Sein.SphereColliderComponent.INSPECTABLE_PROPERTIES = Object.assign({}, Sein.ColliderComponent.INSPECTABLE_PROPERTIES, {
    __action: {type: 'collider-action', readonly: true, options: {initState: {
      offset: {type: 'number-array', readonly: true, options: {}},
      quaternion: {type: 'number-array', readonly: true, options: {}},
      radius: {type: 'basic', readonly: true, options: {}},
    }}},
  });
  Sein.CylinderColliderComponent.INSPECTABLE_PROPERTIES = Object.assign({}, Sein.ColliderComponent.INSPECTABLE_PROPERTIES, {
    __action: {type: 'collider-action', readonly: true, options: {initState: {
      offset: {type: 'number-array', readonly: true, options: {}},
      quaternion: {type: 'number-array', readonly: true, options: {}},
      radiusTop: {type: 'basic', readonly: true, options: {}},
      radiusBottom: {type: 'basic', readonly: true, options: {}},
      height: {type: 'basic', readonly: true, options: {}},
      numSegments: {type: 'basic', readonly: true, options: {}},
    }}},
  });
}
