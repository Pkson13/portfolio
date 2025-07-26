"use client";
import {
  dumpObject,
  getworldposition,
  handlescenetheme,
  loadaudio,
  loadDockerModel,
  loadIslandModel,
  loadIslands,
  lookAtmodel,
  setupSkyAndWater,
} from "@/lib/three_setup";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "next-themes";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  AmbientLight,
  ArrowHelper,
  AxesHelper,
  BoxGeometry,
  BufferAttribute,
  BufferGeometry,
  Camera,
  CatmullRomCurve3,
  EdgesGeometry,
  Group,
  // Fog,
  Line,
  LineBasicMaterial,
  LineSegments,
  MathUtils,
  Mesh,
  MeshBasicMaterial,
  Object3D,
  Object3DEventMap,
  PerspectiveCamera,
  Quaternion,
  Scene,
  TubeGeometry,
  Vector3,
  WebGLRenderer,
} from "three";
import { GLTFLoader, OrbitControls } from "three/examples/jsm/Addons.js";
import Stats from "three/examples/jsm/libs/stats.module.js";
import SceneWords from "./SceneWords";
import { buttonrefctx } from "../Skills";
import { Button } from "../ui/button";
import ControlsComponent from "./Controls";

export const Dockermodelctx = createContext<Group<Object3DEventMap> | null>(
  null,
);
export type global3dctxtypes = {
  camera: Camera | null;
  controls: OrbitControls | null;
  animationsDone: {
    state: boolean;
    setter: Dispatch<SetStateAction<boolean>>;
  };
};
export const global3dctx = createContext<global3dctxtypes | undefined>(
  undefined,
);

