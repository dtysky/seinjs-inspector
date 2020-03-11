/**
 * @File   : MaterialController.tsx
 * @Author : dtysky (dtysky@outlook.com)
 * @Date   : 3/10/2020, 3:22:09 PM
 * @Description:
 */
import * as Sein from 'seinjs';
import {h, Fragment} from 'preact';

import {TController} from '../types';
import {Folder, Text, Switch, Information} from '../UI/components';
import {getController, getControllerType} from './utils';

const MaterialController: TController<any> = (
  name: string,
  readonly: boolean,
  options: any,
  object: Sein.Material,
  onChange: (value: any) => void
) => {
  const {uniforms, _uniforms} = object as any;

  if (!uniforms) {
    return null;
  }

  return (
    <Folder label={object.name || 'material'} close={false}>
      <Information label={'id'} value={object.id} />
      <Folder label={'BaseInfo'} close={true}>
        <Information label={'shaderCacheId'} value={object.shaderCacheId} />
        {getController('basic')('lightType', false, {}, object, onChange)}
        {getController('basic')('depthTest', false, {}, object, onChange)}
        {getController('basic')('depthMask', false, {}, object, onChange)}
        {getController('basic')('depthFunc', false, {}, object, onChange)}
        {getController('basic')('cullFace', false, {}, object, onChange)}
        {getController('basic')('transparent', false, {}, object, onChange)}
        {getController('basic')('wireframe', false, {}, object, onChange)}
        {getController('basic')('gammaCorrection', false, {}, object, onChange)}
        {getController('basic')('useHDR', false, {}, object, onChange)}
      </Folder>
      <Folder label={'Uniforms'} close={false}>
        {
          Object.keys(uniforms).sort().map(key => {
            if (!_uniforms || !_uniforms[key]) {
              key = key.replace('u_', '');
            }

            const {value} = object.getUniform(key);
            const type = typeof value;

            return getController(getControllerType(value))(key, type === 'string', {}, {[key]: value}, v => {
              object.setUniform(key, v);

              onChange(null);
            });
          })
        }
      </Folder>
    </Folder>
  );
}

export default MaterialController;
