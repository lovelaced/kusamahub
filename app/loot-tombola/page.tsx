"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Dice1,
  Dice2,
  Dice3,
  Dice4,
  Dice5,
  Dice6,
  Trophy,
  Clock,
  Coins,
  TrendingUp,
  AlertTriangle,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { useSoundContext } from "@/components/sound-provider"

interface TicketDrop {
  id: string
  address: string
  timestamp: number
  txHash: string
}

interface RaffleStats {
  currentPot: number
  totalTickets: number
  userTickets: number
  devFund: number
  upkeepFund: number
  lastWinners: {
    whale: { address: string; amount: number } | null
    dolphins: Array<{ address: string; amount: number }>
    minnows: Array<{ address: string; amount: number }>
  }
  drawsUntilNext: number
  unclaimedPot: number
  unclaimedExpiry: number | null
  ticketPrice: number
}

interface DiceState {
  value: number
  isRolling: boolean
  isSettled: boolean
  settleTime: number
}

interface RollResult {
  sum: number
  multiplier: number
  description: string
  isGoldenStub: boolean
}

const diceIcons = [Dice1, Dice2, Dice3, Dice4, Dice5, Dice6]

const getPayoffTable = (sum: number): RollResult => {
  switch (sum) {
    case 2:
      return { sum, multiplier: 6, description: "hiss, instant jackpot odds.", isGoldenStub: false }
    case 3:
    case 4:
      return { sum, multiplier: 3, description: "lucky-ish, triple threat.", isGoldenStub: false }
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
      return { sum, multiplier: 1, description: "meh, standard fare.", isGoldenStub: false }
    case 10:
    case 11:
      return { sum, multiplier: 2, description: "solid double dip.", isGoldenStub: false }
    case 12:
      return { sum, multiplier: 5, description: "critical chaos!", isGoldenStub: true }
    default:
      return { sum, multiplier: 1, description: "meh, standard fare.", isGoldenStub: false }
  }
}

