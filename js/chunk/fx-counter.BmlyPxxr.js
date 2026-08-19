
export const initAll = (root = document) => {
  const counters = root.querySelectorAll('[data-counter]');
  if (!counters.length) return;
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.getAttribute('data-counter') || el.innerText.replace(/[^0-9.]/g, '') || '0');
        const duration = parseInt(el.getAttribute('data-duration') || el.closest('[data-duration]')?.getAttribute('data-duration') || '1500', 10);
        const start = performance.now();
        const update = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const current = Math.floor(progress * target);
          el.innerText = current.toLocaleString();
          if (progress < 1) {
            requestAnimationFrame(update);
          } else {
            el.innerText = target.toLocaleString();
          }
        };
        requestAnimationFrame(update);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.2 });
  counters.forEach(c => observer.observe(c));
};
export default { initAll };
