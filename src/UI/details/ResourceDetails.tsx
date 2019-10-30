/**
 * @File   : ResourceDetails.tsx
 * @Author : dtysky (dtysky@outlook.com)
 * @Date   : 10/15/2019, 3:21:04 PM
 * @Description:
 */
import { h, Component } from 'preact';

import InspectorActor from '../../Actor/InspectorActor';
import { Preview } from '../components';

interface IComponentState {
  type: string;
  name: string;
  url: string;
}
export interface IPropTypes {
  actor: InspectorActor;
  resource: IComponentState;
}

export default class ResourceDetails extends Component<IPropTypes> {
  public render() {
    const game = this.props.actor.getGame();

    const { type, name, url } = this.props.resource;
    return <Preview type={type} name={name} url={url}></Preview>;
  }
}
