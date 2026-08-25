/**
 * ═══════════════════════════════════════════════════════════════════
 *  HOJENOFLIX — TODO O CONTEÚDO PESSOAL VIVE AQUI
 *
 *  Rafael: para mudar qualquer texto, foto, vídeo ou data da
 *  experiência, edite este arquivo. Os componentes só leem daqui.
 * ═══════════════════════════════════════════════════════════════════
 */

export const couple = {
  person1: "Rafael",
  person2: "Lorena",
  person1Full: "Rafael Cavalcante",
  startedAt: "2026-05-10",
  startedAtLabel: "10 de maio de 2026",
  startedAtShort: "10 de maio",
  year: "2026",
};

export const brand = {
  name: "HOJENOFLIX",
  tagline: "UMA HISTÓRIA ORIGINAL",
  netflixLogo: "/branding/netflix-logo.png",
};

/* ── HERO ─────────────────────────────────────────────────────── */

export const hero = {
  image: "/memories/01.jpg",
  title: "Rafael & Lorena",
  match: "99% Match",
  matchOfficial: "100% Match",
  seasons: "1 temporada",
  seasonsOfficial: "2 temporadas",
  since: "Desde 10 de maio de 2026",
  genres: "Romance • Longa distância • Baseado em fatos reais",
  girlfriendBadge: "Minha namorada ❤️",
  matchEasterEgg: "O algoritmo está sendo conservador.",
  myList: "Minha Lista",
  myListDone: "Para a vida",
  watch: "Assistir",
};

/* ── SINOPSE ──────────────────────────────────────────────────── */

export const synopsis = {
  heading: "Sinopse",
  text: [
    "Tudo começou em 10 de maio de 2026, com uma conversa que parecia igual a qualquer outra. Nenhum dos dois sabia — nem desconfiava — onde aquilo poderia chegar.",
    "Só que uma mensagem puxou a outra. As respostas foram ficando mais rápidas, as conversas mais longas, e as ligações viraram parte do dia. Sem perceber, cada um foi guardando um espaço na rotina que só o outro ocupava.",
    "Entre duas cidades distantes, cresceu uma história feita de expectativa, saudade e a certeza cada vez maior de que alguns encontros não acontecem por acaso.",
  ],
  cast: "Rafael, Lorena",
  genresLine: "Romance, Longa distância, Slow burn",
  vibeLine: "Emocionante, Íntimo, Sem pressa",
};

/* ── TEMPORADA 1 ──────────────────────────────────────────────── */

export type Episode = {
  number: number;
  title: string;
  description: string;
  duration: string;
  image?: string;
  video?: string;
  progress?: number; // 0–100, barra de progresso fictícia
  featured?: boolean;
};

export const seasonOne = {
  title: "Temporada 1",
  subtitle: "Quando tudo começou",
  episodes: [
    {
      number: 1,
      title: "10 de maio",
      description:
        "Era só uma conversa. Pelo menos parecia. Nenhum dos dois imaginava que aquela troca de mensagens aparentemente comum seria o episódio que daria origem a todo o resto.",
      duration: "42 min",
      progress: 100,
    },
    {
      number: 2,
      title: "Só mais uma mensagem",
      description:
        "As conversas viram costume. Ele pega o celular esperando resposta, ela guarda coisas do dia para contar depois. Vem a primeira ligação, a vontade de conhecer a voz por trás do texto — e a suspeita de que aquilo já não era tão casual.",
      duration: "38 min",
      progress: 100,
    },
    {
      number: 3,
      title: "Do outro lado da tela",
      description:
        "Os quilômetros aparecem no mapa e a ausência aparece na rotina. A distância pesa de verdade: não dá para chamar para um café, não dá para dividir um fim de tarde. E mesmo assim, alguém que está longe começa a fazer parte de todos os dias.",
      duration: "45 min",
      progress: 100,
    },
    {
      number: 4,
      title: "E se a gente se encontrasse?",
      description:
        "A pergunta que muda a temporada. Passagem, datas, ansiedade e aquele medo bom: será que pessoalmente vai ser igual? A expectativa cresce a cada dia que falta no calendário.",
      duration: "40 min",
      progress: 100,
    },
    {
      number: 5,
      title: "Quando o virtual virou real",
      description:
        "Depois de tanto tempo em ligações e mensagens, finalmente frente a frente. A pessoa que existia do outro lado da tela agora está ali — e é melhor do que qualquer versão imaginada.",
      duration: "52 min",
      image: "/memories/03.jpg",
      progress: 100,
      featured: true,
    },
    {
      number: 6,
      title: "Dias que passaram rápido demais",
      description:
        "Praia, passeios, comida boa, estrada, conversas que não acabavam e risadas fora de hora. O roteiro estava cheio, mas a verdade é simples: o lugar importava bem menos do que a companhia.",
      duration: "58 min",
      image: "/memories/04.jpg",
      progress: 100,
    },
    {
      number: 7,
      title: "Vida real",
      description:
        "Nem tudo é cena bonita. Tem cansaço, tem rotina, tem diferença, tem silêncio e pequenos desencontros. E foi justamente aí que ele percebeu: gostou não só dos momentos especiais, mas de descobrir como é, de verdade, estar perto dela.",
      duration: "47 min",
      image: "/memories/02.jpg",
      progress: 100,
    },
    {
      number: 8,
      title: "Até logo",
      description:
        "A mala fechada, o abraço mais longo que o normal e aquele aperto no peito. Despedida difícil é sintoma de dias que valeram a pena — e essa doeu na medida exata do quanto foi bom.",
      duration: "49 min",
      image: "/memories/01.jpg",
      progress: 97,
    },
  ] satisfies Episode[],
};

