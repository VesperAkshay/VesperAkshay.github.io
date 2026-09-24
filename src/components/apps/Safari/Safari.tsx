import { useState } from 'react'
import {
  RotateCw,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Search,
  ExternalLink,
  Bookmark,
  Share,
} from 'lucide-react'
import { projects } from '../../../data/projects'

export const Safari = () => {
  const [url, setUrl] = useState('https://alexrivera.dev/featured')

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    let target = url.trim()
    if (!target.startsWith('http://') && !target.startsWith('https://')) {
      target = `https://${target}`
    }
    setUrl(target)
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-white dark:bg-[#181920] select-none text-slate-800 dark:text-slate-100">
      {/* Safari Navigation Toolbar */}
      <header className="h-11 px-3 border-b border-black/10 dark:border-white/10 flex items-center justify-between gap-3 bg-slate-100/80 dark:bg-[#202127]/80 backdrop-blur-md shrink-0">
        <div className="flex items-center gap-1 text-slate-500">
          <button
            onClick={() => {
              setUrl('https://alexrivera.dev/featured')
            }}
            className="p-1 rounded hover:bg-black/5 dark:hover:bg-white/5"
            title="Home"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="p-1 rounded opacity-40 cursor-not-allowed">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Unified Smart Search / URL bar */}
        <form onSubmit={handleUrlSubmit} className="flex-1 max-w-xl">
          <div className="relative flex items-center">
            <ShieldCheck className="w-3.5 h-3.5 absolute left-3 text-emerald-500" />
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full pl-8 pr-8 py-1 text-xs rounded-lg bg-white dark:bg-[#121317] border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono"
            />
            <button
              type="submit"
              className="absolute right-2.5 text-slate-400 hover:text-slate-700 dark:hover:text-white"
            >
              <RotateCw className="w-3 h-3" />
            </button>
          </div>
        </form>

        <div className="flex items-center gap-1.5 text-slate-500">
          <button className="p-1 rounded hover:bg-black/5 dark:hover:bg-white/5" title="Bookmarks">
            <Bookmark className="w-3.5 h-3.5" />
          </button>
          <button className="p-1 rounded hover:bg-black/5 dark:hover:bg-white/5" title="Share">
            <Share className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Safari Content Page */}
      <div className="flex-1 overflow-y-auto p-6 bg-slate-50 dark:bg-[#14151b]">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center py-4">
            <div className="inline-flex p-3 rounded-2xl bg-blue-500/10 text-blue-500 mb-2">
              <Search className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Featured Live Deployments</h2>
            <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
              Direct access to live production builds, demos, and web experiments.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {projects.map((project) => (
              <div
                key={project.id}
                className="p-4 rounded-xl bg-white dark:bg-[#1c1d24] border border-black/5 dark:border-white/10 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-semibold uppercase text-blue-500 font-mono">
                    {project.category}
                  </span>
                  <h3 className="font-semibold text-sm text-slate-900 dark:text-white mt-1">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                    {project.tagline}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-black/5 dark:border-white/5 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-mono">{project.year}</span>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-500 transition-colors"
                    >
                      <span>Visit Site</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
