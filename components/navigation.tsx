"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User, LogOut, Settings, Users, Calendar, Search } from "lucide-react"

interface NavigationProps {
  user: {
    id: string
    email: string
    role: "ADMIN" | "MENTOR" | "MENTEE"
  }
}

export default function Navigation({ user }: NavigationProps) {
  const router = useRouter()
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
          { href: "/dashboard", label: "Dashboard", icon: User },
          { href: "/admin/users", label: "Users", icon: Users },
          { href: "/admin/matches", label: "Matches", icon: Users },
          { href: "/admin/sessions", label: "Sessions", icon: Calendar },
        ]
      case "MENTOR":
        return [
          { href: "/dashboard", label: "Dashboard", icon: User },
          { href: "/requests", label: "Requests", icon: Users },
          { href: "/sessions", label: "Sessions", icon: Calendar },
          { href: "/availability", label: "Availability", icon: Settings },
        ]
      case "MENTEE":
        return [
          { href: "/dashboard", label: "Dashboard", icon: User },
          { href: "/mentors", label: "Find Mentors", icon: Search },
          { href: "/my-requests", label: "My Requests", icon: Users },
          { href: "/my-sessions", label: "My Sessions", icon: Calendar },
        ]
      default:
        return []
    }
  }

  const navItems = getNavItems()

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/dashboard" className="flex-shrink-0">
              <h1 className="text-xl font-bold text-gray-900">MentorMatch</h1>
            </Link>

            <div className="hidden md:ml-6 md:flex md:space-x-8">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </div>

          <div className="flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{user.email.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">{user.email}</p>
                    <p className="w-[200px] truncate text-sm text-muted-foreground">{user.role.toLowerCase()}</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile/edit">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Profile Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} disabled={loading}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>{loading ? "Signing out..." : "Sign out"}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  )
}
