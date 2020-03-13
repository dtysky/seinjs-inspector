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

const MaterialController: TController<Sein.Material> = (
  name: string,
  readonly: boolean,
  options: {lazy?: boolean},
  object: any,
  onChange: (value: Sein.Material) => void
) => {
  const material = object[name] as Sein.Material;

  if (!material) {
    return null;
  }

  const lazy = options.lazy || false;
  const {uniforms, _uniforms} = material as any;

  if (!uniforms) {
    return null;
  }

  return (
    <Folder label={material.name || 'material'} close={lazy}>
      <Information label={'id'} value={material.id} />
      <Folder label={'BaseInfo'} close={true}>
        <Information label={'shaderCacheId'} value={material.shaderCacheId} />
        {getController('basic')('lightType', false, {}, material, onChange)}
        {getController('basic')('castShadows', false, {}, material, onChange)}
        {getController('basic')('receiveShadows', false, {}, material, onChange)}
        {getController('basic')('depthTest', false, {}, material, onChange)}
        {getController('basic')('depthTest', false, {}, material, onChange)}
        {getController('basic')('depthMask', false, {}, material, onChange)}
        {getController('basic')('depthFunc', false, {}, material, onChange)}
        {getController('basic')('cullFace', false, {}, material, onChange)}
        {getController('basic')('transparent', false, {}, material, onChange)}
        {getController('basic')('wireframe', false, {}, material, onChange)}
        {getController('basic')('gammaCorrection', false, {}, material, onChange)}
        {getController('basic')('useHDR', false, {}, material, onChange)}
        {getController('basic')('cloneForInst', false, {}, material, onChange)}
      </Folder>
      <Folder label={'Uniforms'} close={false}>
        {
          Object.keys(uniforms).sort().map(key => {
            if (!_uniforms || !_uniforms[key]) {
              key = key.replace('u_', '');
            }

            const {value} = material.getUniform(key);
            const type = typeof value;

            return getController(getControllerType(value))(key, type === 'string', {}, {[key]: value}, v => {
              material.setUniform(key, v);

              onChange(null);
            });
          })
        }
      </Folder>
    </Folder>
  );
}

export default MaterialController;
