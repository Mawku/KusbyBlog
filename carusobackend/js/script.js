
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

function initTypewriter() {
  const codeElement = document.getElementById('typewriter-code');
  if (!codeElement) return;

 const codeText = `// Inizializzazione Nodo Tachyon (libp2p stack)
const node = await createLibp2p({
  addresses: { listen: ['/ip4/0.0.0.0/tcp/0'] },
  transports: [tcp(), webSockets()],
  connectionEncryption: [noise()],
  streamMuxers: [yamux()],
  peerDiscovery: [bootstrap({
    list: ["/dnsaddr/bootstrap.tachyon.network"]
  })],
  services: {
    kadDHT: kadDHT(),
    pubsub: gossipsub()
  }
});

console.log('Nodo Mesh attivo:', node.peerId.toString());`;

  let i = 0;
  codeElement.innerHTML = ""; // Pulisce il contenuto iniziale

  function type() {
    if (i < codeText.length) {
      codeElement.innerHTML += codeText.charAt(i);
      i++;
      setTimeout(type, 30); // Velocità di digitazione
    }
  }

  // Facciamo partire l'animazione solo quando la finestra è visibile
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      type();
      observer.disconnect();
    }
  });
  observer.observe(codeElement);
}

document.addEventListener('DOMContentLoaded', () => {
  // Avvia l'effetto macchina da scrivere
  initTypewriter();
  
  // Riutilizza l'Observer per i counter numerici (se hai messo i numeri animati)
  const counterEls = document.querySelectorAll('.counter');
  if(counterEls.length > 0) {
      // (Il codice counterObserver che abbiamo scritto nel file script.js precedente)
  }
  
  // Riutilizza l'Observer per le classi .reveal
  const revealEls = document.querySelectorAll('.reveal');
  revealEls.forEach(el => revealObserver.observe(el));

  // Shortcut segreta (Alt + S)
  document.addEventListener('keydown', (e) => {
    if (e.altKey && e.key.toLowerCase() === 's') {
      // Effetto visivo "glitch" prima di entrare
      const glitch = document.createElement('div');
      glitch.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
        background: #000; z-index: 9999; display: flex; align-items: center; justify-content: center;
        color: #4ade80; font-family: 'DM Mono', monospace; font-size: 20px;
      `;
      glitch.innerHTML = 'INITIALIZING SECURE LINK...';
      document.body.appendChild(glitch);
      
      setTimeout(() => {
        glitch.innerHTML = 'ACCESS GRANTED';
        glitch.style.color = '#fff';
      }, 300);

      setTimeout(() => {
        window.location.href = 'secret.html';
      }, 800);
    }
  });
});

