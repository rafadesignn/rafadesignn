# MAX Bike — mostruário

Site de mostruário para a loja MAX Bike: apresenta a coleção em 3D, conta a
história da marca por scroll e leva **todo botão de venda direto para o
WhatsApp da loja**.

Referências de linguagem: a clareza e o ritmo das páginas de produto da Apple
somadas à contenção cromática das grandes marcas internacionais de bicicleta.

## O que tem aqui

| Peça | Onde |
|---|---|
| Logotipo (lockup, marca e favicon) | `assets/logo-*.svg`, gerado por `build/logo.py` |
| Modelo 3D paramétrico da bicicleta | `src/bike.js` |
| Iluminação de estúdio compartilhada | `src/studio.js` |
| Motor do site (cenas 3D, scroll, WhatsApp) | `src/site.js` |
| Sistema visual | `src/styles.css` |
| Conteúdo (modelos, preços, loja) | `src/data.js` |
| Filme e fotos de produto | `assets/`, gerados por `build/render.mjs` |
| Página autocontida | `dist/index.html` |

## O logotipo

O wordmark parte dos contornos reais da **Archivo Expanded Black** (SIL OFL) e
substitui o **X** por um pedivela com coroa dentada — quatro braços saindo de um
anel, que lê ao mesmo tempo como letra e como bicicleta. "BIKE" entra em peso
médio com entreletra aberta, criando a hierarquia do lockup. A marca isolada
coloca o mesmo pedivela dentro de uma roda, para favicon e assinaturas.

Ambas usam `currentColor`, então herdam a cor de onde forem aplicadas.

## As bicicletas

Não há fotos de banco de imagens: cada bicicleta é um modelo 3D construído em
Three.js a partir dos pontos de junta reais de um quadro (movimento central,
caixa de direção, ponteiras). Quatro variações — speed, mountain, urbana e
elétrica — mudam geometria, pneus, guidão e acessórios. O mesmo modelo alimenta:

- o **canvas em tempo real** no site (hero, tour de engenharia e mostruário);
- as **fotos de produto** e o **filme de 14 s**, renderizados offline com o
  mesmo estúdio de luz, para que tudo pareça a mesma marca.

## Animações de scroll

Um único canvas WebGL fica fixo atrás da página e é reaproveitado por três
cenas, trocadas conforme a posição do scroll:

1. **Hero** — a bike gira lentamente no espaço reservado a ela no grid.
2. **Tour de engenharia** — seção fixa de 5 telas: a câmera percorre quatro
   macros (transmissão, roda, quadro, cockpit) enquanto os cartões de texto
   se alternam. No mobile vira uma pilha de imagens pré-renderizadas.
3. **Mostruário** — o 3D é recortado para dentro do visor; trocar de modelo
   reconstrói a bicicleta com outra geometria e outras cores.

O enquadramento é calculado a partir da caixa envolvente do modelo e do
retângulo disponível, então funciona igual em qualquer proporção de tela.

## WhatsApp

Todos os CTAs apontam para `wa.me` com uma mensagem de contexto (nome do
modelo, preço, serviço). O número fica em um único lugar:

```js
// src/data.js
window.MAXBIKE.WHATSAPP = '5500000000000';   // ← DDI + DDD + número, só dígitos
```

**Troque este número pelo da loja antes de publicar.** O valor atual é um
placeholder e não corresponde a nenhuma linha real.

## Rodar

```bash
python3 -m http.server 8000        # a partir desta pasta
# abra http://localhost:8000
```

Publicar: use `dist/index.html`, que é autossuficiente — CSS, JavaScript,
fonte, imagens e vídeo estão embutidos e a página não faz nenhuma requisição
externa.

## Regerar os materiais

```bash
npm install three esbuild playwright-core     # dentro de build/
pip install fonttools imageio-ffmpeg

node build/render.mjs all      # fotos de produto + filme
python3 build/logo.py . assets # logotipo
node build/bundle.mjs          # dist/index.html
```

## Conteúdo de demonstração

Textos, preços, ficha técnica, endereço e números da loja são exemplos para
demonstrar a estrutura da página e devem ser substituídos pelos dados reais.
