/**
 * @File   : LevelDetails.tsx
 * @Author : dtysky (dtysky@outlook.com)
 * @Date   : 10/15/2019, 2:48:33 PM
 * @Description:
 */
import {h, Component, Fragment} from 'preact';

import InspectorActor from '../../Actor/InspectorActor';
import {Button, Information} from '../components';

export interface IPropTypes {
  actor: InspectorActor;
  worldName: string;
  levelName: string;
}

export default class LevelDetails extends Component<IPropTypes> {
  public render() {
    const game = this.props.actor.getGame();
    const name = this.props.levelName;
    const worldName = this.props.worldName;
    const isCurrentWorld = game.world.name.equalsTo(worldName);
    const isCurrentLevel = isCurrentWorld && game.level.name.equalsTo(name);

    return (
      <Fragment>
        <Information label={'Name'} value={name} />
        {
          isCurrentLevel
            ? <Button label={'Current Level'} />
            : isCurrentWorld ? (
              <Button
                label={'Switch to level'}
                onButtonClick={() => game.switchLevel(name)}
              />
            )
            : null
        }
      </Fragment>
    );
  }
}
