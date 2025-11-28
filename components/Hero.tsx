import React from 'react';

const Hero: React.FC = () => {
  const handleInitialize = () => {
    window.scrollTo(0, 0);
    window.location.reload();
  };

  return (
    <section className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden bg-slate-900 text-slate-50">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>

      <div className="z-10 text-center flex flex-col items-center">
        <h1 className="text-[12vw] lg:text-[10rem] leading-none font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 select-none font-mono">
          AGENTIC
        </h1>
        <h1 className="text-[12vw] lg:text-[10rem] leading-none font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-t from-white to-slate-400 select-none -mt-4 sm:-mt-8 font-mono">
          WORKS
        </h1>

        <p className="mt-12 max-w-xl text-center text-slate-400 text-lg sm:text-xl font-light font-mono">
          Software Developer in AI.<br />
          Architecting autonomous digital workers.
        </p>

        <button
          onClick={handleInitialize}
          className="mt-12 px-8 py-4 bg-white text-black font-bold text-lg rounded-full hover:scale-105 transition-transform duration-300 font-mono"
        >
          INITIALIZE PROTOCOL
        </button>
      </div>
    </section>
  );
};

export default Hero;