import React, { useState, useEffect, useRef } from 'react';
import { useCursor } from '../context/CursorContext';
import {
    Atom,
    Database,
    Cloud,
    Server,
    Box,
    Wind,
    Flame,
    Cpu,
    Link,
    Bot,
    Terminal,
    Braces,
    Container,
    Circle
} from 'lucide-react';

const Icons: Record<string, React.FC<any>> = {
    Python: Terminal,
    PyTorch: Flame,
    TensorFlow: Cpu,
    LangChain: Link,
    OpenAI: Bot,
    React: Atom,
    TypeScript: Braces,
    Tailwind: Wind,
    ThreeJS: Box,
    Node: Server,
    PostgreSQL: Database,
    Docker: Container,
    AWS: Cloud,
    Generic: Circle
};

interface TechNode {
    id: string;
    name: string;
    category: 'NEURAL' | 'INTERFACE' | 'CORE';
    x: number;
    y: number;
    vx: number;
    vy: number;
    iconKey?: string;
}

const initialNodes: TechNode[] = [
    { id: '1', name: 'Python', category: 'NEURAL', x: 20, y: 20, vx: 0.5, vy: 0.5, iconKey: 'Python' },
    { id: '2', name: 'PyTorch', category: 'NEURAL', x: 30, y: 40, vx: -0.5, vy: 0.3, iconKey: 'PyTorch' },
    { id: '3', name: 'TensorFlow', category: 'NEURAL', x: 70, y: 30, vx: 0.2, vy: -0.4, iconKey: 'TensorFlow' },
    { id: '4', name: 'LangChain', category: 'NEURAL', x: 50, y: 50, vx: -0.3, vy: -0.3, iconKey: 'LangChain' },
    { id: '5', name: 'OpenAI', category: 'NEURAL', x: 80, y: 60, vx: 0.4, vy: 0.2, iconKey: 'OpenAI' },

    { id: '6', name: 'React', category: 'INTERFACE', x: 25, y: 70, vx: 0.3, vy: -0.2, iconKey: 'React' },
    { id: '7', name: 'TypeScript', category: 'INTERFACE', x: 40, y: 80, vx: -0.2, vy: 0.4, iconKey: 'TypeScript' },
    { id: '8', name: 'Tailwind', category: 'INTERFACE', x: 60, y: 75, vx: 0.5, vy: 0.1, iconKey: 'Tailwind' },
    { id: '9', name: 'Three.js', category: 'INTERFACE', x: 15, y: 50, vx: -0.4, vy: -0.5, iconKey: 'ThreeJS' },

    { id: '10', name: 'Node.js', category: 'CORE', x: 85, y: 20, vx: -0.2, vy: 0.3, iconKey: 'Node' },
    { id: '11', name: 'PostgreSQL', category: 'CORE', x: 75, y: 80, vx: 0.3, vy: -0.3, iconKey: 'PostgreSQL' },
    { id: '12', name: 'Docker', category: 'CORE', x: 55, y: 25, vx: -0.1, vy: 0.5, iconKey: 'Docker' },
    { id: '13', name: 'AWS', category: 'CORE', x: 90, y: 50, vx: 0.2, vy: -0.2, iconKey: 'AWS' },
];

