export interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  avatar: string
  quote: string
}

export interface ExperienceItem {
  year: string
  role: string
  company: string
  description: string
  highlights: string[]
}

export interface Profile {
  name: string
  role: string
  location: string
  phone: string
  bio: string
  skills: string[]
  skillCategories: {
    name: string
    items: string[]
  }[]
  email: string
  socials: { label: string; url: string; icon?: string }[]
  resumePath: string
  education: {
    degree: string
    institution: string
    year: string
    score: string
  }[]
  achievements: string[]
  experiences: ExperienceItem[]
  testimonials: Testimonial[]
}

export const profile: Profile = {
  name: 'Akshay Patel',
  role: 'AI Systems Architect & Full-Stack Software Engineer',
  location: 'Kanpur, Uttar Pradesh, India',
  phone: '+91 9807569447',
  bio: 'B.Tech Computer Science engineer actively building Agentic AI systems, with hands-on experience in full-stack development and high-performance software engineering. Passionate about scalable intelligent products, distributed systems, and low-latency cloud architectures.',
  skills: [
    'Python', 'Rust', 'C++', 'TypeScript', 'JavaScript', 'FastAPI',
    'React', 'Node.js', 'LangGraph', 'PyTorch', 'ChromaDB', 'PostgreSQL',
    'Docker', 'AWS', 'Tauri', 'SQLite',
  ],
  skillCategories: [
    {
      name: 'Languages & Core Systems',
      items: ['Python', 'Rust', 'C++', 'TypeScript', 'JavaScript', 'SQL', 'Data Structures & Algorithms'],
    },
    {
      name: 'AI & Machine Learning',
      items: ['LangGraph Agents', 'ChromaDB & RAG', 'PyTorch', 'Sentence-Transformers', 'XGBoost', 'Gemini & OpenAI APIs'],
    },
    {
      name: 'Web, Desktop & DevOps',
      items: ['FastAPI', 'React', 'Node.js / Express', 'Tauri v2', 'PostgreSQL / SQLite', 'Docker & AWS', 'GitHub Actions'],
    },
  ],
  email: '5638.akshay@gmail.com',
  socials: [
    { label: 'GitHub', url: 'https://github.com/VesperAkshay' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/patelakshay1503' },
    { label: 'Twitter / X', url: 'https://x.com/Akshaypatell_' },
  ],
  resumePath: '/resume.pdf',
  education: [
    {
      degree: 'B.Tech in Computer Science and Engineering',
      institution: 'Pranveer Singh Institute of Technology, Kanpur',
      year: '2022 — 2026',
      score: 'CGPA: 7.41 / 10.0',
    },
    {
      degree: 'Senior Secondary (Class XII)',
      institution: 'Puranchandra Vidya Niketan, Kanpur',
      year: '2020 — 2021',
      score: '80%',
    },
  ],
  achievements: [
    'Super Contributor at Hacktoberfest 2025 and 2024 contributor',
    'GirlScript Summer of Code (GSSoC) 2024 Contributor',
    'Competitive Programming: CodeChef rating of 1526',
    'Python Certification from freeCodeCamp',
  ],
  experiences: [
    {
      year: 'Aug 2026 — Sept 2026',
      role: 'Project Lead & AI Engineer',
      company: 'TaxPlan Platform',
      description: 'Engineered an autonomous tax and financial planning platform with LangGraph RAG and multi-file document vault.',
      highlights: [
        'Built semantic classifier with 91.67% accuracy and 0.915 Macro F1 across 12 categories',
        'Architected ChromaDB RAG agent with 100% Top-1 retrieval and AST-verified math',
      ],
    },
    {
      year: 'May 2025 — July 2025',
      role: 'Creator & Lead Developer',
      company: 'TyeGit Desktop Client',
      description: 'Designed a high-performance cross-platform Git client with Tauri v2, React, and modular Rust engine.',
      highlights: [
        'Built 38-component modular Rust engine with libgit2 integration',
        'Implemented visual diffs, patch staging, interactive rebase, and rollback checkpoints',
      ],
    },
    {
      year: 'Nov 2024 — Feb 2025',
      role: 'Creator & Maintainer',
      company: 'ReqSmith CLI',
      description: 'Built an AI-powered developer CLI for REST and GraphQL API testing across Windows, macOS, and Linux.',
      highlights: [
        'Hybrid in-memory LRU caching with persistent disk storage for instant replay',
        'Gemini API integration for automated test generation and failure diagnosis',
      ],
    },
  ],
  testimonials: [
    {
      id: 't1',
      name: 'Open Source Community',
      role: 'Hacktoberfest / GSSoC',
      company: 'Open Source',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      quote: 'Akshay demonstrated tremendous engineering depth and consistency across multiple open-source repositories, earning recognition as a Super Contributor at Hacktoberfest.',
    },
    {
      id: 't2',
      name: 'Engineering Peer',
      role: 'AI Systems Collaborator',
      company: 'PSIT Kanpur',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      quote: 'Akshay combines deep low-level system understanding in Rust and C++ with cutting-edge Agentic AI workflows in LangGraph and ChromaDB. A rare talent who delivers production-grade code.',
    },
    {
      id: 't3',
      name: 'Project Reviewer',
      role: 'Tech Lead',
      company: 'Dev Community',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
      quote: 'His TyeGit and TaxPlan systems stand out for their exceptional architectural discipline, mathematical rigor, and attention to user experience.',
    },
  ],
}
