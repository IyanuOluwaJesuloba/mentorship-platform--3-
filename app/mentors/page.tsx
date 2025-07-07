"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Star, Users } from "lucide-react"
import Navigation from "@/components/navigation"
import { redirect } from "next/navigation"

interface Mentor {
  id: string
  name: string
  bio: string
  skills: string[]
  industry: string
  averageRating: number
  totalSessions: number
}

export default function MentorsPage() {
  const [mentors, setMentors] = useState<Mentor[]>([])
  const [filteredMentors, setFilteredMentors] = useState<Mentor[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [skillFilter, setSkillFilter] = useState("")
  const [industryFilter, setIndustryFilter] = useState("")
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    checkAuth()
    fetchMentors()
  }, [])

  useEffect(() => {
    filterMentors()
  }, [mentors, searchTerm, skillFilter, industryFilter])

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/auth/me")
      if (response.ok) {
        const userData = await response.json()
        setUser(userData)
      } else {
        redirect("/login")
      }
    } catch (error) {
      redirect("/login")
    }
  }

  const fetchMentors = async () => {
    try {
      const response = await fetch("/api/mentors")
      const data = await response.json()
      setMentors(data)
    } catch (error) {
      console.error("Failed to fetch mentors:", error)
    } finally {
      setLoading(false)
    }
  }

  const filterMentors = () => {
    let filtered = mentors

    if (searchTerm) {
      filtered = filtered.filter(
        (mentor) =>
          mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          mentor.bio.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (skillFilter) {
      filtered = filtered.filter((mentor) =>
        mentor.skills.some((skill) => skill.toLowerCase().includes(skillFilter.toLowerCase())),
      )
    }

    if (industryFilter) {
      filtered = filtered.filter((mentor) => mentor.industry.toLowerCase().includes(industryFilter.toLowerCase()))
    }

    setFilteredMentors(filtered)
  }

  const requestMentorship = async (mentorId: string) => {
    try {
      const response = await fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mentorId }),
      })

      if (response.ok) {
        alert("Mentorship request sent successfully!")
      } else {
        const data = await response.json()
        alert(data.error || "Failed to send request")
      }
    } catch (error) {
      alert("Failed to send request")
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
            <h1 className="text-3xl font-bold text-gray-900">Find Mentors</h1>
            <p className="mt-2 text-gray-600">Connect with experienced professionals who can guide your journey</p>
          </div>

          {/* Filters */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Search & Filter</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search mentors..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Input
                  placeholder="Filter by skill..."
                  value={skillFilter}
                  onChange={(e) => setSkillFilter(e.target.value)}
                />
                <Input
                  placeholder="Filter by industry..."
                  value={industryFilter}
                  onChange={(e) => setIndustryFilter(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Mentors Grid */}
          {loading ? (
            <div className="text-center">Loading mentors...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMentors.map((mentor) => (
                <Card key={mentor.id} className="h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {mentor.name}
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{mentor.averageRating?.toFixed(1) || "N/A"}</span>
                      </div>
                    </CardTitle>
                    <CardDescription>{mentor.industry}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <p className="text-sm text-gray-600 mb-4 flex-1">{mentor.bio}</p>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {mentor.skills.slice(0, 4).map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {mentor.skills.length > 4 && (
                        <Badge variant="outline" className="text-xs">
                          +{mentor.skills.length - 4} more
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Users className="h-4 w-4" />
                        {mentor.totalSessions || 0} sessions
                      </div>
                    </div>

                    <Button onClick={() => requestMentorship(mentor.id)} className="w-full">
                      Request Mentorship
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {!loading && filteredMentors.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No mentors found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
