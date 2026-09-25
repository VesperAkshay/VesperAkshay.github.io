import { useState, useMemo } from 'react'
import { WALLPAPERS } from '../../../data/wallpapers'
import type { WallpaperItem } from '../../../data/wallpapers'
import { useWallpaperStore } from '../../../store/wallpaperStore'
import { Check, Search, Sparkles, Image as ImageIcon } from 'lucide-react'

export const Wallpapers = () => {
  const currentWallpaper = useWallpaperStore((state) => state.currentWallpaper)
  const setWallpaper = useWallpaperStore((state) => state.setWallpaper)

  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [searchQuery, setSearchQuery] = useState('')

  const categories = ['All', 'OS Wallpapers', 'F1 Racing', 'Flowers', 'Clouds & Sky', 'Aesthetic']

  const filteredWallpapers = useMemo(() => {
    return WALLPAPERS.filter((item) => {
      const matchCat = selectedCategory === 'All' || item.category === selectedCategory
      const matchSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      return matchCat && matchSearch
    })
  }, [selectedCategory, searchQuery])

  const activeItem = WALLPAPERS.find((w) => w.url === currentWallpaper) || {
    id: 'custom',
    name: 'Current Wallpaper',
    category: 'Custom',
    url: currentWallpaper,
    thumbnail: currentWallpaper,
  }

  return (
    <div className="flex-1 flex overflow-hidden text-slate-800 dark:text-slate-100 select-none">
      {/* Category Sidebar */}
      <aside className="w-48 bg-slate-100/70 dark:bg-[#1a1b20]/80 border-r border-black/5 dark:border-white/10 p-3 flex flex-col gap-4 text-xs font-medium shrink-0 hidden sm:flex">
        <div>
          <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-2">
            Collections
          </span>
          <div className="mt-1 space-y-0.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left transition-colors ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'hover:bg-black/5 dark:hover:bg-white/5 text-slate-700 dark:text-slate-300'
                }`}
              >
                <span>{cat}</span>
                <span className="text-[10px] opacity-70">
                  {cat === 'All'
                    ? WALLPAPERS.length
                    : WALLPAPERS.filter((w) => w.category === cat).length}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Current Active Preview in Sidebar */}
        <div className="mt-auto p-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 flex flex-col gap-2">
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
            Active Desktop
          </span>
          <div className="w-full h-20 rounded-lg overflow-hidden border border-black/10 dark:border-white/10 shadow-sm relative">
            <img
              src={activeItem.thumbnail}
              alt=""
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-1.5">
              <span className="text-[10px] text-white font-medium truncate">
                {activeItem.name}
              </span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Wallpaper Gallery Area */}
      <div className="flex-1 flex flex-col overflow-hidden bg-white/50 dark:bg-[#16171d]/60">
        {/* Top Header & Search */}
        <header className="h-11 px-4 border-b border-black/5 dark:border-white/10 flex items-center justify-between gap-3 bg-white/40 dark:bg-[#1f2026]/40 backdrop-blur-md shrink-0">
          <div className="flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-blue-500" />
            <h2 className="font-semibold text-xs text-slate-900 dark:text-white">
              Desktop Wallpapers
            </h2>
            <span className="text-slate-400 text-xs hidden sm:inline">• Click any wallpaper to apply</span>
          </div>

          {/* Search bar */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="w-32 sm:w-52 pl-8 pr-2.5 py-1 text-xs rounded-lg bg-slate-200/60 dark:bg-slate-800/80 border border-transparent focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-900 dark:text-white placeholder:text-slate-400"
            />
          </div>
        </header>

        {/* Mobile Horizontal Category Filter Bar */}
        <div className="flex sm:hidden items-center gap-1.5 px-3 py-2 overflow-x-auto border-b border-black/5 dark:border-white/10 shrink-0 bg-white/20 dark:bg-black/20 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded-full text-[11px] whitespace-nowrap transition-colors shrink-0 ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white font-semibold shadow-sm'
                  : 'bg-black/5 dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:bg-black/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Wallpaper Grid */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5">
          {filteredWallpapers.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-slate-400">
              <ImageIcon className="w-8 h-8 opacity-40 mb-2" />
              <p className="text-sm font-medium">No wallpapers found</p>
              <p className="text-xs text-slate-500 mt-0.5">Try clearing your search query</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredWallpapers.map((item: WallpaperItem) => {
                const isCurrent = currentWallpaper === item.url
                return (
                  <div
                    key={item.id}
                    onClick={() => setWallpaper(item.url)}
                    className={`group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-200 border ${
                      isCurrent
                        ? 'ring-2 ring-blue-500 border-blue-500 shadow-xl scale-[1.01]'
                        : 'border-black/10 dark:border-white/10 hover:border-blue-500/50 hover:shadow-lg'
                    }`}
                  >
                    {/* Wallpaper Preview Image */}
                    <div className="aspect-[16/10] w-full bg-slate-900 overflow-hidden relative">
                      <img
                        src={item.thumbnail}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />

                      {/* Active Checkmark Badge */}
                      {isCurrent && (
                        <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full bg-blue-600 text-white text-[11px] font-semibold flex items-center gap-1 shadow-md">
                          <Check className="w-3 h-3 stroke-[3]" />
                          <span>Active</span>
                        </div>
                      )}

                      {/* Hover Overlay Button */}
                      {!isCurrent && (
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button
                            type="button"
                            className="px-3.5 py-1.5 rounded-lg bg-white/90 text-slate-900 text-xs font-semibold shadow-md flex items-center gap-1.5 hover:bg-white active:scale-95 transition-all"
                          >
                            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                            Apply Wallpaper
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Card Footer Info */}
                    <div className="p-3 bg-white dark:bg-[#1a1b22] flex items-center justify-between border-t border-black/5 dark:border-white/5">
                      <div>
                        <h4 className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                          {item.name}
                        </h4>
                        <span className="text-[10px] text-slate-500 font-medium">
                          {item.category}
                        </span>
                      </div>
                      <span className="text-[10px] text-blue-500 font-medium">
                        {isCurrent ? 'Current' : 'Select'}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Footer info bar */}
        <footer className="h-6 px-3 border-t border-black/5 dark:border-white/10 flex items-center justify-between text-[11px] text-slate-400 bg-white/30 dark:bg-[#18191f]/40">
          <span>{filteredWallpapers.length} Wallpapers Available</span>
          <span>Changes persist while you browse</span>
        </footer>
      </div>
    </div>
  )
}
