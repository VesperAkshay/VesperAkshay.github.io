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
        <div className="relative w-80 h-80 flex items-center justify-center perspective-1000">
            {/* Central Workflow Engine (Gyroscope) */}
            <div className="relative w-40 h-40 transform-style-3d">
                {/* Inner Core (The 'Brain') */}
                <div className="absolute inset-0 m-auto w-12 h-12 bg-white rounded-full shadow-[0_0_40px_rgba(255,255,255,0.8)] animate-pulse z-20"></div>

                {/* Ring 1 - Vertical */}
                <div className="absolute inset-0 border-[3px] border-slate-500/30 rounded-full animate-spin-y transform-style-3d">
                    <div className="absolute top-0 left-1/2 w-3 h-3 -ml-1.5 -mt-1.5 bg-emerald-400 rounded-full shadow-[0_0_10px_#10b981]"></div>
                </div>

                {/* Ring 2 - Horizontal */}
                <div className="absolute inset-0 border-[3px] border-slate-500/30 rounded-full animate-spin-x transform-style-3d">
                    <div className="absolute left-0 top-1/2 w-3 h-3 -ml-1.5 -mt-1.5 bg-emerald-400 rounded-full shadow-[0_0_10px_#10b981]"></div>
                </div>

                {/* Ring 3 - Diagonal */}
                <div className="absolute inset-0 border-[3px] border-slate-500/30 rounded-full animate-spin-z transform-style-3d">
                    <div className="absolute bottom-0 left-1/2 w-3 h-3 -ml-1.5 -mb-1.5 bg-emerald-400 rounded-full shadow-[0_0_10px_#10b981]"></div>
                </div>
            </div>

            {/* Connected Agent Nodes */}
            <div className="absolute inset-0 animate-spin-slow">
                <svg className="absolute inset-0 w-full h-full pointer-events-none -z-10">
                    {/* Dashed lines connecting nodes to center */}
                    <line x1="50%" y1="50%" x2="50%" y2="5%" stroke="rgba(16, 185, 129, 0.3)" strokeWidth="2" strokeDasharray="4,4" />
                    <line x1="50%" y1="50%" x2="50%" y2="95%" stroke="rgba(16, 185, 129, 0.3)" strokeWidth="2" strokeDasharray="4,4" />
                    <line x1="50%" y1="50%" x2="5%" y2="50%" stroke="rgba(16, 185, 129, 0.3)" strokeWidth="2" strokeDasharray="4,4" />
                    <line x1="50%" y1="50%" x2="95%" y2="50%" stroke="rgba(16, 185, 129, 0.3)" strokeWidth="2" strokeDasharray="4,4" />

                    {/* Orbit ring */}
                    <circle cx="50%" cy="50%" r="45%" fill="none" stroke="rgba(148, 163, 184, 0.1)" strokeWidth="1" />
                </svg>

                {/* Nodes positioned at the ends of the lines */}
                {/* Top */}
                <div className="absolute top-[5%] left-1/2 w-14 h-14 -ml-7 -mt-7 bg-slate-900/90 border border-emerald-500/50 rounded-xl p-3 shadow-[0_0_20px_rgba(16,185,129,0.2)] flex items-center justify-center transform hover:scale-110 transition-transform backdrop-blur-md">
                    <div className="w-full h-full"><Logos.Gemini /></div>
                </div>
                {/* Bottom */}
                <div className="absolute bottom-[5%] left-1/2 w-14 h-14 -ml-7 -mb-7 bg-slate-900/90 border border-emerald-500/50 rounded-xl p-3 shadow-[0_0_20px_rgba(16,185,129,0.2)] flex items-center justify-center transform hover:scale-110 transition-transform backdrop-blur-md">
                    <div className="w-full h-full"><Logos.OpenAI /></div>
                </div>
                {/* Left */}
                <div className="absolute left-[5%] top-1/2 w-14 h-14 -ml-7 -mt-7 bg-slate-900/90 border border-emerald-500/50 rounded-xl p-3 shadow-[0_0_20px_rgba(16,185,129,0.2)] flex items-center justify-center transform hover:scale-110 transition-transform backdrop-blur-md">
                    <div className="w-full h-full"><Logos.Anthropic /></div>
                </div>
                {/* Right */}
                <div className="absolute right-[5%] top-1/2 w-14 h-14 -mr-7 -mt-7 bg-slate-900/90 border border-emerald-500/50 rounded-xl p-3 shadow-[0_0_20px_rgba(16,185,129,0.2)] flex items-center justify-center transform hover:scale-110 transition-transform backdrop-blur-md">
                    <div className="w-full h-full"><Logos.Grok /></div>
                </div>
            </div>
        </div>
    );
};

const StarBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const stars: { x: number; y: number; radius: number; speed: number; opacity: number }[] = [];
        const numStars = 200;

        for (let i = 0; i < numStars; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 1.5,
                speed: Math.random() * 0.2 + 0.05,
                opacity: Math.random() * 0.8 + 0.2
            });
        }

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            stars.forEach(star => {
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
                ctx.fill();

                star.y -= star.speed;
                if (star.y < 0) {
                    star.y = canvas.height;
                    star.x = Math.random() * canvas.width;
                }
            });

            requestAnimationFrame(draw);
        };

        const animationId = requestAnimationFrame(draw);

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-40" />;
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
                <StarBackground />
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
        
        @keyframes spin-x {
            0% { transform: rotateX(0deg); }
            100% { transform: rotateX(360deg); }
        }
        @keyframes spin-y {
            0% { transform: rotateY(0deg); }
            100% { transform: rotateY(360deg); }
        }
        @keyframes spin-z {
            0% { transform: rotateZ(0deg); }
            100% { transform: rotateZ(360deg); }
        }
        .animate-spin-x { animation: spin-x 8s linear infinite; }
        .animate-spin-y { animation: spin-y 12s linear infinite; }
        .animate-spin-z { animation: spin-z 15s linear infinite; }
        
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
