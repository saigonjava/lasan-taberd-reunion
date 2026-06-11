import { useState } from 'react'
import { CheckCircle, User, Mail, Phone, GraduationCap, Users, Utensils, MessageSquare, ChevronRight } from 'lucide-react'

const YEARS = [1975, 1976, 1977]
const DIETARY = ['None', 'Vegetarian', 'Vegan', 'Halal', 'Gluten-Free', 'Other']
const ATTENDANCE = [
  { value: 'yes',   label: '✅  Yes, I will attend',            desc: 'Count me in!' },
  { value: 'maybe', label: '🤔  Maybe — not confirmed yet',     desc: "I'll let you know closer to the date" },
  { value: 'no',    label: '❌  No — unable to attend',         desc: "I'll be there in spirit" },
]

function SectionHeader({ icon: Icon, title, step }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="w-8 h-8 rounded-lg bg-sky-400/10 border border-sky-400/25 flex items-center justify-center text-xs font-black text-sky-400">
        {step}
      </div>
      <div className="flex items-center gap-2">
        <Icon size={16} className="text-sky-400" />
        <h3 className="text-white font-bold text-base">{title}</h3>
      </div>
    </div>
  )
}

function Field({ label, required, children }) {
  return (
    <div>
      <label className="block text-slate-300 text-sm font-medium mb-2">
        {label} {required && <span className="text-sky-400">*</span>}
      </label>
      {children}
    </div>
  )
}

