import type { OSType } from '../store/osStore'

export interface OSAppMeta {
  id: string
  name: string
  windowTitle: string
}

export const OS_APP_METADATA: Record<OSType, Record<string, OSAppMeta>> = {
  macos: {
    finder: { id: 'finder', name: 'Finder', windowTitle: 'Finder — Projects' },
    about: { id: 'about', name: 'About Me', windowTitle: 'Notes — About Akshay Patel' },
    terminal: { id: 'terminal', name: 'Terminal', windowTitle: 'Terminal — zsh' },
    contact: { id: 'contact', name: 'Mail', windowTitle: 'Mail — Compose Message' },
    photos: { id: 'photos', name: 'Photos', windowTitle: 'Photos — Visuals & Screenshots' },
    preview: { id: 'preview', name: 'Resume', windowTitle: 'Preview — Resume.pdf' },
    safari: { id: 'safari', name: 'Safari', windowTitle: 'Safari — Deployments' },
    wallpapers: { id: 'wallpapers', name: 'Wallpapers', windowTitle: 'Wallpapers — macOS Gallery' },
    game2048: { id: 'game2048', name: '2048 Dev', windowTitle: '2048 — Dev Evolution' },
  },
  windows: {
    finder: { id: 'finder', name: 'File Explorer', windowTitle: 'File Explorer — Projects' },
    about: { id: 'about', name: 'Notepad', windowTitle: 'Notepad — About Akshay Patel' },
    terminal: { id: 'terminal', name: 'Terminal', windowTitle: 'Windows PowerShell — akshay@portfolio' },
    contact: { id: 'contact', name: 'Outlook', windowTitle: 'Outlook Mail — Contact Akshay' },
    photos: { id: 'photos', name: 'Photos', windowTitle: 'Windows Photos — Gallery' },
    preview: { id: 'preview', name: 'PDF Reader', windowTitle: 'Microsoft Edge PDF — Resume.pdf' },
    safari: { id: 'safari', name: 'Edge', windowTitle: 'Microsoft Edge — Deployments' },
    wallpapers: { id: 'wallpapers', name: 'Settings', windowTitle: 'Settings — Personalization & Themes' },
    game2048: { id: 'game2048', name: 'Xbox Games', windowTitle: 'Xbox Games — 2048 Dev Evolution' },
  },
  linux: {
    finder: { id: 'finder', name: 'Files', windowTitle: 'Files (Nautilus) — Projects' },
    about: { id: 'about', name: 'Text Editor', windowTitle: 'Text Editor (Gedit) — About Me' },
    terminal: { id: 'terminal', name: 'Terminal', windowTitle: 'bash — Terminal' },
    contact: { id: 'contact', name: 'Thunderbird', windowTitle: 'Thunderbird Mail — Compose' },
    photos: { id: 'photos', name: 'Image Viewer', windowTitle: 'Image Viewer (Shotwell)' },
    preview: { id: 'preview', name: 'Document Viewer', windowTitle: 'Document Viewer (Evince) — Resume.pdf' },
    safari: { id: 'safari', name: 'Firefox', windowTitle: 'Firefox Web Browser — Deployments' },
    wallpapers: { id: 'wallpapers', name: 'Appearance', windowTitle: 'Settings — Ubuntu Appearance' },
    game2048: { id: 'game2048', name: 'Games', windowTitle: 'Ubuntu Games — 2048 Dev' },
  },
  android: {
    finder: { id: 'finder', name: 'Files', windowTitle: 'Files by Google — Projects' },
    about: { id: 'about', name: 'Keep Notes', windowTitle: 'Google Keep — About Akshay' },
    terminal: { id: 'terminal', name: 'Termux', windowTitle: 'Termux — Linux Shell' },
    contact: { id: 'contact', name: 'Gmail', windowTitle: 'Gmail — Compose' },
    photos: { id: 'photos', name: 'Photos', windowTitle: 'Google Photos — Library' },
    preview: { id: 'preview', name: 'Drive PDF', windowTitle: 'Google Drive — Resume.pdf' },
    safari: { id: 'safari', name: 'Chrome', windowTitle: 'Google Chrome — Deployments' },
    wallpapers: { id: 'wallpapers', name: 'Wallpaper', windowTitle: 'Wallpaper & Style' },
    game2048: { id: 'game2048', name: 'Play Games', windowTitle: 'Play Games — 2048 Dev' },
  },
}

export function getOSAppMeta(id: string, os: OSType): OSAppMeta {
  const osGroup = OS_APP_METADATA[os] || OS_APP_METADATA.macos
  return osGroup[id] || { id, name: id, windowTitle: id }
}
