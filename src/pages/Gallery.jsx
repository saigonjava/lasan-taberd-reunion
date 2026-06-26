import { useState } from 'react'
import { Lock, Eye, EyeOff, X, ChevronLeft, ChevronRight, Upload, Image, Play, Film } from 'lucide-react'
import { photos, ALBUMS, GALLERY_PASSWORD, videos } from '../data/gallery'

function PasswordGate({ onUnlock }) {
  const [pw, setPw]         = useState('')
  const [show, setShow]     = useState(false)
  const [error, setError]   = useState(false)
  const [shake, setShake]   = useState(false)

  const submit = e => {
    e.preventDefault()
    if (pw === GALLERY_PASSWORD) {
      onUnlock()
    } else {
      setError(true)
      setShake(true)
      setTimeout(() => setShake(false), 500)
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className={`max-w-md w-full text-center transition-all ${shake ? 'animate-[shake_0.4s_ease]' : ''}`}>
        <div className="w-20 h-20 rounded-2xl bg-sky-400/10 border border-sky-400/25 flex items-center justify-center mx-auto mb-6 shadow-neon">
          <Lock size={32} className="text-sky-400" />
        </div>
        <h2 className="text-2xl font-black text-white mb-2">Gallery Access</h2>
        <p className="text-slate-400 text-sm mb-8">
          This gallery is private — for Lasan Taberd alumni only.<br />
          Enter the password provided by the committee.
        </p>
        <form onSubmit={submit}>
          <div className="relative mb-4">
            <input
              type={show ? 'text' : 'password'}
              value={pw}
              onChange={e => { setPw(e.target.value); setError(false) }}
              placeholder="Enter gallery password"
              className={`w-full px-4 py-3.5 pr-12 bg-slate-800 border rounded-xl text-white text-center text-base tracking-widest placeholder-slate-500 outline-none transition-all ${
                error ? 'border-red-500/70 bg-red-500/5' : 'border-slate-700 focus:border-sky-400/60'
              }`}
              autoFocus
            />
            <button
              type="button"
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
              onClick={() => setShow(s => !s)}
            >
              {show ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </div>
          {error && <p className="text-red-400 text-xs mb-4">Incorrect password. Please try again.</p>}
          <button
            type="submit"
            className="w-full py-3.5 bg-sky-500 hover:bg-sky-400 text-white font-bold rounded-xl neon-btn shadow-neon transition-all"
          >
            Unlock Gallery
          </button>
        </form>
        <p className="text-slate-600 text-xs mt-6">
          Hint: the password was sent in the website admin email. Contact us at saigonjava@gmail.com
        </p>
      </div>
    </div>
  )
}

function Lightbox({ photos, index, onClose, onPrev, onNext }) {
  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <button className="absolute top-4 right-4 p-2 bg-slate-800/80 hover:bg-slate-700 rounded-xl text-white transition-all z-10" onClick={onClose}>
        <X size={20} />
      </button>
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-slate-800/80 hover:bg-slate-700 rounded-xl text-white transition-all z-10 disabled:opacity-30"
        onClick={e => { e.stopPropagation(); onPrev() }}
        disabled={index === 0}
      >
        <ChevronLeft size={22} />
      </button>
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-slate-800/80 hover:bg-slate-700 rounded-xl text-white transition-all z-10 disabled:opacity-30"
        onClick={e => { e.stopPropagation(); onNext() }}
        disabled={index === photos.length - 1}
      >
        <ChevronRight size={22} />
      </button>
      <div className="max-w-4xl w-full mx-4" onClick={e => e.stopPropagation()}>
        <img
          src={photos[index].src}
          alt={photos[index].caption}
          className="w-full max-h-[75vh] object-cover rounded-2xl shadow-card"
        />
        <div className="mt-4 text-center">
          <p className="text-white font-medium text-sm">{photos[index].caption}</p>
          <p className="text-slate-500 text-xs mt-1">{index + 1} / {photos.length}</p>
        </div>
      </div>
    </div>
  )
}

function VideoModal({ video, onClose }) {
  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <button className="absolute top-4 right-4 p-2 bg-slate-800/80 hover:bg-slate-700 rounded-xl text-white transition-all z-10" onClick={onClose}>
        <X size={20} />
      </button>
      <div className="max-w-4xl w-full mx-4" onClick={e => e.stopPropagation()}>
        <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-card">
          <iframe
            src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
        <div className="mt-4 text-center">
          <p className="text-white font-medium text-sm">{video.title}</p>
        </div>
      </div>
    </div>
  )
}

