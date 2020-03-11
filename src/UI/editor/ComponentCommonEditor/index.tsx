/**
 * @File   : index.tsx
 * @Author : dtysky (dtysky@outlook.com)
 * @Date   : 3/9/2020, 5:03:55 PM
 * @Description:
 */
import {h, Component, Fragment} from 'preact';
import * as Sein from 'seinjs';

import InspectorActor from '../../../Actor/InspectorActor';
import {Folder} from '../../components';
import CustomPropertiesEditor from '../CustomPropertiesEditor';
import {getController} from '../../../Controllers';

interface IComponentProps {
  actor: InspectorActor;
  object: Sein.Component;
}

interface IComponentState {

}

export default class ComponentCommonEditor extends Component<
  IComponentProps,
  IComponentState
> {
  private handleChange = () => {
    this.forceUpdate();
  }

  public render() {
    return (
      <Fragment>
        {getController('basic')('uuid', true, {}, this.props.object, () => {})}
        {this.renderSceneCommon()}
        {getController('event')('event', true, {}, this.props.object, this.handleChange)}
        <CustomPropertiesEditor {...this.props} />
      </Fragment>
    );
  }

  private renderSceneCommon() {
    if (!Sein.isSceneComponent(this.props.object)) {
      return this.renderCommon();
    }

    /** @todo: bounding box 包括灯光、相机啥的 */
    return (
      <Fragment>
        {getController('basic')('visible', false, {}, this.props.object, this.handleChange)}
        <Folder label={'BaseInfo'}>
          {getController('layers')('layers', false, {}, this.props.object, this.handleChange)}
          {getController('basic')('isStatic', false, {}, this.props.object, this.handleChange)}
          {this.renderCommon()}
          {getController('basic')('needReleaseGlRes', false, {}, this.props.object, this.handleChange)}
        </Folder>
        <Folder label={'Transform'} close={false}>
          {getController('vector')('position', false, {}, this.props.object, this.handleChange)}
          {getController('vector')('rotation', false, {}, this.props.object, this.handleChange)}
          {getController('vector')('scale', false, {}, this.props.object, this.handleChange)}
        </Folder>
      </Fragment>
    )
  }

  private renderCommon() {
    return (
      <Fragment>
        {getController('basic')('needUpdateAndDestroy', false, {}, this.props.object, this.handleChange)}
        {getController('basic')('updateOnEverTick', false, {}, this.props.object, this.handleChange)}
      </Fragment>
    )
  }
}
