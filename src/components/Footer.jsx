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
