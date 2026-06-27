import { LandingFooter } from "@/components/landing-footer";
import { LandingHome } from "@/components/landing/landing-home";
import { LandingNavbar } from "@/components/landing-navbar";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-canvas text-ink selection:bg-coral/20 selection:text-coral-active">
      <LandingNavbar />
      <LandingHome />
      <LandingFooter />
    </div>
  );
}
