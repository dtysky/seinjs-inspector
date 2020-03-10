/**
 * @File   : EventController.tsx
 * @Author : dtysky (dtysky@outlook.com)
 * @Date   : 3/9/2020, 4:44:10 PM
 * @Description:
 */
import * as Sein from 'seinjs';
import {h} from 'preact';

import Text from '../UI/components/Text';
import Switch from '../UI/components/Switch';
import {TController} from '../types';
import {Folder, Information} from '../UI/components';

const EventController: TController<Sein.EventManager> = (
  name: string,
  readonly: boolean,
  options: any,
  object: Sein.SObject,
  onChange: (value: Sein.EventManager) => void
) => {
  const event = object[name];
  const {_observables} = event;

  return (
    <Folder label={'Events'} close={true}>
      {Object.keys(_observables).map(name => (
        <Information label={name} value={_observables[name]._length} />
      ))}
    </Folder>
  );
}

export default EventController;
