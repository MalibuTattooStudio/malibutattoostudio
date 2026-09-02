import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/* ═══════════════════════════════════════════════════════════
   HYBRID HERO CANVAS — Malibu Tattoo Studio
   1. GPU Fluid Ink Simulation (Softened & Non-obtrusive)
   2. Interactive 3D Cyber Wireframe Core in Center
   Inspired by Active Theory
   ═══════════════════════════════════════════════════════════ */

// ─── VERTEX SHADER (Fullscreen Quad) ───
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

// ─── SPLAT: inject soft color/velocity ───
const splatFS = `
  precision highp float;
  uniform sampler2D uTarget;
  uniform float aspectRatio;
  uniform vec3 color;
  uniform vec2 point;
  uniform float radius;
  varying vec2 vUv;
  void main() {
    vec2 p = vUv - point;
    p.x *= aspectRatio;
    vec3 splat = exp(-dot(p, p) / radius) * color;
    vec3 base = texture2D(uTarget, vUv).xyz;
    gl_FragColor = vec4(base + splat, 1.0);
  }
`;

// ─── ADVECTION ───
const advectionFS = `
  precision highp float;
  uniform sampler2D uVelocity;
  uniform sampler2D uSource;
  uniform vec2 texelSize;
  uniform float dt;
  uniform float dissipation;
  varying vec2 vUv;
  void main() {
    vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
    vec4 result = dissipation * texture2D(uSource, coord);
    gl_FragColor = result;
  }
`;

// ─── DIVERGENCE ───
const divergenceFS = `
  precision highp float;
  uniform sampler2D uVelocity;
  uniform vec2 texelSize;
  varying vec2 vUv;
  void main() {
    float L = texture2D(uVelocity, vUv - vec2(texelSize.x, 0.0)).x;
    float R = texture2D(uVelocity, vUv + vec2(texelSize.x, 0.0)).x;
    float T = texture2D(uVelocity, vUv + vec2(0.0, texelSize.y)).y;
    float B = texture2D(uVelocity, vUv - vec2(0.0, texelSize.y)).y;
    float div = 0.5 * (R - L + T - B);
    gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
  }
`;

// ─── CURL ───
const curlFS = `
  precision highp float;
  uniform sampler2D uVelocity;
  uniform vec2 texelSize;
  varying vec2 vUv;
  void main() {
    float L = texture2D(uVelocity, vUv - vec2(texelSize.x, 0.0)).y;
    float R = texture2D(uVelocity, vUv + vec2(texelSize.x, 0.0)).y;
    float T = texture2D(uVelocity, vUv + vec2(0.0, texelSize.y)).x;
    float B = texture2D(uVelocity, vUv - vec2(0.0, texelSize.y)).x;
    float vorticity = R - L - T + B;
    gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
  }
`;

// ─── VORTICITY CONFINEMENT ───
const vorticityFS = `
  precision highp float;
  uniform sampler2D uVelocity;
  uniform sampler2D uCurl;
  uniform float curl;
  uniform float dt;
  uniform vec2 texelSize;
  varying vec2 vUv;
  void main() {
    float L = texture2D(uCurl, vUv - vec2(texelSize.x, 0.0)).x;
    float R = texture2D(uCurl, vUv + vec2(texelSize.x, 0.0)).x;
    float T = texture2D(uCurl, vUv + vec2(0.0, texelSize.y)).x;
    float B = texture2D(uCurl, vUv - vec2(0.0, texelSize.y)).x;
    float C = texture2D(uCurl, vUv).x;
    vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
    force /= length(force) + 0.00002;
    force *= curl * C;
    force.y *= -1.0;
    vec2 velocity = texture2D(uVelocity, vUv).xy;
    velocity += force * dt;
    gl_FragColor = vec4(velocity, 0.0, 1.0);
  }
`;

