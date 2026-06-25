import { createPortal } from 'react-dom'
import { X } from 'lucide-react'

export default function PhotoModal({ name, photo, onClose }) {
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80" onClick={onClose}>
      <div className="relative max-w-lg w-full" onClick={e => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-slate-300 hover:text-white transition-colors"
          aria-label="Close"
        >
          <X size={24} />
        </button>
        <img src={photo} alt={name} className="w-full rounded-2xl border border-slate-700 shadow-card" />
        <p className="text-center text-white font-semibold mt-3">{name}</p>
      </div>
    </div>,
    document.body
  )
}
