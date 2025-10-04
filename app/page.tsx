import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Calendar, Star, ArrowRight, MessageSquare, TrendingUp, GraduationCap, Target, Zap } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse delay-75"></div>
        <div className="absolute -bottom-32 left-40 w-96 h-96 bg-indigo-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse delay-150"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full filter blur-3xl"></div>
      </div>

      {/* Navigation */}
      <nav className="bg-slate-950/60 backdrop-blur-xl border-b border-purple-500/20 shadow-lg fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shadow-lg">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                MentorMatch
              </h1>
            </div>
            <div className="flex items-center space-x-3">
              <Link href="/login">
                <Button variant="ghost" className="text-slate-300 hover:text-white hover:bg-white/10 font-medium">
                  Sign In
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 font-medium">
                  Get Started Free
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center animate-fade-in">
            <Badge variant="secondary" className="mb-6 px-5 py-2.5 text-sm font-medium bg-purple-500/20 backdrop-blur-sm border border-purple-500/30 shadow-md hover:shadow-lg transition-shadow text-purple-200">
              <GraduationCap className="w-4 h-4 inline-block mr-2 text-purple-400" />
              Trusted by 1000+ professionals worldwide
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
              Find the perfect
              <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent block mt-2">
                mentor for your journey
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
              Connect with experienced professionals who can accelerate your career growth, share valuable insights, and
              help you achieve your goals faster.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/register">
                <Button
                  size="lg"
                  className="text-lg px-10 py-7 h-auto bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 font-semibold"
                >
                  Start Your Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/login">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-10 py-7 h-auto border-2 border-purple-500/50 hover:bg-purple-500/20 hover:border-purple-400 bg-slate-800/50 backdrop-blur-sm transition-all duration-300 font-semibold text-slate-200 hover:text-white"
                >
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative z-10">
        {/* Subtle gradient overlay for transition */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 animate-slide-up">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Everything you need for successful mentorship
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto font-light">
              Our platform makes it easy to find, connect, and learn from industry experts
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="shadow-xl hover:shadow-2xl transition-all duration-300 card-hover bg-gradient-to-br from-slate-800/80 to-blue-900/50 backdrop-blur-sm border border-blue-500/20">
              <CardHeader className="text-center pb-4">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg transform transition-transform group-hover:scale-110">
                  <Users className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-white">Smart Matching</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base leading-relaxed text-slate-300">
                  Our intelligent algorithm matches you with mentors based on your goals, skills, and industry
                  preferences.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="shadow-xl hover:shadow-2xl transition-all duration-300 card-hover bg-gradient-to-br from-slate-800/80 to-green-900/50 backdrop-blur-sm border border-green-500/20">
              <CardHeader className="text-center pb-4">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Calendar className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-white">Flexible Scheduling</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base leading-relaxed text-slate-300">
                  Book sessions that fit your schedule. Mentors set their availability, and you choose what works best.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="shadow-xl hover:shadow-2xl transition-all duration-300 card-hover bg-gradient-to-br from-slate-800/80 to-amber-900/50 backdrop-blur-sm border border-amber-500/20">
              <CardHeader className="text-center pb-4">
                <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Star className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-white">Track Progress</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base leading-relaxed text-slate-300">
                  Rate sessions, provide feedback, and track your growth throughout your mentorship journey.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 relative z-10">
        {/* Additional ambient orbs for depth */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 right-20 w-80 h-80 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-10"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">How it works</h2>
            <p className="text-xl text-slate-300 font-light">Get started in just a few simple steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center relative group">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
                1
              </div>
              <div className="absolute top-8 left-1/2 w-full h-0.5 bg-gradient-to-r from-purple-300 to-blue-300 hidden md:block"></div>
              <h3 className="text-2xl font-bold mb-4 text-white">Create Your Profile</h3>
              <p className="text-slate-300 leading-relaxed">
                Sign up and tell us about your background, skills, and what you're looking to achieve.
              </p>
            </div>

            <div className="text-center relative group">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
                2
              </div>
              <div className="absolute top-8 left-1/2 w-full h-0.5 bg-gradient-to-r from-blue-300 to-indigo-300 hidden md:block"></div>
              <h3 className="text-2xl font-bold mb-4 text-white">Find Your Mentor</h3>
              <p className="text-slate-300 leading-relaxed">
                Browse through our curated list of mentors and send requests to those who align with your goals.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
                3
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Start Learning</h3>
              <p className="text-slate-300 leading-relaxed">
                Schedule sessions, have meaningful conversations, and accelerate your professional growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-24 relative z-10">
        {/* Ambient lighting */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[800px] h-[300px] bg-purple-600 rounded-full mix-blend-screen filter blur-3xl opacity-10"></div>
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="shadow-2xl overflow-hidden bg-gradient-to-br from-slate-800 via-slate-800 to-slate-900 border border-purple-500/20">
            <CardHeader className="text-center pb-8 pt-12">
              <CardTitle className="text-4xl font-bold mb-4 text-white">Try the Platform</CardTitle>
              <CardDescription className="text-xl font-light text-slate-300">
                Explore different user experiences with our demo accounts
              </CardDescription>
            </CardHeader>
            <CardContent className="px-8 pb-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="text-center p-8 border-2 border-purple-500/30 rounded-2xl hover:border-purple-400 hover:shadow-xl transition-all duration-300 bg-slate-700/50 backdrop-blur-sm group">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform">
                    <TrendingUp className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-bold mb-3 text-xl text-white">Admin Dashboard</h3>
                  <p className="text-sm text-slate-300 mb-6">Manage users and oversee platform analytics</p>
                  <div className="space-y-2 text-sm bg-slate-800/80 p-4 rounded-xl border border-purple-500/30">
                    <p className="text-slate-200">
                      <strong className="font-semibold text-purple-400">Email:</strong> admin@mentorship.com
                    </p>
                    <p className="text-slate-200">
                      <strong className="font-semibold text-purple-400">Password:</strong> password123
                    </p>
                  </div>
                </div>

                <div className="text-center p-8 border-2 border-green-500/30 rounded-2xl hover:border-green-400 hover:shadow-xl transition-all duration-300 bg-slate-700/50 backdrop-blur-sm group">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform">
                    <MessageSquare className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-bold mb-3 text-xl text-white">Mentor Experience</h3>
                  <p className="text-sm text-slate-300 mb-6">Share knowledge and guide mentees</p>
                  <div className="space-y-2 text-sm bg-slate-800/80 p-4 rounded-xl border border-green-500/30">
                    <p className="text-slate-200">
                      <strong className="font-semibold text-green-400">Email:</strong> mentor1@example.com
                    </p>
                    <p className="text-slate-200">
                      <strong className="font-semibold text-green-400">Password:</strong> password123
                    </p>
                  </div>
                </div>

                <div className="text-center p-8 border-2 border-blue-500/30 rounded-2xl hover:border-blue-400 hover:shadow-xl transition-all duration-300 bg-slate-700/50 backdrop-blur-sm group">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-bold mb-3 text-xl text-white">Mentee Journey</h3>
                  <p className="text-sm text-slate-300 mb-6">Find mentors and accelerate growth</p>
                  <div className="space-y-2 text-sm bg-slate-800/80 p-4 rounded-xl border border-blue-500/30">
                    <p className="text-slate-200">
                      <strong className="font-semibold text-blue-400">Email:</strong> mentee1@example.com
                    </p>
                    <p className="text-slate-200">
                      <strong className="font-semibold text-blue-400">Password:</strong> password123
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <Link href="/login">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg px-10 py-6 h-auto shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 font-semibold"
                  >
                    Try Demo Accounts
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        {/* Intensified gradient orbs for this section */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-600 rounded-full mix-blend-screen filter blur-3xl opacity-25 animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600 rounded-full mix-blend-screen filter blur-3xl opacity-25 animate-pulse delay-75"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600 rounded-full mix-blend-screen filter blur-3xl opacity-15"></div>
        </div>
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">Ready to accelerate your career?</h2>
          <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            Join thousands of professionals who are already growing their careers through meaningful mentorship
            connections.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-10 py-7 h-auto bg-white text-purple-600 hover:bg-slate-50 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 font-semibold"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/login">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-10 py-7 h-auto border-2 border-white text-white hover:bg-white/20 bg-white/10 backdrop-blur-sm transition-all duration-300 font-semibold"
              >
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-slate-900 to-slate-950/80 text-white py-16 relative border-t border-purple-500/20">
        {/* Subtle ambient glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[600px] h-[200px] bg-purple-600/10 rounded-full filter blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shadow-lg">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                MentorMatch
              </h3>
            </div>
            <p className="text-slate-400 mb-8 text-lg font-light">Connecting mentors and mentees for meaningful professional growth</p>
            <div className="flex justify-center space-x-8 mb-6">
              <Link href="/login" className="text-slate-400 hover:text-white transition-colors font-medium">
                Sign In
              </Link>
              <Link href="/register" className="text-slate-400 hover:text-white transition-colors font-medium">
                Register
              </Link>
            </div>
            <div className="pt-8 border-t border-slate-800">
              <p className="text-slate-500 text-sm">© 2025 MentorMatch. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
