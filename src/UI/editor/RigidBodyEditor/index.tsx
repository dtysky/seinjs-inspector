/*
 * @Description: RigidBodyComponentEditor.tsx
 * @Author: 修雷(lc199444@alibaba-inc.com)
 * @Date: 2019-09-09 14:52:36
 * @LastEditTime: 2019-09-17 17:57:39
 */

import { h, Component } from 'preact';
import './index.scss';
import { Range, Switch } from '../../components';
import * as Sein from 'seinjs';
interface IComponentProps {
  component: Sein.RigidBodyComponent;
}
interface IComponentState {}

export default class RigidBodyComponentEditor extends Component<
  IComponentProps,
  IComponentState
> {
  constructor() {
    super();
    this.setState({
      options: []
    });
  }

  componentDidMount() {
    // const { component } = this.props;
  }
  private onSleepChange = value => {
    const { component } = this.props;

    if (!value) {
      component.sleep();
    } else {
      component.wakeUp();
    }
  };
  private onEnAbleChange = value => {
    const { component } = this.props;

    if (value) {
      component.enable();
    } else {
      component.disable();
    }
  };
  private onMassInput = value => {
    const { component } = this.props;

    component.mass = value;
  };
  private onRestitutionInput = value => {
    const { component } = this.props;

    component.restitution = value;
  };
  private onFrictionInput = value => {
    const { component } = this.props;

    component.friction = value;
  };
  render() {
    const { component } = this.props;
    if (component.className.value === 'RigidBodyComponent') {
      // console.log(component);
    }
    // 是否是RigidBodyComponent类型
    if (!Sein.isRigidBodyComponent(component)) {
      return null;
    }

    const { sleep, enable, mass, restitution, friction } = component;
    return (
      <div className='sein-inspector-component sein-inspector-rigidbodyeditor-container'>
        <div className='sein-inspector-rigidbodyeditor-detail'>
          <Switch
            label={'sleep'}
            checked={sleep ? true : false}
            onCheckedChange={this.onSleepChange}
          />

          <Switch
            label={'enable'}
            checked={enable ? true : false}
            onCheckedChange={this.onEnAbleChange}
          />

          <Range
            label={'mass'}
            value={mass}
            min={0}
            max={1}
            step={0.001}
            onRangeInput={this.onMassInput}
          />

          {restitution && (
            <Range
              label={'restitution'}
              value={restitution}
              min={0}
              max={1}
              step={0.001}
              onRangeInput={this.onRestitutionInput}
            />
          )}

          {friction && (
            <Range
              label={'friction'}
              value={friction}
              min={0}
              max={1}
              step={0.001}
              onRangeInput={this.onFrictionInput}
            />
          )}
        </div>
      </div>
    );
  }
}
