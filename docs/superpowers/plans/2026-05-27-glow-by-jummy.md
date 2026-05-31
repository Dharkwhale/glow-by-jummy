# Glow by Jummy — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a premium single-page e-commerce React site for Jummy (Nigerian Oriflame consultant) with editorial design, three animation layers (scroll reveals, editorial layout, UX polish), and WhatsApp-based checkout.

**Architecture:** Vite + React SPA. CartContext (useReducer) holds all cart state globally. All animations are CSS-driven, toggled by two custom hooks: `useReveal` (IntersectionObserver) for scroll reveals and `useParallax` (requestAnimationFrame) for the hero blob. No external animation or state libraries. Single global App.css for all styles.

**Tech Stack:** Vite 6, React 18, Vitest + jsdom (reducer/hook unit tests), plain CSS (global App.css), no TypeScript, no Tailwind.

---

### Task 1: Project Scaffold

**Files:**
- Create: `package.json`
- Create: `vite.config.js`
- Create: `index.html`
- Create: `src/main.jsx`
- Create: `src/__tests__/setup.js`
- Create: `.gitignore`

- [ ] **Step 1: Create package.json**

```json
{
  "name": "glow-by-jummy",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest run"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.4",
    "@testing-library/jest-dom": "^6.6.3",
    "@testing-library/react": "^16.0.0",
    "jsdom": "^25.0.1",
    "vite": "^6.3.5",
    "vitest": "^2.1.8"
  }
}
```

- [ ] **Step 2: Create vite.config.js**

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/__tests__/setup.js'],
  },
});
```

- [ ] **Step 3: Create index.html**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Glow by Jummy — Premium Oriflame Skincare</title>
    <meta name="description" content="Shop 100% original Oriflame skincare and wellness products with Jummy, your certified consultant in Lagos, Nigeria." />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=DM+Sans:wght@400;500&display=swap" rel="stylesheet" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- [ ] **Step 4: Create src/main.jsx**

```jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './App.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

- [ ] **Step 5: Create src/__tests__/setup.js**

```js
import '@testing-library/jest-dom';
```

- [ ] **Step 6: Create .gitignore**

```
node_modules/
dist/
.superpowers/
.env
```

- [ ] **Step 7: Install dependencies**

```bash
npm install
```

Expected: node_modules created, no errors.

- [ ] **Step 8: Verify dev server starts**

```bash
npm run dev
```

Expected: Server at http://localhost:5173 (or similar port). You'll see the default Vite+React page — that's fine. Ctrl+C to stop.

- [ ] **Step 9: Commit**

```bash
git add package.json vite.config.js index.html src/main.jsx src/__tests__/setup.js .gitignore
git commit -m "feat: scaffold Vite+React project with Vitest"
```

---

### Task 2: Global CSS — Design Tokens, Keyframes, Base Styles

**Files:**
- Create: `src/App.css`

- [ ] **Step 1: Create src/App.css**

```css
/* ============================================================
   DESIGN TOKENS
   ============================================================ */
:root {
  --cream: #FAF6F1;
  --warm-white: #FFFDF9;
  --blush: #E8C4B0;
  --blush-light: #F5E6DC;
  --blush-dark: #C9906E;
  --rose: #B5614A;
  --deep: #2A1F1A;
  --gold: #C9A96E;
  --green: #4A6741;
  --whatsapp: #25D366;

  --font-display: 'Cormorant Garamond', Georgia, serif;
  --font-body: 'DM Sans', system-ui, sans-serif;

  --navbar-height: 64px;
  --max-content: 1200px;
  --sticky-bar-height: 56px;
}

/* ============================================================
   RESET & BASE
   ============================================================ */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body {
  font-family: var(--font-body);
  background: var(--cream);
  color: var(--deep);
  line-height: 1.6;
  font-size: clamp(0.875rem, 1.5vw, 1rem);
  -webkit-font-smoothing: antialiased;
}
img { display: block; max-width: 100%; }
button { cursor: pointer; border: none; background: none; font-family: inherit; }
a { color: inherit; text-decoration: none; }
ul { list-style: none; }

/* ============================================================
   KEYFRAMES
   ============================================================ */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes shimmer {
  from { left: -100%; }
  to   { left: 200%; }
}

@keyframes marqueeScroll {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50%       { transform: scale(1.03); }
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(100%); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes slideInRight {
  from { transform: translateX(100%); }
  to   { transform: translateX(0); }
}

@keyframes morphOpen {
  from { opacity: 0; }
  to   { opacity: 1; }
}

@keyframes blobMorph {
  0%,100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
  25%      { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
  50%      { border-radius: 50% 60% 55% 47% / 47% 62% 38% 60%; }
  75%      { border-radius: 65% 35% 40% 60% / 40% 50% 60% 50%; }
}

/* ============================================================
   SCROLL REVEAL UTILITY
   ============================================================ */
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* ============================================================
   LAYOUT UTILITIES
   ============================================================ */
.container {
  max-width: var(--max-content);
  margin: 0 auto;
  padding: 0 clamp(16px, 5vw, 48px);
}
.section {
  padding: clamp(60px, 8vw, 120px) 0;
}
.section-label {
  display: block;
  font-family: var(--font-body);
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--blush-dark);
  margin-bottom: 12px;
}
.section-heading {
  font-family: var(--font-display);
  font-size: clamp(1.8rem, 3vw, 2.8rem);
  font-weight: 600;
  line-height: 1.15;
  color: var(--deep);
}
.section-heading em {
  font-style: italic;
  color: var(--rose);
}
```

- [ ] **Step 2: Create a minimal src/App.jsx placeholder (will be replaced in Task 21)**

```jsx
export default function App() {
  return <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>Glow by Jummy — building…</div>;
}
```

- [ ] **Step 3: Verify CSS loads**

Run `npm run dev`, open the browser. You should see the placeholder text with no console errors about missing fonts or styles.

- [ ] **Step 4: Commit**

```bash
git add src/App.css src/App.jsx
git commit -m "feat: add global CSS tokens, keyframes, and base styles"
```

---

### Task 3: Products Data

**Files:**
- Create: `src/data/products.js`

- [ ] **Step 1: Create src/data/products.js**

