import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-white py-12 px-6 border-t border-slate-900 font-mono relative overflow-hidden">
      {/* Background Matrix-like faint effect */}
      <div className="absolute inset-0 opacity-5 pointer-events-none flex justify-between">
         {[...Array(20)].map((_, i) => (
             <div key={i} className="h-full w-px bg-gradient-to-b from-transparent via-slate-500 to-transparent" style={{ left: `${i * 5}%` }} />
         ))}
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center relative z-10">
        <div className="mb-6 md:mb-0 text-center md:text-left">
           <div className="text-xl font-bold tracking-tighter uppercase mb-2">AGENT.OSS</div>
           <p className="text-xs text-slate-500">Autonomous Systems Division</p>
        </div>

        <div className="flex gap-4 text-xs text-slate-600 tracking-widest uppercase">
            <span>Server Time: {new Date().toLocaleTimeString('en-US', { hour12: false })}</span>
            <span>|</span>
            <span>Status: Online</span>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-slate-900 flex justify-center md:justify-end">
         <p className="text-[10px] text-slate-700">
            © {new Date().getFullYear()} Agentic Works. All protocols secure.
         </p>
      </div>
    </footer>
  );
};

export default Footer;