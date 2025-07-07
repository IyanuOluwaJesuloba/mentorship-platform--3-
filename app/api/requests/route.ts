import { type NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/session"
import { supabase } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    const user = await getSession()

    if (!user || user.role !== "MENTEE") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { mentorId, message } = await request.json()

    if (!mentorId) {
      return NextResponse.json({ error: "Mentor ID is required" }, { status: 400 })
    }

    // Check if request already exists
    const { data: existingRequest } = await supabase
      .from("mentorship_requests")
      .select("id")
      .eq("mentee_id", user.id)
      .eq("mentor_id", mentorId)
      .eq("status", "PENDING")
      .single()

    if (existingRequest) {
      return NextResponse.json({ error: "You already have a pending request with this mentor" }, { status: 400 })
    }

    // Create new request
    const { data, error } = await supabase
      .from("mentorship_requests")
      .insert([
        {
          mentee_id: user.id,
          mentor_id: mentorId,
          message: message || "",
          status: "PENDING",
        },
      ])
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    console.error("Error creating request:", error)
    return NextResponse.json({ error: "Failed to create request" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const user = await getSession()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    let query = supabase.from("mentorship_requests").select(`
        id,
        status,
        message,
        created_at,
        updated_at,
        mentee:users!mentorship_requests_mentee_id_fkey (
          id,
          email,
          user_profiles (name, bio, skills)
        ),
        mentor:users!mentorship_requests_mentor_id_fkey (
          id,
          email,
          user_profiles (name, bio, skills)
        )
      `)

    if (user.role === "MENTOR") {
      query = query.eq("mentor_id", user.id)
    } else if (user.role === "MENTEE") {
      query = query.eq("mentee_id", user.id)
    } else {
      return NextResponse.json({ error: "Invalid role" }, { status: 403 })
    }

    const { data, error } = await query.order("created_at", { ascending: false })

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching requests:", error)
    return NextResponse.json({ error: "Failed to fetch requests" }, { status: 500 })
  }
}
