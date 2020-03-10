/**
 * @File   : VectorController.tsx
 * @Author : dtysky (dtysky@outlook.com)
 * @Date   : 3/6/2020, 2:17:34 PM
 * @Description:
 */
import * as Sein from 'seinjs';
import {h, Fragment} from 'preact';

import Text from '../UI/components/Text';
import {TController} from '../types';

type TVectorValue = Sein.Vector2 | Sein.Vector3 | Sein.Vector4 | Sein.Euler | Sein.Quaternion;

function RenderOne(value: TVectorValue, key: string, readonly: boolean, onChange: (value: TVectorValue) => void) {
  return (
    <Text
      prefix={key}
      value={value[key]}
      type={'float'}
      view={'box'}
      onChange={(_, v) => {
        value[key] = v;
        onChange(value);
      }}
      disabled={readonly}
    />
  );
}

const VectorController: TController<TVectorValue> = (
  name: string,
  readonly: boolean,
  options: any,
  object: Sein.SObject,
  onChange: (value: TVectorValue) => void
) => {
  const value = object[name];

  return (
    <div className={'sein-controller-vector'}>
      <div className={'sein-controller-vector-name'}>{name}</div>
      <div className={'sein-controller-vector-content'}>
      {
        Sein.isVector2(value) && (
          <Fragment>
            {RenderOne(value, 'x', readonly, onChange)}
            {RenderOne(value, 'y', readonly, onChange)}
          </Fragment>
        )
      }
      {
        (Sein.isVector3(value) || Sein.isEuler(value)) && (
          <Fragment>
            {RenderOne(value, 'x', readonly, onChange)}
            {RenderOne(value, 'y', readonly, onChange)}
            {RenderOne(value, 'z', readonly, onChange)}
          </Fragment>
        )
      }
      {
        (Sein.isVector4(value) || Sein.isQuaternion(value)) && (
          <Fragment>
            {RenderOne(value, 'x', readonly, onChange)}
            {RenderOne(value, 'y', readonly, onChange)}
            {RenderOne(value, 'z', readonly, onChange)}
            {RenderOne(value, 'w', readonly, onChange)}
          </Fragment>
        )
      }
      </div>
    </div>
  )
}

export default VectorController;
