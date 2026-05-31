const ITEMS = [
  '100% Original Oriflame Products',
  'Fast Delivery in Lagos & Beyond',
  'Swedish Quality Since 1967',
  'Dermatologist Tested',
  'Safe for All Skin Tones',
  'Order via WhatsApp',
];

export default function Marquee() {
  const text = ITEMS.join('  ·  ') + '  ·  ';
  return (
    <div className="marquee">
      <div className="marquee-track">
        <span>{text}</span>
        <span aria-hidden="true">{text}</span>
      </div>
    </div>
  );
}
