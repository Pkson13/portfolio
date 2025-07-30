import { PerspectiveCamera, Scene } from "three";
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
};
export type LoadAutumnForest = {
  // name: string;
  controls: OrbitControls;
  camera: PerspectiveCamera;
  scene: Scene;
};
