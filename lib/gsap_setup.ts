"use client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrambleTextPlugin } from "gsap/all";

//register plugins here
gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrambleTextPlugin);
