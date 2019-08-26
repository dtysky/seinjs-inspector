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
  checked: boolean;
  onCheckedChange: Function;
}
interface IComponentState {
  checked: boolean;
}

export default class Switch extends Component<IComponentProps, IComponentState> {
  constructor(props) {
    super(props);
    this.setState({
      checked: props.checked || false
    });
  }

  componentDidMount() {
    console.log("switch did mount");
  }

  switchChange = () => {
    const { onCheckedChange } = this.props;
    const { checked } = this.state;
    this.setState({
      checked: !checked
    });
    onCheckedChange(this.state.checked);
  };
  render() {
    // console.log("switch render");
    const { label } = this.props;
    const { checked } = this.state;
    const switchClassName = checked ? "switch-icon" : "switch-icon unchecked";
    return (
      <div className="sein-inspector-component sein-inspector-switch-container">
        <div className="sein-inspector-component-box">
          <label className="sein-inspector-label" title={label || "Label"}>
            {label || "Label"}
          </label>
          <div className={switchClassName} onClick={this.switchChange}>
            <div className="box-inside">
              <span className="switch-text switch-text-on" />
              <span className="switch-text switch-text-off" />
              <i className="switch-circle" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