```js
export const products = [
  {
    id: 1,
    category: 'skincare',
    name: 'Optimals Even Out Day Cream',
    emoji: '🌿',
    price: 12500,
    desc: 'Targets hyperpigmentation and uneven skin tone. SPF 20. Lightweight formula perfect for Nigerian climate.',
    badges: ['bestseller'],
    bg: '#F5E6DC',
  },
  {
    id: 2,
    category: 'skincare',
    name: 'NovAge Intensives Bi-Phase Ampoules',
    emoji: '💧',
    price: 18900,
    desc: 'Two-phase serum with hyaluronic acid and retinol. Visible results in 7 days.',
    badges: ['new'],
    bg: '#E8F4F8',
  },
  {
    id: 3,
    category: 'skincare',
    name: 'Optimals Hydra Radiance Moisturiser',
    emoji: '✨',
    price: 9800,
    desc: '72-hour hydration. Hyaluronic acid complex keeps skin plump and dewy all day.',
    badges: ['bestseller'],
    bg: '#F0EBF8',
  },
  {
    id: 4,
    category: 'wellness',
    name: 'Wellness Multivitamin Complex',
    emoji: '💊',
    price: 14500,
    desc: '23 essential vitamins and minerals. Supports immunity, energy, and skin health from within.',
    badges: ['bestseller'],
    bg: '#FFFBE6',
  },
  {
    id: 5,
    category: 'wellness',
    name: 'Natural Balance Herbal Tea Collection',
    emoji: '🍃',
    price: 7200,
    desc: 'Swedish herbal tea blends for digestion, sleep, and detox. 20 individually wrapped teabags.',
    badges: [],
    bg: '#E8F5E9',
  },
  {
    id: 6,
    category: 'body',
    name: 'Love Nature Shea Body Lotion',
    emoji: '🫧',
    price: 6500,
    desc: 'Rich shea butter formula with botanical extracts. Deep moisture for 24 hours.',
    badges: [],
    bg: '#FFF3E0',
  },
  {
    id: 7,
    category: 'skincare',
    name: 'Ecollagen Wrinkle Power Night Cream',
    emoji: '🌙',
    price: 16200,
    desc: 'Overnight repair with marine collagen and bio-retinol. Wake up with firmer, smoother skin.',
    badges: ['new'],
    bg: '#EDE7F6',
  },
  {
    id: 8,
    category: 'body',
    name: 'Milk & Honey Gold Body Scrub',
    emoji: '🍯',
    price: 5800,
    desc: 'Exfoliating scrub with real milk and honey extracts. Polishes skin to a silky finish.',
    badges: ['bundle'],
    bg: '#FFF8E1',
  },
  {
    id: 9,
    category: 'wellness',
    name: 'Inner Glow Collagen Booster',
    emoji: '🌸',
    price: 22000,
    desc: 'Bioactive collagen peptides for skin elasticity, hair and nail strength. Results in 4–6 weeks.',
    badges: ['bestseller', 'new'],
    bg: '#FCE4EC',
  },
];
```

- [ ] **Step 2: Commit**

```bash
git add src/data/products.js
git commit -m "feat: add products data"
```

---

### Task 4: CartContext (TDD)

**Files:**
- Create: `src/__tests__/cartReducer.test.js`
- Create: `src/context/CartContext.jsx`

- [ ] **Step 1: Create src/__tests__/cartReducer.test.js**

```js
import { describe, it, expect } from 'vitest';
import { cartReducer } from '../context/CartContext';

const product = { id: 1, name: 'Test Cream', price: 10000, emoji: '🌿', category: 'skincare' };
const empty = { items: {}, isOpen: false };

describe('cartReducer', () => {
  it('ADD_ITEM inserts a new product with qty 1', () => {
    const next = cartReducer(empty, { type: 'ADD_ITEM', payload: product });
    expect(next.items[1]).toEqual({ ...product, qty: 1 });
  });

  it('ADD_ITEM increments qty for an existing product', () => {
    const withOne = { ...empty, items: { 1: { ...product, qty: 1 } } };
    const next = cartReducer(withOne, { type: 'ADD_ITEM', payload: product });
    expect(next.items[1].qty).toBe(2);
  });

  it('REMOVE_ITEM deletes the product entirely', () => {
    const withOne = { ...empty, items: { 1: { ...product, qty: 2 } } };
    const next = cartReducer(withOne, { type: 'REMOVE_ITEM', payload: 1 });
    expect(next.items[1]).toBeUndefined();
    expect(Object.keys(next.items)).toHaveLength(0);
  });

  it('UPDATE_QTY sets qty to the given value', () => {
    const withOne = { ...empty, items: { 1: { ...product, qty: 1 } } };
    const next = cartReducer(withOne, { type: 'UPDATE_QTY', payload: { id: 1, qty: 4 } });
    expect(next.items[1].qty).toBe(4);
  });

  it('UPDATE_QTY ignores qty less than 1', () => {
    const withTwo = { ...empty, items: { 1: { ...product, qty: 2 } } };
    const next = cartReducer(withTwo, { type: 'UPDATE_QTY', payload: { id: 1, qty: 0 } });
    expect(next.items[1].qty).toBe(2);
  });

  it('CLEAR_CART empties all items', () => {
    const withItems = { ...empty, items: { 1: { ...product, qty: 3 } } };
    const next = cartReducer(withItems, { type: 'CLEAR_CART' });
    expect(next.items).toEqual({});
  });

  it('TOGGLE_CART flips isOpen', () => {
    const opened = cartReducer(empty, { type: 'TOGGLE_CART' });
    expect(opened.isOpen).toBe(true);
    const closed = cartReducer(opened, { type: 'TOGGLE_CART' });
    expect(closed.isOpen).toBe(false);
  });
});
```

- [ ] **Step 2: Run test — expect all 7 to FAIL**

```bash
npm test
```

Expected: 7 test failures (cartReducer is not defined yet).

- [ ] **Step 3: Create src/context/CartContext.jsx**

```jsx
import { createContext, useContext, useReducer } from 'react';

export const WHATSAPP_NUMBER = '2348032132116';

const initialState = { items: {}, isOpen: false };

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
```

- [ ] **Step 4: Run tests — expect all 7 to PASS**

```bash
npm test
```

Expected: 7 passing.

- [ ] **Step 5: Commit**

```bash
git add src/__tests__/cartReducer.test.js src/context/CartContext.jsx
git commit -m "feat: CartContext with useReducer, pre-bound actions, WhatsApp message builder"
```

---

### Task 5: useReveal Hook (TDD)

**Files:**
- Create: `src/__tests__/useReveal.test.js`
- Create: `src/hooks/useReveal.js`

- [ ] **Step 1: Create src/__tests__/useReveal.test.js**

```js
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useReveal from '../hooks/useReveal';

let observerCallback;

beforeEach(() => {
  global.IntersectionObserver = class {
    constructor(cb) { observerCallback = cb; }
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

describe('useReveal', () => {
  it('starts not visible', () => {
    const { result } = renderHook(() => useReveal());
    expect(result.current.isVisible).toBe(false);
  });

  it('becomes visible when intersection fires with isIntersecting=true', () => {
    const { result } = renderHook(() => useReveal());
    act(() => {
      observerCallback([{ isIntersecting: true }]);
    });
    expect(result.current.isVisible).toBe(true);
  });

  it('stays visible after element leaves viewport (triggerOnce=true default)', () => {
    const { result } = renderHook(() => useReveal());
    act(() => { observerCallback([{ isIntersecting: true }]); });
    act(() => { observerCallback([{ isIntersecting: false }]); });
    expect(result.current.isVisible).toBe(true);
  });

  it('hides again when triggerOnce=false and element leaves viewport', () => {
    const { result } = renderHook(() => useReveal({ triggerOnce: false }));
    act(() => { observerCallback([{ isIntersecting: true }]); });
    act(() => { observerCallback([{ isIntersecting: false }]); });
    expect(result.current.isVisible).toBe(false);
  });
});
```

- [ ] **Step 2: Run test — expect FAIL**

```bash
npm test
```

Expected: 4 failures (useReveal not defined).

- [ ] **Step 3: Create src/hooks/useReveal.js**

```js
import { useEffect, useRef, useState } from 'react';

export default function useReveal({ threshold = 0.12, triggerOnce = true } = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) observer.unobserve(el);
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, triggerOnce]);

  return { ref, isVisible };
}
```

- [ ] **Step 4: Run tests — all PASS**

```bash
npm test
```

Expected: 11 passing (7 cart + 4 reveal).

- [ ] **Step 5: Commit**

```bash
git add src/__tests__/useReveal.test.js src/hooks/useReveal.js
git commit -m "feat: useReveal IntersectionObserver hook with tests"
```

