import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Menu,
  User,
  Search,
  MapPin,
  Phone,
  Building2,
  ChevronDown,
  HelpCircle,
  Hammer,
  Truck,
  CreditCard,
  ShoppingCart
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";

// ==========================================
// CONFIGURATION
// ==========================================
const THEME = {
  ORANGE: "#F96302", // Kept for accents/buttons
  DARK_NAVY: "#0B2545", // From your logo
  SLATE_BLUE: "#6A8EAE", // From your logo
  LIGHT_GRAY: "#F4F4F4",
  BORDER: "#E5E5E5",
};

const NAV_ITEMS = [
  { name: "All Rentals", id: "rentals", icon: <Building2 size={18}/> },
  { name: "Apartments", id: "apartments", icon: <Building2 size={18}/> },
  { name: "Houses", id: "houses", icon: <Building2 size={18}/> },
  { name: "New Constructions", id: "new", icon: <Hammer size={18}/> },
  { name: "Specials & Deals", id: "deals", highlight: true, icon: <CreditCard size={18}/> },
];

// ==========================================
// SUB-COMPONENTS
// ==========================================

const RealtorLogo = () => (
  <div className="flex items-center gap-3 cursor-pointer select-none">
    {/* LOGO ICON - Recreated from your image */}
    <div className="w-12 h-12 relative flex-shrink-0">
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* The House Roof & Left Wall (Dark Navy) */}
        <path 
          d="M10 40 L40 10 L55 25" 
          stroke={THEME.DARK_NAVY} 
          strokeWidth="8" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        <path 
          d="M15 45 V85 H35" 
          stroke={THEME.DARK_NAVY} 
          strokeWidth="8" 
          strokeLinecap="round"
        />
        
        {/* The Window (Grid) */}
        <rect x="22" y="55" width="8" height="8" fill={THEME.DARK_NAVY} />
        <rect x="32" y="55" width="8" height="8" fill={THEME.DARK_NAVY} />
        <rect x="22" y="65" width="8" height="8" fill={THEME.DARK_NAVY} />
        <rect x="32" y="65" width="8" height="8" fill={THEME.DARK_NAVY} />

        {/* The "R" Curve (Slate Blue) */}
        <path 
          d="M45 25 C70 25 85 35 85 55 C85 70 70 75 60 75 L85 95" 
          stroke={THEME.SLATE_BLUE} 
          strokeWidth="10" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        
        {/* The Key (Dark Navy - Vertical) */}
        <circle cx="50" cy="45" r="10" stroke={THEME.DARK_NAVY} strokeWidth="6" fill="white" />
        <circle cx="50" cy="45" r="3" fill={THEME.DARK_NAVY} />
        <path d="M50 55 V85" stroke={THEME.DARK_NAVY} strokeWidth="6" strokeLinecap="round" />
        <path d="M50 70 H58" stroke={THEME.DARK_NAVY} strokeWidth="6" strokeLinecap="round" />
        <path d="M50 80 H58" stroke={THEME.DARK_NAVY} strokeWidth="6" strokeLinecap="round" />
      </svg>
    </div>

    {/* TEXT GROUP */}
    <div className="flex flex-col justify-center">
      <span 
        className="text-3xl lg:text-4xl font-extrabold tracking-wide uppercase leading-none"
        style={{ color: THEME.DARK_NAVY }}
      >
        REALTOR
      </span>
      <span 
        className="text-[9px] lg:text-[10px] font-bold uppercase tracking-[0.05em] mt-1"
        style={{ color: THEME.SLATE_BLUE }}
      >
        Apartment Rentals & Residential Sales
      </span>
    </div>
  </div>
);

