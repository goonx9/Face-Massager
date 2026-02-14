
import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  ShoppingBag, 
  Truck, 
  ShieldCheck, 
  Star, 
  Menu, 
  X, 
  ArrowRight,
  Sparkles,
  Heart, 
  Zap,
  Instagram,
  MessageCircle,
  Clock,
  CheckCircle2,
  ChevronDown,
  HelpCircle,
  Users,
  Award,
  Minus,
  Plus,
  Check,
  Send,
  AlertTriangle,
  CreditCard,
  MapPin,
  Target,
  ChevronLeft,
  ChevronRight,
  Quote,
  Gift
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';

// ==========================================================
// SELLER CONFIGURATION
// ==========================================================
const SELLER_CONFIG = {
  EMAILJS_SERVICE_ID: "service_gxhivxk", 
  EMAILJS_TEMPLATE_ID: "template_239s5yz", 
  EMAILJS_PUBLIC_KEY: "_h1UzYlyePtWt0IqM", 
  WHATSAPP_NUMBER: "2348039940408", 
  PAYSTACK_LINK: "https://paystack.com/buy/face-massager-plolxq", 
};

type View = 'home' | 'product';

const COLORS = {
  primary: '#D81B60',    // Rich Deep Pink
  text: '#2D0A1B',       // Very Deep Burgundy
  body: '#880E4F',       // Magenta
  background: '#FFF5F8', // Soft Blush
  complement: '#E0F2F1', // Soft Mint (Cover Background)
  white: '#FFFFFF',
  valentines: '#FF4D6D', // Rose Red
};

const ASSETS = {
  productGrid: "https://i.ibb.co/ZpC2d2Gq/s-l1600.jpg",
  productMain: "https://i.ibb.co/NnQBHrBh/NEW-FACE-LIFTER.jpg",
  womanUsing: "https://i.ibb.co/v6Pt373T/95610b7045ac9d19701c93ff0c36f493-hi.jpg",
  gifLifting: "https://i.ibb.co/VYzRhYNB/aa1vrr.gif",
  gifUsage: "https://i.ibb.co/pvgYZT5N/aa1voq.gif",
  gifLight: "https://i.ibb.co/FLFpjWgK/aa0uxn.gif",
  gifResult: "https://i.ibb.co/bjPj7Hjr/aa0udx.gif",
};

// --- Sub-components ---

const FloatingHearts = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {[...Array(6)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ y: '110vh', x: `${10 + i * 15}%`, opacity: 0, scale: 0.5 }}
        animate={{ 
          y: '-10vh', 
          opacity: [0, 1, 0.5, 0],
          rotate: [0, 45, -45, 0],
          scale: [0.5, 1.2, 0.8]
        }}
        transition={{ 
          duration: 8 + Math.random() * 5, 
          repeat: Infinity, 
          delay: i * 2,
          ease: "easeInOut"
        }}
        className="absolute text-pink-300/30"
      >
        <Heart fill="currentColor" size={24 + Math.random() * 20} />
      </motion.div>
    ))}
  </div>
);

const Button = ({ children, className = '', onClick = () => {}, variant = 'primary', disabled = false, type = "button" }: any) => {
  const base = "px-10 py-4 rounded-full font-black transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-xl flex items-center justify-center gap-2 uppercase tracking-widest text-xs disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed";
  
  const styles: Record<string, any> = {
    primary: { backgroundColor: COLORS.primary, color: COLORS.white },
    secondary: { backgroundColor: COLORS.white, color: COLORS.primary, border: `2px solid ${COLORS.primary}` },
    valentines: { backgroundColor: COLORS.valentines, color: COLORS.white },
  };

  return (
    <button type={type} disabled={disabled} onClick={onClick} className={`${base} ${className}`} style={styles[variant] || styles.primary}>
      {children}
    </button>
  );
};

const Section = ({ children, className = "", id = "", style = {} }: any) => (
  <section id={id} className={`py-16 md:py-24 px-6 md:px-12 lg:px-24 ${className}`} style={style}>
    <div className="max-w-7xl mx-auto">{children}</div>
  </section>
);

const Badge = ({ children, className = "", color = COLORS.primary }: any) => (
  <span className={`text-white px-5 py-2 rounded-full text-[10px] font-black tracking-[0.2em] uppercase shadow-lg shrink-0 ${className}`} style={{ backgroundColor: color }}>
    {children}
  </span>
);

