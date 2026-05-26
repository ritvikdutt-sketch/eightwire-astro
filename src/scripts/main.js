// Scroll reveal
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// SVG stroke draw-in observer
const strokeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      strokeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.stroke-draw').forEach(el => strokeObserver.observe(el));

// Sticky nav
const nav = document.getElementById('mainNav');
const sentinel = document.getElementById('heroSentinel');
if (nav && sentinel) {
  const navObserver = new IntersectionObserver(([entry]) => {
    nav.classList.toggle('nav-scrolled', !entry.isIntersecting);
  }, { threshold: 0 });
  navObserver.observe(sentinel);
}

// Mobile menu
const menuBtn = document.getElementById('menuBtn');
const menuClose = document.getElementById('menuClose');
const mobileMenu = document.getElementById('mobileMenu');
if (menuBtn && menuClose && mobileMenu) {
  menuBtn.addEventListener('click', () => mobileMenu.classList.add('open'));
  menuClose.addEventListener('click', () => mobileMenu.classList.remove('open'));
}
window.closeMobile = function() {
  if (mobileMenu) mobileMenu.classList.remove('open');
};

// Accordion
window.toggleAccordion = function(btn) {
  const content = btn.nextElementSibling;
  const chevron = btn.querySelector('.accordion-chevron');
  const isOpen = content.classList.contains('open');
  document.querySelectorAll('.accordion-content').forEach(c => c.classList.remove('open'));
  document.querySelectorAll('.accordion-chevron').forEach(c => c.classList.remove('open'));
  if (!isOpen) {
    content.classList.add('open');
    chevron.classList.add('open');
  }
};

// CountUp animation
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseFloat(el.dataset.target);
      const suffix = el.dataset.suffix || '';
      const decimals = parseInt(el.dataset.decimals) || 0;
      const duration = 2000;
      const start = performance.now();

      function easeOutExpo(t) {
        return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      }

      function animate(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutExpo(progress);
        const current = target * easedProgress;

        if (decimals > 0) {
          el.textContent = current.toFixed(decimals) + suffix;
        } else {
          el.textContent = Math.round(current).toLocaleString() + suffix;
        }

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      }

      requestAnimationFrame(animate);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.counter-number').forEach(el => counterObserver.observe(el));

// Gradient card: inject glow elements + 3D tilt
document.querySelectorAll('.gradient-card').forEach(card => {
  if (!card.querySelector('.card-glow')) {
    const glow = document.createElement('div');
    glow.className = 'card-glow';
    const glowCenter = document.createElement('div');
    glowCenter.className = 'card-glow-center';
    const edge = document.createElement('div');
    edge.className = 'card-edge';
    const edgeL = document.createElement('div');
    edgeL.className = 'card-edge-left';
    const edgeR = document.createElement('div');
    edgeR.className = 'card-edge-right';
    card.prepend(edgeR, edgeL, edge, glowCenter, glow);
  }

  if (!card.querySelector('.card-inner')) {
    const children = Array.from(card.childNodes).filter(n =>
      !n.classList || (!n.classList.contains('card-glow') && !n.classList.contains('card-glow-center') && !n.classList.contains('card-edge') && !n.classList.contains('card-edge-left') && !n.classList.contains('card-edge-right'))
    );
    const inner = document.createElement('div');
    inner.className = 'card-inner';
    children.forEach(c => inner.appendChild(c));
    card.appendChild(inner);
  }

  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = -(y / rect.height) * 5;
    const rotateY = (x / rect.width) * 5;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
  });
});
