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
# glow-by-jummy
