/**
 * @File   : index.tsx
 * @Author : dtysky (dtysky@outlook.com)
 * @Date   : 3/9/2020, 4:39:51 PM
 * @Description:
 */
import {h, Component, Fragment} from 'preact';
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
      <Fragment>
        {getController('basic')('linked', true, {}, this.props.object, () => {})}
        {getController('basic')('tag', true, {}, this.props.object, () => {})}
        {Sein.isSceneActor(this.props.object) && getController('basic')('persistent', false, {}, this.props.object, () => {})}
        {getController('event')('event', true, {}, this.props.object, () => {})}
        <CustomPropertiesEditor {...this.props} />
      </Fragment>
    );
  }
}
