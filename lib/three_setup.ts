import {
  Audio,
  AudioListener,
  AudioLoader,
  AxesHelper,
  Camera,
  Color,
  DoubleSide,
  Group,
  LoadingManager,
  Material,
  MathUtils,
  // Fog,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  Object3D,
  Object3DEventMap,
  PlaneGeometry,
  Quaternion,
  RepeatWrapping,
  Scene,
  Sprite,
  SpriteMaterial,
  Texture,
  TextureLoader,
  Vector3,
  WebGLRenderer,
} from "three";
import {
  FontLoader,
  GLTF,
  GLTFLoader,
  OrbitControls,
  Sky,
  TextGeometry,
  Water,
} from "three/examples/jsm/Addons.js";
import GUI from "three/examples/jsm/libs/lil-gui.module.min.js";
import { LoadAutumnForest, loaderFuncProps, loadIsland } from "./threeTypes";
import gsap from "gsap";
import { Meh } from "lucide-react";
import { degToRad, radToDeg } from "three/src/math/MathUtils.js";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useContext } from "react";
import { buttonrefctx } from "@/components/Skills";
import { SplitText } from "gsap/SplitText";

type changesceneFuncProps = Scene;

export const changeSceneToDarkMode = (scene: changesceneFuncProps) => {
  scene.background = new Color("white");
  // scene.fog = new Fog("black", 10, 15);
};
export const changeSceneToLightMode = (scene: changesceneFuncProps) => {
  // scene.fog = new Fog("white", 10, 15);
  scene.background = new Color("black");
};

