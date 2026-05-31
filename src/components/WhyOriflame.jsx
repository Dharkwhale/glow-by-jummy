import useReveal from '../hooks/useReveal';

const REASONS = [
  { num: '01', title: 'Swedish Heritage', desc: 'Founded in 1967, Oriflame brings over 50 years of European skincare science to your routine.' },
  { num: '02', title: 'Clinically Tested Ingredients', desc: 'Every formula is dermatologist-tested with clinically proven active ingredients.' },
  { num: '03', title: 'Long-Lasting Value', desc: 'Premium quality at accessible prices — your investment stretches further with Oriflame.' },
  { num: '04', title: 'Safe for Dark Skin', desc: 'Formulated for all skin tones, including melanin-rich complexions common in Nigeria.' },
  { num: '05', title: '100% Original', desc: 'Jummy is a certified consultant — every product is sourced directly from Oriflame.' },
  { num: '06', title: 'Your Skin Is Worth It', desc: 'You deserve skincare that works. Not trends. Not promises. Science-backed results.' },
];

export default function WhyOriflame() {
  const { ref: headRef, isVisible: headVisible } = useReveal();
  const { ref: gridRef, isVisible: gridVisible } = useReveal({ threshold: 0.05 });

  return (
    <section className="why section">
      <div className="container">
        <div ref={headRef} className={`why-heading reveal${headVisible ? ' is-visible' : ''}`}>
          <span className="section-label">Why Oriflame</span>
          <h2 className="section-heading" style={{ color: 'var(--blush-light)' }}>
            Science-backed beauty.<br />Built for <em>you.</em>
          </h2>
        </div>

        <div
          ref={gridRef}
          className={`why-grid reveal${gridVisible ? ' is-visible' : ''}`}
          style={{ transitionDelay: '150ms' }}
        >
          {REASONS.map((r) => (
            <div key={r.num} className="why-card">
              <span className="why-number">{r.num}</span>
              <h3 className="why-title">{r.title}</h3>
              <p className="why-desc">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
