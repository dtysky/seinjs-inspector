/**
 * @File   : main.tsx
 * @Author : dtysky (dtysky@outlook.com)
 * @Date   : Sun Jul 28 2019
 * @Description: Component.
 */
import * as Sein from 'seinjs';

window['Sein'] = Sein;

import GameState from './states/GameState';
import MainGameMode from './scripts/MainGameMode';
import MainLevelScript from './scripts/MainLevelScript';

export async function main(canvas: HTMLCanvasElement): Promise<Sein.Game> {
  const engine = new Sein.Engine();

  const game = new Sein.Game(
    'intro-game',
    {
      canvas,
      clearColor: new Sein.Color(0, 0.6, 0.9, 1),
      width: canvas.offsetWidth,
      height: canvas.offsetHeight,
      fog: new Sein.Fog({
        mode: 'LINEAR',
        start: 20,
        end: 100,
        density: 1
      })
    },
    GameState
  );

  engine.addGame(game);

  game.addWorld('main', MainGameMode, MainLevelScript);
  game.addLevel('main', 'testLevel1', MainLevelScript);
  game.addLevel('main', 'testLevel2', MainLevelScript);
  game.addLevel('main', 'testLevel3', MainLevelScript);
  game.addLevel('main', 'testLevel4', MainLevelScript);
  game.addLevel('main', 'testLevel5', MainLevelScript);
  game.addWorld('main2', MainGameMode, MainLevelScript);

  await game.start();

  return game;
}
