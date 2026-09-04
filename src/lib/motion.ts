import { useEffect, useState } from 'react';

// Site-wide motion switch (WCAG 2.2.2 Pause, Stop, Hide). Two inputs, one answer:
//   - the OS/browser preference `prefers-reduced-motion`
//   - the visitor's own choice, stored in localStorage and mirrored on <html data-motion>
// The footer button and the drawer button flip the stored choice and broadcast `ew-motion`;
// CSS pauses the declarative animations via [data-motion="paused"], and React islands read
// useMotion() before starting anything that moves.

export const MOTION_KEY = 'ew-motion';
export const MOTION_EVENT = 'ew-motion';

export function readMotionPaused(): boolean {
  try {
    return localStorage.getItem(MOTION_KEY) === 'paused';
  } catch {
    return false;
  }
}

export function applyMotionAttr(paused: boolean) {
  document.documentElement.dataset.motion = paused ? 'paused' : 'on';
}

export function setMotionPaused(paused: boolean) {
  try {
    localStorage.setItem(MOTION_KEY, paused ? 'paused' : 'on');
  } catch {
    /* private mode — the attribute still applies for this page view */
  }
  applyMotionAttr(paused);
  window.dispatchEvent(new CustomEvent(MOTION_EVENT, { detail: { paused } }));
}

/** true only when animation is welcome: no reduced-motion preference and the site switch is not paused.
 *  Always false on the server and on the first client render, so nothing moves before we know. */
export function useMotion(): boolean {
  const [allowed, setAllowed] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const compute = () => setAllowed(!mq.matches && !readMotionPaused());
    compute();
    mq.addEventListener('change', compute);
    window.addEventListener(MOTION_EVENT, compute);
    window.addEventListener('storage', compute);
    return () => {
      mq.removeEventListener('change', compute);
      window.removeEventListener(MOTION_EVENT, compute);
      window.removeEventListener('storage', compute);
    };
  }, []);
  return allowed;
}

/** The visitor's explicit choice (ignores the OS preference) — drives the toggle's pressed state. */
export function useMotionPaused(): [boolean, (next: boolean) => void] {
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const sync = () => setPaused(readMotionPaused());
    sync();
    window.addEventListener(MOTION_EVENT, sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener(MOTION_EVENT, sync);
      window.removeEventListener('storage', sync);
    };
  }, []);
  return [paused, setMotionPaused];
}
