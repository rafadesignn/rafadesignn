/* =============================================================
   MAX Bike — Pipeline de render offline
   Gera as fotos de produto e o filme da home a partir do mesmo
   modelo 3D usado no site. Roda com Chromium + WebGL headless.
   Uso: node render.mjs [preview|stills|film|all]
   ============================================================= */
import { chromium } from 'playwright-core';
import { writeFileSync, mkdirSync, existsSync, rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, '..');
const OUT = resolve(ROOT, 'assets');
const TMP = resolve(HERE, '.frames');
const CHROME = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const FFMPEG = execFileSync('python3', ['-c', 'import imageio_ffmpeg;print(imageio_ffmpeg.get_ffmpeg_exe())']).toString().trim();

/* --------- catalogo: cada bike do mostruario --------- */
export const CATALOG = [
  { id: 'velocita',  type: 'road',  frameColor: 0xd8dde4, accentColor: 0xff4a17, rimColor: 0x0d0f12, tireColor: 0x121316 },
  { id: 'noturna',   type: 'road',  frameColor: 0x0e1116, accentColor: 0xff4a17, rimColor: 0x0a0c0f, tireColor: 0x121316 },
  { id: 'trilha',    type: 'mtb',   frameColor: 0xff4a17, accentColor: 0x0e1116, rimColor: 0x101317, tireColor: 0x131417 },
  { id: 'serra',     type: 'mtb',   frameColor: 0x1d5c4a, accentColor: 0xd8dde4, rimColor: 0x0d0f12, tireColor: 0x131417 },
  { id: 'metropole', type: 'urban', frameColor: 0x2b3a55, accentColor: 0xff9b1f, rimColor: 0xb9bec6, tireColor: 0x16171a },
  { id: 'volt',      type: 'ebike', frameColor: 0x8a1f12, accentColor: 0xffc247, rimColor: 0x0d0f12, tireColor: 0x131417 }
];

const W = 1600, H = 1100;

async function boot() {
  const browser = await chromium.launch({
    executablePath: CHROME,
    args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader',
           '--ignore-gpu-blocklist', '--no-sandbox', '--disable-dev-shm-usage']
  });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  page.on('pageerror', (e) => console.error('PAGE ERROR:', e.message));
  await page.goto('file://' + resolve(HERE, 'studio.html'));
  await page.waitForFunction('typeof window.setup === "function" && typeof window.THREE === "object"');
  await page.evaluate(([w, h]) => window.setup(w, h), [W, H]);
  return { browser, page };
}

const save = (file, dataUrl) =>
  writeFileSync(file, Buffer.from(dataUrl.split(',')[1], 'base64'));