export default function LootTombola() {
  const { playSound } = useSoundContext()
  const rollStartTimeRef = useRef<number>(0)

  const [stats, setStats] = useState<RaffleStats>({
    currentPot: 42.69,
    totalTickets: 1337,
    userTickets: 13,
    devFund: 156.78,
    upkeepFund: 89.34,
    ticketPrice: 0.002,
    lastWinners: {
      whale: { address: "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY", amount: 19.21 },
      dolphins: [
        { address: "5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty", amount: 6.4 },
        { address: "5DAAnrj7VHTznn2AWBemMuyBwZWs6FNFjdyVXUeYum3PTXFy", amount: 6.4 },
      ],
      minnows: [
        { address: "5CiPPseXPECbkjWCa6MnjNokrgYjMqmKndv2rSnekmSK2DjL", amount: 1.28 },
        { address: "5GNJqTPyNqANBkUVMN1LPPrxXnFouWXoe2wNSmmEoLctxiZY", amount: 1.28 },
        { address: "5HpG9w8EBLe5XCrbczpwq5TSXvedjrBGCwqxK1iQ7qUsSWFc", amount: 1.28 },
        { address: "5Ff3iXP75ruzrQtWiAiGpvXV9y8FffUAYJ1x9rKsy4uqVyfx", amount: 1.28 },
        { address: "5EKurhp9c9kLEWw2AXp6d8NU94L6566H8AgfSBzNWGgDqSuL", amount: 1.28 },
      ],
    },
    drawsUntilNext: 1,
    unclaimedPot: 0,
    unclaimedExpiry: null,
  })

  const [timeUntilDraw, setTimeUntilDraw] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  const [timeUntilExpiry, setTimeUntilExpiry] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  const [isRolling, setIsRolling] = useState(false)
  const [diceStates, setDiceStates] = useState<DiceState[]>([
    { value: 1, isRolling: false, isSettled: true, settleTime: 0 },
    { value: 2, isRolling: false, isSettled: true, settleTime: 0 },
  ])

  const [lastRollResult, setLastRollResult] = useState<RollResult | null>(null)
  const [hasGoldenStub, setHasGoldenStub] = useState(false)
  const [isProcessingTx, setIsProcessingTx] = useState(false)
  const [showJackpot, setShowJackpot] = useState(false)

  const [recentDrops, setRecentDrops] = useState<TicketDrop[]>([
    {
      id: "1",
      address: "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY",
      timestamp: Date.now() - 30000,
      txHash: "0x1234...5678",
    },
    {
      id: "2",
      address: "5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty",
      timestamp: Date.now() - 120000,
      txHash: "0xabcd...efgh",
    },
    {
      id: "3",
      address: "5DAAnrj7VHTznn2AWBemMuyBwZWs6FNFjdyVXUeYum3PTXFy",
      timestamp: Date.now() - 300000,
      txHash: "0x9876...5432",
    },
  ])

  // Calculate time until next draw (00:00 UTC)
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date()
      const tomorrow = new Date(now)
      tomorrow.setUTCDate(tomorrow.getUTCDate() + 1)
      tomorrow.setUTCHours(0, 0, 0, 0)

      const diff = tomorrow.getTime() - now.getTime()
      const hours = Math.floor(diff / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)

      setTimeUntilDraw({ hours, minutes, seconds })

      // Update unclaimed expiry countdown
      if (stats.unclaimedExpiry) {
        const expiryDiff = stats.unclaimedExpiry - now.getTime()
        if (expiryDiff > 0) {
          const expiryHours = Math.floor(expiryDiff / (1000 * 60 * 60))
          const expiryMinutes = Math.floor((expiryDiff % (1000 * 60 * 60)) / (1000 * 60))
          const expirySeconds = Math.floor((expiryDiff % (1000 * 60)) / 1000)
          setTimeUntilExpiry({ hours: expiryHours, minutes: expiryMinutes, seconds: expirySeconds })
        } else {
          // Pot has expired, roll over to current pot
          setStats((prev) => ({
            ...prev,
            currentPot: prev.currentPot + prev.unclaimedPot,
            unclaimedPot: 0,
            unclaimedExpiry: null,
          }))
        }
      }
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)
    return () => clearInterval(interval)
  }, [stats.unclaimedExpiry])

  // Simulate ticket drops
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.3) {
        const newDrop: TicketDrop = {
          id: Date.now().toString(),
          address: `5${Math.random().toString(36).substring(2, 15)}...${Math.random().toString(36).substring(2, 6)}`,
          timestamp: Date.now(),
          txHash: `0x${Math.random().toString(16).substring(2, 6)}...${Math.random().toString(16).substring(2, 6)}`,
        }

        setRecentDrops((prev) => [newDrop, ...prev.slice(0, 4)])
        setStats((prev) => ({ ...prev, totalTickets: prev.totalTickets + 1 }))
        playSound("success")
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [playSound])

  // Simulate unclaimed pot (for demo)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (Math.random() < 0.3) {
        setStats((prev) => ({
          ...prev,
          unclaimedPot: 67.89,
          unclaimedExpiry: Date.now() + 24 * 60 * 60 * 1000, // 24 hours from now
        }))
      }
    }, 10000)

    return () => clearTimeout(timer)
  }, [])

  const rollAndMint = async () => {
    if (isRolling || isProcessingTx) return

    setIsProcessingTx(true)
    setIsRolling(true)
    playSound("dice")
    rollStartTimeRef.current = Date.now()

    // Define when each die will settle (staggered times)
    const settleTimes = [1200, 1800] // milliseconds for 2 dice
    const finalValues = [Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1]

    // Start both dice rolling
    setDiceStates([
      { value: Math.floor(Math.random() * 6) + 1, isRolling: true, isSettled: false, settleTime: settleTimes[0] },
      { value: Math.floor(Math.random() * 6) + 1, isRolling: true, isSettled: false, settleTime: settleTimes[1] },
    ])

    // Set up individual settle timers for each die
    settleTimes.forEach((settleTime, index) => {
      setTimeout(() => {
        setDiceStates((prev) =>
          prev.map((dice, i) =>
            i === index ? { ...dice, isRolling: false, isSettled: true, value: finalValues[index] } : dice,
          ),
        )
      }, settleTime)
    })

    // Continue rolling unsettled dice
    const rollInterval = setInterval(() => {
      const currentTime = Date.now()
      const elapsed = currentTime - rollStartTimeRef.current

      setDiceStates((prev) =>
        prev.map((dice, index) => {
          if (elapsed < dice.settleTime && dice.isRolling) {
            return { ...dice, value: Math.floor(Math.random() * 6) + 1 }
          }
          return dice
        }),
      )
    }, 100)

    // Clean up after all dice have settled
    setTimeout(
      () => {
        clearInterval(rollInterval)
        setIsRolling(false)

        const sum = finalValues[0] + finalValues[1]
        const result = getPayoffTable(sum)
        setLastRollResult(result)

        // Handle golden stub
        if (result.isGoldenStub) {
          setHasGoldenStub(true)
          playSound("success")
          setShowJackpot(true)
          setTimeout(() => setShowJackpot(false), 3000)
        }

        // Update user tickets based on multiplier
        setStats((prev) => ({
          ...prev,
          userTickets: prev.userTickets + result.multiplier,
          totalTickets: prev.totalTickets + result.multiplier,
        }))

        // Simulate blockchain transaction completion
        setTimeout(() => {
          setIsProcessingTx(false)
          playSound("success")
        }, 1500)
      },
      Math.max(...settleTimes) + 200,
    )
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const formatTime = (timestamp: number) => {
    const diff = Date.now() - timestamp
    const minutes = Math.floor(diff / 60000)
    if (minutes < 1) return "just now"
    if (minutes < 60) return `${minutes}m ago`
    const hours = Math.floor(minutes / 60)
    return `${hours}h ago`
  }

  const winProbability = stats.totalTickets > 0 ? (stats.userTickets / stats.totalTickets) * 100 : 0

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
          <h1 className="text-4xl md:text-6xl font-orbitron font-black text-toxic-slime mb-4">loot tombola</h1>
          <p className="text-soda-chrome font-vt323 text-lg">roll dem bones × mint tickets × chase the pot</p>
        </motion.div>

        {/* Jackpot Overlay */}
        <AnimatePresence>
          {showJackpot && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-midnight-void/90 flex items-center justify-center z-50"
            >
              <motion.div initial={{ scale: 0.5 }} animate={{ scale: 1 }} exit={{ scale: 0.5 }} className="text-center">
                <Trophy className="w-32 h-32 text-toxic-slime mx-auto mb-4 animate-bounce" />
                <h2 className="text-6xl font-orbitron font-black text-toxic-slime mb-2">GOLDEN STUB!</h2>
                <p className="text-2xl font-vt323 text-ghost-grey">free re-roll tomorrow + 5x tickets</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Unclaimed Pot Warning */}
        {stats.unclaimedPot > 0 && stats.unclaimedExpiry && (
          <Card className="mb-6 bg-amber-crt/10 border-2 border-amber-crt/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-6 h-6 text-amber-crt animate-pulse" />
                <div className="flex-1">
                  <div className="font-orbitron font-bold text-amber-crt">
                    Unclaimed Prize: {stats.unclaimedPot.toFixed(2)} KSM
                  </div>
                  <div className="font-vt323 text-soda-chrome text-sm">
                    Expires in {String(timeUntilExpiry.hours).padStart(2, "0")}:
                    {String(timeUntilExpiry.minutes).padStart(2, "0")}:
                    {String(timeUntilExpiry.seconds).padStart(2, "0")} - then rolls over to current pot
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Main Stats */}
          <Card className="lg:col-span-2 bg-midnight-void border-2 border-toxic-slime/30">
            <CardHeader>
              <CardTitle className="font-orbitron text-toxic-slime flex items-center gap-2">
                <Coins className="w-6 h-6" />
                current pot
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-6">
                <div className="text-6xl font-orbitron font-black text-toxic-slime mb-2">
                  {stats.currentPot.toFixed(2)}
                </div>
                <div className="text-xl font-vt323 text-soda-chrome">KSM</div>
                {stats.unclaimedPot > 0 && (
                  <div className="text-sm font-vt323 text-amber-crt mt-2">
                    +{stats.unclaimedPot.toFixed(2)} KSM pending rollover
                  </div>
                )}
                <div className="text-xs font-vt323 text-soda-chrome mt-2">
                  base ticket price: {stats.ticketPrice} KSM + gas
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-orbitron font-bold text-aqua-glitch">
                    {stats.totalTickets.toLocaleString()}
                  </div>
                  <div className="text-sm font-vt323 text-soda-chrome">total tickets</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-orbitron font-bold text-laser-berry">{stats.userTickets}</div>
                  <div className="text-sm font-vt323 text-soda-chrome">your tickets</div>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-sm font-vt323 text-soda-chrome mb-1">
                  <span>win probability</span>
                  <span>{winProbability.toFixed(2)}%</span>
                </div>
                <Progress value={winProbability} className="h-2" />
              </div>

              {hasGoldenStub && (
                <div className="bg-toxic-slime/10 border border-toxic-slime/30 rounded p-3 mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-toxic-slime rounded animate-pulse" />
                    <span className="font-vt323 text-toxic-slime">golden stub active - free roll tomorrow!</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Countdown */}
          <Card className="bg-midnight-void border-2 border-amber-crt/30">
            <CardHeader>
              <CardTitle className="font-orbitron text-amber-crt flex items-center gap-2">
                <Clock className="w-6 h-6" />
                next draw
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl font-orbitron font-bold text-amber-crt mb-2">
                  {String(timeUntilDraw.hours).padStart(2, "0")}:{String(timeUntilDraw.minutes).padStart(2, "0")}:
                  {String(timeUntilDraw.seconds).padStart(2, "0")}
                </div>
                <div className="text-sm font-vt323 text-soda-chrome mb-4">until 00:00 UTC</div>

                <Badge variant="outline" className="border-amber-crt text-amber-crt font-vt323">
                  daily draw
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Dice Rolling */}
          <Card className="bg-midnight-void border-2 border-laser-berry/30">
            <CardHeader>
              <CardTitle className="font-orbitron text-laser-berry">roll dem bones</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6 mb-6">
                {diceStates.map((dice, index) => {
                  const DiceIcon = diceIcons[dice.value - 1]
                  return (
                    <div
                      key={index}
                      className={`
                        flex items-center justify-center p-4 border-2 rounded transition-all duration-300
                        ${
                          dice.isRolling
                            ? "border-laser-berry bg-laser-berry/10 shadow-lg shadow-laser-berry/20 scale-105"
                            : dice.isSettled
                              ? "border-laser-berry/30 bg-transparent scale-100"
                              : "border-laser-berry/30 bg-transparent scale-100"
                        }
                      `}
                      style={{
                        transform: dice.isRolling
                          ? `scale(1.05) translateY(-2px)`
                          : dice.isSettled
                            ? `scale(1) translateY(0px)`
                            : `scale(1) translateY(0px)`,
                        boxShadow: dice.isRolling
                          ? "0 8px 25px rgba(255, 20, 147, 0.3), inset 0 1px 0 rgba(255, 20, 147, 0.2)"
                          : "none",
                      }}
                    >
                      <DiceIcon
                        className={`w-8 h-8 text-laser-berry transition-all duration-200 ${
                          dice.isRolling ? "animate-bounce" : ""
                        }`}
                        style={{
                          filter: dice.isRolling ? "drop-shadow(0 0 8px rgba(255, 20, 147, 0.6))" : "none",
                          animationDuration: dice.isRolling ? "0.3s" : "0s",
                        }}
                      />
                    </div>
                  )
                })}
              </div>

              {/* Roll Result Display */}
              {lastRollResult && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 p-4 bg-toxic-slime/10 border border-toxic-slime/30 rounded"
                >
                  <div className="text-center">
                    <div className="text-2xl font-orbitron font-bold text-toxic-slime mb-2">
                      Sum: {lastRollResult.sum} = {lastRollResult.multiplier}x tickets
                    </div>
                    <div className="font-vt323 text-soda-chrome text-sm">{lastRollResult.description}</div>
                    {lastRollResult.isGoldenStub && (
                      <div className="mt-2 text-xs font-vt323 text-amber-crt">
                        ✨ golden stub earned - free roll tomorrow!
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Payoff Table */}
              <div className="mb-6 p-4 bg-midnight-void/50 border border-soda-chrome/30 rounded">
                <h4 className="font-vt323 text-soda-chrome text-sm mb-3 uppercase">payoff table</h4>
                <div className="space-y-1 text-xs font-vt323">
                  <div className="flex justify-between">
                    <span className="text-soda-chrome">2 (snake eyes):</span>
                    <span className="text-toxic-slime">6x tickets</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-soda-chrome">3-4:</span>
                    <span className="text-aqua-glitch">3x tickets</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-soda-chrome">5-9:</span>
                    <span className="text-ghost-grey">1x ticket</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-soda-chrome">10-11:</span>
                    <span className="text-amber-crt">2x tickets</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-soda-chrome">12 (double six):</span>
                    <span className="text-laser-berry">5x + golden stub</span>
                  </div>
                </div>
              </div>

              <Button
                onClick={rollAndMint}
                disabled={isRolling || isProcessingTx}
                className="w-full bg-toxic-slime text-midnight-void hover:bg-toxic-slime/90 font-vt323 font-bold"
              >
                {isProcessingTx ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-midnight-void border-t-transparent rounded-full animate-spin" />
                    <span>minting tickets...</span>
                  </div>
                ) : isRolling ? (
                  "rolling..."
                ) : hasGoldenStub ? (
                  <>
                    <Zap className="w-4 h-4 mr-2" />
                    free roll (golden stub)
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 mr-2" />
                    roll & mint (0.002 KSM)
                  </>
                )}
              </Button>

              <p className="text-xs font-vt323 text-soda-chrome text-center mt-2">
                {hasGoldenStub
                  ? "golden stub burns fee but gives free re-roll"
                  : "same fee regardless of roll - multiplier affects tickets only"}
              </p>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="bg-midnight-void border-2 border-aqua-glitch/30">
            <CardHeader>
              <CardTitle className="font-orbitron text-aqua-glitch flex items-center gap-2">
                <TrendingUp className="w-6 h-6" />
                live ticket drops
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentDrops.map((drop) => (
                  <div
                    key={drop.id}
                    className="flex items-center justify-between p-3 border border-aqua-glitch/20 rounded"
                  >
                    <div>
                      <div className="font-vt323 text-aqua-glitch text-sm">{formatAddress(drop.address)}</div>
                      <div className="font-vt323 text-soda-chrome text-xs">{drop.txHash}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-vt323 text-toxic-slime text-sm">+1</div>
                      <div className="font-vt323 text-soda-chrome text-xs">{formatTime(drop.timestamp)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          <Card className="bg-midnight-void border-2 border-soda-chrome/30">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-orbitron font-bold text-ghost-grey">{stats.devFund.toFixed(2)}</div>
              <div className="text-sm font-vt323 text-soda-chrome">dev fund (10%)</div>
            </CardContent>
          </Card>

          <Card className="bg-midnight-void border-2 border-soda-chrome/30">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-orbitron font-bold text-ghost-grey">{stats.upkeepFund.toFixed(2)}</div>
              <div className="text-sm font-vt323 text-soda-chrome">upkeep fund (5%)</div>
            </CardContent>
          </Card>

          <Card className="bg-midnight-void border-2 border-soda-chrome/30">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-orbitron font-bold text-ghost-grey">{stats.ticketPrice}</div>
              <div className="text-sm font-vt323 text-soda-chrome">base price (KSM)</div>
            </CardContent>
          </Card>

          <Card className="bg-midnight-void border-2 border-soda-chrome/30">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-orbitron font-bold text-ghost-grey">3.00</div>
              <div className="text-sm font-vt323 text-soda-chrome">minimum pot (KSM)</div>
            </CardContent>
          </Card>
        </div>

        {/* Last Winners */}
        <Card className="mt-6 bg-midnight-void border-2 border-toxic-slime/30">
          <CardHeader>
            <CardTitle className="font-orbitron text-toxic-slime">last draw winners</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Whale Winner */}
              <div className="space-y-3">
                <h4 className="font-vt323 text-toxic-slime text-sm uppercase">🐋 whale (45%)</h4>
                {stats.lastWinners.whale ? (
                  <div className="p-3 border border-toxic-slime/30 rounded">
                    <div className="font-vt323 text-toxic-slime text-sm">
                      {formatAddress(stats.lastWinners.whale.address)}
                    </div>
                    <div className="font-orbitron font-bold text-ghost-grey">
                      {stats.lastWinners.whale.amount.toFixed(2)} KSM
                    </div>
                  </div>
                ) : (
                  <div className="p-3 border border-soda-chrome/20 rounded text-center">
                    <div className="font-vt323 text-soda-chrome text-sm">no winner yet</div>
                  </div>
                )}
              </div>

              {/* Dolphin Winners */}
              <div className="space-y-3">
                <h4 className="font-vt323 text-aqua-glitch text-sm uppercase">🐬 dolphins (15% each)</h4>
                <div className="space-y-2">
                  {stats.lastWinners.dolphins.map((winner, index) => (
                    <div key={index} className="p-2 border border-aqua-glitch/30 rounded">
                      <div className="font-vt323 text-aqua-glitch text-xs">{formatAddress(winner.address)}</div>
                      <div className="font-orbitron font-bold text-ghost-grey text-sm">
                        {winner.amount.toFixed(2)} KSM
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Minnow Winners */}
              <div className="space-y-3">
                <h4 className="font-vt323 text-laser-berry text-sm uppercase">🐟 minnows (3% each)</h4>
                <div className="space-y-1">
                  {stats.lastWinners.minnows.map((winner, index) => (
                    <div key={index} className="p-1 border border-laser-berry/30 rounded">
                      <div className="font-vt323 text-laser-berry text-xs">{formatAddress(winner.address)}</div>
                      <div className="font-orbitron font-bold text-ghost-grey text-xs">
                        {winner.amount.toFixed(2)} KSM
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* How it Works */}
        <Card className="mt-8 bg-midnight-void border-2 border-soda-chrome/30">
          <CardHeader>
            <CardTitle className="font-orbitron text-ghost-grey">economic reality check</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-vt323 text-soda-chrome">
              <div>
                <h4 className="text-toxic-slime mb-2">dice mechanics</h4>
                <ul className="space-y-1 text-sm">
                  <li>• rollAndMint() extrinsic = 0.002 KSM base</li>
                  <li>• kusama vrf provides provably fair dice</li>
                  <li>• multiplier affects tickets, not cost</li>
                  <li>• golden stub burns fee, gives free tomorrow</li>
                  <li>• sustainable: no value from thin air</li>
                </ul>
              </div>
              <div>
                <h4 className="text-laser-berry mb-2">daily draw (00:00 UTC)</h4>
                <ul className="space-y-1 text-sm">
                  <li>• 8 wallets picked pseudo-randomly</li>
                  <li>• 1 whale gets 45% of pot</li>
                  <li>• 2 dolphins get 15% each</li>
                  <li>• 5 minnows get 3% each</li>
                  <li>• 48hrs to claim or rolls to upkeep</li>
                  <li>• upkeep ensures 3 KSM minimum pot</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
