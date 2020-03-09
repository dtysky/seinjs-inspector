/**
 * @File   : index.tsx
 * @Author : dtysky (dtysky@outlook.com)
 * @Date   : 3/9/2020, 4:39:51 PM
 * @Description:
 */
import {h, Component} from 'preact';
import * as Sein from 'seinjs';

import InspectorActor from '../../../Actor/InspectorActor';
import CustomPropertiesEditor from '../CustomPropertiesEditor';

interface IComponentProps {
  actor: InspectorActor;
  object: Sein.Actor;
}

interface IComponentState {

}

export default class ActorCommonEditor extends Component<
  IComponentProps,
  IComponentState
> {
  public render() {
    return (
      <div>
        <CustomPropertiesEditor {...this.props} />
      </div>
    );
  }
}
