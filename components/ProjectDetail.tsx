import React, { useEffect, useState } from 'react';
import { Project } from '../types';

interface ProjectDetailProps {
  project: Project;
  onClose: () => void;
}

// Optimized Icons for Visibility
const Icons = {
  Github: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  ),
  Globe: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  Book: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  ),
  ArrowUpRight: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  ),
  Close: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
};

const AccessCard: React.FC<{ 
  title: string; 
  subtitle: string; 
  icon: React.ReactNode; 
  href: string;
  delay: number;
  variant?: 'default' | 'primary';
}> = ({ title, subtitle, icon, href, delay, variant = 'default' }) => {
  return (
    <a 
      href={href}
      target="_blank" 
      rel="noopener noreferrer"
      className={`
        group relative p-6 border transition-all duration-500 opacity-0 animate-fade-in-up hover:-translate-y-2
        ${variant === 'primary' 
           ? 'bg-emerald-500/10 border-emerald-500/50 hover:bg-emerald-500/20' 
           : 'bg-slate-800/40 border-slate-700 hover:border-emerald-500/30 hover:bg-slate-800/60'}
      `}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      <div className="flex justify-between items-start mb-6 relative z-10">
        <div className={`p-3 rounded-lg transition-transform duration-300 group-hover:scale-110 ${variant === 'primary' ? 'bg-emerald-500 text-slate-900' : 'bg-slate-700 text-slate-200 group-hover:bg-emerald-500 group-hover:text-slate-900'}`}>
          {icon}
        </div>
        <div className="text-slate-500 group-hover:text-white transition-colors duration-300 transform group-hover:rotate-45">
          <Icons.ArrowUpRight />
        </div>
      </div>
      
      <div className="relative z-10">
        <h4 className="text-white font-bold tracking-tight mb-1 group-hover:text-emerald-400 transition-colors">{title}</h4>
        <p className="text-xs text-slate-400 uppercase tracking-wider font-mono">{subtitle}</p>
      </div>
    </a>
  );
};

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 400);
  };

  return (
    <div className={`fixed inset-0 z-[100] flex justify-center items-center transition-all duration-500 ${isVisible ? 'bg-slate-950/95 backdrop-blur-sm' : 'bg-transparent pointer-events-none'}`}>
      
      {/* Container */}
      <div className={`
        relative w-full h-full md:max-w-7xl md:h-[90vh] bg-slate-900 md:border border-slate-700 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col
        transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
        ${isVisible ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-12'}
      `}>
        
        {/* Header Bar */}
        <div className="flex justify-between items-center p-6 border-b border-slate-800 bg-slate-900/80 backdrop-blur z-20">
          <div className="flex items-center gap-4">
             <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/50 animate-pulse" />
             </div>
            <span className="font-mono text-xs text-emerald-500 tracking-[0.2em] uppercase pl-4 border-l border-slate-800">
              Target: {project.id} // {project.category}
            </span>
          </div>
          <button 
            onClick={handleClose}
            className="group flex items-center gap-3 text-slate-400 hover:text-white transition-colors"
          >
            <span className="text-xs font-mono uppercase tracking-widest hidden sm:block group-hover:text-red-400 transition-colors">Abort Sequence</span>
            <div className="p-2 border border-slate-700 group-hover:border-red-500 rounded-full transition-all duration-300 group-hover:rotate-90 group-hover:bg-red-500/10">
              <Icons.Close />
            </div>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar bg-slate-950">
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-full">
            
            {/* Left Column: Visuals */}
            <div className="lg:col-span-7 bg-slate-900 relative min-h-[40vh] lg:min-h-auto overflow-hidden group">
               <div className="absolute inset-0 bg-slate-900 z-0" />
               <img 
                 src={project.image} 
                 alt={project.title}
                 className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-1000 scale-105 group-hover:scale-100"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent lg:bg-gradient-to-r" />
               
               {/* Overlay Text */}
               <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full z-10">
                 <div className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                    <span className="inline-block px-3 py-1 mb-6 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono tracking-widest uppercase rounded">
                        {project.role}
                    </span>
                 </div>
                 <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-4 drop-shadow-2xl animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                    {project.title}
                 </h1>
               </div>
            </div>

            {/* Right Column: Details */}
            <div className="lg:col-span-5 p-8 md:p-12 flex flex-col gap-12 bg-slate-950 relative border-l border-slate-900">
               
               {/* Description */}
               <div className="space-y-6 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                 <h3 className="text-xs font-bold text-slate-500 tracking-[0.2em] uppercase flex items-center gap-3">
                    <span className="w-6 h-px bg-emerald-500" /> Mission Brief
                 </h3>
                 <p className="text-slate-300 leading-relaxed text-lg font-light">
                   {project.fullDescription}
                 </p>
               </div>

               {/* Tech Stack */}
               <div className="animate-fade-in-up" style={{ animationDelay: '500ms' }}>
                  <h3 className="text-xs font-bold text-slate-500 tracking-[0.2em] uppercase mb-6 flex items-center gap-3">
                    <span className="w-6 h-px bg-emerald-500" /> System Architecture
                 </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech, i) => (
                      <span 
                        key={tech} 
                        className="px-3 py-1.5 bg-slate-900 border border-slate-800 text-xs font-mono text-emerald-400/80 uppercase tracking-wider hover:border-emerald-500/50 transition-colors cursor-default"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
               </div>

               {/* Access Cards */}
               <div className="animate-fade-in-up" style={{ animationDelay: '600ms' }}>
                  <h3 className="text-xs font-bold text-slate-500 tracking-[0.2em] uppercase mb-6 flex items-center gap-3">
                    <span className="w-6 h-px bg-emerald-500" /> Access Points
                 </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     <AccessCard 
                       title="Live Link" 
                       subtitle="Deployment" 
                       icon={<Icons.Globe />} 
                       href={project.links.demo}
                       delay={700}
                       variant="primary"
                     />
                     <AccessCard 
                       title="Source Code" 
                       subtitle="Repository" 
                       icon={<Icons.Github />} 
                       href={project.links.github}
                       delay={800}
                     />
                     <AccessCard 
                       title="Documentation" 
                       subtitle="Manual" 
                       icon={<Icons.Book />} 
                       href={project.links.docs}
                       delay={900}
                     />
                  </div>
               </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;