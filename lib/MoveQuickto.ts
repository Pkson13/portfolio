import gsap from "gsap";

type movequicktoprpos = {
  id: string | SVGPathElement;
  moveX: number;
  moveY: number;
  duration?: number;
  ease?: gsap.EaseString;
  delay?: number;
};
export const movequickto = ({
  id,
  duration = 0.5,
  ease,
  delay = 0.1,
  moveX,
  moveY,
}: movequicktoprpos) => {
  //   console.log("type", typeof id);

  const moveXto = gsap.quickTo(id, "x", { duration, ease, delay });
  const moveYto = gsap.quickTo(id, "y", { duration, ease, delay });
  moveXto(moveX);
  moveYto(moveY);
};