// ─── PRESSURE ───
const pressureFS = `
  precision highp float;
  uniform sampler2D uPressure;
  uniform sampler2D uDivergence;
  uniform vec2 texelSize;
  varying vec2 vUv;
  void main() {
    float L = texture2D(uPressure, vUv - vec2(texelSize.x, 0.0)).x;
    float R = texture2D(uPressure, vUv + vec2(texelSize.x, 0.0)).x;
    float T = texture2D(uPressure, vUv + vec2(0.0, texelSize.y)).x;
    float B = texture2D(uPressure, vUv - vec2(0.0, texelSize.y)).x;
    float div = texture2D(uDivergence, vUv).x;
    float pressure = (L + R + B + T - div) * 0.25;
    gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
  }
`;

// ─── GRADIENT SUBTRACT ───
const gradientSubtractFS = `
  precision highp float;
  uniform sampler2D uPressure;
  uniform sampler2D uVelocity;
  uniform vec2 texelSize;
  varying vec2 vUv;
  void main() {
    float L = texture2D(uPressure, vUv - vec2(texelSize.x, 0.0)).x;
    float R = texture2D(uPressure, vUv + vec2(texelSize.x, 0.0)).x;
    float T = texture2D(uPressure, vUv + vec2(0.0, texelSize.y)).x;
    float B = texture2D(uPressure, vUv - vec2(0.0, texelSize.y)).x;
    vec2 velocity = texture2D(uVelocity, vUv).xy;
    velocity.xy -= vec2(R - L, T - B);
    gl_FragColor = vec4(velocity, 0.0, 1.0);
  }
`;

// ─── CLEAR ───
const clearFS = `
  precision highp float;
  uniform sampler2D uTexture;
  uniform float value;
  varying vec2 vUv;
  void main() {
    gl_FragColor = value * texture2D(uTexture, vUv);
  }
`;

// ─── DISPLAY: Softened brightness for contrast with text ───
const displayFS = `
  precision highp float;
  uniform sampler2D uTexture;
  varying vec2 vUv;
  void main() {
    vec3 color = texture2D(uTexture, vUv).rgb;

    // Rich vibrant tone curve - glowing yet text-friendly
    color = pow(color * 1.05, vec3(0.90));

    // Cinematic vignette
    vec2 uv = vUv * 2.0 - 1.0;
    float vig = 1.0 - dot(uv * 0.55, uv * 0.55);
    vig = clamp(pow(vig, 0.6), 0.0, 1.0);
    color *= vig;

    // Subtle grain
    float grain = fract(sin(dot(vUv * 1000.0, vec2(12.9898, 78.233))) * 43758.5453);
    color += (grain - 0.5) * 0.008;

    gl_FragColor = vec4(color, 1.0);
  }
`;

