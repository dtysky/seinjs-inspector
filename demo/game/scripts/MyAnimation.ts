import * as Sein from 'seinjs';
interface ICustomAnimationState extends Sein.IAnimationState {
  speed: number;
}

@Sein.SClass({ className: 'CustomAnimation' })
export default class MyAnimation extends Sein.Animation<ICustomAnimationState> {
  protected _speed: number = 1;
  protected _current: number = 0;
  protected _loop: number = 0;

  public onInit({ speed }: ICustomAnimationState) {
    this._speed = speed;
  }

  public onPlay(currentLoop: number) {
    this._current = 0;
    this._loop = currentLoop;
  }

  public onUpdate(delta: number) {
    if (this.paused) {
      return;
    }

    this.actor.transform.rotationY +=
      this._speed * 0.1 * (this._loop % 2 ? 1 : -1);

    this._current += delta;

    if (this._current >= 1000) {
      this.stop();
    }
  }
}
