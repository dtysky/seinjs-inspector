/*
 * @Description: SpotLightViewerActor.tsx
 * @Author: 修雷(lc199444@alibaba-inc.com)
 * @Date: 2019-09-09 14:52:36
 * @LastEditTime: 2019-10-28 19:07:34
 */
import * as Sein from 'seinjs';

interface IStateTypes extends Sein.ISceneComponentState {
  range: number;
  cutoff: number;
  outerCutoff: number;
}

class SpotLightViewerActor extends Sein.SceneActor<IStateTypes> {
  public onAdd(initState: IStateTypes) {
    const { range, cutoff, outerCutoff } = initState;
    const start = new Sein.Vector3(0, 0, 0);
    const end = new Sein.Vector3(0, range, 0);
    const color = new Sein.Color(1, 1, 1);
    const color1 = new Sein.Color(0.3, 0.3, 0.3);
    const innerRadius = Math.tan(Sein.degToRad(cutoff)) * range;
    const outerRadius = Math.tan(Sein.degToRad(outerCutoff)) * range;

    this.addComponent('Box', Sein.BSPBoxComponent, {
      width: 1,
      height: 1,
      depth: 1,
      material: new Sein.BasicMaterial({
        lightType: 'NONE',
        shininess: 0,
        diffuse: color
      })
    });
    this.addComponent('InnerRange', BSPCircleComponent, {
      radius: innerRadius,
      radialSegments: 32,
      position: end,
      material: new Sein.BasicMaterial({
        lightType: 'NONE',
        shininess: 0,
        diffuse: color
      })
    });
    this.addComponent('OuterRange', BSPCircleComponent, {
      radius: outerRadius,
      radialSegments: 32,
      position: end,
      material: new Sein.BasicMaterial({
        lightType: 'NONE',
        shininess: 0,
        diffuse: color1
      })
    });
    this.addComponent('Line1', BSPLineComponent, {
      PointA: start,
      PointB: new Sein.Vector3(innerRadius, range, 0),
      material: new Sein.BasicMaterial({
        lightType: 'NONE',
        shininess: 0,
        diffuse: color
      })
    });
    this.addComponent('Line2', BSPLineComponent, {
      PointA: start,
      PointB: new Sein.Vector3(-innerRadius, range, 0),
      material: new Sein.BasicMaterial({
        lightType: 'NONE',
        shininess: 0,
        diffuse: color
      })
    });
    this.addComponent('Line3', BSPLineComponent, {
      PointA: start,
      PointB: new Sein.Vector3(0, range, innerRadius),
      material: new Sein.BasicMaterial({
        lightType: 'NONE',
        shininess: 0,
        diffuse: color
      })
    });
    this.addComponent('Line4', BSPLineComponent, {
      PointA: start,
      PointB: new Sein.Vector3(0, range, -innerRadius),
      material: new Sein.BasicMaterial({
        lightType: 'NONE',
        shininess: 0,
        diffuse: color
      })
    });
    this.addComponent('Line5', BSPLineComponent, {
      PointA: start,
      PointB: new Sein.Vector3(outerRadius, range, 0),
      material: new Sein.BasicMaterial({
        lightType: 'NONE',
        shininess: 0,
        diffuse: color1
      })
    });
    this.addComponent('Line6', BSPLineComponent, {
      PointA: start,
      PointB: new Sein.Vector3(-outerRadius, range, 0),
      material: new Sein.BasicMaterial({
        lightType: 'NONE',
        shininess: 0,
        diffuse: color1
      })
    });
    this.addComponent('Line7', BSPLineComponent, {
      PointA: start,
      PointB: new Sein.Vector3(0, range, outerRadius),
      material: new Sein.BasicMaterial({
        lightType: 'NONE',
        shininess: 0,
        diffuse: color1
      })
    });
    this.addComponent('Line8', BSPLineComponent, {
      PointA: start,
      PointB: new Sein.Vector3(0, range, -outerRadius),
      material: new Sein.BasicMaterial({
        lightType: 'NONE',
        shininess: 0,
        diffuse: color1
      })
    });
  }

  public reset(range: number, cutoff: number, outerCutoff: number) {
    const start = new Sein.Vector3(0, 0, 0);
    const end = new Sein.Vector3(0, range, 0);
    const innerRadius = Math.tan(Sein.degToRad(cutoff)) * range;
    const outerRadius = Math.tan(Sein.degToRad(outerCutoff)) * range;

    const innerRange = this.findComponentByName<BSPCircleComponent>(
      'InnerRange'
    );
    innerRange.setRadius(innerRadius, 32);
    innerRange.position = end;

    const outerRange = this.findComponentByName<BSPCircleComponent>(
      'OuterRange'
    );
    outerRange.setRadius(outerRadius, 32);
    outerRange.position = end;

    this.findComponentByName<BSPLineComponent>('Line1').setVertices(
      start,
      new Sein.Vector3(innerRadius, range, 0)
    );
    this.findComponentByName<BSPLineComponent>('Line2').setVertices(
      start,
      new Sein.Vector3(-innerRadius, range, 0)
    );
    this.findComponentByName<BSPLineComponent>('Line3').setVertices(
      start,
      new Sein.Vector3(0, range, innerRadius)
    );
    this.findComponentByName<BSPLineComponent>('Line4').setVertices(
      start,
      new Sein.Vector3(0, range, -innerRadius)
    );

    this.findComponentByName<BSPLineComponent>('Line5').setVertices(
      start,
      new Sein.Vector3(outerRadius, range, 0)
    );
    this.findComponentByName<BSPLineComponent>('Line6').setVertices(
      start,
      new Sein.Vector3(-outerRadius, range, 0)
    );
    this.findComponentByName<BSPLineComponent>('Line7').setVertices(
      start,
      new Sein.Vector3(0, range, outerRadius)
    );
    this.findComponentByName<BSPLineComponent>('Line8').setVertices(
      start,
      new Sein.Vector3(0, range, -outerRadius)
    );
  }
  public onDestroy() {

  }
}