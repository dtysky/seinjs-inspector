/**
 * @File   : Game.tsx
 * @Author : dtysky (dtysky@outlook.com)
 * @Date   : 7/28/2019, 3:55:56 PM
 * @Description:
 */
/**
 * tab bar
 */
import { h, Component } from 'preact';
import './index.scss';
interface IComponentProps {
  label?: string;
  value?: number;
  min: number;
  max: number;
  step?: number;
  onRangeChange?: Function;
  onRangeInput?: Function;
}
interface IComponentState {
  curValue: number;
}

export default class Range extends Component<IComponentProps, IComponentState> {
  constructor(props: IComponentProps) {
    super();
    this.setState({
      curValue: props.value
    });
  }

  componentDidMount() {}
  rangeChange = event => {
    const { onRangeChange } = this.props;
    this.setState({
      curValue: event.target.value
    });
    if (onRangeChange) {
      onRangeChange(event.target.value);
    }
  };
  rangeInput = event => {
    const { onRangeInput } = this.props;
    this.setState({
      curValue: event.target.value
    });
    if (onRangeInput) {
      onRangeInput(event.target.value);
    }
  };
  render(props, state) {
    // console.log("infomation render");
    const { label, min, max, step } = this.props;
    const { curValue } = this.state;

    let mintext = min.toString(),
      maxtext = max.toString();

    if (min === Math.PI) {
      mintext = 'PI';
    } else if (min === -Math.PI) {
      mintext = '-PI';
    }

    if (max === Math.PI) {
      maxtext = 'PI';
    } else if (max === -Math.PI) {
      maxtext = '-PI';
    }
    const width = {
      width: `${max.toString().length * 12}px`
    };
    return (
      <div className='sein-inspector-component sein-inspector-range-container'>
        <div className='sein-inspector-component-box'>
          <label className='sein-inspector-label' title={label || 'Label'}>
            {label || 'Label'}
          </label>
          <div className='sein-inspector-range'>
            <span className='sein-inspector-range-min'>{mintext}</span>
            <input
              onInput={this.rangeInput}
              onChange={this.rangeChange}
              className='sein-inspector-range-input'
              type='range'
              value={curValue}
              min={min}
              max={max}
              step={step}
            />
            <span className='sein-inspector-range-max'>{maxtext}</span>
          </div>
          <div
            // style={width}
            className='sein-inspector-range-value'
            title={curValue.toString()}>
            {curValue}
          </div>
        </div>
      </div>
    );
  }
}
