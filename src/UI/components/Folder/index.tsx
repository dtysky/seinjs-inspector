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
  onTrigger?: (closed: boolean) => void;
  onDestroy?: () => void;
}
interface IComponentState {
  isClose: boolean;
}

export default class Folder extends Component<
  IComponentProps,
  IComponentState
> {
  public state: IComponentState = {
    isClose: true
  };

  public componentDidMount() {
    let { close } = this.props;
    if (close === undefined) {
      close = true;
    }
    this.setState({
      isClose: !!close
    });
  }

  public componentWillMount() {
    this.props.onDestroy && this.props.onDestroy();
  }

  private onClick = () => {
    const { onTrigger } = this.props;
    const isClose = !this.state.isClose;

    this.setState({isClose});

    onTrigger && onTrigger(isClose);
  };

  public render() {
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
        {!this.state.isClose && this.props.children && (
          <div className={detailClassName}>{this.props.children}</div>
        )}
      </div>
    );
  }
}
