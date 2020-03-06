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

type TBasicValue = string | number | boolean;

const BasicController: TController<TBasicValue> = (
  name: string,
  value: TBasicValue,
  readonly: boolean,
  options: any,
  object: Sein.SObject,
  onChange: (value: TBasicValue) => void
) => {
  return (
    <div>
      <div>{name}</div>
      {
        typeof value === 'boolean' && (
          <Switch
            checked={value}
            onCheckedChange={v => {
              if (!readonly) {
                object[name] = v;
                onChange(v);
              }
            }}
          />
        )
      }
      {
        (typeof value === 'number' || typeof value === 'string') && (
          <Text
            value={value}
            disabled={readonly}
            onChange={(_, v) => {
              object[name] = v;
              onChange(v);
            }}
          />
        )
      }
    </div>
  )
}

export default BasicController;
