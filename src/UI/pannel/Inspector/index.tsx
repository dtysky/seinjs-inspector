/**
 * @File   : index.tsx
 * @Author : dtysky (dtysky@outlook.com)
 * @Date   : 7/28/2019, 3:55:56 PM
 * @Description:
 */
import { h, render, Component } from "preact";
import Framework from "../Framework";
import Info from "../Info";
import Game from "../Game";
import Level from "../Level";
import { Tab } from "../../components";
import InspectorActor from '../../../Actor/InspectorActor';

interface IComponentProps {
  actor: InspectorActor;
}

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
          <Info
            actor={this.props.actor}
          />
        );
      case 2:
        return (
          <Game
            switchChecked={this.isChecked}
            dataChange={this.dataUpdate}
          />
        );
      default:
        return null;
    }
  }
  render() {
    return (
      <Framework title="SeinJS Inspector">
        <Tab onTabChange={this.onTabChange} />
        {this.getComponent()}
      </Framework>
    );
  }
}
