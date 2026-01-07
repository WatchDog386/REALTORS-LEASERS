import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Menu,
  User,
  Search,
  MapPin,
  Building2,
  ChevronDown,
  Hammer,
  Truck,
  ShoppingCart,
  CreditCard,
  HelpCircle,
  Star,
  Tag,
  Store,
  ArrowRight
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";

// ==========================================
// UPDATED COLOR PALETTE: Red, White & Blue Theme
// ==========================================
const COLORS = {
  AMERICAN_RED: "#F96302",      // Keep the orange-red
  AMERICAN_BLUE: "#0056A6",     // Deep blue accent
  NAVY_BLUE: "#003A75",         // Dark blue for contrast
  CHARCOAL: "#222222",          // Charcoal black
  WHITE: "#FFFFFF",
  LIGHT_GRAY: "#F8F9FA",
  MEDIUM_GRAY: "#E9ECEF"
};

const SECTIONS = [
  { name: "DIY Project Guides", id: "how-it-works", icon: <Hammer size={16} /> },
  { name: "Property Features", id: "features", icon: <Building2 size={16} /> },
  { name: "Local Ad & Specials", id: "pricing", icon: <Tag size={16} />, highlight: true },
  { name: "Financing", id: "payment-options", icon: <CreditCard size={16} /> },
  { name: "Pro Reviews", id: "testimonials", icon: <Star size={16} /> },
  { name: "Customer Service", id: "faq", icon: <HelpCircle size={16} /> },
];

const BrandLogo = () => (
  <div className="flex items-center gap-0 cursor-pointer group select-none">
    {/* Keep orange logo but add blue accent */}
    <div className="bg-[#F96302] w-14 h-14 md:w-16 md:h-16 flex flex-col items-center justify-center relative p-1 shadow-md border-b-2 border-[#0056A6]">
        <span className="text-white font-black leading-none text-2xl md:text-3xl font-sans tracking-tighter">R</span>
        <div className="w-full border-t border-white/40 my-0.5"></div>
        <span className="text-white font-bold text-[7px] md:text-[9px] uppercase text-center leading-tight">THE<br/>REALTOR<br/>DEPOT</span>
    </div>
  </div>
);

