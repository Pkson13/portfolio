import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ThemeToggle } from "./ThemeToggle";

const Navbar = () => {
  return (
    <nav className="m-6 flex items-center font-(family-name:--font-bebas-neue) text-xl">
      <Link href={"/"}>TOP G</Link>
      <div className="ml-auto flex items-center gap-8">
        <Link href={"about"} className="">
          About me
        </Link>
        <Link href={"projects"}>projects</Link>
        <a
          href="google.com"
          className="rounded-xl bg-black px-2 py-1 text-white hover:cursor-pointer"
        >
          contact me
        </a>
        <Link href={"https://github.com/pkson13"} target="_blank">
          <Image
            src={"/icons8-github.svg"}
            alt="github"
            // className="size-12"
            width={32}
            height={32}
          />
        </Link>
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
