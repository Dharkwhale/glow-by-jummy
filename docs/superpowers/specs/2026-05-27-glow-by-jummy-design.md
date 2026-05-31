# Glow by Jummy — Design Spec
**Date:** 2026-05-27  
**Project:** Single-page e-commerce site for a Nigerian Oriflame skincare consultant  
**Stack:** Vite + React (JavaScript only), plain global CSS, React Context + useReducer  

---

## 1. Overview

A premium, editorial-quality single-page e-commerce site for **Jummy**, a certified Oriflame skincare and wellness consultant based in Lagos, Nigeria. All purchases route to WhatsApp — no payment gateway. The aesthetic is luxury editorial: warm creams, deep browns, Cormorant Garamond display type in italic, generous whitespace, 0.5px borders, no gradients, no drop shadows except functional ones.

Three enhancement layers are applied on top of the base structure:
- **Layer A — Motion & Feel:** Scroll-triggered reveals, product card hover lift, shimmer on Add-to-Cart, staggered product grid, hero blob parallax, marquee pauses on hover
- **Layer B — Editorial Design:** Hero text overlapping right panel, full-bleed pull-quote strip, editorial product card tiles, featured testimonial spanning full width
- **Layer C — UX Polish:** Navbar cart total fade-in, Add-to-Cart morphing to inline qty selector, sticky floating cart bar, spring cart drawer, smooth scroll, WhatsApp pulse animation

---

## 2. Brand Tokens

```css
--cream: #FAF6F1
--warm-white: #FFFDF9
--blush: #E8C4B0
--blush-light: #F5E6DC
--blush-dark: #C9906E
--rose: #B5614A
--deep: #2A1F1A
--gold: #C9A96E
--green: #4A6741
```

Fonts: **Cormorant Garamond** (display, weights 400/600/700, italic) + **DM Sans** (body, weights 400/500) — loaded via Google Fonts in `index.html`.

---

## 3. File Structure

```
src/
  main.jsx
  App.jsx
  App.css                          ← all CSS vars, keyframes, global utilities
  hooks/
    useReveal.js                   ← IntersectionObserver scroll-reveal hook
    useParallax.js                 ← RAF-based parallax hook
  context/
    CartContext.jsx                ← CartProvider, useCart hook, WHATSAPP_NUMBER
  components/
    Navbar.jsx
    Hero.jsx
    Marquee.jsx
    About.jsx
    WhyOriflame.jsx
    PullQuote.jsx                  ← editorial pull-quote strip
    Products.jsx
    Testimonials.jsx
    FAQ.jsx
    CallToAction.jsx
    Footer.jsx
    CartDrawer.jsx
    StickyCartBar.jsx              ← floating bottom bar
    Toast.jsx
  data/
    products.js
docs/
  superpowers/specs/               ← this file
```

---

## 4. Cart State (CartContext)

**WHATSAPP_NUMBER constant** — defined once at top of `CartContext.jsx`:
```js
const WHATSAPP_NUMBER = '2348032132116';
```
All WhatsApp URLs across all components import and use this constant — zero hardcoded numbers anywhere else.

**State shape:**
```js
{ items: { [productId]: { ...product, qty } }, isOpen: Boolean }
```

**Reducer actions:** `ADD_ITEM`, `REMOVE_ITEM`, `UPDATE_QTY`, `CLEAR_CART`, `TOGGLE_CART`

**Context exports:**
```js
{
  state, dispatch,
  totalItems,       // sum of all qty
  totalAmount,      // sum of (price * qty)
  cartList,         // Object.values(items)
  addItem,          // pre-bound: dispatch({ type: 'ADD_ITEM', payload: product })
  removeItem,       // pre-bound: dispatch({ type: 'REMOVE_ITEM', payload: id })
  updateQty,        // pre-bound: dispatch({ type: 'UPDATE_QTY', payload: { id, qty } })
  clearCart,        // pre-bound
  toggleCart        // pre-bound
}
```
Components never call `dispatch` directly — they use the pre-bound wrappers.

**WhatsApp checkout message format:**
```
Hello Jummy! 🌿 I found your website and I'd like to place an order.

🛒 My Order:
  • {qty}x {product name} — ₦{subtotal}
  (repeat per item)

💰 Order Total: ₦{totalAmount}

Please confirm availability and send payment details. Thank you!
```
Encoded via `encodeURIComponent`, opened in new tab: `https://wa.me/${WHATSAPP_NUMBER}?text=ENCODED_MESSAGE`

