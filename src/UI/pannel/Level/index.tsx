/**
 * @File   : World.tsx
 * @Author : dtysky (dtysky@outlook.com)
 * @Date   : 7/28/2019, 3:56:03 PM
 * @Description:
 */

import { h, Component } from "preact";
import { Group } from "../../components";
interface IComponentProps {}

interface IComponentState {}
export default class Level extends Component<IComponentProps, IComponentState> {
  constructor() {
    super();
  }

  componentDidMount() {}
  render(props, state) {
    return <Group name="test2" />;
  }
}