const Root3d = () => {
  const Enter3dButtonref = useContext(buttonrefctx);

  const sceneref = useRef<HTMLDivElement | null>(null);
  const getworldpositionref = useRef<HTMLButtonElement | null>(null);
  const lookatref = useRef<HTMLButtonElement | null>(null);
  const cameraref = useRef<Camera | null>(null);
  const contrlosref = useRef<OrbitControls | null>(null);
  const [Docekrmodel, setDockerModel] =
    useState<Group<Object3DEventMap> | null>(null);
  const [animationDone, setanimationDone] = useState<boolean>(false);

  const { theme } = useTheme();

  useEffect(() => {
    async function init() {
      const curvePath = [
        10.136184463414924, -1.374508746897471, 10.384881573913269,
        9.1152593889854714, -1.374508746897471, 8.5846792797570011,
        9.0669355709754882, -1.0665123466336568, 5.8937771631608156,
        10.151040177840205, -0.65913653144937956, 3.4340491740541346,
        10.806779203170416, 1.8859391007298545, 0.46855774212986023,
        10.761433540147586, 2.8724172201359197, -1.2811838605587311,
        9.6195923104445065, 2.8724172201359197, -3.2833099941904766,
        6.9763020889151646, 2.7659257976905427, -4.7591958908830172,
        6.0461277891353697, 1.0727045302089879, -6.6638740164090482,
        7.3472235778544794, -1.8228856326635698, -9.0685043046185623,
        7.226367212900791, -1.8228856326635698, -10.499536640855691,
        5.8354566696263914, -1.8228856326635698, -12.039219379199908,
        3.6532357452141353, -0.20463983570573391, -13.87695442281038,
        -0.30169589630131455, 1.5965000671484342, -14.879986418947327,
        -2.8925694230502157, 2.2971364614427481, -13.892095587598131,
        -4.537672295357936, 4.5863515759659208, -12.140831652074551,
        -6.1287913464117594, 5.9653814634119815, -8.9776527318875896,
        -6.0120301606452813, 4.4081161943855998, -6.712084358394045,
        -5.2138252159038974, 2.820894808418279, -4.4532820412085607,
        -2.3424712835109611, 2.2032065005086259, -3.0788773693500198,
        -0.0076956453915433265, 1.8931797788880202, -1.6577070662471063,
        -0.24767503988481437, 2.8845808465856684, 0.073915859214221724,
        -2.2174044353598896, 4.2415524507318576, 2.215992718290742,
        -3.4526531678364756, 3.0615192023340851, 4.7922404932096558,
        -3.7356278971556445, 1.4054080369354316, 7.8432021841434629,
        -3.4003734463804118, 1.1924069108769393, 9.2464090886227073,
        -1.8851803760476225, 1.5269331003449989, 10.306083896408374,
        0.01071077144031829, 2.1101821577522295, 10.490880699847727,
        0.42562058195647001, 2.2759939598834387, 11.613129436580291,
        0.096405262182225115, 0.032317784084054391, 16.223455375061565,
        2.3458797884520433, 0.38907275257695584, 19.91188266079584,
        5.7018400098488771, 1.73337964747396, 20.615481586999959,
        7.9720939736751824, 1.73337964747396, 19.303399329816457,
        9.8672362721095652, 0.090083018057025177, 16.893338541618121,
        11.225959519544134, -1.374508746897471, 14.279002555560753,
        11.288646925965876, -1.374508746897471, 11.926359497447137,
        10.136184463414924, -1.374508746897471, 10.384881573913269,
      ];

      const scene = new Scene();
      // scene.rotateZ(401.07);
      // scene.rotation.z = MathUtils.degToRad(7);

      // handlescenetheme(scene, theme);
      if (!sceneref.current?.clientWidth) return;
      const sceneELement = sceneref.current;
      const camera = new PerspectiveCamera(
        75,
        sceneELement?.clientWidth / sceneELement.clientHeight,
        0.001,
        10000,
      );
      cameraref.current = camera;

      camera.position.z = 10;
      camera.position.y = 1;
      if (getworldpositionref.current) {
        getworldpositionref.current.onclick = () => {
          getworldposition(camera);
          loadaudio(camera);
          controls.target = new Vector3(3, 2, 0);
        };
      }

      const renderer = new WebGLRenderer({
        antialias: true,
        // alpha: true,
        // premultipliedAlpha: false,
        // canvas: canvasref.current,
      });

      const axesHelper = new AxesHelper(100);
      scene.add(axesHelper);

      const dir = new Vector3(1, 3, 0);

      //normalize the direction vector (convert to vector of length 1/ convert the vector to a unit vector)
      dir.normalize();

      const origin = new Vector3(0, 0, 0);
      const length = 2;
      const hex = 0xffff00;

      // new TextureLoader().load("2k_stars.jpg", (texture) => {
      //   scene.background = texture;
      // });

      const water = setupSkyAndWater(scene, renderer, camera);

      const arrowHelper = new ArrowHelper(dir, origin, length, hex);
      scene.add(arrowHelper);

      // create3dText({ scene, textinput: "Hello I'm Peterson" });
      const controls = new OrbitControls(camera, renderer.domElement);
      contrlosref.current = controls;
      // // controls.autoRotate = true;
      controls.enableDamping = true;
      controls.enabled = true;
      // controls.enablePan = true;
      // controls.enableZoom = true;
      // controls.minPolarAngle = Math.PI / 3; // 45° on the y-axis
      // controls.maxPolarAngle = Math.PI / 2; // 90°
      // controls.maxPolarAngle = Math.PI * 0.495;
      // controls.maxPolarAngle = Math.PI / 2.25;
      controls.minDistance = 1.0;
      controls.maxDistance = 8;
      // controls.update();

      const stats = new Stats();
      // document.body.appendChild(stats.dom);
      renderer.setSize(sceneELement?.clientWidth, sceneELement.clientHeight);
      // const handleResize = (e: UIEvent) => {
      //   console.log(e);
      // };

      // sceneELement.addEventListener("resize", handleResize);
      const observer = new ResizeObserver((entries) => {
        // console.log("entries", entries);
        for (const entry of entries) {
          // console.log(entry);
          const height = entry.contentRect.height;
          const width = entry.contentRect.width;
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
          renderer.setSize(width, height);
          renderer.setPixelRatio(window.devicePixelRatio);
          // you need to call renderder.render to get rid of filckering on resize
          renderer.render(scene, camera);
        }
      });
      window.addEventListener("error", (e) => {
        console.error(e.message);
      });

      observer.observe(sceneELement);
      renderer.setAnimationLoop(animate);

      sceneELement?.appendChild(renderer.domElement);
      const points = [];
      const len = curvePath.length;
      for (let p = 0; p < len; p += 3) {
        points.push(
          new Vector3(curvePath[p], curvePath[p + 1], curvePath[p + 2]),
        );
      }

      const threelinematerial = new LineBasicMaterial({});
      const points1 = [] as Vector3[];
      points1.push(new Vector3(-3, 0, 0));
      points1.push(new Vector3(0, 3, 0));
      points1.push(new Vector3(3, 0, 0));

      const linegeometry = new BufferGeometry().setFromPoints(points1);
      const line = new Line(linegeometry, threelinematerial);
      // scene.add(line);
      let lambo = null as Object3D<Object3DEventMap> | null;

      const glftLoader = new GLTFLoader();
      const light = new AmbientLight(0xffffff, 2);
      scene.add(light);
      loadIslandModel({ loader: glftLoader, controls, camera, lambo, scene });
      //docker model will be loaded inide the next funtion
      setDockerModel(
        await loadIslands({
          name: "desert_road",
          loader: glftLoader,
          controls,
          camera,
          scene,
        }),
      );

      // if (Enter3dButtonref && Enter3dButtonref.current) {
      //   Enter3dButtonref.current.onclick = () => {
      //     // lookatmodeltl.play();
      //     if (Docekrmodel) {
      //       const lookatmodeltl = lookAtmodel({
      //         camera,
      //         controls,
      //         model: Docekrmodel,
      //       });
      //     }
      //     // camera.position.set(30.405193262355265, 0, -15.853882753462061);

      //     // window.alert("testing react stuff");
      //     document.querySelector<HTMLDivElement>("#scene-wrapper")?.focus();

      //     gsap.to(Enter3dButtonref.current, {
      //       opacity: 0,
      //     });
      //   };
      // }
      // return dockermodel;
      loadIslands({
        name: "autumnal_forest",
        loader: glftLoader,
        controls,
        camera,
        scene,
      });
      // if (loaded) {
      // }

      if (!lookatref.current) return;

      lookatref.current.onclick = () => {
        console.log("looking");
        camera.lookAt(
          new Vector3(
            Math.random() * (20 - 1) + 1,
            6,
            Math.random() * (20 - 1) + 1,
          ),
        );
      };

      // const light = new AmbientLight("white", 10); // soft white light
      // scene.add(light);
      // // const directionalLightpos = new Vector3(3, 5, 7);

      // const directionalLight = new DirectionalLight("white", 20);
      // directionalLight.position.set(3, 5, 7);
      // scene.add(directionalLight);
      // gsap.to(
      //   "#scene-words",
      //   {
      //     y: 0,
      //     // rotate: 360,
      //     // duration: 2,
      //     stagger: 0.2,
      //     // padding: "initial", // or your default value
      //     ease: "power3.out",
      //   },
      //   // ">", // run after previous animation
      // );
      // gsap.to(
      //   "#scene-words",
      //   {
      //     y: 100,
      //     // rotate: 360,
      //     // duration: 2,
      //     stagger: 0.2,
      //     // padding: "initial", // or your default value
      //     ease: "back.in",
      //     // delay: 3,
      //   },
      //   // ">", // run after previous animation
      // );

      const curve = new CatmullRomCurve3(points, true);

      // const pointss = curve.getPoints(50);
      const tubegeo = new TubeGeometry(curve, 222, 0.625, 16, true);
      const tubelinesgeo = new EdgesGeometry(tubegeo);

      const linematerial = new MeshBasicMaterial({
        color: 0xff0000,
        // wireframe: true,
      });

      // Create the final object to add to the scene
      const curveObject = new LineSegments(tubelinesgeo, linematerial);
      // console.log(points);
      // scene.add(curveObject);

      const geometry = new BoxGeometry(1, 1, 1);
      const material = new MeshBasicMaterial({ color: 0x00ff00 });
      const cube = new Mesh(geometry, material);
      // scene.add(cube);

      function animate() {
        if (lambo) {
          // console.log("rotating monkey");
          // lambo.position.x += 0.01;
        }
        // cube.rotation.x += 0.01;
        // cube.rotation.y += 0.01;
        if (controls.enabled) controls.update();
        // water.material.uniforms.time.value += 0.3 / 60.0;
        water.material.uniforms["time"].value += 0.2 / 60.0;

        stats.update();
        renderer.render(scene, camera);
      }
    }
    init();

    return () => {
      // if (!sceneELement) return;
      // linegeometry.dispose();
      // controls.dispose();
      // renderer.dispose();
      // observer.unobserve(sceneELement);
      // document.body.removeEventListener("darkmode", handleLightMode);
      // document.body.removeEventListener("lightmode", handleDarkMode);
    };
  }, []); // dependencies cause a whole relod of the scene and models; very expensive

  return (
    <global3dctx.Provider
      value={{
        camera: cameraref.current,
        controls: contrlosref.current,
        animationsDone: {
          state: animationDone,
          setter: setanimationDone,
        },
      }}
    >
      <Dockermodelctx.Provider value={Docekrmodel}>
        <div id="outer-scene-wrapper" className="relative size-full">
          <ControlsComponent />

          <div id="inner-scene-wrapper" className="size-full">
            <div
              ref={sceneref}
              className="relative m-0 mx-auto h-full w-full overflow-visible rounded-lg p-0"
            >
              {/* <div
                className="m-2"
                id="speed-meter"
                style={{
                  position: "absolute",
                  bottom: "1rem",
                  left: "1rem",
                  padding: "0.5rem 1rem",
                  background: "rgba(0,0,0,0.7)",
                  color: "lime",
                  fontFamily: "monospace",
                  borderRadius: "6px",
                  fontSize: "1rem",
                  zIndex: 9999,
                }}
              >
                Speed: 0 knots
              </div> */}
              <SceneWords />
            </div>
            {/* <div>
          <button ref={getworldpositionref}>cam worldposition</button>
          <button ref={lookatref}>look at</button>
        </div> */}
            {/* <canvas className="w-50"></canvas> */}
          </div>
        </div>
      </Dockermodelctx.Provider>
    </global3dctx.Provider>
  );
};

export default Root3d;
