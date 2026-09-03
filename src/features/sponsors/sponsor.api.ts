import { supabase } from "@/integrations/supabase/client";
import { secureUploadFn } from "@/actions/upload";

export interface SponsorApplicationData {
  company_name: string;
  website: string;
  company_type?: string;
  industry?: string;
  company_size?: string;
  gst_number?: string;
  linkedin_company?: string;
  headquarters?: string;
  country?: string;

  contact_name: string;
  contact_designation: string;
  contact_email: string;
  contact_phone: string;
  contact_linkedin?: string;
  preferred_communication?: string;

  interested_in?: string[];
  budget_range?: string;
  timeline?: string;
  goals?: string[];
  resources_provided?: string[];

  detailed_message?: string;
  special_requirements?: string;
  expected_roi?: string;
  previous_experience?: string;

  logo_url?: string;
  brand_kit_url?: string;
  proposal_pdf_url?: string;
  marketing_assets_url?: string;
}

export const sponsorApi = {
  /**
   * Submit a new sponsor application
   */
  async submitApplication(data: SponsorApplicationData) {
    const { data: response, error } = await supabase
      .from("sponsor_applications")
      .insert([data])
      .select()
      .single();

    if (error) {
      console.error("Failed to submit sponsor application:", error);
      throw new Error(error.message);
    }
    return response;
  },

  /**
   * Upload an asset for the sponsor application
   * @param file File to upload
   * @param category e.g., 'logos', 'pdfs'
   * @returns URL of the uploaded file
   */
  async uploadAsset(file: File, category: string) {
    const fileExt = file.name.split(".").pop()?.toLowerCase();
    const isPdf = fileExt === "pdf";
    const allowedType = isPdf ? "pdf" : "image";

    // Read file as base64 to send via server fn
    const base64Data = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

    const res = await secureUploadFn({
      data: {
        fileData: base64Data,
        fileName: file.name,
        mimeType: file.type,
        bucket: "sponsor_assets",
        allowedType,
      },
    });

    if (!res || !res.success) {
      throw new Error("Failed to upload sponsor asset securely.");
    }

    let publicUrl = res.path;
    if (res.provider !== "cloudinary") {
      const { data } = supabase.storage.from("sponsor_assets").getPublicUrl(res.path);
      publicUrl = data.publicUrl;
    }

    return publicUrl;
  },

  /**
   * Fetch all applications for Admin Dashboard
   */
  async getApplications(limit = 50) {
    const { data, error } = await supabase
      .from("sponsor_applications")
      .select("id, company_name, industry, contact_name, contact_email, status, created_at")
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) {
      console.error("Failed to fetch sponsor applications:", error);
      throw new Error(error.message);
    }
    return data;
  },

  /**
   * Update the status of an application
   */
  async updateStatus(id: string, status: "pending" | "in_review" | "approved" | "rejected") {
    const { data, error } = await supabase
      .from("sponsor_applications")
      .update({ status })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Failed to update sponsor application status:", error);
      throw new Error(error.message);
    }
    return data;
  },

  /**
   * Add an internal note to an application
   */
  async addInternalNote(id: string, internal_notes: string) {
    const { data, error } = await supabase
      .from("sponsor_applications")
      .update({ internal_notes })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Failed to add internal note to sponsor application:", error);
      throw new Error(error.message);
    }
    return data;
  },
};
