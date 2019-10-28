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
  constructor() {
    super();
    this.setState({
      isClose: true
    });
  }

  componentDidMount() {
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
  private currentIcon(isCurrent: boolean) {
    let className = 'iconfont sein-inspector-preview-icon';
    if (isCurrent !== undefined) {
      className += isCurrent ? ' current' : '';
    }
    return <i class={className}></i>;
  }
  private getFromArray() {
    const { list, onSelect } = this.props;
    const rs = [];
    list.map(item => {
      const { name, value, current } = item;
      rs.push(
        <li onClick={onSelect ? () => onSelect(item) : () => {}}>
          <label className='sein-inspector-label' title={name || 'Label'}>
            {name}
          </label>
          {value && (
            <div className='sein-inspector-preview-value' title={value}>
              {value}
            </div>
          )}
          {this.currentIcon(current)}
        </li>
      );
    });

    return rs;
  }

  private getFromObject() {
    const rs = [];

    const { list, onSelect } = this.props;
    for (const key in list) {
      const element = list[key];
      rs.push(
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
    }
    return rs;
  }
  private getList() {
    const { list } = this.props;
    if (!list) {
      return null;
    }

    return (
      <ul className='sein-inspector-list-detail'>
        {list.length ? this.getFromArray() : this.getFromObject()}
      </ul>
    );
  }
  private onClick = () => {
    this.setState({
      isClose: !this.state.isClose
    });
  };

  render() {
    const { isClose } = this.state;
    const { label } = this.props;
    const iconClassName = `iconfont sein-inspector-list-icon${
      isClose ? ' close' : ' '
    }`;

    return (
      <div className='sein-inspector-component sein-inspector-list-container'>
        <div className='sein-inspector-list-content'>
          <div className='sein-inspector-component-box' onClick={this.onClick}>
            <label className='sein-inspector-label' title={label || 'Label'}>
              {label || 'Label'}
            </label>
            <i className={iconClassName}></i>
          </div>

          {!isClose && this.getList()}
        </div>
      </div>
    );
  }
}
