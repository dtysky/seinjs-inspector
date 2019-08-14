/**
 * @File   : Game.tsx
 * @Author : dtysky (dtysky@outlook.com)
 * @Date   : 7/28/2019, 3:55:56 PM
 * @Description:
 */
/**
 * tab bar
 */
import { h, Component } from "preact";
import "./index.scss";
interface IComponetProps {
  // 标签名称
  label?: string;
  // 选中颜色改变时
  onColorChange?: Function;
  // 选中输入改变时
  onColorInput?: Function;
  // 默认颜色 例如：#FFFFFF
  value?: string;
}
interface IComponetState {
  curColor: string;
}

export default class ColorPicker extends Component<
  IComponetProps,
  IComponetState
> {
  constructor(porps: IComponetProps) {
    super();
    this.setState({ curColor: porps.value || "#000000" });
  }

  componentDidMount() {}
  colorInput = event => {
    const { onColorInput } = this.props;
    this.setState({
      curColor: event.target.value
    });
    if (onColorInput) {
      onColorInput(this.state.curColor);
    }
  };
  colorChange = event => {
    const { onColorChange } = this.props;
    this.setState({
      curColor: event.target.value
    });
    if (onColorChange) {
      onColorChange(this.state.curColor);
    }
  };
  render() {
    // console.log("ColorPicker render");
    const { label } = this.props;
    const { curColor } = this.state;
    return (
      <div className="sein-inspector-component sein-inspector-color-container">
        <div className="sein-inspector-component-box">
          <label className="sein-inspector-label" title={label || "Label"}>
            {label || "Label"}
          </label>
          <input
            className="sein-inspector-color"
            type="color"
            value={curColor}
            onInput={this.colorInput}
            onChange={this.colorChange}
          />
          <div className="sein-inspector-color-value">{curColor}</div>
        </div>
      </div>
    );
  }
}
