import { createClient } from '@supabase/supabase-js';

export const supabaseClient = createClient(
  'https://lgtifwvnupdnczjwholf.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxndGlmd3ZudXBkbmN6andob2xmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTIxMDUzNTYsImV4cCI6MjAwNzY4MTM1Nn0.edagKG-3DR7t1GQeDZBMXfO9csLh9Zoh-qVwdkt22NY'
);
