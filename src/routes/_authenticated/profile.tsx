import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { PortalShell } from "@/components/portal/portal-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { getMyPortal, updateMyProfile, type ProfileInputValues } from "@/lib/portal.functions";

export const Route = createFileRoute("/_authenticated/profile")({
  head: () => ({
    meta: [
      { title: "My Profile — OrigoHOST" },
      { name: "description", content: "Manage your OrigoHOST member profile." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ProfilePage,
});

const empty: ProfileInputValues = {
  full_name: "",
  headline: null,
  bio: null,
  location: null,
  organization_name: null,
  designation: null,
  education: null,
  phone: null,
  skills: [],
  technology_interests: [],
  professional_interests: [],
  is_public: false,
};

const toList = (value: string) =>
  value
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean)
    .slice(0, 40);

function ProfilePage() {
  const fetchPortal = useServerFn(getMyPortal);
  const saveProfile = useServerFn(updateMyProfile);
  const queryClient = useQueryClient();
  const { data } = useQuery({ queryKey: ["portal", "me"], queryFn: () => fetchPortal() });

  const [form, setForm] = useState<ProfileInputValues>(empty);

  useEffect(() => {
    const p = data?.profile;
    if (!p) return;
    setForm({
      full_name: p.full_name ?? "",
      headline: p.headline,
      bio: p.bio,
      location: p.location,
      organization_name: p.organization_name,
      designation: p.designation,
      education: p.education,
      phone: p.phone,
      skills: p.skills ?? [],
      technology_interests: p.technology_interests ?? [],
      professional_interests: p.professional_interests ?? [],
      is_public: p.is_public ?? false,
    });
  }, [data?.profile]);

  const mutation = useMutation({
    mutationFn: (values: ProfileInputValues) => saveProfile({ data: values }),
    onSuccess: () => {
      toast.success("Profile saved");
      void queryClient.invalidateQueries({ queryKey: ["portal", "me"] });
    },
    onError: (error: unknown) =>
      toast.error(error instanceof Error ? error.message : "Could not save your profile"),
  });

  const set = <K extends keyof ProfileInputValues>(key: K, value: ProfileInputValues[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <PortalShell
      title="My Profile"
      description="This is your single OrigoHOST person record — used across events, programs, chapters and certificates."
      roles={data?.roles ?? []}
    >
      <form
        className="grid max-w-2xl gap-5 rounded-2xl border border-hairline bg-card p-6"
        onSubmit={(e) => {
          e.preventDefault();
          mutation.mutate(form);
        }}
      >
        <div className="grid gap-2">
          <Label htmlFor="full_name">Full name</Label>
          <Input id="full_name" value={form.full_name} maxLength={120} required
            onChange={(e) => set("full_name", e.target.value)} />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="headline">Headline</Label>
          <Input id="headline" value={form.headline ?? ""} maxLength={160}
            placeholder="Final-year CSE student · Cloud & DevOps"
            onChange={(e) => set("headline", e.target.value || null)} />
        </div>

        <div className="grid gap-2 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="organization_name">Organisation / Institution</Label>
            <Input id="organization_name" value={form.organization_name ?? ""} maxLength={160}
              onChange={(e) => set("organization_name", e.target.value || null)} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="designation">Designation</Label>
            <Input id="designation" value={form.designation ?? ""} maxLength={160}
              onChange={(e) => set("designation", e.target.value || null)} />
          </div>
        </div>

        <div className="grid gap-2 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="location">Location</Label>
            <Input id="location" value={form.location ?? ""} maxLength={120}
              onChange={(e) => set("location", e.target.value || null)} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone">Phone (optional)</Label>
            <Input id="phone" value={form.phone ?? ""} maxLength={32}
              onChange={(e) => set("phone", e.target.value || null)} />
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="education">Education</Label>
          <Input id="education" value={form.education ?? ""} maxLength={240}
            onChange={(e) => set("education", e.target.value || null)} />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="skills">Skills (comma separated)</Label>
          <Input id="skills" value={form.skills.join(", ")}
            onChange={(e) => set("skills", toList(e.target.value))} />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="tech">Technology interests (comma separated)</Label>
          <Input id="tech" value={form.technology_interests.join(", ")}
            onChange={(e) => set("technology_interests", toList(e.target.value))} />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="prof">Professional interests (comma separated)</Label>
          <Input id="prof" value={form.professional_interests.join(", ")}
            onChange={(e) => set("professional_interests", toList(e.target.value))} />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea id="bio" rows={4} maxLength={2000} value={form.bio ?? ""}
            onChange={(e) => set("bio", e.target.value || null)} />
        </div>

        <div className="flex items-center justify-between rounded-xl border border-hairline p-4">
          <div>
            <p className="text-sm font-medium text-foreground">Show my profile publicly</p>
            <p className="text-xs text-muted-foreground">
              When off, only you and community administrators can see your record.
            </p>
          </div>
          <Switch checked={form.is_public} onCheckedChange={(v) => set("is_public", v)} aria-label="Public profile" />
        </div>

        <Button type="submit" disabled={mutation.isPending} className="justify-self-start">
          {mutation.isPending ? "Saving…" : "Save profile"}
        </Button>
      </form>
    </PortalShell>
  );
}
