import React from "react";
import { useInView } from "react-intersection-observer";

interface AnimateOnScrollProps {
  children: React.ReactNode;
  delay?: string;
  animation?: "fade-up" | "fade-left" | "fade-right";
  className?: string;
}

const AnimateOnScroll: React.FC<AnimateOnScrollProps> = ({
  children,
  delay = "0ms",
  animation = "fade-up",
  className = "",
}) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const animationClasses = {
    "fade-up": { hidden: "fade-up-hidden", visible: "fade-up" },
    "fade-left": { hidden: "fade-left-hidden", visible: "fade-left" },
    "fade-right": { hidden: "fade-right-hidden", visible: "fade-right" },
  };

  const selectedAnimation = animationClasses[animation];

  return (
    <div
      ref={ref}
      className={`${selectedAnimation.hidden} ${
        inView ? selectedAnimation.visible : ""
      } ${className}`}
      style={{ transitionDelay: delay }}
    >
      {children}
    </div>
  );
};

export default AnimateOnScroll;
