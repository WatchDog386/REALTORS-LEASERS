// © 2025 Jeff. All rights reserved.
// Unauthorized copying, distribution, or modification of this file is strictly prohibited.

import React from "react";
import { Navigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent } from "@/components/ui/card";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();

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

  // Not authenticated → redirect to login
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // Authenticated → render protected content
  return <>{children}</>;
};

export default ProtectedRoute;
