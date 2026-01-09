import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaBars,
  FaUser,
  FaSearch,
  FaChevronDown,
  FaHome,
  FaKey,
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
} from "react-icons/fa";
import { Sheet, SheetContent } from "@/components/ui/sheet";

const SECTIONS = [
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

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("realtor_cart");
    return saved ? JSON.parse(saved) : { count: 0, total: 0 };
  });

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
      document.head.removeChild(link);
      document.head.removeChild(style);
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

  const handleNavClick = (id) => {
    setMenuOpen(false);
    if (location.pathname === "/") {
      const el = document.getElementById(id);
      if (el) {
        const offset = el.offsetTop - 120;
        window.scrollTo({ top: offset, behavior: "smooth" });
      }
    } else {
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 150);
    }
  };

  const handleLoginRedirect = () => {
    setMenuOpen(false);
    navigate("/auth");
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
              <span className="font-semibold risa-subheading">Leasing Office:</span>
              <span className="font-normal">+254 711 493 222 or +254 734 712 578</span>
            </button>
          </div>
          <div className="flex items-center gap-5 risa-subheading">
            <button onClick={handleLoginRedirect} className="hover:text-[#0056A6] transition-colors">Post a Rental</button>
            <button onClick={handleLoginRedirect} className="hover:text-[#0056A6] transition-colors">Pay Rent</button>
          </div>
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className="bg-white border-b border-gray-100 py-3 lg:py-4">
        <div className="max-w-[1440px] mx-auto px-4">
          <div className="flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-6">
            
            <div className="flex items-center justify-between w-full lg:w-auto">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setMenuOpen(true)} 
                  className="lg:hidden text-gray-700 hover:text-[#F96302] p-2 rounded-full hover:bg-gray-100"
                >
                  <FaBars size={24} />
                </button>

                {/* LOGO + STYLED "Kenyarealtors" TEXT */}
                <div 
                  onClick={() => navigate("/")} 
                  className="shrink-0 cursor-pointer flex items-center gap-2.5"
                >
                  <img 
                    src="/realtor.jpg" 
                    alt="Kenyarealtors Logo" 
                    className="h-9 md:h-11 w-auto object-contain rounded-md" 
                  />
                  <span className="font-black text-xl md:text-2xl tracking-tight risa-heading whitespace-nowrap">
                    <span className="text-[#0056A6]">Kenya</span>
                    <span className="text-[#222]">realtors</span>
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-5 lg:hidden">
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

            {/* Desktop Filter Button */}
            <button 
              onClick={() => setMenuOpen(true)}
              className="hidden lg:flex flex-col items-start justify-center px-5 h-12 border border-gray-200 hover:border-[#F96302] hover:shadow-sm transition-all bg-gray-50 rounded-2xl"
            >
              <span className="text-[10px] text-gray-600 font-bold uppercase mb-0.5 risa-uppercase">Filter</span>
              <span className="text-[15px] font-black text-[#222] flex items-center gap-2 risa-heading">
                Unit Type <FaChevronDown size={12} className="text-[#0056A6]" />
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
                    placeholder="City, Zip, Building Name or Amenities..." 
                    className="w-full h-10 pl-11 pr-4 border-none outline-none text-sm placeholder:text-gray-400 font-medium bg-transparent risa-body"
                  />
                </div>
                <button className="bg-[#F96302] hover:bg-[#d15200] text-white px-6 md:px-8 h-10 font-black uppercase tracking-tighter transition-all duration-300 rounded-full shadow-sm flex items-center gap-2 risa-heading risa-uppercase">
                  <span className="hidden md:block">Search</span>
                  <FaSearch size={14} className="md:hidden" />
                </button>
              </div>
            </div>

            {/* Desktop Account & Cart */}
            <div className="hidden lg:flex items-center gap-8 shrink-0">
              <button onClick={handleLoginRedirect} className="hidden xl:flex flex-col items-start group">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-gray-500 font-bold uppercase risa-uppercase">Account</span>
                  <FaChevronDown size={10} className="text-[#F96302]" />
                </div>
                <span className="text-[15px] font-black text-[#222] group-hover:text-[#0056A6] risa-heading">
                  Sign In
                </span>
              </button>

              <button className="flex items-center gap-2 group relative">
                <div className="relative">
                  <FaShoppingCart size={28} className="text-gray-600 group-hover:text-[#F96302] transition-colors" />
                  {cart.count > 0 && (
                    <span className="absolute -top-1.5 -right-2 bg-[#F96302] text-white text-[11px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow-sm risa-subheading">
                      {cart.count}
                    </span>
                  )}
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-[11px] text-gray-500 font-bold uppercase risa-uppercase">Cart</span>
                  <span className="text-[14px] font-black text-[#222] leading-tight risa-heading">Items</span>
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
                  item.highlight ? 'text-[#222]' : 'text-gray-600 hover:text-[#0056A6]'
                }`}
              >
                <span className="group-hover:scale-110 transition-transform">{item.icon}</span>
                <span className={item.highlight ? 'text-[#F96302] font-black uppercase tracking-tight risa-heading risa-uppercase' : ''}>
                  {item.name}
                </span>
                <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] rounded-t-full transition-all duration-300 ${
                  item.highlight ? 'bg-[#F96302] w-full' : 'bg-[#0056A6] w-0 group-hover:w-full'
                }`}></span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
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

            <div className="py-2 bg-white">
              <div className="px-6 py-2 text-[10px] font-black text-gray-400 uppercase tracking-widest risa-uppercase">Rental Categories</div>
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
                  <p className="text-xs text-blue-100 mt-1 mb-3 risa-body">One month free on select 2-bedroom units.</p>
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