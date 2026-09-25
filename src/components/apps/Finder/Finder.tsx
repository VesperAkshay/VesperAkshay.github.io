import { useState, useMemo } from 'react'
import { projects } from '../../../data/projects'
import type { Project } from '../../../data/projects'
import { ProjectCard } from './ProjectCard'
import { ProjectDetail } from './ProjectDetail'
import { useOSStore } from '../../../store/osStore'
import {
  Folder,
  LayoutGrid,
  List,
  Search,
  ChevronLeft,
  ChevronRight,
  HardDrive,
  Cpu,
  Layers,
  Globe,
} from 'lucide-react'

export const Finder = () => {
  const currentOS = useOSStore((state) => state.currentOS)
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [activeProject, setActiveProject] = useState<Project | null>(null)

  const rootDiskName =
    currentOS === 'windows'
      ? 'This PC (C:)'
      : currentOS === 'linux'
      ? 'Home'
      : currentOS === 'android'
      ? 'Internal Storage'
      : 'Macintosh HD'

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory =
        selectedCategory === 'All' || project.category === selectedCategory
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.techStack.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
      return matchesCategory && matchesSearch
    })
  }, [selectedCategory, searchQuery])

  return (
    <div className="flex-1 flex overflow-hidden text-slate-800 dark:text-slate-200 select-none">
      {/* Finder Left Sidebar */}
      <aside className="w-48 bg-slate-100/70 dark:bg-[#1a1b20]/80 border-r border-black/5 dark:border-white/10 p-3 flex flex-col gap-4 text-xs font-medium shrink-0 hidden sm:flex">
        {/* Favorites Section */}
        <div>
          <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-2">
            Favorites
          </span>
          <div className="mt-1 space-y-0.5">
            <button
              onClick={() => {
                setSelectedCategory('All')
                setActiveProject(null)
              }}
              className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left transition-colors ${
                selectedCategory === 'All' && !activeProject
                  ? 'bg-blue-600 text-white font-semibold'
                  : 'hover:bg-black/5 dark:hover:bg-white/5 text-slate-700 dark:text-slate-300'
              }`}
            >
              <Folder className="w-3.5 h-3.5" />
              <span>All Projects</span>
            </button>
            <button
              onClick={() => {
                setSelectedCategory('AI / ML')
                setActiveProject(null)
              }}
              className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left transition-colors ${
                selectedCategory === 'AI / ML' && !activeProject
                  ? 'bg-blue-600 text-white font-semibold'
                  : 'hover:bg-black/5 dark:hover:bg-white/5 text-slate-700 dark:text-slate-300'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>AI & ML</span>
            </button>
            <button
              onClick={() => {
                setSelectedCategory('Systems')
                setActiveProject(null)
              }}
              className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left transition-colors ${
                selectedCategory === 'Systems' && !activeProject
                  ? 'bg-blue-600 text-white font-semibold'
                  : 'hover:bg-black/5 dark:hover:bg-white/5 text-slate-700 dark:text-slate-300'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Systems</span>
            </button>
            <button
              onClick={() => {
                setSelectedCategory('Web App')
                setActiveProject(null)
              }}
              className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left transition-colors ${
                selectedCategory === 'Web App' && !activeProject
                  ? 'bg-blue-600 text-white font-semibold'
                  : 'hover:bg-black/5 dark:hover:bg-white/5 text-slate-700 dark:text-slate-300'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Web Apps</span>
            </button>
          </div>
        </div>

        {/* Locations Section */}
        <div>
          <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-2">
            Locations
          </span>
          <div className="mt-1 space-y-0.5">
            <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-slate-600 dark:text-slate-400">
              <HardDrive className="w-3.5 h-3.5" />
              <span>{rootDiskName}</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Finder Right / Main Area */}
      <div className="flex-1 flex flex-col overflow-hidden bg-white/50 dark:bg-[#16171d]/60">
        {/* Finder Toolbar */}
        <header className="h-11 px-4 border-b border-black/5 dark:border-white/10 flex items-center justify-between gap-3 bg-white/40 dark:bg-[#1f2026]/40 backdrop-blur-md">
          {/* Back/Forward Nav */}
          <div className="flex items-center gap-1 text-slate-500">
            <button
              onClick={() => setActiveProject(null)}
              disabled={!activeProject}
              className="p-1 rounded hover:bg-black/5 dark:hover:bg-white/5 disabled:opacity-30 disabled:hover:bg-transparent"
              title="Back"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              disabled
              className="p-1 rounded opacity-30 cursor-not-allowed"
              title="Forward"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Breadcrumb */}
            <span className="text-xs font-medium ml-2 text-slate-600 dark:text-slate-400">
              {rootDiskName} &gt; Projects {activeProject ? `> ${activeProject.title}` : ''}
            </span>
          </div>

          {/* Right Toolbar: View mode & Search */}
          <div className="flex items-center gap-2.5">
            {!activeProject && (
              <div className="flex items-center bg-slate-200/80 dark:bg-slate-800 rounded-lg p-0.5 border border-black/5 dark:border-white/10">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1 rounded ${
                    viewMode === 'grid'
                      ? 'bg-white dark:bg-slate-700 shadow-sm text-blue-500'
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
                  }`}
                  title="Grid View"
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1 rounded ${
                    viewMode === 'list'
                      ? 'bg-white dark:bg-slate-700 shadow-sm text-blue-500'
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
                  }`}
                  title="List View"
                >
                  <List className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-32 sm:w-44 pl-8 pr-2.5 py-1 text-xs rounded-lg bg-slate-200/60 dark:bg-slate-800/80 border border-transparent focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-900 dark:text-white placeholder:text-slate-400"
              />
            </div>
          </div>
        </header>

        {/* Content View */}
        {activeProject ? (
          <ProjectDetail
            project={activeProject}
            onBack={() => setActiveProject(null)}
          />
        ) : (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            {filteredProjects.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-slate-400 p-8">
                <Folder className="w-10 h-10 mb-2 opacity-50 stroke-[1.5]" />
                <p className="text-sm font-medium">No matching projects found</p>
                <p className="text-xs mt-1">Try clearing your search or filter</p>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onSelect={(p) => setActiveProject(p)}
                  />
                ))}
              </div>
            ) : (
              /* List View */
              <div className="divide-y divide-black/5 dark:divide-white/5 rounded-xl border border-black/5 dark:border-white/10 overflow-hidden bg-white/60 dark:bg-[#1c1d24]/60">
                {filteredProjects.map((project) => (
                  <div
                    key={project.id}
                    onClick={() => setActiveProject(project)}
                    className="p-3 flex items-center justify-between hover:bg-blue-500/10 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={project.thumbnail}
                        alt=""
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <div>
                        <div className="font-semibold text-xs text-slate-900 dark:text-white">
                          {project.title}
                        </div>
                        <div className="text-[11px] text-slate-500 truncate max-w-sm">
                          {project.tagline}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-400">
                      <span className="hidden sm:inline font-mono">{project.year}</span>
                      <span className="px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-[10px]">
                        {project.category}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Finder Status Footer */}
        <footer className="h-6 px-3 border-t border-black/5 dark:border-white/10 flex items-center justify-between text-[11px] text-slate-400 bg-white/30 dark:bg-[#18191f]/40">
          <span>{filteredProjects.length} items</span>
          <span>128.4 GB available</span>
        </footer>
      </div>
    </div>
  )
}
