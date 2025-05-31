import { Color, Fog, Mesh, MeshBasicMaterial, Scene } from "three";
import { FontLoader, TextGeometry } from "three/examples/jsm/Addons.js";

type changesceneFuncProps = Scene;

export const changeSceneToDarkMode = (scene: changesceneFuncProps) => {
  scene.background = new Color("black");
  scene.fog = new Fog("black", 10, 15);
};
export const changeSceneToLightMode = (scene: changesceneFuncProps) => {
  scene.fog = new Fog("white", 10, 15);
  scene.background = new Color("white");
};

type create3dTextprops = {
  textinput: string;
  scene: Scene;
};

export const create3dText = ({ textinput, scene }: create3dTextprops) => {
  const loader = new FontLoader();
  loader.load(
    "/fonts/Bebas Neue_Regular.json",
    (font) => {
      console.log(font);
      const text = new TextGeometry(textinput, {
        font,
        size: 0.51,
        depth: 0,
      });
      const testmat = new MeshBasicMaterial({ color: "green" });
      const mesh = new Mesh(text, testmat);
      mesh.position.set(-5, 0, 0);
      scene.add(mesh);
    },
    function (xhr) {
      console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    },
    () => {
      console.log("error while loading font");
    },
  );
};
