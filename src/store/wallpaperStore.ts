import { create } from 'zustand'

interface WallpaperStore {
  currentWallpaper: string
  setWallpaper: (url: string) => void
}

export const useWallpaperStore = create<WallpaperStore>((set) => {
  const getInitialWallpaper = () => {
    if (typeof window === 'undefined') return '/wallpapers/sequoia-dark.jpg'
    const saved = sessionStorage.getItem('active-wallpaper')
    if (saved && saved.startsWith('/wallpapers/')) {
      return saved
    }
    return '/wallpapers/sequoia-dark.jpg'
  }

  return {
    currentWallpaper: getInitialWallpaper(),
    setWallpaper: (url: string) => {
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('active-wallpaper', url)
      }
      set({ currentWallpaper: url })
    },
  }
})
