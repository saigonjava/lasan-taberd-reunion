// DRAFT — post-reunion redesign of Home.jsx
// Not wired into App.jsx / routing. Once the Oct 24, 2026 reunion is over and
// RSVP is no longer needed, swap this in to replace src/pages/Home.jsx.

import { Link } from 'react-router-dom'
import { Users, ChevronDown, ArrowRight, MessageCircle, Image, BookOpen } from 'lucide-react'
import AnnouncementBanner from '../components/layout/AnnouncementBanner'

function ExploreCard({ to, icon: Icon, title, desc }) {
  return (
    <Link
      to={to}
      className="group flex flex-col p-6 bg-slate-800/60 border border-slate-700 hover:border-sky-400/40 rounded-2xl card-hover transition-all"
    >
      <div className="w-12 h-12 rounded-xl bg-sky-400/10 border border-sky-400/20 flex items-center justify-center mb-4 group-hover:bg-sky-400/20 transition-colors">
        <Icon size={22} className="text-sky-400" />
      </div>
      <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
      <p className="text-slate-400 text-sm leading-relaxed mb-4 flex-1">{desc}</p>
      <span className="flex items-center gap-1.5 text-sky-400 text-sm font-semibold group-hover:gap-2.5 transition-all">
        Explore <ArrowRight size={14} />
      </span>
    </Link>
  )
}

const EXPLORE_LINKS = [
  { to: '/directory', icon: Users,         title: 'Alumni Directory', desc: 'Browse profiles and reconnect with classmates from around the world.' },
  { to: '/gallery',   icon: Image,         title: 'Photo Gallery',    desc: 'Relive memories through photos from the reunion and years past.' },
  { to: '/forum',     icon: MessageCircle, title: 'Alumni Forum',     desc: 'Share stories, post announcements, and stay connected with the Brotherhood.' },
  { to: '/yearbook',  icon: BookOpen,      title: 'Yearbook Archive', desc: 'Browse digitized yearbook pages from your class years.' },
]

