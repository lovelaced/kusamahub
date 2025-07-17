"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { TrendingUp, Users, Target, Clock, Zap, Trophy, DollarSign, Vote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useSound } from "@/hooks/use-sound"

interface Market {
  id: string
  title: string
  description: string
  category: "governance" | "treasury" | "coretime" | "network"
  endDate: Date
  totalVolume: number
  yesPrice: number
  noPrice: number
  yesShares: number
  noShares: number
  resolved: boolean
  outcome?: boolean
}

const mockMarkets: Market[] = [
  {
    id: "ref-001",
    title: "Referendum #47 Will Pass",
    description: "Treasury proposal for 1000 KSM developer funding will be approved by governance",
    category: "governance",
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    totalVolume: 234.5,
    yesPrice: 0.73,
    noPrice: 0.27,
    yesShares: 1420,
    noShares: 530,
    resolved: false,
  },
  {
    id: "treasury-001",
    title: "Treasury Burn > 500 KSM This Month",
    description: "Monthly treasury burn will exceed 500 KSM due to low proposal activity",
    category: "treasury",
    endDate: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000),
    totalVolume: 156.8,
    yesPrice: 0.42,
    noPrice: 0.58,
    yesShares: 890,
    noShares: 1240,
    resolved: false,
  },
  {
    id: "coretime-001",
    title: "Coretime Sales Hit 10K KSM",
    description: "Next coretime auction will generate over 10,000 KSM in total sales",
    category: "coretime",
    endDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
    totalVolume: 89.2,
    yesPrice: 0.68,
    noPrice: 0.32,
    yesShares: 670,
    noShares: 315,
    resolved: false,
  },
  {
    id: "network-001",
    title: "Validator Count Drops Below 900",
    description: "Active validator set will fall below 900 due to economic conditions",
    category: "network",
    endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    totalVolume: 67.3,
    yesPrice: 0.35,
    noPrice: 0.65,
    yesShares: 445,
    noShares: 825,
    resolved: false,
  },
]

