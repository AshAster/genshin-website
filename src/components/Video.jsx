import { forwardRef } from "react";

/**
 * Background video with a WebM source and an MP4 fallback.
 *
 * Pass `src` without an extension (e.g. "/videos/hero-1") or with one — it is
 * stripped either way — and the component renders <source> tags for both
 * formats so Chromium/Firefox take the small WebM and Safari falls back to MP4.
 *
 * Because the sources are children rather than a `src` attribute, swapping
 * clips needs a remount: give the element a `key` tied to the clip name.
 */
const Video = forwardRef(function Video(
  { src, className = "", autoPlay = false, loop = true, muted = true, preload = "auto", ...rest },
  ref
) {
  const base = src.replace(/\.(mp4|webm)$/i, "");

  return (
    <video
      ref={ref}
      className={className}
      autoPlay={autoPlay}
      loop={loop}
      muted={muted}
      playsInline
      preload={preload}
      disablePictureInPicture
      {...rest}
    >
      <source src={`${base}.webm`} type="video/webm" />
      <source src={`${base}.mp4`} type="video/mp4" />
    </video>
  );
});

export default Video;
