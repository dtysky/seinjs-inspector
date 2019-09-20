/**
 * @File   : Game.tsx
 * @Author : dtysky (dtysky@outlook.com)
 * @Date   : 7/28/2019, 3:55:56 PM
 * @Description:
 */
import { h, Component } from 'preact';
import * as Sein from 'seinjs';
import { List, Group, Information } from '../../components';
import InspectorActor from '../../../Actor/InspectorActor';
interface IComponentProps {
  actor: InspectorActor;
}

interface IComponentState {
  InfoActors: Array<{ name: string; value: string }>;
  Bound: {
    [key: string]: any;
  };
  baseInfo: {
    [key: string]: any;
  };
}
export default class Game extends Component<IComponentProps, IComponentState> {
  constructor() {
    super();
  }

  componentDidMount() {
    this.calcState();
  }
  componentWillUnmount() {}
  private calcState() {
    const game = this.props.actor.getGame();

    const InfoActors = game.actors.array.map(item => {
      return { name: item.className.value, value: item.name.value };
    });

    const { fps, screenHeight, screenWidth, devMode, bound } = game;
    const baseInfo = { fps, screenHeight, screenWidth, devMode };

    const { width, height, top, right, bottom, left } = bound;
    const Bound = { width, height, top, right, bottom, left };
    this.setState({
      Bound,
      InfoActors,
      baseInfo
    });
  }

  private getGroup() {
    const { baseInfo } = this.state;
    const rs = [];
    for (const key in baseInfo) {
      if (baseInfo.hasOwnProperty(key)) {
        const element = baseInfo[key];
        element &&
          rs.push(<Information label={key} value={element}></Information>);
      }
    }
    return rs;
  }
  render() {
    const { InfoActors, Bound } = this.state;

    return (
      <div className='sein-inspector-content-box u-scrollbar'>
        {this.getGroup()}
        <List label='Bound' list={Bound}></List>
        <List label='InfoActors' list={InfoActors}></List>
      </div>
    );
  }
}
