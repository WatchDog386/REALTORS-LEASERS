import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaBars,
  FaUser,
  FaSearch,
  FaBuilding,
  FaChevronDown,
  FaHammer,
  FaTruck,
  FaShoppingCart,
  FaCreditCard,
  FaQuestionCircle,
  FaStar,
  FaTags,
  FaStore,
  FaArrowRight,
  FaMapMarkerAlt
} from "react-icons/fa";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

// ==========================================
// SECTIONS CONFIGURATION
// ==========================================
const SECTIONS = [
  { 
    name: "DIY Project Guides", 
    id: "how-it-works", 
    icon: <FaHammer size={18} className="text-[#F96302]" /> 
  },
  { 
    name: "Property Features", 
    id: "features", 
    icon: <FaBuilding size={18} className="text-[#0056A6]" /> 
  },
  { 
    name: "Local Ad & Specials", 
    id: "pricing", 
    icon: <FaTags size={18} className="text-red-600" />, 
    highlight: true 
  },
  { 
    name: "Financing", 
    id: "payment-options", 
    icon: <FaCreditCard size={18} className="text-emerald-600" /> 
  },
  { 
    name: "Pro Reviews", 
    id: "testimonials", 
    icon: <FaStar size={18} className="text-yellow-500" /> 
  },
  { 
    name: "Customer Service", 
    id: "faq", 
    icon: <FaQuestionCircle size={18} className="text-cyan-600" /> 
  },
];

