import React from "react";
import { motion } from "framer-motion";
import { 
    CreditCard, 
    ShieldCheck, 
    Lock, 
    Smartphone, 
    Building2, 
    CheckCircle2,
    Wifi,
    ArrowRight
} from "lucide-react";

// ==========================================
// 1. THEME & DATA
// ==========================================
const THEME = {
    ORANGE: "#F96302",
    CHARCOAL: "#333333",
    BLACK: "#111111",
    BG_LIGHT: "#F4F4F4",
    BORDER: "#E5E5E5"
};

const paymentMethods = [
    { 
        id: "mpesa", 
        name: "M-Pesa", 
        sub: "Paybill / Till",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/M-PESA_LOGO-01.svg/512px-M-PESA_LOGO-01.svg.png",
        icon: <Smartphone className="w-4 h-4" />,
        status: "Active"
    },
    { 
        id: "visa", 
        name: "Visa", 
        sub: "Credit / Debit",
        image: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg",
        icon: <CreditCard className="w-4 h-4" />,
        status: "Active"
    },
    { 
        id: "mastercard", 
        name: "Mastercard", 
        sub: "Global Cards",
        image: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg",
        icon: <CreditCard className="w-4 h-4" />,
        status: "Active"
    },
    { 
        id: "bank", 
        name: "Bank Transfer", 
        sub: "RTGS / EFT",
        isGeneric: true,
        icon: <Building2 className="w-4 h-4" />,
        status: "2-3 Days"
    },
];

// ==========================================
// 2. SUB-COMPONENTS
// ==========================================

const PaymentCard = ({ method, index }) => (
    <motion.div
        className="relative group bg-white border-2 border-transparent hover:border-[#F96302] transition-all duration-300 h-48 flex flex-col justify-between shadow-sm hover:shadow-xl cursor-pointer"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1, duration: 0.4 }}
    >
        {/* Status Light (Dashboard Vibe) */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5">
            <span className="text-[9px] font-bold uppercase text-gray-400 group-hover:text-[#F96302] transition-colors">{method.status}</span>
            <div className={`w-2 h-2 rounded-full ${method.id === 'bank' ? 'bg-yellow-500' : 'bg-green-500'} animate-pulse`} />
        </div>

        {/* Header Label */}
        <div className="p-4 bg-gray-50 border-b border-gray-100 group-hover:bg-[#F96302] group-hover:text-white transition-colors duration-300">
            <div className="flex items-center gap-2">
                {/* Icon changes color on hover */}
                <div className="text-gray-400 group-hover:text-white transition-colors">
                    {method.icon}
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 group-hover:text-white transition-colors">
                    {method.name}
                </span>
            </div>
        </div>

        {/* Main Content (Logo) */}
        <div className="flex-grow flex items-center justify-center p-4 bg-white relative overflow-hidden">
            {/* Subtle background grid pattern */}
            <div className="absolute inset-0 opacity-[0.03]" 
                 style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '8px 8px' }}>
            </div>

            {method.isGeneric ? (
                <div className="text-center z-10">
                    <Building2 className="w-10 h-10 mx-auto mb-2 text-[#333] group-hover:scale-110 transition-transform duration-300" />
                    <span className="block text-xl font-black text-[#333] uppercase tracking-tighter">PesaLink</span>
                </div>
            ) : (
                <img
                    src={method.image}
                    alt={method.name}
                    className="h-8 md:h-10 w-auto object-contain z-10 group-hover:scale-110 transition-transform duration-300 grayscale group-hover:grayscale-0 opacity-80 group-hover:opacity-100"
                    loading="lazy"
                />
            )}
        </div>

        {/* Footer / Specs */}
        <div className="p-3 border-t border-gray-100 bg-white flex justify-between items-center group-hover:border-orange-100">
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 group-hover:text-[#333]">
                Mode: {method.sub}
            </span>
            <ArrowRight className="w-3 h-3 text-gray-300 group-hover:text-[#F96302] -translate-x-2 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all duration-300" />
        </div>
    </motion.div>
);

