import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  EyeOff,
  Eye,
  Key,
  Home,
  Building2,
  CreditCard,
  Wrench,
  Search,
  Phone
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { motion } from "framer-motion";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const [mode, setMode] = useState(searchParams.get("mode") || "signin");
  const [userType, setUserType] = useState("tenant");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleBypassLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (formData.email.toLowerCase().includes("admin")) {
        navigate("/admin-dashboard");
      } else {
        navigate("/dashboard");
      }
    }, 1000);
  };

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row w-full bg-white font-sans text-slate-800">
      
      <div className="hidden lg:flex w-[55%] relative flex-col justify-between overflow-hidden bg-[#111] text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=2080&auto=format&fit=crop')",
            opacity: 0.6
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-[#111]/40 to-transparent" />

        <div className="relative z-10 p-12 h-full flex flex-col justify-between">
           <div className="flex items-center gap-3">
             <div className="bg-white/10 backdrop-blur-md p-2 rounded-lg border border-white/20">
               <Home className="w-6 h-6 text-white" />
             </div>
             <span className="text-xl font-bold tracking-wide">REALTOR<span className="font-light opacity-80">RESIDENTIAL</span></span>
           </div>

           <div className="space-y-8 max-w-xl mb-12">
             <h1 className="text-5xl font-bold leading-tight">
               Love where <br/>
               <span className="text-[#F96302]">you live.</span>
             </h1>
             <p className="text-lg text-slate-200 font-light leading-relaxed">
               Welcome to your resident portal. Manage your lease, pay rent securely, request maintenance, and browse our newest luxury listings all in one place.
             </p>

             <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/20">
                <FeatureItem icon={CreditCard} title="Pay Rent Online" desc="Secure auto-pay options" />
                <FeatureItem icon={Wrench} title="Maintenance" desc="24/7 Request tracking" />
                <FeatureItem icon={Building2} title="Browse Listings" desc="View available units" />
                <FeatureItem icon={Key} title="Lease Management" desc="Digital signing & storage" />
             </div>
           </div>

           <div className="flex justify-between items-end text-xs opacity-60">
             <p>© 2026 Realtor Residential Group</p>
           </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col relative bg-white">
        <div className="flex justify-end p-6 gap-6 text-sm font-medium text-slate-500">
           <a href="#" className="flex items-center gap-2 hover:text-[#0056b3] transition-colors">
             <Search className="w-4 h-4" /> Find a Rental
           </a>
           <ThemeToggle />
        </div>

        <div className="flex-1 flex flex-col justify-center px-8 sm:px-16 lg:px-24 pb-12">
          <div className="w-full max-w-md mx-auto space-y-8">
            <div className="text-center">
              <div id="fallback-text-logo">
                <h2 className="text-3xl font-bold text-[#111] tracking-tight">REALTOR</h2>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mt-4">
                {mode === "signin" ? "Welcome Back" : "Create Account"}
              </h2>
            </div>

            <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-lg">
               <button 
                 onClick={() => setUserType("tenant")}
                 className={`py-2 text-sm font-semibold rounded-md transition-all ${userType === "tenant" ? "bg-white shadow-sm text-[#111]" : "text-slate-500"}`}
               >
                 Resident
               </button>
               <button 
                 onClick={() => setUserType("landlord")}
                 className={`py-2 text-sm font-semibold rounded-md transition-all ${userType === "landlord" ? "bg-white shadow-sm text-[#111]" : "text-slate-500"}`}
               >
                 Landlord
               </button>
            </div>

            <form onSubmit={handleBypassLogin} className="space-y-5">
              <div className="space-y-1.5">
                <Label className="text-slate-700">Email Address</Label>
                <Input
                  name="email"
                  type="email"
                  onChange={handleInputChange}
                  className="h-11 bg-slate-50 border-slate-200 focus:bg-white focus:border-[#0056b3] transition-all"
                  placeholder="name@example.com"
                />
              </div>

              <Button 
                type="submit" 
                disabled={loading}
                className="w-full h-12 bg-[#0056b3] hover:bg-[#004494] text-white font-semibold text-lg shadow-md transition-all"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (mode === "signin" ? "Sign In" : "Create Account")}
              </Button>
            </form>

            <div className="text-center pt-2">
              <p className="text-slate-600">
                {mode === "signin" ? "New to Realtor?" : "Already have an account?"}
                <button 
                  onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
                  className="ml-2 font-bold text-[#0056b3] hover:text-[#F96302] hover:underline"
                >
                  {mode === "signin" ? "Apply Now" : "Sign In"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureItem = ({ icon: Icon, title, desc }) => (
  <div className="flex items-start gap-3">
    <div className="p-2 bg-white/10 rounded-md shrink-0">
      <Icon className="w-5 h-5 text-[#F96302]" />
    </div>
    <div>
      <h3 className="text-sm font-bold text-white">{title}</h3>
      <p className="text-xs text-slate-300 mt-0.5">{desc}</p>
    </div>
  </div>
);

export default Auth;