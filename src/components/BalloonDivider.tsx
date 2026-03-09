import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import balloonPink from "@/assets/balloon-pink.png";
import balloonBlue from "@/assets/balloon-blue.png";

const BALLOON_SIZE = 36;
const CONTAINER_H = 50;

const BalloonDivider = () => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  // Smooth easeInOutCubic via spring-like transform mapping
  const progress = useTransform(scrollYProgress, [0, 1], [0, 1], {
    ease: (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
  });

  // Left balloon: from far left to just-left-of-center
  const leftX = useTransform(progress, [0, 1], ["-50vw", "-18px"]);
  const leftY = useTransform(progress, [0, 0.4, 0.7, 1], [20, -6, -12, 0]);
  const leftRotate = useTransform(progress, [0, 1], [-20, 6]);

  // Right balloon: from far right to just-right-of-center
  const rightX = useTransform(progress, [0, 1], ["50vw", "18px"]);
  const rightY = useTransform(progress, [0, 0.4, 0.7, 1], [20, -6, -12, 0]);
  const rightRotate = useTransform(progress, [0, 1], [20, -6]);

  const opacity = useTransform(progress, [0, 0.12], [0, 1]);

  return (
    <div
      ref={ref}
      className="relative w-full"
      style={{ height: CONTAINER_H, pointerEvents: "none" }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Left balloon + tethered string */}
        <motion.div
          className="absolute"
          style={{ x: leftX, y: leftY, rotate: leftRotate, opacity }}
        >
          <div className="relative" style={{ width: BALLOON_SIZE, height: BALLOON_SIZE }}>
            <img
              src={balloonPink}
              alt=""
              className="w-full h-full object-contain drop-shadow-sm"
              draggable={false}
            />
            {/* String pinned to balloon base center */}
            <svg
              className="absolute"
              style={{
                top: BALLOON_SIZE - 2,
                left: BALLOON_SIZE / 2 - 0.75,
                overflow: "visible",
              }}
              width="2"
              height="80"
              viewBox="0 0 2 80"
            >
              <path
                d="M 1 0 Q -30 40, -120 80"
                stroke="hsl(var(--muted-foreground) / 0.4)"
                strokeWidth="1"
                fill="none"
              />
            </svg>
          </div>
        </motion.div>

        {/* Right balloon + tethered string */}
        <motion.div
          className="absolute"
          style={{ x: rightX, y: rightY, rotate: rightRotate, opacity }}
        >
          <div className="relative" style={{ width: BALLOON_SIZE, height: BALLOON_SIZE }}>
            <img
              src={balloonBlue}
              alt=""
              className="w-full h-full object-contain drop-shadow-sm"
              draggable={false}
            />
            {/* String pinned to balloon base center */}
            <svg
              className="absolute"
              style={{
                top: BALLOON_SIZE - 2,
                left: BALLOON_SIZE / 2 - 0.75,
                overflow: "visible",
              }}
              width="2"
              height="80"
              viewBox="0 0 2 80"
            >
              <path
                d="M 1 0 Q 32 40, 120 80"
                stroke="hsl(var(--muted-foreground) / 0.4)"
                strokeWidth="1"
                fill="none"
              />
            </svg>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BalloonDivider;
