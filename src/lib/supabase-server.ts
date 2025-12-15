import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export function createServerClient() {
  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

export async function getLatestNews(limit: number = 3) {
  const supabase = createServerClient();
  
  const { data, error } = await supabase
    .from("news")
    .select("id, title, slug, excerpt, image_url, published_date")
    .order("published_date", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error fetching news:", error);
    return [];
  }

  return data || [];
}
