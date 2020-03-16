import {h, Component, JSX, ComponentClass} from 'preact';
import * as Sein from 'seinjs';

import {TEditor} from '../../types';
import InspectorActor from '../../Actor/InspectorActor';
import BasicEditor from './BasicEditor';
import ActorCommonEditor from './ActorCommonEditor';
import ComponentCommonEditor from './ComponentCommonEditor';
import MaterialsEditor from './MaterialsEditor';
import GeometriesEditor from './GeometriesEditor';
import EventEditor from './EventEditor';
import CustomPropertiesEditor from './CustomPropertiesEditor';

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

export function getEditor(obj: Sein.SObject): TEditor {
  if (EDITORS[obj.className.value]) {
    return EDITORS[obj.className.value];
  }

  let editors: {
    name: string;
    componentClass: ComponentClass<{actor: InspectorActor, object: Sein.SObject}>
  }[] = [
    {name: 'Common', componentClass: CustomPropertiesEditor}
  ];

  if (Sein.isPrimitiveComponent(obj)) {
    editors = [
      {name: 'Common', componentClass: ComponentCommonEditor},
      {name: 'Materials', componentClass: MaterialsEditor},
      {name: 'Geometries', componentClass: GeometriesEditor},
    ];
  } else 
  if (Sein.isActor(obj)) {
    editors = [{name: 'Common', componentClass: ActorCommonEditor}];
  } else if (Sein.isComponent(obj)) {
    editors = [{name: 'Common', componentClass: ComponentCommonEditor}];
  } else if (Sein.isEventManager(obj)) {
    editors = [{name: 'Common', componentClass: EventEditor}];
  }

  return (actor: InspectorActor, object: Sein.SObject) => (
    <BasicEditor actor={actor} object={object} editors={editors} />
  );
}
