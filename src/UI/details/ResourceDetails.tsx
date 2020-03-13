/**
 * @File   : ResourceDetails.tsx
 * @Author : dtysky (dtysky@outlook.com)
 * @Date   : 10/15/2019, 3:21:04 PM
 * @Description:
 */
import { h, Component, Fragment } from 'preact';

import InspectorActor from '../../Actor/InspectorActor';
import { Information } from '../components';
import { getController, getControllerType, hasController } from '../../Controllers';

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
    const {resource} = this.props.actor.getGame();
    const { type, name, url } = this.props.resource;

    const res = resource.get(name);
    let ctrType = `resource-${type.toLowerCase()}`;
    const hasCtr = hasController(ctrType);
    ctrType = hasCtr ? ctrType : getControllerType(res);

    console.log(ctrType);

    return (
      <Fragment>
        <Information label={'url'} value={url} />
        {getController(ctrType)(name, true, {}, {[name]: res}, () => this.forceUpdate())}
      </Fragment>
    )
  }
}
