/**
 * FX Marquee & Slider Engine for Bao Chau Environment
 * Supports seamless infinite auto-scrolling, RTL/LTR, hover-pause, touch drag, and mouse drag.
 */

export const initAll = (root = document) => {
  root.querySelectorAll('[data-fx-slider]').forEach((sliderContainer, idx) => {
    const wrapper = sliderContainer.querySelector('.swiper-wrapper');
    if (!wrapper || wrapper.dataset.fxInitialized === 'true') return;
    wrapper.dataset.fxInitialized = 'true';

    // Parse options
    let options = {};
    try {
      if (wrapper.dataset.swiperOptions) {
        options = JSON.parse(wrapper.dataset.swiperOptions);
      }
    } catch (e) {}

    const isRTL = !!options.rtl;
    const speed = options.speed || 6000;
    // Pixels per second (speed represents full loop duration approx)
    const pixelsPerSecond = 45;

    // Ensure horizontal layout
    sliderContainer.style.overflow = 'hidden';
    sliderContainer.style.position = 'relative';
    sliderContainer.style.width = '100%';
    sliderContainer.style.userSelect = 'none';

    wrapper.style.display = 'flex';
    wrapper.style.flexWrap = 'nowrap';
    wrapper.style.width = 'max-content';
    wrapper.style.willChange = 'transform';
    wrapper.style.cursor = 'grab';

    // Clone slides once to create a seamless infinite loop
    const originalSlides = Array.from(wrapper.children);
    if (originalSlides.length === 0) return;

    originalSlides.forEach(slide => {
      slide.style.flexShrink = '0';
      const clone = slide.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      wrapper.appendChild(clone);
    });

    let halfWidth = wrapper.scrollWidth / 2;
    let currentX = isRTL ? -halfWidth : 0;
    let isPaused = false;
    let isDragging = false;
    let startX = 0;
    let dragStartX = 0;
    let lastTime = performance.now();

    function updateHalfWidth() {
      const newHalf = wrapper.scrollWidth / 2;
      if (newHalf > 0) halfWidth = newHalf;
    }

    // Recalculate on window resize & image load
    window.addEventListener('resize', updateHalfWidth);
    wrapper.querySelectorAll('img').forEach(img => {
      if (!img.complete) {
        img.addEventListener('load', updateHalfWidth, { once: true });
      }
    });
    setTimeout(updateHalfWidth, 500);
    setTimeout(updateHalfWidth, 1500);

    function animate(now) {
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      if (!isPaused && !isDragging && halfWidth > 0) {
        const step = pixelsPerSecond * dt;
        if (isRTL) {
          currentX += step;
          if (currentX >= 0) {
            currentX -= halfWidth;
          }
        } else {
          currentX -= step;
          if (Math.abs(currentX) >= halfWidth) {
            currentX += halfWidth;
          }
        }
        wrapper.style.transform = `translate3d(${currentX}px, 0, 0)`;
      }

      requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);

    // Pause on hover if option enabled
    if (options.pauseonmouseenter !== false) {
      sliderContainer.addEventListener('mouseenter', () => { isPaused = true; });
      sliderContainer.addEventListener('mouseleave', () => { if (!isDragging) isPaused = false; });
    }

    // Touch & Mouse Drag interactions
    function onPointerDown(e) {
      isDragging = true;
      isPaused = true;
      startX = e.pageX || (e.touches && e.touches[0].pageX) || 0;
      dragStartX = currentX;
      wrapper.style.cursor = 'grabbing';
    }

    function onPointerMove(e) {
      if (!isDragging) return;
      const x = e.pageX || (e.touches && e.touches[0].pageX) || 0;
      const walk = x - startX;
      currentX = dragStartX + walk;

      // Wrap boundaries
      if (currentX > 0) currentX -= halfWidth;
      if (Math.abs(currentX) >= halfWidth * 2) currentX += halfWidth;

      wrapper.style.transform = `translate3d(${currentX}px, 0, 0)`;
    }

    function onPointerUp() {
      if (!isDragging) return;
      isDragging = false;
      wrapper.style.cursor = 'grab';
      setTimeout(() => { isPaused = false; }, 400);
    }

    sliderContainer.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    sliderContainer.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);
  });
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => initAll());
} else {
  initAll();
}

export default { initAll };
