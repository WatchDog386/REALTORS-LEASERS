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
  Tag
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";

// ==========================================
// CONFIGURATION: Updated to Realtor Theme
// ==========================================
const THEME = {
  BLUE: "#0056b3",      // Professional Blue
  ORANGE: "#F96302",    // Brand Orange
  CHARCOAL: "#333333",
  TEXT_MAIN: "#111111",
};

const SECTIONS = [
  { name: "Get Started", id: "how-it-works", icon: <Hammer size={16}/> },
  { name: "Apartment Features", id: "features", icon: <Building2 size={16}/> },
  { name: "Rates & Pricing", id: "pricing", icon: <Tag size={16}/>, highlight: true },
  { name: "Payment Options", id: "payment-options", icon: <CreditCard size={16}/> },
  { name: "Reviews", id: "testimonials", icon: <Star size={16}/> },
  { name: "Support & FAQ", id: "faq", icon: <HelpCircle size={16}/> },
];

// ==========================================
// COMPONENT: LOGO (Updated to Orange Primary)
// ==========================================
const BrandLogo = () => (
  <div className="flex items-center gap-2 cursor-pointer group select-none">
    {/* Orange Box that turns Blue on Group Hover */}
    <div className="bg-[#F96302] group-hover:bg-[#0056b3] transition-colors duration-300 w-10 h-10 md:w-12 md:h-12 flex flex-col items-center justify-center shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-white/20"></div>
        <span className="text-white font-black leading-none text-xl md:text-2xl font-sans tracking-tighter">R</span>
        <span className="text-white/[0.8] font-bold text-[8px] md:text-[10px] uppercase tracking-wider mt-0.5">EST.24</span>
    </div>

    <div className="flex flex-col justify-center">
      <h1 className="text-2xl md:text-3xl font-black text-[#111] uppercase leading-none tracking-tighter" style={{ fontFamily: 'Arial Black, sans-serif' }}>
        REALTOR<span className="text-[#F96302] group-hover:text-[#0056b3]">.</span>DEPOT
      </h1>
      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-0.5 ml-0.5">
        Rentals • Sales • Management
      </span>
    </div>
  </div>
);

