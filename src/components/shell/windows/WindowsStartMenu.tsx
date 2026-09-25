import React, { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useOSStore } from '../../../store/osStore'
import { useWindowStore } from '../../../store/windowStore'
import { profile } from '../../../data/profile'
import { OSAppIcon } from '../OSAppIcon'
import { getOSAppMeta } from '../../../data/osApps'
import { Search, Power, ChevronRight, FileText, Code, Sparkles, Folder } from 'lucide-react'

export const WindowsStartMenu: React.FC = () => {
  const isStartMenuOpen = useOSStore((state) => state.isStartMenuOpen)
  const closeStartMenu = useOSStore((state) => state.closeStartMenu)
  const open = useWindowStore((state) => state.open)

  const [searchQuery, setSearchQuery] = useState('')
  const menuRef = useRef<HTMLDivElement>(null)

  // Close on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Don't close if clicking start button (handled by toggle)
      const target = e.target as HTMLElement | null
      if (target?.closest('[data-start-button]')) return
      if (menuRef.current && !menuRef.current.contains(target as Node)) {
        closeStartMenu()
      }
    }
    if (isStartMenuOpen) {
      document.addEventListener('mousedown', handleClick)
    }
    return () => {
      document.removeEventListener('mousedown', handleClick)
    }
  }, [isStartMenuOpen, closeStartMenu])

  const pinnedAppIds = [
    'finder',
    'about',
    'terminal',
    'contact',
    'photos',
    'preview',
    'safari',
    'wallpapers',
    'game2048',
  ]

  const pinnedApps = pinnedAppIds.map((id) => getOSAppMeta(id, 'windows'))

  const recommendedItems = [
    {
      title: 'Resume.pdf',
      desc: 'Akshay Patel - Full Stack & Systems',
      icon: <FileText className="w-5 h-5 text-red-400" />,
      action: () => open('preview'),
    },
    {
      title: 'Projects Showcase',
      desc: 'Web, Cloud & Distributed Tools',
      icon: <Folder className="w-5 h-5 text-amber-400" />,
      action: () => open('finder'),
    },
    {
      title: '2048: Dev Evolution',
      desc: 'Interactive Code Mini-Game',
      icon: <Sparkles className="w-5 h-5 text-emerald-400" />,
      action: () => open('game2048'),
    },
    {
      title: 'Terminal CLI',
      desc: 'Interactive ZSH portfolio shell',
      icon: <Code className="w-5 h-5 text-sky-400" />,
      action: () => open('terminal'),
    },
  ]

  const filteredPinned = pinnedApps.filter((app) =>
    app.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <AnimatePresence>
      {isStartMenuOpen && (
        <motion.div
          ref={menuRef}
          initial={{ opacity: 0, y: 24, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.96 }}
          transition={{ type: 'spring', stiffness: 380, damping: 28 }}
          className="fixed bottom-14 left-1/2 -translate-x-1/2 w-[94vw] max-w-[560px] h-[580px] rounded-2xl bg-[#1c2333]/90 dark:bg-[#151922]/95 backdrop-blur-3xl border border-white/20 shadow-[0_24px_60px_rgba(0,0,0,0.6)] z-[90] flex flex-col overflow-hidden text-white select-none"
        >
          {/* Top Search Bar */}
          <div className="p-5 pb-3">
            <div className="relative flex items-center w-full bg-black/40 hover:bg-black/50 focus-within:bg-black/60 rounded-xl px-3.5 py-2.5 border border-white/10 focus-within:border-sky-400/60 transition-all shadow-inner">
              <Search className="w-4 h-4 text-sky-400 shrink-0 mr-2.5" />
              <input
                type="text"
                autoFocus
                placeholder="Type here to search apps, files, skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-xs text-slate-400 hover:text-white px-1.5 py-0.5"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Main Scrollable Area */}
          <div className="flex-1 overflow-y-auto px-5 py-2 space-y-5 custom-scrollbar">
            {/* Pinned Section */}
            <div>
              <div className="flex items-center justify-between mb-3 px-1">
                <span className="text-xs font-bold tracking-wide text-slate-200">Pinned</span>
                <span className="text-[11px] text-sky-400 hover:underline cursor-pointer flex items-center gap-0.5">
                  All apps <ChevronRight className="w-3 h-3" />
                </span>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-5 gap-2.5">
                {filteredPinned.map((app) => (
                  <button
                    key={app.id}
                    onClick={() => {
                      open(app.id)
                      closeStartMenu()
                    }}
                    className="flex flex-col items-center justify-center gap-1.5 p-2 rounded-xl hover:bg-white/10 active:bg-white/15 transition-all group"
                  >
                    <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 p-2 flex items-center justify-center group-hover:scale-110 group-hover:shadow-lg transition-transform">
                      <OSAppIcon id={app.id} os="windows" className="w-7 h-7 object-contain drop-shadow" />
                    </div>
                    <span className="text-[11px] text-slate-200 text-center truncate max-w-full font-medium">
                      {app.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Recommended Section */}
            <div>
              <div className="flex items-center justify-between mb-3 px-1">
                <span className="text-xs font-bold tracking-wide text-slate-200">Recommended</span>
                <span className="text-[11px] text-slate-400">Recently updated</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {recommendedItems.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      item.action()
                      closeStartMenu()
                    }}
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/10 active:bg-white/15 border border-white/5 hover:border-white/10 text-left transition-all group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-black/30 flex items-center justify-center shrink-0 border border-white/10 group-hover:scale-105 transition-transform">
                      {item.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-semibold text-slate-100 truncate">
                        {item.title}
                      </div>
                      <div className="text-[11px] text-slate-400 truncate">
                        {item.desc}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Windows User Bar */}
          <div className="p-3.5 px-6 bg-black/40 border-t border-white/10 flex items-center justify-between">
            <div
              onClick={() => {
                open('about')
                closeStartMenu()
              }}
              className="flex items-center gap-3 cursor-pointer hover:bg-white/10 p-1.5 -ml-2 rounded-xl transition-colors"
            >
              <img
                src="/profile.png"
                alt="Akshay Patel"
                className="w-8 h-8 rounded-full border border-sky-400/50 object-cover shadow"
                onError={(e) => {
                  e.currentTarget.src = '/icons/finder.svg'
                }}
              />
              <div className="flex flex-col text-left">
                <span className="text-xs font-semibold text-white tracking-wide">
                  {profile.name}
                </span>
                <span className="text-[10px] text-slate-400">akshay@portfolio.dev</span>
              </div>
            </div>

            <button
              onClick={() => {
                closeStartMenu()
                useOSStore.getState().openDrawer()
              }}
              className="flex items-center gap-1.5 p-2 rounded-xl hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
              title="Power / Switch OS"
            >
              <Power className="w-4 h-4 text-red-400" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
