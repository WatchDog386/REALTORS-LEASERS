// © 2025 Jeff. All rights reserved.
// Unauthorized copying, distribution, or modification of this file is strictly prohibited.

import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";
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
import Applications from "@/pages/Applications";
import Properties from "@/pages/Properties";
import PostRental from "@/pages/PostRental";
import PayRent from "@/pages/PayRent";
import AuthCallback from "@/pages/AuthCallback";
import ResetPassword from "@/pages/ResetPassword";

/* ======================
   SYSTEM
====================== */

import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <TooltipProvider>
            {/* Global notifications */}
            <Toaster />
            <Sonner />

            <Routes>
              {/* ======================
                  PUBLIC ROUTES 
                  (Wrapped in PublicLayout which contains NavbarSection)
                  Note: Auth pages will hide navbar in PublicLayout
              ====================== */}
              <Route element={<PublicLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/features" element={<Features />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/how-it-works" element={<HowItWorks />} />
                <Route path="/testimonials" element={<Testimonials />} />
                <Route path="/payment-options" element={<PaymentOptions />} />
                <Route path="/faq" element={<Faq />} />
                {/* Auth routes - navbar hidden in PublicLayout for these */}
                <Route path="/auth" element={<Auth />} />
                <Route path="/auth/callback" element={<AuthCallback />} />
                <Route path="/reset-password" element={<ResetPassword />} />
              </Route>

              {/* ======================
                  PROTECTED USER DASHBOARD ROUTES
                  (Uses DashboardNavbar for regular users)
                  All routes under this require authentication
              ====================== */}
              <Route
                element={
                  <ProtectedRoute>
                    <DashboardNavbar />
                  </ProtectedRoute>
                }
              >
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/applications" element={<Applications />} />
                <Route path="/properties" element={<Properties />} />
                <Route path="/post-rental" element={<PostRental />} />
                <Route path="/pay-rent" element={<PayRent />} />
              </Route>

              {/* ======================
                  PROTECTED ADMIN DASHBOARD ROUTES
                  (Requires admin role, uses DashboardNavbar)
                  Only users with is_admin=true or role='admin' can access
              ====================== */}
              <Route
                element={
                  <ProtectedRoute role="admin">
                    <DashboardNavbar />
                  </ProtectedRoute>
                }
              >
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
              </Route>

              {/* ======================
                  CATCH-ALL ROUTE
                  Must be the last route
              ====================== */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;