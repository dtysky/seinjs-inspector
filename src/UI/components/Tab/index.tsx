/**
 * tab bar
 */
import { h, Component } from 'preact';
import './index.scss';

interface IComponentProps {
  names: string[];
  current: string;
  onTabChange: (name: string) => void;
}

interface IComponentState {}

export default class Tab extends Component<IComponentProps, IComponentState> {
  protected container: HTMLElement;

  public componentDidMount() {
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

  private handleChangeTab = (name: string) => {
    if (this.props.current !== name) {
      this.props.onTabChange(name);
    }
  }

  public render() {
    return (
      <div>
        <ul
          ref={container => (this.container = container)}
          className='sein-inspector-tab u-scrollbar'
        >
          {
            this.props.names.map(name => (
              <li
                className={
                  'sein-inspector-tab-item' +
                  (name === this.props.current ? ' current' : '')
                }
                // style={width}
                key={name}
                onClick={() => this.handleChangeTab(name)}>
                {name}
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
}
