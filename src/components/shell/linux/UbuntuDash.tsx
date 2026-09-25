import React from 'react'
import { useWindowStore } from '../../../store/windowStore'
import { DOCK_APPS } from '../Dock'
import { LayoutGrid } from 'lucide-react'
import { OSAppIcon } from '../OSAppIcon'
import { getOSAppMeta } from '../../../data/osApps'

export const UbuntuDash: React.FC = () => {
  const windows = useWindowStore((state) => state.windows)
  const focusedId = useWindowStore((state) => state.focusedId)
  const open = useWindowStore((state) => state.open)
  const minimize = useWindowStore((state) => state.minimize)
  const focus = useWindowStore((state) => state.focus)

  const handleAppClick = (id: string) => {
    const win = windows[id]
    if (win?.isOpen && !win.isMinimized && focusedId === id) {
      minimize(id)
    } else if (win?.isOpen && win.isMinimized) {
      open(id)
    } else if (win?.isOpen) {
      focus(id)
    } else {
      open(id)
    }
  }

  return (
    <aside className="fixed left-0 top-7 bottom-0 w-[60px] bg-[#111111]/85 backdrop-blur-md border-r border-white/5 z-[64] flex flex-col items-center py-2 justify-between select-none">
      {/* App Icons List */}
      <div className="flex flex-col items-center gap-2 w-full">
        {DOCK_APPS.map((app) => {
          const win = windows[app.id]
          const isOpen = win?.isOpen ?? false
          const isFocused = isOpen && !win.isMinimized && focusedId === app.id

          return (
            <div key={app.id} className="relative w-full flex items-center justify-center">
              {/* Running orange dash indicator (Left edge) */}
              {isOpen && (
                <div
                  className={`absolute left-0 w-1 rounded-r transition-all ${
                    isFocused ? 'h-6 bg-[#E95420] shadow-[0_0_8px_#e95420]' : 'h-2.5 bg-white/70'
                  }`}
                />
              )}

              <button
                onClick={() => handleAppClick(app.id)}
                className={`p-2 rounded-xl transition-all group ${
                  isFocused
                    ? 'bg-white/20'
                    : isOpen
                    ? 'bg-white/10 hover:bg-white/15'
                    : 'hover:bg-white/10'
                }`}
                title={getOSAppMeta(app.id, 'linux').name}
              >
                <OSAppIcon
                  id={app.id}
                  os="linux"
                  className="w-8 h-8 object-contain group-hover:scale-110 transition-transform drop-shadow"
                />
              </button>
            </div>
          )
        })}
      </div>

      {/* Bottom: Show Applications Button (Ubuntu 9 Dots) */}
      <div className="pt-2 border-t border-white/10 w-full flex flex-col items-center gap-2">
        <button
          onClick={() => useWindowStore.getState().cascadeWindows()}
          className="p-2.5 rounded-xl hover:bg-white/15 text-slate-300 hover:text-white transition-colors"
          title="Show Applications"
        >
          <LayoutGrid className="w-6 h-6 text-white/90" />
        </button>
      </div>
    </aside>
  )
}
