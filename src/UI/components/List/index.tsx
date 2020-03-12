/*
 * @Description: List.tsx
 * @Author: 修雷(lc199444@alibaba-inc.com)
 * @Date: 2019-09-03 16:51:23
 * @LastEditTime: 2019-10-22 16:12:10
 */

import { h, Component } from 'preact';
import './index.scss';
interface IComponentProps {
  label?: string;
  list:
    | Array<{
        [key: string]: any;
        name?: string;
        value?: string;
        current?: boolean;
      }>
    | { [key: string]: any };
  close?: boolean;
  onSelect?: (item: { name: string; value: string }) => void;
}

interface IComponentState {
  label: string;
  isClose: boolean;
}

export default class Infomation extends Component<
  IComponentProps,
  IComponentState
> {
  public state: IComponentState = {
    label: '',
    isClose: true
  };

  public componentDidMount() {
    const { close } = this.props;
    let isClose = close;
    if (isClose === undefined) {
      isClose = true;
    }

    this.setState({
      label: this.props.label,
      isClose: isClose
    });
  }
  
  private onClick = () => {
    this.setState({
      isClose: !this.state.isClose
    });
  };

  public render() {
    const { isClose } = this.state;
    const { label } = this.props;
    const iconClassName = `iconfont sein-inspector-list-icon${isClose ? ' close' : ' '}`;

    return (
      <div className='sein-inspector-component sein-inspector-list-container'>
        <div className='sein-inspector-list-content'>
          <div className='sein-inspector-component-box' onClick={this.onClick}>
            <label className='sein-inspector-label' title={label || 'Label'}>
              {label || 'Label'}
            </label>
            <i className={iconClassName}></i>
          </div>

          {!isClose && this.renderList()}
        </div>
      </div>
    );
  }

  private currentIcon(isCurrent: boolean) {
    let className = 'iconfont sein-inspector-preview-icon';
    if (isCurrent !== undefined) {
      className += isCurrent ? ' current' : '';
    }
    return <i class={className}></i>;
  }

  private renderList() {
    const { list } = this.props;
    if (!list) {
      return null;
    }

    return (
      <ul className='sein-inspector-list-detail'>
        {list.length ? this.renderFromArray() : this.renderFromObject()}
      </ul>
    );
  }

  private renderFromArray() {
    const { list, onSelect } = this.props;

    return (
      list.map(item => {
        <li onClick={onSelect ? () => onSelect(item) : () => {}}>
          <label className='sein-inspector-label' title={item.name || 'Label'}>
            {item.name}
          </label>
          {item.value && (
            <div className='sein-inspector-preview-value' title={item.value}>
              {item.value}
            </div>
          )}
          {this.currentIcon(item.current)}
        </li>
      })
    );
  }

  private renderFromObject() {
    const { list, onSelect } = this.props;

    return (
      Object.keys(list).map(key => {
        const element = list[key];
        const t = typeof element;
  
        if (t === 'function' || t === 'object' || t === 'undefined') {
          return null;
        }
  
        return (
          <li
            onClick={
              onSelect ? () => onSelect({ name: key, value: element }) : () => {}
            }>
            <label className='sein-inspector-label' title={key || 'Label'}>
              {key}
            </label>
            <div className='sein-inspector-preview-value' title={element}>
              {element}
            </div>
          </li>
        );
      })
    )
  }
}
