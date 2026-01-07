import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
    Star, 
    CheckCircle2, 
    Truck, 
    Printer, 
    Share2, 
    Download, 
    Hammer, 
    ArrowRight,
    Info,
    ShieldCheck
} from "lucide-react";

// --- GLOBAL STYLES ---
const GlobalStyles = () => (
    <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@400;700&family=Roboto:wght@300;400;500;700;900&display=swap');
        
        body { background-color: #fff; color: #333; }
        .font-condensed { font-family: 'Roboto Condensed', sans-serif; }
        .font-roboto { font-family: 'Roboto', sans-serif; }
        
        /* HD Brand Colors */
        :root {
            --hd-orange: #F96302;
            --hd-dark: #333333;
            --hd-light-gray: #f5f5f5;
        }

        /* Print Optimization */
        @media print {
            .no-print { display: none !important; }
            button { display: none !important; }
            body { padding: 0; margin: 0; }
            .container { max-width: 100% !important; padding: 0 !important; }
        }
    `}</style>
);

export default function LeasingProjectGuide() {
    const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});

    const toggleCheck = (index: number) => {
        setCheckedItems(prev => ({ ...prev, [index]: !prev[index] }));
    };

    const handlePrint = () => window.print();

    const checklistData = [
        "Valid National ID / Passport",
        "KRA PIN Certificate",
        "Active M-Pesa or Bank Card",
        "Email Address (Lease Signing)",
        "Deposit Funds Ready"
    ];

    const steps = [
        {
            id: "1",
            title: "Unit Discovery & Search",
            sku: "SKU #1000-1",
            rating: 4.8,
            reviews: 1240,
            status: "In Stock",
            time: "1-2 Hours",
            desc: "Browse inventory by floor, orientation, and price. Save favorites to compare specs.",
            badge: "Best Seller",
            img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop"
        },
        {
            id: "2",
            title: "Verification & Viewing",
            sku: "SKU #1000-2",
            rating: 4.9,
            reviews: 856,
            status: "Available Today",
            time: "30 Mins",
            desc: "Book a physical tour or use the 3D 'Measure' tool. Identity verification required.",
            badge: "Free Visit",
            img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=600&auto=format&fit=crop"
        },
        {
            id: "3",
            title: "Lease & Payment",
            sku: "SKU #1000-3",
            rating: 5.0,
            reviews: 2100,
            status: "Instant Download",
            time: "5 Mins",
            desc: "Sign digital lease via OTP. Secure M-Pesa integration with zero transaction fees.",
            badge: "Secure",
            img: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=600&auto=format&fit=crop"
        },
        {
            id: "4",
            title: "Move-In Logistics",
            sku: "SKU #1000-4",
            rating: 4.7,
            reviews: 930,
            status: "Next Day Delivery",
            time: "24 Hours",
            desc: "Receive digital access codes, elevator passes, and WiFi credentials via app.",
            badge: "Fast Track",
            img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop"
        }
    ];

    return (
        <>
        <GlobalStyles />
        <div className="font-roboto min-h-screen container max-w-7xl mx-auto px-4 py-8">
            
            {/* --- HEADER: Simple Project Title (No Nav) --- */}
            <div className="border-b border-gray-300 pb-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 text-xs font-bold text-[#F96302] uppercase tracking-wider mb-1">
                        <Hammer size={14} /> Project Guide
                    </div>
                    <h1 className="text-3xl md:text-4xl font-condensed font-bold text-[#333] leading-none">
                        RENTING YOUR APARTMENT
                    </h1>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                        <span>Model #RENT-101</span>
                        <span className="border-l border-gray-300 pl-4">Difficulty: Beginner</span>
                        <span className="border-l border-gray-300 pl-4">Time: 24 Hours</span>
                    </div>
                </div>
                
                <div className="flex gap-3 no-print">
                    <button 
                        onClick={handlePrint}
                        className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-xs font-bold uppercase hover:border-[#333] transition-colors"
                    >
                        <Printer size={16} /> Print
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-xs font-bold uppercase hover:border-[#333] transition-colors">
                        <Share2 size={16} /> Share
                    </button>
                </div>
            </div>

            {/* --- MAIN GRID LAYOUT --- */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* --- LEFT SIDEBAR: Checklist & Summary --- */}
                <div className="lg:col-span-4 space-y-6">
                    
                    {/* Project Overview Card */}
                    <div className="bg-[#f9f9f9] border border-gray-200 p-6">
                        <div className="flex items-center gap-1 mb-3">
                             {[...Array(5)].map((_,i) => <Star key={i} size={16} fill="#F96302" stroke="none" />)}
                             <span className="text-xs text-blue-800 underline ml-2 font-bold cursor-pointer">(4.9) Read Reviews</span>
                        </div>
                        <p className="text-sm text-gray-700 leading-relaxed mb-4">
                            Complete these 4 steps to secure your unit. This DIY guide ensures you have all documents and funds ready for a seamless move-in.
                        </p>
                        <div className="flex items-center gap-2 text-xs font-bold text-green-700 bg-green-50 p-2 border border-green-200">
                            <ShieldCheck size={16} /> Verified Process
                        </div>
                    </div>

                    {/* Materials Checklist */}
                    <div className="border border-gray-300 p-5 bg-white shadow-sm">
                        <h3 className="font-condensed font-bold text-lg text-[#333] border-b border-gray-200 pb-3 mb-4">
                            Required Materials
                        </h3>
                        <ul className="space-y-3">
                            {checklistData.map((item, i) => (
                                <li 
                                    key={i} 
                                    onClick={() => toggleCheck(i)}
                                    className="flex items-start gap-3 text-sm cursor-pointer group select-none"
                                >
                                    <div className={`mt-0.5 min-w-[18px] h-[18px] border border-gray-400 flex items-center justify-center transition-colors ${checkedItems[i] ? 'bg-[#F96302] border-[#F96302]' : 'bg-white group-hover:border-[#F96302]'}`}>
                                        {checkedItems[i] && <CheckCircle2 size={14} className="text-white" />}
                                    </div>
                                    <span className={`transition-colors ${checkedItems[i] ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                                        {item}
                                    </span>
                                </li>
                            ))}
                        </ul>
                        <button className="w-full mt-6 flex items-center justify-center gap-2 border-2 border-[#333] py-3 text-xs font-bold uppercase hover:bg-[#333] hover:text-white transition-colors no-print">
                            <Download size={16} /> Download Checklist
                        </button>
                    </div>

                    {/* Ad Block */}
                    <div className="border border-[#154279] bg-[#E6F0FA] p-4 text-[#154279] no-print">
                        <div className="flex gap-3">
                            <Truck size={24} className="shrink-0" />
                            <div>
                                <h4 className="font-bold text-sm uppercase">Free Move-In Truck</h4>
                                <p className="text-xs mt-1">Rentals over 12 months qualify for a free 3-ton truck rental.</p>
                                <span className="text-xs font-bold underline cursor-pointer mt-2 block">See details</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- RIGHT CONTENT: Step Cards --- */}
                <div className="lg:col-span-8">
                    
                    {/* Sort/Filter Header */}
                    <div className="flex justify-between items-center border-b-2 border-gray-100 pb-3 mb-6">
                        <h2 className="font-condensed font-bold text-2xl text-[#333]">Project Steps (4)</h2>
                        <div className="hidden md:flex items-center gap-2 text-xs font-bold text-gray-500 uppercase">
                            <span>Sort By:</span>
                            <div className="flex items-center gap-1 cursor-pointer text-[#333]">
                                Recommended <ArrowRight size={12} className="rotate-90" />
                            </div>
                        </div>
                    </div>

                    {/* The Cards */}
                    <div className="space-y-4">
                        {steps.map((step) => (
                            <motion.div 
                                key={step.id}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="group flex flex-col sm:flex-row border border-gray-300 bg-white hover:shadow-lg transition-all duration-200"
                            >
                                {/* Image Section */}
                                <div className="sm:w-48 h-40 sm:h-auto relative bg-gray-100 shrink-0">
                                    <img 
                                        src={step.img} 
                                        alt={step.title}
                                        className="w-full h-full object-cover mix-blend-multiply" 
                                    />
                                    <div className="absolute top-2 left-2 bg-white/90 text-[10px] font-bold px-2 py-0.5 border border-gray-200">
                                        STEP {step.id}
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 bg-[#F96302] text-white text-[10px] font-bold text-center py-1 uppercase">
                                        {step.badge}
                                    </div>
                                </div>

                                {/* Content Section */}
                                <div className="p-4 flex flex-col flex-grow">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-bold text-[#154279] text-lg group-hover:underline cursor-pointer">
                                                {step.title}
                                            </h3>
                                            <p className="text-[11px] text-gray-500 font-mono mt-0.5 mb-2">{step.sku}</p>
                                        </div>
                                        <div className="text-right">
                                            <span className="block text-lg font-black text-[#333]">{step.time}</span>
                                            <span className="text-[10px] text-gray-400 uppercase">Est. Time</span>
                                        </div>
                                    </div>

                                    {/* Ratings */}
                                    <div className="flex items-center gap-1 mb-3">
                                        <div className="flex">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} size={12} fill={i < 4 ? "#F96302" : "#ddd"} stroke="none" />
                                            ))}
                                        </div>
                                        <span className="text-xs text-gray-400">({step.reviews})</span>
                                    </div>

                                    <p className="text-sm text-gray-700 leading-snug mb-4 max-w-lg">
                                        {step.desc}
                                    </p>

                                    {/* Action Row */}
                                    <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between gap-4 no-print">
                                        <div className="flex items-center gap-1 text-xs font-bold text-green-700 uppercase">
                                            <CheckCircle2 size={14} /> {step.status}
                                        </div>
                                        <button className="bg-[#F96302] text-white text-xs font-bold uppercase px-6 py-2.5 rounded-[2px] hover:bg-[#d55200] transition-colors flex items-center gap-2">
                                            Start Step <ArrowRight size={14} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Bottom Info */}
                    <div className="mt-8 p-4 bg-gray-50 border border-gray-200 flex items-start gap-3 rounded-sm">
                        <Info className="text-gray-400 shrink-0" size={20} />
                        <div className="text-xs text-gray-500">
                            <strong>Policy Note:</strong> Prices and availability are subject to change without notice. 
                            Completing Step 1 (Search) does not guarantee unit reservation until Step 3 (Payment) is processed. 
                            See store associate for details.
                        </div>
                    </div>

                </div>
            </div>
        </div>
        </>
    );
}