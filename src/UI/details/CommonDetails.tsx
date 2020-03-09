/**
 * @File   : CommonDetails.tsx
 * @Author : dtysky (dtysky@outlook.com)
 * @Date   : 3/9/2020, 5:21:05 PM
 * @Description:
 */
import * as Sein from 'seinjs';

import InspectorActor from '../../Actor/InspectorActor';
import {getEditor} from '../editor';

export interface IPropTypes {
  actor: InspectorActor;
  object: Sein.SObject;
}

export default function CommonDetails(props: IPropTypes) {
  return getEditor(props.object)(props.actor, props.object);
}
