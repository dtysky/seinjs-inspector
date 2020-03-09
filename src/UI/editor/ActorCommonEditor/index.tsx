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
import {getController} from '../../../Controllers';

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
        {getController('basic')('linked', true, null, this.props.object, () => {})}
        {getController('basic')('tag', true, null, this.props.object, () => {})}
        <CustomPropertiesEditor {...this.props} />
      </div>
    );
  }
}
