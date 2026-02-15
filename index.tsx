
import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  Truck, 
  ShieldCheck, 
  Star, 
  ArrowRight,
  Sparkles,
  Heart, 
  Zap,
  Instagram,
  MessageCircle,
  CheckCircle2,
  Check,
  CreditCard,
  Battery,
  Shield,
  Smartphone,
  Droplets,
  Wind,
  Layers,
  Activity,
  Award,
  Clock,
  ThumbsUp
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
  PAYSTACK_LINK: "https://paystack.com/buy/face-massager-plolxq", // Disabled per request
};

type ProductId = 'vlift' | 'steamer';
type View = 'home' | 'product';

const COLORS = {
  primary: '#FF2D55',    // Vibrant Rose Pink
  text: '#880E4F',       // Deep Pink 900 (Rich Pink Font)
  body: '#AD1457',       // Pink 800 (For body text)
  background: '#FFF5F8', // Softest Blush
  complement: '#F1FBF3', // Soft Dewy Mint Green (Complement to Pink)
  white: '#FFFFFF',
  accent: '#F06292',     // Bright Light Pink
  border: '#FCE4EC',
};

const PRODUCTS = {
  vlift: {
    id: 'vlift',
    name: "V-Lift Pro™ Sculpting System",
    price: 31200,
    originalPrice: 45000,
    badge: "Bestseller",
    description: "Experience instant lifting and long-term rejuvenation. Our patented Phototherapy tech combined with deep tissue micro-vibrations reshapes your profile and clears imperfections.",
    longDescription: "The V-Lift Pro™ is a medical-grade aesthetic tool designed for professional results at home. It combines triple-action technology: EMS Microcurrents for muscle toning, High-Frequency Vibration for lymphatic drainage, and 45°C Thermal Therapy to boost collagen production. Regular use results in a sharper jawline, reduced double chin appearance, and smoother skin texture.",
    mainImage: "https://i.ibb.co/NnQBHrBh/NEW-FACE-LIFTER.jpg",
    gallery: [
      "https://i.ibb.co/ZpC2d2Gq/s-l1600.jpg",
      "https://i.ibb.co/bjPj7Hjr/aa0udx.gif",
      "https://i.ibb.co/VYzRhYNB/aa1vrr.gif"
    ],
    benefits: [
      "Visible jawline sculpting & lifting",
      "Reduction in puffiness & fine lines",
      "Enhanced absorption of skincare products",
      "Cleared acne & reduced redness via Blue LED"
    ],
    steps: [
      { img: "https://i.ibb.co/VYzRhYNB/aa1vrr.gif", title: "01. Sculpt", desc: "Activate lymphatic drainage with firm upward strokes along the jawline." },
      { img: "https://i.ibb.co/FLFpjWgK/aa0uxn.gif", title: "02. Revitalize", desc: "Select LED modes to target specific skin concerns at a cellular level." },
      { img: "https://i.ibb.co/pvgYZT5N/aa1voq.gif", title: "03. Define", desc: "Contour cheekbones and forehead with focused microcurrent pulses." },
      { img: "https://i.ibb.co/bjPj7Hjr/aa0udx.gif", title: "04. Radiate", desc: "A final 30-second sweep for an unmistakably polished, dewy finish." }
    ],
    features: [
      { icon: Battery, label: "Power", detail: "90-Day Standby / USB-C Fast Charge" },
      { icon: Zap, label: "Modes", detail: "3 Intensity Levels / LED Therapy" },
      { icon: Smartphone, label: "Control", detail: "One-Touch Smart Interface" },
      { icon: Shield, label: "Durability", detail: "IPX5 Water Resistant Build" }
    ]
  },
  steamer: {
    id: 'steamer',
    name: "PureSteam™ Nano-Ionic Hydrator",
    price: 32500,
    originalPrice: 43800,
    badge: "New Arrival",
    description: "The ultimate hydration ritual. Using nano-ionic steam technology, this professional-grade steamer opens pores, deep cleanses, and preps your skin for maximum serum absorption.",
    longDescription: "Traditional steaming only wets the surface. PureSteam™ uses a ceramic PTC heating element to atomize water into ultra-fine nano-scale particles. These particles penetrate the skin barrier up to 10x more effectively than standard steam, softening the sebum in pores and replenishing deep-seated moisture. It's the essential first step to any high-end facial routine.",
    mainImage: "https://res.cloudinary.com/dmy2yiax9/image/upload/v1771087873/IMG_20251222_123456_urm6dr.jpg",
    gallery: [
      "https://res.cloudinary.com/dmy2yiax9/image/upload/v1771087915/afll2t_pnpti9.gif",
      "https://res.cloudinary.com/dmy2yiax9/image/upload/v1771087873/aflldh_tdpu1n.gif",
      "https://res.cloudinary.com/dmy2yiax9/image/upload/v1771087873/afll40_iwgqjv.gif"
    ],
    benefits: [
      "Deep pore detoxification & clearing",
      "10x better moisture penetration",
      "Prepares skin for extraction & serum",
      "Relaxing spa-quality aromatherapy support"
    ],
    steps: [
      { img: "https://res.cloudinary.com/dmy2yiax9/image/upload/v1771087915/afll2t_pnpti9.gif", title: "01. Cleanse", desc: "Start with a fresh face to allow the nano-steam to penetrate deeply into your pores." },
      { img: "https://res.cloudinary.com/dmy2yiax9/image/upload/v1771087873/aflldh_tdpu1n.gif", title: "02. Hydrate", desc: "Activate the ionic steam and position your face 8 inches away for a 10-minute session." },
      { img: "https://res.cloudinary.com/dmy2yiax9/image/upload/v1771087873/afll40_iwgqjv.gif", title: "03. Extract", desc: "Pores are now soft and open, making blackhead removal painless and safe." },
      { img: "https://res.cloudinary.com/dmy2yiax9/image/upload/v1771087873/IMG_20251222_123456_urm6dr.jpg", title: "04. Seal", desc: "Follow up with your favorite serum; absorption is increased by up to 200%." }
    ],
    features: [
      { icon: Droplets, label: "Tech", detail: "Nano-Ionic Steam Penetration" },
      { icon: Wind, label: "Steam", detail: "Consistent Warm Mist Flow" },
      { icon: Shield, label: "Safety", detail: "Auto-Shutoff Sensor Included" },
      { icon: Sparkles, label: "Design", detail: "Ultra-Quiet Ceramic Heater" }
    ]
  }
};

