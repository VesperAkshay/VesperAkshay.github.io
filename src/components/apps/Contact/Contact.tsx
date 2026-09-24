import React, { useState } from 'react'
import { Send, CheckCircle2, AlertCircle, Mail, MapPin } from 'lucide-react'
import { profile } from '../../../data/profile'

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [statusMessage, setStatusMessage] = useState('')

  const endpoint = import.meta.env.VITE_CONTACT_FORM_ENDPOINT

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error')
      setStatusMessage('Please fill in all required fields.')
      return
    }

    setStatus('sending')

    if (endpoint) {
      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(formData),
        })

        if (response.ok) {
          setStatus('success')
          setStatusMessage('Thank you! Your message has been sent successfully.')
          setFormData({ name: '', email: '', subject: '', message: '' })
        } else {
          throw new Error('Submission failed')
        }
      } catch {
        setStatus('error')
        setStatusMessage('Could not reach endpoint. You can also reach out directly via email.')
      }
    } else {
      // Simulate successful dispatch when endpoint is unconfigured in development
      setTimeout(() => {
        setStatus('success')
        setStatusMessage('Message simulated successfully! (Add VITE_CONTACT_FORM_ENDPOINT to send real emails)')
        setFormData({ name: '', email: '', subject: '', message: '' })
      }, 700)
    }
  }

  return (
    <div className="flex-1 overflow-y-auto p-5 sm:p-6 text-slate-800 dark:text-slate-100 flex flex-col justify-between">
      <div>
        {/* Mail Composer Header */}
        <div className="border-b border-black/10 dark:border-white/10 pb-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-semibold text-slate-900 dark:text-white flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-500" />
              New Message
            </h2>
            <div className="text-xs text-slate-400 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              {profile.location}
            </div>
          </div>

          {/* Quick info recipient badge */}
          <div className="flex items-center gap-2 py-1.5 px-3 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs">
            <span className="text-slate-400 font-medium">To:</span>
            <span className="font-semibold text-blue-600 dark:text-blue-400">
              {profile.name} &lt;{profile.email}&gt;
            </span>
          </div>
        </div>

        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">
                Your Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Jane Doe"
                className="w-full px-3 py-1.5 text-xs rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">
                Your Email *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="jane@example.com"
                className="w-full px-3 py-1.5 text-xs rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">
              Subject
            </label>
            <input
              type="text"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              placeholder="Project Collaboration / Opportunity"
              className="w-full px-3 py-1.5 text-xs rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">
              Message *
            </label>
            <textarea
              required
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Hi Alex, I loved your portfolio..."
              className="w-full px-3 py-2 text-xs rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 resize-none"
            />
          </div>

          {/* Submission feedback */}
          {status === 'success' && (
            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{statusMessage}</span>
            </div>
          )}

          {status === 'error' && (
            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{statusMessage}</span>
            </div>
          )}

          {/* Action Row */}
          <div className="pt-2 flex items-center justify-between">
            <a
              href={`mailto:${profile.email}`}
              className="text-xs text-blue-500 hover:underline"
            >
              Or open mail client directly &rarr;
            </a>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-medium text-xs shadow-sm transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              {status === 'sending' ? 'Sending...' : 'Send Message'}
            </button>
          </div>
        </form>
      </div>

      {/* Social Links Footer */}
      <div className="pt-4 mt-6 border-t border-black/10 dark:border-white/10 flex items-center justify-between text-xs text-slate-400">
        <span>Connect via:</span>
        <div className="flex items-center gap-3">
          {profile.socials.map((soc) => (
            <a
              key={soc.label}
              href={soc.url}
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-500 transition-colors"
            >
              {soc.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
