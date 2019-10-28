/**
 * @File   : Game.tsx
 * @Author : dtysky (dtysky@outlook.com)
 * @Date   : 7/28/2019, 3:55:56 PM
 * @Description:
 */

import { h, Component } from 'preact';
import * as cx from 'classnames';

import './index.scss';
interface IComponentProps {
  children?;
  name: string;
  isClose?: boolean;
}
interface IComponentState {
  isClose: boolean;
}

export default class Group extends Component<IComponentProps, IComponentState> {
  public state: IComponentState = {
    isClose: true
  };

  protected groupBar: HTMLElement;
  protected content: HTMLElement;

  handleToggle = () => {
    this.setState({ isClose: !this.state.isClose });
  };

  componentDidMount() {
    if (this.props.isClose === undefined) {
      this.setState({ isClose: true });
    } else {
      this.setState({ isClose: this.props.isClose });
    }
  }

  componentWillUnmount() {}

  render() {
    const { name } = this.props;
    const { isClose } = this.state;

    return (
      <div className='sein-inspector-group'>
        <div
          ref={group => (this.groupBar = group)}
          onClick={this.handleToggle}
          className={cx('sein-inspector-group-bar', isClose && 'close')}>
          {name}
          <i>&nbsp;</i>
        </div>
        <div
          ref={content => (this.content = content)}
          className={cx('sein-inspector-group-content', isClose && 'close')}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
