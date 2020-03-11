/**
 * @File   : index.tsx
 * @Author : dtysky (dtysky@outlook.com)
 * @Date   : 3/11/2020, 12:03:03 PM
 * @Description:
 */
import {h, Component, Fragment} from 'preact';
import * as Sein from 'seinjs';

import InspectorActor from '../../../Actor/InspectorActor';
import {getController} from '../../../Controllers';

interface IComponentProps {
  actor: InspectorActor;
  object: Sein.PrimitiveComponent;
}

interface IComponentState {

}

export default class MaterialsEditor extends Component<
  IComponentProps,
  IComponentState
> {
  public render() {
    const {object} = this.props;
    const materials = object.getMaterials();

    return (
      <Fragment>
        {
          materials.map((mat, index) => getController('material')(index, true, {}, materials, () => {this.forceUpdate();}))
        }
      </Fragment>
    );
  }
}
