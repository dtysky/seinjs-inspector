/**
 * @File   : World.tsx
 * @Author : dtysky (dtysky@outlook.com)
 * @Date   : 7/28/2019, 3:56:22 PM
 * @Description:
 */
import * as Sein from 'seinjs';
import { h, Component, Fragment } from 'preact';
import { List, Information, WithDetails } from '../../components';
import InspectorActor from '../../../Actor/InspectorActor';
import LevelDetails from '../../details/LevelDetails';

interface IComponentProps {
  actor: InspectorActor;
}

interface IComponentState {
  name: string;
  Levels: Array<Sein.Level>;
  currentLevel: {name: string, value: string};
}

export default class World extends Component<IComponentProps, IComponentState> {
  public currentLevel: IComponentState = {
    name: '',
    Levels: null,
    currentLevel: null
  };

  componentDidMount() {
    this.calcState();
  }
  private calcState() {
    const game = this.props.actor.getGame();
    const Actors = [];
    game.world.actors.array
      .filter(item => (item as any).iteratable !== false)
      .forEach(item => {
        Actors.push({
          name: item.className.value,
          value: item.name.value
        });
      });

    const Levels = [];
    const levels = (game.world as any)._levels;
    for (const key in levels) {
      if (levels.hasOwnProperty(key)) {
        const item = levels[key];

        Levels.push({
          name: key,
          value: item.Script.name
        });
      }
    }

    this.setState({
      name: game.world.name.value,
      Levels
    });
  }

  render() {
    const { name, Levels } = this.state;

    return (
      <WithDetails
        main={
          <Fragment>
            <Information label='World Name' value={name}></Information>
            <List
              label='Levels' list={Levels} close={false}
              onSelect={(item) => this.setState({currentLevel: item})}
            ></List>
          </Fragment>
        }
        details={this.renderDetails()}
      />
    );
  }
  renderDetails = () => {
    const {currentLevel} = this.state;
    
    if (!currentLevel) {
      return null;
    }

    return (
      <LevelDetails
        actor={this.props.actor}
        levelName={this.state.currentLevel.name}
      />
    );
  }
}
