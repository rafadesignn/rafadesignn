import { chromium } from 'playwright-core';
const [,, base, out, w, h] = process.argv;
const b = await chromium.launch({ executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--no-sandbox','--disable-dev-shm-usage','--autoplay-policy=no-user-gesture-required'] });
const p = await b.newPage({ viewport:{ width:+w, height:+h }, deviceScaleFactor:1 });
const errs=[]; p.on('pageerror', e=>errs.push('PAGEERROR: '+e.message));
p.on('console', m=>{ if(m.type()==='error') errs.push('CONSOLE: '+m.text()); });
await p.goto(base, { waitUntil:'load' });
await p.addStyleTag({ content: 'html{scroll-behavior:auto !important}' });
await p.waitForTimeout(2500);
const H = await p.evaluate(()=>document.body.scrollHeight);
console.log('altura total:', H, 'viewport:', w+'x'+h);
const stops = JSON.parse(process.env.STOPS || '[0,0.08,0.17,0.26,0.38,0.46,0.54,0.66,0.78,0.88,0.96]');
for (let i=0;i<stops.length;i++){
  await p.evaluate((y)=>window.scrollTo(0,y), Math.round((H-+h)*stops[i]));
  await p.waitForTimeout(1600);
  await p.screenshot({ path: `${out}/s${String(i).padStart(2,'0')}.jpg`, type:'jpeg', quality:80 });
}
if (errs.length) console.log('ERROS:\n'+errs.join('\n')); else console.log('sem erros de console');
await b.close();
