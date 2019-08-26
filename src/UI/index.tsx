/**
 * @File   : index.tsx
 * @Author : dtysky (dtysky@outlook.com)
 * @Date   : 7/28/2019, 3:55:56 PM
 * @Description:
 */
import { h, render as preactRender, Component } from "preact";
import { Inspector, Explorer } from "./pannel";
import "./index.scss";
import InspectorActor from '../Actor/InspectorActor';

interface IComponentState {}
class App extends Component<{actor: InspectorActor}, IComponentState> {
  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <div>
        <Explorer />
        <Inspector actor={this.props.actor} />
      </div>
    );
  }
}
export default function render(node: HTMLElement, actor: InspectorActor) {
  preactRender(<App actor={actor} />, node);
}
