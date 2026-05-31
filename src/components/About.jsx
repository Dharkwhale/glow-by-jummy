import useReveal from '../hooks/useReveal';

export default function About() {
  const { ref: headRef, isVisible: headVisible } = useReveal();
  const { ref: contentRef, isVisible: contentVisible } = useReveal({ threshold: 0.08 });

  return (
    <section className="about section" id="about">
      <div className="container">
        <div
          ref={headRef}
          className={`about-heading reveal${headVisible ? ' is-visible' : ''}`}
        >
          <span className="section-label">About Jummy</span>
          <h2 className="section-heading">
            Skincare you can <em>trust,</em><br />from someone who truly cares.
          </h2>
        </div>

        <div
          ref={contentRef}
          className={`about-grid reveal${contentVisible ? ' is-visible' : ''}`}
          style={{ transitionDelay: '150ms' }}
        >
          {/* LEFT — image placeholder */}
          <div className="about-image-area">
            <div className="about-j">J.</div>
            <div className="about-quote-card">
              <p>"Every product I sell, I use personally. Your skin is safe with me."</p>
              <cite>— Jummy</cite>
            </div>
          </div>

          {/* RIGHT — bio text */}
          <div className="about-bio">
            <p>
              Hi, I'm Jummy — a certified Oriflame consultant based in Lagos, Nigeria. I've been passionate about skincare since my university days, when I struggled with uneven skin tone and couldn't find products that worked for my complexion.
            </p>
            <p>
              Oriflame changed everything for me. The science-backed formulas, the results I saw in my own skin, the safety for darker complexions — I became a consultant because I wanted to share that transformation with every Nigerian woman who deserves to glow.
            </p>
            <p>
              Every product I carry is 100% original, sourced directly from Oriflame. I offer free skincare consultations and I personally guide each customer to the right routine. This isn't just a business — it's a calling.
            </p>

            <div className="about-badges">
              {[
                'Certified Oriflame Consultant',
                'Lagos-Based',
                'Nationwide Delivery',
                'Personal Skincare Advice',
              ].map((b) => (
                <span key={b} className="about-badge">{b}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
