
export const initAll = (root = document) => {
  root.querySelectorAll('[data-fx-dropdown-menu] > li').forEach(li => {
    const submenu = li.querySelector('.submenu');
    if (!submenu) return;
    li.addEventListener('mouseenter', () => {
      li.classList.add('is-active', 'opens-right');
      submenu.classList.add('js-dropdown-active');
    });
    li.addEventListener('mouseleave', () => {
      li.classList.remove('is-active', 'opens-right');
      submenu.classList.remove('js-dropdown-active');
    });
  });
};
export default { initAll };
