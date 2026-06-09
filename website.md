# Lasan Taberd Class 65~76 — Reunion Website

## Dev Server

**Start the local development server:**
```bash
cd /Users/phillipnguyen/ClaudeCode-Project/website/reunion
npm run dev
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
