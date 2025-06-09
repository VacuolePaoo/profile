type IconName = "gamepad-2" | "music-2" | "book-open" | "pen-line";

interface Interest {
  title: string;
  description: string;
  icon: IconName;
  url: string;
  style: {
    gradient: {
      from: string;
      to: string;
      darkFrom: string;
      darkTo: string;
    };
    border: {
      default: string;
      dark: string;
    };
    text: {
      default: string;
      dark: string;
      hover: string;
      darkHover: string;
    };
  };
}

interface SocialLink {
  url: string;
  text: {
    default: string;
    hover: string;
  };
}

interface Game {
  title: string;
  description: string;
  coverImage: string;
  url: string;
  platform: string;
  gameId?: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  tags: string[];
  url: string;
  github?: string;
  status: "进行中" | "已完成" | "规划中";
}

interface Links {
  blog: SocialLink;
  github: SocialLink;
  bilibili: SocialLink;
  valorant: SocialLink;
  games: Game[];
  projects: Project[];
  music: {
    playlists: Array<{
      title: string;
      description: string;
      coverImage: string;
      url: string;
      platform: {
        name: string;
        icon: string;
        url: string;
        profileUrl: string;
      };
      style: {
        gradient: {
          from: string;
          to: string;
          darkFrom: string;
          darkTo: string;
        };
        border: {
          default: string;
          dark: string;
        };
      };
    }>;
    songs: Array<{
      title: string;
      artist: string;
      coverImage: string;
      url: string;
      platform: string;
    }>;
  };
  interests: Interest[];
}