---

### Task 6: useParallax Hook

**Files:**
- Create: `src/hooks/useParallax.js`

- [ ] **Step 1: Create src/hooks/useParallax.js**

```js
import { useEffect, useRef } from 'react';

export default function useParallax(speed = 0.3) {
  const elRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (elRef.current) {
        elRef.current.style.transform = `translateY(${window.scrollY * speed}px)`;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return elRef;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/hooks/useParallax.js
git commit -m "feat: useParallax RAF-free scroll hook"
```

---

### Task 7: Navbar Component

**Files:**
- Create: `src/components/Navbar.jsx`
- Modify: `src/App.css` (append navbar styles)

- [ ] **Step 1: Create src/components/Navbar.jsx**

```jsx
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
```

- [ ] **Step 2: Append navbar CSS to src/App.css**

```css
/* ============================================================
   NAVBAR
   ============================================================ */
.navbar {
  position: fixed;
  top: 0; left: 0; right: 0;
  height: var(--navbar-height);
  background: rgba(250, 246, 241, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 0.5px solid var(--blush);
  z-index: 100;
}
.navbar-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}
.navbar-logo {
  font-family: var(--font-display);
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--deep);
  letter-spacing: 0.01em;
}
.navbar-logo em {
  font-style: italic;
  color: var(--rose);
}
.navbar-links {
  display: flex;
  gap: 2rem;
}
.navbar-links button {
  font-family: var(--font-body);
  font-size: 0.825rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--deep);
  opacity: 0.7;
  transition: opacity 0.2s;
}
.navbar-links button:hover { opacity: 1; }
.navbar-right {
  display: flex;
  align-items: center;
  gap: 12px;
}
.cart-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.825rem;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--deep);
  padding: 8px 14px;
  border: 0.5px solid var(--blush);
  border-radius: 2px;
  transition: background 0.2s, border-color 0.2s;
  position: relative;
}
.cart-btn:hover { background: var(--blush-light); }
.cart-amount {
  max-width: 0;
  overflow: hidden;
  opacity: 0;
  white-space: nowrap;
  transition: max-width 0.4s ease, opacity 0.4s ease;
}
.cart-btn.has-items .cart-amount {
  max-width: 140px;
  opacity: 1;
}
.cart-badge {
  position: absolute;
  top: -6px; right: -6px;
  background: var(--rose);
  color: #fff;
  font-size: 0.65rem;
  font-weight: 500;
  min-width: 18px;
  height: 18px;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
}
.hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  padding: 4px;
}
.hamburger span {
  display: block;
  width: 22px;
  height: 1.5px;
  background: var(--deep);
  transition: transform 0.25s ease, opacity 0.25s ease;
}
.hamburger.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
.hamburger.open span:nth-child(2) { opacity: 0; }
.hamburger.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }
.mobile-nav {
  background: var(--cream);
  border-top: 0.5px solid var(--blush);
  padding: 20px clamp(16px, 5vw, 48px);
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.mobile-nav button {
  font-size: 1.1rem;
  font-family: var(--font-display);
  font-style: italic;
  color: var(--deep);
  text-align: left;
}

@media (max-width: 768px) {
  .navbar-links { display: none; }
  .hamburger { display: flex; }
}
```

- [ ] **Step 3: Wire Navbar into App.jsx temporarily**

Replace `src/App.jsx` content:

```jsx
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';

export default function App() {
  return (
    <CartProvider>
      <Navbar />
      <div style={{ paddingTop: '80px', padding: '80px 2rem 2rem', fontFamily: 'serif' }}>
        Building Glow by Jummy…
      </div>
    </CartProvider>
  );
}
```

- [ ] **Step 4: Visual verification**

Run `npm run dev`. Verify:
- Fixed navbar with logo, links, cart button
- Cart button shows "Cart", no badge
- At viewport &lt; 768px, links hide and hamburger appears
- Hamburger animates to X when clicked, mobile nav slides open

- [ ] **Step 5: Commit**

```bash
git add src/components/Navbar.jsx src/App.css src/App.jsx
git commit -m "feat: Navbar with cart button, cart total fade-in, and mobile hamburger"
```

---

### Task 8: Hero Component

**Files:**
- Create: `src/components/Hero.jsx`
- Modify: `src/App.css` (append hero styles)

- [ ] **Step 1: Create src/components/Hero.jsx**

```jsx
import { WHATSAPP_NUMBER } from '../context/CartContext';
import useParallax from '../hooks/useParallax';

export default function Hero() {
  const blobRef = useParallax(0.3);

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="hero">
      <div className="hero-inner container">
        {/* LEFT — editorial text column */}
        <div className="hero-text">
          <span className="hero-eyebrow">Premium Oriflame Skincare &amp; Wellness</span>
          <h1 className="hero-headline">
            Your skin deserves<br />to <em>truly glow.</em>
          </h1>
          <p className="hero-subtitle">
            Certified Oriflame products, personally curated and delivered by Jummy — your skincare consultant in Lagos. 100% original, always.
          </p>
          <div className="hero-ctas">
            <button className="btn-primary" onClick={() => scrollTo('shop')}>
              Shop the Collection
            </button>
            <button className="btn-outline" onClick={() => scrollTo('about')}>
              Meet Jummy
            </button>
          </div>
          <div className="hero-stats">
            {[
              { value: '200+', label: 'Happy Customers' },
              { value: '50+',  label: 'Products Curated' },
              { value: '100%', label: 'Original Oriflame' },
            ].map((s) => (
              <div key={s.label} className="hero-stat">
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — decorative blob panel */}
        <div className="hero-visual">
          <div className="hero-blob" ref={blobRef} />
          <div className="hero-floating-card">
            <span className="floating-card-dot" />
            <div>
              <p className="floating-card-label">Top seller this week</p>
              <p className="floating-card-name">Optimals Even Out Cream</p>
              <p className="floating-card-stock">✓ In stock</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Append hero CSS to src/App.css**

```css
/* ============================================================
   HERO
   ============================================================ */