const AccordionItem = ({ title, content }: { title: string, content: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-pink-100 last:border-0">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full py-6 flex justify-between items-center text-left px-4 transition-colors">
        <span className="font-black text-sm uppercase tracking-wider" style={{ color: COLORS.text }}>{title}</span>
        <ChevronDown size={20} className={`text-pink-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-4 pb-6">
            <p className="text-sm leading-relaxed font-medium" style={{ color: COLORS.body }}>{content}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Views ---

const HomePage = ({ onProductClick }: any) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <Section className="relative min-h-[95vh] flex items-center pt-24 overflow-hidden" style={{ backgroundColor: COLORS.complement }}>
      <FloatingHearts />
      <div className="grid lg:grid-cols-2 gap-16 items-center z-10 relative">
        <motion.div initial={{ x: -60, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
          <Badge className="mb-8" color={COLORS.valentines}>Valentine's Ritual Offer</Badge>
          <h1 className="text-6xl md:text-8xl font-serif font-black leading-[1.05] mb-8" style={{ color: COLORS.text }}>
            Love Your <br/><span style={{ color: COLORS.valentines }} className="italic">Glow.</span>
          </h1>
          <p className="text-xl mb-12 max-w-lg font-semibold leading-relaxed" style={{ color: COLORS.body }}>
            The ultimate gift of self-love. Achieve professional sculpting results from your own sanctuary.
          </p>
          <div className="flex flex-wrap gap-6">
            <Button onClick={onProductClick} variant="valentines">Get the Special Deal</Button>
            <button onClick={onProductClick} className="flex items-center gap-3 font-black text-[10px] uppercase tracking-[0.3em] transition-all group" style={{ color: COLORS.text }}>
              EXPLORE THE MAGIC <div className="w-10 h-10 rounded-full border border-pink-300 flex items-center justify-center group-hover:bg-white transition-all"><ArrowRight size={18}/></div>
            </button>
          </div>
        </motion.div>
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1 }} className="relative">
          <div className="rounded-[4rem] overflow-hidden shadow-3xl border-[16px] border-white relative z-20">
            <img src={ASSETS.womanUsing} alt="Woman using tool" className="w-full h-full object-cover" />
            <div className="absolute top-10 left-10 -rotate-12 bg-pink-600 text-white px-6 py-3 rounded-full font-black text-xs shadow-xl flex items-center gap-2">
              <Gift size={16}/> FREE SERUM
            </div>
          </div>
        </motion.div>
      </div>
    </Section>

    <Section style={{ backgroundColor: COLORS.white }}>
      <div className="text-center mb-20">
        <Badge>Storewide Favourites</Badge>
        <h2 className="text-4xl md:text-6xl font-serif font-black mt-6" style={{ color: COLORS.text }}>The Valentine's Edit</h2>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
        <motion.div whileHover={{ y: -10 }} className="group cursor-pointer" onClick={onProductClick}>
          <div className="rounded-[4rem] overflow-hidden bg-pink-50/50 p-12 mb-8 relative">
            <img src={ASSETS.productMain} className="w-full h-auto transform group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute top-8 right-8 bg-pink-600 text-white px-4 py-2 rounded-full font-black text-[10px] shadow-sm flex items-center gap-2">
              <Heart size={12} fill="white" /> Editor's Choice
            </div>
          </div>
          <h3 className="text-2xl font-black mb-2" style={{ color: COLORS.text }}>V-Lift Pro™ Ultimate</h3>
          <p className="text-sm font-bold mb-6" style={{ color: COLORS.body }}>Jawline Sculpting & Phototherapy</p>
          <div className="flex items-center gap-4">
            <span className="text-2xl font-black" style={{ color: COLORS.valentines }}>₦31,200</span>
            <span className="text-xs text-pink-300 line-through">₦43,000</span>
          </div>
        </motion.div>
        {/* Placeholder Items */}
        <div className="opacity-40 grayscale"><div className="rounded-[4rem] bg-pink-50 h-[400px] flex items-center justify-center mb-8"><Target size={40}/></div><h3 className="text-2xl font-black">Coming Soon</h3></div>
        <div className="opacity-40 grayscale"><div className="rounded-[4rem] bg-pink-50 h-[400px] flex items-center justify-center mb-8"><Sparkles size={40}/></div><h3 className="text-2xl font-black">Restocking</h3></div>
      </div>
    </Section>
  </motion.div>
);

const ProductPage = () => {
  const [quantity, setQuantity] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [isLagos, setIsLagos] = useState(true);
  const [formData, setFormData] = useState({ fullName: '', phone: '', address: '' });

  const handleInputChange = (e: any) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    const total = (31200 * quantity).toLocaleString();
    const message = `*NEW VALENTINE ORDER* 💖\n\n*Name:* ${formData.fullName}\n*Phone:* ${formData.phone}\n*Address:* ${formData.address}\n*Qty:* ${quantity}\n*Total:* ₦${total}\n\n*Location:* ${isLagos ? 'Lagos (Deliver & Pay)' : 'Outside Lagos (Pre-paid)'}`;
    
    try {
      await emailjs.send(SELLER_CONFIG.EMAILJS_SERVICE_ID, SELLER_CONFIG.EMAILJS_TEMPLATE_ID, { ...formData, total: `₦${total}` }, SELLER_CONFIG.EMAILJS_PUBLIC_KEY);
      setOrderSuccess(true);
      setTimeout(() => {
        window.open(`https://wa.me/${SELLER_CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
        if (!isLagos) window.open(SELLER_CONFIG.PAYSTACK_LINK, '_blank');
      }, 2000);
    } catch (error) {
      alert("Order failed to send. Please contact us via WhatsApp directly.");
    }
    setIsSubmitting(false);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <AnimatePresence>
        {orderSuccess && (
          <div className="fixed inset-0 bg-pink-900/90 z-[100] flex items-center justify-center p-6 backdrop-blur-md">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-white rounded-[4rem] p-12 max-w-lg text-center">
              <div className="w-20 h-20 bg-pink-600 rounded-full flex items-center justify-center mx-auto mb-6"><Check size={40} color="white"/></div>
              <h2 className="text-3xl font-black mb-4">Glow is on its way!</h2>
              <p className="mb-8">Redirecting you to complete the delivery details...</p>
              <Button onClick={() => window.location.reload()} variant="secondary" className="w-full">Back to Home</Button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Section className="pt-24">
        <div className="grid lg:grid-cols-2 gap-20">
          <div className="rounded-[4rem] overflow-hidden shadow-2xl bg-pink-50/30 p-12 border border-pink-100">
            <img src={ASSETS.productMain} className="w-full h-auto" />
          </div>
          <div className="flex flex-col justify-center">
            <Badge className="mb-4">Special Valentine Drop</Badge>
            <h1 className="text-5xl md:text-6xl font-serif font-black mb-6" style={{ color: COLORS.text }}>V-Lift Pro™ + <span style={{ color: COLORS.valentines }}>Free Gift</span></h1>
            <div className="flex items-center gap-6 mb-10">
               <span className="text-5xl font-black" style={{ color: COLORS.primary }}>₦31,200</span>
               <span className="text-2xl text-pink-200 line-through">₦43,000</span>
               <Badge color={COLORS.valentines}>SAVE ₦11,800</Badge>
            </div>
            <p className="text-lg font-semibold mb-12">Experience the luxury of professional lifting. Every order today includes a free 30ml Hydra-Serum.</p>
            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-[3rem] shadow-xl">
              <div className="flex gap-4 mb-4">
                <button type="button" onClick={() => setIsLagos(true)} className={`flex-1 py-3 rounded-2xl font-black text-[10px] ${isLagos ? 'bg-pink-600 text-white' : 'bg-pink-50 text-pink-300'}`}>Lagos Delivery</button>
                <button type="button" onClick={() => setIsLagos(false)} className={`flex-1 py-3 rounded-2xl font-black text-[10px] ${!isLagos ? 'bg-pink-600 text-white' : 'bg-pink-50 text-pink-300'}`}>States Delivery</button>
              </div>
              <input required name="fullName" placeholder="Full Name" onChange={handleInputChange} className="w-full p-5 rounded-2xl bg-pink-50 border-none outline-none font-bold" />
              <input required name="phone" type="tel" placeholder="Phone Number" onChange={handleInputChange} className="w-full p-5 rounded-2xl bg-pink-50 border-none outline-none font-bold" />
              <textarea required name="address" placeholder="Delivery Address" onChange={handleInputChange} className="w-full p-5 rounded-2xl bg-pink-50 border-none outline-none font-bold" rows={2} />
              <div className="flex items-center justify-between px-4">
                <span className="font-black text-[10px] uppercase">Quantity</span>
                <div className="flex items-center gap-4">
                  <button type="button" onClick={() => setQuantity(Math.max(1, quantity-1))} className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center"><Minus size={16}/></button>
                  <span className="font-black">{quantity}</span>
                  <button type="button" onClick={() => setQuantity(quantity+1)} className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center"><Plus size={16}/></button>
                </div>
              </div>
              <Button type="submit" disabled={isSubmitting} className="w-full py-6 text-xl" variant="valentines">
                {isSubmitting ? "Processing Order..." : "Deliver My Glow"}
              </Button>
            </form>
          </div>
        </div>
      </Section>
    </motion.div>
  );
};

