/**
 * @File   : Render.tsx
 * @Author : dtysky (dtysky@outlook.com)
 * @Date   : 7/28/2019, 3:57:30 PM
 * @Description:
 */

import { h, Component } from 'preact';
import { Group, Button } from '../../components';
import InspectorActor from '../../../Actor/InspectorActor';

interface IComponentProps {
  spector: any;
}

interface IComponentState {
  isSpectorShow: boolean;
}
export default class Render extends Component<
  IComponentProps,
  IComponentState
> {
  private spectorUI: HTMLElement;
  constructor() {
    super();

    this.spectorUI = document.querySelector('.captureMenuComponent');
    let isShow = false;
    if (
      this.spectorUI &&
      this.spectorUI.parentElement.style.getPropertyValue('display') !== 'none'
    ) {
      isShow = true;
    }
    this.setState({
      isSpectorShow: isShow
    });
  }
  componentDidMount() {
    this.spectorUI = document.querySelector('.captureMenuComponent');
  }
  componentWillUnmount() {
    // this.hideSpectorUI();
  }
  private triggerClick = () => {
    const { isSpectorShow } = this.state;

    if (isSpectorShow) {
      this.hideSpectorUI();
      this.setState({
        isSpectorShow: false
      });
    } else {
      this.props.spector.displayUI();
      if (!this.spectorUI) {
        this.spectorUI = document.querySelector('.captureMenuComponent');
      }
      this.spectorUI &&
        this.spectorUI.parentElement.style.removeProperty('display');

      this.setState({
        isSpectorShow: true
      });
    }
  };

  private hideSpectorUI() {
    this.spectorUI &&
      this.spectorUI.parentElement.style.setProperty('display', 'none');
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
