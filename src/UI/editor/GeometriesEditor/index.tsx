/**
 * @File   : index.tsx
 * @Author : dtysky (dtysky@outlook.com)
 * @Date   : 3/11/2020, 4:24:06 PM
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

export default class GeometriesEditor extends Component<
  IComponentProps,
  IComponentState
> {
  public render() {
    const {object} = this.props;
    const materials = object.getMaterials();
    const geometries = materials.map(mat => object.getGeometry(mat.name));

    return (
      <Fragment>
        {
          materials.map((mat, index) => getController('geometry')(
            index, true,
            {
              materialName: mat.name,
              attributes: Sein.isRawShaderMaterial(mat) ? Object.keys(mat.attributes).map(key => {
                if (!(mat as any)._initOptions.attributes) {
                  return null;
                }

                const a = (mat as any)._initOptions.attributes[key];

                if (typeof a === 'string') {
                  return null;
                }

                return key;
              }).filter(a => !!a) : []
            },
            geometries, () => {this.forceUpdate();})
          )
        }
      </Fragment>
    );
  }
}
