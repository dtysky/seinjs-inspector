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
  Button,
  WithDetails
} from '../../components';
import InspectorActor from '../../../Actor/InspectorActor';
import WorldDetails from '../../details/WorldDetails';

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
  worlds: { name: string; value: string }[];
  details: {
    type: string;
    item: { name: string; value: string; actor?: Sein.InfoActor };
  };
}

export default class Game extends Component<IComponentProps, IComponentState> {
  public state: IComponentState = {
    infoActors: [],
    bound: {},
    baseInfo: {},
    worlds: [],
    details: { type: 'bound', item: null }
  };

  componentDidMount() {
    this.calcState();
  }
  componentWillUnmount() {}

  private calcState() {
    const game = this.props.actor.getGame();

    const infoActors = game.actors.array;
    let result = [];
    infoActors.filter(item => item);
    result = infoActors.map(item => {
      return { name: item.name.value, value: item.className.value };
    });

    const { name, devMode, bound, _worldsMeta: worlds } = game as any;
    const baseInfo = { 'Game Name': name.value, 'Dev Mode': devMode };
    const { left, right, top, bottom, width, height } = bound;

    this.setState({
      bound: { left, right, top, bottom, width, height },
      infoActors: result,
      baseInfo,
      worlds: Object.keys(worlds).map(name => ({
        name: name,
        value: worlds[name].GameMode.CLASS_NAME.value
      }))
    });
  }

  private handleSelectActor = (item: { name: string; value: string }) => {
    console.log('actor', item);
    this.setState({ details: { type: 'actor', item } });
  };

  private handleSelectWorld = (item: { name: string; value: string }) => {
    console.log('world', item);
    this.setState({ details: { type: 'world', item } });
  };

  public render() {
    const { infoActors, bound, worlds } = this.state;

    return (
      <WithDetails
        main={
          <Fragment>
            {this.renderBase()}
            <List key={'Bound'} label='Bound' list={bound}></List>
            <List
              key={'Worlds'}
              onSelect={this.handleSelectWorld}
              label='Worlds'
              close={false}
              list={worlds}></List>
            <List
              key={'infoActors'}
              onSelect={this.handleSelectActor}
              label='infoActors'
              close={false}
              list={infoActors}></List>
          </Fragment>
        }
        details={this.renderDetails()}
      />
    );
  }

  private renderBase() {
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

  private renderDetails() {
    if (this.state.details.type === 'actor') {
      return this.renderActorDetails(this.state.details.item);
    }

    if (this.state.details.type === 'world') {
      return (
        <WorldDetails
          actor={this.props.actor}
          worldName={this.state.details.item.name}
        />
      );
    }

    return null;
  }

  private renderActorDetails(item: { name: string; value: string }) {
    return null;
  }
}
