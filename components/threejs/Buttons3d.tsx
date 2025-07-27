"use client";

import { useContext, useRef } from "react";
import { Button } from "../ui/button";
import { buttonrefctx } from "../Skills";
import { Dockermodelctx, global3dctx } from "./Root3d";
import type { global3dctxtypes } from "./Root3d";
import { lookAtmodel } from "@/lib/three_setup";
import gsap from "gsap";
import { ArrowDown } from "lucide-react";
import { useGSAP } from "@gsap/react";

const Buttons3d = () => {
  const exit3dref = useRef<HTMLButtonElement | null>(null);
  const enter3dPressCount = useRef<number>(0);

  const Enter3dButtonref = useContext(buttonrefctx);
  const Dockermodel = useContext(Dockermodelctx);
  const globalcontext: global3dctxtypes | undefined = useContext(global3dctx);
  // const [ca] = globalcontext
  useGSAP(() => {
    if (!globalcontext) return;
    const scrollanimations = gsap.timeline();
    scrollanimations
      .to(".left-arrows", {
        keyframes: [
          { yPercent: 0, duration: 1, delay: 4 },
          { yPercent: 120, duration: 1, ease: "power1.inOut" },
          { yPercent: -120, duration: 0, ease: "power1.inOut" },
        ],
        repeat: -1,
        delay: 3,
        // stagger: 0.2,
      })
      .to(
        ".scroll-words",
        {
          keyframes: [
            { yPercent: 0, duration: 1, delay: 4 },
            { yPercent: 100, duration: 1, ease: "power1.inOut" },
            { yPercent: -100, duration: 0, ease: "power1.inOut" },
          ],
          repeat: -1,
          // delay: 3,
          // stagger: 0.2,
        },
        // "<5",
      )
      .to(
        ".right-arrows",
        {
          keyframes: [
            { yPercent: 0, duration: 1, delay: 4 },
            { yPercent: 120, duration: 1, ease: "power1.inOut" },
            { yPercent: -120, duration: 0, ease: "power1.inOut" },
          ],
          repeat: -1,
          // delay: 3,
          // stagger: 0.2,
        },
        // "<5",
      );
    if (Enter3dButtonref && Enter3dButtonref.current) {
      Enter3dButtonref.current.onclick = () => {
        globalcontext.animationsDone.setter(true);
        globalcontext.exit3dstate.setter(true);
        // lookatmodeltl.play();
        // if (Docekrmodel) {
        if (!globalcontext.camera || !globalcontext.controls) return;
        if (enter3dPressCount.current == 0) {
          lookAtmodel({
            camera: globalcontext.camera,

            controls: globalcontext.controls,
            model: Dockermodel,
          });
        }
        enter3dPressCount.current += 1;
        // }
        // camera.position.set(30.405193262355265, 0, -15.853882753462061);

        // window.alert("testing react stuff");
        document.querySelector<HTMLDivElement>("#scene-wrapper")?.focus();
        document
          .querySelector<HTMLDivElement>("#scene-words")
          ?.classList.toggle("pointer-events-none", true);

        gsap.to(Enter3dButtonref.current, {
          // opacity: 0,
          autoAlpha: 0,
        });
        if (exit3dref)
          gsap.to([exit3dref.current, "#nipplejsZone"], {
            autoAlpha: 1,
          });
        globalcontext.exit3dstate.setter(false);
      };
    }

    if (exit3dref.current) {
      exit3dref.current.onclick = () => {
        globalcontext.exit3dstate.setter(true);
        document
          .querySelector<HTMLDivElement>("#scene-words")
          ?.classList.toggle("pointer-events-none", false);

        gsap.to([exit3dref.current, "#nipplejsZone"], {
          autoAlpha: 0,
          duration: 1,
        });
        if (!Enter3dButtonref?.current) return;
        gsap.to(Enter3dButtonref.current, {
          autoAlpha: 1,
          duration: 1,
        });
      };
    }

    return () => {
      // scrollanimations.revert();
      scrollanimations.kill();
    };
  }, [Dockermodel]); //dont know why Enter3dButtonref would change but an erro i the future might be coz if this
  return (
    <>
      {globalcontext && (
        <div className="pointer-events-auto absolute top-1/2 left-6 z-[130]">
          <Button
            ref={exit3dref}
            id="exit3d"
            className="invisible rounded-md bg-neutral-900/45 px-3 py-2 text-white opacity-0 hover:bg-neutral-700"
          >
            EXIT 3D
          </Button>
        </div>
      )}

      <div ref={Enter3dButtonref} className="invisible" id="enter3d">
        <div className="pointer-events-auto absolute bottom-1/5 left-1/2 z-[130] -translate-x-1/2 rounded-xl bg-neutral-800/40 px-4 py-4 backdrop-blur-md md:bottom-1/6">
          <div className="flex flex-col items-center space-x-4 sm:flex-row">
            <Button className="rounded-md bg-neutral-900 px-3 py-5 font-medium text-white hover:cursor-pointer hover:bg-neutral-700">
              EXPLORE 3D WORLD
            </Button>

            <span className="text-sm font-medium text-white">or</span>

            <div className="flex h-12 w-52 min-w-44 items-center justify-center space-x-2 overflow-hidden rounded-full bg-white px-6 py-2 text-xs font-medium text-balance text-black shadow-md md:w-60">
              <div className="m-0 flex w-full items-center justify-between overflow-hidden p-0 sm:gap-2">
                <span className="arrow arrow-left relative size-4 overflow-hidden text-sm">
                  <ArrowDown
                    strokeWidth={1.5}
                    className="left-arrows absolute -top-[120%] left-1/2 size-4 -translate-x-1/2 -translate-y-1/2"
                  />
                  <ArrowDown
                    strokeWidth={1.5}
                    className="left-arrows absolute top-1/2 left-1/2 size-4 -translate-x-1/2 -translate-y-1/2"
                  />
                </span>
                <div
                  id="end-bottom"
                  className="relative flex h-full flex-1 flex-col gap-4 text-xs"
                >
                  <span className="scroll-words absolute -top-[100%] block sm:left-3">
                    CONTINUE TO SCROLL
                  </span>
                  <span className="scroll-words absolute top-0 block sm:left-3">
                    CONTINUE TO SCROLL
                  </span>
                  <span id="s" className="opacity-0">
                    hide
                  </span>
                </div>
                <span className="arrow arrow-left relative size-4 overflow-hidden text-lg">
                  <ArrowDown
                    strokeWidth={1.5}
                    className="right-arrows absolute top-1/2 left-1/2 size-4 -translate-x-1/2 -translate-y-1/2"
                  />
                  <ArrowDown
                    strokeWidth={1.5}
                    className="right-arrows absolute -top-[120%] left-1/2 size-4 -translate-x-1/2 -translate-y-1/2"
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Buttons3d;
