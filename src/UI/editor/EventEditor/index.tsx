/**
 * @File   : index.tsx
 * @Author : dtysky (dtysky@outlook.com)
 * @Date   : 3/16/2020, 3:50:01 PM
 * @Description:
 */
import {h, Component} from 'preact';
import * as Sein from 'seinjs';

import InspectorActor from '../../../Actor/InspectorActor';
import {getController, getControllerType} from '../../../Controllers';

interface IComponentProps {
  actor: InspectorActor;
  object: Sein.EventManager;
}

interface IComponentState {

}

export default class EventEditor extends Component<
  IComponentProps,
  IComponentState
> {
  private handleChange = (value: any) => {
    this.forceUpdate();
  }
  
  public render() {
    const {object} = this.props;

    return (
      <div>
        {
          getController('event')('Event', true,  {close: false}, {Event: object}, this.handleChange)
        }
      </div>
    );
  }
}
