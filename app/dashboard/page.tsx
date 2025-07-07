import { redirect } from "next/navigation"
import { getSession } from "@/lib/session"
import AdminDashboard from "@/components/admin-dashboard"
import MentorDashboard from "@/components/mentor-dashboard"
import MenteeDashboard from "@/components/mentee-dashboard"

export default async function DashboardPage() {
  const user = await getSession()

  if (!user) {
    redirect("/login")
  }

  switch (user.role) {
    case "ADMIN":
      return <AdminDashboard user={user} />
    case "MENTOR":
      return <MentorDashboard user={user} />
    case "MENTEE":
      return <MenteeDashboard user={user} />
    default:
      redirect("/login")
  }
}
