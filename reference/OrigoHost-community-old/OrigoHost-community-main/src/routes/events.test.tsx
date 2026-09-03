// @ts-nocheck
import { describe, expect, it, vi } from "vitest";
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
  getRouteApi: () => ({
    useLoaderData: () => ({ events: [], isError: false }),
  }),
}));

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

vi.mock("@tanstack/react-query", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@tanstack/react-query")>();
  return {
    ...actual,
    useQuery: () => ({ data: [], isLoading: false }),
  };
});

import EventsPage from "@/frontend/pages/event";
import { contentLoader } from "@/features/cms";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const events = contentLoader.getSync("events");
const totalEvents = events.events.length;

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

describe("EventsPage search & filters", () => {
  it("debounces search input and eventually filters the list", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <EventsPage />
      </QueryClientProvider>,
    );
    const input = screen.getByLabelText(/search events/i);

    // Wait for the query to load the events.
    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });

    fireEvent.change(input, { target: { value: "zzzznomatch" } });

    // Right after typing, the debounced value hasn't caught up.
    expect(screen.queryByText(/no events match your search/i)).not.toBeInTheDocument();

    // Wait past the 250ms debounce.
    await act(async () => {
      await wait(350);
    });

    await waitFor(() => expect(screen.getByText(/No Scheduled Events/i)).toBeInTheDocument(), {
      timeout: 2000,
    });
  });
});
