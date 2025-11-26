import React, { useState, useRef } from 'react';
import { useCursor } from '../context/CursorContext';

const Icons = {
  Github: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  ),
  // ... (I'll just replace the import and the component part, assuming I can skip the icons if I don't touch them)
  // Actually, I'll just replace the component definition and imports.

  Twitter: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  LinkedIn: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  ),
  Matrix: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
      <path d="M.632.55v22.9h2.28v.982H0V0h2.912v.982h-2.28v-.432zM21.088.982h2.28V23.45h-2.28v-.982h2.912V.55h-2.912v.432zM8.136 9.471c.427-.306 1.082-.377 1.48-.127.427.324 3.033 4.542 3.033 4.542s2.618-4.227 3.033-4.542c.422-.279 1.053-.179 1.48.127.472.338.56.985.207 1.442l-3.518 5.674c-.387.522-1.127.527-1.517.005l-4.405-5.679c-.353-.457-.265-1.104.207-1.442z" />
    </svg>
  )
};

const IdCard: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const { setCursorVariant } = useCursor();

  const handleClick = () => {
    setIsFlipping(true);
    setIsOpen(!isOpen);
    setTimeout(() => setIsFlipping(false), 600);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calculate rotation based on cursor position relative to center
    // Max rotation 15 degrees
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -15;
    const rotateY = ((x - centerX) / centerX) * 15;

    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
    setCursorVariant('button');
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setRotate({ x: 0, y: 0 }); // Reset rotation
    setCursorVariant('default');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 backdrop-blur-sm perspective-[1000px]" onClick={onClose}>

      <div
        onClick={(e) => { e.stopPropagation(); handleClick(); }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y + (isOpen ? 180 : 0)}deg) scale3d(1, 1, 1)`,
          transition: isFlipping ? 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)' : (isHovering ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out'),
          transformStyle: 'preserve-3d'
        }}
        className={`
          relative w-80 h-80 bg-slate-900 border transition-colors duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
          group cursor-none z-10 select-none
          ${isOpen ? 'border-emerald-500/50' : 'border-slate-700 hover:border-slate-500'}
        `}
      >
        {/* Dynamic Shadow for floating effect */}
        <div
          className={`absolute -inset-4 bg-emerald-500/20 blur-2xl transition-opacity duration-300 -z-10 rounded-full
            ${isOpen ? 'opacity-40' : 'opacity-0 group-hover:opacity-20'}`}
        />

        {/* Tech decoration corners */}
        <div className={`absolute top-0 left-0 w-3 h-3 border-t border-l transition-colors duration-300 ${isOpen ? 'border-emerald-500' : 'border-slate-500'}`} />
        <div className={`absolute top-0 right-0 w-3 h-3 border-t border-r transition-colors duration-300 ${isOpen ? 'border-emerald-500' : 'border-slate-500'}`} />
        <div className={`absolute bottom-0 left-0 w-3 h-3 border-b border-l transition-colors duration-300 ${isOpen ? 'border-emerald-500' : 'border-slate-500'}`} />
        <div className={`absolute bottom-0 right-0 w-3 h-3 border-b border-r transition-colors duration-300 ${isOpen ? 'border-emerald-500' : 'border-slate-500'}`} />

        {/* Default State: Photo & Info */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 [backface-visibility:hidden]">
          <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-slate-600 mb-6 relative group-hover:border-slate-400 transition-colors shadow-inner">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop"
              alt="Profile"
              className="w-full h-full object-cover filter grayscale contrast-125"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
          </div>

          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold tracking-tighter text-white drop-shadow-lg">ALEX.AI</h3>
            <div className="h-px w-12 bg-slate-700 mx-auto" />
            <p className="text-xs text-slate-400 tracking-widest uppercase">Lead Architect</p>
          </div>

          <div className="mt-8 text-[10px] text-slate-600 tracking-[0.2em] animate-pulse">
            [ CLICK TO DECRYPT ]
          </div>
        </div>

        {/* Active State: Links Grid */}
        <div className="absolute inset-0 grid grid-cols-2 p-1 gap-1 bg-slate-900/95 backdrop-blur-sm [backface-visibility:hidden] [transform:rotateY(180deg)]">
          {[
            { label: 'GITHUB', Icon: Icons.Github, href: '#', bg: 'hover:bg-slate-800' },
            { label: 'TWITTER', Icon: Icons.Twitter, href: '#', bg: 'hover:bg-slate-800' },
            { label: 'LINKEDIN', Icon: Icons.LinkedIn, href: '#', bg: 'hover:bg-slate-800' },
            { label: 'MATRIX', Icon: Icons.Matrix, href: '#', bg: 'hover:bg-slate-800' },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`
                    flex flex-col items-center justify-center border border-slate-800/50
                    text-slate-400 transition-all duration-300 group/link ${link.bg} hover:scale-105 cursor-none
                  `}
              onClick={(e) => e.stopPropagation()}
              onMouseEnter={(e) => { e.stopPropagation(); setCursorVariant('button'); }}
              onMouseLeave={(e) => { e.stopPropagation(); setCursorVariant('default'); }}
            >
              <div className="mb-2 text-slate-600 group-hover/link:text-emerald-400 transition-colors transform group-hover/link:scale-110 duration-300">
                <link.Icon />
              </div>
              <span className="text-[10px] tracking-widest font-bold group-hover/link:text-white transition-colors">
                {link.label}
              </span>
            </a>
          ))}
        </div>

        {/* Scanning Line Animation */}
        <div className={`
            absolute top-0 left-0 w-full h-[2px] bg-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.5)]
            transition-all duration-1000 ease-in-out z-20 pointer-events-none
            ${isOpen ? 'top-[100%] opacity-0' : 'top-0 opacity-0'}
          `} style={{ opacity: isOpen ? 0.5 : 0 }} />

      </div>

      {/* CSS Animation for Idle Float */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        /* Apply float animation only when not hovering */
        .group:not(:hover) {
           animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default IdCard;