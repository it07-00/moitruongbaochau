
export const initAll = (root = document) => {
  root.querySelectorAll('[data-fx-accordion] .accordion-title').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const item = btn.closest('.accordion-item') || btn.parentElement;
      item.classList.toggle('is-active');
      const content = item.querySelector('.accordion-content');
      if (content) {
        content.style.display = item.classList.contains('is-active') ? 'block' : 'none';
      }
    });
  });
};
export default { initAll };
