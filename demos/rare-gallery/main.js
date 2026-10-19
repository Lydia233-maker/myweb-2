import { initReveal } from '../reveal.js';
initReveal();
const box = document.getElementById('lightbox');
const cap = document.getElementById('caption');
document.querySelectorAll('[data-cap]').forEach((el) => {
  el.addEventListener('click', () => {
    cap.textContent = el.getAttribute('data-cap') || '';
    box.classList.add('is-open');
  });
});
box.addEventListener('click', (e) => {
  if (e.target === box) box.classList.remove('is-open');
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') box.classList.remove('is-open');
});
