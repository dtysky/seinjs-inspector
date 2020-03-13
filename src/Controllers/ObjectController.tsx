/**
 * @File   : ObjectController.tsx
 * @Author : dtysky (dtysky@outlook.com)
 * @Date   : 3/11/2020, 3:03:23 PM
 * @Description:
 */
import * as Sein from 'seinjs';
import {h} from 'preact';

import {TController} from '../types';
import {Folder} from '../UI/components';
import {getController, getControllerType} from './utils';

const ObjectController: TController<Object> = (
  name: string,
  readonly: boolean,
  options: {properties: string[]},
  object: Sein.SObject,
  onChange: (value: Object) => void
) => {
  const obj = object[name] as Object;

  if (!obj) {
    return null;
  }

  let {properties} = options;
  if (!properties) {
    properties = Object.keys(obj);
  }

  return (
    <Folder label={name} close={false}>
      {
        properties.map(key => {
          const value = obj[key];

          return getController(getControllerType(value))(key, readonly, {}, obj, v => {
            onChange(null);
          });
        })
      }
    </Folder>
  );
}

export default ObjectController;
