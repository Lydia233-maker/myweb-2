import { initReveal } from '../reveal.js';
initReveal();
document.querySelectorAll('.tile').forEach((t) => {
  t.addEventListener('click', () => t.classList.toggle('is-on'));
});
