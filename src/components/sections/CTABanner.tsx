import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  Search, 
  Key, 
  Home, 
  CheckCircle2,
  Heart
} from "lucide-react";

// ==========================================
// 1. STYLES (Industrial Realtor Branding)
// ==========================================
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,700;0,900;1,900&family=Inter:wght@400;700;900&display=swap');
    
    .font-condensed { font-family: 'Roboto Condensed', sans-serif; }
    .font-pro { font-family: 'Inter', sans-serif; }
    
    /* Dynamic Brand Colors */
    .bg-realtor-blue { background-color: #0056b3; }
    .hover-realtor-orange:hover { background-color: #F96302 !important; }
    
    .bg-texture-stripes {
      background-image: repeating-linear-gradient(
        -45deg,
        transparent,
        transparent 8px,
        rgba(0, 0, 0, 0.04) 8px,
        rgba(0, 0, 0, 0.04) 16px
      );
    }
  `}</style>
);

export default function TenantCTABanner() {
  // Persistence Logic: Save state to LocalStorage
  const [isSaved, setIsSaved] = useState(() => {
    const saved = localStorage.getItem("realtor_unit_saved");
    return saved === "true";
  });

  useEffect(() => {
    localStorage.setItem("realtor_unit_saved", isSaved);
  }, [isSaved]);

  return (
    <>
    <GlobalStyles />
    <section className="w-full bg-[#F4F4F4] py-8 px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.99 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto relative shadow-2xl border border-black/10"
      >
        
        {/* MAIN CONTAINER: Starts Blue, Hovers Orange */}
        <div className="bg-realtor-blue hover-realtor-orange bg-texture-stripes flex flex-col lg:flex-row items-stretch relative z-10 overflow-hidden transition-colors duration-500 ease-in-out">
          
          {/* DECORATIVE: High-Visibility Tag */}
          <div className="absolute top-3 -right-10 bg-[#FCD200] text-black text-[8px] font-black uppercase px-10 py-1 rotate-45 shadow-md z-20 border border-black/10 tracking-tighter">
              Verified Units
          </div>

          {/* LEFT: VISUAL */}
          <div className="hidden lg:flex w-48 bg-black/15 items-center justify-center p-4 relative border-r border-white/10">
             <div className="w-24 h-24 bg-white rounded-sm shadow-xl flex items-center justify-center border-2 border-white transform -rotate-2 relative">
                <Home className="w-10 h-10 text-[#0056b3]" />
                <div className="absolute -bottom-2 -right-2 bg-[#111] text-white p-1.5 rounded-sm border border-white">
                    <Key className="w-3.5 h-3.5" />
                </div>
             </div>
          </div>

          {/* CENTER: TEXT CONTENT */}
          <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
             
             <div className="inline-block bg-[#111] text-white text-[8px] font-black uppercase px-1.5 py-0.5 mb-2 tracking-[0.15em] w-fit">
                Realtor Exclusive
             </div>

             <h2 className="font-condensed font-black text-3xl md:text-4xl text-white uppercase italic leading-[0.85] mb-1 drop-shadow-sm">
                Find <span className="text-[#111]">Affordable</span> <br/>
                <span className="underline decoration-2 decoration-white/40">Clean Apartments</span>
             </h2>
             
             <p className="text-white font-pro font-bold text-[11px] mb-4 max-w-md uppercase tracking-tight opacity-90 leading-tight">
                Vetted units with standard finishes and secure access. All listings verified by site inspections.
             </p>
             
             <div className="flex flex-wrap gap-2 text-white text-[9px] font-black uppercase">
                <span className="flex items-center gap-1 bg-black/20 px-2 py-0.5 border border-white/10">
                  <CheckCircle2 className="w-3 h-3 text-[#FCD200]" /> Water & Power
                </span>
                <span className="flex items-center gap-1 bg-black/20 px-2 py-0.5 border border-white/10">
                  <CheckCircle2 className="w-3 h-3 text-[#FCD200]" /> 24/7 Security
                </span>
             </div>
          </div>

          {/* RIGHT: ACTION AREA */}
          <div className="w-full lg:w-72 bg-black/25 p-6 flex flex-col justify-center gap-2 border-l border-white/10">
             <div className="mb-2">
                <span className="text-white/70 text-[8px] font-black uppercase tracking-widest block leading-none mb-1 text-center lg:text-left">Standard Rate From</span>
                <div className="text-white font-condensed font-black text-3xl tracking-tighter text-center lg:text-left">
                  KES <span className="text-white">8,000</span><span className="text-[10px] text-white/60 ml-1">/MO</span>
                </div>
             </div>

             <button className="bg-white text-black hover:bg-[#111] hover:text-white transition-all w-full py-2.5 text-[10px] font-black uppercase tracking-widest shadow-md flex items-center justify-center gap-2 group border border-transparent">
                <Search className="w-3.5 h-3.5" /> Start Search
             </button>
             
             {/* SAVE TO CART BUTTON: Persistence logic applied here */}
             <button 
                onClick={() => setIsSaved(!isSaved)}
                className={`transition-all w-full py-2 text-[9px] font-black uppercase tracking-widest flex items-center justify-center gap-2 border 
                ${isSaved ? 'bg-[#FCD200] border-[#FCD200] text-black' : 'border-white/40 text-white hover:bg-white/10'}`}
             >
                <Heart className={`w-3 h-3 ${isSaved ? 'fill-black' : ''}`} />
                {isSaved ? 'Saved to Interest List' : 'Save for Later'}
             </button>
          </div>

        </div>

        {/* BOTTOM STRIP */}
        <div className="bg-white py-1 px-4 flex justify-between items-center text-[7.5px] font-black text-gray-400 uppercase tracking-[0.2em] border-x border-b border-gray-300">
           <div className="flex items-center gap-4">
             <span>* Rates subject to verification</span>
             <span className="h-2 w-[1px] bg-gray-200"></span>
             <span>Ref: REALTOR-PRO-04</span>
           </div>
           <span className="hidden sm:block">Update Cycle: 24H</span>
        </div>

      </motion.div>
    </section>
    </>
  );
}