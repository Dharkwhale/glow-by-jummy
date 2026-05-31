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
