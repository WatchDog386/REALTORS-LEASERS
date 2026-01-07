import React, { useState, useEffect } from "react";
import { 
  ChevronRight, 
  ChevronLeft,
  Star, 
  MapPin, 
  Bed, 
  Bath, 
  Maximize, 
  Clock,
  Heart,
  Eye,
  Navigation,
  Plus,
  Minus,
  Layers,
  Search,
  Move
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Keep your import
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
    badge: "Special Buy",
    mapId: 104 // Links to Westlands on map
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
    badge: "New",
    mapId: 102 // Links to Karen on map
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
    badge: "Hot Deal",
    mapId: 101 // Links to CBD on map
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
    badge: "Top Rated",
    mapArea: "CBD"
  },
  {
    id: 102,
    title: "Suburban Family Home",
    address: "45 Karen Road, Karen",
    price: "150,000",
    beds: 3, baths: 2, sqft: 1500,
    rating: 4.9, reviews: 12,
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop",
    badge: null,
    mapArea: "Karen"
  },
  {
    id: 103,
    title: "Cozy Studio Apartment",
    address: "88 Thika Rd, Roysambu",
    price: "25,000",
    beds: 0, baths: 1, sqft: 450,
    rating: 4.5, reviews: 8,
    img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=400&auto=format&fit=crop",
    badge: "Best Value",
    mapArea: "Roysambu"
  },
  {
    id: 104,
    title: "Luxury Condo w/ View",
    address: "500 Westlands Rd, Westlands",
    price: "210,000",
    beds: 2, baths: 2, sqft: 1200,
    rating: 5.0, reviews: 3,
    img: "https://images.unsplash.com/photo-1515263487990-61b07816b324?q=80&w=400&auto=format&fit=crop",
    badge: "New",
    mapArea: "Westlands"
  }
];

// ==========================================
// MAP COMPONENT (UPDATED)
// ==========================================

