# Quick Start Guide - Global Blessing Counter

Get your blessing counter with real-time sync running in 5 minutes!

## 🚀 Quick Setup (5 steps)

### 1. Install Dependencies
```bash
npm install
```

### 2. Create Supabase Project
1. Go to [https://app.supabase.com](https://app.supabase.com)
2. Click "New Project"
3. Fill in project details and wait for setup to complete (~2 minutes)

### 3. Get Your Credentials
1. In your Supabase project, go to **Settings** → **API**
2. Copy:
   - **Project URL** 
   - **anon public key**

### 4. Configure Environment
```bash
# Create .env file
cp .env.example .env

# Edit .env and paste your credentials:
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 5. Set Up Database
1. In Supabase dashboard, go to **SQL Editor**
2. Click **New query**
3. Copy all content from `supabase-setup.sql`
4. Paste and click **Run**
5. Go to **Database** → **Replication**
6. Enable replication for the `counter` table

## ✅ Test It!

```bash
# Start dev server
npm run dev

# Open in browser
# Open browser console and run:
testSupabase()

# You should see: ✅ All tests passed!
```

## 🎉 Try It Out!

1. Open the app in multiple browser windows
2. Click "Take Blessings" in one window
3. Watch the counter update in real-time in all windows!

## 📱 Test on Multiple Devices

1. Deploy to Vercel/Netlify (or use ngrok for local testing)
2. Open on your phone and computer
3. Click on one device, see it update on the other instantly!

## 🐛 Troubleshooting

**Counter not syncing?**
- Check browser console for errors
- Verify `.env` file has correct credentials
- Ensure Realtime is enabled for `counter` table in Supabase

**"Error fetching counter"?**
- Make sure you ran the SQL setup script
- Check that the counter table exists in Supabase

**Need more help?**
- See detailed guide: `SUPABASE_SETUP.md`
- Check Supabase logs in dashboard

## 🎯 What You Get

✨ **Real-time sync** - All devices show the same count instantly  
🔒 **Thread-safe** - No lost counts even with simultaneous clicks  
🌍 **Global** - One counter shared by everyone worldwide  
⚡ **Fast** - Updates appear in milliseconds  
🆓 **Free** - Runs on Supabase free tier  

---

**Ready to spread blessings? जय श्री राम! 🙏**
