"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Calendar, Clock, Star, TrendingUp, Users } from "lucide-react"
import Navigation from "@/components/navigation"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface Session {
  id: string
  scheduled_at: string
  duration_minutes: number
  status: "SCHEDULED" | "COMPLETED" | "CANCELLED"
  mentee_rating?: number
  mentee_feedback?: string
  mentor_feedback?: string
  created_at: string
  mentee: {
    id: string
    email: string
    profile: {
      name: string
    }
  }
  mentor: {
    id: string
    email: string
    profile: {
      name: string
    }
  }
}

export default function AdminSessionsPage() {
  const [sessions, setSessions] = useState<Session[]>([])
  const [filteredSessions, setFilteredSessions] = useState<Session[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("ALL")
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [error, setError] = useState("")

  useEffect(() => {
    checkAuth()
    fetchSessions()
  }, [])

  useEffect(() => {
    filterSessions()
  }, [sessions, searchTerm, statusFilter])

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/auth/me")
      if (response.ok) {
        const userData = await response.json()
        if (userData.role !== "ADMIN") {
          window.location.href = "/dashboard"
          return
        }
        setUser(userData)
      } else {
        window.location.href = "/login"
      }
    } catch (error) {
      window.location.href = "/login"
    }
  }

  const fetchSessions = async () => {
    try {
      const response = await fetch("/api/admin/sessions")
      const data = await response.json()
      setSessions(data)
    } catch (error) {
      console.error("Failed to fetch sessions:", error)
      setError("Failed to fetch sessions")
    } finally {
      setLoading(false)
    }
  }

  const filterSessions = () => {
    let filtered = sessions

    if (searchTerm) {
      filtered = filtered.filter(
        (session) =>
          session.mentee.profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          session.mentor.profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          session.mentee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          session.mentor.email.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (statusFilter !== "ALL") {
      filtered = filtered.filter((session) => session.status === statusFilter)
    }

    setFilteredSessions(filtered)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "default"
      case "SCHEDULED":
        return "secondary"
      case "CANCELLED":
        return "destructive"
      default:
        return "outline"
    }
  }

  const getAverageRating = () => {
    const ratedSessions = sessions.filter((s) => s.mentee_rating)
    if (ratedSessions.length === 0) return 0
    return ratedSessions.reduce((sum, s) => sum + (s.mentee_rating || 0), 0) / ratedSessions.length
  }

  const getCompletionRate = () => {
    if (sessions.length === 0) return 0
    const completedSessions = sessions.filter((s) => s.status === "COMPLETED").length
    return (completedSessions / sessions.length) * 100
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation user={user} />

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Session Management</h1>
            <p className="mt-2 text-gray-600">Monitor all mentorship sessions on the platform</p>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{sessions.length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completed</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{sessions.filter((s) => s.status === "COMPLETED").length}</div>
                <p className="text-xs text-muted-foreground">{getCompletionRate().toFixed(1)}% completion rate</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{getAverageRating().toFixed(1)}</div>
                <p className="text-xs text-muted-foreground">
                  {sessions.filter((s) => s.mentee_rating).length} rated sessions
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Duration</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {sessions.length > 0
                    ? Math.round(sessions.reduce((sum, s) => sum + s.duration_minutes, 0) / sessions.length)
                    : 0}
                  m
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Controls */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Search & Filter</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search sessions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ALL">All Status</SelectItem>
                    <SelectItem value="SCHEDULED">Scheduled</SelectItem>
                    <SelectItem value="COMPLETED">Completed</SelectItem>
                    <SelectItem value="CANCELLED">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Sessions Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Sessions ({filteredSessions.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8">Loading sessions...</div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Mentee</TableHead>
                        <TableHead>Mentor</TableHead>
                        <TableHead>Scheduled</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead>Feedback</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredSessions.map((session) => (
                        <TableRow key={session.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{session.mentee.profile.name}</div>
                              <div className="text-sm text-gray-500">{session.mentee.email}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">{session.mentor.profile.name}</div>
                              <div className="text-sm text-gray-500">{session.mentor.email}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">{new Date(session.scheduled_at).toLocaleDateString()}</div>
                              <div className="text-sm text-gray-500">
                                {new Date(session.scheduled_at).toLocaleTimeString()}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{session.duration_minutes}m</TableCell>
                          <TableCell>
                            <Badge variant={getStatusColor(session.status)}>{session.status}</Badge>
                          </TableCell>
                          <TableCell>
                            {session.mentee_rating ? (
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span>{session.mentee_rating}</span>
                              </div>
                            ) : (
                              <span className="text-gray-400">No rating</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="max-w-xs">
                              {session.mentee_feedback && (
                                <div className="text-sm text-gray-600 truncate" title={session.mentee_feedback}>
                                  {session.mentee_feedback}
                                </div>
                              )}
                              {session.mentor_feedback && (
                                <div className="text-sm text-blue-600 truncate" title={session.mentor_feedback}>
                                  Mentor: {session.mentor_feedback}
                                </div>
                              )}
                              {!session.mentee_feedback && !session.mentor_feedback && (
                                <span className="text-gray-400">No feedback</span>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}

              {!loading && filteredSessions.length === 0 && (
                <div className="text-center py-8 text-gray-500">No sessions found matching your criteria.</div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
