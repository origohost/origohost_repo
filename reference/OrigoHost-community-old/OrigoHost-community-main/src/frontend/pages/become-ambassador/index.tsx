import { AmbassadorHero } from "@/components/ambassador/hero";
import { AmbassadorBenefits } from "@/components/ambassador/benefits";
import { AmbassadorInfo } from "@/components/ambassador/info";
import { AmbassadorRewards } from "@/components/ambassador/rewards";
import { AmbassadorSwags } from "@/components/ambassador/swag";
import { AmbassadorTimelines } from "@/components/ambassador/timelines";

export default function BecomeAmbassadorMarketingPage() {
  return (
    <main className="bg-[#0A0F1C] min-h-screen">
      <AmbassadorHero />
      <AmbassadorBenefits />
      <AmbassadorSwags />
      <AmbassadorRewards />
      <AmbassadorTimelines />
      <AmbassadorInfo />
    </main>
  );
}
