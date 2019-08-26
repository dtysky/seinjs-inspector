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
  onButtonClick: Function;
}
interface IComponentState {}

export default class Button extends Component<IComponentProps, IComponentState> {
  constructor() {
    super();
  }

  componentDidMount() {}
  bottonClick = () => {
    const { onButtonClick } = this.props;
    onButtonClick();
  };
  render(props, state) {
    const { label } = this.props;
    return (
      <div className="sein-inspector-component sein-inspector-button-container">
        <div className="sein-inspector-component-box">
          <div
            className="sein-inspector-button"
            onClick={this.bottonClick}
            title={label || "Label"}
          >
            {label || "Label"}
          </div>
        </div>
      </div>
    );
  }
}
