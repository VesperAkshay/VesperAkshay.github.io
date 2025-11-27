import React, { useState, useEffect, useRef } from 'react';

const logs = [
    "INITIALIZING KERNEL...",
    "BYPASSING SECURITY PROTOCOLS...",
    "ESTABLISHING NEURAL LINK...",
    "DECRYPTING BIOMETRIC DATA...",
    "OPTIMIZING SYNAPTIC PATHWAYS...",
    "LOADING AGENTIC MODULES [v2.4.0]...",
    "SYNCHRONIZING WITH CLOUD NODES...",
    "ACCESS GRANTED: WELCOME USER.",
    "SYSTEM REBOOT INITIATED..."
];

const Logos = {
    Gemini: () => (
        <img src="https://img.icons8.com/color/48/gemini-ai.png" alt="Gemini" className="w-full h-full object-contain" />
    ),
    OpenAI: () => (
        <img src="https://img.icons8.com/ios-glyphs/50/chatgpt.png" alt="OpenAI" className="w-full h-full object-contain invert" />
    ),
    Anthropic: () => (
        <img src="https://img.icons8.com/ios-filled/50/claude.png" alt="Anthropic" className="w-full h-full object-contain invert" />
    ),
    Grok: () => (
        <img src="https://img.icons8.com/color/48/grok--v2.png" alt="Grok" className="w-full h-full object-contain" />
    )
};

