/**
 * @File   : index.ts
 * @Author : dtysky (dtysky@outlook.com)
 * @Date   : 3/6/2020, 11:42:36 AM
 * @Description:
 */
import * as Sein from 'seinjs';

import {registerController, unregisterController, getController, getControllerType, hasController} from './utils';
import DefaultController from './DefaultController';
import VectorController from './VectorController';
import BasicController from './BasicController';
import ColorController from './ColorController';
import LayersController from './LayersController';
import EventController from './EventController';
import ShadowController from './ShadowController';
import NumberArrayController from './NumberArrayController';
import ColliderActionController from './ColliderActionController';
import ListActionController from './ListActionController';
import MaterialController from './MaterialController';
import TextureController from './TextureController';
import ObjectController from './ObjectController';
import GeometryController from './GeometryController';
import GeometryDataController from './GeometryDataController';
import AtlasController from './AtlasController';
import ArrayController from './ArrayController';
import SelectController from './SelectController';
import ImageController from './ImageController';
import ResourceGLTFController from './ResourceGLTFController';
import NestController from './NestController';
import './base.scss';

export {registerController, unregisterController, getController, getControllerType, hasController};

export function initCore() {
  registerController('invalid', () => null);
  registerController('default', DefaultController);
  registerController('basic', BasicController);
  registerController('vector', VectorController);
  registerController('color', ColorController);
  registerController('layers', LayersController);
  registerController('event', EventController);
  registerController('shadow', ShadowController);
  registerController('number-array', NumberArrayController);
  registerController('collider-action', ColliderActionController);
  registerController('list-action', ListActionController);
  registerController('material', MaterialController);
  registerController('texture', TextureController);
  registerController('object', ObjectController);
  registerController('geometry', GeometryController);
  registerController('geometry-data', GeometryDataController);
  registerController('atlas', AtlasController);
  registerController('array', ArrayController);
  registerController('select', SelectController);
  registerController('image', ImageController);
  registerController('nest', NestController);
  registerController('resource-gltf', ResourceGLTFController);

  initInspectableClasses();
}

function initInspectableClasses() {
  Sein.InfoActor.INSPECTABLE_PROPERTIES = {
    updatePriority: {type: 'basic', readonly: true, options: {}}
  };

  Sein.ChildActorComponent.INSPECTABLE_PROPERTIES = {

  };

  Sein.CameraComponent.INSPECTABLE_PROPERTIES = {
    _backgroundMat: {type: 'material', readonly: true},
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
      scale: {type: 'number-array', readonly: true, options: {}},
    }}},
  };
  Sein.BoxColliderComponent.INSPECTABLE_PROPERTIES = Object.assign({}, Sein.ColliderComponent.INSPECTABLE_PROPERTIES, {
    __action: {type: 'collider-action', readonly: true, options: {initState: {
      offset: {type: 'number-array', readonly: true, options: {}},
      quaternion: {type: 'number-array', readonly: true, options: {}},
      scale: {type: 'number-array', readonly: true, options: {}},
      size: {type: 'number-array', readonly: true, options: {}},
    }}},
  });
  Sein.SphereColliderComponent.INSPECTABLE_PROPERTIES = Object.assign({}, Sein.ColliderComponent.INSPECTABLE_PROPERTIES, {
    __action: {type: 'collider-action', readonly: true, options: {initState: {
      offset: {type: 'number-array', readonly: true, options: {}},
      quaternion: {type: 'number-array', readonly: true, options: {}},
      scale: {type: 'number-array', readonly: true, options: {}},
      radius: {type: 'basic', readonly: true, options: {}},
    }}},
  });
  Sein.CylinderColliderComponent.INSPECTABLE_PROPERTIES = Object.assign({}, Sein.ColliderComponent.INSPECTABLE_PROPERTIES, {
    __action: {type: 'collider-action', readonly: true, options: {initState: {
      offset: {type: 'number-array', readonly: true, options: {}},
      quaternion: {type: 'number-array', readonly: true, options: {}},
      scale: {type: 'number-array', readonly: true, options: {}},
      radiusTop: {type: 'basic', readonly: true, options: {}},
      radiusBottom: {type: 'basic', readonly: true, options: {}},
      height: {type: 'basic', readonly: true, options: {}},
      numSegments: {type: 'basic', readonly: true, options: {}},
    }}},
  });

  Sein.AnimatorComponent.INSPECTABLE_PROPERTIES = {
    current: {type: 'basic', readonly: true, options: {}},
    animationNames: {type: 'list-action', readonly: true, options: {
      getIsCurrent: (object: Sein.AnimatorComponent, value: string) => {
        const stopt = object.fsm.getCurrentState().name.equalsTo('enter');

        return !stopt && value === object.current;
      },
      onSwitch: (object: Sein.AnimatorComponent, value: string, selected: boolean) => {
        if (selected) {
          object.play(value, Infinity);
        } else {
          object.stop();
        }
      }
    }},
  };

  Sein.BSPBoxComponent.INSPECTABLE_PROPERTIES = {
    _initState: {type: 'object', readonly: true, options: {properties: [
      'width', 'height', 'depth', 'widthSegments', 'heightSegments', 'depthSegments'
    ]}}
  };
  Sein.BSPSphereComponent.INSPECTABLE_PROPERTIES = {
    _initState: {type: 'object', readonly: true, options: {properties: [
      'radius', 'widthSegments', 'heightSegments'
    ]}}
  };
  Sein.BSPPlaneComponent.INSPECTABLE_PROPERTIES = {
    _initState: {type: 'object', readonly: true, options: {properties: [
      'width', 'height', 'widthSegments', 'heightSegments'
    ]}}
  };
  Sein.BSPCylinderComponent.INSPECTABLE_PROPERTIES = {
    _initState: {type: 'object', readonly: true, options: {properties: [
      'radiusTop', 'radiusBottom', 'height', 'radialSegments', 'heightSegments',
      'openEnded', 'thetaStart', 'thetaLength'
    ]}}
  };
  Sein.BSPMorphComponent.INSPECTABLE_PROPERTIES = {
    weights: {type: 'number-array', readonly: false, options: {}}
  };

  Sein.SpriteComponent.INSPECTABLE_PROPERTIES = {
    atlas: {type: 'atlas', readonly: false, options: {
      getFrame: (object: Sein.SpriteComponent) => {
        // return object.currentFrame;
        return '01';
      },
      setFrame: (object: Sein.SpriteComponent, frame: string) => {
        object.setFrame(frame);
      }
    }},
    texture: {type: 'texture', readonly: false, options: {}},
  };
}
