"use client";

import { useContext, useEffect } from "react";
import { Button } from "../ui/button";
import { buttonrefctx } from "../Skills";

const Buttons3d = () => {
  const Enter3dButtonref = useContext(buttonrefctx);
  useEffect(() => {
    // if (Enter3dButtonref && Enter3dButtonref.current) {
    //   Enter3dButtonref.current.onclick = () => {
    //     document.querySelector<HTMLDivElement>("#scene-wrapper")?.focus();
    //     // window.alert("CLICK");
    //     gsap.to(Enter3dButtonref.current, {
    //       opacity: 0,
    //       duration: 1,
    //     });
    //   };
    // }
  });
  return (
    <Button
      id="enter3d"
      ref={Enter3dButtonref}
      className="pointer-events-auto absolute bottom-1/4 left-1/2 z-[130] -translate-x-1/2 opacity-0"
    >
      ENTER 3D
    </Button>
  );
};

export default Buttons3d;