// ==========================================
// COMPONENT: NAVBAR
// ==========================================
const NavbarSection = ({ scrollTo, setDemoOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // --- CART PERSISTENCE LOGIC ---
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("realtor_cart");
    return savedCart ? JSON.parse(savedCart) : { count: 0, total: 0 };
  });

  useEffect(() => {
    localStorage.setItem("realtor_cart", JSON.stringify(cart));
  }, [cart]);

  // Demo function to add to cart
  const addToCart = () => {
    setCart(prev => ({
      count: prev.count + 1,
      total: prev.total + 8500 
    }));
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (id) => {
    setMenuOpen(false);
    const scrollToElement = () => {
      const element = document.getElementById(id);
      if (element) {
        const headerOffset = 140; 
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      }
    };
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(scrollToElement, 300);
    } else {
      scrollToElement();
    }
  };

  return (
    <div className={`fixed top-0 w-full z-50 bg-white transition-shadow duration-300 ${isScrolled ? "shadow-md" : ""}`}>
      
      {/* 1. TOP UTILITY STRIP */}
      <div className="bg-[#333333] text-white text-[11px] font-bold hidden sm:block">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8 h-8 flex items-center justify-between">
          <div className="flex items-center gap-6">
             <button className="hover:underline text-gray-100 flex items-center gap-1.5 group">
               <MapPin size={14} className="text-[#F96302] group-hover:text-[#0056b3]" fill="currentColor"/>
               <span className="opacity-90 font-normal">Location:</span>
               <span className="uppercase tracking-wide group-hover:text-[#F96302] transition-colors">Nairobi, KE</span>
               <ChevronDown size={12} className="opacity-70"/>
             </button>
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => handleNavClick('how-it-works')} className="hover:text-[#F96302]">Owner Services</button>
            <button onClick={() => handleNavClick('pricing')} className="hover:text-[#F96302]">Offers</button>
            <button onClick={() => handleNavClick('faq')} className="hover:text-[#F96302]">Help</button>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER */}
      <div className="bg-white border-b border-gray-200 relative z-20">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8 h-[80px] lg:h-[96px] flex items-center gap-4 lg:gap-10">
          
          <div onClick={() => {navigate("/"); window.scrollTo(0,0)}} className="shrink-0 pt-1">
            <BrandLogo />
          </div>

          {/* SEARCH BAR (Blue border, Blue/Orange Button) */}
          <div className="hidden md:flex flex-1 max-w-3xl relative">
            <div className="flex w-full h-11 border-2 border-[#0056b3] hover:border-[#F96302] rounded-sm overflow-hidden transition-colors">
              <div className="bg-gray-100 px-3 flex items-center border-r border-gray-300 text-xs font-bold text-gray-600">
                  All Units <ChevronDown size={12} className="ml-1"/>
              </div>
              <input 
                type="text" 
                placeholder="Search by neighborhood or price..." 
                className="flex-1 px-4 text-[15px] outline-none"
              />
              <button className="bg-[#0056b3] hover:bg-[#F96302] text-white px-5 transition-colors">
                <Search className="w-5 h-5" strokeWidth={3} />
              </button>
            </div>
          </div>

          <div className="flex items-center ml-auto gap-1 lg:gap-8">
            <button onClick={() => navigate("/auth")} className="hidden lg:flex items-center gap-2 group text-left px-2">
               <div className="border-2 border-transparent group-hover:border-[#F96302] rounded-full p-1 transition-all">
                  <User size={22} className="text-[#333]" />
               </div>
               <div className="flex flex-col leading-none">
                 <span className="text-[11px] font-normal">Sign In</span>
                 <span className="text-[13px] font-bold group-hover:text-[#F96302]">My Account</span>
               </div>
            </button>

            <button 
              onClick={addToCart} 
              className="flex items-center gap-2 group text-left relative pl-2 pr-2"
            >
               <div className="relative pt-1">
                 <ShoppingCart size={26} className="text-[#333] group-hover:text-[#F96302] transition-colors" />
                 {cart.count > 0 && (
                   <span className="absolute -top-1 -right-2 bg-[#F96302] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white">
                     {cart.count}
                   </span>
                 )}
               </div>
               <div className="hidden lg:flex flex-col leading-none gap-1">
                 <span className="text-[11px] font-normal">Cart</span>
                 <span className="text-[13px] font-bold text-[#333] group-hover:text-[#F96302]">
                   KSh {cart.total.toLocaleString()}
                 </span>
               </div>
            </button>

            <div className="lg:hidden ml-2">
              <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
                <SheetTrigger asChild>
                  <button className="p-2 border-2 border-[#333] rounded-sm hover:border-[#F96302]">
                    <Menu size={24} strokeWidth={2.5} />
                  </button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[85vw] p-0 bg-white border-r-4 border-[#0056b3]">
                  <SheetHeader className="bg-[#333] p-6 text-left">
                    <SheetTitle className="text-white uppercase tracking-widest font-black">Realtor Menu</SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col py-2">
                    {SECTIONS.map((item) => (
                      <button key={item.id} onClick={() => handleNavClick(item.id)} className="px-6 py-4 border-b text-sm font-bold uppercase flex items-center gap-3 hover:text-[#0056b3]">
                        {item.icon} {item.name}
                      </button>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>

      {/* 3. CATEGORY STRIP */}
      <div className="hidden lg:block bg-white border-b border-gray-300">
        <div className="max-w-[1440px] mx-auto px-8">
            <div className="flex items-center gap-1 text-[12px] font-bold text-[#333] uppercase h-[42px]">
               <button className="h-full px-4 flex items-center gap-2 border-r border-gray-300 mr-4 hover:bg-gray-50 transition-colors">
                 <Truck size={16} className="text-[#0056b3]" />
                 Inventory List 
               </button>

               <div className="flex items-center h-full">
                 {SECTIONS.map((item) => (
                   <button
                     key={item.id}
                     onClick={() => handleNavClick(item.id)}
                     className="h-full px-5 flex items-center relative group"
                   >
                     <span className="group-hover:text-[#0056b3] transition-colors">{item.name}</span>
                     <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#0056b3] scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                   </button>
                 ))}
               </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarSection;