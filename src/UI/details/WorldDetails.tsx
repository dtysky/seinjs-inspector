/**
 * @File   : WorldDetails.tsx
 * @Author : dtysky (dtysky@outlook.com)
 * @Date   : 10/15/2019, 2:48:26 PM
 * @Description:
 */
import { h, Component, Fragment } from 'preact';

import InspectorActor from '../../Actor/InspectorActor';
import { Button, List, Information, Folder } from '../components';
import { getController } from '../../Controllers';

export interface IPropTypes {
  actor: InspectorActor;
  worldName: string;
}

export interface IStateTypes {}

export default class WorldDetails extends Component<IPropTypes, IStateTypes> {
  public render() {
    const game = this.props.actor.getGame();
    const name = this.props.worldName;
    const isCurrent = game.world.name.equalsTo(name);

    //@todo: physic
    return (
      <Fragment>
        <Information label={'Name'} value={'name'} />
        {isCurrent ? (
          <Button label={'Current World'} />
        ) : (
          <Button
            label={'Switch to world'}
            onButtonClick={() => game.switchWorld(name)}
          />
        )}
        {
          isCurrent && this.renderPhysic()
        }
      </Fragment>
    );
  }

  private renderPhysic() {
    const {physicWorld} = this.props.actor.getWorld();

    if (!physicWorld) {
      return null;
    }

    return (
      <Folder label={'Physic World'} close={false}>
        <Information label={'timeStep'} value={physicWorld.timeStep} />
        {getController('vector')('gravity', false, {}, physicWorld, () => {this.forceUpdate();})}
      </Folder>
    );
  }
}
