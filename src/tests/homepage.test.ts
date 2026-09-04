import { describe, it, expect } from "vitest";
import { HomepageService } from "../features/home/services/homepage.service";
import { HomepageViewModelSchema } from "../features/home/schemas/homepage.schema";

describe("OrigoHOST Ecosystem Homepage Architecture & ViewModel", () => {
  it("HomepageService.getHomepageData() should return a valid HomepageViewModel with exploreTechnology", async () => {
    const viewModel = await HomepageService.getHomepageData();

    expect(viewModel).toBeDefined();
    expect(viewModel.hero).toHaveProperty("title");
    expect(viewModel.hero.title).toContain("Where Technology Communities Come Together");

    expect(Array.isArray(viewModel.participation.pillars)).toBe(true);
    expect(viewModel.participation.pillars.length).toBe(4);

    expect(viewModel.exploreTechnology).toHaveProperty("domains");
    expect(Array.isArray(viewModel.exploreTechnology.domains)).toBe(true);
    expect(viewModel.exploreTechnology.domains.length).toBeGreaterThan(0);

    expect(Array.isArray(viewModel.featuredEvents.events)).toBe(true);
    expect(viewModel.featuredEvents.events.length).toBeGreaterThan(0);

    expect(viewModel.technologyIndustry).toHaveProperty("highlights");
    expect(Array.isArray(viewModel.technologyIndustry.highlights)).toBe(true);
  });

  it("HomepageViewModel should pass Zod schema validation", async () => {
    const viewModel = await HomepageService.getHomepageData();
    const parsed = HomepageViewModelSchema.safeParse(viewModel);

    expect(parsed.success).toBe(true);
  });
});
