import AnimatedTitle from "./AnimatedTitle";
import Button from "./Button";
import { asset, officialSiteUrl } from "../config";

const ImageClipBox = ({ src, clipClass, alt = "" }) => (
  <div className={clipClass}>
    <img src={src} alt={alt} loading="lazy" decoding="async" />
  </div>
);

const Contact = () => {
  return (
    <div id="contact" className="my-20 min-h-96 w-screen px-10">
      <div className="relative rounded-lg bg-black py-24 text-blue-50 sm:overflow-hidden">
        {/* Left side images */}
        <div className="pointer-events-none absolute -left-20 top-0 hidden h-full w-72 overflow-hidden sm:block lg:left-20 lg:w-96">
          <ImageClipBox src={asset("img/contact-1.webp")} clipClass="contact-clip-path-1" />
          <ImageClipBox
            src={asset("img/genosis.webp")}
            clipClass="contact-clip-path-2 translate-y-60 lg:translate-y-40"
          />
        </div>

        {/* Right side images */}
        <div className="pointer-events-none absolute -top-40 left-20 w-60 sm:top-1/2 md:left-auto md:right-10 lg:top-20 lg:w-80">
          <ImageClipBox src={asset("img/mavik.png")} clipClass="absolute md:scale-125" />
          <ImageClipBox
            src={asset("img/mavik.png")}
            clipClass="sword-man-clip-path md:scale-125"
            alt="Mavuika, the Pyro Archon"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center">
          <p className="mb-10 font-general text-[10px] uppercase">Join Genshin</p>

          <AnimatedTitle
            as="h2"
            title="let's f<b>or</b>ge our <br /> future t<b>o</b>gether."
            containerClass="w-full !text-5xl !font-black !leading-[.9] md:!text-[6.2rem]"
          />

          <Button
            title="contact us"
            href={officialSiteUrl}
            containerClass="mt-10"
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;
