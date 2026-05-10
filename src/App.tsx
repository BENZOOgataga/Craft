import { Nav } from "@/components/layout/Nav";
import { Hero } from "@/components/showcase/Hero";
import { FeatureGrid } from "@/components/showcase/FeatureGrid";
import { ComponentLab } from "@/components/showcase/ComponentLab";
import { MotionShowcase } from "@/components/showcase/MotionShowcase";
import { DashboardPreview } from "@/components/showcase/DashboardPreview";
import { UXPatterns } from "@/components/showcase/UXPatterns";
import { ResponsiveShowcase } from "@/components/showcase/ResponsiveShowcase";
import { ExperimentalSection } from "@/components/showcase/ExperimentalSection";
import { FinalCTA } from "@/components/showcase/FinalCTA";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function App() {
  return (
    <TooltipProvider>
      <div className="relative min-h-screen bg-background text-foreground">
        <Nav />
        <main>
          <Hero />
          <FeatureGrid />
          <ComponentLab />
          <MotionShowcase />
          <DashboardPreview />
          <UXPatterns />
          <ResponsiveShowcase />
          <ExperimentalSection />
          <FinalCTA />
        </main>
        <Toaster />
      </div>
    </TooltipProvider>
  );
}
