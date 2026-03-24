import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { email, source } = req.body;
  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid email is required' });
  }

  try {
    const { error } = await supabase
      .from('demo_requests')
      .insert({ email: email.toLowerCase().trim(), source: source || 'unknown' });

    if (error) {
      if (error.code === '23505') return res.status(200).json({ message: 'Already registered!' });
      throw error;
    }
    return res.status(200).json({ message: 'Success!' });
  } catch (err) {
    console.error('Subscribe error:', err);
    return res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
}
