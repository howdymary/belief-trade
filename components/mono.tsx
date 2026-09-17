'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

const BASE = '/belief-trade';
const chapters = [
  { id: 'mono-intro', name: 'Intro' },
  { id: 'mono-conviction', name: 'Conviction' },
  { id: 'mono-composition', name: 'Composition' },
  { id: 'mono-trade', name: 'Trade belief' },
];

export function Mono() {
  const runway = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [grid, setGrid] = useState(true);
  const activeRef = useRef(0);

  const goTo = (index: number, animate = true) => {
    const scene = runway.current;
    if (!scene) return;
    const destination = Math.max(0, Math.min(chapters.length - 1, index));
    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce), (max-height: 480px)',
    ).matches;
    if (reduced) {
      document
        .getElementById(chapters[destination].id)
        ?.scrollIntoView({ behavior: 'instant' });
      return;
    }
    const bounds = scene.getBoundingClientRect();
    const distance = Math.max(
      1,
      bounds.height - (stage.current?.clientHeight ?? window.innerHeight),
    );
    window.scrollTo({
      top:
        window.scrollY +
        bounds.top +
        (distance * destination) / (chapters.length - 1),
      behavior: animate ? 'smooth' : 'instant',
    });
  };

  useEffect(() => {
    const scene = runway.current;
    const film = track.current;
    const viewport = stage.current;
    if (!scene || !film || !viewport) return;
    let frame = 0;
    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce), (max-height: 480px)',
    );
    const update = () => {
      const rect = scene.getBoundingClientRect();
      const distance = Math.max(1, rect.height - viewport.clientHeight);
      const progress = Math.min(1, Math.max(0, -rect.top / distance));
      film.style.setProperty(
        '--mono-x',
        `${progress * Math.max(0, film.scrollWidth - viewport.clientWidth)}px`,
      );
      let index = Math.round(progress * (chapters.length - 1));
      if (reduced.matches) {
        const firstVisible = chapters.findIndex(
          (c) =>
            (document.getElementById(c.id)?.getBoundingClientRect().bottom ??
              0) >
            window.innerHeight * 0.5,
        );
        index = firstVisible < 0 ? chapters.length - 1 : firstVisible;
      }
      if (activeRef.current !== index) {
        activeRef.current = index;
        setActive(index);
      }
      scene.style.setProperty('--mono-progress', String(progress));
      frame = 0;
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const keyboard = (event: KeyboardEvent) => {
      if (
        (event.target as HTMLElement).closest(
          'a,button,input,textarea,[role="switch"]',
        ) ||
        event.altKey ||
        event.ctrlKey ||
        event.metaKey
      )
        return;
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        event.preventDefault();
        goTo(activeRef.current + (event.key === 'ArrowRight' ? 1 : -1));
      }
    };
    const sideways = (event: WheelEvent) => {
      if (
        event.ctrlKey ||
        event.metaKey ||
        reduced.matches ||
        Math.abs(event.deltaX) <= Math.abs(event.deltaY)
      )
        return;
      const bounds = scene.getBoundingClientRect();
      if (bounds.top > 1 || bounds.bottom < viewport.clientHeight - 1) return;
      event.preventDefault();
      const multiplier =
        event.deltaMode === 1
          ? 16
          : event.deltaMode === 2
            ? viewport.clientHeight
            : 1;
      window.scrollBy({ top: event.deltaX * multiplier, behavior: 'instant' });
    };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    window.addEventListener('wheel', sideways, { passive: false });
    window.addEventListener('keydown', keyboard);
    reduced.addEventListener('change', schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      window.removeEventListener('wheel', sideways);
      window.removeEventListener('keydown', keyboard);
      reduced.removeEventListener('change', schedule);
    };
  }, []);

  return (
    <main className="mono-page" data-grid={grid ? 'on' : 'off'}>
      <a
        className="skip-link mono-skip"
        href="#mono-composition"
        onClick={(event) => {
          event.preventDefault();
          goTo(2, false);
          document
            .getElementById('mono-composition')
            ?.focus({ preventScroll: true });
        }}
      >
        Skip to the idea
      </a>
      <header className="mono-header">
        <a
          className="mono-brand"
          href={`${BASE}/`}
          aria-label="Belief Trade design gallery"
        >
          <i aria-hidden="true" />
          BELIEF / TRADE
        </a>
        <nav aria-label="Story chapters">
          {chapters.map((chapter, index) => (
            <a
              key={chapter.id}
              href={`#${chapter.id}`}
              aria-current={active === index ? 'step' : undefined}
              onClick={(event) => {
                event.preventDefault();
                goTo(index);
              }}
            >
              <span className="mono-nav-number">0{index + 1}</span>
              <span className="mono-nav-label">{chapter.name}</span>
            </a>
          ))}
        </nav>
        <label className="mono-grid-control">
          <span>Grid</span>
          <Switch
            className="mono-switch"
            checked={grid}
            onCheckedChange={setGrid}
            aria-label="Show layout grid"
          />
          <span className="mono-grid-state">{grid ? 'On' : 'Off'}</span>
        </label>
        <a className="mono-gallery-link" href={`${BASE}/`}>
          All designs <ArrowUpRight size={14} />
        </a>
      </header>

      <div className="mono-runway" ref={runway}>
        <div className="mono-stage" ref={stage}>
          <div className="mono-track" ref={track}>
            <section
              className="mono-panel mono-intro"
              id="mono-intro"
              aria-labelledby="mono-title"
            >
              <div className="mono-intro-grid">
                <div className="mono-intro-copy">
                  <span className="mono-meta">
                    A POINT OF VIEW, MADE TANGIBLE.
                  </span>
                  <p>
                    The future starts with belief.
                    <br />
                    Make yours a portfolio
                    <br />
                    the world can follow.
                  </p>
                </div>
                <div className="mono-intro-index">
                  <span>(01—04)</span>
                  <span className="mono-vertical">
                    CONVICTION BEFORE CONSENSUS
                  </span>
                </div>
                <div className="mono-intro-last">
                  <span>
                    YOUR THESIS.
                    <br />
                    YOUR COMPOSITION.
                  </span>
                  <button
                    aria-label="Continue to conviction"
                    onClick={() => goTo(1)}
                  >
                    <ArrowRight strokeWidth={0.75} />
                  </button>
                </div>
              </div>
              <div className="mono-word-label">
                <span>Trade what you believe in.</span>
                <span>Scroll to explore ↘</span>
              </div>
              <h1 id="mono-title">BELIEF</h1>
            </section>

            <section
              className="mono-panel mono-inverse mono-conviction"
              id="mono-conviction"
              aria-labelledby="mono-conviction-title"
            >
              <div className="mono-section-label">
                <span>(02) / CONVICTION</span>
                <span>IT STARTS WITH A DIFFERENT VIEW.</span>
              </div>
              <h2 id="mono-conviction-title">
                BEFORE
                <br />
                <span>CONSENSUS,</span>
                <br />
                CONVICTION.
              </h2>
              <div className="mono-conviction-bottom">
                <span className="mono-cross" aria-hidden="true">
                  +
                </span>
                <p>
                  Someone sees it first.
                  <br />A technology. A shift. A different future.
                  <br />A belief worth putting into the world.
                </p>
                <p>
                  Belief Trade is a concept for turning
                  <br />
                  that perspective into a portfolio
                  <br />
                  others can understand and participate in.
                </p>
              </div>
              <div className="mono-grid-overlay" aria-hidden="true" />
            </section>

            <section
              className="mono-panel mono-composition"
              id="mono-composition"
              tabIndex={-1}
              aria-labelledby="mono-composition-title"
            >
              <div className="mono-section-label">
                <span>(03) / COMPOSITION</span>
                <span>ONE IDEA. ONE PORTFOLIO. ONE TOKEN.</span>
              </div>
              <div className="mono-composition-grid">
                <div className="mono-process">
                  <h2 id="mono-composition-title">
                    THINK IT. <br />
                    COMPOSE IT. <br />
                    <span>TRADE IT.</span>
                  </h2>
                  <p>
                    Choose the assets that express your belief.
                    <br />
                    Define the mix. Give it an identity.
                    <br />
                    Make your point of view tangible.
                  </p>
                  <span className="mono-meta">
                    A PORTFOLIO THAT SAYS SOMETHING.
                  </span>
                </div>
                <div className="mono-specimen">
                  <div className="mono-specimen-top">
                    <span>EXAMPLE / 001</span>
                    <span>AI & COMPUTE</span>
                  </div>
                  <div className="mono-specimen-title">
                    <h3>
                      The next
                      <br />
                      intelligence.
                    </h3>
                    <span>↗</span>
                  </div>
                  <p>
                    A belief that intelligence
                    <br />
                    is becoming infrastructure.
                  </p>
                  <div
                    className="mono-allocation"
                    role="img"
                    aria-label="Illustrative allocation: NVIDIA 40%, Microsoft 35%, Ethereum 25%"
                  >
                    <i />
                    <i />
                    <i />
                  </div>
                  <dl className="mono-holdings">
                    <div>
                      <dt>
                        01 / NVIDIA <span>NVDA</span>
                      </dt>
                      <dd>40%</dd>
                    </div>
                    <div>
                      <dt>
                        02 / Microsoft <span>MSFT</span>
                      </dt>
                      <dd>35%</dd>
                    </div>
                    <div>
                      <dt>
                        03 / Ethereum <span>ETH</span>
                      </dt>
                      <dd>25%</dd>
                    </div>
                  </dl>
                  <div className="mono-token">
                    <span>
                      THREE ASSETS.
                      <br />
                      ONE POINT OF VIEW.
                    </span>
                    <strong>$MIND</strong>
                  </div>
                  <span className="mono-specimen-note">
                    Illustrative composition. Not an available token.
                  </span>
                </div>
              </div>
            </section>

            <section
              className="mono-panel mono-inverse mono-finale"
              id="mono-trade"
              aria-labelledby="mono-finale-title"
              onFocusCapture={(event) => {
                if ((event.target as HTMLElement).closest('a,button'))
                  goTo(3, false);
              }}
            >
              <div className="mono-section-label">
                <span>(04) / POSSIBILITY</span>
                <span>THE FUTURE IS NOT A FOREGONE CONCLUSION.</span>
              </div>
              <div className="mono-finale-top">
                <p>
                  A future you see.
                  <br />A portfolio that expresses it.
                  <br />A belief others can share.
                </p>
                <div className="mono-bibi">
                  <img
                    src={`${BASE}/art/bibi.webp`}
                    width="150"
                    height="150"
                    alt="Bibi, our little believer, in monochrome"
                  />
                  <span>SMALL BUN. BIG BELIEFS.</span>
                </div>
                <a className="mono-explore" href={`${BASE}/studio/#beliefs`}>
                  Explore the idea <ArrowUpRight size={24} />
                </a>
              </div>
              <h2 id="mono-finale-title">
                <span>TRADE</span>
                <span>BELIEF.</span>
              </h2>
              <p className="mono-concept-note">
                Early product concept. No live trading. Portfolios can lose
                value. Asset support and eligibility would be defined before
                launch.
              </p>
              <div className="mono-grid-overlay" aria-hidden="true" />
            </section>
          </div>
        </div>
      </div>

      <footer className="mono-footer">
        <span className="mono-footer-name">BELIEF TRADE © 2026</span>
        <div className="mono-pagination">
          <button
            onClick={() => goTo(active - 1)}
            disabled={active === 0}
            aria-label="Previous chapter"
          >
            <ArrowLeft size={18} />
          </button>
          <span>
            0{active + 1} <i>/ 04</i>
          </span>
          <button
            onClick={() => goTo(active + 1)}
            disabled={active === 3}
            aria-label="Next chapter"
          >
            <ArrowRight size={18} />
          </button>
        </div>
        <span className="mono-footer-hint">
          SCROLL ↓ &nbsp; THE STORY MOVES →
        </span>
      </footer>
      <noscript>
        <style>{`.mono-runway{height:auto!important}.mono-stage{position:relative!important;height:auto!important}.mono-track{display:block!important;transform:none!important;width:auto!important}.mono-panel{width:100%!important;min-height:100svh;height:auto!important}.mono-header nav,.mono-grid-control,.mono-pagination{display:none!important}.mono-header,.mono-footer{position:relative!important}.mono-intro-last button{display:none!important}`}</style>
      </noscript>
    </main>
  );
}
