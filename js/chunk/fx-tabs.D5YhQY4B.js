export const initAll = (root = document) => {
  root.querySelectorAll('[data-fx-tabs]').forEach(tabsNav => {
    const contentId = tabsNav.getAttribute('id');
    const tabsContent = contentId
      ? document.querySelector(`[data-fx-tabs-content="${contentId}"]`)
      : tabsNav.closest('.section')?.querySelector('.tabs-content') || document.querySelector('.tabs-content');

    const links = tabsNav.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        const targetId = link.getAttribute('href');
        if (!targetId || targetId === '#' || targetId.length <= 1) return;
        const targetPanel = (tabsContent ? tabsContent.querySelector(targetId) : null) || document.querySelector(targetId);
        if (targetPanel) {
          links.forEach(l => {
            l.classList.remove('active', 'is-active');
            l.setAttribute('aria-selected', 'false');
            l.closest('.tabs-title')?.classList.remove('is-active', 'active');
          });
          link.classList.add('active', 'is-active');
          link.setAttribute('aria-selected', 'true');
          link.closest('.tabs-title')?.classList.add('is-active', 'active');

          if (tabsContent) {
            tabsContent.querySelectorAll('.tabs-panel').forEach(panel => {
              panel.classList.remove('is-active', 'active');
            });
          }
          targetPanel.classList.add('is-active', 'active');
        }
      });
    });
  });
};
export default { initAll };
