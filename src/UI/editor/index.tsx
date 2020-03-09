import {h, Component, JSX, ComponentClass} from 'preact';
import * as Sein from 'seinjs';
import 'seinjs-audio';

import {TEditor} from '../../types';
import InspectorActor from '../../Actor/InspectorActor';
import BasicEditor from './BasicEditor';
import ActorCommonEditor from './ActorCommonEditor';
import ComponentCommonEditor from './ComponentCommonEditor';

import AnimatorComponentEditor from './AnimatorEditor';
import RigidBodyComponentEditor from './RigidBodyEditor';
import BoxColliderComponentEditor from './BSPBoxColliderEditor';
import SphereColliderComponentEditor from './SphereColliderEditor';

import PrimitiveComponentEditor from './PrimitiveEditor';

const EDITORS: {[className: string]: TEditor} = {};

export function registerEditor(clz: Sein.TConstructor<Sein.SObject>, editor: TEditor) {
  const name = clz.CLASS_NAME.value;

  if (EDITORS[name]) {
    Sein.Debug.warn(`Panel ${name} is already existed, overwirte...`);
  }

  EDITORS[name] = editor;
}

export function unregisterEditor(clz: Sein.TConstructor<Sein.SObject>) {
  const name = clz.CLASS_NAME.value;

  if (EDITORS[name]) {
    delete EDITORS[name];
  }
}

export function getEditor(clz: Sein.SObject): TEditor {
  if (EDITORS[clz.className.value]) {
    return EDITORS[clz.className.value];
  }

  let editors: {
    name: string;
    componentClass: ComponentClass<{actor: InspectorActor, object: Sein.SObject}>
  }[] = [];

  if (Sein.isPrimitiveComponent) {

  }

  if (Sein.isActor) {
    editors = [{name: 'common', componentClass: ActorCommonEditor}];
  }

  if (Sein.isComponent) {
    editors = [{name: 'common', componentClass: ComponentCommonEditor}];
  }

  if (Sein.isResourceManager) {

  }

  if (Sein.isEventManager) {
    
  }

  return (actor: InspectorActor, object: Sein.SObject) => (
    <BasicEditor actor={actor} object={object} editors={editors} />
  );
}
