/**
 * @File   : DomHUDActor.ts
 * @Author : dtysky (dtysky@outlook.com)
 * @Date   : 2019/7/28 上午11:58:00
 * @Description:
 */
import * as Sein from 'seinjs';

declare module 'seinjs' {
  export namespace DomHUD {
    // export interface IComponentState extends IHUDComponentState {}
    // export class Component<IStateTypes extends IComponentState = IComponentState, IEvents = {}> extends HUDComponent<IStateTypes, IEvents> {}
    // export class Actor<IStateTypes extends IComponentState = IComponentState, IEvents = {}> extends HUDActor<IStateTypes, IEvents> {}
    // export function isActor(value: Sein.SObject): value is Actor;
    // export function isComponent(value: Sein.SObject): value is Component;
  }
}

(Sein as any).DomHUD = {
  
};

export {

};
