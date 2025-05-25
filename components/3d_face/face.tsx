"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function Face() {
  const faceRef = useRef<HTMLDivElement | null>(null);
  const leftPupilRef = useRef<HTMLDivElement | null>(null);
  const rightPupilRef = useRef<HTMLDivElement | null>(null);
  const mouthRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    const face = faceRef.current;
    const leftPupil = leftPupilRef.current;
    const rightPupil = rightPupilRef.current;
    const mouth = mouthRef.current;
    let lastElemment: "A" | "DIV" | undefined;

    // gsap.to([leftPupil, rightPupil, mouth], {
    //   y: 4,
    //   yoyo: true,
    //   repeat: -1,
    //   duration: 2,
    //   ease: "circ.inOut",
    // });
    const handleMouseMove = (e: MouseEvent) => {
      const target = e.target;

      if (!face || !leftPupil || !rightPupil) return;

      if (target instanceof HTMLElement) {
        // for (const attr of target.attributes) {
        // }
        // // Example: Check if it's a link and get the href
        switch (target.tagName) {
          case "A":
            if (lastElemment === "A") break;
            console.log(target.tagName);
            gsap.to(rightPupil, {
              borderRightWidth: "8px",
              borderTopWidth: "4px",
              borderBottomWidth: "4px",
              backgroundColor: "transparent",
              ease: "none",
            });
            gsap.to(leftPupil, {
              borderLeftWidth: "8px",
              borderTopWidth: "4px",
              borderBottomWidth: "4px",
              backgroundColor: "transparent",
              ease: "none",
            });

            gsap.to(mouth, {
              height: 1,
              ease: "circ.out",
              overwrite: "auto",
            });
            // className="absolute flex size-2 h-0 w-0 items-center justify-center rounded-full border-y-[4px] border-r-[8px] border-y-transparent border-r-black"
            lastElemment = "A";
            break;
          case "DIV":
            if (lastElemment === "DIV") break;
            console.log(target.tagName);
            gsap.to(mouth, {
              height: 18,
              ease: "circ.out",
              overwrite: "auto",
            });
            gsap.to([rightPupil], {
              borderRightWidth: 0,
              borderTopWidth: 0,
              borderBottomWidth: 0,
              backgroundColor: "black", // or Tailwind equivalent like 'theme("colors.background")' if using CSS vars
              ease: "none",
            });
            gsap.to([leftPupil], {
              borderLeftWidth: 0,
              borderTopWidth: 0,
              borderBottomWidth: 0,
              backgroundColor: "black", // or Tailwind equivalent like 'theme("colors.background")' if using CSS vars
              ease: "none",
            });
            lastElemment = "DIV";
            break;
        }
      }

      const { left, top, width, height } = face.getBoundingClientRect();
      // console.log("left", x, "top", top, "width", width, "height", height);

      const centerX = left + width / 2;
      const centerY = top + height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      // console.log("deltax", deltaX, "deltay", deltaY);

      // max movement range for pupils
      const maxMove = 8;

      // normalize and clamp
      const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
      const angle = Math.atan2(deltaY, deltaX);
      const moveX = Math.min(maxMove, distance) * Math.cos(angle);
      const moveY = Math.min(maxMove, distance) * Math.sin(angle);

      gsap.to([leftPupil, rightPupil, mouth], {
        x: moveX,
        y: moveY,
        duration: 0.5,
        ease: "power2.out",
        delay: 0.2,
      });
    };

    document.body.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.body.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="absolute mx-auto mt-40 flex size-20 flex-col items-center justify-center gap-4 bg-foreground">
      <div className="flex gap-3" ref={faceRef}>
        {/* Left Eye */}
        <div className="relative" id="leftey">
          <div
            ref={leftPupilRef}
            className="absolute flex items-center justify-center rounded-full bg-background"

            // className="absolute flex size-2 items-center justify-center rounded-full border-y-[4px] border-l-[8px] border-y-transparent border-l-background"
          >
            <div className="h-0 w-0 -translate-x-[120%] rounded-full border-y-[4px] border-l-[9px] border-y-transparent border-l-foreground" />
          </div>
        </div>

        {/* Right Eye */}
        <div className="relative">
          <div
            ref={rightPupilRef}
            // className="absolute flex size-2 items-center justify-center rounded-full border-y-[4px] border-r-[8px] border-y-transparent border-r-background"
            className="absolute flex size-2 items-center justify-center rounded-full bg-background"
          >
            <div className="h-0 w-0 translate-x-[117%] rounded-full border-y-[4px] border-r-[9px] border-y-transparent border-r-foreground" />
          </div>
        </div>
        {/* <div className="relative">
          <div
            ref={rightPupilRef}
            className="absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-background"
          />
        </div> */}
      </div>
      <div id="mouscontainer" className="relative self-center">
        <div
          ref={mouthRef}
          className="absolute top-1/2 left-1/2 size-4 h-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-background"
        >
          <div className="absolute top-1/2 left-1/2 size-3/5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground"></div>
        </div>
      </div>
    </div>
  );
}
