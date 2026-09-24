import { useState } from 'react'
import { profile } from '../../../data/profile'
import {
  Download,
  ZoomIn,
  ZoomOut,
  FileText,
  Mail,
  MapPin,
  Phone,
  Briefcase,
  GraduationCap,
  Award,
  Code2,
  ExternalLink,
} from 'lucide-react'

export const Preview = () => {
  const [zoomLevel, setZoomLevel] = useState(100)
  const [viewMode, setViewMode] = useState<'document' | 'pdf'>('document')

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-slate-200 dark:bg-[#15161b] select-none text-slate-800 dark:text-slate-200">
      {/* Preview App Toolbar */}
      <header className="h-10 px-4 border-b border-black/10 dark:border-white/10 flex items-center justify-between text-xs bg-white/70 dark:bg-[#202127]/80 backdrop-blur-md shrink-0">
        {/* Left: Document info */}
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-rose-500" />
          <span className="font-semibold text-slate-900 dark:text-white">Akshay_Patel_Resume.pdf</span>
          <span className="text-[11px] text-slate-400 hidden sm:inline">(Page 1 of 1)</span>
        </div>

        {/* Center: Mode toggle & Zoom */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg border border-black/5 dark:border-white/10">
          <button
            onClick={() => setViewMode('document')}
            className={`px-2.5 py-0.5 rounded text-[11px] font-medium transition-colors ${
              viewMode === 'document'
                ? 'bg-white dark:bg-slate-700 text-blue-500 shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Formatted Document
          </button>
          <button
            onClick={() => setViewMode('pdf')}
            className={`px-2.5 py-0.5 rounded text-[11px] font-medium transition-colors ${
              viewMode === 'pdf'
                ? 'bg-white dark:bg-slate-700 text-blue-500 shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Raw PDF
          </button>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 text-slate-500">
          <button
            onClick={() => setZoomLevel((z) => Math.max(70, z - 10))}
            className="p-1 rounded hover:bg-black/5 dark:hover:bg-white/5"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="text-[11px] font-mono w-9 text-center">{zoomLevel}%</span>
          <button
            onClick={() => setZoomLevel((z) => Math.min(140, z + 10))}
            className="p-1 rounded hover:bg-black/5 dark:hover:bg-white/5"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>

          <div className="h-4 w-[1px] bg-slate-300 dark:bg-slate-700 mx-1" />

          <a
            href={profile.resumePath}
            download="Akshay_Patel_Resume.pdf"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-medium transition-colors shadow-sm"
          >
            <Download className="w-3 h-3" />
            <span className="hidden sm:inline">Download PDF</span>
          </a>
        </div>
      </header>

      {/* Main Document Canvas View */}
      <div className="flex-1 overflow-auto p-4 sm:p-6 flex items-start justify-center">
        {viewMode === 'pdf' ? (
          <div
            style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
            className="w-full max-w-3xl h-[780px] bg-white rounded-lg shadow-xl overflow-hidden border border-slate-300 dark:border-slate-800 flex flex-col"
          >
            <div className="p-2 bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs">
              <span className="text-slate-600 dark:text-slate-300">Rendering official Resume.pdf</span>
              <a
                href={profile.resumePath}
                target="_blank"
                rel="noreferrer"
                className="text-blue-500 hover:underline flex items-center gap-1"
              >
                Open in new tab <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <object
              data={profile.resumePath}
              type="application/pdf"
              className="w-full flex-1"
            >
              <iframe
                src={profile.resumePath}
                title="Akshay Patel Resume PDF"
                className="w-full h-full border-none"
              />
            </object>
          </div>
        ) : (
          /* High-Fidelity Formatted Resume Page matching Akshay Patel's Resume.pdf */
          <div
            style={{
              transform: `scale(${zoomLevel / 100})`,
              transformOrigin: 'top center',
            }}
            className="w-full max-w-3xl bg-white text-slate-900 rounded-lg shadow-2xl p-8 sm:p-10 border border-slate-300 transition-transform select-text font-sans"
          >
            {/* Header: Name and Contact */}
            <div className="border-b-2 border-slate-900 pb-4 mb-4 text-center sm:text-left">
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 mb-1">
                AKSHAY PATEL
              </h1>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-3 gap-y-1 text-xs text-slate-700 font-medium">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  Kanpur, Uttar Pradesh, India
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-slate-500" />
                  +91 9807569447
                </span>
                <span>•</span>
                <a href="mailto:5638.akshay@gmail.com" className="flex items-center gap-1 text-blue-600 hover:underline">
                  <Mail className="w-3.5 h-3.5" />
                  5638.akshay@gmail.com
                </a>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-4 mt-2 text-xs font-semibold text-blue-600">
                <a href="https://github.com/VesperAkshay" target="_blank" rel="noreferrer" className="hover:underline">
                  GitHub: github.com/VesperAkshay
                </a>
                <span>•</span>
                <a href="https://www.linkedin.com/in/patelakshay1503" target="_blank" rel="noreferrer" className="hover:underline">
                  LinkedIn: in/patelakshay1503
                </a>
                <span>•</span>
                <a href="https://x.com/Akshaypatell_" target="_blank" rel="noreferrer" className="hover:underline">
                  X: @Akshaypatell_
                </a>
              </div>
            </div>

            {/* Career Objective */}
            <div className="mb-5">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-950 border-b border-slate-200 pb-1 mb-2">
                Career Objective
              </h2>
              <p className="text-xs text-slate-700 leading-relaxed text-justify">
                B.Tech Computer Science graduate actively building Agentic AI systems, with hands-on experience in full-stack development and software engineering. Seeking opportunities to develop scalable, intelligent products while strengthening expertise in cloud technologies and distributed systems.
              </p>
            </div>

            {/* Education */}
            <div className="mb-5">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-950 border-b border-slate-200 pb-1 mb-2 flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
                Education
              </h2>
              <div className="space-y-2">
                <div className="flex items-start justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-950">B.Tech in Computer Science and Engineering</span>
                    <div className="text-slate-600 text-[11px]">
                      Pranveer Singh Institute of Technology, Kanpur • <span className="font-semibold text-slate-900">CGPA: 7.41 / 10.0</span>
                    </div>
                  </div>
                  <span className="text-slate-600 font-mono text-[11px] shrink-0">2022 — 2026</span>
                </div>

                <div className="flex items-start justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-950">Senior Secondary (Class XII)</span>
                    <div className="text-slate-600 text-[11px]">
                      Puranchandra Vidya Niketan, Kanpur • <span className="font-semibold text-slate-900">80%</span>
                    </div>
                  </div>
                  <span className="text-slate-600 font-mono text-[11px] shrink-0">2020 — 2021</span>
                </div>
              </div>
            </div>

            {/* Open Source Contributions */}
            <div className="mb-5">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-950 border-b border-slate-200 pb-1 mb-2 flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-blue-600" />
                Open Source Contributions
              </h2>
              <div className="space-y-2 text-xs">
                <div>
                  <div className="flex justify-between font-bold text-slate-900">
                    <span>GirlScript Summer of Code (GSSoC) Contributor</span>
                    <span className="text-slate-500 font-mono text-[11px]">2024</span>
                  </div>
                  <p className="text-[11px] text-slate-600">
                    • Contributed to active open-source projects during GirlScript Summer of Code 2024.
                  </p>
                </div>
                <div>
                  <div className="flex justify-between font-bold text-slate-900">
                    <span>Hacktoberfest Contributor</span>
                    <span className="text-slate-500 font-mono text-[11px]">2024 & 2025</span>
                  </div>
                  <p className="text-[11px] text-slate-600">
                    • Participated in Hacktoberfest for two consecutive years contributing production-ready code; recognized as Super Contributor in 2025.
                  </p>
                </div>
              </div>
            </div>

            {/* Technical Skills */}
            <div className="mb-5">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-950 border-b border-slate-200 pb-1 mb-2">
                Technical Skills
              </h2>
              <div className="space-y-1.5 text-xs">
                <div>
                  <span className="font-bold text-slate-900">Languages: </span>
                  <span className="text-slate-700">Python, Rust, C++, TypeScript, JavaScript, SQL</span>
                </div>
                <div>
                  <span className="font-bold text-slate-900">AI & Machine Learning: </span>
                  <span className="text-slate-700">Scikit-learn, XGBoost, PyTorch, Sentence-Transformers, LangGraph, ChromaDB, RAG</span>
                </div>
                <div>
                  <span className="font-bold text-slate-900">Web & Systems: </span>
                  <span className="text-slate-700">FastAPI, React, Node.js, Express.js, Tauri, PostgreSQL, SQLite</span>
                </div>
                <div>
                  <span className="font-bold text-slate-900">DevOps & Testing: </span>
                  <span className="text-slate-700">Docker, AWS, GitHub Actions, Pytest, Playwright</span>
                </div>
                <div>
                  <span className="font-bold text-slate-900">Core CS: </span>
                  <span className="text-slate-700">Data Structures & Algorithms, OOP, Operating Systems, DBMS</span>
                </div>
              </div>
            </div>

            {/* Projects */}
            <div className="mb-5">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-950 border-b border-slate-200 pb-1 mb-3 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-blue-600" />
                Key Projects
              </h2>
              <div className="space-y-3.5">
                {/* Project 1: TaxPlan */}
                <div>
                  <div className="flex items-baseline justify-between text-xs font-bold text-slate-950">
                    <span>TAXPLAN: Autonomous Personal Finance & Tax Regime Planner</span>
                    <span className="text-slate-500 font-mono text-[11px]">Aug 2026 — Sept 2026</span>
                  </div>
                  <div className="text-[11px] text-blue-700 font-medium mb-1">
                    Role: Project Lead & Full-Stack AI Engineer | Tech Stack: Python, FastAPI, React, LangGraph, ChromaDB, PostgreSQL
                  </div>
                  <ul className="text-xs text-slate-700 space-y-1 list-disc list-inside">
                    <li>Built a semantic-embedding financial classifier achieving 91.67% accuracy and 0.915 Macro F1 across 12 categories, outperforming XGBoost by 6.95%.</li>
                    <li>Architected a LangGraph tax agent with ChromaDB RAG (100% Top-1 retrieval) and AST-verified deterministic arithmetic with zero mathematical hallucinations.</li>
                    <li>Full-Stack Platform: Engineered asynchronous FastAPI services and a React document vault with JWT tenant isolation, multi-file ingestion, interactive tax analysis, PostgreSQL persistence, and one-click cascading deletion.</li>
                  </ul>
                </div>

                {/* Project 2: TyeGit */}
                <div>
                  <div className="flex items-baseline justify-between text-xs font-bold text-slate-950">
                    <span>TYEGIT: High-Performance Native Git Desktop Client</span>
                    <span className="text-slate-500 font-mono text-[11px]">May 2025 — July 2025</span>
                  </div>
                  <div className="text-[11px] text-blue-700 font-medium mb-1">
                    Role: Creator & Lead Developer | Tech Stack: Rust, Tauri v2, React, TypeScript, libgit2, SQLite
                  </div>
                  <ul className="text-xs text-slate-700 space-y-1 list-disc list-inside">
                    <li>Native Git Architecture: Built a cross-platform desktop Git client with a React/Tauri interface and a modular 38-component Rust engine.</li>
                    <li>Advanced Git Workflows: Implemented patch staging, visual diffs, commit graphs, branch and remote management, conflict resolution, interactive rebase, and worktrees.</li>
                    <li>Recovery & Integrations: Designed checkpoint-based rollback and recovery, with OAuth hosting, pull-request management, CI/CD inspection, and encrypted secrets handling.</li>
                  </ul>
                </div>

                {/* Project 3: ReqSmith */}
                <div>
                  <div className="flex items-baseline justify-between text-xs font-bold text-slate-950">
                    <span>REQSMITH: AI-Powered Cross-Platform API Testing CLI</span>
                    <span className="text-slate-500 font-mono text-[11px]">Nov 2024 — Feb 2025</span>
                  </div>
                  <div className="text-[11px] text-blue-700 font-medium mb-1">
                    Role: Creator & Maintainer | Tech Stack: Python, Gemini API, HTTPX
                  </div>
                  <ul className="text-xs text-slate-700 space-y-1 list-disc list-inside">
                    <li>Cross-Platform API Testing: Built a Python CLI for REST methods and GraphQL workflows, supporting authentication, retries, proxies, and configurable timeouts across Windows, macOS, and Linux.</li>
                    <li>Reusable Developer Workflows: Designed request templates, environment switching, history replay, and color-formatted JSON/XML responses for repeatable API testing.</li>
                    <li>Hybrid LRU Caching: Implemented an in-memory LRU cache with persistent disk storage for instant response replay across sessions and fewer redundant network requests.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Achievements & Certifications */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-950 border-b border-slate-200 pb-1 mb-2 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-blue-600" />
                Achievements & Certifications
              </h2>
              <ul className="text-xs text-slate-700 space-y-1 list-disc list-inside">
                <li>Earned the <span className="font-semibold text-slate-900">Python Certification</span> from freeCodeCamp.</li>
                <li>Achieved a <span className="font-semibold text-slate-900">CodeChef rating of 1526</span> in competitive programming.</li>
                <li>Recognized as a <span className="font-semibold text-slate-900">Super Contributor</span> at Hacktoberfest 2025.</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
