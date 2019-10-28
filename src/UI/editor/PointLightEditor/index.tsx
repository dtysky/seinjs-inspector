/*
 * @Description: PointLightComponentEditor.tsx
 * @Author: 修雷(lc199444@alibaba-inc.com)
 * @Date: 2019-09-09 14:52:36
 * @LastEditTime: 2019-10-28 19:04:07
 */

import { h, Component, Fragment } from 'preact';
import './index.scss';
import { ColorPicker, Range, Switch } from '../../components';
import InfoTab from '../InfoTab';
import * as Sein from 'seinjs';
interface IComponentProps {
  component: Sein.PointLightComponent;
}
interface IComponentState {}

export default class PointLightComponentEditor extends Component<
  IComponentProps,
  IComponentState
> {
  private pointLightBox: Sein.BSPBoxActor;
  private pointLightRange: Sein.BSPSphereActor;
  private raf: number;
  private range: number;
  componentDidMount() {
    const { component } = this.props;

    this.pointLightBox = component
      .getWorld()
      .addActor('pointLightBox', Sein.BSPBoxActor, {
        visible: false,
        width: 1,
        height: 1,
        depth: 1,
        position: component.position.clone(),
        material: new Sein.BasicMaterial({
          diffuse: new Sein.Color(1, 0, 0)
        })
      });

    this.range = component.range;
    this.pointLightRange = component
      .getWorld()
      .addActor('pointLightBox', Sein.BSPSphereActor, {
        visible: false,
        radius: component.range,
        position: component.position.clone(),
        widthSegments: 16,
        heightSegments: 16,
        material: new Sein.BasicMaterial({
          wireframe: true,
          lightType: 'NONE',
          shininess: 0,
          diffuse: new Sein.Color(0.6, 0.6, 0.6, 1)
        })
      });

    this.update();
  }
  componentWillUnmount() {
    this.pointLightBox.removeFromParent();
    this.pointLightRange.removeFromParent();
    cancelAnimationFrame(this.raf);
  }
  private onVisibleChange = value => {
    const { component } = this.props;
    component.visible = value;
  };

  private onAmountInput = value => {
    const { component } = this.props;
    component.amount = value;
  };

  private onColorInput = value => {
    const { component } = this.props;
    component.color.fromHEX(value);
  };
  private onPositionXInput = value => {
    const { component } = this.props;
    component.position.x = value;
  };
  private onPositionYInput = value => {
    const { component } = this.props;
    component.position.y = value;
  };
  private onPositionZInput = value => {
    const { component } = this.props;
    component.position.z = value;
  };

  private onRangeInput = value => {
    const { component } = this.props;
    component.range = value;
  };

  private onHelperChange = value => {
    if (value) {
      this.pointLightBox.visible = true;
      this.pointLightRange.visible = true;
    } else {
      this.pointLightBox.visible = false;
      this.pointLightRange.visible = false;
    }
  };

  update() {
    this.raf = requestAnimationFrame(() => {
      this.update();
    });

    const { component } = this.props;
    this.pointLightBox.transform.position = component.position.clone();
    this.pointLightRange.transform.position = component.position.clone();
    const scaleRate = component.range / this.range;
    this.pointLightRange.transform.scale = new Sein.Vector3(
      scaleRate,
      scaleRate,
      scaleRate
    );
  }
  private getPrivate(component) {
    const { amount, color, visible, position, range } = component;
    return (
      <Fragment>
        <Switch
          label='show helper'
          checked={false}
          onCheckedChange={this.onHelperChange}></Switch>

        <Switch
          label='visible'
          checked={visible}
          onCheckedChange={this.onVisibleChange}></Switch>
        <Range
          label={'amount'}
          value={amount}
          min={0}
          max={500}
          step={0.1}
          onRangeInput={this.onAmountInput}
        />
        <ColorPicker
          label='color'
          value={'#' + color.toHEX()}
          onColorInput={this.onColorInput}
        />
        <Range
          label='range'
          value={range}
          min={0}
          max={100}
          step={0.1}
          onRangeInput={this.onRangeInput}
        />
      </Fragment>
    );
  }
  private getTransform(component) {
    const { amount, color, visible, position, range } = component;
    return (
      <Fragment>
        <Range
          label='position.x'
          value={position.x}
          min={-50}
          max={50}
          step={0.1}
          onRangeInput={this.onPositionXInput}
        />
        <Range
          label='position.y'
          value={position.y}
          min={-50}
          max={50}
          step={0.1}
          onRangeInput={this.onPositionYInput}
        />
        <Range
          label='position.z'
          value={position.z}
          min={-50}
          max={50}
          step={0.1}
          onRangeInput={this.onPositionZInput}
        />
      </Fragment>
    );
  }
  render() {
    const { component } = this.props;

    // PointLightComponent类型
    if (!Sein.isPointLightComponent(component)) {
      return null;
    }

    return (
      <InfoTab
        hideGeometry={true}
        hideMaterials={true}
        private={this.getPrivate(component)}
        transform={this.getTransform(component)}></InfoTab>
    );
  }
}
