/**
 * @File   : Framework.tsx
 * @Author : dtysky (dtysky@outlook.com)
 * @Date   : 3/6/2020, 2:17:34 PM
 * @Description:
 */
import { h, Component } from 'preact';
import { ToolsBar } from '../../components';
import './index.scss';

interface IComponentProps {
  mode?: 'left' | 'right';
  title?: string;
}

interface IComponentState {
  // 当前工具宽度
  width: number;
  // 当前是否隐藏
  display: boolean;
  // 当前是否显示
  visible: boolean;
}

export default class Framework extends Component<
  IComponentProps,
  IComponentState
> {
  public state: IComponentState = {
    width: 320,
    display: true,
    visible: true
  };

  private resize = (distance: number) => {
    this.setState({width: this.state.width + distance});
  }

  private close = () => {
    this.setState({
      display: false
    });
  }

  private visibleChange = () => {
    const { visible } = this.state;

    this.setState({
      visible: !visible
    });
  }

  private resizeEnd = () => {

  }

  public render() {
    const { mode, title } = this.props;
    const { width, display, visible } = this.state;

    if (!display) {
      return null;
    }

    const conStyle = {width: `${width}px`};
    const containerClassName = `sein-inspector-container ${mode === 'left' ? 'explorer' : ''} ${visible ? '' : 'hide'}`;

    return (
      <div className={containerClassName}>
        <div className='sein-inspector-content' style={conStyle}>
          <div className='sein-inspector-title'>{title || 'Title'}</div>
          {this.props.children}
        </div>
        <ToolsBar
          onResize={this.resize}
          onClose={this.close}
          onVisible={this.visibleChange}
          visible={visible}
          onResizeEnd={this.resizeEnd}
          mode={mode}
        />
      </div>
    );
  }
}
