import React from "react";
import { 
  Phone, 
  Mail, 
  MapPin, 
  ArrowRight, 
  Linkedin, 
  Twitter, 
  Facebook,
  Smartphone,
  ShieldCheck, // Changed HardHat to ShieldCheck for Trust
} from "lucide-react";

// --- GLOBAL STYLES ---
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap');
    .font-roboto { font-family: 'Roboto', sans-serif; }
  `}</style>
);

const Footer = () => {
  const operations = [
    { label: "My Saved Homes", id: "#" },
    { label: "List a Property", id: "#" },
    { label: "Find an Agent", id: "#" },
    { label: "Mortgage Calculator", id: "#" },
  ];

  const legal = [
    { label: "Market Trends", id: "#" },
    { label: "Buying Guide", id: "#" },
    { label: "Commercial Leasing", id: "#" },
    { label: "Terms of Service", id: "#" },
  ];

  return (
    <>
      <GlobalStyles />
      <footer id="contact" className="font-roboto text-[#333] border-t border-gray-200">
        
        {/* MAIN CONTENT AREA */}
        <div className="bg-white pt-20 pb-12 px-6">
            <div className="max-w-[1320px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                
                {/* 1. BRAND & SOCIALS */}
                <div>
                    {/* UPDATED LOGO SECTION */}
                    <div className="flex items-center gap-3 mb-6 cursor-pointer select-none">
                        <img 
                            src="/realtor.jpg" 
                            alt="Kenya Realtors Logo" 
                            className="h-16 w-auto object-contain"
                        />
                        <div className="flex flex-col justify-center">
                            <span className="text-[#0056A6] font-black leading-none text-2xl font-sans tracking-tight">
                                KENYA<span className="text-[#222]">REALTORS</span>
                            </span>
                            <span className="text-gray-500 font-bold text-[10px] uppercase leading-tight tracking-widest mt-1">
                                The Property Hub
                            </span>
                        </div>
                    </div>

                    <p className="text-xs font-bold text-gray-500 uppercase tracking-tight leading-relaxed border-l-4 border-[#F96302] pl-4 mb-6">
                        Kenya's #1 Property Marketplace. <br/>
                        <span className="text-[#0056b3]">Buy, Rent, and Sell with Confidence.</span>
                    </p>
                    <div className="flex gap-2">
                        {[Facebook, Twitter, Linkedin].map((Icon, i) => (
                            <a key={i} href="#" className="w-9 h-9 bg-[#111] flex items-center justify-center text-white hover:bg-[#F96302] transition-colors rounded-sm">
                                <Icon className="w-4 h-4" />
                            </a>
                        ))}
                    </div>
                </div>

                {/* 2. DISCOVER */}
                <div>
                    <h3 className="text-sm font-black uppercase tracking-widest text-[#111] mb-6 border-b-2 border-[#0056b3] inline-block pb-1">
                        Discover
                    </h3>
                    <ul className="space-y-3">
                        {operations.map((link, i) => (
                            <li key={i}>
                                <a href={link.id} className="text-[11px] font-black text-gray-400 hover:text-[#0056b3] uppercase flex items-center gap-2 group transition-colors">
                                    <div className="w-1.5 h-1.5 bg-[#F96302] rounded-full"></div>
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* 3. RESOURCES */}
                <div>
                    <h3 className="text-sm font-black uppercase tracking-widest text-[#111] mb-6 border-b-2 border-[#0056b3] inline-block pb-1">
                        Resources
                    </h3>
                    <ul className="space-y-3">
                        {legal.map((link, i) => (
                            <li key={i}>
                                <a href={link.id} className="text-[11px] font-black text-gray-400 hover:text-[#0056b3] uppercase flex items-center gap-2 group transition-colors">
                                    <ArrowRight className="w-3 h-3 text-[#F96302]" />
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* 4. CONTACT BADGES */}
                <div className="flex flex-col gap-3">
                    <h3 className="text-sm font-black uppercase tracking-widest text-[#111] mb-3 border-b-2 border-[#0056b3] inline-block pb-1">
                        Contact Us
                    </h3>
                    <div className="p-3 bg-[#F4F4F4] border-l-4 border-[#0056b3] flex items-center gap-3">
                        <MapPin className="text-[#F96302] w-5 h-5" />
                        <span className="text-[10px] font-black uppercase leading-tight text-gray-700">Westlands, Nairobi<br/>Realtor Plaza, 4th Flr</span>
                    </div>
                    <a href="tel:+254706927062" className="p-3 bg-[#F4F4F4] border-l-4 border-[#F96302] flex items-center gap-3 group hover:bg-[#111] transition-all">
                        <Phone className="text-[#0056b3] group-hover:text-[#F96302] w-5 h-5" />
                        <span className="text-[10px] font-black uppercase text-gray-700 group-hover:text-white transition-colors">+254 706 927 062</span>
                    </a>
                    <a href="mailto:support@realtor.co.ke" className="p-3 bg-[#111] flex items-center gap-3 group">
                        <Mail className="text-[#F96302] w-5 h-5" />
                        <span className="text-[10px] font-black uppercase text-white group-hover:text-[#0056b3] transition-colors">support@realtor.co.ke</span>
                    </a>
                </div>
            </div>
        </div>

        {/* BOTTOM STRIP */}
        <div className="bg-[#111] py-6 px-6 border-t border-gray-800">
            <div className="max-w-[1320px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em]">
                    © 2026 KENYA REALTORS <span className="text-[#0056b3]">|</span> <span className="text-[#F96302]">ALL RIGHTS RESERVED</span>
                </p>

                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors cursor-help">
                        <Smartphone className="w-4 h-4 text-[#0056b3]" />
                        <span className="text-[9px] font-black uppercase tracking-widest">Mobile Friendly</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors cursor-help">
                        <ShieldCheck className="w-4 h-4 text-[#F96302]" />
                        <span className="text-[9px] font-black uppercase tracking-widest">Verified Listings</span>
                    </div>
                </div>

                <div className="flex gap-4">
                    {["Privacy Policy", "Cookie Policy"].map((item) => (
                        <a key={item} href="#" className="text-[10px] text-gray-500 hover:text-[#0056b3] font-black uppercase transition-colors">
                            {item}
                        </a>
                    ))}
                </div>
            </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;