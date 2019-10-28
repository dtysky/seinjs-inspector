/**
 * @File   : Level.tsx
 * @Author : dtysky (dtysky@outlook.com)
 * @Date   : 7/28/2019, 3:56:03 PM
 * @Description:
 */
import { h, Component, Fragment } from 'preact';
import * as Sein from 'seinjs';

import ComponentDetails from '../../details/ComponentDetails';
import { Group, Information, Folder, WithDetails, Tab } from '../../components';
import { getEditorForComponent } from '../../editor';
import InspectorActor from '../../../Actor/InspectorActor';

interface IComponentProps {
  actor: InspectorActor;
  onTrigger: Function;
}

interface IComponentState {
  name: string;
  sceneActors: Sein.SceneActor[];
  currentDetailsObj: Sein.Component;
}
export default class Level extends Component<IComponentProps, IComponentState> {
  public state: IComponentState = {
    name: '',
    sceneActors: [],
    currentDetailsObj: null
  }

  componentDidMount() {
    const game = this.props.actor.getGame();
    const level = game.world.level;

    const { name } = level;
    // SceneActor
    const sceneActors = level.actors;

    this.setState({
      name: name.value,
      sceneActors: sceneActors.findAllByFilter(actor => !this.props.actor.isHidden(actor))
    });
  }

  render() {
    const { name, sceneActors } = this.state;

    return (
      <WithDetails
        main={
          <Fragment>
            <Information label='Level Name' value={name}></Information>
            <Group name='SceneActors' isClose={false}>
              {sceneActors.map(actor => {
                return (
                  <Folder
                    label={actor.className.value}
                    value={actor.name.value}
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
  renderSceneComponents(root: Sein.SceneComponent) {
    if (!root) {
      return;
    }

    console.log(root);

    if (root.children.length == 0) {
      return root.children.array.map(component => {
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
  renderComponents(actor: Sein.SceneActor) {
    if (!actor) {
      return;
    }

    const components = actor.findComponentsByFilter(c => !Sein.isSceneComponent(c));
    
    return components.map(component => {
      return (
        <Information
          label={component.className.value}
          value={component.name.value}
          onTrigger={() =>
            this.setState({ currentDetailsObj: component })
          }
        />
      );
    });
  }
  renderDetails = () => {
    return (
      <ComponentDetails
        actor={this.props.actor}
        component={this.state.currentDetailsObj}
      />
    );
  };
}
