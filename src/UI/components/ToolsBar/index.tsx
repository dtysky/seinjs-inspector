/**
 * resize bar
 */
import { h, Component } from "preact";
import "./index.scss";
interface IComponetProps {
  onResize: Function;
  onResizeEnd: Function;
  onClose: Function;
  onVisible: Function;
  visible: boolean;
  mode?: "left" | "right";
}
export default class ToolsBar extends Component<IComponetProps> {
  protected timer: number;
  protected resizeBar: HTMLElement;
  protected closeIcon: HTMLElement;
  protected hideIcon: HTMLElement;
  protected _positionx: number = 0;
  protected dragging: boolean = false;
  constructor() {
    super();
  }

  componentDidMount() {
    this.bindEvent();
  }
  bindEvent() {
    const { mode } = this.props;
    const dir = mode === "left" ? -1 : 1;
    // resize事件
    this.resizeBar.addEventListener("mousedown", event => {
      if (!this.dragging) {
        const { clientX } = event;
        this.dragging = true;
        this._positionx = clientX;
        this.resizeBar.classList.add("active");
      }
    });

    document.body.addEventListener("mousemove", event => {
      if (this.dragging) {
        this.resize((this._positionx - event.clientX) * dir);
        this._positionx = event.clientX;
      }
    });

    document.body.addEventListener("mouseup", () => {
      if (this.dragging) {
        const { onResizeEnd } = this.props;
        this.dragging = false;
        this._positionx = 0;
        this.resizeBar.classList.remove("active");
        onResizeEnd();
      }
    });

    // 关闭事件
    this.closeIcon.addEventListener("click", () => {
      const { onClose } = this.props;
      onClose();
    });

    // 隐藏按钮点击
    this.hideIcon.addEventListener("click", () => {
      const { onVisible, visible } = this.props;
      onVisible();
      this.hideIcon.classList.toggle("show");
    });
  }
  componentWillUnmount() {}
  resize(distance: number) {
    const { onResize } = this.props;
    onResize(distance);
  }
  render() {
    const { mode } = this.props;
    const toolsClassName = `sein-inspector-tools ${mode}`;
    return (
      <div className={toolsClassName}>
        <span
          ref={close => {
            this.closeIcon = close;
          }}
          className="i-inspector-close iconfont"
        />
        <span
          ref={hide => {
            this.hideIcon = hide;
          }}
          className="i-inpspector-hide"
        >
          <div class="u-box-inside">
            <i />
            <em className="iconfont" />
          </div>
        </span>
        <div
          ref={resizeBar => (this.resizeBar = resizeBar)}
          className="sein-inspector-resize-bar"
        />
      </div>
    );
  }
}
