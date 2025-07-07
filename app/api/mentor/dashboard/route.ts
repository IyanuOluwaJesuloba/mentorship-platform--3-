import { NextResponse } from "next/server"
import { getSession } from "@/lib/session"
import { supabase } from "@/lib/supabase"

export async function GET() {
  try {
    const user = await getSession()

    if (!user || user.role !== "MENTOR") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get pending requests count
    const { count: pendingRequests } = await supabase
      .from("mentorship_requests")
      .select("*", { count: "exact", head: true })
      .eq("mentor_id", user.id)
      .eq("status", "PENDING")

    // Get upcoming sessions count
    const { count: upcomingSessions } = await supabase
      .from("sessions")
      .select("*", { count: "exact", head: true })
      .eq("mentor_id", user.id)
      .eq("status", "SCHEDULED")

    // Get total mentees count
    const { count: totalMentees } = await supabase
      .from("mentorship_matches")
      .select("*", { count: "exact", head: true })
      .eq("mentor_id", user.id)
      .eq("status", "ACTIVE")

    // Get average rating
    const { data: sessions } = await supabase
      .from("sessions")
      .select("mentee_rating")
      .eq("mentor_id", user.id)
      .eq("status", "COMPLETED")

    const ratings = sessions?.filter((s) => s.mentee_rating).map((s) => s.mentee_rating) || []
    const averageRating = ratings.length > 0 ? ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length : 0

    // Get recent sessions
    const { data: recentSessions } = await supabase
      .from("sessions")
      .select(`
        id,
        title,
        description,
        scheduled_at,
        status,
        mentee:users!sessions_mentee_id_fkey (
          id,
          email,
          user_profiles (name)
        )
      `)
      .eq("mentor_id", user.id)
      .order("scheduled_at", { ascending: false })
      .limit(5)

    // Get pending requests list
    const { data: pendingRequestsList } = await supabase
      .from("mentorship_requests")
      .select(`
        id,
        message,
        created_at,
        mentee:users!mentorship_requests_mentee_id_fkey (
          id,
          email,
          user_profiles (name, bio)
        )
      `)
      .eq("mentor_id", user.id)
      .eq("status", "PENDING")
      .order("created_at", { ascending: false })

    return NextResponse.json({
      pendingRequests: pendingRequests || 0,
      upcomingSessions: upcomingSessions || 0,
      totalMentees: totalMentees || 0,
      averageRating: Math.round(averageRating * 10) / 10,
      recentSessions: recentSessions || [],
      pendingRequestsList: pendingRequestsList || [],
    })
  } catch (error) {
    console.error("Error fetching mentor dashboard data:", error)
    return NextResponse.json({ error: "Failed to fetch dashboard data" }, { status: 500 })
  }
} 