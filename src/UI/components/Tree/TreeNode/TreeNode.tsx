import { h, Component } from "preact";
import { ITreeData } from "./types";

interface IComponetProps {
  deep: number;
  treeNodeData: ITreeData;
  onTreeNodeClick?: Function;
}
interface IComponetState {
  isOpen: boolean;
}

export default class TreeNode extends Component<
  IComponetProps,
  IComponetState
> {
  constructor() {
    super();
    this.setState({
      isOpen: false
    });
  }

  componentDidMount() {}
  treeNodeClick = event => {
    const { onTreeNodeClick, treeNodeData } = this.props;
    const { isOpen } = this.state;
    const hasChild = treeNodeData.children && treeNodeData.children.length;

    if (hasChild) {
      this.setState({
        isOpen: !isOpen
      });
    }
    onTreeNodeClick(event.currentTarget, this.state.isOpen, hasChild);
  };
  render() {
    const { deep, treeNodeData } = this.props;

    const depth = `deep${deep}`;
    const hasChild =
      treeNodeData.children && treeNodeData.children.length ? "" : "no-child";
    const { isOpen } = this.state;

    // 树节点样式计算
    const nodeClassName = [];
    nodeClassName.push("sein-inspector-tree-node");
    depth && nodeClassName.push(depth);
    hasChild && nodeClassName.push(hasChild);
    isOpen && nodeClassName.push("open");

    // 树节点类型计算
    const { type = "default" } = treeNodeData;

    return (
      <div onClick={this.treeNodeClick} className={nodeClassName.join(" ")}>
        <div className={"tree-node-icon iconfont " + type} />
        <div className="tree-node-text">{treeNodeData.text}</div>
        {this.props.children}
      </div>
    );
  }
}
