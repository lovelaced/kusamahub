"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Search, Star, ExternalLink, Gamepad2, Coins, Vote, Zap, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

interface DApp {
  id: string
  name: string
  tagline: string
  description: string
  category: "gaming" | "defi" | "social" | "gov" | "tools"
  status: "live" | "beta" | "alpha" | "soon"
  rating: number
  logo: string
  route: string
  previewGif?: string
  tags: string[]
  featured: boolean
}

const dapps: DApp[] = [
  {
    id: "pixel-pillage",
    name: "pixel pillage",
    tagline: "shared canvas chaos",
    description:
      "collaborative 128x128 pixel canvas. every pixel costs micro-ksm. time-lapse shows ascii rain history.",
    category: "social",
    status: "live",
    rating: 4.6,
    logo: "🎨",
    route: "/pixel-pillage",
    tags: ["collaborative", "canvas", "ascii", "art"],
    featured: true,
  },
  {
    id: "big-wicks",
    name: "big wicks",
    tagline: "candle auction jackpots",
    description:
      "bid on mystery jackpots with candle auctions. flame burns down randomly, last bidder wins. pure adrenaline gambling.",
    category: "gaming",
    status: "live",
    rating: 4.7,
    logo: "🕯️",
    route: "/big-wicks",
    tags: ["auction", "candle", "jackpot", "gambling"],
    featured: true,
  },
  {
    id: "bridge",
    name: "kusama bridge",
    tagline: "transfer ksm to asset hub",
    description:
      "simple and secure bridge for transferring ksm from kusama relay chain to asset hub. powered by xcm.",
    category: "defi",
    status: "live",
    rating: 4.8,
    logo: "🌀",
    route: "/bridge",
    tags: ["xcm", "bridge", "transfer", "asset-hub"],
    featured: true,
  },
  {
    id: "transmogrifier",
    name: "ksm transmogrifier",
    tagline: "evm wrapper magic",
    description: "stuff ksm into evm trenchcoat. crt monitor ui with green scanlines. portal animation on success.",
    category: "defi",
    status: "soon",
    rating: 0,
    logo: "🔄",
    route: "#",
    tags: ["evm", "wrapper", "crt", "retro"],
    featured: true,
  },
  {
    id: "loot-tombola",
    name: "loot tombola",
    tagline: "daily raffle bucket",
    description:
      "every tx you broadcast anywhere drops 1 ticket. draw at 00:00, jackpot rolls over. 10% house cut → dev fund.",
    category: "gaming",
    status: "soon",
    rating: 0,
    logo: "🎰",
    route: "#",
    tags: ["raffle", "daily", "jackpot", "gambling"],
    featured: true,
  },
  {
    id: "glitch-garden",
    name: "glitch garden",
    tagline: "idle grower",
    description: "water plant every 4h, fertilize optional. compounding yield table. lose progress if you slack.",
    category: "defi",
    status: "soon",
    rating: 0,
    logo: "🌱",
    route: "#",
    tags: ["idle", "farming", "yield", "compounding"],
    featured: true,
  },
  {
    id: "data-heist-v2",
    name: "data heist v2",
    tagline: "the anatomy map",
    description:
      "16×16 grid warfare. capture nodes, stake ksm, earn yield. 5% burn tax funds the drip. gang up on whales.",
    category: "gaming",
    status: "soon",
    rating: 0,
    logo: "🗺️",
    route: "#",
    tags: ["grid", "territory", "yield", "pvp"],
    featured: true,
  },
  {
    id: "futarchy-markets",
    name: "futarchy markets",
    tagline: "vote on values, bet on beliefs",
    description:
      "prediction markets for governance outcomes. bet ksm on referendum results, coretime sales, treasury burns.",
    category: "gov",
    status: "soon",
    rating: 0,
    logo: "🎯",
    route: "#",
    tags: ["futarchy", "prediction", "governance", "betting"],
    featured: false,
  },
  {
    id: "kusama-khaos",
    name: "kusama khaos",
    tagline: "validator roulette",
    description: "spin wheel of active validators. bet on slash events. chaos theory meets consensus mechanisms.",
    category: "gaming",
    status: "soon",
    rating: 0,
    logo: "🎡",
    route: "#",
    tags: ["validator", "roulette", "consensus", "chaos"],
    featured: false,
  },
  {
    id: "nft-graveyard",
    name: "nft graveyard",
    tagline: "where jpegs go to die",
    description: "burn worthless nfts for ksm rewards. ascii tombstones mark the fallen. memorial wall of shame.",
    category: "social",
    status: "soon",
    rating: 0,
    logo: "⚰️",
    route: "#",
    tags: ["nft", "burn", "graveyard", "ascii"],
    featured: false,
  },
  {
    id: "block-beats",
    name: "block beats",
    tagline: "on-chain music sequencer",
    description: "compose 8-bit tracks using block hashes as seeds. mint beats as nfts. collaborative albums.",
    category: "social",
    status: "soon",
    rating: 0,
    logo: "🎵",
    route: "#",
    tags: ["music", "8-bit", "sequencer", "collaborative"],
    featured: false,
  },
]

