/**
 * @File   : ResourceGLTFController.tsx
 * @Author : dtysky (dtysky@outlook.com)
 * @Date   : 3/13/2020, 1:05:23 PM
 * @Description:
 */
import * as Sein from 'seinjs';
import {h, Fragment} from 'preact';

import {TController} from '../types';
import {Folder, Text, Switch, Information} from '../UI/components';
import {getController, getControllerType} from './utils';

const ResourceGLTFController: TController<Sein.IGlTFModel> = (
  name: string,
  readonly: boolean,
  options: any,
  object: any,
  onChange: (value: Sein.IGlTFModel) => void
) => {
  const model = object[name] as Sein.IGlTFModel;

  if (!model) {
    return null;
  }

  return (
    <Fragment>
      {
        Object.keys(model).map(key => {
          if (key === 'json' || key === '__inspector_show') {
            return null;
          }

          const value = model[key];
          const isArray = value instanceof Array; 
          const length = isArray ? value.length : '';

          value['__inspector_show'] = value['__inspector_show'] || false;

          return (
            <Folder
              label={key}
              value={length.toString()}
              close={true}
              onTrigger={closed => {value['__inspector_show'] = !closed; onChange(model)}}
              onDestroy={() => value['__inspector_show'] = false}
            >
            {
              value['__inspector_show'] && (
                isArray ? (value as any[]).map((item, index) => {
                  return getController(getControllerType(item))(index, true, {lazy: true}, value, () => onChange(model));
                })
                  : value.children
                    ? getController('nest')(key, true, {}, model, () => onChange(model))
                    : Object.keys(value).map(k => {
                      return getController(getControllerType(value[k]))(k, true, {lazy: true}, value, () => onChange(model));
                    })
              )
            }
          </Folder>
          )
        })
      }
    </Fragment>
  );
}

export default ResourceGLTFController;
