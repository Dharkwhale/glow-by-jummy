import { createContext, useContext, useReducer, useEffect } from 'react';

export const WHATSAPP_NUMBER = '2348032132116';

const STORAGE_KEY = 'glow-by-jummy-cart';

function loadCartItems() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
}

const initialState = { items: loadCartItems(), isOpen: false };

export function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const p = action.payload;
      const existing = state.items[p.id];
      return {
        ...state,
        items: {
          ...state.items,
          [p.id]: existing ? { ...existing, qty: existing.qty + 1 } : { ...p, qty: 1 },
        },
      };
    }
    case 'REMOVE_ITEM': {
      const { [action.payload]: _removed, ...rest } = state.items;
      return { ...state, items: rest };
    }
    case 'UPDATE_QTY': {
      const { id, qty } = action.payload;
      if (qty < 1) return state;
      return { ...state, items: { ...state.items, [id]: { ...state.items[id], qty } } };
    }
    case 'CLEAR_CART':
      return { ...state, items: {} };
    case 'TOGGLE_CART':
      return { ...state, isOpen: !state.isOpen };
    default:
      return state;
  }
}

export function buildWhatsAppMessage(cartList, totalAmount) {
  const lines = cartList
    .map(item => `• ${item.qty}x ${item.name} — ₦${(item.price * item.qty).toLocaleString('en-NG')}`)
    .join('\n  ');
  return (
    `Hello Jummy! 🌿 I found your website and I'd like to place an order.\n\n` +
    `🛒 My Order:\n  ${lines}\n\n` +
    `💰 Order Total: ₦${totalAmount.toLocaleString('en-NG')}\n\n` +
    `Please confirm availability and send payment details. Thank you!`
  );
}

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items)); } catch {}
  }, [state.items]);

  const cartList = Object.values(state.items);
  const totalItems = cartList.reduce((sum, item) => sum + item.qty, 0);
  const totalAmount = cartList.reduce((sum, item) => sum + item.price * item.qty, 0);

  const addItem    = (product) => dispatch({ type: 'ADD_ITEM',    payload: product });
  const removeItem = (id)      => dispatch({ type: 'REMOVE_ITEM', payload: id });
  const updateQty  = (id, qty) => dispatch({ type: 'UPDATE_QTY',  payload: { id, qty } });
  const clearCart  = ()        => dispatch({ type: 'CLEAR_CART' });
  const toggleCart = ()        => dispatch({ type: 'TOGGLE_CART' });

  return (
    <CartContext.Provider
      value={{ state, dispatch, cartList, totalItems, totalAmount,
               addItem, removeItem, updateQty, clearCart, toggleCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
