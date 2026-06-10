import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const links = [
  { to: '/',          label: 'Home' },
  { to: '/directory', label: 'Alumni' },
  { to: '/rsvp',      label: 'RSVP' },
  { to: '/gallery',   label: 'Gallery' },
  { to: '/forum',     label: 'Forum' },
  { to: '/yearbook',  label: 'Yearbook' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)
  const { pathname }            = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-[#0F172A]/95 backdrop-blur-xl border-b border-slate-800 shadow-card' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src="/photos/lasantaberd-logo.jpg"
            alt="Lasan Taberd"
            className="h-10 w-auto rounded-lg shadow-neon group-hover:shadow-neon-lg transition-all"
          />
          <div className="leading-none">
            <div className="text-white font-bold text-sm tracking-wide">Lasan Taberd</div>
            <div className="text-sky-400 text-[10px] font-medium tracking-widest uppercase">Class 65 ~ 76</div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                pathname === to
                  ? 'text-sky-400 bg-sky-400/10'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Link
            to="/rsvp"
            className="px-5 py-2 bg-sky-500 hover:bg-sky-400 text-white text-sm font-semibold rounded-xl neon-btn shadow-neon"
          >
            Register Now
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          onClick={() => setOpen(o => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden glass border-t border-slate-800 px-4 pb-4 pt-2 space-y-1">
          {links.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                pathname === to
                  ? 'text-sky-400 bg-sky-400/10'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              {label}
            </Link>
          ))}
          <Link
            to="/rsvp"
            className="block mt-2 px-4 py-3 bg-sky-500 hover:bg-sky-400 text-white text-sm font-semibold rounded-xl text-center transition-all"
          >
            Register Now
          </Link>
        </div>
      )}
    </header>
  )
}
