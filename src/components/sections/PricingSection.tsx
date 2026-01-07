import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Loader2, 
  Check,
  Home,
  Layout,
  Building2,
  Box,
  ArrowRight,
  ShieldCheck,
  Info,
  Zap,
  ShoppingCart
} from "lucide-react";

// ==========================================
// 1. THEME & GLOBAL STYLES (Blue to Orange)
// ==========================================
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@700;900&family=Inter:wght@400;700;900&display=swap');
    .font-condensed { font-family: 'Roboto Condensed', sans-serif; }
    .font-pro { font-family: 'Inter', sans-serif; }
    
    /* Hazard striping using Realtor Blue */
    .bg-hazard-blue {
      background: repeating-linear-gradient(45deg, #0056b3, #0056b3 10px, #004494 10px, #004494 20px);
    }

    /* Hover Interaction for Cards */
    .realtor-card-hover:hover {
      border-top: 4px solid #F96302 !important;
      transition: all 0.3s ease;
    }
  `}</style>
);

const HERO_IMAGE = "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2301&auto=format&fit=crop";

const PriceLabel = ({ price, isDark, isSpecial }) => (
  <div className={`relative p-2 border-l-2 ${isSpecial ? 'bg-[#FCD200] border-black' : (isDark ? 'border-[#0056b3]' : 'border-gray-800')}`}>
    <div className="flex items-start leading-none">
      <span className={`text-[8px] font-black mr-0.5 mt-0.5 ${isSpecial ? 'text-black' : (isDark ? 'text-[#0056b3]' : 'text-gray-400')}`}>KES</span>
      <span className={`text-4xl font-condensed font-black tracking-tighter ${isSpecial ? 'text-black' : (isDark ? 'text-white' : 'text-gray-900')}`}>
        {price}
      </span>
      <div className="flex flex-col ml-1">
         <span className={`text-[8px] font-black uppercase ${isSpecial ? 'text-black' : (isDark ? 'text-[#0056b3]' : 'text-gray-900')}`}>/MO</span>
         <span className="text-[7px] font-bold text-gray-500 uppercase">Net</span>
      </div>
    </div>
  </div>
);

export default function RealtorPricingSection({ tiersLoading, navigate }) {
  // --- PERSISTENT CART LOGIC ---
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("realtor_selected_tiers");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("realtor_selected_tiers", JSON.stringify(cartItems));
    // Trigger custom event so Navbar knows to update count
    window.dispatchEvent(new Event("storage"));
  }, [cartItems]);

  const toggleCart = (id, price) => {
    if (cartItems.find(item => item.id === id)) {
      setCartItems(cartItems.filter(item => item.id !== id));
    } else {
      setCartItems([...cartItems, { id, price: parseInt(price.replace(',', '')) }]);
    }
  };

  const realtorTiers = [
    { id: "sr-101", name: "Single Room", code: "SKU: SR-101", price: "1,500", icon: <Box className="w-4 h-4" />, features: ["Rent Collection", "Condition Logging", "Tenant Ledger", "Basic Repairs"] },
    { id: "bs-pro", name: "Bed Sitter", code: "SKU: BS-PRO", price: "2,500", icon: <Layout className="w-4 h-4" />, features: ["Utility Splitting", "Inventory Checklist", "24/7 Support", "Vacancy Marketing"], isSpecial: true },
    { id: "1br-std", name: "One Bedroom", code: "SKU: 1BR-STD", price: "4,000", icon: <Home className="w-4 h-4" />, features: ["Lease Automation", "Digital Twin", "Screening Tools", "Legal Compliance"] },
    { id: "2br-lux", name: "Two Bedroom", code: "SKU: 2BR-LUX", price: "6,500", icon: <Building2 className="w-4 h-4" />, features: ["Multi-Tenant Billing", "Priority Dispatch", "Detailed Reporting", "Asset Insurance"], isDark: true }
  ];

  if (tiersLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-white">
        <Loader2 className="w-8 h-8 animate-spin text-[#0056b3]" /> 
        <span className="text-[10px] font-black uppercase tracking-[0.3em] mt-4">Syncing Realtor Catalog</span>
      </div>
    );
  }

  return (
    <div className="font-pro bg-[#F4F4F4] text-[#111] antialiased min-h-screen">
      <GlobalStyles />
      
      {/* HEADER: Blue Brand Theme */}
      <section className="relative h-[220px] w-full border-b-4 border-[#0056b3] bg-black overflow-hidden group">
        <img src={HERO_IMAGE} className="absolute inset-0 w-full h-full object-cover opacity-30 grayscale group-hover:grayscale-0 transition-all duration-700" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-2">
             <span className="bg-[#0056b3] group-hover:bg-[#F96302] transition-colors text-white text-[9px] font-black uppercase px-1.5 py-0.5 tracking-tighter">DEPT 04</span>
             <span className="h-[1px] w-8 bg-white/30"></span>
             <span className="text-white/60 text-[9px] font-bold uppercase tracking-widest italic">Official Realtor Rates</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-condensed font-black text-white uppercase italic leading-none">
            Realtor <span className="text-[#0056b3] group-hover:text-[#F96302] not-italic transition-colors">Logistics</span>
          </h1>
        </div>
      </section>

      {/* PRICING GRID */}
      <section className="max-w-7xl mx-auto px-4 -mt-8 relative z-20">
        <div className="bg-[#111] text-white px-4 py-2 flex justify-between items-center rounded-t-sm border-b border-white/10">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em]">Management Inventory v.2.6</h3>
            <div className="flex items-center gap-4">
                <span className="text-[9px] font-bold text-gray-400 uppercase">Items in Cart: {cartItems.length}</span>
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 bg-white shadow-2xl border border-gray-300">
            {realtorTiers.map((plan) => {
              const isInCart = cartItems.some(item => item.id === plan.id);
              return (
                <div 
                  key={plan.id} 
                  className={`realtor-card-hover flex flex-col p-5 border-r border-gray-200 last:border-r-0 transition-all duration-300 ${plan.isDark ? 'bg-[#1a1a1a]' : 'bg-white'}`}
                >
                  <div className="flex justify-between items-center mb-3">
                      <span className={`text-[8px] font-black uppercase tracking-widest ${plan.isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                          {plan.code}
                      </span>
                      {plan.isSpecial && <Zap className="w-3 h-3 text-[#0056b3] fill-[#0056b3]" />}
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                      <div className={`p-1 border transition-colors ${plan.isDark ? 'border-white/10 text-[#0056b3]' : 'border-gray-100 text-[#0056b3]'}`}>
                          {plan.icon}
                      </div>
                      <h2 className={`text-xl font-condensed font-black uppercase leading-none ${plan.isDark ? 'text-white' : 'text-gray-900'}`}>
                          {plan.name}
                      </h2>
                  </div>

                  <div className="mb-4">
                      <PriceLabel price={plan.price} isDark={plan.isDark} isSpecial={plan.isSpecial} />
                  </div>

                  <div className="flex-grow pt-4 border-t border-dashed border-gray-200 mb-6">
                      <ul className="space-y-2">
                          {plan.features.map((feature, idx) => (
                              <li key={idx} className="flex items-center gap-2">
                                  <Check className={`w-3 h-3 shrink-0 ${plan.isDark ? 'text-[#0056b3]' : 'text-[#0056b3]'}`} strokeWidth={4} />
                                  <span className={`text-[9px] font-black uppercase ${plan.isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                      {feature}
                                  </span>
                              </li>
                          ))}
                      </ul>
                  </div>

                  {/* ADD TO CART ACTION: Blue normally, Orange on Hover, Changes when Saved */}
                  <button
                      onClick={() => toggleCart(plan.id, plan.price)}
                      className={`
                          w-full py-2.5 flex items-center justify-between px-3 text-[10px] font-black uppercase tracking-widest border transition-all
                          ${isInCart 
                              ? 'bg-[#FCD200] border-[#FCD200] text-black' 
                              : 'bg-[#0056b3] border-[#0056b3] text-white hover:bg-[#F96302] hover:border-[#F96302]'
                          }
                      `}
                  >
                      <span>{isInCart ? 'In Your List' : 'Add to Account'}</span>
                      {isInCart ? <ShoppingCart className="w-3 h-3" /> : <ArrowRight className="w-3 h-3" />}
                  </button>
                </div>
              );
            })}
        </div>
      </section>

      {/* FOOTER */}
      <section className="max-w-7xl mx-auto px-4 mt-12 pb-20">
        <div className="bg-white border border-gray-300 flex flex-col md:flex-row items-center overflow-hidden hover:border-[#F96302] transition-colors group">
            <div className="bg-hazard-blue group-hover:bg-[#F96302] px-6 py-4 flex items-center justify-center w-full md:w-auto transition-colors duration-500">
                <ShieldCheck className="w-8 h-8 text-white" />
            </div>
            <div className="p-4 flex-grow flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                    <h4 className="text-lg font-condensed font-black uppercase leading-none italic">
                      REALTOR <span className="text-[#0056b3] group-hover:text-[#F96302]">PRO DESK</span>
                    </h4>
                    <p className="text-[9px] font-bold text-gray-500 uppercase mt-1">Bulk Management (50+ Units) • Professional Grade Verification</p>
                </div>
                <button className="bg-black text-white text-[9px] font-black uppercase px-6 py-2 tracking-widest hover:bg-[#F96302] transition-colors">
                    Request Catalog
                </button>
            </div>
        </div>
      </section>
    </div>
  );
}