import React, { useState, useEffect } from 'react'
import { useWindowStore } from '../../../store/windowStore'
import { getOSAppMeta } from '../../../data/osApps'
import { Wifi, Volume2, Battery, Power } from 'lucide-react'

export const UbuntuTopBar: React.FC = () => {
  const focusedId = useWindowStore((state) => state.focusedId)
  const cascadeWindows = useWindowStore((state) => state.cascadeWindows)
  const [timeStr, setTimeStr] = useState('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const formatted = now.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      }) + ' ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
      setTimeStr(formatted)
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  const activeAppName = focusedId ? getOSAppMeta(focusedId, 'linux').name : 'Ubuntu Desktop'

  return (
    <header className="fixed top-0 left-0 right-0 h-7 bg-[#111111]/95 text-[#dfdbd2] border-b border-black/40 z-[65] flex items-center justify-between px-3 text-xs select-none font-sans font-medium tracking-tight shadow-md">
      {/* Left: Activities & Active App */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => cascadeWindows()}
          className="px-2.5 py-0.5 rounded hover:bg-white/10 active:bg-[#e95420] text-white transition-colors"
          title="Activities Overview"
        >
          Activities
        </button>

        <span className="text-white/40">|</span>

        <span className="text-white font-semibold truncate max-w-[180px]">
          {activeAppName}
        </span>
      </div>

      {/* Center: Live Clock & Date */}
      <div className="absolute left-1/2 -translate-x-1/2 px-3 py-0.5 rounded hover:bg-white/10 cursor-pointer text-white font-medium transition-colors">
        {timeStr}
      </div>

      {/* Right: System Indicators (Yaru Quick Settings) */}
      <div className="flex items-center gap-1">
        <div className="flex items-center gap-2 px-2.5 py-0.5 rounded-full hover:bg-white/10 cursor-pointer transition-colors text-white">
          <Wifi className="w-3.5 h-3.5" />
          <Volume2 className="w-3.5 h-3.5" />
          <Battery className="w-3.5 h-3.5" />
          <Power className="w-3.5 h-3.5 text-white/80" />
        </div>
      </div>
    </header>
  )
}
