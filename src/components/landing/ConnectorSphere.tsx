import { useEffect, useMemo, useRef, useState } from 'react';
import { CONNECTORS, CATEGORIES, type Connector } from '../../data/connectors';
import { CONTACT_HREF } from './cta';
import { useMotion } from '../../lib/motion';

const base = import.meta.env.BASE_URL;

interface Placed extends Connector {
  lat: number; // degrees, -90..90
  lon: number; // degrees, 0..360
}

// Deterministic fibonacci lattice — even coverage, no Math.random (SSR-safe).
// Latitude compressed so tiles never sit exactly at the poles.
function placeOnSphere(items: Connector[]): Placed[] {
  const GOLDEN = Math.PI * (1 + Math.sqrt(5));
  const n = items.length;
  return items.map((item, i) => {
    const phi = Math.acos(1 - (2 * (i + 0.5)) / n); // 0..PI from north pole
    const lat = (90 - (phi * 180) / Math.PI) * 0.62;
    const lon = ((GOLDEN * (i + 0.5) * 180) / Math.PI) % 360;
    return { ...item, lat, lon };
  });
}

const shortestDelta = (from: number, to: number) => {
  let d = (to - from) % 360;
  if (d > 180) d -= 360;
  if (d < -180) d += 360;
  return d;
};

// Drag feel: degrees per pixel, and how much of the last movement carries on as inertia.
const DRAG_SENSITIVITY = 0.32;
const INERTIA_CARRY = 0.5;
const INERTIA_DECAY = 0.9;
const DRAG_THRESHOLD = 8; // px before a press counts as a drag rather than a click

const chipClass = (on: boolean) =>
  `rounded-full border px-4 py-1.5 font-mono text-caption uppercase tracking-[0.1em] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime ${
    on ? 'border-lime bg-lime/15 text-lime' : 'border-cream/40 text-cream/70 hover:border-cream/70 hover:text-cream'
  }`;

/**
 * 3D connector gallery. Pointer users drag the sphere and click a tile; keyboard users move between
 * tiles with the arrow keys (one tab stop, roving tabindex) and open a tile with Enter or Space.
 *
 * Geometry (tile size, sphere radius) is pure CSS — see .sphere-canvas / .sphere-scene in
 * landing.css — so the server-rendered frame already has the final shape and nothing jumps on load.
 * The idle rotation obeys the site motion switch and prefers-reduced-motion.
 */
