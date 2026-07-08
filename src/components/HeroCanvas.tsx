import { useEffect, useRef } from "react"
import * as THREE from "three"

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`

const fragmentShader = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uResolution;
  varying vec2 vUv;

  // Simplex noise — Ian McEwan, Ashima Arts (MIT)
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
    m = m * m;
    m = m * m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 4; i++) {
      value += amplitude * snoise(p);
      p *= 2.1;
      amplitude *= 0.5;
    }
    return value;
  }

  void main() {
    vec2 uv = vUv;
    vec2 p = uv * 2.0 - 1.0;
    p.x *= uResolution.x / uResolution.y;

    float t = uTime * 0.06;
    vec2 mouseOffset = (uMouse - 0.5) * 0.55;

    vec2 q = vec2(
      fbm(p * 0.8 + t),
      fbm(p * 0.8 - t * 0.7 + 3.1)
    );
    vec2 r = vec2(
      fbm(p + q * 1.4 + mouseOffset + t * 0.5),
      fbm(p + q * 1.4 - mouseOffset - t * 0.3 + 7.7)
    );
    float field = fbm(p * 0.9 + r * 1.3);

    vec3 base = vec3(0.043, 0.043, 0.039);       // near-black
    vec3 moss = vec3(0.075, 0.145, 0.055);       // deep green
    vec3 lime = vec3(0.843, 1.0, 0.243);         // chartreuse accent
    vec3 violet = vec3(0.16, 0.10, 0.24);        // faint violet

    vec3 color = base;
    color = mix(color, violet, smoothstep(-0.4, 0.7, q.y) * 0.5);
    color = mix(color, moss, smoothstep(-0.2, 0.9, field));
    float highlight = smoothstep(0.45, 0.95, field) * smoothstep(0.0, 0.8, r.x);
    color = mix(color, lime, highlight * 0.42);

    // vignette
    float vig = 1.0 - dot(p * 0.55, p * 0.55);
    color *= clamp(vig, 0.25, 1.0);

    gl_FragColor = vec4(color, 1.0);
  }
`

export function HeroCanvas() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: "low-power" })
    } catch {
      return // WebGL unavailable — static CSS background remains
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75))
    renderer.setSize(container.clientWidth, container.clientHeight)
    container.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)

    const uniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uResolution: {
        value: new THREE.Vector2(container.clientWidth, container.clientHeight),
      },
    }

    const material = new THREE.ShaderMaterial({ vertexShader, fragmentShader, uniforms })
    const geometry = new THREE.PlaneGeometry(2, 2)
    scene.add(new THREE.Mesh(geometry, material))

    const mouseTarget = new THREE.Vector2(0.5, 0.5)
    const onPointerMove = (e: PointerEvent) => {
      mouseTarget.set(e.clientX / window.innerWidth, 1 - e.clientY / window.innerHeight)
    }
    window.addEventListener("pointermove", onPointerMove, { passive: true })

    let rafId = 0
    let visible = true
    const clock = new THREE.Clock()

    const render = () => {
      uniforms.uTime.value = clock.getElapsedTime()
      uniforms.uMouse.value.lerp(mouseTarget, 0.045)
      renderer.render(scene, camera)
    }

    const loop = () => {
      render()
      rafId = requestAnimationFrame(loop)
    }

    if (reduced) {
      uniforms.uTime.value = 12
      render()
    } else {
      loop()
    }

    const observer = new IntersectionObserver(([entry]) => {
      const nowVisible = entry.isIntersecting
      if (nowVisible && !visible && !reduced) {
        loop()
      } else if (!nowVisible && visible) {
        cancelAnimationFrame(rafId)
      }
      visible = nowVisible
    })
    observer.observe(container)

    const onResize = () => {
      const { clientWidth, clientHeight } = container
      renderer.setSize(clientWidth, clientHeight)
      uniforms.uResolution.value.set(clientWidth, clientHeight)
      if (reduced) render()
    }
    window.addEventListener("resize", onResize)

    return () => {
      cancelAnimationFrame(rafId)
      observer.disconnect()
      window.removeEventListener("pointermove", onPointerMove)
      window.removeEventListener("resize", onResize)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="absolute inset-0 overflow-hidden [&>canvas]:block [&>canvas]:h-full [&>canvas]:w-full"
    />
  )
}
