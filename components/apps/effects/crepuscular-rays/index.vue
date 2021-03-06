<template>
  <div>
    <canvas
      id='surface'
      width='320'
      height='200'
      @mousemove="onMouseMove"
      @mouseout="onMouseOut"
      @mouseover="onMouseOver"
      ref="raySurface"
    ></canvas>

    <h2 class='subtitle'>Crepuscular Rays</h2>
    <p>Pure JavaScript implementation of <a href='http://en.wikipedia.org/wiki/Crepuscular_rays'>crepuscular rays</a> ("god rays")
      on a 2D surface. Move your mouse over the canvas to control the light source.</p>

    <b-card sub-title="Options" class="options">
      <b-input-group prepend="Weight" size="sm" class="mb-3">
        <b-form-input v-model='weight' type='range' min='0' max='200' @update="updateWeight" />
      </b-input-group>

      <b-input-group prepend="Decay" size="sm" class="mb-3">
        <b-form-input v-model='decay' type='range' min='0' max='2000' @update="updateDecay" />
      </b-input-group>

      <b-input-group prepend="Exposure" size="sm" class="mb-3">
        <b-form-input v-model='exposure' type='range' min='0' max='2000' @update="updateExposure" />
      </b-input-group>

      <b-input-group prepend="Density" size="sm" class="mb-3">
        <b-form-input v-model='density' type='range' min='0' max='2000' @update="updateDensity" />
      </b-input-group>

      <b-input-group prepend="Samples" size="sm" class="mb-3">
        <b-form-input v-model='samples' type='range' min='0' max='150' @update="updateSamples" />
      </b-input-group>

      <b-form-group>
        <b-form-checkbox-group
          :options="buttonOptions"
          v-model="selectedButtons"
          buttons
          size="sm"
          @change="toggleButtons"
        >
        </b-form-checkbox-group>
      </b-form-group>
    </b-card>
  </div>
</template>

<script>
import Component from 'vue-class-component';
import VueWrapper from '../../vue-wrapper';
import { CrepuscularRaysApp } from './app';

import { Point2D } from '~/lib/core/point-2d';
import { Helper } from '~/lib/core/helper';

@Component
class CrepuscularRays extends VueWrapper {
  weight = 85; // 145

  decay = 810; // 810

  exposure = 755; // 640

  density = 700; // 1045

  samples = 20;

  selectedButtons = ['drawLight', 'drawMask'];

  buttonOptions = [
    { text: 'Draw Light', value: 'drawLight' },
    { text: 'Draw Mask', value: 'drawMask' },
    { text: 'Draw Background', value: 'drawBackground' },
    { text: 'Dirty Surface', value: 'dirtySurface' }
  ];

  radsPerSecond = 0.6;

  radius = 40;

  gridPosX = -120;

  gridPosY = -200;

  noUpdates = false;

  lights = [];


  instantiateApp() {
    const app = new CrepuscularRaysApp(
      'surface',
      './resources/apps/crepuscular-rays/bg.png',
      './resources/apps/crepuscular-rays/js-vfx-mask.png',
      './resources/apps/crepuscular-rays/light.png'
    );

    const canvas = this.$refs.raySurface;

    this.lights.push(
      {
        active: true,
        drawLight: (this.selectedButtons.indexOf('drawLight') >= 0),
        position: new Point2D(Math.round(canvas.width / 2), Math.round(canvas.height / 2)),

        radiusPerSecond: -0.9,
        radiusX: Math.round(0.3125 * canvas.width),
        radiusY: Math.round(0.25 * canvas.height),
        origin: new Point2D(Math.round(canvas.width / 2), Math.round(canvas.height / 2)),

        weight: this.weight / 1000,
        decay: this.decay / 1000,
        exposure: this.exposure / 1000,
        density: this.density / 1000,
        samples: this.samples,
        imageUrl: './resources/apps/crepuscular-rays/light.png'
      }
    );

    app.addLight(this.lights);

    app.drawBackground = (this.selectedButtons.indexOf('drawBackground') >= 0);
    app.drawMask = (this.selectedButtons.indexOf('drawMask') >= 0);
    app.dirtySurface = (this.selectedButtons.indexOf('dirtySurface') >= 0);

    return app;
  }


  tick() {
    const app = this.app;


    if (!this.noUpdates) {
      const lights = this.lights;

      const curTime = new Date();
      const runTime = (curTime.getTime() - app.startTime.getTime()) / 1000.00;

      for (let i = 0; i < lights.length; i++) {
        lights[i].position.set(
          lights[i].origin.x + lights[i].radiusX * Math.sin(lights[i].radiusPerSecond * runTime),
          lights[i].origin.y + lights[i].radiusY * Math.cos(lights[i].radiusPerSecond * runTime)
        );
      }
    }

    app.draw();
  }


  toggleButtons(val) {
    this.app.lights[0].drawLight = (val.indexOf('drawLight') >= 0);
    this.app.drawMask = (val.indexOf('drawMask') >= 0);
    this.app.drawBackground = (val.indexOf('drawBackground') >= 0);
    this.app.dirtySurface = (val.indexOf('dirtySurface') >= 0);
  }


  updateWeight(val) {
    console.log('weight', val);
    this.app.lights[0].weight = val / 1000;
  }


  updateDecay(val) {
    console.log('decay', val);
    this.app.lights[0].decay = val / 1000;
  }


  updateDensity(val) {
    console.log('density', val);
    this.app.lights[0].density = val / 1000;
  }


  updateExposure(val) {
    console.log('exposure', val);
    this.app.lights[0].exposure = val / 1000;
  }


  updateSamples(val) {
    this.app.lights[0].samples = Math.round(val);
  }


  onMouseMove(event) {
    const coords = Helper.getCanvasCoordinates(event, 'surface');

    this.app.lights[0].position.set(coords.x, coords.y);
  }


  onMouseOver(event) {
    this.noUpdates = true;
  }


  onMouseOut(event) {
    this.noUpdates = false;
  }
}

export default CrepuscularRays;
</script>
