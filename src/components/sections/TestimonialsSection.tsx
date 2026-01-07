import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, Star, ShieldCheck, ThumbsUp } from "lucide-react";

const THEME = {
  ORANGE: "#F96302",
  CHARCOAL: "#333333",
  GRAY: "#F4F4F4",
  BORDER: "#E5E5E5"
};

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Grouped data (2 reviews per slide on desktop)
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
      className="py-20 bg-[#F4F4F4] font-sans text-[#333] scroll-mt-28 border-t border-gray-200"
    >
      <div className="max-w-[1320px] mx-auto px-6">
        
        {/* 1. INDUSTRIAL HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-l-8 border-[#F96302] pl-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
               <div className="flex text-[#F96302]">
                 {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
               </div>
               <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">4.9/5 Average Rating</span>
            </div>
            <h2 className="text-4xl font-black text-[#333] uppercase tracking-tighter leading-none">
              Client <span className="text-[#F96302]">Feedback.</span>
            </h2>
          </div>
          
          {/* Navigation Controls */}
          <div className="flex gap-2 mt-6 md:mt-0">
             <button onClick={prevSlide} className="p-4 bg-white border border-gray-300 hover:border-[#F96302] hover:text-[#F96302] transition-colors">
                <ChevronLeft className="w-6 h-6" />
             </button>
             <button onClick={nextSlide} className="p-4 bg-[#333] text-white hover:bg-[#F96302] transition-colors">
                <ChevronRight className="w-6 h-6" />
             </button>
          </div>
        </div>

        {/* 2. REVIEW GRID */}
        <div className="relative min-h-[400px]">
           <AnimatePresence mode="wait">
             <motion.div
               key={activeIndex}
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: -20 }}
               transition={{ duration: 0.3 }}
               className="grid grid-cols-1 md:grid-cols-2 gap-6"
             >
               {currentPair.map((item) => (
                 <div 
                   key={item.id}
                   className="bg-white p-8 border border-gray-200 flex flex-col h-full relative group hover:border-[#F96302] transition-colors shadow-sm"
                 >
                   {/* Header: Rating & Verified Badge */}
                   <div className="flex justify-between items-start mb-6">
                     <div className="flex text-[#F96302]">
                        {[...Array(item.rating)].map((_, i) => (
                           <Star key={i} className="w-5 h-5 fill-current" />
                        ))}
                     </div>
                     {item.verified && (
                       <div className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-green-700 bg-green-50 px-2 py-1 border border-green-100">
                         <ShieldCheck className="w-3 h-3" /> Verified {item.role}
                       </div>
                     )}
                   </div>

                   {/* Content */}
                   <h3 className="text-xl font-bold text-[#333] mb-3 group-hover:text-[#F96302] transition-colors">
                     {item.headline}
                   </h3>
                   <p className="text-sm text-gray-600 leading-relaxed mb-8 flex-grow">
                     "{item.quote}"
                   </p>

                   {/* Footer: Author Details */}
                   <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                      <div>
                        <p className="font-black text-sm uppercase text-[#333]">{item.name}</p>
                        <p className="text-xs text-gray-400 font-medium">{item.location}</p>
                      </div>
                      <div className="flex items-center gap-1 text-gray-400 text-xs font-bold uppercase tracking-wider cursor-pointer hover:text-[#333]">
                        <ThumbsUp className="w-4 h-4" /> Helpful
                      </div>
                   </div>

                   {/* Industrial Decor: Orange Corner */}
                   <div className="absolute top-0 left-0 w-0 h-0 border-t-[20px] border-t-[#F96302] border-r-[20px] border-r-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                 </div>
               ))}
             </motion.div>
           </AnimatePresence>
        </div>

        {/* 3. TRUST BANNER */}
        <div className="mt-12 bg-[#333] p-8 flex flex-col md:flex-row items-center justify-between gap-6">
           <div className="flex items-center gap-4">
              <Quote className="w-12 h-12 text-[#F96302] fill-current" />
              <div>
                 <h4 className="text-white font-black uppercase tracking-widest text-lg">Join 10,000+ Pros</h4>
                 <p className="text-gray-400 text-xs">Managing properties better, every day.</p>
              </div>
           </div>
           <button className="bg-[#F96302] text-white px-8 py-3 text-xs font-black uppercase tracking-widest hover:bg-white hover:text-[#333] transition-colors">
              Read All 500+ Reviews
           </button>
        </div>

      </div>
    </section>
  );
}