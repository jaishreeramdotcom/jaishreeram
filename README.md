# Jai Shree Ram - Global Blessing Counter 🙏

A beautiful Hindu blessing counter with **real-time synchronization** across all devices worldwide using Supabase.

![Version](https://img.shields.io/badge/version-2.0-orange)
![License](https://img.shields.io/badge/license-MIT-blue)

## ✨ Features

- 🌍 **Global Counter** - One counter shared by everyone, everywhere
- ⚡ **Real-Time Sync** - Updates appear instantly on all devices
- 🔒 **Thread-Safe** - No lost counts, even with simultaneous clicks
- 🎨 **Beautiful UI** - Stunning animations and Sanskrit mantras
- 📱 **Responsive** - Works perfectly on mobile and desktop
- 🆓 **Free** - Runs on Supabase free tier

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Supabase
1. Create a project at [supabase.com](https://supabase.com)
2. Copy your credentials from Settings → API
3. Create `.env` file:
```bash
cp .env.example .env
# Add your Supabase URL and anon key
```

### 3. Set Up Database
1. Go to SQL Editor in Supabase
2. Run the SQL from `supabase-setup.sql`
3. Enable Realtime for the `counter` table

### 4. Run Development Server
```bash
npm run dev
```

### 5. Test It!
Open browser console and run:
```javascript
testSupabase()
```

## 📖 Documentation

- **[SETUP_COMPLETE.md](SETUP_COMPLETE.md)** - Start here!
- **[QUICKSTART.md](QUICKSTART.md)** - 5-minute setup guide
- **[SUPABASE_SETUP.md](SUPABASE_SETUP.md)** - Detailed setup instructions
- **[TEST_REALTIME.md](TEST_REALTIME.md)** - Testing guide
- **[DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md)** - Production deployment

## 🎯 How It Works

```
Device 1 ──┐
           ├──> Supabase Database (Real-time sync)
Device 2 ──┤         ↓
           │    All devices update instantly
Device 3 ──┘
```

When anyone clicks "Take Blessings":
1. Counter increments in Supabase database
2. All connected devices receive update via WebSocket
3. Counter updates instantly everywhere

## 🛠️ Tech Stack

- **Frontend:** React + TypeScript + Vite
- **Styling:** Tailwind CSS
- **Database:** Supabase (PostgreSQL)
- **Real-Time:** Supabase Realtime (WebSocket)
- **UI Components:** Radix UI + shadcn/ui

## 📱 Try It Out

1. Open the app in multiple browser tabs
2. Click "Take Blessings" in one tab
3. Watch the counter update in real-time in all tabs! ✨

## 🌟 What's New in Version 2.0

- ✅ Global real-time synchronization with Supabase
- ✅ Thread-safe atomic counter increments
- ✅ WebSocket-based live updates
- ✅ Comprehensive documentation
- ✅ Testing utilities
- ✅ Production-ready deployment guides

## 📂 Project Structure

```
├── src/
│   ├── app/
│   │   ├── App.tsx              # Main app with Supabase integration
│   │   └── components/          # UI components
│   ├── lib/
│   │   ├── supabase.ts          # Supabase client
│   │   └── supabaseTest.ts      # Testing utilities
│   └── styles/                  # CSS styles
├── supabase-setup.sql           # Database setup
├── .env.example                 # Environment template
└── Documentation files...       # Setup guides
```

## 🔒 Security

- Row Level Security (RLS) enabled
- Environment variables for credentials
- HTTPS enforced in production
- Atomic operations prevent race conditions

## 🚀 Deployment

Deploy to Vercel, Netlify, or any static hosting:

```bash
npm run build
```

See [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md) for detailed instructions.

## 📈 Scalability

- ✅ Handles unlimited concurrent users
- ✅ Thousands of clicks per second
- ✅ Global distribution via Supabase
- ✅ Automatic scaling

## 🙏 Original Design

This project is based on the original Figma design:
https://www.figma.com/design/gRWZrv3vJOhkQzmzyn0rTm/Blessings-Counter-Web-App

## 📝 License

MIT License - feel free to use for any purpose!

## 🤝 Contributing

Contributions welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

---

**जय श्री राम! 🕉️**

**May your blessings counter grow infinitely! 🌟**
