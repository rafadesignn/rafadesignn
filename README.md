# HojeNoFlix ❤️

Uma experiência romântica interativa de Rafael para Lorena, no formato de
um app de streaming: abertura estilo Netflix, a história em episódios,
declaração, próximos episódios e o pedido de namoro.

Ela só precisa de uma coisa: **o link**. Nada de login, instalação ou
configuração — abre no Safari do iPhone e a experiência começa sozinha.

---

## Como rodar no computador

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

Para simular o iPhone: abra o DevTools do navegador (F12) → modo
responsivo → escolha um viewport de 390 × 844.

---

## Onde colocar cada coisa

### Fotos

Coloque as fotos em:

```
/public/memories/01.jpg
/public/memories/02.jpg
/public/memories/03.jpg
...
```

Depois registre cada uma em `src/data/story.ts` (na galeria, nos
episódios ou nos "momentos fora do roteiro"). As 4 fotos atuais já estão
registradas — para trocar, basta substituir os arquivos mantendo o nome,
ou editar os caminhos no `story.ts`.

### Vídeos

```
/public/videos/01.mp4
/public/videos/02.mp4
```

Para exibir um vídeo na galeria, adicione em `src/data/story.ts` dentro de
`gallery.items`:

```ts
{ type: "video", src: "/videos/01.mp4", caption: "..." }
```

Dica: exporte os vídeos em MP4 (H.264) para funcionar bem no iPhone.
Se um arquivo não existir, o site não quebra — o card some sozinho.

### Logo da Netflix

```
/public/branding/netflix-logo.png
```

Já está no lugar. Se quiser trocar, substitua o arquivo mantendo o nome
(idealmente com fundo preto ou transparente).

### Música

```
/public/audio/intro.mp3
```

Opcional. O iPhone bloqueia som automático, então a experiência funciona
perfeitamente em silêncio. Se o arquivo existir, aparece um botão
discreto "♫ Ativar som" no topo — o som só toca se ela tocar no botão.
Se o arquivo não existir, o botão nem aparece.

### Textos

**Tudo** que é pessoal está em um único arquivo:

```
src/data/story.ts
```

Nomes, data, sinopse, episódios, declaração, pedido, créditos,
pós-créditos — é só editar ali. Nenhum texto pessoal está espalhado
pelos componentes.

---

## Deploy na Vercel

1. Suba este projeto para um repositório no GitHub (pode ser privado).
2. Acesse [vercel.com](https://vercel.com) e faça login com o GitHub.
3. Clique em **Add New → Project** e importe o repositório.
4. Não precisa mudar nenhuma configuração — clique em **Deploy**.
5. Em ~1 minuto você recebe a URL pública (ex.: `https://hojenoflix.vercel.app`).
6. Envie a URL para a Lorena pelo WhatsApp. 🎬

O preview do link no WhatsApp é neutro de propósito ("Netflix — Tem algo
novo para assistir." com fundo preto): nada entrega a surpresa antes de
ela abrir.

Observações:

- O site não é indexado pelo Google (`noindex`) e não tem nenhum
  rastreamento/analytics.
- A resposta do pedido fica **somente no navegador dela**
  (`localStorage`) — nada é enviado para servidor nenhum.
- Depois do "SIM", o site vira "100% Match", "2 temporadas" e libera a
  Temporada 2 automaticamente nas próximas visitas dela.

---

## Stack

Next.js (App Router) • TypeScript • Tailwind CSS • Framer Motion • Lucide Icons
