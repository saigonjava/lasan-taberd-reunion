import { Link } from 'react-router-dom'
import { MapPin, Calendar, Clock, Users, ChevronDown, ArrowRight } from 'lucide-react'
import { useCountdown } from '../hooks/useCountdown'
import AnnouncementBanner from '../components/layout/AnnouncementBanner'

const EVENT_DATE = '2026-10-24T18:00:00'

function CountdownBox({ value, label }) {
  return (
    <div className="flex flex-col items-center px-4 sm:px-6 py-4 bg-slate-800/70 border border-slate-700 rounded-2xl min-w-[72px] sm:min-w-[90px]">
      <span className="text-3xl sm:text-5xl font-black text-sky-400 text-neon-glow tabular-nums leading-none">
        {String(value).padStart(2, '0')}
      </span>
      <span className="text-xs text-slate-400 uppercase tracking-widest mt-2 font-medium">{label}</span>
    </div>
  )
}

function EventCard({ icon: Icon, label, value, sub }) {
  return (
    <div className="flex items-start gap-4 p-5 bg-slate-800/60 border border-slate-700 rounded-2xl card-hover">
      <div className="w-10 h-10 rounded-xl bg-sky-400/10 border border-sky-400/20 flex items-center justify-center flex-shrink-0">
        <Icon size={18} className="text-sky-400" />
      </div>
      <div>
        <div className="text-xs text-slate-500 uppercase tracking-wider font-medium mb-1">{label}</div>
        <div className="text-white font-semibold text-sm">{value}</div>
        {sub && <div className="text-slate-400 text-xs mt-0.5">{sub}</div>}
      </div>
    </div>
  )
}

export default function Home() {
  const { days, hours, minutes, seconds } = useCountdown(EVENT_DATE)

  return (
    <div className="bg-[#0F172A]">

      <AnnouncementBanner />

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Grid bg */}
        <div className="absolute inset-0 bg-grid-pattern opacity-100" />
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
            Grand Reunion · <span className="text-white font-semibold">October 24, 2026</span>
          </h2>
          <p className="animate-fade-up-d2 text-slate-400 text-sm sm:text-base mb-12 max-w-lg mx-auto leading-relaxed">
            Lasan Taberd Promo 65~76 Brotherhood — reunited across continents, decades, and memories.
            Join us for an unforgettable evening at the Orange County, California.
          </p>

          {/* Countdown */}
          <div className="animate-fade-up-d3 flex justify-center gap-3 sm:gap-4 mb-12">
            <CountdownBox value={days}    label="Days" />
            <CountdownBox value={hours}   label="Hours" />
            <CountdownBox value={minutes} label="Min" />
            <CountdownBox value={seconds} label="Sec" />
          </div>

          {/* CTAs */}
          <div className="animate-fade-up-d3 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/rsvp"
              className="px-8 py-4 bg-sky-500 hover:bg-sky-400 text-white font-bold rounded-xl neon-btn shadow-neon text-sm sm:text-base"
            >
              Secure Your Spot
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

      {/* ── EVENT DETAILS ────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 bg-sky-400/10 border border-sky-400/20 rounded-full text-sky-400 text-xs font-semibold uppercase tracking-wider mb-4">
            Event Details
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">Everything You Need to Know</h2>
          <p className="text-slate-400 max-w-xl mx-auto">One night. Fifty years of stories. An evening we will remember for another half century.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <EventCard icon={Calendar} label="Date"     value="October 24, 2026"   sub="Saturday Evening" />
          <EventCard icon={Clock}    label="Time"     value="6:00 PM – 11:00 PM" sub="Doors open at 5:30 PM" />
          <EventCard icon={MapPin}   label="Venue"    value="8058 Lampson Ave"   sub="Stanton, CA 90680" />
          <EventCard icon={Users}    label="Capacity" value="Limited to 80"      sub="Register early — seats filling fast" />
        </div>
      </section>

      {/* ── PROGRAM ──────────────────────────────────────── */}
      <section className="bg-slate-900/50 border-y border-slate-800 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 bg-sky-400/10 border border-sky-400/20 rounded-full text-sky-400 text-xs font-semibold uppercase tracking-wider mb-4">
              Program
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">Evening Schedule</h2>
          </div>
          <div className="relative">
            <div className="absolute left-[18px] sm:left-1/2 top-0 bottom-0 w-px bg-slate-700 sm:-translate-x-px" />
            {[
              { time: '5:30 PM', title: 'Arrival & Cocktail Reception', desc: 'Welcome drinks, photo-op station, pre-event networking' },
              { time: '6:00 PM', title: 'Grand Opening Ceremony', desc: 'Welcome address from the Reunion Committee, everyones sing Lasan Hanh Khuc.'},             { time: '6:30 PM', title: 'Dinner Service', desc: 'A multi-course banquet by Diamond Seafood Palace — sodas, beers, and wines included' },
              { time: '7:30 PM', title: 'Memorial Tribute', desc: 'Remembering the Brothers and Teachers we have lost.' },
              { time: '8:00 PM', title: 'Live Music & Entertainment', desc: 'One Man band Live performing classic Vietnamese, French and American music.'},
              { time: '9:30 PM', title: 'Open Dance Floor & Mingling', desc: 'Free time to reconnect, dance, and relive old memories until 11 PM' },
            ].map((item, i) => (
              <div key={i} className={`relative flex items-start gap-6 mb-8 ${i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}>
                <div className={`flex-1 ${i % 2 === 0 ? 'sm:text-right' : 'sm:text-left'} pl-10 sm:pl-0`}>
                  <div className="p-4 bg-slate-800/60 border border-slate-700 rounded-xl card-hover inline-block w-full sm:w-auto sm:max-w-xs">
                    <div className="text-sky-400 text-xs font-bold uppercase tracking-wider mb-1">{item.time}</div>
                    <div className="text-white font-semibold text-sm mb-1">{item.title}</div>
                    <div className="text-slate-400 text-xs leading-relaxed">{item.desc}</div>
                  </div>
                </div>
                <div className="absolute left-0 sm:relative sm:left-auto flex-shrink-0 w-9 h-9 rounded-full bg-slate-800 border-2 border-sky-400/50 flex items-center justify-center z-10 shadow-neon">
                  <div className="w-2 h-2 rounded-full bg-sky-400" />
                </div>
                <div className="hidden sm:block flex-1" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
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
      </section>

      {/* ── WELCOME MESSAGE ──────────────────────────────── */}
      <section className="bg-slate-900/50 border-y border-slate-800 py-20">
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
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-24 text-center">
        <h2 className="text-3xl sm:text-5xl font-black text-white mb-4 leading-tight">
          Ready to Reunite<br />with Your Brothers?
        </h2>
        <p className="text-slate-400 mb-10 max-w-lg mx-auto">
          Seats are limited. Register now to guarantee your place at the Grand Reunion — October 24, 2026.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/rsvp"
            className="inline-flex items-center gap-2 px-8 py-4 bg-sky-500 hover:bg-sky-400 text-white font-bold rounded-xl neon-btn shadow-neon"
          >
            Register Now <ArrowRight size={18} />
          </Link>
          <Link
            to="/forum"
            className="inline-flex items-center gap-2 px-8 py-4 border border-slate-600 hover:border-slate-500 text-slate-300 hover:text-white font-semibold rounded-xl transition-all hover:bg-slate-800"
          >
            Visit the Forum
          </Link>
        </div>
      </section>

    </div>
  )
}
