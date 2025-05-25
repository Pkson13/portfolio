"use client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import MorphSVGPlugin from "gsap/MorphSVGPlugin";
import ScrambleTextPlugin from "gsap/ScrambleTextPlugin";

//register plugins here
gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrambleTextPlugin);
gsap.registerPlugin(MorphSVGPlugin);
