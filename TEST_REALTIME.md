# Testing Real-Time Synchronization

This guide helps you verify that real-time sync is working correctly.

## 🧪 Test Scenarios

### Test 1: Multiple Browser Tabs (Easiest)

1. **Open the app** in your browser
2. **Duplicate the tab** (Ctrl/Cmd + Shift + D or right-click → Duplicate)
3. **Arrange windows** side by side
4. **Click "Take Blessings"** in one tab
5. **Watch the other tab** - counter should update instantly!

**Expected Result:** ✅ Counter updates in both tabs within 1 second

---

### Test 2: Multiple Browsers

1. **Open the app** in Chrome
2. **Open the app** in Firefox (or Safari)
3. **Arrange windows** side by side
4. **Click "Take Blessings"** in Chrome
5. **Watch Firefox** - counter should update!

**Expected Result:** ✅ Counter updates across different browsers

---

### Test 3: Multiple Devices

1. **Open the app** on your computer
2. **Open the app** on your phone (same WiFi or mobile data)
3. **Click "Take Blessings"** on your phone
4. **Watch your computer** - counter should update!
5. **Try the reverse** - click on computer, watch phone

**Expected Result:** ✅ Counter updates across devices instantly

---

### Test 4: Incognito/Private Mode

1. **Open the app** in normal browser window
2. **Open the app** in incognito/private window
3. **Arrange windows** side by side
4. **Click in either window**
5. **Watch the other** - should update!

**Expected Result:** ✅ Works even without cookies/localStorage

---

### Test 5: Rapid Clicking

1. **Open the app** in two tabs
2. **Click rapidly** in both tabs simultaneously
3. **Watch the counter** - should increment correctly
4. **No counts should be lost**

**Expected Result:** ✅ All clicks are counted, no race conditions

---

### Test 6: Network Interruption

1. **Open the app** in two tabs
2. **Disconnect internet** on one tab (browser dev tools → Network → Offline)
3. **Click in the offline tab** - will fail
4. **Click in the online tab** - should work
5. **Reconnect internet** on offline tab
6. **Refresh offline tab** - should show updated count

**Expected Result:** ✅ Counter stays consistent, offline clicks don't count

---

## 🔍 Debugging Tools

### Browser Console Tests

Open browser console (F12) and run:

```javascript
// Test 1: Check connection
testSupabase()

// Test 2: Check current count
supabase.from('counter').select('*').then(console.log)

// Test 3: Manual increment
supabase.rpc('increment_counter', { counter_id: 1 }).then(console.log)

// Test 4: Subscribe to changes
const channel = supabase
  .channel('test')
  .on('postgres_changes', 
    { event: 'UPDATE', schema: 'public', table: 'counter' },
    payload => console.log('Update received:', payload)
  )
  .subscribe()

// Test 5: Unsubscribe
supabase.removeChannel(channel)
```

### Network Tab Monitoring

1. Open **DevTools** (F12)
2. Go to **Network** tab
3. Filter by **WS** (WebSocket)
4. Look for Supabase WebSocket connection
5. Click "Take Blessings"
6. Watch for WebSocket messages

**Expected:** You should see WebSocket frames with counter updates

---

## 📊 Performance Benchmarks

### Expected Latency

| Scenario | Expected Time |
|----------|--------------|
| Local (same device) | < 100ms |
| Same network (WiFi) | < 500ms |
| Different networks | < 1000ms |
| International | < 2000ms |

### Load Testing

Test with multiple users:

```javascript
// Simulate 10 rapid clicks
for (let i = 0; i < 10; i++) {
  setTimeout(() => {
    supabase.rpc('increment_counter', { counter_id: 1 })
      .then(result => console.log(`Click ${i + 1}: ${result.data}`));
  }, i * 100);
}
```

**Expected:** All 10 increments should be counted correctly

---

## ✅ Verification Checklist

### Basic Functionality
- [ ] Counter loads with correct initial value
- [ ] Clicking increments the counter
- [ ] Counter persists after page refresh
- [ ] No console errors

### Real-Time Sync
- [ ] Updates appear in multiple tabs
- [ ] Updates appear in different browsers
- [ ] Updates appear on different devices
- [ ] Updates appear within 1 second

### Reliability
- [ ] Rapid clicking works correctly
- [ ] No counts are lost
- [ ] Works after network reconnection
- [ ] Works in incognito mode

### Performance
- [ ] Page loads in < 3 seconds
- [ ] Animations are smooth
- [ ] No lag when clicking
- [ ] Updates are instant

---

## 🐛 Common Issues

### Issue: Counter updates but with delay (> 5 seconds)

**Possible Causes:**
- Slow internet connection
- Supabase region far from your location
- Browser throttling background tabs

**Solutions:**
- Check internet speed
- Try from different location
- Keep tab in foreground
- Check Supabase status page

---

### Issue: Counter doesn't update in other tabs

**Possible Causes:**
- Realtime not enabled in Supabase
- WebSocket connection failed
- Browser blocking WebSockets

**Solutions:**
1. Check Supabase Dashboard → Database → Replication
2. Enable replication for `counter` table
3. Check browser console for WebSocket errors
4. Try different browser
5. Check firewall/antivirus settings

---

### Issue: Counter increments but shows wrong number

**Possible Causes:**
- Multiple counter rows in database
- Race condition (shouldn't happen with our setup)

**Solutions:**
1. Check database:
   ```sql
   SELECT * FROM counter;
   ```
2. Should only have one row with id=1
3. Delete extra rows if any:
   ```sql
   DELETE FROM counter WHERE id != 1;
   ```

---

### Issue: "Error fetching counter" in console

**Possible Causes:**
- SQL setup not run
- RLS policies not configured
- Wrong environment variables

**Solutions:**
1. Run `supabase-setup.sql` in SQL Editor
2. Check `.env` file has correct credentials
3. Verify Supabase project is active (not paused)
4. Check Supabase logs for errors

---

## 🎯 Advanced Testing

### Test Real-Time Latency

```javascript
// In one tab
console.time('realtime-latency');
supabase.rpc('increment_counter', { counter_id: 1 });

// In another tab (with subscription)
supabase
  .channel('latency-test')
  .on('postgres_changes',
    { event: 'UPDATE', schema: 'public', table: 'counter' },
    () => console.timeEnd('realtime-latency')
  )
  .subscribe();
```

### Test Concurrent Updates

```javascript
// Run in multiple tabs simultaneously
Promise.all([
  supabase.rpc('increment_counter', { counter_id: 1 }),
  supabase.rpc('increment_counter', { counter_id: 1 }),
  supabase.rpc('increment_counter', { counter_id: 1 }),
]).then(results => {
  console.log('Results:', results.map(r => r.data));
  // Should see three consecutive numbers
});
```

### Monitor WebSocket Connection

```javascript
// Check connection status
const channel = supabase.channel('status-test');
channel.subscribe((status) => {
  console.log('Connection status:', status);
  // Should be: SUBSCRIBED
});
```

---

## 📈 Success Criteria

Your real-time sync is working correctly if:

✅ Counter updates in < 1 second across tabs  
✅ No counts are lost with rapid clicking  
✅ Works across different devices  
✅ Works in incognito mode  
✅ Survives page refresh  
✅ No console errors  
✅ WebSocket connection is stable  

---

## 🎉 All Tests Passed?

Congratulations! Your global blessing counter is working perfectly!

**Time to share it with the world! 🌍**

**जय श्री राम! 🙏**
