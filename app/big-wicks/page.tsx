"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Flame, Coins, TrendingUp, Users, Zap, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useSoundContext } from "@/components/sound-provider"

interface Auction {
  id: string
  title: string
  description: string
  currentBid: number
  bidder: string
  jackpot: number
  timeRemaining: number
  totalTime: number
  participants: number
  status: "active" | "ending" | "ended"
  wickHeight: number
}

interface Bid {
  id: string
  bidder: string
  amount: number
  timestamp: number
}

export default function BigWicks() {
  const { playSound } = useSoundContext()
  const [currentAuction, setCurrentAuction] = useState<Auction>({
    id: "auction_1",
    title: "Mystery Jackpot #42",
    description: "Unknown prize pool. Candle burns randomly. Last bidder wins all.",
    currentBid: 12.5,
    bidder: "0xwhale420",
    jackpot: 156.78,
    timeRemaining: 45000, // milliseconds
    totalTime: 120000,
    participants: 23,
    status: "active",
    wickHeight: 75,
  })

  const [bidAmount, setBidAmount] = useState("")
  const [recentBids, setRecentBids] = useState<Bid[]>([
    { id: "1", bidder: "0xwhale420", amount: 12.5, timestamp: Date.now() - 30000 },
    { id: "2", bidder: "0xdegen88", amount: 11.2, timestamp: Date.now() - 60000 },
    { id: "3", bidder: "0xlucky77", amount: 10.8, timestamp: Date.now() - 90000 },
  ])

  const [isFlameFlickering, setIsFlameFlickering] = useState(false)
  const [showBidSuccess, setShowBidSuccess] = useState(false)
  const [userBalance] = useState(45.67)

  // Simulate candle burning down
  useEffect(() => {
    if (currentAuction.status !== "active") return

    const interval = setInterval(() => {
      setCurrentAuction((prev) => {
        const newTimeRemaining = Math.max(0, prev.timeRemaining - 1000)
        const newWickHeight = Math.max(0, (newTimeRemaining / prev.totalTime) * 100)

        // Random chance for candle to end early (candle auction mechanic)
        const shouldEndEarly = Math.random() < 0.02 && newTimeRemaining < prev.totalTime * 0.8

        if (newTimeRemaining <= 0 || shouldEndEarly) {
          playSound("success")
          return {
            ...prev,
            timeRemaining: 0,
            wickHeight: 0,
            status: "ended",
          }
        }

        // Flicker effect when time is low
        if (newTimeRemaining < 15000) {
          setIsFlameFlickering(true)
        }

        return {
          ...prev,
          timeRemaining: newTimeRemaining,
          wickHeight: newWickHeight,
        }
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [currentAuction.status, playSound])

  const placeBid = () => {
    const bid = Number.parseFloat(bidAmount)
    if (!bid || bid <= currentAuction.currentBid || bid > userBalance) {
      playSound("error")
      return
    }

    playSound("click")

    // Add bid to recent bids
    const newBid: Bid = {
      id: Date.now().toString(),
      bidder: "You",
      amount: bid,
      timestamp: Date.now(),
    }

    setRecentBids((prev) => [newBid, ...prev.slice(0, 4)])

    // Update auction
    setCurrentAuction((prev) => ({
      ...prev,
      currentBid: bid,
      bidder: "You",
      participants: prev.participants + 1,
      // Extend time slightly (candle auction mechanic)
      timeRemaining: Math.min(prev.timeRemaining + 5000, prev.totalTime),
    }))

    setBidAmount("")
    setShowBidSuccess(true)
    setTimeout(() => setShowBidSuccess(false), 2000)
  }

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000)
    const minutes = Math.floor(seconds / 60)
    return `${minutes}:${(seconds % 60).toString().padStart(2, "0")}`
  }

  const formatAddress = (address: string) => {
    if (address === "You") return address
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "border-toxic-slime text-toxic-slime"
      case "ending":
        return "border-amber-crt text-amber-crt"
      case "ended":
        return "border-laser-berry text-laser-berry"
      default:
        return "border-soda-chrome text-soda-chrome"
    }
  }

  return (
    <div className="min-h-screen bg-midnight-void text-ghost-grey pt-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-orbitron font-black text-toxic-slime mb-4">big wicks</h1>
          <p className="text-soda-chrome font-vt323 text-lg">candle auction jackpots // flame dies, winner cries</p>
        </motion.div>

        {/* Winner Announcement */}
        <AnimatePresence>
          {currentAuction.status === "ended" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="mb-8"
            >
              <Card className="bg-toxic-slime/10 border-2 border-toxic-slime/50">
                <CardContent className="p-8 text-center">
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 0.5, repeat: 3 }}
                    className="text-6xl mb-4"
                  >
                    🏆
                  </motion.div>
                  <h2 className="text-3xl font-orbitron font-bold text-toxic-slime mb-2">Candle Extinguished!</h2>
                  <p className="text-xl font-vt323 text-ghost-grey mb-4">
                    Winner: {formatAddress(currentAuction.bidder)}
                  </p>
                  <p className="text-lg font-vt323 text-laser-berry">Prize: {currentAuction.jackpot.toFixed(2)} KSM</p>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Auction */}
          <div className="lg:col-span-2">
            <Card className="bg-midnight-void/80 border-2 border-toxic-slime/50 mb-6">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="text-toxic-slime font-orbitron">{currentAuction.title}</span>
                  <Badge variant="outline" className={`font-vt323 ${getStatusColor(currentAuction.status)}`}>
                    {currentAuction.status}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-soda-chrome font-vt323 mb-6">{currentAuction.description}</p>

                {/* Candle Visualization */}
                <div className="flex justify-center mb-8">
                  <div className="relative">
                    {/* Candle Body */}
                    <div className="w-16 bg-amber-crt/30 border-2 border-amber-crt/50 rounded-b-lg relative overflow-hidden">
                      <div
                        className="bg-amber-crt/60 transition-all duration-1000 ease-out"
                        style={{ height: `${Math.max(currentAuction.wickHeight, 10)}px` }}
                      />
                      {/* Wax drips */}
                      <div className="absolute top-0 left-1 w-1 h-4 bg-amber-crt/40 rounded-full" />
                      <div className="absolute top-2 right-1 w-1 h-6 bg-amber-crt/40 rounded-full" />
                    </div>

                    {/* Flame */}
                    <motion.div
                      className="absolute -top-8 left-1/2 -translate-x-1/2"
                      animate={
                        isFlameFlickering
                          ? {
                              scale: [1, 1.2, 0.8, 1.1, 0.9, 1],
                              rotate: [-2, 2, -1, 1, 0],
                            }
                          : { scale: [1, 1.1, 1], rotate: [-1, 1, -1] }
                      }
                      transition={{
                        duration: isFlameFlickering ? 0.3 : 2,
                        repeat: Number.POSITIVE_INFINITY,
                      }}
                    >
                      <Flame
                        className={`w-8 h-8 ${
                          currentAuction.status === "ended"
                            ? "text-soda-chrome/30"
                            : isFlameFlickering
                              ? "text-laser-berry"
                              : "text-amber-crt"
                        }`}
                        fill="currentColor"
                      />
                    </motion.div>

                    {/* Smoke effect when ended */}
                    {currentAuction.status === "ended" && (
                      <motion.div
                        initial={{ opacity: 0, y: 0 }}
                        animate={{ opacity: [0, 0.6, 0], y: -20 }}
                        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                        className="absolute -top-12 left-1/2 -translate-x-1/2 text-soda-chrome/50"
                      >
                        💨
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Auction Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-orbitron font-bold text-toxic-slime">
                      {currentAuction.jackpot.toFixed(2)}
                    </div>
                    <div className="text-sm font-vt323 text-soda-chrome">jackpot (KSM)</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-orbitron font-bold text-laser-berry">
                      {currentAuction.currentBid.toFixed(1)}
                    </div>
                    <div className="text-sm font-vt323 text-soda-chrome">current bid</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-orbitron font-bold text-aqua-glitch">
                      {formatTime(currentAuction.timeRemaining)}
                    </div>
                    <div className="text-sm font-vt323 text-soda-chrome">time left</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-orbitron font-bold text-amber-crt">{currentAuction.participants}</div>
                    <div className="text-sm font-vt323 text-soda-chrome">bidders</div>
                  </div>
                </div>

                {/* Time Progress */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm font-vt323 text-soda-chrome mb-2">
                    <span>candle burn progress</span>
                    <span>{((1 - currentAuction.timeRemaining / currentAuction.totalTime) * 100).toFixed(0)}%</span>
                  </div>
                  <Progress
                    value={(1 - currentAuction.timeRemaining / currentAuction.totalTime) * 100}
                    className="h-3"
                  />
                </div>

                {/* Current Leader */}
                <div className="bg-midnight-void/50 border border-soda-chrome/30 rounded p-4 mb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-vt323 text-soda-chrome">current leader</div>
                      <div className="text-lg font-orbitron text-toxic-slime">
                        {formatAddress(currentAuction.bidder)}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-vt323 text-soda-chrome">winning bid</div>
                      <div className="text-lg font-orbitron text-laser-berry">
                        {currentAuction.currentBid.toFixed(2)} KSM
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bid Input */}
                {currentAuction.status === "active" && (
                  <div className="space-y-4">
                    <div className="flex space-x-3">
                      <div className="flex-1">
                        <Input
                          type="number"
                          value={bidAmount}
                          onChange={(e) => setBidAmount(e.target.value)}
                          placeholder={`Min: ${(currentAuction.currentBid + 0.1).toFixed(1)} KSM`}
                          className="bg-midnight-void border-soda-chrome/50 text-ghost-grey font-vt323"
                        />
                      </div>
                      <Button
                        onClick={placeBid}
                        disabled={!bidAmount || Number.parseFloat(bidAmount) <= currentAuction.currentBid}
                        className="bg-toxic-slime text-midnight-void hover:bg-toxic-slime/90 font-vt323 font-bold"
                      >
                        <Zap className="w-4 h-4 mr-2" />
                        bid
                      </Button>
                    </div>
                    <div className="flex justify-between text-xs font-vt323 text-soda-chrome">
                      <span>balance: {userBalance.toFixed(2)} KSM</span>
                      <span>min bid: {(currentAuction.currentBid + 0.1).toFixed(1)} KSM</span>
                    </div>
                  </div>
                )}

                {/* Success Message */}
                <AnimatePresence>
                  {showBidSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-4 p-3 bg-toxic-slime/10 border border-toxic-slime/30 rounded"
                    >
                      <p className="text-toxic-slime font-vt323 text-sm">bid placed! candle wick extended slightly.</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Bids */}
            <Card className="bg-midnight-void/80 border-2 border-aqua-glitch/50">
              <CardHeader>
                <CardTitle className="text-aqua-glitch font-orbitron flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  recent bids
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentBids.map((bid, index) => (
                    <motion.div
                      key={bid.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-3 border border-aqua-glitch/20 rounded"
                    >
                      <div>
                        <div className="font-vt323 text-aqua-glitch text-sm">{formatAddress(bid.bidder)}</div>
                        <div className="font-vt323 text-soda-chrome text-xs">
                          {new Date(bid.timestamp).toLocaleTimeString()}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-vt323 text-toxic-slime text-sm">{bid.amount.toFixed(2)} KSM</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* How It Works */}
            <Card className="bg-midnight-void/80 border-2 border-amber-crt/50">
              <CardHeader>
                <CardTitle className="text-amber-crt font-orbitron">candle auction rules</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm font-vt323 text-soda-chrome">
                  <div className="flex items-start space-x-2">
                    <AlertTriangle className="w-4 h-4 text-amber-crt mt-0.5 flex-shrink-0" />
                    <span>candle burns down randomly - no one knows when it ends</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Flame className="w-4 h-4 text-laser-berry mt-0.5 flex-shrink-0" />
                    <span>each bid extends the wick slightly but unpredictably</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Coins className="w-4 h-4 text-toxic-slime mt-0.5 flex-shrink-0" />
                    <span>last bidder when flame dies wins entire jackpot</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Users className="w-4 h-4 text-aqua-glitch mt-0.5 flex-shrink-0" />
                    <span>losing bids contribute to next auction's prize pool</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stats */}
            <Card className="bg-midnight-void/80 border-2 border-laser-berry/50">
              <CardHeader>
                <CardTitle className="text-laser-berry font-orbitron">auction stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-soda-chrome font-vt323 text-sm">total volume today</span>
                    <span className="text-ghost-grey font-vt323 text-sm">1,247.89 KSM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-soda-chrome font-vt323 text-sm">auctions completed</span>
                    <span className="text-ghost-grey font-vt323 text-sm">23</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-soda-chrome font-vt323 text-sm">avg auction time</span>
                    <span className="text-ghost-grey font-vt323 text-sm">1m 34s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-soda-chrome font-vt323 text-sm">biggest jackpot</span>
                    <span className="text-ghost-grey font-vt323 text-sm">892.15 KSM</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
