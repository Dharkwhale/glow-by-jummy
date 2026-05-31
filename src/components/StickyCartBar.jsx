import { useCart } from '../context/CartContext';

export default function StickyCartBar() {
  const { totalItems, totalAmount, toggleCart } = useCart();

  if (totalItems === 0) return null;

  return (
    <div className="sticky-bar" onClick={toggleCart}>
      <span className="sticky-bar-ornament">✦</span>
      <span className="sticky-bar-text">
        {totalItems} item{totalItems !== 1 ? 's' : ''} in your order
      </span>
      <span className="sticky-bar-divider">·</span>
      <span className="sticky-bar-cta">
        View Cart — ₦{totalAmount.toLocaleString('en-NG')} →
      </span>
    </div>
  );
}
