
export const initAll = (root = document) => {
  document.querySelectorAll('[data-open]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const targetId = btn.getAttribute('data-open');
      const target = document.getElementById(targetId);
      if (target) {
        target.classList.add('is-open');
        target.classList.remove('invisible');
        document.body.classList.add('is-off-canvas-open');
      }
    });
  });
  document.querySelectorAll('[data-close]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const offcanvas = btn.closest('.off-canvas') || document.querySelector('.off-canvas.is-open');
      if (offcanvas) {
        offcanvas.classList.remove('is-open');
        offcanvas.classList.add('invisible');
        document.body.classList.remove('is-off-canvas-open');
      }
    });
  });
  document.addEventListener('click', e => {
    if (document.body.classList.contains('is-off-canvas-open') && !e.target.closest('.off-canvas') && !e.target.closest('[data-open]')) {
      document.querySelectorAll('.off-canvas.is-open').forEach(oc => {
        oc.classList.remove('is-open');
        oc.classList.add('invisible');
      });
      document.body.classList.remove('is-off-canvas-open');
    }
  });
};
export default { initAll };