export default function ConnectorSphere() {
  const placed = useMemo(() => placeOnSphere(CONNECTORS), []);
  const motion = useMotion();

  const canvasRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const tileRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const returnFocusTo = useRef<HTMLButtonElement | null>(null);

  // rotation state lives in refs — mutated per frame without re-rendering React
  const rot = useRef({ rx: -4, ry: 0 });
  const vel = useRef({ x: 0, y: 0 });
  const dragging = useRef(false);
  const dragDist = useRef(0);
  const lastPointer = useRef({ x: 0, y: 0 });
  const lastInteract = useRef(0);
  const focusTarget = useRef<{ rx: number; ry: number } | null>(null);
  const motionRef = useRef(false);

  const [selected, setSelected] = useState<Placed | null>(null);
  const [filter, setFilter] = useState<string | null>(null);
  const [hasDragged, setHasDragged] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    motionRef.current = motion;
  }, [motion]);

  // render loop: inertia, idle auto-rotate, focus easing
  useEffect(() => {
    let raf = 0;
    const loop = (now: number) => {
      const r = rot.current;

      if (focusTarget.current) {
        const t = focusTarget.current;
        const dy = shortestDelta(r.ry, t.ry);
        const dx = t.rx - r.rx;
        r.ry += dy * 0.09;
        r.rx += dx * 0.09;
        if (Math.abs(dy) < 0.05 && Math.abs(dx) < 0.05) focusTarget.current = null;
      } else if (!dragging.current) {
        // inertia
        r.ry -= vel.current.x;
        r.rx += vel.current.y;
        vel.current.x *= INERTIA_DECAY;
        vel.current.y *= INERTIA_DECAY;
        // idle drift — only while motion is welcome (site switch + OS preference)
        if (motionRef.current && now - lastInteract.current > 2600) r.ry -= 0.022;
      }

      r.rx = Math.max(-62, Math.min(62, r.rx));
      if (sceneRef.current) {
        sceneRef.current.style.transform = `rotateX(${r.rx}deg) rotateY(${r.ry}deg)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const dimmed = (p: Placed) => filter !== null && p.cat !== filter;
  const visibleIdx = () => placed.map((_, i) => i).filter((i) => !dimmed(placed[i]));

  // keep the roving tab stop on a visible tile when the filter changes
  useEffect(() => {
    if (dimmed(placed[activeIdx])) {
      const first = visibleIdx()[0];
      if (first !== undefined) setActiveIdx(first);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  // when a tile opens, read its details: move focus into the card
  useEffect(() => {
    if (selected) cardRef.current?.focus();
  }, [selected]);

  const bringToFront = (p: Placed) => {
    focusTarget.current = { rx: -p.lat, ry: rot.current.ry + shortestDelta(rot.current.ry, -p.lon) };
    lastInteract.current = performance.now() + 6000; // hold the drift off while reading
  };

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    dragDist.current = 0;
    lastPointer.current = { x: e.clientX, y: e.clientY };
    lastInteract.current = performance.now();
    focusTarget.current = null;
    vel.current = { x: 0, y: 0 };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    const dx = e.clientX - lastPointer.current.x;
    const dy = e.clientY - lastPointer.current.y;
    lastPointer.current = { x: e.clientX, y: e.clientY };
    const wasDrag = dragDist.current > DRAG_THRESHOLD;
    dragDist.current += Math.abs(dx) + Math.abs(dy);
    if (!wasDrag && dragDist.current > DRAG_THRESHOLD) {
      // a real drag has started: one cursor, tiles stop reacting, pointer stays captured even if
      // it leaves the canvas. Capturing earlier would retarget the click and swallow tile selection.
      if (!hasDragged) setHasDragged(true);
      canvasRef.current?.setAttribute('data-dragging', '');
      try {
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
      } catch {
        /* synthetic events may carry no active pointer */
      }
    }
    rot.current.ry -= dx * DRAG_SENSITIVITY;
    rot.current.rx += dy * DRAG_SENSITIVITY;
    vel.current = { x: dx * DRAG_SENSITIVITY * INERTIA_CARRY, y: dy * DRAG_SENSITIVITY * INERTIA_CARRY };
    lastInteract.current = performance.now();
  };

  const onPointerUp = () => {
    dragging.current = false;
    lastInteract.current = performance.now();
    canvasRef.current?.removeAttribute('data-dragging');
    if (!motionRef.current) vel.current = { x: 0, y: 0 };
    // the click that follows this pointerup still needs to know it was a drag; clear afterwards
    setTimeout(() => { dragDist.current = 0; }, 0);
  };

  const openTile = (p: Placed, i: number, viaKeyboard: boolean) => {
    if (!viaKeyboard && dragDist.current > DRAG_THRESHOLD) return; // it was a drag, not a click
    returnFocusTo.current = tileRefs.current[i];
    setActiveIdx(i);
    setSelected(p);
    bringToFront(p);
  };

  const closeCard = () => {
    setSelected(null);
    returnFocusTo.current?.focus();
  };

  // arrow keys move between visible tiles (and turn the sphere to face them); Escape closes the card
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      if (selected) {
        e.preventDefault();
        closeCard();
      }
      return;
    }
    if (!['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp', 'Home', 'End'].includes(e.key)) return;
    const order = visibleIdx();
    if (!order.length) return;
    const pos = Math.max(0, order.indexOf(activeIdx));
    let next = pos;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (pos + 1) % order.length;
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (pos - 1 + order.length) % order.length;
    if (e.key === 'Home') next = 0;
    if (e.key === 'End') next = order.length - 1;
    e.preventDefault();
    const idx = order[next];
    setActiveIdx(idx);
    tileRefs.current[idx]?.focus();
    bringToFront(placed[idx]);
  };

  return (
    <section className="relative overflow-hidden bg-forest-deepest" aria-label="Connector gallery">
      {/* atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 50% 48%, rgba(129,215,19,0.09) 0%, transparent 62%), radial-gradient(ellipse 55% 60% at 12% 90%, rgba(20,80,65,0.45) 0%, transparent 65%), radial-gradient(ellipse 45% 40% at 88% 10%, rgba(20,80,65,0.38) 0%, transparent 70%)',
        }}
      />

      <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col px-5 pt-28 sm:px-8 lg:pt-32">
        {/* header overlay */}
        <div className="pointer-events-none relative z-20 text-center">
          <p className="rise pointer-events-auto mx-auto inline-flex items-center gap-2.5 rounded-sm border border-lime/25 bg-lime/10 px-3.5 py-1.5 font-mono text-caption uppercase tracking-[0.14em] text-lime">
            <span className="h-1.5 w-1.5 rounded-full bg-lime motion-safe:animate-pulse-dot" aria-hidden="true" />
            {CONNECTORS.length} pre-built connectors
          </p>
          <h1 className="rise rise-d1 mx-auto mt-5 max-w-2xl font-display text-[clamp(2.4rem,5.5vw,4.2rem)] leading-[1.05] tracking-[-0.01em] text-cream [text-wrap:balance]">
            Step inside <em className="text-lime">the exchange</em>
          </h1>
          <p className="rise rise-d2 mx-auto mt-4 max-w-md text-body-lg leading-[1.7] text-cream/65">
            Databases, files, SaaS and transfer protocols, connected without writing code.
          </p>

          {/* category filters */}
          <div className="rise rise-d3 pointer-events-auto mt-7 flex flex-wrap items-center justify-center gap-2" role="group" aria-label="Filter connectors by category">
            <button type="button" onClick={() => setFilter(null)} aria-pressed={filter === null} className={chipClass(filter === null)}>
              All
            </button>
            {CATEGORIES.map((cat) => (
              <button key={cat} type="button" onClick={() => setFilter(filter === cat ? null : cat)} aria-pressed={filter === cat} className={chipClass(filter === cat)}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* the sphere — geometry from .sphere-canvas / .sphere-scene in landing.css */}
        <div
          ref={canvasRef}
          role="group"
          aria-label="Connectors. Use the arrow keys to move between connectors and Enter to open one; drag to look around."
          className="sphere-canvas relative z-10 mt-2 h-[max(520px,calc(100svh-30rem))] select-none overflow-hidden rounded-xl"
          style={{ perspective: '1300px', touchAction: 'pan-y' }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onKeyDown={onKeyDown}
        >
          <div
            ref={sceneRef}
            className="sphere-scene absolute left-1/2 top-1/2 h-0 w-0"
            style={{ transformStyle: 'preserve-3d', transform: 'rotateX(-4deg) rotateY(0deg)' }}
          >
            {placed.map((p, i) => {
              const hidden = dimmed(p);
              return (
                <button
                  key={p.name}
                  ref={(el) => {
                    tileRefs.current[i] = el;
                  }}
                  type="button"
                  tabIndex={!hidden && i === activeIdx ? 0 : -1}
                  aria-hidden={hidden || undefined}
                  onClick={(e) => openTile(p, i, e.detail === 0)}
                  onFocus={(e) => {
                    setActiveIdx(i);
                    // Turn to face the tile only for keyboard focus. A mouse press also focuses the
                    // button, and easing toward it there would fight the drag that follows.
                    if (!dragging.current && e.currentTarget.matches(':focus-visible')) bringToFront(p);
                  }}
                  aria-label={`${p.name} — ${p.kind}`}
                  className={`group absolute flex flex-col items-center justify-center gap-1.5 rounded-lg border bg-cream p-3 transition-[opacity,border-color,box-shadow] duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime ${
                    hidden
                      ? 'pointer-events-none border-cream/0 opacity-[0.08]'
                      : selected?.name === p.name
                        ? 'border-lime opacity-100 shadow-lime-glow'
                        : 'border-transparent opacity-100 hover:border-lime/70'
                  }`}
                  style={{
                    width: 'var(--tile)',
                    height: 'var(--tile)',
                    marginLeft: 'calc(var(--tile) / -2)',
                    marginTop: 'calc(var(--tile) / -2)',
                    transform: `rotateY(${p.lon}deg) rotateX(${p.lat}deg) translateZ(calc(-1 * var(--r)))`,
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    // tiles must match the canvas, or touches starting on a tile
                    // get claimed by browser scrolling and the drag never starts
                    touchAction: 'pan-y',
                  }}
                >
                  <img src={`${base}${p.file}`} alt="" draggable={false} className="pointer-events-none h-[54%] w-[82%] object-contain" loading="eager" />
                  <span className="pointer-events-none font-mono text-2xs uppercase tracking-[0.05em] text-ink-muted group-hover:text-forest">{p.name}</span>
                </button>
              );
            })}
          </div>

          {/* vignette to sell the depth */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{ background: 'radial-gradient(ellipse 62% 58% at 50% 50%, transparent 58%, rgba(5,15,9,0.85) 100%)' }}
          />

          {/* detail card — anchored to the canvas so it's always in view; announced when it fills */}
          <div
            ref={cardRef}
            tabIndex={-1}
            role="region"
            aria-label="Connector details"
            aria-live="polite"
            aria-hidden={!selected}
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                e.stopPropagation();
                closeCard();
              }
            }}
            className={`absolute inset-x-0 bottom-4 z-30 flex cursor-auto justify-center px-2 outline-none transition-[opacity,transform] duration-300 ${
              selected ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
            }`}
            onPointerDown={(e) => e.stopPropagation()}
          >
            {selected && (
              <div className="flex w-full max-w-md items-center gap-4 rounded-lg border border-lime/25 bg-forest-night/90 p-4 shadow-panel backdrop-blur-xl">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-md bg-cream p-2">
                  <img src={`${base}${selected.file}`} alt="" className="max-h-full max-w-full object-contain" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-display text-lg leading-tight text-cream">{selected.name}</p>
                  <p className="mt-0.5 font-mono text-2xs uppercase tracking-[0.1em] text-lime">{selected.kind}</p>
                  <a
                    href={CONTACT_HREF}
                    className="mt-1.5 inline-flex items-center gap-1.5 text-body-xs font-medium text-cream/80 transition-colors duration-200 hover:text-lime focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime"
                  >
                    Talk to us about {selected.name} <span aria-hidden="true">→</span>
                  </a>
                </div>
                <button
                  type="button"
                  onClick={closeCard}
                  aria-label="Close details"
                  className="shrink-0 rounded-sm p-1.5 text-cream/55 transition-colors duration-200 hover:text-lime focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime"
                >
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                    <path d="M3 3l10 10M13 3L3 13" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* hint — real text, so keyboard users learn the controls too */}
        <p
          className={`pointer-events-none relative z-20 pb-6 text-center font-mono text-caption uppercase tracking-[0.16em] text-cream/55 transition-opacity duration-700 ${
            hasDragged ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <span className="mr-2 inline-block motion-safe:animate-pulse-dot" aria-hidden="true">⟲</span>
          Drag or use the arrow keys to look around · Enter opens a connector
        </p>
      </div>

      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-lime/30 to-transparent" />
    </section>
  );
}
