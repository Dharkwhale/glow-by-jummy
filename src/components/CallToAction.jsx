import { WHATSAPP_NUMBER } from '../context/CartContext';
import useReveal from '../hooks/useReveal';

export default function CallToAction() {
  const { ref, isVisible } = useReveal({ threshold: 0.3 });
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi Jummy! I found your website and I'd love a free skincare consultation.")}`;

  return (
    <section className="cta section">
      <div
        ref={ref}
        className={`cta-inner container reveal${isVisible ? ' is-visible' : ''}`}
      >
        <span className="section-label" style={{ color: 'var(--gold)' }}>Get Started</span>
        <h2 className="cta-heading">
          Ready to glow?<br /><em>Jummy is waiting.</em>
        </h2>
        <p className="cta-sub">
          Message Jummy on WhatsApp for a free skincare consultation — no purchase required.
        </p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-whatsapp"
        >
          <span>💬</span> Chat with Jummy on WhatsApp
        </a>
      </div>
    </section>
  );
}
