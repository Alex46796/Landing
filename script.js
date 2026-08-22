// Появление фото в hero сразу при загрузке страницы
window.addEventListener('DOMContentLoaded', () => {
  const heroPhoto = document.getElementById('heroPhoto');
  if (heroPhoto) {
    requestAnimationFrame(() => {
      setTimeout(() => heroPhoto.classList.add('visible'), 150);
    });
  }
});

// Модальные окна кейсов брендов
const CASES = {
  boostmarine: {
    title: 'Boost Marine',
    desc: 'Корпоративный сайт компании по ремонту водной техники — услуги, портфолио работ, команда, магазин запчастей.',
    details: [
      { label: 'Срок', value: 'около месяца, с большим количеством правок от заказчика в процессе' },
      { label: 'Результат', value: 'сайт сдан и работает' },
    ],
    link: 'https://www.boostmarine.ru/',
    linkLabel: 'Открыть сайт →',
    images: ['bm-1.png', 'bm-2.png', 'bm-3.png', 'bm-4.png'],
  },
  a13: {
    title: 'Бюро А13',
    desc: 'Сайт архитектурного бюро, специализирующегося на светопрозрачных конструкциях и фасадных системах.',
    details: [
      { label: 'Роль', value: 'контроль сроков, контроль работы разработчиков, правки и дополнения ТЗ, общение с заказчиком — связующее звено между командой и клиентом' },
      { label: 'Результат', value: 'сайт сдан и работает' },
    ],
    link: 'https://5eeee.github.io/a13/',
    linkLabel: 'Открыть сайт →',
    images: ['a13-1.png', 'a13-2.png', 'a13-3.png', 'a13-4.png', 'a13-5.png'],
  },
  revolutionprint: {
    title: 'Revolution Print',
    desc: 'MVP-платформа для отдела продаж и производства: калькулятор стоимости DTF-печати с наценкой, CRM для клиентов, заказы, чат команды, генератор документов (КП/смета/акт), админка сотрудников.',
    details: null,
    link: 'revolution-print-mvp.html',
    linkLabel: 'Открыть MVP →',
    images: ['rp-1.png', 'rp-2.png', 'rp-3.png'],
  },
  aartatelier: {
    title: 'Aart Atelier',
    desc: 'Мультидисциплинарное креативное бюро, выросшее из арт-консалтинга: подбор искусства для бизнеса и частных пространств, дизайн интерьера и декорирование, брендинг и коммуникации, видеопродакшн, кураторские и выставочные проекты, образовательные программы. Под задачи клиента собирается команда нужных специалистов — от идеи до реализации.',
    details: [{ label: 'Срок', value: '5 дней на разработку, затем небольшие доработки' }],
    link: null,
    linkLabel: 'Открыть сайт →',
    images: ['aart-1.png', 'aart-2.png', 'aart-3.png', 'aart-4.png', 'aart-5.png', 'aart-6.png'],
  },
};

const caseModalOverlay = document.getElementById('caseModalOverlay');
const caseModalTitle = document.getElementById('caseModalTitle');
const caseModalDesc = document.getElementById('caseModalDesc');
const caseModalDetails = document.getElementById('caseModalDetails');
const caseModalLink = document.getElementById('caseModalLink');
const caseModalClose = document.getElementById('caseModalClose');
const caseModalSlider = document.getElementById('caseModalSlider');
const caseModalSliderImg = document.getElementById('caseModalSliderImg');
const caseModalDots = document.getElementById('caseModalDots');
const caseModalPrev = document.getElementById('caseModalPrev');
const caseModalNext = document.getElementById('caseModalNext');

let sliderImages = [];
let sliderIndex = 0;

function renderSlide() {
  if (!sliderImages.length) return;
  caseModalSliderImg.style.opacity = '0';
  setTimeout(() => {
    caseModalSliderImg.src = sliderImages[sliderIndex];
    caseModalSliderImg.style.opacity = '1';
  }, 180);
  caseModalDots.querySelectorAll('.dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === sliderIndex);
  });
}

