
const nav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

const particleContainer = document.getElementById('particles');
if (particleContainer) {
    for (let i = 0; i < 22; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      const size = (Math.random() * 3 + 1.5).toFixed(1) + 'px';
      p.style.cssText = `
        left: ${(Math.random() * 100).toFixed(1)}%;
        top:  ${(Math.random() * 100).toFixed(1)}%;
        width: ${size}; height: ${size};
        animation-duration: ${(Math.random() * 14 + 10).toFixed(1)}s;
        animation-delay:    ${(Math.random() * -16).toFixed(1)}s;
        opacity: ${(Math.random() * 0.5 + 0.15).toFixed(2)};
      `;
      particleContainer.appendChild(p);
    }
}

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const el     = entry.target;
    const target = parseFloat(el.dataset.target);
    const isDecimal = !Number.isInteger(target);
    const duration  = 1800;
    const startTime = performance.now();

    const animate = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3);   /* ease-out cubic */
      const current  = target * eased;

      el.textContent = isDecimal
        ? current.toFixed(1)
        : Math.round(current).toString();

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
    counterObserver.unobserve(el);
  });
}, { threshold: 0.6 });

document.querySelectorAll('.counter').forEach(el => counterObserver.observe(el));
