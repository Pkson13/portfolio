import { LoadingManager, PerspectiveCamera, Scene } from "three";
import { GLTFLoader, OrbitControls } from "three/examples/jsm/Addons.js";

export type loaderFuncProps = {
  loader: GLTFLoader;
  controls: OrbitControls;
  camera: PerspectiveCamera;
  scene: Scene;
};
export type loadIsland = {
  name: string;
  loader: GLTFLoader;
  controls: OrbitControls;
  camera: PerspectiveCamera;
  scene: Scene;
  manager: LoadingManager;
};
export type LoadAutumnForest = {
  // name: string;q
  manager: LoadingManager;
  controls: OrbitControls;
  camera: PerspectiveCamera;
  scene: Scene;
};
