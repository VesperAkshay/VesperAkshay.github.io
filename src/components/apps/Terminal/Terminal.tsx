import React, { useState, useRef, useEffect, useCallback } from 'react'
import { profile } from '../../../data/profile'
import { projects } from '../../../data/projects'
import { useWindowStore } from '../../../store/windowStore'
import { useOSStore } from '../../../store/osStore'
import type { OSType } from '../../../store/osStore'

interface CommandEntry {
  command: string
  output: React.ReactNode
  promptNode?: React.ReactNode
}

export const Terminal = () => {
  const currentOS = useOSStore((state) => state.currentOS)
  const openWindow = useWindowStore((state) => state.open)

  const [inputVal, setInputVal] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState<number>(-1)

  const terminalEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Generate OS-specific welcome banner
  const getBanner = useCallback((os: OSType): React.ReactNode => {
    switch (os) {
      case 'windows':
        return (
          <div className="text-slate-300 space-y-1 mb-3 font-mono leading-relaxed">
            <p className="text-sky-300 font-bold">Windows PowerShell</p>
            <p className="text-slate-400 text-xs">
              Copyright (C) Microsoft Corporation. All rights reserved.
            </p>
            <p className="text-slate-400 text-xs">
              Install the latest PowerShell for new features and improvements!{' '}
              <span className="text-sky-400 underline">https://aka.ms/PSWindows</span>
            </p>
            <p className="text-emerald-400 font-semibold pt-1">
              Welcome to Akshay Patel&apos;s Windows Developer Environment.
            </p>
            <p className="text-xs text-slate-400">
              Type <span className="text-yellow-400 font-bold">&apos;help&apos;</span> or{' '}
              <span className="text-yellow-400 font-bold">&apos;dir&apos;</span> to see available cmdlets.
            </p>
          </div>
        )

      case 'linux':
        return (
          <div className="text-slate-300 space-y-1 mb-3 font-mono leading-relaxed">
            <p className="text-[#E95420] font-bold">
              Welcome to Ubuntu 24.04 LTS (GNU/Linux 6.8.0-40-generic x86_64)
            </p>
            <div className="text-xs text-slate-400 space-y-0.5">
              <p> * Documentation:  https://help.ubuntu.com</p>
              <p> * Management:     https://landscape.canonical.com</p>
              <p> * Support:        https://ubuntu.com/pro</p>
            </div>
            <p className="text-slate-400 text-xs pt-1">
              Last login: Fri Sep 25 19:30:00 2026 from 192.168.1.104
            </p>
            <p className="text-emerald-400 font-semibold">
              Ubuntu Shell • Akshay Patel Software Engineering Hub.
            </p>
            <p className="text-xs text-slate-400">
              Type <span className="text-yellow-400 font-bold">&apos;help&apos;</span> or{' '}
              <span className="text-yellow-400 font-bold">&apos;ls&apos;</span> for commands.
            </p>
          </div>
        )

      case 'android':
        return (
          <div className="text-slate-300 space-y-1 mb-3 font-mono leading-relaxed">
            <p className="text-emerald-400 font-bold">
              Welcome to Termux (Android 15 / aarch64)!
            </p>
            <div className="text-xs text-slate-400 space-y-0.5">
              <p>Wiki:            https://wiki.termux.com</p>
              <p>Community:       https://termux.dev/community</p>
              <p>Packages:        pkg search &lt;query&gt; | pkg install &lt;pkg&gt;</p>
            </div>
            <p className="text-cyan-400 font-semibold pt-1">
              Android Terminal Session active.
            </p>
            <p className="text-xs text-slate-400">
              Type <span className="text-yellow-400 font-bold">&apos;help&apos;</span> to explore portfolio.
            </p>
          </div>
        )

      case 'macos':
      default:
        return (
          <div className="text-slate-400 space-y-1 mb-2 font-mono">
            <p>Last login: Fri Sep 25 19:30:00 on ttys001</p>
            <p className="text-emerald-400 font-semibold">
              Welcome to Akshay Patel&apos;s interactive macOS developer shell.
            </p>
            <p className="text-xs text-slate-400">
              Type <span className="text-yellow-400 font-mono">&apos;help&apos;</span> to see available commands.
            </p>
          </div>
        )
    }
  }, [])

  const [entries, setEntries] = useState<CommandEntry[]>([
    {
      command: '',
      output: getBanner(currentOS),
    },
  ])

  // Update banner when currentOS changes and no commands typed yet
  useEffect(() => {
    setEntries((prev) => {
      if (prev.length <= 1) {
        return [{ command: '', output: getBanner(currentOS) }]
      }
      // If user already typed commands, append a switch notification
      return [
        ...prev,
        {
          command: '',
          output: (
            <div className="my-2 border-t border-white/10 pt-2">
              <span className="text-xs text-yellow-400 font-bold">
                [!] Switched environment to {currentOS.toUpperCase()}
              </span>
              {getBanner(currentOS)}
            </div>
          ),
        },
      ]
    })
  }, [currentOS, getBanner])

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [entries])

  // Render OS-specific prompt
  const renderPrompt = (os: OSType) => {
    switch (os) {
      case 'windows':
        return (
          <span className="text-sky-400 font-bold select-none font-mono tracking-tight shrink-0">
            PS C:\Users\AkshayPatel&gt;{' '}
          </span>
        )
      case 'linux':
        return (
          <span className="select-none font-mono tracking-tight shrink-0">
            <span className="text-emerald-400 font-bold">akshay@ubuntu</span>
            <span className="text-white">:</span>
            <span className="text-blue-400 font-bold">~</span>
            <span className="text-white font-bold">$ </span>
          </span>
        )
      case 'android':
        return (
          <span className="select-none font-mono tracking-tight shrink-0">
            <span className="text-emerald-400 font-bold">~</span>{' '}
            <span className="text-cyan-400 font-bold">$ </span>
          </span>
        )
      case 'macos':
      default:
        return (
          <span className="text-emerald-400 font-bold select-none font-mono tracking-tight shrink-0">
            akshay@macbook:~$ {' '}
          </span>
        )
    }
  }

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
      case 'cls':
        setEntries([])
        return

      case 'help':
      case 'get-help':
      case '?':
        output = (
          <div className="space-y-1.5 text-slate-300 font-mono">
            <p className="text-sky-400 font-semibold">Available {currentOS === 'windows' ? 'Cmdlets & Commands' : 'Commands'}:</p>
            <div className="grid grid-cols-[130px_1fr] gap-x-2 gap-y-1 text-xs">
              <span className="text-yellow-400 font-mono">whoami</span>
              <span>Display identity and brief biography</span>

              <span className="text-yellow-400 font-mono">skills</span>
              <span>List technical proficiencies and tooling</span>

              <span className="text-yellow-400 font-mono">projects / {currentOS === 'windows' ? 'dir' : 'ls'}</span>
              <span>Display portfolio projects & open File Manager</span>

              <span className="text-yellow-400 font-mono">contact</span>
              <span>Print contact details and email address</span>

              <span className="text-yellow-400 font-mono">resume</span>
              <span>Open the resume document viewer</span>

              {currentOS === 'linux' && (
                <>
                  <span className="text-yellow-400 font-mono">uname -a</span>
                  <span>Print system and kernel architecture</span>

                  <span className="text-yellow-400 font-mono">neofetch</span>
                  <span>Display Ubuntu ASCII specs</span>
                </>
              )}

              {currentOS === 'windows' && (
                <>
                  <span className="text-yellow-400 font-mono">Get-Process</span>
                  <span>List active desktop process tasks</span>
                </>
              )}

              {currentOS === 'android' && (
                <>
                  <span className="text-yellow-400 font-mono">pkg list</span>
                  <span>List installed Android developer packages</span>
                </>
              )}

              <span className="text-yellow-400 font-mono">{currentOS === 'windows' ? 'cls / clear' : 'clear'}</span>
              <span>Clear terminal display</span>
            </div>
          </div>
        )
        break

      case 'whoami':
        output = (
          <div className="space-y-1.5 text-slate-300 font-mono">
            <p className="text-white font-semibold">{profile.name} — {profile.role}</p>
            <p className="text-xs text-slate-400 leading-relaxed">{profile.bio}</p>
            <p className="text-xs text-slate-400">Location: {profile.location}</p>
          </div>
        )
        break

      case 'skills':
        output = (
          <div className="space-y-2 text-slate-300 font-mono">
            <p className="text-emerald-400 font-semibold">Key Proficiencies & Tooling:</p>
            <div className="flex flex-wrap gap-1.5">
              {profile.skills.map((s) => (
                <span key={s} className="px-2 py-0.5 rounded bg-slate-800 text-sky-300 text-xs font-mono border border-white/5">
                  {s}
                </span>
              ))}
            </div>
          </div>
        )
        break

      case 'projects':
      case 'dir':
      case 'ls':
        output = (
          <div className="space-y-2 text-slate-300 font-mono">
            <p className="text-cyan-400 font-semibold">Featured Projects Catalog:</p>
            <div className="space-y-1 text-xs">
              {projects.map((p) => (
                <div key={p.id} className="flex items-baseline gap-2">
                  <span className="text-yellow-400 font-semibold font-mono">{p.title}:</span>
                  <span className="text-slate-400">{p.tagline}</span>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-slate-500 italic mt-1">
              Opening {currentOS === 'windows' ? 'File Explorer' : currentOS === 'linux' ? 'Files' : 'Finder'}...
            </p>
          </div>
        )
        openWindow('finder')
        break

      case 'resume':
        output = <p className="text-emerald-400 text-xs font-mono">Opening Resume Document Viewer...</p>
        openWindow('preview')
        break

      case 'contact':
        output = (
          <div className="space-y-1 text-slate-300 text-xs font-mono">
            <p>
              Email: <a href={`mailto:${profile.email}`} className="text-sky-400 underline">{profile.email}</a>
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

      case 'uname':
        output = (
          <p className="text-slate-300 text-xs font-mono">
            Linux ubuntu-desktop 6.8.0-40-generic #40-Ubuntu SMP PREEMPT_DYNAMIC x86_64 GNU/Linux
          </p>
        )
        break

      case 'neofetch':
      case 'fastfetch':
        output = (
          <div className="text-xs font-mono leading-tight space-y-1">
            <span className="text-[#E95420] font-bold">            .-/+oossssoo+/-.</span><br />
            <span className="text-[#E95420] font-bold">        `:+ssssssssssssssssss+:`</span><br />
            <span className="text-[#E95420] font-bold">      -+ssssssssssssssssssyyssss+-</span><br />
            <span className="text-white font-semibold">OS:</span> Ubuntu 24.04 LTS x86_64<br />
            <span className="text-white font-semibold">Host:</span> Akshay Patel Engineering Rig<br />
            <span className="text-white font-semibold">Kernel:</span> 6.8.0-40-generic<br />
            <span className="text-white font-semibold">Shell:</span> bash 5.2.21<br />
            <span className="text-white font-semibold">DE:</span> GNOME 46 (Noble Numbat Yaru)<br />
            <span className="text-white font-semibold">Memory:</span> 32140MiB / 65536MiB
          </div>
        )
        break

      case 'get-process':
        output = (
          <div className="text-xs font-mono text-slate-300 space-y-0.5">
            <p className="text-sky-400 font-bold">Handles  NPM(K)    PM(K)      WS(K)     CPU(s)     Id ProcessName</p>
            <p className="text-slate-400">-------  ------    -----      -----     ------     -- -----------</p>
            <p>    412      24    34200      48120       1.24   1048 explorer</p>
            <p>    182      12    18400      22540       0.42   2048 game2048</p>
            <p>    290      18    24100      36200       0.88   4096 powershell</p>
            <p>    512      35    56200      82400       2.10   8192 msedge</p>
          </div>
        )
        break

      case 'pkg':
        output = (
          <div className="text-xs font-mono text-emerald-400 space-y-0.5">
            <p>All packages are up to date.</p>
            <p className="text-slate-400">9 portfolio modules installed (git, nodejs, python, react19, tailwindcss, vite, zustand, framer-motion, 2048).</p>
          </div>
        )
        break

      default:
        // OS-specific error messages
        if (currentOS === 'windows') {
          output = (
            <p className="text-rose-400 text-xs font-mono">
              {cmd} : The term &apos;{cmd}&apos; is not recognized as the name of a cmdlet, function, script file, or operable program. Check the spelling of the name, or type <span className="text-yellow-400 font-mono">&apos;help&apos;</span>.
            </p>
          )
        } else if (currentOS === 'linux') {
          output = (
            <p className="text-rose-400 text-xs font-mono">
              bash: {cmd}: command not found. Type <span className="text-yellow-400 font-mono">&apos;help&apos;</span> for available commands.
            </p>
          )
        } else if (currentOS === 'android') {
          output = (
            <p className="text-rose-400 text-xs font-mono">
              sh: {cmd}: not found. Type <span className="text-yellow-400 font-mono">&apos;help&apos;</span> for available commands.
            </p>
          )
        } else {
          output = (
            <p className="text-rose-400 text-xs font-mono">
              zsh: command not found: {cmd}. Type <span className="text-yellow-400 font-mono">&apos;help&apos;</span> for available commands.
            </p>
          )
        }
        break
    }

    setEntries((prev) => [
      ...prev,
      {
        command: cmdText,
        output,
        promptNode: renderPrompt(currentOS),
      },
    ])
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

  // OS background styling
  const bgClass =
    currentOS === 'windows'
      ? 'bg-[#0c1021]'
      : currentOS === 'linux'
      ? 'bg-[#300A24]'
      : currentOS === 'android'
      ? 'bg-black'
      : 'bg-[#121318]'

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className={`flex-1 ${bgClass} text-slate-200 font-mono text-xs sm:text-sm p-4 overflow-y-auto cursor-text select-text transition-colors duration-300`}
    >
      {/* Entries List */}
      <div className="space-y-3">
        {entries.map((entry, idx) => (
          <div key={idx} className="space-y-1">
            {entry.command && (
              <div className="flex items-center gap-1.5 flex-wrap">
                {entry.promptNode || renderPrompt(currentOS)}
                <span className="text-white">{entry.command}</span>
              </div>
            )}
            {entry.output && <div className="pl-1 leading-relaxed">{entry.output}</div>}
          </div>
        ))}
      </div>

      {/* Active Input Line */}
      <div className="flex items-center gap-1.5 mt-2 flex-wrap">
        {renderPrompt(currentOS)}
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          className="flex-1 bg-transparent text-white focus:outline-none font-mono caret-sky-400 min-w-[120px]"
          spellCheck={false}
          autoComplete="off"
        />
      </div>

      <div ref={terminalEndRef} />
    </div>
  )
}
