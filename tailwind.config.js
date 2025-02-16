/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        'zentry':['zentry', 'sanf-serif'],
        'genshin': ['genshin', 'sanf-serif'],
        'general':['general', 'sanf-serif'],
        'ja-jp':['ja-jp', 'sanf-serif'],
        'robert-medium':['robert-medium', 'sanf-serif'],
        'circular-web':['circular-web', 'sanf-serif'],
        'robert-regular':['robert-regular', 'sanf-serif'],
        'zh-cn': ['zh-cn', 'sanf-serif'],
      },
      colors: {
        blue: {
          50: "#DFDFF0",
          75: "#dfdff2",
          100: "#F0F2FA",
          200: "#010101",
          300: "#4FB7DD",
        },
        violet: {
          300: "#5724ff",
        },
        yellow: {
          100: "#8e983f",
          300: "#edff66",
        },
      },
    },
  },
  plugins: [],
};