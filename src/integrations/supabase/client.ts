// © 2026 Jeff. All rights reserved.

import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./types";

/* =========================================================
   ENV HELPERS (MODERN & SAFE)
   ========================================================= */

const isBrowser = typeof window !== "undefined";
const isDev =
  (typeof import.meta !== "undefined" && import.meta.env?.DEV) ||
  process.env.NODE_ENV === "development";

const getEnv = (key: string): string | undefined => {
  // Vite / client
  if (typeof import.meta !== "undefined" && import.meta.env?.[key]) {
    return import.meta.env[key];
  }

  // Node / server
  if (typeof process !== "undefined" && process.env?.[key]) {
    return process.env[key];
  }

  // Deno / Edge
  if (typeof Deno !== "undefined") {
    return Deno.env.get(key);
  }

  return undefined;
};

/* =========================================================
   REQUIRED ENV VARS
   ========================================================= */

const SUPABASE_URL =
  getEnv("VITE_SUPABASE_URL") ||
  getEnv("NEXT_PUBLIC_SUPABASE_URL") ||
  getEnv("SUPABASE_URL");

const SUPABASE_ANON_KEY =
  getEnv("VITE_SUPABASE_ANON_KEY") ||
  getEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY");

const SUPABASE_SERVICE_ROLE_KEY = getEnv("SUPABASE_SERVICE_ROLE_KEY");

/* =========================================================
   VALIDATION
   ========================================================= */

if (!SUPABASE_URL) {
  throw new Error(
    "❌ Missing SUPABASE_URL. Set VITE_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_URL."
  );
}

if (isBrowser && !SUPABASE_ANON_KEY) {
  throw new Error(
    "❌ Missing SUPABASE_ANON_KEY for browser. Set VITE_SUPABASE_ANON_KEY."
  );
}

if (isDev) {
  console.log("✅ Supabase Config Loaded", {
    url: SUPABASE_URL,
    hasAnonKey: !!SUPABASE_ANON_KEY,
    hasServiceKey: !!SUPABASE_SERVICE_ROLE_KEY,
    runtime: isBrowser ? "browser" : "server",
  });
}

/* =========================================================
   DYNAMIC SITE URL CONFIGURATION
   ========================================================= */

const getSiteUrl = (): string => {
  if (isBrowser) {
    // Get current origin (works for both local and production)
    return window.location.origin;
  }

  // For server-side, check if we're in development mode
  if (isDev) {
    return "http://localhost:8080"; // YOUR LOCALHOST PORT
  }

  // For production server-side
  return "https://realtor.co.ke"; // YOUR PRODUCTION DOMAIN
};

const currentSiteUrl = getSiteUrl();

if (isDev) {
  console.log("🌐 Current Site URL:", currentSiteUrl);
}

/* =========================================================
   STORAGE (BROWSER ONLY)
   ========================================================= */

const storage = isBrowser ? window.localStorage : undefined;

/* =========================================================
   MAIN CLIENT (BROWSER + SERVER SAFE)
   ========================================================= */

export const supabase: SupabaseClient<Database> = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY!,
  {
    auth: {
      storage,
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      flowType: "pkce",
      storageKey: "supabase.auth.token",
    },
    global: {
      headers: {
        "x-application": "realtors-kenya",
        "x-client": "web",
        "x-site-url": currentSiteUrl,
      },
    },
    realtime: {
      params: {
        eventsPerSecond: 10,
      },
    },
  }
);

/* =========================================================
   AUTH HELPERS
   ========================================================= */

export const getAuthRedirectUrl = (path: string = ""): string => {
  const baseUrl = currentSiteUrl;
  // Remove trailing slash if present
  const cleanBaseUrl = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
  // Remove leading slash from path if present
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;

  return cleanPath ? `${cleanBaseUrl}/${cleanPath}` : cleanBaseUrl;
};

export const signUpWithRedirect = async (
  email: string,
  password: string,
  name?: string
) => {
  const redirectUrl = getAuthRedirectUrl("dashboard");

  console.log("📧 Sign up redirect URL:", redirectUrl);

  return await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: redirectUrl,
      data: {
        name: name || email.split("@")[0],
        site_url: currentSiteUrl,
      },
    },
  });
};

export const signInWithRedirect = async (email: string, password: string) => {
  const redirectUrl = getAuthRedirectUrl("dashboard");

  console.log("🔐 Sign in redirect URL:", redirectUrl);

  return await supabase.auth.signInWithPassword({
    email,
    password,
  });
};

export const signInWithGoogle = async () => {
  const redirectUrl = getAuthRedirectUrl("auth/callback");

  console.log("🔐 Google OAuth redirect URL:", redirectUrl);

  return await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: redirectUrl,
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });
};

export const resetPasswordWithRedirect = async (email: string) => {
  const redirectUrl = getAuthRedirectUrl("reset-password");

  console.log("🔄 Password reset redirect URL:", redirectUrl);

  return await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: redirectUrl,
  });
};

