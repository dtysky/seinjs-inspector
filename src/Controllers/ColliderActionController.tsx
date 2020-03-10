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

function addDebugger(collider: Sein.ColliderComponent) {

}

function removeDebugger(collider: Sein.ColliderComponent) {

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
          object['__showDebugger'] = value;
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
