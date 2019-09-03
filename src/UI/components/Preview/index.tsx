/*
 * @Description: 预览组件
 * @Author: 修雷(lc199444@alibaba-inc.com)
 * @Date: 2019-09-02 12:01:34
 * @LastEditTime: 2019-09-02 20:42:46
 */

import { h, Component } from 'preact';
import './index.scss';
interface IComponentProps {
  type: string;
  name: string;
  url: string;
  images?: {
    [key: string]: string;
  };
}
interface IComponentState {
  isClose: boolean;
  canEdit: boolean;
}

export default class Preview extends Component<
  IComponentProps,
  IComponentState
> {
  constructor() {
    super();
    this.setState({
      isClose: true,
      canEdit: true
    });
  }
  componentWillMount() {
    const { type } = this.props;
    if (type === 'GlTF' || type === 'Atlas') {
      this.setState({
        canEdit: false
      });
    }
  }
  componentDidMount() {}

  private getPreviewBox() {
    const { type, images, name, url } = this.props;
    const { isClose } = this.state;

    return !isClose ? (
      <div className='sein-inspector-preview-box'>
        <img src={url} alt={name} />
        <div className='sein-inspector-preview-buttons'>
          <span className='replace-image'>替换</span>
          <span className='close-preview' onClick={this.close}>
            关闭
          </span>
        </div>
      </div>
    ) : null;
  }
  private close = () => {
    this.setState({
      isClose: !this.state.isClose
    });
  };
  render() {
    console.log('render');
    const { name, url } = this.props;
    const { canEdit } = this.state;

    const editIcon = canEdit ? (
      <i
        className='iconfont sein-inspector-preview-edit icon-bianji'
        onClick={this.close}
        title={url}></i>
    ) : null;

    return (
      <div className='sein-inspector-component sein-inspector-preview-container'>
        <div className='sein-inspector-preview-content'>
          <div className='sein-inspector-component-box'>
            <label className='sein-inspector-label' title={name || 'Label'}>
              {name}
            </label>
            <div className='sein-inspector-preview-value' title={url}>
              {url}
            </div>
            {editIcon}
          </div>
          {canEdit && this.getPreviewBox()}
        </div>
      </div>
    );
  }
}
