import React, { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
  const isDraggingRef = useRef(false)
  const windowRef = useRef<HTMLDivElement>(null)
  const lastActionRef = useRef<'open' | 'close' | 'minimize'>('open')

  // Current size and position
  const size = windowState?.size || initialSize
  const position = windowState?.position || initialPosition

  // Smooth position tracking
  const [currentPos, setCurrentPos] = useState(position)
  const dragStartRef = useRef({ mouseX: 0, mouseY: 0, posX: 0, posY: 0 })

  // Synchronize local position with store when not dragging
  useEffect(() => {
    if (!isDraggingRef.current) {
      setCurrentPos(position)
    }
  }, [position])

  const handleClose = () => {
    lastActionRef.current = 'close'
    close(id)
  }

  const handleMinimize = () => {
    lastActionRef.current = 'minimize'
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('dock-icon-absorb', { detail: { id, action: 'minimize' } }))
    }
    minimize(id)
  }

  // Listen for absorb events to keep lastActionRef in sync
  useEffect(() => {
    const handleAbsorb = (e: Event) => {
      const customEvent = e as CustomEvent<{ id: string; action: 'minimize' | 'open' | 'close' }>
      if (customEvent.detail && customEvent.detail.id === id) {
        if (customEvent.detail.action === 'minimize') {
          lastActionRef.current = 'minimize'
        } else if (customEvent.detail.action === 'close') {
          lastActionRef.current = 'close'
        }
      }
    }
    window.addEventListener('dock-icon-absorb', handleAbsorb)
    return () => window.removeEventListener('dock-icon-absorb', handleAbsorb)
  }, [id])

  // Close on Escape when focused
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFocused && isOpen && !isMinimized) {
        handleClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isFocused, isOpen, isMinimized])

  // Native pointer-capture window dragging for 100% fluid 120fps tracking
  const handleTitlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0 || isMaximized) return
    focus(id)

    e.currentTarget.setPointerCapture(e.pointerId)
    isDraggingRef.current = true
    setIsDragging(true)

    dragStartRef.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      posX: currentPos.x,
      posY: currentPos.y,
    }
  }

  const handleTitlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return

    const dx = e.clientX - dragStartRef.current.mouseX
    const dy = e.clientY - dragStartRef.current.mouseY

    const maxX = typeof window !== 'undefined' ? window.innerWidth - 100 : 1200
    const maxY = typeof window !== 'undefined' ? window.innerHeight - 80 : 900

    const newX = Math.max(-(size.width - 120), Math.min(maxX, dragStartRef.current.posX + dx))
    const newY = Math.max(4, Math.min(maxY, dragStartRef.current.posY + dy))

    setCurrentPos({ x: newX, y: newY })
  }

  const handleTitlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return

    try {
      e.currentTarget.releasePointerCapture(e.pointerId)
    } catch {
      // ignore
    }

    isDraggingRef.current = false
    setIsDragging(false)
    updatePosition(id, currentPos)
  }

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

  // Calculate delta vector from current window bottom anchor to its specific Dock icon center
  const getDockTargetOffset = () => {
    if (typeof window === 'undefined') {
      return { x: 0, y: 320, pinchX: 50, skewAngle: 0 }
    }

    const iconEl = document.getElementById(`dock-icon-${id}`)
    const dockRect = iconEl?.getBoundingClientRect()

    const winW = isMaximized ? window.innerWidth - 16 : size.width
    const winH = isMaximized ? window.innerHeight - 76 : size.height
    const winX = isMaximized ? 8 : currentPos.x
    const winY = isMaximized ? 4 : currentPos.y

    // Precise Dock icon suction point: center of the icon squircle
    const dockCenterX = dockRect ? dockRect.left + dockRect.width / 2 : window.innerWidth / 2
    const dockCenterY = dockRect ? dockRect.top + dockRect.height * 0.45 : window.innerHeight - 45

    // Relative percentage of the icon along the window's horizontal span
    const relativeXPercent = ((dockCenterX - winX) / Math.max(1, winW)) * 100
    const pinchX = Math.max(12, Math.min(88, relativeXPercent))

    // The bottom anchor point on the window where transformOrigin is pinned
    const anchorX = winX + (winW * pinchX) / 100
    const anchorY = winY + winH

    // Translation needed so the bottom anchor point lands precisely on the dock icon center
    const targetDeltaX = dockCenterX - anchorX
    const targetDeltaY = dockCenterY - anchorY

    // Curved skew angle towards the dock icon suction point
    const horizontalDiff = dockCenterX - (winX + winW / 2)
    const skewAngle = Math.max(-10, Math.min(10, horizontalDiff / 65))

    return {
      x: targetDeltaX,
      y: targetDeltaY,
      pinchX,
      skewAngle,
    }
  }

  const { x: targetX, y: targetY, pinchX, skewAngle } = getDockTargetOffset()

  // 8-point polygon keyframes for the authentic macOS liquid genie vacuum & spit-out animation
  // State 1: Full rectangular window (0% clipping)
  const clipRect = 'polygon(0% 0%, 100% 0%, 100% 32%, 100% 68%, 100% 100%, 0% 100%, 0% 68%, 0% 32%)'
  
  // State 2: Mid-suction genie funnel (fabric pulling down into a narrow neck)
  const clipFunnelMid = `polygon(2% 0%, 98% 0%, 93% 32%, ${Math.min(96, pinchX + 24)}% 68%, ${Math.min(96, pinchX + 9)}% 100%, ${Math.max(4, pinchX - 9)}% 100%, ${Math.max(4, pinchX - 24)}% 68%, 7% 32%)`
  
  // State 3: Swallowed inside the dock icon squircle (needle-thin suction nozzle)
  const clipSwallowed = `polygon(38% 0%, 62% 0%, ${Math.min(94, pinchX + 16)}% 32%, ${Math.min(94, pinchX + 6)}% 68%, ${Math.min(94, pinchX + 1.5)}% 100%, ${Math.max(6, pinchX - 1.5)}% 100%, ${Math.max(6, pinchX - 6)}% 68%, ${Math.max(6, pinchX - 16)}% 32%)`

  // macOS Genie / Liquid Vacuum Suck & Spit-Out Animation
  const windowVariants = {
    hidden: {
      x: targetX,
      y: targetY,
      scaleX: 0.01,
      scaleY: 0.01,
      skewX: skewAngle * 0.4,
      opacity: 0,
      clipPath: clipSwallowed,
    },
    visible: {
      x: 0,
      y: 0,
      scaleX: 1,
      scaleY: 1,
      skewX: 0,
      opacity: 1,
      clipPath: clipRect,
      transition: {
        x: { type: 'spring' as const, stiffness: 290, damping: 25, mass: 0.8 },
        y: { type: 'spring' as const, stiffness: 290, damping: 25, mass: 0.8 },
        scaleX: { type: 'spring' as const, stiffness: 310, damping: 24, mass: 0.75 },
        scaleY: { type: 'spring' as const, stiffness: 270, damping: 23, mass: 0.85 },
        skewX: { type: 'spring' as const, stiffness: 280, damping: 24 },
        clipPath: { duration: 0.38, ease: [0.22, 1, 0.36, 1] as const },
        opacity: { duration: 0.22 },
      },
    },
    exit: lastActionRef.current === 'close'
      ? {
          x: 0,
          y: 10,
          scaleX: 0.88,
          scaleY: 0.88,
          skewX: 0,
          opacity: 0,
          clipPath: clipRect,
          transition: {
            duration: 0.18,
            ease: [0.25, 0.1, 0.25, 1] as const,
          },
        }
      : {
          x: [0, targetX * 0.42, targetX],
          y: [0, targetY * 0.52, targetY],
          scaleX: [1, 0.42, 0.01],
          scaleY: [1, 0.76, 0.01],
          skewX: [0, skewAngle, skewAngle * 0.4],
          opacity: [1, 0.98, 0],
          clipPath: [clipRect, clipFunnelMid, clipSwallowed],
          transition: {
            duration: 0.38,
            times: [0, 0.48, 1],
            ease: [0.25, 0.1, 0.25, 1] as const,
          },
        },
  }

  return (
    <AnimatePresence>
      {isOpen && !isMinimized && (
        <motion.div
          key={`window-${id}`}
          ref={windowRef}
          onMouseDown={() => focus(id)}
          variants={windowVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          style={{
            zIndex,
            position: 'absolute',
            top: isMaximized ? 4 : currentPos.y,
            left: isMaximized ? 8 : currentPos.x,
            width: isMaximized ? 'calc(100% - 16px)' : `${size.width}px`,
            height: isMaximized ? 'calc(100% - 76px)' : `${size.height}px`,
            maxWidth: 'calc(100vw - 16px)',
            maxHeight: 'calc(100vh - 80px)',
            minWidth: `${Math.min(minSize.width, typeof window !== 'undefined' ? window.innerWidth - 20 : 320)}px`,
            minHeight: `${minSize.height}px`,
            transformOrigin: `${pinchX}% 100%`,
            willChange: isDragging || isResizing ? 'transform' : 'auto',
          }}
          className={`rounded-window overflow-hidden flex flex-col transition-shadow duration-200 select-none ${
            isDragging
              ? 'shadow-[0_28px_65px_rgba(0,0,0,0.55),0_0_0_1px_rgba(255,255,255,0.2)] scale-[1.002]'
              : isFocused
              ? 'shadow-window-focused ring-1 ring-white/20'
              : 'shadow-window opacity-95 ring-1 ring-black/10 dark:ring-white/10'
          }`}
        >
          {/* Frosted Glass Window Header / Title Bar */}
          <div
            onPointerDown={handleTitlePointerDown}
            onPointerMove={handleTitlePointerMove}
            onPointerUp={handleTitlePointerUp}
            onPointerCancel={handleTitlePointerUp}
            onDoubleClick={() => toggleMaximize(id)}
            className={`h-10 px-3.5 flex items-center justify-between select-none border-b transition-colors ${
              isDragging ? 'cursor-grabbing' : 'cursor-grab'
            } ${
              isFocused
                ? 'bg-white/75 dark:bg-[#222328]/85 border-black/10 dark:border-white/10'
                : 'bg-white/60 dark:bg-[#1a1b1f]/75 border-black/5 dark:border-white/5'
            } backdrop-blur-2xl`}
          >
            {/* Left: Traffic Lights */}
            <div className="flex items-center gap-2 w-20 shrink-0">
              <TrafficLights
                onClose={handleClose}
                onMinimize={handleMinimize}
                onMaximize={() => toggleMaximize(id)}
                isFocused={isFocused}
              />
            </div>

            {/* Center: Window Title and Icon */}
            <div className="flex items-center gap-2 text-xs font-medium text-slate-800 dark:text-slate-200 truncate min-w-0 mx-2 pointer-events-none">
              {icon && <img src={icon} alt="" className="w-4 h-4 object-contain pointer-events-none shrink-0" />}
              <span className="truncate">{title}</span>
            </div>

            {/* Right: Balanced Spacer for centering */}
            <div className="w-20 shrink-0" />
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
      )}
    </AnimatePresence>
  )
}
