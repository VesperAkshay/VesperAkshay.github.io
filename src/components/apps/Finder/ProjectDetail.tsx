import React, { useState } from 'react'
import type { Project } from '../../../data/projects'
import { ArrowLeft, ExternalLink, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react'

interface ProjectDetailProps {
  project: Project
  onBack: () => void
}

export const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onBack }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  const screenshots = project.screenshots?.length > 0 ? project.screenshots : [project.thumbnail]

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % screenshots.length)
  }

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length)
  }

  return (
    <div className="flex-1 overflow-y-auto p-5 sm:p-6 text-slate-800 dark:text-slate-100 flex flex-col gap-6">
      {/* Top Navigation & Actions Bar */}
      <div className="flex items-center justify-between gap-4 pb-4 border-b border-black/10 dark:border-white/10">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-200/70 dark:bg-slate-800/70 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Projects</span>
        </button>

        <div className="flex items-center gap-2">
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              <span>Source</span>
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium bg-blue-600 hover:bg-blue-500 text-white transition-colors shadow-sm"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Live Site</span>
            </a>
          )}
        </div>
      </div>

      {/* Header Info */}
      <div>
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-500">
            {project.category || 'Case Study'}
          </span>
          <span className="text-slate-400">•</span>
          <span className="text-xs text-slate-400 font-mono">{project.year}</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">
          {project.title}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {project.tagline}
        </p>
      </div>

      {/* Screenshot Showcase / Carousel */}
      <div className="relative w-full rounded-xl overflow-hidden bg-slate-950 border border-black/10 dark:border-white/10 shadow-inner group">
        <div className="aspect-[16/9] w-full max-h-[340px] flex items-center justify-center overflow-hidden">
          <img
            src={screenshots[activeImageIndex]}
            alt={`${project.title} preview ${activeImageIndex + 1}`}
            className="w-full h-full object-cover transition-all duration-300"
          />
        </div>

        {screenshots.length > 1 && (
          <>
            <button
              onClick={prevImage}
              aria-label="Previous screenshot"
              className="absolute left-2.5 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors backdrop-blur-sm"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextImage}
              aria-label="Next screenshot"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors backdrop-blur-sm"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Slide dots */}
            <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-2 py-1 rounded-full bg-black/50 backdrop-blur-sm">
              {screenshots.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    idx === activeImageIndex ? 'bg-white w-3' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Metrics Row */}
      {project.metrics && project.metrics.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {project.metrics.map((metric, i) => (
            <div
              key={i}
              className="flex items-center gap-2.5 p-3 rounded-lg bg-blue-500/5 border border-blue-500/15"
            >
              <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" />
              <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{metric}</span>
            </div>
          ))}
        </div>
      )}

      {/* Deep-Dive Case Study Description */}
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-2">
          Architecture & Overview
        </h2>
        <div className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line space-y-3">
          <p>{project.description}</p>
        </div>
      </div>

      {/* Tech Stack List */}
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-2.5">
          Technologies Used
        </h2>
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="text-xs px-3 py-1 rounded-lg bg-slate-200/80 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-medium border border-slate-300 dark:border-slate-700"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
