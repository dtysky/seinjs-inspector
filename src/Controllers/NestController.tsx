/**
 * @File   : NestController.tsx
 * @Author : dtysky (dtysky@outlook.com)
 * @Date   : 3/13/2020, 1:58:44 PM
 * @Description:
 */
import * as Sein from 'seinjs';
import {h} from 'preact';

import {TController} from '../types';
import {Folder, Information} from '../UI/components';
import {getController, getControllerType} from './utils';

type TNestValue = {children: TNestValue[], name: string};

function readerNextNest(name: string, value: TNestValue[]) {
  if (!value) {
    return null;
  }

  if (value.length === 0) {
    return (
      <Information label={name} value={''} />
    );
  }

  return (
    <Folder label={name}>
      {value.map(item => readerNextNest(item.name, item.children))}
    </Folder>
  )
}

const NestController: TController<TNestValue> = (
  name: string,
  readonly: boolean,
  options: {properties: string[]},
  object: any,
  onChange: (value: TNestValue) => void
) => {
  const obj = object[name] as TNestValue;

  if (!obj || !obj.children) {
    return null;
  }

  return readerNextNest(name, obj.children);
}

export default NestController;