export default function Gallery() {
  const [unlocked, setUnlocked]   = useState(false)
  const [lightbox, setLightbox]   = useState(null)
  const [activeVideo, setActiveVideo] = useState(null)
  const [album, setAlbum]         = useState('all')

  const filtered = album === 'all' ? photos : photos.filter(p => p.album === album)

  const openAt  = i => setLightbox(i)
  const closeLb = () => setLightbox(null)
  const prev    = () => setLightbox(i => Math.max(0, i - 1))
  const next    = () => setLightbox(i => Math.min(filtered.length - 1, i + 1))

  return (
    <div className="bg-[#0F172A] min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-block px-3 py-1 bg-sky-400/10 border border-sky-400/20 rounded-full text-sky-400 text-xs font-semibold uppercase tracking-wider mb-4">
            Photo Gallery
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">Memories Through the Years</h1>
          <p className="text-slate-400 max-w-lg mx-auto">
            A private collection of photos from Taberd days and all the reunions since.
            {!unlocked && <> <span className="text-sky-400">Password required.</span></>}
          </p>
        </div>

        {!unlocked ? (
          <PasswordGate onUnlock={() => setUnlocked(true)} />
        ) : (
          <>
            {/* Upload prompt */}
            <div className="mb-8 p-5 bg-slate-800/40 border border-dashed border-slate-600 rounded-2xl flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
              <div className="w-12 h-12 rounded-xl bg-sky-400/10 border border-sky-400/20 flex items-center justify-center flex-shrink-0">
                <Upload size={20} className="text-sky-400" />
              </div>
              <div className="flex-1">
                <div className="text-white font-semibold text-sm mb-1">Share Your Photos</div>
                <div className="text-slate-400 text-xs">Have old photos from Taberd or past reunions? Email them to <span className="text-sky-400">saigonjava@gmail.com</span> and the committee will add them to the gallery.</div>
              </div>
              <button className="flex-shrink-0 px-4 py-2 bg-sky-500/10 border border-sky-400/30 hover:bg-sky-500/20 text-sky-400 text-sm font-medium rounded-xl transition-all">
                <Image size={14} className="inline mr-1.5" />Submit Photo
              </button>
            </div>

            {/* Videos */}
            {videos.length > 0 && (
              <div className="mb-10">
                <div className="flex items-center gap-2 mb-4">
                  <Film size={18} className="text-sky-400" />
                  <h2 className="text-white font-bold text-lg">Memories on Video</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {videos.map(video => (
                    <button
                      key={video.id}
                      className="group relative aspect-video overflow-hidden rounded-xl border border-slate-700 hover:border-sky-400/50 transition-all cursor-pointer"
                      onClick={() => setActiveVideo(video)}
                    >
                      <img
                        src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-sky-500/90 flex items-center justify-center shadow-neon">
                          <Play size={20} className="text-white fill-white ml-0.5" />
                        </div>
                      </div>
                      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 to-transparent p-3 text-left">
                        <p className="text-white text-xs font-medium leading-tight">{video.title}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Album filter */}
            {ALBUMS.length > 1 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {ALBUMS.map(({ id, label }) => (
                  <button
                    key={id}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      album === id
                        ? 'bg-sky-400/15 border border-sky-400/40 text-sky-400'
                        : 'bg-slate-800 border border-slate-700 text-slate-400 hover:text-white hover:border-slate-600'
                    }`}
                    onClick={() => setAlbum(id)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}

            {/* Grid */}
            {filtered.length === 0 ? (
              <div className="text-center py-16 px-4 bg-slate-800/30 border border-dashed border-slate-700 rounded-2xl">
                <Image size={28} className="text-slate-600 mx-auto mb-3" />
                <p className="text-slate-400 text-sm">No photos in this album yet — check back soon, or share yours with the committee!</p>
              </div>
            ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {filtered.map((photo, i) => (
                <button
                  key={photo.id}
                  className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-slate-700 hover:border-sky-400/50 transition-all cursor-pointer"
                  onClick={() => openAt(i)}
                >
                  <img
                    src={photo.thumb}
                    alt={photo.caption}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                    <p className="text-white text-xs font-medium leading-tight">{photo.caption}</p>
                  </div>
                </button>
              ))}
            </div>
            )}
          </>
        )}
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <Lightbox photos={filtered} index={lightbox} onClose={closeLb} onPrev={prev} onNext={next} />
      )}

      {/* Video Modal */}
      {activeVideo && (
        <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />
      )}
    </div>
  )
}
