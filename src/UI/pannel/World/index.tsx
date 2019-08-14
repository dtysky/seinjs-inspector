/**
 * @File   : World.tsx
 * @Author : dtysky (dtysky@outlook.com)
 * @Date   : 7/28/2019, 3:56:03 PM
 * @Description:
 */

import { h, Component } from "preact";
import { Group } from "../../components";
interface IComponetProps {}

interface IComponetState {}
export default class World extends Component<IComponetProps, IComponetState> {
  constructor() {
    super();
  }

  componentDidMount() {}
  render(props, state) {
    return <Group name="test2" />;
  }
}
