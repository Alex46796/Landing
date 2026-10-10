// Hero photo fade-in on load
window.addEventListener('DOMContentLoaded', () => {
  const heroPhoto = document.getElementById('heroPhoto');
  if (heroPhoto) {
    requestAnimationFrame(() => {
      setTimeout(() => heroPhoto.classList.add('visible'), 150);
    });
  }
});

// Case modals
const CASES = {
  boostmarine: {
    title: 'Boost Marine',
    desc: 'Corporate website for a watercraft repair company — services, work portfolio, team, spare-parts shop.',
    details: [
      { label: 'Timeline', value: 'about a month, with many client revisions along the way' },
      { label: 'Result', value: 'site delivered and live' },
    ],
    link: 'https://www.boostmarine.ru/',
    linkLabel: 'Open site →',
    images: ['bm-1.png', 'bm-2.png', 'bm-3.png', 'bm-4.png'],
  },
  a13: {
    title: 'A13 Bureau',
    desc: 'Website for an architecture bureau specializing in glazed structures and facade systems.',
    details: [
      { label: 'Role', value: 'deadline control, oversight of the developers, spec revisions and additions, client communication — the link between the team and the client' },
      { label: 'Result', value: 'site delivered and live' },
    ],
    link: 'https://5eeee.github.io/a13/',
    linkLabel: 'Open site →',
    images: ['a13-1.png', 'a13-2.png', 'a13-3.png', 'a13-4.png', 'a13-5.png'],
  },
  revolutionprint: {
    title: 'Revolution Print',
    desc: 'MVP platform for sales and production: DTF print cost calculator with markup, client CRM, orders, team chat, document generator (proposal / estimate / act), staff admin panel.',
    details: null,
    link: 'revolution-print-mvp.html',
    linkLabel: 'Open MVP →',
    images: ['rp-1.png', 'rp-2.png', 'rp-3.png'],
  },
  aartatelier: {
    title: 'Aart Atelier',
    desc: 'A multidisciplinary creative bureau that grew out of art consulting: art selection for businesses and private spaces, interior design and decoration, branding and communications, video production, curated and exhibition projects, educational programs. A team of the right specialists is assembled for each client task — from idea to delivery.',
    details: [{ label: 'Timeline', value: '5 days of development, followed by minor refinements' }],
    link: null,
    linkLabel: 'Open site →',
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
    caseModalLink.textContent = data.linkLabel || 'Open site →';
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

// Reveal hero and sections on scroll — GSAP if loaded, otherwise fallback
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

// Number counter animation (0 to target)
function animateNumber(el) {
  const target = parseInt(el.dataset.target, 10) || 0;
  const prefix = el.dataset.prefix || '';
  const suffix = el.dataset.suffix || '';
  const duration = 1200;
  const start = performance.now();

  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.round(eased * target).toLocaleString('en-US');
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

// Reading progress bar + back-to-top button
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
