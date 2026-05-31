import { useCart, WHATSAPP_NUMBER, buildWhatsAppMessage } from '../context/CartContext';

export default function CartDrawer() {
  const { state, cartList, totalAmount, updateQty, removeItem, clearCart, toggleCart } = useCart();

  const handleCheckout = () => {
    const msg = encodeURIComponent(buildWhatsAppMessage(cartList, totalAmount));
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
  };

  if (!state.isOpen) return null;

  return (
    <>
      <div className="drawer-backdrop" onClick={toggleCart} />
      <aside className="cart-drawer">
        <div className="drawer-header">
          <h2 className="drawer-title">Your Selection</h2>
          <div className="drawer-header-actions">
            <button className="drawer-close" onClick={toggleCart} aria-label="Close cart">✕</button>
          </div>
        </div>

        <div className="drawer-body">
          {cartList.length === 0 ? (
            <div className="drawer-empty">
              <span>✦</span>
              <p>Your cart is empty</p>
            </div>
          ) : (
            cartList.map((item) => (
              <div key={item.id} className="drawer-item">
                <img
                  src={item.image}
                  alt={item.name}
                  className="drawer-item-img"
                />
                <div className="drawer-item-info">
                  <p className="drawer-item-name">{item.name}</p>
                  <p className="drawer-item-cat">{item.category}</p>
                </div>
                <div className="drawer-item-qty">
                  <button
                    className="qty-btn"
                    onClick={() => item.qty === 1 ? removeItem(item.id) : updateQty(item.id, item.qty - 1)}
                  >−</button>
                  <span>{item.qty}</span>
                  <button className="qty-btn" onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                </div>
                <div className="drawer-item-right">
                  <span className="drawer-item-subtotal">
                    ₦{(item.price * item.qty).toLocaleString('en-NG')}
                  </span>
                  <button className="drawer-item-remove" onClick={() => removeItem(item.id)}>
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="drawer-footer">
          {cartList.length > 0 && (
            <button className="drawer-clear" onClick={clearCart}>Clear cart</button>
          )}
          <div className="drawer-total">
            <span>Order Total</span>
            <strong>₦{totalAmount.toLocaleString('en-NG')}</strong>
          </div>
          <p className="drawer-note">Review your order, then send it to Jummy on WhatsApp.</p>
          <button
            className="btn-checkout"
            onClick={handleCheckout}
            disabled={cartList.length === 0}
          >
            💬 Send Order to Jummy via WhatsApp
          </button>
          <p className="drawer-disclaimer">
            No card needed — Jummy handles everything personally
          </p>
        </div>
      </aside>
    </>
  );
}
