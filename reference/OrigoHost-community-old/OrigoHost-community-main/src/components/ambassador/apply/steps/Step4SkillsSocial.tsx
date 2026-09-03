import { useFormContext, useFieldArray } from "react-hook-form";
import type { AmbassadorApplicationData } from "../schema";
import { Plus, X } from "lucide-react";
import { useState } from "react";

export function Step4SkillsSocial() {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<AmbassadorApplicationData>();

  const skills = watch("skills") || [];

  const [skillInput, setSkillInput] = useState("");

  const addSkill = () => {
    const trimmed = skillInput.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setValue("skills", [...skills, trimmed], { shouldValidate: true });
      setSkillInput("");
    }
  };

  const removeSkill = (index: number) => {
    const newSkills = [...skills];
    newSkills.splice(index, 1);
    setValue("skills", newSkills, { shouldValidate: true });
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-3xl font-black text-gray-900 mb-2">Skills & Social Profiles</h3>
        <p className="text-gray-500">Show us your online presence and technical stack.</p>
      </div>

      <div className="space-y-5 border-b border-gray-100 pb-8">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Technical Skills (Add at least one)
          </label>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
              className="flex-1 px-5 py-3 rounded-xl border border-gray-200 text-gray-900 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="e.g. React, Kubernetes, Community Building"
            />
            <button
              type="button"
              onClick={addSkill}
              className="px-5 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors flex items-center justify-center"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg border border-blue-100"
              >
                <span className="font-medium text-sm">{skill}</span>
                <button
                  type="button"
                  onClick={() => removeSkill(index)}
                  className="text-blue-400 hover:text-blue-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          {errors.skills && <p className="text-red-500 text-sm mt-2">{errors.skills.message}</p>}
        </div>
      </div>

      <div className="space-y-5">
        <h4 className="font-bold text-gray-900">Social Links</h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">LinkedIn URL</label>
            <input
              {...register("social.linkedin")}
              type="url"
              className="w-full px-5 py-3 rounded-xl border border-gray-200 text-gray-900 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="https://linkedin.com/in/username"
            />
            {errors.social?.linkedin && (
              <p className="text-red-500 text-sm mt-1">{errors.social.linkedin.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">GitHub URL</label>
            <input
              {...register("social.github")}
              type="url"
              className="w-full px-5 py-3 rounded-xl border border-gray-200 text-gray-900 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="https://github.com/username"
            />
            {errors.social?.github && (
              <p className="text-red-500 text-sm mt-1">{errors.social.github.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">X (Twitter) URL</label>
            <input
              {...register("social.twitter")}
              type="url"
              className="w-full px-5 py-3 rounded-xl border border-gray-200 text-gray-900 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="https://x.com/username"
            />
            {errors.social?.twitter && (
              <p className="text-red-500 text-sm mt-1">{errors.social.twitter.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Personal Portfolio</label>
            <input
              {...register("social.portfolio")}
              type="url"
              className="w-full px-5 py-3 rounded-xl border border-gray-200 text-gray-900 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="https://yourwebsite.com"
            />
            {errors.social?.portfolio && (
              <p className="text-red-500 text-sm mt-1">{errors.social.portfolio.message}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
