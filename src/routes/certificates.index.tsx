import { createFileRoute } from "@tanstack/react-router";
import VerifyCertificatePage from "@/frontend/pages/certificates/index";

export const Route = createFileRoute("/certificates/")({
  component: VerifyCertificatePage,
});
