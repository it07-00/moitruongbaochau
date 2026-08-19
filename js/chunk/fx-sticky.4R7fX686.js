
export const initAll = (root = document) => {
  const stickies = root.querySelectorAll('[data-fx-sticky], header.site-header, #site-header');
  if (!stickies.length) return;
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const current = window.pageYOffset;
    stickies.forEach(st => {
      if (current > 50) {
        st.classList.add('is-stuck', 'is-at-top', 'sticky');
      } else {
        st.classList.remove('is-stuck', 'is-at-top', 'sticky');
      }
    });
    lastScroll = current;
  }, { passive: true });
};
export default { initAll };