.hero {
  padding-top: calc(var(--navbar-height) + clamp(60px, 8vw, 100px));
  padding-bottom: clamp(60px, 8vw, 100px);
  background: var(--cream);
  overflow: hidden;
}
.hero-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 48px;
}
.hero-text {
  position: relative;
  z-index: 1;
}
/* editorial overlap: text bleeds into right panel on wide screens */
@media (min-width: 1024px) {
  .hero-text { margin-right: -80px; }
}
.hero-eyebrow {
  display: block;
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--blush-dark);
  margin-bottom: 16px;
  animation: fadeUp 0.8s ease forwards 0.1s;
  opacity: 0;
}
.hero-headline {
  font-family: var(--font-display);
  font-size: clamp(2.4rem, 5vw, 4rem);
  font-weight: 700;
  line-height: 1.1;
  color: var(--deep);
  margin-bottom: 20px;
  animation: fadeUp 0.8s ease forwards 0.3s;
  opacity: 0;
}
.hero-headline em {
  font-style: italic;
  color: var(--rose);
}
.hero-subtitle {
  font-size: clamp(0.9rem, 1.5vw, 1.05rem);
  color: var(--deep);
  opacity: 0.75;
  max-width: 440px;
  margin-bottom: 32px;
  animation: fadeUp 0.8s ease forwards 0.5s;
  opacity: 0;
}
.hero-ctas {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 48px;
  animation: fadeUp 0.8s ease forwards 0.7s;
  opacity: 0;
}
.btn-primary {
  background: var(--deep);
  color: var(--cream);
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 14px 28px;
  border-radius: 2px;
  transition: background 0.2s;
}
.btn-primary:hover { background: var(--rose); }
.btn-outline {
  background: transparent;
  color: var(--deep);
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 14px 28px;
  border-radius: 2px;
  border: 0.5px solid var(--deep);
  transition: background 0.2s, color 0.2s;
}
.btn-outline:hover { background: var(--deep); color: var(--cream); }
.hero-stats {
  display: flex;
  gap: 32px;
  animation: fadeUp 0.8s ease forwards 0.9s;
  opacity: 0;
}
.hero-stat { display: flex; flex-direction: column; gap: 2px; }
.hero-stat strong {
  font-family: var(--font-display);
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--deep);
  line-height: 1;
}
.hero-stat span {
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--blush-dark);
}
/* right visual panel */
.hero-visual {
  position: relative;
  height: 480px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.hero-blob {
  width: 380px;
  height: 380px;
  background: var(--blush-light);
  border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
  animation: blobMorph 8s ease-in-out infinite;
  will-change: transform;
}
.hero-floating-card {
  position: absolute;
  bottom: 32px; left: -20px;
  background: var(--deep);
  color: var(--warm-white);
  padding: 16px 20px;
  border-radius: 2px;
  display: flex;
  gap: 12px;
  align-items: flex-start;
  min-width: 220px;
  animation: fadeUp 0.8s ease forwards 1.1s;
  opacity: 0;
}
.floating-card-dot {
  width: 8px; height: 8px;
  border-radius: 50%;
  background: var(--whatsapp);
  flex-shrink: 0;
  margin-top: 4px;
}
.floating-card-label {
  font-size: 0.65rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 2px;
}
.floating-card-name {
  font-family: var(--font-display);
  font-size: 0.95rem;
  font-weight: 600;
  line-height: 1.2;
}
.floating-card-stock {
  font-size: 0.7rem;
  color: var(--whatsapp);
  margin-top: 4px;
}
@media (max-width: 768px) {
  .hero-inner { grid-template-columns: 1fr; }
  .hero-visual { display: none; }
  .hero-text { margin-right: 0; }
}
```

- [ ] **Step 3: Add Hero to App.jsx**

```jsx
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';

export default function App() {
  return (
    <CartProvider>
      <Navbar />
      <main>
        <Hero />
      </main>
    </CartProvider>
  );
}
```

- [ ] **Step 4: Visual verification**

`npm run dev`. Verify:
- Two-column hero with morphing blob on right
- Headline staggered fadeUp animations play on load
- "truly glow." is italic rose
- At 1024px+, text overlaps slightly into blob panel
- At &lt;768px, single column, blob hidden

- [ ] **Step 5: Commit**

```bash
git add src/components/Hero.jsx src/App.css src/App.jsx
git commit -m "feat: Hero with editorial overlap, blob parallax, and staggered entrance"
```

---

### Task 9: Marquee Component

**Files:**
- Create: `src/components/Marquee.jsx`
- Modify: `src/App.css` (append marquee styles)

- [ ] **Step 1: Create src/components/Marquee.jsx**

```jsx
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
```

- [ ] **Step 2: Append marquee CSS to src/App.css**

```css
/* ============================================================
   MARQUEE
   ============================================================ */
.marquee {
  background: var(--deep);
  padding: 14px 0;
  overflow: hidden;
  user-select: none;
}
.marquee-track {
  display: flex;
  white-space: nowrap;
  animation: marqueeScroll 28s linear infinite;
}
.marquee:hover .marquee-track {
  animation-play-state: paused;
}
.marquee-track span {
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--blush-light);
  padding-right: 0;
}
```

- [ ] **Step 3: Add to App.jsx**

Add `import Marquee from './components/Marquee';` and `<Marquee />` after `<Hero />`.

- [ ] **Step 4: Visual verify — scrolling text on dark strip, pauses on hover**

- [ ] **Step 5: Commit**

```bash
git add src/components/Marquee.jsx src/App.css src/App.jsx
git commit -m "feat: Marquee strip with hover pause"
```

---

### Task 10: About Component

**Files:**
- Create: `src/components/About.jsx`
- Modify: `src/App.css`

- [ ] **Step 1: Create src/components/About.jsx**

```jsx
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
```

- [ ] **Step 2: Append about CSS to src/App.css**

```css
/* ============================================================
   ABOUT
   ============================================================ */
.about { background: var(--warm-white); }
.about-heading { margin-bottom: clamp(40px, 5vw, 64px); }
.about-heading .section-heading { margin-top: 8px; }
.about-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(32px, 5vw, 80px);
  align-items: start;
}
.about-image-area {
  position: relative;
  background: var(--blush-light);
  border-radius: 2px;
  min-height: 420px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: visible;
}
.about-j {
  font-family: var(--font-display);
  font-size: clamp(7rem, 15vw, 12rem);
  font-weight: 700;
  font-style: italic;
  color: var(--blush-dark);
  opacity: 0.35;
  line-height: 1;
  user-select: none;
}
.about-quote-card {
  position: absolute;
  bottom: -28px; right: -28px;
  background: var(--deep);
  color: var(--warm-white);
  padding: 24px 28px;
  border-radius: 2px;
  max-width: 280px;
}
.about-quote-card p {
  font-family: var(--font-display);
  font-style: italic;
  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: 10px;
}
.about-quote-card cite {
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--gold);
}
.about-bio {
  padding-top: 8px;
  padding-bottom: 40px;
}
.about-bio p {
  color: var(--deep);
  opacity: 0.8;
  line-height: 1.75;
  margin-bottom: 20px;
}
.about-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 32px;
}
.about-badge {
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--deep);
  border: 0.5px solid var(--blush-dark);
  border-radius: 2px;
  padding: 6px 12px;
}
@media (max-width: 768px) {
  .about-grid { grid-template-columns: 1fr; }
  .about-quote-card { position: static; margin-top: 16px; max-width: 100%; }
}
```

- [ ] **Step 3: Add `<About />` to App.jsx after Marquee**

- [ ] **Step 4: Visual verify — two-column layout, scroll reveal, "J." placeholder with floating quote card**

- [ ] **Step 5: Commit**

```bash
git add src/components/About.jsx src/App.css src/App.jsx
git commit -m "feat: About section with editorial J. placeholder and scroll reveal"
```

---

### Task 11: WhyOriflame Component

**Files:**
- Create: `src/components/WhyOriflame.jsx`
- Modify: `src/App.css`

- [ ] **Step 1: Create src/components/WhyOriflame.jsx**

```jsx
import useReveal from '../hooks/useReveal';

const REASONS = [
  { num: '01', title: 'Swedish Heritage', desc: 'Founded in 1967, Oriflame brings over 50 years of European skincare science to your routine.' },
  { num: '02', title: 'Clinically Tested Ingredients', desc: 'Every formula is dermatologist-tested with clinically proven active ingredients.' },
  { num: '03', title: 'Long-Lasting Value', desc: 'Premium quality at accessible prices — your investment stretches further with Oriflame.' },
  { num: '04', title: 'Safe for Dark Skin', desc: 'Formulated for all skin tones, including melanin-rich complexions common in Nigeria.' },
  { num: '05', title: '100% Original', desc: 'Jummy is a certified consultant — every product is sourced directly from Oriflame.' },
  { num: '06', title: 'Your Skin Is Worth It', desc: 'You deserve skincare that works. Not trends. Not promises. Science-backed results.' },
];

