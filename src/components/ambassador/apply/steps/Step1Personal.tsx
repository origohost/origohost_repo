import { useFormContext } from "react-hook-form";
import type { AmbassadorApplicationData } from "../schema";

export function Step1Personal() {
  const {
    register,
    formState: { errors },
  } = useFormContext<AmbassadorApplicationData>();

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-3xl font-black text-gray-900 mb-2">Personal Information</h3>
        <p className="text-gray-500">Let's start with the basics. Tell us who you are.</p>
      </div>

      <div className="space-y-5">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
          <input
            {...register("full_name")}
            type="text"
            className="w-full px-5 py-3 rounded-xl border border-gray-200 text-gray-900 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            placeholder="John Doe"
          />
          {errors.full_name && (
            <p className="text-red-500 text-sm mt-1">{errors.full_name.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Date of Birth</label>
            <input
              {...register("dob")}
              type="date"
              className="w-full px-5 py-3 rounded-xl border border-gray-200 text-gray-900 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
            {errors.dob && <p className="text-red-500 text-sm mt-1">{errors.dob.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Gender</label>
            <select
              {...register("gender")}
              className="w-full px-5 py-3 rounded-xl border border-gray-200 text-gray-900 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="non-binary">Non-binary</option>
              <option value="prefer-not-to-say">Prefer not to say</option>
            </select>
            {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Nationality</label>
          <input
            {...register("nationality")}
            type="text"
            className="w-full px-5 py-3 rounded-xl border border-gray-200 text-gray-900 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            placeholder="e.g. Indian, American"
          />
          {errors.nationality && (
            <p className="text-red-500 text-sm mt-1">{errors.nationality.message}</p>
          )}
        </div>
      </div>
    </div>
  );
}
