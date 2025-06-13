"use client";
// import Image from "next/image";
// import type { Metadata } from "next";

import Root3d from "@/components/threejs/Root3d";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Poppins } from "next/font/google";
import { useRef } from "react";

// export const metadata: Metadata = {
//   themeColor: "#ffffff",
// };
const poppinsFont = Poppins({ weight: ["400", "100", "600"] });

export default function Home() {
  const couroselref = useRef<HTMLSpanElement | null>(null);
  // useGSAP(() => {
  //   gsap.to(couroselref.current, {
  //     x: -110,
  //     duration: 10,
  //     ease: "none",
  //     repeat: -1,
  //     // yoyo: true,
  //   });
  // });
  return (
    <>
      {/* <Root3d /> */}
      <main className="flex h-[90vh] items-center justify-center">
        <div className="flex h-11/12 w-10/12 justify-center">
          <h1
            className={
              "mt-10 text-5xl tracking-tight" + " " + poppinsFont.className
            }
          >
            Hi, Im Peterson
          </h1>
        </div>
      </main>
      <span>test words</span>
      <div className="relative m-20 h-5 w-40 overflow-hidden">
        {/* <span ref={couroselref} className="absolute m-0 translate-x-[160%] p-0">
          words words
        </span> */}
      </div>
    </>
  );
}
