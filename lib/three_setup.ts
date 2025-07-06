import {
  Audio,
  AudioListener,
  AudioLoader,
  Camera,
  Color,
  MathUtils,
  // Fog,
  Mesh,
  MeshBasicMaterial,
  Object3D,
  PlaneGeometry,
  RepeatWrapping,
  Scene,
  TextureLoader,
  Vector3,
  WebGLRenderer,
} from "three";
import {
  FontLoader,
  Sky,
  TextGeometry,
  Water,
} from "three/examples/jsm/Addons.js";
import GUI from "three/examples/jsm/libs/lil-gui.module.min.js";

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
    // obj.position.set(1, 2, 3);
    console.log(obj);
    // const mesh = obj.children[0];
    // mesh.material?.color.set("#ff0000"); //still works don't know what's the problem
    obj.children.forEach((child) => {
      console.log("child", child);
      if (child instanceof Mesh) {
        // child.material.color.set("green");
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

export function handlescenetheme(scene: Scene, theme: string | undefined) {
  const handleDarkMode = () => changeSceneToDarkMode(scene);
  const handleLightMode = () => changeSceneToLightMode(scene);
  document.body.addEventListener("darkmode", handleDarkMode);
  document.body.addEventListener("lightmode", handleLightMode);
  let backgroundColor;
  if (theme == "light") {
    backgroundColor = new Color("black");
    // scene.fog = new Fog("white", 10, 15);
  } else {
    // scene.fog = new Fog("black", 10, 15);
    backgroundColor = new Color("white");
  }
  console.log("fog", scene.fog);
  scene.fog = null;
  if (!backgroundColor) return;
  scene.background = backgroundColor;
}
export function getworldposition(camera: Camera) {
  const worldposyion = new Vector3();
  camera.getWorldPosition(worldposyion);
  console.log(worldposyion, "\nrotation\n", camera.rotation.clone());
}
export const setupSkyAndWater = (
  scene: Scene,
  renderer: WebGLRenderer,
  camera: Camera,
) => {
  const sky = new Sky();
  sky.scale.setScalar(450000);
  scene.add(sky);

  const sun = new Vector3();

  /// GUI

  const effectController = {
    turbidity: 0,
    rayleigh: 3, //- light/dark - 0.085
    mieCoefficient: 0.005,
    mieDirectionalG: 0.7,
    elevation: 2,
    azimuth: 180,
    exposure: renderer.toneMappingExposure,
  };

  function guiChanged() {
    const uniforms = sky.material.uniforms;
    uniforms["turbidity"].value = effectController.turbidity;
    uniforms["rayleigh"].value = effectController.rayleigh;
    uniforms["mieCoefficient"].value = effectController.mieCoefficient;
    uniforms["mieDirectionalG"].value = effectController.mieDirectionalG;

    const phi = MathUtils.degToRad(90 - effectController.elevation);
    const theta = MathUtils.degToRad(effectController.azimuth);

    sun.setFromSphericalCoords(1, phi, theta);

    uniforms["sunPosition"].value.copy(sun);

    renderer.toneMappingExposure = effectController.exposure;
    renderer.render(scene, camera);
  }

  const gui = new GUI();

  gui.add(effectController, "turbidity", 0.0, 20.0, 0.1).onChange(guiChanged);
  gui.add(effectController, "rayleigh", 0.0, 4, 0.001).onChange(guiChanged);
  gui
    .add(effectController, "mieCoefficient", 0.0, 0.1, 0.001)
    .onChange(guiChanged);
  gui
    .add(effectController, "mieDirectionalG", 0.0, 1, 0.001)
    .onChange(guiChanged);
  gui.add(effectController, "elevation", 0, 90, 0.1).onChange(guiChanged);
  gui.add(effectController, "azimuth", -180, 180, 0.1).onChange(guiChanged);
  gui.add(effectController, "exposure", 0, 1, 0.0001).onChange(guiChanged);

  guiChanged();
  const waterGeometry = new PlaneGeometry(10000, 10000);

  const water = new Water(waterGeometry, {
    textureWidth: 512,
    textureHeight: 512,
    waterNormals: new TextureLoader().load(
      "waternormals.jpg", // download this from Three.js examples
      (texture) => {
        texture.wrapS = texture.wrapT = RepeatWrapping;
      },
    ),
    sunDirection: new Vector3(),
    sunColor: 0xffffff,
    waterColor: 0x001e0f,
    distortionScale: 1.5, //controls how strongly the water surface distorts reflections and refractions.
    fog: true,
  });

  //rotate
  water.rotation.x = -Math.PI / 2;
  scene.add(water);
  return water;
};

export function loadaudio(camera: Camera) {
  const listener = new AudioListener();
  // camera.add(listener);

  // create a global audio source
  const sound = new Audio(listener);
  sound.autoplay = true;

  // load a sound and set it as the Audio object's buffer
  const audioLoader = new AudioLoader();
  audioLoader.load("audio/ocean sounds.mp3", function (buffer) {
    sound.setBuffer(buffer);
    sound.setLoop(true);
    sound.setVolume(0.5);
    sound.play();
  });
}
