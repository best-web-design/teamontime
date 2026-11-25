'use client';
import { useEffect, useRef } from 'react';
// Looping strip that auto-scrolls, can be dragged / swiped / wheel-scrolled in either direction,
// and resumes auto-scrolling shortly after the visitor stops interacting.
export default function AutoStrip({ children, label, speed = 40, className = '' }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0, last = 0, hold = 0, drag = null, pos = el.scrollLeft;
    const half = () => el.scrollWidth / 2;
    const wrap = () => { const h = half(); if (h > 0) { if (el.scrollLeft >= h) el.scrollLeft -= h; else if (el.scrollLeft <= 0) el.scrollLeft += h; } pos = el.scrollLeft; };
    const pause = (ms = 2000) => { hold = performance.now() + ms; };
    const tick = (t) => {
      raf = requestAnimationFrame(tick);
      const dt = Math.min(64, t - (last || t)); last = t;
      if (reduce || drag || t < hold) { pos = el.scrollLeft; return; }
      pos += (speed * dt) / 1000;
      el.scrollLeft = pos;
      wrap();
    };
    const onDown = (e) => { if (e.pointerType === 'mouse') { drag = { x: e.clientX, s: el.scrollLeft }; el.classList.add('dragging'); } pause(4000); };
    const onMove = (e) => { if (drag) { el.scrollLeft = drag.s - (e.clientX - drag.x); wrap(); } };
    const onUp = () => { if (drag) { drag = null; el.classList.remove('dragging'); } pause(); };
    const onUser = () => { pause(); wrap(); };
    el.scrollLeft = 1;
    el.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    el.addEventListener('wheel', onUser, { passive: true });
    el.addEventListener('touchstart', onUser, { passive: true });
    el.addEventListener('scroll', wrap, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); el.removeEventListener('pointerdown', onDown); window.removeEventListener('pointermove', onMove); window.removeEventListener('pointerup', onUp); el.removeEventListener('wheel', onUser); el.removeEventListener('touchstart', onUser); el.removeEventListener('scroll', wrap); };
  }, [speed]);
  return <div ref={ref} className={`auto-strip ${className}`} role="region" aria-label={label} tabIndex={0}><div className="auto-strip-track">{children}{children}</div></div>;
}
