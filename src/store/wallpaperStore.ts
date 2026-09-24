import { create } from 'zustand'

interface WallpaperStore {
  currentWallpaper: string
  setWallpaper: (url: string) => void
}

export const useWallpaperStore = create<WallpaperStore>((set) => ({
  currentWallpaper:
    (typeof window !== 'undefined' && sessionStorage.getItem('active-wallpaper')) ||
    '/wallpapers/sequoia-dark.jpg',
  setWallpaper: (url: string) => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('active-wallpaper', url)
    }
    set({ currentWallpaper: url })
  },
}))
