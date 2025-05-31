"use client";
import gsap from "gsap";
import { useEffect, useRef } from "react";

const CursorFollower = () => {
  const bodyref = useRef<HTMLElement | undefined>(undefined);
  const cursofollower = useRef<HTMLSpanElement | null>(null);

  const mousemove = (e: MouseEvent) => {
    // console.log(e.clientX);
    gsap.to(cursofollower.current, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.5,
      delay: 0.1,
      ease: "circ",
      opacity: 1,
    });
  };

  useEffect(() => {
    bodyref.current = document.body;
    bodyref.current.addEventListener("mousemove", mousemove);

    const interactive = document.querySelectorAll("a, button");
    interactive.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        gsap.to(cursofollower.current, { scale: 0.7 });
      });
      el.addEventListener("mouseleave", () => {
        gsap.to(cursofollower.current, { scale: 1 });
      });
    });
    return () => {
      if (!bodyref.current) return;
      bodyref.current.removeEventListener("mousemove", mousemove);
    };
  }, []);

  return (
    <span
      ref={cursofollower}
      id="cursor-follower"
      className="pointer-events-none absolute top-0 left-0 z-20 size-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground opacity-0"
    ></span>
  );
};

export default CursorFollower;
