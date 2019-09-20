/*
 * @Description: SphereColliderComponentEditor.tsx
 * @Author: 修雷(lc199444@alibaba-inc.com)
 * @Date: 2019-09-09 14:52:36
 * @LastEditTime: 2019-09-11 14:44:40
 */

import { h, Component } from 'preact';
import './index.scss';
import { Range, Switch } from '../../components';
import * as Sein from 'seinjs';
interface IComponentProps {
  component: Sein.SphereColliderComponent;
}
interface IComponentState {}

export default class SphereColliderComponentEditor extends Component<
  IComponentProps,
  IComponentState
> {
  private colliderShape: Sein.BSPSphereActor;
  private raf: number;
  constructor() {
    super();
    this.setState({
      options: []
    });
  }

  componentDidMount() {
    const { component } = this.props;
    const box = component.getOwner().root as Sein.BSPSphereComponent;
    const { radius } = component.initState;
    this.colliderShape = component
      .getWorld()
      .addActor('boxEditor', Sein.BSPSphereActor, {
        radius: radius,
        position: box.position.clone(),
        visible: false,
        material: new Sein.BasicMaterial({
          wireframe: true,
          diffuse: new Sein.Color(1, 0, 0)
        })
      });

    this.update();
  }
  update() {
    this.raf = requestAnimationFrame(() => {
      this.update();
    });

    const { component } = this.props;
    const box = component.getOwner().root as Sein.BSPSphereComponent;
    const { rotation, scale, position } = box;
    // console.log(rotation, scale, position);
    this.colliderShape.transform.rotation = rotation.clone();
    this.colliderShape.transform.scale = scale.clone();
    this.colliderShape.transform.position = position.clone();
  }
  componentWillUnmount() {
    this.colliderShape.removeFromParent();
    cancelAnimationFrame(this.raf);
  }
  private onVisibleChange = value => {
    const { component } = this.props;
    console.log(component.getOwner());
    this.colliderShape.visible = value;
  };
  render() {
    const { component } = this.props;
    // 是否是SphereColliderComponent类型
    if (!Sein.isSphereColliderComponent(component)) {
      return null;
    }

    return (
      <div className='sein-inspector-component sein-inspector-boxcollidereditor-container'>
        <div className='sein-inspector-boxcollidereditor-detail'>
          <Switch
            label={'是否显示'}
            checked={false}
            onCheckedChange={this.onVisibleChange}
          />
        </div>
      </div>
    );
  }
}
