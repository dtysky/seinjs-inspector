/**
 * @File   : ComponentDetails.tsx
 * @Author : dtysky (dtysky@outlook.com)
 * @Date   : 10/15/2019, 3:02:17 PM
 * @Description:
 */
import * as Sein from 'seinjs';
import {h, Component} from 'preact';

import InspectorActor from '../../Actor/InspectorActor';
import {getEditorForComponent} from '../editor';

export interface IPropTypes {
  actor: InspectorActor;
  component: Sein.Component;
}

export default class ComponentDetails extends Component<IPropTypes> {
  public render() {
    const game = this.props.actor.getGame();
    const {component} = this.props;

    const Editor = getEditorForComponent(component);

    return <Editor component={component} />
  }
}
