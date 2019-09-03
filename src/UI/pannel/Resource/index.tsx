/**
 * @File   : Resource.tsx
 * @Author : dtysky (dtysky@outlook.com)
 * @Date   : 7/28/2019, 3:57:30 PM
 * @Description:
 */
import * as Sein from 'seinjs';

import { h, Component } from 'preact';
import { Group, Information, Preview } from '../../components';

import InspectorActor from '../../../Actor/InspectorActor';

interface IComponentProps {
  actor: InspectorActor;
}

interface IResource {
  loader: string;
  count: number;
  list: Sein.IResourceEntity[];
}

interface IComponentState {
  [type: string]: IResource;
}

export default class Resource extends Component<
  IComponentProps,
  IComponentState
> {
  public state: IComponentState = {};

  componentDidMount() {
    this.calcResources();
  }

  componentWillUnmount() {}

  private calcResources() {
    const game = this.props.actor.getGame();

    console.log(game);
    const info: IComponentState = {};

    const store = (game.resource as any)._store;

    Object.keys(store).forEach(name => {
      const item: Sein.IResourceEntity = store[name];
      const type = item.type;

      info[type] = info[type] || {
        loader: game.resource.getLoader(type).className.value,
        count: 0,
        list: []
      };

      info[type].list.push(item);
      info[type].count += 1;
    });

    this.setState(info);
  }

  private getList(list: Sein.IResourceEntity[]) {
    return list.map(item => {
      const { type, images, name, url } = item;

      if (type === 'CubeTexture') {
        const rs = [];
        for (let i in images) {
          rs.push(
            <Preview
              type={type}
              name={name}
              url={url + '/' + images[i]}></Preview>
          );
        }
        return rs;
      } else {
        return <Preview type={type} name={name} url={url}></Preview>;
      }
    });
  }
  render() {
    return (
      <div className='sein-inspector-content-box  u-scrollbar'>
        {Object.keys(this.state).map(type => {
          const { loader, count, list } = this.state[type];
          const preview = this.getList(list);
          return (
            <Group name={type} key={type}>
              <Information label='Loader' value={loader} />
              <Information label='Count' value={count} />
              {preview}
            </Group>
          );
        })}
      </div>
    );
  }
}
