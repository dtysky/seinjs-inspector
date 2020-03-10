/**
 * @File   : NumberArrayController.tsx
 * @Author : dtysky (dtysky@outlook.com)
 * @Date   : 3/10/2020, 5:21:10 PM
 * @Description:
 */
import * as Sein from 'seinjs';
import {h, Fragment} from 'preact';

import Text from '../UI/components/Text';
import {TController} from '../types';

function RenderOne(array: number[], index: number, readonly: boolean, onChange: (array: number[]) => void) {
  return (
    <Text
      prefix={`${index}`}
      value={array[index]}
      type={'float'}
      view={'box'}
      onChange={(_, v) => {
        array[index] = v as number;
        onChange(array);
      }}
      disabled={readonly}
    />
  );
}

const VectorController: TController<number[]> = (
  name: string,
  readonly: boolean,
  options: any,
  object: Sein.SObject,
  onChange: (value: number[]) => void
) => {
  const value = object[name] as number[];

  if (!value) {
    return null;
  }

  return (
    <div className={'sein-controller-vector'}>
      <div className={'sein-controller-vector-name'}>{name}</div>
      <div className={'sein-controller-vector-content'}>
      {
        value.map((v, index) => RenderOne(value, index, readonly, onChange))
      }
      </div>
    </div>
  )
}

export default VectorController;
