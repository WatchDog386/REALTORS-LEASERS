import React from "react";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  Search, 
  Key, 
  Home, 
  CheckCircle2 
} from "lucide-react";

// ==========================================
// 1. STYLES (Fonts & Textures)
// ==========================================
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,400;0,700;0,900;1,900&display=swap');
    
    .font-condensed { font-family: 'Roboto Condensed', sans-serif; }
    
    /* The "Home Depot" Orange Background */
    .bg-retail-orange {
      background-color: #F96302;
    }
    
    /* Diagonal Stripe Texture (Industrial/Retail feel) */
    .bg-texture-stripes {
      background-image: repeating-linear-gradient(
        -45deg,
        transparent,
        transparent 10px,
        rgba(0, 0, 0, 0.05) 10px,
        rgba(0, 0, 0, 0.05) 20px
      );
    }
  `}</style>
);

export default function TenantCTABanner() {
  return (
    <>
    <GlobalStyles />
    <section className="w-full bg-white py-12 px-4 border-t border-b border-gray-200">
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-[1366px] mx-auto relative shadow-xl"
      >
        
        {/* MAIN CONTAINER */}
        <div className="bg-retail-orange bg-texture-stripes flex flex-col lg:flex-row items-stretch relative z-10 overflow-hidden">
          
          {/* DECORATIVE: "Verified" Yellow Corner Tag */}
          <div className="absolute top-4 -right-12 bg-[#FCD200] text-black text-[10px] font-condensed font-black uppercase px-12 py-1 rotate-45 shadow-sm z-20 border border-yellow-500">
             Verified Listings
          </div>

          {/* LEFT: VISUAL (Mimics a Product Image) */}
          <div className="hidden md:flex w-1/4 bg-black/10 items-center justify-center p-8 relative border-r border-white/10">
             <div className="w-32 h-32 bg-white rounded-sm shadow-2xl flex items-center justify-center border-4 border-white transform -rotate-3">
                <Home className="w-16 h-16 text-[#F96302]" />
                <div className="absolute -bottom-3 -right-3 bg-[#333] text-white p-2 rounded-full border-2 border-white">
                    <Key className="w-5 h-5" />
                </div>
             </div>
          </div>

          {/* CENTER: TEXT CONTENT */}
          <div className="flex-1 p-8 md:p-10 flex flex-col justify-center text-center lg:text-left">
             
             {/* Small "Department" Label */}
             <div className="inline-block bg-[#333] text-white text-[9px] font-black uppercase px-2 py-1 mb-3 tracking-[0.2em] self-center lg:self-start">
                Residential Rentals
             </div>

             <h2 className="font-condensed font-black text-4xl md:text-5xl text-white uppercase italic leading-[0.9] mb-2 drop-shadow-md">
                Find <span className="text-[#111]">Affordable</span> & <br/>
                <span className="underline decoration-4 decoration-white/30">Clean Apartments</span>
             </h2>
             
             <p className="text-white font-medium text-lg font-condensed mb-6 max-w-xl">
                Move-in ready units vetted for quality. Standard finishes, secure locations, and transparent pricing.
             </p>
             
             {/* Checklist (Retail Style) */}
             <div className="flex flex-wrap justify-center lg:justify-start gap-3 md:gap-6 text-white/90 text-xs font-bold uppercase tracking-wide">
                <span className="flex items-center gap-1.5 bg-black/20 px-3 py-1 rounded-sm">
                  <CheckCircle2 className="w-4 h-4 text-[#FCD200]" /> Water & Electricity
                </span>
                <span className="flex items-center gap-1.5 bg-black/20 px-3 py-1 rounded-sm">
                  <CheckCircle2 className="w-4 h-4 text-[#FCD200]" /> Security Guard
                </span>
                <span className="flex items-center gap-1.5 bg-black/20 px-3 py-1 rounded-sm">
                  <CheckCircle2 className="w-4 h-4 text-[#FCD200]" /> Tiled Floors
                </span>
             </div>
          </div>

          {/* RIGHT: ACTION AREA */}
          <div className="w-full lg:w-1/4 bg-black/20 p-8 flex flex-col justify-center gap-3 border-l border-white/10">
             <div className="text-center mb-2">
                <span className="text-white text-[10px] font-bold uppercase tracking-widest">Rent Starting At</span>
                <div className="text-[#FCD200] font-black text-3xl font-condensed">KES 8,000<span className="text-sm align-top text-white">/mo</span></div>
             </div>

             <button className="bg-white text-[#F96302] hover:bg-[#111] hover:text-white transition-colors w-full py-4 text-sm font-condensed font-black uppercase tracking-[0.15em] shadow-lg flex items-center justify-center gap-2 group">
                <Search className="w-4 h-4" /> Find A Home
             </button>
             
             <button className="border-2 border-white text-white hover:bg-white hover:text-[#F96302] transition-colors w-full py-3 text-xs font-condensed font-black uppercase tracking-[0.15em] flex items-center justify-center gap-2">
                View Map <ArrowRight className="w-3 h-3" />
             </button>
          </div>

        </div>

        {/* BOTTOM STRIP: Disclaimer */}
        <div className="bg-[#EAEAEA] py-2 px-4 flex justify-between items-center text-[9px] font-bold text-gray-500 uppercase tracking-widest border-x border-b border-gray-300">
           <span>*Prices vary by location. Subject to availability.</span>
           <span className="hidden sm:block">Updated: January 2025</span>
        </div>

      </motion.div>
    </section>
    </>
  );
}