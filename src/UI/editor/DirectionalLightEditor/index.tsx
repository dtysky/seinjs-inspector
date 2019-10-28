/*
 * @Description: DirectionalLightComponentEditor.tsx
 * @Author: 修雷(lc199444@alibaba-inc.com)
 * @Date: 2019-09-09 14:52:36
 * @LastEditTime: 2019-10-28 18:59:41
 */

import { h, Component, Fragment } from 'preact';
import './index.scss';
import { ColorPicker, Range, Switch } from '../../components';
import InfoTab from '../InfoTab';
import * as Sein from 'seinjs';
import { BSPLineComponent } from '../../utils/utils';
interface IComponentProps {
  component: Sein.DirectionalLightComponent;
}
interface IComponentState {
  showHelper: boolean;
}
interface IStateTypes extends Sein.ISceneComponentState {
  direction: Sein.Vector3;
  length: number;
}
class DirectionalLightModelActor extends Sein.SceneActor<IStateTypes> {
  private plane: Sein.BSPPlaneComponent;
  private line: BSPLineComponent;
  public onAdd(initState: IStateTypes) {
    const { direction, length } = initState;
    const start = direction
      .clone()
      .negate()

      .scale(length);
    const end = new Sein.Vector3(0, 0, 0);
    const color = new Sein.Color(1, 1, 1);
    this.plane = this.addComponent('Plane', Sein.BSPPlaneComponent, {
      width: 6,
      height: 6,
      position: start,
      material: new Sein.BasicMaterial({
        diffuse: color,
        wireframe: true,
        lightType: 'NONE',
        shininess: 0
      })
    });
    this.plane.lookAt(end);
    this.line = this.addComponent('Line', BSPLineComponent, {
      PointA: start,
      PointB: end,
      material: new Sein.BasicMaterial({
        diffuse: color,
        wireframe: true,
        lightType: 'NONE',
        shininess: 0
      })
    });
  }
  public setDirection(direction: Sein.Vector3, length: number = 20) {
    const start = direction
      .clone()
      .negate()
      .scale(length);
    const end = new Sein.Vector3(0, 0, 0);

    this.plane.position.copy(start);
    this.plane.lookAt(end);

    this.line.setVertices(start, end);
  }
}
export default class DirectionalLightComponentEditor extends Component<
  IComponentProps,
  IComponentState
> {
  private lightLine: DirectionalLightModelActor;
  cross: Sein.Vector3;
  curAngle: number = 0;
  constructor() {
    super();

    this.setState({
      showHelper: false
    });
  }
  componentDidMount() {
    const { component } = this.props;
    this.lightLine = component
      .getWorld()
      .addActor('DirectionLightModelActor', DirectionalLightModelActor, {
        visible: false,
        direction: component.direction,
        length: 20
      });
  }
  componentWillUnmount() {}

  private updateDirection() {
    const { component } = this.props;
    this.lightLine.setDirection(component.direction);
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
  private onDirectionXInput = value => {
    const { component } = this.props;
    component.direction.x = value;
    this.updateDirection();
  };
  private onDirectionYInput = value => {
    const { component } = this.props;
    component.direction.y = value;
    this.updateDirection();
  };
  private onDirectionZInput = value => {
    const { component } = this.props;
    component.direction.z = value;
    this.updateDirection();
  };

  private onShowHelperChange = value => {
    this.lightLine.visible = value;
  };

  private getPrivate(component) {
    const { amount, color, visible } = component;
    const { showHelper } = this.state;
    return (
      <Fragment>
        <Switch
          label='show helper'
          checked={showHelper}
          onCheckedChange={this.onShowHelperChange}></Switch>
        <Switch
          label='visible'
          checked={visible}
          onCheckedChange={this.onVisibleChange}></Switch>
        <Range
          label={'amount'}
          value={amount}
          min={0}
          max={10}
          step={0.1}
          onRangeInput={this.onAmountInput}
        />
        <ColorPicker
          label='color'
          value={'#' + color.toHEX()}
          onColorInput={this.onColorInput}
        />
      </Fragment>
    );
  }
  private getTransform(component) {
    const { direction } = component;
    return (
      <Fragment>
        <Range
          label='direction.x'
          value={direction.x}
          min={-1}
          max={1}
          step={0.001}
          onRangeInput={this.onDirectionXInput}
        />
        <Range
          label='direction.y'
          value={direction.y}
          min={-1}
          max={1}
          step={0.001}
          onRangeInput={this.onDirectionYInput}
        />
        <Range
          label='direction.z'
          value={direction.z}
          min={-1}
          max={1}
          step={0.001}
          onRangeInput={this.onDirectionZInput}
        />
      </Fragment>
    );
  }
  render() {
    const { component } = this.props;
    // 是否是DirectionalLightComponent类型
    if (!Sein.isDirectionalLightComponent(component)) {
      return null;
    }

    return (
      <InfoTab
        hideMaterials={true}
        hideGeometry={true}
        private={this.getPrivate(component)}
        transform={this.getTransform(component)}></InfoTab>
    );
  }
}
