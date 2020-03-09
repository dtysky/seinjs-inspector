/**
 * @File   : index.ts
 * @Author : dtysky (dtysky@outlook.com)
 * @Date   : 3/6/2020, 11:42:36 AM
 * @Description:
 */
import * as Sein from 'seinjs';

import {TController} from '../types';
import DefaultController from './DefaultController';
import VectorController from './VectorController';
import BasicController from './BasicController';
import './base.scss';

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

export function initCore() {
  registerController('vector', VectorController);
  registerController('basic', BasicController);
  // registerController('color', ColorController);

  // Texture, CubeTexture, Image, Material, Atlas
  // Array, Object


  initInspectableClasses();
}

function initInspectableClasses() {
  Sein.InfoActor.INSPECTABLE_PROPERTIES = {
    updatePriority: {type: 'basic', readonly: true}
  };
}
