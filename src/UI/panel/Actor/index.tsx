/**
 * @File   : Level.tsx
 * @Author : dtysky (dtysky@outlook.com)
 * @Date   : 7/28/2019, 3:56:03 PM
 * @Description:
 */
import { h, Component, Fragment } from 'preact';
import * as Sein from 'seinjs';

import {Group, Information, Folder, WithDetails} from '../../components';
import CommonDetails from '../../details/CommonDetails';
import InspectorActor from '../../../Actor/InspectorActor';

interface IComponentProps {
  actor: InspectorActor;
}

interface IComponentState {
  infoActors: Sein.InfoActor[];
  sceneActors: Sein.SceneActor[];
  currentDetailsObj: Sein.Actor | Sein.Component;
}
export default class Actor extends Component<IComponentProps, IComponentState> {
  public state: IComponentState = {
    infoActors: [],
    sceneActors: [],
    currentDetailsObj: null
  }

  public componentDidMount() {
    const game = this.props.actor.getGame();
    const level = game.world.level;

    const infoActors = game.actors;
    const sceneActors = level.actors;

    this.setState({
      infoActors: infoActors.findAllByFilter(() => true),
      sceneActors: sceneActors.findAllByFilter(actor => !this.props.actor.isHidden(actor))
    });
  }

  public render() {
    const { infoActors, sceneActors } = this.state;

    return (
      <WithDetails
        main={
          <Fragment>
            <Group name='InfoActors' isClose={true}>
              {infoActors.map(actor => {
                return (
                  <Folder
                    label={actor.name.value}
                    value={actor.className.value}
                    close={true}
                  >
                    {this.renderComponents(actor)}
                  </Folder>
                );
              })}
            </Group>
            <Group name='SceneActors' isClose={false}>
              {sceneActors.map(actor => {
                return (
                  <Folder
                    label={actor.name.value}
                    value={actor.className.value}
                    onTrigger={() =>
                      this.setState({ currentDetailsObj: actor })
                    }
                    close={true}
                  >
                    {this.renderSceneComponents(actor.root)}
                    {this.renderComponents(actor)}
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

  private renderSceneComponents(root: Sein.SceneComponent) {
    if (!root) {
      return;
    }

    if (root.children.length === 0) {
      return (
        <Information
          label={root.name.value}
          value={root.className.value}
          onTrigger={() =>
            this.setState({ currentDetailsObj: root })
          }
        />
      );
    }

    return (
      <Folder
        label={root.name.value}
        value={root.className.value}
        close={true}
        onTrigger={() =>
          this.setState({ currentDetailsObj: root })
        }
      >
        {
          root.children.array.map(c => this.renderSceneComponents(c))
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

    if (!currentDetailsObj) {
      return null;
    }

    return (
      <CommonDetails
        actor={this.props.actor}
        object={currentDetailsObj}
      />
    );
  };
}
