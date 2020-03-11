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

    return (
      <Fragment>
        {
          object.getMaterials().map(mat => getController('material')(null, true, {}, mat, () => {this.forceUpdate();}))
        }
      </Fragment>
    );
  }
}
