/*
 * @Description: InfoTab.tsx
 * @Author: 修雷(lc199444@alibaba-inc.com)
 * @Date: 2019-09-06 15:28:00
 * @LastEditTime: 2019-10-28 20:06:40
 */

import { h, Component, Fragment } from 'preact';
import './index.scss';
import { Tab } from '../../components';
import * as Sein from 'seinjs';
interface IComponentProps {
  private?: h.JSX.Element;
  geometry?: h.JSX.Element;
  materials?: h.JSX.Element;
  transform?: h.JSX.Element;
  hidePrivate?: boolean;
  hideGeometry?: boolean;
  hideMaterials?: boolean;
  hideTransform?: boolean;
}
interface IComponentState {
  detailTabId: number;
}
interface ITabItem {
  id: number;
  text: string;
  hidden?: boolean;
}

export default class InfoTab extends Component<
  IComponentProps,
  IComponentState
> {
  private currentId: number = 1;
  private tabItem: Array<ITabItem> = [
    {
      id: 1,
      text: 'Private'
    },
    {
      id: 2,
      text: 'Transform'
    },
    {
      id: 3,
      text: 'Geomerty'
    },
    {
      id: 4,
      text: 'Materials'
    }
  ];
  constructor() {
    super();
    this.setState({
      detailTabId: 1
    });
  }
  public componentWillMount() {
    const {
      hidePrivate,
      hideGeometry,
      hideMaterials,
      hideTransform
    } = this.props;

    if (hidePrivate) {
      this.tabItem[0].hidden = true;
      this.currentId === 1 && this.currentId++;
    }

    if (hideTransform) {
      this.tabItem[1].hidden = true;
      this.currentId === 2 && this.currentId++;
    }

    if (hideGeometry) {
      this.tabItem[2].hidden = true;
      this.currentId === 3 && this.currentId++;
    }

    if (hideMaterials) {
      this.tabItem[3].hidden = true;
    }
  }
  private getTransform() {
    return <Fragment>{this.props.transform}</Fragment>;
  }
  private getPrivate() {
    return <Fragment>{this.props.private}</Fragment>;
  }
  private getMaterials() {
    return <Fragment>{this.props.materials}</Fragment>;
  }
  private getGeometry() {
    return <Fragment>{this.props.geometry}</Fragment>;
  }
  private getTabDetail() {
    const { detailTabId } = this.state;

    switch (detailTabId) {
      case 1:
        return this.getPrivate();
      case 2:
        return this.getTransform();
      case 3:
        return this.getGeometry();
      case 4:
        return this.getMaterials();
      default:
        return null;
    }
  }
  render() {
    return (
      <div className='sein-inspector-component sein-inspector-infotab-container'>
        <div className='sein-inspector-infotab-detail'>
          <Tab
            data={this.tabItem}
            showIcon={false}
            currentId={this.currentId}
            onTabChange={(id: number) =>
              this.setState({ detailTabId: id })
            }></Tab>
          {this.getTabDetail()}
        </div>
      </div>
    );
  }
}
