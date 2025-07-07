import { NextResponse } from "next/server"
import { getSession } from "@/lib/session"
import { supabase } from "@/lib/supabase"

export async function GET() {
  try {
    const user = await getSession()

    if (!user || user.role !== "MENTEE") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get all mentors with their profiles
    const { data: mentors, error } = await supabase
      .from("users")
      .select(`
        id,
        email,
        user_profiles (
          name,
          bio,
          skills,
          industry
        )
      `)
      .eq("role", "MENTOR")

    if (error) throw error

    // Get session stats for each mentor
    const mentorsWithStats = await Promise.all(
      mentors.map(async (mentor) => {
        const { data: sessions } = await supabase
          .from("sessions")
          .select("mentee_rating")
          .eq("mentor_id", mentor.id)
          .eq("status", "COMPLETED")

        const ratings = sessions?.filter((s) => s.mentee_rating).map((s) => s.mentee_rating) || []
        const averageRating = ratings.length > 0 ? ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length : 0

        return {
          id: mentor.id,
          name: mentor.user_profiles?.name || "Unknown",
          bio: mentor.user_profiles?.bio || "",
          skills: mentor.user_profiles?.skills || [],
          industry: mentor.user_profiles?.industry || "",
          averageRating,
          totalSessions: sessions?.length || 0,
        }
      }),
    )

    return NextResponse.json(mentorsWithStats)
  } catch (error) {
    console.error("Error fetching mentors:", error)
    return NextResponse.json({ error: "Failed to fetch mentors" }, { status: 500 })
  }
}
