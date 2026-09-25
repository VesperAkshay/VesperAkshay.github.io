import React, { useState, useEffect } from 'react'
import { Wifi, Battery, MessageSquare, Mail } from 'lucide-react'

export const AndroidStatusBar: React.FC = () => {
  const [timeStr, setTimeStr] = useState('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setTimeStr(
        now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: false })
      )
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 h-6 bg-transparent z-[65] flex items-center justify-between px-4 text-white text-[11px] font-sans font-medium select-none pointer-events-none drop-shadow">
      {/* Left: Time & notification icons */}
      <div className="flex items-center gap-2">
        <span className="font-semibold tracking-tight">{timeStr}</span>
        <div className="flex items-center gap-1.5 opacity-80 pl-1">
          <Mail className="w-3 h-3" />
          <MessageSquare className="w-3 h-3" />
        </div>
      </div>

      {/* Right: 5G, Wi-Fi, Battery */}
      <div className="flex items-center gap-2">
        <span className="text-[10px] font-bold tracking-widest text-emerald-400">5G</span>
        <Wifi className="w-3.5 h-3.5" />
        <div className="flex items-center gap-1">
          <span className="text-[10px]">98%</span>
          <Battery className="w-3.5 h-3.5" />
        </div>
      </div>
    </header>
  )
}
