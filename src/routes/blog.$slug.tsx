import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/blog/$slug")({
  component: BlogPostPage,
});

function BlogPostPage() {
  const { slug } = Route.useParams();

  return (
    <PageShell
      title="Blog Post Coming Soon"
      description={`You are viewing the stub for: ${slug}`}
      breadcrumb={[{ label: "Blog", to: "/blog" }, { label: "Post" }]}
    >
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <h2 className="text-3xl font-bold mb-4">Under Construction</h2>
        <p className="text-slate-600 mb-8 max-w-lg">
          We are currently writing this blog post. Stay tuned for more updates!
        </p>
        <Button asChild variant="outline">
          <Link to="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
          </Link>
        </Button>
      </div>
    </PageShell>
  );
}
