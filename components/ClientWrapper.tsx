"use client";

import "@/lib/gsap_setup";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { createContext, RefObject, useEffect, useRef, useState } from "react";
export const ScrollSmotherContext =
  createContext<RefObject<ScrollSmoother | null> | null>(null);

const ClientWrapper = ({ children }: { children: React.ReactNode }) => {
  const scrollSmoother = useRef<ScrollSmoother | null>(null);

  useEffect(() => {
    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 2,
      effects: true,
      smoothTouch: 0.000001, // i had to set this coz there are some wierd suddent jump on mobiles witout it
    });
    // const dim = `${window.innerHeight}h, ${window.innerWidth}w`;

    // window.alert(dim);
    // smoother.paused(true);

    scrollSmoother.current = smoother;
  }, []);
  // scrollSmoother.current?.paused(true);

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
