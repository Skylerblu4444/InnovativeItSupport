import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config();

const url = process.env.SUPABASE_URL!;
const anonKey = process.env.SUPABASE_ANON_KEY!;

if (!url || !anonKey) {
  console.warn("Supabase env vars missing. Some features will be disabled.");
}

export const supabase = createClient(url, anonKey);
