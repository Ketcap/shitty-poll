import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
export const supabase = createClient('https://scokbenchqvvtyqcowsa.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNjb2tiZW5jaHF2dnR5cWNvd3NhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjI4MzExNDUsImV4cCI6MTk3ODQwNzE0NX0.yJskcSDFEPeUsPZ63QyNteyeX9TtAL5-wiHytmVes-8')