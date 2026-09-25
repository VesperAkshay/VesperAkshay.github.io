import { create } from 'zustand'

export interface WindowState {
  id: string
  isOpen: boolean
  isMinimized: boolean
  isMaximized?: boolean
  zIndex: number
  position: { x: number; y: number }
  size: { width: number; height: number }
}

export interface WindowStore {
  windows: Record<string, WindowState>
  focusedId: string | null
  open: (id: string, initialConfig?: Partial<WindowState>) => void
  close: (id: string) => void
  closeAll: () => void
  minimize: (id: string) => void
  restoreAll: () => void
  toggleMaximize: (id: string) => void
  focus: (id: string) => void
  centerWindow: (id: string) => void
  cascadeWindows: () => void
  updatePosition: (id: string, pos: { x: number; y: number }) => void
  updateSize: (id: string, size: { width: number; height: number }) => void
}

const DEFAULT_WINDOWS: Record<string, Partial<WindowState>> = {
  finder: {
    position: { x: 80, y: 40 },
    size: { width: 720, height: 480 },
  },
  about: {
    position: { x: 140, y: 70 },
    size: { width: 680, height: 460 },
  },
  terminal: {
    position: { x: 200, y: 100 },
    size: { width: 600, height: 380 },
  },
  contact: {
    position: { x: 260, y: 80 },
    size: { width: 520, height: 440 },
  },
  photos: {
    position: { x: 180, y: 60 },
    size: { width: 740, height: 490 },
  },
  preview: {
    position: { x: 220, y: 50 },
    size: { width: 640, height: 520 },
  },
  safari: {
    position: { x: 160, y: 60 },
    size: { width: 780, height: 500 },
  },
  wallpapers: {
    position: { x: 170, y: 45 },
    size: { width: 840, height: 540 },
  },
  game2048: {
    position: { x: 200, y: 40 },
    size: { width: 440, height: 630 },
  },
}

export const useWindowStore = create<WindowStore>((set, get) => ({
  windows: {},
  focusedId: null,

  open: (id, initialConfig) => {
    const { windows, focus } = get()
    const current = windows[id]
    const def = DEFAULT_WINDOWS[id] || {
      position: { x: 100 + Object.keys(windows).length * 30, y: 60 + Object.keys(windows).length * 25 },
      size: { width: 650, height: 450 },
    }

    const maxZ = Math.max(0, ...Object.values(windows).map((w) => w.zIndex || 0))

    set({
      windows: {
        ...windows,
        [id]: {
          id,
          isOpen: true,
          isMinimized: false,
          isMaximized: current?.isMaximized || false,
          zIndex: maxZ + 1,
          position: current?.position || initialConfig?.position || def.position || { x: 100, y: 60 },
          size: current?.size || initialConfig?.size || def.size || { width: 650, height: 450 },
          ...initialConfig,
        },
      },
      focusedId: id,
    })
    focus(id)
  },

  close: (id) => {
    const { windows, focusedId } = get()
    if (!windows[id]) return

    const updatedWindows = {
      ...windows,
      [id]: {
        ...windows[id],
        isOpen: false,
        isMinimized: false,
      },
    }

    let nextFocusedId = focusedId === id ? null : focusedId
    if (nextFocusedId === null) {
      // Find open, non-minimized window with highest z-index
      const activeWindows = Object.values(updatedWindows).filter(
        (w) => w.isOpen && !w.isMinimized
      )
      if (activeWindows.length > 0) {
        activeWindows.sort((a, b) => b.zIndex - a.zIndex)
        nextFocusedId = activeWindows[0].id
      }
    }

    set({
      windows: updatedWindows,
      focusedId: nextFocusedId,
    })
  },

  closeAll: () => {
    const { windows } = get()
    const updated = { ...windows }
    Object.keys(updated).forEach((id) => {
      updated[id] = { ...updated[id], isOpen: false, isMinimized: false }
    })
    set({ windows: updated, focusedId: null })
  },

  restoreAll: () => {
    const { windows } = get()
    const updated = { ...windows }
    let lastId: string | null = null
    Object.keys(updated).forEach((id) => {
      if (updated[id].isOpen) {
        updated[id] = { ...updated[id], isMinimized: false }
        lastId = id
      }
    })
    set({ windows: updated, focusedId: lastId })
  },

  centerWindow: (id) => {
    const { windows } = get()
    const target = windows[id]
    if (!target) return
    const screenW = typeof window !== 'undefined' ? window.innerWidth : 1200
    const screenH = typeof window !== 'undefined' ? window.innerHeight : 800
    const posX = Math.max(20, (screenW - target.size.width) / 2)
    const posY = Math.max(30, (screenH - target.size.height) / 2)
    set({
      windows: {
        ...windows,
        [id]: {
          ...target,
          position: { x: posX, y: posY },
          isMaximized: false,
        },
      },
    })
  },

  cascadeWindows: () => {
    const { windows } = get()
    const updated = { ...windows }
    const active = Object.values(updated).filter((w) => w.isOpen && !w.isMinimized)
    active.forEach((win, index) => {
      updated[win.id] = {
        ...win,
        position: { x: 70 + index * 36, y: 35 + index * 30 },
        isMaximized: false,
      }
    })
    set({ windows: updated })
  },

  minimize: (id) => {
    const { windows, focusedId } = get()
    if (!windows[id]) return

    const updatedWindows = {
      ...windows,
      [id]: {
        ...windows[id],
        isMinimized: true,
      },
    }

    let nextFocusedId = focusedId === id ? null : focusedId
    if (nextFocusedId === null) {
      const activeWindows = Object.values(updatedWindows).filter(
        (w) => w.isOpen && !w.isMinimized
      )
      if (activeWindows.length > 0) {
        activeWindows.sort((a, b) => b.zIndex - a.zIndex)
        nextFocusedId = activeWindows[0].id
      }
    }

    set({
      windows: updatedWindows,
      focusedId: nextFocusedId,
    })
  },

  toggleMaximize: (id) => {
    const { windows } = get()
    if (!windows[id]) return

    set({
      windows: {
        ...windows,
        [id]: {
          ...windows[id],
          isMaximized: !windows[id].isMaximized,
        },
      },
    })
  },

  focus: (id) => {
    const { windows } = get()
    const target = windows[id]
    if (!target) return

    const maxZ = Math.max(0, ...Object.values(windows).map((w) => w.zIndex || 0))

    set({
      windows: {
        ...windows,
        [id]: {
          ...target,
          zIndex: maxZ + 1,
        },
      },
      focusedId: id,
    })
  },

  updatePosition: (id, pos) => {
    const { windows } = get()
    if (!windows[id]) return

    set({
      windows: {
        ...windows,
        [id]: {
          ...windows[id],
          position: pos,
        },
      },
    })
  },

  updateSize: (id, size) => {
    const { windows } = get()
    if (!windows[id]) return

    set({
      windows: {
        ...windows,
        [id]: {
          ...windows[id],
          size,
        },
      },
    })
  },
}))
