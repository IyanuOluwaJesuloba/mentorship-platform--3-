"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, Star } from "lucide-react"
import type { User } from "@/lib/auth"
import Navigation from "./navigation"

interface MentorDashboardProps {
  user: User
}

interface DashboardData {
  pendingRequests: number
  upcomingSessions: number
  totalMentees: number
  averageRating: number
  recentSessions: any[]
  pendingRequestsList: any[]
}

export default function MentorDashboard({ user }: MentorDashboardProps) {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const response = await fetch("/api/mentor/dashboard")
      const dashboardData = await response.json()
      setData(dashboardData)
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation user={user} />
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="text-center">Loading...</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation user={user} />

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Mentor Dashboard</h1>
            <p className="mt-2 text-gray-600">Manage your mentorship activities</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data?.pendingRequests || 0}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Upcoming Sessions</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data?.upcomingSessions || 0}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Mentees</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data?.totalMentees || 0}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data?.averageRating ? data.averageRating.toFixed(1) : "N/A"}</div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Mentorship Requests</CardTitle>
                <CardDescription>Review and respond to mentee requests</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" onClick={() => (window.location.href = "/requests")}>
                  View Requests ({data?.pendingRequests || 0})
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>My Sessions</CardTitle>
                <CardDescription>View and manage your mentoring sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" onClick={() => (window.location.href = "/sessions")}>
                  View Sessions
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Availability</CardTitle>
                <CardDescription>Set your availability for mentoring</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" onClick={() => (window.location.href = "/availability")}>
                  Manage Availability
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          {data?.recentSessions && data.recentSessions.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Recent Sessions</CardTitle>
                <CardDescription>Your latest mentoring sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.recentSessions.slice(0, 5).map((session: any) => (
                    <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">{session.mentee_name}</p>
                        <p className="text-sm text-gray-600">
                          {new Date(session.scheduled_at).toLocaleDateString()} at{" "}
                          {new Date(session.scheduled_at).toLocaleTimeString()}
                        </p>
                      </div>
                      <Badge variant={session.status === "COMPLETED" ? "default" : "secondary"}>{session.status}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