export default function FutarchyMarkets() {
  const { playSound } = useSound()
  const [markets, setMarkets] = useState<Market[]>(mockMarkets)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [betAmount, setBetAmount] = useState("")
  const [selectedMarket, setSelectedMarket] = useState<Market | null>(null)
  const [selectedSide, setSelectedSide] = useState<"yes" | "no" | null>(null)

  const categories = [
    { value: "all", label: "all markets", icon: Target },
    { value: "governance", label: "governance", icon: Vote },
    { value: "treasury", label: "treasury", icon: DollarSign },
    { value: "coretime", label: "coretime", icon: Clock },
    { value: "network", label: "network", icon: Zap },
  ]

  const filteredMarkets =
    selectedCategory === "all" ? markets : markets.filter((market) => market.category === selectedCategory)

  const handlePlaceBet = (market: Market, side: "yes" | "no") => {
    setSelectedMarket(market)
    setSelectedSide(side)
    playSound("select")
  }

  const confirmBet = () => {
    if (!selectedMarket || !selectedSide || !betAmount) return

    playSound("success")

    // Mock bet placement
    const amount = Number.parseFloat(betAmount)
    setMarkets((prev) =>
      prev.map((market) => {
        if (market.id === selectedMarket.id) {
          const newMarket = { ...market }
          newMarket.totalVolume += amount

          if (selectedSide === "yes") {
            newMarket.yesShares += amount / newMarket.yesPrice
          } else {
            newMarket.noShares += amount / newMarket.noPrice
          }

          // Recalculate prices based on new shares
          const totalShares = newMarket.yesShares + newMarket.noShares
          newMarket.yesPrice = newMarket.yesShares / totalShares
          newMarket.noPrice = newMarket.noShares / totalShares

          return newMarket
        }
        return market
      }),
    )

    setSelectedMarket(null)
    setSelectedSide(null)
    setBetAmount("")
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "governance":
        return "text-toxic-slime"
      case "treasury":
        return "text-amber-crt"
      case "coretime":
        return "text-laser-berry"
      case "network":
        return "text-aqua-glitch"
      default:
        return "text-ghost-grey"
    }
  }

  const formatTimeRemaining = (endDate: Date) => {
    const now = new Date()
    const diff = endDate.getTime() - now.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))

    if (days > 0) return `${days}d ${hours}h`
    return `${hours}h`
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
          <h1 className="text-4xl md:text-6xl font-orbitron font-black text-toxic-slime mb-4">futarchy markets</h1>
          <p className="text-soda-chrome font-vt323 text-lg mb-2">vote on values, bet on beliefs</p>
          <p className="text-ghost-grey font-vt323 text-sm">
            prediction markets for governance outcomes • bet ksm on referendum results • coretime sales • treasury burns
          </p>
        </motion.div>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-midnight-void/80 border-toxic-slime/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-soda-chrome font-vt323">active markets</p>
                  <p className="text-lg font-orbitron text-toxic-slime">{markets.length}</p>
                </div>
                <Target className="w-5 h-5 text-toxic-slime" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-midnight-void/80 border-amber-crt/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-soda-chrome font-vt323">total volume</p>
                  <p className="text-lg font-orbitron text-amber-crt">
                    {markets.reduce((sum, m) => sum + m.totalVolume, 0).toFixed(1)} KSM
                  </p>
                </div>
                <TrendingUp className="w-5 h-5 text-amber-crt" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-midnight-void/80 border-laser-berry/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-soda-chrome font-vt323">avg accuracy</p>
                  <p className="text-lg font-orbitron text-laser-berry">73.2%</p>
                </div>
                <Trophy className="w-5 h-5 text-laser-berry" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-midnight-void/80 border-aqua-glitch/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-soda-chrome font-vt323">participants</p>
                  <p className="text-lg font-orbitron text-aqua-glitch">1,247</p>
                </div>
                <Users className="w-5 h-5 text-aqua-glitch" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center mb-8">
          <div className="flex bg-midnight-void/50 border border-soda-chrome/30 rounded-lg p-1">
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <Button
                  key={category.value}
                  variant={selectedCategory === category.value ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.value)}
                  className={`font-vt323 ${
                    selectedCategory === category.value
                      ? "bg-toxic-slime text-midnight-void"
                      : "text-soda-chrome hover:text-toxic-slime"
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {category.label}
                </Button>
              )
            })}
          </div>
        </div>

        {/* Markets Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {filteredMarkets.map((market) => (
            <motion.div
              key={market.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="bg-midnight-void/80 border-soda-chrome/30 hover:border-toxic-slime/50 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-toxic-slime font-orbitron text-lg mb-2">{market.title}</CardTitle>
                      <p className="text-soda-chrome text-sm mb-3">{market.description}</p>
                      <div className="flex items-center gap-3">
                        <Badge
                          variant="outline"
                          className={`font-vt323 text-xs border-current ${getCategoryColor(market.category)}`}
                        >
                          {market.category}
                        </Badge>
                        <div className="flex items-center text-xs text-ghost-grey">
                          <Clock className="w-3 h-3 mr-1" />
                          {formatTimeRemaining(market.endDate)}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Price Display */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-toxic-slime/10 border border-toxic-slime/30 rounded">
                      <p className="text-toxic-slime font-orbitron text-xl">{(market.yesPrice * 100).toFixed(0)}¢</p>
                      <p className="text-xs text-soda-chrome font-vt323">YES</p>
                    </div>
                    <div className="text-center p-3 bg-laser-berry/10 border border-laser-berry/30 rounded">
                      <p className="text-laser-berry font-orbitron text-xl">{(market.noPrice * 100).toFixed(0)}¢</p>
                      <p className="text-xs text-soda-chrome font-vt323">NO</p>
                    </div>
                  </div>

                  {/* Volume & Shares */}
                  <div className="flex justify-between text-sm">
                    <span className="text-soda-chrome font-vt323">Volume: {market.totalVolume.toFixed(1)} KSM</span>
                    <span className="text-soda-chrome font-vt323">
                      Shares: {(market.yesShares + market.noShares).toFixed(0)}
                    </span>
                  </div>

                  {/* Betting Buttons */}
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      onClick={() => handlePlaceBet(market, "yes")}
                      className="bg-toxic-slime text-midnight-void hover:bg-toxic-slime/90 font-vt323"
                      size="sm"
                    >
                      BET YES
                    </Button>
                    <Button
                      onClick={() => handlePlaceBet(market, "no")}
                      className="bg-laser-berry text-midnight-void hover:bg-laser-berry/90 font-vt323"
                      size="sm"
                    >
                      BET NO
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Betting Modal */}
        {selectedMarket && selectedSide && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-midnight-void/80 flex items-center justify-center z-50 p-4"
            onClick={() => {
              setSelectedMarket(null)
              setSelectedSide(null)
            }}
          >
            <Card
              className="bg-midnight-void border-toxic-slime/50 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <CardHeader>
                <CardTitle className="text-toxic-slime font-orbitron">
                  Place Bet: {selectedSide.toUpperCase()}
                </CardTitle>
                <p className="text-soda-chrome text-sm">{selectedMarket.title}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm text-soda-chrome font-vt323 block mb-2">Bet Amount (KSM)</label>
                  <Input
                    type="number"
                    step="0.1"
                    min="0.1"
                    value={betAmount}
                    onChange={(e) => setBetAmount(e.target.value)}
                    placeholder="Enter amount"
                    className="bg-midnight-void border-soda-chrome/50 text-ghost-grey"
                  />
                </div>

                {betAmount && (
                  <div className="text-xs text-soda-chrome font-vt323 bg-midnight-void/50 p-3 rounded">
                    <p>
                      Price:{" "}
                      {selectedSide === "yes" ? selectedMarket.yesPrice.toFixed(2) : selectedMarket.noPrice.toFixed(2)}{" "}
                      KSM per share
                    </p>
                    <p>
                      Shares:{" "}
                      {(
                        Number.parseFloat(betAmount) /
                        (selectedSide === "yes" ? selectedMarket.yesPrice : selectedMarket.noPrice)
                      ).toFixed(2)}
                    </p>
                    <p>
                      Max Payout:{" "}
                      {Number.parseFloat(betAmount) /
                        (selectedSide === "yes" ? selectedMarket.yesPrice : selectedMarket.noPrice)}{" "}
                      KSM
                    </p>
                  </div>
                )}

                <div className="flex gap-2">
                  <Button
                    onClick={confirmBet}
                    disabled={!betAmount}
                    className="flex-1 bg-toxic-slime text-midnight-void hover:bg-toxic-slime/90 font-vt323"
                  >
                    CONFIRM BET
                  </Button>
                  <Button
                    onClick={() => {
                      setSelectedMarket(null)
                      setSelectedSide(null)
                      setBetAmount("")
                    }}
                    variant="outline"
                    className="border-soda-chrome text-soda-chrome hover:bg-soda-chrome/10 font-vt323 bg-transparent"
                  >
                    CANCEL
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* How It Works */}
        <Card className="bg-midnight-void/80 border-soda-chrome/30">
          <CardHeader>
            <CardTitle className="text-amber-crt font-orbitron">how futarchy works</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm font-vt323">
              <div>
                <h4 className="text-toxic-slime font-bold mb-2">prediction markets</h4>
                <ul className="space-y-1 text-ghost-grey">
                  <li>• bet on governance outcomes</li>
                  <li>• prices reflect probability</li>
                  <li>• market-driven consensus</li>
                  <li>• incentivized accuracy</li>
                </ul>
              </div>
              <div>
                <h4 className="text-aqua-glitch font-bold mb-2">betting mechanics</h4>
                <ul className="space-y-1 text-ghost-grey">
                  <li>• buy YES or NO shares</li>
                  <li>• prices adjust with volume</li>
                  <li>• win if outcome matches</li>
                  <li>• automated settlement</li>
                </ul>
              </div>
              <div>
                <h4 className="text-laser-berry font-bold mb-2">governance integration</h4>
                <ul className="space-y-1 text-ghost-grey">
                  <li>• track referendum outcomes</li>
                  <li>• treasury burn predictions</li>
                  <li>• coretime sales forecasts</li>
                  <li>• network health metrics</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
