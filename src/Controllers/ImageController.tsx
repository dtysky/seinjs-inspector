/**
 * @File   : ImageController.tsx
 * @Author : dtysky (dtysky@outlook.com)
 * @Date   : 3/13/2020, 12:56:35 PM
 * @Description:
 */
import * as Sein from 'seinjs';
import {h, Fragment} from 'preact';

import {TController} from '../types';
import {Preview, Folder} from '../UI/components';

type TImageValue = HTMLImageElement | HTMLCanvasElement;

const ImageController: TController<TImageValue> = (
  name: string,
  readonly: boolean,
  options: any,
  object: any,
  onChange: (value: TImageValue) => void
) => {
  const value = object[name] as TImageValue;

  if (!value) {
    return null;
  }

  let src = '';
  if (value instanceof HTMLCanvasElement) {
    src = value.toDataURL();
  } else {
    src = value.src;
  }

  return (
    <Folder label={name} value={`${value.width} x ${value.height}`} close={false}>
      <Preview name={name} url={src} />
    </Folder>
  )
}

export default ImageController;
