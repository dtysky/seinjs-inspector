/*
 * @Description: SpotLightComponentEditor.tsx
 * @Author: 修雷(lc199444@alibaba-inc.com)
 * @Date: 2019-09-09 14:52:36
 * @LastEditTime: 2019-09-19 20:16:29
 */

import { h, Component } from 'preact';
import './index.scss';
import { ColorPicker, Range, Switch } from '../../components';
import * as Sein from 'seinjs';

import { BSPCircleComponent, BSPLineComponent } from '../../utils/utils';
interface IComponentProps {
  component: Sein.SpotLightComponent;
}
interface IComponentState {}

interface IStateTypes extends Sein.ISceneComponentState {
  range: number;
  cutoff: number;
  outerCutoff: number;
}

class SpotLightModelActor extends Sein.SceneActor<IStateTypes> {
  public onAdd(initState: IStateTypes) {
    const { range, cutoff, outerCutoff } = initState;
    const start = new Sein.Vector3(0, 0, 0);
    const end = new Sein.Vector3(0, range, 0);
    const color = new Sein.Color(1, 1, 1);
    const color1 = new Sein.Color(0.3, 0.3, 0.3);
    const innerRadius = Math.tan(Sein.degToRad(cutoff)) * range;
    const outerRadius = Math.tan(Sein.degToRad(outerCutoff)) * range;

    this.addComponent('Box', Sein.BSPBoxComponent, {
      width: 1,
      height: 1,
      depth: 1,
      material: new Sein.BasicMaterial({
        lightType: 'NONE',
        shininess: 0,
        diffuse: color
      })
    });
    this.addComponent('InnerRange', BSPCircleComponent, {
      radius: innerRadius,
      radialSegments: 32,
      position: end,
      material: new Sein.BasicMaterial({
        lightType: 'NONE',
        shininess: 0,
        diffuse: color
      })
    });
    this.addComponent('OuterRange', BSPCircleComponent, {
      radius: outerRadius,
      radialSegments: 32,
      position: end,
      material: new Sein.BasicMaterial({
        lightType: 'NONE',
        shininess: 0,
        diffuse: color1
      })
    });
    this.addComponent('Line1', BSPLineComponent, {
      PointA: start,
      PointB: new Sein.Vector3(innerRadius, range, 0),
      material: new Sein.BasicMaterial({
        lightType: 'NONE',
        shininess: 0,
        diffuse: color
      })
    });
    this.addComponent('Line2', BSPLineComponent, {
      PointA: start,
      PointB: new Sein.Vector3(-innerRadius, range, 0),
      material: new Sein.BasicMaterial({
        lightType: 'NONE',
        shininess: 0,
        diffuse: color
      })
    });
    this.addComponent('Line3', BSPLineComponent, {
      PointA: start,
      PointB: new Sein.Vector3(0, range, innerRadius),
      material: new Sein.BasicMaterial({
        lightType: 'NONE',
        shininess: 0,
        diffuse: color
      })
    });
    this.addComponent('Line4', BSPLineComponent, {
      PointA: start,
      PointB: new Sein.Vector3(0, range, -innerRadius),
      material: new Sein.BasicMaterial({
        lightType: 'NONE',
        shininess: 0,
        diffuse: color
      })
    });
    this.addComponent('Line5', BSPLineComponent, {
      PointA: start,
      PointB: new Sein.Vector3(outerRadius, range, 0),
      material: new Sein.BasicMaterial({
        lightType: 'NONE',
        shininess: 0,
        diffuse: color1
      })
    });
    this.addComponent('Line6', BSPLineComponent, {
      PointA: start,
      PointB: new Sein.Vector3(-outerRadius, range, 0),
      material: new Sein.BasicMaterial({
        lightType: 'NONE',
        shininess: 0,
        diffuse: color1
      })
    });
    this.addComponent('Line7', BSPLineComponent, {
      PointA: start,
      PointB: new Sein.Vector3(0, range, outerRadius),
      material: new Sein.BasicMaterial({
        lightType: 'NONE',
        shininess: 0,
        diffuse: color1
      })
    });
    this.addComponent('Line8', BSPLineComponent, {
      PointA: start,
      PointB: new Sein.Vector3(0, range, -outerRadius),
      material: new Sein.BasicMaterial({
        lightType: 'NONE',
        shininess: 0,
        diffuse: color1
      })
    });
  }

