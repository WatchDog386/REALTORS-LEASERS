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
  Zap,
  ShoppingCart,
  Trash2,
  Settings
} from "lucide-react";

// ==========================================
// 1. THEME & GLOBAL STYLES (POLISHED HOVER & BASE SHADOW)
// ==========================================
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@700;900&family=Inter:wght@400;700;900&display=swap');
    .font-condensed { font-family: 'Roboto Condensed', sans-serif; }
    .font-pro { font-family: 'Inter', sans-serif; }
    
    /* Hazard striping for footer */
    .bg-hazard-blue {
      background: repeating-linear-gradient(45deg, #0056b3, #0056b3 10px, #004494 10px, #004494 20px);
    }

    /* --- UPDATED POLISHED EFFECTS --- */
    .realtor-card-base {
      /* ADDED: Base shadow for all packages ("Show effect") */
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);

      /* Smooth transition for transform, shadow, and background colors */
      transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), 
                  box-shadow 0.4s cubic-bezier(0.25, 0.8, 0.25, 1),
                  background-color 0.3s ease;
      will-change: transform, box-shadow;
    }

    .realtor-card-base:hover {
      /* A distinct, heavier architectural lift on interaction */
      transform: translateY(-8px);
      
      /* Deeper, multi-layered shadow on hover */
      box-shadow: 
        0 2px 4px rgba(0,0,0,0.05), 
        0 12px 24px rgba(0,0,0,0.08), 
        0 25px 35px -10px rgba(0, 86, 179, 0.15);
    }

    /* Specific tweak: lighten the dark card slightly on hover */
    .bg-\[\#1a1a1a\].realtor-card-base:hover {
       background-color: #222222;
       border-color: #333;
    }
  `}</style>
);

// ... (PriceLabel component remains unchanged) ...
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

export default function RealtorPricingSection({ tiersLoading }) {
  // --- PERSISTENT CART LOGIC ---
  const [cartItems, setCartItems] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("realtor_selected_tiers");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("realtor_selected_tiers", JSON.stringify(cartItems));
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
    { id: "sr-101", name: "Single Room", code: "SKU: SR-101", price: "9,500", icon: <Box className="w-4 h-4" />, features: ["Rent Collection", "Condition Logging", "Tenant Ledger", "Basic Repairs"] },
    { id: "bs-pro", name: "Bed Sitter", code: "SKU: BS-PRO", price: "10,500", icon: <Layout className="w-4 h-4" />, features: ["Utility Splitting", "Inventory Checklist", "24/7 Support", "Vacancy Marketing"], isSpecial: true },
    { id: "1br-std", name: "One Bedroom", code: "SKU: 1BR-STD", price: "13,500", icon: <Home className="w-4 h-4" />, features: ["Lease Automation", "Digital Twin", "Screening Tools", "Legal Compliance"] },
    { id: "2br-lux", name: "Two Bedroom", code: "SKU: 2BR-LUX", price: "15,500", icon: <Building2 className="w-4 h-4" />, features: ["Multi-Tenant Billing", "Priority Dispatch", "Detailed Reporting", "Asset Insurance"], isDark: true }
  ];

  if (tiersLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-40 bg-white">
        <Loader2 className="w-8 h-8 animate-spin text-[#0056b3]" /> 
      </div>
    );
  }

  return (
    <div className="font-pro bg-white text-[#111] antialiased w-full">
      <GlobalStyles />
      
      {/* SEAMLESS CONTAINER */}
      <section className="max-w-7xl mx-auto px-4 pt-0 pb-12">
        
        {/* Simple Section Header */}
        <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-4">
           <div>
             <h2 className="text-xl font-bold text-[#333] flex items-center gap-2 uppercase tracking-tight">
               <Settings className="text-[#0056b3]" size={20} />
               Management Rates
             </h2>
             <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mt-1 ml-7">Transparent pricing. No hidden fees.</p>
           </div>
           {cartItems.length > 0 && (
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase text-[#0056b3] bg-blue-50 px-3 py-1.5 rounded-sm border border-blue-100">
                 <ShoppingCart size={12} /> {cartItems.length} Selected
              </div>
           )}
        </div>

        {/* PRICING GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {realtorTiers.map((plan) => {
              const isInCart = cartItems.some(item => item.id === plan.id);
              return (
                <div 
                  key={plan.id} 
                  // Updated class name to realtor-card-base and removed the yellow ring conditional
                  className={`
                    realtor-card-base group flex flex-col p-6 border relative rounded-sm transition-all
                    ${plan.isDark ? 'bg-[#1a1a1a] border-[#1a1a1a]' : 'bg-white border-gray-200'}
                  `}
                >
                  {/* Active Indicator */}
                  {isInCart && (
                    <div className="absolute top-0 right-0 bg-[#0056b3] text-white text-[8px] font-black px-3 py-1 uppercase z-10 shadow-sm">
                      Selected
                    </div>
                  )}

                  <div className="flex justify-between items-center mb-4">
                      <span className={`text-[9px] font-black uppercase tracking-[0.15em] ${plan.isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                          {plan.code}
                      </span>
                      {plan.isSpecial && <Zap className="w-4 h-4 text-[#0056b3] fill-[#0056b3]" />}
                  </div>

                  <div className="flex items-center gap-3 mb-5">
                      <div className={`p-1.5 border transition-colors ${plan.isDark ? 'border-white/10 text-[#0056b3] bg-white/5' : 'border-gray-100 text-[#0056b3] bg-gray-50'}`}>
                          {React.cloneElement(plan.icon, { className: "w-5 h-5" })}
                      </div>
                      <h2 className={`text-2xl font-condensed font-black uppercase leading-none ${plan.isDark ? 'text-white' : 'text-gray-900'}`}>
                          {plan.name}
                      </h2>
                  </div>

                  <div className="mb-6">
                      <PriceLabel price={plan.price} isDark={plan.isDark} isSpecial={plan.isSpecial} />
                  </div>

                  <div className="flex-grow pt-5 border-t border-dashed border-gray-200/50 mb-6">
                      <ul className="space-y-3">
                          {plan.features.map((feature, idx) => (
                              <li key={idx} className="flex items-start gap-3">
                                  <Check className={`w-4 h-4 shrink-0 mt-0.5 ${plan.isDark ? 'text-[#0056b3]' : 'text-[#0056b3]'}`} strokeWidth={3} />
                                  <span className={`text-[10px] font-bold uppercase tracking-wide ${plan.isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                                      {feature}
                                  </span>
                              </li>
                          ))}
                      </ul>
                  </div>

                  {/* ADD TO CART ACTION */}
                  <button
                      onClick={() => toggleCart(plan.id, plan.price)}
                      className={`
                          w-full py-3 flex items-center justify-between px-4 text-[10px] font-black uppercase tracking-[0.2em] border transition-all rounded-sm shadow-sm
                          ${isInCart 
                              ? 'bg-[#FCD200] border-[#FCD200] text-black hover:bg-[#e5be00]' 
                              : 'bg-[#0056b3] border-[#0056b3] text-white hover:bg-[#004494] group-hover:shadow-md'
                          }
                      `}
                  >
                      <span>{isInCart ? 'Remove Plan' : 'Select Plan'}</span>
                      {isInCart ? <Trash2 className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                  </button>
                </div>
              );
            })}
        </div>
      </section>
      
      {/* ... Footer Section (Unchanged) ... */}
      <section className="max-w-7xl mx-auto px-4 pb-24">
        <div className="bg-gray-50 border border-gray-200 flex flex-col md:flex-row items-center overflow-hidden hover:border-gray-300 transition-colors group rounded-sm shadow-sm">
            <div className="bg-hazard-blue px-8 py-6 flex items-center justify-center w-full md:w-auto transition-colors duration-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10 mix-blend-overlay"></div>
                <ShieldCheck className="w-10 h-10 text-white relative z-10" />
            </div>
            <div className="p-6 flex-grow flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                    <h4 className="text-xl font-condensed font-black uppercase leading-none italic text-[#333]">
                      REALTOR <span className="text-[#0056b3]">PRO DESK</span>
                    </h4>
                    <p className="text-[10px] font-bold text-gray-500 uppercase mt-2 tracking-wider">Enterprise solutions for portfolios over 50 units.</p>
                </div>
                <button className="bg-[#111] text-white text-[10px] font-black uppercase px-8 py-3 tracking-[0.2em] hover:bg-[#0056b3] transition-colors rounded-sm whitespace-nowrap">
                    Contact Sales
                </button>
            </div>
        </div>
      </section>
    </div>
  );
}