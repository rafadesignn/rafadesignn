# =============================================================
# MAX Bike — gerador do logotipo
# Wordmark tipografico (Archivo Expanded) onde o "X" e substituido
# por um pedivela com coroa: a letra que se funde a bicicleta.
# =============================================================
import sys, math
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.misc.transform import Transform

SP = sys.argv[1] if len(sys.argv) > 1 else '.'
OUT = sys.argv[2] if len(sys.argv) > 2 else '.'
BLACK = TTFont(f'{SP}/archivo-black-exp.ttf')
MED = TTFont(f'{SP}/archivo-med-exp.ttf')
CAP = 100.0   # altura de caixa alta na unidade do desenho

def glyph_path(font, ch, scale, dx, dy):
    """Contorno da letra convertido para path SVG, ja no eixo Y do SVG."""
    gs = font.getGlyphSet()
    name = font.getBestCmap()[ord(ch)]
    pen = SVGPathPen(gs)
    tp = TransformPen(pen, Transform(scale, 0, 0, -scale, dx, dy))
    gs[name].draw(tp)
    return pen.getCommands(), font['hmtx'][name][0] * scale

def cap_height(font):
    try: return font['OS/2'].sCapHeight
    except Exception: return 700

SB = CAP / cap_height(BLACK)      # escala do peso black
SM = CAP / cap_height(MED)        # escala do peso medium

def crankset(cx, cy, half_w, half_h, color, accent):
    """O 'X': quatro bracos de pedivela saindo de uma coroa dentada.
       Ocupa exatamente a caixa da letra que substitui."""
    ring_r = half_h * 0.44
    teeth_r = half_h * 0.62
    arm_in = half_h * 0.40
    p = []
    for sx in (-1, 1):
        for sy in (-1, 1):
            L = math.hypot(half_w, half_h)
            ux, uy = sx * half_w / L, sy * half_h / L
            nx, ny = -uy, ux
            wi, wo = half_h * 0.17, half_h * 0.235
            x0, y0 = cx + ux * arm_in, cy + uy * arm_in
            x1, y1 = cx + ux * L, cy + uy * L
            p.append('M{:.2f} {:.2f} L{:.2f} {:.2f} L{:.2f} {:.2f} L{:.2f} {:.2f} Z'.format(
                x0 + nx * wi, y0 + ny * wi, x1 + nx * wo, y1 + ny * wo,
                x1 - nx * wo, y1 - ny * wo, x0 - nx * wi, y0 - ny * wi))
    n_teeth = 20
    circ = 2 * math.pi * teeth_r
    dash = circ / n_teeth * 0.42
    gap = circ / n_teeth - dash
    return f'''<g>
    <path d="{' '.join(p)}" fill="{color}"/>
    <circle cx="{cx:.2f}" cy="{cy:.2f}" r="{ring_r:.2f}" fill="none" stroke="{color}" stroke-width="{half_h*0.21:.2f}"/>
    <circle cx="{cx:.2f}" cy="{cy:.2f}" r="{teeth_r:.2f}" fill="none" stroke="{accent}" stroke-width="{half_h*0.10:.2f}" stroke-dasharray="{dash:.2f} {gap:.2f}" stroke-linecap="butt"/>
    <circle cx="{cx:.2f}" cy="{cy:.2f}" r="{half_h*0.105:.2f}" fill="{accent}"/>
  </g>'''

def tracked_word(font, word, scale, x, baseline, tracking, color, weightclass=''):
    parts, cur = [], x
    for ch in word:
        d, adv = glyph_path(font, ch, scale, cur, baseline)
        if d: parts.append(f'<path d="{d}" fill="{color}"/>')
        cur += adv + tracking
    return '\n  '.join(parts), cur - tracking

def build_lockup(color='#0B0D10', accent='#FF4A17', bike_color=None):
    bike_color = bike_color or color
    baseline = CAP
    x = 0.0
    parts = []
    for ch in 'M':
        d, adv = glyph_path(BLACK, ch, SB, x, baseline)
        parts.append(f'<path d="{d}" fill="{color}"/>')
        x += adv - CAP*0.045
    for ch in 'A':
        d, adv = glyph_path(BLACK, ch, SB, x, baseline)
        parts.append(f'<path d="{d}" fill="{color}"/>')
        x += adv - CAP*0.015
    # o X vira pedivela, ocupando a mesma largura que a letra teria
    xg = BLACK.getBestCmap()[ord('X')]
    x_adv = BLACK['hmtx'][xg][0] * SB
    x_lsb = BLACK['hmtx'][xg][1] * SB
    ink = x_adv - x_lsb * 2
    parts.append(crankset(x + x_adv/2, baseline - CAP*0.5, ink*0.5, CAP*0.5, color, accent))
    x += x_adv
    # BIKE em peso medio, entrelinha optica alinhada a direita
    gap = CAP*0.30
    bw, endx = tracked_word(MED, 'BIKE', SM*0.46, x + gap, baseline, CAP*0.085, bike_color)
    parts.append(bw)
    w = endx + CAP*0.02
    return parts, w, baseline

def svg(parts, w, h, pad=0):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{-pad} {-pad} {w+pad*2:.2f} {h+pad*2:.2f}" '
            f'role="img" aria-label="MAX Bike">\n  ' + '\n  '.join(parts) + '\n</svg>\n')

# 1) lockup horizontal (currentColor para herdar o tema)
parts, w, baseline = build_lockup('currentColor', 'var(--max-accent, #FF4A17)')
open(f'{OUT}/logo-maxbike.svg','w').write(svg(parts, w, CAP))

# 2) marca isolada (favicon / monograma) — coroa dentro da roda
mark = [
  '<circle cx="60" cy="60" r="54.5" fill="none" stroke="currentColor" stroke-width="6"/>',
  crankset(60, 60, 34, 34, 'currentColor', 'var(--max-accent, #FF4A17)')
]
open(f'{OUT}/logo-marca.svg','w').write(svg(mark, 120, 120))

# 3) versao empilhada para rodape e assinatura
st_parts, st_w, _ = build_lockup('currentColor', 'var(--max-accent, #FF4A17)')
open(f'{OUT}/logo-stacked.svg','w').write(svg(st_parts, st_w, CAP))
print('largura do lockup:', round(w,1))

# 4) exporta como modulo JS para injecao inline (mantem currentColor)
import json
wordmark = open(f'{OUT}/logo-maxbike.svg').read()
mark = open(f'{OUT}/logo-marca.svg').read()
js = ('window.MAXBIKE = window.MAXBIKE || {};\n'
      'window.MAXBIKE.LOGO = ' + json.dumps({'wordmark': wordmark, 'mark': mark}, ensure_ascii=False) + ';\n')
open(f'{OUT}/../src/logo-svg.js', 'w').write(js)
print('logo-svg.js gerado')
