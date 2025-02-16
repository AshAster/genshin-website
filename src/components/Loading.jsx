import { useEffect, useState } from "react";

const LoadingScreen = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    // Example: Toggle between dark and light themes based on user preference
    const darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(darkMode ? "dark" : "light");
  }, []);

  return (
    <div className={`${theme === "dark" ? "bg-[#161d22]" : "bg-[#f5f5f5]"} h-screen flex justify-center items-center transition duration-300`}>
      <div className="relative w-[500px] h-[62.5px] scale-80 sm:scale-100 overflow-hidden">
        {/* Background */}
        <img
          src="https://yuanshen.site/imgs/loading-bar.png"
          alt="Loading..."
          className="absolute w-[500px] h-[62.5px] top-[500px] left-0 drop-shadow-[0_-500px_0_var(--loadingbar-background-color)]"
        />

        {/* Loading Bar Animation */}
        <div
          className="absolute top-[500px] left-0 w-[500px] h-[62.5px] bg-no-repeat bg-left bg-[url('https://yuanshen.site/imgs/loading-bar.png')] animate-loading-bar"
          style={{
            filter: `drop-shadow(0 -500px 0 ${theme === "dark" ? "#ece5d8" : "#666666"})`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default LoadingScreen;
