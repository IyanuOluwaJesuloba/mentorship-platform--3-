import { NextResponse } from "next/server"
import { getSession } from "@/lib/session"
import { supabase } from "@/lib/supabase"

export async function GET() {
  try {
    const user = await getSession()

    if (!user || user.role !== "MENTEE") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get pending requests count
    const { count: pendingRequests } = await supabase
      .from("mentorship_requests")
      .select("*", { count: "exact", head: true })
      .eq("mentee_id", user.id)
      .eq("status", "PENDING")

    // Get upcoming sessions count
    const { count: upcomingSessions } = await supabase
      .from("sessions")
      .select("*", { count: "exact", head: true })
      .eq("mentee_id", user.id)
      .eq("status", "SCHEDULED")

    // Get total mentors count
    const { count: totalMentors } = await supabase
      .from("mentorship_matches")
      .select("*", { count: "exact", head: true })
      .eq("mentee_id", user.id)
      .eq("status", "ACTIVE")

    // Get completed sessions count
    const { count: completedSessions } = await supabase
      .from("sessions")
      .select("*", { count: "exact", head: true })
      .eq("mentee_id", user.id)
      .eq("status", "COMPLETED")

    // Get recent sessions
    const { data: recentSessions } = await supabase
      .from("sessions")
      .select(`
        id,
        title,
        description,
        scheduled_at,
        status,
        mentor:users!sessions_mentor_id_fkey (
          id,
          email,
          user_profiles (name)
        )
      `)
      .eq("mentee_id", user.id)
      .order("scheduled_at", { ascending: false })
      .limit(5)

    // Get pending requests list
    const { data: pendingRequestsList } = await supabase
      .from("mentorship_requests")
      .select(`
        id,
        message,
        created_at,
        mentor:users!mentorship_requests_mentor_id_fkey (
          id,
          email,
          user_profiles (name, bio, skills)
        )
      `)
      .eq("mentee_id", user.id)
      .eq("status", "PENDING")
      .order("created_at", { ascending: false })

    // Get available mentors count
    const { count: availableMentors } = await supabase
      .from("users")
      .select("*", { count: "exact", head: true })
      .eq("role", "MENTOR")

    return NextResponse.json({
      pendingRequests: pendingRequests || 0,
      upcomingSessions: upcomingSessions || 0,
      totalMentors: totalMentors || 0,
      completedSessions: completedSessions || 0,
      availableMentors: availableMentors || 0,
      recentSessions: recentSessions || [],
      pendingRequestsList: pendingRequestsList || [],
    })
  } catch (error) {
    console.error("Error fetching mentee dashboard data:", error)
    return NextResponse.json({ error: "Failed to fetch dashboard data" }, { status: 500 })
  }
} 