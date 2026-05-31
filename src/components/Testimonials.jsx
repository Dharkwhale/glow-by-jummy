import useReveal from '../hooks/useReveal';

const TESTIMONIALS = [
  {
    name: 'Adefunke T.',
    city: 'Ikeja, Lagos',
    quote: 'The Optimals Even Out cream genuinely transformed my skin in 3 weeks. Dark spots that had been there for years actually faded. Jummy also gave me great advice on my routine. Worth every kobo!',
    initials: 'AT',
    featured: true,
  },
  {
    name: 'Rukayat O.',
    city: 'Abuja',
    quote: "I was skeptical ordering skincare products online, but Jummy's service is exceptional. Products arrived in 4 days, properly packaged, and 100% original.",
    initials: 'RO',
    featured: false,
  },
  {
    name: 'Ngozi N.',
    city: 'Port Harcourt',
    quote: "The collagen booster is incredible. My skin has this glow that people keep asking about. I've been recommending Jummy to everyone in my office!",
    initials: 'NN',
    featured: false,
  },
];

function Stars({ n = 5 }) {
  return (
    <div className="stars" aria-label={`${n} stars`}>
      {Array.from({ length: n }).map((_, i) => (
        <span key={i}>★</span>
      ))}
    </div>
  );
}

function TestimonialCard({ t, featured }) {
  return (
    <div className={`testimonial-card${featured ? ' featured' : ''}`}>
      <Stars />
      <blockquote className="t-quote">"{t.quote}"</blockquote>
      <div className="t-author">
        <span className="t-avatar">{t.initials}</span>
        <div>
          <p className="t-name">{t.name}</p>
          <p className="t-city">{t.city}</p>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const { ref: headRef, isVisible: headVisible } = useReveal();
  const { ref: bodyRef, isVisible: bodyVisible } = useReveal({ threshold: 0.05 });
  const featured = TESTIMONIALS.find((t) => t.featured);
  const rest = TESTIMONIALS.filter((t) => !t.featured);

  return (
    <section className="testimonials section" id="reviews">
      <div className="container">
        <div ref={headRef} className={`reveal${headVisible ? ' is-visible' : ''}`}>
          <span className="section-label">What Customers Say</span>
          <h2 className="section-heading">
            Real skin. <em>Real results.</em>
          </h2>
        </div>

        <div
          ref={bodyRef}
          className={`t-layout reveal${bodyVisible ? ' is-visible' : ''}`}
          style={{ transitionDelay: '150ms' }}
        >
          <TestimonialCard t={featured} featured />
          <div className="t-row">
            {rest.map((t) => (
              <TestimonialCard key={t.name} t={t} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
