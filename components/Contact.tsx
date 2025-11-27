import React, { useState } from 'react';
import { useCursor } from '../context/CursorContext';

const Contact: React.FC = () => {
    const { setCursorVariant } = useCursor();
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Construct mailto link
        const subject = `Portfolio Contact from ${formState.name}`;
        const body = `Name: ${formState.name}%0D%0AEmail: ${formState.email}%0D%0A%0D%0AMessage:%0D%0A${formState.message}`;
        window.location.href = `mailto:contact@example.com?subject=${subject}&body=${body}`;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        });
    };

    return (
        <section id="contact" className="min-h-screen w-full bg-slate-950 flex items-center justify-center py-20 px-4 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 pointer-events-none"></div>
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent"></div>

            <div className="max-w-4xl w-full relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                        ESTABLISH <span className="text-emerald-500">UPLINK</span>
                    </h2>
                    <p className="text-slate-400 font-mono text-sm md:text-base max-w-xl mx-auto">
                        Initiate communication protocol. Send a secure transmission to the operator.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Contact Info / Visuals */}
                    <div className="space-y-8">
                        <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-lg backdrop-blur-sm hover:border-emerald-500/30 transition-colors duration-300 group">
                            <h3 className="text-emerald-400 font-mono text-sm mb-2 group-hover:text-emerald-300">/// DIRECT_LINE</h3>
                            <p className="text-slate-300 text-lg">contact@example.com</p>
                        </div>

                        <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-lg backdrop-blur-sm hover:border-emerald-500/30 transition-colors duration-300 group">
                            <h3 className="text-emerald-400 font-mono text-sm mb-2 group-hover:text-emerald-300">/// LOCATION_DATA</h3>
                            <p className="text-slate-300 text-lg">Remote / Worldwide</p>
                        </div>

                        <div className="h-40 w-full bg-slate-900/30 border border-slate-800 rounded-lg relative overflow-hidden flex items-center justify-center">
                            <div className="absolute inset-0 opacity-20">
                                {/* Abstract grid or map visual could go here */}
                                <div className="w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                            </div>
                            <span className="text-emerald-500/50 font-mono text-xs animate-pulse">AWAITING_TRANSMISSION...</span>
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6 bg-slate-900/80 p-8 rounded-2xl border border-slate-800 shadow-2xl relative">
                        {/* Decorators */}
                        <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-emerald-500/50"></div>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-emerald-500/50"></div>

                        <div className="space-y-2">
                            <label htmlFor="name" className="text-xs font-mono text-emerald-500/80 uppercase tracking-wider">Identity</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formState.name}
                                onChange={handleChange}
                                required
                                className="w-full bg-slate-950 border border-slate-800 rounded p-3 text-slate-200 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 transition-all font-mono text-sm"
                                placeholder="ENTER_NAME"
                                onMouseEnter={() => setCursorVariant('text')}
                                onMouseLeave={() => setCursorVariant('default')}
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="email" className="text-xs font-mono text-emerald-500/80 uppercase tracking-wider">Frequency (Email)</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formState.email}
                                onChange={handleChange}
                                required
                                className="w-full bg-slate-950 border border-slate-800 rounded p-3 text-slate-200 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 transition-all font-mono text-sm"
                                placeholder="ENTER_EMAIL"
                                onMouseEnter={() => setCursorVariant('text')}
                                onMouseLeave={() => setCursorVariant('default')}
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="message" className="text-xs font-mono text-emerald-500/80 uppercase tracking-wider">Transmission Content</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formState.message}
                                onChange={handleChange}
                                required
                                rows={4}
                                className="w-full bg-slate-950 border border-slate-800 rounded p-3 text-slate-200 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 transition-all font-mono text-sm resize-none"
                                placeholder="ENTER_MESSAGE_DATA..."
                                onMouseEnter={() => setCursorVariant('text')}
                                onMouseLeave={() => setCursorVariant('default')}
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-emerald-500/10 border border-emerald-500/50 text-emerald-400 py-4 rounded font-mono font-bold tracking-widest hover:bg-emerald-500 hover:text-slate-900 transition-all duration-300 uppercase group relative overflow-hidden"
                            onMouseEnter={() => setCursorVariant('button')}
                            onMouseLeave={() => setCursorVariant('default')}
                        >
                            <span className="relative z-10">Transmit Data</span>
                            <div className="absolute inset-0 bg-emerald-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
