/* ============================================================
   Rafael Cavalcante — Portfolio
   Interactions: reveals, cursor, counters, i18n, copy e-mail
   ============================================================ */

(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !prefersReducedMotion) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- Nav: blur on scroll, hide on scroll down ---------- */
  var nav = document.getElementById("nav");
  var lastY = window.scrollY;

  window.addEventListener("scroll", function () {
    var y = window.scrollY;
    nav.classList.toggle("scrolled", y > 40);
    if (y > 320 && y > lastY) {
      nav.classList.add("hidden");
    } else {
      nav.classList.remove("hidden");
    }
    lastY = y;
  }, { passive: true });

  /* ---------- Custom cursor ---------- */
  var dot = document.querySelector(".cursor-dot");
  var ring = document.querySelector(".cursor-ring");
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  if (finePointer && !prefersReducedMotion && dot && ring) {
    var mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

    document.addEventListener("mousemove", function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      document.body.classList.add("cursor-active");
      dot.style.transform = "translate(" + mouseX + "px," + mouseY + "px) translate(-50%,-50%)";
    });

    (function animateRing() {
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;
      ring.style.transform = "translate(" + ringX + "px," + ringY + "px) translate(-50%,-50%)";
      requestAnimationFrame(animateRing);
    })();

    document.querySelectorAll("a, button").forEach(function (el) {
      el.addEventListener("mouseenter", function () { ring.classList.add("is-hover"); });
      el.addEventListener("mouseleave", function () { ring.classList.remove("is-hover"); });
    });
  }

  /* ---------- Magnetic buttons ---------- */
  if (finePointer && !prefersReducedMotion) {
    document.querySelectorAll(".magnetic").forEach(function (el) {
      el.addEventListener("mousemove", function (e) {
        var rect = el.getBoundingClientRect();
        var x = e.clientX - rect.left - rect.width / 2;
        var y = e.clientY - rect.top - rect.height / 2;
        el.style.transform = "translate(" + x * 0.18 + "px," + y * 0.22 + "px)";
      });
      el.addEventListener("mouseleave", function () {
        el.style.transform = "translate(0,0)";
      });
    });
  }

  /* ---------- Animated counters (stats) ---------- */
  var counters = document.querySelectorAll("[data-count]");
  if ("IntersectionObserver" in window && counters.length) {
    var counterObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var el = entry.target;
          var target = parseInt(el.getAttribute("data-count"), 10);
          counterObserver.unobserve(el);

          if (prefersReducedMotion) {
            el.textContent = target;
            return;
          }

          var duration = 1400;
          var start = null;
          function step(ts) {
            if (!start) start = ts;
            var progress = Math.min((ts - start) / duration, 1);
            var eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(eased * target);
            if (progress < 1) requestAnimationFrame(step);
          }
          requestAnimationFrame(step);
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach(function (el) { counterObserver.observe(el); });
  }

  /* ---------- Copy e-mail ---------- */
  var copyBtn = document.getElementById("copyEmail");
  var toast = document.getElementById("toast");

  if (copyBtn) {
    copyBtn.addEventListener("click", function () {
      var email = copyBtn.getAttribute("data-email");
      function done() {
        toast.classList.add("show");
        setTimeout(function () { toast.classList.remove("show"); }, 2400);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(done);
      } else {
        var tmp = document.createElement("textarea");
        tmp.value = email;
        document.body.appendChild(tmp);
        tmp.select();
        document.execCommand("copy");
        document.body.removeChild(tmp);
        done();
      }
    });
  }

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- i18n (PT default / EN toggle) ---------- */
  var i18n = {
    nav_work: ["Projetos", "Work"],
    nav_about: ["Sobre", "About"],
    nav_services: ["Serviços", "Services"],
    nav_contact: ["Contato", "Contact"],
    nav_cta: ["Vamos conversar", "Let's talk"],

    hero_avail: ["Disponível para novos projetos", "Available for new projects"],
    hero_title_1: ["Design que transforma", "Design that turns"],
    hero_title_2: ["visitantes", "visitors"],
    hero_title_3: ["em", "into"],
    hero_title_4: ["clientes.", "customers."],
    hero_sub: [
      "Sou Rafael Cavalcante, UX/UI & Product Designer. Eu ajudo empresas e startups a lançar produtos digitais que as pessoas amam usar — e que geram resultado de verdade.",
      "I'm Rafael Cavalcante, UX/UI & Product Designer. I help companies and startups ship digital products people love to use — and that actually move business metrics."
    ],
    hero_cta_work: ["Ver projetos", "View work"],
    hero_cta_start: ["Iniciar um projeto", "Start a project"],
    hero_scroll: ["role para explorar", "scroll to explore"],

    work_eyebrow: ["Projetos selecionados", "Selected work"],
    work_title: ["Trabalhos que geraram resultado", "Work that delivered results"],
    work_view: ["Ver case", "View case"],
    work_more: ["Quer um resultado assim no seu produto?", "Want results like these for your product?"],
    work_more_cta: ["Vamos falar do seu projeto", "Let's talk about your project"],

    w1_desc: [
      "Redesenho completo do app de pagamentos: da pesquisa com usuários ao design system. Onboarding 3x mais rápido e uma experiência que virou referência interna.",
      "Full redesign of a payments app: from user research to design system. Onboarding got 3x faster and the experience became an internal benchmark."
    ],
    w1_t1: ["App Mobile", "Mobile App"],
    w1_metric: ["de conversão no onboarding", "onboarding conversion"],

    w2_chip: ["Carrinho sem fricção", "Frictionless cart"],
    w2_desc: [
      "Loja repensada de ponta a ponta com foco em checkout. Menos etapas, mais clareza e um funil que finalmente parou de vazar vendas.",
      "Store rethought end-to-end with a focus on checkout. Fewer steps, more clarity, and a funnel that finally stopped leaking sales."
    ],
    w2_t3: ["Conversão", "Conversion"],
    w2_metric: ["de abandono de carrinho", "cart abandonment"],

    w3_chip: ["Dados em tempo real", "Real-time data"],
    w3_desc: [
      "Plataforma B2B complexa traduzida em uma interface que qualquer pessoa entende no primeiro login. Menos tickets de suporte, mais retenção.",
      "A complex B2B platform translated into an interface anyone understands on first login. Fewer support tickets, more retention."
    ],
    w3_metric: ["de churn em 6 meses", "churn in 6 months"],

    w4_chip: ["Hábitos em dia", "Habits on track"],
    w4_desc: [
      "App de bem-estar desenhado para criar hábito: gamificação sutil, microinterações e uma jornada que faz o usuário voltar todos os dias.",
      "A wellness app designed to build habits: subtle gamification, microinteractions, and a journey that brings users back every day."
    ],
    w4_t3: ["Gamificação", "Gamification"],
    w4_metric: ["mais retenção em 30 dias", "more 30-day retention"],

    stat_1: ["anos de experiência", "years of experience"],
    stat_2: ["projetos entregues", "projects delivered"],
    stat_3: ["clientes satisfeitos", "happy clients"],
    stat_4: ["focado em resultado", "focused on results"],

    about_eyebrow: ["Sobre mim", "About me"],
    about_badge: ["📍 Brasil → 🇨🇦 Vancouver em breve", "📍 Brazil → 🇨🇦 Vancouver soon"],
    about_title_1: ["Design bonito atrai.", "Beautiful design attracts."],
    about_title_2: ["Design estratégico vende.", "Strategic design sells."],
    about_p1: [
      "Há mais de 8 anos eu desenho produtos digitais na Cavalcante Digital Services — de apps financeiros a plataformas SaaS. Meu trabalho começa antes do Figma: entendendo o seu negócio, o seu usuário e a métrica que precisa se mover.",
      "For over 8 years I've been designing digital products at Cavalcante Digital Services — from finance apps to SaaS platforms. My work starts before Figma: understanding your business, your users, and the metric that needs to move."
    ],
    about_p2: [
      "Cada decisão de interface tem um porquê. É assim que entrego telas que não só ganham elogios, mas convertem, retêm e reduzem custo de suporte.",
      "Every interface decision has a why. That's how I deliver screens that don't just earn compliments — they convert, retain, and cut support costs."
    ],
    about_pt1: ["Processo claro, prazos cumpridos e comunicação sem ruído", "Clear process, deadlines met, and noise-free communication"],
    about_pt2: ["Entrega pronta para o dev: specs, tokens e protótipos navegáveis", "Dev-ready delivery: specs, tokens, and clickable prototypes"],
    about_pt3: ["Parceria contínua — eu acompanho o produto depois do lançamento", "Ongoing partnership — I stay with the product after launch"],

    proc_1t: ["Descoberta", "Discovery"],
    proc_1d: [
      "Imersão no seu negócio, usuários e concorrência. Saímos com objetivos claros e mensuráveis.",
      "Deep dive into your business, users, and competitors. We leave with clear, measurable goals."
    ],
    proc_2t: ["Design", "Design"],
    proc_2d: [
      "Fluxos, wireframes e UI de alta fidelidade — com você acompanhando cada iteração.",
      "Flows, wireframes, and high-fidelity UI — with you following every iteration."
    ],
    proc_3t: ["Entrega & evolução", "Delivery & growth"],
    proc_3d: [
      "Handoff impecável para o time de dev e otimização contínua baseada em dados.",
      "Flawless handoff to the dev team and continuous, data-driven optimization."
    ],

    test_1: [
      "“O Rafael não entrega telas, entrega solução. Em três meses o nosso onboarding deixou de ser o maior motivo de cancelamento.”",
      "“Rafael doesn't deliver screens, he delivers solutions. In three months our onboarding stopped being our #1 churn reason.”"
    ],
    test_1a: ["Nome do Cliente", "Client Name"],
    test_1r: ["CEO · Startup Fintech", "CEO · Fintech Startup"],
    test_2: [
      "“Comunicação impecável e prazos sempre cumpridos. É o tipo de designer que o time de produto briga para manter por perto.”",
      "“Flawless communication and deadlines always met. He's the kind of designer product teams fight to keep around.”"
    ],
    test_2a: ["Nome do Cliente", "Client Name"],
    test_2r: ["Head de Produto · SaaS B2B", "Head of Product · B2B SaaS"],

    serv_eyebrow: ["Como posso ajudar", "How I can help"],
    serv_title: ["Serviços", "Services"],
    s1_t: ["UX/UI Design de produto", "Product UX/UI Design"],
    s1_d: [
      "Apps e plataformas web desenhados de ponta a ponta: research, fluxos, UI e protótipo navegável.",
      "Apps and web platforms designed end-to-end: research, flows, UI, and clickable prototypes."
    ],
    s2_t: ["Sites & landing pages", "Websites & landing pages"],
    s2_d: [
      "Páginas com cara de marca grande e foco total em conversão — do wireframe ao pixel final.",
      "Pages that look like a big brand and are laser-focused on conversion — from wireframe to final pixel."
    ],
    s3_t: ["Design Systems", "Design Systems"],
    s3_d: [
      "Bibliotecas de componentes e tokens que fazem seu time lançar mais rápido e com consistência.",
      "Component libraries and tokens that help your team ship faster and consistently."
    ],
    s4_t: ["Auditoria de UX", "UX Audit"],
    s4_d: [
      "Análise profunda do seu produto atual com um plano de ação priorizado por impacto.",
      "A deep analysis of your current product with an action plan prioritized by impact."
    ],

    cta_eyebrow: ["Tem um projeto em mente?", "Have a project in mind?"],
    cta_title_1: ["Vamos criar algo", "Let's create something"],
    cta_title_2: ["memorável", "memorable"],
    cta_title_3: ["juntos.", "together."],
    cta_sub: [
      "Me conte sua ideia em uma mensagem — simples assim. Eu respondo em até 24h com os próximos passos. Sem formulário longo, sem compromisso.",
      "Tell me your idea in one message — that simple. I'll reply within 24h with next steps. No long forms, no strings attached."
    ],
    cta_copy: ["Copiar e-mail", "Copy e-mail"],
    cs_1: ["Você me conta a ideia", "You tell me the idea"],
    cs_2: ["Proposta clara em até 48h", "Clear proposal within 48h"],
    cs_3: ["Começamos a desenhar", "We start designing"],

    foot_role: ["UX/UI & Product Designer", "UX/UI & Product Designer"],
    foot_top: ["Voltar ao topo ↑", "Back to top ↑"],
    toast_copied: ["E-mail copiado! 🎉", "E-mail copied! 🎉"]
  };

  var langToggle = document.getElementById("langToggle");
  var currentLang = 0; // 0 = pt, 1 = en

  function applyLang(index) {
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (i18n[key]) el.textContent = i18n[key][index];
    });
    document.documentElement.lang = index === 0 ? "pt-BR" : "en";
    langToggle.textContent = index === 0 ? "EN" : "PT";
    try { localStorage.setItem("lang", index === 0 ? "pt" : "en"); } catch (e) { /* private mode */ }
  }

  if (langToggle) {
    langToggle.addEventListener("click", function () {
      currentLang = currentLang === 0 ? 1 : 0;
      applyLang(currentLang);
    });

    try {
      if (localStorage.getItem("lang") === "en") {
        currentLang = 1;
        applyLang(1);
      }
    } catch (e) { /* private mode */ }
  }
})();
