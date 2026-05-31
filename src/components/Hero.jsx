import { WHATSAPP_NUMBER } from '../context/CartContext';
import useParallax from '../hooks/useParallax';

export default function Hero() {
  const blobRef = useParallax(0.3);

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="hero">
      <div className="hero-orb hero-orb-1" aria-hidden="true" />
      <div className="hero-orb hero-orb-2" aria-hidden="true" />
      <div className="hero-orb hero-orb-3" aria-hidden="true" />
      <div className="hero-inner container">
        {/* LEFT — editorial text column */}
        <div className="hero-text">
          <span className="hero-eyebrow">Premium Oriflame Skincare &amp; Wellness</span>
          <h1 className="hero-headline">
            Your skin deserves<br />to <em>truly glow.</em>
          </h1>
          <p className="hero-subtitle">
            Certified Oriflame products, personally curated and delivered by Jummy — your skincare consultant in Lagos. 100% original, always.
          </p>
          <div className="hero-ctas">
            <button className="btn-primary" onClick={() => scrollTo('shop')}>
              Shop the Collection
            </button>
            <button className="btn-outline" onClick={() => scrollTo('about')}>
              Meet Jummy
            </button>
          </div>
          <div className="hero-stats">
            {[
              { value: '200+', label: 'Happy Customers' },
              { value: '50+',  label: 'Products Curated' },
              { value: '100%', label: 'Original Oriflame' },
            ].map((s) => (
              <div key={s.label} className="hero-stat">
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — decorative blob panel */}
        <div className="hero-visual">
          <div className="hero-blob" ref={blobRef} />
          <div className="hero-floating-card">
            <span className="floating-card-dot" />
            <div>
              <p className="floating-card-label">Top seller this week</p>
              <p className="floating-card-name">Optimals Even Out Cream</p>
              <p className="floating-card-stock">✓ In stock</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
