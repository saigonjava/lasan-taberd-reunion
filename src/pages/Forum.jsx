import { useState, useEffect } from 'react'
import { Heart, MessageCircle, Send, ChevronDown, ChevronUp, PenSquare, X, Loader } from 'lucide-react'
import { CATEGORIES } from '../data/forum'
import { db } from '../lib/firebase'
import { collection, addDoc, onSnapshot, orderBy, query, serverTimestamp, updateDoc, arrayUnion, doc } from 'firebase/firestore'

function formatTime(ts) {
  if (!ts) return 'Just now'
  const d = ts.toDate ? ts.toDate() : new Date(ts)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) +
    ' · ' + d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
}

function Avatar({ initials, gradient, size = 'md' }) {
  const sz = size === 'sm' ? 'w-7 h-7 text-xs' : 'w-10 h-10 text-sm'
  return (
    <div className={`${sz} rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-bold flex-shrink-0`}>
      {initials}
    </div>
  )
}

function Reply({ r }) {
  return (
    <div className="flex gap-3 pt-3">
      <Avatar initials={r.initials} gradient={r.gradient} size="sm" />
      <div className="flex-1 bg-slate-800/60 rounded-xl p-3">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-white text-xs font-semibold">{r.author}</span>
          <span className="text-slate-600 text-xs">{formatTime(r.time)}</span>
        </div>
        <p className="text-slate-300 text-sm leading-relaxed">{r.body}</p>
      </div>
    </div>
  )
}

