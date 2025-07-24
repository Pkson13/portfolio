"use client";

import "@/lib/gsap_setup";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { createContext, useEffect, useState } from "react";
export const ScrollSmotherContext = createContext<ScrollSmoother | null>(null);

const ClientWrapper = ({ children }: { children: React.ReactNode }) => {
  const [scrollSmoother, setScrollSmoother] = useState<ScrollSmoother | null>(
    null,
  );

  useEffect(() => {
    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 2,
      effects: true,
      smoothTouch: 0.01,
    });

    setScrollSmoother(smoother);
  }, []);

  // smoother.scrollTo("#projects", true, "center center");
  return (
    <>
      <ScrollSmotherContext.Provider value={scrollSmoother}>
        {children}
      </ScrollSmotherContext.Provider>
    </>
  );
};

export default ClientWrapper;
