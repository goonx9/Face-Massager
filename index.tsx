import React from 'react';
import { createRoot } from 'react-dom/client';
import { 
  Truck, 
  ShieldCheck, 
  Sparkles,
  Heart, 
  CheckCircle2,
  Shield,
  MessageCircle
} from 'lucide-react';
import { motion } from 'framer-motion';

const COLORS = {
  primary: '#FF2D55',
  text: '#5E002C',
  body: '#880E4F',
  background: '#FFF5F8',
  complement: '#F1FBF3',
  white: '#FFFFFF',
  border: '#FCE4EC',
};

const FloatingHearts = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {[...Array(15)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ y: '110vh', x: `${Math.random() * 100}%`, opacity: 0, scale: 0.5 }}
        animate={{ 
          y: '-20vh', 
          opacity: [0, 0.5, 0.5, 0],
          rotate: [0, 90, -90, 0],
          scale: [0.5, 1, 0.7]
        }}
        transition={{ 
          duration: 10 + Math.random() * 10, 
          repeat: Infinity, 
          delay: i * 1.5,
          ease: "linear"
        }}
        className="absolute text-pink-500/10"
      >
        <Heart fill="currentColor" size={15 + Math.random() * 45} />
      </motion.div>
    ))}
  </div>
);

const Button = ({ children, className = '', onClick = () => {}, variant = 'primary' }: any) => {
  const base = "px-10 py-4 md:px-12 md:py-5 rounded-full font-bold transition-all duration-500 transform hover:scale-105 active:scale-95 shadow-xl flex items-center justify-center gap-3 uppercase tracking-[0.2em] text-[10px] md:text-[11px]";
  const styles: Record<string, any> = {
    primary: { backgroundColor: COLORS.primary, color: COLORS.white },
    secondary: { backgroundColor: COLORS.white, color: COLORS.primary, border: `1.5px solid ${COLORS.primary}` },
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
    <div className="min-h-screen" style={{ color: COLORS.text }}>
      <nav className="fixed top-0 inset-x-0 z-[100] bg-white/90 backdrop-blur-xl border-b border-pink-50 px-6 py-4 md:px-12">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#FF2D55] flex items-center justify-center text-white shadow-xl">
              <Sparkles size={20} />
            </div>
            <span className="text-2xl font-serif font-black tracking-tight uppercase">GLAMOUR & GRACE</span>
          </div>
          <div className="flex items-center gap-8">
            <a href="#collection" className="text-[10px] font-black tracking-[0.3em] uppercase hidden md:block">Collection</a>
            <Button onClick={() => window.location.href = '#collection'} className="px-8 py-4">Shop Now</Button>
          </div>
        </div>
      </nav>

      <Section className="relative min-h-[90vh] flex items-center pt-24 md:pt-32 overflow-hidden" style={{ backgroundColor: COLORS.complement }}>
        <FloatingHearts />
        <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-center z-10 relative">
          <motion.div initial={{ x: -80, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 1 }}>
            <h1 className="text-5xl md:text-8xl lg:text-9xl font-serif font-black leading-[0.95] mb-8">
              Radiance <br/><span style={{ color: COLORS.primary }} className="italic">Redefined.</span>
            </h1>
            <p className="text-lg md:text-xl mb-10 max-w-lg font-medium leading-relaxed" style={{ color: COLORS.body }}>
              Professional skincare meets advanced technology. Discover the secret to a timeless glow with Nigeria's most trusted collection of aesthetic tools.
            </p>
            <div className="flex flex-wrap gap-6 items-center">
              <Button onClick={() => document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' })}>Shop The Collection</Button>
              <div className="flex items-center gap-2 text-pink-700/60 font-black text-[10px] tracking-widest">
                <Shield size={20} /> SECURED SHIPPING
              </div>
            </div>
          </motion.div>
          
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.2 }}>
            <div className="rounded-[3rem] md:rounded-[5rem] overflow-hidden shadow-3xl border-[12px] md:border-[16px] border-white relative">
              <img src="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&q=80&w=1000" alt="Professional Skincare Device" className="w-full h-full object-cover aspect-[4/5]" />
            </div>
          </motion.div>
        </div>
      </Section>

      <Section id="collection">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-serif font-black mt-6">Choose Your Glow</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="group bg-white p-8 rounded-[4rem] border border-pink-50 shadow-xl">
            <div className="rounded-[3rem] overflow-hidden mb-8 aspect-square relative">
              <img src="https://i.ibb.co/NnQBHrBh/NEW-FACE-LIFTER.jpg" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="V-Lift" />
            </div>
            <h3 className="text-3xl font-serif font-black mb-2">V-Lift Pro™ Sculpting System</h3>
            <p className="text-2xl font-black text-pink-600 mb-6">₦31,200</p>
            <Button onClick={() => window.location.href = 'v-lift.html'} variant="secondary" className="w-full">View Details</Button>
          </div>

          <div className="group bg-white p-8 rounded-[4rem] border border-pink-50 shadow-xl">
            <div className="rounded-[3rem] overflow-hidden mb-8 aspect-square relative">
              <img src="https://res.cloudinary.com/dmy2yiax9/image/upload/v1771087873/IMG_20251222_123456_urm6dr.jpg" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="PureSteam" />
            </div>
            <h3 className="text-3xl font-serif font-black mb-2">PureSteam™ Nano-Ionic Hydrator</h3>
            <p className="text-2xl font-black text-pink-600 mb-6">₦32,500</p>
            <Button onClick={() => window.location.href = 'steamer.html'} variant="secondary" className="w-full">View Details</Button>
          </div>
        </div>
      </Section>

      <Section className="bg-complement/30">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="space-y-4">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto shadow-lg text-pink-500"><Truck size={32} /></div>
                <h4 className="font-black text-[10px] tracking-widest uppercase">Nationwide Delivery</h4>
            </div>
            <div className="space-y-4">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto shadow-lg text-pink-500"><ShieldCheck size={32} /></div>
                <h4 className="font-black text-[10px] tracking-widest uppercase">Authenticity Guaranteed</h4>
            </div>
            <div className="space-y-4">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto shadow-lg text-pink-500"><MessageCircle size={32} /></div>
                <h4 className="font-black text-[10px] tracking-widest uppercase">24/7 Support</h4>
            </div>
            <div className="space-y-4">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto shadow-lg text-pink-500"><CheckCircle2 size={32} /></div>
                <h4 className="font-black text-[10px] tracking-widest uppercase">1-Year Warranty</h4>
            </div>
        </div>
      </Section>

      <footer className="py-20 px-6 text-center border-t border-pink-50 bg-white">
        <p className="text-[10px] font-black tracking-[0.4em] uppercase opacity-40">© 2025 Glamour & Grace Aesthetics. Premium Beauty Tech.</p>
      </footer>
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);