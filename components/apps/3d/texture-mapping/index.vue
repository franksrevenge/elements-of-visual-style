<template>
  <div>
    <canvas id='surface' :width='isMobile() ? 480 : 640' :height='isMobile() ? 360 : 480'></canvas>

    <h2 class='subtitle'>Texture Mapping</h2>
    <p>Pure JavaScript (not WebGL) implementation of <a href='https://en.wikipedia.org/wiki/Texture_mapping'>texture mapping.</a></p>

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
import { TextureMappingApp } from './app';

@Component
class TextureMapping extends Vertex {
  activeObject = 'torus';

  instantiateApp() {
    return new TextureMappingApp('surface', this.activeObject);
  }
}

export default TextureMapping;
</script>
