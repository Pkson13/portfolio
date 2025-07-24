"use client";

import { useContext, useEffect } from "react";
import { Button } from "../ui/button";
import { buttonrefctx } from "../Skills";
import { Dockermodelctx, global3dctx } from "./Root3d";
import type { global3dctxtypes } from "./Root3d";
import { lookAtmodel } from "@/lib/three_setup";
import gsap from "gsap";

const Buttons3d = () => {
  const Enter3dButtonref = useContext(buttonrefctx);
  const Dockermodel = useContext(Dockermodelctx);
  const globalcontext: global3dctxtypes | undefined = useContext(global3dctx);
  // const [ca] = globalcontext
  useEffect(() => {
    if (!globalcontext) return;
    if (Enter3dButtonref && Enter3dButtonref.current) {
      Enter3dButtonref.current.onclick = () => {
        // lookatmodeltl.play();
        // if (Docekrmodel) {
        if (!globalcontext.camera || !globalcontext.controls) return;
        const lookatmodeltl = lookAtmodel({
          camera: globalcontext.camera,

          controls: globalcontext.controls,
          model: Dockermodel,
        });
        // }
        // camera.position.set(30.405193262355265, 0, -15.853882753462061);

        // window.alert("testing react stuff");
        document.querySelector<HTMLDivElement>("#scene-wrapper")?.focus();

        gsap.to(Enter3dButtonref.current, {
          opacity: 0,
        });
      };
    }
  }, [Dockermodel]); //dont know why Enter3dButtonref would change but an erro i the future might be coz if this
  return (
    <Button
      id="enter3d"
      ref={Enter3dButtonref}
      className="pointer-events-auto absolute bottom-1/6 left-1/2 z-[130] -translate-x-1/2 bg-black text-white opacity-0"
    >
      ENTER 3D
    </Button>
  );
};

export default Buttons3d;
