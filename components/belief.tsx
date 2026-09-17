'use client';

import { useEffect, useRef, useState } from 'react';
import {
  ArrowUpRight,
  ArrowRight,
  ArrowLeft,
  Plus,
  Sparkles,
  Globe2,
  Check,
  Layers3,
  Compass,
  Eye,
  ChevronDown,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';

const BASE = '/belief-trade';
const art = (name: string) => `${BASE}/art/${name}.webp`;
const beliefs = [
  {
    id: 'ai',
    name: 'The next intelligence',
    ticker: 'MIND',
    thesis:
      'Intelligence is becoming infrastructure. Own a point of view on the companies and networks building it.',
    short: 'The next great builder might be an algorithm.',
    tag: 'AI & COMPUTE',
    color: '#caff45',
    assets: [
      ['NVDA', 40],
      ['MSFT', 35],
      ['ETH', 25],
    ],
    icon: '✳',
  },
  {
    id: 'money',
    name: 'Money without borders',
    ticker: 'OPEN',
    thesis:
      'The internet should move value as freely as it moves ideas. A portfolio for a more open financial world.',
    short: 'A more connected world needs more open money.',
    tag: 'OPEN FINANCE',
    color: '#cad2ff',
    assets: [
      ['BTC', 40],
      ['ETH', 35],
      ['COIN', 25],
    ],
    icon: '↗',
  },
  {
    id: 'energy',
    name: 'A brighter tomorrow',
    ticker: 'NEXT',
    thesis:
      'More ambition needs more energy. Back a future powered by electrification, new infrastructure, and better technology.',
    short: 'The future needs more energy. And better ideas.',
    tag: 'ENERGY & PROGRESS',
    color: '#ffbc9c',
    assets: [
      ['TSLA', 35],
      ['NEE', 35],
      ['CEG', 30],
    ],
    icon: '☀',
  },
] as const;
type Belief = (typeof beliefs)[number];

export function Logo() {
  return (
    <a
      className="wordmark"
      href={`${BASE}/`}
      aria-label="Belief Trade design gallery"
    >
      belief<span>trade</span>
      <i aria-hidden="true">✳</i>
    </a>
  );
}
function Directions({ current }: { current: string }) {
  return (
    <nav className="directions" aria-label="Design directions">
      <a href={`${BASE}/`}>All designs</a>
      <span aria-hidden="true">/</span>
      {['editorial', 'studio', 'world', 'bloom', 'mono'].map((d, i) => (
        <a
          key={d}
          aria-current={d === current ? 'page' : undefined}
          href={`${BASE}/${d}/`}
        >
          <span className="direction-number">0{i + 1}</span>
          <span className="direction-name">{d}</span>
        </a>
      ))}
    </nav>
  );
}
function ArrowButton({
  children,
  onClick,
  className = '',
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button className={`action ${className}`} onClick={onClick}>
      {children}
      <ArrowUpRight size={19} />
    </button>
  );
}

function BeliefModal({
  belief,
  close,
}: {
  belief: Belief | null;
  close: () => void;
}) {
  return (
    <Dialog open={!!belief} onOpenChange={(open) => !open && close()}>
      <DialogContent className="belief-dialog" showCloseButton>
        {belief && (
          <>
            <span className="eyebrow">
              A BELIEF, MADE TANGIBLE / ILLUSTRATIVE PORTFOLIO
            </span>
            <DialogTitle className="dialog-title">{belief.name}</DialogTitle>
            <DialogDescription className="dialog-description">
              {belief.thesis}
            </DialogDescription>
            <div className="dialog-token" style={{ background: belief.color }}>
              <span>{belief.icon}</span>
              <strong>${belief.ticker}</strong>
              <span>
                One idea.
                <br />
                One portfolio.
              </span>
            </div>
            <div className="allocation-label">
              <span>The proposed mix</span>
              <span>100%</span>
            </div>
            <div className="allocations">
              {belief.assets.map(([asset, weight], i) => (
                <div className="allocation-row" key={asset}>
                  <span className={`asset-dot dot-${i}`}>{asset[0]}</span>
                  <strong>{asset}</strong>
                  <span className="allocation-line">
                    <i style={{ width: `${weight * 2}%` }} />
                  </span>
                  <span>{weight}%</span>
                </div>
              ))}
            </div>
            <p className="demo-note">
              This is a brand concept with sample allocations, not an available
              token or an investment recommendation. Asset support, fees,
              portfolio rules, and eligibility would be defined before launch.
            </p>
            <button className="action full" onClick={close}>
              Keep exploring <ArrowRight size={18} />
            </button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
function Manifesto({ open, close }: { open: boolean; close: () => void }) {
  return (
    <Dialog open={open} onOpenChange={(v) => !v && close()}>
      <DialogContent className="belief-dialog manifesto-dialog">
        <span className="eyebrow">THE BELIEF BEHIND BELIEF</span>
        <DialogTitle className="dialog-title">
          The future starts as someone’s belief.
        </DialogTitle>
        <DialogDescription className="dialog-description">
          Before it becomes obvious. Before it becomes consensus. Someone sees
          the world a little differently.
        </DialogDescription>
        <p>
          Belief Trade is a concept for turning that point of view into a
          portfolio: choose the supported assets, define the mix, and give the
          idea a name.
        </p>
        <p>
          The ambition is simple. Let more people express a thesis, make its
          composition visible, and give others a way to discover and participate
          in it.
        </p>
        <div className="manifesto-signoff">
          <img
            src={art('bibi')}
            alt="Bibi, our little believer"
            width="96"
            height="96"
          />
          <span>
            Big ideas start small.
            <br />
            <strong>Trade Belief.</strong>
          </span>
        </div>
        <p className="demo-note">
          You’re exploring an early product vision. Nothing on this site places
          trades, issues tokens, or collects funds. Portfolios can lose value;
          future availability would depend on supported markets and eligibility.
        </p>
      </DialogContent>
    </Dialog>
  );
}

function useReveals() {
  useEffect(() => {
    document.documentElement.classList.add('js-reveals');
    const els = document.querySelectorAll('[data-reveal]');
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('revealed');
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => {
      io.disconnect();
      document.documentElement.classList.remove('js-reveals');
    };
  }, []);
}

function PortfolioCard({
  belief,
  onClick,
  compact = false,
}: {
  belief: Belief;
  onClick: () => void;
  compact?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`portfolio-card ${compact ? 'compact' : ''}`}
      aria-label={`Explore ${belief.name}`}
    >
      <div className="portfolio-card-top">
        <span className="eyebrow">{belief.tag}</span>
        <ArrowUpRight size={21} />
      </div>
      <span
        className="portfolio-symbol"
        style={{ background: belief.color }}
        aria-hidden="true"
      >
        {belief.icon}
      </span>
      <h3>{belief.name}</h3>
      <p>{belief.short}</p>
      <div className="weight-bar" aria-hidden="true">
        {belief.assets.map(([a, w], i) => (
          <span key={a} className={`bar-${i}`} style={{ width: `${w}%` }} />
        ))}
      </div>
      <div className="portfolio-assets">
        {belief.assets.map(([a, w]) => (
          <span key={a}>
            {a}
            <b>{w}%</b>
          </span>
        ))}
      </div>
      <div className="portfolio-card-bottom">
        <span>${belief.ticker}</span>
        <span>Illustrative portfolio</span>
      </div>
    </button>
  );
}

export function Editorial() {
  const track = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [selected, setSelected] = useState<Belief | null>(null);
  const [manifesto, setManifesto] = useState(false);
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const update = () =>
      setProgress(el.scrollLeft / Math.max(1, el.scrollWidth - el.clientWidth));
    const wheel = (e: WheelEvent) => {
      if (
        innerWidth <= 760 ||
        e.ctrlKey ||
        Math.abs(e.deltaX) > Math.abs(e.deltaY)
      )
        return;
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };
    el.addEventListener('wheel', wheel, { passive: false });
    el.addEventListener('scroll', update, { passive: true });
    return () => {
      el.removeEventListener('wheel', wheel);
      el.removeEventListener('scroll', update);
    };
  }, []);
  const move = (index: number) => {
    const el = track.current;
    if (el)
      el.scrollTo({
        left: index * el.clientWidth,
        behavior: matchMedia('(prefers-reduced-motion: reduce)').matches
          ? 'instant'
          : 'smooth',
      });
  };
  const chapter = Math.min(3, Math.round(progress * 3));
  return (
    <div className="editorial">
      <a className="skip-link" href="#editorial-story">
        Skip to story
      </a>
      <header className="site-nav">
        <Logo />
        <span className="eyebrow editorial-nav-note">
          A POINT OF VIEW, MADE POSSIBLE.
        </span>
        <Directions current="editorial" />
      </header>
      <div
        className="story-track"
        id="editorial-story"
        ref={track}
        tabIndex={0}
        aria-label="Horizontal story. Scroll, swipe, or use the chapter buttons."
        onKeyDown={(e) => {
          if (e.target !== e.currentTarget) return;
          if (e.key === 'ArrowRight') {
            e.preventDefault();
            move(chapter + 1);
          }
          if (e.key === 'ArrowLeft') {
            e.preventDefault();
            move(chapter - 1);
          }
        }}
      >
        <section className="story-panel editorial-hero">
          <div className="hero-topline">
            <span className="eyebrow">01 — THE IDEA</span>
            <span className="eyebrow">YOUR CONVICTION. YOUR COMPOSITION.</span>
          </div>
          <h1>
            Trade
            <br />
            <span>Belief.</span>
            <sup>✳</sup>
          </h1>
          <div className="editorial-mascot-stage">
            <div className="mascot-disc" />
            <img
              className="editorial-mascot"
              src={art('bibi')}
              alt="Bibi, a little rabbit with big beliefs"
              width="580"
              height="580"
            />
            <span className="mascot-sticker">
              SMALL BUN.
              <br />
              BIG BELIEFS. <span>✳</span>
            </span>
          </div>
          <div className="editorial-hero-bottom">
            <p>
              The future starts as someone’s belief.
              <br />
              Make yours a portfolio the world can follow.
            </p>
            <button className="text-action" onClick={() => move(1)}>
              A new point of view <ArrowRight size={25} />
            </button>
          </div>
          <div className="editorial-side-label">BELIEF MARKETS / VOL. 001</div>
        </section>
        <section className="story-panel editorial-manifesto">
          <span className="eyebrow">02 — THE POSSIBILITY</span>
          <div className="manifesto-type">
            <p>
              Before it’s
              <br />
              the future,
            </p>
            <p>
              it’s someone’s
              <br />
              <em>belief.</em>
              <span className="type-star">✳</span>
            </p>
          </div>
          <div className="editorial-copy-row">
            <span className="eyebrow">
              THE WORLD DOESN’T CHANGE
              <br />
              BY THINKING THE SAME.
            </span>
            <p>
              You see what’s coming. The industries that matter. The ideas with
              a future. Now imagine putting that point of view into one
              portfolio.
            </p>
          </div>
        </section>
        <section className="story-panel editorial-compose">
          <div className="compose-copy">
            <span className="eyebrow">03 — THE EXPRESSION</span>
            <h2>
              A thesis.
              <br />A portfolio.
              <br />
              <em>One token.</em>
            </h2>
            <p>
              Choose what belongs in your future.
              <br />
              Give it a name. Make the idea tangible.
            </p>
            <div className="composition-steps">
              <span>
                <b>01</b> Find your why
              </span>
              <span>
                <b>02</b> Choose your mix
              </span>
              <span>
                <b>03</b> Share your belief
              </span>
            </div>
          </div>
          <div className="editorial-portfolio">
            <div className="portfolio-note">A POINT OF VIEW IN PRACTICE ↘</div>
            <PortfolioCard
              belief={beliefs[0]}
              onClick={() => setSelected(beliefs[0])}
            />
            <span className="editorial-portfolio-caption">
              YOUR BELIEF CAN HAVE A TICKER.
            </span>
          </div>
        </section>
        <section className="story-panel editorial-finale">
          <div className="finale-top">
            <span className="eyebrow">04 — YOUR TURN</span>
            <span className="eyebrow">A MARKET FOR DIFFERENT MINDS.</span>
          </div>
          <h2>
            What do
            <br />
            <em>you believe?</em>
          </h2>
          <div className="finale-row">
            <p>
              A future worth backing starts with a point of view.
              <br />
              Build yours. Discover someone else’s.
            </p>
            <ArrowButton onClick={() => setManifesto(true)}>
              Meet Belief Trade
            </ArrowButton>
          </div>
          <div className="finale-bottom">
            <span>Early concept. No live trading.</span>
            <button className="text-action" onClick={() => move(0)}>
              Back to the beginning <ArrowLeft size={18} />
            </button>
          </div>
        </section>
      </div>
      <footer className="story-controls">
        <span className="eyebrow">
          SCROLL TO EXPLORE <span className="scroll-arrow">→</span>
        </span>
        <div className="chapter-controls">
          {['The idea', 'The possibility', 'The expression', 'Your turn'].map(
            (label, i) => (
              <button
                aria-label={`Chapter ${i + 1}: ${label}`}
                aria-current={chapter === i ? 'step' : undefined}
                onClick={() => move(i)}
                key={label}
              >
                <span>0{i + 1}</span>
                <i />
              </button>
            ),
          )}
        </div>
        <span className="eyebrow">0{chapter + 1} / 04</span>
      </footer>
      <BeliefModal belief={selected} close={() => setSelected(null)} />
      <Manifesto open={manifesto} close={() => setManifesto(false)} />
    </div>
  );
}

export function Studio() {
  useReveals();
  const [selected, setSelected] = useState<Belief | null>(null);
  const [manifesto, setManifesto] = useState(false);
  return (
    <div className="studio">
      <a className="skip-link" href="#studio-main">
        Skip to story
      </a>
      <header className="site-nav studio-nav">
        <Logo />
        <nav className="studio-anchor-nav">
          <a href="#how-it-works">The idea</a>
          <a href="#beliefs">Explore beliefs</a>
        </nav>
        <a className="studio-nav-cta" href="#beliefs">
          Find your belief <ArrowUpRight size={17} />
        </a>
      </header>
      <main id="studio-main">
        <section className="studio-hero">
          <div className="studio-hero-copy">
            <span className="eyebrow studio-eyebrow">
              <span className="status-dot" /> FOR PEOPLE WITH A POINT OF VIEW
            </span>
            <h1>
              Trade
              <br />
              <em>Belief.</em>
            </h1>
            <p>
              The future starts as someone’s belief.
              <br />
              Turn yours into a portfolio others can follow.
            </p>
            <div className="studio-hero-actions">
              <a className="action blue" href="#beliefs">
                Explore a belief <ArrowUpRight size={19} />
              </a>
              <button
                className="text-action"
                onClick={() => setManifesto(true)}
              >
                Meet the idea <Plus size={17} />
              </button>
            </div>
            <div className="hero-footnote">
              <span>✳</span> A little conviction can change your perspective.
            </div>
          </div>
          <div className="studio-hero-art">
            <div className="studio-orbit orbit-one" />
            <div className="studio-orbit orbit-two" />
            <span className="floating-label label-top">
              YOUR VIEW OF THE FUTURE ↗
            </span>
            <img
              src={art('bibi')}
              className="studio-bibi"
              alt="Bibi, Belief Trade’s friendly mascot"
              width="580"
              height="580"
            />
            <div className="floating-portfolio">
              <div className="floating-portfolio-symbol">✳</div>
              <div>
                <span className="eyebrow">THE NEXT INTELLIGENCE</span>
                <strong>One idea. A whole portfolio.</strong>
                <span className="floating-assets">
                  NVDA <i /> MSFT <i /> ETH
                </span>
              </div>
              <ArrowUpRight size={20} />
            </div>
            <span className="bibi-name">Bibi. Our first believer.</span>
          </div>
        </section>
        <div className="belief-ribbon">
          <span>SEE IT DIFFERENTLY.</span>
          <span>GIVE IT A NAME.</span>
          <span>MAKE IT A PORTFOLIO.</span>
          <span>
            TRADE BELIEF. <i>✳</i>
          </span>
        </div>
        <section className="studio-statement" data-reveal>
          <span className="eyebrow">
            CONVICTION IS PERSONAL. NOW YOUR PORTFOLIO CAN BE, TOO.
          </span>
          <h2>
            You have a view
            <br />
            of where the world is going.
            <br />
            <em>Give it somewhere to live.</em>
          </h2>
        </section>
        <section id="how-it-works" className="studio-how">
          <div className="studio-how-heading" data-reveal>
            <span className="eyebrow">FROM AN IDEA TO AN INSTRUMENT</span>
            <h2>
              Make your
              <br />
              point of view
              <br />
              <em>tangible.</em>
            </h2>
            <p>
              A concept for portfolios that say
              <br />
              something about the future.
            </p>
          </div>
          <div className="studio-steps">
            {[
              {
                n: '01',
                title: 'Start with a belief.',
                desc: 'AI changes everything. Energy powers progress. Money becomes more open. What do you see?',
                icon: Eye,
              },
              {
                n: '02',
                title: 'Build the portfolio.',
                desc: 'Choose the supported assets that express your thesis. Set the mix and make the composition visible.',
                icon: Layers3,
              },
              {
                n: '03',
                title: 'Give others a way in.',
                desc: 'Package the portfolio as one token, with clear rules. Let others discover the idea and decide for themselves.',
                icon: Globe2,
              },
            ].map((s) => (
              <article key={s.n} data-reveal>
                <span className="step-n">{s.n}</span>
                <div>
                  <s.icon size={25} />
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section className="studio-beliefs" id="beliefs">
          <div className="section-heading" data-reveal>
            <div>
              <span className="eyebrow">MANY POSSIBLE FUTURES</span>
              <h2>
                What’s <em>your</em> belief?
              </h2>
            </div>
            <p>
              Three ideas to start the conversation.
              <br />
              Illustrative portfolios, ready to explore.
            </p>
          </div>
          <div className="studio-portfolio-grid">
            {beliefs.map((b) => (
              <div data-reveal key={b.id}>
                <PortfolioCard belief={b} onClick={() => setSelected(b)} />
              </div>
            ))}
          </div>
        </section>
        <section className="studio-principles" data-reveal>
          <div>
            <Compass />
            <h3>A thesis you can read.</h3>
            <p>Understand the idea behind the portfolio.</p>
          </div>
          <div>
            <Layers3 />
            <h3>A mix you can see.</h3>
            <p>Know what’s inside, before you decide.</p>
          </div>
          <div>
            <Sparkles />
            <h3>A view of your own.</h3>
            <p>Explore perspectives. Make your own call.</p>
          </div>
        </section>
        <section className="studio-last">
          <span className="eyebrow">THE NEXT CHAPTER IS YOURS.</span>
          <h2>
            The future needs
            <br />
            <em>more believers.</em>
          </h2>
          <ArrowButton className="white" onClick={() => setManifesto(true)}>
            Discover Belief Trade
          </ArrowButton>
          <img
            src={art('bibi')}
            alt=""
            width="270"
            height="270"
            loading="lazy"
          />
          <span className="studio-last-star" aria-hidden="true">
            ✳
          </span>
        </section>
      </main>
      <footer className="site-footer">
        <Logo />
        <p>
          Trade Belief.
          <br />
          <span>Early concept. No live trading.</span>
        </p>
        <Directions current="studio" />
      </footer>
      <BeliefModal belief={selected} close={() => setSelected(null)} />
      <Manifesto open={manifesto} close={() => setManifesto(false)} />
    </div>
  );
}

export function World() {
  useReveals();
  const [selected, setSelected] = useState<Belief | null>(null);
  const [manifesto, setManifesto] = useState(false);
  const [talk, setTalk] = useState(0);
  const sayings = [
    'Small bun. Big beliefs.',
    'A good adventure starts with “what if?”',
    'Your portfolio can have a point of view.',
    'Different futures. Room for everyone.',
  ];
  return (
    <div className="world">
      <a className="skip-link" href="#world-main">
        Skip to story
      </a>
      <header className="world-nav">
        <Logo />
        <nav>
          <a href="#welcome">The world</a>
          <a href="#world-beliefs">Belief board</a>
          <button onClick={() => setManifesto(true)}>
            Our story <ArrowUpRight size={16} />
          </button>
        </nav>
      </header>
      <main id="world-main">
        <section className="world-hero">
          <img
            className="world-landscape"
            src={art('world')}
            alt="Bibi’s floating garden: a treehouse, blossoms, mushrooms, and waterfalls in a bright blue sky"
            width="1536"
            height="1024"
            fetchPriority="high"
          />
          <div className="world-hero-copy">
            <span className="world-tag">A NEW WORLD FOR YOUR BIG IDEAS</span>
            <h1>Trade Belief.</h1>
            <p>
              The future is a big adventure.
              <br />
              Bring a little conviction.
            </p>
            <a className="pixel-button" href="#welcome">
              Start exploring <ArrowRight size={19} />
            </a>
          </div>
          <div className="world-location">
            <span className="status-dot" /> YOU ARE HERE: THE BEGINNING
          </div>
          <a
            className="world-scroll"
            href="#welcome"
            aria-label="Scroll to welcome"
          >
            <ChevronDown />
          </a>
          <button
            className="world-speech"
            onClick={() => setTalk((t) => (t + 1) % sayings.length)}
            aria-label="Talk to Bibi"
          >
            <span>{sayings[talk]}</span>
            <img
              src={art('bibi-pixel')}
              alt="Bibi waves hello"
              width="110"
              height="110"
            />
          </button>
        </section>
        <section id="welcome" className="world-welcome" data-reveal>
          <div className="pixel-label">✦ WELCOME, BELIEVER ✦</div>
          <h2>
            Every big world
            <br />
            starts with a little belief.
          </h2>
          <p>
            You see a future worth backing. A new technology. A better way to
            move money. A world with more possibility.
          </p>
          <p>
            Belief Trade imagines a place to turn that idea into a portfolio—and
            find the people who see it, too.
          </p>
          <span className="welcome-signature">
            Let’s see where your curiosity takes you. — Bibi
          </span>
        </section>
        <section className="world-quests">
          <div className="quest-header">
            <span className="pixel-label">YOUR FIRST ADVENTURE</span>
            <h2>
              Three small steps.
              <br />
              One big point of view.
            </h2>
          </div>
          <div className="quest-grid">
            {[
              {
                n: '01',
                icon: '✦',
                title: 'Find your belief',
                text: 'What could the world look like? Start with the idea you can’t stop thinking about.',
              },
              {
                n: '02',
                icon: '▦',
                title: 'Gather your mix',
                text: 'Choose the supported assets that bring your idea to life. Every piece has a reason.',
              },
              {
                n: '03',
                icon: '↗',
                title: 'Share your world',
                text: 'Give your portfolio a name and a token. Let fellow believers discover what’s inside.',
              },
            ].map((q) => (
              <article className="quest-card" data-reveal key={q.n}>
                <div className="quest-card-top">
                  <span>QUEST {q.n}</span>
                  <span aria-hidden="true">{q.icon}</span>
                </div>
                <h3>{q.title}</h3>
                <p>{q.text}</p>
                <span className="quest-reward">
                  <Check size={14} /> A little more possibility
                </span>
              </article>
            ))}
          </div>
        </section>
        <section className="world-market" id="world-beliefs">
          <div className="world-market-heading" data-reveal>
            <span className="pixel-label">THE BELIEF BOARD</span>
            <h2>
              Find your kind
              <br />
              of future.
            </h2>
            <p>
              A few sample worlds to explore.
              <br />
              No right answer. Just a point of view.
            </p>
          </div>
          <div className="world-market-grid">
            {beliefs.map((b, i) => (
              <button
                className={`world-belief world-belief-${i}`}
                key={b.id}
                onClick={() => setSelected(b)}
                data-reveal
              >
                <div className="world-belief-banner">
                  <span aria-hidden="true">{b.icon}</span>
                  <span>WORLD 0{i + 1}</span>
                  <span className="world-stamp">✦</span>
                </div>
                <div className="world-belief-body">
                  <span className="pixel-label">{b.tag}</span>
                  <h3>{b.name}</h3>
                  <p>{b.short}</p>
                  <div className="world-asset-chips">
                    {b.assets.map(([a]) => (
                      <span key={a}>{a}</span>
                    ))}
                  </div>
                  <div className="world-belief-bottom">
                    <span>Explore this belief</span>
                    <ArrowRight size={18} />
                  </div>
                </div>
              </button>
            ))}
          </div>
          <p className="world-example-note">
            These are illustrative portfolios. There are no live tokens or
            trades.
          </p>
        </section>
        <section className="world-bibi" data-reveal>
          <div className="bibi-profile">
            <img
              src={art('bibi-pixel')}
              alt="Bibi, a tiny rabbit adventurer carrying a leaf satchel"
              width="270"
              height="270"
            />
            <span className="pixel-label">BIBI / LEVEL 1 BELIEVER</span>
          </div>
          <div>
            <span className="pixel-label">YOUR GUIDE TO WHAT COULD BE</span>
            <h2>
              Small bun.
              <br />
              Big beliefs.
            </h2>
            <p>
              Bibi doesn’t have all the answers. Just a little curiosity, a big
              imagination, and a firm belief that the best adventures are better
              together.
            </p>
            <button className="pixel-button" onClick={() => setManifesto(true)}>
              Read our story <ArrowUpRight size={18} />
            </button>
          </div>
        </section>
        <section className="world-finale">
          <span className="pixel-label">EVERY FUTURE STARTS SOMEWHERE</span>
          <h2>
            Yours could
            <br />
            start here.
          </h2>
          <a className="pixel-button gold" href="#world-beliefs">
            Find a belief <ArrowRight size={18} />
          </a>
          <p>Trade Belief. ✦</p>
        </section>
      </main>
      <footer className="site-footer world-footer">
        <Logo />
        <p>
          A little world of possibility.
          <br />
          <span>Early concept. No live trading.</span>
        </p>
        <Directions current="world" />
      </footer>
      <BeliefModal belief={selected} close={() => setSelected(null)} />
      <Manifesto open={manifesto} close={() => setManifesto(false)} />
    </div>
  );
}
