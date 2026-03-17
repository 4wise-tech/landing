"use client";

import { BloomEffect, EffectComposer, EffectPass, RenderPass, SMAAEffect, SMAAPreset } from "postprocessing";
import { useEffect, useRef } from "react";
import * as THREE from "three";

import styles from "./Hyperspeed.module.css";
import type { HyperspeedEffectOptions } from "./presets";

const DEFAULT_EFFECT_OPTIONS: Required<HyperspeedEffectOptions> = {
  onSpeedUp: () => {},
  onSlowDown: () => {},
  distortion: "turbulentDistortion",
  length: 400,
  roadWidth: 10,
  islandWidth: 2,
  lanesPerRoad: 4,
  fov: 90,
  fovSpeedUp: 150,
  speedUp: 2,
  carLightsFade: 0.4,
  totalSideLightSticks: 20,
  lightPairsPerRoadWay: 40,
  shoulderLinesWidthPercentage: 0.05,
  brokenLinesWidthPercentage: 0.1,
  brokenLinesLengthPercentage: 0.5,
  lightStickWidth: [0.12, 0.5],
  lightStickHeight: [1.3, 1.7],
  movingAwaySpeed: [60, 80],
  movingCloserSpeed: [-120, -160],
  carLightsLength: [400 * 0.03, 400 * 0.2],
  carLightsRadius: [0.05, 0.14],
  carWidthPercentage: [0.3, 0.5],
  carShiftX: [-0.8, 0.8],
  carFloorSeparation: [0, 5],
  colors: {
    roadColor: 0x080808,
    islandColor: 0x0a0a0a,
    background: 0x000000,
    shoulderLines: 0xffffff,
    brokenLines: 0xffffff,
    leftCars: [0xd856bf, 0x6750a2, 0xc247ac],
    rightCars: [0x03b3c3, 0x0e5ea5, 0x324555],
    sticks: 0x03b3c3,
  },
};

type Props = {
  effectOptions?: HyperspeedEffectOptions;
  className?: string;
};

