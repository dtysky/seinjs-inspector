/**
 * @File   : Resource.tsx
 * @Author : dtysky (dtysky@outlook.com)
 * @Date   : 7/28/2019, 3:57:30 PM
 * @Description:
 */
import * as Sein from 'seinjs';

import { h, Component, Fragment } from 'preact';
import { Group, Information, Preview, WithDetails, Folder } from '../../components';

import InspectorActor from '../../../Actor/InspectorActor';
import ResourceDetails from '../../details/ResourceDetails';
interface IComponentProps {
  actor: InspectorActor;
}

interface IResource {
  loader: string;
  count: number;
  list: Sein.IResourceEntity[];
}

interface IResourceState {
  [type: string]: IResource;
}

interface IComponentState {
  detail: {
    type: string;
    name: string;
    url: string;
  };
}

export default class Resource extends Component<
  IComponentProps,
  IComponentState
> {
  private resource: IResourceState = {};
  public state: IComponentState;

  public componentWillMount() {
    this.calcResources();
  }

  public componentWillUnmount() {

  }

  private calcResources() {
    const game = this.props.actor.getGame();

    const store = (game.resource as any)._store;

    Object.keys(store).forEach(name => {
      const item: Sein.IResourceEntity = store[name];
      const type = item.type;

      this.resource[type] = this.resource[type] || {
        loader: game.resource.getLoader(type).className.value,
        count: 0,
        list: []
      };

      this.resource[type].list.push(item);
      this.resource[type].count += 1;
    });
  }

  public render() {
    return (
      <div className='sein-inspector-content-box  u-scrollbar'>
        <WithDetails
          main={
            <Fragment>
              {Object.keys(this.resource).map(type => {
                const { loader, count, list } = this.resource[type];

                return (
                  <Folder label={type} value={count.toString()}>
                    <Information label='Loader' value={loader} />
                    {this.renderList(list)}
                  </Folder>
                );
              })}
            </Fragment>
          }
          details={
            this.state.detail && (
              <ResourceDetails
                actor={this.props.actor}
                resource={this.state.detail}
              />
            )
          }
        />
      </div>
    );
  }

  private renderList(list: Sein.IResourceEntity[]) {
    return list.map(item => {
      const {type, name, url} = item;

      return (
        <Information
          label={name}
          value={url}
          onTrigger={() => this.setState({detail: {type: type, name: name, url: url}})}
        />
      );
    });
  }
}
