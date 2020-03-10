/**
 * @File   : ColorController.tsx
 * @Author : dtysky (dtysky@outlook.com)
 * @Date   : 3/6/2020, 2:17:59 PM
 * @Description:
 */
import * as Sein from 'seinjs';
import {h} from 'preact';

import {TController} from '../types';
import {ColorPicker} from '../UI/components';

const ColorController: TController<Sein.Color> = (
  name: string,
  readonly: boolean,
  options: any,
  object: Sein.SObject,
  onChange: (value: Sein.Color) => void
) => {
  const color = object[name] as Sein.Color;

  return (
    <ColorPicker
      label={name}
      value={`#${color.toHEX()}`}
      onColorChange={c => {
        color.fromHEX(c);
        onChange(color);
      }}
    />
  );
}

export default ColorController;
