/**
 * @File   : index.tsx
 * @Author : dtysky (dtysky@outlook.com)
 * @Date   : 3/6/2020, 1:56:27 PM
 * @Description:
 */
import {h, Component, JSX} from 'preact';
import cx from 'classnames';

import './base.scss';

type TValue = string | number;

interface IComponentProps {
  value: TValue;
  type?: 'string' | 'int' | 'float';
  view?: 'box' | 'underline';
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
    view: 'box',
    value: '',
    prefix: null,
    disabled: false,
    onChange: () => {},
    style: {},
    inputStyle: {}
  };

  componentWillReceiveProps(nextProps, nextState) {
    this.setState({
      value: nextProps.value
    });
  }

  handleChange = event => {
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

  render() {
    const {
      style,
      inputStyle,
      className,
      view,
      prefix,
      disabled,
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
          onChange={this.handleChange}
          disabled={disabled}
          autoComplete="off"
          style={inputStyle}
          {...others}
        />
      </div>
    );
  }
}