const Stack: React.FC = () => {
    const { setCursorVariant } = useCursor();
    const [nodes, setNodes] = useState<TechNode[]>(initialNodes);
    const containerRef = useRef<HTMLDivElement>(null);
    const requestRef = useRef<number>();

    const updatePositions = () => {
        setNodes(prevNodes => prevNodes.map(node => {
            let newX = node.x + node.vx * 0.1;
            let newY = node.y + node.vy * 0.1;

            // Bounce off walls
            if (newX <= 5 || newX >= 95) node.vx *= -1;
            if (newY <= 5 || newY >= 95) node.vy *= -1;

            return { ...node, x: newX, y: newY };
        }));
        requestRef.current = requestAnimationFrame(updatePositions);
    };

    useEffect(() => {
        requestRef.current = requestAnimationFrame(updatePositions);
        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, []);

    const getCategoryColor = (cat: string) => {
        switch (cat) {
            case 'NEURAL': return 'bg-rose-500 shadow-rose-500/50';
            case 'INTERFACE': return 'bg-emerald-500 shadow-emerald-500/50';
            case 'CORE': return 'bg-blue-500 shadow-blue-500/50';
            default: return 'bg-white';
        }
    };

    return (
        <section id="stack" className="min-h-screen bg-slate-950 relative overflow-hidden flex flex-col items-center justify-center py-24">

            {/* Background Grid & Ambience */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.05),transparent_70%)] pointer-events-none" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] pointer-events-none bg-[length:100%_4px,3px_100%]" />

            <div className="relative z-10 text-center mb-12 pointer-events-none">
                <h2 className="text-sm font-bold tracking-[0.3em] text-emerald-500 mb-4 uppercase">
          // Neural Network
                </h2>
                <h3 className="text-4xl md:text-6xl font-black text-white tracking-tighter font-mono">
                    SYSTEM <span className="text-slate-700">NODES</span>
                </h3>
            </div>

            <div ref={containerRef} className="relative w-full max-w-6xl h-[60vh] border border-slate-800/50 rounded-xl bg-slate-900/30 backdrop-blur-sm overflow-hidden mx-6">

                {/* Connections (SVG Lines) */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    {nodes.map((node, i) => (
                        nodes.slice(i + 1).map((otherNode) => {
                            const dist = Math.hypot(node.x - otherNode.x, node.y - otherNode.y);
                            if (dist < 25) { // Only connect close nodes
                                return (
                                    <line
                                        key={`${node.id}-${otherNode.id}`}
                                        x1={`${node.x}%`}
                                        y1={`${node.y}%`}
                                        x2={`${otherNode.x}%`}
                                        y2={`${otherNode.y}%`}
                                        stroke="rgba(148, 163, 184, 0.1)"
                                        strokeWidth="1"
                                    />
                                );
                            }
                            return null;
                        })
                    ))}
                </svg>

                {/* Floating Nodes */}
                {nodes.map((node) => (
                    <div
                        key={node.id}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                        style={{ left: `${node.x}%`, top: `${node.y}%` }}
                        onMouseEnter={() => setCursorVariant('button')}
                        onMouseLeave={() => setCursorVariant('default')}
                    >
                        <div className={`
              relative flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full 
              border border-white/10 bg-slate-900/90 backdrop-blur-md transition-all duration-500
              group-hover:scale-125 group-hover:border-white/30 z-10 shadow-xl
            `}>
                            {/* Glowing Core - Reduced opacity and blur */}
                            <div className={`absolute inset-0 rounded-full ${getCategoryColor(node.category)} opacity-10 group-hover:opacity-30 transition-opacity blur-md`} />

                            {/* Icon - Increased visibility */}
                            <div className="relative z-20 text-white group-hover:text-emerald-400 transition-colors duration-300">
                                {(() => {
                                    const Icon = Icons[node.iconKey || 'Generic'];
                                    return <Icon className="w-6 h-6 md:w-8 md:h-8" strokeWidth={1.5} />;
                                })()}
                            </div>

                            {/* Orbit Ring */}
                            <div className="absolute inset-0 border border-white/5 rounded-full animate-[spin_10s_linear_infinite] group-hover:border-white/20" />

                            {/* Label (Hidden by default, shown on hover) */}
                            <div className="absolute top-full mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none left-1/2 -translate-x-1/2">
                                <div className="bg-slate-900/90 border border-slate-700 px-3 py-1 rounded text-xs font-mono text-white whitespace-nowrap shadow-lg backdrop-blur-sm">
                                    {node.name}
                                    <span className="text-slate-500 ml-2 text-[10px]">{node.category}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

            </div>

            {/* Legend */}
            <div className="mt-12 flex gap-8 text-xs font-mono tracking-widest">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_10px] shadow-rose-500/50" />
                    <span className="text-slate-400">NEURAL</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px] shadow-emerald-500/50" />
                    <span className="text-slate-400">INTERFACE</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px] shadow-blue-500/50" />
                    <span className="text-slate-400">CORE</span>
                </div>
            </div>

        </section>
    );
};

export default Stack;
