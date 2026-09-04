import { HomepageService } from "../src/features/home/services/homepage.service.ts";
import { HomepageViewModelSchema } from "../src/features/home/schemas/homepage.schema.ts";
import { TaxonomyService } from "../src/domains/taxonomy/taxonomy.service.ts";
import { EventService } from "../src/domains/events/event.service.ts";
import { RegistrationService } from "../src/domains/registration/registration.service.ts";
import { CrmService } from "../src/domains/crm/crm.service.ts";

async function runTests() {
  console.log("🧪 Running OrigoHOST Architecture & Homepage Integration Test Suite...");

  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, testName: string) {
    if (condition) {
      console.log(` ✅ PASS: ${testName}`);
      passed++;
    } else {
      console.error(` ❌ FAIL: ${testName}`);
      failed++;
    }
  }

  try {
    // Test 1: TaxonomyService
    const formats = await TaxonomyService.getEventFormats();
    assert(Array.isArray(formats) && formats.length > 0, "TaxonomyService returns valid event formats");

    // Test 2: EventService
    const eventsRes = await EventService.getEvents({ limit: 3 });
    assert(Array.isArray(eventsRes.events), "EventService returns events array");

    // Test 3: RegistrationService
    const regRes = await RegistrationService.registerForEvent({
      eventId: "test-event-uuid",
      fullName: "Test User",
      email: "test.user@origohost.org",
    });
    assert(typeof regRes.success === "boolean", "RegistrationService handles input validation");

    // Test 4: CrmService
    const contacts = await CrmService.getContacts();
    assert(Array.isArray(contacts), "CrmService returns isolated contacts array");

    // Test 5: HomepageService getHomepageData
    const vm = await HomepageService.getHomepageData();
    assert(Boolean(vm && vm.hero && vm.hero.title), "HomepageService.getHomepageData() returns valid ViewModel");
    assert(vm.hero.title.includes("Where Technology Communities Come Together"), "Hero title matches ecosystem positioning");
    assert(Array.isArray(vm.participation.pillars) && vm.participation.pillars.length === 4, "Participation has 4 pillars");
    assert(Array.isArray(vm.featuredEvents.events) && vm.featuredEvents.events.length > 0, "Featured events returns non-empty array");

    // Test 6: Zod Schema Validation
    const parsed = HomepageViewModelSchema.safeParse(vm);
    assert(parsed.success, "HomepageViewModel passes Zod schema validation");

    console.log(`\n🎉 Test Results: ${passed} Passed, ${failed} Failed`);
    if (failed > 0) {
      process.exit(1);
    }
  } catch (err: any) {
    console.error("Fatal Test Exception:", err);
    process.exit(1);
  }
}

runTests();
