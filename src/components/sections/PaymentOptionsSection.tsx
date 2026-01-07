import React from "react";
import { motion } from "framer-motion";
import { 
    CreditCard, 
    ShieldCheck, 
    Smartphone, 
    Building2, 
    CheckCircle2,
    Lock,
    Zap,
    ChevronRight
} from "lucide-react";

// ==========================================
// 1. DATA & BRAND ASSETS
// ==========================================
const paymentMethods = [
    { 
        id: "mpesa", 
        name: "M-Pesa", 
        sub: "Paybill / Till",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/M-PESA_LOGO-01.svg/512px-M-PESA_LOGO-01.svg.png",
        icon: <Smartphone className="w-3.5 h-3.5 text-[#42B822]" />, // M-Pesa Green
        status: "ACTIVE",
        accent: "#42B822"
    },
    { 
        id: "visa", 
        name: "Visa", 
        sub: "Credit / Debit",
        image: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg",
        icon: <CreditCard className="w-3.5 h-3.5 text-[#1A1F71]" />, // Visa Blue
        status: "ACTIVE",
        accent: "#1A1F71"
    },
    { 
        id: "mastercard", 
        name: "Mastercard", 
        sub: "Global Cards",
        image: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg",
        icon: <CreditCard className="w-3.5 h-3.5 text-[#EB001B]" />, // Mastercard Red
        status: "ACTIVE",
        accent: "#FF5F00"
    },
    { 
        id: "bank", 
        name: "Bank Transfer", 
        sub: "RTGS / EFT",
        isGeneric: true,
        icon: <Building2 className="w-3.5 h-3.5 text-gray-700" />,
        status: "DELAY (2D)",
        accent: "#333333"
    },
];

// ==========================================
// 2. COMPONENT: COMPACT INDUSTRIAL CARD
// ==========================================

const PaymentCard = ({ method, index }) => (
    <motion.div
        className="group relative bg-white border border-gray-300 hover:border-[#F96302] transition-all duration-150 flex flex-col h-48 shadow-sm overflow-hidden"
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.05 }}
    >
        {/* Top Status Bar (Compact) */}
        <div className="flex justify-between items-center px-3 py-1.5 bg-gray-50 border-b border-gray-200 group-hover:bg-gray-100">
            <div className="flex items-center gap-1.5">
                {method.icon}
                <span className="text-[9px] font-black uppercase tracking-tighter text-gray-600">
                    {method.name}
                </span>
            </div>
            <div className="flex items-center gap-1">
                <span className="text-[8px] font-bold text-gray-400">{method.status}</span>
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.6)]" />
            </div>
        </div>

        {/* Content Area (Realistic Colors) */}
        <div className="flex-grow flex items-center justify-center p-4 relative">
            {/* Subtle Grid Overlay */}
            <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '12px 12px' }}></div>
            
            {method.isGeneric ? (
                <div className="text-center">
                    <Building2 className="w-10 h-10 text-gray-800 mb-1" />
                    <span className="block text-xs font-black uppercase tracking-tighter italic">PesaLink</span>
                </div>
            ) : (
                <img
                    src={method.image}
                    alt={method.name}
                    className="h-7 md:h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-110"
                />
            )}
        </div>

        {/* Action/Detail Footer (Tightened) */}
        <div className="p-2.5 border-t border-gray-200 bg-white flex items-center justify-between">
            <div>
                <p className="text-[8px] uppercase font-bold text-gray-400 leading-none mb-0.5">Payment Route</p>
                <p className="text-[10px] font-black text-gray-800 leading-none">{method.sub}</p>
            </div>
            <button className="h-6 w-6 rounded bg-gray-100 flex items-center justify-center group-hover:bg-[#F96302] group-hover:text-white transition-colors">
                <ChevronRight className="w-3.5 h-3.5" />
            </button>
        </div>
        
        {/* Accent Color Edge */}
        <div className="absolute bottom-0 left-0 w-full h-[2px] opacity-20 group-hover:opacity-100" style={{ backgroundColor: method.accent }}></div>
    </motion.div>
);

// ==========================================
// 3. MAIN SECTION
// ==========================================

export default function PaymentOptionsSection() {
    return (
        <section className="py-12 px-4 bg-[#F8F8F8] font-sans antialiased">
            <div className="max-w-6xl mx-auto">
                
                {/* --- COMPACT PRO HEADER --- */}
                <div className="flex items-center gap-4 mb-8">
                    <div className="h-10 w-2 bg-[#F96302]"></div>
                    <div>
                        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-gray-900 leading-none">
                            Transaction <span className="text-gray-400">Hub</span>
                        </h2>
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">
                            Secure Gateway // Final Authorization Required
                        </p>
                    </div>
                </div>

                {/* --- THE GRID --- */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-12">
                    {paymentMethods.map((method, index) => (
                        <PaymentCard key={method.id} method={method} index={index} />
                    ))}
                </div>

                {/* --- SECURITY FOOTER: COMPACT DATA STRIP --- */}
                <div className="bg-[#111] rounded border-b-4 border-[#F96302] overflow-hidden shadow-xl">
                    <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
                        
                        {/* Security Item 1 */}
                        <div className="p-5 flex items-center gap-3">
                            <ShieldCheck className="w-5 h-5 text-[#42B822]" />
                            <div>
                                <h4 className="text-[10px] font-black text-white uppercase leading-none">SSL Encrypted</h4>
                                <p className="text-[9px] text-gray-500 font-bold mt-1 uppercase">256-Bit TLS 1.3 Active</p>
                            </div>
                        </div>

                        {/* Security Item 2 */}
                        <div className="p-5 flex items-center gap-3">
                            <Lock className="w-5 h-5 text-[#EB001B]" />
                            <div>
                                <h4 className="text-[10px] font-black text-white uppercase leading-none">Fraud Detection</h4>
                                <p className="text-[9px] text-gray-500 font-bold mt-1 uppercase">AI-Monitoring Enabled</p>
                            </div>
                        </div>

                        {/* Security Item 3 */}
                        <div className="p-5 flex items-center gap-3">
                            <Zap className="w-5 h-5 text-[#F96302]" />
                            <div>
                                <h4 className="text-[10px] font-black text-white uppercase leading-none">Instant Settling</h4>
                                <p className="text-[9px] text-gray-500 font-bold mt-1 uppercase">Real-time confirmation</p>
                            </div>
                        </div>

                    </div>
                    
                    {/* Bottom Ticker Style */}
                    <div className="bg-white/5 py-1.5 px-5 flex justify-between items-center">
                        <span className="text-[8px] font-bold text-gray-500 uppercase tracking-widest italic">
                            System Terminal ID: HD-PAY-004-KE
                        </span>
                        <div className="flex gap-2">
                            <div className="h-1 w-4 bg-[#F96302]"></div>
                            <div className="h-1 w-4 bg-gray-700"></div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}