// ==========================================
// 3. MAIN SECTION
// ==========================================

export default function PaymentOptionsSection() {
    return (
        <section 
            id="payment-options" 
            className="py-24 px-6 bg-[#F4F4F4] font-sans text-[#333]"
        >
            <div className="max-w-[1320px] mx-auto">
                
                {/* 1. INDUSTRIAL HEADER */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-l-[6px] border-[#F96302] pl-6 md:pl-10">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="bg-[#333] text-white px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest">
                                System Status: Online
                            </div>
                            <div className="flex items-center gap-1 text-[#F96302]">
                                <Wifi className="w-3 h-3" />
                                <span className="text-[9px] font-black uppercase tracking-widest">Secure Connection</span>
                            </div>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black text-[#111] uppercase tracking-tighter leading-[0.9]">
                            Transaction <br/>
                            <span className="text-[#F96302]">Gateway.</span>
                        </h2>
                    </div>
                    <div className="mt-8 md:mt-0 md:text-right">
                         <div className="text-xs font-black uppercase tracking-widest text-[#333] mb-1">Accepted Currencies</div>
                         <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">KES (Shilling) • USD (Dollar)</div>
                    </div>
                </div>

                {/* 2. THE GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
                    {paymentMethods.map((method, index) => (
                        <PaymentCard key={method.id} method={method} index={index} />
                    ))}
                </div>

                {/* 3. SAFETY BAR (Machine Label Style) */}
                <motion.div 
                    className="bg-[#111] text-white relative overflow-hidden group"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    {/* Decorative diagonal stripes */}
                    <div className="absolute top-0 right-0 w-24 h-full bg-[#F96302] transform skew-x-[-20deg] translate-x-12 opacity-20 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <div className="p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
                        
                        {/* Item 1 */}
                        <div className="flex items-center gap-5 w-full md:w-auto">
                            <div className="w-12 h-12 bg-[#F96302] flex items-center justify-center shrink-0">
                                <ShieldCheck className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h4 className="font-black uppercase tracking-widest text-sm mb-1">SSL Encrypted</h4>
                                <p className="text-[10px] text-gray-400 uppercase tracking-wider leading-tight">256-Bit Protection <br/>Standard</p>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="hidden md:block w-px h-12 bg-white/20"></div>

                        {/* Item 2 */}
                        <div className="flex items-center gap-5 w-full md:w-auto">
                            <div className="w-12 h-12 bg-[#333] border border-white/20 flex items-center justify-center shrink-0">
                                <CheckCircle2 className="w-6 h-6 text-[#F96302]" />
                            </div>
                            <div>
                                <h4 className="font-black uppercase tracking-widest text-sm mb-1">Verified Merchant</h4>
                                <p className="text-[10px] text-gray-400 uppercase tracking-wider leading-tight">Central Bank of Kenya <br/>Regulated</p>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="hidden md:block w-px h-12 bg-white/20"></div>

                        {/* Item 3 */}
                        <div className="flex items-center gap-5 w-full md:w-auto">
                            <div className="w-12 h-12 bg-[#333] border border-white/20 flex items-center justify-center shrink-0">
                                <Smartphone className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h4 className="font-black uppercase tracking-widest text-sm mb-1">Instant Receipts</h4>
                                <p className="text-[10px] text-gray-400 uppercase tracking-wider leading-tight">SMS Confirmation <br/>Sent Immediately</p>
                            </div>
                        </div>

                    </div>
                    
                    {/* Bottom Warning Stripe */}
                    <div className="bg-[#222] py-2 px-10 flex justify-center md:justify-end">
                         <p className="text-[9px] font-bold text-[#666] uppercase tracking-widest">
                            * M-Pesa Paybill charges apply as per Safaricom Tariffs
                        </p>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}