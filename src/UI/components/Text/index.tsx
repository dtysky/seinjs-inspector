/**
 * @File   : index.tsx
 * @Author : dtysky (dtysky@outlook.com)
 * @Date   : 3/6/2020, 1:56:27 PM
 * @Description:
 */
import {h, Component, JSX, Ref, createRef, RefObject} from 'preact';
import * as cx from 'classnames';

import './base.scss';

type TValue = string | number;

interface IComponentProps {
  value: TValue;
  type?: 'string' | 'int' | 'float';
  view?: 'box' | 'underline' | 'oneline';
  prefix?: string;
  color?: string;
  onChange?: (event: Event, value: TValue) => void;
  disabled?: boolean;
  className?: string;
  style?: any;
  inputStyle?: any;
}

interface IComponentState {
  value: TValue;
}

export default class Text extends Component<IComponentProps, IComponentState> {
  static defaultProps: IComponentProps = {
    type: 'float',
    view: 'oneline',
    value: '',
    prefix: null,
    disabled: false,
    onChange: () => {},
    style: {},
    inputStyle: {}
  };
  private _prefix: RefObject<HTMLDivElement> = createRef();
  private _preX: number = null;

  public componentDidMount() {
    // this._prefix.current.addEventListener('touchstart', this.handlePrefixTouchStart);
  }

  public componentWillReceiveProps(nextProps, nextState) {
    this.setState({
      value: nextProps.value
    });
  }

  public componentWillUnmount() {
    this._prefix.current.removeEventListener('touchstart', this.handlePrefixTouchStart);
    this._prefix.current.removeEventListener('touchmove', this.handlePrefixTouchMove);
    this._prefix.current.removeEventListener('touchend', this.handlePrefixTouchEnd);
    this._prefix.current.removeEventListener('touchcancel', this.handlePrefixTouchEnd);
  }

  private handleChange = event => {
    const {
      onChange,
      type
    } = this.props;

    let value = event.target.value;
    if (value === '') {
      onChange(event, value);
      return;
    }

    if (type === 'int') {
      value = /^[-\d]?\d*$/.test(value) ? value : '';
    } else if (type === 'float') {
      value = /^[-\d]?\d*\.?\d*$/.test(value) ? value : '';
    }

    if (value === '' && type !== 'string') {
      return;
    }

    if (type === 'int') {
      value = parseInt(value === '-' ? 0 : value, 10);
    } else if (type === 'float') {
      value = parseFloat(value === '-' ? 0 : value);
    }

    onChange(event, value);
  };

  private handlePrefixTouchStart = (event: TouchEvent) => {
    if (this.props.type !== 'float') {
      return;
    }

    this._prefix.current.removeEventListener('touchstart', this.handlePrefixTouchStart);
    this._prefix.current.addEventListener('touchmove', this.handlePrefixTouchMove);
    this._prefix.current.addEventListener('touchend', this.handlePrefixTouchEnd);
    this._prefix.current.addEventListener('touchcancel', this.handlePrefixTouchEnd);

    this._preX = event.changedTouches[0].clientX;
  }

  private handlePrefixTouchMove = (event: TouchEvent) => {
    const {clientX} = event.changedTouches[0];
    const delta = clientX - this._preX;

    this.props.onChange(null, (this.state.value as number) + delta);

    this._preX = clientX;
  }

  private handlePrefixTouchEnd = (event: TouchEvent) => {
    this._prefix.current.removeEventListener('touchmove', this.handlePrefixTouchMove);
    this._prefix.current.removeEventListener('touchend', this.handlePrefixTouchEnd);
    this._prefix.current.removeEventListener('touchcancel', this.handlePrefixTouchEnd);
    this._prefix.current.addEventListener('touchstart', this.handlePrefixTouchStart);
  }

  public render() {
    const {
      style,
      inputStyle,
      className,
      view,
      prefix,
      disabled,
      onChange,
      ...others
    } = this.props;

    const {
      value
    } = this.state;

    return (
      <div
        className={cx(
          'sein-inspector-text',
          `sein-inspector-text-${view}`,
          prefix && `sein-inspector-text-with-prefix`,
          className
        )}
        style={style}
      >
        {
          prefix && (
            <div
              className={cx(
                'sein-inspector-text-prefix',
                `sein-inspector-text-prefix-${view}`
              )}
              ref={this._prefix}
            >
              {prefix}
            </div>
          )
        }
        <input
          className={cx(
            'sein-inspector-text-input',
            `sein-inspector-text-input-${view}`,
          )}
          value={value}
          onInput={this.handleChange}
          disabled={disabled}
          autoComplete="off"
          style={inputStyle}
          {...others}
        />
      </div>
    );
  }
}
