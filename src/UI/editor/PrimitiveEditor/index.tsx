/*
 * @Description: PrimitiveComponentEditor.tsx
 * @Author: 修雷(lc199444@alibaba-inc.com)
 * @Date: 2019-09-06 15:28:00
 * @LastEditTime: 2019-10-28 19:42:51
 */

import { h, Component, Fragment } from 'preact';
import { Information } from '../../components';
import * as Sein from 'seinjs';
import StaticMeshComponentEditor from './StaticMeshComponentEditor';
import Hilo3d from 'seinjs/Core/Hilo3d';
import Infomation from '../../components/Information';
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

  private getBoxDetail(component: Sein.BSPBoxComponent) {
    const { geometry } = component;

    const {
      width,
      height,
      depth,
      widthSegments,
      heightSegments,
      depthSegments
    } = geometry as Hilo3d.BoxGeometry;

    return (
      <StaticMeshComponentEditor
        component={component}
        hidePrivate={true}
        geometry={
          <Fragment>
            {this._info('width', width)}
            {this._info('height', height)}
            {this._info('depth', depth)}
            {this._info('widthSegments', widthSegments)}
            {this._info('heightSegments', heightSegments)}
            {this._info('depthSegments', depthSegments)}
          </Fragment>
        }></StaticMeshComponentEditor>
    );
  }
  private getPlaneDetail(component: Sein.BSPPlaneComponent) {
    const { geometry } = component;

    const {
      width,
      height,
      widthSegments,
      heightSegments
    } = geometry as Hilo3d.PlaneGeometry;

    return (
      <StaticMeshComponentEditor
        component={component}
        hidePrivate={true}
        geometry={
          <Fragment>
            <Information label='width' value={width}></Information>
            <Information label='height' value={height}></Information>
            <Information
              label='widthSegments'
              value={widthSegments}></Information>
            <Information
              label='heightSegments'
              value={heightSegments}></Information>
          </Fragment>
        }></StaticMeshComponentEditor>
    );
  }
  private getMorphDetail(component: Sein.BSPMorphComponent) {
    const { geometry } = component;
    // 展示些什么
    // const { weights, targets } = geometry as Hilo3d.MorphGeometry;

    return (
      <StaticMeshComponentEditor
        component={component}
        hidePrivate={true}
        geometry={
          <Fragment>
            {/* {this._info('radius', radius)}
            {this._info('widthSegments', widthSegments)}
            {this._info('heightSegments', heightSegments)} */}
          </Fragment>
        }></StaticMeshComponentEditor>
    );
  }
  private getSphereDetail(component: Sein.BSPSphereComponent) {
    const { geometry } = component;
    const {
      radius,
      widthSegments,
      heightSegments
    } = geometry as Hilo3d.SphereGeometry;

    return (
      <StaticMeshComponentEditor
        component={component}
        hidePrivate={true}
        geometry={
          <Fragment>
            {this._info('radius', radius)}
            {this._info('widthSegments', widthSegments)}
            {this._info('heightSegments', heightSegments)}
          </Fragment>
        }></StaticMeshComponentEditor>
    );
  }
  private getCylinderGeometry(component) {
    const { geometry } = component;
    const {
      radiusTop,
      radiusBottom,
      height,
      radialSegments,
      heightSegments,
      openEnded,
      thetaStart,
      thetaLength
    } = geometry as any;

    return (
      <Fragment>
        {this._info('radiusTop', radiusTop)}
        {this._info('radiusBottom', radiusBottom)}
        {this._info('height', height)}
        {this._info('radialSegments', radialSegments)}
        {this._info('heightSegments', heightSegments)}
        {this._info('openEnded', openEnded)}
        {this._info('thetaStart', thetaStart)}
        {this._info('thetaLength', thetaLength)}
      </Fragment>
    );
  }

  private getCylinderDetail(component: Sein.BSPCylinderComponent) {
    return (
      <StaticMeshComponentEditor
        component={component}
        hidePrivate={true}
        geometry={this.getCylinderGeometry(
          component
        )}></StaticMeshComponentEditor>
    );
  }
  private _info(label, value) {
    if (value !== undefined) {
      return <Infomation label={label} value={value}></Infomation>;
    } else {
      return null;
    }
  }
  render() {
    const { component } = this.props;

    // 是否是PrimitiveComponent类型
    if (!Sein.isPrimitiveComponent(component)) {
      return null;
    }

    if (Sein.isBSPBoxComponent(component)) {
      return this.getBoxDetail(component as Sein.BSPBoxComponent);
    } else if (Sein.isBSPPlaneComponent(component)) {
      return this.getPlaneDetail(component as Sein.BSPPlaneComponent);
    } else if (Sein.isBSPMorphComponent(component)) {
      return this.getMorphDetail(component as Sein.BSPMorphComponent);
    } else if (Sein.isBSPSphereComponent(component)) {
      return this.getSphereDetail(component as Sein.BSPSphereComponent);
    } else if (Sein.isBSPCylinderComponent(component)) {
      return this.getCylinderDetail(component as Sein.BSPCylinderComponent);
    } else if (Sein.isStaticMeshComponent(component)) {
      return (
        <StaticMeshComponentEditor
          component={
            component as Sein.StaticMeshComponent
          }></StaticMeshComponentEditor>
      );
    }
  }
}
