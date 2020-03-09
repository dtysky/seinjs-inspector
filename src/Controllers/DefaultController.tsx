/**
 * @File   : DefaultController.tsx
 * @Author : dtysky (dtysky@outlook.com)
 * @Date   : 3/9/2020, 4:56:07 PM
 * @Description:
 */
import * as Sein from 'seinjs';
import {h, Fragment} from 'preact';

import Text from '../UI/components/Text';
import {TController} from '../types';

const DefaultController: TController<any> = (
  name: string,
  readonly: boolean,
  options: any,
  object: Sein.SObject,
  onChange: (value: any) => void
) => {
  return (
    <div>Invalid Type</div>
  );
}

export default DefaultController;
