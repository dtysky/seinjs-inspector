/*
 * @Description: 预览组件
 * @Author: 修雷(lc199444@alibaba-inc.com)
 * @Date: 2019-09-02 12:01:34
 * @LastEditTime: 2019-10-30 10:24:13
 */

import { h, Component } from 'preact';
import './index.scss';
interface IComponentProps {
  name: string;
  url: string;
}
interface IComponentState {
  canEdit: boolean;
}

export default class Preview extends Component<
  IComponentProps,
  IComponentState
> {
  public state: IComponentState = {
    canEdit: false
  };

  private getPreviewBox() {
    const {name, url} = this.props;

    return (
      <div className='sein-inspector-preview-box'>
        <img src={url} alt={name} />
        {
          this.state.canEdit && (
            <div className='sein-inspector-preview-buttons'>
              <input type='file' name={name} id={name} />
            </div>
          )
        }
      </div>
    );
  }

  public render() {
    return (
      <div className='sein-inspector-component sein-inspector-preview-container'>
        <div className='sein-inspector-preview-content'>
          {this.getPreviewBox()}
        </div>
      </div>
    );
  }
}
