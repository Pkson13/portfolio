import {
  Color,
  // Fog,
  Mesh,
  MeshBasicMaterial,
  Object3D,
  Scene,
} from "three";
import { FontLoader, TextGeometry } from "three/examples/jsm/Addons.js";

type changesceneFuncProps = Scene;

export const changeSceneToDarkMode = (scene: changesceneFuncProps) => {
  scene.background = new Color("white");
  // scene.fog = new Fog("black", 10, 15);
};
export const changeSceneToLightMode = (scene: changesceneFuncProps) => {
  // scene.fog = new Fog("white", 10, 15);
  scene.background = new Color("black");
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

export function dumpObject(
  obj: Object3D,
  lines = [] as string[],
  isLast = true,
  prefix = "",
) {
  const localPrefix = isLast ? "└─" : "├─";
  lines.push(
    `${prefix}${prefix ? localPrefix : ""}${obj.name || "*no-name*"} [${obj.type}]`,
  );
  if (obj.name === "Cube002") {
    console.log("cubeoo2");
    obj.position.set(1, 2, 3);
    console.log(obj);
    // const mesh = obj.children[0];
    // mesh.material?.color.set("#ff0000"); //still works don't know what's the problem
    obj.children.forEach((child) => {
      console.log("child", child);
      if (child instanceof Mesh) {
        child.material.color.set("green");
      }
      // child.material.map = null;
      // obj.remove(child);
    });
  }
  const newPrefix = prefix + (isLast ? "  " : "│ ");
  const lastNdx = obj.children.length - 1;
  obj.children.forEach((child, ndx) => {
    const isLast = ndx === lastNdx;
    dumpObject(child, lines, isLast, newPrefix);
  });
  return lines;
}
