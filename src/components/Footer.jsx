import { FaEnvelope, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const socialLinks = [
  { href: "https://www.github.com", icon: <FaGithub /> },
  { href: "https://www.linkedin.com", icon: <FaLinkedin /> },
  { href: "mailto:ayushpandey1808@gmail.com", icon: <FaEnvelope /> },
  { href: "https://www.twitter.com", icon: <FaTwitter /> },
];

const Footer = () => {
  return (
    <footer className="w-screen bg-[#cdbb98] py-4 text-black">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
        <p className="text-center text-sm font-light md:text-left">
          ©AshAster 2025. All rights reserved   
        </p>

        <div className="flex justify-center gap-4  md:justify-start">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black transition-colors duration-500 ease-in-out hover:text-white"
            >
              {link.icon}
            </a>
          ))}
        </div>

        <a
            href='https://www.hoyoverse.com/en-us/'
             className="text-center font-light hover:underline md:text-right flex items-center">
            <img
                src="/img/hoyo.png" 
                alt="Logo"
                className="w-15 h-6 mr-2"
            />
        </a>

      </div>
    </footer>
  );
};

export default Footer;