import React from "react";
import { 
  Phone, 
  Mail, 
  MapPin, 
  ArrowRight, 
  Linkedin, 
  Twitter, 
  Facebook,
  CreditCard,
  Smartphone,
  HardHat,
} from "lucide-react";

// --- GLOBAL STYLES ---
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap');
    .font-roboto { font-family: 'Roboto', sans-serif; }
  `}</style>
);

// --- LOGO COMPONENT (Updated to Orange Primary) ---
const RealtorProLogo = () => (
    <div className="flex items-center gap-4 mb-8 group cursor-pointer select-none">
        {/* Orange Box that turns Blue on Hover */}
        <div className="relative bg-[#F96302] w-14 h-14 flex flex-col items-center justify-center border-2 border-[#F96302] group-hover:bg-[#0056b3] group-hover:border-[#0056b3] transition-all duration-300 shadow-[4px_4px_0px_rgba(0,0,0,0.2)]">
            <span className="text-white font-black leading-none text-2xl font-sans tracking-tighter">R</span>
            <div className="absolute top-1 right-1 w-2 h-2 bg-white/40 group-hover:bg-white transition-colors"></div>
        </div>

        <div className="flex flex-col justify-center">
            <span className="text-3xl font-black uppercase tracking-tighter text-[#111] leading-[0.85]">
                Realtor<span className="text-[#F96302] group-hover:text-[#0056b3] transition-colors">.</span>Depot
            </span>
            <div className="flex items-center gap-2 mt-1">
                {/* Badge flips to Blue on hover */}
                <span className="bg-[#F96302] group-hover:bg-[#0056b3] text-white text-[9px] font-black uppercase px-1.5 py-0.5 tracking-widest transition-colors">
                    Pro
                </span>
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-500">
                    Infrastructure
                </span>
            </div>
        </div>
    </div>
);

const Footer = () => {
  const operations = [
    { label: "Track Maintenance", id: "#" },
    { label: "Pay Rent / Service Charge", id: "#" },
    { label: "Report a Dispute", id: "#" },
    { label: "Platform Status", id: "#" },
  ];

  const legal = [
    { label: "Landlord Legal Guide", id: "#" },
    { label: "Tenant Screening (CRB)", id: "#" },
    { label: "Contractor Directory", id: "#" },
    { label: "Terms of Service", id: "#" },
  ];

  return (
    <>
      <GlobalStyles />
      {/* Removed the border-t-8 blue line as requested */}
      <footer id="contact" className="font-roboto text-[#333] border-t border-gray-200">
        
        {/* MAIN CONTENT AREA */}
        <div className="bg-white pt-20 pb-12 px-6">
            <div className="max-w-[1320px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                
                {/* 1. BRAND & SOCIALS */}
                <div>
                    <RealtorProLogo />
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-tight leading-relaxed border-l-4 border-[#F96302] pl-4 mb-6">
                        Digitizing the Kenyan ecosystem. <br/>
                        <span className="text-[#0056b3]">Heavy-duty property management.</span>
                    </p>
                    <div className="flex gap-2">
                        {[Facebook, Twitter, Linkedin].map((Icon, i) => (
                            <a key={i} href="#" className="w-9 h-9 bg-[#111] flex items-center justify-center text-white hover:bg-[#F96302] transition-colors">
                                <Icon className="w-4 h-4" />
                            </a>
                        ))}
                    </div>
                </div>

                {/* 2. OPERATIONS */}
                <div>
                    <h3 className="text-sm font-black uppercase tracking-widest text-[#111] mb-6 border-b-2 border-[#0056b3] inline-block pb-1">
                        Operations
                    </h3>
                    <ul className="space-y-3">
                        {operations.map((link, i) => (
                            <li key={i}>
                                <a href={link.id} className="text-[11px] font-black text-gray-400 hover:text-[#0056b3] uppercase flex items-center gap-2 group transition-colors">
                                    <div className="w-1.5 h-1.5 bg-[#F96302]"></div>
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
                        Contact
                    </h3>
                    <div className="p-3 bg-[#F4F4F4] border-l-4 border-[#0056b3] flex items-center gap-3">
                        <MapPin className="text-[#F96302] w-5 h-5" />
                        <span className="text-[10px] font-black uppercase leading-tight">Westlands, Nairobi<br/>Realtor Plaza</span>
                    </div>
                    <a href="tel:+254706927062" className="p-3 bg-[#F4F4F4] border-l-4 border-[#F96302] flex items-center gap-3 group hover:bg-[#111] transition-all">
                        <Phone className="text-[#0056b3] group-hover:text-[#F96302] w-5 h-5" />
                        <span className="text-[10px] font-black uppercase group-hover:text-white transition-colors">+254 706 927 062</span>
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
                    © 2026 REALTOR DEPOT <span className="text-[#0056b3]">|</span> <span className="text-[#F96302]">LOGISTICS DIVISION</span>
                </p>

                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors cursor-help">
                        <Smartphone className="w-4 h-4 text-[#0056b3]" />
                        <span className="text-[9px] font-black uppercase tracking-widest">M-Pesa Verified</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors cursor-help">
                        <HardHat className="w-4 h-4 text-[#F96302]" />
                        <span className="text-[9px] font-black uppercase tracking-widest">Safety First</span>
                    </div>
                </div>

                <div className="flex gap-4">
                    {["Privacy", "Terms"].map((item) => (
                        <a key={item} href="#" className="text-[10px] text-gray-500 hover:text-[#0056b3] font-black uppercase">
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