"use client";
import gsap from "gsap";
import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { ScrollSmoother } from "gsap/ScrollSmoother";

const Logo_scramble = () => {
  const ref = useRef<gsap.core.Tween | null>(null);
  const logoRef = useRef<HTMLAnchorElement | null>(null);

  function handleclick() {
    console.log(ref.current);
  }

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#videoshareproj",
        // pin: true,
        // pinSpacing: false,
        start: "top bottom",
        // scrub: true,
        markers: true,
        once: true,
      },
    });

    tl.from("#video-share-desc", {
      // start the animation when ".box" enters the viewport (once)
      y: 200,
      // delay: 1,
      duration: 1,
      ease: "none",
    });
    tl.from(
      "#video-share-img",
      {
        y: 200,
      },
      // "+=0.5",
    );
    // ScrollSmoother.create({
    //   wrapper: "#smooth-wrapper",
    //   content: "#smooth-content",
    //   smooth: 1,
    //   effects: true,
    //   speed: 0.5,
    //   normalizeScroll: true,
    // });
    // smoother.scrollTo("#projects", true, "center center");

    // skillstl.to(
    //   "#skill-container",
    //   {
    //     // start the animation when ".box" enters the viewport (once)
    //     rotateZ: 1,
    //     scale: 1,
    //     padding: 0,
    //     scrollTrigger: {
    //       trigger: "#scene-wrapper",
    //       start: "bottom 65%", // starts when top of scene enters bottom of viewport
    //       end: "bottom 70%", // ends when top of scene hits top of viewport
    //       scrub: 1,
    //       // markers: true,
    //       // pin: true, // pin the element during scroll
    //       // anticipatePin: 1,
    //       // once: true,
    //     },

    //     // delay: 1,
    //     duration: 3,
    //     ease: "power2.inOut",
    //   },
    //   3,
    // );

    // gsap.to(".nav", { top: 0, duration: 1 });
    // gsap.registerPlugin(ScrambleTextPlugin); moved to lib/gsap_setup.ts
    ref.current = gsap.to(logoRef.current, {
      duration: 2,
      scrambleText: {
        text: "TOP G", // final desired text
        revealDelay: 0, // delay before final letters start appearing
        speed: 1, // speed of scrambling
      },
      ease: "none",
    });
  }, []);
  return (
    <Link
      id="logo"
      className="font-(family-name:--font-bebas-neue) text-xl font-medium tracking-wider"
      href={"/"}
      onClick={handleclick}
      ref={logoRef}
    ></Link>
  );
};

export default Logo_scramble;
