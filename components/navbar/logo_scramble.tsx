"use client";
import gsap from "gsap";
import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";

const Logo_scramble = () => {
  const ref = useRef<gsap.core.Tween | null>(null);
  const logoRef = useRef<HTMLAnchorElement | null>(null);

  function handleclick() {
    console.log(ref.current);
  }

  useGSAP(() => {
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
      className="text-xl"
      href={"/"}
      onClick={handleclick}
      ref={logoRef}
    ></Link>
  );
};

export default Logo_scramble;
