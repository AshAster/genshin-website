import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AnimatedTitle = ({ title, containerClass = "", as: Tag = "div" }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray(".animated-word");

      if (prefersReducedMotion) {
        gsap.set(words, { opacity: 1, clearProps: "transform" });
        return;
      }

      gsap.to(words, {
        opacity: 1,
        transform: "translate3d(0, 0, 0) rotateY(0deg) rotateX(0deg)",
        ease: "power2.inOut",
        stagger: 0.02,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "100 bottom",
          end: "center bottom",
          toggleActions: "play none none reverse",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <Tag ref={containerRef} className={`animated-title ${containerClass}`}>
      {title.split("<br />").map((line, index) => (
        <div
          key={index}
          className="flex-center max-w-full flex-wrap gap-2 px-10 md:gap-3"
        >
          {line
            .split(" ")
            .filter(Boolean)
            .map((word, idx) => (
              <span
                key={idx}
                className="animated-word"
                dangerouslySetInnerHTML={{ __html: word }}
              />
            ))}
        </div>
      ))}
    </Tag>
  );
};

export default AnimatedTitle;
