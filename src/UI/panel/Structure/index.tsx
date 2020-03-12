/**
 * @File   : Game.tsx
 * @Author : dtysky (dtysky@outlook.com)
 * @Date   : 7/28/2019, 3:55:56 PM
 * @Description:
 */
import { h, Component, Fragment } from 'preact';
import * as Sein from 'seinjs';

import {
  List,
  Group,
  Information,
  WithDetails,
  Folder
} from '../../components';
import InspectorActor from '../../../Actor/InspectorActor';
import WorldDetails from '../../details/WorldDetails';
import LevelDetails from '../../details/LevelDetails';

interface IComponentProps {
  actor: InspectorActor;
}

interface IComponentState {
  bound: {[key: string]: any;};
  baseInfo: {[key: string]: any;};
  worlds: {
    name: string;
    value: string;
    levels: {
      name: string;
      value: string;
    }[];
  }[];
  details: {
    type: 'world' | 'level';
    item: {name: string; value: string;};
    worldName?: string;
  };
}

export default class Structure extends Component<IComponentProps, IComponentState> {
  public state: IComponentState = {
    bound: {},
    baseInfo: {},
    worlds: [],
    details: { type: null, item: null }
  };

  public componentDidMount() {
    this.calcState();
  }

  private calcState() {
    const game = this.props.actor.getGame();

    const {name, devMode, bound, _worldsMeta: worlds} = game as any;
    const baseInfo = { 'Game Name': name.value, 'Dev Mode': devMode };
    const {left, right, top, bottom, width, height} = bound;

    this.setState({
      bound: { left, right, top, bottom, width, height },
      baseInfo,
      worlds: Object.keys(worlds).map(name => ({
        name: name,
        value: worlds[name].GameMode.CLASS_NAME.value,
        levels: Object.keys(worlds[name].levels).map(lName => ({
          name: lName,
          value: worlds[name].levels[lName].Script.CLASS_NAME.value
        }))
      }))
    });
  }

  public render() {
    const {bound, worlds} = this.state;

    return (
      <WithDetails
        main={
          <Fragment>
            {this.renderBase()}
            <List
              key={'Bound'}
              label='Bound'
              list={bound}
              close={false}
            />
            <Group name='Worlds' isClose={false}>
              {worlds.map(world => {
                return (
                  <Folder
                    label={world.name}
                    value={world.value}
                    close={true}
                    onTrigger={() => this.setState({ details: { type: 'world', item: world } })}
                  >
                    {this.renderLevels(world.name, world.levels)}
                  </Folder>
                );
              })}
            </Group>
          </Fragment>
        }
        details={this.renderDetails()}
      />
    );
  }

  private renderLevels(world: string, levels: {name: string, value: string}[]) {
    return levels.map(level => {
      return (
        <Information
          label={level.name}
          value={level.value}
          onTrigger={() =>
            this.setState({ details: {type: 'level', item: level, worldName: world} })
          }
        />
      );
    });
  }

  private renderBase() {
    const { baseInfo } = this.state;

    return Object.keys(baseInfo).map(key => (
      <Information label={key} value={baseInfo[key]}></Information>
    ));
  }

  private renderDetails() {
    const {details} = this.state;

    if (details.type === 'world') {
      return (
        <WorldDetails
          actor={this.props.actor}
          worldName={details.item.name}
        />
      );
    }

    if (details.type === 'level') {
      return (
        <LevelDetails
          actor={this.props.actor}
          worldName={details.worldName}
          levelName={details.item.name}
        />
      );
    }
  }
}