function PostCard({ post, onLike }) {
  const [showReplies,  setShowReplies]  = useState(false)
  const [replyOpen,    setReplyOpen]    = useState(false)
  const [replyText,    setReplyText]    = useState('')
  const [replyAuthor,  setReplyAuthor]  = useState('')
  const [likes, setLikes]              = useState(post.likes)
  const [liked, setLiked]              = useState(false)

  const replies = post.replies || []

  const submitReply = async e => {
    e.preventDefault()
    if (!replyText.trim()) return
    const name = replyAuthor.trim() || 'Anonymous'
    const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
    await updateDoc(doc(db, 'posts', post.id), {
      replies: arrayUnion({
        id: Date.now(),
        author: name,
        initials,
        gradient: 'from-slate-500 to-slate-600',
        time: new Date().toISOString(),
        body: replyText,
      })
    })
    setReplyText('')
    setReplyAuthor('')
    setReplyOpen(false)
    setShowReplies(true)
  }

  const toggleLike = () => {
    setLiked(l => !l)
    setLikes(n => liked ? n - 1 : n + 1)
  }

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden card-hover">
      <div className="p-5">
        {/* Category badge */}
        <div className="flex items-center justify-between mb-4">
          <span className="px-2.5 py-1 bg-sky-400/10 border border-sky-400/20 rounded-full text-sky-400 text-[10px] font-bold uppercase tracking-wider">
            {post.category}
          </span>
          <span className="text-slate-600 text-xs">{post.time}</span>
        </div>

        {/* Header */}
        <div className="flex items-start gap-3 mb-3">
          <Avatar initials={post.initials} gradient={post.gradient} />
          <div>
            <div className="text-white font-semibold text-sm">{post.author}</div>
            <h3 className="text-slate-200 font-bold text-base leading-tight">{post.title}</h3>
          </div>
        </div>

        {/* Body */}
        <p className="text-slate-400 text-sm leading-relaxed mb-4 ml-13">{post.body}</p>

        {/* Actions */}
        <div className="flex items-center gap-4 pt-3 border-t border-slate-700">
          <button
            className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${liked ? 'text-rose-400' : 'text-slate-500 hover:text-rose-400'}`}
            onClick={toggleLike}
          >
            <Heart size={14} fill={liked ? 'currentColor' : 'none'} /> {likes}
          </button>
          <button
            className="flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-sky-400 transition-colors"
            onClick={() => setShowReplies(s => !s)}
          >
            <MessageCircle size={14} /> {replies.length} {replies.length === 1 ? 'reply' : 'replies'}
            {showReplies ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
          </button>
          <button
            className="ml-auto flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-sky-400 transition-colors"
            onClick={() => setReplyOpen(r => !r)}
          >
            <Send size={13} /> Reply
          </button>
        </div>
      </div>

      {/* Replies */}
      {showReplies && replies.length > 0 && (
        <div className="px-5 pb-4 border-t border-slate-700 pt-1 space-y-1">
          {replies.map(r => <Reply key={r.id} r={r} />)}
        </div>
      )}

      {/* Reply form */}
      {replyOpen && (
        <form onSubmit={submitReply} className="px-5 pb-5 border-t border-slate-700 pt-4">
          <div className="flex gap-3">
            <Avatar initials="YG" gradient="from-slate-500 to-slate-600" size="sm" />
            <div className="flex-1">
              <input
                value={replyAuthor}
                onChange={e => setReplyAuthor(e.target.value)}
                placeholder="Your name (optional)"
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 focus:border-sky-400/60 rounded-xl text-white text-sm placeholder-slate-500 outline-none transition-all mb-2"
              />
              <textarea
                value={replyText}
                onChange={e => setReplyText(e.target.value)}
                placeholder="Write a reply…"
                rows={2}
                autoFocus
                className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 focus:border-sky-400/60 rounded-xl text-white text-sm placeholder-slate-500 outline-none transition-all resize-none"
              />
              <div className="flex justify-end gap-2 mt-2">
                <button type="button" className="px-3 py-1.5 text-slate-400 hover:text-white text-xs rounded-lg transition-colors" onClick={() => setReplyOpen(false)}>
                  Cancel
                </button>
                <button type="submit" disabled={!replyText.trim()} className="px-4 py-1.5 bg-sky-500 hover:bg-sky-400 disabled:opacity-40 text-white text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5">
                  <Send size={11} /> Post
                </button>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  )
}

export default function Forum() {
  const [posts, setPosts]       = useState([])
  const [loading, setLoading]   = useState(true)
  const [category, setCategory] = useState('All')
  const [newPost, setNewPost]   = useState(false)
  const [form, setForm]         = useState({ author: '', title: '', body: '', category: 'General Chat' })

  useEffect(() => {
    const q = query(collection(db, 'posts'), orderBy('timestamp', 'desc'))
    const unsub = onSnapshot(q, snap => {
      setPosts(snap.docs.map(d => ({ id: d.id, ...d.data() })))
      setLoading(false)
    })
    return unsub
  }, [])

  const filtered = category === 'All' ? posts : posts.filter(p => p.category === category)

  const submitPost = async e => {
    e.preventDefault()
    await addDoc(collection(db, 'posts'), {
      category: form.category,
      author: form.author || 'Anonymous',
      initials: (form.author || 'AN').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase(),
      gradient: 'from-sky-500 to-blue-600',
      title: form.title,
      body: form.body,
      likes: 0,
      replies: [],
      timestamp: serverTimestamp(),
    })

    if (form.category === 'Announcements') {
      fetch('https://formspree.io/f/xvznaeon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: `New Announcement: ${form.title}`,
          'Author': form.author || 'Anonymous',
          'Title': form.title,
          'Message': form.body,
        }),
      }).catch(() => {})
    }

    setForm({ author: '', title: '', body: '', category: 'General Chat' })
    setNewPost(false)
    setCategory('All')
  }

  return (
    <div className="bg-[#0F172A] min-h-screen pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-block px-3 py-1 bg-sky-400/10 border border-sky-400/20 rounded-full text-sky-400 text-xs font-semibold uppercase tracking-wider mb-4">
            Message Board
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">Alumni Forum</h1>
          <p className="text-slate-400 max-w-md mx-auto">
            Reconnect with brothers, share memories, ask questions about the event, and find lost contacts.
          </p>
          <p className="mt-4 inline-block px-4 py-2 bg-amber-400/10 border border-amber-400/25 rounded-full text-amber-300 text-xs sm:text-sm font-medium">
            Forum Policy: Please no religious, political, sexual, or money-related content.
          </p>
        </div>

        {/* Category filter + New Post */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(c => (
              <button
                key={c}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  category === c
                    ? 'bg-sky-400/15 border border-sky-400/40 text-sky-400'
                    : 'bg-slate-800 border border-slate-700 text-slate-400 hover:text-white hover:border-slate-600'
                }`}
                onClick={() => setCategory(c)}
              >
                {c}
              </button>
            ))}
          </div>
          <button
            className="flex items-center gap-2 px-4 py-2 bg-sky-500 hover:bg-sky-400 text-white text-sm font-semibold rounded-xl neon-btn shadow-neon flex-shrink-0 transition-all"
            onClick={() => setNewPost(s => !s)}
          >
            {newPost ? <X size={15} /> : <PenSquare size={15} />}
            {newPost ? 'Cancel' : 'New Post'}
          </button>
        </div>

        {/* New post form */}
        {newPost && (
          <form onSubmit={submitPost} className="bg-slate-800/60 border border-sky-400/25 rounded-2xl p-5 mb-6 shadow-neon">
            <h3 className="text-white font-bold text-sm mb-4 flex items-center gap-2">
              <PenSquare size={15} className="text-sky-400" /> Create a New Post
            </h3>
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  className="px-3 py-2.5 bg-slate-900/60 border border-slate-700 focus:border-sky-400/60 rounded-xl text-white text-sm placeholder-slate-500 outline-none transition-all"
                  placeholder="Your name"
                  value={form.author}
                  onChange={e => setForm(f => ({ ...f, author: e.target.value }))}
                />
                <select
                  className="px-3 py-2.5 bg-slate-900/60 border border-slate-700 focus:border-sky-400/60 rounded-xl text-slate-300 text-sm outline-none transition-all cursor-pointer"
                  value={form.category}
                  onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                >
                  {CATEGORIES.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <input
                className="w-full px-3 py-2.5 bg-slate-900/60 border border-slate-700 focus:border-sky-400/60 rounded-xl text-white text-sm placeholder-slate-500 outline-none transition-all"
                placeholder="Post title *"
                value={form.title}
                onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                required
              />
              <textarea
                className="w-full px-3 py-2.5 bg-slate-900/60 border border-slate-700 focus:border-sky-400/60 rounded-xl text-white text-sm placeholder-slate-500 outline-none transition-all resize-none"
                rows={4}
                placeholder="Write your message…"
                value={form.body}
                onChange={e => setForm(f => ({ ...f, body: e.target.value }))}
                required
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-sky-500 hover:bg-sky-400 text-white text-sm font-bold rounded-xl neon-btn shadow-neon transition-all flex items-center gap-2"
                >
                  <Send size={14} /> Post to Forum
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Posts list */}
        <div className="space-y-4">
          {loading ? (
            <div className="flex justify-center py-16">
              <Loader size={28} className="text-sky-400 animate-spin" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-5xl mb-4">💬</div>
              <p className="text-slate-400">No posts in this category yet. Be the first!</p>
            </div>
          ) : (
            filtered.map(post => (
              <PostCard key={post.id} post={{ ...post, time: formatTime(post.timestamp) }} />
            ))
          )}
        </div>
      </div>
    </div>
  )
}
