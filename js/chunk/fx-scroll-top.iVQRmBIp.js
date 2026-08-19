
export const initAll = (root = document) => {
  const btn = root.querySelector('[data-fx-scroll-top], .c-back-to-top');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      btn.classList.add('is-active', 'is-visible', 'opacity-100');
      btn.classList.remove('opacity-0', 'invisible');
    } else {
      btn.classList.remove('is-active', 'is-visible', 'opacity-100');
      btn.classList.add('opacity-0', 'invisible');
    }
  }, { passive: true });
  btn.addEventListener('click', e => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
};
export default { initAll };
