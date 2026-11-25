'use client';
import { useEffect } from 'react';
// Subtle vertical float on the magnifier artwork while its section scrolls through the viewport.
export default function Parallax() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const els = [...document.querySelectorAll('.journey-art')];
    if (!els.length) return;
    let raf = 0;
    const tick = () => {
      raf = 0;
      els.forEach((el) => {
        const r = el.parentElement.getBoundingClientRect();
        const c = (r.top + r.height / 2 - innerHeight / 2) / innerHeight;
        el.style.setProperty('--py', `${Math.max(-1, Math.min(1, c)) * -36}px`);
      });
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(tick); };
    tick(); addEventListener('scroll', on, { passive: true }); addEventListener('resize', on);
    return () => { removeEventListener('scroll', on); removeEventListener('resize', on); };
  }, []);
  return null;
}
