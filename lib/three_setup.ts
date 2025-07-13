import {
  Audio,
  AudioListener,
  AudioLoader,
  AxesHelper,
  Camera,
  Color,
  Material,
  MathUtils,
  // Fog,
  Mesh,
  MeshBasicMaterial,
  Object3D,
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
  Sky,
  TextGeometry,
  Water,
} from "three/examples/jsm/Addons.js";
import GUI from "three/examples/jsm/libs/lil-gui.module.min.js";
import { loaderFuncProps, loadIsland } from "./threeTypes";
import gsap from "gsap";
import { Meh } from "lucide-react";
import { degToRad, radToDeg } from "three/src/math/MathUtils.js";

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
  const loader = new FontLoader();
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
  if (obj.name === "Cube002") {
    console.log("cubeoo2");
    // obj.position.set(1, 2, 3);
    console.log("cobe002", obj);
    const mesh = obj.children[0] as Mesh;
    mesh.material = mesh.material.clone(); //all containera share the same material by refrence so without clone it willchange  all containers
    mesh.material.color.set("#ff0000");
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
  if (obj.name == "body001outline" || obj.name == "terrain001outline") {
    obj.position.set(15, 4, 0);
    obj.clear();
  }
  if (obj.name == "body" || obj.name == "Object001" || obj.name == "glass") {
    obj.position.set(15, 4, 0);
    obj.clear();
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

export const loadDockerModel = ({
  loader: glftLoader,
  controls,
  camera,
  scene,
  lambo,
}: loaderFuncProps) => {
  glftLoader.load("/models/moby_dock_docker_whale.glb", async (data) => {
    console.log("loaded glb file", data);
    console.log("model scale", data.scene.scale);
    // data.scene.matrixAutoUpdate = false;
    // data.scene.updateMatrix();
    // data.scene.scale.setScalar(2);
    controls.target = data.scene.position;
    data.scene.position.set(20, 1, 0);
    camera.position.set(
      15.405193262355265,
      1.7046355310666237,
      8.853882753462061,
    );
    // let x_r = 0;
    // let z_r = 0;

    // gsap.to(
    //   {},
    //   {
    //     repeat: -1,
    //     duration: 0.016, // roughly 60fps
    //     onUpdate: () => {
    //       x_r += 0.02; // adjust to control rocking speed
    //       z_r += 0.015;

    //       data.scene.rotation.x = Math.sin(x_r) * 0.05; // pitch
    //       data.scene.rotation.z = Math.sin(z_r) * 0.03; // yaw/roll
    //     },
    //   },
    // );

    // for (let i = 0; i < 100; i++) {
    //   // i = degToRad(i);
    //   //Math.sin takes in radins and returns radians
    //   console.log(`sine ${i} = ${Math.sin(degToRad(i))}`);
    //   // console.log(`cosine ${i} = ${Math.cos(degToRad(i))}`);
    // }
    const axesHelper = new AxesHelper(20);
    data.scene.add(axesHelper);
    camera.lookAt(new Vector3(10, 10, 0));

    type gamekeys = {
      ArrowUp?: boolean;
      ArrowLeft?: boolean;
      ArrowRight?: boolean;
      ArrowDown?: boolean;
      Shift?: boolean;
    };

    const keysPressed: gamekeys = {};
    let speed = 0.2;

    document.body.addEventListener("keydown", (ev) => {
      console.log("pressed", ev.key);
      // ev.stopPropagation();
      // ev.preventDefault();

      switch (ev.key) {
        case "Shift":
          if (speed == 0.2) {
            speed += 0.3;
          }
          break;
        case "ArrowUp":
          keysPressed[ev.key] = true;

          break;
        case "ArrowDown":
          keysPressed[ev.key] = true;

          break;
        case "ArrowRight":
          keysPressed[ev.key] = true;

          // data.scene.translateZ(0.1);
          break;
        case "ArrowLeft":
          keysPressed[ev.key] = true;

          // data.scene.translateZ(-0.1);
          break;
      }
    });

    document.body.addEventListener("keyup", (ev) => {
      console.log("keyup", ev.key);

      switch (ev.key) {
        case "Shift":
          if (speed == 0.5) {
            speed -= 0.3;
          }

          break;
        case "ArrowUp":
          keysPressed[ev.key] = false;

          break;
        case "ArrowDown":
          keysPressed[ev.key] = false;
          break;
        case "ArrowRight":
          keysPressed[ev.key] = false;

          break;
        case "ArrowLeft":
          keysPressed[ev.key] = false;

          break;
      }
    });

    const gameConrolsLoop = () => {
      const angle = data.scene.rotation.y;
      console.log("gamecontrolsLoop");
      if (keysPressed["ArrowUp"] == true) {
        // console.log(`angle in radians ${angle}, deg ${radToDeg(angle)}`);
        data.scene.position.x -= Math.cos(-angle) * speed;
        data.scene.position.z -= Math.sin(-angle) * speed;
        // data.scene.translateX(-0.1);
      }
      if (keysPressed["ArrowDown"]) {
        data.scene.position.x += Math.cos(-angle) * speed;
        data.scene.position.z += Math.sin(-angle) * speed;
        // data.scene.translateX(0.1);
      }
      if (keysPressed["ArrowRight"]) {
        data.scene.rotation.y -= degToRad(3);
      }
      if (keysPressed["ArrowLeft"]) {
        data.scene.rotation.y += degToRad(3);
      }
      requestAnimationFrame(gameConrolsLoop);
    };
    gameConrolsLoop();

    scene.add(data.scene);
    // data.scene.traverse((obj) => {
    //   console.log("t ", obj.name, "\n");
    //   if (obj.name === "Cube002_0") {
    //     console.log("remove obj");
    //     // obj.parent?.remove(obj);
    //     // obj.material.color.set("green");
    //   }
    // });
    console.log(dumpObject(data.scene).join("\n"));
    lambo = data.scene.children[0];
    console.log("scene", lambo);

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

    const quaternion = new Quaternion();
    quaternion.setFromAxisAngle(new Vector3(0, 1, 0), Math.PI / 2);
    // camera.applyQuaternion(quaternion);
    // camera.rotation.x = Math.PI /2
    await new Promise((res) => {
      // gsap.to(camera.position, {
      //   x: -3,
      //   y: -2,
      //   duration: 2,
      //   delay: 20,
      //   ease: "none",
      //   onComplete: res, // resolve when animation finishes
      // });
      // const targetEuler = new Euler(2 * Math.PI, 0, 0, "XYZ");
      // const targetQuat = new Quaternion().setFromEuler(targetEuler);
      // gsap.to(camera.quaternion, {
      //   x: targetQuat.x,
      //   y: targetQuat.y,
      //   z: targetQuat.z,
      //   w: targetQuat.w,
      //   duration: 5,
      // });
      // controls.disconnect();\
      console.log(Math.PI / 4 / 2);
      // controls.enabled = false;

      // gsap.to(camera.rotation, {
      //   // y: -Math.PI / 2, // 90 degrees
      //   x: Math.PI / 4 / 2,
      //   // x: 200,
      //   duration: 5,
      //   onUpdate: () => {
      //     camera.updateMatrixWorld();
      //   },
      //   onComplete: () => {
      //     controls.enabled = true;
      //     // controls.connect(document.body);
      //   },
      //   ease: "none",
      // });
      gsap.to(data.scene.position, {
        // y: -Math.PI / 2, // 90 degrees
        x: 20,
        y: 1,
        // x: 200,
        duration: 5,
        onUpdate: () => {
          camera.updateMatrixWorld();
        },
        onComplete: () => {
          // controls.enabled = true;
          // controls.connect(document.body);
          res("done");
        },
        ease: "none",
      });
    }).then((result) => console.log("promise done", result));
  });
};
export const loadIslandModel = ({
  loader: glftLoader,
  controls,
  camera,
  scene,
  lambo,
}: loaderFuncProps) => {
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
    console.log("found", data.scene.getObjectByName("Group50463_104"));

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
    console.log(dumpObject(data.scene).join("\n"));
    lambo = data.scene.children[0];
    console.log("scene", lambo);

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

    const quaternion = new Quaternion();
    quaternion.setFromAxisAngle(new Vector3(0, 1, 0), Math.PI / 2);
    // camera.applyQuaternion(quaternion);
    // camera.rotation.x = Math.PI /2
    await new Promise((res) => {
      // gsap.to(camera.position, {
      //   x: -3,
      //   y: -2,
      //   duration: 2,
      //   delay: 20,
      //   ease: "none",
      //   onComplete: res, // resolve when animation finishes
      // });
      // const targetEuler = new Euler(2 * Math.PI, 0, 0, "XYZ");
      // const targetQuat = new Quaternion().setFromEuler(targetEuler);
      // gsap.to(camera.quaternion, {
      //   x: targetQuat.x,
      //   y: targetQuat.y,
      //   z: targetQuat.z,
      //   w: targetQuat.w,
      //   duration: 5,
      // });
      // controls.disconnect();\
      console.log(Math.PI / 4 / 2);
      // controls.enabled = false;

      // gsap.to(camera.rotation, {
      //   // y: -Math.PI / 2, // 90 degrees
      //   x: Math.PI / 4 / 2,
      //   // x: 200,
      //   duration: 5,
      //   onUpdate: () => {
      //     camera.updateMatrixWorld();
      //   },
      //   onComplete: () => {
      //     controls.enabled = true;
      //     // controls.connect(document.body);
      //   },
      //   ease: "none",
      // });
      gsap.to(data.scene.position, {
        // y: -Math.PI / 2, // 90 degrees
        // x: 20,
        // y: 1,
        // x: 200,
        duration: 5,
        onUpdate: () => {
          camera.updateMatrixWorld();
        },
        onComplete: () => {
          // controls.enabled = true;
          // controls.connect(document.body);
          res("done");
        },
        ease: "none",
      });
    }).then((result) => console.log("promise done", result));
  });
};
export const loadIslands = ({
  name,
  loader: glftLoader,
  controls,
  camera,
  scene,
}: loadIsland) => {
  glftLoader.load(`/models/${name}.glb`, async (data) => {
    console.log("loaded " + name, data);
    console.log("model scale", data.scene.scale);
    // data.scene.matrixAutoUpdate = false;
    // data.scene.updateMatrix();
    // data.scene.scale.setScalar(2);
    // controls.target = data.scene.position;
    // data.scene.position.set(20, 1, 0);
    if (name == "autumnal_forest") {
      const mesh = await create3dText("Next js");
      scene.add(mesh);
      data.scene.position.set(30.405193262355265, -4, 25.853882753462061);
    } else if (name == "desert_road") {
      const map = new TextureLoader().load("icons8-next.js-240.png");
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
    }
    scene.add(data.scene);
    // data.scene.traverse((obj) => {
    //   console.log("t ", obj.name, "\n");
    //   if (obj.name === "Cube002_0") {
    //     console.log("remove obj");
    //     // obj.parent?.remove(obj);
    //     // obj.material.color.set("green");
    //   }
    // });
    console.log(dumpObject(data.scene).join("\n"));

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

    const quaternion = new Quaternion();
    quaternion.setFromAxisAngle(new Vector3(0, 1, 0), Math.PI / 2);
    // camera.applyQuaternion(quaternion);
    // camera.rotation.x = Math.PI /2
    await new Promise((res) => {
      // gsap.to(camera.position, {
      //   x: -3,
      //   y: -2,
      //   duration: 2,
      //   delay: 20,
      //   ease: "none",
      //   onComplete: res, // resolve when animation finishes
      // });
      // const targetEuler = new Euler(2 * Math.PI, 0, 0, "XYZ");
      // const targetQuat = new Quaternion().setFromEuler(targetEuler);
      // gsap.to(camera.quaternion, {
      //   x: targetQuat.x,
      //   y: targetQuat.y,
      //   z: targetQuat.z,
      //   w: targetQuat.w,
      //   duration: 5,
      // });
      // controls.disconnect();\
      console.log(Math.PI / 4 / 2);
      // controls.enabled = false;

      // gsap.to(camera.rotation, {
      //   // y: -Math.PI / 2, // 90 degrees
      //   x: Math.PI / 4 / 2,
      //   // x: 200,
      //   duration: 5,
      //   onUpdate: () => {
      //     camera.updateMatrixWorld();
      //   },
      //   onComplete: () => {
      //     controls.enabled = true;
      //     // controls.connect(document.body);
      //   },
      //   ease: "none",
      // });
      gsap.to(data.scene.position, {
        // y: -Math.PI / 2, // 90 degrees
        // x: 20,
        // y: 1,
        // x: 200,
        duration: 5,
        onUpdate: () => {
          camera.updateMatrixWorld();
        },
        onComplete: () => {
          // controls.enabled = true;
          // controls.connect(document.body);
          res("done");
        },
        ease: "none",
      });
    }).then((result) => console.log("promise done", result));
  });
};