// --- Sub-components ---

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

const Button = ({ children, className = '', onClick = () => {}, variant = 'primary', disabled = false, type = "button" }: any) => {
  const base = "px-12 py-5 rounded-full font-bold transition-all duration-500 transform hover:scale-105 active:scale-95 shadow-2xl flex items-center justify-center gap-3 uppercase tracking-[0.2em] text-[11px] disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed";
  
  const styles: Record<string, any> = {
    primary: { backgroundColor: COLORS.primary, color: COLORS.white },
    secondary: { backgroundColor: COLORS.white, color: COLORS.primary, border: `1.5px solid ${COLORS.primary}` },
    outline: { backgroundColor: 'transparent', color: COLORS.text, border: `1px solid ${COLORS.border}` },
  };

  return (
    <button type={type} disabled={disabled} onClick={onClick} className={`${base} ${className}`} style={styles[variant] || styles.primary}>
      {children}
    </button>
  );
};

const Section = ({ children, className = "", id = "", style = {} }: any) => (
  <section id={id} className={`py-20 md:py-32 px-6 md:px-12 lg:px-24 ${className}`} style={style}>
    <div className="max-w-7xl mx-auto">{children}</div>
  </section>
);

const Badge = ({ children, className = "", color = COLORS.primary }: any) => (
  <span className={`text-white px-6 py-2 rounded-full text-[9px] font-black tracking-[0.3em] uppercase shadow-md shrink-0 inline-block ${className}`} style={{ backgroundColor: color }}>
    {children}
  </span>
);

