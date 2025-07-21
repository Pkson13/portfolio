import Buttons3d from "./Buttons3d";

const SceneWords = () => {
  return (
    <div className="pointer-events-none absolute top-0 left-0 h-full w-full bg-transparent p-4">
      {/* DOCKER */}
      <div className="absolute top-1/4 left-1/2 z-[100] -translate-x-1/2 overflow-hidden">
        <span
          className="block -translate-y-80 text-3xl font-semibold tracking-wide text-gray-100 md:text-7xl"
          id="scene-words"
        >
          Docker
        </span>
      </div>

      {/* KUBERNETES */}
      <div className="absolute top-1/2 left-1/2 z-[101] -translate-x-1/2 overflow-hidden">
        <span
          className="block -translate-y-80 text-3xl font-semibold tracking-wide text-gray-100 md:text-6xl"
          id="k8s-words"
        >
          KUBERNETES
        </span>
      </div>

      {/* LINUX */}
      <div className="absolute top-[65%] left-1/2 z-[102] -translate-x-1/2 overflow-hidden">
        <span
          className="block -translate-y-80 text-3xl font-semibold tracking-wide text-gray-100 md:text-6xl"
          id="linux-words"
        >
          LINUX
        </span>
      </div>

      {/* NEXTJS */}
      <div className="absolute right-1/4 bottom-1/4 z-[103] overflow-hidden">
        <span
          className="block translate-y-full text-3xl font-semibold tracking-wide text-gray-900 md:text-6xl"
          id="nextjs-word"
        >
          NEXTJS
        </span>
      </div>

      <Buttons3d />
    </div>
  );
};

export default SceneWords;
