import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Heart, Eye, Mail, Phone } from 'lucide-react'
import { db } from '../../lib/firebase'
import { doc, onSnapshot } from 'firebase/firestore'

export default function Footer() {
  const [visits, setVisits] = useState(null)

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'stats', 'siteVisits'), snap => {
      if (snap.exists()) setVisits(snap.data().count)
    })
    return unsub
  }, [])

  return (
    <footer className="bg-slate-900/80 border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/photos/lasantaberd-logo.jpg"
                alt="Lasan Taberd"
                className="h-10 w-auto rounded-lg shadow-neon"
              />
              <div>
                <div className="text-white font-bold">Lasan Taberd</div>
                <div className="text-sky-400 text-xs font-medium tracking-widest">CLASS 65 ~ 76</div>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Reconnecting the brothers of Lasan Taberd across continents, generations, and decades.
              Saigon is in our hearts forever.
            </p>

            {/* Admin Contact */}
            <div className="mt-4 pt-4 border-t border-slate-800 max-w-xs space-y-2">
              <p className="text-slate-500 text-xs uppercase tracking-wider mb-1">Website Admin Contact:<br /><span className="text-white font-bold">Phillip Nguyen</span></p>
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <Mail size={14} className="text-sky-400 flex-shrink-0" />
                <span>saigonjava@gmail.com</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <Phone size={14} className="text-sky-400 flex-shrink-0" />
                <span>+1 (407) 349-7762</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { to: '/',          label: 'Home' },
                { to: '/directory', label: 'Alumni Directory' },
                { to: '/rsvp',      label: 'RSVP & Register' },
                { to: '/gallery',   label: 'Photo Gallery' },
                { to: '/forum',     label: 'Message Board' },
                { to: '/yearbook',  label: 'Yearbook' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="text-slate-400 hover:text-sky-400 text-sm transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="https://taberd.org/tb/lasan_hanh_khuc.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-sky-400 text-sm transition-colors"
                >
                  Lasan Hành Khúc
                </a>
              </li>
            </ul>
          </div>

          {/* Event */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">The Event</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><span className="text-sky-400 font-medium">Date</span><br />October 24, 2026</li>
              <li>
                <span className="text-sky-400 font-medium">Venue</span><br />
                <a
                  href="https://www.google.com/maps/search/?api=1&query=15351+Brookhurst+St+%23104%2C+Westminster%2C+CA+92683"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-sky-400 transition-colors"
                >
                  15351 Brookhurst St #104<br />Westminster, CA 92683
                </a>
              </li>
              <li><span className="text-sky-400 font-medium">Dress Code</span><br />Smart Formal / Áo Dài welcome</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-xs">
            © 2026 Lasan Taberd Class 65~76 Reunion. All rights reserved.
          </p>
          <p className="text-slate-500 text-xs flex items-center gap-1">
            Made with <Heart size={12} className="text-rose-500" /> by the Reunion Committee
          </p>
          {visits !== null && (
            <p className="text-slate-600 text-xs flex items-center gap-1.5">
              <Eye size={12} /> {visits.toLocaleString()} visitor{visits !== 1 ? 's' : ''}
            </p>
          )}
        </div>
      </div>
    </footer>
  )
}
