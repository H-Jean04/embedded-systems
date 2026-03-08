/* =============================================
   article.js — Fonctionnalités articles & carousel
   Jean Houédougbé Portfolio
   ============================================= */

// ---- COPY CODE ----
function copyCode(btn) {
  const pre = btn.closest('.article-code').querySelector('pre');
  navigator.clipboard.writeText(pre.innerText).then(() => {
    btn.textContent = 'Copié ✓';
    btn.style.color = 'var(--green)';
    setTimeout(() => {
      btn.textContent = 'Copier';
      btn.style.color = '';
    }, 2000);
  });
}

// ---- TOC ACTIVE ON SCROLL ----
const tocLinks = document.querySelectorAll('.toc-link');
const articleHeadings = document.querySelectorAll('.article-content h2');

if (articleHeadings.length && tocLinks.length) {
  const headingObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        tocLinks.forEach(link => link.classList.remove('active'));
        const idx = Array.from(articleHeadings).indexOf(entry.target);
        if (tocLinks[idx]) tocLinks[idx].classList.add('active');
      }
    });
  }, { threshold: 0.6 });
  articleHeadings.forEach(h => headingObserver.observe(h));
}

// ---- READING PROGRESS BAR ----
const progressBar = document.createElement('div');
progressBar.style.cssText = `
  position: fixed;
  top: 0; left: 0;
  height: 3px;
  background: linear-gradient(90deg, #00e5ff, #0077ff);
  z-index: 200;
  width: 0%;
  transition: width 0.1s linear;
  box-shadow: 0 0 8px rgba(0,229,255,0.5);
`;
document.body.prepend(progressBar);

window.addEventListener('scroll', () => {
  const docH = document.documentElement.scrollHeight - window.innerHeight;
  const pct = (window.scrollY / docH) * 100;
  progressBar.style.width = pct + '%';
});
