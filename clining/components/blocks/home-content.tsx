"use client";

import { useEffect, useState } from "react";
import { HeroSection } from "./hero-section";
import { ServicesSection } from "./services-section";
import { HowItWorksSection } from "./how-it-works-section";
import { TrustSection } from "./trust-section";
import { GeographySection } from "./geography-section";
import { CtaSection } from "./cta-section";
import { HomeSkeleton } from "./home-skeleton";

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
    <div className="animate-fade-in">
      <main>
        <HeroSection />
        <ServicesSection />
        <HowItWorksSection />
        <TrustSection />
        <GeographySection />
        <CtaSection />
      </main>
    </div>
  );
}
