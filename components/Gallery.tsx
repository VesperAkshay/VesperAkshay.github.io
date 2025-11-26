import React, { useEffect, useRef, useState } from 'react';
import { Project } from '../types';
import ProjectDetail from './ProjectDetail';
import { useCursor } from '../context/CursorContext';

// Enhanced Project Data with Categories
const projects: Project[] = [
  {
    id: '01',
    title: 'CODE ARCHITECT',
    role: 'Autonomous Refactoring Agent',
    category: 'SYSTEMS',
    description: 'A self-healing infrastructure agent that monitors codebases in real-time.',
    fullDescription: 'The Code Architect is designed to autonomously maintain high-scale distributed systems. By parsing abstract syntax trees (AST) and analyzing runtime performance metrics, it identifies bottlenecks and anti-patterns. It actively proposes PRs for refactoring, manages dependency updates, and ensures style compliance without human intervention.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop',
    logs: [
      '> Initializing repository scan...',
      '> Analyzing dependency graph...',
      '> Detected circular dependency in module: auth_service',
      '> Generating refactoring strategy...',
      '> Optimization complete. Efficiency +14%'
    ],
    techStack: ['TypeScript', 'Rust', 'Neo4j', 'Docker'],
    links: {
      demo: 'https://github.com',
      github: 'https://github.com',
      docs: 'https://github.com'
    }
  },
  {
    id: '02',
    title: 'NEURAL VISION',
    role: 'Real-time Anomaly Detection',
    category: 'VISION',
    description: 'Computer vision pipeline designed for high-security facilities.',
    fullDescription: 'Neural Vision leverages edge-deployed transformer models to process video feeds in real-time. It distinguishes between authorized personnel and unauthorized entities, tracking movement patterns to predict security breaches before they occur. The system operates fully offline for maximum privacy and reliability.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop',
    logs: [
      '> Video stream connected: CAM_04',
      '> Segmenting frame data...',
      '> Object identified: Personnel [ID: 8842]',
      '> Behavioral analysis: Normal',
      '> Latency: 12ms | Confidence: 99.8%'
    ],
    techStack: ['Python', 'PyTorch', 'CUDA', 'OpenCV'],
    links: {
      demo: 'https://github.com',
      github: 'https://github.com',
      docs: 'https://github.com'
    }
  },
  {
    id: '03',
    title: 'DATA SYNTH',
    role: 'Generative Dataset Engine',
    category: 'GENERATIVE',
    description: 'Solves the data scarcity problem by generating high-fidelity synthetic datasets.',
    fullDescription: 'Data Synth uses Generative Adversarial Networks (GANs) to create vast, statistically accurate datasets for training AI models. It solves the cold-start problem and GDPR constraints by generating fictional data points that mirror real-world distributions, enabling safe and scalable model training.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop',
    logs: [
      '> Ingesting source schema...',
      '> Modeling statistical distribution...',
      '> Generating 1M records...',
      '> Validating privacy constraints...',
      '> Dataset synthesis complete. Exporting...'
    ],
    techStack: ['Python', 'TensorFlow', 'FastAPI', 'Pandas'],
    links: {
      demo: 'https://github.com',
      github: 'https://github.com',
      docs: 'https://github.com'
    }
  }
];

// --- Sub-components ---

