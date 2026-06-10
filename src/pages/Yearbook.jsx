import { useState } from 'react'
import { BookOpen, ExternalLink } from 'lucide-react'
import { YEARBOOK_CLASSES } from '../data/yearbook'

export default function Yearbook() {
  const [classId, setClassId] = useState(YEARBOOK_CLASSES[0].id)
  const active = YEARBOOK_CLASSES.find(c => c.id === classId)

  return (
    <div className="bg-[#0F172A] min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-block px-3 py-1 bg-sky-400/10 border border-sky-400/20 rounded-full text-sky-400 text-xs font-semibold uppercase tracking-wider mb-4">
            Yearbook
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">Kỷ Yếu Lasan Taberd</h1>
          <p className="text-slate-400 max-w-lg mx-auto">
            Browse the original class yearbook pages, hosted on taberd.org.
          </p>
        </div>

        {/* Class filter */}
        {YEARBOOK_CLASSES.length > 1 && (
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {YEARBOOK_CLASSES.map(({ id, label }) => (
              <button
                key={id}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  classId === id
                    ? 'bg-sky-400/15 border border-sky-400/40 text-sky-400'
                    : 'bg-slate-800 border border-slate-700 text-slate-400 hover:text-white hover:border-slate-600'
                }`}
                onClick={() => setClassId(id)}
              >
                {label}
              </button>
            ))}
          </div>
        )}

        {/* Pages grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {active.pages.map(({ label, url }) => (
            <a
              key={url}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-slate-800/60 border border-slate-700 hover:border-sky-400/40 rounded-2xl p-6 flex flex-col items-center gap-3 text-center card-hover transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-sky-400/10 border border-sky-400/20 flex items-center justify-center group-hover:bg-sky-400/15 transition-all">
                <BookOpen size={20} className="text-sky-400" />
              </div>
              <div className="text-white font-semibold text-sm">{label}</div>
              <div className="flex items-center gap-1 text-slate-500 text-xs group-hover:text-sky-400 transition-colors">
                View <ExternalLink size={11} />
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
