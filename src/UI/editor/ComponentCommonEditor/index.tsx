/**
 * @File   : index.tsx
 * @Author : dtysky (dtysky@outlook.com)
 * @Date   : 3/9/2020, 5:03:55 PM
 * @Description:
 */
import {h, Component} from 'preact';
import * as Sein from 'seinjs';

import InspectorActor from '../../../Actor/InspectorActor';
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
      <div>
        {this.renderCommon()}
        <CustomPropertiesEditor {...this.props} />
      </div>
    );
  }

  private renderCommon() {
    if (!Sein.isSceneComponent(this.props.object)) {
      return null;
    }

    /** @todo: bounding box 包括灯光、相机啥的 */
    return (
      <div>
        {getController('basic')('visible', false, null, this.props.object, this.handleChange)}
        {getController('vector')('position', false, null, this.props.object, this.handleChange)}
        {getController('vector')('rotation', false, null, this.props.object, this.handleChange)}
        {getController('vector')('scale', false, null, this.props.object, this.handleChange)}
      </div>
    )
  }
}
