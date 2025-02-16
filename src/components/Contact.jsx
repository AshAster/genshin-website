import AnimatedTitle from "./AnimatedTitle";
import Button from "./Button";

const ImageClipBox = ({ src, clipClass, alt = "" }) => (
  <div className={clipClass}>
    <img src={src} alt={alt} />
  </div>
);

const Contact = () => {
  return (
    <div id="contact" className="my-20 min-h-96 w-screen px-10">
      <div className="relative rounded-lg bg-black py-24 text-blue-50 sm:overflow-hidden">
        {/* Left side images */}
        <div className="absolute -left-20 top-0 hidden h-full w-72 overflow-hidden sm:block lg:left-20 lg:w-96">
          <ImageClipBox
            src="/img/contact-1.webp"
            clipClass="contact-clip-path-1"
            alt="Contact Image 1"
          />
          <ImageClipBox
            src="/img/genosis.webp"
            clipClass='contact-clip-path-2 lg:translate-y-40 translate-y-60'
          /> 
        </div>

        {/* Right side images */}
        <div className="absolute -top-40 left-20 w-60 sm:top-1/2 md:left-auto md:right-10 lg:top-20 lg:w-80">
          <ImageClipBox
            src="/img/mavik.png"
            clipClass="absolute md:scale-125"
            alt="mavuika"
          />
          <ImageClipBox
            src="/img/mavik.png"
            clipClass="sword-man-clip-path md:scale-125"
            alt="mavuika"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col items-center text-center">
          <p className="mb-10 font-general text-[10px] uppercase">
            Join Genshin
          </p>

          <AnimatedTitle
            title="let's f<b>or</b>ge our <br /> future t<b>o</b>gether."
            className="special-font !md:text-[6.2rem] w-full font-zentry !text-5xl !font-black !leading-[.9]"
          />
          <a href="https://genshin.hoyoverse.com/en/">
          <Button title="contact us" containerClass="mt-10 cursor-pointer" />
          </a>

         
        </div>
      </div>
    </div>
  );
};

export default Contact;