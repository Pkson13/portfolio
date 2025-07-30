"use client";
import Link from "next/link";
import React, { useContext, useEffect, useRef } from "react";
import { Button } from "../ui/button";
import { ScrollSmotherContext } from "../ClientWrapper";

const Links = () => {
  const scrollSmother = useContext(ScrollSmotherContext);
  //   const a = useRef<HTMLButtonElement | null>(null);
  const contact = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    // if (!contact.current || !scrollSmother?.current) return;
    if (!contact.current) return;
    let timesClicked = 0;
    contact.current.onclick = () => {
      console.log("clicked");
      timesClicked += 1;

      scrollSmother?.current?.scrollTo("#fotter", true, "bottom 90%");
      if (timesClicked > 1) return;
      setTimeout(() => {
        contact.current?.click(); //we have to click it twice coz of the scroll trigger snaping on the scene-wrapper in skills.tsx
        timesClicked = 0;
      }, 400);
    };
  }, []);
  return (
    <div className="ml-auto hidden items-center gap-8 hover:cursor-pointer sm:flex">
      <Button ref={contact}>Contact me</Button>
    </div>
  );
};

export default Links;
