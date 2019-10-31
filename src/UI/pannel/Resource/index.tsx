/**
 * @File   : Resource.tsx
 * @Author : dtysky (dtysky@outlook.com)
 * @Date   : 7/28/2019, 3:57:30 PM
 * @Description:
 */
import * as Sein from 'seinjs';

import { h, Component, Fragment } from 'preact';
import { Group, Information, Preview, WithDetails } from '../../components';

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
  details: {
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

  componentWillMount() {
    this.calcResources();
  }

  componentWillUnmount() {}

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

  private getList(list: Sein.IResourceEntity[]) {
    return list.map(item => {
      const { type, images, name, url } = item;

      if (type === 'CubeTexture') {
        const rs = [];
        for (let i in images) {
          rs.push(
            <Information
              label={name}
              value={url + '/' + images[i]}
              onTrigger={() => {
                this.setState({
                  details: {
                    type: type,
                    name: name,
                    url: url + '/' + images[i]
                  }
                });
              }}></Information>
          );
        }
        return rs;
      } else {
        return (
          <Information
            label={name}
            value={url}
            onTrigger={() => {
              if (type === 'GlTF' || type === 'Atlas') {
                this.setState({ details: null });
              } else {
                this.setState({
                  details: {
                    type: type,
                    name: name,
                    url: url
                  }
                });
              }
            }}></Information>
        );
      }
    });
  }
  render() {
    return (
      <div className='sein-inspector-content-box  u-scrollbar'>
        <WithDetails
          main={
            <Fragment>
              {Object.keys(this.resource).map(type => {
                const { loader, count, list } = this.resource[type];
                const preview = this.getList(list);
                return (
                  <Group name={type} key={type}>
                    <Information label='Loader' value={loader} />
                    <Information label='Count' value={count} />
                    {preview}
                  </Group>
                );
              })}
            </Fragment>
          }
          details={
            this.state.details && (
              <ResourceDetails
                actor={this.props.actor}
                resource={this.state.details}></ResourceDetails>
            )
          }></WithDetails>
      </div>
    );
  }
}
