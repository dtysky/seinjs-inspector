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
  children?;
  name: string;
}
interface IComponentState {}

export default class Group extends Component<IComponentProps, IComponentState> {
  protected groupBar: HTMLElement;
  protected content: HTMLElement;
  protected isClose: boolean = false;
  constructor() {
    super();
  }
  toggle = () => {
    this.groupBar.classList.toggle("close");
    this.content.classList.toggle("close");
    this.isClose = this.groupBar.classList.contains("close");
  };
  componentDidMount() {
    // console.log(this.isClose);
    this.content.style.height = `${this.content.clientHeight}px`;
    this.groupBar.addEventListener("click", this.toggle);
  }
  componentWillUnmount() {
    // console.log(this.isClose);
    this.groupBar.classList.remove("close");
    this.content.classList.remove("close");
    this.groupBar.removeEventListener("click", this.toggle);
  }
  render(props, state) {
    const { name } = this.props;
    return (
      <div className="sein-inspector-group">
        <div
          ref={group => (this.groupBar = group)}
          className="sein-inspector-group-bar"
        >
          {name}
          <i>&nbsp;</i>
        </div>
        <div
          ref={content => (this.content = content)}
          className="sein-inspector-group-content"
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}
