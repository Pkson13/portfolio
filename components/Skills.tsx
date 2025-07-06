"use client";
import React from "react";
import Root3d from "./threejs/Root3d";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Poppins } from "next/font/google";

const poppins = Poppins({ weight: "600" });

const Skills = () => {
  useGSAP(() => {
    // const skillstl = gsap.timeline();
    // skillstl.to("#scene-wrapper", {
    //   width: "100vw", // fill width
    //   height: "100vh", // fill height
    //   duration: 2, // if scrub is true, this will be ignored
    //   // ease: "circ.in",
    //   // xPercent: -10,
    //   // left: 0,
    //   // position: "absolute",
    //   // rotateX: 25,
    //   // rotateZ: 7,
    //   // y: "50vh",
    //   // scale: 0.5,
    //   ease: "power2.inOut", // skew: 30,
    //   scrollTrigger: {
    //     trigger: "#scene-wrapper",
    //     start: "top 35%", // starts when top of scene enters bottom of viewport
    //     end: "bottom 60%", // ends when top of scene hits top of viewport
    //     scrub: 2,

    //     // markers: true,
    //     // pin: true, // pin the element during scroll
    //     // anticipatePin: 1,
    //     // once: true,
    //   },
    // });
    // skillstl.to(
    //   "#skill-container",
    //   {
    //     // start the animation when ".box" enters the viewport (once)
    //     rotateZ: 10,
    //     // scale: 2.5,
    //     padding: 0,
    //     scrollTrigger: {
    //       trigger: "#scene-wrapper",
    //       start: "top 35%", // starts when top of scene enters bottom of viewport
    //       end: "bottom 60%", // ends when top of scene hits top of viewport
    //       scrub: 2,
    //       // markers: true,
    //       // pin: true, // pin the element during scroll
    //       // anticipatePin: 1,
    //       // once: true,
    //     },

    //     // delay: 1,
    //     duration: 3,
    //     ease: "power2.inOut",
    //   },
    //   0,
    // );
    // gsap.to("#skill-container", {
    //   rotateZ: 0,
    //   scale: 1,
    //   scrollTrigger: {
    //     trigger: "#scene-wrapper",
    //     start: "bottom 60%", // exact point where last one ends
    //     end: "bottom top", // finish reversing
    //     scrub: 2,
    //   },
    // });
    const skillstl = gsap.timeline({
      scrollTrigger: {
        trigger: "#scene-wrapper",
        start: "top 35%",
        end: "bottom 60%",
        scrub: 2,
        // pin: true,
        // markers: true,
      },
    });

    skillstl
      .to("#scene-wrapper", {
        width: "100vw",
        height: "100vh",
        ease: "power2.inOut",
      })
      .to(
        "#skill-container",
        {
          rotateZ: 7,
          width: "200vw",
          height: "200vh",
          scale: 1.5,
          padding: 0,
          ease: "power2.inOut",
        },
        "<", // run at the same time
      )
      .to(
        "#skill-container",
        {
          rotateZ: 0,
          scale: 1.1,
          padding: "initial", // or your default value
          ease: "power2.inOut",
        },
        ">", // run after previous animation
      );
  });
  return (
    <div className="px-4 py-12 sm:px-6" id="skill-container">
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text pb-6 text-center text-4xl leading-tight font-semibold text-transparent md:text-5xl">
        Skills
      </div>
      <div
        className="mb-5 flex flex-col-reverse gap-12 sm:gap-16 md:grid md:grid-cols-2 md:gap-20"
        id="scale"
      >
        <div
          className="z-30 col-span-1 aspect-video size-full overflow-hidden rounded-lg"
          id="scene-wrapper"
          // data-speed="auto"
        >
          <Root3d />
        </div>
        <div
          className="col-start-2 self-center justify-self-center"
          id="Docker"
        >
          <div className="">
            <span
              className={`text-2xl leading-tight text-gray-900 antialiased dark:text-gray-100 ${poppins.className}`}
            >
              Docker
            </span>
          </div>
          <p className="mt-2 text-sm leading-7 text-gray-700 dark:text-gray-300">
            Docker, a powerful containerization tool that allows me to package
            applications and their dependencies into lightweight, portable
            containers. This ensures consistency across development, testing,
            and production environments, eliminating the “it works on my
            machine” problem.
          </p>
        </div>
      </div>
      <div className="h-screen sm:h-40"></div>
    </div>
  );
};

export default Skills;
