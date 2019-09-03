/*
 * @Description: List.tsx
 * @Author: 修雷(lc199444@alibaba-inc.com)
 * @Date: 2019-09-03 16:51:23
 * @LastEditTime: 2019-09-03 22:04:34
 */

import { h, Component } from 'preact';
import './index.scss';
interface IComponentProps {
  label?: string;
  list:
    | Array<{
        name?: string;
        value?: string;
      }>
    | {
        [key: string]: any;
      };
  close?: boolean;
}
interface IComponentState {
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
    this.setState({
      isClose: !!close
    });
  }

  private getFromArray() {
    const { list } = this.props;
    const rs = [];
    list.map(item => {
      const { name, value } = item;
      rs.push(
        <li>
          <label className='sein-inspector-label' title={name || 'Label'}>
            {name}
          </label>
          {value && (
            <div className='sein-inspector-preview-value' title={value}>
              {value}
            </div>
          )}
        </li>
      );
    });

    return rs;
  }

  private getFromObject() {
    const rs = [];

    const { list } = this.props;
    for (const key in list) {
      const element = list[key];
      console.log(element);

      rs.push(
        <li>
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
    console.log(list instanceof Array);
    if (list.length) {
      return (
        <ul className='sein-inspector-list-detail'>{this.getFromArray()}</ul>
      );
    } else {
      <ul className='sein-inspector-list-detail'>
        {list.map(item => {
          const { name, value } = item;
          return (
            <li>
              <label className='sein-inspector-label' title={name || 'Label'}>
                {name}
              </label>
              {value && (
                <div className='sein-inspector-preview-value' title={value}>
                  {value}
                </div>
              )}
            </li>
          );
        })}
      </ul>;
    }
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
      isClose ? '' : ' close'
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
