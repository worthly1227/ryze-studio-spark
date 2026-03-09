import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const BalloonDivider = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Progress mapped to 0-1 range for the animation
  const progress = useTransform(scrollYProgress, [0, 0.45], [0, 1]);

  // Left balloon: starts off-screen left, arches up and to center
  const leftX = useTransform(progress, [0, 0.5, 1], ["-60vw", "-15vw", "0vw"]);
  const leftY = useTransform(progress, [0, 0.4, 0.7, 1], ["80px", "-40px", "-80px", "-10px"]);
  const leftRotate = useTransform(progress, [0, 0.5, 1], [-30, -10, 8]);

  // Right balloon: starts off-screen right, arches up and to center
  const rightX = useTransform(progress, [0, 0.5, 1], ["60vw", "15vw", "0vw"]);
  const rightY = useTransform(progress, [0, 0.4, 0.7, 1], ["80px", "-40px", "-80px", "-10px"]);
  const rightRotate = useTransform(progress, [0, 0.5, 1], [30, 10, -8]);

  // Opacity: fade in as they enter
  const opacity = useTransform(progress, [0, 0.15], [0, 1]);

  // String curves widen as balloons move inward
  const leftStringEnd = useTransform(progress, [0, 1], ["-40vw", "-50vw"]);
  const rightStringEnd = useTransform(progress, [0, 1], ["40vw", "50vw"]);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{ height: "200px" }}
    >
      <div className="sticky top-0 w-full h-[200px] flex items-center justify-center">
        {/* Left balloon group */}
        <motion.div
          className="absolute"
          style={{
            x: leftX,
            y: leftY,
            rotate: leftRotate,
            opacity,
            left: "calc(50% - 60px)",
          }}
        >
          {/* String */}
          <motion.svg
            width="200"
            height="160"
            viewBox="0 0 200 160"
            className="absolute top-[68px] left-[10px]"
            style={{ overflow: "visible" }}
          >
            <motion.path
              d="M 25 0 Q -40 80, -200 160"
              stroke="hsl(var(--muted-foreground))"
              strokeWidth="1.5"
              fill="none"
              opacity="0.5"
            />
          </motion.svg>

          {/* Balloon */}
          <svg width="52" height="72" viewBox="0 0 52 72">
            {/* Balloon body - Pink */}
            <ellipse cx="26" cy="28" rx="24" ry="28" fill="#F472B6" />
            <ellipse cx="26" cy="28" rx="24" ry="28" fill="url(#pinkShine)" />
            {/* Highlight */}
            <ellipse cx="18" cy="18" rx="8" ry="12" fill="white" opacity="0.25" transform="rotate(-15 18 18)" />
            {/* Knot */}
            <polygon points="23,55 29,55 26,62" fill="#EC4899" />
            {/* Tiny string segment */}
            <line x1="26" y1="62" x2="26" y2="72" stroke="hsl(var(--muted-foreground))" strokeWidth="1.2" opacity="0.5" />
            <defs>
              <radialGradient id="pinkShine" cx="0.35" cy="0.3" r="0.65">
                <stop offset="0%" stopColor="white" stopOpacity="0.2" />
                <stop offset="100%" stopColor="transparent" stopOpacity="0" />
              </radialGradient>
            </defs>
          </svg>
        </motion.div>

        {/* Right balloon group */}
        <motion.div
          className="absolute"
          style={{
            x: rightX,
            y: rightY,
            rotate: rightRotate,
            opacity,
            left: "calc(50% + 8px)",
          }}
        >
          {/* String */}
          <motion.svg
            width="200"
            height="160"
            viewBox="0 0 200 160"
            className="absolute top-[68px] left-[16px]"
            style={{ overflow: "visible" }}
          >
            <motion.path
              d="M 25 0 Q 90 80, 250 160"
              stroke="hsl(var(--muted-foreground))"
              strokeWidth="1.5"
              fill="none"
              opacity="0.5"
            />
          </motion.svg>

          {/* Balloon */}
          <svg width="52" height="72" viewBox="0 0 52 72">
            {/* Balloon body - Blue */}
            <ellipse cx="26" cy="28" rx="24" ry="28" fill="#60A5FA" />
            <ellipse cx="26" cy="28" rx="24" ry="28" fill="url(#blueShine)" />
            {/* Highlight */}
            <ellipse cx="18" cy="18" rx="8" ry="12" fill="white" opacity="0.25" transform="rotate(-15 18 18)" />
            {/* Knot */}
            <polygon points="23,55 29,55 26,62" fill="#3B82F6" />
            {/* Tiny string segment */}
            <line x1="26" y1="62" x2="26" y2="72" stroke="hsl(var(--muted-foreground))" strokeWidth="1.2" opacity="0.5" />
            <defs>
              <radialGradient id="blueShine" cx="0.35" cy="0.3" r="0.65">
                <stop offset="0%" stopColor="white" stopOpacity="0.2" />
                <stop offset="100%" stopColor="transparent" stopOpacity="0" />
              </radialGradient>
            </defs>
          </svg>
        </motion.div>
      </div>
    </div>
  );
};

export default BalloonDivider;
