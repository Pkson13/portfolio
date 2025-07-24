"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { movequickto } from "@/lib/MoveQuickto";

export default function Son() {
  const faceRef = useRef<SVGSVGElement | null>(null);
  const leftPupilRef = useRef<null | SVGPathElement>(null);
  const rightPupilRef = useRef<null | SVGPathElement>(null);
  const mouthRef = useRef<null | SVGPathElement>(null);

  // useGSAP((context, contextsafe) => {
  //   const face = faceRef.current;
  //   const leftPupil = leftPupilRef.current;
  //   const rightPupil = rightPupilRef.current;
  //   // const mouth = mouthRef.current;
  //   let lastElemment: "A" | "DIV" | undefined;
  //   // const sontl = gsap.timeline();
  //   // sontl.to("#son", { opacity: 1, delay: 2 });
  //   // gsap.to([leftPupil, rightPupil, mouth], {
  //   //   y: 4,
  //   //   yoyo: true,
  //   //   repeat: -1,
  //   //   duration: 2,
  //   //   ease: "circ.inOut",
  //   // });
  //   if (!contextsafe) {
  //     console.log("context safe funtion undefined", contextsafe);
  //     return;
  //   }
  //   //contest safe verion of handle mouse move
  //   const handleMouseMove = contextsafe((e: MouseEvent) => {
  //     const target = e.target;

  //     if (!face || !leftPupil || !rightPupil) return;
  //     //   console.log(target);

  //     if (target instanceof HTMLElement) {
  //       // for (const attr of target.attributes) {
  //       // }
  //       // console.log("Example: Check if it's a link and get the href");
  //       switch (target.tagName) {
  //         case "A":
  //           if (lastElemment === "A") break;
  //           const mouthmovements = ["#mouthhappy-full", "#mouthhappy-semi"];

  //           const morphMouthto =
  //             mouthmovements[Math.floor(Math.random() * mouthmovements.length)];
  //           // console.log(morphMouthto);
  //           // console.log(target.tagName);

  //           gsap.to("#mouth", {
  //             //   ease: "bounce.out",
  //             overwrite: "auto",
  //             morphSVG: morphMouthto,
  //           });
  //           if (morphMouthto == "#mouthhappy-full") {
  //             const squint = Math.floor(Math.random() * 2);
  //             // console.log("squint", squint);
  //             if (!squint) break;
  //             gsap.to("#normal-left-eye", {
  //               morphSVG: "#left-squinted-eye",
  //               //   ease: "elastic.out",
  //             });
  //             gsap.to("#normal-right-eye", {
  //               morphSVG: "#right-squinted-eye",
  //             });
  //           }

  //           // className="absolute flex size-2 h-0 w-0 items-center justify-center rounded-full border-y-[4px] border-r-[8px] border-y-transparent border-r-black"
  //           lastElemment = "A";
  //           break;
  //         case "DIV":
  //           if (lastElemment === "DIV") break;
  //           console.log(target.tagName);

  //           gsap.to("#normal-left-eye", {
  //             morphSVG: "#normal-left-eye",
  //           });
  //           gsap.to("#normal-right-eye", {
  //             morphSVG: "#normal-right-eye",
  //           });

  //           gsap.to("#mouth", {
  //             height: 1,
  //             //   ease: "elastic.out",
  //             overwrite: "auto",
  //             morphSVG: "#mouth",
  //             duration: 0.5,
  //           });

  //           lastElemment = "DIV";
  //           break;
  //       }
  //     }

  //     const { left, top, width, height } = face.getBoundingClientRect();
  //     // console.log("left", x, "top", top, "width", width, "height", height);

  //     const centerX = left + width / 2;
  //     const centerY = top + height / 2;

  //     const deltaX = e.clientX - centerX;
  //     const deltaY = e.clientY - centerY;
  //     // console.log("deltax", deltaX, "deltay", deltaY);

  //     // max movement range for pupils
  //     const maxMove = 7;

  //     // normalize and clamp
  //     //find the distance between the centre of the box and the cursor using pythogras theorem c² = a² +b²
  //     const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
  //     // The Math.atan2() static method returns the angle in the plane (in radians) between the positive x-axis and the ray from (0, 0) to the point (x, y), for Math.atan2(y, x).
  //     const angle = Math.atan2(deltaY, deltaX);
  //     const moveX = Math.min(maxMove, distance) * Math.cos(angle);
  //     const moveY = Math.min(maxMove, distance) * Math.sin(angle);

  //     movequickto({ id: ["#mouth", leftPupil, rightPupil], moveX, moveY });
  //     // gsap.to([leftPupil, rightPupil], {
  //     //   x: moveX,
  //     //   y: moveY,
  //     //   duration: 0.5,
  //     //   ease: "power2.out",
  //     //   delay: 0.1,
  //     // });
  //   });

  //   document.body.addEventListener("mousemove", handleMouseMove);

  //   return () => {
  //     document.body.removeEventListener("mousemove", handleMouseMove);
  //   };
  // }, []);

  useGSAP((context, contextsafe) => {
    const face = faceRef.current;
    const leftPupil = leftPupilRef.current;
    const rightPupil = rightPupilRef.current;

    if (!contextsafe) return;

    const handlePointer = contextsafe(
      (x: number, y: number, target: EventTarget | null) => {
        if (!face || !leftPupil || !rightPupil) return;
        let lastElemment;

        if (target instanceof HTMLElement) {
          switch (target.tagName) {
            case "A":
              if (lastElemment === "A") break;

              const options = ["#mouthhappy-full", "#mouthhappy-semi"];
              const morph = options[Math.floor(Math.random() * options.length)];

              gsap.to("#mouth", {
                overwrite: "auto",
                morphSVG: morph,
              });

              if (morph === "#mouthhappy-full" && Math.random() > 0.5) {
                gsap.to("#normal-left-eye", { morphSVG: "#left-squinted-eye" });
                gsap.to("#normal-right-eye", {
                  morphSVG: "#right-squinted-eye",
                });
              }

              lastElemment = "A";
              break;

            case "DIV":
              if (lastElemment === "DIV") break;

              gsap.to("#normal-left-eye", { morphSVG: "#normal-left-eye" });
              gsap.to("#normal-right-eye", { morphSVG: "#normal-right-eye" });

              gsap.to("#mouth", {
                morphSVG: "#mouth",
                height: 1,
                overwrite: "auto",
                duration: 0.5,
              });

              lastElemment = "DIV";
              break;
          }
        }

        const { left, top, width, height } = face.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;

        const deltaX = x - centerX;
        const deltaY = y - centerY;

        const maxMove = 9;
        const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
        const angle = Math.atan2(deltaY, deltaX);

        const moveX = Math.min(maxMove, distance) * Math.cos(angle);
        const moveY = Math.min(maxMove, distance) * Math.sin(angle);

        movequickto({ id: ["#mouth", leftPupil, rightPupil], moveX, moveY });
      },
    );

    const onMouseMove = (e: MouseEvent) => {
      handlePointer(e.clientX, e.clientY, e.target);
    };

    const onTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (touch) {
        handlePointer(touch.clientX, touch.clientY, e.target);
      }
    };

    document.body.addEventListener("mousemove", onMouseMove);
    document.body.addEventListener("touchmove", onTouchMove, { passive: true });

    return () => {
      document.body.removeEventListener("mousemove", onMouseMove);
      document.body.removeEventListener("touchmove", onTouchMove);
    };
  }, []);

  return (
    <div
      id="son"
      className="flex size-full flex-col items-center justify-center gap-4 rounded-md bg-foreground opacity-0"
    >
      <div className="flex gap-3">
        <svg
          ref={faceRef}
          width="100%"
          height="100%"
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="size-full"
        >
          <path
            ref={leftPupilRef}
            d="M75 28C77.1525 28 79.078 28.9715 80.3621 30.5C81.3843 31.7168 82 33.2865 82 35C82 36.9587 81.1955 38.7295 79.899 40C78.6364 41.2372 76.9073 42 75 42C73.0927 42 71.3636 41.2372 70.101 40C69.4134 39.3262 68.8642 38.5117 68.5 37.6031C68.1775 36.7984 68 35.9199 68 35C68 34.0801 68.1775 33.2016 68.5 32.3969C68.7782 31.7028 69.1645 31.0635 69.6379 30.5C70.922 28.9715 72.8475 28 75 28Z"
            fill="currentColor"
            className="eye text-background"
            id="normal-left-eye"
          />
          <path
            ref={rightPupilRef}
            d="M46 28C48.1525 28 50.078 28.9715 51.3621 30.5C52.3843 31.7168 53 33.2865 53 35C53 36.9587 52.1955 38.7295 50.899 40C49.6364 41.2372 47.9073 42 46 42C44.0927 42 42.3636 41.2372 41.101 40C40.4134 39.3262 39.8642 38.5117 39.5 37.6031C39.1775 36.7984 39 35.9199 39 35C39 34.0801 39.1775 33.2016 39.5 32.3969C39.7782 31.7028 40.1645 31.0635 40.6379 30.5C41.922 28.9715 43.8475 28 46 28Z"
            fill="currentColor"
            id="normal-right-eye"
            className="eye text-background"
          />

          <path
            d="M59.9995 55.2556C65.2438 55.2556 69.9354 57.6225 73.064 61.3464C75.5543 64.3109 77.0541 68.1349 77.0542 72.3093C77.0542 77.0814 75.0948 81.3965 71.936 84.4919C68.8599 87.5062 64.6464 89.364 59.9995 89.364C55.3528 89.3639 51.14 87.5061 48.064 84.4919C46.3888 82.8504 45.0509 80.8657 44.1636 78.6521C43.3778 76.6916 42.9458 74.5505 42.9458 72.3093C42.9459 70.0683 43.3779 67.9279 44.1636 65.9675C44.8413 64.2766 45.7827 62.7193 46.936 61.3464C50.0645 57.6226 54.7554 55.2558 59.9995 55.2556ZM59.9995 62.6375C57.0257 62.6375 54.3655 63.9799 52.5913 66.0916C51.9373 66.8701 51.4034 67.7537 51.019 68.7126C50.5735 69.8244 50.3277 71.0384 50.3276 72.3093C50.3276 73.5803 50.5735 74.7942 51.019 75.906C51.5223 77.1614 52.2809 78.2875 53.231 79.2185C54.9754 80.9277 57.3644 81.9811 59.9995 81.9812C62.6348 81.9812 65.0245 80.9279 66.769 79.2185C68.5604 77.4631 69.6714 75.0157 69.6714 72.3093C69.6713 69.9419 68.821 67.7727 67.4087 66.0916C65.6345 63.9797 62.9735 62.6375 59.9995 62.6375Z"
            fill="currentColor"
            className="text-background"
            id="mouth"
            ref={mouthRef}
          />

          <g className="hidden">
            <g id="squinted-eyes">
              <path
                d="M84.5233 29.8649C84.7937 30.4189 85.3422 32.8482 85.4913 33.4371C85.604 33.8817 80.8648 35.7369 80.9078 36.1918C80.9078 36.1918 85.5027 37.6192 85.4913 37.9904C85.4642 38.875 85.7601 39.9685 84.5233 41.8062C84.5233 41.8062 67.961 37.1951 67.9436 36.1918C67.9263 35.1885 84.5233 29.8649 84.5233 29.8649Z"
                fill="#0E0E0E"
                id="left-squinted-eye"
              />
              <path
                d="M38.2653 42.889C38.1058 42.194 38.0608 39.2205 38.0332 38.4979C38.0124 37.9522 43.3199 37.7751 43.3729 37.2252C43.4159 36.7787 38.5545 34.7558 38.2831 35.5158C38.4999 34.4592 40.3441 31.5424 40.8269 30.5549C40.8269 30.5549 56.8551 36.0213 56.6586 37.2252C56.4622 38.4292 38.2653 42.889 38.2653 42.889Z"
                fill="#0E0E0E"
                id="right-squinted-eye"
              />

              <path
                d="M60.5 55.0582C64.7647 55.0582 68.2336 53.5585 70.9062 56.192C73.6353 58.8253 74.9999 62.3257 75 66.6929C75 71.0605 73.6355 74.5614 70.9062 77.1949C68.2336 79.8925 64.7647 81.2418 60.5 81.2418C56.2353 81.2418 52.7382 79.8925 50.0088 77.1949C47.3363 74.5614 46 71.0606 46 66.6929C46.0001 62.3256 47.3364 58.8254 50.0088 56.192C52.7382 53.5585 56.2353 55.0582 60.5 55.0582ZM60.2939 61.523C55.7209 61.3989 52.345 61.9073 52.2207 66.48C52.0966 71.0532 55.7208 74.9351 60.2939 75.0591C64.8669 75.1832 68.6569 71.5032 68.7812 66.9302C68.9053 62.3571 64.8671 61.6471 60.2939 61.523Z"
                fill="#222121"
                id="mouthhappy-semi"
              />
            </g>
            <g id="shocked-mouth">
              <path
                d="M50.0088 77.1949C47.3362 74.5615 45.9669 71.0609 45.9669 66.6932C45.9669 62.3256 47.3362 58.8251 50.0088 56.1916C52.7382 53.5581 56.2353 55.0579 60.5 55.0579C64.7647 55.0579 68.2333 53.5581 70.9059 56.1916C73.6353 58.8251 75 62.3256 75 66.6932C75 71.0609 73.6353 74.5615 70.9059 77.1949C68.2333 79.8926 64.7647 77.1949 60.5 77.1949C56.2353 77.1949 52.7382 79.8926 50.0088 77.1949Z"
                fill="#222121"
                id="mouth-outer-shocked"
              />
              <path
                d="M68.7814 66.9298C68.6574 71.503 64.867 70.6341 60.2939 70.51C55.7207 70.3859 52.0965 71.0536 52.2206 66.4805C52.3446 61.9073 55.7207 61.399 60.2939 61.5231C64.867 61.6472 68.9055 62.3566 68.7814 66.9298Z"
                fill="#FFFAFA"
                id="mouth-inner-shocked"
              />
            </g>
            <g id="happy">
              <path
                id="mouthhappy-full"
                d="M70.5811 57.6348C71.3952 57.6349 72.078 58.1873 72.2803 58.9375H72.3428C72.3428 59.0557 72.3402 59.1736 72.3369 59.291C72.339 59.326 72.3428 59.361 72.3428 59.3965C72.3428 59.4868 72.3344 59.5755 72.3213 59.6621C72.1381 62.8266 70.7637 65.6714 68.6387 67.7539C66.4123 69.9355 63.3632 71.2803 60 71.2803C56.6369 71.2803 53.5877 69.9355 51.3613 67.7539C50.149 66.5658 49.1802 65.1294 48.5381 63.5273C48.0572 62.3274 47.762 61.0342 47.6816 59.6826C47.6664 59.5895 47.6572 59.4939 47.6572 59.3965C47.6572 59.3451 47.6598 59.2944 47.6641 59.2441C47.6616 59.1422 47.6572 59.04 47.6572 58.9375H47.7197C47.922 58.1873 48.6048 57.6349 49.4189 57.6348H70.5811ZM53.3613 61.1592C53.4044 61.288 53.4498 61.4156 53.5 61.541C53.8642 62.4494 54.4132 63.2638 55.1006 63.9375C56.3632 65.1747 58.0927 65.9375 60 65.9375C61.9073 65.9375 63.6368 65.1747 64.8994 63.9375C65.6816 63.1709 66.2824 62.2214 66.6377 61.1592H53.3613Z"
                fill="black"
              />
            </g>

            {/* <path d="M50.0088 77.1949C47.3363 74.5615 46 71.0609 46 66.6932C46 62.3256 47.3363 58.8251 50.0088 56.1916C52.7382 53.5581 56.2353 55.0579 60.5 55.0579C64.7647 55.0579 68.2333 53.5581 70.9059 56.1916C73.6353 58.8251 75 62.3256 75 66.6932C75 71.0609 73.6353 74.5615 70.9059 77.1949C68.2333 79.8926 64.7647 81.2414 60.5 81.2414C56.2353 81.2414 52.7382 79.8926 50.0088 77.1949Z" fill="#222121"/>
<path d="M68.7814 66.9298C68.6574 71.503 64.8671 75.1828 60.2939 75.0587C55.7208 74.9346 52.0965 71.0536 52.2206 66.4805C52.3446 61.9073 55.7207 61.399 60.2939 61.5231C64.867 61.6472 68.9055 62.3566 68.7814 66.9298Z" fill="#FFFAFA"/> */}

            <path
              d="M50.0088 77.1949C47.3363 74.5615 46 71.0609 46 66.6932C46 62.3256 47.3363 58.8251 50.0088 56.1916C52.7382 53.5581 56.2353 55.0579 60.5 55.0579C64.7647 55.0579 68.2333 53.5581 70.9059 56.1916C73.6353 58.8251 75 62.3256 75 66.6932C75 71.0609 73.6353 74.5615 70.9059 77.1949C68.2333 79.8926 64.7647 81.2414 60.5 81.2414C56.2353 81.2414 52.7382 79.8926 50.0088 77.1949Z"
              fill="#222121"
              id="mouth-outer-excited"
            />
            <path
              d="M68.7814 66.9298C68.6574 71.503 64.8671 75.1828 60.2939 75.0587C55.7208 74.9346 52.0965 71.0536 52.2206 66.4805C52.3446 61.9073 55.7207 61.399 60.2939 61.5231C64.867 61.6472 68.9055 62.3566 68.7814 66.9298Z"
              fill="#FFFAFA"
              id="mouth-inner-excited"
            />
          </g>
        </svg>
        {/* <svg
          width="120"
          height="120"
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >

          <path
            d="M75 28C77.1525 28 79.078 28.9715 80.3621 30.5C81.3843 31.7168 82 33.4409 82 35C82 36.9587 81.1955 38.7295 79.899 40C78.6364 41.2372 76.9073 42 75 42C73.0927 42 71.3636 41.2372 70.101 40C69.4134 39.3262 68.8642 38.5117 68.5 37.6031C68.1775 36.7984 68 35.9199 68 35C68 34.0801 68.1775 33.2016 68.5 32.3969C68.7782 31.7028 69.1645 31.0635 69.6379 30.5C70.922 28.9715 72.8475 28 75 28Z"
            fill="#151414"
          />
          <path
            d="M46 28C48.1525 28 50.078 28.9715 51.3621 30.5C52.3843 31.7168 53 33.2865 53 35C53 36.9587 52.1955 38.7295 50.899 40C49.6364 41.2372 47.9073 42 46 42C44.0927 42 42.3636 41.2372 41.101 40C40.4134 39.3262 39.8642 38.5117 39.5 37.6031C39.1775 36.7984 39 35.9199 39 35C39 34.0801 39.1775 33.2016 39.5 32.3969C39.7782 31.7028 40.1645 31.0635 40.6379 30.5C41.922 28.9715 43.8475 28 46 28Z"
            fill="#333131"
          />
          <g>
            <path
              d="M50.0088 77.1949C47.3362 74.5615 45.9669 71.0609 45.9669 66.6932C45.9669 62.3256 47.3362 58.8251 50.0088 56.1916C52.7382 53.5581 56.2353 55.0579 60.5 55.0579C64.7647 55.0579 68.2333 53.5581 70.9059 56.1916C73.6353 58.8251 75 62.3256 75 66.6932C75 71.0609 73.6353 74.5615 70.9059 77.1949C68.2333 79.8926 64.7647 77.1949 60.5 77.1949C56.2353 77.1949 52.7382 79.8926 50.0088 77.1949Z"
              fill="#222121"
            />
            <path
              d="M68.7814 66.9298C68.6574 71.503 64.867 70.6341 60.2939 70.51C55.7207 70.3859 52.0965 71.0536 52.2206 66.4805C52.3446 61.9073 55.7207 61.399 60.2939 61.5231C64.867 61.6472 68.9055 62.3566 68.7814 66.9298Z"
              fill="#FFFAFA"
            />
          </g>

        </svg> */}
      </div>
      {/* <div id="mouscontainer" className="relative self-center">
        <div
          ref={mouthRef}
          className="absolute top-1/2 left-1/2 size-4 h-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-background"
        >
          <div className="absolute top-1/2 left-1/2 size-3/5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground"></div>
        </div>
      </div> */}
    </div>
  );
}
