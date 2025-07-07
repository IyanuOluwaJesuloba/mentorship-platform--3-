import { supabase } from "./supabase"
import bcrypt from "bcryptjs"

export interface User {
  id: string
  email: string
  role: "ADMIN" | "MENTOR" | "MENTEE"
}

export interface UserProfile {
  id: string
  user_id: string
  name: string
  bio?: string
  skills: string[]
  goals?: string
  industry?: string
}

export async function signUp(email: string, password: string, role: "MENTOR" | "MENTEE" = "MENTEE") {
  const hashedPassword = await bcrypt.hash(password, 10)

  const { data, error } = await supabase
    .from("users")
    .insert([{ email, password_hash: hashedPassword, role }])
    .select()
    .single()

  if (error) throw error
  return data
}

export async function signIn(email: string, password: string) {
  const { data: user, error } = await supabase.from("users").select("*").eq("email", email).single()

  if (error || !user) {
    throw new Error("Invalid credentials")
  }

  const isValid = await bcrypt.compare(password, user.password_hash)
  if (!isValid) {
    throw new Error("Invalid credentials")
  }

  return {
    id: user.id,
    email: user.email,
    role: user.role,
  }
}

export async function getUserProfile(userId: string) {
  const { data, error } = await supabase.from("user_profiles").select("*").eq("user_id", userId).single()

  if (error) throw error
  return data
}

export async function updateUserProfile(userId: string, profile: Partial<UserProfile>) {
  const { data, error } = await supabase
    .from("user_profiles")
    .upsert([{ user_id: userId, ...profile }])
    .select()
    .single()

  if (error) throw error
  return data
}