const NavbarSection = () => {
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
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 160;
      const elementPosition = element.getBoundingClientRect().top;
      window.scrollTo({ top: elementPosition + window.pageYOffset - headerOffset, behavior: "smooth" });
    }
  };

  return (
    <div className={`fixed top-0 w-full z-50 bg-white transition-all ${isScrolled ? "shadow-lg" : ""}`}>
      
      {/* 1. TOP UTILITY STRIP (Red & Blue Stripe Theme) */}
      <div className="bg-gradient-to-r from-[#222222] via-[#003A75] to-[#222222] text-white text-[12px] hidden sm:block">
        <div className="max-w-[1440px] mx-auto px-4 flex items-center justify-between h-9">
          <div className="flex items-center gap-5">
             <button className="flex items-center gap-1.5 hover:text-[#F96302] transition-colors duration-200">
               <Store size={14} className="text-[#F96302]" />
               <span className="font-semibold">You're shopping at:</span>
               <span className="font-normal underline hover:no-underline">Nairobi West</span>
               <ChevronDown size={12} />
             </button>
             <div className="h-4 w-[1px] bg-gray-600"></div>
             <button className="flex items-center gap-1.5 hover:text-[#F96302]">
               <Truck size={14} className="text-[#F96302]" />
               <span className="font-semibold">Scheduled Delivery:</span>
               <span className="font-normal">Jan 08</span>
             </button>
          </div>
          <div className="flex items-center gap-5 font-medium">
            <button className="hover:text-[#0056A6] transition-colors">Lists</button>
            <button className="hover:text-[#0056A6] transition-colors">Favorites</button>
            <button className="hover:text-[#0056A6] transition-colors">Track Order</button>
          </div>
        </div>
      </div>

      {/* 2. MAIN NAV (White with Red & Blue Accents) */}
      <div className="bg-white border-b border-gray-200 py-3">
        <div className="max-w-[1440px] mx-auto px-4 flex items-center gap-6">
          
          <div onClick={() => navigate("/")} className="shrink-0">
            <BrandLogo />
          </div>

          {/* Department Button - Red & Blue Theme */}
          <button 
            onClick={() => setMenuOpen(true)}
            className="hidden lg:flex flex-col items-start justify-center px-4 h-12 border border-gray-300 hover:border-[#F96302] hover:shadow-[0_0_0_1px_#0056A6] transition-all group bg-gray-50"
          >
            <span className="text-[10px] text-gray-600 font-bold uppercase leading-none">All</span>
            <span className="text-[15px] font-black text-[#222] flex items-center gap-2">
              Departments <ChevronDown size={16} className="text-[#0056A6]" />
            </span>
          </button>

          {/* SEARCH BAR - Red & Blue Theme */}
          <div className="flex-1 flex group">
            <div className="relative flex-1">
              <input 
                type="text" 
                placeholder="What can we help you find today?" 
                className="w-full h-12 px-4 border-2 border-r-0 border-gray-300 group-focus-within:border-[#F96302] group-focus-within:border-r-0 group-focus-within:shadow-[0_0_0_1px_#0056A6] outline-none text-[16px]"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#0056A6]">
                 <Search size={22} strokeWidth={2.5} />
              </button>
            </div>
            <button className="bg-gradient-to-r from-[#F96302] to-[#E55300] hover:from-[#0056A6] hover:to-[#003A75] text-white px-8 h-12 font-black uppercase tracking-tighter transition-all duration-300 shadow-md">
              Search
            </button>
          </div>

          {/* ACCOUNT & CART - Red & Blue Theme */}
          <div className="flex items-center gap-6">
            <button className="hidden xl:flex flex-col items-start group">
              <span className="text-[11px] text-gray-500 font-bold">My Account</span>
              <span className="text-[14px] font-black group-hover:text-[#0056A6] flex items-center transition-colors">
                Sign In <ChevronDown size={14} className="ml-1 text-[#F96302]" />
              </span>
            </button>

            <button className="flex flex-col items-center group relative pt-1">
              <div className="relative">
                <ShoppingCart size={32} strokeWidth={1.5} className="text-gray-700 group-hover:text-[#F96302]" />
                <span className="absolute -top-1 -right-2 bg-gradient-to-br from-[#F96302] to-[#0056A6] text-white text-[11px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow-md">
                  {cart.count}
                </span>
              </div>
              <span className="text-[10px] font-black uppercase mt-0.5 text-gray-600">Cart</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. SUB-NAV / CATEGORIES (Red & Blue Theme - No orange bottom border) */}
      <div className="hidden lg:block bg-white border-b-2 border-gray-200 shadow-sm">
        <div className="max-w-[1440px] mx-auto px-4 flex items-center h-10 relative">
          {/* Blue accent line on top */}
          <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#0056A6] to-[#003A75]"></div>
          
          <div className="flex items-center gap-8 text-[13px] font-bold text-gray-700">
            {SECTIONS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`hover:text-[#F96302] flex items-center gap-2 transition-colors duration-200 relative group ${item.highlight ? 'text-[#0056A6] font-black' : ''}`}
              >
                <span className={`${item.highlight ? 'text-[#F96302]' : 'text-gray-500'}`}>
                  {item.icon}
                </span>
                {item.name}
                {item.highlight && <ArrowRight size={14} className="text-[#F96302]" />}
                <span className="absolute bottom-0 left-0 w-0 group-hover:w-full h-0.5 bg-[#0056A6] transition-all duration-300"></span>
              </button>
            ))}
          </div>
          
          <div className="ml-auto flex items-center gap-6">
             <button className="text-[13px] font-bold text-[#0056A6] hover:text-[#F96302] transition-colors duration-200 flex items-center gap-1">
               Professional Services
             </button>
             <button className="text-[13px] font-bold text-[#0056A6] hover:text-[#F96302] transition-colors duration-200 flex items-center gap-1">
               Credit Services
             </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU SHEET - Red & Blue Theme */}
      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetContent side="left" className="w-[300px] p-0 border-r-4 border-[#F96302]">
          <SheetHeader className="bg-gradient-to-r from-[#222222] to-[#003A75] p-6 border-b-2 border-[#F96302]">
            <SheetTitle className="text-white text-left font-black uppercase tracking-tighter">Shop Departments</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col">
            {SECTIONS.map((item) => (
              <button 
                key={item.id} 
                onClick={() => handleNavClick(item.id)} 
                className="px-6 py-4 border-b border-gray-100 text-left font-bold flex items-center justify-between hover:bg-blue-50 group transition-all duration-200"
              >
                <span className="flex items-center gap-3 text-gray-700 group-hover:text-[#F96302]">
                  <span className={`${item.highlight ? 'text-[#0056A6]' : 'text-gray-500'}`}>
                    {item.icon}
                  </span>
                  {item.name}
                </span>
                <ArrowRight size={16} className="text-[#0056A6] opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default NavbarSection;