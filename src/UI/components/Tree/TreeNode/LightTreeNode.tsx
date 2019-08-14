import { h, Component } from "preact";
import TreeNode from "./TreeNode";
import { ITreeData } from "./types";

interface IComponetProps {
  deep: number;
  treeNodeData: ITreeData;
  onTreeNodeClick?: Function;
  onLightClick?: Function;
}
interface IComponetState {
  isDisable: boolean;
}

export default class LightTreeNode extends Component<
  IComponetProps,
  IComponetState
> {
  constructor() {
    super();

    this.setState({
      isDisable: false
    });
  }

  componentDidMount() {}
  eyeClick = () => {
    const { isDisable } = this.state;
    const { onLightClick } = this.props;

    onLightClick(!isDisable).then(() => {
      this.setState({
        isDisable: !isDisable
      });
    });
  };
  render() {
    const { deep, treeNodeData, onTreeNodeClick } = this.props;

    const { isDisable } = this.state;
    return (
      <TreeNode
        deep={deep}
        treeNodeData={treeNodeData}
        onTreeNodeClick={onTreeNodeClick}
      >
        <div className="tree-node-func">
          <i
            onClick={this.eyeClick}
            className={
              "u-function f-visiable iconfont" + (isDisable ? " disable" : "")
            }
          />
        </div>
      </TreeNode>
    );
  }
}