/* =========================================================
   SERVICE ROLE CLIENT (SERVER / EDGE ONLY)
   ========================================================= */

export const createServiceRoleClient = (): SupabaseClient<Database> => {
  if (!SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error(
      "❌ SUPABASE_SERVICE_ROLE_KEY is required for server-side operations."
    );
  }

  return createClient<Database>(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
    global: {
      headers: {
        "x-client": "service-role",
        "x-site-url": currentSiteUrl,
      },
    },
  });
};

/* =========================================================
   EDGE FUNCTION CLIENT
   ========================================================= */

export const createEdgeClient = (
  accessToken: string
): SupabaseClient<Database> => {
  if (!accessToken) {
    throw new Error("❌ Access token required for edge client.");
  }

  return createClient<Database>(SUPABASE_URL, accessToken, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
    global: {
      headers: {
        "x-client": "edge-function",
        "x-site-url": currentSiteUrl,
      },
    },
  });
};

/* =========================================================
   CONNECTION TEST
   ========================================================= */

export const testSupabaseConnection = async () => {
  try {
    const { error } = await supabase
      .from("profiles")
      .select("id", { head: true });

    if (error) {
      return { success: false, error: error.message };
    }

    return {
      success: true,
      url: SUPABASE_URL,
      siteUrl: currentSiteUrl,
      timestamp: new Date().toISOString(),
    };
  } catch (err: any) {
    return {
      success: false,
      error: err.message ?? "Unknown error",
    };
  }
};

/* =========================================================
   AUTH ERROR HELPER
   ========================================================= */

export const handleAuthError = (error: any) => {
  const map: Record<string, string> = {
    "Invalid login credentials":
      "Login failed: Incorrect password or account not verified. Please check your email for the verification link.",
    "Email not confirmed":
      "Please confirm your email address. Check your inbox (and spam folder).",
    "User already registered": "An account with this email already exists.",
    "Password should be at least 6 characters":
      "Password must be at least 6 characters.",
    "Too many requests": "Too many attempts. Try again later.",
    "Email rate limit exceeded":
      "Too many emails sent. Please wait and try again.",
    "Invalid email": "Please enter a valid email address.",
    "Signup requires a valid password": "Please enter a valid password.",
    "Unable to validate email address: invalid format": "Invalid email format.",
    "Auth session missing": "Session expired. Please sign in again.",
  };

  return {
    message: map[error?.message] || "Authentication failed.",
    original: error,
  };
};

/* =========================================================
   EMAIL VERIFICATION HELPERS
   ========================================================= */

export const checkEmailVerificationStatus = async (userId: string) => {
  try {
    // FIX: Browser client cannot uses 'auth.admin'. We must check current session user instead.
    if (isBrowser) {
      const { data: { user } } = await supabase.auth.getUser();
      
      // If the checked userId matches the current user, we can know the status
      if (user && user.id === userId) {
        return {
          verified: !!user.email_confirmed_at,
          verifiedAt: user.email_confirmed_at,
        };
      }
      
      // We can't check other users from the browser
      console.warn("⚠️ Cannot check other users' verification status from browser client");
      return { verified: false, verifiedAt: null };
    } 

    // Server-side (Edge Functions / Node) - Use Service Role if available
    if (SUPABASE_SERVICE_ROLE_KEY) {
       // We create a temporary admin client just for this check
       const adminClient = createServiceRoleClient();
       const { data: { user }, error } = await adminClient.auth.admin.getUserById(userId);
       
       if (error) {
         console.error("Error checking email verification:", error);
         return { verified: false, verifiedAt: null };
       }
       
       return { 
         verified: !!user?.email_confirmed_at, 
         verifiedAt: user?.email_confirmed_at 
       };
    }

    return { verified: false, verifiedAt: null };
  } catch (error) {
    console.error("Error checking email verification:", error);
    return { verified: false, verifiedAt: null };
  }
};

export const resendVerificationEmail = async (email: string) => {
  try {
    const redirectUrl = getAuthRedirectUrl("dashboard");

    console.log(
      "📨 Resending verification email to:",
      email,
      "Redirect:",
      redirectUrl
    );

    const { error } = await supabase.auth.resend({
      type: "signup",
      email: email,
      options: {
        emailRedirectTo: redirectUrl,
      },
    });

    return { error };
  } catch (error: any) {
    return { error };
  }
};

/* =========================================================
   DEBUG LISTENERS (DEV ONLY)
   ========================================================= */

if (isDev && isBrowser) {
  supabase.auth.onAuthStateChange((event, session) => {
    console.log("🔐 Auth Event:", event, {
      user: session?.user?.email,
      siteUrl: currentSiteUrl,
      userId: session?.user?.id,
    });
  });
}

export default supabase;