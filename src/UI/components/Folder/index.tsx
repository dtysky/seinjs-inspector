/*
 * @Description: List.tsx
 * @Author: 修雷(lc199444@alibaba-inc.com)
 * @Date: 2019-09-03 16:51:23
 * @LastEditTime: 2019-09-09 17:24:47
 */

import { h, Component } from 'preact';
import './index.scss';
interface IComponentProps {
  label?: string;
  value?: string;
  close?: boolean;
}
interface IComponentState {
  isClose: boolean;
}

export default class Folder extends Component<
  IComponentProps,
  IComponentState
> {
  constructor() {
    super();
    this.setState({
      isClose: true
    });
  }

  componentDidMount() {
    let { close } = this.props;
    if (close === undefined) {
      close = true;
    }
    this.setState({
      isClose: !!close
    });
  }

  private onClick = () => {
    this.setState({
      isClose: !this.state.isClose
    });
  };
  render() {
    const { isClose } = this.state;
    const { label, value } = this.props;
    const iconClassName = `iconfont sein-inspector-folder-icon${
      isClose ? '' : ' close'
    }`;
    const detailClassName = `sein-inspector-folder-detail${
      isClose ? ' close' : ''
    }`;

    return (
      <div className='sein-inspector-component sein-inspector-folder-container'>
        <div className='sein-inspector-folder-content'>
          <div className='sein-inspector-component-box' onClick={this.onClick}>
            <label className='sein-inspector-label' title={label || 'Label'}>
              {label || 'Label'}
            </label>
            {value && (
              <div class='sein-inspector-folder-value' title={value}>
                {value}
              </div>
            )}
            <i className={iconClassName}></i>
          </div>
        </div>
        {this.props.children && (
          <div className={detailClassName}>{this.props.children}</div>
        )}
      </div>
    );
  }
}
