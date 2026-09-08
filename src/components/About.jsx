import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedTitle from "./AnimatedTitle";
import { asset } from "../config";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const About = () => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      // Scoped to this section: `.mask-clip-path` also exists in the Hero, and an
      // unscoped selector would blow that one up to full screen too.
      gsap
        .timeline({
          scrollTrigger: {
            trigger: "#clip",
            start: "center center",
            end: "+=800 center",
            scrub: 0.5,
            pin: true,
            pinSpacing: true,
          },
        })
        .to(".mask-clip-path", {
          width: "100vw",
          height: "100vh",
          borderRadius: 0,
        });
    },
    { scope: containerRef }
  );

  return (
    <div id="about" ref={containerRef} className="min-h-screen w-screen">
      <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
        <h2 className="font-general text-sm uppercase md:text-[20px]">
          Welcome to Genshin
        </h2>

        <AnimatedTitle
          as="h3"
          title="Disc<b>o</b>ver the world's largest <br /> shared <b>a</b>dventure"
          containerClass="mt-5 !text-black text-center md:text-[40px]"
        />

        <div className="about-subtext">
          <p>
            Though the calamity the world suffered has ceased, peace has yet to
            be restored.
          </p>
          <p className="text-gray-500">
            Teyvat binds every traveler, from distant lands and forgotten times,
            into one shared adventure
          </p>
        </div>
      </div>

      <div className="h-dvh w-screen" id="clip">
        <div className="mask-clip-path about-image relative size-full">
          <img
            src={asset("img/about.webp")}
            alt="A sweeping view across the world of Teyvat"
            loading="lazy"
            decoding="async"
            className="absolute left-0 top-0 size-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