function openCaseModal(id) {
  const data = CASES[id];
  if (!data || !caseModalOverlay) return;

  caseModalTitle.textContent = data.title;
  caseModalDesc.textContent = data.desc;

  if (data.images && data.images.length) {
    sliderImages = data.images;
    sliderIndex = 0;
    caseModalDots.innerHTML = sliderImages
      .map((_, i) => `<span class="dot" data-i="${i}"></span>`)
      .join('');
    caseModalDots.querySelectorAll('.dot').forEach((dot) => {
      dot.addEventListener('click', () => {
        sliderIndex = Number(dot.dataset.i);
        renderSlide();
      });
    });
    renderSlide();
    caseModalSlider.hidden = false;
  } else {
    sliderImages = [];
    caseModalSlider.hidden = true;
  }

  if (data.details && data.details.length) {
    caseModalDetails.innerHTML = data.details
      .map(
        (row) =>
          `<div class="modal-detail-row"><div class="modal-detail-label">${row.label}</div><div class="modal-detail-value">${row.value}</div></div>`
      )
      .join('');
    caseModalDetails.hidden = false;
  } else {
    caseModalDetails.innerHTML = '';
    caseModalDetails.hidden = true;
  }

  if (data.link) {
    caseModalLink.href = data.link;
    caseModalLink.textContent = data.linkLabel || 'Открыть сайт →';
    caseModalLink.hidden = false;
  } else {
    caseModalLink.removeAttribute('href');
    caseModalLink.hidden = true;
  }

  caseModalOverlay.classList.add('open');

  if (window.gsap) {
    gsap.fromTo(
      '.modal-panel',
      { y: 24, scale: 0.96, opacity: 0.6 },
      { y: 0, scale: 1, opacity: 1, duration: 0.45, ease: 'back.out(1.6)' }
    );
  }
}

function closeCaseModal() {
  if (caseModalOverlay) caseModalOverlay.classList.remove('open');
}

document.querySelectorAll('.site-card[data-case]').forEach((card) => {
  card.addEventListener('click', () => openCaseModal(card.dataset.case));
});

if (caseModalClose) caseModalClose.addEventListener('click', closeCaseModal);
if (caseModalPrev) {
  caseModalPrev.addEventListener('click', () => {
    if (!sliderImages.length) return;
    sliderIndex = (sliderIndex - 1 + sliderImages.length) % sliderImages.length;
    renderSlide();
  });
}
if (caseModalNext) {
  caseModalNext.addEventListener('click', () => {
    if (!sliderImages.length) return;
    sliderIndex = (sliderIndex + 1) % sliderImages.length;
    renderSlide();
  });
}
if (caseModalOverlay) {
  caseModalOverlay.addEventListener('click', (e) => {
    if (e.target === caseModalOverlay) closeCaseModal();
  });
}
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeCaseModal();
});

// Появление hero и секций при скролле — GSAP, если загрузился, иначе запасной вариант
if (window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);

  const heroTargets = document.querySelectorAll(
    '.hero .badge, .hero h1, .hero .lead, .hero .button-row, .hero .steps-row, .hero .stat-row'
  );
  gsap.set(heroTargets, { opacity: 0, y: 24 });
  gsap.to(heroTargets, {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power2.out',
    stagger: 0.12,
    delay: 0.15,
  });

  document.querySelectorAll('section .reveal').forEach((container) => {
    gsap.set(container, { opacity: 1, y: 0 });

    const cards = container.querySelectorAll(
      '.card, .site-card, .achievement-card, .trait-card, .ps-panel, .contact-panel, .tags .tag'
    );
    const targets = cards.length ? cards : container;

    gsap.set(targets, { opacity: 0, y: 28 });
    gsap.to(targets, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'power2.out',
      stagger: 0.08,
      scrollTrigger: {
        trigger: container,
        start: 'top 85%',
        onEnter: () => {
          const title = container.querySelector('.section-title');
          if (title) title.classList.add('underlined');
        },
      },
      onComplete: () => gsap.set(targets, { clearProps: 'transform' }),
    });
  });
} else {
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealElements.forEach((el) => revealObserver.observe(el));
}

// Анимация чисел (счётчик от 0 до целевого значения)
function animateNumber(el) {
  const target = parseInt(el.dataset.target, 10) || 0;
  const prefix = el.dataset.prefix || '';
  const suffix = el.dataset.suffix || '';
  const duration = 1200;
  const start = performance.now();

  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.round(eased * target).toLocaleString('ru-RU');
    el.textContent = prefix + value + suffix;
    if (progress < 1) {
      requestAnimationFrame(step);
    } else if (window.gsap) {
      gsap.fromTo(el, { scale: 1 }, { scale: 1.12, duration: 0.15, yoyo: true, repeat: 1, ease: 'power1.inOut' });
    }
  }
  requestAnimationFrame(step);
}

const numberElements = document.querySelectorAll('.num[data-target], .big-num[data-target]');
const numberObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateNumber(entry.target);
        numberObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);
numberElements.forEach((el) => numberObserver.observe(el));

// Полоска прогресса чтения + кнопка "наверх"
const scrollProgress = document.getElementById('scrollProgress');
const backToTop = document.getElementById('backToTop');

function onScroll() {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  if (scrollProgress) {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgress.style.width = pct + '%';
  }
  if (backToTop) {
    backToTop.classList.toggle('visible', scrollTop > window.innerHeight);
  }
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

if (backToTop) {
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}
