/**
 * @File   : Event.tsx
 * @Author : dtysky (dtysky@outlook.com)
 * @Date   : 7/28/2019, 3:57:30 PM
 * @Description:
 */

import { h, Component } from "preact";
import { Group } from "../../components";
import InspectorActor from "../../../Actor/InspectorActor";
interface IComponentProps {
  actor: InspectorActor;
}

interface IComponentState {}
export default class Event extends Component<IComponentProps, IComponentState> {
  componentDidMount() {}

  render() {
    return <Group name="test2" />;
  }
}