/* ── HUMOR ────────────────────────────────────────────────────── */

export const rating = {
  age: "16",
  label: "Classificação indicativa",
  content:
    "Contém: saudade, quilômetros demais e uma quantidade questionável de mensagens.",
};

export const humorBits = {
  gallery: "Disponível em exclusividade para 1 espectadora.",
  audio: "Áudio: Português. Legendas: desnecessárias — vocês já se entendem.",
  quality: "Qualidade de imagem: depende da câmera. Qualidade da companhia: 4K.",
};

/* ── GALERIA ──────────────────────────────────────────────────── */

export type MemoryItem = {
  type: "image" | "video";
  src: string;
  poster?: string;
  caption?: string;
};

export const gallery: { title: string; items: MemoryItem[] } = {
  title: "Cenas que eu assistiria de novo",
  items: [
    { type: "image", src: "/memories/03.jpg", caption: "O mar estava bom. A companhia, melhor." },
    { type: "image", src: "/memories/01.jpg", caption: "Fim de tarde com a melhor vista possível." },
    { type: "image", src: "/memories/04.jpg", caption: "A protagonista em seu habitat natural." },
    { type: "image", src: "/memories/02.jpg", caption: "Um jantar comum que não teve nada de comum." },
  ],
  // Vídeos em /public/videos (01.mp4, 02.mp4...) entram aqui automaticamente
  // se você adicionar, ex.: { type: "video", src: "/videos/01.mp4" }
};

/* ── AS CENAS QUE NÃO ESTAVAM NO ROTEIRO ─────────────────────── */

export const smallMoments = {
  title: "As cenas que não estavam no roteiro",
  intro:
    "Nenhum desses momentos foi planejado. Talvez por isso sejam os que eu mais lembro.",
  moments: [
    { text: "O jeito que você olha quando acha que eu não estou vendo. Eu estava vendo." },
    { text: "Sua risada quando alguma coisa dá errado — e ela sempre chega antes da reclamação.", image: "/memories/04.jpg" },
    { text: "As conversas dentro do carro, quando o trajeto ficou curto demais para o assunto." },
    { text: "Você escolhendo o que pedir como se fosse uma decisão de vida ou morte. Eu esperando, sem pressa nenhuma.", image: "/memories/02.jpg" },
    { text: "O silêncio confortável. Aquele que só existe quando ninguém precisa preencher nada." },
    { text: "A água do mar, o sol na cara e a sensação de que o tempo podia parar ali.", image: "/memories/03.jpg" },
    { text: "O fim do dia, o cansaço bom, e ainda assim a vontade de esticar mais um pouco." },
  ] as { text: string; image?: string }[],
  outro:
    "Os grandes momentos são fáceis de lembrar. Mas foram os detalhes que me convenceram.",
};

/* ── MUDANÇA DE TOM ───────────────────────────────────────────── */

