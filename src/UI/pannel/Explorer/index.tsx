import { h, Component } from "preact";
import "./index.scss";
import Framework from "../Framework";
import { Tree } from "../../components";
import { treeData } from "../../../constant";

interface IComponentProps {}
interface IComponentState {}
export default class Explorer extends Component<
  IComponentProps,
  IComponentState
> {
  constructor() {
    super();
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <Framework title="Sein Explorer" mode="left">
        <Tree data={treeData} />
      </Framework>
    );
  }
}
