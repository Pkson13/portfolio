import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
  return (
    <>
      <footer
        id="fotter"
        className="relative z-30 w-screen translate-y-full bg-background"
      >
        <div className="container mx-auto px-5">
          <div className="grid grid-cols-1 gap-12 py-16 lg:grid-cols-4">
            {/* Company Info */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold tracking-tight">BLOG</h3>
              <div className="space-y-1 text-sm text-neutral-600 dark:text-neutral-300">
                <p>Suite 2</p>
                <p>9 Marsh Street</p>
                <p>Bristol, BS1 4AA</p>
                <p>United Kingdom</p>
              </div>
            </div>

            {/* Social & Contact */}
            <div className="space-y-8">
              <div className="space-y-3">
                <Link
                  href="#"
                  className="block text-sm text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white"
                >
                  Twitter / X
                </Link>
                <Link
                  href="#"
                  className="block text-sm text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white"
                >
                  Instagram
                </Link>
                <Link
                  href="#"
                  className="block text-sm text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white"
                >
                  LinkedIn
                </Link>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-neutral-900 dark:text-white">
                    General enquiries
                  </p>
                  <Link
                    href="mailto:hello@blog.co"
                    className="text-sm text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white"
                  >
                    hello@blog.co
                  </Link>
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-900 dark:text-white">
                    New business
                  </p>
                  <Link
                    href="mailto:business@blog.co"
                    className="text-sm text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white"
                  >
                    business@blog.co
                  </Link>
                </div>
              </div>
            </div>

            {/* Contact Section */}
            <div className="lg:col-span-2">
              <div className="ml-auto max-w-md">
                <h2 className="mb-8 text-4xl leading-tight font-bold tracking-tight lg:text-5xl">
                  Get in touch
                </h2>

                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-900 dark:bg-white">
                      <Mail className="h-5 w-5 text-white dark:text-neutral-900" />
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900 dark:text-white">
                        Email us
                      </p>
                      <Link
                        href="mailto:contact@blog.co"
                        className="text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white"
                      >
                        contact@blog.co
                      </Link>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-900 dark:bg-white">
                      <Phone className="h-5 w-5 text-white dark:text-neutral-900" />
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900 dark:text-white">
                        Call us
                      </p>
                      <Link
                        href="tel:+441234567890"
                        className="text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white"
                      >
                        +44 123 456 7890
                      </Link>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-900 dark:bg-white">
                      <MapPin className="h-5 w-5 text-white dark:text-neutral-900" />
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900 dark:text-white">
                        Visit us
                      </p>
                      <p className="text-neutral-600 dark:text-neutral-300">
                        Bristol, United Kingdom
                      </p>
                    </div>
                  </div>

                  <Button
                    asChild
                    className="w-full bg-neutral-900 font-medium text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100"
                  >
                    <Link
                      href="/contact"
                      className="flex items-center justify-center gap-2"
                    >
                      Let's Talk
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col items-center justify-between gap-4 border-t border-neutral-200 py-6 md:flex-row dark:border-neutral-700">
            <p className="text-sm text-neutral-600 dark:text-neutral-300">
              ©2024 Blog Creative Studio
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="#"
                className="text-sm text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white"
              >
                R&D: labs.blog.co
              </Link>
              <p className="flex items-center gap-1 text-sm text-neutral-600 dark:text-neutral-300">
                Built by Blog with <span className="text-red-500">❤️</span>
              </p>
            </div>
          </div>
        </div>
      </footer>
      {/* <div className="h-screen w-screen"></div> */}
    </>
  );
};

export default Contact;
