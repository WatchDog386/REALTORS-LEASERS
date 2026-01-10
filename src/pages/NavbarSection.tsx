import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaBars,
  FaUser,
  FaSearch,
  FaChevronDown,
  FaCity,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaSignOutAlt,
  FaCog,
  FaTools,
  FaList,
  FaTags,
  FaCreditCard,
  FaStar,
  FaHeadset,
  FaShoppingCart,
  FaKey,
  FaHome,
} from "react-icons/fa";
import { Sheet, SheetContent } from "@/components/ui/sheet";

// Navigation Sections
const SECTIONS = [
  { name: "Home", id: "", icon: <FaHome size={16} className="text-[#0056A6]" /> }, 
  { name: "DIY Rental guides", id: "how-it-works", icon: <FaTools size={16} className="text-[#F96302]" /> },
  { name: "Apartments features", id: "features", icon: <FaList size={16} className="text-[#0056A6]" /> },
  { name: "Affordable Prices", id: "pricing", icon: <FaTags size={18} className="text-[#F96302]" />, highlight: true },
  { name: "Payment methods", id: "payment-options", icon: <FaCreditCard size={18} className="text-[#0056A6]" /> },
  { name: "Reviews", id: "testimonials", icon: <FaStar size={16} className="text-[#F96302]" /> },
  { name: "Tenant Support", id: "faq", icon: <FaHeadset size={16} className="text-[#0056A6]" /> },
];

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Cart logic
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("realtor_cart");
    return saved ? JSON.parse(saved) : { count: 0, total: 0 };
  });

  // Inject Fonts and Styles
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    const style = document.createElement('style');
    style.textContent = `
      .risa-font { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; letter-spacing: -0.015em; }
      .risa-heading { font-weight: 800; letter-spacing: -0.03em; }
      .risa-subheading { font-weight: 600; letter-spacing: -0.01em; }
      .risa-body { font-weight: 400; letter-spacing: -0.01em; }
      .risa-uppercase { font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; }
    `;
    document.head.appendChild(style);

    return () => {
      if(document.head.contains(link)) document.head.removeChild(link);
      if(document.head.contains(style)) document.head.removeChild(style);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("realtor_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ==============================
  // NAVIGATION LOGIC
  // ==============================
    
  const handleNavClick = (id: string) => {
    setMenuOpen(false);
    navigate(`/${id}`);
  };

  const handleLoginRedirect = () => {
    setMenuOpen(false);
    navigate("/auth");
  };

  const handleHomeClick = () => {
    setMenuOpen(false);
    navigate("/");
  };

  return (
    <div className={`fixed top-0 w-full z-50 bg-white transition-all duration-300 ${isScrolled ? "shadow-md" : ""} risa-font`}>
        
      {/* Top Utility Strip */}
      <div className="bg-gradient-to-r from-[#1a1a1a] via-[#003A75] to-[#1a1a1a] text-white text-xs hidden lg:block">
        <div className="max-w-[1440px] mx-auto px-4 flex items-center justify-between h-9">
          <div className="flex items-center gap-5 risa-body">
            <button className="flex items-center gap-1.5 hover:text-[#F96302] transition-colors group">
              <FaMapMarkerAlt size={14} className="text-[#F96302]" />
              <span className="font-semibold risa-subheading">Location:</span>
              <span className="font-normal underline group-hover:no-underline">Nairobi, KE</span>
            </button>
            <div className="h-4 w-[1px] bg-gray-600"></div>
            <button className="flex items-center gap-1.5 hover:text-[#F96302]">
              <FaPhoneAlt size={12} className="text-[#F96302]" />
              <span className="font-semibold risa-subheading">Leasing:</span>
              <span className="font-normal">+254 711 493 222</span>
            </button>
          </div>
          <div className="flex items-center gap-5 risa-subheading">
            <button onClick={handleLoginRedirect} className="hover:text-[#0056A6] transition-colors">Post a Rental</button>
            <button onClick={handleLoginRedirect} className="hover:text-[#0056A6] transition-colors">Pay Rent</button>
          </div>
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className="bg-white border-b border-gray-100 py-3">
        <div className="max-w-[1440px] mx-auto px-4">
          <div className="flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-6">
            
            <div className="flex items-center justify-between w-full lg:w-auto">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setMenuOpen(true)} 
                  className="lg:hidden text-gray-700 hover:text-[#F96302] p-2 rounded-full hover:bg-gray-100"
                >
                  <FaBars size={22} />
                </button>

                {/* LOGO - Original Geometric Style, Updated Text */}
                <div 
                  onClick={handleHomeClick} 
                  className="shrink-0 cursor-pointer flex items-center gap-3"
                >
                  <svg viewBox="0 0 200 200" className="h-14 md:h-16 w-auto drop-shadow-sm" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      {/* Richer Gradients for White Background Visibility */}
                      <linearGradient id="grad-front-nav" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#F9F1DC" />
                        <stop offset="100%" stopColor="#D4AF37" />
                      </linearGradient>
                      <linearGradient id="grad-side-nav" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#D4AF37" />
                        <stop offset="100%" stopColor="#AA8C2C" />
                      </linearGradient>
                      <linearGradient id="grad-dark-nav" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#998A5E" />
                        <stop offset="100%" stopColor="#5C5035" />
                      </linearGradient>
                    </defs>

                    {/* Structure - Darker Stroke (#8A7D55) for definition on white */}
                    <path d="M110 90 V170 L160 150 V70 L110 90 Z" fill="url(#grad-front-nav)" stroke="#8A7D55" strokeWidth="2" strokeLinejoin="round"/>
                    <path d="M160 70 L180 80 V160 L160 150 Z" fill="url(#grad-dark-nav)" stroke="#8A7D55" strokeWidth="2" strokeLinejoin="round"/>
                    <path d="M30 150 V50 L80 20 V120 L30 150 Z" fill="url(#grad-front-nav)" stroke="#8A7D55" strokeWidth="2" strokeLinejoin="round"/>
                    <path d="M80 20 L130 40 V140 L80 120 Z" fill="url(#grad-side-nav)" stroke="#8A7D55" strokeWidth="2" strokeLinejoin="round"/>
                    
                    {/* Windows - Original Dark Blue/Black fill */}
                    <g fill="#1a232e"> 
                      <path d="M85 50 L100 56 V86 L85 80 Z" />
                      <path d="M85 90 L100 96 V126 L85 120 Z" />
                      <path d="M45 60 L55 54 V124 L45 130 Z" />
                      <path d="M120 130 L140 122 V152 L120 160 Z" />
                    </g>
                  </svg>

                  {/* Updated Brand Text: "Kenya Realtors" */}
                  <div className="flex flex-col justify-center -space-y-1">
                    <span className="font-light text-xl md:text-2xl tracking-tight text-[#222] risa-font">
                      Kenya
                    </span>
                    <span className="font-black text-2xl md:text-3xl tracking-tight text-[#0056A6] risa-heading uppercase">
                      Realtors
                    </span>
                  </div>
                </div>
              </div>

              {/* Mobile Icons */}
              <div className="flex items-center gap-4 lg:hidden">
                <button onClick={handleLoginRedirect} className="text-gray-700 hover:text-[#F96302]">
                  <FaUser size={22} />
                </button>
                <button className="relative text-gray-700 hover:text-[#F96302]">
                  <FaShoppingCart size={22} />
                  {cart.count > 0 && (
                    <span className="absolute -top-1 -right-2 bg-[#F96302] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white risa-subheading">
                      {cart.count}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Desktop Filter */}
            <button 
              onClick={() => setMenuOpen(true)}
              className="hidden lg:flex flex-col items-start justify-center px-4 h-11 border border-gray-200 hover:border-[#F96302] hover:shadow-sm transition-all bg-gray-50 rounded-xl"
            >
              <span className="text-[10px] text-gray-600 font-bold uppercase mb-0.5 risa-uppercase">Filter</span>
              <span className="text-[14px] font-black text-[#222] flex items-center gap-2 risa-heading">
                Unit Type <FaChevronDown size={10} className="text-[#0056A6]" />
              </span>
            </button>

            {/* Search Bar */}
            <div className="flex-1 w-full relative">
              <div className="w-full flex items-center bg-white border border-gray-300 rounded-full overflow-hidden pl-1 pr-1 py-1 transition-all duration-300 focus-within:border-[#F96302] focus-within:shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
                <div className="relative flex-1">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                    <FaSearch size={16} />
                  </div>
                  <input 
                    type="text" 
                    placeholder="City, Zip, Building Name..." 
                    className="w-full h-10 pl-11 pr-4 border-none outline-none text-base placeholder:text-gray-400 font-medium bg-transparent risa-body"
                  />
                </div>
                <button className="bg-[#F96302] hover:bg-[#d15200] text-white px-5 md:px-7 h-10 font-black uppercase tracking-tighter transition-all duration-300 rounded-full shadow-sm flex items-center gap-2 risa-heading risa-uppercase">
                  <span className="hidden md:block text-xs">Search</span>
                  <FaSearch size={14} className="md:hidden" />
                </button>
              </div>
            </div>

            {/* Desktop Account & Cart */}
            <div className="hidden lg:flex items-center gap-6 shrink-0">
              <button onClick={handleLoginRedirect} className="hidden xl:flex flex-col items-start group">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] text-gray-500 font-bold uppercase risa-uppercase">Account</span>
                  <FaChevronDown size={8} className="text-[#F96302]" />
                </div>
                <span className="text-[14px] font-black text-[#222] group-hover:text-[#0056A6] risa-heading">
                  Sign In
                </span>
              </button>

              <button className="flex items-center gap-2 group relative">
                <div className="relative">
                  <FaShoppingCart size={26} className="text-gray-600 group-hover:text-[#F96302] transition-colors" />
                  {cart.count > 0 && (
                    <span className="absolute -top-1.5 -right-2 bg-[#F96302] text-white text-[10px] font-black w-4 h-4 flex items-center justify-center rounded-full border-2 border-white shadow-sm risa-subheading">
                      {cart.count}
                    </span>
                  )}
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-[10px] text-gray-500 font-bold uppercase risa-uppercase">Cart</span>
                  <span className="text-[13px] font-black text-[#222] leading-tight risa-heading">Items</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sub-Nav (Desktop) */}
      <div className="hidden lg:block bg-white border-b border-gray-100">
        <div className="max-w-[1440px] mx-auto px-4 flex items-center h-12">
          <div className="flex items-center gap-8 text-[13px] font-bold text-gray-700 risa-subheading">
            {SECTIONS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-2.5 relative group py-3 transition-all duration-200 ${
                  (location.pathname === `/${item.id}` || (item.id === "" && location.pathname === "/"))
                    ? 'text-[#222]' 
                    : 'text-gray-600 hover:text-[#0056A6]'
                }`}
              >
                <span className="group-hover:scale-110 transition-transform">{item.icon}</span>
                <span className={item.highlight ? 'text-[#F96302] font-black uppercase tracking-tight risa-heading risa-uppercase' : ''}>
                  {item.name}
                </span>
                {/* Active Indicator Line */}
                <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] rounded-t-full transition-all duration-300 ${
                  (location.pathname === `/${item.id}` || (item.id === "" && location.pathname === "/") || item.highlight)
                    ? 'bg-[#F96302] w-full' 
                    : 'bg-[#0056A6] w-0 group-hover:w-full'
                }`}></span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetContent side="left" className="w-[85vw] max-w-[350px] p-0 border-r-0 z-[60] bg-gray-50 flex flex-col h-full">
          
          <div className="bg-[#003A75] p-6 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="relative z-10 flex items-center gap-4 mb-4">
              <div className="bg-white p-2 rounded-full shadow-lg">
                <FaUser className="text-[#003A75] text-xl" />
              </div>
              <div>
                <h2 className="font-bold text-lg risa-heading">Welcome</h2>
                <p className="text-xs text-blue-200 risa-body">Log in to view applications</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-4">
              <button onClick={handleLoginRedirect} className="bg-[#F96302] text-white py-2 px-4 rounded-xl font-bold text-xs uppercase tracking-wide hover:bg-orange-600 transition shadow-md risa-heading risa-uppercase">
                Sign In
              </button>
              <button onClick={handleLoginRedirect} className="bg-white/10 backdrop-blur-sm border border-white/20 text-white py-2 px-4 rounded-xl font-bold text-xs uppercase tracking-wide hover:bg-white/20 transition risa-heading risa-uppercase">
                Apply Now
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {/* Quick Actions */}
            <div className="grid grid-cols-3 gap-2 p-4 border-b border-gray-200 bg-white">
              <button onClick={() => handleNavClick('how-it-works')} className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-blue-50 transition border border-transparent hover:border-blue-100">
                <div className="bg-blue-100 p-2.5 rounded-full text-[#0056A6]"><FaSearch /></div>
                <span className="text-[10px] font-bold text-gray-600 uppercase risa-uppercase">Find</span>
              </button>
              <button onClick={() => handleNavClick('features')} className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-orange-50 transition border border-transparent hover:border-orange-100">
                <div className="bg-orange-100 p-2.5 rounded-full text-[#F96302]"><FaKey /></div>
                <span className="text-[10px] font-bold text-gray-600 uppercase risa-uppercase">Lease</span>
              </button>
              <button onClick={handleLoginRedirect} className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-green-50 transition border border-transparent hover:border-green-100">
                <div className="bg-green-100 p-2.5 rounded-full text-green-600"><FaCity /></div>
                <span className="text-[10px] font-bold text-gray-600 uppercase risa-uppercase">List</span>
              </button>
            </div>

            {/* Mobile Menu Links */}
            <div className="py-2 bg-white">
              <div className="px-6 py-2 text-[10px] font-black text-gray-400 uppercase tracking-widest risa-uppercase">Pages</div>
              {SECTIONS.map((item) => (
                <button 
                  key={item.id} 
                  onClick={() => handleNavClick(item.id)} 
                  className="w-full px-6 py-3.5 flex items-center justify-between text-left hover:bg-gray-50 active:bg-gray-100 transition-colors border-l-4 border-transparent hover:border-[#F96302]"
                >
                  <div className="flex items-center gap-4 text-gray-700">
                    <span className="text-gray-400 bg-gray-50 p-2 rounded-full">{item.icon}</span>
                    <span className="font-semibold text-sm risa-subheading">{item.name}</span>
                  </div>
                  <FaChevronDown className="-rotate-90 text-gray-300 text-xs" />
                </button>
              ))}
            </div>

            <div className="m-4 p-4 bg-gradient-to-br from-[#0056A6] to-[#003A75] rounded-2xl text-white shadow-lg">
              <div className="flex items-start justify-between">
                <div>
                  <span className="bg-[#F96302] text-[10px] font-bold px-2 py-0.5 rounded-full text-white risa-uppercase">PROMO</span>
                  <h3 className="font-bold text-lg mt-2 risa-heading">Move-in Special</h3>
                  <p className="text-xs text-blue-100 mt-1 mb-3 risa-body">One month free on select units.</p>
                  <button onClick={() => handleNavClick('testimonials')} className="text-xs font-bold bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-full transition-colors risa-subheading">
                    Check Availability
                  </button>
                </div>
                <FaCity className="text-white/20 text-5xl" />
              </div>
            </div>
          </div>

          <div className="p-4 bg-gray-50 border-t border-gray-200">
            <button className="flex items-center gap-3 text-gray-600 font-bold text-sm hover:text-[#0056A6] w-full py-3 hover:bg-white rounded-xl transition-all px-4 risa-subheading">
              <FaCog /> Preferences
            </button>
            <button onClick={handleLoginRedirect} className="flex items-center gap-3 text-gray-600 font-bold text-sm hover:text-[#0056A6] w-full py-3 hover:bg-white rounded-xl transition-all px-4 risa-subheading">
              <FaSignOutAlt /> Log Out
            </button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Navbar;