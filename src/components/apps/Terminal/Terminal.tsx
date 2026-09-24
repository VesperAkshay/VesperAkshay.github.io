import React, { useState, useRef, useEffect } from 'react'
import { profile } from '../../../data/profile'
import { projects } from '../../../data/projects'
import { useWindowStore } from '../../../store/windowStore'

interface CommandEntry {
  command: string
  output: React.ReactNode
}

export const Terminal = () => {
  const [inputVal, setInputVal] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState<number>(-1)
  const openWindow = useWindowStore((state) => state.open)

  const [entries, setEntries] = useState<CommandEntry[]>([
    {
      command: '',
      output: (
        <div className="text-slate-400 space-y-1 mb-2">
          <p>Last login: Wed Sep 24 16:30:00 on ttys001</p>
          <p className="text-emerald-400 font-semibold">
            Welcome to Akshay Patel&apos;s interactive developer shell.
          </p>
          <p className="text-xs text-slate-400">
            Type <span className="text-yellow-400 font-mono">&apos;help&apos;</span> to see available commands.
          </p>
        </div>
      ),
    },
  ])

  const terminalEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [entries])

  const executeCommand = (cmdText: string) => {
    const trimmed = cmdText.trim()
    const parts = trimmed.split(' ')
    const cmd = parts[0].toLowerCase()

    if (trimmed) {
      setHistory((prev) => [...prev, trimmed])
      setHistoryIndex(-1)
    }

    let output: React.ReactNode = null

    switch (cmd) {
      case '':
        output = null
        break

      case 'clear':
        setEntries([])
        return

      case 'help':
        output = (
          <div className="space-y-1 text-slate-300">
            <p className="text-blue-400 font-semibold">Available commands:</p>
            <div className="grid grid-cols-[120px_1fr] gap-x-2 gap-y-1 text-xs">
              <span className="text-yellow-400 font-mono">whoami</span>
              <span>Display identity and brief biography</span>

              <span className="text-yellow-400 font-mono">skills</span>
              <span>List technical proficiencies and tooling</span>

              <span className="text-yellow-400 font-mono">projects</span>
              <span>Display active portfolio projects and open Finder</span>

              <span className="text-yellow-400 font-mono">contact</span>
              <span>Print contact details and email address</span>

              <span className="text-yellow-400 font-mono">resume</span>
              <span>Open the resume document viewer</span>

              <span className="text-yellow-400 font-mono">clear</span>
              <span>Clear terminal display</span>
            </div>
          </div>
        )
        break

      case 'whoami':
        output = (
          <div className="space-y-1.5 text-slate-300">
            <p className="text-white font-semibold">{profile.name} — {profile.role}</p>
            <p className="text-xs text-slate-400 leading-relaxed">{profile.bio}</p>
            <p className="text-xs text-slate-400">Location: {profile.location}</p>
          </div>
        )
        break

      case 'skills':
        output = (
          <div className="space-y-2 text-slate-300">
            <p className="text-emerald-400 font-semibold">Key Proficiencies:</p>
            <div className="flex flex-wrap gap-1.5">
              {profile.skills.map((s) => (
                <span key={s} className="px-2 py-0.5 rounded bg-slate-800 text-blue-300 text-xs font-mono">
                  {s}
                </span>
              ))}
            </div>
          </div>
        )
        break

      case 'projects':
        output = (
          <div className="space-y-2 text-slate-300">
            <p className="text-cyan-400 font-semibold">Featured Projects:</p>
            <div className="space-y-1 text-xs">
              {projects.map((p) => (
                <div key={p.id} className="flex items-baseline gap-2">
                  <span className="text-yellow-400 font-semibold font-mono">{p.title}:</span>
                  <span className="text-slate-400">{p.tagline}</span>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-slate-500 italic mt-1">Opening Finder window...</p>
          </div>
        )
        openWindow('finder')
        break

      case 'resume':
        output = <p className="text-emerald-400 text-xs">Opening Resume Preview...</p>
        openWindow('preview')
        break

      case 'contact':
        output = (
          <div className="space-y-1 text-slate-300 text-xs">
            <p>
              Email: <a href={`mailto:${profile.email}`} className="text-blue-400 underline">{profile.email}</a>
            </p>
            <div className="flex gap-3 pt-1">
              {profile.socials.map((soc) => (
                <a
                  key={soc.label}
                  href={soc.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-cyan-400 hover:underline"
                >
                  {soc.label}
                </a>
              ))}
            </div>
          </div>
        )
        break

      default:
        output = (
          <p className="text-rose-400 text-xs">
            zsh: command not found: {cmd}. Type <span className="text-yellow-400 font-mono">&apos;help&apos;</span> for available commands.
          </p>
        )
        break
    }

    setEntries((prev) => [...prev, { command: cmdText, output }])
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(inputVal)
      setInputVal('')
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (history.length > 0) {
        const nextIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1)
        setHistoryIndex(nextIndex)
        setInputVal(history[nextIndex])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex !== -1) {
        const nextIndex = historyIndex + 1
        if (nextIndex >= history.length) {
          setHistoryIndex(-1)
          setInputVal('')
        } else {
          setHistoryIndex(nextIndex)
          setInputVal(history[nextIndex])
        }
      }
    }
  }

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className="flex-1 bg-[#121318] text-slate-200 font-mono text-xs sm:text-sm p-4 overflow-y-auto cursor-text select-text"
    >
      {/* Entries List */}
      <div className="space-y-3">
        {entries.map((entry, idx) => (
          <div key={idx} className="space-y-1">
            {entry.command && (
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 font-bold select-none">akshay@macbook:~$</span>
                <span className="text-white">{entry.command}</span>
              </div>
            )}
            {entry.output && <div className="pl-1 leading-relaxed">{entry.output}</div>}
          </div>
        ))}
      </div>

      {/* Active Input Line */}
      <div className="flex items-center gap-2 mt-2">
        <span className="text-emerald-400 font-bold select-none">akshay@macbook:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          className="flex-1 bg-transparent text-white focus:outline-none font-mono caret-blue-400"
          spellCheck={false}
          autoComplete="off"
        />
      </div>

      <div ref={terminalEndRef} />
    </div>
  )
}
