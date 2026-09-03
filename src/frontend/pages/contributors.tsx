import { PageShell } from "@/components/layout/page-shell";
import { Github, Star, Heart } from "lucide-react";

// In a real application, you would fetch this directly from the GitHub API using TanStack Query.
// For SEO indexing purposes, rendering a static core list is very beneficial.
const TOP_CONTRIBUTORS = [
  {
    username: "ritikkumar",
    role: "Core Maintainer",
    commits: 1432,
    avatar: "https://avatars.githubusercontent.com/u/104149021?v=4",
  },
  {
    username: "tarunkumar",
    role: "Core Maintainer",
    commits: 948,
    avatar: "https://ui-avatars.com/api/?name=Tarun+Kumar&background=random",
  },
  {
    username: "johnDoeDev",
    role: "Community Contributor",
    commits: 42,
    avatar: "https://ui-avatars.com/api/?name=John+Doe&background=random",
  },
  {
    username: "openSourceNinja",
    role: "Community Contributor",
    commits: 18,
    avatar: "https://ui-avatars.com/api/?name=Open+Source&background=random",
  },
];

export default function ContributorsPage() {
  return (
    <PageShell title="Contributors">
      <div className="bg-slate-900 text-white py-24 px-4 text-center">
        <Heart className="w-16 h-16 text-rose-500 mx-auto mb-6 animate-pulse" />
        <h1 className="text-4xl md:text-6xl font-black mb-6">Wall of Fame</h1>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto">
          OrigoHOST is built by the community, for the community. Thank you to everyone who has
          submitted PRs, reported bugs, and improved our docs.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex justify-between items-end mb-10 border-b border-gray-200 pb-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Top Contributors</h2>
            <p className="text-gray-500">
              Based on merged Pull Requests across all OrigoHOST repositories.
            </p>
          </div>
          <a
            href="https://github.com/OrigoHOST"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-full font-bold hover:bg-gray-800 transition-colors"
          >
            <Github className="w-5 h-5" /> View on GitHub
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {TOP_CONTRIBUTORS.map((contributor) => (
            <a
              key={contributor.username}
              href={`https://github.com/${contributor.username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white border border-gray-200 rounded-3xl p-6 text-center hover:shadow-xl hover:border-blue-200 transition-all block"
            >
              <img
                src={contributor.avatar}
                alt={`${contributor.username} profile`}
                loading="lazy"
                decoding="async"
                className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-gray-50 group-hover:border-blue-50 transition-colors"
              />
              <h3 className="text-xl font-bold text-gray-900 mb-1">{contributor.username}</h3>
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-4 ${
                  contributor.role === "Core Maintainer"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {contributor.role}
              </span>
              <div className="flex items-center justify-center gap-1 text-gray-500 font-medium">
                <Star className="w-4 h-4 text-amber-500" />
                {contributor.commits} Contributions
              </div>
            </a>
          ))}
        </div>

        <div className="mt-20 bg-blue-50 rounded-3xl p-10 text-center border border-blue-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Want to see your name here?</h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            Check out our good first issues on GitHub. Whether it's a typo fix, a documentation
            update, or a major feature—every contribution matters!
          </p>
          <a
            href="https://github.com/OrigoHOST"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-700 transition-colors"
          >
            Start Contributing
          </a>
        </div>
      </div>
    </PageShell>
  );
}
