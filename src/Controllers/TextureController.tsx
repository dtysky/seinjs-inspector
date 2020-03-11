/**
 * @File   : TextureController.tsx
 * @Author : dtysky (dtysky@outlook.com)
 * @Date   : 3/9/2020, 6:45:28 PM
 * @Description:
 */
import * as Sein from 'seinjs';
import {h, Fragment} from 'preact';

import {TController} from '../types';
import {Preview, Folder} from '../UI/components';

type TTextureValue = Sein.CubeTexture | Sein.Texture;

function RenderTextureValue(value: Sein.Texture, readonly: boolean, onChange: (value: Sein.Texture) => void) {
  const originImage = (value as any)._originImage || (value as any)._image;
  const isImg = originImage instanceof Image;

  return  isImg ? (
      <Preview name={value.name} url={(originImage as HTMLImageElement).src} />
    ) : (
      <div>纹理已被释放或并非来源于普通图像（比如压缩纹理等）</div>
    );
}

/**
 * @todo: CubeTexture Support
 */
function RenderCubeTextureValue(value: Sein.CubeTexture, readonly: boolean, onChange: (value: Sein.CubeTexture) => void) {
  return (
    <div></div>
  );
}

const TextureController: TController<TTextureValue> = (
  name: string,
  readonly: boolean,
  options: any,
  object: Sein.SObject,
  onChange: (value: TTextureValue) => void
) => {
  const value = object[name] as TTextureValue;

  return (
    <Folder label={name} close={false}>
      {
        Sein.isCubeTexture(value) ? RenderCubeTextureValue(value, readonly, onChange) : RenderTextureValue(value, readonly, onChange)
      }
    </Folder>
  )
}

export default TextureController;
