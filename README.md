# 🎌 Choukai Audios — Japanese Listening Practice

A modern desktop web application for Japanese listening practice, built with **Next.js** and **Cloudinary**. Browse and play your Japanese audio lessons organized across 4 folders (discs), with an interactive YouTube-style audio player.

---

## ✨ Features

- **4 Disc folders** — Browse all your Japanese audio files organized by disc
- **Live Cloudinary fetch** — Audio files are pulled directly from your Cloudinary library at runtime
- **YouTube-style player** — Interactive orange progress slider with real-time `MM:SS` stopwatch timer
- **Natural track ordering** — Tracks are sorted numerically (Lesson 1, 2, 10... not 1, 10, 2)
- **Session timer** — Footer shows how long you've been studying this session
- **Download button** — Download any track directly from Cloudinary
- **Kanji navigation** — Folder pagination uses Japanese kanji (一 二 三 四)

---

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, Server Components) |
| Styling | Tailwind CSS |
| Audio Storage | Cloudinary |
| SDK | `cloudinary` Node SDK (backend) |
| Language | TypeScript |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx            # Server Component — fetches all 4 disc folders from Cloudinary
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── AudioDashboard.tsx  # Main UI shell with header, session timer, pagination
│   ├── audio/
│   │   └── AudioCard.tsx   # Individual audio track card with HTML5 player
│   └── ui/
│       └── FolderPagination.tsx  # Kanji disc selector
└── lib/
    ├── cloudinary.ts        # Client-side URL helper
    └── cloudinary-server.ts # Server-side API search (fetches audio list)
```

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/Shreyas-Walde/choukai-audios.git
cd choukai-audios
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root:

```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"
```

> Get your API credentials from [Cloudinary Console → Settings → API Keys](https://console.cloudinary.com/settings/api-keys)

### 4. Cloudinary folder structure

Your Cloudinary media library should have this structure:

```
Home/
└── all_dio/
    ├── disc 1/    (81 audio files)
    ├── disc2/     (72 audio files)
    ├── disc 3/    (93 audio files)
    └── disc 4/    (82 audio files)
```

### 5. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 6. Build for production

```bash
npm run build
npm start
```

---

## 🔧 How It Works

1. `page.tsx` (Server Component) calls `fetchFolderAudio()` for each of the 4 discs at request time
2. `cloudinary-server.ts` uses the Cloudinary Search API to list all audio files (`resource_type:video`) in each subfolder, sorted numerically
3. The fetched list is passed as props to `AudioDashboard` (Client Component)
4. Clicking Play on any `AudioCard` creates a native `new Audio(url)` with the Cloudinary `secure_url`, tracking playback via `timeupdate` events
