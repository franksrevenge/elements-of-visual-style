<template>
  <div>
    <canvas id='surface' :width='isMobile() ? 480 : 640' :height='isMobile() ? 360 : 480'></canvas>

    <h2 class='subtitle'>Gouraud Shading</h2>
    <p>Pure JavaScript (not WebGL) implementation of <a href='https://en.wikipedia.org/wiki/Gouraud_shading'>Gouraud shading.</a></p>

    <b-card sub-title="Options" class="options">
      <b-form-group>
        <b-form-radio-group
          :options="objectOptions"
          v-model="activeObject"
          buttons
          size="sm"
          @change="switchObject"
        >
        </b-form-radio-group>
      </b-form-group>
    </b-card>

  </div>
</template>

<script>
import Component from 'vue-class-component';
import Vertex from '../vertex';
import { GouraudShadingApp } from './app';

@Component
class GouraudShading extends Vertex {
  activeObject = 'torus';

  instantiateApp() {
    return new GouraudShadingApp('surface', this.activeObject);
  }
}

export default GouraudShading;
</script>
