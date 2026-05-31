import useReveal from '../hooks/useReveal';

export default function PullQuote() {
  const { ref, isVisible } = useReveal({ threshold: 0.3 });
  return (
    <section className="pullquote">
      <div
        ref={ref}
        className={`pullquote-inner container reveal${isVisible ? ' is-visible' : ''}`}
      >
        <span className="pullquote-ornament">✦</span>
        <blockquote className="pullquote-text">
          "Swedish science. Nigerian skin. One result — your best glow yet."
        </blockquote>
        <span className="pullquote-ornament">✦</span>
      </div>
    </section>
  );
}
