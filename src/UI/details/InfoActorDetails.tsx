/**
 * @File   : InfoActorDetails.tsx
 * @Author : dtysky (dtysky@outlook.com)
 * @Date   : 10/15/2019, 2:48:40 PM
 * @Description:
 */
import {h, Component} from 'preact';

import InspectorActor from '../../Actor/InspectorActor';
import {Button, List} from '../components';

export interface IPropTypes {
  actor: InspectorActor;
}

export default class InfoActorDetails extends Component<IPropTypes> {
  public render() {
    const game = this.props.actor.getGame();    

    return (
      <div>
        
      </div>
    );
  }
}
