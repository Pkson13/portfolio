import Root3d from "@/components/threejs/Root3d";
import React from "react";

const page = () => {
  return (
    <div className="fixed top-0 left-0 h-screen w-screen">
      <Root3d />
    </div>
  );
};

export default page;
