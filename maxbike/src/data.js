/* =============================================================
   MAX Bike — conteudo do mostruario
   ATENCAO: troque WHATSAPP pelo numero real da loja (DDI+DDD+numero,
   somente digitos). Todos os botoes de venda usam esta constante.
   ============================================================= */
window.MAXBIKE = window.MAXBIKE || {};

/* Resolve um arquivo de midia. Em desenvolvimento aponta para /assets;
   na versao empacotada devolve o data URI embutido. */
window.MAXBIKE.ASSETS = window.MAXBIKE.ASSETS || null;
window.MAXBIKE.asset = function (nome) {
  const m = window.MAXBIKE.ASSETS;
  return (m && m[nome]) || 'assets/' + nome;
};

window.MAXBIKE.WHATSAPP = '5500000000000';

window.MAXBIKE.LOJA = {
  endereco: 'Av. das Bicicletas, 1200 — Pinheiros, São Paulo/SP',
  horario: 'Seg a Sex, 9h às 19h · Sábado, 9h às 15h',
  telefone: '(00) 0000-0000',
  email: 'contato@maxbike.com.br'
};

/* Precos e fichas tecnicas sao conteudo de demonstracao. */
window.MAXBIKE.MODELOS = [
  {
    id: 'velocita', nome: 'MAX Velocità', linha: 'Speed', tipo: 'road',
    preco: 8490, resumo: 'A mais rápida da casa. Feita para quem conta segundos, não quilômetros.',
    frameColor: 0xd8dde4, accentColor: 0xff4a17, rimColor: 0x0d0f12,
    specs: [
      ['Quadro', 'Alumínio hidroformado'],
      ['Garfo', 'Carbono full'],
      ['Transmissão', '2x12 — 24 marchas'],
      ['Peso', '8,9 kg']
    ]
  },
  {
    id: 'noturna', nome: 'MAX Noturna', linha: 'Speed', tipo: 'road',
    preco: 9990, resumo: 'Edição escura, sem um único brilho fora do lugar. Para a cidade depois das 19h.',
    frameColor: 0x0e1116, accentColor: 0xff4a17, rimColor: 0x0a0c0f,
    specs: [
      ['Quadro', 'Alumínio hidroformado'],
      ['Garfo', 'Carbono full'],
      ['Transmissão', '2x12 — 24 marchas'],
      ['Peso', '9,1 kg']
    ]
  },
  {
    id: 'trilha', nome: 'MAX Trilha', linha: 'Mountain', tipo: 'mtb',
    preco: 7190, resumo: 'Aro 29, pneu largo e freio a disco. O terreno que você escolher.',
    frameColor: 0xff4a17, accentColor: 0x0e1116, rimColor: 0x101317,
    specs: [
      ['Quadro', 'Alumínio 6061 T6'],
      ['Suspensão', 'Curso 100 mm'],
      ['Transmissão', '1x12 — 12 marchas'],
      ['Peso', '12,4 kg']
    ]
  },
  {
    id: 'serra', nome: 'MAX Serra', linha: 'Mountain', tipo: 'mtb',
    preco: 11400, resumo: 'Trilha longa, subida pesada, descida sem susto. A mais resistente.',
    frameColor: 0x1d5c4a, accentColor: 0xd8dde4, rimColor: 0x0d0f12,
    specs: [
      ['Quadro', 'Alumínio 6061 T6'],
      ['Suspensão', 'Curso 120 mm'],
      ['Transmissão', '1x12 — 12 marchas'],
      ['Peso', '13,0 kg']
    ]
  },
  {
    id: 'metropole', nome: 'MAX Metrópole', linha: 'Urbana', tipo: 'urban',
    preco: 3890, resumo: 'Bagageiro, paralama e postura ereta. Sai de casa pronta para o dia inteiro.',
    frameColor: 0x2b3a55, accentColor: 0xff9b1f, rimColor: 0xb9bec6,
    specs: [
      ['Quadro', 'Alumínio urbano'],
      ['Acessórios', 'Bagageiro + paralama'],
      ['Transmissão', '1x8 — 8 marchas'],
      ['Peso', '13,8 kg']
    ]
  },
  {
    id: 'volt', nome: 'MAX Volt', linha: 'Elétrica', tipo: 'ebike',
    preco: 14900, resumo: 'Motor central e bateria integrada ao quadro. Chega sem suor, sai sem pressa.',
    frameColor: 0x8a1f12, accentColor: 0xffc247, rimColor: 0x0d0f12,
    specs: [
      ['Motor', 'Central 250 W'],
      ['Bateria', 'Integrada 500 Wh'],
      ['Autonomia', 'Até 90 km'],
      ['Peso', '22,5 kg']
    ]
  }
];

/* Paradas do tour de engenharia (secao fixa com WebGL) */
window.MAXBIKE.TOUR = [
  {
    id: 'transmissao', titulo: 'Troca que você sente no dedo.',
    texto: 'Coroa usinada, corrente sob tensão constante e câmbio regulado na bancada antes de sair da loja. A marcha entra onde você mandou.',
    specs: [['Marchas', 'Até 24'], ['Regulagem', 'Inclusa']],
    img: 'macro-transmissao.jpg',
    cam: [0.78, 0.36, 1.10], tgt: [0.02, 0.30, 0.02], fov: 28, yaw: -0.15, off: 0.26
  },
  {
    id: 'roda', titulo: 'Rigidez onde importa.',
    texto: 'Aro perfilado, raios cruzados em duas voltas e cubo selado. A força do pedal vira avanço, não torção.',
    specs: [['Raios', '24 cruzados'], ['Freio', 'Disco hidráulico']],
    img: 'macro-roda.jpg',
    cam: [1.55, 0.62, 1.42], tgt: [0.58, 0.36, 0], fov: 29, yaw: 0.05, off: 0.26
  },
  {
    id: 'quadro', titulo: 'Geometria que cabe em você.',
    texto: 'Cinco tamanhos por modelo e ajuste de altura, recuo e guidão feito na loja. Bike boa é a que some embaixo do corpo.',
    specs: [['Tamanhos', '5 por modelo'], ['Bike fit', 'Incluso']],
    img: 'macro-quadro.jpg',
    cam: [1.13, 1.10, 1.21], tgt: [0.18, 0.66, 0], fov: 30, yaw: -0.30, off: 0.34
  },
  {
    id: 'cockpit', titulo: 'Controle a 40 km/h.',
    texto: 'Guidão drop com apoio alto para o dia a dia e posição baixa para o vento. Manetes ao alcance do dedo em qualquer uma das duas.',
    specs: [['Guidão', 'Drop / reto'], ['Fita', 'Trocada grátis']],
    img: 'macro-cockpit.jpg',
    cam: [1.05, 1.20, 1.05], tgt: [0.55, 0.95, 0], fov: 32, yaw: -0.70, off: 0.22
  }
];

window.MAXBIKE.SERVICOS = [
  { n: '01', t: 'Montagem e entrega', d: 'Nenhuma bike sai daqui sem passar pela bancada: roda centrada, freio sangrado, câmbio regulado e torque conferido peça por peça.', cta: 'Agendar montagem' },
  { n: '02', t: 'Revisão e manutenção', d: 'Da revisão preventiva ao overhaul completo. Diagnóstico na hora e orçamento antes de qualquer serviço.', cta: 'Pedir orçamento' },
  { n: '03', t: 'Bike fit e ajuste', d: 'Medimos você, não só a bike. Altura de selim, recuo, alcance e guidão ajustados para pedalar sem dor.', cta: 'Marcar bike fit' }
];
