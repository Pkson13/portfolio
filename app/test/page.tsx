import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Download,
  Mail,
  Github,
  Linkedin,
  ExternalLink,
} from "lucide-react";
import { Poppins } from "next/font/google";

const poppinsFont = Poppins({ weight: ["400", "100", "600"] });

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Announcement Bar */}
      <div className="bg-black px-4 py-3 text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <span>
              🎉 Just launched my latest project - AI-powered task manager
            </span>
          </div>
          <Link
            href="#projects"
            className="flex items-center gap-1 hover:underline"
          >
            View project <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 font-bold text-white">
                J
              </div>
              <span className="text-xl font-semibold">peterson</span>
            </div>

            <div className="hidden items-center gap-8 md:flex">
              <Link
                href="#about"
                className="text-gray-600 transition-colors hover:text-gray-900"
              >
                About
              </Link>
              <Link
                href="#projects"
                className="text-gray-600 transition-colors hover:text-gray-900"
              >
                Projects
              </Link>
              <Link
                href="#skills"
                className="text-gray-600 transition-colors hover:text-gray-900"
              >
                Skills
              </Link>
              <Link
                href="#experience"
                className="text-gray-600 transition-colors hover:text-gray-900"
              >
                Experience
              </Link>
              <Link
                href="#contact"
                className="text-gray-600 transition-colors hover:text-gray-900"
              >
                Contact
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" asChild>
                <Link href="mailto:john@example.com">
                  <Mail className="mr-2 h-4 w-4" />
                  Email me
                </Link>
              </Button>
              <Button
                size="sm"
                className="bg-purple-600 hover:bg-purple-700"
                asChild
              >
                <Link href="/resume.pdf" target="_blank">
                  <Download className="mr-2 h-4 w-4" />
                  Download CV
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 h-20 w-20 rotate-12 rounded-lg border border-purple-900"></div>
          <div className="absolute top-40 right-20 h-16 w-16 rounded-full border border-blue-200"></div>
          <div className="absolute bottom-40 left-1/4 h-12 w-12 -rotate-12 rounded-lg border border-green-200"></div>
          <div className="absolute right-1/3 bottom-20 h-24 w-24 rounded-full border border-orange-200"></div>
        </div>

        <div className="relative mx-auto max-w-4xl text-center">
          <Badge
            variant="secondary"
            className="mb-6 border-purple-200 bg-purple-100 text-purple-700"
          >
            Full-Stack Developer
          </Badge>

          <h1
            className={
              "mb-6 text-5xl leading-tight font-bold text-gray-900 md:text-6xl lg:text-7xl" +
              " " +
              poppinsFont.className
            }
          >
            Building digital experiences that{" "}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              matter
            </span>
          </h1>

          <p className="mx-auto mb-8 max-w-2xl text-xl leading-relaxed text-gray-600">
            I'm a passionate full-stack developer with 5+ years of experience
            creating scalable web applications, beautiful user interfaces, and
            robust backend systems that solve real-world problems.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="bg-purple-600 px-8 hover:bg-purple-700"
              asChild
            >
              <Link href="#projects">
                View my work
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
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

      {/* Trusted By Section */}
      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center gap-8 lg:flex-row">
            <div className="lg:w-1/3">
              <h3 className="mb-2 text-lg font-semibold text-gray-900">
                Trusted by innovative companies
              </h3>
              <p className="text-gray-600">
                I've had the privilege to work with amazing teams and contribute
                to products used by thousands.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-8 opacity-60 lg:w-2/3 lg:justify-end">
              <div className="text-2xl font-bold text-gray-400">TechCorp</div>
              <div className="text-2xl font-bold text-gray-400">StartupXYZ</div>
              <div className="text-2xl font-bold text-gray-400">
                InnovateLab
              </div>
              <div className="text-2xl font-bold text-gray-400">
                DigitalFlow
              </div>
              <div className="text-2xl font-bold text-gray-400">CloudBase</div>
              <div className="text-2xl font-bold text-gray-400">DataSync</div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Preview Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <Badge
                variant="secondary"
                className="mb-4 border-blue-200 bg-blue-100 text-blue-700"
              >
                Technical Skills
              </Badge>
              <h2 className="mb-6 text-4xl font-bold text-gray-900">
                Pixel-perfect interfaces,{" "}
                <span className="text-purple-600">scalable architectures</span>
              </h2>
              <p className="mb-8 text-lg text-gray-600">
                From responsive React components to robust Node.js APIs, I craft
                solutions that are both beautiful and performant. Every line of
                code is written with maintainability and user experience in
                mind.
              </p>

              <div className="mb-8 grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-purple-600"></div>
                  <span className="text-gray-700">React & Next.js</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                  <span className="text-gray-700">TypeScript</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-green-600"></div>
                  <span className="text-gray-700">Node.js & Express</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-orange-600"></div>
                  <span className="text-gray-700">PostgreSQL & MongoDB</span>
                </div>
              </div>

              <Button variant="outline" asChild>
                <Link href="#skills">
                  View all skills
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="relative">
              <div className="rounded-2xl border bg-white p-6 shadow-xl">
                <div className="mb-4 flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full bg-red-400"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                  <div className="h-3 w-3 rounded-full bg-green-400"></div>
                  <span className="ml-auto text-sm text-gray-500">
                    Portfolio Dashboard
                  </span>
                </div>
                <div className="space-y-4">
                  <div className="h-4 w-3/4 rounded bg-gray-200"></div>
                  <div className="h-4 w-1/2 rounded bg-purple-200"></div>
                  <div className="flex h-20 items-center justify-center rounded-lg bg-gradient-to-br from-purple-100 to-blue-100">
                    <span className="font-medium text-gray-600">
                      Interactive Component
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <div className="h-8 flex-1 rounded bg-gray-200"></div>
                    <div className="flex h-8 items-center rounded bg-purple-600 px-4">
                      <span className="text-sm text-white">Deploy</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 rounded-lg bg-purple-600 p-3 text-white shadow-lg">
                <Github className="h-5 w-5" />
              </div>
              <div className="absolute -bottom-4 -left-4 rounded-lg bg-blue-600 p-3 text-white shadow-lg">
                <Linkedin className="h-5 w-5" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black px-4 py-8 text-white sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-gradient-to-br from-purple-600 to-blue-600 text-sm font-bold text-white">
              J
            </div>
            <span className="font-semibold">John Doe</span>
          </div>
          <div className="text-sm text-gray-400">
            Built with Next.js & Tailwind CSS
          </div>
        </div>
      </footer>
    </div>
  );
}
