// import Image from "next/image";
// import type { Metadata } from "next";

// import Root3d from "@/components/threejs/Root3d";
import Blinker from "@/components/blinker";
import Skills from "@/components/Skills";
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
      {/* <div id="smooth-wrapper" className="h-screen overflow-hidden"> */}
      <div id="smooth-content">
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
                "mb-6 text-4xl leading-tight font-bold text-balance text-gray-900 md:text-6xl lg:text-7xl dark:text-gray-100" +
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
                <span className="ml-auto text-sm text-gray-400">
                  ~/portfolio
                </span>
              </div>
              <div className="text-emerald-400">
                <span className="text-sm text-gray-500 sm:text-base">
                  Peterson@TopG:~$
                </span>{" "}
                whoami
              </div>
              <div className="mt-1 text-sm text-gray-300 sm:text-base">
                I'm <span className="text-red-400">Peterson</span>, a passionate
                full-stack developer with 3+ years crafting scalable web
                applications, elegant UIs, and robust systems that solve real
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
          className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-8"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0">
            <div className="absolute top-20 right-10 h-20 w-20 rotate-45 rounded-lg border border-purple-900/50"></div>
            <div className="absolute bottom-40 left-20 h-16 w-16 rounded-full border border-blue-900/50"></div>
            <div className="absolute top-1/2 right-1/3 h-12 w-12 -rotate-12 rounded-lg border border-green-900/50"></div>
          </div>

          <div className="relative mx-auto max-w-6xl">
            {/* Section Header */}
            <div className="mb-16 text-center">
              <Badge
                variant="secondary"
                className="mb-4 border-gray-300 bg-background"
              >
                Featured Projects
              </Badge>
              <h2
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
              </h2>
              <p className="mx-auto max-w-2xl text-gray-600 dark:text-gray-300">
                Here are two of my most impactful projects that demonstrate my
                skills in full-stack development.
              </p>
            </div>

            {/* Projects Grid */}
            <div className="space-y-20">
              {/* Project 1 */}
              <div
                className="grid items-center gap-8 md:grid-cols-2"
                id="videoshareproj"
              >
                <div
                  className="col-span-1 place-content-center items-center"
                  id="video-share-desc"
                >
                  <h4 className={`secondary-header mb-4`}>Video Share</h4>
                  <p className="mb-6 leading-relaxed text-gray-600 dark:text-gray-300">
                    A real-time video and messaging app using webrtc and
                    socket.io. no third party services involved.
                  </p>
                  <div className="mb-6 flex gap-3">
                    <Button
                      size="sm"
                      className="bg-purple-600 text-white hover:bg-purple-700"
                      asChild
                    >
                      <Link
                        href="https://video-share-uju2.onrender.com/"
                        target="_blank"
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Live Demo
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link
                        href="https://github.com/Pkson13/Video_share"
                        target="_blank"
                      >
                        <svg
                          className="mr-2 h-4 w-4"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        GitHub
                      </Link>
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge
                      variant="secondary"
                      className="border-purple-300 bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300"
                    >
                      Webrtc
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="border-blue-300 bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300"
                    >
                      Express.js
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="border-green-300 bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300"
                    >
                      Socket.io
                    </Badge>
                  </div>
                </div>
                <div
                  className="overflow-hidden rounded-xl md:col-start-2"
                  id="video-share-img"
                >
                  <Image
                    alt="videoshare"
                    src="/videoshare.png"
                    width={1200}
                    height={1200}
                    className="size-full scale-[102%] object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              </div>

              {/* Project 2 */}
              <div
                className="grid items-center justify-center gap-8 md:grid-cols-2"
                id="videoshareproj2"
              >
                <div className="overflow-hidden rounded-xl">
                  <Image
                    alt="security dashboard"
                    src="/placeholder.svg?height=600&width=800"
                    width={1200}
                    height={1200}
                    className="size-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="col-span-1 place-content-center items-center">
                  <h4 className={`secondary-header mb-4`}>
                    Security Dashboard
                  </h4>
                  <p className="mb-6 leading-relaxed text-gray-600 dark:text-gray-300">
                    A comprehensive cybersecurity monitoring platform with
                    real-time threat detection and automated responses.
                  </p>
                  <div className="mb-6 flex gap-3">
                    <Button
                      size="sm"
                      className="bg-blue-600 text-white hover:bg-blue-700"
                      asChild
                    >
                      <Link href="#" target="_blank">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Live Demo
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="#" target="_blank">
                        <svg
                          className="mr-2 h-4 w-4"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        GitHub
                      </Link>
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge
                      variant="secondary"
                      className="border-blue-300 bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300"
                    >
                      React
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="border-green-300 bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300"
                    >
                      MongoDB
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="border-purple-300 bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300"
                    >
                      Socket.io
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* View All Projects */}
            <div className="mt-16 text-center">
              <Button variant="outline" className="px-8" asChild>
                <Link href="/projects">
                  View All Projects
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
        <Skills />
      </div>
      {/* </div> */}
    </>
  );
}
