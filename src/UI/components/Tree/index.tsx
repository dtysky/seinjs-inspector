import { h, Component } from "preact";
import "./index.scss";
import { TreeNode, LightTreeNode } from "./TreeNode";
import { ITreeData } from "./TreeNode/types";

interface IComponentProps {
  data: Array<ITreeData>;
}
interface IComponentState {}

export default class Tree extends Component<IComponentProps, IComponentState> {
  private _currentTreeNode: HTMLElement;
  constructor() {
    super();
  }

  componentDidMount() {}
  onLightClick = (isDisable: boolean): Promise<any> => {
    return new Promise((resolve, reject) => {
      // do somethring
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  };
  private getTreeNodeByType(deep: number, treedata: ITreeData) {
    switch (treedata.type) {
      case "light":
        return (
          <LightTreeNode
            key={treedata.id}
            deep={deep}
            treeNodeData={treedata}
            onTreeNodeClick={this.onTreeNodeClick}
            onLightClick={this.onLightClick}
          />
        );
      default:
        return (
          <TreeNode
            key={treedata.id}
            deep={deep}
            treeNodeData={treedata}
            onTreeNodeClick={this.onTreeNodeClick}
          />
        );
    }
  }
  private getTree(treeData: Array<ITreeData>, deep?: number) {
    const rs = [];
    if (deep !== undefined) {
      deep++;
    } else {
      deep = 0;
    }

    treeData.map(item => {
      rs.push(this.getTreeNodeByType(deep, item));

      if (item.children && item.children.length) {
        rs.push(
          <div className="sein-inspector-children-container">
            {this.getTree(item.children, deep)}
          </div>
        );
      }
    });

    return rs;
  }
  private onTreeNodeClick = (
    node: HTMLElement,
    open: boolean,
    hasChild: boolean
  ) => {
    if (hasChild) {
      if (open) {
        node.nextElementSibling.classList.add("open");
      } else {
        node.nextElementSibling.classList.remove("open");
      }
    } else {
      this._currentTreeNode && this._currentTreeNode.classList.remove("select");
      node.classList.add("select");
      this._currentTreeNode = node;
    }
    // console.log(node.nextSibling.classList, open);
  };
  render() {
    const { data } = this.props;
    return <div className="sein-inspector-tree">{this.getTree(data)}</div>;
  }
}
