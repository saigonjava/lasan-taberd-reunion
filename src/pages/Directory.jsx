import { useState, useMemo } from 'react'
import { Search, MapPin, Briefcase, GraduationCap, Mail, X } from 'lucide-react'
import { alumni } from '../data/alumni'
import ContactModal from '../components/ContactModal'

const COUNTRY_FLAGS = {
  USA: '🇺🇸',
  Vietnam: '🇻🇳',
  Australia: '🇦🇺',
  Canada: '🇨🇦',
  France: '🇫🇷',
}

const COUNTRIES = ['All', ...new Set(alumni.map(a => a.country))]

function flagFor(country) {
  return COUNTRY_FLAGS[country] || '🌐'
}

function AlumniCard({ p }) {
  const [expanded, setExpanded] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)
  return (
    <div className="bg-slate-800/60 border border-slate-700 rounded-2xl overflow-hidden card-hover flex flex-col">
      {/* Top gradient banner */}
      <div className={`h-16 bg-gradient-to-br ${p.gradient} opacity-80`} />

      {/* Avatar */}
      <div className="px-5 -mt-8 pb-0">
        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${p.gradient} flex items-center justify-center text-white font-black text-xl border-4 border-slate-800 shadow-card`}>
          {p.initials}
        </div>
      </div>

      <div className="px-5 pt-3 pb-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="text-white font-bold text-base leading-tight">{p.name}</h3>
          <span className="flex-shrink-0 px-2 py-0.5 bg-sky-400/10 border border-sky-400/25 rounded-full text-sky-400 text-[10px] font-bold uppercase tracking-wider whitespace-nowrap">
            Class of {p.gradYear}
          </span>
        </div>

        <div className="space-y-1.5 mt-2 mb-3">
          <div className="flex items-center gap-2 text-slate-400 text-xs">
            <Briefcase size={11} className="text-sky-400 flex-shrink-0" />
            <span>{p.profession}</span>
          </div>
          {p.location && (
            <div className="flex items-center gap-2 text-slate-400 text-xs">
              <MapPin size={11} className="text-sky-400 flex-shrink-0" />
              <span>{flagFor(p.country)} {p.location}</span>
            </div>
          )}
          {p.company && (
            <div className="flex items-center gap-2 text-slate-400 text-xs">
              <GraduationCap size={11} className="text-sky-400 flex-shrink-0" />
              <span>{p.company}</span>
            </div>
          )}
        </div>

        <p className={`text-slate-400 text-xs leading-relaxed flex-1 ${expanded ? '' : 'line-clamp-3'}`}>
          {p.bio}
        </p>
        <button
          className="mt-2 text-sky-400 text-xs font-medium hover:text-sky-300 transition-colors text-left"
          onClick={() => setExpanded(e => !e)}
        >
          {expanded ? 'Show less' : 'Read more'}
        </button>

        <button
          className="mt-3 flex items-center justify-center gap-1.5 px-3 py-2 bg-sky-400/10 border border-sky-400/25 hover:bg-sky-400/20 rounded-lg text-sky-400 text-xs font-semibold transition-colors"
          onClick={() => setContactOpen(true)}
        >
          <Mail size={13} /> Contact
        </button>
      </div>

      {contactOpen && <ContactModal recipientName={p.name} onClose={() => setContactOpen(false)} />}
    </div>
  )
}

export default function Directory() {
  const [query,   setQuery]   = useState('')
  const [country, setCountry] = useState('All')

  const filtered = useMemo(() =>
    alumni.filter(a => {
      const matchQuery = a.name.toLowerCase().includes(query.toLowerCase()) ||
                         a.profession.toLowerCase().includes(query.toLowerCase()) ||
                         a.location.toLowerCase().includes(query.toLowerCase())
      const matchCountry = country === 'All' || a.country === country
      return matchQuery && matchCountry
    }),
    [query, country]
  )

  return (
    <div className="bg-[#0F172A] min-h-screen pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">

        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 bg-sky-400/10 border border-sky-400/20 rounded-full text-sky-400 text-xs font-semibold uppercase tracking-wider mb-4">
            Alumni Directory
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">Find Your Brothers</h1>
          <p className="text-slate-400 max-w-lg mx-auto">
            {alumni.length} alumni profiles from the Classes of 1965 to 1976. Search by name, profession, or location.
          </p>
        </div>

        {/* Search */}
        <div className="mb-10 max-w-2xl mx-auto">
          <div className="relative">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search name, profession, location…"
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-3 bg-slate-800 border border-slate-700 focus:border-sky-400/60 rounded-xl text-white text-sm placeholder-slate-500 outline-none transition-colors"
            />
            {query && (
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white" onClick={() => setQuery('')}>
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Country filter */}
        {COUNTRIES.length > 2 && (
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {COUNTRIES.map(c => (
              <button
                key={c}
                onClick={() => setCountry(c)}
                className={`px-4 py-2 rounded-full text-xs font-semibold border transition-colors ${
                  country === c
                    ? 'bg-sky-400 border-sky-400 text-slate-900'
                    : 'bg-slate-800 border-slate-700 text-slate-300 hover:border-sky-400/50 hover:text-white'
                }`}
              >
                {c === 'All' ? 'All Countries' : `${flagFor(c)} ${c}`}
              </button>
            ))}
          </div>
        )}

        {/* Results count */}
        <p className="text-slate-500 text-sm mb-6 text-center">
          Showing <span className="text-sky-400 font-semibold">{filtered.length}</span> alumni
        </p>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map(a => <AlumniCard key={a.id} p={a} />)}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-white font-semibold text-lg mb-2">No alumni found</h3>
            <p className="text-slate-500 text-sm">Try a different name, profession, or location — or check back once the directory is populated.</p>
          </div>
        )}
      </div>
    </div>
  )
}
