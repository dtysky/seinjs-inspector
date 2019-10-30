/*
 * @Description: AnimatorComponentEditor.tsx
 * @Author: 修雷(lc199444@alibaba-inc.com)
 * @Date: 2019-09-09 14:52:36
 * @LastEditTime: 2019-09-09 17:24:15
 */

import { h, Component } from 'preact';
import './index.scss';
import { Select, Button } from '../../components';
import * as Sein from 'seinjs';
interface IComponentProps {
  component: Sein.AnimatorComponent;
}
interface IComponentState {
  options: Array<{
    text: string;
    value: string | number;
    selected?: boolean;
  }>;
  current: string;
}

export default class AnimatorComponentEditor extends Component<
  IComponentProps,
  IComponentState
> {
  public state: IComponentState = {
    options: [],
    current: ''
  };

  componentDidMount() {
    const { component } = this.props;

    const options = component.animationNames.map(item => {
      return {
        text: item,
        value: item,
        selected: component.current === item
      };
    });
    // console.log(options);
    this.setState({
      options: options
    });
  }
  onSelectChange = value => {
    const { component } = this.props;
    component.stop();
    component.play(value);

    this.setState({current: value});
  };

  playAnimation = () => {
    const { component } = this.props;
    const { current } = this.state;
    component.play(current);
  };

  pauseAnimation = () => {
    const { component } = this.props;
    component.pause();
  };
  stopAnimation = () => {
    const { component } = this.props;
    component.stop();
  };
  resumeAnimation = () => {
    const { component } = this.props;
    component.resume();
  };

  render() {
    const { component } = this.props;
    const { options } = this.state;

    // 是否是AnimatorComponent类型
    if (!Sein.isAnimatorComponent(component)) {
      return null;
    }

    return (
      <div className='sein-inspector-component sein-inspector-animatoreditor-container'>
        <div className='sein-inspector-animatoreditor-detail'>
          <Select
            label={'当前播放的动画名称'}
            options={options}
            onSelectChange={this.onSelectChange}
          />
          <Button label='play' onButtonClick={this.playAnimation}></Button>
          <Button label='pause' onButtonClick={this.pauseAnimation}></Button>
          <Button label='resume' onButtonClick={this.resumeAnimation}></Button>
          <Button label='stop' onButtonClick={this.stopAnimation}></Button>
        </div>
      </div>
    );
  }
}
