/*
 * @Description: Component.tsx
 * @Author: dtysky(dtysky@outlook.com)
 * @Date: 2019-09-09 14:52:36
 * @LastEditTime: 2019-09-11 21:12:24
 */

import { h, Component } from 'preact';
import './index.scss';
import * as Sein from 'seinjs';
interface IComponentProps {
  component: Sein.Component;
}
interface IComponentState {}

export default class ComponentEditor extends Component<
  IComponentProps,
  IComponentState
> {
  render() {
    return (
      <div className='sein-inspector-component sein-inspector-ambienteditor-container'>
      </div>
    );
  }
}
