import React from 'react'

interface MacBookBezelProps {
  children: React.ReactNode
}

export const MacBookBezel: React.FC<MacBookBezelProps> = ({ children }) => {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-2 sm:p-4 md:p-6 lg:p-8 select-none">
      {/* MacBook Screen Outer Shell (Display Lid) */}
      <div className="relative w-full max-w-[1560px] h-[92vh] min-h-[580px] max-h-[960px] bg-[#0c0d10] rounded-[24px] p-[10px] sm:p-[12px] shadow-[0_25px_70px_rgba(0,0,0,0.8),0_10px_30px_rgba(0,0,0,0.6)] border border-[#30333a] flex flex-col">
        {/* Subtle bezel reflection highlight */}
        <div className="absolute inset-0 rounded-[24px] pointer-events-none border border-white/10" />

        {/* Display Screen */}
        <div className="relative w-full h-full rounded-[14px] overflow-hidden bg-black flex flex-col">
          {/* Top Camera Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 z-50 w-32 h-[22px] bg-black rounded-b-xl flex items-center justify-center shadow-md">
            <div className="flex items-center gap-2.5">
              {/* Camera Lens */}
              <div className="w-2.5 h-2.5 rounded-full bg-[#0a1220] border border-[#1b2538] flex items-center justify-center shadow-inner">
                <div className="w-1 h-1 rounded-full bg-[#183358]" />
              </div>
              {/* Green indicator LED (subtle glow) */}
              <div className="w-1 h-1 rounded-full bg-emerald-500/70 shadow-[0_0_4px_#10b981]" />
            </div>
          </div>

          {/* Screen Content (Desktop) */}
          <div className="relative w-full h-full flex flex-col">
            {children}
          </div>
        </div>

        {/* Bottom Aluminum Hinge / Chin */}
        <div className="relative w-full h-[14px] flex items-center justify-center mt-[4px]">
          <div className="w-44 h-[4px] bg-[#2a2c32] rounded-full opacity-60" />
        </div>
      </div>

      {/* MacBook Bottom Base / Lip Reflection */}
      <div className="w-[102%] max-w-[1600px] h-3 bg-gradient-to-b from-[#22242b] to-[#121316] rounded-b-2xl shadow-2xl border-t border-white/5" />
    </div>
  )
}
