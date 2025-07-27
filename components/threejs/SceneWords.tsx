import Buttons3d from "./Buttons3d";

const SceneWords = () => {
  return (
    <div
      id="scene-words"
      className="absolute top-0 left-0 h-full w-full bg-transparent p-4"
    >
      {/* DOCKER */}
      <div className="absolute top-[65%] left-1/2 z-[100] -translate-x-1/2 overflow-hidden">
        <span
          className="block -translate-y-80 text-2xl font-semibold tracking-wide text-gray-100 md:text-4xl"
          id="scene-words"
        >
          Docker
        </span>
      </div>

      {/* KUBERNETES */}
      <div className="absolute top-[65%] left-1/2 z-[101] inline-flex -translate-x-1/2">
        <span
          className="block text-2xl font-semibold tracking-wide text-gray-100 md:text-4xl"
          id="k8s-words"
        >
          KUBERNETES
        </span>
      </div>

      {/* LINUX */}
      <div className="absolute top-[65%] left-1/2 z-[102] -translate-x-1/2 overflow-hidden">
        <span
          className="block text-2xl font-semibold tracking-wide text-gray-100 md:text-4xl"
          id="linux-words"
        >
          LINUX
        </span>
      </div>

      {/* REACT */}
      <div className="absolute top-[65%] left-1/2 z-[103] overflow-hidden">
        <span
          className="block text-2xl font-semibold tracking-wide text-gray-100 md:text-4xl"
          id="react-words"
        >
          REACT
        </span>
      </div>

      <Buttons3d />
    </div>
  );
};

export default SceneWords;
