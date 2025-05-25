"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function Face() {
  const faceRef = useRef<SVGSVGElement | null>(null);
  const leftPupilRef = useRef<null | SVGPathElement>(null);
  const rightPupilRef = useRef<null | SVGPathElement>(null);
  const mouthRef = useRef<null | SVGPathElement>(null);

  useGSAP(() => {
    const face = faceRef.current;
    const leftPupil = leftPupilRef.current;
    const rightPupil = rightPupilRef.current;
    const mouth = mouthRef.current;
    let lastElemment: "A" | "DIV" | undefined;

    // gsap.to([leftPupil, rightPupil, mouth], {
    //   y: 4,
    //   yoyo: true,
    //   repeat: -1,
    //   duration: 2,
    //   ease: "circ.inOut",
    // });
    const handleMouseMove = (e: MouseEvent) => {
      const target = e.target;

      if (!face || !leftPupil || !rightPupil) return;
      //   console.log(target);

      if (target instanceof HTMLElement) {
        // for (const attr of target.attributes) {
        // }
        // console.log("Example: Check if it's a link and get the href");
        switch (target.tagName) {
          case "A":
            if (lastElemment === "A") break;
            console.log(target.tagName);

            gsap.to("#normal-left-eye", {
              morphSVG: "#left-squinted-eye",
              //   ease: "elastic.out",
            });
            gsap.to("#normal-right-eye", {
              morphSVG: "#right-squinted-eye",
            });

            gsap.to("#mouth-outer", {
              //   ease: "bounce.out",
              overwrite: "auto",
              morphSVG: "#mouth-outer-excited",
            });
            gsap.to("#mouth-inner", {
              //   ease: "bounce.out",
              overwrite: "auto",
              morphSVG: "#mouth-inner-excited",
            });
            // className="absolute flex size-2 h-0 w-0 items-center justify-center rounded-full border-y-[4px] border-r-[8px] border-y-transparent border-r-black"
            lastElemment = "A";
            break;
          case "DIV":
            if (lastElemment === "DIV") break;
            console.log(target.tagName);

            gsap.to("#normal-left-eye", {
              morphSVG: "#normal-left-eye",
            });
            gsap.to("#normal-right-eye", {
              morphSVG: "#normal-right-eye",
            });

            gsap.to("#mouth-outer", {
              height: 1,
              //   ease: "elastic.out",
              overwrite: "auto",
              morphSVG: "#mouth-outer",
              duration: 0.5,
            });
            gsap.to("#mouth-inner", {
              height: 1,
              //   ease: "elastic.out",
              overwrite: "auto",
              morphSVG: "#mouth-inner",
              duration: 0.5,
            });
            lastElemment = "DIV";
            break;
        }
      }

      const { left, top, width, height } = face.getBoundingClientRect();
      // console.log("left", x, "top", top, "width", width, "height", height);

      const centerX = left + width / 2;
      const centerY = top + height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      // console.log("deltax", deltaX, "deltay", deltaY);

      // max movement range for pupils
      const maxMove = 7;

      // normalize and clamp
      const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
      const angle = Math.atan2(deltaY, deltaX);
      const moveX = Math.min(maxMove, distance) * Math.cos(angle);
      const moveY = Math.min(maxMove, distance) * Math.sin(angle);

      gsap.to([leftPupil, rightPupil, "#mouth-outer", "#mouth-inner"], {
        x: moveX,
        y: moveY,
        duration: 0.5,
        ease: "power2.out",
        delay: 0.1,
      });
    };

    document.body.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.body.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="absolute mx-auto mt-40 flex size-20 flex-col items-center justify-center gap-4 rounded-md bg-foreground">
      <div className="flex gap-3">
        {/* <svg
          className="size-full"
          //   width="49"
          //   height="49"
          viewBox="0 0 49 49"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            ref={leftPupilRef}
            d="M20.5512 22.8665C20.5512 25.794 18.178 28.1672 15.2506 28.1672C12.3231 28.1672 9.93043 25.794 9.93043 22.8665C9.93043 19.9391 12.3231 17.5659 15.2506 17.5659C18.178 17.5659 20.5512 19.9391 20.5512 22.8665Z"
            fill="currentColor"
            className="text-background"
          />
          <path
            ref={rightPupilRef}
            d="M36.6877 22.8665C36.6877 25.794 34.3145 28.1672 31.387 28.1672C28.4596 28.1672 26.0669 25.794 26.0669 22.8665C26.0669 19.9391 28.4596 17.5659 31.387 17.5659C34.3145 17.5659 36.6877 19.9391 36.6877 22.8665Z"
            fill="currentColor"
            className="text-background"
          />
          <path
            ref={mouthRef}
            d="M30.0669 40.8557C30.0669 43.9975 26.7541 46.5443 22.6675 46.5443C18.5809 46.5443 15.2408 43.9975 15.2408 40.8557C15.2408 37.714 18.5809 35.1672 22.6675 35.1672C26.7541 35.1672 30.0669 37.714 30.0669 40.8557Z"
            fill="currentColor"
            className="text-background"
          />
        </svg> */}
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
            className="text-background"
            id="normal-left-eye"
          />
          <path
            ref={rightPupilRef}
            d="M46 28C48.1525 28 50.078 28.9715 51.3621 30.5C52.3843 31.7168 53 33.2865 53 35C53 36.9587 52.1955 38.7295 50.899 40C49.6364 41.2372 47.9073 42 46 42C44.0927 42 42.3636 41.2372 41.101 40C40.4134 39.3262 39.8642 38.5117 39.5 37.6031C39.1775 36.7984 39 35.9199 39 35C39 34.0801 39.1775 33.2016 39.5 32.3969C39.7782 31.7028 40.1645 31.0635 40.6379 30.5C41.922 28.9715 43.8475 28 46 28Z"
            fill="currentColor"
            id="normal-right-eye"
            className="text-background"
          />
          <path
            ref={mouthRef}
            id="mouth-outer"
            d="M48.4235 83.5349C45.4745 80.629 44 76.7663 44 71.9468C44 67.1274 45.4745 63.2647 48.4235 60.3588C51.4353 57.4529 55.2941 56 60 56C64.7059 56 68.5333 57.4529 71.4824 60.3588C74.4941 63.2647 76 67.1274 76 71.9468C76 76.7663 74.4941 80.629 71.4824 83.5349C68.5333 86.5116 64.7059 88 60 88C55.2941 88 51.4353 86.5116 48.4235 83.5349Z"
            fill="currentColor"
            className="text-background"
          />
          <path
            d="M71.1445 72.3357C70.9322 78.4897 65.7941 83.405 59.6401 83.1926C53.486 82.9803 48.6464 77.7207 48.8588 71.5666C49.0711 65.4126 54.2321 60.5959 60.3862 60.8083C66.5402 61.0206 71.3569 66.1816 71.1445 72.3357Z"
            fill="currentColor"
            id="mouth-inner"
            className="text-foreground"
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
              <svg
                width="120"
                height="120"
                viewBox="0 0 120 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M38.2653 42.889C38.1058 42.194 38.0608 39.2205 38.0332 38.4979C38.0124 37.9522 43.3199 37.7751 43.3729 37.2252C43.4159 36.7787 38.5545 34.7558 38.2831 35.5158C38.4999 34.4592 40.3441 31.5424 40.8269 30.5549C40.8269 30.5549 56.8551 36.0213 56.6586 37.2252C56.4622 38.4292 38.2653 42.889 38.2653 42.889Z"
                  fill="#0E0E0E"
                />
                <path
                  d="M84.5233 29.8649C84.7937 30.4189 85.3422 32.8482 85.4913 33.4371C85.604 33.8817 80.8648 35.7369 80.9078 36.1918C80.9078 36.1918 85.5027 37.6192 85.4913 37.9904C85.4642 38.875 85.7601 39.9685 84.5233 41.8062C84.5233 41.8062 67.961 37.1951 67.9436 36.1918C67.9263 35.1885 84.5233 29.8649 84.5233 29.8649Z"
                  fill="#0E0E0E"
                />
              </svg>
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
