import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
// Updated Icon Imports for Rental/Leasing Context
import {
  FaBars,
  FaUser,
  FaSearch,
  FaBuilding, // Apartments
  FaChevronDown,
  FaHome, 
  FaKey, 
  FaCity,
  FaHeart,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaSignOutAlt,
  FaCog,
  // NEW IMPORTS ADDED BELOW:
  FaTools,      // DIY
  FaList,       // Features
  FaTags,       // Prices
  FaCreditCard, // Payments
  FaStar,       // Reviews
  FaHeadset     // Support
} from "react-icons/fa";
import { Sheet, SheetContent } from "@/components/ui/sheet";

// ==========================================
// NEW SECTIONS CONFIGURATION
// Context: Apartments, Rents, Leasing
// ==========================================
const SECTIONS = [
  { 
    name: "DIY Rental guides", 
    id: "how-it-works", 
    icon: <FaTools size={16} className="text-[#F96302]" /> // Changed to Tools
  },
  { 
    name: "Apartments features", 
    id: "features", 
    icon: <FaList size={16} className="text-[#0056A6]" /> // Changed to List
  },
  { 
    name: "Affordable Prices", 
    id: "pricing", 
    icon: <FaTags size={18} className="text-slate-600" />, // Changed to Tags
    highlight: true 
  },
  { 
    name: "Payment methods", 
    id: "payment-options", 
    icon: <FaCreditCard size={18} className="text-emerald-600" /> // Changed to Credit Card
  },
  { 
    name: "Reviews", 
    id: "testimonials", 
    icon: <FaStar size={16} className="text-purple-600" /> // Changed to Star
  },
  { 
    name: "Tenant Support", 
    id: "faq", 
    icon: <FaHeadset size={16} className="text-cyan-600" /> // Changed to Headset
  },
];

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // LOGIC: Cart state preserved (renamed to 'saved_listings' contextually)
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("realtor_cart");
    return savedCart ? JSON.parse(savedCart) : { count: 0, total: 0 };
  });

  useEffect(() => {
    localStorage.setItem("realtor_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // LOGIC: Navigation scrolling
  const handleNavClick = (id) => {
    setMenuOpen(false);
    
    if (location.pathname === "/") {
      const element = document.getElementById(id);
      if (element) {
        const headerOffset = 160; 
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    } else {
      navigate("/");
      setTimeout(() => {
          const element = document.getElementById(id);
          if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const handleLoginRedirect = () => {
    setMenuOpen(false);
    navigate("/auth");
  };

  return (
    <div className={`fixed top-0 w-full z-50 bg-white transition-all ${isScrolled ? "shadow-lg" : ""}`}>
      
      {/* 1. TOP UTILITY STRIP (Desktop Only) */}
      <div className="bg-gradient-to-r from-[#1a1a1a] via-[#003A75] to-[#1a1a1a] text-white text-[12px] hidden lg:block">
        <div className="max-w-[1440px] mx-auto px-4 flex items-center justify-between h-9">
          <div className="flex items-center gap-5">
             <button className="flex items-center gap-1.5 hover:text-[#F96302] transition-colors duration-200 group">
               <FaMapMarkerAlt size={14} className="text-[#F96302]" />
               <span className="font-semibold">Location:</span>
               <span className="font-normal underline group-hover:no-underline">Nairobi, KE</span>
             </button>
             <div className="h-4 w-[1px] bg-gray-600"></div>
             <button className="flex items-center gap-1.5 hover:text-[#F96302]">
               <FaPhoneAlt size={12} className="text-[#F96302]" />
               <span className="font-semibold">Leasing Office:</span>
               <span className="font-normal">+254 711 493 222 or +254 734 712 578 </span>
             </button>
          </div>
          <div className="flex items-center gap-5 font-medium">
            <button onClick={() => navigate("/dashboard")} className="hover:text-[#0056A6] transition-colors">Post a Rental</button>
            <button onClick={() => navigate("/dashboard")} className="hover:text-[#0056A6] transition-colors">Pay Rent</button>
          </div>
        </div>
      </div>

      {/* 2. MAIN NAV BAR */}
      <div className="bg-white border-b border-gray-200 py-2 lg:py-3">
        <div className="max-w-[1440px] mx-auto px-4">
          <div className="flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-6">
            
            <div className="flex items-center justify-between w-full lg:w-auto">
              <div className="flex items-center gap-4">
                {/* Mobile Menu Trigger */}
                <button 
                  onClick={() => setMenuOpen(true)} 
                  className="lg:hidden text-gray-700 hover:text-[#F96302] p-2 rounded-md hover:bg-gray-100 transition-colors"
                >
                  <FaBars size={24} />
                </button>

                {/* LOGO */}
                <div onClick={() => navigate("/")} className="shrink-0 cursor-pointer flex items-center gap-2">
                   <img 
                     src="/realtor.jpg" 
                     alt="Kenya Rentals" 
                     className="h-10 md:h-14 w-auto object-contain" 
                   />
                   <div className="flex flex-col">
                      <span className="text-[#0056A6] font-black leading-none text-xl md:text-2xl font-sans tracking-tight">KENYA<span className="text-[#222]">RENTALS</span></span>
                   </div>
                </div>
              </div>

              {/* Mobile Right Icons */}
              <div className="flex items-center gap-5 lg:hidden">
                <button onClick={handleLoginRedirect} className="text-gray-700 hover:text-[#F96302]">
                   <FaUser size={22} />
                </button>
                <button className="relative text-gray-700 hover:text-[#F96302]">
                   <FaHeart size={22} />
                   <span className="absolute -top-1 -right-2 bg-[#F96302] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white">
                     {cart.count}
                   </span>
                </button>
              </div>
            </div>

            {/* Desktop Explore Button */}
            <button 
              onClick={() => setMenuOpen(true)}
              className="hidden lg:flex flex-col items-start justify-center px-4 h-12 border border-gray-300 hover:border-[#F96302] hover:shadow-[0_0_0_1px_#0056A6] transition-all group bg-gray-50 shrink-0 rounded-sm"
            >
              <span className="text-[10px] text-gray-600 font-bold uppercase leading-none mb-0.5">Filter</span>
              <span className="text-[15px] font-black text-[#222] flex items-center gap-2">
                Unit Type <FaChevronDown size={12} className="text-[#0056A6]" />
              </span>
            </button>

            {/* Search Bar */}
            <div className="flex-1 flex group w-full relative z-10">
              <div className="relative flex-1">
                <input 
                  type="text" 
                  placeholder="City, Zip, Building Name or Amenities..." 
                  className="w-full h-11 md:h-12 pl-4 pr-10 border-2 border-r-0 border-gray-300 group-focus-within:border-[#F96302] group-focus-within:border-r-0 group-focus-within:shadow-[0_0_0_1px_#0056A6] outline-none text-[15px] md:text-[16px] rounded-l-sm placeholder:text-gray-400 font-medium transition-all"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#F96302] pointer-events-none">
                      <FaSearch size={16} />
                </div>
              </div>
              <button className="bg-[#F96302] hover:bg-[#0056A6] text-white px-6 md:px-8 h-11 md:h-12 font-black uppercase tracking-tighter transition-all duration-300 shadow-md text-sm md:text-base rounded-r-sm flex items-center gap-2">
                 <FaSearch size={16} className="hidden md:block" />
                 Search
              </button>
            </div>

            {/* Desktop Account & Saved */}
            <div className="hidden lg:flex items-center gap-8 shrink-0">
              <button onClick={handleLoginRedirect} className="hidden xl:flex flex-col items-start group">
                <div className="flex items-center gap-2">
                    <span className="text-[11px] text-gray-500 font-bold uppercase">Account</span>
                    <FaChevronDown size={10} className="text-[#F96302]" />
                </div>
                <span className="text-[15px] font-black text-[#222] group-hover:text-[#0056A6] transition-colors leading-tight">
                  Sign In
                </span>
              </button>

              <button className="flex items-center gap-2 group relative">
                <div className="relative">
                  <FaHeart size={28} className="text-gray-600 group-hover:text-[#F96302] transition-colors" />
                  <span className="absolute -top-1.5 -right-2 bg-[#F96302] text-white text-[11px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow-sm">
                    {cart.count}
                  </span>
                </div>
                <div className="flex flex-col items-start">
                    <span className="text-[11px] text-gray-500 font-bold uppercase">Saved</span>
                    <span className="text-[14px] font-black text-[#222] leading-tight">Units</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. SUB-NAV (Desktop) - WITH APARTMENT/LEASING LINKS */}
      <div className="hidden lg:block bg-white border-b-2 border-gray-200 shadow-sm relative z-0">
        <div className="max-w-[1440px] mx-auto px-4 flex items-center h-12 relative">
          <div className="flex items-center gap-8 text-[13px] font-bold text-gray-700">
            {SECTIONS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-2.5 transition-all duration-200 relative group py-3 
                  ${item.highlight ? 'text-[#222]' : 'text-gray-600 hover:text-[#0056A6]'}`}
              >
                <span className="group-hover:scale-110 transition-transform duration-200">
                  {item.icon}
                </span>
                <span className={item.highlight ? 'text-[#F96302] font-black uppercase tracking-tight' : ''}>
                    {item.name}
                </span>
                <span className={`absolute bottom-0 left-0 w-0 h-[3px] transition-all duration-300 
                  ${item.highlight ? 'bg-[#F96302] w-full' : 'bg-[#0056A6] group-hover:w-full'}`}>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 4. MOBILE MENU (Side Drawer) */}
      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetContent side="left" className="w-[85vw] max-w-[350px] p-0 border-r-0 z-[60] bg-gray-50 flex flex-col h-full">
          
          {/* Header Section */}
          <div className="bg-[#003A75] p-6 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
            
            <div className="relative z-10 flex items-center gap-4 mb-4">
               <div className="bg-white p-2 rounded-full shadow-lg">
                 <FaUser className="text-[#003A75] text-xl" />
               </div>
               <div>
                 <h2 className="font-bold text-lg leading-tight">Welcome</h2>
                 <p className="text-xs text-blue-200">Log in to view applications</p>
               </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-4">
              <button onClick={handleLoginRedirect} className="bg-[#F96302] text-white py-2 px-4 rounded font-bold text-xs uppercase tracking-wide hover:bg-orange-600 transition shadow-md">
                Sign In
              </button>
              <button onClick={handleLoginRedirect} className="bg-white/10 backdrop-blur-sm border border-white/20 text-white py-2 px-4 rounded font-bold text-xs uppercase tracking-wide hover:bg-white/20 transition">
                Apply Now
              </button>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto">
             {/* Quick Actions Grid */}
             <div className="grid grid-cols-3 gap-2 p-4 border-b border-gray-200 bg-white">
                <button onClick={() => handleNavClick('how-it-works')} className="flex flex-col items-center gap-2 p-2 rounded hover:bg-blue-50 transition">
                   <div className="bg-blue-100 p-2 rounded-full text-[#0056A6]"><FaSearch /></div>
                   <span className="text-[10px] font-bold text-gray-600 uppercase">Find</span>
                </button>
                <button onClick={() => handleNavClick('features')} className="flex flex-col items-center gap-2 p-2 rounded hover:bg-orange-50 transition">
                   <div className="bg-orange-100 p-2 rounded-full text-[#F96302]"><FaKey /></div>
                   <span className="text-[10px] font-bold text-gray-600 uppercase">Lease</span>
                </button>
                <button onClick={() => navigate('/dashboard')} className="flex flex-col items-center gap-2 p-2 rounded hover:bg-green-50 transition">
                   <div className="bg-green-100 p-2 rounded-full text-green-600"><FaCity /></div>
                   <span className="text-[10px] font-bold text-gray-600 uppercase">List</span>
                </button>
             </div>

             {/* Main Navigation Links */}
             <div className="py-2 bg-white">
               <div className="px-6 py-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">Rental Categories</div>
               {SECTIONS.map((item) => (
                 <button 
                   key={item.id} 
                   onClick={() => handleNavClick(item.id)} 
                   className="w-full px-6 py-3.5 flex items-center justify-between text-left hover:bg-gray-50 active:bg-gray-100 transition-colors border-l-4 border-transparent hover:border-[#F96302]"
                 >
                   <div className="flex items-center gap-4 text-gray-700">
                     <span className="text-gray-400">{item.icon}</span>
                     <span className="font-semibold text-sm">{item.name}</span>
                   </div>
                   <FaChevronDown className="-rotate-90 text-gray-300 text-xs" />
                 </button>
               ))}
             </div>

             {/* Featured Section */}
             <div className="m-4 p-4 bg-gradient-to-br from-[#0056A6] to-[#003A75] rounded-xl text-white shadow-lg">
                <div className="flex items-start justify-between">
                   <div>
                     <span className="bg-[#F96302] text-[10px] font-bold px-2 py-0.5 rounded text-white">PROMO</span>
                     <h3 className="font-bold text-lg mt-1">Move-in Special</h3>
                     <p className="text-xs text-blue-100 mt-1 mb-3">One month free on select 2-bedroom units.</p>
                     <button onClick={() => handleNavClick('testimonials')} className="text-xs font-bold underline hover:text-[#F96302]">Check Availability</button>
                   </div>
                   <FaCity className="text-white/20 text-5xl" />
                </div>
             </div>
          </div>

          {/* Footer Utility */}
          <div className="p-4 bg-gray-100 border-t border-gray-200">
             <button className="flex items-center gap-3 text-gray-600 font-bold text-sm hover:text-[#0056A6] w-full py-2">
                <FaCog /> Preferences
             </button>
             <button onClick={handleLoginRedirect} className="flex items-center gap-3 text-gray-600 font-bold text-sm hover:text-[#0056A6] w-full py-2">
                <FaSignOutAlt /> Log Out
             </button>
          </div>

        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Navbar;