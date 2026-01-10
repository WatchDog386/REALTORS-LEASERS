// © 2025 Jeff. All rights reserved.

import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ThemeProvider } from "@/contexts/ThemeContext";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

import ProtectedRoute from "@/components/ProtectedRoute";

/* ======================
   LAYOUTS
====================== */

// Public layout (This handles the Frontend NavbarSection + Leasing Modal)
import PublicLayout from "@/components/PublicLayout";

// Dashboard Navbar (This is the components/Navbar.tsx for the dashboard)
import DashboardNavbar from "@/components/Navbar"; 

/* ======================
   FRONTEND (PUBLIC PAGES - CONTENT ONLY)
====================== */

// Home page: renders Hero + Features
import HomePage from "@/pages/HomePage";

// Marketing pages (content-only components)
import Features from "@/pages/FeaturesSection";
import Pricing from "@/pages/PricingSection";
import HowItWorks from "@/pages/HowItWorks";
import Testimonials from "@/pages/TestimonialsSection";
import PaymentOptions from "@/pages/PaymentOptionsSection";
import Faq from "@/pages/FaqSection";
import Auth from "@/pages/Auth";

/* ======================
   BACKEND (PROTECTED)
====================== */

import Dashboard from "@/pages/Dashboard";
import Profile from "@/pages/Profile";
import AdminDashboard from "@/pages/AdminDashboard";

/* ======================
   SYSTEM
====================== */

import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          {/* Global notifications */}
          <Toaster />
          <Sonner />

          <Routes>
            {/* ======================
                PUBLIC ROUTES 
                (Wrapped in PublicLayout which contains NavbarSection)
            ====================== */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/features" element={<Features />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/testimonials" element={<Testimonials />} />
              <Route path="/payment-options" element={<PaymentOptions />} />
              <Route path="/faq" element={<Faq />} />
              <Route path="/auth" element={<Auth />} />
            </Route>

            {/* ======================
                PROTECTED DASHBOARD ROUTES
                (Uses DashboardNavbar)
            ====================== */}
            <Route
              element={
                <ProtectedRoute>
                  {/* The Dashboard specific Navbar */}
                  <DashboardNavbar />
                </ProtectedRoute>
              }
            >
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Route>

            {/* ======================
                404
            ====================== */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;