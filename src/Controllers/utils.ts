/**
 * @File   : utils.ts
 * @Author : dtysky (dtysky@outlook.com)
 * @Date   : 3/10/2020, 5:45:56 PM
 * @Description:
 */
import * as Sein from 'seinjs';

import {TController} from '../types';
import DefaultController from './DefaultController';

const CONTROLLERS: {[type: string]: TController} = {};

export function registerController<TValue = any, TOptions = any>(
  type: string,
  controller: TController<TValue, TOptions>
) {
  if (CONTROLLERS[type]) {
    Sein.Debug.warn(`Type ${type} is already existed, overwirte...`);
  }

  CONTROLLERS[type] = controller;
}

export function unregisterController(type: string) {
  if (CONTROLLERS[type]) {
    delete CONTROLLERS[type];
  }
}

export function getController(type: string): TController {
  if (!CONTROLLERS[type]) {
    Sein.Debug.warn(`Type ${type} is not existed, return Default...`);
    return DefaultController;
  }

  return CONTROLLERS[type];
}
