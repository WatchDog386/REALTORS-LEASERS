// © 2025 Jeff. All rights reserved.
// Unauthorized copying, distribution, or modification of this file is strictly prohibited.

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

const AuthCallback = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("Processing authentication...");

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Get the session from the URL hash
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error("Session error:", sessionError);
          setStatus("error");
          setMessage("Authentication failed. Please try again.");
          setTimeout(() => navigate("/auth"), 3000);
          return;
        }

        if (session) {
          // Get user profile to determine role
          const { data: profile, error: profileError } = await supabase
            .from("profiles")
            .select("is_admin, role")
            .eq("id", session.user.id)
            .single();

          if (profileError) {
            console.error("Profile error:", profileError);
            // Still redirect to dashboard even if profile fetch fails
            navigate("/dashboard");
            return;
          }

          setStatus("success");
          setMessage("Authentication successful! Redirecting...");

          // Redirect based on role
          setTimeout(() => {
            if (profile?.is_admin || profile?.role === 'admin') {
              navigate("/admin-dashboard");
            } else {
              navigate("/dashboard");
            }
          }, 1500);
        } else {
          setStatus("error");
          setMessage("No session found. Please try logging in again.");
          setTimeout(() => navigate("/auth"), 3000);
        }
      } catch (error) {
        console.error("Auth callback error:", error);
        setStatus("error");
        setMessage("An unexpected error occurred. Please try again.");
        setTimeout(() => navigate("/auth"), 3000);
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#000B29] via-[#003A75] to-[#0056A6] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 max-w-md w-full shadow-2xl"
      >
        <div className="text-center">
          <motion.div
            animate={{ rotate: status === "loading" ? 360 : 0 }}
            transition={{ 
              rotate: { 
                duration: 1, 
                repeat: status === "loading" ? Infinity : 0, 
                ease: "linear" 
              }
            }}
            className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center ${
              status === "loading" ? "bg-blue-500/20" : 
              status === "success" ? "bg-green-500/20" : 
              "bg-red-500/20"
            }`}
          >
            {status === "loading" ? (
              <Loader2 className="w-10 h-10 text-white animate-spin" />
            ) : status === "success" ? (
              <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </motion.div>

          <h2 className="text-2xl font-bold text-white mb-3">
            {status === "loading" ? "Authenticating..." : 
             status === "success" ? "Success!" : "Oops!"}
          </h2>
          
          <p className="text-white/80 mb-6">
            {message}
          </p>

          {status === "loading" && (
            <div className="w-full bg-white/20 h-1 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, repeat: Infinity }}
                className="h-full bg-white"
              />
            </div>
          )}

          {status === "error" && (
            <button
              onClick={() => navigate("/auth")}
              className="mt-4 px-6 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors font-medium"
            >
              Return to Login
            </button>
          )}
        </div>

        <div className="mt-8 pt-6 border-t border-white/10">
          <p className="text-white/60 text-sm text-center">
            Secured by Supabase Authentication
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthCallback;