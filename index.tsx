
import React from 'react';
import { createRoot } from 'react-dom/client';
import { 
  Truck, 
  ShieldCheck, 
  Sparkles,
  Heart, 
  CheckCircle2,
  Shield,
  MessageCircle,
  ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';

const COLORS = {
  primary: '#FF1493', // Deep Pink
  secondary: '#F06292', // Lighter Pink
  text: '#4A0E2E', // Deep Berry
  body: '#701D44', // Mid Berry
  background: '#FFF0F5', // Lavender Blush
  complement: '#E8F5E9', // Mint Green (Compliment)
  white: '#FFFFFF',
  border: '#F8BBD0', // Soft Pink Border
};

const FloatingHearts = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {[...Array(12)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ y: '110vh', x: `${Math.random() * 100}%`, opacity: 0, scale: 0.5 }}
        animate={{ 
          y: '-20vh', 
          opacity: [0, 0.4, 0.4, 0],
          rotate: [0, 180, -180, 0],
          scale: [0.5, 1.2, 0.8]
        }}
        transition={{ 
          duration: 12 + Math.random() * 12, 
          repeat: Infinity, 
          delay: i * 2,
          ease: "linear"
        }}
        className="absolute text-pink-400/20"
      >
        <Heart fill="currentColor" size={20 + Math.random() * 40} />
      </motion.div>
    ))}
  </div>
);

const Button = ({ children, className = '', onClick = () => {}, variant = 'primary' }: any) => {
  const base = "px-10 py-4 md:px-12 md:py-5 rounded-full font-bold transition-all duration-500 transform hover:scale-105 active:scale-95 shadow-xl flex items-center justify-center gap-3 uppercase tracking-[0.2em] text-[10px] md:text-[11px]";
  const styles: Record<string, any> = {
    primary: { backgroundColor: COLORS.primary, color: COLORS.white },
    secondary: { backgroundColor: COLORS.white, color: COLORS.primary, border: `2px solid ${COLORS.primary}` },
    complement: { backgroundColor: COLORS.complement, color: COLORS.text, border: `1px solid ${COLORS.border}` },
  };
  return (
    <button onClick={onClick} className={`${base} ${className}`} style={styles[variant] || styles.primary}>
      {children}
    </button>
  );
};

const Section = ({ children, className = "", id = "", style = {} }: any) => (
  <section id={id} className={`py-16 md:py-32 px-6 md:px-12 lg:px-24 ${className}`} style={style}>
    <div className="max-w-7xl mx-auto">{children}</div>
  </section>
);

const App = () => {
  return (
    <div className="min-h-screen" style={{ color: COLORS.text, backgroundColor: COLORS.background }}>
      <nav className="fixed top-0 inset-x-0 z-[100] bg-white/95 backdrop-blur-md border-b border-pink-100 px-6 py-4 md:px-12">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#FF1493] flex items-center justify-center text-white shadow-lg">
              <Sparkles size={22} />
            </div>
            <span className="text-xl md:text-2xl font-serif font-black tracking-tight uppercase text-pink-800">GLAMOUR & GRACE</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#collection" className="text-[10px] font-black tracking-[0.2em] uppercase hidden md:block text-pink-900/70 hover:text-pink-600 transition-colors">Collection</a>
            <Button onClick={() => {
               const el = document.getElementById('collection');
               if (el) el.scrollIntoView({ behavior: 'smooth' });
            }} className="px-6 py-3 md:px-8 md:py-4">Shop Now</Button>
          </div>
        </div>
      </nav>

      <Section className="relative min-h-screen flex items-center pt-24 md:pt-32 overflow-hidden" style={{ backgroundColor: COLORS.complement }}>
        <FloatingHearts />
        <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-center z-10 relative">
          <motion.div initial={{ x: -60, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
            <div className="inline-block px-4 py-1 rounded-full bg-pink-100 text-pink-600 font-black text-[9px] tracking-widest uppercase mb-6">
              #1 Beauty Tech in Nigeria
            </div>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-black leading-[0.9] mb-8 text-pink-900">
              Timeless <br/><span style={{ color: COLORS.primary }} className="italic">Glow.</span>
            </h1>
            <p className="text-lg md:text-xl mb-10 max-w-lg font-medium leading-relaxed" style={{ color: COLORS.body }}>
              Experience clinical-grade results from the comfort of your home. Our smart tools are engineered to sculpt, hydrate, and rejuvenate your natural beauty.
            </p>
            <div className="flex flex-wrap gap-6 items-center">
              <Button onClick={() => {
                const el = document.getElementById('collection');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}>View Collection <ArrowRight size={16} /></Button>
              <div className="flex items-center gap-2 text-pink-70