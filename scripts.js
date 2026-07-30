// ── PERFORMANCE: Consolidar scroll events amb requestAnimationFrame ──────
let scrollTicking = false;

function updateScrollState() {
  const progress = document.getElementById('progress');
  const backTop = document.getElementById('backTop');
  
  // Actualitzar barra de progés
  const doc = document.documentElement;
  const scrollTop = doc.scrollTop || document.body.scrollTop;
  const scrollH = doc.scrollHeight - doc.clientHeight;
  const pct = scrollH > 0 ? (scrollTop / scrollH) * 100 : 0;
  if (progress) progress.style.width = pct + '%';
  
  // Actualitzar botó "back to top"
  if (backTop) backTop.classList.toggle('visible', window.scrollY > 600);
  
  scrollTicking = false;
}

window.addEventListener('scroll', () => {
  if (!scrollTicking) {
    window.requestAnimationFrame(updateScrollState);
    scrollTicking = true;
  }
}, { passive: true });

// ── NAV TOGGLE & OVERLAY ─────────────────────────────────────────────────
const navToggle = document.getElementById('navToggle');
const sidebar   = document.getElementById('sidebar');
const overlay   = document.getElementById('overlay');

navToggle.addEventListener('click', () => {
  const open = sidebar.classList.toggle('open');
  navToggle.classList.toggle('open', open);
  overlay.classList.toggle('active', open);
});

overlay.addEventListener('click', () => {
  sidebar.classList.remove('open');
  navToggle.classList.remove('open');
  overlay.classList.remove('active');
});

// ── ACTIVE NAV LINK & REVEAL ON SCROLL ───────────────────────────────────
const sections = document.querySelectorAll('section[id], div[id]');
const navLinks = document.querySelectorAll('.sidebar a');
const reveals  = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    // Gestió del menú actiu
    if (e.isIntersecting) {
      navLinks.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id);
      });
      // Gestió de l'animació de revelació
      if (e.target.classList.contains('reveal')) {
        e.target.classList.add('visible');
      }
    }
  });
}, { rootMargin: '-30% 0px -60% 0px', threshold: 0.05 });

sections.forEach(s => observer.observe(s));
