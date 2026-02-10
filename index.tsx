
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
  Target
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';

// ==========================================================
// STEP 1: ENTER YOUR DETAILS BELOW TO RECEIVE ORDERS
// ==========================================================
const SELLER_CONFIG = {
  EMAILJS_SERVICE_ID: "service_gxhivxk", 
  EMAILJS_TEMPLATE_ID: "template_239s5yz", 
  EMAILJS_PUBLIC_KEY: "_h1UzYlyePtWt0IqM", 
  WHATSAPP_NUMBER: "2348039940408", 
  // Updated with your specific Paystack checkout link
  PAYSTACK_LINK: "https://paystack.com/buy/face-massager-plolxq", 
};
// ==========================================================

type View = 'home' | 'product';

const COLORS = {
  primary: '#FF2E93',    // Electric Pink
  text: '#B3005E',       // Rich Magenta
  body: '#9E1A5F',       // Deep Rose
  background: '#FFF0F5', // Soft Pink
  complement: '#E8F6F3', // Soft Mint Mist
  white: '#FFFFFF',
  warning: '#FF8C00'     // Elegant Amber
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

// --- Helper Components ---

const Button = ({ children, className = '', onClick = () => {}, variant = 'primary', disabled = false, type = "button" }: any) => {
  const base = "px-10 py-4 rounded-full font-black transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-xl flex items-center justify-center gap-2 uppercase tracking-widest text-xs disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed";
  
  const styles: Record<string, React.CSSProperties> = {
    primary: { backgroundColor: COLORS.primary, color: COLORS.white },
    secondary: { backgroundColor: COLORS.white, color: COLORS.primary, border: `2px solid ${COLORS.primary}` },
    outline: { backgroundColor: 'transparent', color: COLORS.text, border: `1px solid ${COLORS.text}` },
  };

  return (
    <button 
      type={type}
      disabled={disabled}
      onClick={onClick} 
      className={`${base} ${className}`}
      style={styles[variant] || styles.primary}
    >
      {children}
    </button>
  );
};

const Section = ({ children, className = "", id = "", style = {} }: any) => (
  <section id={id} className={`py-16 md:py-24 px-6 md:px-12 lg:px-24 ${className}`} style={style}>
    <div className="max-w-7xl mx-auto">
      {children}
    </div>
  </section>
);

const Badge = ({ children, className = "" }: any) => (
  <span 
    className={`text-white px-5 py-2 rounded-full text-[10px] font-black tracking-[0.2em] uppercase border border-white/20 shadow-lg shrink-0 ${className}`}
    style={{ backgroundColor: COLORS.primary }}
  >
    {children}
  </span>
);

const AccordionItem = ({ title, content }: { title: string, content: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-pink-100 last:border-0 overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex justify-between items-center text-left hover:bg-pink-50/30 px-4 transition-colors rounded-xl"
      >
        <span className="font-black text-pink-900 text-sm uppercase tracking-wider" style={{ color: COLORS.text }}>{title}</span>
        <ChevronDown size={20} className={`text-pink-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="px-4 pb-6"
          >
            <p className="text-sm leading-relaxed font-medium" style={{ color: COLORS.body }}>{content}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const LEDModes = () => {
  const modes = [
    { name: "Red", color: "#FF0000", action: "Collagen" },
    { name: "Blue", color: "#0000FF", action: "Anti-Acne" },
    { name: "Green", color: "#00FF00", action: "Calming" },
    { name: "Purple", color: "#A020F0", action: "Repairing" },
    { name: "Cyan", color: "#00FFFF", action: "Energizing" },
    { name: "White", color: "#F5F5F5", action: "Detox" },
    { name: "Gold", color: "#FFD700", action: "Radiance" }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mt-12">
      {modes.map((m, i) => (
        <motion.div 
          whileHover={{ y: -5 }}
          key={i} 
          className="bg-white p-5 rounded-[2.5rem] border border-pink-50 flex flex-col items-center text-center shadow-sm"
        >
          <div className="w-10 h-10 rounded-full mb-3 shadow-lg" style={{ backgroundColor: m.color, border: '3px solid white' }} />
          <p className="text-[11px] font-black uppercase tracking-tight" style={{ color: COLORS.text }}>{m.name}</p>
          <p className="text-[9px] font-bold uppercase tracking-widest mt-1" style={{ color: COLORS.primary }}>{m.action}</p>
        </motion.div>
      ))}
    </div>
  );
};

// --- Main Views ---

const HomePage = ({ onProductClick }: { onProductClick: () => void }) => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Section className="relative min-h-[90vh] flex items-center pt-24 overflow-hidden" style={{ backgroundColor: COLORS.complement }}>
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[120%] bg-pink-100/40 rounded-full blur-3xl pointer-events-none" />
        
        <div className="grid lg:grid-cols-2 gap-16 items-center z-10 relative">
          <motion.div 
            initial={{ x: -60, opacity: 0 }} 
            animate={{ x: 0, opacity: 1 }} 
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="order-2 lg:order-1"
          >
            <Badge className="mb-8">Luxury Aesthetics</Badge>
            <h1 className="text-6xl md:text-8xl font-serif font-black leading-[1.05] mb-8" style={{ color: COLORS.text }}>
              The Science of <br/><span style={{ color: COLORS.primary }} className="italic">Glamour</span>
            </h1>
            <p className="text-xl mb-12 max-w-lg font-medium leading-relaxed" style={{ color: COLORS.body }}>
              Glamour & Grace is Nigeria's premier destination for advanced skincare technology. We bridge the gap between medical luxury and home convenience.
            </p>
            <div className="flex flex-wrap gap-6">
              <Button onClick={onProductClick}>Browse Collections</Button>
              <button onClick={onProductClick} className="flex items-center gap-3 font-black text-[10px] uppercase tracking-[0.3em] transition-all group" style={{ color: COLORS.primary }}>
                DISCOVER OUR MISSION <div className="w-10 h-10 rounded-full border border-pink-200 flex items-center justify-center group-hover:bg-white transition-all"><ArrowRight size={18}/></div>
              </button>
            </div>
            
            <div className="mt-16 flex items-center gap-6">
               <div className="flex -space-x-3">
                 {[5,6,7,8].map(i => (
                   <div key={i} className="w-10 h-10 rounded-full border-4 border-white bg-pink-200 overflow-hidden shadow-sm">
                     <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" />
                   </div>
                 ))}
               </div>
               <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: COLORS.primary }}>Empowering Nigerian Beauty</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }} 
            transition={{ duration: 1 }}
            className="order-1 lg:order-2 relative"
          >
            <div className="rounded-[4rem] overflow-hidden shadow-2xl border-[12px] border-white relative z-20">
              <img src={ASSETS.womanUsing} alt="Brand Identity" className="w-full h-full object-cover" />
            </div>
          </motion.div>
        </div>
      </Section>

      <Section className="bg-white">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div>
            <Badge>New Arrivals</Badge>
            <h2 className="text-4xl md:text-6xl font-serif font-black mt-6" style={{ color: COLORS.text }}>Elite Skin Tech</h2>
          </div>
          <button className="font-black text-[10px] uppercase tracking-[0.4em]" style={{ color: COLORS.primary }}>View All Products</button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
           <motion.div whileHover={{ y: -10 }} className="group cursor-pointer" onClick={onProductClick}>
              <div className="rounded-[4rem] overflow-hidden bg-pink-50 p-12 mb-8 relative">
                 <img src={ASSETS.productMain} className="w-full h-auto object-contain transform group-hover:scale-110 transition-transform duration-700" />
                 <div className="absolute top-8 right-8 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full font-black text-[10px] text-pink-600">BEST SELLER</div>
              </div>
              <h3 className="text-2xl font-black mb-2" style={{ color: COLORS.text }}>V-Lift Pro™ Ultimate</h3>
              <p className="text-sm font-medium mb-6" style={{ color: COLORS.body }}>Sonic Sculpting & Phototherapy System</p>
              <span className="text-2xl font-black" style={{ color: COLORS.primary }}>₦31,200</span>
           </motion.div>

           <div className="group opacity-40 grayscale cursor-not-allowed">
              <div className="rounded-[4rem] overflow-hidden bg-pink-50 p-12 mb-8 relative flex items-center justify-center min-h-[400px]">
                 <Target className="w-20 h-20 text-pink-200" />
                 <div className="absolute inset-0 flex items-center justify-center">
                    <span className="bg-white px-6 py-3 rounded-full font-black text-xs">COMING SOON</span>
                 </div>
              </div>
              <h3 className="text-2xl font-black mb-2" style={{ color: COLORS.text }}>Glow-Infusion Wand</h3>
              <p className="text-sm font-medium mb-6" style={{ color: COLORS.body }}>Deep Hydration & Serum Delivery</p>
              <span className="text-2xl font-black">₦--,--</span>
           </div>

           <div className="group opacity-40 grayscale cursor-not-allowed">
              <div className="rounded-[4rem] overflow-hidden bg-pink-50 p-12 mb-8 relative flex items-center justify-center min-h-[400px]">
                 <Sparkles className="w-20 h-20 text-pink-200" />
                 <div className="absolute inset-0 flex items-center justify-center">
                    <span className="bg-white px-6 py-3 rounded-full font-black text-xs">COMING SOON</span>
                 </div>
              </div>
              <h3 className="text-2xl font-black mb-2" style={{ color: COLORS.text }}>Eye-Revive Pro</h3>
              <p className="text-sm font-medium mb-6" style={{ color: COLORS.body }}>Anti-Fatigue Thermal Therapy</p>
              <span className="text-2xl font-black">₦--,--</span>
           </div>
        </div>
      </Section>

      <Section className="bg-[#FFF9FB]">
        <div className="grid md:grid-cols-3 gap-12 text-center">
           {[
             { title: "7-Day Trial", desc: "Love your results or your money back. No questions asked." },
             { title: "Free Coaching", desc: "Expert skin guidance included with every high-tech purchase." },
             { title: "Naija Trusted", desc: "Over 15,000 satisfied customers across the federation." }
           ].map((item, i) => (
             <div key={i}>
                <h4 className="text-3xl font-serif font-black mb-4" style={{ color: COLORS.text }}>{item.title}</h4>
                <p className="text-sm font-medium leading-relaxed px-8" style={{ color: COLORS.body }}>{item.desc}</p>
             </div>
           ))}
        </div>
      </Section>
    </motion.div>
  );
};

const ProductPage = () => {
  const [activeImg, setActiveImg] = useState(ASSETS.productMain);
  const [quantity, setQuantity] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [isLagos, setIsLagos] = useState(true);
  const [availableConfirmed, setAvailableConfirmed] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!availableConfirmed) {
      alert("Please confirm your 24-48hr availability.");
      return;
    }
    
    setIsSubmitting(true);

    const price = 31200;
    const total = price * quantity;
    const formattedTotal = `₦${total.toLocaleString()}`;

    const orderDetails = {
      fullName: formData.fullName,
      phone: formData.phone,
      address: formData.address,
      product: "V-Lift Pro™ Ultimate Sculptor",
      quantity: quantity,
      total: formattedTotal,
      location: isLagos ? "Lagos (COD)" : "Outside Lagos (PBD)",
      timestamp: new Date().toLocaleString()
    };

    try {
      if (SELLER_CONFIG.EMAILJS_PUBLIC_KEY !== "_h1UzYlyePtWt0IqM") {
        await emailjs.send(
          SELLER_CONFIG.EMAILJS_SERVICE_ID,
          SELLER_CONFIG.EMAILJS_TEMPLATE_ID,
          orderDetails,
          SELLER_CONFIG.EMAILJS_PUBLIC_KEY
        );
      }
    } catch (err) {
      console.error("Email notification failed:", err);
    }

    const paymentNote = isLagos ? "Payment Mode: CASH ON DELIVERY" : "Payment Mode: PAID VIA PAYSTACK (Awaiting Proof)";
    const outsideLagosReminder = isLagos ? "" : "\n\n*Note:* I am currently paying via the Paystack link you provided. I will send my receipt shortly.";
    const waMessage = `*NEW V-LIFT PRO ORDER* ✨\n\n*Name:* ${formData.fullName}\n*Phone:* ${formData.phone}\n*Address:* ${formData.address}\n\n*Location:* ${isLagos ? 'Lagos' : 'Outside Lagos'}\n*Item:* V-Lift Pro™ Ultimate\n*Qty:* ${quantity}\n*Total:* ${formattedTotal}\n\n${paymentNote}${outsideLagosReminder}\n\n_I am ready to receive my order within 24-48 hours._`;
    const waUrl = `https://wa.me/${SELLER_CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(waMessage)}`;
    
    setIsSubmitting(false);
    setOrderSuccess(true);
    
    setTimeout(() => {
      if (!isLagos) {
        window.open(SELLER_CONFIG.PAYSTACK_LINK, '_blank');
      }
      window.open(waUrl, '_blank');
    }, 2000);
  };

  const scrollToCheckout = () => {
    const el = document.getElementById('checkout-form');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <AnimatePresence>
        {orderSuccess && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-pink-900/80 backdrop-blur-md z-[100] flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
              className="bg-white rounded-[4rem] p-12 max-w-lg w-full text-center shadow-2xl"
            >
              <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8">
                <Check size={48} className="text-white" />
              </div>
              <h2 className="text-4xl font-serif font-black mb-4" style={{ color: COLORS.text }}>Order Sent!</h2>
              <p className="text-lg mb-10" style={{ color: COLORS.body }}>
                {isLagos 
                  ? "Redirecting you to WhatsApp for delivery confirmation." 
                  : "Opening Paystack for payment. Please send your receipt to WhatsApp afterwards."}
              </p>
              <Button onClick={() => window.location.reload()} variant="secondary" className="w-full">Okay</Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Section className="bg-white pt-24">
        <div className="grid lg:grid-cols-2 gap-20">
          <div className="space-y-8">
            <div className="relative rounded-[4rem] overflow-hidden shadow-2xl bg-[#FFF5F8] p-12 border border-pink-50">
              <motion.img 
                key={activeImg} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                src={activeImg} className="w-full h-auto object-contain max-h-[500px]" 
              />
            </div>
            <div className="grid grid-cols-3 gap-6">
              {[ASSETS.productMain, ASSETS.productGrid, ASSETS.womanUsing].map((img, i) => (
                <button key={i} onClick={() => setActiveImg(img)} className={`rounded-3xl overflow-hidden border-4 transition-all ${activeImg === img ? 'border-pink-500 scale-105' : 'border-transparent opacity-60'}`}>
                  <img src={img} className="w-full h-24 object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <h1 className="text-5xl md:text-6xl font-serif font-black mb-6" style={{ color: COLORS.text }}>V-Lift Pro™ Ultimate</h1>
            <div className="flex items-center gap-6 mb-10">
               <span className="text-5xl font-black" style={{ color: COLORS.primary }}>₦31,200</span>
               <span className="text-xl text-pink-200 line-through">₦45,000</span>
            </div>
            <p className="text-lg font-medium mb-12" style={{ color: COLORS.body }}>Our flagship skin sculptor. Engineered for deep jawline definition using sonic waves and thermal phototherapy. Elite results from the comfort of your bedroom.</p>
            <Button onClick={scrollToCheckout} className="w-full py-6 text-xl">Order Your V-Lift</Button>
            <div className="mt-6 p-4 bg-pink-50 rounded-2xl flex items-center gap-4">
              <AlertTriangle className="text-pink-600 shrink-0" />
              <p className="text-[10px] font-black uppercase leading-tight" style={{ color: COLORS.text }}>
                Availability Notice: Please only order if you can receive within 48hrs.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-[#FFF5F8] overflow-hidden">
        <div className="text-center mb-20">
          <Badge>Full Tutorial & Tech</Badge>
          <h2 className="text-4xl md:text-6xl font-serif font-black mt-6" style={{ color: COLORS.text }}>Mastering the Glow</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
           {[
             { gif: ASSETS.gifUsage, title: "1. Prep Phase", desc: "Maximize serum absorption with thermal prep mode." },
             { gif: ASSETS.gifLight, title: "2. Light Therapy", desc: "Switch between 7 spectra for specific skin targets." },
             { gif: ASSETS.gifLifting, title: "3. Kinetic Lift", desc: "Activate muscles with precision sonic vibrations." },
             { gif: ASSETS.gifResult, title: "4. The Result", desc: "Defined 'V' contour and instant lymphatic drainage." }
           ].map((step, idx) => (
             <motion.div key={idx} className="bg-white p-6 rounded-[3rem] border border-pink-50 shadow-sm">
                <div className="rounded-[2.5rem] overflow-hidden mb-6 aspect-square bg-pink-100 flex items-center justify-center">
                  <img src={step.gif} alt={step.title} className="w-full h-full object-cover" />
                </div>
                <h4 className="font-black text-lg mb-2" style={{ color: COLORS.text }}>{step.title}</h4>
                <p className="text-sm font-medium leading-relaxed" style={{ color: COLORS.body }}>{step.desc}</p>
             </motion.div>
           ))}
        </div>

        <div className="text-center">
           <h3 className="text-3xl font-serif font-black mb-10" style={{ color: COLORS.text }}>7-Spectrum LED Technology</h3>
           <LEDModes />
        </div>
      </Section>

      <Section className="bg-white">
        <h2 className="text-4xl font-serif font-black text-center mb-16" style={{ color: COLORS.text }}>The Superior Choice</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-separate border-spacing-2">
            <thead>
              <tr className="text-left text-xs uppercase font-black" style={{ color: COLORS.primary }}>
                <th className="p-6">Feature</th>
                <th className="p-6 rounded-t-3xl text-center text-white" style={{ backgroundColor: COLORS.primary }}>V-Lift Pro™</th>
                <th className="p-6 text-center opacity-40">Generic Tools</th>
              </tr>
            </thead>
            <tbody className="font-bold text-sm" style={{ color: COLORS.body }}>
              {[["Light Modes", "7 Precision Spectrum", "Single Color"], ["Vibration", "12k Sonic RPM", "Basic Motor"], ["Safety", "FDA Compliant Zinc", "Recycled Plastic"], ["Price", "₦31,200", "₦15,000 (Ineffective)"]].map((row, i) => (
                <tr key={i}>
                  <td className="p-6 bg-pink-50/10 border-b border-pink-50">{row[0]}</td>
                  <td className="p-6 bg-pink-50/30 text-center border-b border-pink-100 font-black" style={{ color: COLORS.primary }}>{row[1]}</td>
                  <td className="p-6 text-center border-b border-pink-100 opacity-20">{row[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="checkout-form" className="bg-[#FFF5F8] rounded-t-[5rem]">
        <div className="grid lg:grid-cols-2 gap-20">
          <div>
            <div className="mb-12 p-8 bg-pink-100 rounded-[3rem] border-2 border-dashed border-pink-300">
               <h3 className="text-2xl font-black mb-4 flex items-center gap-3" style={{ color: COLORS.text }}><Clock /> Dispatch Notice</h3>
               <p className="font-medium text-sm leading-relaxed mb-6" style={{ color: COLORS.body }}>
                 We only ship to available customers. Ensure you are ready to receive within <strong>24 to 48 hours</strong> before filling this form.
               </p>
               <div className="space-y-4">
                  <div className={`p-4 rounded-2xl border ${isLagos ? 'bg-white border-pink-500 shadow-md' : 'bg-pink-50/50 border-pink-100 opacity-60'}`}>
                    <p className="text-xs font-black uppercase" style={{ color: COLORS.text }}><MapPin className="inline mr-2" size={14}/> Lagos Orders</p>
                    <p className="text-xs font-bold" style={{ color: COLORS.body }}>Free Delivery. Receive in 24hrs.</p>
                  </div>
                  <div className={`p-4 rounded-2xl border ${!isLagos ? 'bg-white border-pink-500 shadow-md' : 'bg-pink-50/50 border-pink-100 opacity-60'}`}>
                    <p className="text-xs font-black uppercase" style={{ color: COLORS.text }}><CreditCard className="inline mr-2" size={14}/> Outside Lagos</p>
                    <p className="text-xs font-bold" style={{ color: COLORS.body }}>Free Delivery (Paystack Link Provided).</p>
                  </div>
               </div>
            </div>
            <div className="space-y-2">
               <AccordionItem title="Is shipping really free?" content="Yes! We offer free nationwide delivery to all major cities across Nigeria." />
               <AccordionItem title="What's the 48-hour rule?" content="We prioritize customers who have funds ready and are available at their address within 2 days of ordering." />
            </div>
          </div>

          <div className="bg-white rounded-[4rem] p-10 border border-pink-100 shadow-2xl relative">
            <h3 className="text-3xl font-black mb-8" style={{ color: COLORS.text }}>Finalize Order</h3>
            
            <div className="flex gap-4 mb-8">
               <button onClick={() => setIsLagos(true)} className={`flex-1 py-4 rounded-2xl font-black text-[10px] uppercase transition-all ${isLagos ? 'bg-pink-600 text-white shadow-lg' : 'bg-pink-50 text-pink-300'}`}>Lagos</button>
               <button onClick={() => setIsLagos(false)} className={`flex-1 py-4 rounded-2xl font-black text-[10px] uppercase transition-all ${!isLagos ? 'bg-pink-600 text-white shadow-lg' : 'bg-pink-50 text-pink-300'}`}>Outside Lagos</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <input required name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="Your Full Name" className="w-full px-8 py-5 rounded-3xl bg-pink-50 border border-pink-100 focus:outline-none focus:border-pink-500 transition-colors" />
              <input required type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="WhatsApp Number" className="w-full px-8 py-5 rounded-3xl bg-pink-50 border border-pink-100 focus:outline-none focus:border-pink-500 transition-colors" />
              <textarea required name="address" value={formData.address} onChange={handleInputChange} placeholder="Delivery Address (FREE DELIVERY)" rows={2} className="w-full px-8 py-5 rounded-3xl bg-pink-50 border border-pink-100 focus:outline-none focus:border-pink-500 transition-colors" />
              
              <div className="flex items-center gap-4 bg-pink-50 p-4 rounded-3xl justify-between px-8">
                <p className="text-[10px] font-black uppercase" style={{ color: COLORS.body }}>Quantity:</p>
                <div className="flex items-center gap-6" style={{ color: COLORS.text }}>
                  <button type="button" onClick={() => setQuantity(q => Math.max(1, q-1))} className="w-8 h-8 rounded-full bg-white flex items-center shadow-sm"><Minus size={14} /></button>
                  <span className="font-black text-lg">{quantity}</span>
                  <button type="button" onClick={() => setQuantity(q => q+1)} className="w-8 h-8 rounded-full bg-white flex items-center shadow-sm"><Plus size={14} /></button>
                </div>
              </div>

              <label className="flex items-start gap-4 p-4 rounded-3xl bg-pink-50/50 cursor-pointer group">
                 <input 
                  type="checkbox" 
                  required 
                  checked={availableConfirmed} 
                  onChange={(e) => setAvailableConfirmed(e.target.checked)}
                  className="mt-1 w-5 h-5 accent-pink-600" 
                 />
                 <span className="text-[11px] font-bold leading-tight" style={{ color: COLORS.text }}>
                    I confirm I am available within 24-48 hours and have ₦{(31200 * quantity).toLocaleString()} ready.
                 </span>
              </label>

              {!isLagos && (
                <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200">
                  <p className="text-[10px] font-black text-amber-700 uppercase"><CreditCard className="inline mr-2" size={14}/> Free Shipping Policy</p>
                  <p className="text-[10px] font-bold text-amber-600 mt-1">Order will only ship after payment is confirmed. No extra shipping fees.</p>
                </div>
              )}

              <Button type="submit" disabled={isSubmitting} className="w-full py-7 text-2xl">
                {isSubmitting ? "Submitting..." : <>{isLagos ? <Send size={24} /> : <CreditCard size={24} />} Confirm Order</>}
              </Button>
            </form>
          </div>
        </div>
      </Section>
    </motion.div>
  );
};

// --- App Component ---

function App() {
  const [view, setView] = useState<View>('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans" style={{ color: COLORS.body }}>
      <div className="py-3 text-center text-[10px] font-black tracking-[0.4em] uppercase sticky top-0 z-[60] text-white" style={{ backgroundColor: COLORS.primary }}>
        ✨ THE SCIENCE OF GLAMOUR ✨ FREE NATIONWIDE SHIPPING ✨ 
      </div>

      <nav className={`fixed w-full z-50 transition-all ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-xl py-3 top-10' : 'bg-transparent py-8 top-16'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => setView('home')}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black italic text-xl" style={{ backgroundColor: COLORS.primary }}>G</div>
            <span className="text-xl font-serif font-black" style={{ color: COLORS.text }}>Glamour & Grace</span>
          </div>
          <div className="hidden lg:flex items-center gap-12 font-black text-[10px] uppercase tracking-widest">
            <button onClick={() => setView('home')} className="hover:opacity-70 transition-opacity" style={{ color: COLORS.text }}>Brand Home</button>
            <button onClick={() => setView('product')} className="hover:opacity-70 transition-opacity" style={{ color: COLORS.text }}>Store</button>
            <Button className="py-2.5 px-8 text-[9px]" onClick={() => setView('product')}>Shop V-Lift</Button>
          </div>
        </div>
      </nav>

      <main className="overflow-x-hidden">
        {view === 'home' ? <HomePage onProductClick={() => setView('product')} /> : <ProductPage />}
      </main>

      <footer className="py-24 px-8 rounded-t-[5rem] text-white" style={{ backgroundColor: COLORS.text }}>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16">
          <div>
            <span className="text-2xl font-serif font-black">Glamour & Grace™</span>
            <p className="opacity-60 mt-6 max-w-sm font-medium leading-relaxed">Dedicated to the empowerment of Nigerian beauty through high-performance technology.</p>
          </div>
          <div className="text-sm opacity-60 uppercase font-black tracking-widest space-y-4">
             <p>Victoria Island, Lagos, Nigeria</p>
             <p>info@glamourgrace.ng</p>
             <div className="flex gap-4 mt-8">
               <Instagram size={24} />
               <MessageCircle size={24} />
             </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-10 border-t border-white/10 text-[10px] font-black opacity-30 tracking-[0.3em] uppercase">
           &copy; 2024 Glamour & Grace Aesthetics.
        </div>
      </footer>
    </div>
  );
}

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(<App />);
}
