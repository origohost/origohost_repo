import { supabase } from "@/integrations/supabase/client";

export interface CrmContact {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
  company_name?: string;
  job_title?: string;
  status: string;
  source: string;
  notes?: string;
  created_at: string;
}

export interface CrmLead {
  id: string;
  contact_id?: string;
  organization_id?: string;
  title: string;
  estimated_value: number;
  stage: string;
  probability: number;
  created_at: string;
}

export interface CrmOrganization {
  id: string;
  name: string;
  domain?: string;
  industry?: string;
  company_size?: string;
  status: string;
  created_at: string;
}

export class CrmService {
  /**
   * Fetch contacts with optional status filter
   */
  static async getContacts(status?: string): Promise<CrmContact[]> {
    let query = supabase.from("crm_contacts").select("*").order("created_at", { ascending: false });
    if (status) {
      query = query.eq("status", status);
    }
    const { data, error } = await query;
    if (error) {
      console.warn("CrmService: Error fetching contacts:", error.message);
      return [];
    }
    return data || [];
  }

  /**
   * Fetch leads with pipeline stage breakdown
   */
  static async getLeads(): Promise<CrmLead[]> {
    const { data, error } = await supabase
      .from("crm_leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.warn("CrmService: Error fetching leads:", error.message);
      return [];
    }
    return data || [];
  }

  /**
   * Create a new CRM contact
   */
  static async createContact(contact: Partial<CrmContact>): Promise<CrmContact | null> {
    const { data, error } = await supabase
      .from("crm_contacts")
      .insert({
        email: contact.email?.toLowerCase().trim(),
        full_name: contact.full_name?.trim(),
        phone: contact.phone || null,
        company_name: contact.company_name || null,
        job_title: contact.job_title || null,
        status: contact.status || "lead",
        source: contact.source || "website",
      })
      .select()
      .single();

    if (error) {
      console.error("CrmService: Error creating contact:", error.message);
      return null;
    }
    return data;
  }
}
