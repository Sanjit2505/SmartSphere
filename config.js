// =========================================================
// SMART CITY APP — API CONFIGURATION
// Replace placeholder values with your real API keys
// =========================================================

const CONFIG = {
  // Supabase — https://supabase.com → Project Settings → API
  SUPABASE_URL: "https://qxholaunupubvjyntlkb.supabase.co",
  SUPABASE_ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF4aG9sYXVudXB1YnZqeW50bGtiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIxMTY4NTMsImV4cCI6MjA4NzY5Mjg1M30.MIzBaxHkTTSiSPNcFN0nrQPVe4oyhCC0XxWcwop6vUU",

  // Google Maps — https://console.cloud.google.com/apis/credentials
  GOOGLE_MAPS_API_KEY: "YOUR_GOOGLE_MAPS_API_KEY",

  // ElevenLabs — https://elevenlabs.io → Profile → API Key
  ELEVENLABS_API_KEY: "sk_ef075baf32e8bf0b290b408dd773a6736ca9574e720ac510",
  ELEVENLABS_VOICE_ID: "EXAVITQu4vr4xnSDxMaL", // Default: "Bella" voice
};

// Demo credentials (used when Supabase is not yet configured)
const DEMO_USERS = {
  "user@city.com": { password: "demo123", role: "user", name: "Arjun Kumar" },
  "electricity@city.com": { password: "demo123", role: "electricity", name: "Vikram Singh" },
  "municipality@city.com": { password: "demo123", role: "municipality", name: "Priya Sharma" },
  "water@city.com": { password: "demo123", role: "water", name: "Rajan Patel" },
};
