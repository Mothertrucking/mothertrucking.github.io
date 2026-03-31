// Parallax for .product sections
// Panel is 45vh, image renders via cover but we shift backgroundPositionY
// Start at 20% so parallax has room to move upward without exposing top edge

const products = document.querySelectorAll('.product');

if (products.length && window.matchMedia('(min-width: 768px)').matches) {
  const update = () => {
    products.forEach(el => {
      const rect = el.getBoundingClientRect();
      const viewH = window.innerHeight;
      // progress: 0 when bottom of panel enters viewport, 1 when top leaves
      const progress = 1 - (rect.bottom / (viewH + rect.height));
      // Shift from 20% to 70% — 50% range gives plenty of travel
      const posY = 20 + (progress * 50);
      el.style.backgroundPositionY = `${posY}%`;
    });
  };

  window.addEventListener('scroll', update, { passive: true });
  update();
}
