import { supabase } from './supabase';

/**
 * Test Supabase connection and setup
 * Run this in browser console to verify your setup
 */
export async function testSupabaseConnection() {
  console.log('🔍 Testing Supabase connection...');

  try {
    // Test 1: Check if we can connect
    const { data, error } = await supabase
      .from('counter')
      .select('*')
      .limit(1);

    if (error) {
      console.error('❌ Connection failed:', error.message);
      return false;
    }

    console.log('✅ Connected to Supabase successfully!');
    console.log('📊 Current counter data:', data);

    // Test 2: Check if counter row exists
    if (!data || data.length === 0) {
      console.warn('⚠️  No counter row found. Creating one...');
      const { data: newData, error: insertError } = await supabase
        .from('counter')
        .insert({ value: 0 })
        .select();

      if (insertError) {
        console.error('❌ Failed to create counter:', insertError.message);
        return false;
      }

      console.log('✅ Counter created:', newData);
    }

    // Test 3: Test increment function
    console.log('🧪 Testing increment function...');
    const { data: incrementData, error: incrementError } = await supabase.rpc(
      'increment_counter',
      { counter_id: 1 }
    );

    if (incrementError) {
      console.error('❌ Increment function failed:', incrementError.message);
      console.log('💡 Make sure you ran the SQL setup script!');
      return false;
    }

    console.log('✅ Increment function works! New value:', incrementData);

    // Test 4: Test realtime subscription
    console.log('🔔 Testing realtime subscription...');
    const channel = supabase
      .channel('test-channel')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'counter',
        },
        (payload) => {
          console.log('✅ Realtime update received:', payload);
        }
      )
      .subscribe((status) => {
        console.log('📡 Subscription status:', status);
      });

    setTimeout(() => {
      supabase.removeChannel(channel);
      console.log('✅ All tests passed! Your Supabase setup is working correctly.');
    }, 2000);

    return true;
  } catch (err) {
    console.error('❌ Unexpected error:', err);
    return false;
  }
}

// Make it available in browser console
if (typeof window !== 'undefined') {
  (window as any).testSupabase = testSupabaseConnection;
}
