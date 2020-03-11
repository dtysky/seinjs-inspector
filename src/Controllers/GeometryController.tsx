/**
 * @File   : GeometryController.tsx
 * @Author : dtysky (dtysky@outlook.com)
 * @Date   : 3/11/2020, 3:32:20 PM
 * @Description:
 */
import * as Sein from 'seinjs';
import {h, Fragment} from 'preact';

import {TController} from '../types';
import {Folder, Text, Switch, Information} from '../UI/components';
import {getController, getControllerType} from './utils';

const DATA_NAMES = [
  'vertices', 'indices', 'uvs', 'uvs1', 'colors', '_normals',
  'skinWeights', 'SkinIndices', '_tangents', '_tangents1'
];

const GeometryController: TController<Sein.Geometry> = (
  name: string,
  readonly: boolean,
  options: {attributes?: string[], materialName?: string},
  object: any,
  onChange: (value: Sein.Geometry) => void
) => {
  const attributes = (options.attributes || []).concat(DATA_NAMES);
  const geometry = object[name] as Sein.Geometry;

  if (!geometry || !Sein.isGeometry(geometry)) {
    return null;
  }

  let mem = 0;
  attributes.map(key => geometry[key]).filter(a => !!a).forEach(data => mem += (data.getByteLength() / 1024));

  return (
    <Folder label={options.materialName || 'geometry'} close={false}>
      <Information label={'id'} value={geometry.id} />
      <Information label={'mode'} value={geometry.mode} />
      <Information label={'isStatic'} value={geometry.isStatic} />
      <Information label={'memory'} value={mem.toFixed(2) + 'KB'} />
      <Folder label={'Data'} close={false}>
        {
          attributes.map(key => getController('geometry-data')(key, readonly, {}, geometry, onChange))
        }
      </Folder>
    </Folder>
  );
}

export default GeometryController;
