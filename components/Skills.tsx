"use client";
import React, {
  createContext,
  RefObject,
  useContext,
  useRef,
  useState,
} from "react";
import Root3d from "./threejs/Root3d";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Poppins } from "next/font/google";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmotherContext } from "./ClientWrapper";
import { DefaultLoadingManager } from "three";
import Contact from "./Contact";

export const buttonrefctx =
  createContext<RefObject<HTMLButtonElement | null> | null>(null);

const poppins = Poppins({ weight: "600", preload: false });

const Skills = () => {
  const Enter3dButtonref = useRef<HTMLButtonElement | null>(null);
  // const scrollSmother = useContext(ScrollSmotherContext);
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
    let offsetTop;
    let offsetLeft;

    const sceneWrapper = document.getElementById("scene-wrapper");
    const parent = document.getElementById("to-pin");

    if (sceneWrapper && parent) {
      const sceneRect = sceneWrapper.getBoundingClientRect();
      const parentRect = parent.getBoundingClientRect();

      offsetTop = sceneRect.top - parentRect.top;
      offsetLeft = sceneRect.left - parentRect.left;

      console.log("Top distance to parent:", offsetTop);
      console.log("Left distance to parent:", offsetLeft);
    }
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
          // width: "200vw",
          // rotateZ: 5,
          // height: "200vh",
          // scale: 2,
          padding: 0,
          ease: "power3.out",
          duration: 2,
        },
        // "<", // run at the same time
      )

      .to(
        ".cliprectangle",
        {
          width: "105vw",
          height: "105vh",
          // scale: 0.5,
          // position: "absolute",
          // top: 0,
          // left: 0,
          ease: "power3.out",
          duration: 2,
          // rotateZ: -5,
          // clipPath: "polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)",
        },
        "<",
      )
      .to(
        ".cliprectangle",
        {
          // width: "100vw",
          // height: "100vh",
          // // scale: 1,
          // ease: "power3.out",
          duration: 2,
          // rotateZ: 7,

          // clipPath: "polygon(0 0, 100% 0%, 100% 100%, 0% 100%)",
        },
        // "<",
      )
      // .to("#outer-scene-wrapper", {
      //   // scale: 1,
      //   duration: 2,
      // })
      // .to(
      //   "#skill-container",
      //   {
      //     rotateZ: 0,
      //     scale: 1,
      //     // padding: "initial", // or your default value
      //     ease: "power.in",
      //     duration: 2,
      //   },
      //   // ">", // run after previous animation
      // )

      .to("#skill-container", {
        // top: 0,
        // left: 0,
        // padding: 0,

        scrollTrigger: {
          trigger: "#skill-container",
          pin: "#to-pin",
          anticipatePin: 3,
          // pinSpacing: false,
          // pinType: "fixed",
          start: `top+=${offsetTop}px 10%`,
          // start: `top top`,
          id: "pin",
          // endTrigger: "#footer",
          end: "bottom -900%",

          // end: "bottom top",

          onUpdate: (self) => {
            // self.refresh();
            /*
            This is a static position that is calculated when the ScrollTrigger is created and when the scroller is resized,
             based on where things are in the normal document flow. It is not constantly recalculated,
              so for example if you animate the trigger/endTrigger, it won't constantly update the start/end values accordingly
               because ScrollTrigger is highly optimized for performance. You can call ScrollTrigger.refresh() to force things to be recalculated.
            */
          },

          // pinReparent: true,
          // scrub: true,
          markers: true,
          // preventOverlaps: "true",
        },
      })
      .to("#fotter", {
        //worked on this for almost 7 hours. i'm so pissed rn
        // top: 0,
        // left: 0,
        // padding: 0,
        // yPercent: -100,
        ease: "none",

        scrollTrigger: {
          trigger: "#skill-container",
          // pin: "#to-pin",
          // pin: true,
          // pinSpacing: false,
          // pinType: "fixed",
          start: `top+=${offsetTop}px 40%`,

          // start: `top bottom`,
          end: "bottom top",
          // id: "fotter",
          // pinReparent: true,
          scrub: 3,
          // markers: true,
          // pinnedContainer: "#to-pin",
          // onUpdate: (self) => {
          //   self.refresh();
          // },

          // preventOverlaps: "true",
        },
      })
      .to("#footer", {
        // top: 0,
        // left: 0,
        // padding: 0,
        yPercent: -100,
        // ease: "none",

        scrollTrigger: {
          // trigger: "#to-pin",
          // trigger: "#footer",
          // pinSpacing: false,
          // pinType: "fixed",
          trigger: "#fotter",
          pin: true,
          anticipatePin: 3,
          start: `bottom bottom`,
          // id: "fotter",
          // pinReparent: true,
          scrub: 2,
          end: "bottom -100%",
          // markers: true,
          onUpdate: (self) => {
            self.refresh();
          },

          // preventOverlaps: "true",
        },
      });
    // .to(
    //   {},
    //   {
    //     // top: 0,
    //     // left: 0,
    //     // padding: 0,

    //     scrollTrigger: {
    //       trigger: ".container",
    //       // pin: "#to-pin",
    //       // anticipatePin: 1,
    //       // pinSpacing: false,
    //       // pinType: "fixed",
    //       start: `bottom bottom`,
    //       end: `bottom 10%`,
    //       // start: `top top`,
    //       id: "fotter-pin",
    //       onUpdate: (self) => {
    //         self.refresh();
    //       },

    //       markers: true,
    //     },
    //   },
    // );

    const wordstl = gsap.timeline({
      paused: true,
      // scrollTrigger: {
      //   trigger: "#scene-wrapper",
      //   start: "top -10%",
      //   end: "top -30%",
      //   // end: "+=1000",
      //   // scrub: true,

      //   // pin: true,
      //   // pinType: "fixed",
      // },
    });
    wordstl
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
          onComplete: () => {},
        },
        // ">", // run after previous animation
      );

    // ScrollTrigger to update scrollProgress
    ScrollTrigger.create({
      trigger: "#scene-wrapper",
      start: "top 25%",
      end: "top -30%", //the camera animation depends on this so be sure to change it the modelanimations() funtion
      // end: "+=1000",
      // scrub: 0.5,
      // pin: true,
      // pinType: "fixed",
      snap: {
        snapTo: [0, 1], // snap to the closest label in the timeline
        duration: 3, // the snap animation should be at least 0.2 seconds, but no more than 3 seconds (determined by velocity)
        // delay: 0.2, // wait 0.2 seconds from the last scroll event before doing the snapping
        ease: "none", // the ease of the snap animation ("power3" by default)
      },
      // markers: true,
      // toggleClass: "sticky",
      scrub: true, // this makes scrollProgress update smoothly
      //  onEnter: () => skillstl.play(),
      onLeave: ({ progress, direction, isActive }) => {
        console.log("srollsmother scrolling");
        // if (scrollSmother.) {
        // scrollSmother.scrollTo("#scene-wrapper", true);
        // }
        wordstl.play();
      },

      onUpdate: (self) => {
        // console.log("direction", self.progress);
        // scrollProgress = self.progress;
        // if (self.direction > 0) {
        //   //user scrolling dowm
        //   skillstl.timeScale(1);
        //   skillstl.play();
        // } else {
        //   //user scrolling up
        //   skillstl.timeScale(2);
        //   skillstl.reverse();
        //   // skillstl.revert();
        // }
        skillstl.progress(self.progress);
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
  }, []);
  return (
    <buttonrefctx.Provider value={Enter3dButtonref}>
      <div className="relative w-screen bg-background">
        <div id="to-pin" className="">
          <div
            className="origin-centre px-4 py-20 sm:px-6 lg:px-8"
            id="skill-container"
          >
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text pb-6 text-center text-4xl leading-tight font-semibold text-transparent md:text-5xl">
              Skills
            </div>

            <div
              className="mb-5 flex flex-col-reverse gap-12 overflow-visible bg-transparent sm:gap-16 md:grid md:grid-cols-2 md:items-center"
              id="scale"
            >
              <div className="cliprectangle col-span-1 origin-center">
                <div
                  className="z-100 aspect-square size-full overflow-hidden rounded-lg md:aspect-video"
                  id="scene-wrapper"
                  tabIndex={0}
                  // data-speed="auto"
                >
                  {/* <Root3d /> */}

                  <Root3d />
                </div>
              </div>

              <div className="col-start-2 bg-transparent" id="Docker">
                <div className="">
                  <span className={`secondary-header`}>THREE JS</span>
                </div>
                <p
                  className={`mt-2 max-w-[25rem] leading-7 text-balance text-gray-800 dark:text-gray-100`}
                >
                  Docker, a powerful containerization tool that allows me to
                  package applications and their dependencies into lightweight,
                  portable containers, ensuring consistency across development,
                  testing, and production environments, eliminating the “it
                  works on my machine” problem.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Contact />
    </buttonrefctx.Provider>
  );
};

export default Skills;