export default function WhyOriflame() {
  const { ref: headRef, isVisible: headVisible } = useReveal();
  const { ref: gridRef, isVisible: gridVisible } = useReveal({ threshold: 0.05 });

  return (
    <section className="why section">
      <div className="container">
        <div ref={headRef} className={`why-heading reveal${headVisible ? ' is-visible' : ''}`}>
          <span className="section-label">Why Oriflame</span>
          <h2 className="section-heading" style={{ color: 'var(--blush-light)' }}>
            Science-backed beauty.<br />Built for <em>you.</em>
          </h2>
        </div>

        <div
          ref={gridRef}
          className={`why-grid reveal${gridVisible ? ' is-visible' : ''}`}
          style={{ transitionDelay: '150ms' }}
        >
          {REASONS.map((r) => (
            <div key={r.num} className="why-card">
              <span className="why-number">{r.num}</span>
              <h3 className="why-title">{r.title}</h3>
              <p className="why-desc">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Append CSS to src/App.css**

```css
/* ============================================================
   WHY ORIFLAME
   ============================================================ */
.why {
  background: var(--deep);
  color: var(--warm-white);
}
.why-heading { margin-bottom: clamp(40px, 5vw, 64px); }
.why-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: rgba(201, 169, 110, 0.15);
  border: 0.5px solid rgba(201, 169, 110, 0.15);
}
.why-card {
  background: var(--deep);
  padding: clamp(28px, 4vw, 40px);
  transition: background 0.3s;
}
.why-card:hover { background: rgba(201, 169, 110, 0.06); }
.why-number {
  display: block;
  font-family: var(--font-display);
  font-size: 4rem;
  font-weight: 700;
  color: rgba(201, 169, 110, 0.15);
  line-height: 1;
  margin-bottom: -8px;
}
.why-title {
  font-family: var(--font-display);
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--warm-white);
  margin-bottom: 10px;
}
.why-desc {
  font-size: 0.875rem;
  color: rgba(255, 253, 249, 0.6);
  line-height: 1.7;
}
@media (max-width: 768px) {
  .why-grid { grid-template-columns: 1fr; }
}
@media (min-width: 769px) and (max-width: 1023px) {
  .why-grid { grid-template-columns: repeat(2, 1fr); }
}
```

- [ ] **Step 3: Add `<WhyOriflame />` to App.jsx after About**

- [ ] **Step 4: Visual verify — dark section, 6 faded-number cards in 3-column grid**

- [ ] **Step 5: Commit**

```bash
git add src/components/WhyOriflame.jsx src/App.css src/App.jsx
git commit -m "feat: WhyOriflame dark section with numbered cards"
```

---

### Task 12: PullQuote Component

**Files:**
- Create: `src/components/PullQuote.jsx`
- Modify: `src/App.css`

- [ ] **Step 1: Create src/components/PullQuote.jsx**

```jsx
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
```

- [ ] **Step 2: Append CSS to src/App.css**

```css
/* ============================================================
   PULL QUOTE
   ============================================================ */
.pullquote {
  background: var(--deep);
  padding: clamp(60px, 8vw, 100px) 0;
}
.pullquote-inner {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}
.pullquote-ornament {
  font-size: 1rem;
  color: var(--gold);
  opacity: 0.7;
}
.pullquote-text {
  font-family: var(--font-display);
  font-style: italic;
  font-size: clamp(2rem, 5vw, 4.2rem);
  font-weight: 600;
  color: var(--rose);
  line-height: 1.2;
  max-width: 900px;
  letter-spacing: -0.01em;
}
```

- [ ] **Step 3: Add `<PullQuote />` to App.jsx between WhyOriflame and Products**

- [ ] **Step 4: Visual verify — full-bleed dark strip with oversized rose italic quote**

- [ ] **Step 5: Commit**

```bash
git add src/components/PullQuote.jsx src/App.css src/App.jsx
git commit -m "feat: PullQuote editorial strip"
```

---

### Task 13: Products Component (most complex)

**Files:**
- Create: `src/components/Products.jsx`
- Modify: `src/App.css`

- [ ] **Step 1: Create src/components/Products.jsx**

```jsx
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
        <span className="card-emoji">{product.emoji}</span>
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
```

- [ ] **Step 2: Append products CSS to src/App.css**

```css
/* ============================================================
   PRODUCTS
   ============================================================ */
.products { background: var(--cream); }
.products-heading { margin-bottom: 40px; }

.filter-bar {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 40px;
}
.filter-btn {
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 8px 18px;
  border: 0.5px solid var(--blush);
  border-radius: 2px;
  color: var(--deep);
  transition: background 0.2s, border-color 0.2s;
}
.filter-btn:hover { background: var(--blush-light); }
.filter-btn.active {
  background: var(--deep);
  color: var(--cream);
  border-color: var(--deep);
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

/* ---- card ---- */
.product-card {
  background: var(--warm-white);
  border: 0.5px solid var(--blush);
  border-radius: 2px;
  overflow: visible;
  display: flex;
  flex-direction: column;
  transition:
    transform 0.3s ease var(--stagger-delay, 0ms),
    opacity 0.6s ease var(--stagger-delay, 0ms),
    box-shadow 0.3s ease;
  opacity: 0;
  transform: translateY(24px);
  animation: cardReveal 0.6s ease forwards;
  animation-delay: var(--stagger-delay, 0ms);
}
@keyframes cardReveal {
  to { opacity: 1; transform: translateY(0); }
}
.product-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 32px rgba(42, 31, 26, 0.1);
}

.card-image {
  position: relative;
  height: 220px;
  border-radius: 2px 2px 0 0;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.card-category {
  position: absolute;
  top: 12px; left: 12px;
  font-size: 0.62rem;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--rose);
}
.card-badges {
  position: absolute;
  top: 10px; right: 10px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: flex-end;
}
.badge {
  font-size: 0.6rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 3px 8px;
  border-radius: 2px;
}
.badge-bestseller { background: var(--deep); color: var(--gold); }
.badge-new        { background: var(--green); color: #fff; }
.badge-bundle     { background: var(--rose); color: #fff; }

.card-emoji {
  font-size: 5rem;
  line-height: 1;
  user-select: none;
}

.card-name {
  margin-top: -20px;
  padding: 8px 16px 6px;
  position: relative;
  z-index: 1;
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-weight: 600;
  line-height: 1.2;
  color: var(--deep);
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-top: 0.5px solid var(--blush);
  gap: 8px;
  margin-top: auto;
}
.card-price {
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--deep);
  white-space: nowrap;
}

/* morph: btn-add ↔ qty-control */
.card-action {
  position: relative;
  height: 34px;
  min-width: 120px;
}
.btn-add,
.qty-control {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s ease, transform 0.2s ease;
  border-radius: 2px;
}
.btn-add {
  background: var(--deep);
  color: var(--cream);
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  overflow: hidden;
  opacity: 1;
  transform: scale(1);
  pointer-events: auto;
}
.btn-add::after {
  content: '';
  position: absolute;
  top: 0; left: -100%;
  width: 60%;
  height: 100%;
  background: rgba(255,255,255,0.15);
  transform: skewX(-20deg);
  pointer-events: none;
}
.btn-add:hover::after {
  animation: shimmer 0.55s ease forwards;
}
.qty-control {
  background: var(--blush-light);
  gap: 12px;
  opacity: 0;
  transform: scale(0.85);
  pointer-events: none;
}
.qty-btn {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  color: var(--deep);
  border: 0.5px solid var(--blush-dark);
  border-radius: 2px;
  transition: background 0.15s;
}
.qty-btn:hover { background: var(--blush); }
.qty-number {
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 600;
  color: var(--deep);
  min-width: 20px;
  text-align: center;
}
/* in-cart state: swap btn ↔ qty */
.product-card.in-cart .btn-add {
  opacity: 0;
  transform: scale(0.85);
  pointer-events: none;
}
.product-card.in-cart .qty-control {
  opacity: 1;
  transform: scale(1);
  pointer-events: auto;
}

@media (max-width: 768px) {
  .products-grid { grid-template-columns: 1fr; }
}
@media (min-width: 769px) and (max-width: 1023px) {
  .products-grid { grid-template-columns: repeat(2, 1fr); }
}
```

- [ ] **Step 3: Add `<Products />` to App.jsx after PullQuote (with toast wiring)**

```jsx
// In App.jsx, add state and wire onAddToCart — will be finalized in Task 21.
// For now, pass a no-op:
<Products onAddToCart={() => {}} />
```

- [ ] **Step 4: Visual verify**

- Filter bar switches categories; grid restarts stagger animation on filter change
- Cards animate in with stagger on page load
- Hover: card lifts -6px with soft shadow
- Add to Cart button has shimmer on hover
- Clicking "Add to Cart" morphs button into ─ qty + control
- Pressing − at qty=1 morphs back to "Add to Cart"

- [ ] **Step 5: Commit**

```bash
git add src/components/Products.jsx src/App.css src/App.jsx
git commit -m "feat: Products with editorial tiles, filter bar, and morphing cart button"
```

---

### Task 14: Testimonials Component

**Files:**
- Create: `src/components/Testimonials.jsx`
- Modify: `src/App.css`

- [ ] **Step 1: Create src/components/Testimonials.jsx**

```jsx
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
```

- [ ] **Step 2: Append CSS to src/App.css**

```css
/* ============================================================
   TESTIMONIALS
   ============================================================ */
.testimonials { background: var(--blush-light); }
.t-layout { margin-top: clamp(40px, 5vw, 64px); display: flex; flex-direction: column; gap: 24px; }
.t-row { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }

.testimonial-card {
  background: var(--warm-white);
  border: 0.5px solid var(--blush);
  border-radius: 2px;
  padding: clamp(24px, 3vw, 36px);
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.testimonial-card.featured {
  padding: clamp(28px, 4vw, 48px);
}
.stars { color: var(--gold); font-size: 0.85rem; letter-spacing: 2px; }
.t-quote {
  font-family: var(--font-display);
  font-style: italic;
  font-size: 1.05rem;
  line-height: 1.65;
  color: var(--deep);
  flex: 1;
}
.testimonial-card.featured .t-quote { font-size: 1.3rem; }
.t-author { display: flex; align-items: center; gap: 12px; margin-top: auto; }
.t-avatar {
  width: 40px; height: 40px;
  border-radius: 50%;
  background: var(--blush-dark);
  color: var(--warm-white);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 0.9rem;
  flex-shrink: 0;
}
.testimonial-card.featured .t-avatar { width: 48px; height: 48px; font-size: 1rem; }
.t-name { font-weight: 500; font-size: 0.875rem; color: var(--deep); }
.t-city { font-size: 0.75rem; color: var(--blush-dark); letter-spacing: 0.06em; }

@media (max-width: 768px) {
  .t-row { grid-template-columns: 1fr; }
  .testimonial-card.featured .t-quote { font-size: 1.05rem; }
}
```

- [ ] **Step 3: Add `<Testimonials />` to App.jsx after Products**

- [ ] **Step 4: Visual verify — featured full-width card above 2-column row**

- [ ] **Step 5: Commit**

```bash
git add src/components/Testimonials.jsx src/App.css src/App.jsx
git commit -m "feat: Testimonials with featured card layout"
```

---

### Task 15: FAQ Component

**Files:**
- Create: `src/components/FAQ.jsx`
- Modify: `src/App.css`

- [ ] **Step 1: Create src/components/FAQ.jsx**

```jsx
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
```

- [ ] **Step 2: Append CSS to src/App.css**

```css
/* ============================================================
   FAQ
   ============================================================ */
.faq { background: var(--cream); }
.faq-head { margin-bottom: clamp(40px, 5vw, 56px); max-width: 680px; }
.faq-list { max-width: 680px; }

.faq-item {
  border-bottom: 0.5px solid var(--blush);
}
.faq-item:first-child { border-top: 0.5px solid var(--blush); }
.faq-question {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding: 20px 0;
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--deep);
  text-align: left;
  line-height: 1.5;
}
.faq-question:hover { color: var(--rose); }
.faq-chevron {
  flex-shrink: 0;
  color: var(--blush-dark);
  transition: transform 0.3s ease;
}
.faq-item.open .faq-chevron { transform: rotate(180deg); }
.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.35s ease;
}
.faq-item.open .faq-answer { max-height: 300px; }
.faq-answer p {
  padding-bottom: 20px;
  font-size: 0.9rem;
  color: var(--deep);
  opacity: 0.75;
  line-height: 1.75;
}
```

- [ ] **Step 3: Add `<FAQ />` to App.jsx after Testimonials**

- [ ] **Step 4: Visual verify — accordion expands/collapses with chevron rotation**

- [ ] **Step 5: Commit**

```bash
git add src/components/FAQ.jsx src/App.css src/App.jsx
git commit -m "feat: FAQ accordion with chevron animation"
```

---

### Task 16: CallToAction Component

**Files:**
- Create: `src/components/CallToAction.jsx`
- Modify: `src/App.css`

- [ ] **Step 1: Create src/components/CallToAction.jsx**

```jsx
import { WHATSAPP_NUMBER } from '../context/CartContext';
import useReveal from '../hooks/useReveal';

export default function CallToAction() {
  const { ref, isVisible } = useReveal({ threshold: 0.3 });
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi Jummy! I found your website and I'd love a free skincare consultation.")}`;

  return (
    <section className="cta section">
      <div
        ref={ref}
        className={`cta-inner container reveal${isVisible ? ' is-visible' : ''}`}
      >
        <span className="section-label" style={{ color: 'var(--gold)' }}>Get Started</span>
        <h2 className="cta-heading">
          Ready to glow?<br /><em>Jummy is waiting.</em>
        </h2>
        <p className="cta-sub">
          Message Jummy on WhatsApp for a free skincare consultation — no purchase required.
        </p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-whatsapp"
        >
          <span>💬</span> Chat with Jummy on WhatsApp
        </a>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Append CSS to src/App.css**

```css
/* ============================================================
   CALL TO ACTION
   ============================================================ */
.cta { background: var(--deep); text-align: center; }
.cta-inner { display: flex; flex-direction: column; align-items: center; gap: 24px; }
.cta-heading {
  font-family: var(--font-display);
  font-size: clamp(2.2rem, 4.5vw, 3.6rem);
  font-weight: 700;
  color: var(--warm-white);
  line-height: 1.15;
}
.cta-heading em { font-style: italic; color: var(--gold); }
.cta-sub {
  font-size: 0.95rem;
  color: rgba(255, 253, 249, 0.65);
  max-width: 440px;
  line-height: 1.7;
}
.btn-whatsapp {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: var(--whatsapp);
  color: #fff;
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.06em;
  padding: 16px 32px;
  border-radius: 2px;
  transition: opacity 0.2s;
  animation: pulse 2s ease-in-out infinite;
}
.btn-whatsapp:hover { opacity: 0.9; }
```

- [ ] **Step 3: Add `<CallToAction />` to App.jsx after FAQ**

- [ ] **Step 4: Visual verify — dark section, pulsing green WhatsApp button, link opens correct URL**

- [ ] **Step 5: Commit**

```bash
git add src/components/CallToAction.jsx src/App.css src/App.jsx
git commit -m "feat: CallToAction with pulsing WhatsApp button"
```

---

### Task 17: Footer Component

**Files:**
- Create: `src/components/Footer.jsx`
- Modify: `src/App.css`

- [ ] **Step 1: Create src/components/Footer.jsx**

```jsx
import { WHATSAPP_NUMBER } from '../context/CartContext';

export default function Footer() {
  const url = `https://wa.me/${WHATSAPP_NUMBER}`;
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <span>© 2025 Glow by Jummy · Certified Oriflame Consultant · Lagos, Nigeria</span>
        <a href={url} target="_blank" rel="noopener noreferrer" className="footer-wa">
          WhatsApp Jummy
        </a>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Append CSS to src/App.css**

```css
/* ============================================================
   FOOTER
   ============================================================ */
.footer {
  background: var(--deep);
  border-top: 0.5px solid rgba(201, 169, 110, 0.2);
  padding: 24px 0;
}
.footer-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  font-size: 0.68rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255, 253, 249, 0.45);
}
.footer-wa {
  color: var(--gold);
  transition: opacity 0.2s;
}
.footer-wa:hover { opacity: 0.7; }
```

- [ ] **Step 3: Add `<Footer />` to App.jsx after CallToAction**

- [ ] **Step 4: Visual verify — dark footer, small-caps text, gold WhatsApp link**

- [ ] **Step 5: Commit**

```bash
git add src/components/Footer.jsx src/App.css src/App.jsx
git commit -m "feat: Footer with gold WhatsApp link"
```

---

### Task 18: CartDrawer Component

**Files:**
- Create: `src/components/CartDrawer.jsx`
- Modify: `src/App.css`

- [ ] **Step 1: Create src/components/CartDrawer.jsx**

```jsx
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
          <button className="drawer-close" onClick={toggleCart} aria-label="Close cart">✕</button>
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
                <span className="drawer-item-emoji">{item.emoji}</span>
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
```

- [ ] **Step 2: Append CSS to src/App.css**

```css
/* ============================================================
   CART DRAWER
   ============================================================ */
.drawer-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(42, 31, 26, 0.5);
  backdrop-filter: blur(4px);
  z-index: 300;
  animation: morphOpen 0.3s ease forwards;
}
.cart-drawer {
  position: fixed;
  top: 0; right: 0; bottom: 0;
  width: 420px;
  background: var(--warm-white);
  z-index: 400;
  display: flex;
  flex-direction: column;
  animation: slideInRight 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}
.drawer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 28px;
  border-bottom: 0.5px solid var(--blush);
  flex-shrink: 0;
}
.drawer-title {
  font-family: var(--font-display);
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--deep);
}
.drawer-close {
  font-size: 1rem;
  color: var(--deep);
  opacity: 0.5;
  padding: 4px;
  transition: opacity 0.2s;
}
.drawer-close:hover { opacity: 1; }
.drawer-body {
  flex: 1;
  overflow-y: auto;
  padding: 8px 0;
}
.drawer-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 12px;
  color: var(--blush-dark);
}
.drawer-empty span { font-size: 1.4rem; color: var(--gold); opacity: 0.5; }
.drawer-empty p {
  font-family: var(--font-display);
  font-style: italic;
  font-size: 1.1rem;
}
.drawer-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 28px;
  border-bottom: 0.5px solid var(--blush-light);
}
.drawer-item-emoji { font-size: 2rem; flex-shrink: 0; }
.drawer-item-info { flex: 1; min-width: 0; }
.drawer-item-name {
  font-family: var(--font-display);
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--deep);
  line-height: 1.2;
}
.drawer-item-cat {
  font-size: 0.68rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--blush-dark);
  margin-top: 2px;
}
.drawer-item-qty {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-display);
  font-size: 1rem;
  color: var(--deep);
  flex-shrink: 0;
}
.drawer-item-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
  flex-shrink: 0;
}
.drawer-item-subtotal {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 0.95rem;
  color: var(--deep);
  white-space: nowrap;
}
.drawer-item-remove {
  font-size: 0.68rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--rose);
  opacity: 0.7;
  transition: opacity 0.2s;
}
.drawer-item-remove:hover { opacity: 1; }
.drawer-footer {
  border-top: 0.5px solid var(--blush);
  padding: 24px 28px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  flex-shrink: 0;
}
.drawer-total {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}
.drawer-total span {
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--blush-dark);
}
.drawer-total strong {
  font-family: var(--font-display);
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--deep);
}
.drawer-note {
  font-size: 0.8rem;
  color: var(--deep);
  opacity: 0.6;
  line-height: 1.5;
}
.btn-checkout {
  background: var(--whatsapp);
  color: #fff;
  font-size: 0.82rem;
  font-weight: 500;
  letter-spacing: 0.06em;
  padding: 16px;
  border-radius: 2px;
  transition: opacity 0.2s;
}
.btn-checkout:hover:not(:disabled) { opacity: 0.9; }
.btn-checkout:disabled { opacity: 0.35; cursor: not-allowed; }
.drawer-disclaimer {
  font-size: 0.7rem;
  text-align: center;
  color: var(--deep);
  opacity: 0.45;
}
@media (max-width: 768px) {
  .cart-drawer { width: 100vw; }
}
```

- [ ] **Step 3: Add `<CartDrawer />` to App.jsx (outside `<main>`, inside CartProvider)**

- [ ] **Step 4: Visual verify**

- Click cart button → drawer slides in with spring bounce
- Dark overlay backdrop closes on click
- Add products then open drawer → items shown with qty controls
- WhatsApp checkout builds correct message, opens `wa.me/2348032132116`

- [ ] **Step 5: Commit**

```bash
git add src/components/CartDrawer.jsx src/App.css src/App.jsx
git commit -m "feat: CartDrawer with spring animation and WhatsApp checkout"
```

---

### Task 19: StickyCartBar Component

**Files:**
- Create: `src/components/StickyCartBar.jsx`
- Modify: `src/App.css`

- [ ] **Step 1: Create src/components/StickyCartBar.jsx**

```jsx
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
```

- [ ] **Step 2: Append CSS to src/App.css**

```css
/* ============================================================
   STICKY CART BAR
   ============================================================ */
.sticky-bar {
  position: fixed;
  bottom: 0; left: 0; right: 0;
  z-index: 200;
  background: var(--deep);
  color: var(--warm-white);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 0 24px;
  height: var(--sticky-bar-height);
  cursor: pointer;
  animation: slideUp 0.4s cubic-bezier(0.34, 1.2, 0.64, 1) forwards;
  transition: opacity 0.2s;
  max-width: 480px;
  margin: 0 auto;
  border-radius: 40px 40px 0 0;
}
.sticky-bar:hover { opacity: 0.92; }
.sticky-bar-ornament { color: var(--gold); font-size: 0.8rem; }
.sticky-bar-text { font-size: 0.8rem; font-weight: 500; }
.sticky-bar-divider { opacity: 0.35; }
.sticky-bar-cta {
  font-family: var(--font-display);
  font-size: 0.95rem;
  font-style: italic;
  color: var(--gold);
}
@media (max-width: 768px) {
  .sticky-bar {
    max-width: 100%;
    border-radius: 0;
    left: 0; right: 0;
  }
}
```

- [ ] **Step 3: Add `<StickyCartBar />` to App.jsx (outside `<main>`, inside CartProvider)**

- [ ] **Step 4: Visual verify**

Add a product to cart. Bar slides up from bottom. Clicking it opens the cart drawer.

- [ ] **Step 5: Commit**

```bash
git add src/components/StickyCartBar.jsx src/App.css src/App.jsx
git commit -m "feat: StickyCartBar slides up from bottom when cart has items"
```

---

### Task 20: Toast Component

**Files:**
- Create: `src/components/Toast.jsx`
- Modify: `src/App.css`

- [ ] **Step 1: Create src/components/Toast.jsx**

```jsx
export default function Toast({ message }) {
  return (
    <div className="toast" role="status" aria-live="polite">
      <span className="toast-dot">●</span>
      <span>{message}</span>
    </div>
  );
}
```

- [ ] **Step 2: Append CSS to src/App.css**

```css
/* ============================================================
   TOAST
   ============================================================ */
.toast {
  position: fixed;
  bottom: 90px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 500;
  background: var(--deep);
  color: var(--warm-white);
  padding: 12px 20px;
  border-radius: 40px;
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0.04em;
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
  animation: slideUp 0.35s cubic-bezier(0.34, 1.2, 0.64, 1) forwards;
  pointer-events: none;
}
.toast-dot { color: var(--whatsapp); font-size: 0.6rem; }
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Toast.jsx src/App.css
git commit -m "feat: Toast notification pill component"
```

---

### Task 21: Final App.jsx Wiring

**Files:**
- Modify: `src/App.jsx` (complete rewrite)

- [ ] **Step 1: Replace src/App.jsx with final version**

```jsx
import { useState } from 'react';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import About from './components/About';
import WhyOriflame from './components/WhyOriflame';
import PullQuote from './components/PullQuote';
import Products from './components/Products';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import StickyCartBar from './components/StickyCartBar';
import Toast from './components/Toast';

function AppContent() {
  const [toast, setToast] = useState(null);

  const showToast = (productName) => {
    setToast(productName);
    setTimeout(() => setToast(null), 2500);
  };

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <WhyOriflame />
        <PullQuote />
        <Products onAddToCart={showToast} />
        <Testimonials />
        <FAQ />
        <CallToAction />
        <Footer />
      </main>
      <CartDrawer />
      <StickyCartBar />
      {toast && <Toast message={`${toast} added to cart`} />}
    </>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
```

- [ ] **Step 2: Full end-to-end visual verification**

Run `npm run dev` and check every section:

1. **Navbar** — sticky, blur backdrop, cart total animates in after first add
2. **Hero** — staggered text entrance, blob morphs and parallaxes on scroll
3. **Marquee** — scrolls, pauses on hover
4. **About** — scroll reveal, "J." placeholder, floating quote card
5. **WhyOriflame** — dark section, 6 numbered cards
6. **PullQuote** — full-bleed dark strip, oversized rose quote
7. **Products** — filter bar switches categories with stagger replay, morph button works, shimmer on hover, toast appears bottom-center
8. **Testimonials** — featured card top, 2-column below
9. **FAQ** — accordion, chevron rotates
10. **CallToAction** — pulsing green button, link opens WhatsApp
11. **Footer** — small caps, gold link
12. **CartDrawer** — spring bounce, overlay closes on click, WhatsApp checkout
13. **StickyCartBar** — slides up after first add, opens drawer on click
14. **Toast** — appears bottom-center (above sticky bar), auto-dismisses

- [ ] **Step 3: Run tests one final time**

```bash
npm test
```

Expected: All 11 tests passing.

- [ ] **Step 4: Commit**

```bash
git add src/App.jsx
git commit -m "feat: wire all components in App.jsx with toast state"
```

---

### Task 22: README and Production Build

**Files:**
- Create: `README.md`

- [ ] **Step 1: Create README.md**

```markdown
# Glow by Jummy

Premium single-page e-commerce site for Jummy, a certified Oriflame skincare and wellness consultant based in Lagos, Nigeria.

## Running Locally

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Production Build

```bash
npm run build
```

Output is in `dist/`. Preview with `npm run preview`.

## Deploy to Vercel

Drag the `dist/` folder to [vercel.com/new](https://vercel.com/new) — no configuration needed.

Alternatively, connect your GitHub repo to Vercel and it will auto-deploy on push.

## Update WhatsApp Number

Edit the `WHATSAPP_NUMBER` constant in `src/context/CartContext.jsx`:

```js
export const WHATSAPP_NUMBER = '2348032132116';
```

Replace with Jummy's current number (digits only, no +, no spaces).

## Run Tests

```bash
npm test
```
```

- [ ] **Step 2: Verify production build succeeds**

```bash
npm run build
```

Expected: `dist/` folder created, no build errors.

- [ ] **Step 3: Final commit**

```bash
git add README.md
git commit -m "docs: add README with local dev, build, and deploy instructions"
```

---

## Self-Review Checklist

- [x] **Spec §4 CartContext** — covered in Task 4 (reducer, all actions, pre-bound wrappers, buildWhatsAppMessage exported)
- [x] **Spec §5 Animation System** — Task 5 (useReveal), Task 6 (useParallax), Task 2 (all keyframes in App.css)
- [x] **Spec §6 Hero overlap** — Task 8 (`margin-right: -80px` at 1024px+)
- [x] **Spec §6 PullQuote** — Task 12 (full component)
- [x] **Spec §6 Editorial tiles** — Task 13 (card-name overlaps card-image with negative margin)
- [x] **Spec §6 Featured testimonial** — Task 14
- [x] **Spec §7 Navbar cart total** — Task 7 (`.cart-amount` max-width transition)
- [x] **Spec §7 Morphing button** — Task 13 (`.card-action` with overlapping absolute children)
- [x] **Spec §7 StickyCartBar** — Task 19
- [x] **Spec §7 Spring cart drawer** — Task 18 (`cubic-bezier(0.34, 1.56, 0.64, 1)`)
- [x] **Spec §7 Smooth scroll** — Tasks 7, 8 (`scrollIntoView({ behavior: 'smooth' })`)
- [x] **Spec §7 WhatsApp pulse** — Task 16 (`.btn-whatsapp { animation: pulse ... }`)
- [x] **Toast above StickyCartBar** — Task 20 (`bottom: 90px` clears the 56px bar)
- [x] **Cart drawer z-index 400 > StickyCartBar z-index 200** — Tasks 18, 19
- [x] **WHATSAPP_NUMBER single source of truth** — CartContext.jsx, imported everywhere
- [x] **Fluid typography (clamp)** — All headings use clamp() per memory preference
- [x] **Hamburger menu functional** — Task 7 (mobile nav toggles open/closed)
- [x] **Marquee pause on hover** — Task 9 (CSS `animation-play-state: paused`)
- [x] **Stagger replay on filter change** — Task 13 (`key={active}` on products grid)
