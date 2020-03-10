/**
 * @File   : LayerController.tsx
 * @Author : dtysky (dtysky@outlook.com)
 * @Date   : 3/10/2020, 1:29:31 PM
 * @Description:
 */
import * as Sein from 'seinjs';
import {h} from 'preact';

import {TController} from '../types';
import Information from '../UI/components/Information';

const LayerController: TController<Sein.Layers> = (
  name: string,
  readonly: boolean,
  options: any,
  object: Sein.SObject,
  onChange: (value: Sein.Layers) => void
) => {
  const layer = object[name] as Sein.Layers;

  return (
    <Information label={'layers'} value={(layer as any)._mask.toString(16)}  />
  );
}

export default LayerController;
