// © 2025 Jeff. All rights reserved.
// Unauthorized copying, distribution, or modification of this file is strictly prohibited.

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { Preferences } from "@capacitor/preferences";
import { useNavigate } from "react-router-dom";

interface Profile {
  id: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  location?: string;
  tier: string;
  quotes_used: number;
  total_projects: number;
  completed_projects: number;
  total_revenue: number;
  is_admin: boolean;
  role?: string;
  overall_profit_margin?: number;
  created_at: string;
  updated_at: string;
  avatar_url?: string;
  subscription_status?: string;
  email_verified?: boolean;
  last_login_at?: string;
}

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  authReady: boolean;
  refreshProfile: () => Promise<void>;
  signIn: (
    email: string,
    password: string,
    rememberMe?: boolean
  ) => Promise<{ error: any; data?: any }>;
  signUp: (
    email: string,
    password: string,
    name?: string,
    company?: string,
    phone?: string
  ) => Promise<{ error: any; data?: any }>;
  signInWithGoogle: () => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: any }>;
  updatePassword: (newPassword: string) => Promise<{ error: any }>;
  verifyEmail: () => Promise<{ error: any }>;
  resendVerificationEmail: (email: string) => Promise<{ error: any }>;
  deleteAccount: () => Promise<{ error: any }>;
  isEmailVerified: () => boolean;
  checkSession: () => Promise<Session | null>;
  redirectBasedOnRole: (user?: User) => Promise<void>;
  clearSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [authReady, setAuthReady] = useState(false);
  const prevUserId = useRef<string | null>(null);

  // Function to redirect user based on their role
  const redirectBasedOnRole = async (currentUser?: User) => {
    try {
      const userId = currentUser?.id || user?.id;
      if (!userId) {
        navigate("/");
        return;
      }

      const { data: userProfile, error } = await supabase
        .from("profiles")
        .select("is_admin, role")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("Role check error:", error);
        navigate("/dashboard"); // Default to normal dashboard
        return;
      }

      // Check both is_admin boolean and role string for flexibility
      const isAdmin = userProfile?.is_admin || userProfile?.role === 'admin';
      
      if (isAdmin) {
        navigate("/admin-dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Redirect error:", err);
      navigate("/dashboard"); // Default on error
    }
  };

  const fetchProfile = async (userId: string) => {
    if (!userId) {
      setProfile(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const timeoutPromise = new Promise<{
        error: Error;
      }>((_, reject) =>
        setTimeout(() => reject(new Error("Profile fetch timeout")), 8000)
      );

      const query = supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      const result = await Promise.race([
        query.then((res) => ({ type: "success", res } as const)),
        timeoutPromise
          .then(() => ({ type: "timeout" } as const))
          .catch((err) => ({ type: "error", err } as const)),
      ]);

      if (result.type === "timeout") {
        throw new Error("Profile fetch timed out");
      }

      if (result.type === "error") {
        throw result.err;
      }

      const { data, error } = result.res;

      if (error) {
        console.error("Profile fetch error:", error);
        setProfile(null);
      } else {
        setProfile(data);
      }
    } catch (err) {
      console.error("Profile fetch exception:", err);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  // Check and update email verification status
  const updateEmailVerificationStatus = async (userId: string) => {
    try {
      const { data: authUser } = await supabase.auth.admin.getUserById(userId);
      if (authUser?.user?.email_confirmed_at) {
        await supabase
          .from("profiles")
          .update({ email_verified: true })
          .eq("id", userId);
      }
    } catch (error) {
      console.error("Error updating email verification:", error);
    }
  };

  // Create or update profile on sign in/up
  const createOrUpdateProfile = async (user: User, additionalData?: Partial<Profile>) => {
    try {
      const { data: existingProfile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (existingProfile) {
        // Update existing profile with last login
        const updates = {
          last_login_at: new Date().toISOString(),
          ...additionalData
        };
        
        // Remove undefined values
        Object.keys(updates).forEach(key => 
          updates[key as keyof typeof updates] === undefined && delete updates[key as keyof typeof updates]
        );

        await supabase
          .from("profiles")
          .update(updates)
          .eq("id", user.id);
      } else {
        // Create new profile
        const profileData = {
          id: user.id,
          email: user.email,
          name: user.user_metadata?.name || user.email?.split("@")[0] || "User",
          tier: "free",
          quotes_used: 0,
          total_projects: 0,
          completed_projects: 0,
          total_revenue: 0,
          is_admin: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          last_login_at: new Date().toISOString(),
          ...additionalData
        };
        
        // Remove undefined values
        Object.keys(profileData).forEach(key => 
          profileData[key as keyof typeof profileData] === undefined && delete profileData[key as keyof typeof profileData]
        );

        await supabase.from("profiles").insert(profileData);
      }
    } catch (error) {
      console.error("Error creating/updating profile:", error);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const initAuth = async () => {
      try {
        // Try to get session from storage first
        const storedSession = await Preferences.get({ key: "supabase_session" });
        let session: Session | null = null;

        if (storedSession.value) {
          try {
            session = JSON.parse(storedSession.value);
          } catch (e) {
            console.error("Error parsing stored session:", e);
          }
        }

        // If no stored session, get from Supabase
        if (!session) {
          const { data: { session: supabaseSession }, error } = await supabase.auth.getSession();
          if (error) {
            console.error("Session restoration error:", error);
          }
          session = supabaseSession;
        }

        if (!isMounted) return;

        if (session?.user) {
          prevUserId.current = session.user.id;
          setUser(session.user);
          await fetchProfile(session.user.id);
          await updateEmailVerificationStatus(session.user.id);
          
          // Auto-redirect based on role when session is restored
          // But only if we're on the home page or auth page
          const currentPath = window.location.pathname;
          if (currentPath === "/" || currentPath === "/auth") {
            await redirectBasedOnRole(session.user);
          }
        }
      } catch (err) {
        console.error("Initial auth error:", err);
      } finally {
        if (isMounted) {
          setAuthReady(true);
          setLoading(false);
        }
      }

      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange(async (_event, session) => {
        if (!isMounted) return;

        if (session?.user) {
          // Store session in preferences
          if (session) {
            await Preferences.set({
              key: "supabase_session",
              value: JSON.stringify(session),
            });
          }

          if (session.user.id !== prevUserId.current) {
            prevUserId.current = session.user.id;
            setUser(session.user);
            await createOrUpdateProfile(session.user);
            await fetchProfile(session.user.id);
            await updateEmailVerificationStatus(session.user.id);
            
            // Auto-redirect on sign in (only from auth page)
            const currentPath = window.location.pathname;
            if (currentPath === "/auth" || currentPath === "/auth/callback") {
              await redirectBasedOnRole(session.user);
            }
          }
        } else {
          // Clear session from preferences
          await Preferences.remove({ key: "supabase_session" });
          prevUserId.current = null;
          setUser(null);
          setProfile(null);
        }
      });

      return () => {
        isMounted = false;
        subscription?.unsubscribe();
      };
    };

    initAuth();

    return () => {
      isMounted = false;
    };
  }, [navigate]);

  useEffect(() => {
    if (!user?.id) return;

    const channel = supabase
      .channel(`profiles-changes-${user.id}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "profiles",
          filter: `id=eq.${user.id}`,
        },
        (payload) => {
          console.log("Realtime profile update:", payload);
          fetchProfile(user.id);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user?.id]);

  const signIn = async (email: string, password: string, rememberMe: boolean = false) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      if (data.session) {
        if (rememberMe) {
          // Store session for longer persistence
          await Preferences.set({
            key: "supabase_session",
            value: JSON.stringify(data.session),
          });
        }

        // Update last login timestamp
        await createOrUpdateProfile(data.session.user, {
          last_login_at: new Date().toISOString()
        });

        // Only auto-redirect if we're on the auth page
        if (window.location.pathname === "/auth") {
          await redirectBasedOnRole(data.session.user);
        }
      }

      return { data, error };
    } catch (error: any) {
      console.error("Sign in error:", error);
      return { error };
    }
  };

  const refreshProfile = async () => {
    if (user?.id) {
      await fetchProfile(user.id);
    }
  };

  const signUp = async (
    email: string, 
    password: string, 
    name?: string,
    company?: string,
    phone?: string
  ) => {
    try {
      const redirectUrl = `${window.location.origin}/auth/callback`;
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: { 
            name: name || email.split("@")[0],
            company,
            phone
          },
        },
      });

      if (error) {
        throw error;
      }

      if (data.user) {
        // Create initial profile
        await createOrUpdateProfile(data.user, {
          name: name || email.split("@")[0],
          company,
          phone
        });
      }

      return { data, error };
    } catch (error: any) {
      console.error("Sign up error:", error);
      return { error };
    }
  };

  const signInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { 
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          }
        },
      });

      if (error) {
        throw error;
      }

      return { error };
    } catch (error: any) {
      console.error("Google sign in error:", error);
      return { error };
    }
  };

  const signOut = async () => {
    try {
      // Clear all auth data
      await Preferences.remove({ key: "supabase_session" });
      await Preferences.remove({ key: "rememberEmail" });
      
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      navigate("/");
    } catch (error) {
      console.error("Sign out error:", error);
      // Force redirect even if there's an error
      navigate("/");
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const redirectUrl = `${window.location.origin}/reset-password`;
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: redirectUrl,
      });

      if (error) {
        throw error;
      }

      return { error };
    } catch (error: any) {
      console.error("Reset password error:", error);
      return { error };
    }
  };

  const updatePassword = async (newPassword: string) => {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) {
        throw error;
      }

      return { error };
    } catch (error: any) {
      console.error("Update password error:", error);
      return { error };
    }
  };

  const verifyEmail = async () => {
    try {
      if (!user?.email) {
        throw new Error("No user email found");
      }

      const { error } = await supabase.auth.verifyOtp({
        email: user.email,
        token: '123456', // This should come from the verification email
        type: 'email'
      });

      if (error) {
        throw error;
      }

      return { error };
    } catch (error: any) {
      console.error("Verify email error:", error);
      return { error };
    }
  };

  const resendVerificationEmail = async (email: string) => {
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email,
      });

      if (error) {
        throw error;
      }

      return { error };
    } catch (error: any) {
      console.error("Resend verification error:", error);
      return { error };
    }
  };

  const deleteAccount = async () => {
    try {
      if (!user) throw new Error("No user logged in");

      // Delete profile first
      const { error: profileError } = await supabase
        .from("profiles")
        .delete()
        .eq("id", user.id);

      if (profileError) {
        console.error("Profile deletion error:", profileError);
      }

      // Delete user from auth
      const { error: authError } = await supabase.auth.admin.deleteUser(user.id);

      if (authError) {
        throw authError;
      }

      // Sign out after deletion
      await signOut();

      return { error: null };
    } catch (error: any) {
      console.error("Delete account error:", error);
      return { error };
    }
  };

  const isEmailVerified = () => {
    return user?.email_confirmed_at !== null && user?.email_confirmed_at !== undefined;
  };

  const checkSession = async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Session check error:", error);
        return null;
      }
      return session;
    } catch (error) {
      console.error("Session check exception:", error);
      return null;
    }
  };

  const clearSession = async () => {
    await Preferences.remove({ key: "supabase_session" });
    setUser(null);
    setProfile(null);
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) throw new Error("No user logged in");

    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq("id", user.id);

      if (error) throw error;

      await fetchProfile(user.id);
    } catch (error: any) {
      console.error("Update profile error:", error);
      throw error;
    }
  };

  const value = useMemo(
    () => ({
      user,
      profile,
      loading,
      authReady,
      signIn,
      signUp,
      signOut,
      signInWithGoogle,
      refreshProfile,
      updateProfile,
      resetPassword,
      updatePassword,
      verifyEmail,
      resendVerificationEmail,
      deleteAccount,
      isEmailVerified,
      checkSession,
      redirectBasedOnRole,
      clearSession,
    }),
    [user, profile, loading, authReady]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

export const refreshApp = () => {
  if (window && window.location) {
    console.log("Refreshing app like a browser...");
    window.location.reload();
  }
};