---

## 5. Animation System (Layer A)

### CSS Keyframes (defined in App.css)

| Name | Purpose |
|---|---|
| `fadeUp` | Hero entrance — opacity 0→1, translateY 20px→0 |
| `shimmer` | Add-to-Cart hover — pseudo-element slides left→right |
| `marqueeScroll` | Marquee strip — infinite horizontal scroll |
| `pulse` | WhatsApp CTA button — scale 1→1.03→1, 2s loop |
| `slideUp` | Toast notification — translateY 100%→0 |
| `slideInRight` | Cart drawer — translateX 100%→0, spring cubic-bezier |
| `morphOpen` | Cart drawer backdrop — opacity 0→1 |

Cart drawer spring easing: `cubic-bezier(0.34, 1.56, 0.64, 1)`

### `useReveal(options)` hook

```js
// Returns: { ref, isVisible }
// Attaches IntersectionObserver to ref
// Adds 'is-visible' class when element enters viewport
// threshold: 0.12, triggerOnce: true (default)
```

All section content (headings, cards, paragraphs) uses this hook. Section headings reveal first; content reveals 150ms after (separate refs, slightly different thresholds).

Start state (CSS): `opacity: 0; transform: translateY(24px)`  
End state: `opacity: 1; transform: translateY(0)`  
Transition: `0.6s ease`

### Staggered Product Grid

Each card receives `--stagger-delay: calc(${index} * 80ms)` as an inline CSS variable. Card CSS: `transition-delay: var(--stagger-delay, 0ms)`. On category filter change, the grid container gets a new `key` prop (keyed to the active filter) — this remounts the grid and replays the stagger for new cards.

### Hero Parallax (`useParallax`)

```js
// Returns: { y }
// Passive scroll listener in useEffect
// y = window.scrollY * speed (default: 0.3)
// Listener cleaned up on unmount
```

Applied to the hero blob shape: `style={{ transform: \`translateY(\${y}px)\` }}`

### Marquee Pause on Hover

CSS only: `.marquee:hover .marquee-track { animation-play-state: paused; }`

---

## 6. Layer B — Editorial Design

### Hero Overlap

At `min-width: 1024px`: the left text column has `margin-right: -80px`, pushing the headline into the right decorative panel's space. Right panel has `overflow: visible; z-index: 0`. Text column has `z-index: 1; position: relative`. Collapses cleanly to single-column on mobile with no overlap.

### Pull-Quote Strip (`PullQuote.jsx`)

Positioned between `WhyOriflame` and `Products` sections in `App.jsx`.

```
Background: #2A1F1A (full bleed)
Padding: clamp(60px, 8vw, 100px) 0
Content: max-width 900px, centered

✦  (gold ornament, small)
"Swedish science. Nigerian skin. One result — your best glow yet."
✦  (gold ornament, small)

Typography: Cormorant Garamond italic, clamp(2.8rem, 5vw, 4.2rem), color: --rose
No border, no card, no background card — just type on dark ground
```

Scroll-reveal: the quote text uses `useReveal` — fades up as a single unit.

### Product Cards — Editorial Tile

```
┌────────────────────────────────────┐
│ [category]top-left abs    [badges] │  ← small caps --rose / pill badges top-right
│                                    │
│          {emoji} 5rem              │  ← centered vertically in image area
│                                    │
│  Product Name — Cormorant          │  ← absolute, bottom of image area
│  1.35rem, line-height 1.2          │     overlaps 12px into footer bar
├────────────────────────────────────┤
│  ₦12,500          [Add to Cart]    │  ← footer bar, 52px, flex space-between
└────────────────────────────────────┘
```

Add-to-Cart morphing (in footer bar):
- Footer bar holds two overlapping absolute children: `.btn-add` and `.qty-control`
- When `inCart` (item exists in CartContext): `.btn-add` → `opacity: 0; pointer-events: none`; `.qty-control` → `opacity: 1; pointer-events: auto`
- Qty control: `−  2  +` inline, DM Sans, pressing `−` at qty=1 calls `removeItem` → morph back
- Transition: `opacity 0.2s ease, transform 0.2s ease`

Hover lift: `transform: translateY(-6px); transition: transform 0.3s ease` on `.product-card:hover`

### Testimonials Layout

