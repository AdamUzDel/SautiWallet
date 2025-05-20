import { OnboardingScreen } from "@/components/onboarding-screen"
import { unstable_noStore as noStore } from "next/cache"

export const dynamic = "force-dynamic"

export default function Home() {
  // This prevents the page from being statically generated
  noStore()

  return <OnboardingScreen />
}
