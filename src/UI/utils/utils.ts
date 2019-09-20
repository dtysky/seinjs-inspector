import * as Sein from 'seinjs';
import { IBSPComponentState } from 'seinjs/BSP/BSPComponent';

interface IBSPCircleComponentState extends IBSPComponentState {
  radius?: number;
  radialSegments?: number;
}
class BSPCircleComponent extends Sein.BSPComponent<IBSPCircleComponentState> {
  public isBSPPlaneComponent: boolean = true;
  protected convertState(
    initState: IBSPCircleComponentState
  ): Sein.IStaticMeshComponentState {
    const { radius, radialSegments, ...others } = initState;

    const result = others as Sein.IStaticMeshComponentState;

    const vertices = this.getVertices(radius, radialSegments);
    const geometry = new Sein.Geometry({
      vertices,
      mode: Sein.Constants.LINES
    });
    geometry.isDirty = true;
    result.geometry = geometry;
    return result;
  }
  public getVertices(
    radius: number,
    radialSegments: number = 16
  ): Sein.GeometryData {
    let array = [];
    let curAngle = 0;
    const step = (Math.PI * 2) / radialSegments;

    for (let i = 0; i < radialSegments; i++) {
      // array.push[x,y,z]

      array = array.concat(
        [Math.cos(curAngle) * radius, 0, Math.sin(curAngle) * radius],
        [Math.cos(curAngle) * radius, 0, Math.sin(curAngle) * radius]
      );

      curAngle += step;
    }
    const first = array.shift();
    array.push(first);
    const second = array.shift();
    array.push(second);
    const third = array.shift();
    array.push(third);

    return new Sein.GeometryData(new Float32Array(array), 3, null);
  }
  public setRadius(
    radius: number,
    radialSegments: number = 16
  ): BSPCircleComponent {
    this.geometry.vertices = this.getVertices(radius, radialSegments);
    this.geometry.isDirty = true;
    return this;
  }
}

interface IBSPLineComponentState extends IBSPComponentState {
  PointA?: Sein.Vector3;
  PointB?: Sein.Vector3;
}
class BSPLineComponent extends Sein.BSPComponent<IBSPLineComponentState> {
  public isBSPPlaneComponent: boolean = true;
  protected convertState(
    initState: IBSPLineComponentState
  ): Sein.IStaticMeshComponentState {
    const { PointA, PointB, ...others } = initState;

    const result = others as Sein.IStaticMeshComponentState;

    const vertices = new Sein.GeometryData(
      new Float32Array(PointA.toArray().concat(PointB.toArray())),
      3,
      null
    );

    result.geometry = new Sein.Geometry({
      vertices,
      mode: Sein.Constants.LINES
    });
    return result;
  }
  public setVertices(pointA: Sein.Vector3, pointB: Sein.Vector3) {
    const vertices = new Sein.GeometryData(
      new Float32Array(pointA.toArray().concat(pointB.toArray())),
      3,
      null
    );
    this.geometry.vertices = vertices;
    this.geometry.isDirty = true;
    return this;
  }
}
export { BSPLineComponent, BSPCircleComponent };
