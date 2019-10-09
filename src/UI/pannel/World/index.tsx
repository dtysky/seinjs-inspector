/**
 * @File   : World.tsx
 * @Author : dtysky (dtysky@outlook.com)
 * @Date   : 7/28/2019, 3:56:22 PM
 * @Description:
 */
import * as Sein from 'seinjs';
import { h, Component } from 'preact';
import { List, Information } from '../../components';
import InspectorActor from '../../../Actor/InspectorActor';
interface IComponentProps {
  actor: InspectorActor;
}

interface IComponentState {
  name: string;
  Actors: Array<Sein.SceneActor>;
}

export default class World extends Component<IComponentProps, IComponentState> {
  componentDidMount() {
    this.calcState();
  }
  private calcState() {
    const game = this.props.actor.getGame();
    // game.switchLevel('level1');
    const Actors = [];
    game.world.actors.forEach(item => {
      Actors.push({
        name: item.className.value,
        value: item.name.value
      });
    });

    this.setState({
      name: game.world.name.value,
      Actors
    });
  }

  render() {
    const { Actors, name } = this.state;

    return (
      <div className='sein-inspector-content-box u-scrollbar'>
        <Information label='World Name' value={name}></Information>
        <List label='Actors' list={Actors}></List>
      </div>
    );
  }
}
