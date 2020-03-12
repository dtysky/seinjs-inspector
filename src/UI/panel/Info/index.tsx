/**
 * @File   : Info.ts
 * @Author : dtysky (dtysky@outlook.com)
 * @Date   : 7/28/2019, 3:34:01 PM
 * @Description:
 */
import { h, Component } from 'preact';
import * as QRious from 'qrious';
import { Group, Select, Switch, Button, Information } from '../../components';

import { ISystemInfo, EControlType } from '../../../types';
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
    info: {} as any,
    qrcode: ''
  };

  componentDidMount() {
    const { event } = this.props.actor;

    this.setState({
      qrcode: new QRious({
        value: location.href + '?qrcode=true'
      }).toDataURL()
    });

    event.add('Update', this.handleUpdateInfo);
    event.trigger('Control', { type: EControlType.StartSync });
  }

  componentWillUnmount() {
    const { event } = this.props.actor;

    event.remove('Update', this.handleUpdateInfo);
    event.trigger('Control', {type: EControlType.EndSync});
  }

  private handleUpdateInfo = (info: ISystemInfo) => {
    this.setState({ info });
  };

  render() {
    const {
      system,
      engine,
      game,
      cameras,
      world,
      level,
      render,
      resource,
      events,
      physic
    } = this.state.info;

    if (!system) {
      return null;
    }

    return (
      <div className='sein-inspector-content-box  u-scrollbar'>
        <p style={{ textAlign: 'center', margin: 4 }}>
          <img style={{border: '1px white solid'}} src={this.state.qrcode} />
        </p>
        <Group name='System' isClose={false}>
          <Button label={'Reload'} onButtonClick={() => location.reload()} />
          <Information label='FPS' value={system.fps.toFixed(2)} />
          {system.cpu && <Information label='CPU' value={system.cpu} />}
          {system.memory && <Information label='Memory' value={system.memory && `${(system.memory / 1024 / 1024).toFixed(2)}MB`} />}
        </Group>
        <Group name='Render' isClose={false}>
          <Information label='Buffers bytes' value={`${(render.bufferBytes / 1024 / 1024).toFixed(2)}MB`} />
          {render.totalVertices && <Information label='Total Vertices' value={render.totalVertices} />}
          {render.totalTriangles && <Information label='Total Triangles' value={render.totalTriangles} />}
          <Information label='Draw Call Count' value={render.drawCallCount} />
          <Information label='Draw Face Count' value={render.drawFaceCount} />
          {/* <Information label='Buffers Count' value={render.buffers} />
          <Information label='Shaders Count' value={render.shaders} />
          <Information label='Programs Count' value={render.programs} />
          <Information label='Textures Count' value={render.textures} /> */}
        </Group>
        <Group name='Structure' isClose={false}>
          <Information label='Ticker Running' value={engine.tickerRunning} />
          <Information label='Paused' value={game.paused} />
          <Information label='Level Alive' value={level.alive} />
          <Information label='Physic Active' value={physic.active} />
          <Information label='Physic Alive' value={physic.alive} />
          <Information label='Camera Alive' value={world.cameraAlive} />
          <Information label='Current Game' value={game.name} />
          <Information label='Current World' value={world.name} />
          <Information label='Current Level' value={level.name} />
          <Information label='Games Count' value={engine.gamesCount} />
          <Information label='Running Games Count' value={engine.runningGamesCount} />
          <Information label='InfoActors Count' value={game.actorsCount} />
          <Information label='SceneActors Count' value={level.actorsCount} />
        </Group>
        <Group name='Resource' isClose={false}>
          {Object.keys(resource).map(name => (
            <Information label={name} value={resource[name]} />
          ))}
        </Group>
        <Group name='Cameras'>
          {cameras.map(camera => (
            <div>
              <Information label='Name' value={camera.name} />
              <Information label='Owner' value={camera.ownerName} />
              <Information label='Is Main' value={camera.isMain} />
              <Information label='Alive' value={camera.alive} />
            </div>
          ))}
        </Group>
        <Group name='Events'>
          <Information label='Global Event Count' value={events.global} />
          <Information label='Global HID Count' value={events.hid} />
        </Group>
      </div>
    );
  }
}
