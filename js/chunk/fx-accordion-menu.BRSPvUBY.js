
export const initAll = (root = document) => {
  root.querySelectorAll('[data-fx-accordion-menu] li').forEach(li => {
    const sub = li.querySelector('.submenu');
    if (sub) {
      const link = li.querySelector(':scope > a');
      if (link) {
        link.addEventListener('click', e => {
          if (sub.children.length > 0) {
            e.preventDefault();
            li.classList.toggle('is-active');
            sub.style.display = li.classList.contains('is-active') ? 'block' : 'none';
          }
        });
      }
    }
  });
};
export default { initAll };
