import gsap from "gsap";
import { useRef } from "react";

import Button from "./Button";
import AnimatedTitle from "./AnimatedTitle";
import { asset, officialSiteUrl } from "../config";

const FloatingImage = () => {
  const frameRef = useRef(null);

  const handleMouseMove = (e) => {
    const element = frameRef.current;
    if (!element) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rect = element.getBoundingClientRect();
    const xPos = e.clientX - rect.left;
    const yPos = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    gsap.to(element, {
      duration: 0.3,
      rotateX: ((yPos - centerY) / centerY) * -10,
      rotateY: ((xPos - centerX) / centerX) * 10,
      transformPerspective: 500,
      ease: "power1.inOut",
      overwrite: "auto",
    });
  };

  const resetTilt = () => {
    const element = frameRef.current;
    if (!element) return;

    gsap.to(element, {
      duration: 0.3,
      rotateX: 0,
      rotateY: 0,
      ease: "power1.inOut",
      overwrite: "auto",
    });
  };

  return (
    <section id="story" className="min-h-dvh w-screen bg-black text-blue-50">
      <div className="flex size-full flex-col items-center py-10 pb-24">
        <p className="font-general text-sm uppercase md:text-[20px]">
          A world full of mystery
        </p>

        <div className="relative size-full">
          <AnimatedTitle
            as="h2"
            title="the st<b>o</b>ry of <br /> a hidden real<b>m</b>"
            containerClass="mt-5 pointer-events-none mix-blend-difference relative z-10 md:text-[80px]"
          />

          <div className="story-img-container">
            <div className="story-img-mask">
              <div className="story-img-content">
                <img
                  ref={frameRef}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={resetTilt}
                  onMouseUp={resetTilt}
                  src={asset("img/entrance.webp")}
                  alt="The entrance to a hidden realm"
                  loading="lazy"
                  decoding="async"
                  className="object-contain"
                />
              </div>
            </div>

            {/* Gooey edge filter referenced by .story-img-container */}
            <svg
              className="invisible absolute size-0"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <filter id="flt_tag">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
                  <feColorMatrix
                    in="blur"
                    mode="matrix"
                    values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                    result="flt_tag"
                  />
                  <feComposite in="SourceGraphic" in2="flt_tag" operator="atop" />
                </filter>
              </defs>
            </svg>
          </div>
        </div>

        <div className="-mt-80 flex w-full justify-center md:-mt-64 md:me-44 md:justify-end">
          <div className="flex h-full w-fit flex-col items-center md:items-start">
            <p className="mt-3 max-w-sm text-center font-circular-web text-violet-50 md:text-start">
              Where nations unite, lies Teyvat and the divine Archons. Uncover its
              secrets and forge your destiny across endless adventures.
            </p>

            <Button
              id="realm-btn"
              title="Explore the lore"
              href={officialSiteUrl}
              containerClass="mt-5"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FloatingImage;
