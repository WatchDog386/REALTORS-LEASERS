import { 
  Phone, 
  Mail, 
  MapPin, 
  ArrowRight, 
  Linkedin, 
  Twitter, 
  Facebook,
  LandPlot, // <--- NEW ICON: Looks like a technical survey map
  CreditCard,
  Smartphone,
  HardHat,
  BrickWall,
  Settings2
} from "lucide-react";

// --- GLOBAL STYLES ---
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap');
    .font-roboto { font-family: 'Roboto', sans-serif; }
  `}</style>
);

// --- LOGO COMPONENT: "THE SURVEYOR" ---
const RealtorProLogo = () => (
    <div className="flex items-center gap-4 mb-8 group cursor-pointer select-none">
        {/* Icon Box: Technical Survey Look */}
        <div className="relative bg-[#333] w-14 h-14 flex items-center justify-center border-2 border-[#333] group-hover:bg-[#F96302] group-hover:border-[#F96302] transition-all duration-300 shadow-[4px_4px_0px_rgba(0,0,0,0.2)]">
            <LandPlot className="w-8 h-8 text-white" strokeWidth={1.5} />
            
            {/* Corner Accents (Rivets) */}
            <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-gray-500 rounded-full"></div>
            <div className="absolute top-0.5 right-0.5 w-1 h-1 bg-gray-500 rounded-full"></div>
            <div className="absolute bottom-0.5 left-0.5 w-1 h-1 bg-gray-500 rounded-full"></div>
            <div className="absolute bottom-0.5 right-0.5 w-1 h-1 bg-gray-500 rounded-full"></div>
        </div>

        <div className="flex flex-col justify-center">
            <span className="text-4xl font-black uppercase tracking-tighter text-[#333] leading-[0.85]">
                Realtor
            </span>
            <div className="flex items-center gap-2 mt-1">
                <span className="bg-[#F96302] text-white text-[9px] font-black uppercase px-1.5 py-0.5 tracking-widest">
                    Pro
                </span>
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-500">
                    Infrastructure
                </span>
            </div>
        </div>
    </div>
);

const Footer = ({ scrollTo }: { scrollTo: (section: string) => void }) => {
  
  const customerSupport = [
    { label: "Track Maintenance", id: "#" },
    { label: "Pay Rent / Service Charge", id: "#" },
    { label: "Report a Dispute", id: "#" },
    { label: "M-Pesa Integration Help", id: "#" },
    { label: "Platform Status", id: "#" },
  ];

  const resources = [
    { label: "Landlord Legal Guide", id: "#" },
    { label: "Tenant Screening (CRB)", id: "#" },
    { label: "Contractor Directory", id: "#" },
    { label: "Property Valuation", id: "#" },
    { label: "Lease Templates", id: "#" },
  ];

  return (
    <>
      <GlobalStyles />
      <footer id="contact" className="font-roboto text-[#333] border-t border-gray-200">
        
        {/* 1. NEWSLETTER BAR (The "Special Buy" Section) */}
        <div className="bg-[#F4F4F4] border-b border-gray-200 py-12 px-6">
            <div className="max-w-[1320px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex items-center gap-6 w-full md:w-auto">
                    {/* Industrial Mail Icon */}
                    <div className="hidden md:flex bg-white w-16 h-16 items-center justify-center border-2 border-gray-300 shadow-[2px_2px_0px_#ccc]">
                        <Mail className="w-8 h-8 text-[#F96302]" strokeWidth={1.5} />
                    </div>
                    <div>
                        <h3 className="text-2xl font-black uppercase tracking-tighter text-[#333] leading-none mb-1">
                            Market Updates
                        </h3>
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                            Get Nairobi's Rental Yield Reports & Pro Tips
                        </p>
                    </div>
                </div>

                <div className="w-full md:w-auto flex-1 max-w-lg">
                    <div className="flex h-14 shadow-lg">
                        <input 
                            type="email" 
                            placeholder="ENTER EMAIL FOR UPDATES" 
                            className="w-full h-full px-6 border-2 border-r-0 border-gray-400 text-sm font-black placeholder-gray-400 text-[#333] focus:outline-none focus:border-[#F96302] focus:ring-0 uppercase tracking-wide bg-white rounded-none"
                        />
                        <button className="bg-[#F96302] text-white px-8 font-black uppercase tracking-widest hover:bg-[#333] transition-colors text-xs whitespace-nowrap rounded-none">
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>
        </div>

        {/* 2. MAIN LINKS GRID */}
        <div className="bg-white pt-20 pb-16 px-6">
            <div className="max-w-[1320px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
                
                {/* BRAND COLUMN */}
                <div className="flex flex-col items-start pr-6">
                    <RealtorProLogo />
                    <p className="text-xs font-bold text-gray-500 leading-relaxed mb-8 uppercase tracking-wide border-l-2 border-[#F96302] pl-4">
                        We digitize the Kenyan real estate ecosystem. 
                        Connect assets, tenants, and trades on one heavy-duty platform.
                    </p>
                    
                    <div className="flex gap-3">
                        {[Facebook, Twitter, Linkedin].map((Icon, i) => (
                            <a key={i} href="#" className="w-10 h-10 bg-[#333] flex items-center justify-center text-white hover:bg-[#F96302] transition-colors shadow-sm">
                                <Icon className="w-4 h-4" />
                            </a>
                        ))}
                    </div>
                </div>

                {/* CUSTOMER SUPPORT */}
                <div>
                    <h3 className="text-sm font-black uppercase tracking-widest text-[#333] mb-6 flex items-center gap-2">
                        <span className="w-2 h-2 bg-[#F96302]"></span> Support Desk
                    </h3>
                    <ul className="space-y-4">
                        {customerSupport.map((link, i) => (
                            <li key={i}>
                                <a href={link.id} className="text-xs font-bold text-gray-500 hover:text-[#F96302] hover:underline uppercase tracking-wide flex items-center gap-2 group transition-all">
                                    <ArrowRight className="w-3 h-3 text-gray-300 group-hover:text-[#F96302]" />
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* RESOURCES */}
                <div>
                    <h3 className="text-sm font-black uppercase tracking-widest text-[#333] mb-6 flex items-center gap-2">
                        <span className="w-2 h-2 bg-[#F96302]"></span> Pro Tools
                    </h3>
                    <ul className="space-y-4">
                        {resources.map((link, i) => (
                            <li key={i}>
                                <a href={link.id} className="text-xs font-bold text-gray-500 hover:text-[#F96302] hover:underline uppercase tracking-wide flex items-center gap-2 group transition-all">
                                    <ArrowRight className="w-3 h-3 text-gray-300 group-hover:text-[#F96302]" />
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* CONTACT INFO */}
                <div>
                    <h3 className="text-sm font-black uppercase tracking-widest text-[#333] mb-6 flex items-center gap-2">
                        <span className="w-2 h-2 bg-[#F96302]"></span> Contact
                    </h3>
                    <div className="space-y-4">
                        <div className="flex items-start gap-4 group cursor-pointer border border-transparent hover:border-gray-200 p-2 -ml-2 transition-all">
                            <div className="p-1.5 bg-[#F96302] text-white">
                                <MapPin className="w-4 h-4" />
                            </div>
                            <span className="text-xs font-bold text-gray-600 uppercase leading-relaxed group-hover:text-[#333]">
                                Realtor Plaza, 4th Flr<br/>
                                Westlands, Nairobi
                            </span>
                        </div>
                        
                        <a href="tel:+254700000000" className="flex items-center gap-4 group border border-transparent hover:border-gray-200 p-2 -ml-2 transition-all">
                            <div className="p-1.5 bg-[#333] text-white group-hover:bg-[#F96302] transition-colors">
                                <Phone className="w-4 h-4" />
                            </div>
                            <span className="text-xs font-black uppercase text-[#333] group-hover:text-[#F96302]">
                                +254 706 927 062
                            </span>
                        </a>

                        <a href="mailto:support@realtor.co.ke" className="flex items-center gap-4 group border border-transparent hover:border-gray-200 p-2 -ml-2 transition-all">
                            <div className="p-1.5 bg-[#333] text-white group-hover:bg-[#F96302] transition-colors">
                                <Mail className="w-4 h-4" />
                            </div>
                            <span className="text-xs font-black uppercase text-[#333] group-hover:text-[#F96302]">
                                support@realtor.co.ke
                            </span>
                        </a>
                    </div>
                </div>

            </div>
        </div>

        {/* 3. BOTTOM BAR */}
        <div className="bg-[#333] border-t-4 border-[#F96302] py-8 px-6">
            <div className="max-w-[1320px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                    © {new Date().getFullYear()} Realtor Pro Systems.
                </p>

                {/* Payment Icons (Opacity Effect) */}
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 text-white/50 hover:text-white transition-colors cursor-help">
                        <Smartphone className="w-4 h-4" />
                        <span className="text-[9px] font-black uppercase tracking-widest">M-Pesa</span>
                    </div>
                    <div className="h-4 w-px bg-gray-600"></div>
                    <div className="flex items-center gap-2 text-white/50 hover:text-white transition-colors cursor-help">
                        <CreditCard className="w-4 h-4" />
                        <span className="text-[9px] font-black uppercase tracking-widest">Cards</span>
                    </div>
                    <div className="h-4 w-px bg-gray-600"></div>
                    <div className="flex items-center gap-2 text-white/50 hover:text-white transition-colors cursor-help">
                        <HardHat className="w-4 h-4" />
                        <span className="text-[9px] font-black uppercase tracking-widest">Contractor Safe</span>
                    </div>
                </div>

                <div className="flex gap-6">
                    {["Privacy", "Terms", "Sitemap"].map((item) => (
                        <a key={item} href="#" className="text-[10px] text-gray-400 hover:text-[#F96302] font-bold uppercase tracking-widest">
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