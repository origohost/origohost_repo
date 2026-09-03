import { useFormContext } from "react-hook-form";
import type { AmbassadorApplicationData } from "../schema";

export function Step2Contact() {
  const {
    register,
    formState: { errors },
  } = useFormContext<AmbassadorApplicationData>();

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-3xl font-black text-gray-900 mb-2">Contact Details</h3>
        <p className="text-gray-500">How can we reach you? Where do you live?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
          <input
            {...register("email")}
            type="email"
            className="w-full px-5 py-3 rounded-xl border border-gray-200 text-gray-900 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            placeholder="john@example.com"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
          <input
            {...register("phone")}
            type="tel"
            className="w-full px-5 py-3 rounded-xl border border-gray-200 text-gray-900 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            placeholder="+1 234 567 8900"
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">
          Full Residential Address
        </label>
        <textarea
          {...register("address")}
          rows={3}
          className="w-full px-5 py-3 rounded-xl border border-gray-200 text-gray-900 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
          placeholder="123 Ambassador Street, Apt 4B"
        />
        {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">City</label>
          <input
            {...register("city")}
            type="text"
            className="w-full px-5 py-3 rounded-xl border border-gray-200 text-gray-900 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            placeholder="San Francisco"
          />
          {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">State / Province</label>
          <select
            {...register("state")}
            className="w-full px-5 py-3 rounded-xl border border-gray-200 text-gray-900 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          >
            <option value="">Select a State</option>
            <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
            <option value="Andhra Pradesh">Andhra Pradesh</option>
            <option value="Arunachal Pradesh">Arunachal Pradesh</option>
            <option value="Assam">Assam</option>
            <option value="Bihar">Bihar</option>
            <option value="Chandigarh">Chandigarh</option>
            <option value="Chhattisgarh">Chhattisgarh</option>
            <option value="Dadra and Nagar Haveli and Daman and Diu">
              Dadra and Nagar Haveli and Daman and Diu
            </option>
            <option value="Delhi">Delhi</option>
            <option value="Goa">Goa</option>
            <option value="Gujarat">Gujarat</option>
            <option value="Haryana">Haryana</option>
            <option value="Himachal Pradesh">Himachal Pradesh</option>
            <option value="Jammu and Kashmir">Jammu and Kashmir</option>
            <option value="Jharkhand">Jharkhand</option>
            <option value="Karnataka">Karnataka</option>
            <option value="Kerala">Kerala</option>
            <option value="Ladakh">Ladakh</option>
            <option value="Lakshadweep">Lakshadweep</option>
            <option value="Madhya Pradesh">Madhya Pradesh</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Manipur">Manipur</option>
            <option value="Meghalaya">Meghalaya</option>
            <option value="Mizoram">Mizoram</option>
            <option value="Nagaland">Nagaland</option>
            <option value="Odisha">Odisha</option>
            <option value="Puducherry">Puducherry</option>
            <option value="Punjab">Punjab</option>
            <option value="Rajasthan">Rajasthan</option>
            <option value="Sikkim">Sikkim</option>
            <option value="Tamil Nadu">Tamil Nadu</option>
            <option value="Telangana">Telangana</option>
            <option value="Tripura">Tripura</option>
            <option value="Uttar Pradesh">Uttar Pradesh</option>
            <option value="Uttarakhand">Uttarakhand</option>
            <option value="West Bengal">West Bengal</option>
          </select>
          {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Zip / Pincode</label>
          <input
            {...register("pincode")}
            type="text"
            className="w-full px-5 py-3 rounded-xl border border-gray-200 text-gray-900 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            placeholder="94105"
          />
          {errors.pincode && <p className="text-red-500 text-sm mt-1">{errors.pincode.message}</p>}
        </div>
      </div>
    </div>
  );
}
