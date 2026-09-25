import { create } from 'zustand'
import { useWallpaperStore } from './wallpaperStore'

export type OSType = 'macos' | 'windows' | 'linux' | 'android'

export interface OSConfig {
  id: OSType
  name: string
  subname: string
  version: string
  symbol: string
  defaultWallpaper: string
}

export const OS_CONFIGS: Record<OSType, OSConfig> = {
  macos: {
    id: 'macos',
    name: 'macOS',
    subname: 'Sequoia',
    version: '15.1',
    symbol: '🍎',
    defaultWallpaper: '/wallpapers/sequoia-dark.jpg',
  },
  windows: {
    id: 'windows',
    name: 'Windows',
    subname: '11 Pro',
    version: '24H2',
    symbol: '🪟',
    defaultWallpaper: '/wallpapers/windows-bloom.jpg',
  },
  linux: {
    id: 'linux',
    name: 'Ubuntu Linux',
    subname: 'Noble Numbat',
    version: '24.04 LTS',
    symbol: '🐧',
    defaultWallpaper: '/wallpapers/ubuntu-aubergine.jpg',
  },
  android: {
    id: 'android',
    name: 'Android',
    subname: 'Material You',
    version: '15',
    symbol: '🤖',
    defaultWallpaper: '/wallpapers/android-material.png',
  },
}

interface OSStore {
  currentOS: OSType
  isDrawerOpen: boolean
  isStartMenuOpen: boolean
  setOS: (os: OSType, changeWallpaper?: boolean) => void
  toggleDrawer: () => void
  openDrawer: () => void
  closeDrawer: () => void
  toggleStartMenu: () => void
  closeStartMenu: () => void
}

export const useOSStore = create<OSStore>((set) => {
  const getInitialOS = (): OSType => {
    if (typeof window === 'undefined') return 'macos'
    const saved = sessionStorage.getItem('active-os') as OSType | null
    if (saved && (saved === 'macos' || saved === 'windows' || saved === 'linux' || saved === 'android')) {
      return saved
    }
    return 'macos'
  }

  return {
    currentOS: getInitialOS(),
    isDrawerOpen: false,
    isStartMenuOpen: false,
    setOS: (os: OSType, changeWallpaper: boolean = true) => {
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('active-os', os)
      }
      if (changeWallpaper) {
        const config = OS_CONFIGS[os]
        if (config?.defaultWallpaper) {
          useWallpaperStore.getState().setWallpaper(config.defaultWallpaper)
        }
      }
      set({ currentOS: os, isDrawerOpen: false, isStartMenuOpen: false })
    },
    toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),
    openDrawer: () => set({ isDrawerOpen: true }),
    closeDrawer: () => set({ isDrawerOpen: false }),
    toggleStartMenu: () => set((state) => ({ isStartMenuOpen: !state.isStartMenuOpen })),
    closeStartMenu: () => set({ isStartMenuOpen: false }),
  }
})