export const toneShift = [
  "A verdade é que isso nunca foi sobre um site.",
  "Nem sobre fingir que a nossa história virou uma série.",
  "Essa foi só a desculpa que eu encontrei para te dizer uma coisa.",
];

/* ── DECLARAÇÃO ───────────────────────────────────────────────── */

export const loveLetter = {
  label: "Para Lorena",
  paragraphs: [
    "No dia 10 de maio eu não fazia ideia de que estava começando a parte boa do meu ano. Era só uma conversa — e eu nem lembro de ter percebido a hora em que deixou de ser.",
    "Eu não esperava encontrar alguém como você. Não desse jeito, não agora, não com essa naturalidade. Você chegou sem aviso e sem esforço, e de repente conversar com você virou a parte do dia que eu mais esperava.",
    "As mensagens foram ganhando importância. Depois vieram as ligações, e eu me peguei procurando desculpa para ouvir sua voz. Coisa pequena, eu sei. Mas foi nas coisas pequenas que eu me dei conta do tamanho do que estava acontecendo.",
    "Aí a gente se encontrou. E eu confesso: eu tinha medo de que pessoalmente fosse diferente. Foi. Foi melhor. Os dias juntos passaram rápido demais, e mesmo os momentos mais simples — o carro, a mesa, o mar, o silêncio — tinham uma qualidade que eu não sabia explicar. Ainda não sei. Só sei que era você.",
    "Quando você foi embora, a saudade chegou antes do aeroporto esvaziar. A distância é a parte difícil dessa história e eu não vou fingir que não é. Tem quilômetros demais entre a minha rotina e a sua, e tem dias em que isso pesa.",
    "Eu também sei que existem dúvidas, ajustes, coisas que a gente ainda vai descobrir um sobre o outro. Não estou aqui para te prometer que será simples, porque promessa fácil não é o meu estilo — e você merece mais do que isso.",
    "O que eu posso te dizer é o que eu sinto: eu quero construir isso com você, sem pressa e sem pressão. Respeitando o seu tempo, o seu espaço e o seu jeito. Eu quero participar da sua vida — dos planos grandes e das terças-feiras comuns. Quero mais viagens, mais mesas de jantar, mais estrada, mais conversas que não acabam.",
    "Eu escolho você. Não porque eu precise, mas porque, de todas as pessoas do mundo, é com você que eu quero descobrir onde essa história consegue chegar.",
  ],
  signature: "— Rafael",
};

/* ── TRANSIÇÃO PARA O FUTURO ─────────────────────────────────── */

export const futureTransition = [
  "Até aqui você conhece todos os episódios.",
  "Mas tem uma parte que eu ainda não consigo te mostrar em fotos.",
  "Porque ela ainda não aconteceu.",
];

/* ── PRÓXIMOS EPISÓDIOS ───────────────────────────────────────── */

export type FutureEpisode = {
  title: string;
  description: string;
  badge?: string;
  highlight?: boolean;
};

export const futureEpisodes = {
  title: "Próximos episódios",
  items: [
    {
      title: "O pedido",
      badge: "EM BREVE",
      description: "Tem uma pergunta que eu gostaria de te fazer.",
    },
    {
      title: "O sim dela",
      badge: "AGUARDANDO ESTREIA",
      description: "Este episódio depende exclusivamente da protagonista.",
    },
    {
      title: "Nossa primeira viagem como namorados",
      description: "Destino ainda indefinido. A companhia eu já tenho em mente.",
    },
    {
      title: "Menos quilômetros",
      description: "Um episódio que eu gostaria muito de ver acontecer.",
    },
    {
      title: "Um lugar nosso",
      description: "Ainda sem endereço, CEP ou data de estreia.",
    },
    {
      title: "Domingo qualquer",
      highlight: true,
      description:
        "Sem viagem. Sem aeroporto. Sem ocasião especial. Só um dia comum com você.",
    },
    {
      title: "As fotos que ainda não existem",
      description:
        "Eu não sei onde serão tiradas. Só sei quem eu gostaria que estivesse nelas.",
    },
    {
      title: "O resto da história",
      description: "Sinopse indisponível. Ainda estamos escrevendo.",
    },
  ] satisfies FutureEpisode[],
};

/* ── TRAILER DO FUTURO ────────────────────────────────────────── */

