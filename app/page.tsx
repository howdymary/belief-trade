const concepts = [
  {
    slug: 'editorial',
    n: '01',
    name: 'A different point of view.',
    type: 'The editorial journey',
    text: 'Oversized type. Electric green. A story that moves sideways.',
  },
  {
    slug: 'studio',
    n: '02',
    name: 'A little more conviction.',
    type: 'The quiet, confident one',
    text: 'Clear blue. Generous space. One beautifully simple idea.',
  },
  {
    slug: 'world',
    n: '03',
    name: 'Big beliefs. Small world.',
    type: 'The nostalgic adventure',
    text: 'A cozy corner of the internet for the worlds we believe in.',
  },
  {
    slug: 'bloom',
    n: '04',
    name: 'The future starts with belief.',
    type: 'A belief takes root',
    text: 'From complete darkness, a garden grows with every scroll.',
  },
  {
    slug: 'mono',
    n: '05',
    name: 'CONVICTION BEFORE CONSENSUS.',
    type: 'The monochrome study',
    text: 'Black. White. A horizontal journey through belief.',
  },
];
export default function Home() {
  return (
    <main className="gallery">
      <header className="gallery-nav">
        <a className="wordmark" href="/belief-trade/">
          belief<span>trade</span>
          <i>✳</i>
        </a>
        <span className="eyebrow">A WORLD BUILT ON CONVICTION</span>
        <a href="#directions">Explore the directions ↗</a>
      </header>
      <section className="gallery-intro">
        <span className="eyebrow">BELIEF TRADE / DESIGN EXPLORATIONS</span>
        <h1>
          One belief.
          <br />
          <em>Five worlds.</em>
        </h1>
        <div className="intro-bottom">
          <p>
            The future starts as someone’s belief.
            <br />
            Make yours a portfolio the world can follow.
          </p>
          <span>Trade Belief. ↘</span>
        </div>
      </section>
      <section id="directions" className="concept-grid">
        {concepts.map((c) => (
          <a
            className={'concept cover-' + c.slug}
            href={'/belief-trade/' + c.slug + '/'}
            key={c.slug}
          >
            <span className="eyebrow">
              {c.n} / {c.type}
            </span>
            <h2>{c.name}</h2>
            <div className="concept-bottom">
              <p>{c.text}</p>
              <span className="round-arrow">↗</span>
            </div>
          </a>
        ))}
      </section>
      <footer className="gallery-footer">
        <span>Belief Trade © 2026</span>
        <span>Interactive brand concepts. No live trading.</span>
        <a href="/belief-trade/design-prompt.md">The design brief ↗</a>
      </footer>
    </main>
  );
}