const NeighborhoodMap = ({ activeSlideId }: { activeSlideId?: number }) => {
  // Updated Pin Coordinates for better positioning
  const mapPins = [
    { 
      id: 104, 
      area: "Westlands", 
      title: "Luxury Condo w/ View",
      count: 12, 
      top: "38%", 
      left: "46%", 
      price: "210k",
      description: "Premium apartments with city views",
      img: "https://images.unsplash.com/photo-1515263487990-61b07816b324?w=200",
      listingId: 104,
      active: activeSlideId === 104
    },
    { 
      id: 101, 
      area: "CBD", 
      title: "Modern Downtown Loft",
      count: 56, 
      top: "48%", 
      left: "52%", 
      price: "85k",
      description: "Central business district studios",
      img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=200",
      listingId: 101,
      active: activeSlideId === 101
    },
    { 
      id: 103, 
      area: "Roysambu", 
      title: "Cozy Studio Apartment",
      count: 30, 
      top: "22%", 
      left: "70%", 
      price: "25k",
      description: "Affordable starter apartments",
      img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=200",
      listingId: 103,
      active: activeSlideId === 103
    },
    { 
      id: 102, 
      area: "Karen", 
      title: "Suburban Family Home",
      count: 15, 
      top: "75%", 
      left: "28%", 
      price: "150k",
      description: "Spacious family homes",
      img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=200",
      listingId: 102,
      active: activeSlideId === 102
    },
  ];

  return (
    <div className="w-full bg-white border border-gray-200 shadow-sm mt-8 flex flex-col rounded-sm overflow-hidden">
      
      {/* 1. Map Control Bar */}
      <div className="p-4 border-b border-gray-200 bg-white flex flex-col md:flex-row justify-between items-center gap-4 z-10">
        <div>
          <h3 className="text-lg font-bold text-[#333] flex items-center gap-2 uppercase tracking-tight">
            <MapPin className="text-[#F96302]" size={20} /> Featured Properties Map
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">
            Interactive map showing all 4 featured properties from the listings above.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
             <div className="hidden md:flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-sm">
                <Search size={14} className="text-gray-400" />
                <span className="text-xs font-medium text-gray-500">Nairobi, KE</span>
             </div>
             <div className="flex gap-1">
                <button className="text-[10px] font-bold uppercase px-4 py-2 bg-[#1E3A5F] text-white rounded-sm hover:bg-[#152a45] transition-colors">
                    Map
                </button>
                <button className="text-[10px] font-bold uppercase px-4 py-2 bg-white border border-gray-200 text-gray-600 rounded-sm hover:bg-gray-50 transition-colors">
                    Satellite
                </button>
             </div>
        </div>
      </div>

      {/* 2. Map Container */}
      <div className="relative w-full h-[550px] min-h-[500px] bg-[#E5E3DF] overflow-hidden group">
        
        {/* GOOGLE MAPS EMBED - Updated for better view */}
        <div className="absolute inset-0 pointer-events-none">
            <iframe 
                width="100%" 
                height="100%" 
                frameBorder="0" 
                scrolling="no" 
                marginHeight={0} 
                marginWidth={0} 
                src="https://maps.google.com/maps?q=Nairobi&t=m&z=11&ie=UTF8&iwloc=&output=embed"
                style={{ filter: "saturate(1.2) contrast(1.1)" }}
                title="Nairobi Property Map"
            ></iframe>
        </div>

        {/* Legend Overlay */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-sm shadow-md p-3 z-20 max-w-[200px] border border-gray-200">
          <h4 className="text-xs font-bold text-[#333] mb-2 flex items-center gap-1">
            <Layers size={12} /> Property Areas
          </h4>
          <div className="space-y-1">
            {mapPins.map(pin => (
              <div key={pin.id} className="flex items-center justify-between text-[10px]">
                <div className="flex items-center gap-1">
                  <div className={`w-2 h-2 rounded-full ${pin.active ? 'bg-[#F96302] animate-pulse' : 'bg-[#1E3A5F]'}`}></div>
                  <span className={`font-medium ${pin.active ? 'text-[#F96302]' : 'text-gray-600'}`}>
                    {pin.area}
                  </span>
                </div>
                <span className="font-bold text-gray-700">Ksh {pin.price}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Custom Map Controls Overlay */}
        <div className="absolute right-4 bottom-20 flex flex-col shadow-lg rounded-sm overflow-hidden bg-white z-20 border border-gray-300">
            <button className="p-3 hover:bg-gray-50 text-gray-600 border-b border-gray-200">
                <Plus size={18} />
            </button>
            <button className="p-3 hover:bg-gray-50 text-gray-600">
                <Minus size={18} />
            </button>
        </div>

        {/* PINS - UPDATED STYLE */}
        {mapPins.map((pin) => (
            <div 
                key={pin.id}
                className={`absolute transform -translate-x-1/2 -translate-y-full cursor-pointer group/pin z-10 hover:z-30 transition-all duration-300 ${pin.active ? 'animate-bounce' : ''}`}
                style={{ top: pin.top, left: pin.left }}
            >
                <div className="relative flex flex-col items-center">
                    
                    {/* Enhanced Price Tag Pin */}
                    <div className={`
                        ${pin.active ? 'bg-[#F96302] scale-110 shadow-lg' : 'bg-[#1E3A5F]'} 
                        text-white text-[11px] font-bold px-3 py-1.5 rounded-sm shadow-md 
                        border-2 border-white hover:scale-125 transition-all duration-300 flex items-center gap-1
                        group-hover/pin:bg-[#F96302] relative z-20
                    `}>
                        <MapPin size={10} />
                        Ksh {pin.price}
                    </div>
                    
                    {/* Triangle Arrow */}
                    <div className={`w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] 
                        ${pin.active ? 'border-t-[#F96302]' : 'border-t-[#1E3A5F]'} 
                        group-hover/pin:border-t-[#F96302] -mt-[1px] transition-colors`}>
                    </div>

                    {/* Pulsing Ring Effect for Active Pins */}
                    {pin.active && (
                        <div className="absolute w-16 h-16 border-2 border-[#F96302]/30 rounded-full -translate-x-1/2 -translate-y-1/2 animate-ping"></div>
                    )}

                    {/* Tooltip on Hover */}
                    <div className="absolute bottom-[140%] mb-2 opacity-0 group-hover/pin:opacity-100 transition-all duration-200 
                        bg-white shadow-xl rounded-sm overflow-hidden min-w-[180px] pointer-events-none transform translate-y-2 
                        group-hover/pin:translate-y-0 z-50 border border-gray-200">
                        <div className="h-20 w-full bg-gray-100 overflow-hidden relative">
                            <img 
                                src={pin.img} 
                                className="w-full h-full object-cover" 
                                alt={pin.area}
                            />
                            <div className="absolute top-1 left-1 bg-[#F96302] text-white text-[8px] font-bold px-1.5 py-0.5 rounded-sm">
                                FOR RENT
                            </div>
                        </div>
                        <div className="p-3 border-t border-gray-100">
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="text-[10px] font-bold text-[#F96302] uppercase">{pin.area}</div>
                                    <div className="text-sm font-black text-[#333] truncate">{pin.title}</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-lg font-black text-[#1E3A5F]">Ksh {pin.price}</div>
                                    <div className="text-[9px] text-gray-500 uppercase">month</div>
                                </div>
                            </div>
                            <p className="text-[10px] text-gray-600 mt-2 line-clamp-2">{pin.description}</p>
                            <div className="mt-2 flex gap-1">
                                {[1,2,3,4,5].map(i => (
                                    <Star key={i} size={10} className="fill-[#F9A100] text-[#F9A100]" />
                                ))}
                                <span className="text-[9px] text-gray-500 ml-1">({pin.count} listings)</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ))}
      </div>
      
      {/* 3. Footer - Updated */}
      <div className="bg-[#f9fafb] p-4 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-500">
          <div className="mb-2 md:mb-0">
              <div className="font-bold text-[#333]">Featured Properties Legend</div>
              <div className="flex items-center gap-3 mt-1">
                  <span className="flex items-center gap-1"><div className="w-3 h-3 rounded-sm bg-[#F96302]"></div> Active/Highlighted</span>
                  <span className="flex items-center gap-1"><div className="w-3 h-3 rounded-sm bg-[#1E3A5F]"></div> Available</span>
              </div>
          </div>
          <div>© 2026 FindHouse Map Data • All 4 listings shown on map</div>
      </div>
    </div>
  );
};

// ==========================================
// MODAL
// ==========================================
const ListingPreviewModal = ({ listing, onClose }: { listing: any; onClose: () => void }) => {
  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-white max-w-2xl w-full max-h-[85vh] overflow-auto rounded-sm relative animate-in fade-in zoom-in duration-200">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 bg-white/90 p-1 rounded-full shadow z-10 hover:bg-white"
        >
          <ChevronLeft size={16} />
        </button>
        <div className="h-64 md:h-80 w-full overflow-hidden">
          <img src={listing.img} alt={listing.title || listing.subhead} className="w-full h-full object-cover" />
        </div>
        <div className="p-5">
          <div className="flex justify-between items-start mb-2">
            <div>
                 <h2 className="text-xl font-bold text-[#333]">{listing.title || listing.subhead}</h2>
                 <p className="text-xs text-gray-500 flex items-center gap-1 mt-1"><MapPin size={12} /> {listing.location || listing.address}</p>
            </div>
            <div className="text-right">
                 <div className="text-lg font-black text-[#F96302]">Ksh {listing.price}</div>
                 <div className="text-[10px] text-gray-400 uppercase font-bold">Per Month</div>
            </div>
          </div>
          
          <div className="flex gap-3 py-3 border-y border-gray-100 mb-3">
              <div className="flex items-center gap-1 text-xs font-medium text-gray-600"><Bed size={14} className="text-gray-400"/> {listing.beds || 2} Beds</div>
              <div className="flex items-center gap-1 text-xs font-medium text-gray-600"><Bath size={14} className="text-gray-400"/> {listing.baths || 1} Baths</div>
              <div className="flex items-center gap-1 text-xs font-medium text-gray-600"><Maximize size={14} className="text-gray-400"/> {listing.sqft || 1200} sqft</div>
          </div>

          <p className="text-sm text-gray-600 leading-relaxed mb-4">
            {listing.description || "This stunning property features modern amenities, spacious interiors, and is located in a prime neighborhood. Perfect for professionals and families looking for comfort and convenience."}
          </p>
          
          <button className="w-full bg-[#F96302] text-white font-bold uppercase py-3 rounded-sm hover:bg-[#d55200] transition-colors">
            Schedule Viewing
          </button>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// CAROUSEL & CARD (UPDATED with 5-second auto-slide)
// ==========================================

const VacancyCarousel = ({ onCardClick, onSlideChange }: { onCardClick: (slide: any) => void; onSlideChange: (slideId: number) => void }) => {
  const [[page, direction], setPage] = useState([0, 0]);
  const slideIndex = Math.abs(page % VACANCY_SLIDES.length);
  const currentSlide = VACANCY_SLIDES[slideIndex];

  // Auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => paginate(1), 5000);
    return () => clearInterval(timer);
  }, [page]);

  // Notify parent component about slide change
  useEffect(() => {
    onSlideChange(currentSlide.mapId);
  }, [slideIndex]);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  const goToSlide = (index: number) => {
    const direction = index > slideIndex ? 1 : -1;
    setPage([index, direction]);
  };

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 1, zIndex: 0 }),
    center: { zIndex: 1, x: 0, opacity: 1 },
    exit: (dir: number) => ({ zIndex: 0, x: dir < 0 ? "100%" : "-100%", opacity: 1 })
  };

  return (
    <div className="relative w-full h-[450px] bg-white border border-gray-200 overflow-hidden shadow-sm group">
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div 
          key={page}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
          className="absolute inset-0 flex flex-col md:flex-row h-full w-full bg-white"
        >
          <div className="w-full md:w-1/3 p-6 lg:p-10 flex flex-col justify-center relative z-10 bg-white border-r border-gray-100 h-full">
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-block bg-[#F9A100] text-[#333] text-[10px] lg:text-[11px] font-black uppercase px-2 py-1 tracking-wider">
                {currentSlide.tag}
              </span>
              <span className="text-[10px] font-bold text-[#F96302] uppercase flex items-center gap-1">
                <Clock size={12} /> Auto-slides in 5s
              </span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-extrabold text-[#333] leading-none mb-2 uppercase tracking-tight whitespace-pre-line">
              {currentSlide.headline.split("\n")[0]} <br />{" "}
              <span className="text-[#F96302]">{currentSlide.headline.split("\n")[1]}</span>
            </h1>
            <p className="text-sm font-bold text-gray-800 mb-3 uppercase tracking-wide border-b border-gray-100 pb-2">
              {currentSlide.subhead}
            </p>
            <div className="w-12 h-1 bg-[#F96302] mb-4"></div>
            <p className="text-sm text-gray-700 font-medium mb-6 leading-relaxed">
              {currentSlide.description}
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => onCardClick(currentSlide)}
                className="bg-[#F96302] text-white font-bold text-sm uppercase py-3 px-6 hover:bg-[#d15200] transition-colors shadow-sm flex items-center justify-center gap-2 rounded-sm border border-[#F96302]"
              >
                View This Listing <ChevronRight size={16} />
              </button>
              <div className="flex items-center justify-center gap-4 text-[10px] font-bold text-gray-400 uppercase">
                <span className="cursor-pointer hover:text-[#333]">Save to list</span>
                <span className="w-px h-3 bg-gray-300"></span>
                <span className="cursor-pointer hover:text-[#333]">Share</span>
              </div>
            </div>
          </div>
          <div className="w-full md:w-2/3 h-full relative overflow-hidden bg-gray-100">
            <img src={currentSlide.img} alt="Property" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
            <div className="absolute bottom-4 right-4 bg-white border border-gray-300 shadow-sm p-2.5 flex flex-col items-end min-w-[140px] z-20">
              <div className="bg-[#F9A100] text-[#333] text-[9px] font-black uppercase px-1.5 py-0.5 mb-1 leading-none">
                {currentSlide.badge}
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-[10px] font-bold text-gray-500">Ksh</span>
                <span className="text-2xl font-black text-[#333] leading-none tracking-tight">
                  {currentSlide.price}
                </span>
                <span className="text-[9px] font-bold text-gray-400">/mo</span>
              </div>
              <div className="text-[10px] font-bold text-gray-700 mt-1 uppercase tracking-tight text-right">
                {currentSlide.specs}
              </div>
              <div className="text-[9px] text-gray-400 font-medium text-right truncate max-w-[150px]">
                {currentSlide.location}
              </div>
              {/* Show which map area this corresponds to */}
              <div className="mt-1 pt-1 border-t border-gray-200">
                <div className="text-[8px] text-[#1E3A5F] font-bold uppercase">
                  Located in: {currentSlide.mapId === 101 ? 'CBD' : currentSlide.mapId === 102 ? 'Karen' : currentSlide.mapId === 103 ? 'Roysambu' : 'Westlands'}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      
      {/* Navigation Buttons */}
      <button
        onClick={() => paginate(-1)}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-lg z-30 hover:bg-white transition-colors"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={() => paginate(1)}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-lg z-30 hover:bg-white transition-colors"
      >
        <ChevronRight size={20} />
      </button>
      
      {/* Enhanced Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30">
        {VACANCY_SLIDES.map((slide, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            className={`h-2 rounded-full transition-all duration-300 shadow-sm ${
              slideIndex === idx 
                ? "bg-[#F96302] w-8" 
                : "bg-white/70 w-2 hover:w-4 hover:bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const ListingCard = ({ data, onClick, isActive }: { data: any; onClick: () => void; isActive?: boolean }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [isCompare, setIsCompare] = useState(false);

  return (
    <div className={`group bg-white border ${isActive ? 'border-[#F96302] ring-2 ring-[#F96302]/20' : 'border-gray-200'} p-0 flex flex-col cursor-pointer hover:border-[#666] hover:shadow-lg transition-all duration-200 relative`}>
      {isActive && (
        <div className="absolute top-2 left-2 z-30 bg-[#F96302] text-white text-[9px] font-bold px-2 py-1 rounded-sm animate-pulse">
          ACTIVE ON MAP
        </div>
      )}
      <div className="h-48 overflow-hidden relative border-b border-gray-100 bg-gray-100" onClick={onClick}>
        <img
          src={data.img}
          alt={data.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {data.badge && (
          <div className="absolute top-0 left-0 bg-[#F96302] text-white px-2 py-1 text-[10px] font-bold uppercase tracking-wide z-10">
            {data.badge}
          </div>
        )}
        <div
          className="absolute top-2 left-2 z-20 flex items-center gap-1 bg-white/90 px-1.5 py-1 rounded-sm shadow-sm cursor-default"
          onClick={(e) => e.stopPropagation()}
        >
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
          onClick={(e) => {
            e.stopPropagation();
            setIsSaved(!isSaved);
          }}
        >
          <Heart
            size={14}
            className={
              isSaved ? "fill-[#F96302] text-[#F96302]" : "text-gray-400 hover:text-[#F96302]"
            }
          />
        </div>
      </div>
      <div className="p-4 flex flex-col flex-1" onClick={onClick}>
        <div className="mb-1">
          <div className="flex items-baseline gap-1">
            <span className="text-xs font-bold text-[#333]">Ksh</span>
            <span className="text-2xl font-black text-[#333] tracking-tighter">{data.price}</span>
            <span className="text-[10px] font-bold text-gray-500">/ mo</span>
          </div>
        </div>
        <h3 className="font-bold text-[#333] text-[13px] leading-tight mb-1 group-hover:underline group-hover:text-[#F96302] line-clamp-1">
          {data.title}
        </h3>
        <div className="flex items-center gap-1 mb-3">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={10}
                className={
                  i < Math.floor(data.rating) ? "fill-[#F96302] text-[#F96302]" : "text-gray-300"
                }
              />
            ))}
          </div>
          <span className="text-[10px] text-gray-500 font-medium">({data.reviews})</span>
        </div>
        <div className="flex items-center flex-wrap gap-2 text-[11px] text-gray-600 font-medium mb-4 border-t border-gray-100 pt-2">
          <span className="flex items-center gap-1">
            <Bed size={12} className="text-gray-400" /> {data.beds === 0 ? "Studio" : `${data.beds} Bed`}
          </span>
          <span className="w-px h-3 bg-gray-300"></span>
          <span className="flex items-center gap-1">
            <Bath size={12} className="text-gray-400" /> {data.baths} Bath
          </span>
          <span className="w-px h-3 bg-gray-300"></span>
          <span className="flex items-center gap-1">
            <Maximize size={12} className="text-gray-400" /> {data.sqft} sqft
          </span>
        </div>
        <p className="text-[10px] text-gray-400 flex items-center gap-1 mb-4 mt-auto">
          <MapPin size={10} /> {data.address}
        </p>
        <div className="flex gap-2 mt-auto">
          <button
            className="flex-1 bg-white border border-[#F96302] text-[#F96302] text-[11px] font-bold py-2 uppercase hover:bg-[#F96302] hover:text-white transition-colors rounded-sm"
            onClick={(e) => e.stopPropagation()}
          >
            Check Availability
          </button>
          <button
            className="px-3 border border-gray-300 text-gray-500 hover:border-gray-400 hover:text-[#333] rounded-sm flex items-center justify-center transition-colors"
            onClick={(e) => e.stopPropagation()}
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
// MAIN COMPONENT (UPDATED)
// ==========================================
const HomeContent = ({ scrollTo, demoOpen, setDemoOpen }: any) => {
  const [previewListing, setPreviewListing] = useState<any>(null);
  const [activeSlideId, setActiveSlideId] = useState<number>(104); // Default to Westlands
  const [activeListingId, setActiveListingId] = useState<number | null>(null);

  const openPreview = (listing: any) => {
    setPreviewListing(listing);
    setActiveListingId(listing.id);
  };
  const closePreview = () => setPreviewListing(null);

  const handleSlideChange = (slideId: number) => {
    setActiveSlideId(slideId);
  };

  const handleListingClick = (listing: any) => {
    openPreview(listing);
    // Find the corresponding map pin ID
    const mapPinId = VACANCY_SLIDES.find(slide => 
      slide.location.includes(listing.mapArea) || listing.mapArea.includes(slide.location?.split(',')[0])
    )?.mapId || listing.id;
    setActiveSlideId(mapPinId);
  };

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

        <div className="flex-1">
          {/* Carousel */}
          <div className="mb-8">
            <VacancyCarousel 
              onCardClick={openPreview} 
              onSlideChange={handleSlideChange}
            />
          </div>

          {/* Trending Rentals */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4 border-b border-gray-200 pb-2">
              <h2 className="text-xl font-bold text-[#333] flex items-center gap-2 uppercase tracking-tight">
                <MapPin className="text-[#F96302]" size={20} />
                Trending Rentals (Mapped Below)
              </h2>
              <span className="text-xs font-bold text-[#F96302] cursor-pointer hover:underline">
                See All 124 Results &gt;
              </span>
            </div>
            
            {/* Grid with active state tracking */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4 w-full">
              {LISTINGS_DATA.map((listing) => (
                <ListingCard
                  key={listing.id}
                  data={listing}
                  isActive={activeSlideId === listing.id || activeListingId === listing.id}
                  onClick={() => handleListingClick(listing)}
                />
              ))}
            </div>
            
            {/* Info Box */}
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-sm">
              <div className="flex items-center gap-2 text-blue-800 text-sm font-medium">
                <Navigation size={14} />
                Click any property card to see its location highlighted on the map below
              </div>
            </div>
          </div>

          {/* Updated Map Section with active slide tracking */}
          <NeighborhoodMap activeSlideId={activeSlideId} />
          
        </div>

        {/* Safe Preview Modal */}
        <AnimatePresence>
          {previewListing && (
            <ListingPreviewModal listing={previewListing} onClose={closePreview} />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default HomeContent;