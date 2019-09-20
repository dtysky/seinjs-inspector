/*
 * @Description: AmbientLightComponentEditor.tsx
 * @Author: 修雷(lc199444@alibaba-inc.com)
 * @Date: 2019-09-09 14:52:36
 * @LastEditTime: 2019-09-11 21:12:24
 */

import { h, Component } from 'preact';
import './index.scss';
import { ColorPicker, Range, Switch } from '../../components';
import * as Sein from 'seinjs';
interface IComponentProps {
  component: Sein.AmbientLightComponent;
}
interface IComponentState {}

export default class AmbientLightComponentEditor extends Component<
  IComponentProps,
  IComponentState
> {
  componentDidMount() {}
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

  render() {
    const { component } = this.props;

    // 是否是AmbientLightComponent类型
    if (!Sein.isAmbientLightComponent(component)) {
      return null;
    }

    const { amount, color, visible } = component;
    return (
      <div className='sein-inspector-component sein-inspector-ambienteditor-container'>
        <div className='sein-inspector-ambienteditor-detail'>
          <Switch
            label='visible'
            checked={visible}
            onCheckedChange={this.onVisibleChange}></Switch>
          <Range
            label={'amount'}
            value={amount}
            min={0}
            max={3}
            step={0.01}
            onRangeInput={this.onAmountInput}
          />
          <ColorPicker
            label='color'
            value={'#' + color.toHEX()}
            onColorInput={this.onColorInput}
          />
        </div>
      </div>
    );
  }
}
