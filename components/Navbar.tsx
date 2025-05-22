import Image from "next/image";
import React from "react";

const Navbar = () => {
  return (
    <nav className="m-6 flex items-center font-(family-name:--font-bebas-neue) text-xl">
      <span>TOP G</span>
      <div className="ml-auto flex items-center gap-8">
        <span className="">About me</span>
        <span>projects</span>
        <span className="rounded-xl bg-black px-2 py-1 text-white hover:cursor-pointer">
          contact me
        </span>
        <span>
          <Image
            src={"/icons8-github.svg"}
            alt="github"
            // className="size-12"
            width={32}
            height={32}
          />
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
