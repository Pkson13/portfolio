"use client";

import gsap from "gsap";
import Image from "next/image";
import { ReactNode, useEffect, useRef } from "react";
import { DefaultLoadingManager } from "three";
import { Button } from "./ui/button";
import { SplitText } from "gsap/SplitText";

const LoadingManager = ({ children }: { children: ReactNode }) => {
  const progressDisplay = useRef<HTMLDivElement | null>(null);
  const loadingScreen = useRef<HTMLDivElement | null>(null);
  const reveal = useRef<HTMLDivElement | null>(null);
  const startButtonref = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const loadingDots = gsap.to(".loading-dot", {
      opacity: 0,
      repeat: -1,
      yoyo: true,
      stagger: {
        each: 0.5,
        from: "end",
        ease: "none",
      },
    });

    DefaultLoadingManager.onLoad = function () {
      console.log("Loading Complete!");
      loadingDots.revert();
      loadingDots.kill();

      if (!reveal.current) return;
      if (!startButtonref.current) return;
      startButtonref.current.disabled = false;
      gsap.to(startButtonref.current, {
        opacity: 1,
      });
      startButtonref.current.onclick = () => {
        playanimations();
      };
    };

    DefaultLoadingManager.onProgress = function (url, itemsLoaded, itemsTotal) {
      console.log(
        "Loading file: " +
          url +
          ".\nLoaded " +
          itemsLoaded +
          " of " +
          itemsTotal +
          " files.",
      );

      if (progressDisplay.current) {
        // progressDisplay.current.innerText = `${itemsLoaded} of ${itemsTotal} loaded`;
        const percent = (itemsLoaded / itemsTotal) * 100;
        const width = progressDisplay.current.offsetWidth;
        const parentwidth = progressDisplay.current.parentElement?.offsetWidth;
        if (!parentwidth) return;
        const currentPercentage = (width / parentwidth) * 100;
        if (percent <= currentPercentage + 2) return;
        gsap.to(progressDisplay.current, {
          width: `${percent}%`,
          ease: "none",
        });
      }
    };

    DefaultLoadingManager.onError = function (url) {
      console.log("There was an error loading " + url);
    };

    function playanimations() {
      const reveltl = gsap.timeline();

      // split elements with the class "split" into words and characters
      const split = SplitText.create("#split-words", {
        type: "words",
        mask: "words",
      });

      // now animate the characters in a staggered fashion

      reveltl
        .to(reveal.current, {
          scale: 2,
          duration: 3,
          rotate: 30,
          backgroundColor: "white",
          // scaleY: 10,
          // transformOrigin: "centre",
          ease: "power3.inOut",
          onComplete: () => {},
        })
        .to(
          loadingScreen.current,
          {
            opacity: 0,
            //   transformOrigin: "right",
            duration: 1,
            //   delay: 0.2,
            ease: "power4.inOut",
            onComplete: () => {
              loadingScreen.current?.classList.add("hidden");
            },
          },
          "<50%",
        )
        .to(
          "#hero",
          {
            // opacity: 0,
            scale: 1,
            rotate: 0,
            //   transformOrigin: "right",
            duration: 2,
            //   delay: 0.2,
            ease: "power4.out",
            onComplete: () => {
              loadingScreen.current?.classList.add("hidden");
            },
          },
          "<",
        )
        .from(
          [split.words],
          {
            duration: 1.5,
            yPercent: 100, // animate from 100px below
            autoAlpha: 0, // fade in from opacity: 0 and visibility: hidden
            stagger: 0.05, // 0.05 seconds between each
          },
          "<25%",
        )
        // .to("#reveal-m", {
        //   // opacity: 1,
        //   width: 0,
        //   duration: 1,
        //   ease: "none",
        // })
        .to(
          "#matter",
          {
            opacity: 1,
            // width: 0,
            y: 0,
            duration: 1.5,
            ease: "none",
          },
          "<",
        )
        .to("#logo", {
          duration: 2,
          scrambleText: {
            text: "TOP G", // final desired text
            revealDelay: 1, // delay before final letters start appearing
            speed: 0.5, // speed of scrambling
          },
          ease: "none",
        })
        .to("#son", {
          opacity: 1,
          onComplete: () => {
            split.revert();
          },
        });
    }
  });
  return (
    <>
      <div
        ref={loadingScreen}
        className="fixed top-0 left-0 z-30 flex h-screen w-screen flex-col items-center justify-center gap-8 overflow-hidden bg-[#1b1b1b]"
      >
        {/* <div className="text-4xl text-white">Hi, i'm Peterson</div> */}
        <div className="relative flex items-end justify-center">
          <div className="flex flex-col items-center justify-center">
            <div className="relative flex h-1/2 w-fit items-end sm:h-3/5">
              <div className="absolute bottom-0 left-0 h-fit w-full -rotate-90 font-(family-name:--font-bebas-neue) text-6xl tracking-wide text-gray-400">
                LOADING
                <span id="loading-dots">
                  <span className="loading-dot">.</span>
                  <span className="loading-dot">.</span>
                  <span className="loading-dot">.</span>
                </span>
              </div>
            </div>
            <div className="h-4 w-12 border-2 border-gray-400 p-0.5">
              <div
                ref={progressDisplay}
                className="my-auto h-full w-1/10 bg-gray-400"
              ></div>
            </div>
          </div>
          <div className="">
            <Image
              src={"/loading_central_cee.png"}
              alt="loading"
              className="size-full contrast-100 grayscale"
              width={200}
              height={600}
            />
          </div>
        </div>
        <div className="text-4xl text-white">
          <Button
            id="start-button"
            ref={startButtonref}
            disabled={true}
            size={"lg"}
            variant={"outline"}
            className="bg-black text-white opacity-0"
          >
            Start
          </Button>
        </div>
        <div
          ref={reveal}
          className="absolute top-0 left-0 z-50 h-screen w-screen origin-center scale-0 bg-[#6e6e6e]"
        ></div>
      </div>

      {children}
    </>
  );
};

export default LoadingManager;
