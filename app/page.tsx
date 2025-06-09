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
  Copy,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  RotateCw,
  Gamepad2,
  Music2,
  BookOpen,
  PenLine
} from "lucide-react"
import { SiBilibili } from "react-icons/si"
import { cn } from "@/lib/utils"

// Import configurations
import { profile } from "./config/profile"
import { interests } from "./config/interests"
import { games } from "./config/games"
import { software } from "./config/software"
import { socialLinks } from "./config/social"
import { links } from "./config/links"

type IconName = "gamepad-2" | "music-2" | "book-open" | "pen-line";

function getIcon(iconName: IconName) {
  const icons = {
    "gamepad-2": <Gamepad2 className="w-6 h-6" />,
    "music-2": <Music2 className="w-6 h-6" />,
    "book-open": <BookOpen className="w-6 h-6" />,
    "pen-line": <PenLine className="w-6 h-6" />
  };
  return icons[iconName] || null;
}

export default function HomePage() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [currentTime, setCurrentTime] = useState<string>("")
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isAnimating, setIsAnimating] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [activePlaylist, setActivePlaylist] = useState(0)

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

  const handleCopyId = (id: string) => {
    navigator.clipboard.writeText(id)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
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
                  onClick={() => window.open(links.blog.url, '_blank')}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <Notebook className="w-4 h-4 mr-2 relative z-10" />
                  <span className="relative z-10">{links.blog.text.default}</span>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 dark:border-gray-600 dark:text-gray-300 group hover:border-pink-500 hover:text-pink-500 active:scale-95 transition-all duration-300"
                  onClick={() => window.open(links.bilibili.url, '_blank')}
                >
                  <SiBilibili className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                  {links.bilibili.text.default}
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
            <Card className="p-6 sm:p-8 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm group relative overflow-hidden h-[200px]">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10 space-y-4">
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
            </Card>

            <Card className="p-6 sm:p-8 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm group relative overflow-visible h-[200px]">
              <div className="h-full flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl group-hover:scale-105 transition-transform duration-500">
                <div className="text-center">
                  <div className="w-48 h-48 bg-gray-200 dark:bg-gray-700 rounded-2xl mx-auto flex items-center justify-center group-hover:rotate-6 transition-transform duration-500 relative -translate-y-4 shadow-xl">
                    <span className="text-gray-500 dark:text-gray-400 text-sm">性格插画</span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">ISFP-T 探险家插画</p>
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

          {/* 兴趣爱好卡片 */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {links.interests.map((interest, index) => (
              <Link
                key={index}
                href={interest.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <Card 
                  className={cn(
                    "group overflow-hidden border transition-all duration-300 h-full",
                    "shadow-[0_2px_8px_-3px_rgba(0,0,0,0.05)] dark:shadow-[0_2px_8px_-3px_rgba(0,0,0,0.3)]",
                    "hover:shadow-[0_12px_32px_-8px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_12px_32px_-8px_rgba(0,0,0,0.5)]",
                    "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600",
                    "bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50",
                    "hover:bg-gradient-to-br hover:from-purple-50/50 hover:to-blue-50/50 dark:hover:from-purple-900/10 dark:hover:to-blue-900/10"
                  )}
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col gap-4">
                      <div className="w-12 h-12 rounded-lg flex items-center justify-center text-gray-600 dark:text-gray-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                        {getIcon(interest.icon)}
                      </div>
                      <div>
                        <h3 className="font-bold mb-2 text-gray-800 dark:text-gray-200 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                          {interest.title}
                        </h3>
                        <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-300 transition-colors duration-300">
                          {interest.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
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
              <Link
                key={game.id}
                href={game.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Card
                  className="relative w-full h-72 overflow-hidden group cursor-pointer"
                  onMouseEnter={() => isAnimating && setHoveredCard(game.id)}
                  onMouseLeave={() => isAnimating && setHoveredCard(null)}
                  style={{
                    opacity: isAnimating ? 1 : 0.95,
                    transform: isAnimating && hoveredCard === game.id ? 'scale(1.02)' : 'scale(1)',
                    transition: isAnimating ? 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' : 'none'
                  }}
                >
                  {/* 背景图片 */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-700"
                    style={{ 
                      backgroundImage: `url(${game.coverImage})`,
                      backgroundPosition: 'center',
                    }}
                  >
                    <img
                      src={game.coverImage}
                      alt={game.title}
                      className="opacity-0 w-full h-full"
                      onError={(e) => {
                        const target = e.currentTarget;
                        target.parentElement!.style.backgroundImage = `url('https://placehold.co/1920x1080/purple/white/png?text=${encodeURIComponent(game.title)}')`;
                      }}
                    />
                  </div>
                  
                  {/* 渐变遮罩 */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-br from-black/60 to-black/40 opacity-40 group-hover:opacity-50 transition-opacity duration-500 mix-blend-multiply"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  
                  {/* 内容区域 */}
                  <CardContent className="relative h-full p-6 sm:p-8 flex flex-col justify-between z-10">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge className="bg-white/10 hover:bg-white/20 text-white border-0 backdrop-blur-sm">
                          {game.platform}
                        </Badge>
                        <Badge className="bg-white/10 hover:bg-white/20 text-white border-0 backdrop-blur-sm">
                          {new Date(game.lastPlayed).toLocaleDateString()}
                        </Badge>
                      </div>
                      <h3 className="text-3xl font-bold text-white drop-shadow-lg group-hover:scale-110 transition-transform duration-300 origin-left">
                        {game.title}
                      </h3>
                      <p className="text-white/90 text-sm leading-relaxed">
                        {game.description}
                      </p>
                    </div>
                    
                    <div className="space-y-4 pt-4">
                      {game.gameId && (
                        <div 
                          className="flex items-center gap-2"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            navigator.clipboard.writeText(game.gameId!);
                            const badge = e.currentTarget.querySelector('.game-id-badge');
                            if (badge) {
                              const originalText = badge.textContent;
                              badge.textContent = '已复制';
                              setTimeout(() => {
                                badge.textContent = originalText;
                              }, 1000);
                            }
                          }}
                        >
                          <Badge className="game-id-badge bg-white/10 hover:bg-white/30 text-white border-0 backdrop-blur-sm cursor-pointer transition-colors duration-300">
                            ID: {game.gameId}
                          </Badge>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Music Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl font-bold mb-4 dark:text-white">音乐</h2>
            <p className="text-gray-600 dark:text-gray-300">分享我喜欢的音乐</p>
          </div>

          {/* 音乐区域 */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* 歌单卡片区域 */}
            <div 
              className="relative h-[240px]"
              onWheel={(e) => {
                // 使用useRef来存储上次滚动时间
                const now = Date.now();
                const lastScrollTime = e.currentTarget.getAttribute('data-last-scroll');
                const scrollInterval = 500; // 500ms的滚动间隔
                
                if (!lastScrollTime || now - parseInt(lastScrollTime) >= scrollInterval) {
                  if (e.deltaY > 0) {
                    // 向下滚动
                    setActivePlaylist((prev) => (prev + 1) % links.music.playlists.length);
                  } else {
                    // 向上滚动
                    setActivePlaylist((prev) => (prev - 1 + links.music.playlists.length) % links.music.playlists.length);
                  }
                  e.currentTarget.setAttribute('data-last-scroll', now.toString());
                }
              }}
            >
              {links.music.playlists.map((playlist, index) => {
                const isActive = activePlaylist === index;
                const nextIndex = (index + 1) % links.music.playlists.length;
                const isNext = activePlaylist === nextIndex;
                
                return (
                  <Card 
                    key={index}
                    className={cn(
                      "overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-all duration-700 h-[240px] group absolute inset-0 transform",
                      {
                        "hover:border-red-200 dark:hover:border-red-800/30 hover:shadow-[0_12px_32px_-8px_rgba(0,0,0,0.3)] dark:hover:shadow-[0_12px_32px_-8px_rgba(0,0,0,0.7)] hover:bg-gradient-to-br hover:from-red-50/50 hover:to-orange-50/50 dark:hover:from-red-900/10 dark:hover:to-orange-900/10": isActive,
                        "hover:border-red-200 dark:hover:border-red-800/30 shadow-[0_8px_16px_-6px_rgba(0,0,0,0.2)] dark:shadow-[0_8px_16px_-6px_rgba(0,0,0,0.5)]": isNext,
                        "z-10 translate-x-0 rotate-0 opacity-100 pointer-events-auto shadow-[0_4px_12px_-4px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_12px_-4px_rgba(0,0,0,0.3)]": isActive,
                        "z-0 translate-x-4 rotate-6 opacity-85 pointer-events-none scale-[0.97] hover:translate-x-5": isNext,
                        "opacity-0 pointer-events-none": !isActive && !isNext
                      }
                    )}
                  >
                    <CardContent className="p-5 h-full">
                      <div className="flex gap-7 items-start h-full">
                        {/* 封面堆叠效果 */}
                        <div className="relative flex-shrink-0">
                          {/* 底部装饰方块 */}
                          <div className={cn(
                            "absolute -bottom-3 -right-3 w-32 aspect-square rounded-lg bg-gray-100 dark:bg-gray-700 shadow-[0_4px_12px_-4px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_12px_-4px_rgba(0,0,0,0.3)] transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2 group-hover:opacity-50",
                            isNext && "opacity-0"
                          )} />
                          <div className={cn(
                            "absolute -bottom-1.5 -right-1.5 w-32 aspect-square rounded-lg bg-gray-50 dark:bg-gray-750 shadow-[0_4px_12px_-4px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_12px_-4px_rgba(0,0,0,0.3)] transition-transform duration-500 group-hover:translate-x-1 group-hover:translate-y-1 group-hover:opacity-50",
                            isNext && "opacity-0"
                          )} />
                          {/* 主封面 */}
                          <Link 
                            href={playlist.url}
                            className={cn(
                              "block relative w-32 aspect-square group/cover",
                              isNext && "pointer-events-none"
                            )}
                            target="_blank" 
                            rel="noopener noreferrer"
                          >
                            <img
                              src={playlist.coverImage}
                              alt="歌单封面"
                              className="w-full h-full object-cover rounded-lg shadow-sm transition-all duration-500 group-hover:scale-110 group-hover:shadow-md"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 rounded-lg transition-colors duration-300 flex items-center justify-center">
                              <Play className="w-9 h-9 text-white opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-300" />
                            </div>
                          </Link>
                        </div>

                        {/* 内容 */}
                        <div className="flex-1 min-w-0 flex flex-col h-full">
                          <div className="flex-1">
                            <Badge 
                              variant="secondary"
                              className={cn(
                                "mb-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors duration-300 flex items-center gap-1.5 w-fit",
                                isNext && "pointer-events-none"
                              )}
                            >
                              <Music className="w-3.5 h-3.5" />
                              <Link
                                href={playlist.platform.profileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline"
                              >
                                {playlist.platform.name}
                              </Link>
                            </Badge>
                            <Link
                              href={playlist.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={cn(
                                "block group/title",
                                isNext && "pointer-events-none"
                              )}
                            >
                              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-red-500 dark:group-hover:text-red-400 transition-colors duration-300 line-clamp-1">
                                {playlist.title}
                              </h3>
                            </Link>
                            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-1">
                              {playlist.description}
                            </p>
                          </div>
                          
                          {/* 底部按钮 */}
                          <div className="flex justify-end items-center mt-3">
                            <Button
                              variant="ghost"
                              className={cn(
                                "group/btn",
                                isNext && "pointer-events-none opacity-0"
                              )}
                              asChild
                            >
                              <Link
                                href={playlist.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="gap-2"
                              >
                                查看歌单
                                <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* 最爱音乐列表 */}
            <div className="flex flex-col gap-3 h-[240px]">
              {links.music.songs.map((song, index) => (
                <Card 
                  key={index}
                  className="overflow-hidden border border-gray-100 dark:border-gray-700 shadow-[0_2px_8px_-3px_rgba(0,0,0,0.05)] dark:shadow-[0_2px_8px_-3px_rgba(0,0,0,0.3)] bg-white dark:bg-gray-800 transition-all duration-300 h-[84px] group hover:shadow-[0_8px_24px_-12px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_8px_24px_-12px_rgba(0,0,0,0.5)] hover:bg-gradient-to-r hover:from-red-50/30 hover:to-orange-50/30 dark:hover:from-red-900/5 dark:hover:to-orange-900/5"
                >
                  <CardContent className="p-4 h-full">
                    <div className="flex items-center gap-4 h-full">
                      {/* 音乐封面 */}
                      <Link
                        href={song.url}
                        className="block relative w-12 h-12 flex-shrink-0 group/cover" 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <img
                          src={song.coverImage}
                          alt={`${song.title} 封面`}
                          className="w-full h-full object-cover rounded-md transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 rounded-md transition-colors duration-300 flex items-center justify-center">
                          <Play className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-300" />
                        </div>
                      </Link>

                      {/* 音乐信息 */}
                      <div className="min-w-0 flex-1">
                        <Link
                          href={song.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block group/title"
                        >
                          <h4 className="font-medium text-gray-900 dark:text-white truncate group-hover:text-red-500 dark:group-hover:text-red-400 transition-colors duration-300">
                            {song.title}
                          </h4>
                        </Link>
                        <p className="text-sm text-gray-500 dark:text-gray-400 truncate mt-1">
                          {song.artist}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl font-bold mb-4 dark:text-white">我的项目</h2>
            <p className="text-gray-600 dark:text-gray-300">展示一些我开发的项目作品</p>
          </div>

          <div className="relative">
            <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-none">
              {links.projects.map((project) => (
                <div
                  key={project.id}
                  className="flex-none w-full md:w-[calc(33.333%-1rem)] snap-center"
                >
                  <Link href={project.url} target="_blank" rel="noopener noreferrer">
                    <Card className="h-full overflow-hidden group hover:border-purple-200 dark:hover:border-purple-800/30 transition-all duration-300 hover:shadow-lg dark:hover:shadow-purple-900/20 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg">
                      <div className="aspect-video relative overflow-hidden">
                        <img
                          src={project.coverImage}
                          alt={project.title}
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => {
                            e.currentTarget.src = "https://placehold.co/600x400/purple/white/png?text=Project+Image";
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                            {project.title}
                          </h3>
                          <Badge
                            variant="secondary"
                            className={cn(
                              "text-xs",
                              {
                                "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300": project.status === "进行中",
                                "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300": project.status === "已完成",
                                "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300": project.status === "规划中"
                              }
                            )}
                          >
                            {project.status}
                          </Badge>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                  </Link>
                </div>
              ))}
            </div>
          </div>
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
                  className="h-full border-0 overflow-hidden transition-all duration-300 relative bg-white dark:bg-gray-800"
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
                  <div className={cn(
                    "absolute inset-x-0 top-0 h-1 w-full scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100",
                    social.color
                  )}></div>
                  <CardContent className="p-4 sm:p-6 flex flex-col items-center text-center relative z-10">
                    <div className="text-3xl mb-3 group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300">
                      {social.icon}
                    </div>
                    <h3
                      className={cn(
                        "font-medium mb-1 dark:text-white group-hover:scale-110 transition-transform duration-300",
                        social.textColor
                      )}
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