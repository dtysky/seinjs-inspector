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
import {
  Group,
  Select,
  Switch,
  Button,
  Infomation,
  Range,
  ColorPicker
} from "../../components";
interface IComponetProps {
  dataChange: Function;
  switchChecked: boolean;
}

interface IComponetState {
  _currentTime: number;
}
export default class Game extends Component<IComponetProps, IComponetState> {
  protected _timer: number;
  constructor() {
    super();
    this.setState({
      _currentTime: 0
    });
  }

  componentDidMount() {
    console.log("game did mouted");

    this._timer = window.setInterval(() => {
      let { _currentTime } = this.state;
      this.setState({
        _currentTime: ++_currentTime
      });
    }, 1000);
  }
  componentWillUnmount() {
    window.clearInterval(this._timer);
  }
  onCheckedChange = checked => {
    console.log("game checked chagne", checked);
    const { dataChange } = this.props;
    dataChange(checked);
  };
  onSelectChange = value => {
    console.log("game select chage", value);
  };
  onButtonClick = () => {
    console.log("game button click");
  };
  onRangeChange = value => {
    console.log("game range chage", value);
  };
  onRangeInput = value => {
    console.log("game range input", value);
  };
  onColorChange = curColor => {
    console.log("game color change", curColor);
  };
  onColorInput = curColor => {
    console.log("game color input", curColor);
  };
  render(props, state) {
    // console.log("game render", this.state._currentTime);

    const options = [
      {
        text: "女神异闻录5",
        value: "Persona5"
      },
      {
        text: "怪物猎人世界DLC冰原",
        value: "Monster Hunter World: Iceborne",
        selected: true
      },
      {
        text: "战神",
        value: 1
      }
    ];

    const { switchChecked } = this.props;
    return (
      <div className="sein-inspector-content-box  u-scrollbar">
        <Switch
          label={"一个Switch开关"}
          checked={false}
          onCheckedChange={this.onCheckedChange}
        />
        <Select
          label={"这是二个选择框哈"}
          options={options}
          onSelectChange={this.onSelectChange}
        />
        <Button label={"我的第二个按钮"} onButtonClick={this.onButtonClick} />
        <Infomation label="当前时间" value={"我是静态字符串"} />
        <Range
          label={"当前是二个范围选择组件"}
          value={1}
          min={1}
          max={11}
          step={0.1}
          onRangeChange={this.onRangeChange}
        />
        <ColorPicker
          label={"我的第二个取色器"}
          value="#FFAA00"
          onColorChange={this.onColorChange}
          onColorInput={this.onColorInput}
        />
        <Group name="Sein Inspector">
          <Switch
            label={"两个Switch开关"}
            checked={switchChecked}
            onCheckedChange={this.onCheckedChange}
          />

          <Button label={"我的第一个按钮"} onButtonClick={this.onButtonClick} />
          <Select
            label={"这是一个选择框哈"}
            options={options}
            onSelectChange={this.onSelectChange}
          />

          <Infomation label="当前时间" value={this.state._currentTime} />

          <Range
            label={"当前是一个范围选择组件"}
            value={1}
            min={1}
            max={11}
            step={0.1}
            onRangeChange={this.onRangeChange}
          />
          <ColorPicker
            label={"我的第一个取色器"}
            value="#FFAA00"
            onColorChange={this.onColorChange}
            onColorInput={this.onColorInput}
          />
        </Group>
      </div>
    );
  }
}
