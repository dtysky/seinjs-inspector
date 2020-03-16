/**
 * @File   : index.tsx
 * @Author : dtysky (dtysky@outlook.com)
 * @Date   : 3/9/2020, 4:10:00 PM
 * @Description:
 */
import {h, Component, ComponentClass, createElement} from 'preact';
import * as Sein from 'seinjs';

import InspectorActor from '../../../Actor/InspectorActor';
import {Tab} from '../../components';
import './base.scss';

interface IComponentProps {
  actor: InspectorActor;
  object: Sein.SObject;
  editors: {
    name: string;
    componentClass: ComponentClass<{actor: InspectorActor, object: Sein.SObject}>
  }[];
}

interface IComponentState {
  currentTab: string;
}

export default class BaseEditor extends Component<
  IComponentProps,
  IComponentState
> {
  public state: IComponentState = {
    currentTab: null
  };

  public componentDidMount() {
    this.setState({currentTab: this.props.editors[0].name});
  }

  public componentWillReceiveProps(nextProps: IComponentProps) {
    if (this.props.object.uuid !== nextProps.object.uuid) {
      this.setState({currentTab: nextProps.editors[0].name});
    }
  }

  public render() {
    const {editors, object} = this.props;

    return (
      <div className='sein-inspector-component sein-inspector-editor-container'>
        <div className='sein-inspector-editor-detail'>
          {editors.length > 1 && (
            <Tab
                names={editors.map(item => item.name)}
                current={this.state.currentTab}
                onTabChange={(name: string) =>
                  this.setState({currentTab: name})
                }
            />
          )}
          {this.renderTabDetail()}
        </div>
      </div>
    );
  }

  private renderTabDetail() {
    const {editors, actor, object} = this.props;
    const editor = editors.filter(e => e.name === this.state.currentTab)[0];

    if (!editor) {
      return null;
    }

    return createElement(editor.componentClass, {actor, object});
  }
}
