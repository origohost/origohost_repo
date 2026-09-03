import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Save, Loader2, User as UserIcon } from "lucide-react";
import { AdminShell } from "@/components/layout/admin-shell";

export default function AdminPersonalMyProfilePage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    about: "",
    title: "",
    avatar_url: "",
  });

  useEffect(() => {
    if (user?.user_metadata) {
      setFormData({
        full_name: user.user_metadata.full_name || user.user_metadata.name || "",
        about: user.user_metadata.about || "",
        title: user.user_metadata.title || "",
        avatar_url: user.user_metadata.avatar_url || "",
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        data: formData,
      });

      if (error) throw error;
      toast.success("Profile updated successfully");
    } catch (error: any) {
      toast.error(error.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminShell title="My Profile" description="Manage My Profile for the Personal workspace.">
      <div className="space-y-6 max-w-4xl">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[var(--brand-ink)]/10">
          <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-50">
            <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden border border-gray-200">
              {formData.avatar_url ? (
                <img
                  src={formData.avatar_url}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              ) : (
                <UserIcon className="h-8 w-8 text-gray-400" />
              )}
            </div>
            <div>
              <h2 className="text-xl font-bold text-[var(--brand-ink)]">Personal Information</h2>
              <p className="text-sm text-[var(--brand-ink)]/60">
                Update your photo and personal details here.
              </p>
            </div>
          </div>

          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-[var(--brand-ink)]">Full Name</label>
                <Input
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="bg-zinc-50 border-gray-200 focus:bg-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-[var(--brand-ink)]">
                  Professional Title
                </label>
                <Input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. AI Engineer"
                  className="bg-zinc-50 border-gray-200 focus:bg-white"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-semibold text-[var(--brand-ink)]">Avatar URL</label>
                <Input
                  name="avatar_url"
                  value={formData.avatar_url}
                  onChange={handleChange}
                  placeholder="https://..."
                  className="bg-zinc-50 border-gray-200 focus:bg-white"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-semibold text-[var(--brand-ink)]">About Me</label>
                <textarea
                  name="about"
                  value={formData.about}
                  onChange={handleChange}
                  placeholder="Write a brief bio about yourself..."
                  className="flex w-full min-h-[120px] rounded-xl border border-gray-200 bg-zinc-50 px-3 py-2 text-sm shadow-sm transition-colors focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--brand-orange)]/20 focus:border-[var(--brand-orange)]"
                />
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-gray-50">
              <Button
                type="submit"
                disabled={loading}
                className="bg-[var(--brand-ink)] hover:bg-[var(--brand-ink)]/90 text-white px-8 rounded-full shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </div>
    </AdminShell>
  );
}
