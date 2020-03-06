/**
 * @File   : index.tsx
 * @Author : dtysky (dtysky@outlook.com)
 * @Date   : 7/28/2019, 3:55:56 PM
 * @Description:
 */
import { h, render as preactRender, Component, ComponentClass, createElement } from 'preact';
import * as Sein from 'seinjs';

import { TabItem } from '../constant';
import Framework from './panel/Framework';
import Info from './panel/Info';
import Structure from './panel/Structure';
import Actor from './panel/Actor';
import Resource from './panel/Resource';
import Event from './panel/Event';
import Player from './panel/Player';
import Render from './panel/Render';
import { Tab } from './components';
import InspectorActor from '../Actor/InspectorActor';
import './index.scss';

let changePanels = () => {}
const PANELS: {[name: string]: ComponentClass<{actor: InspectorActor}>} = {};
const PANELS_NAMES: string[] = [];

export function registerPanel(name: string, component: ComponentClass<{actor: InspectorActor}>, index: number = -1) {
  if (PANELS[name]) {
    Sein.Debug.warn(`Panel ${name} is already existed, overwirte...`);
    PANELS[name] = component;
  } else {
    PANELS[name] = component;
    if (index < 0) {
      PANELS_NAMES.push(name);
    } else {
      PANELS_NAMES.splice(index, 0, name);
    }
  }

  changePanels();
}

export function unregisterPanel(name: string) {
  if (PANELS[name]) {
    delete PANELS[name];
    PANELS_NAMES.splice(PANELS_NAMES.indexOf(name), 1);
  }
}

registerPanel('BaseInfo', Info);
registerPanel('Structure', Structure);
registerPanel('Actor', Actor);
registerPanel('Resource', Resource);
registerPanel('Render', Render);

interface IComponentProps {
  actor: InspectorActor;
}

interface IComponentState {
  // 当前显示tab的序列
  tab: string;
}

class Inspector extends Component<IComponentProps, IComponentState> {
  public state: IComponentState = {
    tab: ''
  };

  protected container: HTMLElement;
  protected _width: number = 0;
  protected isChecked: boolean = false;

  componentDidMount() {
    changePanels = () => {
      this.forceUpdate();
    };

    this.setState({tab: PANELS_NAMES[0]});
  }

  handleTabChange = (name: string) => {
    this.setState({tab: name});
  };

  public render() {
    return (
      <div>
        <Framework title='SeinJS Inspector'>
          <Tab
            names={PANELS_NAMES}
            current={this.state.tab}
            onTabChange={this.handleTabChange}
          />
          {this.renderComponent()}
        </Framework>
      </div>
    );
  }

  private renderComponent() {
    const {tab} = this.state;

    if (!tab) {
      return null;
    }

    return createElement(PANELS[tab], {actor: this.props.actor});
  }
}

export default function render(node: HTMLElement, actor: InspectorActor) {
  preactRender(<Inspector actor={actor} />, node);
}
