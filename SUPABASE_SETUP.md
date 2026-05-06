# Supabase Setup Guide for Global Counter

This guide will help you set up Supabase for real-time global counter synchronization across all devices.

## Prerequisites

- A Supabase account (free tier works fine)
- Your Supabase project created at [https://app.supabase.com](https://app.supabase.com)

## Step 1: Get Your Supabase Credentials

1. Go to your Supabase project dashboard
2. Click on **Settings** (gear icon) in the left sidebar
3. Click on **API** under Project Settings
4. Copy the following values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon/public key** (a long string starting with `eyJ...`)

## Step 2: Configure Environment Variables

1. Create a `.env` file in the root of your project (copy from `.env.example`):
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your credentials:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

3. **Important**: Add `.env` to your `.gitignore` to keep credentials secure:
   ```
   .env
   ```

## Step 3: Set Up the Database

1. Go to your Supabase project dashboard
2. Click on **SQL Editor** in the left sidebar
3. Click **New query**
4. Copy the entire contents of `supabase-setup.sql` file
5. Paste it into the SQL editor
6. Click **Run** to execute the SQL

This will:
- Ensure the counter table exists
- Create an initial counter row with value 0
- Create an atomic increment function for thread-safe updates
- Set up Row Level Security (RLS) policies for public access
- Enable Realtime for live updates

## Step 4: Enable Realtime (Important!)

1. In your Supabase dashboard, go to **Database** → **Replication**
2. Find the `counter` table in the list
3. Toggle the switch to **enable** replication for the `counter` table
4. This allows real-time subscriptions to work

## Step 5: Test Your Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Open the app in multiple browser windows or devices
3. Click "Take Blessings" in one window
4. You should see the counter update in real-time in all windows!

## How It Works

### Real-Time Synchronization

The app uses Supabase's real-time features to sync the counter across all devices:

1. **Initial Load**: When a user opens the app, it fetches the current counter value from Supabase
2. **Increment**: When a user clicks "Take Blessings", it calls the `increment_counter` function
3. **Real-Time Update**: Supabase broadcasts the change to all connected clients
4. **Automatic Sync**: All devices receive the update and display the new count

### Atomic Increments

The `increment_counter` PostgreSQL function ensures thread-safe increments:
- Multiple users can click simultaneously
- No race conditions or lost updates
- The database handles concurrency automatically

### Architecture

```
Device 1 ──┐
           ├──> Supabase Database (counter table)
Device 2 ──┤         ↓
           │    Real-time broadcast
Device 3 ──┘         ↓
                All devices update
```

## Troubleshooting

### Counter not updating in real-time?

1. Check that Realtime is enabled for the `counter` table (Step 4)
2. Verify your environment variables are correct
3. Check browser console for errors
4. Ensure your Supabase project is not paused (free tier pauses after inactivity)

### "Error fetching counter" in console?

1. Verify the SQL setup ran successfully
2. Check that RLS policies are created
3. Ensure the counter table has at least one row with `id = 1`

### Counter starts at 0 every time?

1. Check that the initial row was inserted in the database
2. Run this query in SQL Editor to verify:
   ```sql
   SELECT * FROM public.counter WHERE id = 1;
   ```

### Multiple counter rows created?

The app uses `id = 1` as the global counter. If you see multiple rows:
1. Delete extra rows:
   ```sql
   DELETE FROM public.counter WHERE id != 1;
   ```

## Security Notes

- The current setup allows public read and write access to the counter
- This is appropriate for a public blessing counter
- For production, consider adding rate limiting to prevent abuse
- You can add rate limiting using Supabase Edge Functions or database triggers

## Optional: Add Rate Limiting

To prevent spam, you can add a rate limit. Add this to your SQL:

```sql
-- Create a function to check rate limit (max 1 increment per second per IP)
CREATE OR REPLACE FUNCTION check_rate_limit()
RETURNS boolean
LANGUAGE plpgsql
AS $$
BEGIN
  -- Implement your rate limiting logic here
  -- For example, using a separate rate_limit table
  RETURN true;
END;
$$;
```

## Cost Considerations

Supabase free tier includes:
- 500 MB database space (plenty for a counter!)
- 2 GB bandwidth per month
- 50,000 monthly active users
- Unlimited API requests

This blessing counter app will easily fit within free tier limits.

## Next Steps

- Deploy your app to production (Vercel, Netlify, etc.)
- Add analytics to track blessing patterns
- Consider adding a leaderboard or milestone celebrations
- Add animations when reaching special numbers (1000, 10000, etc.)

## Support

If you encounter issues:
1. Check the browser console for errors
2. Check Supabase logs in the dashboard
3. Verify all setup steps were completed
4. Ensure your Supabase project is active (not paused)

---

**May your blessings counter grow infinitely! 🙏 जय श्री राम**
