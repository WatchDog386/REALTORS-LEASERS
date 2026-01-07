import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { 
    Star, 
    CheckCircle2, 
    Printer, 
    Share2, 
    Hammer, 
    ArrowRight,
    Info,
    CheckSquare,
    Square,
    Truck,
    Search,
    ShoppingCart,
    MapPin,
    ChevronDown
} from "lucide-react";

// --- STYLES FOR HD AESTHETIC ---
const GlobalStyles = () => (
    <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@400;700&family=Roboto:wght@300;400;500;700;900&display=swap');
        
        :root {
            --hd-orange: #F96302;
            --hd-dark: #333333;
            --hd-light-gray: #f5f5f5;
        }

        body { 
            background-color: #fff; 
            color: #333; 
            font-family: 'Roboto', sans-serif;
        }
        
        .font-condensed { font-family: 'Roboto Condensed', sans-serif; }
        
        /* Custom Scrollbar */
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #f1f1f1; }
        ::-webkit-scrollbar-thumb { background: #ccc; }
        ::-webkit-scrollbar-thumb:hover { background: var(--hd-orange); }

        @media print {
            .no-print { display: none !important; }
            .card { break-inside: avoid; border: 1px solid #ccc; }
        }
    `}</style>
);

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // --- STATE ---
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({});
  const [progress, setProgress] = useState(0);
  
  // Keep existing data fetching in case you want to map DB data to cards later
  const [tiers, setTiers] = useState([]);
  const [tiersLoading, setTiersLoading] = useState(true);

  // --- AUTH REDIRECT ---
  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user, navigate]);

  // --- DATA FETCHING (Preserved) ---
  useEffect(() => {
    let cancelled = false;
    const fetchTiers = async () => {
      setTiersLoading(true);
      const { data, error } = await supabase
        .from("tiers")
        .select("*")
        .order("id", { ascending: true });

      if (!cancelled && !error) {
        setTiers(Array.isArray(data) ? data : []);
      }
      setTiersLoading(false);
    };

    fetchTiers();
    return () => { cancelled = true; };
  }, []);

  // --- LOGIC: CHECKLIST & PROGRESS ---
  const toggleTask = (taskId: string) => {
      setCompletedTasks(prev => ({ ...prev, [taskId]: !prev[taskId] }));
  };

  const steps = [
    {
        id: "1",
        title: "Search & Discovery",
        sku: "SKU #1000-1",
        time: "1-2 Hours",
        img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop",
        desc: "Locate your ideal unit specifications.",
        tasks: [
            { id: "t1-1", text: "Create Tenant Portal Account" },
            { id: "t1-2", text: "Filter by Price & Location" },
            { id: "t1-3", text: "Save 3 Favorite Units" }
        ]
    },
    {
        id: "2",
        title: "Verification & Viewing",
        sku: "SKU #1000-2",
        time: "30 Mins",
        img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=600&auto=format&fit=crop",
        desc: "Mandatory identity checks before touring.",
        tasks: [
            { id: "t2-1", text: "Upload National ID / Passport" },
            { id: "t2-2", text: "Schedule Physical or Virtual Tour" },
            { id: "t2-3", text: "Confirm 'Free Visit' Voucher" }
        ]
    },
    {
        id: "3",
        title: "Lease & Documentation",
        sku: "SKU #1000-3",
        time: "15 Mins",
        img: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=600&auto=format&fit=crop",
        desc: "Digital signing process. No paperwork needed.",
        tasks: [
            { id: "t3-1", text: "Submit KRA PIN Certificate" },
            { id: "t3-2", text: "Verify Email for DocuSign" },
            { id: "t3-3", text: "Sign Lease via OTP" }
        ]
    },
    {
        id: "4",
        title: "Payment & Move-In",
        sku: "SKU #1000-4",
        time: "24 Hours",
        img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop",
        desc: "Secure the unit and receive access keys.",
        tasks: [
            { id: "t4-1", text: "Link Active M-Pesa or Bank Card" },
            { id: "t4-2", text: "Pay 1 Month Deposit + Rent" },
            { id: "t4-3", text: "Download Access Code App" }
        ]
    }
  ];

  useEffect(() => {
    const totalTasks = steps.reduce((acc, step) => acc + step.tasks.length, 0);
    const completedCount = Object.values(completedTasks).filter(Boolean).length;
    setProgress(Math.round((completedCount / totalTasks) * 100));
  }, [completedTasks]);

  const handlePrint = () => window.print();

  return (
    <div className="min-h-screen bg-white text-[#333]">
      <GlobalStyles />
      
      {/* --- HEADER: HD STYLE MOCKUP --- */}
      <div className="border-b border-gray-200 no-print">
            {/* Top Strip */}
            <div className="bg-white px-4 py-1 text-[11px] font-bold text-[#333] border-b border-gray-200 flex justify-between container max-w-7xl mx-auto">
                <div className="flex gap-4">
                    <span className="hover:underline cursor-pointer">Store Finder</span>
                    <span className="hover:underline cursor-pointer">Truck & Tool Rental</span>
                    <span className="hover:underline cursor-pointer">For the Pro</span>
                </div>
                <div>
                    <span className="text-[#F96302] font-bold">Ayden Leasing: <span className="underline text-[#333]">Open 24/7 Online</span></span>
                </div>
            </div>

            {/* Main Nav Bar */}
            <div className="bg-white px-4 py-4 shadow-sm relative z-20 container max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row items-center gap-6">
                    {/* Logo Area */}
                    <div 
                        onClick={() => navigate('/')}
                        className="text-[#F96302] text-3xl font-condensed font-black tracking-tighter leading-none border-2 border-[#F96302] p-1 px-2 cursor-pointer select-none"
                    >
                        AYDEN<br/><span className="text-lg text-[#333]">DEPOT</span>
                    </div>
                    
                    {/* Search Bar */}
                    <div className="flex-grow flex items-center relative w-full">
                        <input 
                            type="text" 
                            placeholder="What can we help you rent today?" 
                            className="w-full border border-[#333] rounded-sm py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#F96302]"
                        />
                        <button className="bg-[#F96302] p-2 absolute right-0 top-0 bottom-0 hover:bg-[#d15200] transition-colors">
                            <Search className="text-white w-5 h-5" />
                        </button>
                    </div>

                    {/* Nav Links */}
                    <div className="flex items-center gap-6 text-sm font-bold text-[#333] whitespace-nowrap">
                        <div className="flex flex-col leading-tight cursor-pointer hover:text-[#F96302]">
                            <span className="text-[10px] font-normal text-gray-500">My Account</span>
                            <span onClick={() => navigate('/auth')}>Sign In / Register</span>
                        </div>
                        <div className="flex items-center gap-2 cursor-pointer hover:text-[#F96302]">
                            <ShoppingCart className="w-6 h-6 text-[#F96302]" />
                            <span className="hidden md:inline">Cart (0)</span>
                        </div>
                    </div>
                </div>
            </div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 py-6">
        
        {/* --- PROJECT STATUS BAR (Replaces Hero) --- */}
        <div className="bg-[#333] text-white p-4 mb-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
                <div className="bg-[#F96302] p-2">
                    <Hammer size={24} className="text-white" />
                </div>
                <div>
                    <h1 className="text-xl font-condensed font-bold leading-none uppercase tracking-wide">
                        Project: Renting Your Apartment
                    </h1>
                    <div className="text-xs text-gray-400 mt-1 flex gap-3 font-mono">
                        <span>Model #RENT-101</span>
                        <span>|</span>
                        <span>DIY Level: Beginner</span>
                    </div>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="flex-1 w-full md:max-w-md mx-4">
                <div className="flex justify-between text-xs font-bold uppercase mb-1">
                    <span>Project Status</span>
                    <span className="text-[#F96302]">{progress}% Complete</span>
                </div>
                <div className="w-full bg-gray-600 h-3 rounded-sm overflow-hidden">
                    <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        className="bg-[#F96302] h-full"
                    />
                </div>
            </div>

            <div className="flex gap-2 no-print">
                <button onClick={handlePrint} className="text-xs font-bold uppercase border border-white px-3 py-2 hover:bg-white hover:text-[#333] transition-colors flex gap-2">
                    <Printer size={14} /> Print
                </button>
                <button className="text-xs font-bold uppercase bg-[#F96302] border border-[#F96302] px-3 py-2 hover:bg-white hover:text-[#F96302] transition-colors flex gap-2">
                    <Share2 size={14} /> Share
                </button>
            </div>
        </div>

        {/* --- MAIN CONTENT: GRID CARDS --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
            {steps.map((step, index) => {
                const isStepComplete = step.tasks.every(t => completedTasks[t.id]);
                return (
                    <motion.div 
                        key={step.id}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className={`card group flex flex-col border bg-white transition-all duration-200 h-full ${isStepComplete ? 'border-green-600 ring-1 ring-green-600' : 'border-gray-300 hover:shadow-lg hover:border-[#F96302]'}`}
                    >
                        {/* Step Image & Header */}
                        <div className="relative h-40 bg-gray-100 shrink-0 border-b border-gray-200">
                            <img 
                                src={step.img} 
                                alt={step.title}
                                className={`w-full h-full object-cover mix-blend-multiply ${isStepComplete ? 'opacity-50 grayscale' : ''}`} 
                            />
                            <div className="absolute top-0 left-0 bg-[#333] text-white text-xs font-bold px-3 py-1 z-10">
                                STEP {step.id}
                            </div>
                            {isStepComplete && (
                                <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-[1px]">
                                    <div className="bg-green-600 text-white px-4 py-1 font-bold text-sm uppercase flex items-center gap-2 shadow-sm transform -rotate-12 border-2 border-white">
                                        <CheckCircle2 size={16} /> Complete
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Card Body */}
                        <div className="p-4 flex flex-col flex-grow">
                            <h3 className="font-bold text-[#154279] text-lg leading-tight mb-1 group-hover:underline cursor-pointer font-condensed">
                                {step.title}
                            </h3>
                            <p className="text-[10px] text-gray-500 font-mono mb-3">{step.sku}</p>

                            <div className="flex items-center gap-1 mb-4">
                                <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={12} fill="#F96302" stroke="none" />
                                    ))}
                                </div>
                                <span className="text-xs text-gray-400 font-semibold">(Verified)</span>
                            </div>

                            <p className="text-sm text-gray-700 leading-snug mb-4 min-h-[40px]">
                                {step.desc}
                            </p>

                            {/* Checklist Area */}
                            <div className="mt-auto bg-gray-50 border border-gray-200 p-3 mb-4">
                                <div className="text-[10px] font-bold text-gray-500 uppercase mb-2 tracking-wider flex items-center justify-between">
                                    Requirements ({step.tasks.filter(t => completedTasks[t.id]).length}/{step.tasks.length})
                                </div>
                                <div className="space-y-2">
                                    {step.tasks.map((task) => (
                                        <div 
                                            key={task.id}
                                            onClick={() => toggleTask(task.id)}
                                            className="flex items-start gap-2 cursor-pointer group/item select-none"
                                        >
                                            <div className={`mt-0.5 shrink-0 transition-colors ${completedTasks[task.id] ? 'text-[#F96302]' : 'text-gray-300 group-hover/item:text-gray-400'}`}>
                                                {completedTasks[task.id] ? <CheckSquare size={16} /> : <Square size={16} />}
                                            </div>
                                            <span className={`text-xs leading-tight transition-all ${completedTasks[task.id] ? 'text-gray-400 line-through' : 'text-gray-700 font-medium'}`}>
                                                {task.text}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Action Button */}
                            <button 
                                onClick={() => !isStepComplete && navigate('/auth')}
                                disabled={isStepComplete}
                                className={`w-full py-3 text-xs font-bold uppercase flex items-center justify-center gap-2 transition-colors ${
                                    isStepComplete 
                                    ? 'bg-green-600 text-white cursor-default'
                                    : 'bg-[#333] text-white hover:bg-[#F96302]'
                                }`}
                            >
                                {isStepComplete ? 'Step Done' : `Start Step ${step.id}`} 
                                {!isStepComplete && <ArrowRight size={14} />}
                            </button>
                        </div>
                    </motion.div>
                );
            })}
        </div>

        {/* --- BOTTOM PROMO --- */}
        <div className="mt-8 p-4 bg-[#E6F0FA] border border-[#154279] flex flex-col md:flex-row items-center justify-between gap-4 no-print">
            <div className="flex items-start gap-3">
                <Info className="text-[#154279] shrink-0" size={24} />
                <div className="text-xs text-[#154279]">
                    <strong>Pro Tip:</strong> Completing the verification step (Step 2) unlocks "Instant Key Access" for Step 4. 
                    Ensure your documents are clear and legible.
                </div>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#154279] uppercase">
                <Truck size={18} />
                <span>Need Moving Help? Get 10% Off Truck Rental</span>
            </div>
        </div>

        {/* --- INDUSTRIAL FOOTER --- */}
        <footer className="mt-12 border-t border-gray-200 pt-8 pb-12 text-center no-print">
            <div className="flex justify-center gap-6 mb-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                <span className="hover:text-[#F96302] cursor-pointer">About Us</span>
                <span className="hover:text-[#F96302] cursor-pointer">Careers</span>
                <span className="hover:text-[#F96302] cursor-pointer">Corporate Responsibility</span>
                <span className="hover:text-[#F96302] cursor-pointer">Digital Newsroom</span>
            </div>
            <p className="text-[10px] text-gray-400">
                © 2024 Ayden Depot. All Rights Reserved. Use of this site is subject to certain Terms Of Use.
            </p>
        </footer>

      </div>
    </div>
  );
};

export default Index;