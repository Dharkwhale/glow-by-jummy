import { useState } from 'react';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalItems, totalAmount, toggleCart } = useCart();

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner container">
        <button className="navbar-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          Glow <em>by Jummy</em>
        </button>

        <ul className="navbar-links">
          {['shop', 'about', 'reviews', 'faq'].map((id) => (
            <li key={id}>
              <button onClick={() => scrollTo(id)}>
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </button>
            </li>
          ))}
        </ul>

        <div className="navbar-right">
          <button
            className={`cart-btn${totalAmount > 0 ? ' has-items' : ''}`}
            onClick={toggleCart}
            aria-label="Open cart"
          >
            <span className="cart-icon" aria-hidden="true">🛍</span>
            <span className="cart-label">Cart</span>
            {totalAmount > 0 && (
              <span className="cart-amount">· ₦{totalAmount.toLocaleString('en-NG')}</span>
            )}
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </button>

          <button
            className={`hamburger${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="mobile-nav">
          {['shop', 'about', 'reviews', 'faq'].map((id) => (
            <button key={id} onClick={() => scrollTo(id)}>
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
