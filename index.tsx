
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
  ArrowRight,
  Star,
  Zap,
  Award
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

const ProductCard = ({ title, price, oldPrice, image, link, tag }: any) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className="bg-white rounded-[3rem] overflow-hidden border border-pink-100 shadow-xl group"
  >
    <div className="relative aspect-[4/5] overflow-hidden bg-pink-50">
      <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
      {tag && (
        <div className="absolute top-6 left-6 bg-pink-600 text-white px-4 py-1 rounded-full text-[9px] font-black tracking-widest uppercase">
          {tag}
        </div>
      )}
    </div>
    <div className="p-10">
      <h3 className="text-2xl font-serif font-black mb-2 text-pink-900">{title}</h3>
      <div className="flex items-center gap-3 mb-8">
        <span className="text-2xl font-black text-pink-600">₦{price.toLocaleString()}</span>
        <span className="text-sm line-through opacity-40 font-bold">₦{oldPrice.toLocaleString()}</span>
      </div>
      <a href={link} className="block">
        <Button className="w-full">Explore Results</Button>
      </a>
    </div>
  </motion.div>
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

      {/* Hero Section - Image Removed as requested */}
      <Section className="relative min-h-[80vh] flex items-center pt-24 md:pt-32 overflow-hidden" style={{ backgroundColor: COLORS.complement }}>
        <FloatingHearts />
        <div className="max-w-4xl mx-auto text-center z-10 relative">
          <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
            <div className="inline-block px-4 py-1 rounded-full bg-pink-100 text-pink-600 font-black text-[9px] tracking-widest uppercase mb-6">
              #1 Beauty Tech in Nigeria
            </div>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-black leading-[0.9] mb-8 text-pink-900">
              Timeless <br/><span style={{ color: COLORS.primary }} className="italic">Glow.</span>
            </h1>
            <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto font-medium leading-relaxed" style={{ color: COLORS.body }}>
              Experience clinical-grade results from the comfort of your home. Our smart tools are engineered to sculpt, hydrate, and rejuvenate your natural beauty with precision technology.
            </p>
            <div className="flex flex-wrap gap-6 items-center justify-center">
              <Button onClick={() => {
                const el = document.getElementById('collection');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}>Explore Collection <ArrowRight size={16} /></Button>
              <div className="flex items-center gap-3 text-pink-700 font-bold text-sm bg-white/50 px-6 py-4 rounded-full backdrop-blur-sm">
                <span className="flex text-yellow-500"><Star size={14} fill="currentColor"/><Star size={14} fill="currentColor"/><Star size={14} fill="currentColor"/><Star size={14} fill="currentColor"/><Star size={14} fill="currentColor"/></span>
                1,200+ Happy Clients
              </div>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Features */}
      <Section className="bg-white">
        <div className="grid md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-pink-50 flex items-center justify-center text-pink-500">
              <Zap size={28} />
            </div>
            <h3 className="text-2xl font-serif font-black">Instant Results</h3>
            <p className="opacity-70 font-medium">Visible skin tightening and hydration after just one session with our advanced nano-technology.</p>
          </div>
          <div className="space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center text-green-500">
              <Award size={28} />
            </div>
            <h3 className="text-2xl font-serif font-black">Premium Quality</h3>
            <p className="opacity-70 font-medium">Built with medical-grade materials and safe for all skin types. Dermatologist recommended.</p>
          </div>
          <div className="space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-500">
              <Truck size={28} />
            </div>
            <h3 className="text-2xl font-serif font-black">Fast Delivery</h3>
            <p className="opacity-70 font-medium">Express 24-48hr shipping within Lagos and Abuja. Nationwide delivery in 3-5 days.</p>
          </div>
        </div>
      </Section>

      {/* Collection */}
      <Section id="collection" className="bg-pink-50/30">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-serif font-black mb-6 text-pink-900">The Essentials</h2>
          <p className="max-w-xl mx-auto opacity-60 font-bold uppercase text-[10px] tracking-[0.4em]">Our Best-Selling Skincare Innovations</p>
        </div>
        <div className="grid md:grid-cols-2 gap-12">
          <ProductCard 
            title="V-Lift Pro™ Sculpting"
            price={31200}
            oldPrice={45000}
            image="https://i.ibb.co/NnQBHrBh/NEW-FACE-LIFTER.jpg"
            link="v-lift.html"
            tag="Bestseller"
          />
          <ProductCard 
            title="PureSteam™ Nano-Ionic"
            price={32500}
            oldPrice={43800}
            image="https://res.cloudinary.com/dmy2yiax9/image/upload/v1771087915/afll2t_pnpti9.gif"
            link="steamer.html"
            tag="New Arrival"
          />
        </div>
      </Section>

      {/* Trust */}
      <Section className="bg-pink-900 text-white text-center rounded-[4rem] md:rounded-[6rem] mx-6 md:mx-12 my-20">
        <div className="max-w-3xl mx-auto space-y-12">
          <h2 className="text-4xl md:text-6xl font-serif font-black leading-tight italic">
            "The best investment I've made for my skin this year. Truly salon-grade results."
          </h2>
          <div className="flex flex-col items-center gap-4">
            <div className="w-20 h-20 rounded-full border-4 border-pink-500 overflow-hidden bg-pink-100">
               <img src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=200&h=200&auto=format&fit=crop" alt="User" />
            </div>
            <div>
              <p className="font-black text-lg tracking-widest uppercase">Adaobi O.</p>
              <p className="text-pink-300 font-bold text-sm">Verified Customer, Lagos</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="py-20 px-6 md:px-12 lg:px-24 bg-white border-t border-pink-100">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-16">
          <div className="md:col-span-2 space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-pink-600 flex items-center justify-center text-white">
                <Sparkles size={20} />
              </div>
              <span className="text-2xl font-serif font-black tracking-tight uppercase text-pink-900">GLAMOUR & GRACE</span>
            </div>
            <p className="text-lg opacity-60 leading-relaxed max-w-md">
              Democratizing professional skincare tech for the modern Nigerian woman. Elegance meets efficiency.
            </p>
            <div className="flex gap-4">
               {[MessageCircle, Shield, CheckCircle2].map((Icon, i) => (
                 <div key={i} className="w-12 h-12 rounded-full border border-pink-100 flex items-center justify-center text-pink-600">
                   <Icon size={20} />
                 </div>
               ))}
            </div>
          </div>
          <div className="space-y-6">
            <h4 className="font-black text-[11px] uppercase tracking-[0.3em] text-pink-900">Support</h4>
            <ul className="space-y-4 font-bold text-sm opacity-60">
              <li><a href="#" className="hover:text-pink-600">Shipping Policy</a></li>
              <li><a href="#" className="hover:text-pink-600">Returns & Refunds</a></li>
              <li><a href="#" className="hover:text-pink-600">Contact Us</a></li>
            </ul>
          </div>
          <div className="space-y-6">
            <h4 className="font-black text-[11px] uppercase tracking-[0.3em] text-pink-900">Contact</h4>
            <ul className="space-y-4 font-bold text-sm opacity-60">
              <li className="flex items-center gap-3"><MessageCircle size={16} /> +234 803 994 0408</li>
              <li className="flex items-center gap-3"><ShieldCheck size={16} /> 100% Secure Payment</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-10 border-t border-pink-50 text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">© 2025 GLAMOUR & GRACE AESTHETICS. NIGERIA.</p>
        </div>
      </footer>
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
