/*
 * @Description: PrimitiveComponentEditor.tsx
 * @Author: 修雷(lc199444@alibaba-inc.com)
 * @Date: 2019-09-06 15:28:00
 * @LastEditTime: 2019-10-28 11:17:30
 */

import { h, Component, Fragment } from 'preact';
import './index.scss';
import { Range, Switch, Folder, Information, Tab } from '../../components';
import * as Sein from 'seinjs';
interface IComponentProps {
  component: Sein.PrimitiveComponent;
}
interface IComponentState {}

export default class PrimitiveComponentEditor extends Component<
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
  private getAttributes = () => {
    const { material } = this.props.component;

    const { attributes } = material;

    const rs = [];

    for (const key in attributes) {
      if (attributes.hasOwnProperty(key)) {
        const element = attributes[key];
        rs.push(<Information label={key} value={element}></Information>);
      }
    }
    return rs;
  };
  private getUniforms = () => {
    const { material } = this.props.component;

    const { uniforms } = material;

    const rs = [];

    for (const key in uniforms) {
      if (uniforms.hasOwnProperty(key)) {
        const element = uniforms[key];
        rs.push(<Information label={key} value={element}></Information>);
      }
    }
    return rs;
  };
  render() {
    const { component } = this.props;

    // 是否是PrimitiveComponent类型
    if (!Sein.isPrimitiveComponent(component)) {
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
      rotationZ,
      material
    } = component;

    const tabItem = [
      {
        id: 1,
        text: 'Transform'
      },
      {
        id: 2,
        text: 'Self'
      },
      {
        id: 3,
        text: 'Geomerty'
      },
      {
        id: 4,
        text: 'Materials'
      }
    ];
    return (
      <div className='sein-inspector-component sein-inspector-primitiveeditor-container'>
        <div className='sein-inspector-primitiveeditor-detail'>
          <Tab
            data={tabItem}
            showIcon={false}
            onTabChange={id => {
              console.log(id);
            }}></Tab>
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

          <Folder label='material'>
            <Folder label='attributes'>{this.getAttributes()}</Folder>
            <Folder label='uniforms'>{this.getUniforms()}</Folder>
          </Folder>
        </div>
      </div>
    );
  }
}
