export const env = {
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  },
  supabase: {
    projectUrl: process.env.SUPABASE_PROJECT_URL,
    apiKey: process.env.SUPABASE_API_KEY,
    dbPassword: process.env.SUPABASE_DB_PASSWORD,
  },
} as const;
