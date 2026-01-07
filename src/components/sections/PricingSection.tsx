import React from "react";
import { motion } from "framer-motion";
import { 
  Loader2, 
  Check,
  ChevronRight,
  Home,
  Layout,
  Building2,
  Box,
  ArrowRight,
  ShieldCheck,
  Info,
  Ruler,
  Hammer,
  ClipboardList
} from "lucide-react";

// ==========================================
// 1. GLOBAL STYLES & THEME
// ==========================================
const THEME = {
  HD_ORANGE: "#F96302", // The Brand Orange
  HD_BLACK: "#111111",
  HD_GREY: "#F5F5F5",
  SPECIAL_YELLOW: "#FCD200" // "Special Buy" Yellow
};

const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@400;700;900&family=Roboto:wght@400;500;700;900&display=swap');
    
    .font-condensed { font-family: 'Roboto Condensed', sans-serif; }
    .font-standard { font-family: 'Roboto', sans-serif; }
    
    .hd-shadow { box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); }
    
    /* Diagonal Hazard Pattern */
    .bg-hazard {
      background: repeating-linear-gradient(
        45deg,
        #F5F5F5,
        #F5F5F5 10px,
        #E5E5E5 10px,
        #E5E5E5 20px
      );
    }
  `}</style>
);

const HERO_IMAGE = "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2301&auto=format&fit=crop";

// ==========================================
// 2. HELPER COMPONENTS
// ==========================================

// The "Shelf Label" Price Component
const PriceLabel = ({ price, isDark, isSpecial }) => (
  <div className={`
    relative p-3 border-l-4 
    ${isSpecial ? 'bg-[#FCD200] border-black text-black' : 'bg-transparent border-[#F96302]'}
  `}>
    <div className="flex items-start leading-none">
      <span className={`text-[10px] font-bold mt-1 mr-1 ${isSpecial ? 'text-black' : 'text-gray-500'}`}>KES</span>
      <span className={`text-6xl font-condensed font-black tracking-tighter ${isSpecial ? 'text-black' : 'text-[#111]'}`}>
        {price}
      </span>
      <div className="flex flex-col ml-1 justify-center">
         <span className={`text-[10px] font-black uppercase ${isSpecial ? 'text-black' : 'text-[#F96302]'}`}>/MO</span>
         <span className={`text-[9px] font-bold uppercase ${isSpecial ? 'text-black/70' : 'text-gray-400'}`}>+VAT</span>
      </div>
    </div>
    {isSpecial && (
      <div className="absolute top-0 right-0 bg-black text-white text-[9px] font-black px-1 py-0.5 uppercase">
        Special Value
      </div>
    )}
  </div>
);

// ==========================================
// 3. MAIN COMPONENT
// ==========================================
export default function RealtorPricingSection({ tiersLoading, tiersError, navigate }) {

  const realtorTiers = [
    {
      id: "single-room",
      name: "Single Room",
      code: "SVC-SR-101",
      price: "1,500",
      description: "Basic entry-level management for single occupancy units.",
      icon: <Box className="w-5 h-5" />,
      features: ["Rent Collection", "Condition Logging", "Tenant Ledger", "Basic Repairs"],
      status: "Standard Rate",
      isDark: false,
      tag: "ECONOMY"
    },
    {
      id: "bed-sitter",
      name: "Bed Sitter",
      code: "SVC-BS-PRO",
      price: "2,500",
      description: "Comprehensive oversight for studio & compact living spaces.",
      icon: <Layout className="w-5 h-5" />,
      features: ["Utility Splitting", "Inventory Checklist", "24/7 Support", "Vacancy Marketing"],
      status: "On Offer",
      isDark: false,
      isSpecial: true, // Triggers Yellow "Special Buy" look
      tag: "BEST SELLER"
    },
    {
      id: "one-bedroom",
      name: "One Bedroom",
      code: "SVC-1BR-STD",
      price: "4,000",
      description: "Full-service management for standard residential apartments.",
      icon: <Home className="w-5 h-5" />,
      features: ["Lease Automation", "Digital Twin", "Screening Tools", "Legal Compliance"],
      status: "Standard Rate",
      isDark: false,
      tag: "POPULAR"
    },
    {
      id: "two-bedroom",
      name: "Two Bedroom",
      code: "SVC-2BR-LUX",
      price: "6,500",
      description: "Premium family-unit management with priority maintenance.",
      icon: <Building2 className="w-5 h-5" />,
      features: ["Multi-Tenant Billing", "Priority Dispatch", "Detailed Reporting", "Asset Insurance"],
      status: "Standard Rate",
      isDark: true, // "Pro" dark look
      tag: "CONTRACTOR GRADE"
    }
  ];

  if (tiersLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-white">
        <Loader2 className="w-12 h-12 animate-spin mb-4 text-[#F96302]" /> 
        <span className="text-[#111] font-condensed font-black text-xl uppercase tracking-widest">Loading Catalog...</span>
      </div>
    );
  }

  return (
    <>
    <GlobalStyles />
    <div id="pricing" className="font-standard text-[#111] bg-white antialiased min-h-screen pb-24">
      
      {/* ===========================================================================
          HEADER - "The Contractor's Desk"
      =========================================================================== */}
      <section className="relative h-[300px] w-full overflow-hidden border-b-[6px] border-[#F96302]">
        <div className="absolute inset-0">
          <img src={HERO_IMAGE} alt="Construction Site" className="w-full h-full object-cover grayscale brightness-[0.3]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#111] via-[#111]/80 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 h-full flex flex-col justify-center">
          
          <div className="flex items-center gap-2 mb-4">
             <span className="bg-[#F96302] text-white text-xs font-black uppercase px-2 py-1">Department 04</span>
             <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">Property Services</span>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-5xl md:text-7xl font-condensed font-black text-white mb-2 uppercase italic leading-[0.9]">
              Management <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F96302] to-orange-400 not-italic">Rates & Services</span>
            </h1>
            <p className="text-gray-300 font-bold max-w-lg mt-4 border-l-2 border-[#F96302] pl-4">
              Professional grade software for landlords. Select your unit type below to view monthly service fees.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===========================================================================
          THE "AISLE" - Pricing Grid
      =========================================================================== */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-6 -mt-12 relative z-20">
        
        {/* Department Header */}
        <div className="bg-[#333] text-white p-3 flex justify-between items-center rounded-t-md">
            <h3 className="font-condensed font-bold uppercase tracking-widest text-lg">Select Service Plan</h3>
            <div className="text-[10px] font-mono text-gray-400 hidden md:block">UPDATED: JAN 2026</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border-x border-b border-gray-300 bg-gray-100 shadow-2xl">
            {realtorTiers.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`
                  relative flex flex-col p-6 border-b md:border-b-0 md:border-r border-gray-300 group
                  ${plan.isDark ? 'bg-[#222]' : 'bg-white'}
                `}
              >
                {/* Status Bar */}
                <div className="flex justify-between items-center mb-4">
                    <span className={`text-[9px] font-black uppercase tracking-[0.15em] ${plan.isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                        Code: {plan.code}
                    </span>
                    {plan.status === "On Offer" && (
                         <span className="text-[10px] font-black uppercase text-[#F96302] animate-pulse">
                             Limited Offer
                         </span>
                    )}
                </div>

                {/* Product Name & Icon */}
                <div className="mb-6">
                    <div className="flex items-center gap-3 mb-2">
                        <div className={`p-1.5 border-2 ${plan.isDark ? 'border-[#444] text-[#F96302]' : 'border-gray-200 text-[#333]'}`}>
                            {plan.icon}
                        </div>
                        <h2 className={`text-3xl font-condensed font-black uppercase leading-none ${plan.isDark ? 'text-white' : 'text-[#111]'}`}>
                            {plan.name}
                        </h2>
                    </div>
                    <div className={`h-1 w-12 ${plan.isSpecial ? 'bg-[#F96302]' : 'bg-gray-200'}`}></div>
                </div>

                {/* Price Display */}
                <div className="mb-6">
                    <PriceLabel price={plan.price} isDark={plan.isDark} isSpecial={plan.isSpecial} />
                    <p className={`mt-3 text-xs font-bold leading-tight ${plan.isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {plan.description}
                    </p>
                </div>

                {/* Specs / Features */}
                <div className="flex-grow">
                    <div className={`border-b-2 border-dashed mb-3 ${plan.isDark ? 'border-[#444]' : 'border-gray-200'}`}></div>
                    <h4 className={`text-[10px] font-black uppercase mb-3 ${plan.isDark ? 'text-[#F96302]' : 'text-gray-800'}`}>
                        Plan Specifications
                    </h4>
                    <ul className="space-y-2.5 mb-8">
                        {plan.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-2.5">
                                <Check className={`w-4 h-4 shrink-0 ${plan.isSpecial ? 'text-green-600' : (plan.isDark ? 'text-[#F96302]' : 'text-[#F96302]')}`} strokeWidth={3} />
                                <span className={`text-xs font-bold uppercase ${plan.isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                                    {feature}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* CTA Button */}
                <div className="mt-auto">
                    <button
                        onClick={() => navigate(`/auth?mode=signup&plan=${plan.id}`)}
                        className={`
                            w-full h-12 flex items-center justify-between px-4 text-sm font-condensed font-black uppercase tracking-wider border-2 transition-all
                            ${plan.isSpecial 
                                ? 'bg-[#F96302] border-[#F96302] text-white hover:bg-[#d85502]' 
                                : (plan.isDark 
                                    ? 'bg-transparent border-gray-600 text-white hover:border-[#F96302] hover:text-[#F96302]' 
                                    : 'bg-transparent border-[#333] text-[#333] hover:bg-[#333] hover:text-white')
                            }
                        `}
                    >
                        <span>Select Plan</span>
                        <ArrowRight className="w-4 h-4" />
                    </button>
                    {plan.isSpecial && (
                        <div className="text-center mt-2 text-[10px] font-bold text-[#F96302] uppercase">
                            * Includes Free Onboarding
                        </div>
                    )}
                </div>
              </motion.div>
            ))}
        </div>
      </section>

      {/* ===========================================================================
          PRO SERVICES - "Pro Desk"
      =========================================================================== */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-6 mt-16">
        <div className="bg-hazard p-1"> {/* Hazard Pattern Border */}
            <div className="bg-white p-8 md:p-12 flex flex-col md:flex-row items-center justify-between border border-gray-300 gap-8">
                
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                    <div className="bg-[#333] p-4 text-white">
                        <ShieldCheck className="w-10 h-10" />
                    </div>
                    <div>
                        <h4 className="text-3xl md:text-4xl font-condensed font-black uppercase text-[#111] leading-none mb-1">
                            Commercial <span className="text-[#F96302]">Pro Desk</span>
                        </h4>
                        <p className="text-sm font-bold text-gray-600 uppercase">
                            For Portfolios over 50+ Units • Custom API Access • Dedicated Account Manager
                        </p>
                    </div>
                </div>

                <div className="flex gap-4">
                     <button className="h-12 px-8 bg-[#333] text-white text-xs font-black uppercase tracking-widest hover:bg-[#F96302] transition-colors">
                        Request Quote
                     </button>
                </div>

            </div>
        </div>
        
        {/* Footer Fine Print */}
        <div className="mt-8 flex items-start gap-2 text-[10px] text-gray-400 font-medium max-w-4xl mx-auto text-center md:text-left">
            <Info className="w-4 h-4 shrink-0" />
            <p>
                Standard prices listed above are for software access only. Management fees are billed separately. 
                "On Offer" rates apply to the first 12 months of service. 
                Service availability depends on building verification status.
            </p>
        </div>
      </section>

    </div>
    </>
  );
}