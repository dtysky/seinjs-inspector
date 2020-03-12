/**
 * @File   : SelectController.tsx
 * @Author : dtysky (dtysky@outlook.com)
 * @Date   : 3/12/2020, 8:27:09 PM
 * @Description:
 */
import * as Sein from 'seinjs';
import {h} from 'preact';

import {TController} from '../types';
import {Folder, Text, Switch, Select} from '../UI/components';

type TSelectValue = string | number;

const SelectController: TController<string | number> = (
  name: string,
  readonly: boolean,
  options: {options: TSelectValue[]},
  object: any,
  onChange: (value: TSelectValue) => void
) => {
  const value = object[name] as TSelectValue;

  if (!value) {
    return null;
  }

  const {options: opts} = options;

  return (
    <Select
      label={name}
      options={opts.map(o => ({text: o.toString(), value: o, selected: o === value}))}
      onSelectChange={(v) => {
        if (readonly) {
          return;
        }

        object[name] = v;
        onChange(v);
      }}
    />
  );
}

export default SelectController;
