import { useMotionValue } from 'framer-motion'
import { DockIcon } from './DockIcon'
import type { DockItemData } from './DockIcon'
import { useWindowStore } from '../../store/windowStore'
import { profile } from '../../data/profile'

export const DOCK_APPS: Omit<DockItemData, 'isOpen'>[] = [
  { id: 'finder', name: 'Finder', icon: '/icons/finder.svg' },
  { id: 'about', name: 'About Me', icon: '/icons/notes.svg' },
  { id: 'terminal', name: 'Terminal', icon: '/icons/terminal.svg' },
  { id: 'contact', name: 'Mail', icon: '/icons/mail.svg' },
  { id: 'photos', name: 'Photos', icon: '/icons/photos.svg' },
  { id: 'preview', name: 'Resume', icon: '/icons/preview.svg' },
  { id: 'safari', name: 'Safari', icon: '/icons/safari.svg' },
  { id: 'wallpapers', name: 'Wallpapers', icon: '/icons/wallpapers.svg' },
]

export const DOCK_SOCIALS: DockItemData[] = [
  {
    id: 'github',
    name: 'GitHub Profile',
    icon: '/icons/github.svg',
    isExternal: true,
    url: profile.socials.find((s) => s.label.toLowerCase().includes('github'))?.url || 'https://github.com',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn Profile',
    icon: '/icons/linkedin.svg',
    isExternal: true,
    url: profile.socials.find((s) => s.label.toLowerCase().includes('linkedin'))?.url || 'https://linkedin.com',
  },
  {
    id: 'x',
    name: 'X (Twitter)',
    icon: '/icons/x.svg',
    isExternal: true,
    url: profile.socials.find((s) => s.label.toLowerCase().includes('twitter') || s.label.toLowerCase().includes('x'))?.url || 'https://x.com',
  },
]

export const Dock = () => {
  const mouseX = useMotionValue(Infinity)
  const windows = useWindowStore((state) => state.windows)
  const open = useWindowStore((state) => state.open)
  const minimize = useWindowStore((state) => state.minimize)
  const focusedId = useWindowStore((state) => state.focusedId)

  const handleAppClick = (id: string) => {
    const win = windows[id]
    if (win?.isOpen && !win.isMinimized && focusedId === id) {
      minimize(id)
    } else {
      open(id)
    }
  }

  const handleSocialClick = (id: string) => {
    const social = DOCK_SOCIALS.find((s) => s.id === id)
    if (social?.url) {
      window.open(social.url, '_blank', 'noopener,noreferrer')
    }
  }

  const appItems: DockItemData[] = DOCK_APPS.map((app) => ({
    ...app,
    isOpen: windows[app.id]?.isOpen && !windows[app.id]?.isMinimized,
  }))

  return (
    <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-40">
      <nav
        aria-label="Application Dock"
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="flex items-end gap-2 px-3 py-1.5 rounded-[22px] bg-white/20 dark:bg-[#14151b]/45 backdrop-blur-3xl border border-white/25 dark:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.08)] select-none transition-all"
      >
        {/* App Icons */}
        {appItems.map((item) => (
          <DockIcon
            key={item.id}
            item={item}
            mouseX={mouseX}
            onClick={handleAppClick}
          />
        ))}

        {/* Vertical Divider */}
        <div className="w-[1px] h-10 bg-white/25 dark:bg-white/15 mx-1 mb-2.5 rounded-full shrink-0" />

        {/* Social Icons in Dock */}
        {DOCK_SOCIALS.map((social) => (
          <DockIcon
            key={social.id}
            item={social}
            mouseX={mouseX}
            onClick={handleSocialClick}
          />
        ))}
      </nav>
    </div>
  )
}
