import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import { PageHero, SectionHeader } from "@/components/ui-kit/primitives";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { brand, contactCategories, socialLinks } from "@/content/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact OrigoHOST" },
      {
        name: "description",
        content:
          "Contact the OrigoHOST team about community membership, events, partnerships, sponsorship, campus chapters, speaking, media or support.",
      },
      { property: "og:title", content: "Contact OrigoHOST" },
      {
        property: "og:description",
        content:
          "Reach the right OrigoHOST team with a categorised enquiry — community, events, partnerships, chapters, media or support.",
      },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [submitting, setSubmitting] = useState(false);
  const [category, setCategory] = useState(contactCategories[0]);

  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Contact" }]}
        eyebrow="Contact"
        title="Talk to the right team."
        description="Pick a category so your message reaches the people who can actually act on it."
      />

      <section className="section-y border-t border-hairline">
        <div className="container-page grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <div>
            <SectionHeader eyebrow="Enquiry" title="Send a message" />
            <form
              className="surface-card mt-8 space-y-5 p-6 md:p-8"
              onSubmit={(event) => {
                event.preventDefault();
                setSubmitting(true);
                const form = event.currentTarget;
                setTimeout(() => {
                  setSubmitting(false);
                  form.reset();
                  toast.success("Message sent", {
                    description: `Routed to the ${category} team. You'll get a reply by email.`,
                  });
                }, 400);
              }}
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="contact-name">Name</Label>
                  <Input id="contact-name" name="name" required placeholder="Full name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-email">Email</Label>
                  <Input id="contact-email" name="email" type="email" required placeholder="you@email.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-org">Organisation (optional)</Label>
                  <Input id="contact-org" name="organisation" placeholder="Company, campus or community" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-category">Category</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger id="contact-category" className="w-full">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {contactCategories.map((item) => (
                        <SelectItem key={item} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-subject">Subject</Label>
                <Input id="contact-subject" name="subject" required placeholder="One line summary" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-message">Message</Label>
                <Textarea id="contact-message" name="message" rows={6} required placeholder="Give us the details." />
              </div>
              <Button type="submit" size="lg" disabled={submitting} className="min-h-12 w-full rounded-full">
                {submitting ? "Sending…" : "Send message"}
              </Button>
              <p className="text-xs text-muted-foreground">
                We reply to enquiries in the order received. Community and event questions are usually answered fastest.
              </p>
            </form>
          </div>

          <aside className="space-y-5">
            <div className="surface-card p-6">
              <h2 className="font-display text-base font-bold text-navy">Where to write</h2>
              <ul className="mt-4 space-y-3 text-sm">
                <li>
                  <p className="font-display text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">
                    General
                  </p>
                  <a href={`mailto:${brand.email}`} className="text-primary hover:underline">
                    {brand.email}
                  </a>
                </li>
                <li>
                  <p className="font-display text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">
                    Base
                  </p>
                  <p className="text-foreground">{brand.location}</p>
                </li>
              </ul>
            </div>

            <div className="surface-card p-6">
              <h2 className="font-display text-base font-bold text-navy">Community channels</h2>
              <ul className="mt-4 space-y-2 text-sm">
                {socialLinks.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-primary hover:underline">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="surface-card p-6">
              <h2 className="font-display text-base font-bold text-navy">Response times</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Community and event enquiries: 2–3 working days. Partnership and sponsorship enquiries are scoped
                on a call, usually within a week.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