const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[100] bg-slate-950 flex flex-col items-center justify-center font-mono text-emerald-500">
      <div className="w-64 relative">
        <div className="h-1 w-full bg-slate-800 rounded overflow-hidden">
          <div className="h-full bg-emerald-500 animate-[progress_2s_ease-in-out_forwards]" />
        </div>
        <div className="mt-4 flex justify-between text-xs tracking-widest uppercase">
          <span className="animate-pulse">Decrypting...</span>
          <span>100%</span>
        </div>
      </div>

      <div className="mt-8 space-y-1 text-xs text-center opacity-70">
        <p className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>Handshake established.</p>
        <p className="animate-fade-in-up" style={{ animationDelay: '300ms' }}>Verifying credentials...</p>
        <p className="animate-fade-in-up" style={{ animationDelay: '600ms' }}>Access granted.</p>
      </div>

      <style>{`
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
};

const LogicScreen: React.FC<{ logs: string[]; isActive: boolean }> = ({ logs, isActive }) => {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);

  useEffect(() => {
    if (!isActive) {
      setDisplayedLines([]);
      setCurrentLineIndex(0);
      return;
    }

    if (currentLineIndex < logs.length) {
      const timeout = setTimeout(() => {
        setDisplayedLines(prev => [...prev, logs[currentLineIndex]]);
        setCurrentLineIndex(prev => prev + 1);
      }, 800);
      return () => clearTimeout(timeout);
    }
  }, [isActive, currentLineIndex, logs]);

  return (
    <div className="w-full h-full bg-black/90 border border-slate-700 p-6 font-mono text-xs md:text-sm shadow-2xl relative overflow-hidden flex flex-col">
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-slate-700" />

      <div className="flex justify-between items-center mb-4 text-slate-500 border-b border-slate-800 pb-2">
        <span className="uppercase tracking-widest">Sys.Log // Monitor</span>
        <div className="flex gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500/20" />
          <div className="w-2 h-2 rounded-full bg-yellow-500/20" />
          <div className={`w-2 h-2 rounded-full bg-emerald-500 ${isActive ? 'animate-pulse' : ''}`} />
        </div>
      </div>

      <div className="flex-1 space-y-2 text-emerald-500/90 overflow-hidden font-bold">
        {displayedLines.map((line, i) => (
          <div key={i} className="animate-fade-in-up">
            <span className="opacity-50 mr-2">[{new Date().toLocaleTimeString()}]</span>
            {line}
          </div>
        ))}
        {isActive && currentLineIndex < logs.length && (
          <div className="animate-pulse">_</div>
        )}
        {isActive && currentLineIndex >= logs.length && (
          <div className="text-slate-500 mt-4 border-t border-slate-800 pt-2">&gt;&gt; PROCESS TERMINATED. STANDBY.</div>
        )}
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 pointer-events-none bg-[length:100%_4px,3px_100%]" />
    </div>
  );
};

const ProjectSection: React.FC<{ project: Project; index: number; onClick: (p: Project) => void }> = ({ project, index, onClick }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { setCursorVariant } = useCursor();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const isEven = index % 2 === 0;

  return (
    <div
      ref={sectionRef}
      onClick={() => onClick(project)}
      onMouseEnter={() => setCursorVariant('button')}
      onMouseLeave={() => setCursorVariant('default')}
      className={`min-h-[80vh] flex items-center justify-center py-24 relative transition-all duration-1000 group cursor-none border-b border-slate-800/50 hover:bg-slate-800/20`}
    >
      <div className={`max-w-7xl w-full mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'} transition-all duration-1000`}>

        {/* Text Column */}
        <div className={`order-2 ${isEven ? 'lg:order-1' : 'lg:order-2'} space-y-8`}>
          <div className="flex items-center gap-4 text-emerald-500 font-mono text-sm tracking-widest uppercase">
            <span className="text-2xl font-bold">{project.id}</span>
            <div className="h-px bg-emerald-500/50 flex-1" />
            <span>{project.category}</span>
          </div>

          <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white font-mono group-hover:text-emerald-400 transition-colors duration-300">
            {project.title}
          </h2>

          <p className="text-lg text-slate-400 leading-relaxed font-sans max-w-md">
            {project.description}
          </p>

          <div className="text-xs font-mono text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 uppercase tracking-widest flex items-center gap-2">
            <span>[ Click to Initialize ]</span>
            <span className="w-4 h-4 border-t border-r border-emerald-500 block animate-pulse" />
          </div>

          <div className="pt-8">
            <div className="w-full h-64 md:h-80 relative transform group-hover:scale-[1.02] transition-transform duration-500">
              <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-slate-600 transition-all group-hover:border-emerald-500 group-hover:-top-2 group-hover:-left-2" />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-slate-600 transition-all group-hover:border-emerald-500 group-hover:-bottom-2 group-hover:-right-2" />
              <LogicScreen logs={project.logs} isActive={isVisible} />
            </div>
          </div>
        </div>

        {/* Visual Column */}
        <div className={`order-1 ${isEven ? 'lg:order-2' : 'lg:order-1'} relative`}>
          <div className="relative aspect-square md:aspect-[4/3] w-full overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-slate-900/30 mix-blend-multiply transition-opacity group-hover:opacity-0" />

            <div className="absolute top-4 right-4 bg-black/50 backdrop-blur px-3 py-1 border border-white/10 text-xs font-mono text-white group-hover:bg-emerald-500/80 transition-colors">
              STATUS: ACTIVE
            </div>
          </div>

          <div className="absolute -z-10 top-10 -right-10 w-full h-full border border-slate-800 transition-all duration-500 group-hover:translate-x-4 group-hover:-translate-y-4 group-hover:border-emerald-500/30" />
        </div>

      </div>
    </div>
  );
};

const Gallery: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState('ALL');
  const { setCursorVariant } = useCursor();

  const categories = ['ALL', 'SYSTEMS', 'VISION', 'GENERATIVE'];

  const handleProjectClick = (project: Project) => {
    setIsLoading(true);
    // Simulate loading delay
    setTimeout(() => {
      setIsLoading(false);
      setSelectedProject(project);
    }, 1800);
  };

  const filteredProjects = projects.filter(p =>
    filter === 'ALL' || p.category === filter
  );

  return (
    <>
      <section id="agents" className="bg-slate-900 border-t border-slate-800 min-h-screen">
        {/* Filter Bar */}
        <div className="relative z-40 bg-slate-900 py-6 border-b border-slate-800/50">
          <div className="flex flex-wrap justify-center gap-2 md:gap-8 max-w-7xl mx-auto px-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                onMouseEnter={() => setCursorVariant('button')}
                onMouseLeave={() => setCursorVariant('default')}
                className={`
                      text-xs md:text-sm font-mono tracking-widest uppercase px-4 py-2 border transition-all duration-300 hover:scale-105 cursor-none
                      ${filter === cat
                    ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
                    : 'border-transparent text-slate-500 hover:text-slate-300 hover:border-slate-700'}
                    `}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Filtered List */}
        <div className="min-h-[50vh]">
          {filteredProjects.map((project, index) => (
            <ProjectSection
              key={project.id}
              project={project}
              index={index}
              onClick={handleProjectClick}
            />
          ))}
          {filteredProjects.length === 0 && (
            <div className="py-32 text-center text-slate-600 font-mono text-sm uppercase tracking-widest">
              No Agents Found in Sector
            </div>
          )}
        </div>
      </section>

      {/* Overlays */}
      {isLoading && <LoadingScreen />}
      {selectedProject && (
        <ProjectDetail
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  );
};

export default Gallery;