export const links: Links = {
  blog: {
    url: "https://blog.vacu.top",
    text: {
      default: "查看博客",
      hover: "查看博客"
    }
  },
  github: {
    url: "https://github.com/vacuitydev",
    text: {
      default: "查看GitHub",
      hover: "查看GitHub"
    }
  },
  bilibili: {
    url: "https://space.bilibili.com/518590350",
    text: {
      default: "查看B站",
      hover: "查看B站"
    }
  },
  valorant: {
    url: "https://playvalorant.com",
    text: {
      default: "查看游戏",
      hover: "查看游戏"
    }
  },
  games: [
    {
      title: "Baldur's Gate 3",
      description: "一款基于龙与地下城规则的回合制RPG游戏",
      coverImage: "/images/bg3.jpg",
      url: "https://store.steampowered.com/app/1086940/Baldurs_Gate_3/",
      platform: "Steam",
      gameId: "vacu#1234"
    },
    {
      title: "Palworld",
      description: "一款开放世界生存建造游戏",
      coverImage: "/images/palworld.jpg",
      url: "https://store.steampowered.com/app/1623730/Palworld/",
      platform: "Steam",
      gameId: "vacu#5678"
    }
  ],
  projects: [
    {
      id: "magic-ui",
      title: "Magic UI",
      description: "一个现代化的 React UI 组件库，专注于动画和交互效果。使用 Tailwind CSS 和 Framer Motion 构建。",
      coverImage: "/images/projects/magic-ui.jpg",
      tags: ["React", "TypeScript", "Tailwind CSS"],
      url: "https://magic-ui.vacu.top",
      github: "https://github.com/vacuitydev/magic-ui",
      status: "进行中"
    },
    {
      id: "dev-blog",
      title: "开发者博客",
      description: "使用 Next.js 和 MDX 构建的个人技术博客，支持暗色模式和全文搜索。",
      coverImage: "/images/projects/blog.jpg",
      tags: ["Next.js", "MDX", "Vercel"],
      url: "https://blog.vacu.top",
      github: "https://github.com/vacuitydev/blog",
      status: "已完成"
    },
    {
      id: "code-snippets",
      title: "代码片段管理器",
      description: "一个帮助开发者管理和分享代码片段的工具，支持语法高亮和实时预览。",
      coverImage: "/images/projects/snippets.jpg",
      tags: ["Vue", "Express", "MongoDB"],
      url: "https://snippets.vacu.top",
      github: "https://github.com/vacuitydev/snippets",
      status: "已完成"
    },
    {
      id: "ai-chat",
      title: "AI 聊天助手",
      description: "基于 OpenAI API 构建的聊天应用，支持多角色对话和上下文记忆。",
      coverImage: "/images/projects/ai-chat.jpg",
      tags: ["React", "Node.js", "OpenAI"],
      url: "https://chat.vacu.top",
      github: "https://github.com/vacuitydev/ai-chat",
      status: "规划中"
    }
  ],
  music: {
    playlists: [
      {
        title: "我喜欢的音乐",
        description: "这里收录了我最喜欢的一些音乐，涵盖了各种风格和年代。从轻快的流行到深沉的古典，从怀旧的经典到现代的电子，都能找到属于自己的一片天地。",
        coverImage: "/images/playlist-1.jpg",
        url: "https://music.163.com/#/playlist?id=xxxxxx",
        platform: {
          name: "网易云音乐",
          icon: "music",
          url: "https://music.163.com/user/home?id=xxxxxx",
          profileUrl: "https://music.163.com/user/home?id=xxxxxx"
        },
        style: {
          gradient: {
            from: "red-50/50",
            to: "orange-50/50",
            darkFrom: "red-900/10",
            darkTo: "orange-900/10"
          },
          border: {
            default: "red-200",
            dark: "red-800/30"
          }
        }
      },
      {
        title: "编程时光",
        description: "写代码时的最佳伴奏，让思维更加流畅。包含了一些轻音乐、电子音乐和后摇，帮助保持专注和创造力。",
        coverImage: "/images/playlist-2.jpg",
        url: "https://music.163.com/#/playlist?id=yyyyyy",
        platform: {
          name: "网易云音乐",
          icon: "music",
          url: "https://music.163.com/user/home?id=xxxxxx",
          profileUrl: "https://music.163.com/user/home?id=xxxxxx"
        },
        style: {
          gradient: {
            from: "blue-50/50",
            to: "indigo-50/50",
            darkFrom: "blue-900/10",
            darkTo: "indigo-900/10"
          },
          border: {
            default: "blue-200",
            dark: "blue-800/30"
          }
        }
      }
    ],
    songs: [
      {
        title: "Time",
        artist: "Hans Zimmer",
        coverImage: "/images/time.jpg",
        url: "https://music.163.com/song?id=xxxxxx",
        platform: "网易云音乐"
      },
      {
        title: "Experience",
        artist: "Ludovico Einaudi",
        coverImage: "/images/experience.jpg",
        url: "https://music.163.com/song?id=yyyyyy",
        platform: "网易云音乐"
      },
      {
        title: "River Flows in You",
        artist: "Yiruma",
        coverImage: "/images/river.jpg",
        url: "https://music.163.com/song?id=zzzzzz",
        platform: "网易云音乐"
      }
    ]
  },
  interests: [
    {
      title: "游戏",
      description: "热爱游戏，尤其是开放世界和独立游戏。最近在玩：Baldur's Gate 3、Palworld、空洞骑士。",
      icon: "gamepad-2",
      url: "https://store.steampowered.com/app/1086940/Baldurs_Gate_3/",
      style: {
        gradient: {
          from: "slate-50",
          to: "zinc-100",
          darkFrom: "slate-900/50",
          darkTo: "zinc-900/50"
        },
        border: {
          default: "slate-200",
          dark: "slate-700"
        },
        text: {
          default: "slate-600",
          dark: "slate-300",
          hover: "slate-900",
          darkHover: "white"
        }
      }
    },
    {
      title: "音乐",
      description: "喜欢听各种类型的音乐，从古典到电子。最爱的音乐人：Hans Zimmer、Ludovico Einaudi。",
      icon: "music-2",
      url: "https://music.163.com/user/home?id=xxxxxx",
      style: {
        gradient: {
          from: "stone-50",
          to: "neutral-100",
          darkFrom: "stone-900/50",
          darkTo: "neutral-900/50"
        },
        border: {
          default: "stone-200",
          dark: "stone-700"
        },
        text: {
          default: "stone-600",
          dark: "stone-300",
          hover: "stone-900",
          darkHover: "white"
        }
      }
    },
    {
      title: "阅读",
      description: "热爱科幻和哲学类书籍。最近在读：《三体》、《未来简史》、《人类简史》。",
      icon: "book-open",
      url: "https://book.douban.com/subject/2567698/",
      style: {
        gradient: {
          from: "zinc-50",
          to: "neutral-100",
          darkFrom: "zinc-900/50",
          darkTo: "neutral-900/50"
        },
        border: {
          default: "zinc-200",
          dark: "zinc-700"
        },
        text: {
          default: "zinc-600",
          dark: "zinc-300",
          hover: "zinc-900",
          darkHover: "white"
        }
      }
    },
    {
      title: "写作",
      description: "喜欢写一些技术博客和随笔。主要关注前端开发、UI设计和用户体验等话题。",
      icon: "pen-line",
      url: "https://blog.vacu.top",
      style: {
        gradient: {
          from: "neutral-50",
          to: "stone-100",
          darkFrom: "neutral-900/50",
          darkTo: "stone-900/50"
        },
        border: {
          default: "neutral-200",
          dark: "neutral-700"
        },
        text: {
          default: "neutral-600",
          dark: "neutral-300",
          hover: "neutral-900",
          darkHover: "white"
        }
      }
    }
  ]
}; 