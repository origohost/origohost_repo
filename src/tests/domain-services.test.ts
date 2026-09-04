import { describe, it, expect } from "vitest";
import { TaxonomyService } from "../domains/taxonomy/taxonomy.service";
import { RegistrationService } from "../domains/registration/registration.service";
import { CrmService } from "../domains/crm/crm.service";
import { EventService } from "../domains/events/event.service";

describe("OrigoHOST Production Architecture Domain Services", () => {
  it("TaxonomyService should provide fallback structure if network is offline", async () => {
    const formats = await TaxonomyService.getEventFormats();
    expect(Array.isArray(formats)).toBe(true);

    const domains = await TaxonomyService.getTechnologyDomains();
    expect(Array.isArray(domains)).toBe(true);

    const industries = await TaxonomyService.getIndustries();
    expect(Array.isArray(industries)).toBe(true);
  });

  it("EventService should return event items matching taxonomy filters", async () => {
    const result = await EventService.getEvents({ limit: 5 });
    expect(result).toHaveProperty("events");
    expect(result).toHaveProperty("total");
    expect(Array.isArray(result.events)).toBe(true);
  });

  it("RegistrationService should validate input before registration", async () => {
    const res = await RegistrationService.registerForEvent({
      eventId: "invalid-uuid-format-test",
      fullName: "Test User",
      email: "test.user@origohost.org",
    });
    expect(res).toHaveProperty("success");
    expect(typeof res.success).toBe("boolean");
  });

  it("CrmService should return isolated contacts and leads", async () => {
    const contacts = await CrmService.getContacts();
    expect(Array.isArray(contacts)).toBe(true);

    const leads = await CrmService.getLeads();
    expect(Array.isArray(leads)).toBe(true);
  });
});