```
Row 1 (full width): Featured card — Adefunke T., Ikeja Lagos
  → Larger quote type (Cormorant Garamond 1.4rem italic), avatar left-aligned,
    star row, blush-light background, slightly more padding

Row 2 (2-column): Rukayat O. (Abuja) + Ngozi N. (Port Harcourt)
  → Standard card size
```

On mobile: all three stack to 1-column, featured card loses its size distinction.

---

## 7. Layer C — UX Polish

### Navbar Cart Total

```jsx
<button className={`cart-btn ${totalAmount > 0 ? 'has-items' : ''}`}>
  <BagIcon />
  Cart{totalAmount > 0 && <span className="cart-total">· ₦{totalAmount.toLocaleString()}</span>}
  {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
</button>
```

`.cart-total` transition: `max-width: 0 → 120px; opacity: 0 → 1` when `.has-items` is present. No layout shift.

### Sticky Floating Cart Bar (`StickyCartBar.jsx`)

```
Position: fixed, bottom: 0, left: 0, right: 0, z-index: 200
Visible when: totalItems > 0
Animation: translateY(100% → 0) on show, reverse on hide

Content: ✦ {totalItems} item{s} in your order  ·  View Cart — ₦{totalAmount} →
Background: --deep, accent text: --gold, full text: --warm-white
Desktop: max-width 480px, margin auto, border-radius 40px 40px 0 0
Mobile: full width, no border-radius
Click: calls toggleCart()
```

### Cart Drawer

Spring easing on slide-in: `cubic-bezier(0.34, 1.56, 0.64, 1)`, `duration: 0.5s`  
Width: 420px desktop, 100vw mobile  
`z-index: 400` (above StickyCartBar at 200 and all other fixed elements)  
Backdrop: `backdrop-filter: blur(4px)` + `background: rgba(42,31,26,0.5)`, closes on click

### Smooth Scroll

All nav links and CTA "Shop the Collection" / "Meet Jummy" buttons use:
```js
document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' })
```
Section IDs: `#shop`, `#about`, `#reviews`, `#faq`

### WhatsApp CTA Pulse

```css
@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.03); }
}
.whatsapp-btn { animation: pulse 2s ease-in-out infinite; }
```

---

## 8. Page Sections (order in App.jsx)

1. `<Navbar />` — fixed, 64px, blur backdrop, hamburger on mobile
2. `<Hero />` — editorial overlap layout, blob parallax, fadeUp entrance
3. `<Marquee />` — dark strip, pause on hover
4. `<About />` — two-column, styled "J." placeholder, quote card, badge pills
5. `<WhyOriflame />` — dark bg, 6 cards with faded number labels (01–06)
6. `<PullQuote />` — full-bleed dark strip, oversized italic rose quote
7. `<Products />` — category filter, staggered editorial tile grid
8. `<Testimonials />` — featured + 2-column layout
9. `<FAQ />` — accordion with rotating chevron
10. `<CallToAction />` — dark bg, pulse WhatsApp button
11. `<Footer />` — dark bg, small caps, gold WhatsApp link
12. `<CartDrawer />` — spring slide-in from right, overlay closes on click
13. `<StickyCartBar />` — fixed bottom, slides up when cart has items
14. `<Toast />` — fixed bottom-center, auto-dismisses 2.5s. Uses `bottom: 90px` always (clears StickyCartBar height) so they never overlap

---

## 9. Products Data

9 products across 3 categories: `skincare` (5), `wellness` (3), `body` (2).  
Filter bar: All / Skincare / Wellness / Body Care.  
Full data in `src/data/products.js`.

---

## 10. Responsiveness

| Breakpoint | Behavior |
|---|---|
| < 768px | All grids → 1 col; hide nav links; show hamburger; cart drawer full-width; hero single-col |
| 768px–1023px | Products → 2 col; testimonials → 1 col |
| ≥ 1024px | Full desktop layout; hero text overlap active |

Fluid typography: `clamp()` on all major headings per fluid design preference. Mobile text 2px smaller than desktop baseline.

---

## 11. Fluid Typography Scale

```css
h1: clamp(2.4rem, 5vw, 4rem)
h2: clamp(1.8rem, 3vw, 2.8rem)
pull-quote: clamp(2.8rem, 5vw, 4.2rem)
body: clamp(0.9rem, 1.5vw, 1rem)
```

---

## 12. Deploy

- Run locally: `npm install && npm run dev`
- Build: `npm run build`
- Deploy: drag `dist/` to vercel.com/new
- Update WhatsApp number: edit `WHATSAPP_NUMBER` in `src/context/CartContext.jsx`
