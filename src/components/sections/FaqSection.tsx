import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  ChevronRight, 
  ChevronDown, 
  Printer, 
  Share2, 
  MessageSquare,
  Phone,
  AlertCircle,
  CreditCard,
  Wrench,
  ShieldCheck,
  FileSignature,
  Users,
  Smartphone
} from "lucide-react";

// ==========================================
// 1. GLOBAL STYLES & FONTS
// ==========================================
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@400;700&family=Roboto:wght@300;400;500;700&display=swap');
    
    .font-condensed { font-family: 'Roboto Condensed', sans-serif; }
    .font-body { font-family: 'Roboto', sans-serif; }
    
    .hd-search-container {
        border: 1px solid #ccc;
        border-radius: 9999px; /* Modern rounded pill shape */
        overflow: hidden;
        box-shadow: 0 2px 5px rgba(0,0,0,0.05);
    }
    
    .bg-hd-orange { background-color: #F96302; }
    .text-hd-orange { color: #F96302; }
    .border-hd-orange { border-color: #F96302; }
    .hover-hd-orange:hover { color: #F96302; }
    
    /* Custom Scrollbar for modern feel */
    ::-webkit-scrollbar { width: 8px; }
    ::-webkit-scrollbar-track { background: #f1f1f1; }
    ::-webkit-scrollbar-thumb { background: #ccc; border-radius: 4px; }
    ::-webkit-scrollbar-thumb:hover { background: #999; }
  `}</style>
);

// ==========================================
// 2. ENHANCED MOCK DATA (SECTION 12345)
// ==========================================
const categories = [
    { name: "Payments & Billing", count: 24, id: "pay" },
    { name: "Account Management", count: 12, id: "acc" },
    { name: "Lease Agreements", count: 8, id: "lease" },
    { name: "Maintenance Requests", count: 15, id: "maint" },
    { name: "Legal & Compliance", count: 5, id: "legal" },
];

const faqs = [
    {
        id: "12345-01",
        model: "FIN-MPESA-24",
        type: "finance",
        question: "How do I automate monthly rent collection via M-Pesa?",
        shortDesc: "Setup guide for STK pushes, Paybill validation, and recurring billing cycles.",
        answer: "Navigate to the 'Finance' tab in your dashboard. Select 'Automation Settings'. Enter your Paybill number (Model #522522) and check 'Enable Monthly STK Push'. This ensures tenants receive a popup on their phone on the due date. The system automatically reconciles the payment within 30 seconds.",
        rating: 4.8,
        reviews: 450
    },
    {
        id: "12345-02",
        model: "LEG-DOC-23",
        type: "legal",
        question: "Is the digital lease legally binding in Kenya (Bill 2023)?",
        shortDesc: "Compliance details regarding the Landlord & Tenant Bill 2023 and e-signatures.",
        answer: "Yes. Our generated leases are compliant with Kenyan Law. They utilize digital signatures which are recognized under the Kenya Information and Communications Act. Ensure both parties upload ID copies for validation. The audit trail provided serves as evidence in rent tribunals.",
        rating: 4.9,
        reviews: 120
    },
    {
        id: "12345-03",
        model: "OPS-VAC-99",
        type: "tech",
        question: "How long does it take for a property listing to syndicate?",
        shortDesc: "Marketplace synchronization times for Jiji, Property24, and BuyRentKenya.",
        answer: "Once you click 'Publish' on a unit, it undergoes a brief automated review (approx 10 minutes). After approval, it instantly appears on the Realtor Marketplace. External syndication to partners like Jiji or Property24 takes between 1 to 4 hours depending on their API status.",
        rating: 4.5,
        reviews: 89
    },
    {
        id: "12345-04",
        model: "MNT-REQ-01",
        type: "maintenance",
        question: "Assigning contractors to tenant maintenance tickets",
        shortDesc: "Workflow for dispatching plumbers/electricians and tracking job completion.",
        answer: "When a tenant submits a request, go to 'Maintenance Console'. Click 'Assign Pro'. You can select from your private rolodex or our vetted network. The contractor receives an SMS link to accept the job, upload before/after photos, and submit an invoice directly to you.",
        rating: 4.7,
        reviews: 215
    },
    {
        id: "12345-05",
        model: "SEC-DEP-88",
        type: "finance",
        question: "Handling security deposit refunds and deductions",
        shortDesc: "Best practices for move-out inspections and returning funds.",
        answer: "Use the 'Move-Out Flow' wizard. Input repair costs based on the exit inspection. The system calculates the balance and generates a formatted PDF statement. You can then issue the refund via M-Pesa Bulk Payment or Bank Transfer directly from the platform.",
        rating: 4.6,
        reviews: 156
    }
];

// Helper to get colorful icons
const getCategoryIcon = (type) => {
    switch (type) {
        case 'finance':
            return <div className="bg-green-100 p-3 rounded-full"><CreditCard className="w-8 h-8 text-green-600" /></div>;
        case 'legal':
            return <div className="bg-blue-100 p-3 rounded-full"><FileSignature className="w-8 h-8 text-blue-600" /></div>;
        case 'maintenance':
            return <div className="bg-orange-100 p-3 rounded-full"><Wrench className="w-8 h-8 text-orange-600" /></div>;
        case 'tech':
            return <div className="bg-purple-100 p-3 rounded-full"><Smartphone className="w-8 h-8 text-purple-600" /></div>;
        default:
            return <div className="bg-gray-100 p-3 rounded-full"><ShieldCheck className="w-8 h-8 text-gray-600" /></div>;
    }
};

// ==========================================
// 3. COMPONENTS
// ==========================================

const Breadcrumbs = () => (
    <div className="flex items-center gap-1 text-[11px] text-[#333] mb-4 font-body">
        <a href="#" className="hover:underline text-blue-600">Home</a>
        <span className="text-gray-400">/</span>
        <a href="#" className="hover:underline text-blue-600">Help Center</a>
        <span className="text-gray-400">/</span>
        <span className="font-bold text-gray-700">Section 12345: General Operations</span>
    </div>
);

const Sidebar = () => (
    <div className="w-full md:w-[260px] flex-shrink-0 pr-0 md:pr-6 border-r-0 md:border-r border-gray-200 mb-8 md:mb-0">
        <h3 className="font-condensed font-bold text-xl mb-4 text-[#333]">Department</h3>
        <ul className="space-y-1 mb-8">
            {categories.map((cat, idx) => (
                <li key={idx} className="flex items-center justify-between group cursor-pointer hover:bg-gray-100 p-2 rounded transition-colors">
                    <span className="text-sm font-bold text-[#333] group-hover:text-hd-orange">{cat.name}</span>
                    <span className="text-xs text-gray-500 font-medium">({cat.count})</span>
                </li>
            ))}
        </ul>

        <div className="border-t border-gray-200 pt-6">
            <h3 className="font-condensed font-bold text-lg mb-4 text-[#333]">Filters</h3>
            
            <div className="mb-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">User Role</h4>
                <div className="space-y-2">
                    {["Landlord", "Property Manager", "Tenant", "Service Provider"].map((type) => (
                        <label key={type} className="flex items-center gap-3 cursor-pointer group">
                            <div className="relative flex items-center">
                                <input type="checkbox" className="peer h-4 w-4 cursor-pointer appearance-none rounded border border-gray-300 shadow-sm checked:bg-hd-orange checked:border-hd-orange" />
                                <svg className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 text-white opacity-0 peer-checked:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                            </div>
                            <span className="text-sm text-gray-700 group-hover:text-hd-orange transition-colors">{type}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">Topic Type</h4>
                <div className="flex flex-wrap gap-2">
                    {["Billing", "Legal", "App API", "Repairs"].map(tag => (
                        <span key={tag} className="text-xs border border-gray-300 px-2 py-1 rounded hover:border-hd-orange hover:text-hd-orange cursor-pointer transition-colors bg-white">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

const FaqProductCard = ({ item }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex flex-col border-b border-gray-200 py-8 font-body group hover:bg-gray-50/50 transition-colors -mx-4 px-4 md:mx-0 md:px-0">
            <div className="flex flex-col md:flex-row gap-6">
                
                {/* 1. Icon Area - Now with Colors */}
                <div className="w-full md:w-[140px] flex-shrink-0 flex flex-col items-center">
                    <div className="w-full h-[120px] border border-gray-200 rounded-lg flex items-center justify-center bg-white shadow-sm mb-2 group-hover:border-hd-orange transition-colors">
                        {getCategoryIcon(item.type)}
                    </div>
                    <div className="flex gap-1 text-[10px] text-gray-400 items-center">
                        <input type="checkbox" className="rounded-sm border-gray-300" />
                        <span>Compare</span>
                    </div>
                </div>

                {/* 2. Details Area */}
                <div className="flex-grow">
                    <div className="flex flex-col h-full">
                        <div className="flex justify-between items-start">
                            <a 
                                href="#" 
                                onClick={(e) => { e.preventDefault(); setIsOpen(!isOpen); }}
                                className="text-lg md:text-xl font-bold text-[#333] mb-2 hover:text-hd-orange transition-colors leading-tight"
                            >
                                {item.question}
                            </a>
                        </div>
                        
                        {/* SKU Lines */}
                        <div className="text-[11px] text-gray-500 mb-3 flex flex-wrap gap-x-4 gap-y-1">
                            <span>Model # <span className="font-bold text-[#333]">{item.model}</span></span>
                            <span>Ref ID # <span className="font-bold text-[#333]">{item.id}</span></span>
                            <span className="uppercase text-green-600 font-bold text-[10px] border border-green-200 px-1 bg-green-50 rounded">Verified Solution</span>
                        </div>

                        {/* Ratings */}
                        <div className="flex items-center gap-1 mb-3">
                            <div className="flex text-hd-orange text-sm">
                                ★★★★★
                            </div>
                            <span className="text-xs text-gray-500 hover:underline cursor-pointer border-l border-gray-300 pl-2 ml-1">
                                {item.reviews} Reviews
                            </span>
                        </div>

                        <p className="text-sm text-gray-600 leading-relaxed mb-4 max-w-2xl">
                            {item.shortDesc}
                        </p>

                        {/* Quick Actions */}
                        <div className="mt-auto flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                             <button className="flex items-center gap-1 text-xs text-[#666] hover:text-hd-orange hover:underline font-bold">
                                <Share2 className="w-3 h-3" /> Share
                            </button>
                            <button className="flex items-center gap-1 text-xs text-[#666] hover:text-hd-orange hover:underline font-bold">
                                <Printer className="w-3 h-3" /> Print Guide
                            </button>
                        </div>
                    </div>
                </div>

                {/* 3. CTA Area */}
                <div className="w-full md:w-[220px] flex-shrink-0 flex flex-col gap-3 pt-2">
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-500 font-bold uppercase">Access Level</span>
                        <div className="text-2xl font-bold text-[#333]">
                           Free
                        </div>
                      </div>
                      
                      <button 
                        onClick={() => setIsOpen(!isOpen)}
                        className={`
                            w-full py-3 px-4 rounded font-bold text-sm border shadow-sm transition-all relative overflow-hidden
                            ${isOpen 
                                ? 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50' 
                                : 'bg-hd-orange border-hd-orange text-white hover:bg-[#d85502] hover:shadow-md'
                            }
                        `}
                      >
                         <div className="flex items-center justify-center gap-2">
                             {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                             {isOpen ? "Close Solution" : "View Solution"}
                         </div>
                      </button>
                      
                      <div className="bg-green-50 border border-green-100 p-2 rounded text-center">
                          <p className="text-[10px] text-green-800 font-medium flex items-center justify-center gap-1">
                              <Users className="w-3 h-3" /> 12 people viewing this
                          </p>
                      </div>
                </div>
            </div>

            {/* Expanded Content - Drawer */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="mt-6 ml-0 md:ml-[164px] bg-white border border-gray-200 rounded-lg shadow-inner overflow-hidden relative">
                            <div className="absolute top-0 left-0 w-1 h-full bg-hd-orange"></div>
                            <div className="p-6 md:p-8">
                                <h4 className="font-condensed font-bold text-[#333] text-lg mb-4 flex items-center gap-2">
                                    <span className="w-6 h-6 rounded-full bg-[#333] text-white flex items-center justify-center text-xs">A</span>
                                    Official Answer
                                </h4>
                                <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed mb-6">
                                    {item.answer}
                                </div>
                                
                                <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between p-4 bg-gray-50 rounded border border-gray-200">
                                    <div className="flex items-center gap-3">
                                        <AlertCircle className="w-5 h-5 text-hd-orange" />
                                        <div className="text-xs text-gray-600">
                                            <span className="font-bold block text-gray-800">Was this helpful?</span>
                                            Help us improve Section 12345 documentation.
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="px-3 py-1 bg-white border border-gray-300 rounded text-xs font-bold hover:border-gray-800 transition-colors">Yes</button>
                                        <button className="px-3 py-1 bg-white border border-gray-300 rounded text-xs font-bold hover:border-gray-800 transition-colors">No</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// ==========================================
// 4. MAIN PAGE
// ==========================================
export default function HelpCenter() {
  return (
    <>
    <GlobalStyles />
    <div className="min-h-screen bg-white text-[#333] font-body pb-20">
        
        {/* --- HEADER --- */}
        <div className="bg-white border-b border-gray-200 py-4 md:py-6 sticky top-0 z-30 shadow-md">
            <div className="max-w-[1400px] mx-auto px-4 flex flex-col md:flex-row items-center gap-4">
                
                {/* Branding */}
                <div className="flex-shrink-0 flex items-center gap-2">
                    <div className="w-10 h-10 bg-hd-orange rounded flex items-center justify-center text-white font-bold text-2xl font-condensed">
                        H
                    </div>
                    <div className="leading-none">
                        <h1 className="font-condensed font-bold text-2xl text-[#333] uppercase tracking-tight">
                            Help Hub
                        </h1>
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Enterprise Edition</span>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="flex-grow w-full md:max-w-4xl mx-auto">
                    <div className="hd-search-container flex h-10 md:h-12 relative bg-white">
                        <input 
                            type="text" 
                            defaultValue="Section 12345"
                            className="flex-grow px-6 text-sm md:text-base outline-none text-[#333] placeholder-gray-400 font-medium"
                        />
                        <button className="w-12 md:w-14 bg-hd-orange flex items-center justify-center hover:bg-[#d85502] transition-colors rounded-r-full">
                            <Search className="text-white w-5 h-5 md:w-6 md:h-6" />
                        </button>
                    </div>
                </div>

                {/* Utility Links */}
                <div className="hidden md:flex items-center gap-6 text-xs font-bold text-[#333]">
                    <a href="#" className="hover:text-hd-orange flex flex-col items-center gap-1 group">
                        <MessageSquare className="w-5 h-5 text-gray-600 group-hover:text-hd-orange" />
                        <span>Live Chat</span>
                    </a>
                    <a href="#" className="hover:text-hd-orange flex flex-col items-center gap-1 group">
                        <Phone className="w-5 h-5 text-gray-600 group-hover:text-hd-orange" />
                        <span>Pro Support</span>
                    </a>
                </div>
            </div>
        </div>

        {/* --- MAIN CONTENT GRID --- */}
        <div className="max-w-[1400px] mx-auto px-4 py-8">
            <Breadcrumbs />

            <div className="flex flex-col md:flex-row items-start">
                
                {/* LEFT COLUMN: FILTERS */}
                <Sidebar />

                {/* RIGHT COLUMN: RESULTS */}
                <div className="flex-grow w-full pl-0 md:pl-8">
                    
                    {/* Results Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 pb-4 border-b border-gray-200">
                        <div>
                            <h2 className="font-condensed font-bold text-3xl text-[#333]">
                                Section 12345: Operations & Finance
                            </h2>
                            <p className="text-sm text-gray-500 mt-1">Showing 1-5 of 124 documented solutions</p>
                        </div>
                        
                        <div className="mt-4 md:mt-0 flex items-center gap-3">
                            <span className="text-sm font-bold text-gray-700">Sort:</span>
                            <div className="relative border border-gray-300 rounded px-4 py-2 bg-white cursor-pointer hover:border-gray-400 flex items-center gap-8 min-w-[180px] justify-between">
                                <span className="text-sm font-bold text-[#333]">Most Relevant</span>
                                <ChevronDown className="w-3 h-3 text-gray-500" />
                            </div>
                        </div>
                    </div>

                    {/* Sponsored / Featured Banner */}
                    <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-5 mb-8 rounded-lg shadow-lg flex flex-col md:flex-row items-center justify-between text-white relative overflow-hidden">
                        <div className="relative z-10">
                            <span className="text-[10px] font-bold text-hd-orange uppercase tracking-widest block mb-2">System Update</span>
                            <h3 className="font-bold text-xl mb-1">New Feature: Auto-Reconciliation</h3>
                            <p className="text-sm text-gray-300 max-w-lg">Section 12345 now supports direct bank feed integration. Learn how to connect your KCB or Equity account.</p>
                        </div>
                        <button className="mt-4 md:mt-0 text-xs font-bold uppercase bg-white text-black px-6 py-3 rounded hover:bg-gray-200 transition-colors z-10">
                            Read Documentation
                        </button>
                        {/* Decorative Circle */}
                        <div className="absolute -right-10 -bottom-20 w-64 h-64 bg-white opacity-5 rounded-full pointer-events-none"></div>
                    </div>

                    {/* The "Product" List */}
                    <div className="space-y-2">
                        {faqs.map((item) => (
                            <FaqProductCard key={item.id} item={item} />
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-center mt-12 gap-2">
                        {[1, 2, 3, 4, 5].map((num) => (
                            <button 
                                key={num}
                                className={`
                                    w-10 h-10 flex items-center justify-center rounded-full text-sm font-bold transition-all
                                    ${num === 1 
                                        ? 'border-2 border-hd-orange text-hd-orange bg-white shadow-sm' 
                                        : 'border border-transparent text-gray-600 hover:bg-gray-100'
                                    }
                                `}
                            >
                                {num}
                            </button>
                        ))}
                        <button className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 text-gray-600 hover:bg-gray-100 shadow-sm">
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>

                </div>
            </div>
        </div>
    </div>
    </>
  );
}