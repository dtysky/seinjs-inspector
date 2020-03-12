/**
 * @File   : ListActionController.tsx
 * @Author : dtysky (dtysky@outlook.com)
 * @Date   : 3/10/2020, 7:15:52 PM
 * @Description:
 */
import * as Sein from 'seinjs';
import {h} from 'preact';

import {TController} from '../types';
import {Folder, Text, Switch} from '../UI/components';

type TListActionValue = (string | number)[];

const ListActionController: TController<TListActionValue> = (
  name: string,
  readonly: boolean,
  options: {
    getIsCurrent: (object: any, value: string | number) => boolean,
    onSwitch: (object: any, value: string | number, selected: boolean) => void
  },
  object: any,
  onChange: (value: TListActionValue) => void
) => {
  const values = object[name] as TListActionValue;

  if (!values) {
    return null;
  }

  const {getIsCurrent, onSwitch} = options;

  return (
    <Folder label={name} close={false}>
      {
        values.map(value => (
          <Switch
            label={`${value}`}
            checked={getIsCurrent(object, value)}
            onCheckedChange={checked => {
              onSwitch(object, value, checked);

              onChange(null);
            }}
          />
        ))
      }
    </Folder>
  );
}

export default ListActionController;
