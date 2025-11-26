import React, { useState } from 'react';
import IdCard from './IdCard';
import { useCursor } from '../context/CursorContext';

const Header: React.FC = () => {
  const [isIdCardOpen, setIsIdCardOpen] = useState(false);
  const { setCursorVariant } = useCursor();

  const handleMouseEnter = () => setCursorVariant('button');
  const handleMouseLeave = () => setCursorVariant('default');

  return (
    <>
      <header className="fixed top-0 w-full p-6 flex justify-between items-center z-50 mix-blend-difference text-white">
        <div
          className="text-2xl font-bold tracking-tighter uppercase font-mono cursor-none"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          AGENT.OSS
        </div>
        <nav className="hidden md:flex space-x-8 font-mono absolute left-1/2 -translate-x-1/2">
          {['Agents', 'Stack', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm font-semibold uppercase tracking-widest hover:underline decoration-2 underline-offset-4 transition-transform duration-300 hover:scale-110 inline-block cursor-none"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {item}
            </a>
          ))}
        </nav>
        <button
          onClick={() => setIsIdCardOpen(true)}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="border border-white px-6 py-2 rounded-full text-sm font-semibold uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300 font-mono hover:scale-105 cursor-none"
        >
          IDENTITY // ACCESS
        </button>
      </header>

      {isIdCardOpen && <IdCard onClose={() => setIsIdCardOpen(false)} />}
    </>
  );
};

export default Header;