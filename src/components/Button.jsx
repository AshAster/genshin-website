/**
 * Pill button with a two-layer label that rolls over on hover.
 * Renders an <a> when `href` is given so links stay real links.
 */
const Button = ({ title, id, href, rightIcon, leftIcon, containerClass = "", onClick }) => {
  const Tag = href ? "a" : "button";
  const isExternal = href?.startsWith("http");

  return (
    <Tag
      id={id}
      href={href}
      onClick={onClick}
      {...(href
        ? isExternal
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {}
        : { type: "button" })}
      className={`group relative z-10 inline-flex w-fit cursor-pointer items-center overflow-hidden rounded-full bg-violet-50 px-7 py-3 text-black outline-none ring-offset-2 transition-colors focus-visible:ring-2 focus-visible:ring-yellow-300 ${containerClass}`}
    >
      {leftIcon}

      <span className="relative inline-flex overflow-hidden font-general text-base uppercase">
        <span className="inline-block translate-y-0 skew-y-0 transition-transform duration-500 group-hover:translate-y-[-160%] group-hover:skew-y-12">
          {title}
        </span>
        <span
          aria-hidden="true"
          className="absolute inline-block translate-y-[164%] skew-y-12 transition-transform duration-500 group-hover:translate-y-0 group-hover:skew-y-0"
        >
          {title}
        </span>
      </span>

      {rightIcon}
    </Tag>
  );
};

export default Button;
