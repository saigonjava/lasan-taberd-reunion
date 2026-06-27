import { Flame } from 'lucide-react'
import { memoriam } from '../data/memoriam'

function MemoriamCard({ person }) {
  return (
    <div className="bg-slate-800/40 border border-amber-200/10 rounded-2xl overflow-hidden p-6 text-center">
      <div className="w-24 h-24 rounded-full mx-auto mb-5 overflow-hidden border-2 border-amber-200/30 bg-slate-700 flex items-center justify-center">
        {person.photo ? (
          <img src={`/photos/memoriam/${person.photo}`} alt={person.name} className="w-full h-full object-cover" />
        ) : (
          <Flame size={28} className="text-amber-200/50" />
        )}
      </div>
      <h3 className="text-white font-bold text-lg mb-1">{person.name}</h3>
      <p className="text-amber-200/70 text-sm tracking-wide mb-4">{person.years}</p>
      <p className="text-slate-400 text-sm leading-relaxed italic max-w-sm mx-auto">
        "{person.tribute}"
      </p>
    </div>
  )
}

export default function Memoriam() {
  return (
    <div className="bg-[#0F172A] min-h-screen pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">

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
