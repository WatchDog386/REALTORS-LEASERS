import React, { useState, useEffect } from "react";
import { 
  ChevronRight, 
  ChevronLeft,
  Star, 
  MapPin, 
  Bed, 
  Bath, 
  Maximize, 
  CheckCircle,
  Tag,
  Info,
  Clock,
  Home,
  Heart,
  Share2,
  CheckSquare,
  Eye
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

// ==========================================
// CORRECTED IMPORT PATH
// ==========================================
import NavbarSection from "@/components/sections/NavbarSection";

// ==========================================
// 1. DATA
// ==========================================

const VACANCY_SLIDES = [
  {
    id: 1,
    tag: "Move-In Special",
    headline: "New Vacancies \nJust Added",
    subhead: "Luxury Westlands Apartments",
    description: "Browse over 500+ verified listings. This unit features a gym, pool, and backup generator. First month 50% off.",
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop",
    price: "85,000",
    location: "Westlands, Nairobi",
    specs: "2 Bed • 2 Bath",
    badge: "Special Buy"
  },
  {
    id: 2,
    tag: "Just Listed",
    headline: "Garden Estate \nFamily Home",
    subhead: "Spacious 4-Bedroom Bungalow",
    description: "Located in a secure gated community with a huge backyard. Perfect for families with pets.",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop",
    price: "150,000",
    location: "Garden Estate, Thika Rd",
    specs: "4 Bed • 3 Bath",
    badge: "New"
  },
  {
    id: 3,
    tag: "Best Value",
    headline: "Modern CBD \nStudio Lofts",
    subhead: "Walking Distance to Offices",
    description: "High-speed elevator, fibre ready, and rooftop lounge access included. Studios starting low.",
    img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=2070&auto=format&fit=crop",
    price: "35,000",
    location: "Moi Avenue, CBD",
    specs: "Studio • 450 sqft",
    badge: "Hot Deal"
  }
];

const LISTINGS_DATA = [
  {
    id: 101,
    title: "Modern Downtown Loft",
    address: "1200 Moi Ave, CBD",
    price: "85,000",
    beds: 1, baths: 1, sqft: 850,
    rating: 4.8, reviews: 24,
    img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=400&auto=format&fit=crop",
    badge: "Top Rated"
  },
  {
    id: 102,
    title: "Suburban Family Home",
    address: "45 Karen Road, Karen",
    price: "150,000",
    beds: 3, baths: 2, sqft: 1500,
    rating: 4.9, reviews: 12,
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop",
    badge: null
  },
  {
    id: 103,
    title: "Cozy Studio Apartment",
    address: "88 Thika Rd, Roysambu",
    price: "25,000",
    beds: 0, baths: 1, sqft: 450,
    rating: 4.5, reviews: 8,
    img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=400&auto=format&fit=crop",
    badge: "Best Value"
  },
  {
    id: 104,
    title: "Luxury Condo w/ View",
    address: "500 Westlands Rd, Westlands",
    price: "210,000",
    beds: 2, baths: 2, sqft: 1200,
    rating: 5.0, reviews: 3,
    img: "https://images.unsplash.com/photo-1515263487990-61b07816b324?q=80&w=400&auto=format&fit=crop",
    badge: "New"
  }
];

// ==========================================
// 2. SUB-COMPONENTS
// ==========================================

// A. Sidebar
const Sidebar = () => (
  <div className="hidden lg:block w-64 shrink-0 pr-6 border-r border-gray-200">
    <h3 className="font-black text-sm uppercase mb-3 text-[#333] tracking-wide">
      Shop by Property Type
    </h3>
    <ul className="text-[13px] text-[#333] font-medium space-y-2.5">
       {[
         "Apartments & Lofts", 
         "Single Family Homes", 
         "Townhouses", 
         "Condos", 
         "Vacation Rentals", 
         "Pet Friendly Units", 
         "Utilities Included",
         "New Constructions"
        ].map(item => (
         <li key={item} className="cursor-pointer hover:text-[#F96302] hover:underline flex items-center justify-between group">
           {item}
           <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 text-[#F96302] transition-opacity" />
         </li>
       ))}
    </ul>
    
    <div className="mt-8 bg-[#F5F5F5] p-4 text-center border border-gray-200">
      <div className="w-16 h-16 bg-[#333] mx-auto mb-3 flex flex-col items-center justify-center text-white rounded-none">
        <Home size={20} className="mb-1 text-[#F96302]" />
        <span className="font-black text-[10px] tracking-widest leading-none">REALTOR</span>
      </div>
      <h4 className="font-bold text-sm text-[#333]">List Your Property</h4>
      <p className="text-[11px] text-gray-600 mt-1 mb-3">
        Reach thousands of renters daily. Post your vacancy in minutes.
      </p>
      <button className="w-full border border-[#F96302] text-[#F96302] bg-white text-[11px] font-bold py-2 uppercase hover:bg-[#F96302] hover:text-white transition-colors">
        Post A Listing
      </button>
    </div>
  </div>
);

// B. Vacancy Carousel (Unchanged from previous step)
const VacancyCarousel = ({ navigate }: { navigate: any }) => {
  const [[page, direction], setPage] = useState([0, 0]);
  const slideIndex = Math.abs(page % VACANCY_SLIDES.length);
  const currentSlide = VACANCY_SLIDES[slideIndex];

  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 10000); 
    return () => clearInterval(timer);
  }, [page]);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  const variants = {
    enter: (direction: number) => ({ x: direction > 0 ? "100%" : "-100%", opacity: 1, zIndex: 0 }),
    center: { zIndex: 1, x: 0, opacity: 1 },
    exit: (direction: number) => ({ zIndex: 0, x: direction < 0 ? "100%" : "-100%", opacity: 1 })
  };

  return (
    <div className="relative w-full h-[450px] bg-white border border-gray-200 overflow-hidden shadow-sm group">
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div 
          key={page} custom={direction} variants={variants} initial="enter" animate="center" exit="exit"
          transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
          className="absolute inset-0 flex flex-col md:flex-row h-full w-full bg-white"
        >
          {/* Text Area */}
          <div className="w-full md:w-1/3 p-6 lg:p-10 flex flex-col justify-center relative z-10 bg-white border-r border-gray-100 h-full">
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-block bg-[#F9A100] text-[#333] text-[10px] lg:text-[11px] font-black uppercase px-2 py-1 tracking-wider">{currentSlide.tag}</span>
              <span className="text-[10px] font-bold text-[#F96302] uppercase flex items-center gap-1"><Clock size={12} /> Limited Time</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-extrabold text-[#333] leading-none mb-2 uppercase tracking-tight whitespace-pre-line">
              {currentSlide.headline.split("\n")[0]} <br/> <span className="text-[#F96302]">{currentSlide.headline.split("\n")[1]}</span>
            </h1>
            <p className="text-sm font-bold text-gray-800 mb-3 uppercase tracking-wide border-b border-gray-100 pb-2">{currentSlide.subhead}</p>
            <div className="w-12 h-1 bg-[#F96302] mb-4"></div>
            <p className="text-sm text-gray-700 font-medium mb-6 leading-relaxed">{currentSlide.description}</p>
            <div className="flex flex-col gap-3">
              <button onClick={() => navigate("/search")} className="bg-[#F96302] text-white font-bold text-sm uppercase py-3 px-6 hover:bg-[#d15200] transition-colors shadow-sm flex items-center justify-center gap-2 rounded-sm border border-[#F96302]">
                View This Listing <ChevronRight size={16} />
              </button>
              <div className="flex items-center justify-center gap-4 text-[10px] font-bold text-gray-400 uppercase">
                <span className="cursor-pointer hover:text-[#333]">Save to list</span>
                <span className="w-px h-3 bg-gray-300"></span>
                <span className="cursor-pointer hover:text-[#333]">Share</span>
              </div>
            </div>
          </div>
          {/* Image Area */}
          <div className="w-full md:w-2/3 h-full relative overflow-hidden bg-gray-100">
            <img src={currentSlide.img} alt="Property" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
            <div className="absolute bottom-4 right-4 bg-white border border-gray-300 shadow-sm p-2.5 flex flex-col items-end min-w-[140px] z-20">
               <div className="bg-[#F9A100] text-[#333] text-[9px] font-black uppercase px-1.5 py-0.5 mb-1 leading-none">{currentSlide.badge}</div>
               <div className="flex items-baseline gap-1">
                  <span className="text-[10px] font-bold text-gray-500">Ksh</span>
                  <span className="text-2xl font-black text-[#333] leading-none tracking-tight">{currentSlide.price}</span>
                  <span className="text-[9px] font-bold text-gray-400">/mo</span>
               </div>
               <div className="text-[10px] font-bold text-gray-700 mt-1 uppercase tracking-tight text-right">{currentSlide.specs}</div>
               <div className="text-[9px] text-gray-400 font-medium text-right truncate max-w-[150px]">{currentSlide.location}</div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30">
          {VACANCY_SLIDES.map((_, idx) => (
            <div key={idx} className={`h-2 rounded-full transition-all duration-300 shadow-sm ${slideIndex === idx ? "bg-[#F96302] w-6" : "bg-white/70 w-2"}`} />
          ))}
      </div>
    </div>
  );
};

// ==========================================
// C. UPDATED LISTING CARD
// ==========================================
const ListingCard = ({ data, onClick }: { data: any, onClick: () => void }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [isCompare, setIsCompare] = useState(false);

  return (
    <div 
      className="group bg-white border border-gray-200 p-0 flex flex-col cursor-pointer hover:border-[#666] hover:shadow-lg transition-all duration-200 relative"
    >
      {/* 1. Image Area with Retail Overlays */}
      <div className="h-48 overflow-hidden relative border-b border-gray-100 bg-gray-100" onClick={onClick}>
        <img src={data.img} alt={data.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        
        {/* Badge */}
        {data.badge && (
          <div className="absolute top-0 left-0 bg-[#F96302] text-white px-2 py-1 text-[10px] font-bold uppercase tracking-wide z-10">
            {data.badge}
          </div>
        )}

        {/* Retail Tools Overlay */}
        <div className="absolute top-2 left-2 z-20 flex items-center gap-1 bg-white/90 px-1.5 py-1 rounded-sm shadow-sm cursor-default" onClick={(e) => e.stopPropagation()}>
          <input 
            type="checkbox" 
            checked={isCompare}
            onChange={() => setIsCompare(!isCompare)}
            className="w-3 h-3 accent-[#F96302] cursor-pointer"
          />
          <span className="text-[9px] font-bold text-gray-700 uppercase">Compare</span>
        </div>

        <div 
          className="absolute top-2 right-2 z-20 bg-white/90 p-1.5 rounded-full shadow-sm hover:bg-white transition-colors"
          onClick={(e) => { e.stopPropagation(); setIsSaved(!isSaved); }}
        >
          <Heart size={14} className={isSaved ? "fill-[#F96302] text-[#F96302]" : "text-gray-400 hover:text-[#F96302]"} />
        </div>
      </div>

      {/* 2. Card Content */}
      <div className="p-4 flex flex-col flex-1" onClick={onClick}>
        
        {/* Price - Top Visual Hierarchy */}
        <div className="mb-1">
          <div className="flex items-baseline gap-1">
            <span className="text-xs font-bold text-[#333]">Ksh</span>
            <span className="text-2xl font-black text-[#333] tracking-tighter">{data.price}</span>
            <span className="text-[10px] font-bold text-gray-500">/ mo</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-bold text-[#333] text-[13px] leading-tight mb-1 group-hover:underline group-hover:text-[#F96302] line-clamp-1">
          {data.title}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex">
             {[...Array(5)].map((_,i) => (
                <Star key={i} size={10} className={i < Math.floor(data.rating) ? "fill-[#F96302] text-[#F96302]" : "text-gray-300"} />
             ))}
          </div>
          <span className="text-[10px] text-gray-500 font-medium">({data.reviews})</span>
        </div>

        {/* Specs - Bullet Style */}
        <div className="flex items-center flex-wrap gap-2 text-[11px] text-gray-600 font-medium mb-4 border-t border-gray-100 pt-2">
           <span className="flex items-center gap-1"><Bed size={12} className="text-gray-400"/> {data.beds} Bed</span>
           <span className="w-px h-3 bg-gray-300"></span>
           <span className="flex items-center gap-1"><Bath size={12} className="text-gray-400"/> {data.baths} Bath</span>
           <span className="w-px h-3 bg-gray-300"></span>
           <span className="flex items-center gap-1"><Maximize size={12} className="text-gray-400"/> {data.sqft} sqft</span>
        </div>
        
        <p className="text-[10px] text-gray-400 flex items-center gap-1 mb-4 mt-auto">
          <MapPin size={10} /> {data.address}
        </p>

        {/* Actions */}
        <div className="flex gap-2 mt-auto">
           <button 
             className="flex-1 bg-white border border-[#F96302] text-[#F96302] text-[11px] font-bold py-2 uppercase hover:bg-[#F96302] hover:text-white transition-colors rounded-sm"
             onClick={(e) => { e.stopPropagation(); /* Add to cart logic */ }}
           >
             Check Availability
           </button>
           <button 
             className="px-3 border border-gray-300 text-gray-500 hover:border-gray-400 hover:text-[#333] rounded-sm flex items-center justify-center transition-colors"
             onClick={(e) => { e.stopPropagation(); /* Quick view logic */ }}
             title="Quick View"
           >
             <Eye size={14} />
           </button>
        </div>
      </div>
    </div>
  );
};


// ==========================================
// 3. MAIN COMPONENT
// ==========================================
const HomeContent = ({ scrollTo, demoOpen, setDemoOpen }: any) => {
  const navigate = useNavigate();

  return (
    <div 
      className="antialiased min-h-screen bg-white"
      style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
    >
      <NavbarSection scrollTo={scrollTo} setDemoOpen={setDemoOpen} />

      <main className="max-w-[1440px] mx-auto px-4 lg:px-8 py-6 pt-[160px] lg:pt-[190px]">
        
        {/* Breadcrumb */}
        <div className="text-[10px] text-gray-500 mb-4 flex items-center gap-1 font-medium">
          <span className="hover:underline cursor-pointer">Realtor</span> 
          <ChevronRight size={10} />
          <span className="hover:underline cursor-pointer">Rentals</span>
          <ChevronRight size={10} />
          <span className="font-bold text-[#F96302]">Current Listings</span>
        </div>

        <div className="flex gap-8">
          {/* Left Sidebar */}
          <Sidebar />

          {/* Main Content Area */}
          <div className="flex-1">
            
            {/* 1. SLIDING CAROUSEL */}
            <div className="mb-8">
              <VacancyCarousel navigate={navigate} />
            </div>

            {/* 2. Listing Grid */}
            <div className="mb-8">
               <div className="flex items-center justify-between mb-4 border-b border-gray-200 pb-2">
                 <h2 className="text-xl font-bold text-[#333] flex items-center gap-2 uppercase tracking-tight">
                   Trending Rentals in Your Area 
                 </h2>
                 <span className="text-xs font-bold text-[#F96302] cursor-pointer hover:underline">See All 124 Results &gt;</span>
               </div>
               
               {/* GRID MAPPED FROM DATA */}
               <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                  {LISTINGS_DATA.map((listing) => (
                    <ListingCard 
                      key={listing.id} 
                      data={listing} 
                      onClick={() => navigate(`/listing/${listing.id}`)}
                    />
                  ))}
               </div>
            </div>

            {/* 3. Value Prop Banner */}
            <div className="bg-[#F3F9FC] border border-[#D7E9F3] p-4 flex flex-col md:flex-row items-center gap-4 rounded-none shadow-sm">
               <div className="bg-[#0066CC] text-white p-2 rounded-sm shrink-0">
                 <Tag size={24} />
               </div>
               <div className="flex-1 text-center md:text-left">
                 <h4 className="text-sm font-black text-[#0066CC] uppercase">No Application Fees This Week</h4>
                 <p className="text-xs text-[#333] mt-1 font-medium">Apply to verified "Realtor Pro" listings and we'll waive the processing fees. Save up to Ksh 5,000.</p>
               </div>
               <button className="text-[11px] font-bold text-[#0066CC] uppercase border border-[#0066CC] px-6 py-2 hover:bg-[#0066CC] hover:text-white transition-colors bg-white whitespace-nowrap">
                 Apply Now
               </button>
            </div>

            {/* 4. Resources */}
            <div className="mt-8 pt-8 border-t border-gray-200">
               <h2 className="text-xl font-bold text-[#333] mb-4 uppercase tracking-tight">Renter Resources</h2>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    "How to calculate your rent budget",
                    "Checklist for your first apartment",
                    "Understanding your lease agreement"
                  ].map((topic, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-white border border-gray-200 hover:border-[#F96302] cursor-pointer group">
                      <div className="bg-gray-100 p-2 group-hover:bg-orange-100 transition-colors">
                        <CheckCircle size={16} className="text-gray-500 group-hover:text-[#F96302]"/>
                      </div>
                      <span className="text-xs font-bold text-[#333] group-hover:text-[#F96302] underline decoration-gray-300 group-hover:decoration-[#F96302]">
                        {topic}
                      </span>
                    </div>
                  ))}
               </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default HomeContent;