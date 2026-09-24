import { useState } from 'react'
import { projects } from '../../../data/projects'
import {
  Image as ImageIcon,
  Grid,
  Heart,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'

interface GalleryItem {
  id: string
  url: string
  title: string
  category: string
  projectTitle: string
}

export const Photos = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null)
  const [activeTab, setActiveTab] = useState<'all' | 'favorites'>('all')
  const [favorites, setFavorites] = useState<string[]>([])

  // Flatten all project screenshots into a gallery
  const allPhotos: GalleryItem[] = projects.flatMap((p) =>
    (p.screenshots?.length > 0 ? p.screenshots : [p.thumbnail]).map((url, i) => ({
      id: `${p.id}-${i}`,
      url,
      title: `${p.title} Preview ${i + 1}`,
      category: p.category || 'Architecture',
      projectTitle: p.title,
    }))
  )

  const displayedPhotos =
    activeTab === 'favorites'
      ? allPhotos.filter((photo) => favorites.includes(photo.id))
      : allPhotos

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  const navigatePhoto = (direction: 'next' | 'prev') => {
    if (!selectedPhoto) return
    const currentIndex = displayedPhotos.findIndex((p) => p.id === selectedPhoto.id)
    if (currentIndex === -1) return

    const newIndex =
      direction === 'next'
        ? (currentIndex + 1) % displayedPhotos.length
        : (currentIndex - 1 + displayedPhotos.length) % displayedPhotos.length

    setSelectedPhoto(displayedPhotos[newIndex])
  }

  return (
    <div className="flex-1 flex overflow-hidden text-slate-800 dark:text-slate-100 select-none">
      {/* Photos Sidebar */}
      <aside className="w-44 bg-slate-100/70 dark:bg-[#1a1b20]/80 border-r border-black/5 dark:border-white/10 p-3 flex flex-col gap-4 text-xs font-medium shrink-0 hidden sm:flex">
        <div>
          <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-2">
            Photos
          </span>
          <div className="mt-1 space-y-0.5">
            <button
              onClick={() => setActiveTab('all')}
              className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left transition-colors ${
                activeTab === 'all'
                  ? 'bg-blue-600 text-white font-semibold'
                  : 'hover:bg-black/5 dark:hover:bg-white/5 text-slate-700 dark:text-slate-300'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>Library ({allPhotos.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('favorites')}
              className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left transition-colors ${
                activeTab === 'favorites'
                  ? 'bg-blue-600 text-white font-semibold'
                  : 'hover:bg-black/5 dark:hover:bg-white/5 text-slate-700 dark:text-slate-300'
              }`}
            >
              <Heart className="w-3.5 h-3.5" />
              <span>Favorites ({favorites.length})</span>
            </button>
          </div>
        </div>

        <div>
          <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-2">
            Projects
          </span>
          <div className="mt-1 space-y-0.5">
            {projects.map((p) => (
              <div
                key={p.id}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-slate-600 dark:text-slate-400 truncate"
              >
                <ImageIcon className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                <span className="truncate">{p.title}</span>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Grid Area */}
      <div className="flex-1 flex flex-col overflow-hidden bg-white/50 dark:bg-[#16171d]/60">
        {/* Photos Header Toolbar */}
        <header className="h-10 px-4 border-b border-black/5 dark:border-white/10 flex items-center justify-between text-xs bg-white/40 dark:bg-[#1f2026]/40 backdrop-blur-md">
          <div className="font-semibold text-slate-900 dark:text-white">
            {activeTab === 'all' ? 'All Visuals' : 'Favorite Works'}
          </div>
          <span className="text-slate-400 font-mono text-[11px]">
            {displayedPhotos.length} Photos
          </span>
        </header>

        {/* Photos Grid */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5">
          {displayedPhotos.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-slate-400">
              <Heart className="w-8 h-8 opacity-40 mb-2" />
              <p className="text-sm font-medium">No favorite photos yet</p>
              <p className="text-xs text-slate-500 mt-0.5">Hover over any photo to tap the heart icon</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {displayedPhotos.map((photo) => {
                const isFav = favorites.includes(photo.id)
                return (
                  <div
                    key={photo.id}
                    onClick={() => setSelectedPhoto(photo)}
                    className="group relative aspect-video rounded-xl overflow-hidden bg-slate-900 cursor-pointer border border-black/5 dark:border-white/10 shadow-sm hover:shadow-lg transition-all"
                  >
                    <img
                      src={photo.url}
                      alt={photo.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />

                    {/* Gradient Overlay & Details */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2.5">
                      <div className="flex justify-end">
                        <button
                          onClick={(e) => toggleFavorite(photo.id, e)}
                          className={`p-1.5 rounded-full backdrop-blur-md transition-colors ${
                            isFav ? 'bg-rose-500 text-white' : 'bg-black/40 text-white/80 hover:text-white'
                          }`}
                        >
                          <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-current' : ''}`} />
                        </button>
                      </div>

                      <div className="text-white">
                        <p className="text-xs font-semibold leading-tight drop-shadow">{photo.projectTitle}</p>
                        <p className="text-[10px] text-white/70">{photo.category}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Lightbox / Expanded View Modal */}
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          className="absolute inset-0 z-50 bg-black/90 backdrop-blur-xl flex flex-col items-center justify-center p-4 sm:p-8 animate-in fade-in duration-150"
        >
          {/* Top Lightbox Controls */}
          <div className="w-full flex items-center justify-between text-white/80 pb-4 max-w-4xl">
            <div>
              <h3 className="font-semibold text-sm text-white">{selectedPhoto.projectTitle}</h3>
              <p className="text-xs text-white/60">{selectedPhoto.category}</p>
            </div>
            <button
              onClick={() => setSelectedPhoto(null)}
              className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main Image View */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full max-h-[75vh] flex items-center justify-center rounded-2xl overflow-hidden bg-black/40 border border-white/10 shadow-2xl"
          >
            <img
              src={selectedPhoto.url}
              alt={selectedPhoto.title}
              className="max-h-[75vh] w-auto object-contain"
            />

            {/* Left / Right Navigation */}
            <button
              onClick={() => navigatePhoto('prev')}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 backdrop-blur-sm transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => navigatePhoto('next')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 backdrop-blur-sm transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