/* ============ FOTOS DE PRODUTO ============ */
async function stills(page) {
  mkdirSync(OUT, { recursive: true });
  for (const bike of CATALOG) {
    await page.evaluate((c) => window.loadBike(c), bike);
    await page.evaluate(() => window.setBackground(0x0b0c0e, 1.08));
    await page.evaluate(() => window.setEnvRotation(0.6, 1.15));
    await page.evaluate(() => window.setKeyLight(2.6, 3.2, 2.2, 2.9));
    // tres-quartos classico de catalogo
    await page.evaluate(() => window.spin(0.4, 0.9, -0.34));
    await page.evaluate(() => window.aim(1.75, 0.66, 2.45, 0.06, 0.50, 0, 28));
    save(`${OUT}/bike-${bike.id}.jpg`, await page.evaluate(() => window.grab(0.9)));
    // perfil lateral — vista comparavel para a grade do mostruario
    await page.evaluate(() => window.spin(0.4, 0.9, 0));
    await page.evaluate(() => window.aim(0.08, 0.54, 3.5, 0.08, 0.54, 0, 28));
    save(`${OUT}/bike-${bike.id}-lateral.jpg`, await page.evaluate(() => window.grab(0.9)));
    console.log('  foto', bike.id);
  }

  // macros de engenharia (storytelling da secao tecnica)
  await page.evaluate(() => window.loadBike({ type: 'road', frameColor: 0x0e1116, accentColor: 0xff4a17, rimColor: 0x0a0c0f }));
  await page.evaluate(() => window.setBackground(0x0b0c0e, 1.1));
  const macros = [
    { id: 'macro-transmissao', spin: [0.9, 1.4, -0.15], cam: [0.62, 0.30, 0.92, 0.02, 0.28, 0.02, 26] },
    { id: 'macro-roda',        spin: [1.2, 0.5, 0.05],  cam: [1.15, 0.52, 1.05, 0.58, 0.35, 0, 26] },
    { id: 'macro-quadro',      spin: [0.2, 0.7, -0.55], cam: [1.05, 1.05, 1.15, 0.16, 0.72, 0, 30] },
    { id: 'macro-cockpit',     spin: [0.2, 0.7, -0.85], cam: [1.05, 1.32, 0.95, 0.52, 0.95, 0, 30] }
  ];
  for (const m of macros) {
    await page.evaluate((s) => window.spin(s[0], s[1], s[2]), m.spin);
    await page.evaluate((c) => window.aim(...c), m.cam);
    save(`${OUT}/${m.id}.jpg`, await page.evaluate(() => window.grab(0.88)));
    console.log('  macro', m.id);
  }
}

/* ============ FILME DA HOME ============
   4 atos, 14s: despertar -> maquina -> revelacao -> convite  */
const FPS = 25, DUR = 14;

function timeline(t) {
  const e = (x) => x * x * (3 - 2 * x);            // suavizacao
  const lerp = (a, b, k) => a + (b - a) * Math.min(Math.max(k, 0), 1);
  const seg = (s, d) => e(Math.min(Math.max((t - s) / d, 0), 1));

  if (t < 3.4) {                                    // ATO 1 — a transmissao acorda
    const k = seg(0, 3.4);
    return { cam: [lerp(0.50, 0.34, k), lerp(0.22, 0.34, k), lerp(0.62, 0.80, k)],
             tgt: [0.02, 0.28, 0], fov: lerp(24, 30, k), yaw: lerp(-0.05, 0.22, k),
             env: [lerp(0.2, 1.1, k), lerp(0.55, 1.25, k)], key: [2.2, 2.6, 1.6, lerp(1.4, 3.2, k)] };
  }
  if (t < 6.6) {                                    // ATO 2 — a roda em movimento
    const k = seg(3.4, 3.2);
    return { cam: [lerp(1.30, 0.86, k), lerp(0.40, 0.62, k), lerp(0.95, 1.28, k)],
             tgt: [lerp(0.60, 0.35, k), 0.36, 0], fov: lerp(26, 34, k), yaw: lerp(0.10, -0.18, k),
             env: [lerp(1.1, 2.2, k), 1.2], key: [lerp(2.6, -1.4, k), 3.0, 2.2, 3.0] };
  }
  if (t < 10.4) {                                   // ATO 3 — a maquina inteira
    const k = seg(6.6, 3.8);
    return { cam: [lerp(2.15, 1.15, k), lerp(0.62, 0.78, k), lerp(1.35, 2.35, k)],
             tgt: [0.05, lerp(0.48, 0.53, k), 0], fov: lerp(30, 32, k), yaw: lerp(-0.62, -0.20, k),
             env: [lerp(2.2, 3.4, k), 1.15], key: [lerp(-1.4, 2.8, k), 3.4, 2.0, 3.0] };
  }
  const k = seg(10.4, 3.6);                         // ATO 4 — o convite (perfil)
  return { cam: [lerp(1.15, 0.18, k), lerp(0.78, 0.62, k), lerp(2.35, 2.95, k)],
           tgt: [0.05, lerp(0.53, 0.52, k), 0], fov: lerp(32, 30, k), yaw: lerp(-0.20, 0.0, k),
           env: [lerp(3.4, 4.1, k), lerp(1.15, 1.0, k)], key: [2.8, 3.4, 2.0, lerp(3.0, 2.4, k)] };
}