// A light wrapper around the Hyperspeed WebGL scene.
// Fills the size of its parent (absolute inset-0).
export default function Hyperspeed({ effectOptions = DEFAULT_EFFECT_OPTIONS, className }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const appRef = useRef<{ dispose: () => void } | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // dispose previous
    if (appRef.current) {
      appRef.current.dispose();
      appRef.current = null;
    }
    while (container.firstChild) container.removeChild(container.firstChild);

    const options = {
      ...DEFAULT_EFFECT_OPTIONS,
      ...effectOptions,
      colors: { ...DEFAULT_EFFECT_OPTIONS.colors, ...(effectOptions.colors ?? {}) },
    };

    const nsin = (val: number) => Math.sin(val) * 0.5 + 0.5;
    const random = (base: number | [number, number]) =>
      Array.isArray(base) ? Math.random() * (base[1] - base[0]) + base[0] : Math.random() * base;
    const pickRandom = <T,>(arr: T[] | T) => (Array.isArray(arr) ? arr[Math.floor(Math.random() * arr.length)] : arr);

    const turbulentUniforms = {
      uFreq: { value: new THREE.Vector4(4, 8, 8, 1) },
      uAmp: { value: new THREE.Vector4(25, 5, 10, 10) },
    };

    const distortions: Record<
      string,
      {
        uniforms: Record<string, { value: any }>;
        getDistortion: string;
        getJS?: (progress: number, time: number) => THREE.Vector3;
      }
    > = {
      turbulentDistortion: {
        uniforms: turbulentUniforms,
        getDistortion: `
          uniform vec4 uFreq;
          uniform vec4 uAmp;
          float nsin(float val){ return sin(val) * 0.5 + 0.5; }
          #define PI 3.14159265358979
          float getDistortionX(float progress){
            return (
              cos(PI * progress * uFreq.r + uTime) * uAmp.r +
              pow(cos(PI * progress * uFreq.g + uTime * (uFreq.g / uFreq.r)), 2. ) * uAmp.g
            );
          }
          float getDistortionY(float progress){
            return (
              -nsin(PI * progress * uFreq.b + uTime) * uAmp.b +
              -pow(nsin(PI * progress * uFreq.a + uTime / (uFreq.b / uFreq.a)), 5.) * uAmp.a
            );
          }
          vec3 getDistortion(float progress){
            return vec3(
              getDistortionX(progress) - getDistortionX(0.0125),
              getDistortionY(progress) - getDistortionY(0.0125),
              0.
            );
          }
        `,
        getJS: (progress, time) => {
          const uFreq = turbulentUniforms.uFreq.value;
          const uAmp = turbulentUniforms.uAmp.value;

          const getX = (p: number) =>
            Math.cos(Math.PI * p * uFreq.x + time) * uAmp.x +
            Math.pow(Math.cos(Math.PI * p * uFreq.y + time * (uFreq.y / uFreq.x)), 2) * uAmp.y;
          const getY = (p: number) =>
            -nsin(Math.PI * p * uFreq.z + time) * uAmp.z -
            Math.pow(nsin(Math.PI * p * uFreq.w + time / (uFreq.z / uFreq.w)), 5) * uAmp.w;

          const distortion = new THREE.Vector3(getX(progress) - getX(progress + 0.007), getY(progress) - getY(progress + 0.007), 0);
          const lookAtAmp = new THREE.Vector3(-2, -5, 0);
          const lookAtOffset = new THREE.Vector3(0, 0, -10);
          return distortion.multiply(lookAtAmp).add(lookAtOffset);
        },
      },
    };

    const distortion = distortions[options.distortion] ?? distortions.turbulentDistortion;

    const fog = new THREE.Fog(options.colors.background, options.length * 0.2, options.length * 500);

    const fogUniforms = {
      fogColor: { value: fog.color },
      fogNear: { value: fog.near },
      fogFar: { value: fog.far },
    };

    const carLightsFragment = `
      #define USE_FOG;
      ${THREE.ShaderChunk["fog_pars_fragment"]}
      varying vec3 vColor;
      varying vec2 vUv;
      uniform vec2 uFade;
      void main() {
        vec3 color = vec3(vColor);
        float alpha = smoothstep(uFade.x, uFade.y, vUv.x);
        gl_FragColor = vec4(color, alpha);
        if (gl_FragColor.a < 0.0001) discard;
        ${THREE.ShaderChunk["fog_fragment"]}
      }
    `;

    const carLightsVertex = `
      #define USE_FOG;
      ${THREE.ShaderChunk["fog_pars_vertex"]}
      attribute vec3 aOffset;
      attribute vec3 aMetrics;
      attribute vec3 aColor;
      uniform float uTravelLength;
      uniform float uTime;
      varying vec2 vUv;
      varying vec3 vColor;
      #include <getDistortion_vertex>
      void main() {
        vec3 transformed = position.xyz;
        float radius = aMetrics.r;
        float myLength = aMetrics.g;
        float speed = aMetrics.b;

        transformed.xy *= radius;
        transformed.z *= myLength;

        transformed.z += myLength - mod(uTime * speed + aOffset.z, uTravelLength);
        transformed.xy += aOffset.xy;

        float progress = abs(transformed.z / uTravelLength);
        transformed.xyz += getDistortion(progress);

        vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.);
        gl_Position = projectionMatrix * mvPosition;
        vUv = uv;
        vColor = aColor;
        ${THREE.ShaderChunk["fog_vertex"]}
      }
    `;

    const sideSticksFragment = `
      #define USE_FOG;
      ${THREE.ShaderChunk["fog_pars_fragment"]}
      varying vec3 vColor;
      void main(){
        vec3 color = vec3(vColor);
        gl_FragColor = vec4(color,1.);
        ${THREE.ShaderChunk["fog_fragment"]}
      }
    `;

    const sideSticksVertex = `
      #define USE_FOG;
      ${THREE.ShaderChunk["fog_pars_vertex"]}
      attribute float aOffset;
      attribute vec3 aColor;
      attribute vec2 aMetrics;
      uniform float uTravelLength;
      uniform float uTime;
      varying vec3 vColor;
      mat4 rotationY( in float angle ) {
        return mat4( cos(angle), 0, sin(angle), 0,
                     0, 1.0, 0, 0,
                -sin(angle), 0, cos(angle), 0,
                     0, 0, 0, 1);
      }
      #include <getDistortion_vertex>
      void main(){
        vec3 transformed = position.xyz;
        float width = aMetrics.x;
        float height = aMetrics.y;
        transformed.xy *= vec2(width, height);
        float time = mod(uTime * 60. * 2. + aOffset, uTravelLength);
        transformed = (rotationY(3.14/2.) * vec4(transformed,1.)).xyz;
        transformed.z += - uTravelLength + time;
        float progress = abs(transformed.z / uTravelLength);
        transformed.xyz += getDistortion(progress);
        transformed.y += height / 2.;
        transformed.x += -width / 2.;
        vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.);
        gl_Position = projectionMatrix * mvPosition;
        vColor = aColor;
        ${THREE.ShaderChunk["fog_vertex"]}
      }
    `;

    const roadVertex = `
      #define USE_FOG;
      uniform float uTime;
      ${THREE.ShaderChunk["fog_pars_vertex"]}
      uniform float uTravelLength;
      varying vec2 vUv;
      #include <getDistortion_vertex>
      void main() {
        vec3 transformed = position.xyz;
        vec3 distortion = getDistortion((transformed.y + uTravelLength / 2.) / uTravelLength);
        transformed.x += distortion.x;
        transformed.z += distortion.y;
        transformed.y += -1. * distortion.z;
        vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.);
        gl_Position = projectionMatrix * mvPosition;
        vUv = uv;
        ${THREE.ShaderChunk["fog_vertex"]}
      }
    `;

    const roadMarkingsVars = `
      uniform float uLanes;
      uniform vec3 uBrokenLinesColor;
      uniform vec3 uShoulderLinesColor;
      uniform float uShoulderLinesWidthPercentage;
      uniform float uBrokenLinesWidthPercentage;
      uniform float uBrokenLinesLengthPercentage;
    `;

    const roadMarkingsFragment = `
      uv.y = mod(uv.y + uTime * 0.05, 1.);
      float laneWidth = 1.0 / uLanes;
      float brokenLineWidth = laneWidth * uBrokenLinesWidthPercentage;
      float laneEmptySpace = 1. - uBrokenLinesLengthPercentage;
      float brokenLines = step(1.0 - brokenLineWidth, fract(uv.x * 2.0)) * step(laneEmptySpace, fract(uv.y * 10.0));
      float sideLines = step(1.0 - brokenLineWidth, fract((uv.x - laneWidth * (uLanes - 1.0)) * 2.0)) + step(brokenLineWidth, uv.x);
      brokenLines = mix(brokenLines, sideLines, uv.x);
      // subtle tint
      color = mix(color, uBrokenLinesColor, brokenLines * 0.28);
    `;

    const roadBaseFragment = `
      #define USE_FOG;
      varying vec2 vUv;
      uniform vec3 uColor;
      uniform float uTime;
      #include <roadMarkings_vars>
      ${THREE.ShaderChunk["fog_pars_fragment"]}
      void main() {
        vec2 uv = vUv;
        vec3 color = vec3(uColor);
        #include <roadMarkings_fragment>
        gl_FragColor = vec4(color, 1.);
        ${THREE.ShaderChunk["fog_fragment"]}
      }
    `;

    const islandFragment = roadBaseFragment.replace("#include <roadMarkings_fragment>", "").replace("#include <roadMarkings_vars>", "");
    const roadFragment = roadBaseFragment
      .replace("#include <roadMarkings_vars>", roadMarkingsVars)
      .replace("#include <roadMarkings_fragment>", roadMarkingsFragment);

    class App {
      container: HTMLDivElement;
      renderer: THREE.WebGLRenderer;
      composer: EffectComposer;
      camera: THREE.PerspectiveCamera;
      scene: THREE.Scene;
      clock: THREE.Clock;
      disposed = false;
      hasValidSize = false;
      timeOffset = 0;
      speedUp = 0;
      speedUpTarget = 0;
      fovTarget: number;
      onResize: () => void;
      options: typeof options;

      road: Road;
      leftCarLights: CarLights;
      rightCarLights: CarLights;
      leftSticks: LightsSticks;

      constructor(container: HTMLDivElement, optionsIn: typeof options) {
        this.container = container;
        this.options = optionsIn;

        const initW = Math.max(1, container.offsetWidth);
        const initH = Math.max(1, container.offsetHeight);

        this.renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
        this.renderer.setSize(initW, initH, false);
        this.renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
        this.composer = new EffectComposer(this.renderer);
        container.append(this.renderer.domElement);

        this.camera = new THREE.PerspectiveCamera(optionsIn.fov, initW / initH, 0.1, 10000);
        this.camera.position.z = -5;
        this.camera.position.y = 8;
        this.camera.position.x = 0;

        this.scene = new THREE.Scene();
        this.scene.background = null;
        this.scene.fog = fog;

        this.clock = new THREE.Clock();

        this.fovTarget = optionsIn.fov;

        this.road = new Road(this, optionsIn);
        this.leftCarLights = new CarLights(this, optionsIn, optionsIn.colors.leftCars, optionsIn.movingAwaySpeed, new THREE.Vector2(0, 1 - optionsIn.carLightsFade));
        this.rightCarLights = new CarLights(this, optionsIn, optionsIn.colors.rightCars, optionsIn.movingCloserSpeed, new THREE.Vector2(1, 0 + optionsIn.carLightsFade));
        this.leftSticks = new LightsSticks(this, optionsIn);

        this.onResize = () => {
          const width = this.container.offsetWidth;
          const height = this.container.offsetHeight;
          if (width <= 0 || height <= 0) return;
          this.renderer.setSize(width, height, false);
          this.camera.aspect = width / height;
          this.camera.updateProjectionMatrix();
          this.composer.setSize(width, height);
          this.hasValidSize = true;
        };
        window.addEventListener("resize", this.onResize);
      }

      initPasses() {
        const renderPass = new RenderPass(this.scene, this.camera);
        const bloomPass = new EffectPass(
          this.camera,
          new BloomEffect({
            luminanceThreshold: 0.12,
            luminanceSmoothing: 0.1,
            intensity: 1.1,
            resolutionScale: 1,
          })
        );
        const smaaPass = new EffectPass(
          this.camera,
          new SMAAEffect({
            preset: SMAAPreset.MEDIUM,
          })
        );
        renderPass.renderToScreen = false;
        bloomPass.renderToScreen = false;
        smaaPass.renderToScreen = true;
        this.composer.addPass(renderPass);
        this.composer.addPass(bloomPass);
        this.composer.addPass(smaaPass);
      }

      init() {
        this.initPasses();
        this.road.init();
        this.leftCarLights.init();
        this.leftCarLights.mesh.position.setX(-this.options.roadWidth / 2 - this.options.islandWidth / 2);
        this.rightCarLights.init();
        this.rightCarLights.mesh.position.setX(this.options.roadWidth / 2 + this.options.islandWidth / 2);
        this.leftSticks.init();
        this.leftSticks.mesh.position.setX(-(this.options.roadWidth + this.options.islandWidth / 2));

        this.container.addEventListener("mousedown", this.onMouseDown);
        this.container.addEventListener("mouseup", this.onMouseUp);
        this.container.addEventListener("mouseout", this.onMouseUp);
        this.container.addEventListener("touchstart", this.onTouchStart, { passive: true });
        this.container.addEventListener("touchend", this.onTouchEnd, { passive: true });
        this.container.addEventListener("touchcancel", this.onTouchEnd, { passive: true });
        this.container.addEventListener("contextmenu", this.onContextMenu);

        this.tick();
      }

      onMouseDown = (ev: MouseEvent) => {
        this.options.onSpeedUp?.();
        this.fovTarget = this.options.fovSpeedUp;
        this.speedUpTarget = this.options.speedUp;
      };
      onMouseUp = (ev: MouseEvent) => {
        this.options.onSlowDown?.();
        this.fovTarget = this.options.fov;
        this.speedUpTarget = 0;
      };
      onTouchStart = (ev: TouchEvent) => {
        this.options.onSpeedUp?.();
        this.fovTarget = this.options.fovSpeedUp;
        this.speedUpTarget = this.options.speedUp;
      };
      onTouchEnd = (ev: TouchEvent) => {
        this.options.onSlowDown?.();
        this.fovTarget = this.options.fov;
        this.speedUpTarget = 0;
      };
      onContextMenu = (ev: MouseEvent) => {
        ev.preventDefault();
      };

      update(delta: number) {
        const lerpPercentage = Math.exp(-(-60 * Math.log2(1 - 0.1)) * delta);
        this.speedUp += (this.speedUpTarget - this.speedUp) * lerpPercentage;
        this.timeOffset += this.speedUp * delta;
        const time = this.clock.elapsedTime + this.timeOffset;

        this.rightCarLights.update(time);
        this.leftCarLights.update(time);
        this.leftSticks.update(time);
        this.road.update(time);

        const fovChange = (this.fovTarget - this.camera.fov) * lerpPercentage;
        if (Math.abs(fovChange) > 0.0001) {
          this.camera.fov += fovChange * delta * 6;
        }

        if (distortion.getJS) {
          const d = distortion.getJS(0.025, time);
          this.camera.lookAt(new THREE.Vector3(this.camera.position.x + d.x, this.camera.position.y + d.y, this.camera.position.z + d.z));
        }
        this.camera.updateProjectionMatrix();
      }

      render(delta: number) {
        this.composer.render(delta);
      }

      tick = () => {
        if (this.disposed) return;
        if (!this.hasValidSize) this.onResize();
        if (this.container.offsetWidth <= 0 || this.container.offsetHeight <= 0) {
          requestAnimationFrame(this.tick);
          return;
        }
        const delta = this.clock.getDelta();
        this.update(delta);
        this.render(delta);
        requestAnimationFrame(this.tick);
      };

      dispose() {
        this.disposed = true;
        window.removeEventListener("resize", this.onResize);
        this.container.removeEventListener("mousedown", this.onMouseDown);
        this.container.removeEventListener("mouseup", this.onMouseUp);
        this.container.removeEventListener("mouseout", this.onMouseUp);
        this.container.removeEventListener("touchstart", this.onTouchStart);
        this.container.removeEventListener("touchend", this.onTouchEnd);
        this.container.removeEventListener("touchcancel", this.onTouchEnd);
        this.container.removeEventListener("contextmenu", this.onContextMenu);

        this.scene.traverse((obj) => {
          const mesh = obj as THREE.Mesh;
          if (!("geometry" in mesh)) return;
          if (mesh.geometry) mesh.geometry.dispose();
          const mat = (mesh as any).material;
          if (mat) {
            if (Array.isArray(mat)) mat.forEach((m) => m.dispose?.());
            else mat.dispose?.();
          }
        });
        this.scene.clear();
        this.composer.dispose();
        this.renderer.dispose();
        this.renderer.forceContextLoss();
        if (this.renderer.domElement.parentNode) this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
      }
    }

    class CarLights {
      webgl: App;
      options: typeof options;
      colors: number[] | number;
      speed: [number, number];
      fade: THREE.Vector2;
      mesh!: THREE.Mesh;
      constructor(webgl: App, optionsIn: typeof options, colorsIn: number[] | number, speedIn: [number, number], fadeIn: THREE.Vector2) {
        this.webgl = webgl;
        this.options = optionsIn;
        this.colors = colorsIn;
        this.speed = speedIn;
        this.fade = fadeIn;
      }

      init() {
        const o = this.options;
        const curve = new THREE.LineCurve3(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, -1));
        const geometry = new THREE.TubeGeometry(curve, 40, 1, 8, false);
        const instanced = new THREE.InstancedBufferGeometry().copy(geometry as unknown as THREE.InstancedBufferGeometry);
        instanced.instanceCount = o.lightPairsPerRoadWay * 2;

        const laneWidth = o.roadWidth / o.lanesPerRoad;
        const aOffset: number[] = [];
        const aMetrics: number[] = [];
        const aColor: number[] = [];

        let colors = this.colors;
        const colorObjs = Array.isArray(colors) ? colors.map((c) => new THREE.Color(c)) : [new THREE.Color(colors)];

        for (let i = 0; i < o.lightPairsPerRoadWay; i++) {
          const radius = random(o.carLightsRadius);
          const length = random(o.carLightsLength);
          const sp = random(this.speed);

          const carLane = i % o.lanesPerRoad;
          let laneX = carLane * laneWidth - o.roadWidth / 2 + laneWidth / 2;

          const carWidth = random(o.carWidthPercentage) * laneWidth;
          const shiftX = random(o.carShiftX) * laneWidth;
          laneX += shiftX;

          const offsetY = random(o.carFloorSeparation) + radius * 1.3;
          const offsetZ = -random(o.length);

          // left light
          aOffset.push(laneX - carWidth / 2, offsetY, offsetZ);
          // right light
          aOffset.push(laneX + carWidth / 2, offsetY, offsetZ);

          aMetrics.push(radius, length, sp);
          aMetrics.push(radius, length, sp);

          const c = pickRandom(colorObjs);
          aColor.push(c.r, c.g, c.b);
          aColor.push(c.r, c.g, c.b);
        }

        instanced.setAttribute("aOffset", new THREE.InstancedBufferAttribute(new Float32Array(aOffset), 3, false));
        instanced.setAttribute("aMetrics", new THREE.InstancedBufferAttribute(new Float32Array(aMetrics), 3, false));
        instanced.setAttribute("aColor", new THREE.InstancedBufferAttribute(new Float32Array(aColor), 3, false));

        const material = new THREE.ShaderMaterial({
          fragmentShader: carLightsFragment,
          vertexShader: carLightsVertex,
          transparent: true,
          uniforms: Object.assign(
            {
              uTime: { value: 0 },
              uTravelLength: { value: o.length },
              uFade: { value: this.fade },
            },
            fogUniforms,
            distortion.uniforms
          ),
        });

        material.onBeforeCompile = (shader) => {
          shader.vertexShader = shader.vertexShader.replace("#include <getDistortion_vertex>", distortion.getDistortion);
        };

        const mesh = new THREE.Mesh(instanced, material);
        mesh.frustumCulled = false;
        this.webgl.scene.add(mesh);
        this.mesh = mesh;
      }

      update(time: number) {
        (this.mesh.material as THREE.ShaderMaterial).uniforms.uTime.value = time;
      }
    }

    class LightsSticks {
      webgl: App;
      options: typeof options;
      mesh!: THREE.Mesh;
      constructor(webgl: App, optionsIn: typeof options) {
        this.webgl = webgl;
        this.options = optionsIn;
      }
      init() {
        const o = this.options;
        const geometry = new THREE.PlaneGeometry(1, 1);
        const instanced = new THREE.InstancedBufferGeometry().copy(geometry as unknown as THREE.InstancedBufferGeometry);
        instanced.instanceCount = o.totalSideLightSticks;

        const stickOffset = o.length / (o.totalSideLightSticks - 1);
        const aOffset: number[] = [];
        const aColor: number[] = [];
        const aMetrics: number[] = [];

        const colorObj = new THREE.Color(o.colors.sticks);
        for (let i = 0; i < o.totalSideLightSticks; i++) {
          const width = random(o.lightStickWidth);
          const height = random(o.lightStickHeight);
          aOffset.push((i - 1) * stickOffset * 2 + stickOffset * Math.random());
          aColor.push(colorObj.r, colorObj.g, colorObj.b);
          aMetrics.push(width, height);
        }

        instanced.setAttribute("aOffset", new THREE.InstancedBufferAttribute(new Float32Array(aOffset), 1, false));
        instanced.setAttribute("aColor", new THREE.InstancedBufferAttribute(new Float32Array(aColor), 3, false));
        instanced.setAttribute("aMetrics", new THREE.InstancedBufferAttribute(new Float32Array(aMetrics), 2, false));

        const material = new THREE.ShaderMaterial({
          fragmentShader: sideSticksFragment,
          vertexShader: sideSticksVertex,
          side: THREE.DoubleSide,
          uniforms: Object.assign({ uTravelLength: { value: o.length }, uTime: { value: 0 } }, fogUniforms, distortion.uniforms),
        });
        material.onBeforeCompile = (shader) => {
          shader.vertexShader = shader.vertexShader.replace("#include <getDistortion_vertex>", distortion.getDistortion);
        };
        const mesh = new THREE.Mesh(instanced, material);
        mesh.frustumCulled = false;
        this.webgl.scene.add(mesh);
        this.mesh = mesh;
      }
      update(time: number) {
        (this.mesh.material as THREE.ShaderMaterial).uniforms.uTime.value = time;
      }
    }

    class Road {
      webgl: App;
      options: typeof options;
      uTime = { value: 0 };
      leftRoadWay!: THREE.Mesh;
      rightRoadWay!: THREE.Mesh;
      island!: THREE.Mesh;

      constructor(webgl: App, optionsIn: typeof options) {
        this.webgl = webgl;
        this.options = optionsIn;
      }

      createPlane(side: number, isRoad: boolean) {
        const o = this.options;
        const segments = 100;
        const geometry = new THREE.PlaneGeometry(isRoad ? o.roadWidth : o.islandWidth, o.length, 20, segments);

        let uniforms: any = {
          uTravelLength: { value: o.length },
          uColor: { value: new THREE.Color(isRoad ? o.colors.roadColor : o.colors.islandColor) },
          uTime: this.uTime,
        };
        if (isRoad) {
          uniforms = Object.assign(uniforms, {
            uLanes: { value: o.lanesPerRoad },
            uBrokenLinesColor: { value: new THREE.Color(o.colors.brokenLines) },
            uShoulderLinesColor: { value: new THREE.Color(o.colors.shoulderLines) },
            uShoulderLinesWidthPercentage: { value: o.shoulderLinesWidthPercentage },
            uBrokenLinesLengthPercentage: { value: o.brokenLinesLengthPercentage },
            uBrokenLinesWidthPercentage: { value: o.brokenLinesWidthPercentage },
          });
        }

        const material = new THREE.ShaderMaterial({
          fragmentShader: isRoad ? roadFragment : islandFragment,
          vertexShader: roadVertex,
          side: THREE.DoubleSide,
          uniforms: Object.assign(uniforms, fogUniforms, distortion.uniforms),
        });
        material.onBeforeCompile = (shader) => {
          shader.vertexShader = shader.vertexShader.replace("#include <getDistortion_vertex>", distortion.getDistortion);
        };

        const mesh = new THREE.Mesh(geometry, material);
        mesh.rotation.x = -Math.PI / 2;
        mesh.position.z = -o.length / 2;
        mesh.position.x += (o.islandWidth / 2 + o.roadWidth / 2) * side;
        this.webgl.scene.add(mesh);
        return mesh;
      }

      init() {
        this.leftRoadWay = this.createPlane(-1, true);
        this.rightRoadWay = this.createPlane(1, true);
        this.island = this.createPlane(0, false);
      }

      update(time: number) {
        this.uTime.value = time;
      }
    }

    const app = new App(container, options);
    appRef.current = app;
    app.init();

    return () => {
      if (appRef.current) {
        appRef.current.dispose();
        appRef.current = null;
      }
      while (container.firstChild) container.removeChild(container.firstChild);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [effectOptions]);

  return <div ref={containerRef} className={`${styles.root} ${className ?? ""}`} />;
}

