import { useState } from 'react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import useReveal from '../hooks/useReveal';

const FILTERS = [
  { id: 'all',      label: 'All Products' },
  { id: 'skincare', label: 'Skincare' },
  { id: 'wellness', label: 'Wellness' },
  { id: 'body',     label: 'Body Care' },
];

const BADGE_LABELS = { bestseller: 'Best Seller', new: 'New', bundle: 'Bundle Deal' };

function ProductCard({ product, index, onAddToCart }) {
  const { state, addItem, updateQty, removeItem } = useCart();
  const cartItem = state.items[product.id];
  const inCart = !!cartItem;
  const qty = cartItem?.qty ?? 0;

  const handleAdd = () => {
    addItem(product);
    onAddToCart(product.name);
  };
  const handleInc = () => updateQty(product.id, qty + 1);
  const handleDec = () => (qty === 1 ? removeItem(product.id) : updateQty(product.id, qty - 1));

  return (
    <div
      className={`product-card${inCart ? ' in-cart' : ''}`}
      style={{ '--stagger-delay': `${index * 80}ms` }}
    >
      <div className="card-image" style={{ background: product.bg }}>
        <span className="card-category">{product.category}</span>
        {product.badges.length > 0 && (
          <div className="card-badges">
            {product.badges.map((b) => (
              <span key={b} className={`badge badge-${b}`}>{BADGE_LABELS[b]}</span>
            ))}
          </div>
        )}
        <img
          src={product.image}
          alt={product.name}
          className="card-product-img"
          loading="lazy"
        />
      </div>

      <h3
        className="card-name"
        style={{ background: product.bg }}
      >
        {product.name}
      </h3>

      <div className="card-footer">
        <span className="card-price">₦{product.price.toLocaleString('en-NG')}</span>
        <div className="card-action">
          <button className="btn-add" onClick={handleAdd}>
            Add to Cart
          </button>
          <div className="qty-control">
            <button className="qty-btn" onClick={handleDec}>−</button>
            <span className="qty-number">{qty}</span>
            <button className="qty-btn" onClick={handleInc}>+</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Products({ onAddToCart }) {
  const [active, setActive] = useState('all');
  const { ref: headRef, isVisible: headVisible } = useReveal();

  const filtered = active === 'all'
    ? products
    : products.filter((p) => p.category === active);

  return (
    <section className="products section" id="shop">
      <div className="container">
        <div ref={headRef} className={`products-heading reveal${headVisible ? ' is-visible' : ''}`}>
          <span className="section-label">Shop the Collection</span>
          <h2 className="section-heading">
            Every product, <em>personally chosen.</em>
          </h2>
        </div>

        <div className="filter-bar">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              className={`filter-btn${active === f.id ? ' active' : ''}`}
              onClick={() => setActive(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="products-grid" key={active}>
          {filtered.map((p, i) => (
            <ProductCard
              key={p.id}
              product={p}
              index={i}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
