import { useFormContext } from "react-hook-form";
import type { AmbassadorApplicationData } from "../schema";

export function Step6Questions() {
  const {
    register,
    formState: { errors },
  } = useFormContext<AmbassadorApplicationData>();

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-3xl font-black text-gray-900 mb-2">Questionnaire</h3>
        <p className="text-gray-500">Let us understand your motivation and vision.</p>
      </div>

      <div className="space-y-8">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Why do you want to be an OrigoHOST Campus Ambassador?
          </label>
          <p className="text-sm text-gray-500 mb-3">
            Tell us what excites you about our infrastructure and community.
          </p>
          <textarea
            {...register("questions.whyOrigoHOSTs")}
            rows={5}
            className="w-full px-5 py-3 rounded-xl border border-gray-200 text-gray-900 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
            placeholder="I want to bridge the gap between enterprise cloud and student developers..."
          />
          {errors.questions?.whyOrigoHOSTs && (
            <p className="text-red-500 text-sm mt-1">{errors.questions.whyOrigoHOSTs.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            What is your strategy to promote OrigoHOST on your campus?
          </label>
          <p className="text-sm text-gray-500 mb-3">
            Be specific. Will you host workshops? Write blogs? Mentor students?
          </p>
          <textarea
            {...register("questions.strategy")}
            rows={5}
            className="w-full px-5 py-3 rounded-xl border border-gray-200 text-gray-900 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
            placeholder="I plan to host a monthly Cloud Architecture workshop utilizing the OrigoHOST free tier..."
          />
          {errors.questions?.strategy && (
            <p className="text-red-500 text-sm mt-1">{errors.questions.strategy.message}</p>
          )}
        </div>
      </div>
    </div>
  );
}
