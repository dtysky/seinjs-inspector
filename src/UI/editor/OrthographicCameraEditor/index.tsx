/*
 * @Description: OrthographicCameraComponent.tsx
 * @Author: 修雷(lc199444@alibaba-inc.com)
 * @Date: 2019-09-06 15:28:00
 * @LastEditTime: 2019-09-11 16:57:01
 */

import { h, Component } from 'preact';
import './index.scss';
import { Range, Switch } from '../../components';
import * as Sein from 'seinjs';
interface IComponentProps {
  component: Sein.OrthographicCameraComponent;
}
interface IComponentState {}

export default class OrthographicCameraComponentEditor extends Component<
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
  private onNearInput = value => {
    const { component } = this.props;
    component.near = value;
  };

  private onFarInput = value => {
    const { component } = this.props;
    component.far = value;
  };

  private onRightInput = value => {
    const { component } = this.props;
    component.right = value;
  };
  private onLeftInput = value => {
    const { component } = this.props;
    component.left = value;
  };
  private onBottomInput = value => {
    const { component } = this.props;
    component.bottom = value;
  };

  private onTopInput = value => {
    const { component } = this.props;
    component.top = value;
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

    // 是否是CameraComponent类型
    if (!component.isOrthographicCameraComponent) {
      return null;
    }
    const {
      top,
      left,
      right,
      bottom,
      near,
      far,
      x,
      y,
      z,
      scaleX,
      scaleY,
      scaleZ,
      rotationX,
      rotationY,
      rotationZ
    } = component;
    return (
      <div className='sein-inspector-component sein-inspector-oricameraeditor-container'>
        <div className='sein-inspector-oricameraeditor-detail'>
          <Range
            label={'top'}
            value={top}
            min={-100}
            max={100}
            step={0.1}
            onRangeInput={this.onTopInput}
          />

          <Range
            label={'right'}
            value={right}
            min={-100}
            max={100}
            step={0.1}
            onRangeInput={this.onRightInput}
          />
          <Range
            label={'left'}
            value={left}
            min={-100}
            max={100}
            step={0.01}
            onRangeInput={this.onLeftInput}
          />

          <Range
            label={'bottom'}
            value={bottom}
            min={-100}
            max={100}
            step={0.01}
            onRangeInput={this.onBottomInput}
          />

          <Range
            label={'near'}
            value={near}
            min={0}
            max={100}
            step={1}
            onRangeInput={this.onNearInput}
          />
          <Range
            label={'far'}
            value={far}
            min={0}
            max={100}
            step={1}
            onRangeInput={this.onFarInput}
          />
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
