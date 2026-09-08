import { FaEnvelope, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { asset, contactEmail, hoyoverseUrl, socials } from "../config";

const socialLinks = [
  { href: socials.github, label: "GitHub", icon: <FaGithub /> },
  { href: socials.linkedin, label: "LinkedIn", icon: <FaLinkedin /> },
  { href: `mailto:${contactEmail}`, label: "Email", icon: <FaEnvelope /> },
  { href: socials.twitter, label: "Twitter", icon: <FaTwitter /> },
];

const Footer = () => {
  return (
    <footer className="w-screen bg-[#cdbb98] py-4 text-black">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
        <p className="text-center text-sm font-light md:text-left">
          &copy;AshAster {new Date().getFullYear()}. All rights reserved
        </p>

        <ul className="flex justify-center gap-4 md:justify-start">
          {socialLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="inline-flex rounded p-1 text-black outline-none transition-colors duration-500 ease-in-out hover:text-white focus-visible:ring-2 focus-visible:ring-black"
              >
                {link.icon}
              </a>
            </li>
          ))}
        </ul>

        <a
          href={hoyoverseUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="HoYoverse"
          className="flex items-center rounded p-1 outline-none focus-visible:ring-2 focus-visible:ring-black"
        >
          <img src={asset("img/hoyo.png")} alt="HoYoverse" className="h-6 w-auto" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
