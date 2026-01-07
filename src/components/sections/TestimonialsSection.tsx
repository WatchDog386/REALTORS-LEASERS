import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, Star, ShieldCheck, ThumbsUp } from "lucide-react";

const THEME = {
  BLUE: "#0056b3",
  ORANGE: "#F96302",
  BLACK: "#111111",
  GRAY: "#F4F4F4",
  BORDER: "#E5E5E5"
};

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      headline: "Best ROI Tool I've Used",
      quote: "Managing my 12-unit apartment block used to take me 15 hours a week. With Realtor Pro's automated rent collection, I'm down to 2 hours. The cashflow dashboard is essential.",
      name: "James K.",
      location: "Nairobi, Kilimani",
      role: "Property Owner",
      rating: 5,
      verified: true
    },
    {
      id: 2,
      headline: "Finally, Transparency!",
      quote: "As a tenant, I hated guessing if my rent check cleared. This portal sends me an instant SMS receipt and lets me track my maintenance requests in real-time.",
      name: "Sarah M.",
      location: "Mombasa, Nyali",
      role: "Verified Renter",
      rating: 5,
      verified: true
    },
    {
      id: 3,
      headline: "Maintenance Workflow is Solid",
      quote: "I run a plumbing business. The work orders come through this system with photos and clear descriptions. It makes billing the landlords so much faster.",
      name: "David O.",
      location: "Nakuru",
      role: "Contractor",
      rating: 4,
      verified: true
    },
    {
      id: 4,
      headline: "Great for Multi-Unit",
      quote: "We scaled from 50 to 200 units last year. The 'Unit Volumetrics' feature helped us audit our cleaning costs per square foot accurately.",
      name: "Metro Housing Ltd.",
      location: "Nairobi, CBD",
      role: "Portfolio Manager",
      rating: 5,
      verified: true
    }
  ];

  const totalPages = Math.ceil(testimonials.length / 2);
  const nextSlide = () => setActiveIndex((prev) => (prev + 1) % totalPages);
  const prevSlide = () => setActiveIndex((prev) => (prev - 1 + totalPages) % totalPages);

  const currentPair = testimonials.slice(activeIndex * 2, activeIndex * 2 + 2);

  return (
    <section 
      id="testimonials" 
      className="py-20 bg-[#F4F4F4] font-sans text-[#111] scroll-mt-28 border-t border-gray-200"
    >
      <div className="max-w-[1320px] mx-auto px-6">
        
        {/* 1. INDUSTRIAL HEADER: Blue border, Orange highlight */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-l-8 border-[#0056b3] pl-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
               <div className="flex text-[#F96302]">
                 {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
               </div>
               <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Audit Grade: 4.9/5 stars</span>
            </div>
            <h2 className="text-4xl font-black text-[#111] uppercase tracking-tighter leading-none italic">
              Verified <span className="text-[#0056b3]">Performance.</span>
            </h2>
          </div>
          
          {/* Navigation Controls: Blue & Orange Interaction */}
          <div className="flex gap-2 mt-6 md:mt-0">
             <button onClick={prevSlide} className="p-4 bg-white border border-gray-300 text-[#0056b3] hover:border-[#F96302] hover:text-[#F96302] transition-all">
                <ChevronLeft className="w-6 h-6" />
             </button>
             <button onClick={nextSlide} className="p-4 bg-[#0056b3] text-white hover:bg-[#F96302] transition-colors">
                <ChevronRight className="w-6 h-6" />
             </button>
          </div>
        </div>

        {/* 2. REVIEW GRID */}
        <div className="relative min-h-[400px]">
           <AnimatePresence mode="wait">
             <motion.div
               key={activeIndex}
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -10 }}
               transition={{ duration: 0.3 }}
               className="grid grid-cols-1 md:grid-cols-2 gap-6"
             >
               {currentPair.map((item) => (
                 <div 
                   key={item.id}
                   className="bg-white p-8 border border-gray-200 flex flex-col h-full relative group hover:border-[#0056b3] transition-all shadow-sm"
                 >
                   {/* Header: Blue Stars & Orange Badge */}
                   <div className="flex justify-between items-start mb-6">
                     <div className="flex text-[#0056b3]">
                        {[...Array(item.rating)].map((_, i) => (
                           <Star key={i} className="w-5 h-5 fill-current" />
                        ))}
                     </div>
                     {item.verified && (
                       <div className="flex items-center gap-1 text-[9px] font-black uppercase tracking-widest text-white bg-[#F96302] px-2 py-1">
                         <ShieldCheck className="w-3 h-3" /> {item.role}
                       </div>
                     )}
                   </div>

                   {/* Content */}
                   <h3 className="text-xl font-black text-[#111] uppercase tracking-tight mb-3 group-hover:text-[#0056b3] transition-colors">
                     {item.headline}
                   </h3>
                   <p className="text-sm text-gray-600 leading-relaxed mb-8 flex-grow italic">
                     "{item.quote}"
                   </p>

                   {/* Footer: Blue Accents */}
                   <div className="pt-6 border-t border-dashed border-gray-200 flex items-center justify-between">
                     <div>
                       <p className="font-black text-sm uppercase text-[#111]">{item.name}</p>
                       <p className="text-[10px] text-[#0056b3] font-bold uppercase tracking-widest">{item.location}</p>
                     </div>
                     <div className="flex items-center gap-1 text-gray-400 text-[10px] font-black uppercase tracking-wider cursor-pointer hover:text-[#F96302] transition-colors">
                       <ThumbsUp className="w-4 h-4" /> Helpful
                     </div>
                   </div>

                   {/* Industrial Decor: Blue Corner for Group Hover */}
                   <div className="absolute top-0 left-0 w-0 h-0 border-t-[15px] border-t-[#0056b3] border-r-[15px] border-r-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                 </div>
               ))}
             </motion.div>
           </AnimatePresence>
        </div>

        {/* 3. TRUST BANNER: Charcoal Black with Blue/Orange accents */}
        <div className="mt-12 bg-[#111] p-8 flex flex-col md:flex-row items-center justify-between gap-6 border-b-4 border-[#F96302]">
           <div className="flex items-center gap-4">
              <div className="bg-[#0056b3] p-3">
                <Quote className="w-8 h-8 text-white fill-current" />
              </div>
              <div>
                 <h4 className="text-white font-black uppercase tracking-widest text-lg leading-none">Global <span className="text-[#F96302]">Confidence.</span></h4>
                 <p className="text-gray-400 text-[10px] uppercase font-bold tracking-tight mt-1">Join 10,000+ logistics and property specialists.</p>
              </div>
           </div>
           <button className="bg-[#0056b3] text-white px-8 py-3 text-xs font-black uppercase tracking-widest hover:bg-[#F96302] transition-colors flex items-center gap-2">
              All 500+ Reports <ChevronRight className="w-4 h-4" />
           </button>
        </div>

      </div>
    </section>
  );
}