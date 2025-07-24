"use client";
import { useContext, useEffect, useRef } from "react";
import { Dockermodelctx } from "./Root3d";
import { degToRad } from "three/src/math/MathUtils.js";
// import nipplejs from "nipplejs";

const Controls = () => {
  const nipplejsZone = useRef<HTMLDivElement | undefined>(undefined);
  const DockerModel = useContext(Dockermodelctx);
  useEffect(() => {
    if (!DockerModel) {
      console.log("docker model null in contrls", DockerModel);
      return;
    }

    console.log("not working for somr reason");

    const keysPressed: Record<string, boolean> = {};
    let speed = 0;
    let targetSpeed = 0;
    const baseMaxSpeed = 0.2;
    const boostedMaxSpeed = 0.5;
    let maxSpeed = baseMaxSpeed;

    const acceleration = 0.01;
    const deceleration = 0.01;
    const brakeDeceleration = 0.5;

    let boosting = false;
    let braking = false;

    const speedMeter = document.getElementById("speed-meter");
    const sceneWWrapper = document.getElementById("scene-wrapper");

    sceneWWrapper?.addEventListener("keydown", (ev) => {
      keysPressed[ev.key] = true;
      ev.preventDefault();
      ev.stopPropagation();

      switch (ev.key) {
        case "ArrowUp":
          targetSpeed = maxSpeed;
          break;
        case "ArrowDown":
          targetSpeed = -maxSpeed;
          break;
        case "Shift":
          boosting = true;
          maxSpeed = boostedMaxSpeed;
          if (keysPressed["ArrowUp"]) targetSpeed = maxSpeed;
          if (keysPressed["ArrowDown"]) targetSpeed = -maxSpeed;
          break;
        case " ":
          braking = true;
          break;
      }
    });

    sceneWWrapper?.addEventListener("keyup", (ev) => {
      keysPressed[ev.key] = false;
      ev.preventDefault();
      ev.stopPropagation();

      switch (ev.key) {
        case "ArrowUp":
        case "ArrowDown":
          targetSpeed = 0;
          break;
        case "Shift":
          boosting = false;
          maxSpeed = baseMaxSpeed;
          if (keysPressed["ArrowUp"]) targetSpeed = maxSpeed;
          if (keysPressed["ArrowDown"]) targetSpeed = -maxSpeed;
          break;
        case " ":
          braking = false;
          break;
      }
    });

    const gameConrolsLoop = () => {
      const angle = DockerModel.rotation.y;

      // Braking
      if (braking) {
        if (speed > 0) {
          speed = Math.max(speed - brakeDeceleration, 0);
        } else if (speed < 0) {
          speed = Math.min(speed + brakeDeceleration, 0);
        }
      } else {
        // Normal acceleration/deceleration
        if (speed < targetSpeed) {
          speed = Math.min(speed + acceleration, targetSpeed);
        } else if (speed > targetSpeed) {
          speed = Math.max(speed - deceleration, targetSpeed);
        }
      }

      // Move scene
      if (Math.abs(speed) > 0.001) {
        DockerModel.position.x -= Math.cos(-angle) * speed;
        DockerModel.position.z -= Math.sin(-angle) * speed;
      }

      if (keysPressed["ArrowRight"]) {
        if (keysPressed["ArrowDown"]) {
          DockerModel.rotation.y += degToRad(1);
        } else {
          DockerModel.rotation.y -= degToRad(1);
        }
        // if (!ships_wheel) return;

        //TODO

        // ships_wheel.rotation.x -= degToRad(1);
        // pivot.rotateX(-degToRad(1)); t
      }
      if (keysPressed["ArrowLeft"]) {
        if (keysPressed["ArrowDown"]) {
          DockerModel.rotation.y -= degToRad(1);
        } else {
          DockerModel.rotation.y += degToRad(1);
        }
        // if (!ships_wheel) return;
        // ships_wheel.rotation.x += degToRad(1);
        // pivot.rotateX(degToRad(1));
      }

      // Update speed meter
      // if (speedMeter) {
      //   const percentage = Math.round(
      //     (Math.abs(speed) / boostedMaxSpeed) * 100,
      //   );
      //   speedMeter.innerText = `Speed: ${percentage}knots`;
      // }

      requestAnimationFrame(gameConrolsLoop);
    };
    gameConrolsLoop();

    if (nipplejsZone.current) {
      async function setupnipplejs() {
        const nipplejs = (await import("nipplejs")).default;
        const joystickmanager = nipplejs.create({
          zone: nipplejsZone.current,
          mode: "static",
          position: { left: "50%", top: "50%" },
          dynamicPage: true,
        });
        // console.log("ids:", joystickmanager.ids, "jid", joystickmanager.get(0));
        const joystick = joystickmanager.get(0);
        joystick.on("dir", (evt, data) => {
          //   console.log("evt", evt);
          //   console.log("data", data);

          switch (data.direction.angle) {
            case "up":
              targetSpeed = maxSpeed;
              break;
            case "down":
              targetSpeed = -maxSpeed;
              break;
            case "left":
              keysPressed["ArrowRight"] = false;
              keysPressed["ArrowLeft"] = true;
              break;
            case "right":
              keysPressed["ArrowLeft"] = false;
              keysPressed["ArrowRight"] = true;
              break;
          }
        });
        joystick.on("end", () => {
          targetSpeed = 0;
          keysPressed["ArrowLeft"] = false;
          keysPressed["ArrowRight"] = false;
        });
      }
      setupnipplejs();
    }
  }, [DockerModel]);

  return (
    <div
      ref={nipplejsZone}
      className="absolute right-6 bottom-6 z-700 size-40 md:hidden"
    >
      Controls
    </div>
  );
};

export default Controls;
