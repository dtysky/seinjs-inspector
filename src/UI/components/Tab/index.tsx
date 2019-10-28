/**
 * tab bar
 */
import { h, Component } from 'preact';
import './index.scss';

interface IData {
  id: number;
  text: string;
}
interface IComponentProps {
  data: IData[];
  onTabChange: Function;
  currentId?: IData['id'];
  showIcon?: boolean;
}

interface IComponentState {}

export default class Tab extends Component<IComponentProps, IComponentState> {
  private currentId: number = 0;
  private showIcon: boolean = true;
  protected container: HTMLElement;

  public state: IComponentState = {};
  public componentWillMount() {
    this.currentId = this.props.currentId || 1;
    this.props.showIcon !== undefined && (this.showIcon = this.props.showIcon);
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
      'wheel',
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
    if (this.currentId !== id) {
      const { onTabChange } = this.props;
      onTabChange(id);
      this.currentId = id;
    }
  };
  render() {
    const width = { width: `${100 / this.props.data.length}%` };
    return (
      <div>
        <ul
          ref={container => (this.container = container)}
          className='sein-inspector-tab u-scrollbar'>
          {this.props.data.map(item => {
            const id = item.id;
            return (
              <li
                className={
                  'sein-inspector-tab-item' +
                  (id === this.currentId ? ' current' : '')
                }
                // style={width}
                key={item.id}
                onClick={() => {
                  this.changeTab(item.id);
                }}>
                {this.showIcon && <i className={`icon` + id} />}
                {item.text}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
