"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Search, UserPlus, Calendar, Users, TrendingUp } from "lucide-react"
import Navigation from "@/components/navigation"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface Match {
  id: string
  created_at: string
  mentee: {
    id: string
    email: string
    profile: {
      name: string
      skills: string[]
    }
  }
  mentor: {
    id: string
    email: string
    profile: {
      name: string
      skills: string[]
    }
  }
  sessionCount: number
  lastSessionDate?: string
}

interface User {
  id: string
  email: string
  role: string
  profile: {
    name: string
    skills: string[]
  }
}

export default function AdminMatchesPage() {
  const [matches, setMatches] = useState<Match[]>([])
  const [filteredMatches, setFilteredMatches] = useState<Match[]>([])
  const [mentors, setMentors] = useState<User[]>([])
  const [mentees, setMentees] = useState<User[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [isCreateMatchOpen, setIsCreateMatchOpen] = useState(false)
  const [selectedMentor, setSelectedMentor] = useState("")
  const [selectedMentee, setSelectedMentee] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  useEffect(() => {
    checkAuth()
    fetchMatches()
    fetchUsers()
  }, [])

  useEffect(() => {
    filterMatches()
  }, [matches, searchTerm])

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

  const fetchMatches = async () => {
    try {
      const response = await fetch("/api/admin/matches")
      const data = await response.json()
      setMatches(data)
    } catch (error) {
      console.error("Failed to fetch matches:", error)
      setError("Failed to fetch matches")
    } finally {
      setLoading(false)
    }
  }

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/admin/users")
      const data = await response.json()
      setMentors(data.filter((u: User) => u.role === "MENTOR"))
      setMentees(data.filter((u: User) => u.role === "MENTEE"))
    } catch (error) {
      console.error("Failed to fetch users:", error)
    }
  }

  const filterMatches = () => {
    let filtered = matches

    if (searchTerm) {
      filtered = filtered.filter(
        (match) =>
          match.mentee.profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          match.mentor.profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          match.mentee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          match.mentor.email.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    setFilteredMatches(filtered)
  }

  const createMatch = async () => {
    try {
      setError("")
      setSuccess("")

      if (!selectedMentor || !selectedMentee) {
        setError("Please select both a mentor and mentee")
        return
      }

      const response = await fetch("/api/admin/matches", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mentorId: selectedMentor,
          menteeId: selectedMentee,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to create match")
      }

      setSuccess("Match created successfully!")
      setIsCreateMatchOpen(false)
      setSelectedMentor("")
      setSelectedMentee("")
      fetchMatches()
    } catch (err: any) {
      setError(err.message)
    }
  }

  const deleteMatch = async (matchId: string) => {
    if (!confirm("Are you sure you want to delete this match? This will also delete all associated sessions.")) {
      return
    }

    try {
      const response = await fetch(`/api/admin/matches/${matchId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setSuccess("Match deleted successfully!")
        fetchMatches()
      } else {
        const data = await response.json()
        setError(data.error || "Failed to delete match")
      }
    } catch (error) {
      setError("Failed to delete match")
    }
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
            <h1 className="text-3xl font-bold text-gray-900">Mentorship Matches</h1>
            <p className="mt-2 text-gray-600">View and manage all mentorship relationships</p>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="mb-6">
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Matches</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{matches.length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{matches.reduce((sum, match) => sum + match.sessionCount, 0)}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Sessions/Match</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {matches.length > 0
                    ? (matches.reduce((sum, match) => sum + match.sessionCount, 0) / matches.length).toFixed(1)
                    : "0"}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Controls */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Search & Actions</span>
                <Dialog open={isCreateMatchOpen} onOpenChange={setIsCreateMatchOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <UserPlus className="w-4 h-4 mr-2" />
                      Create Match
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create New Match</DialogTitle>
                      <DialogDescription>Manually assign a mentor to a mentee</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="mentor">Select Mentor</Label>
                        <Select value={selectedMentor} onValueChange={setSelectedMentor}>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose a mentor..." />
                          </SelectTrigger>
                          <SelectContent>
                            {mentors.map((mentor) => (
                              <SelectItem key={mentor.id} value={mentor.id}>
                                {mentor.profile.name} ({mentor.email})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="mentee">Select Mentee</Label>
                        <Select value={selectedMentee} onValueChange={setSelectedMentee}>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose a mentee..." />
                          </SelectTrigger>
                          <SelectContent>
                            {mentees.map((mentee) => (
                              <SelectItem key={mentee.id} value={mentee.id}>
                                {mentee.profile.name} ({mentee.email})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <Button onClick={createMatch} className="w-full">
                        Create Match
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search matches..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* Matches Table */}
          <Card>
            <CardHeader>
              <CardTitle>Mentorship Matches ({filteredMatches.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8">Loading matches...</div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Mentee</TableHead>
                        <TableHead>Mentor</TableHead>
                        <TableHead>Skills Match</TableHead>
                        <TableHead>Sessions</TableHead>
                        <TableHead>Last Session</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredMatches.map((match) => (
                        <TableRow key={match.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{match.mentee.profile.name}</div>
                              <div className="text-sm text-gray-500">{match.mentee.email}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">{match.mentor.profile.name}</div>
                              <div className="text-sm text-gray-500">{match.mentor.email}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {match.mentee.profile.skills
                                ?.filter((skill) => match.mentor.profile.skills?.includes(skill))
                                .slice(0, 2)
                                .map((skill) => (
                                  <Badge key={skill} variant="secondary" className="text-xs">
                                    {skill}
                                  </Badge>
                                ))}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{match.sessionCount}</Badge>
                          </TableCell>
                          <TableCell>
                            {match.lastSessionDate
                              ? new Date(match.lastSessionDate).toLocaleDateString()
                              : "No sessions"}
                          </TableCell>
                          <TableCell>{new Date(match.created_at).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <Button size="sm" variant="destructive" onClick={() => deleteMatch(match.id)}>
                              Delete
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}

              {!loading && filteredMatches.length === 0 && (
                <div className="text-center py-8 text-gray-500">No matches found.</div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
