import { useState } from 'react'
import { X, Send, CheckCircle, Mail } from 'lucide-react'

export default function ContactModal({ recipientName, onClose }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState(false)

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const inputCls = 'w-full px-3 py-2.5 bg-slate-900/60 border border-slate-700 focus:border-sky-400/60 rounded-xl text-white text-sm placeholder-slate-500 outline-none transition-all'

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    setError(false)
    try {
      const res = await fetch('https://formspree.io/f/xvznaeon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: `Contact request for ${recipientName} — Lasan Taberd Directory`,
          _replyto: form.email,
          'From': form.name || 'Anonymous',
          'Their Email': form.email,
          'Wants to reach': recipientName,
          'Message': form.message,
        }),
      })
      if (res.ok) {
        setSent(true)
      } else {
        setError(true)
      }
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60" onClick={onClose}>
      <div className="bg-slate-800 border border-slate-700 rounded-2xl max-w-md w-full p-6" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-bold text-lg flex items-center gap-2">
            <Mail size={18} className="text-sky-400" /> Contact {recipientName}
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors" aria-label="Close">
            <X size={18} />
          </button>
        </div>

        {sent ? (
          <div className="text-center py-6">
            <CheckCircle size={36} className="text-emerald-400 mx-auto mb-3" />
            <p className="text-white font-semibold mb-1">Message sent!</p>
            <p className="text-slate-400 text-sm">The committee will forward your message to {recipientName}.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <p className="text-slate-400 text-xs mb-2">
              Your message goes to the reunion committee, who will forward it to {recipientName}. Their email address is never shown publicly.
            </p>
            <input className={inputCls} placeholder="Your name" value={form.name} onChange={e => set('name', e.target.value)} required />
            <input type="email" className={inputCls} placeholder="Your email" value={form.email} onChange={e => set('email', e.target.value)} required />
            <textarea
              className={inputCls + ' resize-none'}
              rows={4}
              placeholder={`Write a message for ${recipientName}…`}
              value={form.message}
              onChange={e => set('message', e.target.value)}
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-sky-500 hover:bg-sky-400 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold rounded-xl neon-btn shadow-neon flex items-center justify-center gap-2 text-sm transition-all"
            >
              {loading ? (
                <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending…</>
              ) : (
                <>Send Message <Send size={14} /></>
              )}
            </button>
            {error && <p className="text-red-400 text-xs text-center">Something went wrong — please try again.</p>}
          </form>
        )}
      </div>
    </div>
  )
}
