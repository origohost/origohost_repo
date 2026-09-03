import { foundersContent } from "@/features/cms/content/founders";

// @ts-nocheck
import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import type { AnchorHTMLAttributes, ReactNode, ElementType } from "react";
import { createElement } from "react";

vi.mock("@tanstack/react-router", () => ({
  createFileRoute: (_p: string) => (config: Record<string, unknown>) => ({ options: config }),
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

const MOTION_KEYS = new Set([
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
      for (const [k, v] of Object.entries(rest)) if (!MOTION_KEYS.has(k)) cleaned[k] = v;
      return createElement(tag, cleaned, children);
    };
  return {
    motion: new Proxy({} as Record<string, ReturnType<typeof factory>>, {
      get: (_t, prop: string) => factory(prop as ElementType),
    }),
    AnimatePresence: ({ children }: { children?: ReactNode }) => <>{children}</>,
    useInView: () => true,
    useMotionValue: (v: number) => ({ get: () => v, set: () => {} }),
    useSpring: (v: unknown) => v,
    useScroll: () => ({ scrollYProgress: { get: () => 0, set: () => {} } }),
    useTransform: (v: unknown) => v,
    animate: () => ({ stop: () => {} }),
    useReducedMotion: () => false,
  };
});

import AboutPage from "@/frontend/pages/about";
import { aboutContent } from "@/features/cms/content/about";

describe("/about page — founders", () => {
  it("renders Ritik's name, role, bio and photo from the CMS", () => {
    render(<AboutPage />);
    expect(screen.getByText("Ritik Kumar")).toBeInTheDocument();
    expect(screen.getByText("Co-Founder & Community Director")).toBeInTheDocument();

    const ritik = foundersContent.profiles.find((f) => f.name === "Ritik Kumar")!;
    expect(ritik.avatarUrl).toBeTruthy();
    expect(ritik.biography).toContain("Binarize Technologies");

    const img = screen.getByAltText(
      /Ritik Kumar — Co-Founder & Community Director/,
    ) as HTMLImageElement;
    expect(img.tagName).toBe("IMG");
    expect(img.getAttribute("src")).toBe(ritik.avatarUrl);
  });

  it("falls back to initials (honorific-stripped, no periods) when the avatar image fails", () => {
    render(<AboutPage />);
    const img = screen.getByAltText(
      /Ritik Kumar — Co-Founder & Community Director/,
    ) as HTMLImageElement;
    fireEvent.error(img);
    const fallback = screen.getByLabelText(/Ritik Kumar — Co-Founder & Community Director/);
    expect(fallback).toBeInTheDocument();
    expect(fallback.textContent).toBe("RK");
    expect(fallback.textContent).not.toContain(".");
  });

  it("renders the Tarun Kumar avatar image when avatarUrl is provided", async () => {
    const tarun = foundersContent.profiles.find((f) => f.name === "Tarun Kumar");
    expect(tarun?.avatarUrl).toBeDefined();
    expect(tarun?.role).toBe("Founder & Community President");
  });

  it("renders the Ritik Kumar avatar image when avatarUrl is provided", async () => {
    const ritik = foundersContent.profiles.find((f) => f.name === "Ritik Kumar");
    expect(ritik?.avatarUrl).toBeDefined();
    expect(ritik?.role).toBe("Co-Founder & Community Director");
  });
});
