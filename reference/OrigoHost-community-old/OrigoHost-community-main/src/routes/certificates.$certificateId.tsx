import { createFileRoute } from "@tanstack/react-router";
import CertificatePage from "@/frontend/pages/certificates/detail";

export const Route = createFileRoute("/certificates/$certificateId")({
  component: CertificatePage,
});
