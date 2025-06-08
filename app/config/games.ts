import { links } from "./links";

export const games = [
  {
    id: "genshin",
    name: "原神",
    tag: "开放世界",
    description: "探索提瓦特大陆的奇幻冒险",
    playTime: "320小时",
    playerId: "UID: 123456789",
    bgColor: "from-blue-400 to-purple-500",
    bgImage: "https://i.imgur.com/example1.jpg",
    platform: "PC & Mobile",
    lastPlayed: "2024-03-20",
    url: links.games.genshin.url
  },
  {
    id: "valorant",
    name: "Valorant",
    tag: "战术射击",
    description: "5v5战术竞技射击游戏",
    playTime: "156小时",
    playerId: "Alex#2077",
    bgColor: "from-red-400 to-pink-500",
    bgImage: "https://i.imgur.com/example2.jpg",
    platform: "PC",
    lastPlayed: "2024-03-21",
    url: links.games.valorant.url
  },
]; 