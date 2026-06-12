import { useState, useEffect } from 'react'
import { Cake, X } from 'lucide-react'
import { birthdays } from '../../data/birthdays'

export default function BirthdayBanner() {
  const [dismissed, setDismissed] = useState(false)
  const [today, setToday] = useState(null)

  useEffect(() => {
    setToday(new Date())
  }, [])

  if (!today) return null

  const month = today.getMonth() + 1
  const day = today.getDate()
  const todaysBirthdays = birthdays.filter(b => b.month === month && b.day === day)

  if (todaysBirthdays.length === 0 || dismissed) return null

  const names = todaysBirthdays.map(b => b.name).join(', ')

  return (
    <div className="mt-16 bg-pink-500/10 border-b border-pink-400/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
        <Cake size={18} className="text-pink-400 flex-shrink-0" />
        <div className="flex-1 min-w-0 text-sm text-slate-200">
          <span className="font-semibold text-pink-400">Happy Birthday</span>{' '}
          <span className="text-white">{names}</span>! 🎉
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="flex-shrink-0 text-slate-400 hover:text-white transition-colors"
          aria-label="Dismiss birthday banner"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  )
}
