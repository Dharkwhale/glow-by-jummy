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
