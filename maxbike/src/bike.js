/* =============================================================
   MAX Bike — Modelo 3D paramétrico
   Constroi uma bicicleta completa em Three.js a partir de pontos
   de junta reais do quadro. Usado tanto no site quanto no
   pipeline de render offline (video + fotos de produto).
   ============================================================= */
(function (global) {
  'use strict';

  const V = (x, y, z) => new global.THREE.Vector3(x, y, z);

  /* --- helper: tubo cilindrico entre dois pontos, com leve conicidade --- */
  function tube(THREE, material, a, b, rA, rB, seg) {
    const dir = new THREE.Vector3().subVectors(b, a);
    const len = dir.length();
    const geo = new THREE.CylinderGeometry(rB, rA, len, seg || 20, 1, false);
    const mesh = new THREE.Mesh(geo, material);
    mesh.position.copy(a).addScaledVector(dir, 0.5);
    mesh.quaternion.setFromUnitVectors(V(0, 1, 0), dir.clone().normalize());
    return mesh;
  }

  /* --- helper: esfera de junta para suavizar encontros de tubos --- */
  function joint(THREE, material, p, r) {
    const m = new THREE.Mesh(new THREE.SphereGeometry(r, 18, 14), material);
    m.position.copy(p);
    return m;
  }

  /* --- helper: arco de tubo (usado em guidao drop e correntes) --- */
  function arcTube(THREE, material, curve, radius, tubular) {
    return new THREE.Mesh(
      new THREE.TubeGeometry(curve, tubular || 40, radius, 12, false),
      material
    );
  }

  /* ============================ RODA ============================ */
  function buildWheel(THREE, mats, opts) {
    const g = new THREE.Group();
    const R = opts.radius;               // raio externo do pneu
    const tireT = opts.tireWidth;        // espessura (secao) do pneu
    const rimR = R - tireT;              // raio do aro

    // pneu
    const tire = new THREE.Mesh(
      new THREE.TorusGeometry(rimR, tireT, 16, 96),
      mats.rubber
    );
    g.add(tire);

    // banda de rodagem (levemente mais clara, sugere desenho do pneu)
    const tread = new THREE.Mesh(
      new THREE.TorusGeometry(rimR + tireT * 0.28, tireT * 0.62, 12, 96),
      mats.tread
    );
    g.add(tread);

    // aro (perfil aerodinamico)
    const rimDepth = opts.rimDepth;
    const rim = new THREE.Mesh(
      new THREE.CylinderGeometry(rimR + 0.004, rimR + 0.004, opts.rimWidth, 72, 1, true),
      mats.rim
    );
    rim.rotation.x = Math.PI / 2;
    g.add(rim);

    const rimInner = new THREE.Mesh(
      new THREE.CylinderGeometry(rimR - rimDepth, rimR - rimDepth, opts.rimWidth * 0.75, 64, 1, true),
      mats.rim
    );
    rimInner.rotation.x = Math.PI / 2;
    g.add(rimInner);

    // paredes do aro (fecham o perfil)
    for (const s of [-1, 1]) {
      const wall = new THREE.Mesh(
        new THREE.RingGeometry(rimR - rimDepth, rimR + 0.004, 72),
        mats.rim
      );
      wall.position.z = s * opts.rimWidth * 0.5;
      wall.rotation.y = s > 0 ? 0 : Math.PI;
      g.add(wall);
    }

    // faixa de destaque no aro (cor de acento da marca)
    const stripe = new THREE.Mesh(
      new THREE.TorusGeometry(rimR - rimDepth * 0.45, 0.0035, 8, 96),
      mats.accent
    );
    stripe.position.z = opts.rimWidth * 0.36;
    g.add(stripe);

    // cubo
    const hub = new THREE.Mesh(
      new THREE.CylinderGeometry(0.021, 0.021, 0.085, 24),
      mats.alloy
    );
    hub.rotation.x = Math.PI / 2;
    g.add(hub);
    for (const s of [-1, 1]) {
      const flange = new THREE.Mesh(new THREE.CylinderGeometry(0.031, 0.024, 0.008, 24), mats.alloy);
      flange.rotation.x = Math.PI / 2;
      flange.position.z = s * 0.036;
      g.add(flange);
    }
    const axle = new THREE.Mesh(new THREE.CylinderGeometry(0.007, 0.007, 0.13, 12), mats.alloy);
    axle.rotation.x = Math.PI / 2;
    g.add(axle);

    // raios cruzados
    const n = opts.spokes;
    const spokeGeo = new THREE.CylinderGeometry(0.0016, 0.0016, 1, 5);
    const spokeMesh = new THREE.InstancedMesh(spokeGeo, mats.spoke, n);
    const dummy = new THREE.Object3D();
    const up = V(0, 1, 0);
    for (let i = 0; i < n; i++) {
      const side = i % 2 === 0 ? 1 : -1;
      const aHub = (i / n) * Math.PI * 2;
      const aRim = aHub + (side * Math.PI * 2 * 2.6) / n;  // cruzamento 2x
      const from = V(Math.cos(aHub) * 0.028, Math.sin(aHub) * 0.028, side * 0.036);
      const to = V(Math.cos(aRim) * (rimR - rimDepth), Math.sin(aRim) * (rimR - rimDepth), 0);
      const dir = new THREE.Vector3().subVectors(to, from);
      dummy.position.copy(from).addScaledVector(dir, 0.5);
      dummy.quaternion.setFromUnitVectors(up, dir.clone().normalize());
      dummy.scale.set(1, dir.length(), 1);
      dummy.updateMatrix();
      spokeMesh.setMatrixAt(i, dummy.matrix);
    }
    g.add(spokeMesh);

    // disco de freio
    const disc = new THREE.Mesh(
      new THREE.CylinderGeometry(0.082, 0.082, 0.0022, 48),
      mats.steel
    );
    disc.rotation.x = Math.PI / 2;
    disc.position.z = -0.045;
    g.add(disc);
    const discInner = new THREE.Mesh(new THREE.CylinderGeometry(0.032, 0.032, 0.004, 24), mats.alloy);
    discInner.rotation.x = Math.PI / 2;
    discInner.position.z = -0.045;
    g.add(discInner);
    // furos do disco (vazados visualmente por aneis escuros)
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2;
      const hole = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.004, 10), mats.dark);
      hole.rotation.x = Math.PI / 2;
      hole.position.set(Math.cos(a) * 0.058, Math.sin(a) * 0.058, -0.045);
      g.add(hole);
    }
    return g;
  }

  /* ========================= CONJUNTO PEDIVELA ========================= */
  function buildDrivetrain(THREE, mats, bb, rearAxle) {
    const g = new THREE.Group();
    const ringR = 0.105;

    // coroa
    const ring = new THREE.Mesh(new THREE.CylinderGeometry(ringR, ringR, 0.004, 48), mats.alloy);
    ring.rotation.x = Math.PI / 2;
    ring.position.set(bb.x, bb.y, 0.055);
    g.add(ring);
    // dentes
    const teeth = new THREE.Mesh(new THREE.TorusGeometry(ringR + 0.004, 0.0035, 6, 64), mats.steel);
    teeth.position.set(bb.x, bb.y, 0.055);
    g.add(teeth);
    // vazados da coroa
    for (let i = 0; i < 5; i++) {
      const a = (i / 5) * Math.PI * 2 + 0.3;
      const cut = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.028, 0.006, 16), mats.dark);
      cut.rotation.x = Math.PI / 2;
      cut.position.set(bb.x + Math.cos(a) * 0.058, bb.y + Math.sin(a) * 0.058, 0.055);
      g.add(cut);
    }

    // eixo central
    const spindle = new THREE.Mesh(new THREE.CylinderGeometry(0.017, 0.017, 0.15, 20), mats.alloy);
    spindle.rotation.x = Math.PI / 2;
    spindle.position.copy(bb);
    g.add(spindle);

    // pedivelas + pedais — grupo ancorado no movimento central para girar certo
    const cranks = new THREE.Group();
    cranks.position.copy(bb);
    for (const s of [1, -1]) {
      const ang = s > 0 ? 0.6 : 0.6 + Math.PI;
      const L = 0.17;
      const end = V(Math.cos(ang) * L, Math.sin(ang) * L, s * 0.07);
      const arm = new THREE.Mesh(new THREE.BoxGeometry(L + 0.03, 0.026, 0.013), mats.alloy);
      arm.position.set(end.x / 2, end.y / 2, s * 0.07);
      arm.rotation.z = ang;
      cranks.add(arm);
      // pedal permanece nivelado enquanto o pedivela gira
      const pedal = new THREE.Group();
      pedal.position.copy(end).add(V(0, 0, s * 0.045));
      const pedalBody = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.014, 0.062), mats.dark);
      pedal.add(pedalBody);
      const pedalGrip = new THREE.Mesh(new THREE.BoxGeometry(0.082, 0.004, 0.055), mats.accent);
      pedalGrip.position.y = 0.01;
      pedal.add(pedalGrip);
      cranks.add(pedal);
      cranks.userData.pedals = (cranks.userData.pedals || []).concat(pedal);
    }
    g.add(cranks);
    g.userData.cranks = cranks;
    g.userData.bb = bb;

    // cassete traseiro
    for (let i = 0; i < 6; i++) {
      const r = 0.052 - i * 0.006;
      const cog = new THREE.Mesh(new THREE.CylinderGeometry(r, r, 0.0025, 30), mats.steel);
      cog.rotation.x = Math.PI / 2;
      cog.position.set(rearAxle.x, rearAxle.y, 0.032 + i * 0.0055);
      g.add(cog);
    }

    // cambio traseiro
    const derBody = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.075, 0.026), mats.alloy);
    derBody.position.set(rearAxle.x + 0.015, rearAxle.y - 0.085, 0.052);
    derBody.rotation.z = 0.25;
    g.add(derBody);
    for (const dy of [-0.03, 0.03]) {
      const pulley = new THREE.Mesh(new THREE.CylinderGeometry(0.017, 0.017, 0.006, 18), mats.dark);
      pulley.rotation.x = Math.PI / 2;
      pulley.position.set(rearAxle.x + 0.015 + dy * 0.2, rearAxle.y - 0.085 + dy, 0.052);
      g.add(pulley);
    }

    // corrente (dois trechos retos + arcos nas engrenagens)
    const chainMat = mats.steel;
    const topRun = new THREE.LineCurve3(
      V(bb.x, bb.y + ringR, 0.062),
      V(rearAxle.x, rearAxle.y + 0.048, 0.058)
    );
    const botRun = new THREE.LineCurve3(
      V(rearAxle.x + 0.02, rearAxle.y - 0.112, 0.058),
      V(bb.x, bb.y - ringR, 0.062)
    );
    g.add(arcTube(THREE, chainMat, topRun, 0.0072, 8));
    g.add(arcTube(THREE, chainMat, botRun, 0.0072, 8));
    const wrap = new THREE.Mesh(new THREE.TorusGeometry(ringR + 0.004, 0.0072, 6, 44, Math.PI * 1.02), chainMat);
    wrap.rotation.z = -Math.PI * 0.51;
    wrap.position.set(bb.x, bb.y, 0.055);
    g.add(wrap);
    return g;
  }

  /* ============================ QUADRO ============================ */
  function buildFrame(THREE, mats, P, type) {
    const g = new THREE.Group();
    const paint = mats.paint;
    const t = (a, b, rA, rB) => g.add(tube(THREE, paint, a, b, rA, rB));

    const stout = type === 'mtb' || type === 'ebike' ? 1.25 : 1;

    t(P.bb, P.headBottom, 0.031 * stout, 0.026 * stout);   // tubo diagonal
    t(P.bb, P.seatTop, 0.023 * stout, 0.019 * stout);      // tubo do selim
    t(P.seatTop, P.headTop, 0.021 * stout, 0.023 * stout); // tubo superior
    g.add(tube(THREE, paint, P.headBottom, P.headTop, 0.024 * stout, 0.024 * stout)); // caixa de direcao

    for (const s of [1, -1]) {
      const rearOff = V(P.rearAxle.x, P.rearAxle.y, s * 0.055);
      t(V(P.bb.x, P.bb.y, s * 0.03), rearOff, 0.017, 0.011);        // bainha
      t(V(P.seatTop.x, P.seatTop.y, s * 0.014), rearOff, 0.014, 0.010); // tirante
    }

    g.add(joint(THREE, paint, P.bb, 0.032 * stout));
    g.add(joint(THREE, paint, P.seatTop, 0.023 * stout));

    // garfo
    const crown = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.045, 0.075), paint);
    crown.position.copy(P.headBottom).add(V(0.008, -0.02, 0));
    crown.rotation.z = -0.35;
    g.add(crown);
    for (const s of [1, -1]) {
      const top = V(P.headBottom.x + 0.012, P.headBottom.y - 0.045, s * 0.045);
      const drop = V(P.frontAxle.x, P.frontAxle.y, s * 0.05);
      const curve = new THREE.QuadraticBezierCurve3(
        top,
        V((top.x + drop.x) / 2 + 0.02, (top.y + drop.y) / 2, s * 0.048),
        drop
      );
      g.add(arcTube(THREE, paint, curve, 0.014, 24));
    }

    // canote + selim
    g.add(tube(THREE, mats.dark, P.seatTop, P.saddle, 0.0155, 0.0155));
    const saddle = new THREE.Group();
    const shell = new THREE.Mesh(new THREE.SphereGeometry(0.5, 24, 16), mats.saddle);
    shell.scale.set(0.29, 0.055, 0.115);
    saddle.add(shell);
    const nose = new THREE.Mesh(new THREE.SphereGeometry(0.5, 18, 12), mats.saddle);
    nose.scale.set(0.2, 0.04, 0.05);
    nose.position.set(0.11, -0.004, 0);
    saddle.add(nose);
    saddle.position.copy(P.saddle).add(V(-0.02, 0.022, 0));
    saddle.rotation.z = -0.03;
    g.add(saddle);

    // mesa + guidao
    g.add(tube(THREE, mats.dark, P.headTop, P.barCenter, 0.017, 0.015));
    const bars = new THREE.Group();
    if (type === 'road') {
      // guidao drop
      // secao reta central + curva para tras ate a ponta
      const barTop = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, 0.20, 16), mats.dark);
      barTop.rotation.x = Math.PI / 2;
      bars.add(barTop);
      for (const s of [1, -1]) {
        // topo: sai reto e recua levemente (sweep)
        const top = new THREE.CubicBezierCurve3(
          V(0, 0, s * 0.10),
          V(0.005, 0, s * 0.16),
          V(-0.015, 0, s * 0.19),
          V(-0.03, -0.004, s * 0.205)
        );
        bars.add(arcTube(THREE, mats.dark, top, 0.014, 20));
        // curva e drop
        const curve = new THREE.CubicBezierCurve3(
          V(-0.03, -0.004, s * 0.205),
          V(0.10, -0.012, s * 0.205),
          V(0.135, -0.115, s * 0.205),
          V(0.02, -0.145, s * 0.205)
        );
        bars.add(arcTube(THREE, mats.dark, curve, 0.013, 28));
        const hood = new THREE.Mesh(new THREE.BoxGeometry(0.095, 0.036, 0.028), mats.grip);
        hood.position.set(0.062, 0.002, s * 0.205);
        hood.rotation.z = 0.20;
        bars.add(hood);
      }
    } else {
      // guidao reto com leve recuo
      const barW = type === 'mtb' ? 0.74 : 0.62;
      const barTop = new THREE.Mesh(new THREE.CylinderGeometry(0.0145, 0.0145, barW, 16), mats.dark);
      barTop.rotation.x = Math.PI / 2;
      barTop.rotation.y = 0.06;
      bars.add(barTop);
      for (const s of [1, -1]) {
        const grip = new THREE.Mesh(new THREE.CylinderGeometry(0.019, 0.019, 0.12, 16), mats.grip);
        grip.rotation.x = Math.PI / 2;
        grip.position.set(0, 0, s * (barW / 2 - 0.06));
        bars.add(grip);
        const lever = new THREE.Mesh(new THREE.BoxGeometry(0.075, 0.012, 0.016), mats.alloy);
        lever.position.set(0.045, -0.012, s * (barW / 2 - 0.15));
        lever.rotation.z = -0.12;
        bars.add(lever);
      }
    }
    bars.position.copy(P.barCenter);
    g.add(bars);
    g.userData.bars = bars;

    // pincas de freio
    for (const [axle, off] of [[P.frontAxle, 1], [P.rearAxle, -1]]) {
      const cal = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.06, 0.022), mats.alloy);
      cal.position.set(axle.x - off * 0.055, axle.y + 0.055, -0.045);
      g.add(cal);
    }

    // extras por tipo
    if (type === 'ebike') {
      const battery = tube(THREE, mats.dark, P.bb.clone().add(V(0.05, 0.05, 0)), P.headBottom.clone().add(V(-0.05, -0.03, 0)), 0.042, 0.038);
      g.add(battery);
      const motor = new THREE.Mesh(new THREE.SphereGeometry(0.075, 24, 18), mats.dark);
      motor.scale.set(1, 1, 0.62);
      motor.position.copy(P.bb);
      g.add(motor);
      const led = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.012, 0.03), mats.accent);
      led.position.copy(P.headBottom).add(V(-0.09, -0.02, 0.045));
      g.add(led);
    }
    if (type === 'urban') {
      const rackTop = new THREE.Mesh(new THREE.BoxGeometry(0.30, 0.012, 0.14), mats.dark);
      rackTop.position.set(P.rearAxle.x - 0.02, P.rearAxle.y + 0.30, 0);
      g.add(rackTop);
      for (const s of [1, -1]) {
        g.add(tube(THREE, mats.dark, V(P.rearAxle.x - 0.14, P.rearAxle.y + 0.29, s * 0.055), V(P.rearAxle.x, P.rearAxle.y, s * 0.055), 0.006, 0.006));
        g.add(tube(THREE, mats.dark, V(P.rearAxle.x + 0.10, P.rearAxle.y + 0.29, s * 0.05), V(P.seatTop.x, P.seatTop.y - 0.02, s * 0.03), 0.006, 0.006));
      }
      const fender = new THREE.Mesh(new THREE.TorusGeometry(0.375, 0.006, 6, 40, Math.PI * 0.55), mats.alloy);
      fender.rotation.z = Math.PI * 0.30;
      fender.position.copy(P.rearAxle);
      g.add(fender);
    }
    return g;
  }


  /* ==================== DECALQUE DA MARCA ====================
     Aplica o logotipo MAX no tubo diagonal, dos dois lados. */
  function decalTexture(THREE, color) {
    const c = document.createElement('canvas');
    c.width = 640; c.height = 160;
    const x = c.getContext('2d');
    x.clearRect(0, 0, 640, 160);
    x.fillStyle = color;
    x.font = '900 118px "Archivo", "Arial Black", system-ui, sans-serif';
    x.textBaseline = 'middle';
    x.setTransform(1, 0, -0.14, 1, 0, 0);   // italico, sugerindo velocidade
    x.fillText('MAX', 40, 74);
    x.setTransform(1, 0, 0, 1, 0, 0);
    x.font = '600 34px "Archivo", system-ui, sans-serif';
    x.letterSpacing = '14px';
    x.fillText('BIKE', 330, 108);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 8;
    return tex;
  }

  function addDecal(THREE, bike, P, o) {
    if (typeof document === 'undefined') return;
    const light = ((o.frameColor >> 16 & 255) * 0.299 + (o.frameColor >> 8 & 255) * 0.587 + (o.frameColor & 255) * 0.114) > 140;
    const tex = decalTexture(THREE, light ? '#0b0d10' : '#f4f5f7');
    const mat = new THREE.MeshStandardMaterial({
      map: tex, transparent: true, metalness: 0.1, roughness: 0.35,
      polygonOffset: true, polygonOffsetFactor: -4, depthWrite: false
    });
    const dir = new THREE.Vector3().subVectors(P.headBottom, P.bb);
    const ang = Math.atan2(dir.y, dir.x);
    const mid = new THREE.Vector3().addVectors(P.bb, P.headBottom).multiplyScalar(0.5);
    for (const s of [1, -1]) {
      const plane = new THREE.Mesh(new THREE.PlaneGeometry(0.265, 0.066), mat);
      plane.position.set(mid.x - 0.02, mid.y - 0.008, s * 0.031);
      plane.rotation.set(0, s > 0 ? 0 : Math.PI, s > 0 ? ang : -ang);
      bike.add(plane);
    }
  }

  /* ======================= MONTAGEM COMPLETA ======================= */
  function createBike(THREE, opts) {
    const o = Object.assign({
      type: 'road',
      frameColor: 0x101318,
      accentColor: 0xff4a17,
      rimColor: 0x14161a,
      tireColor: 0x121316,
      saddleColor: 0x0d0f12
    }, opts || {});

    const mats = {
      paint: new THREE.MeshPhysicalMaterial({ color: o.frameColor, metalness: 0.45, roughness: 0.22, clearcoat: 1, clearcoatRoughness: 0.06 }),
      accent: new THREE.MeshPhysicalMaterial({ color: o.accentColor, metalness: 0.3, roughness: 0.3, clearcoat: 0.8 }),
      alloy: new THREE.MeshStandardMaterial({ color: 0xb9bec6, metalness: 1, roughness: 0.24 }),
      steel: new THREE.MeshStandardMaterial({ color: 0x8d939c, metalness: 1, roughness: 0.34 }),
      dark: new THREE.MeshStandardMaterial({ color: 0x0c0d10, metalness: 0.6, roughness: 0.42 }),
      rubber: new THREE.MeshStandardMaterial({ color: o.tireColor, metalness: 0, roughness: 0.92 }),
      tread: new THREE.MeshStandardMaterial({ color: 0x1a1c20, metalness: 0, roughness: 0.98 }),
      rim: new THREE.MeshPhysicalMaterial({ color: o.rimColor, metalness: 0.85, roughness: 0.28, clearcoat: 0.6 }),
      spoke: new THREE.MeshStandardMaterial({ color: 0xc7ccd3, metalness: 1, roughness: 0.2 }),
      grip: new THREE.MeshStandardMaterial({ color: 0x15171b, metalness: 0.1, roughness: 0.8 }),
      saddle: new THREE.MeshPhysicalMaterial({ color: o.saddleColor, metalness: 0.2, roughness: 0.55 })
    };

    const wheelR = o.type === 'mtb' ? 0.365 : 0.345;
    const tireW = o.type === 'mtb' ? 0.030 : o.type === 'urban' ? 0.020 : 0.015;

    const P = {
      rearAxle: V(-0.44, wheelR, 0),
      frontAxle: V(0.60, wheelR, 0),
      bb: V(0.0, 0.275, 0),
      seatTop: V(-0.155, 0.83, 0),
      headBottom: V(0.455, 0.655, 0),
      headTop: V(0.512, 0.86, 0),
      saddle: V(-0.215, 1.0, 0),
      barCenter: V(0.60, 0.985, 0)
    };
    if (o.type === 'urban' || o.type === 'ebike') {
      P.seatTop.set(-0.175, 0.78, 0);
      P.barCenter.set(0.55, 1.06, 0);
      P.headTop.set(0.50, 0.90, 0);
      P.saddle.set(-0.235, 1.02, 0);
    }

    const bike = new THREE.Group();
    const frame = buildFrame(THREE, mats, P, o.type);
    bike.add(frame);

    const wheelOpts = {
      radius: wheelR,
      tireWidth: tireW,
      rimDepth: o.type === 'road' ? 0.055 : 0.03,
      rimWidth: o.type === 'mtb' ? 0.03 : 0.024,
      spokes: o.type === 'road' ? 24 : 32
    };
    const rear = buildWheel(THREE, mats, wheelOpts);
    rear.position.copy(P.rearAxle);
    const front = buildWheel(THREE, mats, wheelOpts);
    front.position.copy(P.frontAxle);
    bike.add(rear, front);

    const drive = buildDrivetrain(THREE, mats, P.bb, P.rearAxle);
    bike.add(drive);

    if (o.decal !== false) addDecal(THREE, bike, P, o);

    bike.traverse((m) => { if (m.isMesh) { m.castShadow = true; m.receiveShadow = true; } });

    bike.userData = {
      wheels: [rear, front],
      cranks: drive.userData.cranks,
      bb: P.bb,
      bars: frame.userData.bars,
      materials: mats,
      spin(delta, speed) {
        const w = (speed || 1) * delta;
        rear.rotation.z -= w * 2.4;
        front.rotation.z -= w * 2.4;
        if (this.cranks) {
          this.cranks.rotation.z -= w * 0.9;
          const pedals = this.cranks.userData.pedals || [];
          for (const p of pedals) p.rotation.z = -this.cranks.rotation.z;
        }
      },
      setPaint(hex) { mats.paint.color.setHex(hex); },
      setAccent(hex) { mats.accent.color.setHex(hex); },
      setRim(hex) { mats.rim.color.setHex(hex); },
      dispose() {
        bike.traverse((m) => { if (m.isMesh) { m.geometry.dispose(); } });
        Object.values(mats).forEach((mm) => mm.dispose());
      }
    };
    return bike;
  }

  global.MAXBIKE = global.MAXBIKE || {};
  global.MAXBIKE.createBike = createBike;
})(typeof window !== 'undefined' ? window : globalThis);
