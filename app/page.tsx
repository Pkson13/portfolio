// import Image from "next/image";
// import type { Metadata } from "next";

// import Root3d from "@/components/threejs/Root3d";
import Blinker from "@/components/blinker";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { ArrowRight, ExternalLink } from "lucide-react";
import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
// import { useRef } from "react";

// export const metadata: Metadata = {
//   themeColor: "#ffffff",
// };
const poppinsFont = Poppins({ weight: ["400", "100", "600"] });

export default function Home() {
  // const couroselref = useRef<HTMLSpanElement | null>(null);
  // useGSAP(() => {
  //   gsap.to(couroselref.current, {
  //     x: -110,
  //     duration: 10,
  //     ease: "none",
  //     repeat: -1,
  //     // yoyo: true,
  //   });
  // });
  return (
    <>
      {/* <Root3d /> */}

      {/* <div className="relative m-20 h-5 w-40 overflow-hidden"> */}
      {/* <span ref={couroselref} className="absolute m-0 translate-x-[160%] p-0">
          words words
        </span> */}
      {/* </div> */}
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 h-16 w-16 rotate-12 overflow-clip rounded-lg border border-purple-900">
            {/* <Image
              alt="hacker"
              src={"/corrupt.jpg"}
              className="size-full"
              height={100}
              width={100}
            /> */}
          </div>
          <div className="absolute top-40 right-20 h-16 w-16 rounded-full border border-blue-900"></div>
          <div className="absolute bottom-40 left-1/4 h-12 w-12 -rotate-12 rounded-lg border border-green-900"></div>
          <div className="absolute right-1/3 bottom-20 h-24 w-24 rounded-full border border-orange-900"></div>
          <div className="absolute right-1/2 bottom-16 h-24 w-24 rounded-full border bg-radial"></div>
        </div>

        <div className="relative mx-auto max-w-4xl text-center">
          <div className="mx-auto flex items-center justify-center gap-2">
            <Badge
              variant="secondary"
              className="border-gray-300 bg-background"
            >
              Full-Stack Developer
            </Badge>
            <Badge
              variant="secondary"
              className="border-gray-300 bg-background"
            >
              Designer
            </Badge>
            <Badge
              variant="secondary"
              className="border-gray-300 bg-background"
            >
              Ethical Hacker
            </Badge>
          </div>

          <h1
            className={
              "mb-6 text-5xl leading-tight font-bold text-gray-900 md:text-6xl lg:text-7xl dark:text-gray-100" +
              " " +
              poppinsFont.className
            }
          >
            Building digital experiences that{" "}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              matter
            </span>
          </h1>

          <div className="mx-auto mb-8 max-w-2xl rounded-lg border border-emerald-500/30 bg-black p-4 text-left font-mono dark:bg-gray-800/50">
            <div className="mb-2 flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-red-500"></div>
              <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
              <div className="h-3 w-3 rounded-full bg-green-500"></div>
              <span className="ml-auto text-sm text-gray-400">~/portfolio</span>
            </div>
            <div className="text-emerald-400">
              <span className="text-gray-500">Peterson@TopG:~$</span> whoami
            </div>
            <div className="mt-1 text-gray-300">
              Passionate full-stack developer with 3+ years crafting scalable
              web applications, elegant UIs, and robust systems that solve real
              problems.
            </div>
            {/* <div className="text-emerald-400">
              <span className="mr-2 text-gray-500">Peterson@TopG:~$</span>
              <input
                type="text"
                className="border-none caret-emerald-500 outline-none"
              /> 
              <Blinker />
            </div> */}
          </div>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="bg-purple-600 px-8 text-gray-200 hover:bg-purple-700"
              asChild
            >
              <a href="#projects">
                View my work
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button variant="outline" size="lg" className="px-8" asChild>
              <Link href="#contact">
                Let's connect
                <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      <section
        id="projects"
        className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8"
      >
        <div className="relative mx-auto max-w-6xl">
          {/* Section Header */}
          <div className="mb-16 text-center">
            <Badge
              variant="secondary"
              className="mb-4 border-gray-300 bg-background"
            >
              Featured Projects
            </Badge>
            {/* <h2
              className={
                "mb-6 text-4xl font-bold text-gray-900 md:text-5xl dark:text-gray-100" +
                " " +
                poppinsFont.className
              }
            >
              Projects that{" "}
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                showcase
              </span>{" "}
              my expertise
            </h2> */}
            {/* <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
              Here are two of my most impactful projects that demonstrate my
              skills in full-stack development.
            </p> */}
          </div>

          {/* Projects Grid */}
          <div className="grid items-center justify-center gap-8 md:grid-cols-2">
            {/* Project 1 */}
            <div className="col-span-1 place-content-center items-center">
              <h4 className="">Video Share</h4>
            </div>
            <div className="col-start-2 overflow-hidden rounded-xl">
              <Image
                alt="videoshare"
                src={"/videoshare.png"}
                width={1200}
                height={1200}
                className="size-full"
              />
            </div>
            {/* Project 2 */}
          </div>

          {/* View All Projects */}
          <div className="mt-12 text-center">
            <Button variant="outline" className="px-8" asChild>
              <Link href="/projects">
                View All Projects
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      <div className="min-h-screen"></div>
    </>
  );
}