export const create3dText = async (
  textinput: string,
  material?: Material | undefined | null,
): Promise<Mesh> => {
  const customLoadingManager = new LoadingManager();
  customLoadingManager.onStart = function (url, itemsLoaded, itemsTotal) {
    console.log(
      "Started loading font on custom manager" +
        url +
        ".\nLoaded " +
        itemsLoaded +
        " of " +
        itemsTotal +
        " files.",
    );
  };

  customLoadingManager.onLoad = function () {
    console.log("Loading font complete on custom manager!");
  };

  customLoadingManager.onProgress = function (url, itemsLoaded, itemsTotal) {
    console.log(
      "Loading font: " +
        url +
        ".\nLoaded " +
        itemsLoaded +
        " of " +
        itemsTotal +
        " files.",
    );
  };

  customLoadingManager.onError = function (url) {
    console.log("There was an error loading " + url);
  };
  const loader = new FontLoader(customLoadingManager);
  let mesh: Mesh;
  return new Promise((res, rej) => {
    loader.load(
      "/fonts/Bebas Neue_Regular.json",
      (font) => {
        console.log(font);
        const text = new TextGeometry(textinput, {
          font,
          size: 1.7,
          depth: 0.5,
          // bevelEnabled: true,
          // beve
        });
        // if (material == null) return;
        const testmat = new MeshBasicMaterial({
          color: "blue",
          // map: material,
        });
        mesh = new Mesh(text, testmat);
        if (material) mesh.material = material;
        // mesh.position.set(-5, 0, 0);
        // scene.add(mesh);
        res(mesh);
      },
      function (xhr) {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      () => {
        rej("error while loading font");
        // console.log();
      },
    );
  });
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
  if (obj.name == "body001outline" || obj.name == "terrain001outline") {
    obj.position.set(15, 4, 0);
    obj.clear();
  }
  if (obj.name == "body" || obj.name == "Object001" || obj.name == "glass") {
    obj.position.set(15, 4, 0);
    obj.clear();
  }
  if (obj.name === "Cube002") {
    console.log("cubeoo2");
    // obj.position.set(1, 2, 3);
    console.log("cobe002", obj);
    obj.clear();
    // console.warn("env", process.env.NEXT_PUBLIC_PROD);
    // const mesh = obj.children[0] as Mesh;
    // mesh.material = mesh.material.clone(); //all containera share the same material by refrence so without clone it willchange  all containers
    // mesh.material.color.set("#ff0000");
    //still works don't know what's the problem
    obj.children.forEach((child) => {
      console.log("child", child);
      if (child instanceof Mesh) {
        // child.material.color.set("green");
        console.log(child.geometry.attributes.position.array);
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

  // const gui = new GUI();

  // gui.add(effectController, "turbidity", 0.0, 20.0, 0.1).onChange(guiChanged);
  // gui.add(effectController, "rayleigh", 0.0, 4, 0.001).onChange(guiChanged);
  // gui
  //   .add(effectController, "mieCoefficient", 0.0, 0.1, 0.001)
  //   .onChange(guiChanged);
  // gui
  //   .add(effectController, "mieDirectionalG", 0.0, 1, 0.001)
  //   .onChange(guiChanged);
  // gui.add(effectController, "elevation", 0, 90, 0.1).onChange(guiChanged);
  // gui.add(effectController, "azimuth", -180, 180, 0.1).onChange(guiChanged);
  // gui.add(effectController, "exposure", 0, 1, 0.0001).onChange(guiChanged);

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

export const loadDockerModel = async ({
  loader: glftLoader,
  controls,
  camera,
  scene,
  // lambo,
}: loaderFuncProps) => {
  return await new Promise<Group<Object3DEventMap>>((resolve) => {
    glftLoader.load("/models/moby_dock_docker_whale.glb", async (data) => {
      console.log("loaded glb file", data);
      console.log("model scale", data.scene.scale);
      scene.add(data.scene);
      controls.target = data.scene.position;
      data.scene.position.set(20, 1, 0);
      camera.position.set(
        15.405193262355265,
        1.7046355310666237,
        8.853882753462061,
      );

      const wheel = await new Promise<Group<Object3DEventMap>>((resolve) => {
        const customLoadingManager = new LoadingManager();
        customLoadingManager.onStart = function (url, itemsLoaded, itemsTotal) {
          console.log(
            "Started loading file:  on custom manager" +
              url +
              ".\nLoaded " +
              itemsLoaded +
              " of " +
              itemsTotal +
              " files.",
          );
        };

        customLoadingManager.onLoad = function () {
          console.log("Loading complete on custom manager!");
        };

        customLoadingManager.onProgress = function (
          url,
          itemsLoaded,
          itemsTotal,
        ) {
          console.log(
            "Loading file: " +
              url +
              ".\nLoaded " +
              itemsLoaded +
              " of " +
              itemsTotal +
              " files.",
          );
        };

        customLoadingManager.onError = function (url) {
          console.log("There was an error loading " + url);
        };
        const glftLoader = new GLTFLoader(customLoadingManager);

        glftLoader.load("/models/ship_steering_wheel.glb", (wheel_data) => {
          data.scene.add(wheel_data.scene);
          // const axesHelper = new AxesHelper(100);
          // wheel_data.scene.add(axesHelper);

          wheel_data.scene.name = "wheel";
          wheel_data.scene.scale.setScalar(0.5);
          const cube9 = data.scene.getObjectByName("Cube009");
          if (cube9) {
            const child = cube9.children[0] as Mesh;
            cube9.parent?.remove(cube9);
            child.geometry.dispose();
            child.material.dispose();
            // cube9.remove(child.children[0]);

            console.log("cude9 pos", cube9.position);
            cube9.position.set(-30, -30, 3);

            console.log("found cube9", cube9);
            // cube9.disp
            // wheel_data.scene.children[0].children[0].children[0].material.color =
            // cube1.children[0].material;
            // new Color("#fff");
            // new MeshStandardMaterial({ color: "white" });
          }
          wheel_data.scene.position.set(-1.5, 0.5, -0.3);
          const target = new Vector3();
          wheel_data.scene.getWorldPosition(target);
          console.log("wheel global pos before animation", target);
          // controls.target = target;
          // wheel_data.scene.rotation.z = -degToRad(90);
          wheel_data.scene.rotation.y = degToRad(90);
          // wheel_data.scene.rotation.z = degToRad(20);
          // wheel_data.scene.rotation.set(0, degToRad(90), 0, "XYZ");
          console.log("wheel_data.scene", wheel_data.scene);
          // controls.target = wheel_data.scene.position;
          resolve(wheel_data.scene);
        });
      });

      function searchForWheel(scene: Object3D): Object3D | undefined {
        for (const child of scene.children) {
          console.log(child.name);
          if (child.name == "Wheel") {
            // return child;
            return child;
          }
          const wheel: Object3D | undefined = searchForWheel(child);
          if (wheel) return wheel;
          // console.log("ret", wheel);
        }
        return undefined;
      }

      // const ships_wheel = searchForWheel(wheel);
      // const pivot = new Object3D();
      // if (ships_wheel) {
      //   console.log(ships_wheel);

      //   // 3. Position the pivot at the wheel’s center
      //   pivot.position.copy(ships_wheel.position);
      //   console.log("pivot pos", pivot.position);
      //   console.log("pivot pos", pivot.position);

      //   // 4. Reposition the wheel so that it's centered in pivot’s local space
      //   ships_wheel.position.set(0, 0, 0); // reset relative position

      //   // 5. Add wheel to pivot and pivot to the scene (or original parent)
      //   pivot.add(ships_wheel);
      //   pivot.position.y += 10;
      //   wheel.add(pivot); // or wheel.parent.add(pivot), depending on your structure

      //   // 6. Rotate the pivot, not the wheel
      //   // pivot.rotation.y += 0.05;
      //   // ships_wheel.parent;
      // }
      // data.scene.matrixAutoUpdate = false;
      // controls.autoRotate = true;
      // data.scene.updateMatrix();
      // data.scene.scale.setScalar(2);

      ModelAnimations(data, camera, controls, scene);

      const res = dumpObject(data.scene).join("\n");
      console.log(res);

      const quaternion = new Quaternion();
      quaternion.setFromAxisAngle(new Vector3(0, 1, 0), Math.PI / 2);

      resolve(data.scene);
    });
  });
};

function ModelAnimations(
  data: GLTF,
  camera: Camera,
  controls: OrbitControls,
  scene: Scene,
) {
  // const Enter3dButtonref = useContext(buttonrefctx);
  // controls.enablePan = false;
  // controls.enableZoom = false;
  let x_r = 0;
  let z_r = 0;
  gsap.to(
    {},
    {
      repeat: -1,
      duration: 0.016, // roughly 60fps
      onUpdate: () => {
        x_r += 0.02; // adjust to control rocking speed
        z_r += 0.015;

        data.scene.rotation.x = Math.sin(x_r) * 0.05; // pitch
        data.scene.rotation.z = Math.sin(z_r) * 0.03;
      },
    },
  );
  const k8sWheel = data.scene.getObjectByName("wheel");
  if (!k8sWheel) {
    console.error("wheel not found");
    return;
  }

  const target = new Vector3();
  k8sWheel.getWorldPosition(target);
  const controlsTarget = {
    x_v: data.scene.position.x,
    y_v: data.scene.position.y,
    z_v: data.scene.position.z,
  };
  // target.y += 2;

  // console.log("wheel pos", k8sWheel.position);
  // controls.target = target;

  const skillstl = gsap.timeline({
    // paused: true,
    scrollTrigger: {
      trigger: "#scene-wrapper",
      start: "top -20%",
      snap: {
        snapTo: "labels",
        duration: 2,
        ease: "none",
        inertia: false,
        directional: false,
      },
      // onUpdate: (self) => {
      //   if (self.direction > 0) {
      //     skillstl.play();
      //   } else {
      //     skillstl.reverse();
      //   }
      // },
      // scrub: true,
      // onEnter: () => (controls.enabled = false),
      // onLeave: () => (controls.enabled = true),
      // onEnterBack: () => (controls.enabled = false),
      // onLeaveBack: () => (controls.enabled = true),
    },
  });
  skillstl.addLabel("docker");

  skillstl.to(camera.position, {
    x: data.scene.position.x,
    y: data.scene.position.y,
    z: data.scene.position.z + 5,
    ease: "none",
    duration: 2,
    onStart: () => {
      controls.autoRotate = false;
    },

    // delay: 2,
  });
  const k8s_words = SplitText.create("#k8s-words", {
    type: "chars",
    // mask: "chars",
  });
  const linux_words = SplitText.create("#linux-words", {
    type: "chars",
    // mask: "chars",
  });
  const react_words = SplitText.create("#react-words", {
    type: "chars",
    // mask: "chars",
  });
  skillstl
    .addLabel("kubernetes")
    .to(camera.position, {
      x: data.scene.position.x + 1,
      y: data.scene.position.y + 1,
      z: data.scene.position.z - 2,
      ease: "none",
      duration: 2,

      delay: 2,
    })
    .to(
      controlsTarget,
      {
        x_v: target.x,
        y_v: target.y,
        z_v: target.z,
        ease: "none",
        duration: 2,

        onUpdate: () => {
          // k8sWheel.getWorldPosition(target);
          controls.target = new Vector3(
            controlsTarget.x_v,
            controlsTarget.y_v,
            controlsTarget.z_v,
          );
          // console.log(controlsTarget);
          // controls.update();
        },

        // delay: 2,
      },

      "<",
    )
    .from(
      k8s_words.chars,
      {
        yPercent: -100,
        duration: 1.5,
        stagger: 0.05,
        autoAlpha: 0,
        // opacity: 0,
        ease: "power3.out",
      },
      // "<",
    )
    .to(
      k8s_words.chars,
      {
        yPercent: 100,
        duration: 2,
        stagger: 0.05,
        autoAlpha: 0,
        ease: "back.in",
      },
      // "<",
    );

  const DesertRoad = scene.getObjectByName("desert_road");
  if (!DesertRoad) {
    console.log("linux model not found");
    return;
  }
  const LinuxModel = DesertRoad.getObjectByName("linux model");
  if (!LinuxModel) {
    console.log("not found");
    return;
  }
  const linuxtarget = new Vector3();
  const controlsTarget2 = {
    x_v: target.x,
    y_v: target.y,
    z_v: target.z,
  };

  LinuxModel.getWorldPosition(linuxtarget);
  // skillstl.addLabel("linux model");
  skillstl
    .addLabel("linux model")
    .to(
      camera.position,
      {
        x: 16,
        y: 3,
        z: -10,
        ease: "none",
        duration: 2,
        // onComplete: () => {
        //   controls.target = linuxtarget;
        // },

        // delay: 2,
      },
      // "linux model",
      // ">",
    )
    .to(
      controlsTarget2,
      {
        x_v: 15.405193262355265,
        y_v: 0,
        z_v: -16.853882753462061,
        ease: "none",
        duration: 2,

        onUpdate: () => {
          // k8sWheel.getWorldPosition(target);
          controls.target = new Vector3(
            controlsTarget2.x_v,
            controlsTarget2.y_v,
            controlsTarget2.z_v,
          );
          // console.log(controlsTarget);
          // controls.update();
        },

        // delay: 2,
      },

      // "linux model",
      "<",
    )
    .from(
      linux_words.chars,
      {
        yPercent: 100,
        duration: 1.5,
        stagger: 0.01,
        autoAlpha: 0,
        ease: "power3.out",
      },
      // "<",
    )

    .addLabel("nextjs")
    .to(
      camera.position,
      {
        x: DesertRoad.position.x,
        y: DesertRoad.position.y + 4,
        z: DesertRoad.position.z + 20,
        ease: "none",
        duration: 2,
        // onComplete: () => {
        //   controls.target = linuxtarget;
        // },

        // delay: 2,
      },
      // "linux model",
      // ">",
    )
    .to(
      controlsTarget2,
      {
        x_v: 10.405193262355265,
        y_v: 3,
        z_v: -15.853882753462061,
        ease: "none",
        duration: 2,

        onUpdate: () => {
          // k8sWheel.getWorldPosition(target);
          controls.target = new Vector3(
            controlsTarget2.x_v,
            controlsTarget2.y_v,
            controlsTarget2.z_v,
          );
          // console.log(controlsTarget);
          // controls.update();
        },

        // delay: 2,
      },

      // "linux model",
      "<",
    )
    .to(
      "#linux-words",
      {
        delay: 1,
        duration: 2,
        scrambleText: {
          text: "NEXTJS",
          // revealDelay: 1,
        },
        ease: "power3.out",
      },
      "<-25%",
    )
    .to(
      "#linux-words",
      {
        xPercent: 300,
        // autoAlpha: 1,
        duration: 2,
        stagger: 0.01,
        ease: "none",
        onComplete: () => {},
      },
      // "<",
    )
    .addLabel("react")
    .to(
      camera.position,
      {
        x: DesertRoad.position.x - 4,
        y: DesertRoad.position.y + 4,
        z: DesertRoad.position.z + 16,
        ease: "none",
        duration: 2,
        // onComplete: () => {
        //   controls.target = linuxtarget;
        // },

        // delay: 2,
      },
      // "linux model",
      // ">",
    )
    .to(
      controlsTarget2,
      {
        x_v: 6.405193262355265,
        y_v: 2,
        z_v: -18.853882753462061,
        ease: "none",
        duration: 2,

        onUpdate: () => {
          // k8sWheel.getWorldPosition(target);
          controls.target = new Vector3(
            controlsTarget2.x_v,
            controlsTarget2.y_v,
            controlsTarget2.z_v,
          );
          // console.log(controlsTarget);
          // controls.update();
        },

        // delay: 2,
      },

      // "linux model",
      "<",
    )
    .from(
      react_words.chars,
      {
        xPercent: -600,
        autoAlpha: 1,
        stagger: {
          each: 0.01,
          from: "end",
        },
        // delay: 1,
        duration: 1,

        ease: "power3.out",
      },
      "<",
    )
    .to(
      react_words.chars,
      {
        yPercent: 100,
        // autoAlpha: 1,
        duration: 2,
        delay: 1,
        stagger: 0.01,
        ease: "none",
        onComplete: () => {},
      },
      // "<",
    )
    .addLabel("gsap")
    .to(
      camera.position,
      {
        x: -8,
        y: 2,
        z: 1,
        ease: "none",
        duration: 2,
        // onComplete: () => {
        //   controls.target = linuxtarget;
        // },

        // delay: 2,
      },
      // "linux model",
      // ">",
    )
    .to(
      controlsTarget2,
      {
        x_v: -15,
        y_v: 2,
        z_v: 2,
        ease: "none",
        duration: 2,

        onUpdate: () => {
          // k8sWheel.getWorldPosition(target);
          controls.target = new Vector3(
            controlsTarget2.x_v,
            controlsTarget2.y_v,
            controlsTarget2.z_v,
          );
          // console.log(controlsTarget);
          // controls.update();
        },

        // delay: 2,
      },

      // "linux model",
      "<",
    )
    .set(["#G-path", "#S", "#A", "#P"], {
      drawSVG: "50%, 50%",
    })
    .fromTo(
      "#G-path",
      {
        drawSVG: "50% 50%",
      },
      {
        drawSVG: "0% 100%",
        duration: 2,
      },
      // "<",
    )
    .fromTo(
      "#S",
      {
        drawSVG: "50% 50%",
      },
      {
        drawSVG: "0% 100%",
        duration: 2,
      },
      "<",
    )
    .fromTo(
      "#A",
      {
        drawSVG: "50% 50%",
      },
      {
        drawSVG: "0% 100%",
        duration: 2,
      },
      "<",
    )
    .fromTo(
      "#P",
      {
        drawSVG: "50% 50%",
      },
      {
        drawSVG: "0% 100%",
        duration: 2,
        onComplete: () => {
          const hidetl = gsap
            .timeline({})
            .addLabel("hide gsap")
            .to({}, { delay: 2 })

            .fromTo(
              "#G-path",

              {
                drawSVG: "0% 100%",
                // duration: 2,
              },
              {
                drawSVG: "50% 50%",
              },

              // "<",
            )
            .fromTo(
              "#S",

              {
                drawSVG: "0% 100%",
                duration: 2,
              },
              {
                drawSVG: "50% 50%",
              },
              "<",
            )
            .fromTo(
              "#A",

              {
                drawSVG: "0% 100%",
                duration: 2,
              },
              {
                drawSVG: "50% 50%",
              },
              "<",
            )
            .fromTo(
              "#P",

              {
                drawSVG: "0% 100%",
                duration: 2,
              },
              {
                drawSVG: "50% 50%",
              },
              "<",
            )
            .to("#enter3d", {
              // opacity: 1,
              autoAlpha: 1,
              duration: 1,
              onComplete: () => {
                // linux_words.revert();
                // k8s_words.revert();
                // react_words.revert();
              },
            });
        },
      },
      "<",
    );

  // .to(
  //   "#netjs-word",
  //   {
  //     y: 0,
  //     duration: 2,
  //     stagger: 0.2,
  //     ease: "power3.out",
  //   },
  //   // "<",
  // )
  // .to(
  //   "#nextjs-word",
  //   {
  //     y: 100,
  //     duration: 2,
  //     stagger: 0.2,
  //     ease: "back.in",
  //   },
  //   // "<",
  // );

  // lookAtmodel(camera, data, controlsTarget2, controls, controlsTarget, scene_wrapper);

  // ScrollTrigger.create({
  //   trigger: "#scene-wrapper",
  //   start: "top -20%",
  //   snap: {
  //     snapTo: "labels",
  //     duration: 2,
  //     ease: "none",
  //   },
  //   onEnter: () => skillstl.play(),
  //   // onLeave: () => (controls.enabled = true),
  //   // onEnterBack: () => (controls.enabled = false),
  //   // onLeaveBack: () => (controls.enabled = true),
  // });
  // .to();
  // .to(camera.rotation, {
  //   x: degToRad(30),
  //   ease: "none",
  //   onStart: () => {
  //     controls.enabled = false;
  //   },
  //   // onComplete: () => {
  //   //   controls.enabled = true;
  //   // },
  //   // y: data.scene.position.y + 2,
  //   // z: data.scene.position.z + 3,
  //   duration: 2,
  // })

  // .to(camera.rotation, {
  //   x: degToRad(0),
  //   ease: "none",
  //   onStart: () => {
  //     controls.enabled = false;
  //   },
  //   onComplete: () => {
  //     controls.enabled = true;
  //   },
  //   // y: data.scene.position.y + 2,
  //   // z: data.scene.position.z + 3,
  //   duration: 2,
  // });
}
export const loadmushroom_suspended_island = ({
  // loader: glftLoader,
  controls,
  camera,
  scene,
  manager: customLoadingManager,
  // lambo,
}: LoadAutumnForest) => {
  const glftLoader = new GLTFLoader(customLoadingManager);
  glftLoader.load("/models/mushroom_suspended_island.glb", async (data) => {
    console.log("mushreoom", data);
    console.log("model scale", data.scene.scale);
    // data.scene.matrixAutoUpdate = false;
    // data.scene.updateMatrix();
    // data.scene.scale.setScalar(2);
    // controls.target = data.scene.position;
    // data.scene.position.set(20, 1, 0);
    // camera.position.set(
    //   -15.405193262355265,
    //   1.7046355310666237,
    //   -8.853882753462061,

    // );
    // const axesHelper = new AxesHelper(100);
    // data.scene.add(axesHelper);
    // console.log("found", data.scene.getObjectByName("Group50463_104"));

    data.scene.scale.setScalar(0.1);
    data.scene.position.set(-20, 1, 4);
    data.scene.rotateY(80);

    scene.add(data.scene);
    // data.scene.traverse((obj) => {
    //   console.log("t ", obj.name, "\n");
    //   if (obj.name === "Cube002_0") {
    //     console.log("remove obj");
    //     // obj.parent?.remove(obj);
    //     // obj.material.color.set("green");
    //   }
    // });
    const texture = new TextureLoader(customLoadingManager);
    const gsapImg = texture.load("/gsap.png");
    const geometry = new PlaneGeometry(10, 10);
    const material = new MeshBasicMaterial({
      color: 0xffff00,
      // side: DoubleSide,
      side: DoubleSide,
      map: gsapImg,
    });
    const plane = new Mesh(geometry, material);

    plane.scale.setScalar(2);
    // plane.rotateY(degToRad(90));
    data.scene.add(plane);
    // plane.position.set(-20, 5, -17);
    plane.position.y = 10;
    plane.position.x = -30;
    plane.position.z = -50;
    console.log(dumpObject(data.scene).join("\n"));
  });
};

export const loadautmforest = async ({
  // name,
  // loader: glftLoader,
  // controls,
  // camera,
  manager: customLoadingManager,
  scene,
}: LoadAutumnForest) => {
  //use a different custom loading manager so that the loading screen can finish as soon as possible when neccessary models finish loading

  const glftLoader = new GLTFLoader(customLoadingManager);
  return await new Promise<Group<Object3DEventMap> | null>((resolve) => {
    glftLoader.load(`/models/autumnal_forest.glb`, async (data) => {
      console.log("loaded autumnal_forest", data);
      console.log("model scale", data.scene.scale);
      data.scene.name = "autumnal_forest";

      scene.add(data.scene);

      // data.scene.matrixAutoUpdate = false;
      // data.scene.updateMatrix();
      // data.scene.scale.setScalar(2);
      // controls.target = data.scene.position;
      // data.scene.position.set(20, 1, 0);
      // const axes = new AxesHelper(60);
      // data.scene.add(axes);

      const geometry = new PlaneGeometry(1, 1);
      const material = new MeshBasicMaterial({
        color: 0xffff00,
        // side: DoubleSide,
      });
      const plane = new Mesh(geometry, material);
      data.scene.add(plane);

      data.scene.position.set(30.405193262355265, -4, 25.853882753462061);
    });
  });
};
export const loadDesertRoad = async ({
  loader: glftLoader,
  controls,
  camera,
  scene,
  manager: customLoadingManager,
}: loadIsland) => {
  return await new Promise<Group<Object3DEventMap> | null>((resolve) => {
    const name = "desert_road";
    glftLoader.load(`/models/${name}.glb`, async (data) => {
      let dockerscene: Group<Object3DEventMap> | null = null;
      console.log("loaded " + name, data);
      console.log("model scale", data.scene.scale);
      data.scene.name = name;

      scene.add(data.scene);

      // data.scene.matrixAutoUpdate = false;
      // data.scene.updateMatrix();
      // data.scene.scale.setScalar(2);
      // controls.target = data.scene.position;
      // data.scene.position.set(20, 1, 0);
      // const axes = new AxesHelper(60);
      // data.scene.add(axes);
      glftLoader.load("/models/react_logo.glb", (reactdata) => {
        data.scene.add(reactdata.scene);
        reactdata.scene.scale.setScalar(0.6);
        reactdata.scene.position.set(-5, 2, -4);
        reactdata.scene.rotateY(degToRad(-30));
      });

      dockerscene = await new Promise<Group<Object3DEventMap>>(
        (resolve, reject) => {
          glftLoader.load("/models/linux-char.glb", async (linuxModel) => {
            data.scene.add(linuxModel.scene);
            console.log("linux-model", linuxModel.scene);
            linuxModel.scene.name = "linux model";
            linuxModel.scene.scale.setScalar(3);
            linuxModel.scene.position.set(5, 0.6, 5);
            const docker = await loadDockerModel({
              loader: glftLoader,
              controls,
              camera,
              // lambo,
              scene,
            });

            resolve(docker);
          });
        },
      );
      const map = new TextureLoader(customLoadingManager).load(
        "icons8-next.js-240.png",
      );
      const spriteMaterial = new SpriteMaterial({ map: map });

      const sprite = new Sprite(spriteMaterial);
      data.scene.add(sprite);
      sprite.scale.setScalar(3);
      sprite.position.set(0, 5, 0);

      const child = data.scene.children[0].children[0].children[0].children[1]
        .children[0] as Object3D;
      console.log("desert road child", child);
      const material: Material = child.material.clone();
      const mesh = await create3dText("Next js", material);
      data.scene.add(mesh);
      mesh.position.set(-3.5, 1.5, 0);
      // const axesHelper = new AxesHelper(20);
      // data.scene.add(axesHelper);
      data.scene.position.set(10.405193262355265, 0, -15.853882753462061);
      // controls.target = data.scene.position;
      // data.scene.scale.setScalar(0.1);

      // data.scene.traverse((obj) => {
      //   console.log("t ", obj.name, "\n");
      //   if (obj.name === "Cube002_0") {
      //     console.log("remove obj");
      //     // obj.parent?.remove(obj);
      //     // obj.material.color.set("green");
      //   }
      // });
      const res = dumpObject(data.scene).join("\n");
      console.log(res);
      // const geometry = new BufferGeometry();

      // const vertices = new Float32Array([
      //   -1.0,
      //   -1.0,
      //   1.0, // v0
      //   1.0,
      //   -1.0,
      //   1.0, // v1
      //   1.0,
      //   1.0,
      //   1.0, // v2
      //   -1.0,
      //   1.0,
      //   1.0, // v3
      // ]);

      // const indices = [0, 1, 2, 2, 3, 0];

      // geometry.setIndex(indices);
      // geometry.setAttribute("position", new BufferAttribute(vertices, 3));

      // const material = new MeshBasicMaterial({ color: 0xff0000 });
      // const mesh = new Mesh(geometry, material);
      // scene.add(mesh);
      // controls.target = mesh.position;
      // console.log("mesh", mesh.geometry.attributes);

      resolve(dockerscene);
    });
  });
};

type lookAtmodelprps = {
  camera: Camera;
  controls: OrbitControls;
  model: Group<Object3DEventMap> | null;
};
export function lookAtmodel({
  camera,
  controls,
  model,
  // scene_wrapper: HTMLElement | null,
}: lookAtmodelprps) {
  console.log("lookatmodel");
  // data.scene.position.set(10.405193262355265, 0, -15.853882753462061);

  const DesertRoad_Position = {
    //current gsap position which is also the controlls target
    x_p: -8,
    y_p: 2,
    z_p: 1,
  };
  const Docker_model_position = {
    x_p: 20,
    y_p: 1,
    z_p: 0,
  };

  const lookatmodeltl = gsap.timeline({
    // paused: true,
  });

  lookatmodeltl
    .to(camera.position, {
      x: Docker_model_position.x_p + 5,
      y: Docker_model_position.y_p + 2,
      z: Docker_model_position.z_p - 4,
      ease: "none",
      duration: 2,
      // delay: 2,
    })
    .to(
      DesertRoad_Position,
      {
        x_p: Docker_model_position.x_p,
        y_p: Docker_model_position.y_p,
        z_p: Docker_model_position.z_p,
        ease: "none",
        duration: 2,

        onUpdate: () => {
          // k8sWheel.getWorldPosition(target);
          controls.target = new Vector3(
            DesertRoad_Position.x_p,
            DesertRoad_Position.y_p,
            DesertRoad_Position.z_p,
          );
          // console.log(DesertRoad_Position);
          // controls.update();
        },
        onComplete: () => {
          if (!model) return;
          controls.target = model.position;
          // if (scene_wrapper) {
          //   scene_wrapper.focus();
          // }
        },
        // delay: 2,
      },

      // "linux model",
      "<",
    );
  return lookatmodeltl;
}
