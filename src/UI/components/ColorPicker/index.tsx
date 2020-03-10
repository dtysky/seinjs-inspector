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
interface IComponentProps {
  // 标签名称
  label?: string;
  // 选中颜色改变时
  onColorChange?: Function;
  // 选中输入改变时
  onColorInput?: Function;
  // 默认颜色 例如：#FFFFFF
  value?: string;
}
interface IComponentState {}

export default class ColorPicker extends Component<
  IComponentProps,
  IComponentState
> {
  private colorInput = event => {
    const {onColorInput} = this.props;

    if (onColorInput) {
      onColorInput(event.target.value);
    }
  }

  private colorChange = event => {
    const {onColorChange} = this.props;

    if (onColorChange) {
      onColorChange(event.target.value);
    }
  }

  public render() {
    const {label, value} = this.props;

    return (
      <div className="sein-inspector-component sein-inspector-color-container">
        <div className="sein-inspector-component-box">
          <label className="sein-inspector-label" title={label || "Label"}>
            {label || "Label"}
          </label>
          <input
            className="sein-inspector-color"
            type="color"
            value={value}
            onInput={this.colorInput}
            onChange={this.colorChange}
          />
          <div className="sein-inspector-color-value">{value}</div>
        </div>
      </div>
    );
  }
}
