/**
 * @File   : Player.tsx
 * @Author : dtysky (dtysky@outlook.com)
 * @Date   : 7/28/2019, 3:56:22 PM
 * @Description:
 */
import * as Sein from 'seinjs';
import {h, Component, Fragment} from 'preact';

import {Group, WithDetails, Folder, Information} from '../../components';
import InspectorActor from '../../../Actor/InspectorActor';
import CommonDetails from '../../details/CommonDetails';

interface IComponentProps {
  actor: InspectorActor;
}

interface IComponentState {
  currentDetailsObj: Sein.Player | Sein.Actor | Sein.Component;
  players: Sein.Player[];
  controllers: Sein.ControllerActor[];
}

export default class Player extends Component<
  IComponentProps,
  IComponentState
> {
  public state: IComponentState = {
    currentDetailsObj: null,
    players: [],
    controllers: []
  }

  public componentDidMount() {
    this.reload(this.props);
  }

  private reload(props: IComponentProps) {
    const {players} = this.props.actor.getGame();
    const {actors} = this.props.actor.getWorld();

    this.setState({
      currentDetailsObj: null,
      players: players.array,
      controllers: actors.findAllByFilter(actor => Sein.isAIControllerActor(actor))
    });
  }

  public render() {
    const {players, controllers} = this.state;

    return (
      <WithDetails
        main={
          <Fragment>
            <Group name='Players' isClose={false}>
              {players.map(player => {
                return (
                  <Folder
                    label={`${player.name.value}`}
                    value={player.className.value}
                    onTrigger={() =>
                      this.setState({ currentDetailsObj: player })
                    }
                    close={false}
                  >
                    {this.renderController(player.controller)}
                  </Folder>
                );
              })}
            </Group>
            <Group name='AI Controllers' isClose={false}>
              {controllers.map(controller => this.renderController(controller))}
            </Group>
          </Fragment>
        }
        details={this.renderDetails()}
      />
    );
  }

  private renderController(controller: Sein.ControllerActor) {
    if (!controller) {
      return null;
    }

    return (
      <Folder
        label={`${controller.name.value}`}
        value={controller.className.value}
        close={true}
        onTrigger={() =>
          this.setState({ currentDetailsObj: controller })
        }
      >
        {
          controller.state && (
            <Folder
              label={`${controller.state.name.value}`}
              value={controller.state.className.value}
              close={true}
              onTrigger={() =>
                this.setState({ currentDetailsObj: controller.state })
              }
            >
              {this.renderComponents(controller.state)}
            </Folder>
          )
        }
        {
          controller.actor && (
            <Folder
              label={`${controller.actor.name.value}`}
              value={controller.actor.className.value}
              close={true}
              onTrigger={() =>
                this.setState({ currentDetailsObj: controller.actor })
              }
            >
              {this.renderComponents(controller.actor)}
            </Folder>
          )
        }
      </Folder>
    );
  }

  private renderComponents(actor: Sein.Actor) {
    if (!actor) {
      return;
    }

    const components = actor.findComponentsByFilter(c => !Sein.isSceneComponent(c));
    
    return components.map(component => {
      return (
        <Information
          label={component.name.value}
          value={component.className.value}
          onTrigger={() =>
            this.setState({ currentDetailsObj: component })
          }
        />
      );
    });
  }

  private renderDetails() {
    const {currentDetailsObj} = this.state;

    return (
      <CommonDetails
        actor={this.props.actor}
        object={currentDetailsObj}
      />
    );
  };
}
