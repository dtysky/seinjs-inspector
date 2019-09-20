/**
 * @File   : Level.tsx
 * @Author : dtysky (dtysky@outlook.com)
 * @Date   : 7/28/2019, 3:56:03 PM
 * @Description:
 */
import { h, Component } from 'preact';
import { Group, Information, Folder } from '../../components';
import getEditor from '../../editor';
import InspectorActor from '../../../Actor/InspectorActor';
import * as Sein from 'seinjs';
interface IComponentProps {
  actor: InspectorActor;
  onTrigger: Function;
}

interface IComponentState {
  name: string;
  resultSet: any;
}
export default class Level extends Component<IComponentProps, IComponentState> {
  componentDidMount() {
    const resultSet: any = {};
    const game = this.props.actor.getGame();
    // console.log(game);
    // InfoActor
    const infoActors = game.actors;
    // console.log('InfoActors', infoActors);
    // console.log('level', game.world.level);

    resultSet.infoActors = infoActors.array;
    resultSet.sceneActors = [];
    const level = game.world.level;

    const { name } = level;
    // SceneActor
    const sceneActors = level.actors;
    sceneActors.forEach(item => {
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
    console.log('click', component);
  }

  private getComponents(components: []) {
    if (!components.length) {
      return null;
    }
    return components.map(component => {
      const Editor = getEditor(component);

      return (
        <Folder
          label={(component as Sein.SceneComponent).className.value}
          value={(component as Sein.SceneComponent).name.value}>
          {Editor ? (
            <Editor component={component}></Editor>
          ) : (
            <div class='sein-inspector-label'>暂未实现</div>
          )}
        </Folder>
      );
    });
  }
  render() {
    const { name, resultSet } = this.state;

    if (!resultSet) {
      return null;
    }
    const { infoActors, sceneActors } = resultSet;
    return (
      <div className='sein-inspector-content-box u-scrollbar'>
        <Information label='LevelName' value={name}></Information>
        <Group name='InfoActors'>
          {infoActors.map(item => {
            return (
              <Information
                label={item.className.value}
                value={item.name.value}></Information>
            );
          })}
        </Group>

        <Group name='SceneActors'>
          {sceneActors.map(item => {
            return (
              <Folder
                label={item.actor.className.value}
                value={item.actor.name.value}
                close={true}>
                {this.getComponents(item.components)}
              </Folder>
            );
          })}
        </Group>
      </div>
    );
  }
}
