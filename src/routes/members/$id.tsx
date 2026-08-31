import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

import { Breadcrumbs, EmptyState, SectionHeader, Tag } from "@/components/ui-kit/primitives";
import { Button } from "@/components/ui/button";
import { getPublicMember } from "@/lib/public-content.functions";
import type { PublicMember } from "@/lib/public-content.functions";

export const Route = createFileRoute("/members/$id")({
  loader: async ({ params }) => {
    const member = await getPublicMember({ data: { id: params.id } });
    if (!member) throw notFound();
    return { member };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Member unavailable — OrigoHOST" }, { name: "robots", content: "noindex" }] };
    }
    const { member } = loaderData;
    const description =
      member.headline ??
      [member.designation, member.organization_name].filter(Boolean).join(" at ") ??
      "OrigoHOST community member profile.";
    return {
      meta: [
        { title: `${member.full_name} — OrigoHOST Member` },
        { name: "description", content: description },
        { property: "og:title", content: `${member.full_name} — OrigoHOST Member` },
        { property: "og:description", content: description },
        { property: "og:type", content: "profile" },
        { name: "twitter:card", content: "summary" },
        { property: "og:url", content: `/members/${member.id}` },
      ],
      links: [{ rel: "canonical", href: `/members/${member.id}` }],
    };
  },
  component: MemberProfilePage,
  notFoundComponent: MemberNotFound,
  errorComponent: MemberNotFound,
});

function MemberNotFound() {
  return (
    <div className="container-page py-40">
      <EmptyState
        title="This profile is not public"
        description="The member may have changed their visibility settings, or the profile does not exist."
        action={
          <Button asChild className="rounded-full">
            <Link to="/members">Back to the directory</Link>
          </Button>
        }
      />
    </div>
  );
}

function TagList({ label, items }: { label: string; items: string[] }) {
  if (items.length === 0) return null;
  return (
    <div>
      <h2 className="font-display text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-muted-foreground">
        {label}
      </h2>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {items.map((item) => (
          <Tag key={item}>{item}</Tag>
        ))}
      </div>
    </div>
  );
}

function MemberProfilePage() {
  const { member } = Route.useLoaderData() as { member: PublicMember };
  const subtitle = [member.designation, member.organization_name].filter(Boolean).join(" · ");
  const links = Array.isArray(member.links) ? member.links : [];

  return (
    <>
      <header className="relative overflow-hidden bg-mesh-light pt-28 md:pt-36">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-grid-faint opacity-40" />
        <div className="container-page relative pb-14">
          <Breadcrumbs
            items={[{ label: "Home", to: "/" }, { label: "Members", to: "/members" }, { label: member.full_name }]}
          />
          <div className="mt-8 flex flex-wrap items-center gap-5">
            {member.photo_url ? (
              <img
                src={member.photo_url}
                alt={`${member.full_name}, OrigoHOST member`}
                className="size-20 rounded-full object-cover"
              />
            ) : null}
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                {member.full_name}
              </h1>
              {subtitle ? <p className="mt-1.5 text-muted-foreground">{subtitle}</p> : null}
              {member.location ? (
                <p className="mt-1 text-sm text-muted-foreground">{member.location}</p>
              ) : null}
            </div>
          </div>
          {member.headline ? (
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">{member.headline}</p>
          ) : null}
        </div>
      </header>

      <section className="section-y border-t border-hairline">
        <div className="container-page grid gap-12 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <div>
            <SectionHeader eyebrow="About" title="Profile" />
            <p className="mt-6 whitespace-pre-line text-base leading-relaxed text-muted-foreground">
              {member.bio ?? "This member has not added a biography yet."}
            </p>

            <div className="mt-10">
              <Button asChild variant="ghost" className="rounded-full">
                <Link to="/members">
                  <ArrowLeft className="mr-1.5 size-4" />
                  All members
                </Link>
              </Button>
            </div>
          </div>

          <aside className="space-y-8 rounded-2xl border border-hairline bg-card p-6">
            <TagList label="Skills" items={member.skills} />
            <TagList label="Technology interests" items={member.technology_interests} />
            <TagList label="Professional interests" items={member.professional_interests} />
            {links.length > 0 ? (
              <div>
                <h2 className="font-display text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                  Links
                </h2>
                <ul className="mt-3 space-y-2">
                  {links
                    .filter((link) => typeof link?.url === "string" && /^https?:\/\//.test(link.url))
                    .map((link) => (
                      <li key={link.url}>
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer nofollow"
                          className="text-sm text-foreground underline underline-offset-4"
                        >
                          {link.label ?? link.url}
                        </a>
                      </li>
                    ))}
                </ul>
              </div>
            ) : null}
          </aside>
        </div>
      </section>
    </>
  );
}
