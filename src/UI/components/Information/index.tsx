/**
 * @File   : Game.tsx
 * @Author : dtysky (dtysky@outlook.com)
 * @Date   : 7/28/2019, 3:55:56 PM
 * @Description:
 */
/**
 * tab bar
 */
import { h, Component } from 'preact';
import './index.scss';
interface IComponentProps {
  label?: string;
  // 是否可以点击
  interactive?: boolean;
  // 点击回调
  onTrigger?: Function;
  value: string | number | boolean;
}
interface IComponentState {}

export default class Information extends Component<
  IComponentProps,
  IComponentState
> {
  private onClick = () => {
    const { onTrigger, interactive } = this.props;

    if (onTrigger) {
      onTrigger();
    }
  };

  public render() {
    let { label, value, interactive } = this.props;

    if (typeof value === 'boolean') {
      value = value ? 'True' : 'False';
    }

    return (
      <div className='sein-inspector-component sein-inspector-infomation-container'>
        <div className='sein-inspector-component-box' onClick={this.onClick}>
          <label className='sein-inspector-label' title={label || 'Label'}>
            {label || 'Label'}
          </label>
          <div className='sein-inspector-infomation-value'>{value}</div>
          {interactive && (
            <div className='iconfont sein-inspector-infomation-editable'></div>
          )}
        </div>
      </div>
    );
  }
}
