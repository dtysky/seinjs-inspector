/**
 * @File   : WorldDetails.tsx
 * @Author : dtysky (dtysky@outlook.com)
 * @Date   : 10/15/2019, 2:48:26 PM
 * @Description:
 */
import { h, Component, Fragment } from 'preact';

import InspectorActor from '../../Actor/InspectorActor';
import { Button, List, Information } from '../components';

export interface IPropTypes {
  actor: InspectorActor;
  worldName: string;
}

export interface IStateTypes {}

export default class WorldDetails extends Component<IPropTypes, IStateTypes> {
  public render() {
    const game = this.props.actor.getGame();
    const name = this.props.worldName;

    //@todo: physic
    return (
      <Fragment>
        <Information label={'Name'} value={'name'} />
        {game.world.name.equalsTo(name) ? (
          <Button label={'Current World'} />
        ) : (
          <Button
            label={'Switch to world'}
            onButtonClick={() => game.switchWorld(name)}
          />
        )}
      </Fragment>
    );
  }
}
