import { cookies } from "next/headers"
import { SignJWT, jwtVerify } from "jose"
import type { User } from "./auth"

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret"

/**
 * Create a Uint8Array key from the secret string so `jose`
 * can sign / verify the token both in edge and full Node runtimes.
 */
const secretKey = new TextEncoder().encode(JWT_SECRET)

export async function createSession(user: User) {
  const token = await new SignJWT({
    userId: user.id,
    email: user.email,
    role: user.role,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(secretKey)

  cookies().set("auth-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  })

  return token
}

export async function getSession(): Promise<User | null> {
  const token = cookies().get("auth-token")?.value
  if (!token) return null

  try {
    const { payload } = await jwtVerify(token, secretKey)
    return {
      id: payload.userId as string,
      email: payload.email as string,
      role: payload.role as User["role"],
    }
  } catch {
    return null
  }
}

export function destroySession() {
  cookies().delete("auth-token", { path: "/" })
}
