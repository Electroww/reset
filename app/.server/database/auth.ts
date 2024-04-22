import { createClient } from '@supabase/supabase-js';

const supabaseAuth = createClient(
  process.env.PROJECT_URL || '',
  process.env.ANON_PUBLIC || ''
);

export default supabaseAuth;
