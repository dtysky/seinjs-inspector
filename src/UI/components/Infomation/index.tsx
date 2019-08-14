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
  label?: string;
  value: string | number;
}
interface IComponetState {}

export default class Infomation extends Component<
  IComponetProps,
  IComponetState
> {
  constructor() {
    super();
  }

  componentDidMount() {}

  render(props, state) {
    // console.log("infomation render");
    const { label, value } = this.props;
    return (
      <div className="sein-inspector-component sein-inspector-infomation-container">
        <div className="sein-inspector-component-box">
          <label className="sein-inspector-label" title={label || "Label"}>
            {label || "Label"}
          </label>
          <div className="sein-inspector-infomation-value">{value}</div>
        </div>
      </div>
    );
  }
}