const categories = [
  { value: "all", label: "all chaos", icon: Zap },
  { value: "gaming", label: "gaming", icon: Gamepad2 },
  { value: "defi", label: "defi", icon: Coins },
  { value: "social", label: "social", icon: Star },
  { value: "gov", label: "governance", icon: Vote },
  { value: "tools", label: "tools", icon: Target },
]

const sortOptions = [
  { value: "hot", label: "hot" },
  { value: "new", label: "new" },
  { value: "weird", label: "weird" },
  { value: "rating", label: "rating" },
]

export default function Arcade() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("hot")
  const [filteredDapps, setFilteredDapps] = useState(dapps)
  const [hoveredDapp, setHoveredDapp] = useState<string | null>(null)

  // Filter and sort dapps
  useEffect(() => {
    let filtered = dapps

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (dapp) =>
          dapp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          dapp.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
          dapp.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    }

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter((dapp) => dapp.category === selectedCategory)
    }

    // Sort
    switch (sortBy) {
      case "hot":
        filtered = filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || b.rating - a.rating)
        break
      case "new":
        filtered = filtered.sort((a, b) => {
          const statusOrder = { soon: 0, alpha: 1, beta: 2, live: 3 }
          return statusOrder[a.status] - statusOrder[b.status]
        })
        break
      case "weird":
        filtered = filtered.sort(() => Math.random() - 0.5)
        break
      case "rating":
        filtered = filtered.sort((a, b) => b.rating - a.rating)
        break
    }

    setFilteredDapps(filtered)
  }, [searchQuery, selectedCategory, sortBy])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "live":
        return "border-toxic-slime text-toxic-slime"
      case "beta":
        return "border-aqua-glitch text-aqua-glitch"
      case "alpha":
        return "border-amber-crt text-amber-crt"
      case "soon":
        return "border-laser-berry text-laser-berry"
      default:
        return "border-soda-chrome text-soda-chrome"
    }
  }

  return (
    <div className="min-h-screen bg-midnight-void text-ghost-grey pt-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-orbitron font-black text-toxic-slime mb-4">dapp arcade</h1>
          <p className="text-soda-chrome font-vt323 text-lg">pick your poison, pixel warrior</p>
        </motion.div>

        {/* Filter Tray */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="bg-midnight-void border-2 border-soda-chrome/30 p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-soda-chrome" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="type to summon"
                  className="bg-midnight-void border-soda-chrome/50 text-ghost-grey font-vt323 pl-10"
                />
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => {
                  const Icon = category.icon
                  return (
                    <Button
                      key={category.value}
                      variant={selectedCategory === category.value ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category.value)}
                      className={`font-vt323 ${
                        selectedCategory === category.value
                          ? "bg-toxic-slime text-midnight-void"
                          : "border-laser-berry/50 text-laser-berry hover:bg-laser-berry/10 bg-transparent"
                      }`}
                    >
                      <Icon className="w-4 h-4 mr-1" />
                      {category.label}
                    </Button>
                  )
                })}
              </div>

              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-32 bg-midnight-void border-soda-chrome/50 text-ghost-grey font-vt323">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-midnight-void border-soda-chrome/50">
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value} className="font-vt323">
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </Card>
        </motion.div>

        {/* Dapp Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDapps.map((dapp, index) => (
            <motion.div
              key={dapp.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onHoverStart={() => setHoveredDapp(dapp.id)}
              onHoverEnd={() => setHoveredDapp(null)}
              className={`${dapp.featured ? "lg:col-span-1" : ""}`}
            >
              <Card className="bg-midnight-void/80 border-2 border-soda-chrome/30 hover:border-toxic-slime/50 transition-all duration-300 group h-full">
                {/* Winamp-style title bar */}
                <div className="flex items-center justify-between p-3 border-b border-soda-chrome/30">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-laser-berry rounded-full" />
                    <div className="w-2 h-2 bg-amber-crt rounded-full" />
                    <div className="w-2 h-2 bg-toxic-slime rounded-full" />
                  </div>
                  <span className="font-vt323 text-xs text-soda-chrome uppercase">{dapp.category}</span>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-0.5 bg-soda-chrome/50" />
                    <div className="w-3 h-0.5 bg-soda-chrome/50" />
                  </div>
                </div>

                <div className="p-6">
                  {/* Logo & Title */}
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="text-4xl">{dapp.logo}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-orbitron font-bold text-lg text-ghost-grey group-hover:text-toxic-slime transition-colors truncate">
                          {dapp.name}
                        </h3>
                        {dapp.featured && <Star className="w-4 h-4 text-toxic-slime fill-current" />}
                      </div>
                      <p className="text-soda-chrome text-sm font-vt323">{dapp.tagline}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-ghost-grey text-sm mb-4 line-clamp-3">{dapp.description}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {dapp.tags.slice(0, 3).map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="border-aqua-glitch/30 text-aqua-glitch font-vt323 text-xs"
                      >
                        {tag}
                      </Badge>
                    ))}
                    {dapp.tags.length > 3 && (
                      <Badge variant="outline" className="border-soda-chrome/30 text-soda-chrome font-vt323 text-xs">
                        +{dapp.tags.length - 3}
                      </Badge>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Badge variant="outline" className={`font-vt323 text-xs ${getStatusColor(dapp.status)}`}>
                        {dapp.status}
                      </Badge>
                      {dapp.rating > 0 && (
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 text-amber-crt fill-current" />
                          <span className="text-xs font-vt323 text-ghost-grey">{dapp.rating.toFixed(1)}</span>
                        </div>
                      )}
                    </div>

                    {dapp.route !== "#" ? (
                      <Link href={dapp.route}>
                        <Button
                          size="sm"
                          className="bg-toxic-slime text-midnight-void hover:bg-toxic-slime/90 font-vt323"
                        >
                          jack in
                          <ExternalLink className="w-3 h-3 ml-1" />
                        </Button>
                      </Link>
                    ) : (
                      <Button
                        size="sm"
                        disabled
                        className="bg-soda-chrome/20 text-soda-chrome font-vt323 cursor-not-allowed"
                      >
                        {dapp.status === "soon" ? "soon™" : "wip"}
                      </Button>
                    )}
                  </div>
                </div>

                {/* Hover Preview */}
                {hoveredDapp === dapp.id && dapp.previewGif && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 bg-midnight-void/90 flex items-center justify-center rounded"
                  >
                    <div className="text-center">
                      <div className="text-6xl mb-2">{dapp.logo}</div>
                      <p className="font-vt323 text-aqua-glitch">preview loading...</p>
                    </div>
                  </motion.div>
                )}
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredDapps.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
            <div className="text-6xl mb-4 opacity-20">¯\_(ツ)_/¯</div>
            <p className="text-soda-chrome font-vt323 text-lg mb-4">no dapps match your chaos criteria.</p>
            <Button
              onClick={() => {
                setSearchQuery("")
                setSelectedCategory("all")
                setSortBy("hot")
              }}
              variant="outline"
              className="border-aqua-glitch text-aqua-glitch hover:bg-aqua-glitch/10 font-vt323 bg-transparent"
            >
              reset filters
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