export const futureTrailer = {
  lines: [
    "Talvez mais viagens.",
    "Talvez alguma mudança.",
    "Talvez menos aeroportos.",
    "Muitos domingos comuns.",
    "Algumas diferenças.",
    "Algumas discussões.",
    "Muitas conversas.",
    "Mais risadas.",
    "Fotos que ainda não existem.",
    "Lugares onde ainda não estivemos.",
    "Eu não sei exatamente como isso vai ser.",
  ],
  finalLine: "Só sei com quem eu gostaria de descobrir.",
};

/* ── PEDIDO ───────────────────────────────────────────────────── */

export const proposal = {
  preparation: [
    "10 de maio de 2026.",
    "Naquele dia eu não fazia ideia do que aquela conversa significaria.",
    "Hoje eu sei que você deixou de ser apenas alguém com quem eu conversava.",
    "Virou alguém de quem eu sinto falta.",
    "Alguém que eu quero perto.",
    "Alguém que eu quero continuar conhecendo.",
    "E alguém com quem eu gostaria de escrever os próximos capítulos.",
  ],
  specialBadge: "EPISÓDIO ESPECIAL",
  callName: "Lorena…",
  question: "Quer namorar comigo?",
  yesButton: "SIM",
  laterButton: "EM BREVE…",
};

export const laterFlow = {
  lines: [
    "Tudo bem. ❤️",
    "Algumas histórias boas não precisam correr.",
    "Eu gosto do que estamos construindo e respeito o nosso tempo.",
    "Quando chegar a hora, esse episódio continua aqui.",
  ],
  backButton: "Voltar para nossa história",
};

export const yesFlow = {
  unlocked: "NOVO EPISÓDIO DESBLOQUEADO",
  episodeTitle: "O sim dela",
  premiere: "Data de estreia: hoje",
  renewed: "SÉRIE RENOVADA ❤️",
  names: "Rafael & Lorena",
  seasonConfirmed: "Temporada 2 confirmada",
  continueButton: "Começar próxima temporada",
};

/* ── TEMPORADA 2 ──────────────────────────────────────────────── */

export const seasonTwo = {
  title: "Temporada 2",
  subtitle: "Nós, oficialmente.",
  intro: ["O roteiro daqui para frente ainda está em aberto.", "E dessa vez a gente escreve junto."],
  episodes: [
    { number: 1, title: "Nossa primeira viagem como namorados" },
    { number: 2, title: "Mais dias comuns" },
    { number: 3, title: "Menos quilômetros" },
    { number: 4, title: "Um lugar nosso" },
    { number: 5, title: "Domingo qualquer" },
    { number: 6, title: "O próximo capítulo" },
  ],
  outro: ["Sinopse indisponível.", "Ainda estamos escrevendo."],
};

/* ── FINAL ────────────────────────────────────────────────────── */

export const finalWords = [
  "Eu não estou te prometendo uma história perfeita.",
  "Só estou dizendo que quero continuar descobrindo essa história com você.",
  "No nosso tempo.",
  "Do nosso jeito.",
  "Se você quiser. ❤️",
];

/* ── CRÉDITOS ─────────────────────────────────────────────────── */

export const credits = {
  brand: "HOJENOFLIX",
  tagline: "UMA HISTÓRIA ORIGINAL",
  cast: [
    {
      name: "Rafael Cavalcante",
      as: "como",
      role: "o cara que começou a gostar dela mais do que estava planejando",
    },
    {
      name: "Lorena",
      as: "como",
      role: "a protagonista que apareceu sem avisar",
    },
  ],
  lines: [
    "Baseado em acontecimentos absurdamente reais.",
    "Produzido com carinho, saudade e uma quantidade questionável de mensagens.",
  ],
  final: "10.05.2026 — ∞",
};

/* ── PÓS-CRÉDITOS ─────────────────────────────────────────────── */

export const postCredits = [
  "Ainda está aí?",
  "É claro que está. É pós-crédito.",
  "Então deixa eu te dar um último spoiler.",
  "Eu gosto muito de você.",
  "Tipo… muito mesmo. ❤️",
  "Agora pode fechar. 😂",
];

/* ── ÁUDIO ────────────────────────────────────────────────────── */

export const audio = {
  src: "/audio/intro.mp3", // opcional — se o arquivo não existir, o controle some
  enableLabel: "Ativar som",
  disableLabel: "Silenciar",
};
