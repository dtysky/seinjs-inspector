/**
 * @File   : Render.tsx
 * @Author : dtysky (dtysky@outlook.com)
 * @Date   : 7/28/2019, 3:57:30 PM
 * @Description:
 */

import { h, Component } from 'preact';
import * as SPECTOR from 'spectorjs';

import { Group, Button } from '../../components';
import InspectorActor from '../../../Actor/InspectorActor';

interface IComponentProps {
  actor: InspectorActor;
}

interface IComponentState {
  isSpectorShow: boolean;
}

let spector: SPECTOR.Spector;

export default class Render extends Component<
  IComponentProps,
  IComponentState
> {
  public state: IComponentState = {
    isSpectorShow: false
  };

  private spectorUI: HTMLElement;

  componentDidMount() {
    if (!spector) {
      spector = new SPECTOR.Spector();
    }
  }

  componentWillUnmount() {
    this.hideSpectorUI();
  }

  private triggerClick = () => {
    const { isSpectorShow } = this.state;

    if (isSpectorShow) {
      this.hideSpectorUI();
      this.setState({ isSpectorShow: false });
    } else {
      if (!this.spectorUI) {
        spector.displayUI();
        setTimeout(() => {
          this.spectorUI = document.querySelector('.captureMenuComponent');
          this.spectorUI.parentElement.style.removeProperty('display');
        }, 100);
      } else {
        this.spectorUI.parentElement.style.removeProperty('display');
      }

      this.setState({ isSpectorShow: true });
    }
  };

  private hideSpectorUI() {
    if (this.spectorUI) {
      this.spectorUI.parentElement.style.setProperty('display', 'none');
    }
  }

  render() {
    const { isSpectorShow } = this.state;
    const label = isSpectorShow ? '隐藏 Spector' : '显示 Spector';
    return (
      <div className='sein-inspector-content-box u-scrollbar'>
        <Button label={label} onButtonClick={this.triggerClick}></Button>
      </div>
    );
  }
}
