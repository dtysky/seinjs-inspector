/**
 * @File   : index.tsx
 * @Author : dtysky (dtysky@outlook.com)
 * @Date   : 10/15/2019, 3:38:55 PM
 * @Description:
 */
import {h, Component} from 'preact';

import Group from '../Group';
import './base.scss';

export interface IPropTypes {
  main: h.JSX.Element;
  details: h.JSX.Element;
}

export default class WorldDetails extends Component<IPropTypes> {
  public render() {
    return (
      <div className='sein-inspector-with-details'>
        <div
          className='sein-inspector-content-box u-scrollbar sein-inspector-with-main'
        >
          {this.props.main}
        </div>
        {
          <Group name='Details' isClose={false}>
            {this.props.details}
          </Group>
        }
      </div>
    );
  }
}
