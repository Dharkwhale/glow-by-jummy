import { useState } from 'react';
import useReveal from '../hooks/useReveal';

const FAQS = [
  {
    q: 'Are these products 100% original Oriflame?',
    a: "Absolutely. Jummy is a certified Oriflame consultant, which means every product is sourced directly from Oriflame's official supply chain. You'll receive authentic products with genuine batch codes you can verify on the Oriflame website.",
  },
  {
    q: 'How long does delivery take?',
    a: 'Lagos delivery typically takes 1–3 business days. Orders to other states (Abuja, Port Harcourt, Ibadan, etc.) usually take 3–5 business days via reliable courier. Jummy will confirm the exact timeline when you place your order on WhatsApp.',
  },
  {
    q: 'Are these products safe for dark skin?',
    a: "Yes! Oriflame formulates its products for all skin tones, including melanin-rich complexions. The Optimals range is specifically designed to address hyperpigmentation and uneven tone. Jummy personally uses every product she sells.",
  },
  {
    q: 'Why do I order via WhatsApp instead of paying online?',
    a: "WhatsApp ordering lets Jummy give you personal service — she confirms product availability in real time, answers your skincare questions, and guides you to the right products for your skin type. It's more personal than a checkout cart, and there's no card risk for you.",
  },
  {
    q: 'What is your returns policy?',
    a: "If your product arrives damaged or incorrect, Jummy will replace it at no cost. Because these are personal care products, opened items cannot be returned unless defective. Please contact Jummy within 48 hours of receiving your order with a photo of the issue.",
  },
  {
    q: 'Do you offer free skincare consultations?',
    a: "Yes! Jummy offers a free 15-minute WhatsApp consultation to help you find the right products for your skin type and concerns. Just message her and mention 'skincare consultation' — no purchase required.",
  },
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(null);
  const { ref, isVisible } = useReveal();

  const toggle = (i) => setOpenIdx((prev) => (prev === i ? null : i));

  return (
    <section className="faq section" id="faq">
      <div className="container">
        <div ref={ref} className={`faq-head reveal${isVisible ? ' is-visible' : ''}`}>
          <span className="section-label">FAQ</span>
          <h2 className="section-heading">
            Answers to your <em>questions.</em>
          </h2>
        </div>

        <div className="faq-list">
          {FAQS.map((item, i) => (
            <div key={i} className={`faq-item${openIdx === i ? ' open' : ''}`}>
              <button className="faq-question" onClick={() => toggle(i)}>
                <span>{item.q}</span>
                <svg className="faq-chevron" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              <div className="faq-answer">
                <p>{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
