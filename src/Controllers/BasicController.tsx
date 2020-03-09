/**
 * @File   : BasicController.tsx
 * @Author : dtysky (dtysky@outlook.com)
 * @Date   : 3/6/2020, 3:15:07 PM
 * @Description:
 */
import * as Sein from 'seinjs';
import {h} from 'preact';

import Text from '../UI/components/Text';
import Switch from '../UI/components/Switch';
import {TController} from '../types';
import Information from '../UI/components/Information';

type TBasicValue = string | number | boolean | Sein.SName;

const BasicController: TController<TBasicValue> = (
  name: string,
  readonly: boolean,
  options: any,
  object: Sein.SObject,
  onChange: (value: TBasicValue) => void
) => {
  const value = object[name];

  if (typeof value === 'boolean') {
    return (
      <Switch
        label={name}
        checked={value}
        onCheckedChange={v => {
          if (!readonly) {
            object[name] = v;
            onChange(v);
          }
        }}
      />
    );
  }

  if (typeof value === 'number' || typeof value === 'string') {
    if (readonly) {
      return (
        <Information
          label={name}
          value={value}
        />
      );
    } else {
      return (
        <Text
          prefix={name}
          value={value}
          onChange={(_, v) => {
            object[name] = v;
            onChange(v);
          }}
        />
      );
    }
  }

  if (value && value.isSName) {
    return (
      <Information
        label={name}
        value={value.value}
      />
    );
  }

  return null;
}

export default BasicController;
