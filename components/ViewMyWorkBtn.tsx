"use client";
import React, { useContext, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { ScrollSmotherContext } from "./ClientWrapper";

const ViewMyWorkBtn = () => {
  const scrollSmother = useContext(ScrollSmotherContext);
  //   const a = useRef<HTMLButtonElement | null>(null);
  const projectsbtn = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    // if (!contact.current || !scrollSmother?.current) return;
    if (!projectsbtn.current) return;
    projectsbtn.current.onclick = () => {
      scrollSmother?.current?.scrollTo("#projects", true, "top top");
    };
  }, []);
  return (
    <Button
      size="lg"
      ref={projectsbtn}
      className="bg-purple-600 px-8 text-gray-200 hover:cursor-pointer hover:bg-purple-700"
    >
      {/* <a href="#projects"> */}
      View my work
      <ArrowRight className="ml-2 h-4 w-4" />
      {/* </a> */}
    </Button>
  );
};

export default ViewMyWorkBtn;
