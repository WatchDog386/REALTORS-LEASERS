// © 2025 Jeff. All rights reserved.
// Unauthorized copying, distribution, or modification of this file is strictly prohibited.

import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Loader2 } from "lucide-react";

import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent } from "@/components/ui/card";

interface ProtectedRouteProps {
  children: React.ReactNode;
  role?: 'admin' | 'user'; // Optional role restriction
  allowUnauthenticated?: boolean; // New prop to allow unauthenticated access
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  role, 
  allowUnauthenticated = false 
}) => {
  const { user, profile, loading } = useAuth();
  const location = useLocation();

  // While auth state is resolving
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="rounded-2xl border-0 shadow-2xl">
          <CardContent className="pt-6 text-center">
            <Loader2 className="w-7 h-7 animate-spin mx-auto mb-4" />
            <h2 className="text-lg sm:text-2xl font-bold mb-2">
              Loading...
            </h2>
            <p className="text-muted-foreground">
              Please wait while we authenticate you.
            </p>
            <p className="text-muted-foreground text-sm">
              If this takes too long, please refresh the page.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // If route allows unauthenticated access, just render children
  if (allowUnauthenticated) {
    return <>{children}</>;
  }

  // Not authenticated → redirect to login
  if (!user) {
    // Store the attempted URL to redirect back after login
    return <Navigate to={`/auth?redirect=${encodeURIComponent(location.pathname)}`} replace />;
  }

  // Check role if specified
  if (role) {
    const isAdmin = profile?.is_admin || profile?.role === 'admin';
    
    if (role === 'admin' && !isAdmin) {
      // If user is not admin but trying to access admin route, redirect to dashboard
      return <Navigate to="/dashboard" replace />;
    }
    
    if (role === 'user' && isAdmin) {
      // If admin trying to access user-only route (optional behavior)
      // You can decide whether to allow this or redirect to admin dashboard
      return <>{children}</>;
    }
  }

  // Authenticated → render protected content
  return <>{children}</>;
};

export default ProtectedRoute;