import React, { useState } from "react";
import { motion } from "framer-motion";
import { Lock, ShieldCheck, Zap, Landmark } from "lucide-react";

// ==========================================
// 1. DATA & CONFIG (Added PayPal)
// ==========================================
const paymentMethods = [
    { 
        id: "mpesa", 
        name: "M-Pesa", 
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/M-PESA_LOGO-01.svg/512px-M-PESA_LOGO-01.svg.png",
    },
    { 
        id: "paypal", 
        name: "PayPal", 
        // High quality SVG URL
        image: "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg",
    },
    { 
        id: "visa", 
        name: "Visa", 
        image: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg",
    },
    { 
        id: "mastercard", 
        name: "Mastercard", 
        image: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg",
    },
    { 
        id: "bank", 
        name: "Bank Transfer", 
        isIcon: true, 
    },
];

// ==========================================
// 2. ANIMATION VARIANTS
// ==========================================
// Controls the staggered loading of the container
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

// Controls how each individual item pops in
const itemVariants = {
    hidden: { opacity: 0, y: 25, scale: 0.8 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { type: "spring", stiffness: 300, damping: 18 },
    },
};


// ==========================================
// 3. COMPONENT
// ==========================================
export default function PaymentSectionAnimated() {
    const [selected, setSelected] = useState("mpesa");

    return (
        <div className="w-full bg-white py-16 flex flex-col items-center justify-center overflow-hidden">
            
            {/* Header */}
            <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex flex-col items-center mb-10"
            >
                <div className="flex items-center gap-2 text-gray-800 font-bold text-lg">
                    <Lock className="w-5 h-5 text-gray-400" />
                    Secure Payment
                </div>
                <p className="text-sm text-gray-400 font-medium mt-1">Select your preferred method</p>
            </motion.div>

            {/* THE ANIMATED SELECTOR CONTAINER */}
            <motion.div 
                className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 px-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                
                {paymentMethods.map((method) => {
                    const isSelected = selected === method.id;

                    return (
                        <motion.div 
                            key={method.id}
                            variants={itemVariants}
                            onClick={() => setSelected(method.id)}
                            // Interaction Animations (Hover & Click)
                            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                            whileTap={{ scale: 0.95 }}
                            className="relative cursor-pointer w-24 h-20 sm:w-28 sm:h-24 rounded-2xl flex items-center justify-center z-10"
                            style={{ WebkitTapHighlightColor: "transparent" }}
                        >
                            {/* THE SLIDING BACKGROUND (Magic Motion) */}
                            {isSelected && (
                                <motion.div 
                                    layoutId="active-pill"
                                    className="absolute inset-0 bg-blue-50 border-2 border-blue-200/60 rounded-2xl -z-10 shadow-sm"
                                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                                />
                            )}

                            {/* THE ICON / LOGO CONTAINER */}
                            {/* We add a gentle floating animation if it is selected */}
                            <motion.div 
                                className="relative z-20 p-1"
                                animate={isSelected ? { y: [0, -3, 0] } : { y: 0 }}
                                transition={isSelected ? { repeat: Infinity, duration: 2, ease: "easeInOut" } : {}}
                            >
                                {method.isIcon ? (
                                    <Landmark 
                                        size={36} 
                                        strokeWidth={1.5}
                                        className={`drop-shadow-sm transition-colors duration-300 ${isSelected ? 'text-blue-800' : 'text-slate-600'}`}
                                    />
                                ) : (
                                    // Logos are fully saturated and vivid
                                    <img 
                                        src={method.image} 
                                        alt={method.name} 
                                        // Using tailwind filters to ensure they pop
                                        className="h-8 sm:h-10 w-auto object-contain drop-shadow-md filter contrast-110 saturate-110" 
                                    />
                                )}
                            </motion.div>
                        </motion.div>
                    );
                })}

            </motion.div>

            {/* Footer: Trust Indicators */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="mt-12 flex items-center gap-6 opacity-70"
            >
                 <div className="flex items-center gap-1.5 px-3 py-1 bg-gray-50 border border-gray-100 rounded-full">
                    <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-600">Verified</span>
                 </div>
                 <div className="flex items-center gap-1.5 px-3 py-1 bg-gray-50 border border-gray-100 rounded-full">
                    <Zap className="w-3.5 h-3.5 text-amber-500" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-600">Instant</span>
                 </div>
            </motion.div>

        </div>
    );
}