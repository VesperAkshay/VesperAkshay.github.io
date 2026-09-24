import React, { useRef, useState, useEffect } from 'react'
import { motion, useDragControls } from 'framer-motion'
import { TrafficLights } from './TrafficLights'
import { useWindowStore } from '../../store/windowStore'

export interface WindowProps {
  id: string
  title: string
  icon?: string
  initialPosition?: { x: number; y: number }
  initialSize?: { width: number; height: number }
  minSize?: { width: number; height: number }
  resizable?: boolean
  children: React.ReactNode
}

export const Window: React.FC<WindowProps> = ({
  id,
  title,
  icon,
  initialPosition = { x: 100, y: 50 },
  initialSize = { width: 680, height: 460 },
  minSize = { width: 360, height: 240 },
  resizable = true,
  children,
}) => {
  const windowState = useWindowStore((state) => state.windows[id])
  const focusedId = useWindowStore((state) => state.focusedId)
  const focus = useWindowStore((state) => state.focus)
  const close = useWindowStore((state) => state.close)
  const minimize = useWindowStore((state) => state.minimize)
  const toggleMaximize = useWindowStore((state) => state.toggleMaximize)
  const updatePosition = useWindowStore((state) => state.updatePosition)
  const updateSize = useWindowStore((state) => state.updateSize)

  const isFocused = focusedId === id
  const isOpen = windowState?.isOpen ?? false
  const isMinimized = windowState?.isMinimized ?? false
  const isMaximized = windowState?.isMaximized ?? false
  const zIndex = windowState?.zIndex ?? 10

  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const dragControls = useDragControls()
  const windowRef = useRef<HTMLDivElement>(null)

  // Current size
  const size = windowState?.size || initialSize
  const position = windowState?.position || initialPosition

  // Close on Escape when focused
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFocused && isOpen && !isMinimized) {
        close(id)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isFocused, isOpen, isMinimized, close, id])

  // Handle manual corner resizing
  const handleResizePointerDown = (e: React.PointerEvent) => {
    e.stopPropagation()
    e.preventDefault()
    setIsResizing(true)
    const startX = e.clientX
    const startY = e.clientY
    const startWidth = size.width
    const startHeight = size.height

    const handlePointerMove = (moveEvent: PointerEvent) => {
      const newWidth = Math.max(minSize.width, startWidth + (moveEvent.clientX - startX))
      const newHeight = Math.max(minSize.height, startHeight + (moveEvent.clientY - startY))
      updateSize(id, { width: newWidth, height: newHeight })
    }

    const handlePointerUp = () => {
      setIsResizing(false)
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', handlePointerUp)
    }

    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', handlePointerUp)
  }

  if (!isOpen || isMinimized) {
    return null
  }

  return (
    <motion.div
      ref={windowRef}
      onMouseDown={() => focus(id)}
      drag={!isMaximized}
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      dragElastic={0.05}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={(_, info) => {
        setIsDragging(false)
        updatePosition(id, {
          x: position.x + info.offset.x,
          y: Math.max(0, position.y + info.offset.y),
        })
      }}
      initial={{
        opacity: 0,
        scale: 0.85,
        y: 20,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        scale: 0.85,
        transition: { duration: 0.2 },
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30,
      }}
      style={{
        zIndex,
        position: 'absolute',
        top: isMaximized ? 4 : Math.max(4, Math.min(position.y, (typeof window !== 'undefined' ? window.innerHeight : 900) - 100)),
        left: isMaximized ? 8 : Math.max(4, Math.min(position.x, (typeof window !== 'undefined' ? window.innerWidth : 1200) - 100)),
        width: isMaximized ? 'calc(100% - 16px)' : `${size.width}px`,
        height: isMaximized ? 'calc(100% - 76px)' : `${size.height}px`,
        maxWidth: 'calc(100vw - 16px)',
        maxHeight: 'calc(100vh - 80px)',
        minWidth: `${Math.min(minSize.width, typeof window !== 'undefined' ? window.innerWidth - 20 : 320)}px`,
        minHeight: `${minSize.height}px`,
        willChange: isDragging || isResizing ? 'transform' : 'auto',
      }}
      className={`rounded-window overflow-hidden flex flex-col transition-shadow duration-200 select-none ${
        isFocused
          ? 'shadow-window-focused ring-1 ring-white/20'
          : 'shadow-window opacity-95 ring-1 ring-black/10 dark:ring-white/10'
      }`}
    >
      {/* Frosted Glass Window Header / Title Bar */}
      <div
        onPointerDown={(e) => {
          focus(id)
          if (!isMaximized) {
            dragControls.start(e)
          }
        }}
        onDoubleClick={() => toggleMaximize(id)}
        className={`h-10 px-3.5 flex items-center justify-between cursor-default border-b transition-colors ${
          isFocused
            ? 'bg-white/75 dark:bg-[#222328]/85 border-black/10 dark:border-white/10'
            : 'bg-white/60 dark:bg-[#1a1b1f]/75 border-black/5 dark:border-white/5'
        } backdrop-blur-2xl`}
      >
        {/* Left: Traffic Lights */}
        <div className="flex items-center gap-2 w-20">
          <TrafficLights
            onClose={() => close(id)}
            onMinimize={() => minimize(id)}
            onMaximize={() => toggleMaximize(id)}
            isFocused={isFocused}
          />
        </div>

        {/* Center: Window Title and Icon */}
        <div className="flex items-center gap-2 text-xs font-medium text-slate-800 dark:text-slate-200 truncate">
          {icon && <img src={icon} alt="" className="w-4 h-4 object-contain pointer-events-none" />}
          <span className="truncate">{title}</span>
        </div>

        {/* Right: Balanced Spacer for centering */}
        <div className="w-20" />
      </div>

      {/* Window Body Surface */}
      <div className="relative flex-1 bg-white/90 dark:bg-[#191a20]/95 backdrop-blur-xl text-slate-900 dark:text-slate-100 overflow-hidden flex flex-col">
        {children}
      </div>

      {/* Resize Handle (Bottom-Right Corner) */}
      {resizable && !isMaximized && (
        <div
          onPointerDown={handleResizePointerDown}
          className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize z-50 flex items-end justify-end p-0.5 group"
          title="Resize"
        >
          <svg className="w-2.5 h-2.5 text-slate-400 dark:text-slate-500 opacity-60 group-hover:opacity-100" viewBox="0 0 6 6">
            <line x1="5" y1="1" x2="1" y2="5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
            <line x1="5" y1="3" x2="3" y2="5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
          </svg>
        </div>
      )}
    </motion.div>
  )
}