async function film(page) {
  if (existsSync(TMP)) rmSync(TMP, { recursive: true });
  mkdirSync(TMP, { recursive: true });
  await page.evaluate(() => window.loadBike({ type: 'road', frameColor: 0x0e1116, accentColor: 0xff4a17, rimColor: 0x0a0c0f }));
  await page.evaluate(() => window.setBackground(0x08090a, 1.05));

  const total = FPS * DUR;
  for (let i = 0; i < total; i++) {
    const t = i / FPS;
    const f = timeline(t);
    // rodas e pedivela giram continuamente, desacelerando no ato final
    const speed = t < 10.4 ? 5.2 : 5.2 * (1 - (t - 10.4) / 3.6) + 0.4;
    const wheel = -t * 5.0, crank = -t * 1.9;
    await page.evaluate((a) => { window.spin(a[0], a[1], a[2]); }, [wheel, crank, f.yaw]);
    await page.evaluate((a) => window.aim(a[0], a[1], a[2], a[3], a[4], a[5], a[6]),
      [...f.cam, ...f.tgt, f.fov]);
    await page.evaluate((a) => window.setEnvRotation(a[0], a[1]), f.env);
    await page.evaluate((a) => window.setKeyLight(a[0], a[1], a[2], a[3]), f.key);
    save(`${TMP}/f${String(i).padStart(4, '0')}.jpg`, await page.evaluate(() => window.grab(0.86)));
    if (i % 25 === 0) console.log(`  frame ${i}/${total}`);
    void speed;
  }

  mkdirSync(OUT, { recursive: true });
  execFileSync(FFMPEG, ['-y', '-framerate', String(FPS), '-i', `${TMP}/f%04d.jpg`,
    '-vf', 'scale=1280:-2', '-c:v', 'libx264', '-preset', 'slow', '-crf', '30',
    '-pix_fmt', 'yuv420p', '-movflags', '+faststart', `${OUT}/filme-maxbike.mp4`], { stdio: 'inherit' });
  execFileSync(FFMPEG, ['-y', '-i', `${TMP}/f0260.jpg`, '-vf', 'scale=1280:-2', '-q:v', '6',
    `${OUT}/filme-poster.jpg`], { stdio: 'inherit' });
  rmSync(TMP, { recursive: true });
}

/* ============ PREVIEW rapido para conferencia visual ============ */
async function preview(page) {
  mkdirSync(TMP, { recursive: true });
  await page.evaluate(() => window.loadBike({ type: 'road', frameColor: 0xd8dde4, accentColor: 0xff4a17, rimColor: 0x0d0f12 }));
  await page.evaluate(() => window.setBackground(0x0b0c0e, 1.08));
  await page.evaluate(() => window.setEnvRotation(0.6, 1.15));
  await page.evaluate(() => window.spin(0.4, 0.9, -0.34));
  await page.evaluate(() => window.aim(1.75, 0.66, 2.45, 0.06, 0.50, 0, 28));
  save(`${TMP}/preview-34.jpg`, await page.evaluate(() => window.grab(0.9)));
  await page.evaluate(() => window.spin(0.4, 0.9, 0));
  await page.evaluate(() => window.aim(0.08, 0.55, 3.4, 0.08, 0.55, 0, 30));
  save(`${TMP}/preview-lateral.jpg`, await page.evaluate(() => window.grab(0.9)));
  console.log('preview em', TMP);
}

const mode = process.argv[2] || 'all';
const { browser, page } = await boot();
if (mode === 'preview') await preview(page);
if (mode === 'stills' || mode === 'all') { console.log('fotos...'); await stills(page); }
if (mode === 'film' || mode === 'all') { console.log('filme...'); await film(page); }
await browser.close();
console.log('pronto.');
