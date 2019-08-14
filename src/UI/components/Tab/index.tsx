/**
 * tab bar
 */
import { h, Component } from "preact";
import "./index.scss";
import { TabItem } from "../../../constant";
interface IData {
  id: number;
  text: string;
}
interface IComponetProps {
  onTabChange: Function;
}

interface IComponetState {
  curIndex: number;
}
export default class Tab extends Component<IComponetProps, IComponetState> {
  protected container: HTMLElement;
  protected data: IData[] = TabItem;
  constructor() {
    super();
    this.setState({
      curIndex: 1
    });
  }
  private debounce(method: Function, wait: number = 0) {
    let timer: number = 0;

    return function() {
      const context = this;
      const args = arguments;

      window.clearTimeout(timer);

      timer = window.setTimeout(() => {
        method.apply(context, args);
      }, wait);
    };
  }
  private throttle(method: Function, wait: number = 0) {
    let _lastTimer = 0;

    return function() {
      const _nowTimer = Date.now();
      const args = arguments;
      const context = this;
      if (_nowTimer - _lastTimer > wait || !_lastTimer) {
        method.apply(context, args);
        _lastTimer = _nowTimer;
      }
    };
  }
  componentDidMount() {
    this.container.addEventListener(
      "wheel",
      this.throttle((event: WheelEvent) => {
        event.stopPropagation();
        if (event.deltaY > 0) {
          this.container.scrollLeft += 10;
        } else {
          this.container.scrollLeft -= 10;
        }
      }, 45),
      {
        passive: false
      }
    );
  }
  changeTab = (id: number) => {
    const { curIndex } = this.state;
    if (curIndex !== id) {
      const { onTabChange } = this.props;
      onTabChange(id);
      this.setState({
        curIndex: id
      });
    }
  };
  render(props, state) {
    const width = { width: `${100 / this.data.length}%` };
    const { curIndex } = this.state;
    return (
      <div>
        <ul
          ref={container => (this.container = container)}
          className="sein-inspector-tab u-scrollbar"
        >
          {this.data.map(item => {
            const id = item.id;
            return (
              <li
                className={
                  "sein-inspector-tab-item" +
                  (id === curIndex ? " current" : "")
                }
                style={width}
                key={item.id}
                onClick={() => {
                  this.changeTab(item.id);
                }}
              >
                <i className={`icon` + id} />
                {item.text}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
