/**
 * @File   : ColliderActionController.tsx
 * @Author : dtysky (dtysky@outlook.com)
 * @Date   : 3/10/2020, 5:38:09 PM
 * @Description:
 */
import * as Sein from 'seinjs';
import {h, Fragment} from 'preact';

import {TController} from '../types';
import {Folder, Text, Switch} from '../UI/components';
import {getController} from './utils';

const material = new Sein.BasicMaterial({lightType: 'NONE', diffuse: new Sein.Color(0, 1, 0, 1)});

function getDebuggerName(collider: Sein.ColliderComponent) {
  return `debugger-${collider.name}`;
}

function addDebugger(collider: Sein.ColliderComponent) {
  const name = getDebuggerName(collider);
  const owner = collider.getOwner() as Sein.SceneActor;

  let res: Sein.StaticMeshComponent;

  if (Sein.isBoxColliderComponent(collider)) {
    const {size} = collider.initState;
    res = owner.addComponent(name, Sein.BSPBoxComponent, {width: size[0], height: size[1], depth: size[2], material});
  } else if (Sein.isSphereColliderComponent(collider)) {
    res = owner.addComponent(name, Sein.BSPSphereComponent, {radius: collider.initState.radius, material});
  } else if (Sein.isCylinderColliderComponent(collider)) {
    const {radiusTop, radiusBottom, height} = collider.initState;
    res = owner.addComponent(name, Sein.BSPCylinderComponent, {radiusTop, radiusBottom, height, material});
  }

  const {offset, quaternion} = collider.initState;
  res.position.fromArray(offset);
  res.quaternion.fromArray(quaternion);
}

function removeDebugger(collider: Sein.ColliderComponent) {
  const name = getDebuggerName(collider);
  const owner = collider.getOwner() as Sein.SceneActor;

  owner.removeComponent(name);
}

const ColliderActionController: TController<any> = (
  name: string,
  readonly: boolean,
  options: any,
  object: Sein.ColliderComponent,
  onChange: (value: any) => void
) => {
  const {initState} = options;
  object['__showDebugger'] = object['__showDebugger'] || false;

  return (
    <Fragment>
      <Switch
        label={'showDebugger'}
        checked={object['__showDebugger']}
        onCheckedChange={value => {
          if (value) {
            addDebugger(object);
          } else {
            removeDebugger(object);
          }

          object['__showDebugger'] = value;
          onChange(null);
        }}
      />
      {
        Object.keys(initState).map(key => {
          const value = initState[key];

          return getController(value.type)(key, value.readonly, value.options, object['initState'] as any, onChange);
        })
      }
    </Fragment>
  );
}

export default ColliderActionController;
