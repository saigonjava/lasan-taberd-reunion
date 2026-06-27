import { Flame } from 'lucide-react'
import { memoriam } from '../data/memoriam'

function MemoriamCard({ person }) {
  return (
    <div className="bg-slate-800/40 border border-amber-200/10 rounded-2xl overflow-hidden p-8 sm:p-10 text-center">
      <div className="w-48 h-48 rounded-full mx-auto mb-6 overflow-hidden border-2 border-amber-200/30 bg-slate-700 flex items-center justify-center">
        {person.photo ? (
          <img src={`/photos/memoriam/${person.photo}`} alt={person.name} className="w-full h-full object-cover" />
        ) : (
          <Flame size={48} className="text-amber-200/50" />
        )}
      </div>
      <h3 className="text-white font-bold text-xl mb-1.5">{person.name}</h3>
      <p className="text-amber-200/70 text-base tracking-wide mb-5">{person.years}</p>
      <p className="text-slate-400 text-base leading-relaxed italic max-w-sm mx-auto">
        "{person.tribute}"
      </p>
    </div>
  )
}

export default function Memoriam() {
  return (
    <div className="relative bg-gradient-to-b from-[#2b1d0f] via-[#1a1610] to-[#0F172A] min-h-screen pt-24 pb-20 overflow-hidden">
      {/* Warm candlelight glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-amber-500/25 rounded-full blur-[140px] animate-glow-pulse pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] bg-orange-400/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-[450px] h-[450px] bg-amber-300/20 rounded-full blur-[120px] pointer-events-none" />
      {/* Soft vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_0%,#0F172A_90%)] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-amber-200/10 border border-amber-200/20 rounded-full text-amber-200/80 text-xs font-semibold uppercase tracking-wider mb-4">
            <Flame size={12} /> In Memoriam
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">Forever in Our Hearts</h1>
          <p className="text-slate-400 max-w-lg mx-auto leading-relaxed">
            In loving memory of our brothers from Lasan Taberd who are no longer with us,
            but whose friendship and spirit will never be forgotten.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {memoriam.map(person => (
            <MemoriamCard key={person.id} person={person} />
          ))}
        </div>

        {/* Share a memory note */}
        <div className="mt-14 p-6 bg-slate-800/30 border border-dashed border-slate-700 rounded-2xl text-center">
          <p className="text-slate-400 text-sm">
            If you'd like to add a classmate to this page or share a memory,
            please email <span className="text-amber-200/80">saigonjava@gmail.com</span>.
          </p>
        </div>
      </div>
    </div>
  )
}
