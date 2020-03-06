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
  // 当前显示tab的序列
  tabIndex: number;
}
export default class Framework extends Component<
  IComponentProps,
  IComponentState
> {
  protected container: HTMLElement;
  protected _width: number = 0;

  constructor() {
    super();
    this.setState({
      display: true,
      visible: true,
      tabIndex: 1
    });
    // 设置初始的时间
  }

  componentDidMount() {
    // console.log("inspector mounted", this.container);

    this._width = this.container.clientWidth;
    this.container.style.setProperty('width', `${this._width}px`);
    this.container.style.setProperty('--content-width', `${this._width}px`);
  }

  componentWillUnmount() {}
  /**
   * resize 窗口
   *
   */
  resize = (distance: number) => {
    const { width } = this.state;
    // 重新设置宽度
    this.container.style.width = `auto`;
    this.setState({
      width: this._width + distance
    });

    this._width = this.state.width;
  };
  close = () => {
    this.setState({
      display: false
    });
  };
  visibleChange = () => {
    const { visible } = this.state;

    this.setState({
      visible: !visible
    });
  };
  resizeEnd = () => {
    const { width } = this.state;
    this.container.style.setProperty('width', `${width}px`);
    this.container.style.setProperty('--content-width', `${width}px`);
  };
  onTabChange = (id: number) => {
    this.setState({
      tabIndex: id
    });
  };

  render() {
    const { mode, title } = this.props;
    const { width, display, visible } = this.state;

    if (!display) {
      return null;
    }
    const conStyle = {
      width: `${width}px`
    };
    const containerClassName = `sein-inspector-container ${
      mode === 'left' ? 'explorer' : ''
    } ${visible ? '' : 'hide'}`;
    return (
      <div
        ref={container => (this.container = container)}
        className={containerClassName}>
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
