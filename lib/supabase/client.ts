import { createClient } from "@supabase/supabase-js"
import type { Database } from "./database.types"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

// Helper function to create a demo user
export async function createDemoUser() {
  const { data, error } = await supabase.rpc("create_demo_user")

  if (error) {
    console.error("Error creating demo user:", error)
    return null
  }

  return data
}

// Helper function to check if a user is in demo mode
export async function isDemoUser(userId: string) {
  const { data, error } = await supabase.from("users").select("is_demo").eq("id", userId).single()

  if (error || !data) {
    return false
  }

  return data.is_demo
}
