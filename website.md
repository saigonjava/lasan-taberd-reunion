# Lasan Taberd Class 65~76 — Reunion Website

## Folder Structure

```
reunion/
├── index.html              ← page shell, fonts (Inter, Cormorant Garamond, Dancing Script)
├── package.json / vite.config.js / tailwind.config.js / postcss.config.js
├── website.md              ← this file
│
├── public/
│   ├── _headers             ← Cloudflare Pages headers (PDF inline display)
│   ├── Reunion2026_list.pdf ← registered classmates list
│   └── photos/
│       ├── alumni/           ← classmate profile photos (Directory page)
│       ├── memoriam/          ← In Memoriam page photos
│       └── gallery/            ← event photos, one folder per year/album
│           (2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, keywest-2022, summer-fl-2018)
│
└── src/
    ├── App.jsx               ← routes (Home, Directory, RSVP, Gallery, Forum, Yearbook, Memoriam)
    ├── main.jsx / index.css
    ├── lib/firebase.js       ← Firestore config (forum posts, visit counter)
    │
    ├── pages/                 ← one file per route
    │   Home.jsx, Directory.jsx, RSVP.jsx, Gallery.jsx, Forum.jsx,
    │   Yearbook.jsx, Memoriam.jsx, HomePostReunion.draft.jsx (unused post-reunion draft)
    │
    ├── components/
    │   ContactModal.jsx, PhotoModal.jsx
    │   layout/  → Navbar.jsx, Footer.jsx, AnnouncementBanner.jsx, BirthdayBanner.jsx
    │
    ├── data/                   ← editable content, no code changes needed
    │   alumni.js     → classmate directory entries (tuple format documented inline)
    │   birthdays.js  → birthday banner data
    │   memoriam.js   → In Memoriam entries
    │   gallery.js    → photo albums + YouTube video links
    │   forum.js      → forum categories
    │   yearbook.js   → yearbook page data
    │
    └── hooks/useCountdown.js  ← homepage countdown timer
```

> A few stray unused files sit in `public/` root (some `Resized_*.JPEG`, a `Screenshot...heic`) — leftover, not referenced by any code, safe to ignore or delete.

## Dev Server

**Start the local development server:**
```bash
cd /Users/phillipnguyen/ClaudeCode-Project/website/reunion
npm run dev


lsof -ti:3000 | xargs kill -9 2>/dev/null; sleep 1
cd /Users/phillipnguyen/ClaudeCode-Project/website/reunion && npm run dev -- --port 3000 --host > /tmp/reunion_dev.log 2>&1 &
sleep 3 && cat /tmp/reunion_dev.log

```
Site runs at: `http://localhost:3000`

---

## ngrok — Public Tunnel

Use ngrok to share the local site with others (e.g., for testing on mobile or sharing a preview link).

**Start ngrok:**
```bash
ngrok http 3000
```

ngrok will output a public URL like:
```
Forwarding   https://abc123.ngrok-free.app -> http://localhost:3000
```

Share that URL with anyone — it stays live as long as ngrok is running.

> **Note:** The dev server (`npm run dev`) must be running before you start ngrok.
> Free tier URLs change every time you restart ngrok.

---

## Formspree — RSVP Email Notifications

Formspree handles RSVP form submissions and sends email notifications to `saigonjava@gmail.com`.

**Endpoint:** `https://formspree.io/f/xvznaeon`

**How it works:**
- Guest fills out the RSVP form and clicks Submit
- The form POSTs to Formspree
- Formspree emails the organizer at `saigonjava@gmail.com` with all the submitted details
- All submissions are also stored in the Formspree dashboard

**View submissions:**
1. Go to [https://formspree.io](https://formspree.io) and log in
2. Select the `xvznaeon` form
3. Click **Submissions** to see all RSVPs

**No server required** — Formspree is a hosted service. The site just needs internet access.

**Relevant file:** `src/pages/RSVP.jsx`

---

## Firebase — Forum (Persistent Posts)

Firebase Firestore stores all forum posts in real-time. Posts survive page refresh and are visible to all visitors.

**Project:** `lasan-taberd-reunion`
**Console:** [https://console.firebase.google.com](https://console.firebase.google.com)

**How it works:**
- When a visitor posts a message, it is saved to Firestore (`posts` collection)
- All visitors see new posts instantly via a real-time listener (`onSnapshot`)
- Posts are ordered newest first

**View / manage posts:**
1. Go to [https://console.firebase.google.com](https://console.firebase.google.com)
2. Select project **lasan-taberd-reunion**
3. Go to **Firestore Database → posts** collection
4. To delete a post: click the document → click the trash icon → **Delete document**

**To clear all posts** (full reset):
- In Firestore console, delete each document in the `posts` collection individually
- Or contact the developer to run a batch delete script

**Relevant files:**
- `src/lib/firebase.js` — Firebase config and initialization
- `src/pages/Forum.jsx` — Forum UI and Firestore integration
- `src/data/forum.js` — Category list

---

## Gallery Password

The photo gallery is password-protected.

**Password:** `taberd2026`

Defined in `src/data/gallery.js` → `export const GALLERY_PASSWORD`

---

## Quick Reference

| Feature        | Service    | Login / Access                              |
|----------------|------------|---------------------------------------------|
| RSVP emails    | Formspree  | formspree.io — saigonjava@gmail.com         |
| Forum posts    | Firebase   | console.firebase.google.com                 |
| Public preview | ngrok      | run `ngrok http 3000` in terminal           |
| Local dev      | Vite       | run `npm run dev` → localhost:3000          |
| Gallery lock   | —          | password: `taberd2026`                      |



## Process ###  
1. Build the production files

cd /Users/phillipnguyen/ClaudeCode-Project/website/reunion
npm run build
2. Deploy to Cloudflare Pages

npx wrangler pages deploy dist --project-name lasan-taberd-reunion --branch master --commit-dirty=true
This pushes the live site to lasantaberd6576.us directly.

3. Push the code to GitHub (separate from the live deploy)

git add -A
git commit -m "Add new alumni photos and entries"
git push
Notes:

## Noted
    Steps 2 and 3 are independent — deploying to Cloudflare makes the site live; pushing to GitHub just saves the code/history. You can do either first, but doing both keeps everything in sync.

##  If you're using GitHub Desktop instead of these git commands, just do: stage/review changes → write a commit summary → Commit to master → Push origin, same as before.


##
# GitHub Desktop deliberately hides the raw git commands behind a simpler visual workflow — it's running them for you in the background. Here's how the GUI maps to what we've been typing in the terminal:
##

# Terminal command	GitHub Desktop equivalent
1. git add -A	Happens automatically — any changed file just shows up checked in the Changes list (left panel)
2. git commit -m "..."	Type your message in the Summary box at the bottom → click "Commit to master"
3. git push	After committing, the top bar changes to a "Push origin" button — click that
4. git pull / git fetch	The "Fetch origin" button (top right, what you see in the screenshot)
5. git log	The History tab (next to "Changes")
6. git diff	Click any file in the Changes list — it shows the diff on the right