const BrandLogo = () => (
  <div className="flex items-center gap-0 cursor-pointer group select-none">
    <div className="bg-[#F96302] w-10 h-10 md:w-16 md:h-16 flex flex-col items-center justify-center relative p-1 shadow-md border-b-2 border-[#0056A6]">
        <span className="text-white font-black leading-none text-lg md:text-3xl font-sans tracking-tighter">R</span>
        <div className="w-full border-t border-white/40 my-0.5"></div>
        <span className="text-white font-bold text-[5px] md:text-[9px] uppercase text-center leading-tight">THE<br/>REALTOR<br/>DEPOT</span>
    </div>
  </div>
);

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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

  const handleNavClick = (id) => {
    setMenuOpen(false);
    if (location.pathname === "/") {
      const element = document.getElementById(id);
      if (element) {
        const headerOffset = 160;
        const elementPosition = element.getBoundingClientRect().top;
        window.scrollTo({ top: elementPosition + window.pageYOffset - headerOffset, behavior: "smooth" });
      }
    } else {
      navigate("/");
    }
  };

  const handleLoginRedirect = () => {
    setMenuOpen(false);
    navigate("/auth");
  };

  const handleProfileRedirect = () => {
    setMenuOpen(false);
    navigate("/profile"); 
  };

  return (
    <div className={`fixed top-0 w-full z-50 bg-white transition-all ${isScrolled ? "shadow-lg" : ""}`}>
      
      {/* 1. TOP UTILITY STRIP */}
      <div className="bg-gradient-to-r from-[#222222] via-[#003A75] to-[#222222] text-white text-[12px] hidden lg:block">
        <div className="max-w-[1440px] mx-auto px-4 flex items-center justify-between h-9">
          <div className="flex items-center gap-5">
             <button className="flex items-center gap-1.5 hover:text-[#F96302] transition-colors duration-200 group">
               <FaStore size={14} className="text-[#F96302]" />
               <span className="font-semibold">You're shopping at:</span>
               <span className="font-normal underline group-hover:no-underline">Nairobi West</span>
               <FaChevronDown size={10} />
             </button>
             <div className="h-4 w-[1px] bg-gray-600"></div>
             <button className="flex items-center gap-1.5 hover:text-[#F96302]">
               <FaTruck size={14} className="text-[#F96302]" />
               <span className="font-semibold">Scheduled Delivery:</span>
               <span className="font-normal">Jan 08</span>
             </button>
          </div>
          <div className="flex items-center gap-5 font-medium">
            <button onClick={() => navigate("/dashboard")} className="hover:text-[#0056A6] transition-colors">Lists</button>
            <button onClick={() => navigate("/dashboard")} className="hover:text-[#0056A6] transition-colors">Favorites</button>
            <button onClick={() => navigate("/dashboard")} className="hover:text-[#0056A6] transition-colors">Track Order</button>
          </div>
        </div>
      </div>

      {/* 2. MAIN NAV BAR */}
      <div className="bg-white border-b border-gray-200 py-2 lg:py-3">
        <div className="max-w-[1440px] mx-auto px-4">
          <div className="flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-6">
            
            <div className="flex items-center justify-between w-full lg:w-auto">
              <div className="flex items-center gap-4">
                <button onClick={() => setMenuOpen(true)} className="lg:hidden text-gray-700 hover:text-[#F96302] p-1">
                  <FaBars size={24} />
                </button>
                <div onClick={() => navigate("/")} className="shrink-0">
                  <BrandLogo />
                </div>
              </div>

              <div className="flex items-center gap-5 lg:hidden">
                <button onClick={handleLoginRedirect} className="text-gray-700 hover:text-[#F96302]">
                   <FaUser size={22} />
                </button>
                <button className="relative text-gray-700 hover:text-[#F96302]">
                   <FaShoppingCart size={22} />
                   <span className="absolute -top-1 -right-2 bg-[#F96302] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white">
                     {cart.count}
                   </span>
                </button>
              </div>
            </div>

            <button 
              onClick={() => setMenuOpen(true)}
              className="hidden lg:flex flex-col items-start justify-center px-4 h-12 border border-gray-300 hover:border-[#F96302] hover:shadow-[0_0_0_1px_#0056A6] transition-all group bg-gray-50 shrink-0 rounded-sm"
            >
              <span className="text-[10px] text-gray-600 font-bold uppercase leading-none mb-0.5">Shop All</span>
              <span className="text-[15px] font-black text-[#222] flex items-center gap-2">
                Departments <FaChevronDown size={12} className="text-[#0056A6]" />
              </span>
            </button>

            <div className="flex-1 flex group w-full relative z-10">
              <div className="relative flex-1">
                <input 
                  type="text" 
                  placeholder="What can we help you find?" 
                  className="w-full h-11 md:h-12 pl-4 pr-10 border-2 border-r-0 border-gray-300 group-focus-within:border-[#F96302] group-focus-within:border-r-0 group-focus-within:shadow-[0_0_0_1px_#0056A6] outline-none text-[15px] md:text-[16px] rounded-l-sm placeholder:text-gray-400 font-medium"
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

            <div className="hidden lg:flex items-center gap-8 shrink-0">
              <button onClick={handleLoginRedirect} className="hidden xl:flex flex-col items-start group">
                <div className="flex items-center gap-2">
                    <span className="text-[11px] text-gray-500 font-bold uppercase">My Account</span>
                    <FaChevronDown size={10} className="text-[#F96302]" />
                </div>
                <span className="text-[15px] font-black text-[#222] group-hover:text-[#0056A6] transition-colors leading-tight">
                  Sign In
                </span>
              </button>

              <button className="flex items-center gap-2 group relative">
                <div className="relative">
                  <FaShoppingCart size={28} className="text-gray-600 group-hover:text-[#F96302] transition-colors" />
                  <span className="absolute -top-1.5 -right-2 bg-[#F96302] text-white text-[11px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow-sm">
                    {cart.count}
                  </span>
                </div>
                <div className="flex flex-col items-start">
                    <span className="text-[11px] text-gray-500 font-bold uppercase">Cart</span>
                    <span className="text-[14px] font-black text-[#222] leading-tight">$0.00</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. SUB-NAV */}
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
          <div className="ml-auto flex items-center gap-6">
             <button onClick={() => navigate("/dashboard")} className="text-[13px] font-bold text-[#0056A6] hover:text-[#F96302] transition-colors duration-200 flex items-center gap-1.5">
               <FaMapMarkerAlt />
               Store Finder
             </button>
          </div>
        </div>
      </div>

      {/* 4. MOBILE MENU SHEET */}
      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetContent side="left" className="w-[300px] p-0 border-r-4 border-[#F96302] overflow-y-auto z-[60]">
          <SheetHeader className="bg-[#003A75] p-6 border-b-4 border-[#F96302]">
            <SheetTitle className="text-white text-left font-black uppercase tracking-tighter flex items-center gap-3">
                <FaUser className="text-[#F96302] bg-white rounded-full p-1 h-8 w-8" />
                <span>Hello, Sign In</span>
            </SheetTitle>
          </SheetHeader>
          
          <div className="p-4 border-b border-gray-100 bg-gray-50">
             <div className="grid grid-cols-2 gap-3">
                 <button onClick={handleLoginRedirect} className="w-full bg-[#0056A6] text-white py-2.5 font-bold text-sm rounded shadow-sm hover:bg-[#003A75]">
                   Sign In
                 </button>
                 <button onClick={handleLoginRedirect} className="w-full border-2 border-[#0056A6] text-[#0056A6] py-2.5 font-bold text-sm rounded hover:bg-blue-50">
                   Register
                 </button>
             </div>
             <button 
                onClick={handleProfileRedirect}
                className="w-full mt-3 flex items-center justify-between text-gray-700 font-bold text-sm hover:text-[#F96302]"
             >
                <span>My Profile</span>
                {/* FIXED: Removed -rotate-90 attribute and used className instead */}
                <FaChevronDown size={12} className="-rotate-90" />
             </button>
          </div>

          <div className="flex flex-col pb-10">
            <div className="px-6 py-3 text-xs font-black text-gray-400 uppercase tracking-widest bg-gray-100">Shop Departments</div>
            {SECTIONS.map((item) => (
              <button 
                key={item.id} 
                onClick={() => handleNavClick(item.id)} 
                className="px-6 py-4 border-b border-gray-100 text-left font-bold flex items-center justify-between hover:bg-blue-50 group transition-all duration-200"
              >
                <span className="flex items-center gap-4 text-gray-700 group-hover:text-[#0056A6]">
                  <span className="w-5 flex justify-center">{item.icon}</span>
                  {item.name}
                </span>
                <FaArrowRight size={14} className="text-[#0056A6] opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
            
            <div className="px-6 py-3 text-xs font-black text-gray-400 uppercase tracking-widest bg-gray-100 mt-2">Account & Services</div>
             <button onClick={() => navigate("/dashboard")} className="px-6 py-4 border-b border-gray-100 text-left text-sm font-semibold text-gray-600 hover:text-[#0056A6] flex items-center gap-3">
               <FaTruck className="text-gray-400" /> Track Order
             </button>
             <button onClick={() => navigate("/dashboard")} className="px-6 py-4 border-b border-gray-100 text-left text-sm font-semibold text-gray-600 hover:text-[#0056A6] flex items-center gap-3">
               <FaBuilding className="text-gray-400" /> Store Finder
             </button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Navbar;