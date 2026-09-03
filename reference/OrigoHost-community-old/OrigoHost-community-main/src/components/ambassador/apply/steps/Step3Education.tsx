import { useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import type { AmbassadorApplicationData } from "../schema";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

const COLLEGES = [
  "Stanford University",
  "Massachusetts Institute of Technology (MIT)",
  "Harvard University",
  "California Institute of Technology (Caltech)",
  "University of Oxford",
  "University of Cambridge",
  "Indian Institute of Technology (IIT) Bombay",
  "Indian Institute of Technology (IIT) Delhi",
  "Indian Institute of Technology (IIT) Madras",
  "GL Bajaj Institute of Technology and Management",
  "Birla Institute of Technology and Science (BITS) Pilani",
  "Vellore Institute of Technology (VIT)",
  "Delhi Technological University (DTU)",
  "National Institute of Technology (NIT) Trichy",
  "Other (Please specify)",
];

const BRANCHES = [
  "Computer Science & Engineering",
  "Information Technology",
  "Electronics and Communication Engineering",
  "Electrical and Electronics Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
  "Data Science & Analytics",
  "Artificial Intelligence & Machine Learning",
  "Business Administration (BBA/MBA)",
  "Economics",
  "Design / UI/UX",
  "Other (Please specify)",
];

export function Step3Education() {
  const {
    register,
    control,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<AmbassadorApplicationData>();

  const [collegeOpen, setCollegeOpen] = useState(false);
  const [branchOpen, setBranchOpen] = useState(false);

  const watchUniversity = watch("education.university");
  const watchMajor = watch("education.major");

  const isCollegeSelected = COLLEGES.includes(watchUniversity || "");
  const isBranchSelected = BRANCHES.includes(watchMajor || "");

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-3xl font-black text-gray-900 mb-2">Education Details</h3>
        <p className="text-gray-500">Tell us about your college or university.</p>
      </div>

      <div className="space-y-5">
        <div className="flex flex-col gap-2">
          <label className="block text-sm font-bold text-gray-700">
            College / University Name *
          </label>
          <Controller
            name="education.university"
            control={control}
            render={({ field }) => (
              <Popover open={collegeOpen} onOpenChange={setCollegeOpen}>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    role="combobox"
                    aria-expanded={collegeOpen}
                    className={cn(
                      "w-full flex items-center justify-between px-5 py-3 rounded-xl border text-left transition-all",
                      field.value && isCollegeSelected
                        ? "bg-blue-50 border-blue-500 text-blue-900 font-medium"
                        : "bg-gray-50 border-gray-200 text-gray-900 hover:bg-gray-100",
                      errors.education?.university && "border-red-500 focus:ring-red-500",
                    )}
                  >
                    <span className="truncate">{field.value || "Select or search college..."}</span>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
                  <Command>
                    <CommandInput
                      placeholder="Search college..."
                      onValueChange={(val) => {
                        // Allow custom typing if not in list
                        if (val && !COLLEGES.includes(val)) {
                          field.onChange(val);
                        }
                      }}
                    />
                    <CommandList>
                      <CommandEmpty>No college found. You can keep typing to add it.</CommandEmpty>
                      <CommandGroup>
                        {COLLEGES.map((college) => (
                          <CommandItem
                            key={college}
                            value={college}
                            onSelect={(currentValue) => {
                              field.onChange(currentValue);
                              setCollegeOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                field.value === college ? "opacity-100 text-blue-600" : "opacity-0",
                              )}
                            />
                            {college}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            )}
          />
          {errors.education?.university && (
            <p className="text-red-500 text-sm mt-1">{errors.education.university.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="flex flex-col gap-2">
            <label className="block text-sm font-bold text-gray-700">Degree *</label>
            <select
              {...register("education.degree")}
              className="w-full px-5 py-3 rounded-xl border border-gray-200 text-gray-900 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            >
              <option value="">Select Degree</option>
              <optgroup label="Bachelors">
                <option value="B.Tech/B.E">B.Tech / B.E</option>
                <option value="BCA">BCA</option>
                <option value="B.Sc">B.Sc</option>
                <option value="BBA">BBA</option>
                <option value="B.Com">B.Com</option>
                <option value="BA">BA</option>
              </optgroup>
              <optgroup label="Masters">
                <option value="M.Tech/M.E">M.Tech / M.E</option>
                <option value="MCA">MCA</option>
                <option value="M.Sc">M.Sc</option>
                <option value="MBA">MBA</option>
              </optgroup>
              <optgroup label="Other">
                <option value="Diploma">Diploma</option>
                <option value="PhD">PhD</option>
                <option value="Other">Other</option>
              </optgroup>
            </select>
            {errors.education?.degree && (
              <p className="text-red-500 text-sm mt-1">{errors.education.degree.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="block text-sm font-bold text-gray-700">Branch / Major *</label>
            <Controller
              name="education.major"
              control={control}
              render={({ field }) => (
                <Popover open={branchOpen} onOpenChange={setBranchOpen}>
                  <PopoverTrigger asChild>
                    <button
                      type="button"
                      role="combobox"
                      aria-expanded={branchOpen}
                      className={cn(
                        "w-full flex items-center justify-between px-5 py-3 rounded-xl border text-left transition-all",
                        field.value && isBranchSelected
                          ? "bg-blue-50 border-blue-500 text-blue-900 font-medium"
                          : "bg-gray-50 border-gray-200 text-gray-900 hover:bg-gray-100",
                        errors.education?.major && "border-red-500 focus:ring-red-500",
                      )}
                    >
                      <span className="truncate">
                        {field.value || "Select or search branch..."}
                      </span>
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
                    <Command>
                      <CommandInput
                        placeholder="Search branch..."
                        onValueChange={(val) => {
                          if (val && !BRANCHES.includes(val)) {
                            field.onChange(val);
                          }
                        }}
                      />
                      <CommandList>
                        <CommandEmpty>No branch found. You can keep typing to add it.</CommandEmpty>
                        <CommandGroup>
                          {BRANCHES.map((branch) => (
                            <CommandItem
                              key={branch}
                              value={branch}
                              onSelect={(currentValue) => {
                                field.onChange(currentValue);
                                setBranchOpen(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  field.value === branch
                                    ? "opacity-100 text-blue-600"
                                    : "opacity-0",
                                )}
                              />
                              {branch}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              )}
            />
            {errors.education?.major && (
              <p className="text-red-500 text-sm mt-1">{errors.education.major.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="flex flex-col gap-2">
            <label className="block text-sm font-bold text-gray-700">
              Current Semester / Year *
            </label>
            <select
              {...register("education.yearOfStudy")}
              className="w-full px-5 py-3 rounded-xl border border-gray-200 text-gray-900 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            >
              <option value="">Select Year</option>
              <option value="1">1st Year</option>
              <option value="2">2nd Year</option>
              <option value="3">3rd Year</option>
              <option value="4">4th Year</option>
              <option value="5+">5th Year+</option>
            </select>
            {errors.education?.yearOfStudy && (
              <p className="text-red-500 text-sm mt-1">{errors.education.yearOfStudy.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="block text-sm font-bold text-gray-700">Graduation Year *</label>
            <input
              {...register("education.expectedGraduation")}
              type="number"
              min={2024}
              max={2030}
              className="w-full px-5 py-3 rounded-xl border border-gray-200 text-gray-900 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="2026"
            />
            {errors.education?.expectedGraduation && (
              <p className="text-red-500 text-sm mt-1">
                {errors.education.expectedGraduation.message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
