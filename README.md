# Iza Mahendra - Portfolio

Next.js 14 · Tailwind CSS · Prisma · NextAuth · iOS Design

---

## Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Buat file `.env.local`
Copy dari `.env.example` lalu isi semua variabelnya:
```bash
cp .env.example .env.local
```

### 3. Setup database
Kalau pakai database baru (misal Supabase / Neon):
```bash
npx prisma migrate dev --name init
```

Kalau mau sambungkan ke database lama yang sudah ada, cukup set `DATABASE_URL` ke koneksi yang sama — data Guestbook lama langsung terbaca.

### 4. Setup Google OAuth
1. Buka [console.cloud.google.com](https://console.cloud.google.com)
2. Buat project baru → APIs & Services → Credentials
3. Buat OAuth 2.0 Client ID
4. Authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
5. Copy Client ID & Secret ke `.env.local`

### 5. Jalankan dev server
```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000)

---

## Struktur folder

```
src/
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/route.ts
│   │   └── guestbook/
│   │       ├── route.ts          ← GET, POST, DELETE
│   │       └── [entryId]/route.ts ← POST reply
│   ├── page.tsx          ← Home
│   ├── portfolio/        ← Portfolio
│   ├── tools/            ← Tools
│   ├── guestbook/        ← Guestbook (client)
│   ├── about/            ← About
│   ├── contact/          ← Contact
│   └── daily-uses/       ← Daily Uses
├── components/
│   ├── elements/
│   │   ├── Avatar.tsx
│   │   ├── EntryBubble.tsx
│   │   └── PageHeading.tsx
│   └── layout/
│       ├── Navbar.tsx
│       └── SessionWrapper.tsx
├── lib/
│   ├── auth.ts
│   ├── prisma.ts
│   └── utils.ts
├── styles/globals.css
└── types/index.ts
```

---

## Deploy ke Vercel

1. Push ke GitHub
2. Import di [vercel.com](https://vercel.com)
3. Tambahkan semua env variables di Vercel dashboard
4. Update `NEXTAUTH_URL` ke domain production
5. Update Google OAuth redirect URI ke domain production
