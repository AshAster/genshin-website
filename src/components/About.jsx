import React from 'react'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import AnimatedTitle from './AnimatedTitle';

gsap.registerPlugin(ScrollTrigger)
const About = () => {

    useGSAP(() => {
        const clipAnimation = gsap.timeline({
          scrollTrigger: {
            trigger: "#clip",
            start: "center center",
            end: "+=800 center",
            scrub: 0.5,
            pin: true,
            pinSpacing: true,
          },
        });
        clipAnimation.to('.mask-clip-path', {
            width: '100vw',
            height: "100vh",
            borderRadius: 0,
        })
    });

  return (
    <div id='about' className='min-h-screen w-screen'>
        <div className='relative mb-8 mt-36 flex flex-col items-center gap-5 '>
            <h2 className='font-general text-sm uppercase md:text-[20px]'>Welcome to Genshin </h2>
            <AnimatedTitle 
  title="Disc<b>o</b>ver the world's largest <br /> shared <b>a</b>dventure"
  containerClass="mt-5 !text-black text-center md:text-[40px] " 
/>


            <div className="about-subtext">
          <p>Though the calamity the world suffered has ceased, peace has yet to be restored.</p>
          <p className="text-gray-500">
          Teyvat binds every traveler, from distant lands and forgotten times, into one shared adventure
          </p>
        </div>
        </div>

        <div className="h-dvh w-screen" id="clip">
  <div className="mask-clip-path about-image relative w-full h-full">
    <img
      src="/img/about.png"
      alt="Background"
      className="absolute left-0 top-0 w-full h-full object-cover"
    />
  </div>
</div>

    </div>
  );
};

export default About