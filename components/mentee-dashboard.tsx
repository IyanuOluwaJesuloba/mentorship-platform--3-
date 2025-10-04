"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Calendar, Users, Clock, ArrowUpRight, Activity, CheckCircle } from "lucide-react"
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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
        <Navigation user={user} />
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <Activity className="w-8 h-8 animate-spin text-purple-600 mx-auto mb-4" />
                <p className="text-slate-600 font-medium">Loading dashboard...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Navigation user={user} />

      <div className="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-10 animate-fade-in">
            <h1 className="text-4xl font-bold text-white mb-3">Mentee Dashboard</h1>
            <p className="text-lg text-slate-300 font-light">Track your mentorship journey</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 animate-slide-up">
            <Card className="shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-slate-800/80 to-blue-50 overflow-hidden relative group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200 rounded-full opacity-20 -mr-16 -mt-16 group-hover:scale-110 transition-transform"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative z-10">
                <CardTitle className="text-sm font-semibold text-slate-200">Active Mentors</CardTitle>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md">
                  <Users className="h-5 w-5 text-white" />
                </div>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="text-3xl font-bold text-white">{data?.activeMentors || 0}</div>
                <p className="text-xs text-slate-300 mt-2">Guiding you</p>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-slate-800/80 to-purple-50 overflow-hidden relative group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-200 rounded-full opacity-20 -mr-16 -mt-16 group-hover:scale-110 transition-transform"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative z-10">
                <CardTitle className="text-sm font-semibold text-slate-200">Upcoming Sessions</CardTitle>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-md">
                  <Calendar className="h-5 w-5 text-white" />
                </div>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="text-3xl font-bold text-white">{data?.upcomingSessions || 0}</div>
                <p className="text-xs text-slate-300 mt-2">Scheduled ahead</p>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-slate-800/80 to-orange-50 overflow-hidden relative group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-200 rounded-full opacity-20 -mr-16 -mt-16 group-hover:scale-110 transition-transform"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative z-10">
                <CardTitle className="text-sm font-semibold text-slate-200">Pending Requests</CardTitle>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-md">
                  <Clock className="h-5 w-5 text-white" />
                </div>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="text-3xl font-bold text-white">{data?.pendingRequests || 0}</div>
                <p className="text-xs text-slate-300 mt-2">Awaiting response</p>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-slate-800/80 to-green-50 overflow-hidden relative group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-200 rounded-full opacity-20 -mr-16 -mt-16 group-hover:scale-110 transition-transform"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative z-10">
                <CardTitle className="text-sm font-semibold text-slate-200">Completed Sessions</CardTitle>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-md">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="text-3xl font-bold text-white">{data?.completedSessions || 0}</div>
                <p className="text-xs text-slate-300 mt-2">Finished sessions</p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            <Card className="shadow-lg hover:shadow-xl transition-all duration-300 card-hover bg-slate-800/80 border border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-white">Find Mentors</CardTitle>
                <CardDescription className="text-slate-300">Browse and connect with mentors</CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full h-11 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 font-semibold shadow-md hover:shadow-lg transition-all" 
                  onClick={() => (window.location.href = "/mentors")}
                >
                  <Search className="w-4 h-4 mr-2" />
                  Browse Mentors
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-all duration-300 card-hover bg-slate-800/80 border border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-white">My Sessions</CardTitle>
                <CardDescription className="text-slate-300">View and manage your mentoring sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full h-11 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 font-semibold shadow-md hover:shadow-lg transition-all" 
                  onClick={() => (window.location.href = "/my-sessions")}
                >
                  View Sessions
                  <ArrowUpRight className="ml-2 w-4 h-4" />
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-all duration-300 card-hover bg-slate-800/80 border border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-white">My Requests</CardTitle>
                <CardDescription className="text-slate-300">Track your mentorship requests</CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full h-11 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 font-semibold shadow-md hover:shadow-lg transition-all" 
                  onClick={() => (window.location.href = "/my-requests")}
                >
                  View Requests ({data?.pendingRequests || 0})
                  <ArrowUpRight className="ml-2 w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Active Mentorships */}
          {data?.activeMentorships && data.activeMentorships.length > 0 && (
            <Card className="mb-10 border-0 shadow-lg bg-white">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-slate-900">Active Mentorships</CardTitle>
                <CardDescription className="text-slate-300">Your current mentor relationships</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {data.activeMentorships.map((mentorship: any) => (
                    <div key={mentorship.id} className="p-6 border-2 border-slate-200 rounded-2xl hover:border-purple-300 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-slate-50">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold shadow-md">
                          {mentorship.mentor_name?.charAt(0).toUpperCase()}
                        </div>
                        <h3 className="font-bold text-lg text-slate-900">{mentorship.mentor_name}</h3>
                      </div>
                      <p className="text-sm text-slate-600 mt-2 mb-4">{mentorship.mentor_bio}</p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {mentorship.mentor_skills?.map((skill: string) => (
                          <Badge key={skill} variant="secondary" className="text-xs bg-purple-100 text-purple-700 border-purple-200">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                      <Button
                        size="sm"
                        className="mt-5 w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 font-semibold shadow-md hover:shadow-lg transition-all"
                        onClick={() => (window.location.href = `/sessions/book?mentor=${mentorship.mentor_id}`)}
                      >
                        Book Session
                        <ArrowUpRight className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Recent Sessions */}
          {data?.recentSessions && data.recentSessions.length > 0 && (
            <Card className="border-0 shadow-lg bg-white">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-slate-900">Recent Sessions</CardTitle>
                <CardDescription className="text-slate-300">Your latest mentoring sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {data.recentSessions.slice(0, 5).map((session: any) => (
                    <div key={session.id} className="flex items-center justify-between p-5 border border-slate-200 rounded-xl hover:border-purple-300 hover:shadow-md transition-all duration-200 bg-slate-50">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold shadow-md">
                          {session.mentor_name?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">{session.mentor_name}</p>
                          <p className="text-sm text-slate-600">
                            {new Date(session.scheduled_at).toLocaleDateString()} at{" "}
                            {new Date(session.scheduled_at).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge 
                          variant={session.status === "COMPLETED" ? "default" : "secondary"}
                          className={session.status === "COMPLETED" ? "bg-green-100 text-green-700 border-green-200" : "bg-blue-100 text-blue-700 border-blue-200"}
                        >
                          {session.status}
                        </Badge>
                        {session.status === "COMPLETED" && !session.mentee_rating && (
                          <Button size="sm" variant="outline" className="border-purple-300 text-purple-700 hover:bg-purple-50">
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
