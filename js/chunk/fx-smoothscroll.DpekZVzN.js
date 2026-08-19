
export const initAll = (root = document) => {
  root.querySelectorAll('[data-fx-scroll], a[href^="#"]').forEach(el => {
    el.addEventListener('click', e => {
      const href = el.getAttribute('href');
      if (!href || href === '#' || href.length <= 1) return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = parseInt(el.getAttribute('data-fx-offset') || '80', 10);
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
};
export default { initAll };
