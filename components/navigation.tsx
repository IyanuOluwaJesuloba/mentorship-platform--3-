"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { User, LogOut, Settings, Users, Calendar, Search, GraduationCap, LayoutDashboard } from "lucide-react"

interface NavigationProps {
  user: {
    id: string
    email: string
    role: "ADMIN" | "MENTOR" | "MENTEE"
  }
}

export default function Navigation({ user }: NavigationProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [loading, setLoading] = useState(false)

  const handleLogout = async () => {
    setLoading(true)
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      router.push("/login")
      router.refresh()
    } catch (error) {
      console.error("Logout failed:", error)
    } finally {
      setLoading(false)
    }
  }

  const getNavItems = () => {
    switch (user.role) {
      case "ADMIN":
        return [
          { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
          { href: "/admin/users", label: "Users", icon: Users },
          { href: "/admin/matches", label: "Matches", icon: Users },
          { href: "/admin/sessions", label: "Sessions", icon: Calendar },
        ]
      case "MENTOR":
        return [
          { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
          { href: "/requests", label: "Requests", icon: Users },
          { href: "/sessions", label: "Sessions", icon: Calendar },
          { href: "/availability", label: "Availability", icon: Settings },
        ]
      case "MENTEE":
        return [
          { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
          { href: "/mentors", label: "Find Mentors", icon: Search },
          { href: "/my-requests", label: "My Requests", icon: Users },
          { href: "/my-sessions", label: "My Sessions", icon: Calendar },
        ]
      default:
        return []
    }
  }

  const getRoleBadgeColor = () => {
    switch (user.role) {
      case "ADMIN":
        return "bg-purple-100 text-purple-700 border-purple-200"
      case "MENTOR":
        return "bg-green-100 text-green-700 border-green-200"
      case "MENTEE":
        return "bg-blue-100 text-blue-700 border-blue-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const navItems = getNavItems()

  return (
    <nav className="glass-effect sticky top-0 z-50 border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/dashboard" className="flex items-center space-x-2 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                MentorMatch
              </h1>
            </Link>

            <div className="hidden md:ml-10 md:flex md:space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                      isActive
                        ? "bg-purple-50 text-purple-700 shadow-sm"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 rounded-full hover:bg-slate-100 transition-colors">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-9 w-9 ring-2 ring-purple-100">
                      <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 text-white font-semibold">
                        {user.email.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden lg:flex flex-col items-start">
                      <span className="text-sm font-medium text-slate-900">{user.email.split("@")[0]}</span>
                      <Badge variant="outline" className={`text-xs ${getRoleBadgeColor()} border`}>
                        {user.role.toLowerCase()}
                      </Badge>
                    </div>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 p-2 shadow-xl border-slate-200" align="end" forceMount>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50">
                  <Avatar className="h-10 w-10 ring-2 ring-purple-100">
                    <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 text-white font-semibold">
                      {user.email.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col space-y-1">
                    <p className="font-semibold text-slate-900">{user.email}</p>
                    <Badge variant="outline" className={`text-xs w-fit ${getRoleBadgeColor()} border`}>
                      {user.role.toLowerCase()}
                    </Badge>
                  </div>
                </div>
                <DropdownMenuSeparator className="my-2" />
                <DropdownMenuItem asChild className="cursor-pointer p-2 rounded-md hover:bg-slate-100">
                  <Link href="/profile/edit" className="flex items-center">
                    <Settings className="mr-3 h-4 w-4 text-slate-600" />
                    <span className="font-medium text-slate-700">Profile Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="my-2" />
                <DropdownMenuItem 
                  onClick={handleLogout} 
                  disabled={loading}
                  className="cursor-pointer p-2 rounded-md hover:bg-red-50 text-red-600 focus:bg-red-50 focus:text-red-600"
                >
                  <LogOut className="mr-3 h-4 w-4" />
                  <span className="font-medium">{loading ? "Signing out..." : "Sign out"}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  )
}
