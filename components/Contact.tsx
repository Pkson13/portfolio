import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
  return (
    // <div id="footer-wrapper" className="">
    <footer
      id="fotter"
      className="absolute top-0 left-0 z-700 h-fit w-screen translate-y-[150%]"
    >
      <div
        id="fotter-container"
        className="mx-auto mb-20 h-fit w-full bg-background px-5"
      >
        <div className="grid grid-cols-1 gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold tracking-tight">ABOUT ME</h3>
            <div className="space-y-1 text-sm text-balance text-neutral-600 dark:text-neutral-300">
              <p>Student at Mount Kenya University</p>
              <p>Pursuing a degree in Computer Science</p>
              <p>and Information Technology</p>
            </div>
          </div>

          {/* Social & Contact */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-neutral-900 dark:text-white">
                Connect
              </h4>
              <div className="space-y-3">
                <Link
                  href="https://x.com/of_head26431"
                  target="_blank"
                  className="group flex items-center gap-3 text-sm text-neutral-600 transition-all duration-200 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="100"
                    height="100"
                    viewBox="0 0 50 50"
                    fill="currentColor"
                    className="size-6 shrink-0 bg-background text-foreground group-hover:text-neutral-900 dark:text-neutral-400 dark:group-hover:text-white"
                  >
                    <path d="M 11 4 C 7.134 4 4 7.134 4 11 L 4 39 C 4 42.866 7.134 46 11 46 L 39 46 C 42.866 46 46 42.866 46 39 L 46 11 C 46 7.134 42.866 4 39 4 L 11 4 z M 13.085938 13 L 21.023438 13 L 26.660156 21.009766 L 33.5 13 L 36 13 L 27.789062 22.613281 L 37.914062 37 L 29.978516 37 L 23.4375 27.707031 L 15.5 37 L 13 37 L 22.308594 26.103516 L 13.085938 13 z M 16.914062 15 L 31.021484 35 L 34.085938 35 L 19.978516 15 L 16.914062 15 z"></path>
                  </svg>
                  Twitter / X
                </Link>
                <Link
                  href="https://www.linkedin.com/in/peterson-kinyanjui-5308b1317/"
                  target="_blank"
                  className="group flex items-center gap-3 text-sm text-neutral-600 transition-all duration-200 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="100"
                    height="100"
                    viewBox="0 0 50 50"
                    className="size-6 shrink-0 bg-background text-foreground group-hover:text-neutral-900 dark:text-neutral-400 dark:group-hover:text-white"
                    fill="currentColor"
                  >
                    <path d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M17,20v19h-6V20H17z M11,14.47c0-1.4,1.2-2.47,3-2.47s2.93,1.07,3,2.47c0,1.4-1.12,2.53-3,2.53C12.2,17,11,15.87,11,14.47z M39,39h-6c0,0,0-9.26,0-10 c0-2-1-4-3.5-4.04h-0.08C27,24.96,26,27.02,26,29c0,0.91,0,10,0,10h-6V20h6v2.56c0,0,1.93-2.56,5.81-2.56 c3.97,0,7.19,2.73,7.19,8.26V39z"></path>
                  </svg>{" "}
                  LinkedIn
                </Link>
                <Link
                  href="https://github.com/Pkson13"
                  target="_blank"
                  className="group flex items-center gap-3 text-sm text-neutral-600 transition-all duration-200 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                >
                  <svg viewBox="0 0 438.549 438.549" className="size-6">
                    <path
                      fill="currentColor"
                      d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z"
                    ></path>
                  </svg>{" "}
                  GitHub
                </Link>

                <Link
                  href="https://www.tiktok.com/@top_g.ke"
                  target="_blank"
                  className="group flex items-center gap-3 text-sm text-neutral-600 transition-all duration-200 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-tiktok"
                    viewBox="0 0 16 16"
                  >
                    <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z" />
                  </svg>
                  Tiktok
                </Link>
                <Link
                  target="_blank"
                  href="https://www.chess.com/member/topg_ke"
                  className="group flex items-center gap-3 text-sm text-neutral-600 transition-all duration-200 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                >
                  Chess.com
                </Link>
              </div>
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
                  hello@kinyanjui.dev
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
                  business@kinyanjui.dev
                </Link>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="lg:col-span-2">
            <div className="ml-auto max-w-md">
              <h2 className="mb-8 text-2xl leading-tight font-semibold tracking-tight sm:text-3xl lg:text-4xl">
                Get in touch
              </h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900 dark:bg-white">
                    <Mail className="h-5 w-5 text-white dark:text-neutral-900" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-neutral-900 md:text-sm dark:text-white">
                      Email me
                    </p>
                    <Link
                      href="mailto:kinyanjuipeterson12787@gmail.com"
                      className="text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white"
                    >
                      kinyanjuipeterson12787@gmail.com
                    </Link>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900 dark:bg-white">
                    <Phone className="h-5 w-5 text-white dark:text-neutral-900" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-neutral-900 md:text-sm dark:text-white">
                      Call me
                    </p>
                    <Link
                      href="tel:+254706169658"
                      className="text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white"
                    >
                      +254 706 169 658
                    </Link>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900 dark:bg-white">
                    <MapPin className="h-5 w-5 text-white dark:text-neutral-900" />
                  </div>
                  <div>
                    <p className="test-xs font-medium text-neutral-900 md:text-sm dark:text-white">
                      Location
                    </p>
                    <p className="text-neutral-600 dark:text-neutral-300">
                      Nairobi, Kenya
                    </p>
                  </div>
                </div>

                <Button
                  asChild
                  className="w-full bg-neutral-900 font-medium text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100"
                >
                  <Link
                    href="https://api.whatsapp.com/send?phone=254706169658"
                    target="_blank"
                    className="flex items-center justify-center gap-2"
                  >
                    Let&apos;s Talk
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          id="bottom_bar "
          className="flex flex-col items-center justify-between gap-4 border-t border-neutral-200 bg-background py-6 md:flex-row dark:border-neutral-700"
        >
          <div className="flex items-center gap-2">
            <span className="animat h-2 w-2 animate-pulse rounded-full bg-green-300 duration-400"></span>
            <p className="text-sm text-neutral-900 dark:text-white">
              Available for hire
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link
              href="#"
              className="text-sm text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white"
            >
              R&amp;D: labs.topg.ke
            </Link>
            <p className="flex items-center gap-1 text-sm text-neutral-600 dark:text-neutral-300">
              Built by Peterson with <span className="text-red-500">❤️</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
    // </div>
  );
};

export default Contact;
