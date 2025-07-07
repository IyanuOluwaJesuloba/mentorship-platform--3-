import { type NextRequest, NextResponse } from "next/server"
import { signIn } from "@/lib/auth"
import { createSession } from "@/lib/session"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    const user = await signIn(email, password)
    await createSession(user)

    return NextResponse.json(
      { message: "Login successful", user: { id: user.id, email: user.email, role: user.role } },
      { status: 200 },
    )
  } catch (error: any) {
    console.error("Login error:", error)
    return NextResponse.json({ error: error.message || "Login failed" }, { status: 401 })
  }
}
