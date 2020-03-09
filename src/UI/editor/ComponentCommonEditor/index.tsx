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
        {this.renderSceneCommon()}
        <CustomPropertiesEditor {...this.props} />
      </div>
    );
  }

  private renderSceneCommon() {
    if (!Sein.isSceneComponent(this.props.object)) {
      return null;
    }

    const {visible, position, rotation, scale} = this.props.object;

    /** @todo: bounding box 包括灯光、相机啥的 */
    return (
      <div>
        {getController('basic')('visible', visible, false, null, this.props.object, this.handleChange)}
        {getController('vector')('position', position, false, null, this.props.object, this.handleChange)}
        {getController('vector')('rotation', rotation, false, null, this.props.object, this.handleChange)}
        {getController('vector')('scale', scale, false, null, this.props.object, this.handleChange)}
      </div>
    )
  }
}
