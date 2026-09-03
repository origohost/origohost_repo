import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/become-a-sponsor")({
  beforeLoad: () => {
    throw redirect({
      to: "/sponsor",
      statusCode: 301,
    });
  },
});
