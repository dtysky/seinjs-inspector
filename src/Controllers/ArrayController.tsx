/**
 * @File   : ArrayController.tsx
 * @Author : dtysky (dtysky@outlook.com)
 * @Date   : 3/12/2020, 10:23:27 AM
 * @Description:
 */
// on click
import * as Sein from 'seinjs';
import {h} from 'preact';

import {TController} from '../types';
import {Folder} from '../UI/components';
import {getController, getControllerType} from './utils';

const ArrayController: TController<any[]> = (
  name: string,
  readonly: boolean,
  options: {onClick?: (value: any) => void},
  object: any,
  onChange: (value: any[]) => void
) => {
  const values = object[name] as any[];

  if (!values) {
    return null;
  }

  return (
    <Folder label={name}>
      {
        values.map((value, index) => getController(getControllerType(value))(index, readonly, {}, values, onChange))
      }
    </Folder>
  );
}

export default ArrayController;
