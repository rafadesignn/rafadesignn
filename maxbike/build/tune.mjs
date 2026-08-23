import { chromium } from 'playwright-core';
import { writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(HERE, '.frames'); mkdirSync(OUT, { recursive: true });
const b = await chromium.launch({ executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--no-sandbox','--disable-dev-shm-usage'] });
const p = await b.newPage({ viewport:{ width:1280, height:800 } });
p.on('pageerror', e=>console.error(e.message));
await p.goto('file://' + resolve(HERE, 'studio.html'));
await p.waitForFunction('typeof window.setup === "function"');
await p.evaluate(()=>window.setup(1280, 800));   // mesma proporcao do site
await p.evaluate(()=>window.loadBike({type:'road',frameColor:0x0e1116,accentColor:0xff4a17,rimColor:0x0a0c0f}));
await p.evaluate(()=>window.setBackground(0x08090a, 1.08));
await p.evaluate(()=>window.setEnvRotation(0.8, 1.2));
const CANDS = JSON.parse(process.env.CANDS);
for (let i=0;i<CANDS.length;i++){
  const c = CANDS[i];
  await p.evaluate((a)=>window.spin(a[0],a[1],a[2]), [0.9, 1.4, c.yaw]);
  await p.evaluate((a)=>window.aim(a[0],a[1],a[2],a[3],a[4],a[5],a[6]), [...c.cam, ...c.tgt, c.fov]);
  const d = await p.evaluate(()=>window.grab(0.85));
  writeFileSync(`${OUT}/t${String(i).padStart(2,'0')}.jpg`, Buffer.from(d.split(',')[1],'base64'));
}
await b.close(); console.log('ok', CANDS.length);
