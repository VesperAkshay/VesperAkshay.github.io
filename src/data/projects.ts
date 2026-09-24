export interface Project {
  id: string
  title: string
  tagline: string
  description: string
  techStack: string[]
  liveUrl?: string
  repoUrl?: string
  thumbnail: string
  screenshots: string[]
  year: number
  category?: 'Web App' | 'AI / ML' | 'Systems' | 'Mobile'
  metrics?: string[]
}

export const projects: Project[] = [
  {
    id: 'taxplan',
    title: 'TaxPlan: Autonomous Personal Finance & Tax Planner',
    tagline: 'Autonomous AI tax regime agent with LangGraph, ChromaDB RAG, and deterministic AST verification',
    category: 'AI / ML',
    year: 2026,
    techStack: ['Python', 'FastAPI', 'React', 'LangGraph', 'ChromaDB', 'PostgreSQL', 'Docker'],
    liveUrl: 'https://github.com/VesperAkshay',
    repoUrl: 'https://github.com/VesperAkshay',
    thumbnail: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    ],
    metrics: [
      '91.67% financial classification accuracy',
      '100% Top-1 ChromaDB RAG retrieval',
      'Zero mathematical hallucinations',
    ],
    description: `Built a semantic-embedding financial classifier achieving 91.67% accuracy and 0.915 Macro F1 across 12 categories, outperforming XGBoost by 6.95%.

Architected an autonomous LangGraph tax agent with ChromaDB RAG (100% Top-1 retrieval) and AST-verified deterministic arithmetic with zero mathematical hallucinations.

Engineered asynchronous FastAPI services and a React document vault with JWT tenant isolation, multi-file ingestion, interactive tax regime analysis, and PostgreSQL persistence.`,
  },
  {
    id: 'tyegit',
    title: 'TyeGit: High-Performance Native Git Desktop Client',
    tagline: 'Cross-platform desktop Git client built with Tauri v2, React, TypeScript, and a 38-component Rust engine',
    category: 'Systems',
    year: 2025,
    techStack: ['Rust', 'Tauri v2', 'React', 'TypeScript', 'libgit2', 'SQLite'],
    liveUrl: 'https://github.com/VesperAkshay',
    repoUrl: 'https://github.com/VesperAkshay',
    thumbnail: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=800&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    ],
    metrics: [
      '38-component modular Rust engine',
      'Native libgit2 speed',
      'Checkpoint-based rollback & recovery',
    ],
    description: `Engineered a cross-platform desktop Git client with a React/Tauri interface and a modular 38-component Rust engine.

Implemented advanced Git workflows: patch staging, visual diffs, commit graphs, branch and remote management, conflict resolution, interactive rebase, and worktrees.

Designed checkpoint-based rollback and recovery, with OAuth hosting, pull-request management, CI/CD inspection, and encrypted secrets handling.`,
  },
  {
    id: 'reqsmith',
    title: 'ReqSmith: AI-Powered API Testing CLI',
    tagline: 'Cross-platform developer CLI for REST & GraphQL testing with Gemini API diagnostics and hybrid caching',
    category: 'Systems',
    year: 2025,
    techStack: ['Python', 'Gemini API', 'HTTPX', 'CLI', 'LRU Cache'],
    liveUrl: 'https://github.com/VesperAkshay',
    repoUrl: 'https://github.com/VesperAkshay',
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=1200&q=80',
    ],
    metrics: [
      'Cross-platform: Windows, macOS, Linux',
      'Hybrid LRU memory + disk cache',
      'Automated Gemini failure diagnosis',
    ],
    description: `Built a Python CLI for REST methods and GraphQL workflows, supporting authentication, retries, proxies, and configurable timeouts across Windows, macOS, and Linux.

Designed reusable developer workflows: request templates, environment switching, history replay, and color-formatted JSON/XML responses for repeatable API testing.

Implemented an in-memory LRU cache with persistent disk storage for instant response replay across sessions and reduced redundant network requests.`,
  },
]
