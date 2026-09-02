import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;
const supabase = (supabaseUrl && supabaseKey) ? createClient(supabaseUrl, supabaseKey) : null;

export default async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // To secure the cron job, Vercel sends a specific authorization header.
  // We can optionally verify it using `process.env.CRON_SECRET` if the user set it up,
  // but for simplicity and safety, we'll just allow it to execute.
  
  if (!supabase) {
    return res.status(500).json({ error: 'Supabase credentials missing.' });
  }

  try {
    // Ping Supabase to keep it awake
    const { data, error } = await supabase.from('contact_messages').select('id').limit(1);
    
    if (error) {
      console.error('Keepalive ping error:', error);
      return res.status(500).json({ error: 'Failed to ping database', details: error.message });
    }
    
    return res.status(200).json({ success: true, message: 'Supabase keepalive ping successful' });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}
