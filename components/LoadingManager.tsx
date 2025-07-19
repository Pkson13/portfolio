"use client";

import gsap from "gsap";
import { ReactNode, useEffect, useRef } from "react";
import { DefaultLoadingManager } from "three";

const LoadingManager = ({ children }: { children: ReactNode }) => {
  const progressDisplay = useRef<HTMLDivElement | null>(null);
  const loadingScreen = useRef<HTMLDivElement | null>(null);
  const reveal = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    DefaultLoadingManager.onStart = function (url, itemsLoaded, itemsTotal) {
      console.log(
        "Started loading file: " +
          url +
          ".\nLoaded " +
          itemsLoaded +
          " of " +
          itemsTotal +
          " files.",
      );
    };

    DefaultLoadingManager.onLoad = function () {
      console.log("Loading Complete!");
      if (!reveal.current) return;

      const reveltl = gsap.timeline();

      reveltl
        .to(reveal.current, {
          scale: 2,
          duration: 3,
          rotate: 30,
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
        .to("#logo", {
          duration: 2,
          scrambleText: {
            text: "TOP G", // final desired text
            revealDelay: 1, // delay before final letters start appearing
            speed: 0.5, // speed of scrambling
          },
          ease: "none",
        });
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
        progressDisplay.current.innerText = `${itemsLoaded} of ${itemsTotal} loaded`;
        const percent = (itemsLoaded / itemsTotal) * 100;
        gsap.to(progressDisplay.current, {
          width: percent,
          ease: "none",
        });
      }
    };

    DefaultLoadingManager.onError = function (url) {
      console.log("There was an error loading " + url);
    };
  });
  return (
    <>
      <div
        ref={loadingScreen}
        className="fixed top-0 left-0 z-30 flex h-screen w-screen items-center justify-center overflow-hidden bg-black"
      >
        <div className="h-8 w-24 bg-gray-700">
          <div
            ref={progressDisplay}
            className="my-auto h-full w-1/10 bg-white"
          ></div>
        </div>
        <div
          ref={reveal}
          className="absolute top-0 left-0 z-50 h-screen w-screen origin-center scale-0 bg-white"
        ></div>
      </div>

      {children}
    </>
  );
};

export default LoadingManager;
