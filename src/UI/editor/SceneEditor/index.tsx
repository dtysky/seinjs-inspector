/*
 * @Description: SceneComponentEditor.tsx
 * @Author: 修雷(lc199444@alibaba-inc.com)
 * @Date: 2019-09-06 15:28:00
 * @LastEditTime: 2019-10-23 11:47:55
 */

import { h, Component } from 'preact';
import './index.scss';
import { Range, Switch, Folder } from '../../components';
import * as Sein from 'seinjs';
interface IComponentProps {
  component: Sein.SceneComponent;
}
interface IComponentState {}

export default class SceneComponentEditor extends Component<
  IComponentProps,
  IComponentState
> {
  constructor() {
    super();
  }

  componentDidMount() {}
  private onXRangeInput = value => {
    const { component } = this.props;
    component.position.x = value;
  };
  private onYRangeInput = value => {
    const { component } = this.props;
    component.position.y = value;
  };
  private onZRangeInput = value => {
    const { component } = this.props;
    component.position.z = value;
  };
  private onScaleXInput = value => {
    const { component } = this.props;
    component.scaleX = value;
  };
  private onScaleYInput = value => {
    const { component } = this.props;
    component.scaleY = value;
  };
  private onScaleZInput = value => {
    const { component } = this.props;
    component.scaleZ = value;
  };

  private onRotationXInput = value => {
    const { component } = this.props;
    component.rotationX = Sein.degToRad(value);
  };
  private onRotationYInput = value => {
    const { component } = this.props;
    component.rotationY = Sein.degToRad(value);
  };
  private onRotationZInput = value => {
    const { component } = this.props;
    component.rotationZ = Sein.degToRad(value);
  };
  private onCheckedChange = visible => {
    // console.log(visible);
    const { component } = this.props;
    component.visible = visible;
  };
  render() {
    const { component } = this.props;
    // console.log(component);

    // 是否是SceneComponent类型
    if (!Sein.isSceneComponent(component)) {
      return null;
    }
    const {
      x,
      y,
      z,
      visible,
      scaleX,
      scaleY,
      scaleZ,
      rotationX,
      rotationY,
      rotationZ
    } = component;
    return (
      <div className='sein-inspector-component sein-inspector-sceditor-container'>
        <div className='sein-inspector-sceditor-detail'>
          <Switch
            label={'visible'}
            checked={visible}
            onCheckedChange={this.onCheckedChange}
          />
          {/* <div className='sein-inspector-detail-title'>Transform</div> */}
          <Range
            label={'position.x'}
            value={x}
            min={-20}
            max={20}
            step={0.01}
            onRangeInput={this.onXRangeInput}
          />

          <Range
            label={'position.y'}
            value={y}
            min={-20}
            max={20}
            step={0.01}
            onRangeInput={this.onYRangeInput}
          />

          <Range
            label={'positin.z'}
            value={z}
            min={-20}
            max={20}
            step={0.01}
            onRangeInput={this.onZRangeInput}
          />
          <Range
            label={'scaleX'}
            value={scaleX}
            min={0}
            max={3}
            step={0.01}
            onRangeInput={this.onScaleXInput}
          />
          <Range
            label={'scaleY'}
            value={scaleY}
            min={0}
            max={3}
            step={0.01}
            onRangeInput={this.onScaleYInput}
          />
          <Range
            label={'scaleZ'}
            value={scaleZ}
            min={0}
            max={3}
            step={0.01}
            onRangeInput={this.onScaleZInput}
          />

          <Range
            label={'rotationX'}
            value={rotationX}
            min={-180}
            max={180}
            step={0.01}
            onRangeInput={this.onRotationXInput}
          />
          <Range
            label={'rotationY'}
            value={rotationY}
            min={-180}
            max={180}
            step={0.01}
            onRangeInput={this.onRotationYInput}
          />
          <Range
            label={'rotationZ'}
            value={rotationZ}
            min={-180}
            max={180}
            step={0.01}
            onRangeInput={this.onRotationZInput}
          />
        </div>
      </div>
    );
  }
}
