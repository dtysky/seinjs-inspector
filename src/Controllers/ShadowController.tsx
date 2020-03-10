/**
 * @File   : ShadowController.tsx
 * @Author : dtysky (dtysky@outlook.com)
 * @Date   : 3/10/2020, 4:18:55 PM
 * @Description:
 */
import * as Sein from 'seinjs';
import {h} from 'preact';

import {TController} from '../types';
import {Folder, Text, Switch} from '../UI/components';

const ShadowController: TController<Sein.IShadowOptions> = (
  name: string,
  readonly: boolean,
  options: any,
  object: Sein.SObject,
  onChange: (value: Sein.IShadowOptions) => void
) => {
  const shadow = object[name] as Sein.IShadowOptions;

  if (!shadow) {
    return null;
  }

  return (
    <Folder label={'Shadow'} close={true}>
      <Switch label={'debug'} checked={shadow.debug} onCheckedChange={value => {shadow.debug = value; onChange(shadow); }} />
      <Text prefix={'width'} value={shadow.width} type={'float'} onChange={(_, v: number) => {shadow.width = v; onChange(shadow); }} />
      <Text prefix={'height'} value={shadow.width} type={'float'} onChange={(_, v: number) => {shadow.height = v; onChange(shadow); }}  />
      <Text prefix={'maxBias'} value={shadow.maxBias} type={'float'} onChange={(_, v: number) => {shadow.maxBias = v; onChange(shadow); }} />
      <Text prefix={'minBias'} value={shadow.minBias} type={'float'} onChange={(_, v: number) => {shadow.minBias = v; onChange(shadow); }} />
    </Folder>
  );
}

export default ShadowController;
