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

export function getControllerType(value: any): string {
  if (value === null || value === undefined) {
    return 'invalid';
  }

  const t = typeof value;

  if (t === 'string' || t === 'number' || t === 'boolean') {
    return 'basic';
  }

  if (Sein.isColor(value)) {
    return 'color';
  }

  if (Sein.isVector2(value) || Sein.isVector3(value) || Sein.isVector4(value) || Sein.isQuaternion(value) || Sein.isEuler(value)) {
    return 'vector';
  }

  if (Sein.isEventManager(value)) {
    return 'event';
  }

  if (Sein.isTexture(value)) {
    return 'texture';
  }

  if (Sein.isMatrix4(value) || Sein.isMatrix3(value)) {
    return 'matrix';
  }

  if (t === 'object') {
    return 'object';
  }

  // if (Sein.isFog(value)) {
  //   return 'fog';
  // }

  return 'default';
}
