import React, { useState } from 'react';
import IdCard from './IdCard';
import { useCursor } from '../context/CursorContext';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isIdCardOpen, setIsIdCardOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { setCursorVariant } = useCursor();

  const handleMouseEnter = () => setCursorVariant('button');
  const handleMouseLeave = () => setCursorVariant('default');

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const navItems = ['Agents', 'Stack', 'Contact'];

  return (
    <>
      <header className="fixed top-0 w-full p-6 flex justify-between items-center z-50 mix-blend-difference text-white">
        <div
          className="text-xl md:text-2xl font-bold tracking-tighter uppercase font-mono cursor-none"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          AGENT.OSS
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 font-mono absolute left-1/2 -translate-x-1/2">
          {navItems.map((item) => (
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

        {/* Desktop CTA */}
        <button
          onClick={() => setIsIdCardOpen(true)}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="hidden md:block border border-white px-6 py-2 rounded-full text-sm font-semibold uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300 font-mono hover:scale-105 cursor-none"
        >
          IDENTITY // ACCESS
        </button>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white focus:outline-none cursor-none"
          onClick={toggleMobileMenu}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-slate-950 flex flex-col items-center justify-center space-y-8 md:hidden">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-2xl font-mono font-bold uppercase tracking-widest text-white hover:text-emerald-500 transition-colors cursor-none"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {item}
            </a>
          ))}
          <button
            onClick={() => {
              setIsIdCardOpen(true);
              setIsMobileMenuOpen(false);
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="border border-white px-8 py-3 rounded-full text-lg font-semibold uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300 font-mono cursor-none mt-8"
          >
            IDENTITY // ACCESS
          </button>
        </div>
      )}

      {isIdCardOpen && <IdCard onClose={() => setIsIdCardOpen(false)} />}
    </>
  );
};

export default Header;