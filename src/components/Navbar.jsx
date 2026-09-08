import { useEffect, useRef, useState } from "react";
import { TiLocationArrow } from "react-icons/ti";
import { HiMenuAlt4, HiX } from "react-icons/hi";
import { useWindowScroll } from "react-use";
import gsap from "gsap";
import Button from "./Button";
import { asset, officialSiteUrl } from "../config";

// Every href here has to match an id that actually exists in App.jsx.
const navItems = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Characters", href: "#features" },
  { label: "Story", href: "#story" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const navContainerRef = useRef(null);
  const audioElementRef = useRef(null);

  const { y: currentScrollY } = useWindowScroll();

  const toggleAudio = () => setIsAudioPlaying((prev) => !prev);

  useEffect(() => {
    const audio = audioElementRef.current;
    if (!audio) return;

    if (isAudioPlaying) {
      // Browsers reject play() when the tab is muted or the gesture is stale.
      audio.play().catch(() => setIsAudioPlaying(false));
    } else {
      audio.pause();
    }
  }, [isAudioPlaying]);

  useEffect(() => {
    const nav = navContainerRef.current;
    if (!nav) return;

    if (currentScrollY === 0) {
      setIsNavVisible(true);
      nav.classList.remove("floating-nav");
    } else if (currentScrollY > lastScrollY) {
      setIsNavVisible(false);
      nav.classList.add("floating-nav");
    } else if (currentScrollY < lastScrollY) {
      setIsNavVisible(true);
      nav.classList.add("floating-nav");
    }

    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  // Never hide the bar while the mobile menu is open.
  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible || isMenuOpen ? 0 : -100,
      opacity: isNavVisible || isMenuOpen ? 1 : 0,
      duration: 0.2,
      overwrite: "auto",
    });
  }, [isNavVisible, isMenuOpen]);

  useEffect(() => {
    const onKeyDown = (e) => e.key === "Escape" && setIsMenuOpen(false);
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div
      ref={navContainerRef}
      className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6"
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex size-full items-center justify-between p-4">
          <div className="flex items-center gap-7">
            <a href="#hero" aria-label="Back to top">
              <img src={asset("img/logo.png")} alt="Teyvat" className="w-10" />
            </a>

            <Button
              id="product-button"
              title="Products"
              href={officialSiteUrl}
              rightIcon={<TiLocationArrow />}
              containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1"
            />
          </div>

          <div className="flex h-full items-center">
            <div className="hidden md:block">
              {navItems.map((item) => (
                <a key={item.href} href={item.href} className="nav-hover-btn">
                  {item.label}
                </a>
              ))}
            </div>

            <button
              type="button"
              onClick={toggleAudio}
              aria-pressed={isAudioPlaying}
              aria-label={isAudioPlaying ? "Mute background music" : "Play background music"}
              className="ml-10 flex items-center space-x-0.5 rounded p-1 outline-none focus-visible:ring-2 focus-visible:ring-yellow-300"
            >
              <audio ref={audioElementRef} className="hidden" src={asset("audio/sound.mp3")} loop preload="none" />
              {[1, 2, 3, 4].map((bar) => (
                <span
                  key={bar}
                  className={`indicator-line${isAudioPlaying ? " active" : ""}`}
                  style={{ "--animation-order": bar }}
                />
              ))}
            </button>

            <button
              type="button"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className="ml-6 rounded p-1 text-2xl text-blue-50 outline-none focus-visible:ring-2 focus-visible:ring-yellow-300 md:hidden"
            >
              {isMenuOpen ? <HiX /> : <HiMenuAlt4 />}
            </button>
          </div>
        </nav>

        <div
          id="mobile-menu"
          hidden={!isMenuOpen}
          className="mx-4 rounded-lg bg-black/90 p-4 backdrop-blur md:hidden"
        >
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block rounded px-3 py-2 font-general text-xs uppercase text-blue-50 transition-colors hover:bg-white/10"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
