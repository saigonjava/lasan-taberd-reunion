import { useState, useEffect } from 'react'
import { Cake, X } from 'lucide-react'
import { birthdays } from '../../data/birthdays'

function ordinal(n) {
  if (n > 3 && n < 21) return 'th'
  switch (n % 10) {
    case 1: return 'st'
    case 2: return 'nd'
    case 3: return 'rd'
    default: return 'th'
  }
}

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
  const monthName = new Date(2000, month - 1, day).toLocaleDateString('en-US', { month: 'long' })
  const dateLabel = `${monthName} ${day}${ordinal(day)}`

  const Message = ({ hidden }) => (
    <span className="whitespace-nowrap text-sm text-slate-200 pr-16" aria-hidden={hidden || undefined}>
      <span className="font-semibold text-pink-400">Happy Birthday</span>{' '}
      <span className="text-white">{names}</span>! 🎉{' '}
      <span className="text-pink-300/70 text-xs">({dateLabel})</span>
    </span>
  )

  return (
    <div className="mt-16 bg-pink-500/10 border-b border-pink-400/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
        <Cake size={18} className="text-pink-400 flex-shrink-0" />
        <div className="flex-1 min-w-0 overflow-hidden">
          <div className="flex w-max animate-marquee motion-reduce:animate-none hover:[animation-play-state:paused]">
            <Message />
            <Message hidden />
          </div>
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
