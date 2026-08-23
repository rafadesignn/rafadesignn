/* =============================================================
   MAX Bike — Estudio de iluminacao compartilhado
   Mesmo setup usado no site (tempo real) e no render offline
   (fotos de produto + video), garantindo consistencia visual.
   ============================================================= */
(function (global) {
  'use strict';

  /* Sombra de contato barata: plano com gradiente radial em canvas.
     Evita shadow maps pesados e mantem 60fps no mobile. */
  function contactShadow(THREE, w, h, opacity) {
    const c = document.createElement('canvas');
    c.width = c.height = 256;
    const ctx = c.getContext('2d');
    const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
    g.addColorStop(0.0, 'rgba(0,0,0,0.85)');
    g.addColorStop(0.35, 'rgba(0,0,0,0.42)');
    g.addColorStop(0.7, 'rgba(0,0,0,0.10)');
    g.addColorStop(1.0, 'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 256, 256);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(w, h),
      new THREE.MeshBasicMaterial({ map: tex, transparent: true, opacity: opacity, depthWrite: false })
    );
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.y = 0.002;
    mesh.renderOrder = -1;
    return mesh;
  }

  function createStudio(THREE, renderer, opts) {
    const o = Object.assign({ background: null, envIntensity: 1.0, shadow: true }, opts || {});
    const scene = new THREE.Scene();
    if (o.background !== null) scene.background = new THREE.Color(o.background);

    // ambiente PMREM — reflexos de estudio nos tubos e no aro
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envScene = new THREE.RoomEnvironment();
    const env = pmrem.fromScene(envScene, 0.04).texture;
    scene.environment = env;
    scene.environmentIntensity = o.envIntensity;

    // luz principal (3/4 alta, define o brilho do quadro)
    const key = new THREE.DirectionalLight(0xffffff, 2.6);
    key.position.set(2.4, 3.4, 2.0);
    scene.add(key);

    // recorte traseiro (separa a silhueta do fundo escuro)
    const rim = new THREE.DirectionalLight(0xbfd4ff, 2.2);
    rim.position.set(-3.0, 1.6, -2.4);
    scene.add(rim);

    // preenchimento frio suave
    const fill = new THREE.DirectionalLight(0xffffff, 0.6);
    fill.position.set(-1.2, 0.6, 3.0);
    scene.add(fill);

    scene.add(new THREE.AmbientLight(0xffffff, 0.35));

    if (o.shadow) scene.add(contactShadow(THREE, 2.6, 1.1, 0.9));

    return {
      scene,
      lights: { key, rim, fill },
      dispose() { pmrem.dispose(); env.dispose(); }
    };
  }

  global.MAXBIKE = global.MAXBIKE || {};
  global.MAXBIKE.createStudio = createStudio;
  global.MAXBIKE.contactShadow = contactShadow;
})(typeof window !== 'undefined' ? window : globalThis);
