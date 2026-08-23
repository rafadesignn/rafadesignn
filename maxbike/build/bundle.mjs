/* =============================================================
   MAX Bike — empacotador
   Gera uma pagina unica e autocontida: CSS, JS, fonte, imagens e
   video viram texto embutido. Sem nenhuma requisicao externa.
     dist/index.html   — pagina completa, hospedavel em qualquer lugar
     dist/artifact.html— mesmo conteudo sem o esqueleto html/head/body
   ============================================================= */
import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, '..');
const ASSETS = resolve(ROOT, 'assets');
const DIST = resolve(ROOT, 'dist');
const TMP = resolve(HERE, '.opt');
const FFMPEG = execFileSync('python3', ['-c', 'import imageio_ffmpeg;print(imageio_ffmpeg.get_ffmpeg_exe())']).toString().trim();

mkdirSync(DIST, { recursive: true });
mkdirSync(TMP, { recursive: true });

const kb = (n) => (n / 1024).toFixed(0) + ' KB';

/* imagens sao reduzidas ao tamanho em que realmente aparecem na tela */
const PERFIS = [
  { re: /^bike-.*-lateral\.jpg$/, w: 900, q: 4 },
  { re: /^bike-.*\.jpg$/, w: 1000, q: 5 },
  { re: /^macro-.*\.jpg$/, w: 1100, q: 5 },
  { re: /^filme-poster\.jpg$/, w: 1000, q: 5 }
];

function otimizar(nome) {
  const perfil = PERFIS.find((p) => p.re.test(nome));
  const src = resolve(ASSETS, nome);
  if (!perfil) return readFileSync(src);
  const out = resolve(TMP, nome);
  execFileSync(FFMPEG, ['-y', '-i', src, '-vf', `scale=${perfil.w}:-2`, '-q:v', String(perfil.q), out],
    { stdio: 'ignore' });
  return readFileSync(out);
}

const dataUri = (buf, mime) => `data:${mime};base64,${buf.toString('base64')}`;

/* ---- monta o manifesto de midia ---- */
const manifesto = {};
let bytes = 0;
for (const nome of readdirSync(ASSETS).sort()) {
  if (!/\.(jpg|mp4)$/.test(nome)) continue;
  const buf = nome.endsWith('.mp4') ? readFileSync(resolve(ASSETS, nome)) : otimizar(nome);
  bytes += buf.length;
  manifesto[nome] = dataUri(buf, nome.endsWith('.mp4') ? 'video/mp4' : 'image/jpeg');
  console.log('  ', nome.padEnd(28), kb(statSync(resolve(ASSETS, nome)).size), '->', kb(buf.length));
}
console.log('  midia total:', kb(bytes));

/* ---- inlining ---- */
const ler = (rel) => readFileSync(resolve(ROOT, rel), 'utf8');
let html = ler('index.html');

const css = ['src/fonts.css', 'src/styles.css'].map(ler).join('\n');
// funcao de substituicao: o conteudo pode conter $&, $' etc.
html = html.replace(/\s*<link rel="stylesheet" href="src\/fonts\.css">\s*\n\s*<link rel="stylesheet" href="src\/styles\.css">/,
  () => `\n<style>\n${css}\n</style>`);

const js = ['src/three.bundle.js', 'src/logo-svg.js', 'src/data.js', 'src/bike.js', 'src/studio.js', 'src/site.js'];
const injecao = `<script>window.MAXBIKE=window.MAXBIKE||{};window.MAXBIKE.ASSETS=${JSON.stringify(manifesto)};</script>`;
const blocos = '\n' + injecao + '\n' + js.map((f) => `<script>\n${ler(f)}\n</script>`).join('\n');
html = html.replace(/\s*<script src="src\/three\.bundle\.js"><\/script>[\s\S]*?<script src="src\/site\.js"><\/script>/,
  () => blocos);

// video e poster no HTML tambem embutidos
html = html.replace('poster="assets/filme-poster.jpg"', () => `poster="${manifesto['filme-poster.jpg']}"`);
html = html.replace('src="assets/filme-maxbike.mp4"', () => `src="${manifesto['filme-maxbike.mp4']}"`);

// so o marcado como HTML importa: strings dentro de <script> nao sao requisicoes
const suspeito = html.replace(/<script[\s\S]*?<\/script>/g, '').replace(/data:[^"']+/g, 'data:x');
if (/<(?:script|link|img|source|video)[^>]*(?:src|href)="(?!data:)[^"]*"/.test(suspeito)) {
  console.warn('AVISO: ainda restam referencias externas na pagina.');
}
writeFileSync(resolve(DIST, 'index.html'), html);
console.log('dist/index.html    ', kb(Buffer.byteLength(html)));

/* ---- variante para o Artifact: sem esqueleto html/head/body ---- */
const guardaViewport = '<script>if(!document.querySelector(\'meta[name=viewport]\')){const m=document.createElement(\'meta\');m.name=\'viewport\';m.content=\'width=device-width, initial-scale=1, viewport-fit=cover\';document.head.appendChild(m);}</script>';
const corpo = html
  .replace(/^[\s\S]*?<title>/, '<title>')
  .replace(/<\/head>\s*<body>/, '')
  .replace(/<\/body>\s*<\/html>\s*$/, '')
  .replace(/<link rel="preconnect"[^>]*>\s*/g, '')
  .replace(/<title>[\s\S]*?<\/title>/, () => '<title>MAX Bike</title>')   // no Artifact o titulo e o nome, nao a chamada
  .replace('</title>', () => '</title>\n' + guardaViewport);
writeFileSync(resolve(DIST, 'artifact.html'), corpo);
console.log('dist/artifact.html ', kb(Buffer.byteLength(corpo)));
