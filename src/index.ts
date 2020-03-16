/**
 * @File   : DomHUDActor.ts
 * @Author : dtysky (dtysky@outlook.com)
 * @Date   : 2019/7/28 上午11:58:00
 * @Description:
 */
import * as Sein from 'seinjs';

import * as Preact from 'preact';
import InspectorActor from './Actor/InspectorActor';
import {TEditor as IEditor, TController as IController} from './types';
import {getController, getControllerType, hasController, registerController, unregisterController} from './Controllers';
import {registerEditor, unregisterEditor, getEditor} from './UI/editor';
import {registerPanel, unregisterPanel} from './UI';
import * as Components from './UI/components';

declare module 'seinjs' {
  export namespace Inspector {
    export class Actor extends InspectorActor {}
    export function isActor(value: Sein.SObject): value is InspectorActor;
    export type TEditor = IEditor;
    export type TController<TValue = any, TOptions = any> = IController<TValue, TOptions>;
    export function getController(type: string): TController;
    export function getControllerType(value: any): string;
    export function registerController<TValue = any, TOptions = any>(
      type: string,
      controller: TController<TValue, TOptions>
    ): void;
    export function unregisterController(type: string): void;
    export function hasController(type: string): boolean;
    export function registerEditor(clz: Sein.TConstructor<Sein.SObject>, editor: TEditor): void;
    export function unregisterEditor(clz: Sein.TConstructor<Sein.SObject>): void;
    export function getEditor(obj: Sein.SObject): TEditor;
    export function registerPanel(name: string, component: Preact.ComponentClass<{actor: InspectorActor}>, index?: number): void;
    export function unregisterPanel(name: string): void;
  }
}

(Sein as any).Inspector = {
  Actor: InspectorActor,
  getController, getControllerType, hasController,
  registerController, unregisterController,
  registerEditor, unregisterEditor, getEditor,
  registerPanel, unregisterPanel,
  Preact,
  ...Components
};

export {
  InspectorActor as Actor,
  getController, getControllerType, hasController,
  registerController, unregisterController,
  registerEditor, unregisterEditor, getEditor,
  registerPanel, unregisterPanel,
  Preact
};
export * from './UI/components';
