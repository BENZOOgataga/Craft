import { Nav } from "@/components/layout/Nav";
import { Hero } from "@/components/showcase/Hero";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function App() {
  return (
    <TooltipProvider>
      <div className="relative min-h-screen bg-background text-foreground">
        <Nav />
        <main>
          <Hero />
          {/* Additional sections will be added here */}
          <div id="features" className="min-h-screen" />
          <div id="components" className="min-h-screen" />
          <div id="motion" className="min-h-screen" />
          <div id="dashboard" className="min-h-screen" />
          <div id="experimental" className="min-h-screen" />
        </main>
        <Toaster />
      </div>
    </TooltipProvider>
  );
}
