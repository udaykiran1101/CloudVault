import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wpbailnmnnjpveizrmpq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndwYmFpbG5tbm5qcHZlaXpybXBxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEyMTE0NzYsImV4cCI6MjA2Njc4NzQ3Nn0.G9Um2KvfZHjuJjSIFfml1tNTTLfWp7cn2T274qf2FBA';
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
