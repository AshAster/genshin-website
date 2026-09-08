import { useState, useRef, useEffect, useCallback } from "react";
import Button from "./Button";
import Video from "./Video";
import { TiLocationArrow } from "react-icons/ti";
import { asset, officialSiteUrl } from "../config";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const TOTAL_VIDEOS = 4;
const getVideoSrc = (index) => asset(`videos/hero-${index}`);

export const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const nextVideoRef = useRef(null);
  const previewVideoRef = useRef(null);
  const containerRef = useRef(null);

  const upcomingVideoIndex = (currentIndex % TOTAL_VIDEOS) + 1;

  // The background clip gates the loader. A timeout and an error handler both
  // release it so a slow or missing file can never leave the spinner stuck.
  const stopLoading = useCallback(() => setIsLoading(false), []);

  useEffect(() => {
    const timeout = setTimeout(stopLoading, 4000);
    return () => clearTimeout(timeout);
  }, [stopLoading]);

  const handleMiniVideoClick = () => {
    setHasClicked(true);
    setCurrentIndex(upcomingVideoIndex);
  };

  // Expand the queued clip over the current one when the mini preview is clicked.
  useGSAP(
    () => {
      if (!hasClicked) return;

      gsap.set("#next-video", { visibility: "visible" });
      gsap.to("#next-video", {
        transformOrigin: "center center",
        scale: 1,
        width: "100%",
        height: "100%",
        duration: 1,
        ease: "power1.inOut",
        onStart: () => {
          // Autoplay can be rejected (low power mode, no user gesture yet).
          nextVideoRef.current?.play?.().catch(() => {});
        },
      });
      gsap.from("#current-video", {
        transformOrigin: "center center",
        scale: 0,
        duration: 1.5,
        ease: "power1.inOut",
      });
    },
    { scope: containerRef, dependencies: [currentIndex], revertOnUpdate: true }
  );

  // Pinch the video frame into a rhombus as the page scrolls past it.
  useGSAP(
    () => {
      gsap.set("#video-frame", {
        clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
        borderRadius: "0% 0% 40% 10%",
      });
      gsap.from("#video-frame", {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        borderRadius: "0% 0% 0% 0%",
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: "#video-frame",
          start: "center center",
          end: "bottom center",
          scrub: true,
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <div id="hero" ref={containerRef} className="relative h-dvh w-screen overflow-x-hidden">
      {isLoading && (
        <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
          <div className="three-body">
            <div className="three-body__dot" />
            <div className="three-body__dot" />
            <div className="three-body__dot" />
          </div>
        </div>
      )}

      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
      >
        {/* Hover-to-reveal preview of the next clip */}
        <div className="hero-mini-frame absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
          <div
            role="button"
            tabIndex={0}
            aria-label="Play the next hero clip"
            onClick={handleMiniVideoClick}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleMiniVideoClick();
              }
            }}
            className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100 focus-visible:scale-100 focus-visible:opacity-100 focus-visible:outline-none"
          >
            <Video
              key={`preview-${upcomingVideoIndex}`}
              ref={previewVideoRef}
              src={getVideoSrc(upcomingVideoIndex)}
              autoPlay
              preload="metadata"
              id="current-video"
              className="size-64 origin-center scale-150 object-cover object-center"
            />
          </div>
        </div>

        {/* The clip that scales up to fill the frame after a click */}
        <Video
          key={`next-${currentIndex}`}
          ref={nextVideoRef}
          src={getVideoSrc(currentIndex)}
          preload="metadata"
          id="next-video"
          className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
        />

        {/* Background clip */}
        <Video
          key={`bg-${currentIndex}`}
          src={getVideoSrc(currentIndex)}
          autoPlay
          className="absolute left-0 top-0 size-full object-cover object-center"
          onLoadedData={stopLoading}
          onError={stopLoading}
        />

        <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">
          G<b>a</b>ming
        </h1>

        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="special-font hero-heading text-blue-100">
              teyv<b>a</b>t
            </h1>
            <p className="mb-5 max-w-64 font-genshin text-blue-100">
              Come, let us uncover <br /> the secrets of Teyvat together
            </p>

            <Button
              id="watch-trailer"
              title="Watch trailer"
              href={officialSiteUrl}
              leftIcon={<TiLocationArrow />}
              containerClass="bg-yellow-300 flex-center gap-1"
            />
          </div>
        </div>
      </div>

      <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black">
        G<b>a</b>ming
      </h1>
    </div>
  );
};

export default Hero;
