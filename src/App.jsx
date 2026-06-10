import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import Directory from './pages/Directory'
import RSVP from './pages/RSVP'
import Gallery from './pages/Gallery'
import Forum from './pages/Forum'
import Yearbook from './pages/Yearbook'
import { db } from './lib/firebase'
import { doc, setDoc, increment } from 'firebase/firestore'

export default function App() {
  useEffect(() => {
    setDoc(doc(db, 'stats', 'siteVisits'), { count: increment(1) }, { merge: true })
  }, [])

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#0F172A] text-slate-100 flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/"          element={<Home />} />
            <Route path="/directory" element={<Directory />} />
            <Route path="/rsvp"      element={<RSVP />} />
            <Route path="/gallery"   element={<Gallery />} />
            <Route path="/forum"     element={<Forum />} />
            <Route path="/yearbook"  element={<Yearbook />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
