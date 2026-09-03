import { createFileRoute } from "@tanstack/react-router";
import BecomeAmbassadorPage from "@/frontend/pages/become-ambassador";

export const Route = createFileRoute("/community_/ambassadors")({
  component: BecomeAmbassadorPage,
});
