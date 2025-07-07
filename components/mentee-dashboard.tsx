"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Calendar, Users, Clock } from "lucide-react"
import type { User } from "@/lib/auth"
import Navigation from "./navigation"

interface MenteeDashboardProps {
  user: User
}

interface DashboardData {
  activeMentors: number
  upcomingSessions: number
  pendingRequests: number
  completedSessions: number
  recentSessions: any[]
  activeMentorships: any[]
}

export default function MenteeDashboard({ user }: MenteeDashboardProps) {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const response = await fetch("/api/mentee/dashboard")
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
            <h1 className="text-3xl font-bold text-gray-900">Mentee Dashboard</h1>
            <p className="mt-2 text-gray-600">Track your mentorship journey</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Mentors</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data?.activeMentors || 0}</div>
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
                <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data?.pendingRequests || 0}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completed Sessions</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data?.completedSessions || 0}</div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Find Mentors</CardTitle>
                <CardDescription>Browse and connect with mentors</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" onClick={() => (window.location.href = "/mentors")}>
                  <Search className="w-4 h-4 mr-2" />
                  Browse Mentors
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>My Sessions</CardTitle>
                <CardDescription>View and manage your mentoring sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" onClick={() => (window.location.href = "/my-sessions")}>
                  View Sessions
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>My Requests</CardTitle>
                <CardDescription>Track your mentorship requests</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" onClick={() => (window.location.href = "/my-requests")}>
                  View Requests ({data?.pendingRequests || 0})
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Active Mentorships */}
          {data?.activeMentorships && data.activeMentorships.length > 0 && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Active Mentorships</CardTitle>
                <CardDescription>Your current mentor relationships</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {data.activeMentorships.map((mentorship: any) => (
                    <div key={mentorship.id} className="p-4 border rounded-lg">
                      <h3 className="font-medium">{mentorship.mentor_name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{mentorship.mentor_bio}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {mentorship.mentor_skills?.map((skill: string) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                      <Button
                        size="sm"
                        className="mt-3"
                        onClick={() => (window.location.href = `/sessions/book?mentor=${mentorship.mentor_id}`)}
                      >
                        Book Session
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Recent Sessions */}
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
                        <p className="font-medium">{session.mentor_name}</p>
                        <p className="text-sm text-gray-600">
                          {new Date(session.scheduled_at).toLocaleDateString()} at{" "}
                          {new Date(session.scheduled_at).toLocaleTimeString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={session.status === "COMPLETED" ? "default" : "secondary"}>
                          {session.status}
                        </Badge>
                        {session.status === "COMPLETED" && !session.mentee_rating && (
                          <Button size="sm" variant="outline">
                            Rate Session
                          </Button>
                        )}
                      </div>
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
