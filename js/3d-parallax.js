/* =====================================
   3D PARALLAX EFFECT — ENHANCED
   ===================================== */

(function() {
  'use strict';

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const heroContent = document.querySelector('.hero-content');
  if (!heroContent) return;

  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;
  let isHero = false;

  // Throttle function
  function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Calculate parallax for hero
  function updateHeroParallax(e) {
    const rect = heroContent.getBoundingClientRect();
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    targetX = ((e.clientX - centerX) / centerX) * 25;
    targetY = ((e.clientY - centerY) / centerY) * 18;

    isHero = rect.top < window.innerHeight && rect.bottom > 0;
  }

  // Main animation loop for hero
  function animateHero() {
    if (!isHero) {
      mouseX += (0 - mouseX) * 0.08;
      mouseY += (0 - mouseY) * 0.08;
    } else {
      mouseX += (targetX - mouseX) * 0.12;
      mouseY += (targetY - mouseY) * 0.12;
    }

    heroContent.style.transform = `
      perspective(1000px)
      rotateX(${mouseY * 0.8}deg)
      rotateY(${mouseX * 1.2}deg)
      translateZ(40px)
      scale(${1 + Math.abs(mouseX) * 0.003})
    `;

    requestAnimationFrame(animateHero);
  }

  // Event listeners
  document.addEventListener('mousemove', throttle(updateHeroParallax, 25));
  animateHero();

  // Reset on mouse leave
  document.addEventListener('mouseleave', () => {
    targetX = 0;
    targetY = 0;
  });
})();
