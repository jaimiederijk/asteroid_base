<template>
  <div class="system-map">
    <h3>{{ system.name }}</h3>

    <ul>
      <li v-for="object in system.systemObjects"
      :key="object.name" class="system-object">
        <button
          v-on:click="$emit('changeActiveObject',object, system.id)"
          name="button"
          v-bind:class="object.color"
        >
          <div>
            <span>{{ object.name }}</span>
          </div>
        </button>
      </li>
    </ul>
    <canvas id="system-map-canvas" ref="canvas" width="300" height="300"></canvas>
  </div>
</template>

<script>
import { mat4 } from 'gl-matrix';

function initBuffers(gl) {
  const positionBuffer = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  const positions = [
    1.0, 1.0,
    -1.0, 1.0,
    1.0, -1.0,
    -1.0, -1.0,
  ];

  // Now pass the list of positions into WebGL to build the
  // shape. We do this by creating a Float32Array from the
  // JavaScript array, then use it to fill the current buffer.

  gl.bufferData(gl.ARRAY_BUFFER,
    new Float32Array(positions),
    gl.STATIC_DRAW);

  return {
    position: positionBuffer,
  };
}

function drawScene(gl, programInfo, buffers) {
  gl.clearColor(0.0, 0.2, 0.0, 1.0);
  gl.clearDepth(1.0);
  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);

  gl.clear(gl.COLOR_BUFFER_BIT || gl.DEPTH_BUFFER_BIT);

  // Create a perspective matrix, a special matrix that is
  // used to simulate the distortion of perspective in a camera.
  // Our field of view is 45 degrees, with a width/height
  // ratio that matches the display size of the canvas
  // and we only want to see objects between 0.1 units
  // and 100 units away from the camera.

  const fieldOfView = (45 * Math.PI) / 180;
  const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
  const zNear = 0.1;
  const zFar = 100.0;
  const projectionMatrix = mat4.create();

  // note: glmatrix.js always has the first argument
  // as the destination to receive the result.
  mat4.perspective(projectionMatrix,
    fieldOfView,
    aspect,
    zNear,
    zFar);

  // Set the drawing position to the "identity" point, which is
  // the center of the scene.
  const modelViewMatrix = mat4.create();

  // Now move the drawing position a bit to where we want to
  // start drawing the square.

  mat4.translate(modelViewMatrix,
    modelViewMatrix,
    [-0.0, 0.0, -6.0]);

  // Tell WebGL how to pull out the positions from the position
  // buffer into the vertexPosition attribute.
  {
    const numComponents = 2;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
    gl.vertexAttribPointer(
      programInfo.attribLocations.vertexPosition,
      numComponents,
      type,
      normalize,
      stride,
      offset,
    );
    gl.enableVertexAttribArray(
      programInfo.attribLocations.vertexPosition,
    );
  }

  // Tell WebGL to use our program when drawing

  gl.useProgram(programInfo.program);

  // Set the shader uniforms

  gl.uniformMatrix4fv(
    programInfo.uniformLocations.projectionMatrix,
    false,
    projectionMatrix,
  );
  gl.uniformMatrix4fv(
    programInfo.uniformLocations.modelViewMatrix,
    false,
    modelViewMatrix,
  );

  {
    const offset = 0;
    const vertexCount = 4;
    gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCount);
  }
}
// creates a shader of the given type, uploads the source and
// compiles it.
//
function loadShader(gl, type, source) {
  const shader = gl.createShader(type);

  // Send the source to the shader object

  gl.shaderSource(shader, source);

  // Compile the shader program

  gl.compileShader(shader);

  // See if it compiled successfully

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.log('An error occurred compiling the shaders: ');
    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

function initShaderProgram(gl, vsSource, fsSource) {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

  // Create the shader program

  const shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  // If creating the shader program failed, alert

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    console.log('Unable to initialize the shader program:');
    console.log(gl.getProgramInfoLog(shaderProgram));
    return null;
  }

  return shaderProgram;
}

export default {
  name: 'SystemMap',
  props: {
    system: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    runWebGL() {
      const { canvas } = this.$refs;
      const gl = canvas.getContext('webgl');

      if (!gl) {
        throw new Error('webGL not supported');
      }

      const vsSource = `
        attribute vec4 aVertexPosition;
        uniform mat4 uModelViewMatrix;
        uniform mat4 uProjectionMatrix;
        void main() {
          gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
        }
      `;

      const fsSource = `
        void main() {
          gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
        }
      `;

      const shaderProgram = initShaderProgram(gl, vsSource, fsSource);

      const programInfo = {
        program: shaderProgram,
        attribLocations: {
          vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
        },
        uniformLocations: {
          projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
          modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
        },
      };

      const buffers = initBuffers(gl);

      drawScene(gl, programInfo, buffers);
    },
  },
  mounted() {
    this.runWebGL();
  },
};

</script>

<style lang="scss" scoped>
  .system-object {
    list-style: none;
    display: block;

    button {
      display: block;
      position: relative;
      width: 50px;
      height: 50px;
      margin: 2rem;
      border-radius: 50%;
      border: none;
      > div {
        position: absolute;
        width: 50px;
        height: 50px;
        border-left: 2px solid white;
        bottom: 80%;
        left: 95%;
        transform-origin: bottom left;
        transform: rotateZ(45deg);
      }
      span {
        display: block;
        width: max-content;
        padding-left: 1px;
        position: relative;
        left: -1px;
        color: white;
        background-color: black;
        z-index: 9;
        transform-origin: bottom left;
        transform: rotateZ(-45deg);
        //text-decoration: underline;
        // border-left: 1px solid black;
        border-bottom: 2px solid white;
      }
    }

    @each $colorname, $color in $sys_obj_colors {
      .#{$colorname} {
        background-color: $color;
        padding: 0 1rem;
      }
    }
  }

</style>
