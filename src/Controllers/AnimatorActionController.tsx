/**
 * @File   : AnimatorActionController.tsx
 * @Author : dtysky (dtysky@outlook.com)
 * @Date   : 3/10/2020, 7:15:52 PM
 * @Description:
 */
import * as Sein from 'seinjs';
import {h} from 'preact';

import {TController} from '../types';
import {Folder, Text, Switch} from '../UI/components';

const AnimatorActionController: TController<any> = (
  name: string,
  readonly: boolean,
  options: any,
  object: Sein.AnimatorComponent,
  onChange: (value: any) => void
) => {
  const {animationNames} = object;
  const stopt = object.fsm.getCurrentState().name.equalsTo('enter');

  return (
    <div>
      <div>Animations</div>
      {
        animationNames.map(key => (
          <Switch
            label={key}
            checked={!stopt && object.current === key}
            onCheckedChange={checked => {
              if (checked) {
                object.play(key, Infinity);
              } else {
                object.stop();
              }

              onChange(null);
            }}
          />
        ))
      }
    </div>
  );
}

export default AnimatorActionController;
