/**
 * @File   : index.tsx
 * @Author : dtysky (dtysky@outlook.com)
 * @Date   : 3/9/2020, 4:47:13 PM
 * @Description:
 */
import {h, Component} from 'preact';
import * as Sein from 'seinjs';

import InspectorActor from '../../../Actor/InspectorActor';
import {getController, getControllerType} from '../../../Controllers';

interface IComponentProps {
  actor: InspectorActor;
  object: Sein.SObject;
}

interface IComponentState {

}

export default class CustomPropertiesEditor extends Component<
  IComponentProps,
  IComponentState
> {
  private handleChange = (value: any) => {
    this.forceUpdate();
  }
  
  public render() {
    const {object} = this.props;
    const props = (object.constructor as typeof Sein.SObject).INSPECTABLE_PROPERTIES;

    return (
      <div>
        {
          Object.keys(props).map(key => {
            const {type, options, readonly} = props[key];

            return getController(type || getControllerType(object[key]))(key, readonly, options || {}, object, this.handleChange);
          })
        }
      </div>
    );
  }
}
