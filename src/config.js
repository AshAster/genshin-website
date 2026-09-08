/**
 * Site configuration, sourced from VITE_* env vars.
 *
 * Every value falls back to the literal that used to be hardcoded in the
 * components, so the site still builds and runs correctly with no .env present
 * (which matters: .env is gitignored, so a fresh clone won't have one).
 */

const env = import.meta.env;

export const siteUrl = env.VITE_SITE_URL || "https://ashaster.github.io/genshin-website/";
export const officialSiteUrl = env.VITE_OFFICIAL_SITE_URL || "https://genshin.hoyoverse.com/en/";
export const hoyoverseUrl = env.VITE_HOYOVERSE_URL || "https://www.hoyoverse.com/en-us/";
export const contactEmail = env.VITE_CONTACT_EMAIL || "ayushpandey1808@gmail.com";

export const socials = {
  github: env.VITE_GITHUB_URL || "https://www.github.com",
  linkedin: env.VITE_LINKEDIN_URL || "https://www.linkedin.com",
  twitter: env.VITE_TWITTER_URL || "https://www.twitter.com",
};

/**
 * Resolve a file in `public/` against the deploy base path.
 *
 * Vite rewrites asset URLs in index.html and CSS, but a "/img/logo.png" string
 * sitting inside a component is just a string — it stays root-absolute and 404s
 * whenever the site is served from a subpath (a GitHub Pages project site, for
 * one). Always route public assets through this.
 *
 *   asset("img/logo.png") -> "/genshin-website/img/logo.png"
 */
export const asset = (path) => `${env.BASE_URL}${String(path).replace(/^\/+/, "")}`;