export default function RSVP() {
  const [submitted, setSubmitted] = useState(false)
  const [loading,   setLoading]   = useState(false)
  const [error,     setError]     = useState(false)
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    gradYear: '', attendance: '', plusOnes: '0',
    dietary: 'None', dietaryOther: '', message: '',
  })

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const inputCls = 'w-full px-4 py-3 bg-slate-800/80 border border-slate-700 focus:border-sky-400/60 focus:ring-1 focus:ring-sky-400/20 rounded-xl text-white text-sm placeholder-slate-500 outline-none transition-all'

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    setError(false)
    try {
      const res = await fetch('https://formspree.io/f/xvznaeon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: `RSVP: ${form.firstName} ${form.lastName} — Lasan Taberd Reunion 2026`,
          _replyto: form.email,
          _cc: 'ttlessthanone59@gmail.com',
          'First Name': form.firstName,
          'Last Name': form.lastName,
          'Email': form.email,
          'Phone': form.phone || '—',
          'Graduation Year': `Class of ${form.gradYear}`,
          'Attendance': form.attendance === 'yes' ? 'Attending' : form.attendance === 'maybe' ? 'Maybe' : 'Unable to attend',
          'Plus-Ones': form.plusOnes === '0' ? 'Just me' : `${form.plusOnes} guest(s)`,
          'Dietary': form.dietary === 'Other' ? `Other: ${form.dietaryOther}` : form.dietary,
          'Message': form.message || '—',
        }),
      })
      if (res.ok) {
        setSubmitted(true)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        setError(true)
      }
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center px-4 pt-20">
        <div className="max-w-lg w-full text-center">
          <div className="w-20 h-20 rounded-full bg-emerald-400/10 border-2 border-emerald-400/40 flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(52,211,153,0.3)]">
            <CheckCircle size={36} className="text-emerald-400" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-4">Registration Received!</h1>
          <p className="text-slate-400 mb-3 leading-relaxed">
            Thank you, <span className="text-white font-semibold">{form.firstName} {form.lastName}</span>!<br />
            Your RSVP for the <span className="text-sky-400">Lasan Taberd Class 65~76 Grand Reunion</span> has been confirmed.
          </p>
          <p className="text-slate-500 text-sm mb-8">
            The committee will follow up with you at <span className="text-slate-300">{form.email}</span> with event details and payment instructions.
          </p>
          <div className="p-5 bg-slate-800/60 border border-slate-700 rounded-2xl text-left mb-8 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Attendance</span>
              <span className="text-white font-medium capitalize">{form.attendance === 'yes' ? '✅ Attending' : form.attendance === 'maybe' ? '🤔 Maybe' : '❌ Unable'}</span>
            </div>
            <div className="flex justify-between text-sm border-t border-slate-700 pt-3">
              <span className="text-slate-400">Grad Year</span>
              <span className="text-white font-medium">Class of {form.gradYear}</span>
            </div>
            <div className="flex justify-between text-sm border-t border-slate-700 pt-3">
              <span className="text-slate-400">Plus-Ones</span>
              <span className="text-white font-medium">{form.plusOnes} guest{form.plusOnes !== '1' ? 's' : ''}</span>
            </div>
            <div className="flex justify-between text-sm border-t border-slate-700 pt-3">
              <span className="text-slate-400">Dietary</span>
              <span className="text-white font-medium">{form.dietary}</span>
            </div>
          </div>
          <button
            className="px-6 py-3 bg-sky-500 hover:bg-sky-400 text-white font-bold rounded-xl neon-btn shadow-neon text-sm transition-all"
            onClick={() => setSubmitted(false)}
          >
            Submit Another Response
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#0F172A] min-h-screen pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 bg-sky-400/10 border border-sky-400/20 rounded-full text-sky-400 text-xs font-semibold uppercase tracking-wider mb-4">
            RSVP & Registration
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">Reserve Your Seat</h1>
          <p className="text-slate-400 max-w-md mx-auto">
            Complete this form to secure your place at the Grand Reunion on October 24, 2026.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Section 1 — Personal */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
            <SectionHeader icon={User} title="Your Information" step="1" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="First Name" required>
                <input className={inputCls} placeholder="Văn" value={form.firstName} onChange={e => set('firstName', e.target.value)} required />
              </Field>
              <Field label="Last Name" required>
                <input className={inputCls} placeholder="Nguyễn" value={form.lastName} onChange={e => set('lastName', e.target.value)} required />
              </Field>
              <Field label="Email Address" required>
                <div className="relative">
                  <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input type="email" className={inputCls + ' pl-10'} placeholder="you@email.com" value={form.email} onChange={e => set('email', e.target.value)} required />
                </div>
              </Field>
              <Field label="Phone Number">
                <div className="relative">
                  <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input type="tel" className={inputCls + ' pl-10'} placeholder="+1 (408) 000-0000" value={form.phone} onChange={e => set('phone', e.target.value)} />
                </div>
              </Field>
              <Field label="Graduation Year" required>
                <div className="relative">
                  <GraduationCap size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                  <select className={inputCls + ' pl-10 cursor-pointer'} value={form.gradYear} onChange={e => set('gradYear', e.target.value)} required>
                    <option value="">Select your class year</option>
                    {YEARS.map(y => <option key={y} value={y}>Class of {y}</option>)}
                  </select>
                </div>
              </Field>
            </div>
          </div>

          {/* Section 2 — Attendance */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
            <SectionHeader icon={CheckCircle} title="Attendance Status" step="2" />
            <div className="space-y-3">
              {ATTENDANCE.map(opt => (
                <label
                  key={opt.value}
                  className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
                    form.attendance === opt.value
                      ? 'border-sky-400/60 bg-sky-400/8'
                      : 'border-slate-700 hover:border-slate-600 bg-slate-800/30'
                  }`}
                >
                  <input
                    type="radio"
                    name="attendance"
                    value={opt.value}
                    checked={form.attendance === opt.value}
                    onChange={() => set('attendance', opt.value)}
                    className="accent-sky-400"
                    required
                  />
                  <div>
                    <div className="text-white text-sm font-medium">{opt.label}</div>
                    <div className="text-slate-500 text-xs mt-0.5">{opt.desc}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Section 3 — Guests & Dietary */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
            <SectionHeader icon={Utensils} title="Guests & Dietary Needs" step="3" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <Field label="Number of Plus-Ones">
                <div className="relative">
                  <Users size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                  <select className={inputCls + ' pl-10 cursor-pointer'} value={form.plusOnes} onChange={e => set('plusOnes', e.target.value)}>
                    {['0','1','2','3','4','5'].map(n => <option key={n} value={n}>{n === '0' ? 'Just me' : `${n} guest${n > 1 ? 's' : ''}`}</option>)}
                  </select>
                </div>
              </Field>
              <Field label="Dietary Restriction">
                <select className={inputCls + ' cursor-pointer'} value={form.dietary} onChange={e => set('dietary', e.target.value)}>
                  {DIETARY.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </Field>
            </div>
            {form.dietary === 'Other' && (
              <Field label="Please specify">
                <input className={inputCls} placeholder="Describe your dietary needs…" value={form.dietaryOther} onChange={e => set('dietaryOther', e.target.value)} />
              </Field>
            )}
          </div>

          {/* Section 4 — Message */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
            <SectionHeader icon={MessageSquare} title="Your Message to the Group" step="4" />
            <Field label="A message, memory, or greeting (optional)">
              <textarea
                className={inputCls + ' resize-none'}
                rows={4}
                placeholder="Share a memory from Taberd, a greeting for old friends, or anything you'd like the committee to know…"
                value={form.message}
                onChange={e => set('message', e.target.value)}
              />
            </Field>
            <p className="text-slate-500 text-xs mt-2">Your message may be shared (with your permission) on the messaging board.</p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-sky-500 hover:bg-sky-400 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold rounded-xl neon-btn shadow-neon flex items-center justify-center gap-2 text-base transition-all"
          >
            {loading ? (
              <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Submitting…</>
            ) : (
              <>Submit Registration <ChevronRight size={18} /></>
            )}
          </button>
          {error && (
            <p className="text-center text-red-400 text-sm">
              Something went wrong — please try again or email us at <span className="text-sky-400">saigonjava@gmail.com</span>.
            </p>
          )}
          <p className="text-center text-slate-500 text-xs">
            By submitting, you agree to receive event-related emails. Your information is never shared with third parties.
          </p>
        </form>
      </div>
    </div>
  )
}
