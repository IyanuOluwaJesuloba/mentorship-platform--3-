import { NextResponse } from "next/server"
import { getSession } from "@/lib/session"
import { supabase } from "@/lib/supabase"

export async function GET() {
  try {
    const user = await getSession()

    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get total users count
    const { count: totalUsers } = await supabase.from("users").select("*", { count: "exact", head: true })

    // Get mentors count
    const { count: totalMentors } = await supabase
      .from("users")
      .select("*", { count: "exact", head: true })
      .eq("role", "MENTOR")

    // Get mentees count
    const { count: totalMentees } = await supabase
      .from("users")
      .select("*", { count: "exact", head: true })
      .eq("role", "MENTEE")

    // Get matches count
    const { count: totalMatches } = await supabase
      .from("mentorship_matches")
      .select("*", { count: "exact", head: true })

    // Get sessions count
    const { count: totalSessions } = await supabase.from("sessions").select("*", { count: "exact", head: true })

    return NextResponse.json({
      totalUsers: totalUsers || 0,
      totalMentors: totalMentors || 0,
      totalMentees: totalMentees || 0,
      totalMatches: totalMatches || 0,
      totalSessions: totalSessions || 0,
    })
  } catch (error) {
    console.error("Error fetching admin stats:", error)
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 })
  }
}
