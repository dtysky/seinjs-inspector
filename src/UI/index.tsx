/**
 * @File   : index.tsx
 * @Author : dtysky (dtysky@outlook.com)
 * @Date   : 7/28/2019, 3:55:56 PM
 * @Description:
 */

import { h, render, Component } from "preact";
import { Inspector, Explorer } from "./pannel";
import "./index.scss";

interface IComponentState {}
class App extends Component<any, IComponentState> {
  constructor() {
    super();
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <div>
        <Explorer />
        <Inspector />
      </div>
    );
  }
}
export default function renderer(node: HTMLElement) {
  render(<App />, node);
}
