import React from "react";
import { motion } from "framer-motion";
import { 
  Building2, 
  Key, 
  Wrench, 
  Sparkles, 
  Briefcase, 
  Calculator, 
  ShieldAlert, 
  ArrowRight,
  LineChart
} from "lucide-react";

// ==========================================
// 1. PORTAL CONFIGURATION
// ==========================================
const userPortals = [
    { 
        id: "manager", 
        role: "Property Manager", 
        desc: "Operations, Vacancies & Staff Control",
        icon: Briefcase,
        color: "text-indigo-600",
        bg: "bg-indigo-50",
        border: "group-hover:border-indigo-500"
    },
    { 
        id: "landlord", 
        role: "Landlord / Owner", 
        desc: "ROI Reports, Occupancy & Financials",
        icon: LineChart,
        color: "text-emerald-600",
        bg: "bg-emerald-50",
        border: "group-hover:border-emerald-500"
    },
    { 
        id: "accountant", 
        role: "Accounts & Finance", 
        desc: "Ledgers, Invoicing & Reconciliation",
        icon: Calculator,
        color: "text-amber-600",
        bg: "bg-amber-50",
        border: "group-hover:border-amber-500"
    },
    { 
        id: "tenant", 
        role: "Tenant Portal", 
        desc: "Pay Rent, Lease Info & Service Requests",
        icon: Key, // Iconic "Key" for tenants
        color: "text-blue-600",
        bg: "bg-blue-50",
        border: "group-hover:border-blue-500"
    },
    { 
        id: "caretaker", 
        role: "Facility Caretaker", 
        desc: "Unit Inspections & Maintenance Logs",
        icon: Building2,
        color: "text-orange-600",
        bg: "bg-orange-50",
        border: "group-hover:border-orange-500"
    },
    { 
        id: "maintenance", 
        role: "Maintenance Tech", 
        desc: "Work Orders, Repairs & Asset Mgmt",
        icon: Wrench,
        color: "text-slate-600",
        bg: "bg-slate-50",
        border: "group-hover:border-slate-500"
    },
    { 
        id: "cleaner", 
        role: "Housekeeping", 
        desc: "Turnover Schedules & Cleaning Status",
        icon: Sparkles,
        color: "text-cyan-600",
        bg: "bg-cyan-50",
        border: "group-hover:border-cyan-500"
    },
    { 
        id: "security", 
        role: "Security & Access", 
        desc: "Gate Passes, Visitor Logs & Safety",
        icon: ShieldAlert,
        color: "text-red-600",
        bg: "bg-red-50",
        border: "group-hover:border-red-500"
    },
];

// ==========================================
// 2. ANIMATIONS
// ==========================================
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.08 }
    }
};

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: { type: "spring", stiffness: 260, damping: 20 }
    }
};

// ==========================================
// 3. MAIN COMPONENT
// ==========================================
export default function EnterprisePortals() {
    
    // Function to handle redirection
    const handleNavigation = () => {
        // In a real app, use router.push('/login') or Link
        window.location.href = "/login";
    };

    return (
        <section className="min-h-screen w-full bg-slate-50 py-20 px-6 flex flex-col items-center">
            
            {/* --- Section Header --- */}
            <div className="max-w-3xl text-center mb-16">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="inline-block px-4 py-1.5 mb-4 rounded-full bg-white border border-slate-200 shadow-sm"
                >
                    <span className="text-xs font-bold tracking-widest text-slate-500 uppercase">
                        Secure Enterprise Access
                    </span>
                </motion.div>
                
                <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
                    Select Your Portal
                </h2>
                <p className="text-lg text-slate-500">
                    Dedicated workspaces for every stakeholder in the property ecosystem. 
                    Please identify your role to proceed to the secure login gateway.
                </p>
            </div>

            {/* --- Portals Grid --- */}
            <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full max-w-7xl"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {userPortals.map((portal) => {
                    const Icon = portal.icon;
                    
                    return (
                        <motion.div
                            key={portal.id}
                            variants={cardVariants}
                            whileHover={{ y: -6 }}
                            onClick={handleNavigation}
                            className={`
                                group relative bg-white rounded-2xl p-6 
                                border border-slate-200 shadow-sm cursor-pointer
                                hover:shadow-xl hover:shadow-slate-200/50 
                                transition-all duration-300 ease-out
                                ${portal.border} border-l-4 hover:border-l-[6px]
                            `}
                        >
                            {/* Header: Icon & Arrow */}
                            <div className="flex justify-between items-start mb-6">
                                <div className={`
                                    p-3 rounded-xl ${portal.bg} ${portal.color}
                                    ring-1 ring-inset ring-black/5
                                `}>
                                    <Icon size={28} strokeWidth={1.5} />
                                </div>

                                <div className="p-2 rounded-full bg-slate-50 text-slate-300 group-hover:bg-slate-900 group-hover:text-white transition-colors duration-300">
                                    <ArrowRight size={16} />
                                </div>
                            </div>

                            {/* Content */}
                            <div>
                                <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-slate-900">
                                    {portal.role}
                                </h3>
                                <p className="text-sm text-slate-500 font-medium leading-relaxed group-hover:text-slate-600">
                                    {portal.desc}
                                </p>
                            </div>

                            {/* Hover Overlay Hint */}
                            <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">Login</span>
                            </div>
                        </motion.div>
                    );
                })}
            </motion.div>

            {/* --- Footer Trust Badge --- */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-20 flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-opacity"
            >
                <div className="flex items-center gap-2 text-slate-400">
                    <ShieldAlert size={16} />
                    <span className="text-sm font-semibold">256-bit SSL Encrypted Connection</span>
                </div>
            </motion.div>

        </section>
    );
}