"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, UserCheck, Calendar, TrendingUp, ArrowUpRight, Activity } from "lucide-react"
import type { User } from "@/lib/auth"
import Navigation from "./navigation"

interface AdminDashboard {
  user: User
}

interface Stats {
  totalUsers: number
  totalMentors: number
  totalMentees: number
  totalMatches: number
  totalSessions: number
}

export default function AdminDashboard({ user }: AdminDashboard) {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/admin/stats")
      const data = await response.json()
      setStats(data)
    } catch (error) {
      console.error("Failed to fetch stats:", error)
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
      <Navigation user={user} />

      <div className="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-10 animate-fade-in">
            <h1 className="text-4xl font-bold text-white mb-3">Admin Dashboard</h1>
            <p className="text-lg text-slate-300 font-light">Overview of the mentorship platform</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 animate-slide-up">
            <Card className="shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-slate-800/80 to-purple-900/50 overflow-hidden relative group border border-purple-500/20">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500 rounded-full opacity-10 -mr-16 -mt-16 group-hover:scale-110 transition-transform"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative z-10">
                <CardTitle className="text-sm font-semibold text-slate-200">Total Users</CardTitle>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-md">
                  <Users className="h-5 w-5 text-white" />
                </div>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="text-3xl font-bold text-white">{stats?.totalUsers || 0}</div>
                <p className="text-xs text-slate-300 mt-2 flex items-center">
                  <ArrowUpRight className="w-3 h-3 mr-1 text-green-600" />
                  Platform members
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-slate-800/80 to-green-900/50 overflow-hidden relative group border border-green-500/20">
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-500 rounded-full opacity-10 -mr-16 -mt-16 group-hover:scale-110 transition-transform"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative z-10">
                <CardTitle className="text-sm font-semibold text-slate-200">Active Mentors</CardTitle>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-md">
                  <UserCheck className="h-5 w-5 text-white" />
                </div>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="text-3xl font-bold text-white">{stats?.totalMentors || 0}</div>
                <p className="text-xs text-slate-300 mt-2 flex items-center">
                  <ArrowUpRight className="w-3 h-3 mr-1 text-green-600" />
                  Offering guidance
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-slate-800/80 to-blue-900/50 overflow-hidden relative group border border-blue-500/20">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full opacity-10 -mr-16 -mt-16 group-hover:scale-110 transition-transform"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative z-10">
                <CardTitle className="text-sm font-semibold text-slate-200">Total Matches</CardTitle>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md">
                  <TrendingUp className="h-5 w-5 text-white" />
                </div>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="text-3xl font-bold text-white">{stats?.totalMatches || 0}</div>
                <p className="text-xs text-slate-300 mt-2 flex items-center">
                  <ArrowUpRight className="w-3 h-3 mr-1 text-green-600" />
                  Active connections
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-slate-800/80 to-amber-900/50 overflow-hidden relative group border border-amber-500/20">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500 rounded-full opacity-10 -mr-16 -mt-16 group-hover:scale-110 transition-transform"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative z-10">
                <CardTitle className="text-sm font-semibold text-slate-200">Total Sessions</CardTitle>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-md">
                  <Calendar className="h-5 w-5 text-white" />
                </div>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="text-3xl font-bold text-white">{stats?.totalSessions || 0}</div>
                <p className="text-xs text-slate-300 mt-2 flex items-center">
                  <ArrowUpRight className="w-3 h-3 mr-1 text-green-600" />
                  Completed sessions
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="shadow-lg hover:shadow-xl transition-all duration-300 card-hover bg-slate-800/80 border border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-white">User Management</CardTitle>
                <CardDescription className="text-slate-300">Manage all users on the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full h-11 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 font-semibold shadow-md hover:shadow-lg transition-all" 
                  onClick={() => (window.location.href = "/admin/users")}
                >
                  View All Users
                  <ArrowUpRight className="ml-2 w-4 h-4" />
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-all duration-300 card-hover bg-slate-800/80 border border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-white">Mentorship Matches</CardTitle>
                <CardDescription className="text-slate-300">View and manage mentorship relationships</CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full h-11 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 font-semibold shadow-md hover:shadow-lg transition-all" 
                  onClick={() => (window.location.href = "/admin/matches")}
                >
                  View Matches
                  <ArrowUpRight className="ml-2 w-4 h-4" />
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-all duration-300 card-hover bg-slate-800/80 border border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-white">Session Overview</CardTitle>
                <CardDescription className="text-slate-300">Monitor all mentorship sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full h-11 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 font-semibold shadow-md hover:shadow-lg transition-all" 
                  onClick={() => (window.location.href = "/admin/sessions")}
                >
                  View Sessions
                  <ArrowUpRight className="ml-2 w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
