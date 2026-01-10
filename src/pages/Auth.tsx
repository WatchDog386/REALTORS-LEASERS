// © 2025 Jeff. All rights reserved.
// Unauthorized copying, distribution, or modification of this file is strictly prohibited.

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Battery, 
  Wifi, 
  Signal, 
  Fingerprint, 
  Lock, 
  ChevronRight,
  Eye,
  EyeOff,
  Mail,
  Key,
  LogIn,
  UserPlus,
  AlertCircle,
  Home,
  Smartphone,
  CheckCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const AuthPage = () => {
  const navigate = useNavigate();
  const { signIn, signInWithGoogle, signUp, resendVerificationEmail } = useAuth();
  
  const [powerState, setPowerState] = useState("off"); // 'off' | 'booting' | 'on' | 'signup'
  const [authMode, setAuthMode] = useState("signin"); // 'signin' | 'signup' | 'forgot'
  const [loading, setLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [time, setTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: ""
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showResendButton, setShowResendButton] = useState(false);

  // Check for existing session on mount
  useEffect(() => {
    checkUser();
    
    // Update time every minute
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  // Check if user is already logged in
  const checkUser = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        redirectBasedOnRole(session.user);
      }
    } catch (error) {
      console.error("Session check error:", error);
    }
  };

  // Redirect based on user role
  const redirectBasedOnRole = async (user: any) => {
    try {
      // Get user role from profiles table
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('is_admin, role')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error("Role check error:", error);
        navigate("/dashboard");
        return;
      }

      // Redirect based on role
      const isAdmin = profile?.is_admin || profile?.role === 'admin';
      if (isAdmin) {
        navigate("/admin-dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Role check error:", error);
      navigate("/dashboard");
    }
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(""); // Clear error when user types
    setSuccess(""); // Clear success message
  };

  const handleUnlock = () => {
    if (powerState === "off") {
      setPowerState("booting");
      setTimeout(() => setPowerState("on"), 2200);
    }
  };

  const switchAuthMode = (mode: string) => {
    setAuthMode(mode);
    setError("");
    setSuccess("");
    setShowResendButton(false);
    // Reset form but keep email for convenience
    setFormData(prev => ({
      ...prev,
      password: "",
      confirmPassword: "",
      name: ""
    }));
  };

  // Handle email/password login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setError("");
    setSuccess("");

    try {
      const { error } = await signIn(formData.email, formData.password);
      
      if (error) {
        throw error;
      }

      // Success - AuthContext will handle redirect
      setSuccess("Login successful! Redirecting...");
      
    } catch (error: any) {
      console.error("Login error:", error);
      setError(error.message || "Invalid login credentials");
    } finally {
      setAuthLoading(false);
    }
  };

  // Handle sign up
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setError("");
    setSuccess("");
    setShowResendButton(false);

    // Validation
    if (!formData.name || !formData.email || !formData.password) {
      setError("All fields are required");
      setAuthLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setAuthLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      setAuthLoading(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      setAuthLoading(false);
      return;
    }

    try {
      // Use the auth context's signUp function
      const { error } = await signUp(formData.email, formData.password, formData.name);
      
      if (error) {
        throw error;
      }

      setSuccess(`
        Account created successfully! 
        Please check your email (including spam folder) for the verification link.
        You must verify your email before signing in.
      `);
      setShowResendButton(true);
      
      // Clear form
      setFormData({
        email: "",
        password: "",
        confirmPassword: "",
        name: ""
      });
      
    } catch (error: any) {
      console.error("Sign up error:", error);
      
      // Handle specific error messages
      if (error.message?.includes('already registered') || error.message?.includes('already exists')) {
        setError("This email is already registered. Please sign in instead or use a different email.");
      } else if (error.message?.includes('invalid email')) {
        setError("Please enter a valid email address.");
      } else if (error.message?.includes('rate limit')) {
        setError("Too many attempts. Please try again in a few minutes.");
      } else {
        setError(error.message || "Failed to create account. Please try again.");
      }
    } finally {
      setAuthLoading(false);
    }
  };

  // Handle resend verification email
  const handleResendVerification = async () => {
    if (!formData.email) {
      setError("Please enter your email address first");
      return;
    }

    setAuthLoading(true);
    setError("");
    setSuccess("");

    try {
      const { error } = await resendVerificationEmail(formData.email);
      
      if (error) {
        throw error;
      }

      setSuccess("Verification email sent! Please check your inbox.");
      setShowResendButton(false);
      
    } catch (error: any) {
      console.error("Resend verification error:", error);
      setError(error.message || "Failed to resend verification email");
    } finally {
      setAuthLoading(false);
    }
  };

  // Handle forgot password
  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setError("");
    setSuccess("");

    if (!formData.email) {
      setError("Please enter your email address");
      setAuthLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(formData.email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        throw error;
      }

      setSuccess("Password reset email sent! Check your inbox (and spam folder) for instructions.");
      setFormData(prev => ({ ...prev, email: "" }));
      
    } catch (error: any) {
      console.error("Forgot password error:", error);
      setError(error.message || "Failed to send reset email");
    } finally {
      setAuthLoading(false);
    }
  };

  // Handle Google OAuth login
  const handleGoogleLogin = async () => {
    try {
      const { error } = await signInWithGoogle();
      if (error) {
        setError(error.message || "Google login failed");
      }
    } catch (error: any) {
      console.error("Google login error:", error);
      setError(error.message || "Google login failed");
    }
  };

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
      
      /* Custom scrollbar */
      ::-webkit-scrollbar {
        width: 6px;
      }
      ::-webkit-scrollbar-track {
        background: transparent;
      }
      ::-webkit-scrollbar-thumb {
        background: rgba(0, 0, 0, 0.2);
        border-radius: 3px;
      }
    `;
    document.head.appendChild(style);

    return () => {
        document.head.removeChild(link);
        document.head.removeChild(style);
    };
  }, []);

  // Render the appropriate form based on auth mode
  const renderAuthForm = () => {
    switch (authMode) {
      case "signup":
        return (
          <form onSubmit={handleSignUp} className="space-y-6 relative z-0">
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg"
              >
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600" />
                  <p className="text-red-600 text-xs">{error}</p>
                </div>
              </motion.div>
            )}
            
            {success && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg"
              >
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <p className="text-green-600 text-xs whitespace-pre-line">{success}</p>
                </div>
                
                {showResendButton && (
                  <div className="mt-3 pt-3 border-t border-green-200">
                    <button
                      type="button"
                      onClick={handleResendVerification}
                      disabled={authLoading}
                      className="text-xs text-green-700 hover:text-green-900 hover:underline transition-colors"
                    >
                      Didn't receive the email? Click here to resend
                    </button>
                  </div>
                )}
              </motion.div>
            )}

            {/* NAME FIELD */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
              <div className="relative group">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400">
                  <Home size={18} />
                </div>
                <Input 
                  type="text" 
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="
                    h-12 w-full
                    bg-transparent 
                    border-0 border-b-[1px] border-gray-200 
                    rounded-none 
                    pl-8 pr-0 py-2
                    text-base text-gray-800 font-light
                    placeholder:text-gray-300 placeholder:font-extralight
                    focus:border-black focus:border-b-[1.5px]
                    transition-all duration-500 ease-in-out
                    shadow-none ring-0 focus-visible:ring-0 focus-visible:ring-offset-0
                  "
                />
              </div>
            </motion.div>
            
            {/* EMAIL FIELD */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
              <div className="relative group">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400">
                  <Mail size={18} />
                </div>
                <Input 
                  type="email" 
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="
                    h-12 w-full
                    bg-transparent 
                    border-0 border-b-[1px] border-gray-200 
                    rounded-none 
                    pl-8 pr-0 py-2
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
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
              <div className="relative group">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400">
                  <Key size={18} />
                </div>
                <Input 
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password (min. 6 characters)"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  minLength={6}
                  className="
                    h-12 w-full
                    bg-transparent 
                    border-0 border-b-[1px] border-gray-200 
                    rounded-none 
                    pl-8 pr-10 py-2
                    text-base text-gray-800 font-light
                    placeholder:text-gray-300 placeholder:font-extralight
                    focus:border-black focus:border-b-[1.5px]
                    transition-all duration-500 ease-in-out
                    shadow-none ring-0 focus-visible:ring-0 focus-visible:ring-offset-0
                  "
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </motion.div>

            {/* CONFIRM PASSWORD FIELD */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
              <div className="relative group">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400">
                  <Key size={18} />
                </div>
                <Input 
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  minLength={6}
                  className="
                    h-12 w-full
                    bg-transparent 
                    border-0 border-b-[1px] border-gray-200 
                    rounded-none 
                    pl-8 pr-10 py-2
                    text-base text-gray-800 font-light
                    placeholder:text-gray-300 placeholder:font-extralight
                    focus:border-black focus:border-b-[1.5px]
                    transition-all duration-500 ease-in-out
                    shadow-none ring-0 focus-visible:ring-0 focus-visible:ring-offset-0
                  "
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </motion.div>

            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.8 }} className="space-y-4 pt-2">
              <Button 
                type="submit"
                disabled={authLoading}
                className="w-full h-12 bg-[#0056A6] hover:bg-[#004080] text-white font-medium text-xs tracking-[0.15em] uppercase rounded-full flex items-center justify-between px-6 transition-all duration-300 shadow-lg shadow-blue-500/10 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>{authLoading ? "Creating Account..." : "Create Account"}</span>
                {!authLoading && <UserPlus size={16} />}
              </Button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => switchAuthMode("signin")}
                  className="text-xs text-gray-500 hover:text-[#0056A6] transition-colors"
                >
                  Already have an account? Sign in instead
                </button>
              </div>
            </motion.div>
          </form>
        );

      case "forgot":
        return (
          <form onSubmit={handleForgotPassword} className="space-y-6 relative z-0">
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg"
              >
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600" />
                  <p className="text-red-600 text-xs">{error}</p>
                </div>
              </motion.div>
            )}
            
            {success && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg"
              >
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <p className="text-green-600 text-xs">{success}</p>
                </div>
              </motion.div>
            )}

            <div className="text-center mb-6">
              <div className="w-12 h-12 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                <Key className="w-6 h-6 text-[#0056A6]" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Reset Password</h3>
              <p className="text-sm text-gray-500">Enter your email and we'll send you reset instructions</p>
            </div>

            {/* EMAIL FIELD */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
              <div className="relative group">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400">
                  <Mail size={18} />
                </div>
                <Input 
                  type="email" 
                  name="email"
                  placeholder="Your email address"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="
                    h-12 w-full
                    bg-transparent 
                    border-0 border-b-[1px] border-gray-200 
                    rounded-none 
                    pl-8 pr-0 py-2
                    text-base text-gray-800 font-light
                    placeholder:text-gray-300 placeholder:font-extralight
                    focus:border-black focus:border-b-[1.5px]
                    transition-all duration-500 ease-in-out
                    shadow-none ring-0 focus-visible:ring-0 focus-visible:ring-offset-0
                  "
                />
              </div>
            </motion.div>

            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.8 }} className="space-y-4 pt-2">
              <Button 
                type="submit"
                disabled={authLoading}
                className="w-full h-12 bg-[#0056A6] hover:bg-[#004080] text-white font-medium text-xs tracking-[0.15em] uppercase rounded-full flex items-center justify-between px-6 transition-all duration-300 shadow-lg shadow-blue-500/10"
              >
                <span>{authLoading ? "Sending..." : "Send Reset Instructions"}</span>
                {!authLoading && <Smartphone size={16} />}
              </Button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => switchAuthMode("signin")}
                  className="text-xs text-gray-500 hover:text-[#0056A6] transition-colors"
                >
                  Back to sign in
                </button>
              </div>
            </motion.div>
          </form>
        );

      default: // signin
        return (
          <form onSubmit={handleLogin} className="space-y-6 relative z-0">
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg"
              >
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600" />
                  <p className="text-red-600 text-xs">{error}</p>
                </div>
              </motion.div>
            )}
            
            {success && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg"
              >
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <p className="text-green-600 text-xs">{success}</p>
                </div>
              </motion.div>
            )}

            {/* EMAIL FIELD */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
              <div className="relative group">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400">
                  <Mail size={18} />
                </div>
                <Input 
                  type="email" 
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="
                    h-12 w-full
                    bg-transparent 
                    border-0 border-b-[1px] border-gray-200 
                    rounded-none 
                    pl-8 pr-0 py-2
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
                <div className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400">
                  <Key size={18} />
                </div>
                <Input 
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="
                    h-12 w-full
                    bg-transparent 
                    border-0 border-b-[1px] border-gray-200 
                    rounded-none 
                    pl-8 pr-10 py-2
                    text-base text-gray-800 font-light
                    placeholder:text-gray-300 placeholder:font-extralight
                    focus:border-black focus:border-b-[1.5px]
                    transition-all duration-500 ease-in-out
                    shadow-none ring-0 focus-visible:ring-0 focus-visible:ring-offset-0
                  "
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </motion.div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="rememberMe"
                  className="w-4 h-4 rounded border-gray-300 text-[#0056A6] focus:ring-[#0056A6]"
                />
                <label htmlFor="rememberMe" className="ml-2 text-xs text-gray-600">
                  Remember me
                </label>
              </div>
              <button
                type="button"
                onClick={() => switchAuthMode("forgot")}
                className="text-xs text-[#0056A6] hover:underline"
              >
                Forgot password?
              </button>
            </div>

            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6 }} className="space-y-4 pt-2">
              <Button 
                type="submit"
                disabled={authLoading}
                className="w-full h-12 bg-[#1a1a1a] hover:bg-black text-white font-medium text-xs tracking-[0.15em] uppercase rounded-full flex items-center justify-between px-6 transition-all duration-300 shadow-lg shadow-black/5"
              >
                <span>{authLoading ? "Signing In..." : "Sign In"}</span>
                {!authLoading && <LogIn size={16} />}
              </Button>

              {/* Google Button */}
              <Button 
                type="button"
                onClick={handleGoogleLogin}
                variant="outline"
                className="
                  w-full h-12 
                  bg-white hover:bg-gray-50
                  border border-gray-200 hover:border-gray-400
                  text-gray-700 font-normal text-xs tracking-wide 
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
                <span>Continue with Google</span>
              </Button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => switchAuthMode("signup")}
                  className="text-xs text-gray-500 hover:text-[#0056A6] transition-colors"
                >
                  Don't have an account? Sign up
                </button>
              </div>
            </motion.div>
          </form>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] w-full h-[100dvh] bg-[#F5F5F7] flex flex-col lg:flex-row items-center justify-center lg:gap-24 overflow-hidden font-ui">
      
      {/* ==============================================
          THE INTERACTIVE DEVICE
         ============================================== */}
      <motion.div 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative z-20 flex-shrink-0 flex items-center justify-center w-full lg:w-auto"
      >
        <div 
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
                    <p className="text-white text-4xl font-light font-classy tracking-wide">Realtors</p>
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
                      className="text-2xl font-classy text-[#1a1a1a]"
                    >
                      {authMode === "signin" ? "Welcome back." : 
                       authMode === "signup" ? "Create Account." : 
                       "Reset Password."}
                    </motion.h2>
                    <motion.p 
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="text-xs text-gray-400 mt-2 font-light"
                    >
                      {authMode === "signin" ? "Sign in to access your portal" : 
                       authMode === "signup" ? "Join our community today" : 
                       "We'll help you regain access"}
                    </motion.p>
                  </div>

                  {renderAuthForm()}

                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-auto mb-6 text-center"
                  >
                    <p className="text-[9px] text-gray-300 font-medium tracking-widest">REALTORS KENYA</p>
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
          <span className="text-xs font-bold tracking-[0.2em] text-[#0056A6] uppercase">Est. 2024</span>
        </div>

        <h1 className="text-6xl font-classy text-[#1a1a1a] leading-none mb-8 tracking-tight whitespace-nowrap">
          Realtors Kenya.
        </h1>

        <div className="space-y-6 mb-12 pl-2 border-l border-gray-200">
          <p className="text-3xl font-classy text-[#1a1a1a] italic">
            "Your gateway to premium properties."
          </p>
          <p className="text-sm font-ui text-gray-500 leading-7 font-light max-w-md">
            Discover, rent, and manage properties with ease. Experience seamless property management 
            powered by cutting-edge technology and exceptional service.
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