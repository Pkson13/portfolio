"use client";
import {
  dumpObject,
  getworldposition,
  handlescenetheme,
  loadaudio,
  setupSkyAndWater,
} from "@/lib/three_setup";
import gsap from "gsap";
import { useTheme } from "next-themes";
import React, { useEffect, useRef } from "react";
import {
  ArrowHelper,
  AxesHelper,
  BoxGeometry,
  BufferGeometry,
  CatmullRomCurve3,
  EdgesGeometry,
  // Fog,
  Line,
  LineBasicMaterial,
  LineSegments,
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

const Root3d = () => {
  const sceneref = useRef<HTMLDivElement | null>(null);
  const getworldpositionref = useRef<HTMLButtonElement | null>(null);

  const { theme } = useTheme();

  useEffect(() => {
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
    // handlescenetheme(scene, theme);
    if (!sceneref.current?.clientWidth) return;
    const sceneELement = sceneref.current;
    const camera = new PerspectiveCamera(
      75,
      sceneELement?.clientWidth / sceneELement.clientHeight,
      0.001,
      10000,
    );

    camera.position.z = 10;
    camera.position.y = 3;
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
    // // controls.autoRotate = true;
    controls.enableDamping = true;
    controls.enablePan = false;
    // controls.enableZoom = false;
    // controls.minPolarAngle = Math.PI / 3; // 45° on the y-axis
    // controls.maxPolarAngle = Math.PI / 2; // 90°
    controls.maxPolarAngle = Math.PI * 0.495;
    // controls.maxPolarAngle = Math.PI / 2.3;
    // controls.minDistance = 10.0;
    controls.maxDistance = 10.0;
    controls.update();

    const stats = new Stats();
    document.body.appendChild(stats.dom);
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
    let lambo: Object3D<Object3DEventMap>;

    const glftLoader = new GLTFLoader();
    glftLoader.load("moby_dock_docker_whale.glb", async (data) => {
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

      const quaternion = new Quaternion();
      quaternion.setFromAxisAngle(new Vector3(0, 1, 0), Math.PI / 2);
      // camera.applyQuaternion(quaternion);
      // camera.rotation.x = Math.PI /2
      await new Promise((res) => {
        // gsap.to(lambo.rotation, {
        //   x: Math.PI / 2,
        //   // y: 100,
        //   // duration: 30,
        //   delay: 5,
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
            controls.enabled = true;
            // controls.connect(document.body);
            res("done");
          },
          ease: "none",
        });
      }).then((result) => console.log("promise done", result));
    });
    // const light = new AmbientLight("white", 10); // soft white light
    // scene.add(light);
    // // const directionalLightpos = new Vector3(3, 5, 7);

    // const directionalLight = new DirectionalLight("white", 20);
    // directionalLight.position.set(3, 5, 7);
    // scene.add(directionalLight);

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

    return () => {
      if (!sceneELement) return;
      // linegeometry.dispose();
      // controls.dispose();
      // renderer.dispose();
      observer.unobserve(sceneELement);
      document.body.removeEventListener("darkmode", handleLightMode);
      document.body.removeEventListener("lightmode", handleDarkMode);
    };
  }, []);

  return (
    <>
      <div ref={sceneref} className="m-0 h-full w-full p-0"></div>
      <div>
        <button ref={getworldpositionref}>cam worldposition</button>
      </div>
      <canvas className="w-50"></canvas>
    </>
  );
};

export default Root3d;
