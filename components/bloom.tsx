'use client';

import { useEffect, useRef, type CSSProperties } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight } from 'lucide-react';

const BASE = '/belief-trade';
const plants = [
  { kind: 'seedling', x: 45, size: 25, start: 0.025, lean: -6, layer: 2 },
  { kind: 'seedling', x: 30, size: 36, start: 0.1, lean: -14, layer: 2 },
  { kind: 'seedling', x: 62, size: 31, start: 0.16, lean: 11, layer: 2 },
  { kind: 'fern', x: 5, size: 91, start: 0.2, lean: 16, layer: 2 },
  { kind: 'fern', x: 88, size: 84, start: 0.27, lean: -17, layer: 2 },
  { kind: 'fern', x: 19, size: 64, start: 0.35, lean: -13, layer: 2 },
  { kind: 'fern', x: 72, size: 65, start: 0.4, lean: 18, layer: 2 },
  { kind: 'fern', x: -9, size: 112, start: 0.45, lean: 24, layer: 4 },
  { kind: 'fern', x: 104, size: 108, start: 0.5, lean: -26, layer: 4 },
  { kind: 'seedling', x: 38, size: 31, start: 0.56, lean: 9, layer: 4 },
  { kind: 'seedling', x: 62, size: 28, start: 0.62, lean: -11, layer: 4 },
] as const;

export function Bloom() {
  const story = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = story.current;
    if (!element) return;
    let frame = 0;
    const update = () => {
      const rect = element.getBoundingClientRect();
      const distance = Math.max(1, rect.height - window.innerHeight);
      const progress = Math.min(1, Math.max(0, -rect.top / distance));
      element.style.setProperty('--bloom-progress', progress.toFixed(5));
      element.dataset.started = progress > 0.005 ? 'true' : 'false';
      frame = 0;
    };
    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    return () => {
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <main className="bloom-page">
      <a className="skip-link" href="#bloom-next">
        Skip the growing story
      </a>
      <section
        className="bloom-story"
        ref={story}
        aria-label="A belief takes root"
      >
        <div className="bloom-stage">
          <div className="bloom-light" aria-hidden="true" />
          <header className="bloom-nav">
            <a href={`${BASE}/`} aria-label="Belief Trade design gallery">
              belief<span>trade</span>
              <i aria-hidden="true">✳</i>
            </a>
            <a href="#bloom-next">
              A small beginning <ArrowUpRight size={15} />
            </a>
          </header>
          <div className="bloom-garden" aria-hidden="true">
            {plants.map((plant, index) => (
              <div
                className={`bloom-plant bloom-plant-${plant.kind}`}
                key={index}
                style={
                  {
                    '--x': `${plant.x}%`,
                    '--size': `${plant.size}svh`,
                    '--start': plant.start,
                    '--lean': `${plant.lean}deg`,
                    zIndex: plant.layer,
                  } as CSSProperties
                }
              >
                <img
                  src={`${BASE}/art/bloom-${plant.kind}.webp`}
                  alt=""
                  width="680"
                  height="1020"
                />
              </div>
            ))}
          </div>
          <div className="bloom-headline">
            <span className="bloom-eyebrow bloom-kicker">
              EVERYTHING BEGINS SOMEWHERE
            </span>
            <h1>
              <span className="bloom-line bloom-line-one">The future</span>
              <span className="bloom-line bloom-line-two">
                starts with <em>belief.</em>
              </span>
            </h1>
            <p>A thought. A possibility. A world waiting to grow.</p>
          </div>
          <div className="bloom-ground" aria-hidden="true" />
          <div className="bloom-scroll" aria-hidden="true">
            <span>Keep going. Something is growing.</span>
            <ArrowDown size={17} />
          </div>
          <div className="bloom-chapter" aria-hidden="true">
            <span>01 — A BELIEF TAKES ROOT</span>
            <span className="bloom-track">
              <i />
            </span>
            <span>02 — POSSIBILITY</span>
          </div>
        </div>
      </section>
      <section className="bloom-next" id="bloom-next">
        <span className="bloom-eyebrow">BELIEF TRADE / TRADE BELIEF.</span>
        <h2>
          Give your belief
          <br />
          <em>room to grow.</em>
        </h2>
        <p>
          A point of view can become a portfolio. Choose the assets that express
          it. Give it a name. Make it a token others can discover.
        </p>
        <a className="bloom-cta" href={`${BASE}/studio/#beliefs`}>
          Explore the idea <ArrowRight size={19} />
        </a>
        <div className="bloom-signoff">
          <img
            src={`${BASE}/art/bibi.webp`}
            width="72"
            height="72"
            alt="Bibi, the little believer"
          />
          <span>Big ideas start small.</span>
        </div>
      </section>
      <footer className="bloom-footer">
        <a href={`${BASE}/`}>← All designs</a>
        <span>Early concept. No live trading.</span>
        <a href="#">Back to the beginning ↑</a>
      </footer>
      <noscript>
        <style>{`.bloom-story{--bloom-progress:1!important;height:115svh!important}.bloom-stage{position:relative!important}.bloom-scroll,.bloom-chapter{display:none!important}`}</style>
      </noscript>
    </main>
  );
}
