import React, { useState, useEffect } from 'react';
import { useCursor } from '../context/CursorContext';

const Icons = {
  Github: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  ),
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
  Mail: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
  ),
  HuggingFace: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
      <path d="M2 10.667V16c0 2.946 2.387 5.333 5.333 5.333h9.334c2.946 0 5.333-2.387 5.333-5.333v-5.333l-2.667-1.334V8c0-2.946-2.387-5.333-5.333-5.333h-4C7.053 2.667 4.667 5.054 4.667 8v1.333L2 10.667zm14.667 2.666c.736 0 1.333.597 1.333 1.334 0 .736-.597 1.333-1.333 1.333-.736 0-1.333-.597-1.333-1.333 0-.737.597-1.334 1.333-1.334zm-9.334 0c.736 0 1.333.597 1.333 1.334 0 .736-.597 1.333-1.333 1.333-.736 0-1.333-.597-1.333-1.333 0-.737.597-1.334 1.333-1.334z" />
    </svg>
  ),
  Discord: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  )
};

const IdCard: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const { setCursorVariant } = useCursor();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

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
              src="/profile.png"
              alt="Profile"
              className="w-full h-full object-cover contrast-125"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
          </div>

          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold tracking-tighter text-white drop-shadow-lg">Akshay Patel</h3>
            <div className="h-px w-12 bg-slate-700 mx-auto" />
            <p className="text-xs text-slate-400 tracking-widest uppercase">Software Engineer</p>
          </div>

          <div className="mt-8 text-[10px] text-slate-600 tracking-[0.2em] animate-pulse">
            [ CLICK TO DECRYPT ]
          </div>
        </div>

        {/* Active State: Links Grid */}
        <div className="absolute inset-0 grid grid-cols-2 p-1 gap-1 bg-slate-900/95 backdrop-blur-sm [backface-visibility:hidden] [transform:rotateY(180deg)]">
          {[
            { label: 'GITHUB', Icon: Icons.Github, href: 'https://github.com/VesperAkshay', bg: 'hover:bg-slate-800' },
            { label: 'TWITTER', Icon: Icons.Twitter, href: 'https://x.com/Akshaypatell_', bg: 'hover:bg-slate-800' },
            { label: 'LINKEDIN', Icon: Icons.LinkedIn, href: 'https://www.linkedin.com/in/patelakshay1503', bg: 'hover:bg-slate-800' },
            { label: 'EMAIL', Icon: Icons.Mail, href: 'mailto:contact@example.com', bg: 'hover:bg-slate-800' },
            { label: 'HUGGINGFACE', Icon: Icons.HuggingFace, href: '#', bg: 'hover:bg-slate-800' },
            { label: 'DISCORD', Icon: Icons.Discord, href: '#', bg: 'hover:bg-slate-800' },
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