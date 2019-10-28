/**
 * @File   : Info.ts
 * @Author : dtysky (dtysky@outlook.com)
 * @Date   : 7/28/2019, 3:34:01 PM
 * @Description:
 */
import { h, Component } from "preact";
import * as QRious from 'qrious';
import {
  Group,
  Select,
  Switch,
  Button,
  Information,
} from "../../components";

import {ISystemInfo, EControlType} from '../../../Actor/types';
import InspectorActor from '../../../Actor/InspectorActor';

interface IComponentProps {
  actor: InspectorActor;
}

interface IComponentState {
  info: ISystemInfo;
  qrcode: string;
}
export default class Info extends Component<IComponentProps, IComponentState> {
  public state: IComponentState = {
    info: {} as any
  };

  componentDidMount() {
    const {event} = this.props.actor;

    this.setState({
      qrcode: new QRious({
        value: location.href
      }).toDataURL()
    });

    event.add('Update', this.handleUpdateInfo);
    event.trigger('Control', {type: EControlType.StartSync});
  }

  componentWillUnmount() {
    const {event} = this.props.actor;

    event.trigger('Control', {type: EControlType.EndSync});
  }

  private handleUpdateInfo = (info: ISystemInfo) => {
    this.setState({info});
  }
  
  render() {
    const {system, engine, game, cameras, world, level, render, resource, events, physic} = this.state.info;

    if (!system) {
      return null;
    }

    return (
      <div className="sein-inspector-content-box  u-scrollbar">
        <p style={{textAlign: 'center', margin: 4}}>
          <img src={this.state.qrcode} />
        </p>
        <Group name="System" isClose={false}>
          <Button label={'Reload'} onButtonClick={() => location.reload()} />
          <Information label="FPS" value={system.fps.toFixed(2)} />
          <Information label="CPU" value={system.cpu} />
          <Information label="Memory" value={system.memory} />
        </Group>
        <Group name="Render" isClose={false}>
          <Information label="Buffers Count" value={render.buffers} />
          <Information label="Buffers bytes" value={render.bufferBytes} />
          <Information label="Shaders Count" value={render.shaders} />
          <Information label="Programs Count" value={render.programs} />
          <Information label="Textures Count" value={render.textures} />
        </Group>
        <Group name="Resource" isClose={false}>
          {Object.keys(resource).map(name => (
            <Information label={name} value={resource[name]} />
          ))}
        </Group>
        <Group name="Engine">
          <Information label="Ticker Running" value={engine.tickerRunning} />
          <Information label="Games Count" value={engine.gamesCount} />
          <Information label="Running Games Count" value={engine.runningGamesCount} />
        </Group>
        <Group name="Game">
          <Information label="Current" value={game.name} />
          <Information label="Paused" value={game.paused} />
          <Information label="Actors Count" value={game.actorsCount} />
        </Group>
        <Group name="World">
          <Information label="Current" value={world.name} />
        </Group>
        <Group name="Level">
          <Information label="Current" value={level.name} />
          <Information label="Alive" value={level.alive} />
          <Information label="Actors Count" value={level.actorsCount} />
        </Group>
        <Group name="Cameras">
          {
            cameras.map(camera => (
              <div>
                <Information label="Name" value={camera.name} />
                <Information label="Owner" value={camera.ownerName} />
                <Information label="Is Main" value={camera.isMain} />
                <Information label="Alive" value={camera.alive} />
              </div>
            ))
          }
        </Group>
        <Group name="Physic">
          <Information label="Active" value={physic.active} />
          <Information label="Alive" value={physic.alive} />
        </Group>
        <Group name="Events">
          <Information label="Global Event Count" value={events.global} />
          <Information label="Global HID Count" value={events.hid} />
        </Group>
      </div>
    );
  }
}
