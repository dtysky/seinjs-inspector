import {h, Component} from 'preact';
import 'seinjs-audio';

import ComponentEditor from './ComponentEditor';
import SceneComponentEditor from './SceneEditor';
import AnimatorComponentEditor from './AnimatorEditor';
import RigidBodyComponentEditor from './RigidBodyEditor';
import BoxColliderComponentEditor from './BSPBoxColliderEditor';
import SphereColliderComponentEditor from './SphereColliderEditor';
import PerspectiveCameraComponentEditor from './PerspectiveCameraEditor';
import OrthographicCameraComponentEditor from './OrthographicCameraEditor';
import DirectionalLightComponentEditor from './DirectionalLightEditor';
import AmbientLightComponentEditor from './AmbientLightEditor';
import PointLightComponentEditor from './PointLightEditor';
import SpotLightComponentEditor from './SpotLightEditor';
import PrimitiveComponentEditor from './PrimitiveEditor';
import * as Sein from 'seinjs';

export function getEditorForComponent(component: Sein.Component) {
  if (!component) {
    return ComponentEditor;
  }

  let Editor: any;
  if (Sein.isAnimatorComponent(component)) {
    Editor = AnimatorComponentEditor;
  } else if (Sein.isRigidBodyComponent(component)) {
    Editor = RigidBodyComponentEditor;
  } else if (Sein.isBoxColliderComponent(component)) {
    Editor = BoxColliderComponentEditor;
  } else if (Sein.isSphereColliderComponent(component)) {
    Editor = SphereColliderComponentEditor;
  } else if (Sein.isPerspectiveCameraComponent(component)) {
    Editor = PerspectiveCameraComponentEditor;
  } else if (Sein.isOrthographicCameraComponent(component)) {
    Editor = OrthographicCameraComponentEditor;
  } else if (Sein.isDirectionalLightComponent(component)) {
    Editor = DirectionalLightComponentEditor;
  } else if (Sein.isAmbientLightComponent(component)) {
    Editor = AmbientLightComponentEditor;
  } else if (Sein.isPointLightComponent(component)) {
    Editor = PointLightComponentEditor;
  } else if (Sein.isSpotLightComponent(component)) {
    Editor = SpotLightComponentEditor;
  } else if (Sein.isPrimitiveComponent(component)) {
    Editor = PrimitiveComponentEditor;
  } else if (Sein.Audio.isSourceComponent(component)) {
    Editor = PrimitiveComponentEditor;
  } else if (Sein.Audio.isListenerComponent(component)) {
    Editor = PrimitiveComponentEditor;
  } else if (Sein.isSceneComponent(component)) {
    Editor = SceneComponentEditor;
  }
  // Todo
  // SpriteComponent
  else {
    Editor = ComponentEditor;
  }

  return Editor;
}
