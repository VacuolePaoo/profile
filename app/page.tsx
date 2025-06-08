"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { SmoothCursor } from "@/components/ui/smooth-cursor";
import {  Github,
  Notebook,
  MapPin,
  Coffee,
  Music,
  Camera,
  Code,
  Moon,
  Sun,
  Calendar,
  GraduationCap,
  ArrowRight,
  Eye,
  Play,
} from "lucide-react"
import { SiBilibili } from "react-icons/si"

// Import configurations
import { profile } from "./config/profile"
import { interests } from "./config/interests"
import { games } from "./config/games"
import { software } from "./config/software"
import { socialLinks } from "./config/social"

export default function HomePage() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [currentTime, setCurrentTime] = useState<string>("")
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isAnimating, setIsAnimating] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // 为动画添加客户端渲染检查
  useEffect(() => {
    setIsAnimating(true)
  }, [])

  // 使用 useEffect 来处理客户端特定的时间更新
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(now.toLocaleTimeString())
    }

    updateTime() // 初始更新
    const timer = setInterval(updateTime, 1000)

    return () => clearInterval(timer)
  }, [])

  // 暗色模式处理
  useEffect(() => {
    const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)")
    setIsDarkMode(darkModeQuery.matches)

    const darkModeListener = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches)
    }

    darkModeQuery.addEventListener("change", darkModeListener)
    return () => darkModeQuery.removeEventListener("change", darkModeListener)
  }, [])

  // 更新文档主题
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDarkMode])

  // 鼠标位置处理
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
      }
    }

    const current = containerRef.current
    if (current) {
      current.addEventListener("mousemove", handleMouseMove)
      return () => current.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const currentYear = new Date().getFullYear()
  const age = currentYear - profile.birthYear

  // Grid items hover 效果
  const getItemStyle = (index: number) => {
    if (!isAnimating) {
      return {}
    }

    return {
      transform: `translateY(${Math.sin(index * 0.5) * 2}px)`,
      transition: "transform 0.3s ease-out",
    }
  }

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300 overflow-x-hidden"
    >
      <SmoothCursor />
      <style jsx global>{`
        ::-webkit-scrollbar {
          width: 4px;
        }
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #6366f1, #8b5cf6);
          border-radius: 2px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #4f46e5, #7c3aed);
        }
        html {
          scrollbar-width: thin;
          scrollbar-color: #6366f1 transparent;
        }

        @keyframes gradient-x {
          0%, 100% {
            background-size: 200% 100%;
            background-position: left center;
          }
          50% {
            background-size: 200% 100%;
            background-position: right center;
          }
        }
        .animate-gradient-x {
          animation: gradient-x 8s ease infinite;
          background-size: 200% 100%;
        }
      `}</style>

      {/* Floating Theme Toggle */}
      <div className="fixed top-6 right-6 z-50">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="w-12 h-12 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        >
          <Sun
            className={`h-5 w-5 transition-all duration-500 ${isDarkMode ? "-rotate-90 scale-0" : "rotate-0 scale-100"}`}
          />
          <Moon
            className={`absolute h-5 w-5 transition-all duration-500 ${isDarkMode ? "rotate-0 scale-100" : "rotate-90 scale-0"}`}
          />
        </Button>
      </div>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* 移除动画背景元素以解决水合问题 */}
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6 sm:space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <Calendar className="w-4 h-4" />
                  <span>{profile.birthYear} · {age}岁</span>
                  <GraduationCap className="w-4 h-4 ml-4" />
                  <span>{profile.education}</span>
                </div>
                <h1 className="text-4xl sm:text-6xl font-bold tracking-tight dark:text-white">
                  <span className="animate-gradient-x bg-gradient-to-r from-emerald-400 via-violet-500 to-rose-400 bg-clip-text text-transparent">
                    数字创作者
                  </span>
                  <br />
                  <span className="text-gray-500 dark:text-gray-400">& 小镇做题家</span>
                </h1>
                <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                  分享科技与生活
                </p>
              </div>              <div className="flex flex-col sm:flex-row gap-4">                <Button
                  size="lg"
                  className="bg-black hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-100 text-white px-8 group relative overflow-hidden active:scale-95 transition-all duration-300"
                  onClick={() => window.open('https://blog.vacu.top', '_blank')}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <Notebook className="w-4 h-4 mr-2 relative z-10" />
                  <span className="relative z-10">查看博客</span>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 dark:border-gray-600 dark:text-gray-300 group hover:border-pink-500 hover:text-pink-500 active:scale-95 transition-all duration-300"
                  onClick={() => window.open('https://space.bilibili.com/518590350', '_blank')}
                >
                  <SiBilibili className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                  查看B站
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="relative w-80 h-80 mx-auto group">
                {/* Floating Elements */}

                <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-3xl rotate-6 shadow-lg group-hover:rotate-12 transition-transform duration-500"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 dark:from-gray-600 dark:to-gray-700 rounded-3xl -rotate-3 shadow-lg group-hover:-rotate-6 transition-transform duration-500"></div>
                <Card className="relative bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl border border-gray-200 dark:border-gray-700 group-hover:scale-105 transition-transform duration-500">
                                      <Avatar className="w-24 h-24 mx-auto mb-6 ring-4 ring-gray-100 dark:ring-gray-700 group-hover:ring-purple-500 transition-all duration-300">
                    <AvatarImage src={profile.avatar.src} alt="Profile" />
                    <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                      {profile.avatar.fallback}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-center space-y-2">
                    <h3 className="font-semibold dark:text-white">{profile.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {profile.location}
                    </p>
                    <div className="flex justify-center gap-2 pt-4">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-gray-400 dark:text-gray-500">在线</span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Personality Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 bg-gray-50 dark:bg-gray-800/50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="p-6 sm:p-8 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10 space-y-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                    性格类型
                  </h3>
                  <div className="flex items-center gap-3 mb-4">
                    <Badge
                      variant="secondary"
                      className="text-lg px-4 py-2 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 group-hover:scale-110 transition-transform duration-300"
                    >
                      {profile.personality.type}
                    </Badge>
                    <span className="text-xl font-semibold text-purple-600 dark:text-purple-400">{profile.personality.title}</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {profile.personality.description}
                  </p>
                </div>
                <div className="space-y-3">
                  {profile.personality.traits.map((trait, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-400">{trait.name}</span>
                        <span className="text-sm font-medium dark:text-white">{trait.value}%</span>
                      </div>
                      <Progress value={trait.value} className="h-2 group-hover:h-3 transition-all duration-300" />
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            <Card className="p-6 sm:p-8 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm group relative overflow-hidden">
              <div className="h-full flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl group-hover:scale-105 transition-transform duration-500">
                <div className="text-center space-y-4">
                  <div className="w-32 h-32 bg-gray-200 dark:bg-gray-700 rounded-2xl mx-auto flex items-center justify-center group-hover:rotate-6 transition-transform duration-500">
                    <span className="text-gray-500 dark:text-gray-400 text-sm">性格插画</span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">ISFP-T 探险家插画</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Interests Grid */}
      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl font-bold mb-4 dark:text-white">兴趣领域</h2>
            <p className="text-gray-600 dark:text-gray-300">生活中让我保持热情的事物</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
            {interests.map((interest, index) => (
              <Card
                key={interest.id}
                className="relative p-6 group cursor-pointer transition-all duration-300"
                onMouseEnter={() => isAnimating && setHoveredCard(interest.id)}
                onMouseLeave={() => isAnimating && setHoveredCard(null)}
                style={{
                  transform: isAnimating && hoveredCard === interest.id 
                    ? "perspective(1000px) rotateX(5deg) rotateY(5deg)" 
                    : "none",
                  transition: isAnimating ? "all 0.3s ease-out" : "none",
                }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${interest.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                ></div>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <CardHeader className="pb-4 relative z-10">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-xl shadow-sm group-hover:shadow-lg transition-all duration-300 group-hover:rotate-12">
                        <interest.icon className="w-6 h-6 dark:text-gray-300 group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <div>
                        <CardTitle className="text-xl mb-1 dark:text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-500 group-hover:bg-clip-text transition-all duration-300">
                          {interest.name}
                        </CardTitle>
                        <CardDescription className="text-base dark:text-gray-300">
                          {interest.description}
                        </CardDescription>
                      </div>
                    </div>
                    <ArrowRight
                      className={`w-5 h-5 text-gray-400 transition-all duration-300 ${
                        hoveredCard === interest.id ? "translate-x-2 text-purple-500 scale-125" : ""
                      }`}
                    />
                  </div>
                </CardHeader>
                <CardContent className="relative z-10">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">{interest.stats}</span>
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4 text-gray-400 group-hover:text-purple-500 transition-colors duration-300" />
                      <span className="text-sm text-gray-500 dark:text-gray-400">查看更多</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 bg-gray-50 dark:bg-gray-800/50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl font-bold mb-4 dark:text-white">开启创造力</h2>
            <p className="text-gray-600 dark:text-gray-300">我熟练使用的创作工具</p>
          </div>

          <Card className="p-6 sm:p-8 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10 space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                {software.map((tool, index) => (
                  <div
                    key={tool.name}
                    className="group/item select-none flex items-center gap-3 bg-gray-50 dark:bg-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 rounded-full px-4 py-3 transition-colors duration-300 cursor-pointer border border-gray-200 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-600"
                    style={getItemStyle(index)}
                  >
                    <span className="text-lg group-hover/item:scale-125 group-hover/item:rotate-12 transition-transform duration-300 select-none">
                      {tool.icon}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm dark:text-white truncate group-hover/item:text-purple-600 dark:group-hover/item:text-purple-400 transition-colors duration-300">
                        {tool.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{tool.category}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Gaming Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl font-bold mb-4 dark:text-white">游戏世界</h2>
            <p className="text-gray-600 dark:text-gray-300">最近在玩的游戏</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
            {games.map((game) => (
              <Card
                key={game.id}
                className="relative w-full h-56 overflow-hidden group"
                onMouseEnter={() => isAnimating && setHoveredCard(game.id)}
                onMouseLeave={() => isAnimating && setHoveredCard(null)}
                style={{
                  opacity: isAnimating ? 1 : 0.95,
                  transform: isAnimating && hoveredCard === game.id ? 'scale(1.02)' : 'scale(1)',
                  transition: isAnimating ? 'all 0.3s ease-out' : 'none'
                }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${game.bgColor} opacity-20 group-hover:opacity-30 transition-opacity duration-500`}
                ></div>
                <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  <span className="text-gray-400 dark:text-gray-500 text-sm">游戏背景图</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardContent className="relative p-6 sm:p-8 h-48 flex flex-col justify-between z-10">
                  <div>
                    <h3 className="text-2xl font-bold mb-2 text-white drop-shadow-lg group-hover:scale-110 transition-transform duration-300 origin-left">
                      {game.name}
                    </h3>
                  </div>
                  <div className="flex items-end justify-between">
                    <Badge className="bg-black/50 text-white border-0 backdrop-blur-sm group-hover:bg-purple-500/80 transition-colors duration-300">
                      {game.tag}
                    </Badge>
                    <span className="text-white/80 text-sm font-medium drop-shadow group-hover:text-white transition-colors duration-300">
                      {game.playerId}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Playlist Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 bg-gray-50 dark:bg-gray-800/50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl font-bold mb-4 dark:text-white">我的歌单</h2>
            <p className="text-gray-600 dark:text-gray-300">分享我喜欢的音乐</p>
          </div>

          <Link href="https://music.163.com" className="block group cursor-pointer" target="_blank" rel="noopener noreferrer">
            <Card className="overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm relative">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

              <CardContent className="p-6 sm:p-8 relative z-10">
                <div className="grid md:grid-cols-3 gap-6 items-center">
                  <div className="md:col-span-2 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                        <Music className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm text-red-500 font-medium">网易云音乐</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-red-500 transition-colors duration-300">
                        Lo-Fi 学习专辑
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        专注时刻的放松音乐，包含精选的Lo-Fi Hip Hop和轻音乐，适合学习、工作和创作时聆听。
                      </p>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <span>42首歌曲</span>
                      <span>•</span>
                      <span>2小时31分钟</span>
                      <span>•</span>
                      <span>1.2万播放</span>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="aspect-square bg-gradient-to-br from-red-100 to-orange-100 dark:from-red-900/20 dark:to-orange-900/20 rounded-2xl relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
                      <img
                        src="/placeholder.svg?height=200&width=200"
                        alt="歌单封面"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                        <div className="bg-white/90 dark:bg-gray-800/90 rounded-full p-4 transform scale-0 group-hover:scale-100 transition-transform duration-300 delay-100">
                          <Play className="w-6 h-6 text-red-500" />
                        </div>
                      </div>
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>

      {/* Contact */}
      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl font-bold mb-4 dark:text-white">保持联系</h2>
            <p className="text-gray-600 dark:text-gray-300">通过这些平台找到我</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {socialLinks.map((social, index) => (
              <Link href={social.link} key={social.id} className="block group cursor-pointer" target="_blank" rel="noopener noreferrer">
                <Card
                  className="h-full border-0 overflow-hidden transition-all duration-300 relative"
                  style={{
                    transform: "translateY(0px)",
                    transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-8px) scale(1.05)"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0px) scale(1)"
                  }}
                >
                  <div className={`h-1 ${social.color} w-full transition-all duration-300 group-hover:h-2`}></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <CardContent className="p-4 sm:p-6 flex flex-col items-center text-center relative z-10">
                    <div className="text-3xl mb-3 group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300">
                      {social.icon}
                    </div>
                    <h3
                      className={`font-medium mb-1 ${social.textColor} dark:text-white group-hover:scale-110 transition-transform duration-300`}
                    >
                      {social.name}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 break-all">{social.username}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}