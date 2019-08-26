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
  label?: string;
  value: string | number;
}
interface IComponentState {}

export default class Infomation extends Component<
  IComponentProps,
  IComponentState
> {
  constructor() {
    super();
  }

  componentDidMount() {}

  render(props, state) {
    // console.log("infomation render");
    let { label, value } = this.props;

    if (typeof value === 'boolean') {
      value = value ? 'True' : 'False';
    }

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
