/**
 * @File   : inject.js
 * @Author : dtysky (dtysky@outlook.com)
 * @Link   : dtysky.moe
 * @Date   : 2019/11/3 下午4:37:09
 */
console.log('Sein.js inspector extension is injected!');

function wait() {
  setTimeout(() => main(), 1000);
}

function main() {
  if (!window.Sein || !window.Sein.Inspector) {
    return;
  }

  var engine = window.Sein.Engine.GET_RUNNING_ENGINE();

  if (!engine) {
    return wait();
  }

  var game = engine.getRunningGame();

  if (!game) {
    return wait;
  }

  if (window.Sein.findActorByClass(game, window.Sein.Inspector.Actor)) {
    return;
  }

  var inspector = game.addActor('inspector', window.Sein.Inspector.Actor);
  game.event.add('LevelDidCreateActors', function() {
    inspector.syncVerticesInfo();
  });
  inspector.syncVerticesInfo();
}

main();