export default function HeroCanvas() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // ─── RENDERER ───
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.autoClear = false;
    container.appendChild(renderer.domElement);

    // ─── 2D FLUID SCENE ───
    const fluidScene = new THREE.Scene();
    const fluidCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const quadGeo = new THREE.PlaneGeometry(2, 2);
    const quadMesh = new THREE.Mesh(quadGeo);
    fluidScene.add(quadMesh);

    // ─── 3D WIREFRAME OVERLAY SCENE ───
    const scene3D = new THREE.Scene();
    const camera3D = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
    camera3D.position.z = 7.5;

    // Outer Cyber Wireframe Sphere Core
    const outerGeo = new THREE.IcosahedronGeometry(4.2, 2);
    const outerMat = new THREE.MeshBasicMaterial({
      color: 0xff5500,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
    });
    const outerWireframe = new THREE.Mesh(outerGeo, outerMat);
    scene3D.add(outerWireframe);

    // Inner Secondary Geometry Node
    const innerGeo = new THREE.IcosahedronGeometry(2.1, 1);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0xff7700,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });
    const innerWireframe = new THREE.Mesh(innerGeo, innerMat);
    scene3D.add(innerWireframe);

    // Cyan Accent Orbit Node
    const cyanGeo = new THREE.IcosahedronGeometry(1.1, 1);
    const cyanMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });
    const cyanWireframe = new THREE.Mesh(cyanGeo, cyanMat);
    cyanWireframe.position.set(0, 0, -0.5);
    scene3D.add(cyanWireframe);

    // ─── SIMULATION CONFIG ───
    const SIM_RES = 256;
    const texelSize = new THREE.Vector2(1.0 / SIM_RES, 1.0 / SIM_RES);
    const PRESSURE_ITERATIONS = 18;
    const CURL_STRENGTH = 26;
    const SPLAT_RADIUS = 0.20; 
    const SPLAT_FORCE = 4200;  
    const VELOCITY_DISSIPATION = 0.965;
    const DENSITY_DISSIPATION = 0.975;
    const PRESSURE_DISSIPATION = 0.8;

    const fboOpts = {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
      type: THREE.HalfFloatType,
      depthBuffer: false,
      stencilBuffer: false,
    };

    function createDoubleFBO() {
      return {
        read: new THREE.WebGLRenderTarget(SIM_RES, SIM_RES, { ...fboOpts }),
        write: new THREE.WebGLRenderTarget(SIM_RES, SIM_RES, { ...fboOpts }),
        swap() { [this.read, this.write] = [this.write, this.read]; }
      };
    }

    const velocity = createDoubleFBO();
    const density = createDoubleFBO();
    const pressure = createDoubleFBO();
    const divergenceFBO = new THREE.WebGLRenderTarget(SIM_RES, SIM_RES, { ...fboOpts });
    const curlFBO = new THREE.WebGLRenderTarget(SIM_RES, SIM_RES, { ...fboOpts });

    function mat(fragmentShader, uniforms) {
      return new THREE.ShaderMaterial({ vertexShader, fragmentShader, uniforms, depthTest: false, depthWrite: false });
    }

    const splatMat = mat(splatFS, {
      uTarget: { value: null },
      aspectRatio: { value: window.innerWidth / window.innerHeight },
      color: { value: new THREE.Vector3() },
      point: { value: new THREE.Vector2() },
      radius: { value: SPLAT_RADIUS / 100 },
    });

    const advectionMat = mat(advectionFS, {
      uVelocity: { value: null },
      uSource: { value: null },
      texelSize: { value: texelSize },
      dt: { value: 0.016 },
      dissipation: { value: VELOCITY_DISSIPATION },
    });

    const divergenceMat = mat(divergenceFS, {
      uVelocity: { value: null },
      texelSize: { value: texelSize },
    });

    const curlMat = mat(curlFS, {
      uVelocity: { value: null },
      texelSize: { value: texelSize },
    });

    const vorticityMat = mat(vorticityFS, {
      uVelocity: { value: null },
      uCurl: { value: null },
      curl: { value: CURL_STRENGTH },
      dt: { value: 0.016 },
      texelSize: { value: texelSize },
    });

    const pressureMat = mat(pressureFS, {
      uPressure: { value: null },
      uDivergence: { value: null },
      texelSize: { value: texelSize },
    });

    const gradientSubtractMat = mat(gradientSubtractFS, {
      uPressure: { value: null },
      uVelocity: { value: null },
      texelSize: { value: texelSize },
    });

    const clearMat = mat(clearFS, {
      uTexture: { value: null },
      value: { value: PRESSURE_DISSIPATION },
    });

    const displayMat = mat(displayFS, {
      uTexture: { value: null },
    });

    function blit(target, material) {
      quadMesh.material = material;
      renderer.setRenderTarget(target);
      renderer.render(fluidScene, fluidCamera);
    }

    // ─── SOFT ELEGANT INK PALETTE ───
    const inkPalette = [
      { r: 1.0, g: 0.33, b: 0.0 },   // #ff5500 Malibu Orange
      { r: 1.0, g: 0.45, b: 0.0 },   // Amber
      { r: 0.0, g: 0.85, b: 1.0 },   // Cyan
      { r: 0.8, g: 0.2, b: 0.0 },    // Warm terracotta
    ];

    function randomColor() {
      const c = inkPalette[Math.floor(Math.random() * inkPalette.length)];
      // Vibrant intensity balance (0.08 - 0.20)
      const intensity = 0.08 + Math.random() * 0.12;
      return { r: c.r * intensity, g: c.g * intensity, b: c.b * intensity };
    }

    function splatAt(x, y, dx, dy, color) {
      splatMat.uniforms.uTarget.value = velocity.read.texture;
      splatMat.uniforms.point.value.set(x, y);
      splatMat.uniforms.color.value.set(dx, dy, 0);
      splatMat.uniforms.radius.value = SPLAT_RADIUS / 100;
      blit(velocity.write, splatMat);
      velocity.swap();

      splatMat.uniforms.uTarget.value = density.read.texture;
      splatMat.uniforms.color.value.set(color.r, color.g, color.b);
      blit(density.write, splatMat);
      density.swap();
    }

    function step(dt) {
      curlMat.uniforms.uVelocity.value = velocity.read.texture;
      blit(curlFBO, curlMat);

      vorticityMat.uniforms.uVelocity.value = velocity.read.texture;
      vorticityMat.uniforms.uCurl.value = curlFBO.texture;
      vorticityMat.uniforms.dt.value = dt;
      blit(velocity.write, vorticityMat);
      velocity.swap();

      divergenceMat.uniforms.uVelocity.value = velocity.read.texture;
      blit(divergenceFBO, divergenceMat);

      clearMat.uniforms.uTexture.value = pressure.read.texture;
      blit(pressure.write, clearMat);
      pressure.swap();

      pressureMat.uniforms.uDivergence.value = divergenceFBO.texture;
      for (let i = 0; i < PRESSURE_ITERATIONS; i++) {
        pressureMat.uniforms.uPressure.value = pressure.read.texture;
        blit(pressure.write, pressureMat);
        pressure.swap();
      }

      gradientSubtractMat.uniforms.uPressure.value = pressure.read.texture;
      gradientSubtractMat.uniforms.uVelocity.value = velocity.read.texture;
      blit(velocity.write, gradientSubtractMat);
      velocity.swap();

      advectionMat.uniforms.uVelocity.value = velocity.read.texture;
      advectionMat.uniforms.uSource.value = velocity.read.texture;
      advectionMat.uniforms.dt.value = dt;
      advectionMat.uniforms.dissipation.value = VELOCITY_DISSIPATION;
      blit(velocity.write, advectionMat);
      velocity.swap();

      advectionMat.uniforms.uVelocity.value = velocity.read.texture;
      advectionMat.uniforms.uSource.value = density.read.texture;
      advectionMat.uniforms.dissipation.value = DENSITY_DISSIPATION;
      blit(density.write, advectionMat);
      density.swap();
    }

    // ─── MOUSE / TOUCH HANDLING ───
    const mouse = { x: 0, y: 0, prevX: 0, prevY: 0, moved: false, targetX: 0, targetY: 0, currentX: 0, currentY: 0 };

    function onMouseMove(e) {
      mouse.prevX = mouse.x;
      mouse.prevY = mouse.y;
      mouse.x = e.clientX / window.innerWidth;
      mouse.y = 1.0 - e.clientY / window.innerHeight;
      mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.targetY = -(e.clientY / window.innerHeight - 0.5) * 2;
      mouse.moved = true;
    }

    function onTouchMove(e) {
      const t = e.touches[0];
      mouse.prevX = mouse.x;
      mouse.prevY = mouse.y;
      mouse.x = t.clientX / window.innerWidth;
      mouse.y = 1.0 - t.clientY / window.innerHeight;
      mouse.targetX = (t.clientX / window.innerWidth - 0.5) * 2;
      mouse.targetY = -(t.clientY / window.innerHeight - 0.5) * 2;
      mouse.moved = true;
    }

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    // Initial soft background bursts
    for (let i = 0; i < 4; i++) {
      setTimeout(() => {
        const x = 0.2 + Math.random() * 0.6;
        const y = 0.2 + Math.random() * 0.6;
        splatAt(x, y, (Math.random() - 0.5) * 800, (Math.random() - 0.5) * 800, randomColor());
      }, i * 300);
    }

    function onResize() {
      renderer.setSize(window.innerWidth, window.innerHeight);
      splatMat.uniforms.aspectRatio.value = window.innerWidth / window.innerHeight;
      camera3D.aspect = window.innerWidth / window.innerHeight;
      camera3D.updateProjectionMatrix();
    }
    window.addEventListener('resize', onResize);

    // ─── ANIMATION LOOP ───
    let animId;
    let lastTime = performance.now();
    let autoSplatTimer = 0;

    function animate() {
      animId = requestAnimationFrame(animate);

      const now = performance.now();
      let dt = (now - lastTime) / 1000;
      dt = Math.min(dt, 0.016667);
      lastTime = now;
      const time = now * 0.001;

      // Smooth mouse lerp for 3D node tilt
      mouse.currentX += (mouse.targetX - mouse.currentX) * 0.05;
      mouse.currentY += (mouse.targetY - mouse.currentY) * 0.05;

      // 1. Process mouse ink splats
      if (mouse.moved) {
        mouse.moved = false;
        const dx = (mouse.x - mouse.prevX) * SPLAT_FORCE;
        const dy = (mouse.y - mouse.prevY) * SPLAT_FORCE;
        if (Math.abs(dx) > 0.3 || Math.abs(dy) > 0.3) {
          splatAt(mouse.x, mouse.y, dx, dy, randomColor());
        }
      }

      // Gentle auto-splats when idle
      autoSplatTimer += dt;
      if (autoSplatTimer > 3.0) {
        autoSplatTimer = 0;
        const x = 0.2 + Math.random() * 0.6;
        const y = 0.2 + Math.random() * 0.6;
        splatAt(x, y, (Math.random() - 0.5) * 600, (Math.random() - 0.5) * 600, randomColor());
      }

      // 2. Step 2D fluid simulation
      step(dt);

      // 3. Render 2D fluid background to screen
      displayMat.uniforms.uTexture.value = density.read.texture;
      blit(null, displayMat);

      // 4. Update 3D wireframe core rotation & tilt
      outerWireframe.rotation.y = time * 0.05 + mouse.currentX * 0.2;
      outerWireframe.rotation.x = Math.sin(time * 0.1) * 0.15 - mouse.currentY * 0.2;
      outerWireframe.position.x = mouse.currentX * 0.25;
      outerWireframe.position.y = mouse.currentY * 0.25;

      innerWireframe.rotation.y = -time * 0.08 - mouse.currentX * 0.15;
      innerWireframe.rotation.x = time * 0.04;
      innerWireframe.position.x = mouse.currentX * 0.2;
      innerWireframe.position.y = mouse.currentY * 0.2;

      cyanWireframe.rotation.y = time * 0.12;
      cyanWireframe.rotation.z = time * 0.08;
      cyanWireframe.position.x = Math.sin(time * 0.5) * 0.5 + mouse.currentX * 0.15;
      cyanWireframe.position.y = Math.cos(time * 0.5) * 0.5 + mouse.currentY * 0.15;

      // 5. Render 3D wireframe overlay on top of fluid canvas
      renderer.clearDepth();
      renderer.render(scene3D, camera3D);
    }

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('resize', onResize);

      velocity.read.dispose(); velocity.write.dispose();
      density.read.dispose(); density.write.dispose();
      pressure.read.dispose(); pressure.write.dispose();
      divergenceFBO.dispose();
      curlFBO.dispose();

      outerGeo.dispose(); outerMat.dispose();
      innerGeo.dispose(); innerMat.dispose();
      cyanGeo.dispose(); cyanMat.dispose();

      [splatMat, advectionMat, divergenceMat, curlMat, vorticityMat,
       pressureMat, gradientSubtractMat, clearMat, displayMat].forEach(m => m.dispose());

      quadGeo.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0 h-full w-full opacity-90 transition-opacity duration-1000 pointer-events-none"
    />
  );
}