// 3D Rotating Core Component
const AgentCore: React.FC = () => {
    return (
        <div className="relative w-64 h-64 flex items-center justify-center perspective-1000">
            <div className="relative w-32 h-32 transform-style-3d animate-rotate-3d">
                {/* Core Cube / Tesseract Simulation */}
                <div className="absolute inset-0 border border-slate-400/30 bg-slate-800/20 translate-z-16 backdrop-blur-sm"></div>
                <div className="absolute inset-0 border border-slate-400/30 bg-slate-800/20 -translate-z-16 backdrop-blur-sm"></div>
                <div className="absolute inset-0 border border-slate-400/30 bg-slate-800/20 rotate-y-90 translate-z-16 backdrop-blur-sm"></div>
                <div className="absolute inset-0 border border-slate-400/30 bg-slate-800/20 rotate-y-90 -translate-z-16 backdrop-blur-sm"></div>
                <div className="absolute inset-0 border border-slate-400/30 bg-slate-800/20 rotate-x-90 translate-z-16 backdrop-blur-sm"></div>
                <div className="absolute inset-0 border border-slate-400/30 bg-slate-800/20 rotate-x-90 -translate-z-16 backdrop-blur-sm"></div>

                {/* Inner Glowing Core */}
                <div className="absolute top-1/2 left-1/2 w-12 h-12 -mt-6 -ml-6 bg-white rounded-full shadow-[0_0_50px_rgba(255,255,255,0.8)] animate-pulse"></div>
            </div>

            {/* Orbiting Agent Nodes */}
            <div className="absolute inset-0 animate-spin-slow">
                {/* Node 1: Gemini */}
                <div className="absolute top-0 left-1/2 w-12 h-12 -ml-6 -mt-6 bg-slate-900 border border-slate-600 rounded-full p-2 shadow-[0_0_20px_rgba(255,255,255,0.2)] flex items-center justify-center transform hover:scale-110 transition-transform">
                    <div className="text-white w-full h-full"><Logos.Gemini /></div>
                </div>

                {/* Node 2: OpenAI */}
                <div className="absolute bottom-0 left-1/2 w-12 h-12 -ml-6 -mb-6 bg-slate-900 border border-slate-600 rounded-full p-2 shadow-[0_0_20px_rgba(255,255,255,0.2)] flex items-center justify-center transform hover:scale-110 transition-transform">
                    <div className="text-white w-full h-full"><Logos.OpenAI /></div>
                </div>

                {/* Node 3: Anthropic */}
                <div className="absolute left-0 top-1/2 w-12 h-12 -ml-6 -mt-6 bg-slate-900 border border-slate-600 rounded-full p-2 shadow-[0_0_20px_rgba(255,255,255,0.2)] flex items-center justify-center transform hover:scale-110 transition-transform">
                    <div className="text-white w-full h-full"><Logos.Anthropic /></div>
                </div>

                {/* Node 4: Grok */}
                <div className="absolute right-0 top-1/2 w-12 h-12 -mr-6 -mt-6 bg-slate-900 border border-slate-600 rounded-full p-2 shadow-[0_0_20px_rgba(255,255,255,0.2)] flex items-center justify-center transform hover:scale-110 transition-transform">
                    <div className="text-white w-full h-full"><Logos.Grok /></div>
                </div>

                {/* Connecting Lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none -z-10">
                    <line x1="50%" y1="50%" x2="50%" y2="0%" stroke="rgba(148, 163, 184, 0.3)" strokeWidth="1" strokeDasharray="5,5" />
                    <line x1="50%" y1="50%" x2="50%" y2="100%" stroke="rgba(148, 163, 184, 0.3)" strokeWidth="1" strokeDasharray="5,5" />
                    <line x1="50%" y1="50%" x2="0%" y2="50%" stroke="rgba(148, 163, 184, 0.3)" strokeWidth="1" strokeDasharray="5,5" />
                    <line x1="50%" y1="50%" x2="100%" y2="50%" stroke="rgba(148, 163, 184, 0.3)" strokeWidth="1" strokeDasharray="5,5" />
                </svg>
            </div>
        </div>
    );
};

const MatrixBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const chars = '01';
        const fontSize = 14;
        const columns = canvas.width / fontSize;
        const rainDrops: number[] = Array(Math.ceil(columns)).fill(1);

        const draw = () => {
            ctx.fillStyle = 'rgba(15, 23, 42, 0.1)'; // Slate-900 with opacity
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#94a3b8'; // Slate-400 text
            ctx.font = fontSize + 'px monospace';

            for (let i = 0; i < rainDrops.length; i++) {
                const text = chars.charAt(Math.floor(Math.random() * chars.length));
                ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

                if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    rainDrops[i] = 0;
                }
                rainDrops[i]++;
            }
        };

        const interval = setInterval(draw, 40);
        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', handleResize);
        return () => {
            clearInterval(interval);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-20" />;
};

const InitializationSequence: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    const [lines, setLines] = useState<string[]>([]);
    const [progress, setProgress] = useState(0);
    const [isShuttingDown, setIsShuttingDown] = useState(false);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = 'unset'; };
    }, []);

    useEffect(() => {
        let currentIndex = 0;
        const totalDuration = 2500;
        const stepDuration = totalDuration / logs.length;

        const interval = setInterval(() => {
            if (currentIndex < logs.length) {
                setLines(prev => {
                    const newLines = [...prev, logs[currentIndex]];
                    if (newLines.length > 5) return newLines.slice(1);
                    return newLines;
                });
                setProgress(((currentIndex + 1) / logs.length) * 100);
                currentIndex++;
            } else {
                clearInterval(interval);
                setIsShuttingDown(true);
                setTimeout(onComplete, 500);
            }
        }, stepDuration);

        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <div className="fixed inset-0 z-[9999] bg-slate-950 flex flex-col items-center justify-center font-mono text-slate-200 overflow-hidden perspective-1000">

            <div className={`relative w-full h-full flex flex-col items-center justify-center ${isShuttingDown ? 'animate-crt-off' : ''}`}>
                <MatrixBackground />
                <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle,transparent_30%,#020617_90%)] z-[2]"></div>

                <div className="w-full max-w-4xl relative z-10 p-8 flex flex-col items-center gap-16">

                    {/* 3D Agent Core Visualization */}
                    <div className="scale-125 mb-8">
                        <AgentCore />
                    </div>

                    {/* Progress & Status */}
                    <div className="w-full max-w-lg space-y-2">
                        <div className="flex justify-between text-xs text-slate-400 font-bold tracking-widest uppercase">
                            <span className="animate-pulse text-emerald-500">Neural_Uplink_Active</span>
                            <span>{Math.round(progress)}%</span>
                        </div>
                        <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                            <div
                                className="h-full bg-white transition-all duration-100 ease-linear shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>

                    {/* Dynamic Typing Terminal */}
                    <div className="w-full max-w-lg h-32 flex flex-col justify-end items-center text-center">
                        {lines.map((line, index) => (
                            <div key={index} className="text-slate-300 font-bold text-sm md:text-lg tracking-wider animate-typewriter drop-shadow-md">
                                {line}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style>{`
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .translate-z-16 { transform: translateZ(64px); }
        .-translate-z-16 { transform: translateZ(-64px); }
        .rotate-y-90 { transform: rotateY(90deg); }
        .rotate-x-90 { transform: rotateX(90deg); }
        
        @keyframes rotate-3d {
            0% { transform: rotateX(0deg) rotateY(0deg); }
            100% { transform: rotateX(360deg) rotateY(360deg); }
        }
        .animate-rotate-3d {
            animation: rotate-3d 12s linear infinite;
        }
        
        @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
            animation: spin-slow 10s linear infinite;
        }

        @keyframes crt-off {
          0% { opacity: 1; transform: scale(1); filter: brightness(1); }
          40% { opacity: 1; transform: scale(1, 0.002); filter: brightness(5); }
          100% { opacity: 0; transform: scale(0, 0); filter: brightness(0); }
        }
        .animate-crt-off {
          animation: crt-off 0.8s cubic-bezier(0.23, 1, 0.32, 1) forwards;
        }

        @keyframes typewriter {
            from { opacity: 0; transform: translateY(5px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-typewriter {
            animation: typewriter 0.1s ease-out forwards;
        }
      `}</style>
        </div>
    );
};

export default InitializationSequence;
