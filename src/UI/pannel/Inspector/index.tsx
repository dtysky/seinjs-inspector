/**
 * @File   : index.tsx
 * @Author : dtysky (dtysky@outlook.com)
 * @Date   : 7/28/2019, 3:55:56 PM
 * @Description:
 */

import { h, render, Component } from "preact";
import Framework from "../Framework";
import Game from "../Game";
import World from "../World";
import { Tab } from "../../components";

interface IComponentProps {}

interface IComponentState {
  // 当前显示tab的序列
  tabIndex: number;
}
export default class Inspector extends Component<
  IComponentProps,
  IComponentState
> {
  protected container: HTMLElement;
  protected _width: number = 0;

  protected isChecked: boolean = false;
  constructor() {
    super();
    this.setState({
      tabIndex: 1
    });
    // 设置初始的时间
  }

  componentDidMount() {}

  componentWillUnmount() {}

  onTabChange = (id: number) => {
    this.setState({
      tabIndex: id
    });
  };
  dataUpdate = value => {
    console.log(value);
    this.isChecked = value;
  };
  getComponent() {
    const { tabIndex } = this.state;
    switch (tabIndex) {
      case 1:
        return (
          <Game switchChecked={this.isChecked} dataChange={this.dataUpdate} />
        );
      case 2:
        return <World />;
      default:
        return null;
    }
  }
  render() {
    return (
      <Framework title="Sein Inspector">
        <Tab onTabChange={this.onTabChange} />
        {this.getComponent()}
      </Framework>
    );
  }
}
