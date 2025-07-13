"use client";
import React from "react";
import Root3d from "./threejs/Root3d";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Poppins } from "next/font/google";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
      paused: true,
      // scrollTrigger: {
      //   trigger: "#scene-wrapper",
      //   start: "top 35%",
      //   end: "bottom 60%",
      //   scrub: 0.5,
      //   // pin: true,
      //   markers: true,

      // },
    });

    skillstl
      .to(
        "#skill-container",
        {
          rotateZ: 10,
          width: "200vw",
          height: "200vh",
          scale: 1.5,
          padding: 0,
          ease: "power2.out",
          duration: 3,
        },
        // "<", // run at the same time
      )
      .to(
        "#scene-wrapper",
        {
          width: "100vw",
          height: "100vh",
          ease: "power2.out",
          duration: 3,
          // top: 0,
          // left: 0,
          // position: "fixed",
        },
        "<",
      )
      .to(
        "#skill-container",
        {
          rotateZ: 0,
          scale: 1.1,
          padding: "initial", // or your default value
          ease: "power.in",
          duration: 2,
        },
        ">", // run after previous animation
      )
      .to(
        "#scene-words",
        {
          y: 0,
          // rotate: 360,
          duration: 2,
          stagger: 0.2,
          // padding: "initial", // or your default value
          ease: "power3.out",
        },
        // ">", // run after previous animation
      )
      .to(
        "#scene-words",
        {
          y: 100,
          // rotate: 360,
          duration: 2,
          stagger: 0.2,
          // padding: "initial", // or your default value
          ease: "back.in",
          // delay: 3,
        },
        // ">", // run after previous animation
      );

    // ScrollTrigger to update scrollProgress
    ScrollTrigger.create({
      trigger: "#scene-wrapper",
      start: "top 35%",
      end: "bottom 60%",
      // end: "+=1000",
      // scrub: 0.5,
      // pin: true,
      markers: true,
      scrub: true, // this makes scrollProgress update smoothly
      //  onEnter: () => skillstl.play(),
      // onLeaveBack: () => skillstl.reverse(),
      onUpdate: (self) => {
        // console.log("direction", self.progress);
        // scrollProgress = self.progress;
        if (self.direction > 0) {
          //user scrolling dowm
          skillstl.timeScale(1);
          skillstl.play();
        } else {
          //user scrolling up
          skillstl.timeScale(2);
          skillstl.reverse();
        }
      },
    });

    // const abs_words = gsap.timeline({
    //   paused: true,
    //   // scrollTrigger: {
    //   //   trigger: "#scene-wrapper",
    //   //   start: "top 0%",
    //   //   // scrub: true,
    //   // },
    // });
    // abs_words.to(
    //   "#scene-words",
    //   {
    //     y: 0,
    //     // rotate: 360,
    //     duration: 2,
    //     stagger: 0.2,
    //     // padding: "initial", // or your default value
    //     ease: "power3.out",
    //   },
    //   // ">", // run after previous animation
    // );
    // abs_words.to(
    //   "#scene-words",
    //   {
    //     y: 100,
    //     // rotate: 360,
    //     duration: 2,
    //     stagger: 0.2,
    //     // padding: "initial", // or your default value
    //     ease: "back.in",
    //     delay: 3,
    //   },
    //   // ">", // run after previous animation
    // );
    // ScrollTrigger.create({
    //   trigger: "#scene-wrapper",
    //   start: "top 10%",
    //   // end: "bottom 60%",
    //   // scrub: 0.5,
    //   // pin: true,
    //   markers: true,
    //   scrub: true, // this makes scrollProgress update smoothly
    //   onUpdate: (self) => {
    //     // console.log("direction", self.progress);
    //     // scrollProgress = self.progress;
    //     if (self.direction > 0) {
    //       //user scrolling dowm
    //       abs_words.play();
    //     } else {
    //       //user scrolling up
    //       abs_words.reverse();
    //     }
    //   },
    // });
    // gsap.to("#scene-wrapper", {
    //   scrollTrigger: {
    //     trigger: "#skill-container",
    //     pin: true,
    //     start: "top -10%",

    //     end: "bottom 60%",
    //     markers: true,
    //   },
    // });
  });
  return (
    <div className="px-4 py-12 sm:px-6" id="skill-container">
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text pb-6 text-center text-4xl leading-tight font-semibold text-transparent md:text-5xl">
        Skills
      </div>
      <div
        className="mb-5 flex flex-col-reverse gap-12 sm:gap-16 md:grid md:grid-cols-2 md:items-center"
        id="scale"
      >
        <div
          className="z-30 col-span-1 aspect-video size-full overflow-hidden rounded-lg"
          id="scene-wrapper"
          // data-speed="auto"
        >
          <Root3d />
        </div>
        <div className="col-start-2" id="Docker">
          <div className="">
            <span className={`secondary-header`}>Docker</span>
          </div>
          <p
            className={`mt-2 leading-7 text-balance text-gray-600 dark:text-gray-300`}
          >
            Docker, a powerful containerization tool that allows me to package
            applications and their dependencies into lightweight, portable
            containers, ensuring consistency across development, testing, and
            production environments, eliminating the “it works on my machine”
            problem.
          </p>
        </div>
      </div>
      <div className="h-[300vh]"></div>
    </div>
  );
};

export default Skills;