const ComparisonTable = ({ productName }: { productName: string }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-left border-collapse">
      <thead>
        <tr className="border-b-2 border-pink-100">
          <th className="py-6 px-4 font-black uppercase text-[10px] tracking-widest text-pink-400">Feature</th>
          <th className="py-6 px-4 font-black uppercase text-[10px] tracking-widest text-pink-700 bg-pink-50/50">{productName}</th>
          <th className="py-6 px-4 font-black uppercase text-[10px] tracking-widest text-gray-400">Regular Tools</th>
        </tr>
      </thead>
      <tbody className="text-[12px] font-bold">
        {[
          { feature: "Professional Grade Tech", gg: true, reg: false },
          { feature: "Long-term Durability", gg: true, reg: false },
          { feature: "Safety Certified", gg: true, reg: false },
          { feature: "Instant Visible Results", gg: true, reg: false },
          { feature: "Premium Build Quality", gg: true, reg: false },
        ].map((row, i) => (
          <tr key={i} className="border-b border-pink-50">
            <td className="py-6 px-4 text-pink-900">{row.feature}</td>
            <td className="py-6 px-4 bg-pink-50/50 text-center"><CheckCircle2 className="text-pink-600 mx-auto" size={18}/></td>
            <td className="py-6 px-4 text-center"><XIcon className="text-gray-300 mx-auto" size={18}/></td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const XIcon = ({ size, className }: any) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);

// --- Views ---

const HomePage = ({ onProductSelect }: { onProductSelect: (p: ProductId) => void, key?: string | number }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    {/* Hero Section */}
    <Section className="relative min-h-screen flex items-center pt-32 overflow-hidden" style={{ backgroundColor: COLORS.complement }}>
      <FloatingHearts />
      <div className="grid lg:grid-cols-2 gap-20 items-center z-10 relative">
        <motion.div initial={{ x: -80, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 1, ease: "easeOut" }}>
          <Badge className="mb-10" color={COLORS.primary}>Welcome to Elegance</Badge>
          <h1 className="text-7xl md:text-9xl font-serif font-black leading-[0.95] mb-10" style={{ color: COLORS.text }}>
            Glamour & <br/><span style={{ color: COLORS.primary }} className="italic">Grace.</span>
          </h1>
          <p className="text-xl mb-14 max-w-lg font-medium leading-relaxed" style={{ color: COLORS.body }}>
            The destination for premium skincare technology. Discover the secret to a timeless glow with our curated collection of professional tools.
          </p>
          <div className="flex flex-wrap gap-8 items-center">
            <Button onClick={() => {
              const el = document.getElementById('collection');
              el?.scrollIntoView({ behavior: 'smooth' });
            }} className="shadow-rose-300">Explore Collection</Button>
          </div>
        </motion.div>
        
        <motion.div initial={{ scale: 0.8, opacity: 0, rotate: 5 }} animate={{ scale: 1, opacity: 1, rotate: 0 }} transition={{ duration: 1.2 }} className="relative">
          <div className="rounded-[5rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(255,45,85,0.3)] border-[16px] border-white relative z-20">
            <img src="https://i.ibb.co/v6Pt373T/95610b7045ac9d19701c93ff0c36f493-hi.jpg" alt="Glamour & Grace Visual" className="w-full h-full object-cover aspect-[4/5] hover:scale-105 transition-transform duration-1000" />
            <div className="absolute top-12 left-12 -rotate-12 bg-white text-pink-600 px-8 py-4 rounded-full font-black text-[10px] shadow-2xl flex items-center gap-3 tracking-widest border border-pink-100">
              <Sparkles size={16} className="text-pink-400" /> NIGERIA'S PREMIER CHOICE
            </div>
          </div>
          <div className="absolute -inset-20 bg-pink-400/20 rounded-full blur-[150px] -z-10 animate-pulse"></div>
        </motion.div>
      </div>
    </Section>

    {/* Featured Selection */}
    <Section id="collection" style={{ backgroundColor: COLORS.white }}>
      <div className="text-center mb-20">
        <Badge>Collection 2025</Badge>
        <h2 className="text-6xl font-serif font-black mt-6" style={{ color: COLORS.text }}>Choose Your Glow</h2>
      </div>
      <div className="grid md:grid-cols-2 gap-12">
        {Object.values(PRODUCTS).map((p) => (
          <motion.div 
            key={p.id}
            whileHover={{ y: -20 }}
            className="group relative bg-pink-50/30 rounded-[4rem] p-10 border border-pink-100 overflow-hidden cursor-pointer"
            onClick={() => onProductSelect(p.id as ProductId)}
          >
            <div className="rounded-[3rem] overflow-hidden mb-8 aspect-square relative">
              <img src={p.mainImage} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={p.name} />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                <Button className="scale-75 group-hover:scale-100">View Details</Button>
              </div>
            </div>
            <Badge className="mb-4">{p.badge}</Badge>
            <h3 className="text-4xl font-serif font-black mb-4" style={{ color: COLORS.text }}>{p.name}</h3>
            <p className="text-3xl font-black" style={{ color: COLORS.primary }}>₦{p.price.toLocaleString()}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  </motion.div>
);

const ProductPage = ({ product }: { product: any, key?: string | number }) => {
  const [isOrdering, setIsOrdering] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', address: '', location: 'Lagos' });
  const formRef = useRef<HTMLDivElement>(null);

  const handleOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsOrdering(true);

    const message = `
New Order Received!
-------------------
Product: ${product.name}
Price: ₦${product.price.toLocaleString()}
Customer: ${formData.name}
Phone: ${formData.phone}
Location: ${formData.location}
Address: ${formData.address}
-------------------
Please confirm with the customer via WhatsApp.
    `;

    try {
      // 1. EmailJS Notification
      await emailjs.send(
        SELLER_CONFIG.EMAILJS_SERVICE_ID,
        SELLER_CONFIG.EMAILJS_TEMPLATE_ID,
        {
          to_name: "Glamour & Grace Sales",
          from_name: formData.name,
          message: message,
          customer_email: "orders@glamourgrace.ng", // placeholder
          phone: formData.phone,
          address: formData.address,
          product_name: product.name,
          location: formData.location
        },
        SELLER_CONFIG.EMAILJS_PUBLIC_KEY
      );

      // 2. WhatsApp Notification Redirect
      const waMessage = window.encodeURIComponent(message);
      const waUrl = `https://wa.me/${SELLER_CONFIG.WHATSAPP_NUMBER}?text=${waMessage}`;
      
      setOrderComplete(true);
      setIsOrdering(false);

      // Open WhatsApp in a new tab after a brief delay
      setTimeout(() => {
        window.open(waUrl, '_blank');
      }, 2000);

    } catch (error) {
      console.error("Order notification failed:", error);
      alert("Order process failed. Please contact us directly on WhatsApp.");
      setIsOrdering(false);
    }
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (orderComplete) {
    return (
      <Section className="min-h-screen flex items-center justify-center pt-32 text-center">
        <div className="max-w-xl p-16 bg-white rounded-[4rem] shadow-3xl border border-pink-100">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center text-white mx-auto mb-10">
            <Check size={48} />
          </motion.div>
          <h1 className="text-4xl font-serif font-black mb-6" style={{ color: COLORS.text }}>Thank You, {formData.name.split(' ')[0]}!</h1>
          <p className="text-lg opacity-80 mb-10" style={{ color: COLORS.body }}>
            Your order for the <strong>{product.name}</strong> has been received. 
            We are now redirecting you to WhatsApp to finalize your delivery details.
          </p>
          <Button onClick={() => window.location.href = '/'}>Back to Home</Button>
        </div>
      </Section>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} className="pt-32">
      {/* Product Main Display */}
      <Section style={{ backgroundColor: COLORS.white }}>
        <div className="grid lg:grid-cols-2 gap-20">
          <div className="space-y-8">
            <div className="rounded-[4rem] overflow-hidden shadow-2xl border-8 border-white bg-pink-50">
              <img src={product.mainImage} alt={product.name} className="w-full h-auto" />
            </div>
            <div className="grid grid-cols-3 gap-6">
              {product.gallery.map((img: string, i: number) => (
                <div key={i} className="rounded-3xl overflow-hidden border border-pink-100 aspect-square">
                  <img src={img} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col justify-center">
            <Badge className="mb-6">{product.badge}</Badge>
            <h1 className="text-6xl font-serif font-black mb-4" style={{ color: COLORS.text }}>{product.name}</h1>
            <div className="flex items-center gap-4 mb-10">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} size={18} fill={COLORS.primary} stroke="none" />)}
              </div>
              <span className="text-sm font-black opacity-60" style={{ color: COLORS.body }}>(4.9/5 from 2.4k users)</span>
            </div>
            
            <div className="mb-10">
              <span className="text-5xl font-black mr-4" style={{ color: COLORS.primary }}>₦{product.price.toLocaleString()}</span>
              <span className="text-2xl line-through opacity-40 font-bold">₦{product.originalPrice.toLocaleString()}</span>
            </div>

            <p className="text-lg leading-relaxed mb-12" style={{ color: COLORS.body }}>
              {product.description}
            </p>

            <Button onClick={scrollToForm} className="w-full">Order Now & Save 30%</Button>

            <div className="mt-12 flex items-center justify-between px-4 opacity-70">
              <div className="flex flex-col items-center gap-2 text-center">
                <Truck size={20} className="text-pink-500" />
                <span className="text-[9px] font-black uppercase tracking-widest">Free Shipping</span>
              </div>
              <div className="flex flex-col items-center gap-2 text-center">
                <ShieldCheck size={20} className="text-pink-500" />
                <span className="text-[9px] font-black uppercase tracking-widest">1 Year Warranty</span>
              </div>
              <div className="flex flex-col items-center gap-2 text-center">
                <ThumbsUp size={20} className="text-pink-500" />
                <span className="text-[9px] font-black uppercase tracking-widest">Premium Quality</span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* NEW: Detailed Product Information Section */}
      <Section style={{ backgroundColor: COLORS.complement }}>
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div>
            <Badge color={COLORS.accent} className="mb-8">Technical Deep Dive</Badge>
            <h2 className="text-5xl font-serif font-black mb-10" style={{ color: COLORS.text }}>Why it works.</h2>
            <p className="text-xl leading-relaxed mb-10 opacity-90" style={{ color: COLORS.body }}>
              {product.longDescription}
            </p>
            <div className="space-y-8">
              {product.benefits.map((benefit: string, i: number) => (
                <div key={i} className="flex items-start gap-5 group">
                  <div className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-pink-500 group-hover:bg-pink-500 group-hover:text-white transition-all">
                    <CheckCircle2 size={24} />
                  </div>
                  <div>
                    <p className="text-lg font-bold" style={{ color: COLORS.text }}>{benefit}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="rounded-[4rem] overflow-hidden shadow-3xl border-[20px] border-white">
              <img src={product.gallery[0]} className="w-full h-auto" />
            </div>
            <div className="absolute -bottom-10 -right-10 bg-pink-700 p-10 rounded-[3rem] text-white shadow-2xl max-w-xs">
              <Award className="mb-4" size={32} />
              <p className="text-sm font-black uppercase tracking-widest mb-2">Clinical Results</p>
              <p className="text-xs opacity-70 leading-relaxed font-medium italic">"After just 14 days, 94% of users reported firmer contours and 91% noted a significant reduction in skin dullness."</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Visual Application Steps */}
      <Section style={{ backgroundColor: COLORS.white }} className="border-t border-pink-50">
        <div className="text-center mb-24">
          <Badge color={COLORS.accent}>Application Guide</Badge>
          <h2 className="text-5xl md:text-7xl font-serif font-black mt-8 tracking-tighter" style={{ color: COLORS.text }}>Step-by-Step Glow</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {product.steps.map((step: any, i: number) => (
            <motion.div 
              key={i} 
              whileHover={{ y: -10 }}
              className="group p-2 rounded-[3.5rem] bg-pink-50/50 hover:bg-white border border-transparent hover:border-pink-200 hover:shadow-2xl transition-all duration-500"
            >
              <div className="overflow-hidden rounded-[3rem] aspect-square mb-8">
                <img src={step.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={step.title} />
              </div>
              <div className="px-6 pb-8">
                <h3 className="text-2xl font-black mb-3" style={{ color: COLORS.text }}>{step.title}</h3>
                <p className="text-[13px] font-medium leading-relaxed opacity-90" style={{ color: COLORS.body }}>{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Technical Specs */}
      <Section style={{ backgroundColor: COLORS.background }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <Badge>Precision Engineering</Badge>
            <h2 className="text-5xl md:text-6xl font-serif font-black mt-8" style={{ color: COLORS.text }}>Designed for Perfection</h2>
          </div>
          
          <div className="bg-white rounded-[4rem] shadow-2xl overflow-hidden border border-pink-100 grid lg:grid-cols-5">
            <div className="lg:col-span-2 bg-pink-800 p-16 flex flex-col justify-center text-white">
              <h3 className="text-3xl font-serif font-black mb-6">Device Specifications</h3>
              <p className="opacity-90 text-sm font-medium mb-10 leading-relaxed">Integrated medical-grade technology designed to deliver clinic-quality results from the comfort of your home.</p>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center"><Check size={20}/></div>
                  <span className="text-[10px] font-black uppercase tracking-widest">Medical Grade Components</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center"><Check size={20}/></div>
                  <span className="text-[10px] font-black uppercase tracking-widest">Global Safety Certified</span>
                </div>
              </div>
            </div>
            <div className="lg:col-span-3">
              <table className="w-full text-left h-full">
                <tbody className="text-[13px] font-bold">
                  {product.features.map((row: any, i: number) => (
                    <tr key={i} className="border-b border-pink-50 last:border-0">
                      <td className="py-8 px-10 flex items-center gap-4 text-pink-500">
                        <row.icon size={18} />
                        <span className="uppercase tracking-widest text-[10px] opacity-60">{row.label}</span>
                      </td>
                      <td className="py-8 px-10" style={{ color: COLORS.text }}>{row.detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Section>

      {/* Comparison Section */}
      <Section style={{ backgroundColor: COLORS.white }}>
        <div className="text-center mb-16">
          <Badge>Elite Standards</Badge>
          <h2 className="text-5xl md:text-6xl font-serif font-black mt-8" style={{ color: COLORS.text }}>Glamour & Grace Difference</h2>
        </div>
        <div className="max-w-4xl mx-auto bg-white p-12 rounded-[4rem] shadow-2xl border border-pink-100">
          <ComparisonTable productName={product.name} />
        </div>
      </Section>

      {/* ORDER FORM AT THE BOTTOM */}
      <Section id="order" style={{ backgroundColor: COLORS.white }} className="border-t border-pink-50">
        <div ref={formRef} className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <Badge>Secure Your Tool</Badge>
            <h2 className="text-5xl font-serif font-black mt-6" style={{ color: COLORS.text }}>Place Your Order</h2>
            <p className="mt-4 font-semibold opacity-70">Order confirmed via WhatsApp. Payment on Delivery options available.</p>
          </div>
          
          <form onSubmit={handleOrder} className="space-y-6 bg-pink-50/50 p-12 rounded-[4rem] border border-pink-100 shadow-xl">
            <div className="grid gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] ml-4 opacity-60">Full Name</label>
                <input 
                  type="text" 
                  placeholder="E.G. CHIDIMMA ADEKUNLE" 
                  required
                  className="w-full px-8 py-5 rounded-full bg-white border border-pink-100 focus:border-pink-400 outline-none text-[11px] font-black tracking-widest transition-all"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] ml-4 opacity-60">Phone Number</label>
                <input 
                  type="tel" 
                  placeholder="080XXXXXXXX" 
                  required
                  className="w-full px-8 py-5 rounded-full bg-white border border-pink-100 focus:border-pink-400 outline-none text-[11px] font-black tracking-widest transition-all"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] ml-4 opacity-60">Your Location</label>
                <select 
                  className="w-full px-8 py-5 rounded-full bg-white border border-pink-100 focus:border-pink-400 outline-none text-[11px] font-black tracking-widest transition-all appearance-none"
                  value={formData.location}
                  onChange={e => setFormData({ ...formData, location: e.target.value })}
                >
                  <option value="Lagos">Lagos Delivery (Within 24-48hrs)</option>
                  <option value="Outside Lagos">Outside Lagos (Within 3-5 Working Days)</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] ml-4 opacity-60">Detailed Delivery Address</label>
                <textarea 
                  placeholder="HOUSE NUMBER, STREET NAME, CITY, STATE" 
                  required
                  className="w-full px-8 py-5 rounded-[2rem] bg-white border border-pink-100 focus:border-pink-400 outline-none text-[11px] font-black tracking-widest transition-all min-h-[140px]"
                  value={formData.address}
                  onChange={e => setFormData({ ...formData, address: e.target.value })}
                />
              </div>
            </div>
            <div className="pt-6">
              <Button type="submit" disabled={isOrdering} className="w-full">
                {isOrdering ? 'Securing Your Glow...' : `Order My ${product.id === 'vlift' ? 'V-Lift' : 'PureSteam'}`}
              </Button>
            </div>
            <p className="text-center text-[9px] font-bold opacity-40 uppercase tracking-widest mt-6 flex items-center justify-center gap-2">
              <Shield size={12}/> Your order will be confirmed via WhatsApp instantly
            </p>
          </form>
        </div>
      </Section>
    </motion.div>
  );
};

const Navigation = ({ setView, onProductSelect }: { setView: (v: View) => void, onProductSelect: (p: ProductId) => void }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 inset-x-0 z-[100] transition-all duration-500 px-6 py-4 md:px-12 ${scrolled ? 'bg-white/90 backdrop-blur-xl shadow-lg border-b border-pink-50' : ''}`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div onClick={() => setView('home')} className="cursor-pointer group flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-pink-700 flex items-center justify-center text-white shadow-xl group-hover:rotate-12 transition-transform">
            <Sparkles size={18} />
          </div>
          <span className="text-2xl font-serif font-black tracking-tight" style={{ color: COLORS.text }}>GLAMOUR & GRACE</span>
        </div>
        
        <div className="flex items-center gap-8">
          <button onClick={() => setView('home')} className="text-[10px] font-black tracking-[0.3em] uppercase hidden md:block hover:text-pink-600 transition-colors" style={{ color: COLORS.body }}>Home</button>
          <Button onClick={() => {
            const el = document.getElementById('collection');
            if (el) {
              setView('home');
              setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100);
            } else {
              setView('home');
            }
          }} className="px-8 py-4 text-[10px]">View Collection</Button>
        </div>
      </div>
    </nav>
  );
};

const Footer = () => (
  <footer className="py-20 px-12" style={{ backgroundColor: COLORS.text, color: COLORS.white }}>
    <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-16">
      <div className="md:col-span-2">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center"><Sparkles size={24}/></div>
          <span className="text-3xl font-serif font-black italic">Glamour & Grace.</span>
        </div>
        <p className="max-w-sm opacity-60 leading-loose font-medium">Elevating Nigerian beauty standards through high-performance technology and luxurious skincare experiences.</p>
        <div className="flex gap-6 mt-10">
          <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-all cursor-pointer"><Instagram size={20}/></div>
          <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-all cursor-pointer"><MessageCircle size={20}/></div>
        </div>
      </div>
      <div>
        <h4 className="font-black text-[11px] uppercase tracking-[0.3em] mb-8">Navigation</h4>
        <ul className="space-y-4 opacity-60 text-sm font-medium">
          <li className="cursor-pointer hover:text-white transition-colors">Featured Tools</li>
          <li className="cursor-pointer hover:text-white transition-colors">Our Technology</li>
          <li className="cursor-pointer hover:text-white transition-colors">Help Center</li>
        </ul>
      </div>
      <div>
        <h4 className="font-black text-[11px] uppercase tracking-[0.3em] mb-8">Legal</h4>
        <ul className="space-y-4 opacity-60 text-sm font-medium">
          <li className="cursor-pointer hover:text-white transition-colors">Privacy Policy</li>
          <li className="cursor-pointer hover:text-white transition-colors">Terms of Service</li>
          <li className="cursor-pointer hover:text-white transition-colors">Shipping Terms</li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto border-t border-white/10 mt-20 pt-10 flex flex-col md:flex-row justify-between items-center opacity-40 text-[10px] font-black uppercase tracking-[0.2em]">
      <span>© 2025 Glamour & Grace Nigeria</span>
      <span>Purely Professional Rituals</span>
    </div>
  </footer>
);

const App = () => {
  const [view, setView] = useState<View>('home');
  const [selectedProduct, setSelectedProduct] = useState<ProductId>('vlift');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view, selectedProduct]);

  const handleProductSelect = (id: ProductId) => {
    setSelectedProduct(id);
    setView('product');
  };

  return (
    <div className="min-h-screen selection:bg-pink-600 selection:text-white" style={{ backgroundColor: COLORS.background }}>
      <Navigation setView={setView} onProductSelect={handleProductSelect} />
      
      <AnimatePresence mode="wait">
        {view === 'home' ? (
          <HomePage key="home" onProductSelect={handleProductSelect} />
        ) : (
          <ProductPage key={selectedProduct} product={PRODUCTS[selectedProduct]} />
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
