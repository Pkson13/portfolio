"use client";
import React, { createContext, RefObject, useContext, useRef } from "react";
import Root3d from "./threejs/Root3d";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Poppins } from "next/font/google";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmotherContext } from "./ClientWrapper";
import Contact from "./Contact";

export const buttonrefctx =
  createContext<RefObject<HTMLDivElement | null> | null>(null);

const poppins = Poppins({ weight: "600", preload: false });

const Skills = () => {
  const Enter3dButtonref = useRef<HTMLButtonElement | null>(null);
  const scrollSmother = useContext(ScrollSmotherContext);
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
    let offsetfooterTop;
    let offsetLeft;

    const sceneWrapper = document.getElementById("scene-wrapper");
    const parent = document.getElementById("to-pin");
    const footer = document.getElementById("fotter");

    if (sceneWrapper && parent) {
      const sceneRect = sceneWrapper.getBoundingClientRect();
      const parentRect = parent.getBoundingClientRect();
      const footerrec = footer.getBoundingClientRect();

      offsetTop = sceneRect.top - parentRect.top;
      offsetfooterTop = footerrec.top - parentRect.top;
      offsetLeft = sceneRect.left - parentRect.left;

      console.log("Top distance to parent:", offsetTop);
      console.log("Left distance to parent:", offsetLeft);
      console.log("footer distance to parent:", offsetfooterTop);
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
          width: "100vw",
          height: "105vh",
          // scale: 0.5,
          // position: "absolute",
          // top: 0,
          // left: 0,
          ease: "power3.out",
          duration: 2,
          padding: 0,
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
      .to("#fotter", {
        // top: 0,
        // left: 0,
        // padding: 0,
        yPercent: -150,
        ease: "none",

        scrollTrigger: {
          trigger: "#test",
          // trigger: "#footer",
          // pinSpacing: false,

          // pinType: "fixed",
          // trigger: "#fotter",
          start: "bottom -30%",
          // pin: "#fotter",
          // pinReparent: true,
          // anticipatePin: 3,
          // start: `bottom bottom`,
          id: "fotter",
          // pinReparent: true,
          // markers: true,
          // endTrigger: "#fotter",
          scrub: 2,
          end: "bottom -130%",
          // end: "top bottom",
          // pinnedContainer: "#to-pin",
          // markers: true,
          onUpdate: (self) => {
            // self.refresh();
          },
        },

        // preventOverlaps: "true",
        // },
      })
      // .to(
      //   {},
      //   {
      //     scrollTrigger: {
      //       trigger: "#fotter",
      //       // trigger: "#footer",
      //       // pinSpacing: false,

      //       // pinType: "fixed",
      //       // trigger: "#fotter",
      //       start: "bottom bottom",
      //       // onEnter: () => {
      //       //   if (scrollSmother && scrollSmother.current) {
      //       //     console.log(scrollSmother.current.paused(), "why");
      //       //     scrollSmother.current.paused(true);
      //       //     console.log(scrollSmother.current.paused());
      //       //   }
      //       //   console.log("onenter");
      //       //   console.log("fotter at boottom");
      //       // },
      //       // pin: true,
      //       // onEnterBack: () => {
      //       //   if (scrollSmother && scrollSmother.current) {
      //       //     console.log(scrollSmother.current.paused(), "why");
      //       //     scrollSmother.current.paused(false);
      //       //     console.log(scrollSmother.current.paused());
      //       //   }
      //       // },

      //       // start: `bottom bottom`,
      //       id: "fotter-wrapper",
      //       // pinReparent: true,
      //       // markers: true,
      //       // endTrigger: "#fotter",
      //       scrub: true,
      //       end: "bottom -30%",
      //       // pinnedContainer: "#to-pin",
      //       markers: true,
      //       onUpdate: (self) => {
      //         self.refresh();
      //       },
      //     },

      //     // preventOverlaps: "true",
      //     // },
      //   },
      // )
      .to(
        {},
        {
          //worked on this for almost 7 hours. i'm so pissed rn
          // top: 0,
          // left: 0,
          // padding: 0,
          // yPercent: -100,
          ease: "none",

          scrollTrigger: {
            trigger: "#fotter-container",
            // pin: "#to-pin",
            // pin: "#fotter-container",
            pin: true,

            // pinSpacing: false,
            // pinType: "fixed",
            // start: `top+=${offsetTop}px 40%`,
            start: "bottom bottom",
            preventOverlaps: true,
            onEnter: () => {
              console.log("test enter");
              // footer?.
            },

            // start: `top bottom`,
            end: "bottom -50%",
            id: "test",
            pinReparent: true,
            scrub: 1,
            // markers: true,
            // pinnedContainer: "#to-pin",
            onUpdate: (self) => {
              self.refresh();
            },
            anticipatePin: 4,
            pinSpacing: false,

            // preventOverlaps: "true",
          },
        },
      )
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
          // start: `top+=${offsetTop}px 10%`,
          start: `top+=${offsetTop}px 10%`,
          // start: `top top`,
          id: "pin",
          // endTrigger: "#footer",
          end: "bottom -1000%",
          onLeaveBack: () => {
            // gsap.to("#enter3d", {
            //   autoAlpha: 0,
            //   duration: 1,
            // });
          },

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
          // markers: true,
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
        "#docker-words",
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
        "#docker-words",
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
      <div id="test" className="relative w-screen bg-background">
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
              <div className="cliprectangle col-span-1 origin-center md:p-4">
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
                  Three.js, a powerful WebGL-based JavaScript library I use to
                  build interactive 3D experiences directly in the browser,
                  enabling immersive visuals, real-time animations, and dynamic
                  environments across platforms.
                </p>
              </div>
            </div>
          </div>
          <Contact />
        </div>
      </div>
    </buttonrefctx.Provider>
  );
};

export default Skills;
