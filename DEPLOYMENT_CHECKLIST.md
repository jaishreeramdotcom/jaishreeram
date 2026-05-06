# Deployment Checklist

Use this checklist when deploying your blessing counter to production.

## ✅ Pre-Deployment

### 1. Supabase Setup
- [ ] Supabase project created
- [ ] SQL setup script executed successfully
- [ ] Counter table has initial row (id=1, value=0)
- [ ] Realtime enabled for counter table
- [ ] RLS policies created and active
- [ ] `increment_counter` function exists and works

### 2. Environment Variables
- [ ] `.env` file created locally (for development)
- [ ] Environment variables set in deployment platform
- [ ] `VITE_SUPABASE_URL` configured
- [ ] `VITE_SUPABASE_ANON_KEY` configured
- [ ] `.env` added to `.gitignore`

### 3. Testing
- [ ] Run `testSupabase()` in browser console - all tests pass
- [ ] Counter increments correctly
- [ ] Real-time sync works between multiple browser tabs
- [ ] No console errors
- [ ] Animations work smoothly

### 4. Code Quality
- [ ] No TypeScript errors (`npm run build`)
- [ ] All dependencies installed
- [ ] Build completes successfully

## 🚀 Deployment Platforms

### Vercel (Recommended)

1. **Install Vercel CLI** (optional)
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Set Environment Variables**
   - Go to Vercel dashboard → Project → Settings → Environment Variables
   - Add `VITE_SUPABASE_URL`
   - Add `VITE_SUPABASE_ANON_KEY`
   - Redeploy

4. **Custom Domain** (optional)
   - Go to Vercel dashboard → Project → Settings → Domains
   - Add your custom domain

### Netlify

1. **Install Netlify CLI** (optional)
   ```bash
   npm i -g netlify-cli
   ```

2. **Deploy**
   ```bash
   netlify deploy --prod
   ```

3. **Set Environment Variables**
   - Go to Netlify dashboard → Site → Site settings → Environment variables
   - Add `VITE_SUPABASE_URL`
   - Add `VITE_SUPABASE_ANON_KEY`
   - Redeploy

### GitHub Pages

1. **Update vite.config.ts**
   ```typescript
   export default defineConfig({
     base: '/your-repo-name/',
     // ... rest of config
   });
   ```

2. **Build**
   ```bash
   npm run build
   ```

3. **Deploy**
   - Use GitHub Actions or manual deployment
   - Note: Environment variables need to be set at build time

## ✅ Post-Deployment

### 1. Verify Deployment
- [ ] Site loads correctly
- [ ] Counter displays initial value
- [ ] "Take Blessings" button works
- [ ] Counter increments
- [ ] No console errors

### 2. Test Real-Time Sync
- [ ] Open site on desktop
- [ ] Open site on mobile
- [ ] Click on one device
- [ ] Verify counter updates on other device instantly

### 3. Performance Check
- [ ] Page loads in < 3 seconds
- [ ] Animations are smooth
- [ ] No lag when clicking button
- [ ] Real-time updates appear within 1 second

### 4. Cross-Browser Testing
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari (desktop)
- [ ] Safari (iOS)
- [ ] Chrome (Android)

### 5. Monitor
- [ ] Check Supabase dashboard for API usage
- [ ] Monitor error logs
- [ ] Track counter growth
- [ ] Check bandwidth usage

## 🔒 Security Checklist

- [ ] `.env` file NOT committed to git
- [ ] Supabase anon key is public-safe (it should be)
- [ ] RLS policies are active
- [ ] No sensitive data exposed in client code
- [ ] HTTPS enabled (automatic on Vercel/Netlify)

## 📊 Optional: Analytics

### Add Google Analytics
```html
<!-- Add to index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Track Blessing Events
```typescript
// In handleBlessingPress
gtag('event', 'blessing_taken', {
  event_category: 'engagement',
  event_label: 'blessing_counter',
  value: newCount
});
```

## 🎯 Performance Optimization

### Enable Compression
Most platforms (Vercel, Netlify) enable this automatically.

### Add Caching Headers
```typescript
// vercel.json
{
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

### Optimize Images
- Use WebP format for images
- Compress images before deployment
- Use lazy loading for images

## 🐛 Troubleshooting

### Counter not working in production
1. Check environment variables are set correctly
2. Verify Supabase URL is accessible
3. Check browser console for errors
4. Verify Realtime is enabled in Supabase

### Slow real-time updates
1. Check Supabase region (closer = faster)
2. Verify internet connection
3. Check Supabase status page

### Build fails
1. Run `npm run build` locally first
2. Check for TypeScript errors
3. Verify all dependencies are in package.json
4. Check Node version compatibility

## 📱 Mobile Optimization

- [ ] Responsive design works on all screen sizes
- [ ] Touch interactions work smoothly
- [ ] No horizontal scrolling
- [ ] Text is readable without zooming
- [ ] Buttons are large enough to tap (min 44x44px)

## 🎉 Launch Checklist

- [ ] All tests pass
- [ ] Deployed to production
- [ ] Custom domain configured (optional)
- [ ] SSL certificate active
- [ ] Real-time sync verified
- [ ] Mobile tested
- [ ] Analytics configured (optional)
- [ ] Social media preview configured (optional)

## 📈 Post-Launch

### Week 1
- Monitor Supabase usage daily
- Check for errors in logs
- Gather user feedback
- Track counter growth

### Month 1
- Review Supabase free tier usage
- Consider rate limiting if needed
- Add features based on feedback
- Optimize performance if needed

### Ongoing
- Keep dependencies updated
- Monitor Supabase status
- Backup counter value periodically
- Celebrate milestones (1000, 10000, etc.)

---

## 🎊 Ready to Launch?

Once all checkboxes are complete, you're ready to share your blessing counter with the world!

**May your counter grow infinitely! जय श्री राम! 🙏**
