/**
 * @File   : GeometryDataController.tsx
 * @Author : dtysky (dtysky@outlook.com)
 * @Date   : 3/11/2020, 4:12:18 PM
 * @Description:
 */
import * as Sein from 'seinjs';
import {h} from 'preact';

import {TController} from '../types';
import {Folder, Information} from '../UI/components';

const GeometryDataController: TController<any> = (
  name: string,
  readonly: boolean,
  options: any,
  object: any,
  onChange: (value: any) => void
) => {
  const data = object[name] as Sein.GeometryData;

  if (!data || !Sein.isGeometryData(data)) {
    return null;
  }

  return (
    <Folder label={name || 'GeometryData'} close={false}>
      <Information label={'type'} value={data.type} />
      <Information label={'memory'} value={`${((data as any).getByteLength() / 1024).toFixed(2)}KB`} />
      <Information label={'size'} value={data.size} />
      <Information label={'count'} value={data.count} />
      {data.offset ? <Information label={'offset'} value={data.offset} /> : null}
      {data.stride ? <Information label={'stride'} value={data.stride} /> : null}
    </Folder>
  );
}

export default GeometryDataController;