export default function Home() {
  return (
    <div className="bg-[#0F172A]">

      <AnnouncementBanner />

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative min-h-[85vh] flex flex-col items-center justify-center overflow-hidden">
        {/* Background photo */}
        <div className="absolute inset-0">
          <img
            src="/photos/taberd_photo.jpg"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A]/30 via-[#0F172A]/60 to-[#0F172A]" />
        </div>
        {/* Grid bg */}
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        {/* Glow orbs */}
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-sky-500/8 rounded-full blur-[120px] animate-glow-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-600/8 rounded-full blur-[100px] animate-glow-pulse" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-sky-400/4 rounded-full blur-[160px] pointer-events-none" />

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-24 pb-16">
          {/* Badge */}
          <div className="animate-fade-up inline-flex items-center gap-2 px-4 py-2 bg-sky-400/8 border border-sky-400/25 rounded-full text-sky-400 text-xs sm:text-sm font-medium mb-8">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
            Lasan Taberd Classmates 75 & 76 Grand Reunion 2026
          </div>

          {/* Emblem */}
          <div className="animate-fade-up-d1 flex justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-sky-400/50 flex items-center justify-center shadow-neon animate-float">
                <span className="text-sky-400 font-black text-2xl sm:text-3xl tracking-tight">LT</span>
              </div>
              <div className="absolute inset-0 rounded-full border border-sky-400/20 scale-[1.3]" />
              <div className="absolute inset-0 rounded-full border border-sky-400/10 scale-[1.6]" />
            </div>
          </div>

          {/* Title */}
          <h1 className="animate-fade-up-d1 text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-none mb-3">
            Lasan Taberd
          </h1>
          <p className="animate-fade-up-d2 text-sky-400 text-base sm:text-xl font-semibold tracking-[0.25em] uppercase mb-3">
            Class of 1965 ~ 1976
          </p>
          <h2 className="animate-fade-up-d2 text-xl sm:text-2xl font-light text-slate-300 mb-3">
            A Brotherhood Reunited
          </h2>
          <p className="animate-fade-up-d2 text-slate-400 text-sm sm:text-base mb-12 max-w-lg mx-auto leading-relaxed">
            Lasan Taberd Promo 65~76 Brotherhood — reunited across continents, decades, and memories.
            Explore alumni profiles, photos, stories, and the yearbook archive.
          </p>

          {/* CTAs */}
          <div className="animate-fade-up-d3 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/forum"
              className="px-8 py-4 bg-sky-500 hover:bg-sky-400 text-white font-bold rounded-xl neon-btn shadow-neon text-sm sm:text-base"
            >
              Visit the Forum
            </Link>
            <Link
              to="/directory"
              className="px-8 py-4 bg-transparent border border-slate-600 hover:border-sky-400/60 text-slate-300 hover:text-white font-semibold rounded-xl transition-all text-sm sm:text-base hover:bg-sky-400/5"
            >
              Browse Alumni
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-600 animate-bounce">
          <ChevronDown size={22} />
        </div>
      </section>

      {/* ── EXPLORE ──────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 bg-sky-400/10 border border-sky-400/20 rounded-full text-sky-400 text-xs font-semibold uppercase tracking-wider mb-4">
            Explore
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">Stay Connected</h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Pick up where the reunion left off — browse the alumni directory, relive the night through photos,
            join the conversation, and revisit your yearbook.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {EXPLORE_LINKS.map(link => <ExploreCard key={link.to} {...link} />)}
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────────── */}
      <section className="bg-slate-900/50 border-y border-slate-800 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { num: '60+',  label: 'Years of Brotherhood' },
              { num: '66',   label: 'Alumni Registered' },
              { num: '6',    label: 'Countries Represented' },
              { num: '1',    label: 'Night to Remember' },
            ].map(({ num, label }) => (
              <div key={label} className="text-center p-6 bg-slate-800/40 border border-slate-700 rounded-2xl card-hover">
                <div className="text-4xl sm:text-5xl font-black text-sky-400 text-neon-glow mb-2">{num}</div>
                <div className="text-slate-400 text-sm font-medium">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WELCOME MESSAGE ──────────────────────────────── */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <span className="inline-block px-3 py-1 bg-sky-400/10 border border-sky-400/20 rounded-full text-sky-400 text-xs font-semibold uppercase tracking-wider mb-4">
              Welcome
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">Thân Chào Các Bạn</h2>
          </div>
          <div className="space-y-5 text-slate-300 leading-relaxed text-base sm:text-lg bg-slate-800/40 border border-slate-700 rounded-2xl p-6 sm:p-10">
            <p>Từ khi trường Lasan Taberd bị giải tán năm 76, như bầy chim bị vỡ tổ, vận mệnh của đất nước đã đẩy đưa các cựu học sinh của trường lưu lạc khắp nơi.</p>
            <p>Chúng tôi, một nhóm bạn học cũ (65~76)đã may mắn liên lạc lại được với nhau sau hơn 40 năm cách biệt. Với việc tạo dựng nên trang mạng nầy, chúng tôi chỉ có một mục đích duy nhất là tạo nên điều kiện để tất cả các bạn cũ, các cựu học sinh Taberd có cơ hội tìm lại với nhau, cùng nhau nhìn lại những hình ảnh quý giá của thời học trò và cũng để kể cho nhau những vui buồn trong cuộc sống đã qua.</p>
            <p>Và cũng để vinh danh, tưởng nhớ tới các sư huynh, các thầy cô đã bỏ công dạy dỗ chúng ta trong suốt thời gian học dưới mái trường thân yêu Lasan Taberd.</p>
            <p>Chúng tôi hy vọng đạt được mục đích nối kết các bạn cựu học sinh Taberd ở khắp nơi không phân biệt địa vị xã hội, tôn giáo, chính kiến.</p>
            <p className="text-sky-400 font-semibold">Chào thân ái.</p>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────── */}
      <section className="bg-slate-900/50 border-y border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-24 text-center">
          <h2 className="text-3xl sm:text-5xl font-black text-white mb-4 leading-tight">
            Keep the Brotherhood<br />Going
          </h2>
          <p className="text-slate-400 mb-10 max-w-lg mx-auto">
            Share your memories, post updates, and stay in touch with classmates from Class 65~76.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/forum"
              className="inline-flex items-center gap-2 px-8 py-4 bg-sky-500 hover:bg-sky-400 text-white font-bold rounded-xl neon-btn shadow-neon"
            >
              Visit the Forum <ArrowRight size={18} />
            </Link>
            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 px-8 py-4 border border-slate-600 hover:border-slate-500 text-slate-300 hover:text-white font-semibold rounded-xl transition-all hover:bg-slate-800"
            >
              View Gallery
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
