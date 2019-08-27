/**
 * @File   : index.tsx
 * @Author : dtysky (dtysky@outlook.com)
 * @Date   : 7/28/2019, 3:55:56 PM
 * @Description:
 */
/**
 * @File   : index.tsx
 * @Author : dtysky (dtysky@outlook.com)
 * @Date   : 7/28/2019, 3:55:56 PM
 * @Description:
 */
import { h, render as preactRender, Component } from "preact";

import { TabItem } from "../constant";
import Framework from "./pannel/Framework";
import Info from "./pannel/Info";
import Game from "./pannel/Game";
import Level from "./pannel/Level";
import Resource from "./pannel/Resource";
import Event from "./pannel/Event";
import Player from "./pannel/Player";
import Render from "./pannel/Render";
import { Tab } from "./components";
import InspectorActor from '../Actor/InspectorActor';

import './index.scss';

interface IComponentProps {
  actor: InspectorActor;
}

interface IComponentState {
  // 当前显示tab的序列
  tabIndex: number;
}
class Inspector extends Component<
  IComponentProps,
  IComponentState
> {
  public state: IComponentState = {
    tabIndex: 4
  };

  protected container: HTMLElement;
  protected _width: number = 0;
  protected isChecked: boolean = false;

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
            actor={this.props.actor}
            switchChecked={this.isChecked}
            dataChange={this.dataUpdate}
          />
        );
      case 3:
        return (
          <Level
            actor={this.props.actor}
          />
        );
      case 4:
        return (
          <Resource
            actor={this.props.actor}
          />
        );
      case 5:
        return (
          <Event
            actor={this.props.actor}
          />
        );
      case 6:
        return (
          <Player
            actor={this.props.actor}
          />
        );
      case 6:
        return (
          <Render
            actor={this.props.actor}
          />
        );
      default:
        return null;
    }
  }

  render() {
    return (
      <Framework title="SeinJS Inspector">
        <Tab
          data={TabItem}
          currentId={this.state.tabIndex}
          onTabChange={this.onTabChange}
        />
        {this.getComponent()}
      </Framework>
    );
  }
}

export default function render(node: HTMLElement, actor: InspectorActor) {
  preactRender(<Inspector actor={actor} />, node);
}
