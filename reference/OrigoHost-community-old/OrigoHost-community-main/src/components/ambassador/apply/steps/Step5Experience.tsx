import { useFormContext } from "react-hook-form";
import type { AmbassadorApplicationData } from "../schema";

export function Step5Experience() {
  const {
    register,
    formState: { errors },
  } = useFormContext<AmbassadorApplicationData>();

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-3xl font-black text-gray-900 mb-2">Community Experience</h3>
        <p className="text-gray-500">We love leaders. Tell us about your past involvement.</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Previous Ambassador Roles
          </label>
          <p className="text-sm text-gray-500 mb-3">
            Have you been an ambassador for any other company? (e.g. GitHub Campus Expert, MLSA)
          </p>
          <textarea
            {...register("experience.previousAmbassador")}
            rows={3}
            className="w-full px-5 py-3 rounded-xl border border-gray-200 text-gray-900 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
            placeholder="I was a Microsoft Learn Student Ambassador for 1 year..."
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Tech Communities</label>
          <p className="text-sm text-gray-500 mb-3">
            Which tech clubs, societies, or communities are you an active part of?
          </p>
          <textarea
            {...register("experience.techCommunities")}
            rows={3}
            className="w-full px-5 py-3 rounded-xl border border-gray-200 text-gray-900 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
            placeholder="President of the University Computer Science Club..."
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Hackathons & Events</label>
          <p className="text-sm text-gray-500 mb-3">
            List any major hackathons or tech events you've organized or won.
          </p>
          <textarea
            {...register("experience.hackathons")}
            rows={3}
            className="w-full px-5 py-3 rounded-xl border border-gray-200 text-gray-900 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
            placeholder="Organized HackTheFuture 2023 with 500+ attendees..."
          />
        </div>
      </div>
    </div>
  );
}