const NavbarSection = ({ scrollTo }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle Scroll Effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smarter Navigation
  const handleNavClick = (id) => {
    setMenuOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        if (scrollTo) scrollTo(id);
      }, 300);
    } else {
      if (scrollTo) scrollTo(id);
    }
  };

  return (
    <div className={`fixed top-0 w-full z-50 transition-all duration-200 bg-white ${scrolled ? "shadow-md" : ""}`}>
      
      {/* 1. TOP UTILITY BAR (Charcoal Strip) */}
      <div className="bg-[#333333] text-white text-[11px] font-bold py-1.5 px-4 sm:px-6 lg:px-8 hidden md:block">
        <div className="max-w-[1440px] mx-auto flex justify-between items-center">
          
          {/* Left: Location & Contact */}
          <div className="flex items-center gap-6">
            <button className="flex items-center gap-1.5 cursor-pointer hover:text-[#F96302] transition-colors group">
              <div className="bg-white/10 p-1 rounded-full group-hover:bg-[#F96302] transition-colors">
                <MapPin className="w-3 h-3 text-[#F96302] group-hover:text-white" /> 
              </div>
              <span className="opacity-90">Location:</span> 
              <span className="underline decoration-dotted decoration-white/50 group-hover:text-white">Nairobi, KE</span>
            </button>
            <span className="hidden lg:flex items-center gap-1.5 cursor-pointer hover:text-[#F96302] transition-colors">
              <div className="h-3 w-[1px] bg-gray-600 mx-2"></div>
              <Phone className="w-3 h-3 text-[#F96302]" /> 0700-RENT-NOW
            </span>
          </div>

          {/* Right: Utils */}
          <div className="flex items-center gap-6 tracking-wide uppercase">
            <button onClick={() => navigate("/auth?mode=owner")} className="hover:text-[#F96302] transition-colors">
              List A Property
            </button>
            <button className="hover:text-[#F96302] transition-colors">
              Pro Referrals
            </button>
            <div className="h-3 w-[1px] bg-gray-600"></div>
            <button className="hover:text-[#F96302] transition-colors flex items-center gap-1">
              <HelpCircle className="w-3 h-3" /> Help
            </button>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER (Logo + Search + Actions) */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-[80px] lg:h-[96px] flex items-center justify-between gap-4 lg:gap-8 bg-white">
        
        {/* LOGO SECTION */}
        <div onClick={() => navigate("/")} className="shrink-0 flex items-center">
          <RealtorLogo />
        </div>

        {/* SEARCH BAR (Centerpiece - Desktop) */}
        <div className="hidden md:flex flex-1 max-w-2xl ml-8">
          <div className="flex w-full h-11 border-2 border-[#E5E5E5] focus-within:border-[#F96302] focus-within:ring-1 focus-within:ring-[#F96302] transition-all bg-white group shadow-sm rounded-sm overflow-hidden">
            {/* Dept Dropdown */}
            <div className="bg-[#F4F4F4] px-4 flex items-center border-r border-[#E5E5E5] text-xs font-bold text-[#333] cursor-pointer hover:bg-gray-200 transition-colors whitespace-nowrap">
               All Departments <ChevronDown className="w-3 h-3 ml-2 text-gray-500" />
            </div>
            
            {/* Input */}
            <input 
              type="text" 
              placeholder="Search by apartment name, location, or price..."
              className="flex-1 px-4 text-sm font-medium text-[#333] placeholder:text-gray-400 placeholder:font-normal outline-none"
            />
            
            {/* Search Button */}
            <button className="bg-[#F4F4F4] hover:bg-[#F96302] group-focus-within:bg-[#F96302] text-[#F96302] hover:text-white group-focus-within:text-white px-5 transition-colors h-full flex items-center justify-center">
              <Search className="w-5 h-5" strokeWidth={3} />
            </button>
          </div>
        </div>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-1 lg:gap-6">
            
            {/* Mobile Search Trigger */}
            <button className="md:hidden p-2 text-[#333]">
               <Search className="w-6 h-6" />
            </button>

            {/* Account */}
            <button onClick={() => navigate("/auth")} className="hidden lg:flex flex-col items-center group cursor-pointer px-2">
               <div className="flex items-center gap-1 text-[#333] group-hover:text-[#F96302] transition-colors">
                  <User className="w-5 h-5 fill-current" />
                  <span className="text-sm font-bold">Sign In</span>
               </div>
               <span className="text-[10px] text-gray-500 font-medium group-hover:text-[#F96302]">Account & Lists</span>
            </button>

            {/* Cart / Saved */}
            <button className="flex items-center gap-2 text-[#333] hover:text-[#F96302] relative px-2 group">
               <div className="relative">
                 <ShoppingCart className="w-6 h-6 stroke-[2px] group-hover:fill-orange-50" />
                 <span className="absolute -top-1.5 -right-1.5 bg-[#F96302] text-white text-[9px] font-black w-4 h-4 flex items-center justify-center rounded-full border border-white">
                   0
                 </span>
               </div>
               <span className="hidden xl:inline text-sm font-bold">Saved</span>
            </button>

            {/* Mobile Menu Trigger */}
            <div className="lg:hidden ml-2">
              <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
                <SheetTrigger asChild>
                  <button className="p-2 text-[#333] border-2 border-[#333] rounded-sm hover:border-[#F96302] hover:text-[#F96302] transition-colors">
                    <Menu className="h-6 w-6" strokeWidth={2.5} />
                    <span className="sr-only">Menu</span>
                  </button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[85vw] sm:w-[350px] p-0 border-r-4 border-[#F96302] flex flex-col gap-0 bg-white">
                  <SheetHeader className="bg-[#333] p-6 text-left">
                    <SheetTitle className="text-white">
                        <span className="text-xs font-bold text-[#F96302] uppercase tracking-wider block mb-1">Welcome Guest</span>
                        <div className="flex items-center gap-2">
                             <span className="text-2xl font-black uppercase italic tracking-tighter">MENU</span>
                        </div>
                    </SheetTitle>
                    <div className="flex gap-2 mt-4">
                        <button onClick={() => {navigate("/auth"); setMenuOpen(false)}} className="flex-1 bg-[#F96302] text-white py-2 px-4 text-xs font-bold uppercase hover:bg-white hover:text-[#F96302] transition-colors text-center">
                          Sign In
                        </button>
                        <button onClick={() => {navigate("/auth"); setMenuOpen(false)}} className="flex-1 border border-white text-white py-2 px-4 text-xs font-bold uppercase hover:bg-white hover:text-[#333] transition-colors text-center">
                          Register
                        </button>
                    </div>
                  </SheetHeader>
                  
                  <div className="flex-1 overflow-y-auto py-2">
                    <div className="px-6 py-3 text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">
                        Shop By Department
                    </div>
                    {NAV_ITEMS.map((item) => (
                      <button
                        key={item.id}
                        className="w-full text-left px-6 py-4 text-sm font-bold uppercase text-[#333] border-b border-gray-100 hover:bg-orange-50 hover:text-[#F96302] hover:pl-8 transition-all duration-200 flex justify-between items-center group"
                        onClick={() => handleNavClick(item.id)}
                      >
                        <span className="flex items-center gap-3">
                            <span className="text-gray-400 group-hover:text-[#F96302] transition-colors">{item.icon}</span>
                            {item.name}
                        </span>
                        <ChevronDown className="-rotate-90 w-4 h-4 text-gray-300 group-hover:text-[#F96302]" />
                      </button>
                    ))}

                    <div className="mt-6 px-6">
                        <div className="bg-[#F5F5F5] p-4 rounded-sm border border-gray-200">
                             <h4 className="font-bold text-[#333] flex items-center gap-2 text-sm">
                                <Truck size={16} className="text-[#F96302]"/> Track Applications
                             </h4>
                             <p className="text-xs text-gray-500 mt-1">Check the status of your rental approvals.</p>
                        </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
        </div>
      </div>

      {/* 3. DEPARTMENT LINKS (Bottom Strip - Desktop Only) */}
      <div className="hidden lg:flex border-t border-[#E5E5E5] px-4 sm:px-6 lg:px-8 bg-white">
         <div className="max-w-[1440px] mx-auto w-full flex items-center gap-8 text-[12px] font-bold text-[#333] uppercase tracking-tight h-10">
            {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`
                    h-full flex items-center gap-1 border-b-[3px] border-transparent hover:border-[#F96302] hover:text-[#F96302] transition-all
                    ${item.highlight ? "text-[#F96302]" : ""}
                  `}
                >
                  {item.name}
                </button>
            ))}
            <div className="ml-auto flex items-center gap-4 text-gray-500 font-bold text-[11px] normal-case tracking-wide">
               <span className="hover:underline cursor-pointer hover:text-[#F96302]">Local Ad</span>
               <span className="w-px h-3 bg-gray-300"></span>
               <span className="hover:underline cursor-pointer hover:text-[#F96302] flex items-center gap-1">
                 <CreditCard size={14} /> Realtor Credit Card
               </span>
            </div>
         </div>
      </div>

    </div>
  );
};

export default NavbarSection;