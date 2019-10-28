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
  levelName: string;
}

export default class LevelDetails extends Component<IPropTypes> {
  public render() {
    const game = this.props.actor.getGame();
    const name = this.props.levelName;

    return (
      <Fragment>
        <Information label={'Name'} value={name} />
        {game.world.name.equalsTo(name) ? (
          <Button label={'Current Level'} />
        ) : (
          <Button
            label={'Switch to level'}
            onButtonClick={() => game.switchLevel(name)}
          />
        )}
      </Fragment>
    );
  }
}
