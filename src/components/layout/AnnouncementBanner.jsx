import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Megaphone, X, ArrowRight } from 'lucide-react'
import { db } from '../../lib/firebase'
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore'

const STORAGE_KEY = 'lastSeenAnnouncementId'

export default function AnnouncementBanner() {
  const [announcement, setAnnouncement] = useState(null)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    const q = query(collection(db, 'posts'), orderBy('timestamp', 'desc'))
    const unsub = onSnapshot(q, snap => {
      const latest = snap.docs.find(d => d.data().category === 'Announcements')
      if (latest) setAnnouncement({ id: latest.id, ...latest.data() })
    })
    return unsub
  }, [])

  if (!announcement || dismissed || localStorage.getItem(STORAGE_KEY) === announcement.id) {
    return null
  }

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, announcement.id)
    setDismissed(true)
  }

  return (
    <div className="mt-16 bg-sky-500/10 border-b border-sky-400/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
        <Megaphone size={18} className="text-sky-400 flex-shrink-0" />
        <div className="flex-1 min-w-0 flex items-center gap-1.5 text-sm text-slate-200">
          <span className="font-semibold text-sky-400 flex-shrink-0">New Announcement —</span>
          <span className="truncate">{announcement.title}</span>
        </div>
        <Link
          to="/forum"
          className="flex-shrink-0 flex items-center gap-1 text-sky-400 hover:text-sky-300 text-sm font-medium transition-colors"
        >
          View <ArrowRight size={14} />
        </Link>
        <button
          onClick={dismiss}
          className="flex-shrink-0 text-slate-400 hover:text-white transition-colors"
          aria-label="Dismiss announcement"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  )
}
