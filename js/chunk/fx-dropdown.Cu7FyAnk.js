
export const initAll = (root = document) => {
  root.querySelectorAll('[data-fx-dropdown], [data-fx-dropdown-toggle]').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      el.classList.toggle('is-open');
      const target = el.nextElementSibling || el.querySelector('.dropdown-pane');
      if (target) target.classList.toggle('is-open');
    });
  });
};
export default { initAll };
