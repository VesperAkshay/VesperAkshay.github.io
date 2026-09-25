import React, { useState } from 'react'

interface TrafficLightsProps {
  onClose?: () => void
  onMinimize?: () => void
  onMaximize?: () => void
  isFocused?: boolean
}

export const TrafficLights: React.FC<TrafficLightsProps> = ({
  onClose,
  onMinimize,
  onMaximize,
  isFocused = true,
}) => {
  const [isGroupHovered, setIsGroupHovered] = useState(false)

  return (
    <div
      data-no-drag
      className="flex items-center gap-2 px-1 py-1 pointer-events-auto"
      onPointerDown={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
      onDoubleClick={(e) => e.stopPropagation()}
      onMouseEnter={() => setIsGroupHovered(true)}
      onMouseLeave={() => setIsGroupHovered(false)}
    >
      {/* Close button (Red) */}
      <button
        type="button"
        onPointerDown={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
        onClick={(e) => {
          e.stopPropagation()
          onClose?.()
        }}
        aria-label="Close window"
        className={`w-3 h-3 rounded-full flex items-center justify-center transition-all cursor-pointer ${
          isFocused
            ? 'bg-[#FF5F56] border border-[#E0443E]'
            : 'bg-[#FF5F56]/60 border border-[#E0443E]/40'
        }`}
      >
        {isGroupHovered && (
          <svg className="w-1.5 h-1.5 text-[#4D0000] pointer-events-none" viewBox="0 0 6 6" fill="none">
            <path d="M1 1L5 5M5 1L1 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        )}
      </button>

      {/* Minimize button (Yellow) */}
      <button
        type="button"
        onPointerDown={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
        onClick={(e) => {
          e.stopPropagation()
          onMinimize?.()
        }}
        aria-label="Minimize window"
        className={`w-3 h-3 rounded-full flex items-center justify-center transition-all cursor-pointer ${
          isFocused
            ? 'bg-[#FFBD2E] border border-[#DEA123]'
            : 'bg-[#FFBD2E]/60 border border-[#DEA123]/40'
        }`}
      >
        {isGroupHovered && (
          <svg className="w-1.5 h-1.5 text-[#593D00] pointer-events-none" viewBox="0 0 6 6" fill="none">
            <path d="M1 3H5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        )}
      </button>

      {/* Maximize / Zoom button (Green) */}
      <button
        type="button"
        onPointerDown={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
        onClick={(e) => {
          e.stopPropagation()
          onMaximize?.()
        }}
        aria-label="Maximize window"
        className={`w-3 h-3 rounded-full flex items-center justify-center transition-all cursor-pointer ${
          isFocused
            ? 'bg-[#27C93F] border border-[#1AAB29]'
            : 'bg-[#27C93F]/60 border border-[#1AAB29]/40'
        }`}
      >
        {isGroupHovered && (
          <svg className="w-1.5 h-1.5 text-[#004D00] pointer-events-none" viewBox="0 0 6 6" fill="none">
            <path d="M1.5 4.5L4.5 1.5M1.5 1.5H3.5M4.5 4.5H2.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
          </svg>
        )}
      </button>
    </div>
  )
}
