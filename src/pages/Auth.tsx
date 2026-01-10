import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Battery, Wifi, Signal, Fingerprint, Lock, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const AuthPage = () => {
  const navigate = useNavigate();
  const [powerState, setPowerState] = useState("off"); // 'off' | 'booting' | 'on'
  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

  // --- INJECT FONTS ---
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    const style = document.createElement('style');
    style.textContent = `
      .font-classy { font-family: 'Playfair Display', serif; }
      .font-ui { font-family: 'Inter', sans-serif; }
      /* Hide scrollbar for immersive feel */
      body { overflow: hidden; }
      
      /* Remove default browser focus rings for pure sleekness */
      input:focus { outline: none !important; box-shadow: none !important; }
    `;
    document.head.appendChild(style);

    return () => {
        document.head.removeChild(link);
        document.head.removeChild(style);
    };
  }, []);

  const handleUnlock = () => {
    if (powerState === "off") {
      setPowerState("booting");
      setTimeout(() => setPowerState("on"), 2200);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/dashboard");
    }, 1500);
  };

  return (
    // MAIN CONTAINER
    // Mobile: h-[100dvh] centers it vertically between browser bars.
    // Desktop: lg:flex-row puts them side-by-side.
    <div className="fixed inset-0 z-[9999] w-full h-[100dvh] bg-[#F5F5F7] flex flex-col lg:flex-row items-center justify-center lg:gap-24 overflow-hidden font-ui">
      
      {/* ==============================================
          THE INTERACTIVE DEVICE
         ============================================== */}
      <motion.div 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        // FIXED HERE: w-full on mobile to center it, but lg:w-auto on desktop so it doesn't push text away
        className="relative z-20 flex-shrink-0 flex items-center justify-center w-full lg:w-auto"
      >
        <div 
            // DEVICE DIMENSIONS
            // Mobile: w-[90vw] and h-[85dvh] ensures it fits on small screens without scrolling.
            // Desktop: Restored to fixed lg:w-[400px] lg:h-[800px].
            className="pointer-events-auto relative bg-[#121212] shadow-2xl mx-auto
                       w-[90vw] h-[85dvh] max-w-[400px] max-h-[850px]
                       border-[10px] border-[#121212] rounded-[3rem] ring-1 ring-gray-300
                       lg:w-[400px] lg:h-[800px] lg:border-[12px] lg:rounded-[3.5rem]"
        >
            {/* Glossy Reflection */}
            <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-white/5 to-transparent rounded-r-[2.5rem] lg:rounded-r-[3rem] pointer-events-none z-20" />

            {/* Side Buttons */}
            <div className="absolute -left-[14px] top-32 w-[4px] h-10 bg-[#2a2a2a] rounded-l-md" />
            <div className="absolute -left-[14px] top-48 w-[4px] h-16 bg-[#2a2a2a] rounded-l-md" />
            <div className="absolute -right-[14px] top-40 w-[4px] h-24 bg-[#2a2a2a] rounded-r-md" />

            {/* SCREEN CONTAINER */}
            <div className="w-full h-full bg-white rounded-[2.3rem] lg:rounded-[2.8rem] overflow-hidden flex flex-col relative shadow-inner">
                
                {/* Status Bar */}
                <div className={`absolute top-0 w-full px-6 pt-5 flex justify-between items-center z-30 transition-colors duration-700 ${powerState === 'off' ? 'text-white/40' : 'text-slate-900'}`}>
                    <span className="text-xs font-semibold">{time}</span>
                    <div className="flex gap-1.5 opacity-90"><Signal size={13}/><Wifi size={13}/><Battery size={15}/></div>
                </div>

                {/* Dynamic Island Notch */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-8 bg-black rounded-full z-20 pointer-events-none" />

                <AnimatePresence mode="wait">
                    
                    {/* --- STATE 1: LOCKED (Ambient) --- */}
                    {powerState === "off" && (
                        <motion.div 
                            key="locked"
                            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                            transition={{ duration: 0.8 }}
                            className="absolute inset-0 bg-black flex flex-col items-center justify-between py-20 cursor-pointer group"
                            onClick={handleUnlock}
                        >
                            <div className="mt-10 text-center">
                                <Lock className="w-6 h-6 text-white/40 mx-auto mb-2" />
                                <span className="text-white/40 text-[10px] tracking-widest uppercase">Locked</span>
                            </div>

                            <div className="relative">
                                {/* BLINKING / PULSING ANIMATION */}
                                <motion.div 
                                    animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.4, 0.1] }}
                                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                                    className="absolute inset-0 bg-white rounded-full blur-md"
                                />
                                <div className="w-20 h-20 rounded-full border border-white/20 flex items-center justify-center bg-white/5 backdrop-blur-md relative z-10">
                                    <Fingerprint className="w-8 h-8 text-white/90" strokeWidth={1} />
                                </div>
                            </div>
                            
                            <motion.div 
                                className="text-center space-y-2"
                                animate={{ opacity: [0.4, 1, 0.4] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                            >
                                <p className="text-white text-4xl font-light font-classy tracking-wide">Ayden</p>
                                <p className="text-white text-[10px] uppercase tracking-[0.2em] font-bold">Touch to Unlock</p>
                            </motion.div>
                        </motion.div>
                    )}

                    {/* --- STATE 2: BOOTING --- */}
                    {powerState === "booting" && (
                        <motion.div 
                            key="booting"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="absolute inset-0 bg-white flex flex-col items-center justify-center"
                        >
                            <motion.img
                                src="/realtor.jpg"
                                alt="Realtor Logo"
                                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                className="w-56 h-auto object-contain mb-10 filter grayscale"
                            />
                            <div className="flex gap-1">
                                <motion.div animate={{ height: [10, 25, 10] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1 bg-black rounded-full" />
                                <motion.div animate={{ height: [10, 25, 10] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1 bg-black rounded-full" />
                                <motion.div animate={{ height: [10, 25, 10] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1 bg-black rounded-full" />
                            </div>
                        </motion.div>
                    )}

                    {/* --- STATE 3: LOGIN FORM --- */}
                    {powerState === "on" && (
                        <motion.div 
                            key="unlocked"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8 }}
                            className="flex-1 flex flex-col px-8 pt-32 bg-white h-full relative"
                        >
                            <div className="mb-6 relative z-0">
                                <motion.h2 
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="text-3xl font-classy text-[#1a1a1a]"
                                >
                                    Welcome home.
                                </motion.h2>
                                <motion.p 
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                    className="text-xs text-gray-400 mt-2 font-light"
                                >
                                    Login to access your resident portal.
                                </motion.p>
                            </div>

                            <form onSubmit={handleLogin} className="space-y-6 relative z-0">
                                
                                {/* EMAIL FIELD */}
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                                    <div className="relative group">
                                        <Input 
                                            type="text" 
                                            placeholder="Email Address"
                                            className="
                                                h-12 w-full
                                                bg-transparent 
                                                border-0 border-b-[1px] border-gray-200 
                                                rounded-none 
                                                px-0 py-2
                                                text-base text-gray-800 font-light
                                                placeholder:text-gray-300 placeholder:font-extralight
                                                focus:border-black focus:border-b-[1.5px]
                                                transition-all duration-500 ease-in-out
                                                shadow-none ring-0 focus-visible:ring-0 focus-visible:ring-offset-0
                                            "
                                        />
                                    </div>
                                </motion.div>
                                
                                {/* PASSWORD FIELD */}
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                                    <div className="relative group">
                                        <Input 
                                            type="password" 
                                            placeholder="Password"
                                            className="
                                                h-12 w-full
                                                bg-transparent 
                                                border-0 border-b-[1px] border-gray-200 
                                                rounded-none 
                                                px-0 py-2
                                                text-base text-gray-800 font-light
                                                placeholder:text-gray-300 placeholder:font-extralight
                                                focus:border-black focus:border-b-[1.5px]
                                                transition-all duration-500 ease-in-out
                                                shadow-none ring-0 focus-visible:ring-0 focus-visible:ring-offset-0
                                            "
                                        />
                                    </div>
                                </motion.div>

                                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6 }} className="space-y-4 pt-2">
                                    <Button 
                                        disabled={loading}
                                        className="w-full h-12 bg-[#1a1a1a] hover:bg-black text-white font-medium text-xs tracking-[0.15em] uppercase rounded-full flex items-center justify-between px-6 transition-all duration-300 shadow-lg shadow-black/5"
                                    >
                                        <span>{loading ? "Authenticating..." : "Sign In"}</span>
                                        {!loading && <ChevronRight size={16} />}
                                    </Button>

                                    {/* Google Button */}
                                    <Button 
                                        type="button"
                                        variant="outline"
                                        className="
                                            w-full h-12 
                                            bg-transparent hover:bg-gray-50
                                            border border-gray-200 hover:border-gray-400
                                            text-[#1a1a1a] font-normal text-xs tracking-wide 
                                            rounded-full 
                                            flex items-center justify-center gap-3 
                                            transition-all duration-300
                                        "
                                    >
                                        <svg className="w-4 h-4" viewBox="0 0 24 24">
                                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                        </svg>
                                        <span className="opacity-80">Continue with Google</span>
                                    </Button>
                                </motion.div>
                            </form>

                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.8 }}
                                className="mt-auto mb-6 text-center"
                            >
                                <p className="text-[9px] text-gray-300 font-medium tracking-widest">AYDEN HOME TOWERS</p>
                            </motion.div>
                            
                            {/* Home Bar */}
                            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-gray-100 rounded-full" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
      </motion.div>

      {/* ==============================================
          RIGHT: TEXT CONTENT (Desktop Only)
         ============================================== */}
      <motion.div 
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
        className="hidden lg:flex flex-col items-start max-w-xl"
      >
        <div className="flex items-center gap-3 mb-10">
            <div className="h-[1px] w-12 bg-[#0056A6]"></div>
            <span className="text-xs font-bold tracking-[0.2em] text-[#0056A6] uppercase">Est. 2026</span>
        </div>

        <h1 className="text-6xl font-classy text-[#1a1a1a] leading-none mb-8 tracking-tight whitespace-nowrap">
          Ayden Home Towers.
        </h1>

        <div className="space-y-6 mb-12 pl-2 border-l border-gray-200">
            <p className="text-3xl font-classy text-[#1a1a1a] italic">
                "Welcome home."
            </p>
            <p className="text-sm font-ui text-gray-500 leading-7 font-light max-w-md">
                A place to call home. Where modern luxury meets seamless living. 
                Experience the future of property management today.
            </p>
        </div>
        
        {powerState === "off" && (
             <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="flex items-center gap-4 group cursor-pointer"
                onClick={handleUnlock}
             >
                <div className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center group-hover:border-[#0056A6] group-hover:bg-[#0056A6] transition-all duration-300">
                    <Fingerprint size={20} className="text-gray-400 group-hover:text-white transition-colors"/>
                </div>
                <div className="flex flex-col">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#1a1a1a]">Touch Device</span>
                    <span className="text-[10px] text-gray-400">to begin session</span>
                </div>
             </motion.div>
        )}
      </motion.div>

    </div>
  );
};

export default AuthPage;