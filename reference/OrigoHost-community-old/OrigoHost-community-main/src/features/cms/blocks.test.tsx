import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import type { AnchorHTMLAttributes, ReactNode, ElementType } from "react";
import { createElement } from "react";

// Mock TanStack Router's <Link /> so blocks render without a full router.
vi.mock("@tanstack/react-router", () => ({
  Link: ({
    to,
    children,
    ...rest
  }: AnchorHTMLAttributes<HTMLAnchorElement> & { to: string; children?: ReactNode }) => (
    <a href={to} {...rest}>
      {children}
    </a>
  ),
}));

// Framer Motion's `whileInView` doesn't fire in jsdom; render as plain elements.
const MOTION_PROP_KEYS = new Set([
  "initial",
  "animate",
  "exit",
  "transition",
  "whileInView",
  "whileHover",
  "whileTap",
  "viewport",
  "layout",
  "layoutId",
]);

vi.mock("framer-motion", () => {
  const factory =
    (tag: ElementType) =>
    ({ children, ...rest }: Record<string, unknown> & { children?: ReactNode }) => {
      const cleaned: Record<string, unknown> = {};
      for (const [k, v] of Object.entries(rest)) {
        if (!MOTION_PROP_KEYS.has(k)) cleaned[k] = v;
      }
      return createElement(tag, cleaned, children);
    };
  return {
    motion: new Proxy({} as Record<string, ReturnType<typeof factory>>, {
      get: (_target, prop: string) => factory(prop as ElementType),
    }),
    AnimatePresence: ({ children }: { children?: ReactNode }) => <>{children}</>,
  };
});

// Import after mocks are registered.
import { EventCard, JobCard, GalleryAlbumCard, PartnerTrackCard, LegalSectionList } from "./blocks";
import type {
  EventBlock,
  JobBlock,
  GalleryAlbumBlock,
  PartnerTrackBlock,
  LegalSectionBlock,
} from "./types";

describe("CMS block renderers", () => {
  it("EventCard shows title, mode badge, city and time", () => {
    const event: EventBlock = {
      id: "e1",
      title: "Kubernetes Deep Dive",
      city: "Bengaluru",
      time: "10:00 AM",
      month: "MAY",
      day: "25",
      mode: "OFFLINE",
      category: "Workshops",
    };
    render(<EventCard event={event} />);
    expect(screen.getByText("Kubernetes Deep Dive")).toBeInTheDocument();
    expect(screen.getByText("OFFLINE")).toBeInTheDocument();
    expect(screen.getByText("Bengaluru")).toBeInTheDocument();
    expect(screen.getByText("10:00 AM")).toBeInTheDocument();
    expect(screen.getByText("25")).toBeInTheDocument();
  });

  it("JobCard renders role, company, location and tags", () => {
    const job: JobBlock = {
      id: "j1",
      role: "Senior SRE",
      company: "Origo Cloud",
      location: "Remote — India",
      type: "Full-time",
      tags: ["Kubernetes", "Go"],
    };
    render(<JobCard job={job} />);
    expect(screen.getByText("Senior SRE")).toBeInTheDocument();
    expect(screen.getByText("Origo Cloud")).toBeInTheDocument();
    expect(screen.getByText("Remote — India")).toBeInTheDocument();
    expect(screen.getByText("Kubernetes")).toBeInTheDocument();
    expect(screen.getByText("Go")).toBeInTheDocument();
  });

  it("GalleryAlbumCard shows title, category and photo count", () => {
    const album: GalleryAlbumBlock = {
      id: "g1",
      title: "Summit 2025",
      category: "Events",
      count: 42,
      tone: "from-orange-400 to-amber-500",
    };
    render(<GalleryAlbumCard album={album} />);
    expect(screen.getByText("Summit 2025")).toBeInTheDocument();
    expect(screen.getByText("Events")).toBeInTheDocument();
    expect(screen.getByText("42 photos")).toBeInTheDocument();
  });

  it("PartnerTrackCard renders title and body", () => {
    const track: PartnerTrackBlock = {
      icon: "Handshake",
      title: "Academic Partners",
      body: "Colleges and universities co-hosting programs.",
    };
    render(<PartnerTrackCard track={track} />);
    expect(screen.getByText("Academic Partners")).toBeInTheDocument();
    expect(screen.getByText("Colleges and universities co-hosting programs.")).toBeInTheDocument();
  });

  it("LegalSectionList renders every section title and body", () => {
    const sections: LegalSectionBlock[] = [
      { title: "Scope", body: "This policy covers …" },
      { title: "Data", body: "We store …" },
    ];
    render(<LegalSectionList sections={sections} />);
    expect(screen.getByText("Scope")).toBeInTheDocument();
    expect(screen.getByText("Data")).toBeInTheDocument();
    expect(screen.getByText("This policy covers …")).toBeInTheDocument();
  });
});
