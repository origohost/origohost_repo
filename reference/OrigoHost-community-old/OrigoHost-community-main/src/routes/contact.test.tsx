// @ts-nocheck
import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import type { ReactNode, AnchorHTMLAttributes } from "react";
import { createElement } from "react";

vi.mock("@tanstack/react-router", () => ({
  createFileRoute: () => (config: unknown) => ({ options: config }),
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

vi.mock("@tanstack/react-start", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    createServerFn: () => ({
      validator: () => ({
        handler: () => async () => ({
          success: true,
          warning: "Saved, but email notification failed.",
        }),
      }),
    }),
  };
});

vi.mock("framer-motion", () => {
  const DROP = new Set([
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
  const factory =
    (tag: string) =>
    ({ children, ...rest }: Record<string, unknown> & { children?: ReactNode }) => {
      const clean: Record<string, unknown> = {};
      for (const [k, v] of Object.entries(rest)) if (!DROP.has(k)) clean[k] = v;
      return createElement(tag, clean, children as ReactNode);
    };
  return {
    motion: new Proxy({} as Record<string, ReturnType<typeof factory>>, {
      get: (_t, p: string) => factory(p),
    }),
    AnimatePresence: ({ children }: { children?: ReactNode }) => <>{children}</>,
  };
});

const { toastSpy, insertMock } = vi.hoisted(() => ({
  toastSpy: { success: vi.fn(), error: vi.fn() },
  insertMock: vi.fn(async () => ({ error: null })),
}));
vi.mock("sonner", () => ({ toast: toastSpy }));
vi.mock("@/integrations/supabase/client", () => ({
  supabase: { from: () => ({ insert: insertMock }) },
}));
vi.mock("@/components/ui/captcha", () => ({
  TurnstileCaptcha: ({ onVerify }: any) => {
    if (onVerify) setTimeout(() => onVerify("mock-token"), 10);
    return <div data-testid="captcha" />;
  },
}));

import ContactPage from "@/frontend/pages/contact";

describe("ContactPage form", () => {
  beforeEach(() => {
    toastSpy.success.mockClear();
  });

  it("shows Zod validation errors when submitting an empty form", async () => {
    render(<ContactPage />);
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /send message/i }));
    });

    expect(await screen.findByText(/please enter your full name/i)).toBeInTheDocument();
    expect(screen.getByText(/enter a valid email address/i)).toBeInTheDocument();
    expect(screen.getByText(/at least 10 characters/i)).toBeInTheDocument();

    expect(screen.getByLabelText(/full name/i)).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByLabelText(/email address/i)).toHaveAttribute("aria-invalid", "true");
    expect(toastSpy.success).not.toHaveBeenCalled();
  });

  it.skip("submits successfully with valid values", async () => {
    render(<ContactPage />);
    fireEvent.input(screen.getByLabelText(/full name/i), { target: { value: "Jane Doe" } });
    fireEvent.input(screen.getByLabelText(/email address/i), {
      target: { value: "jane@example.com" },
    });
    fireEvent.input(screen.getByLabelText(/your message/i), {
      target: { value: "Hello team, I would like to partner with you on an event." },
    });

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /send message/i }));
    });

    await waitFor(() => expect(toastSpy.success).toHaveBeenCalledTimes(1), {
      timeout: 2000,
    });
    expect(toastSpy.success.mock.calls[0][0]).toMatch(/message sent|saved/i);
  });

  it("wires primary CTAs to the correct destinations", () => {
    render(<ContactPage />);

    const partnerLink = screen
      .getAllByRole("link")
      .find((a) => a.getAttribute("href") === "/partners");
    expect(partnerLink).toBeDefined();

    expect(screen.getAllByRole("link", { name: /get directions/i })[0]).toHaveAttribute(
      "href",
      expect.stringContaining("maps.google.com"),
    );

    expect(screen.getAllByText(/origohostscommunity@gmail\.com/).length).toBeGreaterThan(0);
    expect(screen.getByText(/@origohost/)).toBeInTheDocument();
  });
});
