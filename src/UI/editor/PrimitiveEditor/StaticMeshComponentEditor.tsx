/*
 * @Description: StaticMeshComponentEditor.tsx
 * @Author: 修雷(lc199444@alibaba-inc.com)
 * @Date: 2019-09-06 15:28:00
 * @LastEditTime: 2019-10-28 18:57:37
 */

import { h, Component, Fragment } from 'preact';
import './index.scss';
import { Range, Switch, Folder, Information, Tab } from '../../components';
import * as Sein from 'seinjs';
import InfoTab from '../InfoTab';
interface IComponentProps {
  component: Sein.StaticMeshComponent;
  private?: h.JSX.Element;
  geometry?: h.JSX.Element;
  materials?: h.JSX.Element;
  transfom?: h.JSX.Element;

  hidePrivate?: boolean;
  hideGeometry?: boolean;
  hideMaterials?: boolean;
  hideTransform?: boolean;
}
interface IComponentState {
  detailTabId: number;
}

export default class StaticMeshComponentEditor extends Component<
  IComponentProps,
  IComponentState
> {
  constructor() {
    super();
    this.setState({
      detailTabId: 1
    });
  }

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
  private getTransform() {
    const { component } = this.props;
    const {
      x,
      y,
      z,
      scaleX,
      scaleY,
      scaleZ,
      rotationX,
      rotationY,
      rotationZ,
      visible
    } = component;
    return (
      <Fragment>
        <Switch
          label={'visible'}
          checked={visible}
          onCheckedChange={this.onCheckedChange}
        />
        {this.props.geometry}

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
      </Fragment>
    );
  }
  private getPrivate() {
    const { component } = this.props;

    return <Fragment>{this.props.private}</Fragment>;
  }
  private getMaterials() {
    return (
      <Fragment>
        <Folder label='attributes'>{this.getAttributes()}</Folder>
        <Folder label='uniforms'>{this.getUniforms()}</Folder>
        {this.props.materials}
      </Fragment>
    );
  }
  private getGeometry() {
    const { component } = this.props;
    const { geometry } = component;
    const { currentIndicesCount, currentVerticesCount } = geometry as any;
    return (
      <Fragment>
        <Information
          label='currentIndicesCount'
          value={currentIndicesCount}></Information>
        <Information
          label='currentIndicesCount'
          value={currentVerticesCount}></Information>
        {this.props.geometry}
      </Fragment>
    );
  }

  render() {
    const {
      component,
      hidePrivate,
      hideGeometry,
      hideMaterials,
      hideTransform
    } = this.props;

    // 是否是StaticMeshComponent类型
    if (!Sein.isStaticMeshComponent(component)) {
      return null;
    }

    return (
      <InfoTab
        hidePrivate={hidePrivate}
        hideGeometry={hideGeometry}
        hideMaterials={hideMaterials}
        hideTransform={hideTransform}
        private={this.getPrivate()}
        geometry={this.getGeometry()}
        materials={this.getMaterials()}
        transform={this.getTransform()}></InfoTab>
    );
  }
}
