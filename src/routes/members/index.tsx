import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { CtaSection, EmptyState, PageHero, SectionHeader, Tag } from "@/components/ui-kit/primitives";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getDirectoryFacets, searchPublicMembers } from "@/lib/public-content.functions";
import type { PublicMember } from "@/lib/public-content.functions";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/members/")({
  head: () => ({
    meta: [
      { title: "Member Directory — OrigoHOST Community" },
      {
        name: "description",
        content:
          "Browse OrigoHOST members who have chosen a public profile. Search by name, skill, organisation or technology interest to find collaborators and mentors.",
      },
      { property: "og:title", content: "OrigoHOST Member Directory" },
      {
        property: "og:description",
        content:
          "Discover builders, mentors and researchers in the OrigoHOST community. Only members who opted in to a public profile appear here.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "/members" },
    ],
    links: [{ rel: "canonical", href: "/members" }],
  }),
  loader: async () => {
    const [initial, facets] = await Promise.all([
      searchPublicMembers({ data: { q: "", skill: "", organization: "", interest: "", page: 1 } }),
      getDirectoryFacets(),
    ]);
    return { initial, facets };
  },
  component: MembersPage,
  errorComponent: DirectoryUnavailable,
});

function DirectoryUnavailable() {
  return (
    <div className="container-page py-40">
      <EmptyState
        title="The directory could not be loaded"
        description="Something went wrong while loading member profiles. Please refresh the page or try again shortly."
      />
    </div>
  );
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function MemberCard({ member }: { member: PublicMember }) {
  const subtitle = [member.designation, member.organization_name].filter(Boolean).join(" · ");
  return (
    <Link
      to="/members/$id"
      params={{ id: member.id }}
      className="group flex h-full flex-col rounded-2xl border border-hairline bg-card p-6 transition-colors hover:border-primary/40"
    >
      <div className="flex items-center gap-3">
        {member.photo_url ? (
          <img
            src={member.photo_url}
            alt={`${member.full_name}, OrigoHOST member`}
            loading="lazy"
            className="size-12 rounded-full object-cover"
          />
        ) : (
          <span
            aria-hidden="true"
            className="grid size-12 place-items-center rounded-full bg-secondary font-display text-sm font-bold text-foreground"
          >
            {initials(member.full_name)}
          </span>
        )}
        <div className="min-w-0">
          <p className="truncate font-display text-base font-bold text-foreground">{member.full_name}</p>
          {subtitle ? <p className="truncate text-sm text-muted-foreground">{subtitle}</p> : null}
        </div>
      </div>

      {member.headline ? (
        <p className="mt-4 line-clamp-3 text-sm text-muted-foreground">{member.headline}</p>
      ) : null}

      {member.skills.length > 0 ? (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {member.skills.slice(0, 4).map((skill) => (
            <Tag key={skill}>{skill}</Tag>
          ))}
        </div>
      ) : null}

      {member.location ? (
        <p className="mt-auto pt-4 text-xs uppercase tracking-[0.08em] text-muted-foreground">{member.location}</p>
      ) : null}
    </Link>
  );
}

function MembersPage() {
  const { initial, facets } = Route.useLoaderData() as {
    initial: { members: PublicMember[]; total: number; page: number; pageSize: number };
    facets: { skills: string[]; interests: string[]; organizations: string[] };
  };
  const [result, setResult] = useState(initial);
  const [q, setQ] = useState("");
  const [skill, setSkill] = useState("");
  const [interest, setInterest] = useState("");
  const [busy, setBusy] = useState(false);

  async function run(next: { q?: string; skill?: string; interest?: string; page?: number }) {
    const payload = {
      q: next.q ?? q,
      skill: next.skill ?? skill,
      interest: next.interest ?? interest,
      organization: "",
      page: next.page ?? 1,
    };
    setBusy(true);
    try {
      setResult(await searchPublicMembers({ data: payload }));
    } finally {
      setBusy(false);
    }
  }

  const totalPages = Math.max(1, Math.ceil(result.total / result.pageSize));

  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Members" }]}
        eyebrow="Member directory"
        title="The people building inside OrigoHOST"
        description="Members choose whether their profile is listed publicly. Search by name, skill or technology interest to find collaborators, mentors and reviewers."
      />

      <section className="section-y border-t border-hairline">
        <div className="container-page">
          <SectionHeader eyebrow="Search" title="Find a member" />

          <form
            className="mt-8 space-y-5"
            onSubmit={(event) => {
              event.preventDefault();
              void run({ page: 1 });
            }}
          >
            <div className="flex flex-wrap gap-3">
              <label className="sr-only" htmlFor="member-search">
                Search members by name, role or organisation
              </label>
              <Input
                id="member-search"
                value={q}
                onChange={(event) => setQ(event.target.value)}
                placeholder="Search by name, role or organisation"
                maxLength={80}
                className="h-12 w-full max-w-md rounded-full bg-card px-5"
              />
              <Button type="submit" className="h-12 rounded-full px-6" disabled={busy}>
                {busy ? "Searching…" : "Search"}
              </Button>
            </div>

            {facets.skills.length > 0 ? (
              <div role="group" aria-label="Filter by skill" className="flex flex-wrap gap-2">
                {["all", ...facets.skills.slice(0, 14)].map((item) => {
                  const value = item === "all" ? "" : item;
                  const active = skill === value;
                  return (
                    <button
                      key={item}
                      type="button"
                      aria-pressed={active}
                      onClick={() => {
                        setSkill(value);
                        void run({ skill: value, page: 1 });
                      }}
                      className={cn(
                        "min-h-9 rounded-full border px-3.5 font-display text-xs font-bold capitalize tracking-[0.04em] transition-colors",
                        active
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-hairline bg-card text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            ) : null}

            {facets.interests.length > 0 ? (
              <div role="group" aria-label="Filter by technology interest" className="flex flex-wrap gap-2">
                {["all", ...facets.interests.slice(0, 14)].map((item) => {
                  const value = item === "all" ? "" : item;
                  const active = interest === value;
                  return (
                    <button
                      key={item}
                      type="button"
                      aria-pressed={active}
                      onClick={() => {
                        setInterest(value);
                        void run({ interest: value, page: 1 });
                      }}
                      className={cn(
                        "min-h-9 rounded-full border px-3.5 font-display text-xs font-bold capitalize tracking-[0.04em] transition-colors",
                        active
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-hairline bg-card text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            ) : null}
          </form>

          <p className="mt-7 text-sm text-muted-foreground" aria-live="polite">
            {result.total} public {result.total === 1 ? "profile" : "profiles"}
          </p>

          {result.members.length > 0 ? (
            <>
              <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {result.members.map((member) => (
                  <MemberCard key={member.id} member={member} />
                ))}
              </div>

              {totalPages > 1 ? (
                <div className="mt-10 flex items-center justify-center gap-3">
                  <Button
                    variant="outline"
                    className="rounded-full"
                    disabled={result.page <= 1 || busy}
                    onClick={() => void run({ page: result.page - 1 })}
                  >
                    Previous
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    Page {result.page} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    className="rounded-full"
                    disabled={result.page >= totalPages || busy}
                    onClick={() => void run({ page: result.page + 1 })}
                  >
                    Next
                  </Button>
                </div>
              ) : null}
            </>
          ) : (
            <div className="mt-8">
              <EmptyState
                title="No public profiles match this search"
                description="Try a different keyword or clear the filters. Members appear here only after choosing a public profile visibility."
                action={
                  <Button
                    variant="outline"
                    className="rounded-full"
                    onClick={() => {
                      setQ("");
                      setSkill("");
                      setInterest("");
                      void run({ q: "", skill: "", interest: "", page: 1 });
                    }}
                  >
                    Clear search
                  </Button>
                }
              />
            </div>
          )}
        </div>
      </section>

      <CtaSection
        title="Want to be listed in the directory?"
        description="Join OrigoHOST, complete your member profile and set your visibility to public."
        primary={{ label: "Join Community", to: "/community" }}
        secondary={{ label: "Sign in", to: "/auth" }}
      />
    </>
  );
}
