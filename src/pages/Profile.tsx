// © 2025 Jeff. All rights reserved.
// Unauthorized copying, distribution, or modification of this file is strictly prohibited.

import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import {
  User,
  Settings,
  TrendingUp,
  Calendar,
  DraftingCompass,
  ArrowLeft,
  Edit,
  Save,
  Crown,
  Shield,
  CreditCard,
  Shell,
  ImageUpIcon,
  LucidePersonStanding,
  Camera,
  Check,
  CheckCircle,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { motion } from "framer-motion";

// RISA Color Palette (from Index.tsx)
const RISA_BLUE = "#015B97";
const RISA_LIGHT_BLUE = "#3288e6";
const RISA_WHITE = "#ffffff";
const RISA_DARK_TEXT = "#2D3748";
const RISA_LIGHT_GRAY = "#F5F7FA";

const Profile = () => {
  const navigate = useNavigate();
  const { profile, user, updateProfile, refreshProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [showAvatarUpload, setShowAvatarUpload] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    company: "",
    location: "",
    avatar_url: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize form data when profile loads
  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile?.name || "",
        phone: profile?.phone || "",
        company: profile?.company || "",
        location: profile?.location || "",
        avatar_url: profile?.avatar_url || "",
      });
      setLoading(false);
    }
  }, [profile]);

  useEffect(() => {
    if (profile?.avatar_url) {
      downloadImage(profile.avatar_url);
    } else {
      setAvatarUrl(null);
    }
  }, [profile]);

  async function downloadImage(path: string) {
    try {
      if (path.startsWith("http")) {
        setAvatarUrl(path);
        return;
      }
      
      // Check if the path exists in storage
      const { data: listData } = await supabase.storage
        .from("profile-photos")
        .list();
      
      const fileExists = listData?.some(file => file.name === path);
      
      if (!fileExists) {
        console.warn("Profile image not found in storage:", path);
        setAvatarUrl(null);
        return;
      }

      const { data, error } = await supabase.storage
        .from("profile-photos")
        .download(path);
      
      if (error) {
        throw error;
      }
      
      const url = URL.createObjectURL(data);
      setAvatarUrl(url);
    } catch (error) {
      console.error("Error downloading image:", error);
      setAvatarUrl(null);
    }
  }

  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1).replace(/\.0$/, "")}M`;
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1).replace(/\.0$/, "")}K`;
    }
    return value.toString();
  };

  const [tierLimits, setTierLimits] = useState<{
    [key: string]: {
      price: number;
      limit: number;
      features: string[];
    };
  }>({});

  const [stats, setStats] = useState({
    total_projects: 0,
    completed_projects: 0,
    total_revenue: 0,
    completionRate: 0,
  });

  useEffect(() => {
    if (profile?.id) {
      fetchDashboardStats(profile.id).then(setStats);
    }
  }, [user, profile]);

  const fetchDashboardStats = async (userId: string) => {
    try {
      // First check if quotes table exists
      const { error: tableCheckError } = await supabase
        .from("quotes")
        .select("id", { head: true, count: 'exact' });
      
      if (tableCheckError) {
        console.log("Quotes table doesn't exist or no access, using profile stats");
        return {
          total_projects: profile?.total_projects || 0,
          completed_projects: profile?.completed_projects || 0,
          total_revenue: profile?.total_revenue || 0,
          completionRate: profile?.total_projects ? 
            ((profile?.completed_projects || 0) / profile.total_projects) * 100 : 0,
        };
      }

      const { data, error } = await supabase
        .from("quotes")
        .select("status, profit_amount")
        .eq("user_id", userId);
      
      if (error) {
        console.error("Error fetching dashboard stats:", error);
        return {
          total_projects: profile?.total_projects || 0,
          completed_projects: profile?.completed_projects || 0,
          total_revenue: profile?.total_revenue || 0,
          completionRate: 0,
        };
      }
      
      const total_projects = data.length;
      const completed_projects = data.filter((q: any) => q.status === "completed").length;
      const total_revenue = data.reduce((sum: number, q: any) => sum + (q.profit_amount || 0), 0);
      const completionRate = total_projects > 0 ? (completed_projects / total_projects) * 100 : 0;
      
      return {
        total_projects,
        completed_projects,
        total_revenue,
        completionRate,
      };
    } catch (error) {
      console.error("Error in fetchDashboardStats:", error);
      return {
        total_projects: 0,
        completed_projects: 0,
        total_revenue: 0,
        completionRate: 0,
      };
    }
  };

  useEffect(() => {
    const fetchTiers = async () => {
      try {
        // Check if tiers table exists
        const { error: tableCheckError } = await supabase
          .from("tiers")
          .select("id", { head: true, count: 'exact' });
        
        if (tableCheckError) {
          console.log("Tiers table doesn't exist, using default tiers");
          // Set default tiers if table doesn't exist
          setTierLimits({
            "free": {
              limit: 3,
              price: 0,
              features: ["Basic features", "3 quotes/month", "Email support"]
            },
            "intermediate": {
              limit: 10,
              price: 4900,
              features: ["All basic features", "10 quotes/month", "Priority support", "Analytics"]
            },
            "professional": {
              limit: 999999,
              price: 14900,
              features: ["Unlimited quotes", "24/7 support", "Advanced analytics", "Custom branding"]
            }
          });
          return;
        }

        const { data, error } = await supabase.from("tiers").select("*");
        if (error) {
          console.error("Failed to fetch tiers:", error);
          return;
        }
        
        const limits = data.reduce((acc: any, tier: any) => {
          acc[tier.name.toLowerCase()] = {
            limit: tier.quotes_limit,
            price: tier.price,
            features: tier.features || [],
          };
          return acc;
        }, {});
        setTierLimits(limits);
      } catch (error) {
        console.error("Error fetching tiers:", error);
      }
    };
    fetchTiers();
  }, [user]);

  const tierData = profile?.tier
    ? tierLimits[profile.tier.toLowerCase() as keyof typeof tierLimits]
    : null;

  const handleSave = async () => {
    try {
      setError(null);
      await updateProfile(formData);
      setIsEditing(false);
      await refreshProfile(); // Refresh the profile data
    } catch (error: any) {
      console.error("Error updating profile:", error);
      setError(error.message || "Failed to update profile. Please try again.");
    }
  };

  const handleAvatarUpload = async (url: string) => {
    try {
      setError(null);
      await updateProfile({ ...formData, avatar_url: url });
      setShowAvatarUpload(false);
      await refreshProfile(); // Refresh the profile data
    } catch (error: any) {
      console.error("Error updating avatar:", error);
      setError(error.message || "Failed to update avatar. Please try again.");
    }
  };

  if (!user) {
    navigate("/auth");
    return null;
  }

  if (loading || !profile) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
            Loading Profile...
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {!profile ? "Creating your profile..." : "Loading your profile..."}
          </p>
        </div>
      </div>
    );
  }

  const getTierImage = (tier: string) => {
    switch (tier.toLowerCase()) {
      case "free":
        return <Shell className="w-6 h-6" />;
      case "intermediate":
        return <Crown className="w-6 h-6" />;
      case "professional":
        return <Shield className="w-6 h-6" />;
      default:
        return <span className="text-sm font-medium">{tier}</span>;
    }
  };

  const getTierBadge = (tier: string) => {
    switch (tier.toLowerCase()) {
      case "free":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Free</Badge>;
      case "intermediate":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Intermediate</Badge>;
      case "professional":
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Professional</Badge>;
      default:
        return <Badge>{tier}</Badge>;
    }
  };

  const quotaUsagePercentage =
    profile?.quotes_used && profile?.tier && tierLimits[profile.tier.toLowerCase()]
      ? (profile.quotes_used / tierLimits[profile.tier.toLowerCase()].limit) * 100
      : 0;

  const projectCompletionRate =
    stats.total_projects > 0 ? (stats.completed_projects / stats.total_projects) * 100 : 0;

  return (
    <div className="min-h-screen animate-fade-in smooth-transition">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between items-start">
          <div>
            <h1 className="sm:text-3xl items-center text-2xl flex font-bold bg-gradient-to-r from-primary via-indigo-600 to-indigo-900 dark:from-white dark:via-white dark:to-white bg-clip-text text-transparent">
              <LucidePersonStanding className="sm:w-7 sm:h-7 mr-2 text-primary dark:text-white" />
              Profile
            </h1>
            <p className="text-sm sm:text-lg bg-gradient-to-r from-primary via-indigo-600 to-indigo-900 dark:from-white dark:via-blue-400 dark:to-purple-400 text-transparent bg-clip-text mt-2">
              Manage your account and subscription
            </p>
          </div>
          <Button
            className="text-white"
            onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
          >
            {isEditing ? (
              <Save className="w-4 h-4 mr-2 text-white" />
            ) : (
              <Edit className="w-4 h-4 mr-2 text-white" />
            )}
            {isEditing ? "Save" : "Edit Profile"}
          </Button>
        </div>

        {/* Error Message */}
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg"
          >
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          </motion.div>
        )}

        {/* Avatar Upload Modal */}
        {showAvatarUpload && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <ProfilePictureUpload
              currentAvatarUrl={avatarUrl || undefined}
              onUploadComplete={handleAvatarUpload}
              onCancel={() => setShowAvatarUpload(false)}
            />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Column: Personal Info & Stats */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar */}
                <div className="flex flex-col items-center">
                  <div className="relative">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={avatarUrl || undefined} />
                      <AvatarFallback className="text-2xl">
                        <User className="w-10 h-10 text-blue-600 dark:text-blue-400" />
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      size="icon"
                      className="absolute bottom-0 right-0 rounded-full h-8 w-8 text-white"
                      onClick={() => setShowAvatarUpload(true)}
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    onClick={() => setShowAvatarUpload(true)}
                    className="mt-2 border text-primary dark:text-white hover:text-primary hover:bg-primary/20"
                  >
                    Update company logo
                  </Button>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={isEditing ? formData.name : profile.name || ""}
                      onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value={profile.email || user.email || ""} disabled />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={isEditing ? formData.phone : profile.phone || ""}
                      onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                      disabled={!isEditing}
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      value={isEditing ? formData.company : profile.company || ""}
                      onChange={(e) => setFormData((prev) => ({ ...prev, company: e.target.value }))}
                      disabled={!isEditing}
                      placeholder="Enter your company name"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={isEditing ? formData.location : profile.location || ""}
                    onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                    disabled={!isEditing}
                    placeholder="Enter your location"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Stats Card (for non-Free users) */}
            {profile.tier !== "Free" && stats.total_projects > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="text-center">
                      <p className="text-xl md:text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.total_projects}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Total Projects</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xl md:text-2xl font-bold text-green-600 dark:text-green-400">{stats.completed_projects}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Completed</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xl md:text-2xl font-bold text-purple-600 dark:text-purple-400">{Math.round(stats.completionRate)}%</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Success Rate</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                        KSh {formatCurrency(stats.total_revenue)}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Total Revenue</p>
                    </div>
                  </div>

                  <div className="flex justify-between text-sm mb-2 text-gray-700 dark:text-gray-300">
                    <span>Project Completion Rate</span>
                    <span>{Math.round(projectCompletionRate)}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        projectCompletionRate >= 75
                          ? "bg-green-500"
                          : projectCompletionRate >= 50
                          ? "bg-blue-500"
                          : "bg-red-500"
                      }`}
                      style={{ width: `${projectCompletionRate}%` }}
                    ></div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar: Plan & Account Info */}
          <div className="space-y-6">
            {/* Plan Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex flex-col items-center">
                  <span className="text-lg font-semibold">Current Plan</span>
                  <div className="flex items-center space-x-3 mt-2">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-full ${
                        profile.tier === "Free"
                          ? "bg-green-100 text-green-700"
                          : profile.tier === "Intermediate"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-purple-100 text-purple-700"
                      }`}
                    >
                      {getTierImage(profile.tier || "free")}
                    </div>
                  </div>
                  {profile.tier || "Free"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <p className="sm:text-2xl text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                      {profile.tier === "Free" ? "Free" : `KSh ${tierData?.price?.toLocaleString() || "0"}`}
                    </p>
                    <p className="text-sm text-muted-foreground">per month</p>
                  </div>

                  {profile.tier !== "Professional" && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Quotes Used</span>
                        <span>
                          {profile?.quotes_used ?? 0}/{tierLimits[profile?.tier?.toLowerCase()]?.limit ?? 0}
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            quotaUsagePercentage >= 75 ? "bg-red-500" : quotaUsagePercentage >= 50 ? "bg-blue-500" : "bg-green-500"
                          }`}
                          style={{ width: `${Math.min(quotaUsagePercentage, 100)}%` }}
                        ></div>
                      </div>
                      {quotaUsagePercentage >= 75 && (
                        <p className="text-sm text-red-600">Running low on quotes!</p>
                      )}
                    </div>
                  )}

                  <div className="space-y-2">
                    <h4 className="font-semibold text-md">Features:</h4>
                    {tierData?.features?.length ? (
                      tierData.features.map((feature, idx) => (
                        <li key={idx} className="flex text-sm items-center">
                          <CheckCircle className="w-4 h-4 dark:text-green-500 text-green-700 mr-2" />
                          {feature}
                        </li>
                      ))
                    ) : (
                      <div className="text-sm text-gray-500">
                        <p>• Basic account access</p>
                        <p>• Profile management</p>
                        <p>• Email support</p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Account Info Card */}
            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Account Info
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Member since:</span>
                  <span className="text-gray-900 dark:text-white">
                    {profile.created_at ? new Date(profile.created_at).toLocaleDateString() : "N/A"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Last updated:</span>
                  <span className="text-gray-900 dark:text-white">
                    {profile.updated_at ? new Date(profile.updated_at).toLocaleDateString() : "N/A"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Account type:</span>
                  <span className="text-gray-900 dark:text-white">{profile.is_admin ? "Administrator" : "User"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Quotes used:</span>
                  <span className="text-gray-900 dark:text-white">{profile.quotes_used || 0}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

// Simple ProfilePictureUpload component
const ProfilePictureUpload: React.FC<{
  currentAvatarUrl?: string;
  onUploadComplete: (url: string) => void;
  onCancel: () => void;
}> = ({ currentAvatarUrl, onUploadComplete, onCancel }) => {
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('profile-photos')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL
      const { data } = supabase.storage
        .from('profile-photos')
        .getPublicUrl(filePath);

      onUploadComplete(data.publicUrl);
    } catch (error) {
      console.error('Error uploading avatar:', error);
      alert('Error uploading avatar. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Update Profile Picture</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-center">
          <Avatar className="h-32 w-32">
            <AvatarImage src={currentAvatarUrl} />
            <AvatarFallback className="text-3xl">
              <User className="w-16 h-16" />
            </AvatarFallback>
          </Avatar>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="avatar-upload">Choose a new image</Label>
          <Input
            id="avatar-upload"
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            disabled={uploading}
          />
          <p className="text-sm text-gray-500">
            Recommended: Square image, max 2MB
          </p>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onCancel} disabled={uploading}>
            Cancel
          </Button>
          <div className="relative">
            <Input
              type="file"
              accept="image/*"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={handleFileUpload}
              disabled={uploading}
            />
            <Button disabled={uploading}>
              {uploading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Uploading...
                </>
              ) : (
                'Upload Image'
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Profile;