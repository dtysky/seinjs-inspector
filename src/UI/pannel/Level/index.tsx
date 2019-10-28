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
import {getEditorForComponent} from '../../editor';
import InspectorActor from '../../../Actor/InspectorActor';

interface IComponentProps {
  actor: InspectorActor;
  onTrigger: Function;
}

interface IComponentState {
  name: string;
  resultSet: any;
  currentDetailsObj: Sein.Component;
}
export default class Level extends Component<IComponentProps, IComponentState> {
  componentDidMount() {
    const resultSet: any = {};
    const game = this.props.actor.getGame();

    resultSet.sceneActors = [];
    const level = game.world.level;

    const { name } = level;
    // SceneActor
    const sceneActors = level.actors;
    sceneActors.forEach(item => {
      if (this.props.actor.isHidden(item)) {
        return;
      }

      const rs = {
        actor: null,
        components: {}
      };
      rs.actor = item;
      rs.components = item.findComponentsByFilter<Sein.SceneComponent>(
        () => true
      );
      resultSet.sceneActors.push(rs);
    });

    this.setState({
      name: name.value,
      resultSet
    });
  }
  private componentClick(component) {

  }

  private getComponents(components: []) {
    if (!components.length) {
      return null;
    }
    return components.map(component => {
      return (
        <Information
          label={(component as Sein.SceneComponent).className.value}
          value={(component as Sein.SceneComponent).name.value}
          onTrigger={() => this.setState({currentDetailsObj: component})}>
        </Information>
      );
    });
  }
  render() {
    const { name, resultSet } = this.state;

    if (!resultSet) {
      return null;
    }
    const { sceneActors } = resultSet;
    return (
      <WithDetails
        main={
          <Fragment>
            <Information label='Level Name' value={name}></Information>
            <Group name='SceneActors' isClose={false}>
              {sceneActors.map(item => {
                return (
                  <Folder
                    label={item.actor.className.value}
                    value={item.actor.name.value}
                    close={true}
                  >
                    {this.getComponents(item.components)}
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
  renderDetails = () => {
    return (
      <ComponentDetails
        actor={this.props.actor}
        component={this.state.currentDetailsObj}
      />
    );
  }
}
