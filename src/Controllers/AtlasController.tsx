/**
 * @File   : AtlasController.tsx
 * @Author : dtysky (dtysky@outlook.com)
 * @Date   : 3/9/2020, 6:45:36 PM
 * @Description:
 */
import * as Sein from 'seinjs';
import {h} from 'preact';

import {TController} from '../types';
import {Folder, Select} from '../UI/components';

const AtlasController: TController<Sein.AtlasManager> = (
  name: string,
  readonly: boolean,
  options: {
    getFrame: (object: Sein.SObject) => string,
    setFrame: (object: Sein.SObject, frame: string) => void
  },
  object: Sein.SObject,
  onChange: (value: Sein.AtlasManager) => void
) => {
  const value = object[name] as Sein.AtlasManager;

  if (!value || !Sein.isAtlasManager(value)) {
    return null;
  }

  const image = value.image as any;
  let src = null;

  if (image instanceof Image) {
    src = image.src;
  } else if (image instanceof HTMLCanvasElement) {
    src = image.toDataURL();
  }

  const {getFrame, setFrame} = options;
  const frame = getFrame && getFrame(object);
  const frames = Object.keys(value.frames).map(key => ({text: key, value: key, selected: key === frame}));

  return (
    <Folder label={name} close={false}>
      {
        src ? (
          <div>
            <img style={{maxWidth: '100%'}} src={src} />
          </div>
        ) : (
          <div>纹理已被释放或并非来源于普通图像（比如压缩纹理等）</div>
        )
      }
      <Select
        label={'CurrentFrame'}
        options={frames}
        onSelectChange={f => {
          setFrame && setFrame(object, f);

          onChange(value);
        }}
      />
    </Folder>
  )
}

export default AtlasController;
