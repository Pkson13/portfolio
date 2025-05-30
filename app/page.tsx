// import Image from "next/image";
// import type { Metadata } from "next";

import Root3d from "@/components/threejs/Root3d";

// export const metadata: Metadata = {
//   themeColor: "#ffffff",
// };

export default function Home() {
  return (
    <>
      <Root3d />
      <div className="">Portfolio - test2</div>
    </>
  );
}
