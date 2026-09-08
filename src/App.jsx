import Hero from "./components/Hero";
import About from "./components/About";
import Navbar from "./components/Navbar";
import Features from "./components/Features";
import Story from "./components/Story";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

const App = () => {
  return (
    <>
      <a href="#about" className="skip-link">
        Skip to content
      </a>

      <Navbar />

      <main className="relative min-h-screen w-screen overflow-x-hidden">
        <Hero />
        <About />
        <Features />
        <Story />
        <Contact />
      </main>

      <Footer />
    </>
  );
};

export default App;
