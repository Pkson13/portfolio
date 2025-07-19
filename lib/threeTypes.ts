import { Object3D, Object3DEventMap, PerspectiveCamera, Scene } from "three";
import { GLTFLoader, OrbitControls } from "three/examples/jsm/Addons.js";

export type loaderFuncProps = {
  loader: GLTFLoader;
  controls: OrbitControls;
  camera: PerspectiveCamera;
  scene: Scene;
  lambo?: Object3D<Object3DEventMap>;
};
export type loadIsland = {
  name: string;
  loader: GLTFLoader;
  controls: OrbitControls;
  camera: PerspectiveCamera;
  scene: Scene;
};