const App = () => {
  const [view, setView] = useState<View>('home');
  return (
    <div className="min-h-screen">
      <div className="py-2 text-center text-[9px] font-black tracking-[0.3em] uppercase text-white sticky top-0 z-[60]" style={{ backgroundColor: COLORS.valentines }}>
        Valentine's Offer: Free Nationwide Delivery This Week Only
      </div>
      <nav className="fixed w-full z-50 top-8 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center bg-white/80 backdrop-blur-md p-4 rounded-3xl shadow-lg border border-pink-100">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setView('home')}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-black italic bg-pink-600">G</div>
            <span className="font-serif font-black text-lg">Glamour & Grace</span>
          </div>
          <Button className="py-2.5 px-6 text-[9px]" onClick={() => setView('product')}>Shop Now</Button>
        </div>
      </nav>
      <main>
        {view === 'home' ? <HomePage onProductClick={() => setView('product')} /> : <ProductPage />}
      </main>
      <footer className="py-20 px-8 text-white rounded-t-[4rem]" style={{ backgroundColor: COLORS.text }}>
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-2xl font-serif font-black italic">Glamour & Grace™</span>
          <p className="opacity-50 mt-4 text-xs font-black uppercase tracking-widest">Aesthetics defined for the modern woman</p>
          <div className="flex justify-center gap-6 mt-10 opacity-30">
            <Instagram size={20} /><MessageCircle size={20} />
          </div>
        </div>
      </footer>
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
