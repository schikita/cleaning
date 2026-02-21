// components/blocks/home-content.tsx
"use client";

import { useEffect, useState } from "react";
import { HomeSkeleton } from "./home-skeleton";
import { HeroSection } from "./hero-section";
import { ServicesSection } from "./services-section";
import { HowItWorksSection } from "./how-it-works-section";
import { TrustSection } from "./trust-section";
import { GeographySection } from "./geography-section";
import { CtaSection } from "./cta-section";

export function HomeContent() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const t = requestAnimationFrame(() => {
      setIsReady(true);
    });

    return () => cancelAnimationFrame(t);
  }, []);

  if (!isReady) {
    return <HomeSkeleton />;
  }

  return (
    <div
      className="animate-fade-in"
      style={{
        animation: "fadeIn 0.4s ease-out",
      }}
    >
      <main>
        <HeroSection />
        <ServicesSection />
        <HowItWorksSection />
        <TrustSection />
        <GeographySection />
        <CtaSection />
      </main>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
