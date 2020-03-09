/**
 * @File   : types.ts
 * @Author : dtysky (dtysky@outlook.com)
 * @Date   : 7/28/2019, 2:28:37 PM
 * @Description:
 */
import * as Sein from 'seinjs';
import {JSX} from 'preact';

import InspectorActor from './Actor/InspectorActor';

export type TEditor = (actor: InspectorActor, object: Sein.SObject) => JSX.Element;

export type TController<TValue = any, TOptions = any> = (
  name: string,
  value: TValue,
  readonly: boolean,
  options: TOptions,
  object: Sein.SObject,
  onChange: (value: TValue) => void
) => JSX.Element;

export interface ISystemInfo {
  system: {
    fps: number;
    memory: number;
    cpu: number;
  },
  engine: {
    tickerRunning: boolean;
    gamesCount: number;
    runningGamesCount: number;
  };
  game: {
    name: string;
    paused: boolean;
    // worlds-levels
    structure: string[][];
    actorsCount: number;
    actors: Sein.SArray<Sein.InfoActor>;
  };
  cameras: {
    refer: Sein.CameraComponent;
    name: string;
    ownerName: string;
    isMain: boolean;
    alive: boolean;
  }[];
  world: {
    name: string;
  };
  level: {
    name: string;
    alive: boolean;
    actorsCount: number;
    actors: Sein.SArray<Sein.ISceneActor>;
  };
  render: {
    shaders: number;
    programs: number;
    textures: number;
    buffers: number;
    bufferBytes: number;
    totalVertices?: number;
    totalTriangles?: number;
  };
  resource: {
    [type: string]: number;
  };
  events: {
    global: number;
    hid: number;
  };
  physic: {
    active: boolean;
    alive: boolean;
  };
}

export enum EControlType {
  StartSync = 'StartSync',
  EndSync = 'EndSync'
}

export interface IControlEvent {
  type: EControlType;
}
