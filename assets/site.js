"use strict";
(() => {
    'use strict';
    const stage = document.querySelector('.scene');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!stage || reducedMotion.matches || !window.matchMedia('(hover: hover) and (pointer: fine)').matches)
        return;
    let frame = 0;
    let x = 50;
    let y = 50;
    stage.addEventListener('pointermove', (event) => {
        const bounds = stage.getBoundingClientRect();
        x = (event.clientX - bounds.left) / bounds.width * 100;
        y = (event.clientY - bounds.top) / bounds.height * 100;
        if (!frame)
            frame = requestAnimationFrame(() => {
                stage.style.setProperty('--light-x', `${x.toFixed(1)}%`);
                stage.style.setProperty('--light-y', `${y.toFixed(1)}%`);
                frame = 0;
            });
    }, { passive: true });
    stage.addEventListener('pointerleave', () => {
        stage.style.setProperty('--light-x', '50%');
        stage.style.setProperty('--light-y', '50%');
    });
})();
