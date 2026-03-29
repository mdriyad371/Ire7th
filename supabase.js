// supabase.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'

// আপনার Supabase Project Settings > API থেকে এই দুটি তথ্য এখানে বসান
const SUPABASE_URL = 'https://zskzznrvazcckaewzgzz.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpza3p6bnJ2YXpjY2thZXd6Z3p6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ3ODI5MTcsImV4cCI6MjA5MDM1ODkxN30.VLPUEfD1HnaV8_M6e3SmXJCstuK0qgS5dr_qgPN1I88';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
