import { useFormContext } from "react-hook-form";
import type { AmbassadorApplicationData } from "../schema";
import { CheckCircle2, FileText, User } from "lucide-react";

export function Step7Review() {
  const { getValues } = useFormContext<AmbassadorApplicationData>();
  const values = getValues();

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-3xl font-black text-gray-900 mb-2">Review & Submit</h3>
        <p className="text-gray-500">Please review your application carefully before submitting.</p>
      </div>

      <div className="space-y-6">
        {/* Personal Overview */}
        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
          <div className="flex items-center gap-3 mb-4 text-blue-600">
            <User className="w-5 h-5" />
            <h4 className="font-bold text-gray-900">Applicant Summary</h4>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Name</p>
              <p className="font-bold text-gray-900">{values.full_name || "Not provided"}</p>
            </div>
            <div>
              <p className="text-gray-500">Email</p>
              <p className="font-bold text-gray-900">{values.email || "Not provided"}</p>
            </div>
            <div>
              <p className="text-gray-500">University</p>
              <p className="font-bold text-gray-900">
                {values.education.university || "Not provided"}
              </p>
            </div>
            <div>
              <p className="text-gray-500">Expected Graduation</p>
              <p className="font-bold text-gray-900">
                {values.education.expectedGraduation || "Not provided"}
              </p>
            </div>
          </div>
        </div>

        {/* Note about Documents */}
        <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100 flex gap-4">
          <FileText className="w-6 h-6 text-blue-600 flex-shrink-0" />
          <div>
            <h4 className="font-bold text-blue-900 mb-1">Documents Upload</h4>
            <p className="text-sm text-blue-700">
              If your application is shortlisted, you will be asked to upload your Student ID and
              Resume via the Ambassador Dashboard in the next phase.
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-green-50 rounded-2xl p-6 border border-green-100 flex gap-4">
          <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
          <div>
            <h4 className="font-bold text-green-900 mb-1">Ready to Submit!</h4>
            <p className="text-sm text-green-700">
              By clicking submit, you confirm that all information provided is accurate. Our team
              typically reviews applications within 3-5 business days.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
