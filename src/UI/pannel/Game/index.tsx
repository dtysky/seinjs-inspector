/**
 * @File   : Game.tsx
 * @Author : dtysky (dtysky@outlook.com)
 * @Date   : 7/28/2019, 3:55:56 PM
 * @Description:
 */
import { h, Component } from 'preact';
import * as Sein from 'seinjs';
import { List, Group, Information, Button } from '../../components';
import InspectorActor from '../../../Actor/InspectorActor';
interface IComponentProps {
  actor: InspectorActor;
}

interface IComponentState {
  infoActors: Array<{ name: string; value: string }>;
  bound: {
    [key: string]: any;
  };
  baseInfo: {
    [key: string]: any;
  };
  worlds: Array<{ name: string; value: string }>;
  details: {type: string, item: {name: string; value: string}};
}
export default class Game extends Component<IComponentProps, IComponentState> {
  public state: IComponentState = {
    infoActors: [],
    bound: {},
    baseInfo: {},
    worlds: [],
    details: {type: 'bound', item: null}
  }

  componentDidMount() {
    this.calcState();
  }
  componentWillUnmount() {}

  private calcState() {
    const game = this.props.actor.getGame();

    const infoActors = game.actors.array.map(item => {
      return { name: item.className.value, value: item.name.value };
    });

    const { name, devMode, bound, _worldsMeta: worlds } = game as any;
    const baseInfo = { 'Game Name': name.value, 'Dev Mode': devMode };
    const {left, right, top, bottom, width, height} = bound;

    this.setState({
      bound: {left, right, top, bottom, width, height},
      infoActors,
      baseInfo,
      worlds: Object.keys(worlds).map(name => ({
        name: name,
        value: worlds[name].GameMode.CLASS_NAME.value
      }))
    });
  }

  private handleSelectBound = () => {
    console.log('bound');
    this.setState({details: {type: 'bound', item: null}});
  }

  private handleSelectActor = (item: {name: string, value: string}) => {
    console.log('actor', item);
    this.setState({details: {type: 'actor', item}});
  }

  private handleSelectWorld = (item: {name: string, value: string}) => {
    console.log('world', item);
    this.setState({details: {type: 'world', item}});
  }

  render() {
    const { infoActors, bound, worlds } = this.state;

    return (
      <div style={{height: '100vh'}}>
        <div
          className='sein-inspector-content-box u-scrollbar'
          style={{maxHeight: '60%', marginBottom: 12}}
        >
          {this.renderBase()}
          <List onSelect={this.handleSelectBound} label='Bound' list={bound}></List>
          <List onSelect={this.handleSelectWorld} label='Worlds' list={worlds}></List>
          <List onSelect={this.handleSelectActor} label='Actors' list={infoActors}></List>
        </div>
        {
          this.state.details.type !== 'bound' && (
            <Group name='Details' isClose={false}>
              {this.renderDetails()}
            </Group>
          )
        }
      </div>
    );
  }

  renderBase() {
    const { baseInfo } = this.state;
    const rs = [];
    for (const key in baseInfo) {
      if (baseInfo.hasOwnProperty(key)) {
        const element = baseInfo[key];
        if (element) {
          rs.push(<Information label={key} value={element}></Information>);
        }
      }
    }

    return rs;
  }

  renderDetails() {
    if (this.state.details.type === 'actor') {
      return this.renderActorDetails(this.state.details.item);
    }

    if (this.state.details.type === 'world') {
      return this.renderWorldDetails(this.state.details.item);
    }

    return null;
  }

  renderWorldDetails(item: {name: string, value: string}) {
    const game = this.props.actor.getGame();

    const {levels} = (game as any)._worldsMeta[item.name];
    console.log(levels);

    return (
      <div>
        {
          game.world.name.equalsTo(item.name)
            ? <Button label={'Current World'} />
            : <Button label={'Switch to world'} onButtonClick={() => game.switchWorld(item.name)} />
        }
        <List label='Levels' list={levels} close={false}></List>
      </div>
    );
  }

  renderActorDetails(item: {name: string, value: string}) {

  }
}