  public reset(range: number, cutoff: number, outerCutoff: number) {
    const start = new Sein.Vector3(0, 0, 0);
    const end = new Sein.Vector3(0, range, 0);
    const innerRadius = Math.tan(Sein.degToRad(cutoff)) * range;
    const outerRadius = Math.tan(Sein.degToRad(outerCutoff)) * range;

    const innerRange = this.findComponentByName<BSPCircleComponent>(
      'InnerRange'
    );
    innerRange.setRadius(innerRadius, 32);
    innerRange.position = end;

    const outerRange = this.findComponentByName<BSPCircleComponent>(
      'OuterRange'
    );
    outerRange.setRadius(outerRadius, 32);
    outerRange.position = end;

    this.findComponentByName<BSPLineComponent>('Line1').setVertices(
      start,
      new Sein.Vector3(innerRadius, range, 0)
    );
    this.findComponentByName<BSPLineComponent>('Line2').setVertices(
      start,
      new Sein.Vector3(-innerRadius, range, 0)
    );
    this.findComponentByName<BSPLineComponent>('Line3').setVertices(
      start,
      new Sein.Vector3(0, range, innerRadius)
    );
    this.findComponentByName<BSPLineComponent>('Line4').setVertices(
      start,
      new Sein.Vector3(0, range, -innerRadius)
    );

    this.findComponentByName<BSPLineComponent>('Line5').setVertices(
      start,
      new Sein.Vector3(outerRadius, range, 0)
    );
    this.findComponentByName<BSPLineComponent>('Line6').setVertices(
      start,
      new Sein.Vector3(-outerRadius, range, 0)
    );
    this.findComponentByName<BSPLineComponent>('Line7').setVertices(
      start,
      new Sein.Vector3(0, range, outerRadius)
    );
    this.findComponentByName<BSPLineComponent>('Line8').setVertices(
      start,
      new Sein.Vector3(0, range, -outerRadius)
    );
  }
  public onDestroy() {

  }
}
export default class SpotLightComponentEditor extends Component<
  IComponentProps,
  IComponentState
> {
  private lightModeActor: SpotLightModelActor;
  componentDidMount() {
    const { component } = this.props;
    const { range, cutoff, outerCutoff } = component;
    this.lightModeActor = component
      .getWorld()
      .addActor('SpotLightModelActor', SpotLightModelActor, {
        visible: false,
        range,
        cutoff,
        outerCutoff
      });

    this.update();
  }
  componentWillUnmount() {
    this.lightModeActor.removeFromParent();
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
    this.update();
  };
  private onPositionYInput = value => {
    const { component } = this.props;
    component.position.y = value;
    this.update();
  };
  private onPositionZInput = value => {
    const { component } = this.props;
    component.position.z = value;
    this.update();
  };
  private onDirectionXInput = value => {
    const { component } = this.props;
    component.direction.x = value;
    this.update();
  };
  private onDirectionYInput = value => {
    const { component } = this.props;
    component.direction.y = value;
    this.update();
  };
  private onDirectionZInput = value => {
    const { component } = this.props;
    // console.log(value);

    component.direction.z = value;
    this.update();
  };

  private onRangeInput = value => {
    const { component } = this.props;
    component.range = value;
    this.update();
  };

  private onHelperChange = value => {
    this.lightModeActor.visible = value;
  };

  private onCutoffInput = value => {
    const { component } = this.props;
    component.cutoff = value;
    this.update();
  };
  private onOuterCutoffInput = value => {
    const { component } = this.props;
    component.outerCutoff = value;
    this.update();
  };
  update() {
    const { component } = this.props;
    const { range, cutoff, outerCutoff } = component;
    this.lightModeActor.transform.position = component.position.clone();
    this.lightModeActor.reset(range, cutoff, outerCutoff);

    const upVector = new Sein.Vector3(0, 1, 0);
    const direction = component.direction.clone();

    const angle = Math.acos(
      upVector.dot(direction) / (upVector.length() * direction.length())
    );

    const axis = upVector
      .clone()
      .cross(direction)
      .normalize();

    this.lightModeActor.transform.rotationX = 0;
    this.lightModeActor.transform.rotationY = 0;
    this.lightModeActor.transform.rotationZ = 0;
    this.lightModeActor.transform.rotate(axis, angle);
  }
  render() {
    const { component } = this.props;

    // SpotLightComponent类型
    if (!Sein.isSpotLightComponent(component)) {
      return null;
    }

    const {
      amount,
      color,
      visible,
      position,
      range,
      direction,
      outerCutoff,
      cutoff
    } = component;
    return (
      <div className='sein-inspector-component sein-inspector-spotditor-container'>
        <div className='sein-inspector-spotditor-detail'>
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
          <Range
            label='range'
            value={range}
            min={0}
            max={100}
            step={0.1}
            onRangeInput={this.onRangeInput}
          />
          <Range
            label='cutoff 无效？'
            value={cutoff}
            min={0}
            max={100}
            step={0.1}
            onRangeInput={this.onCutoffInput}
          />

          <Range
            label='outerCutoff 无效？'
            value={outerCutoff}
            min={0}
            max={100}
            step={0.1}
            onRangeInput={this.onOuterCutoffInput}
          />
        </div>
      </div>
    );
  }
}
