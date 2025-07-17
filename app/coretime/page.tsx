"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Clock, Zap, TrendingUp, Users, ArrowLeft, Play, Pause, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { useSoundContext } from "@/components/sound-provider"

interface CoreSlot {
  id: number
  owner: string
  price: number
  duration: number
  utilization: number
  status: "active" | "idle" | "reserved"
}

export default function CoretimePage() {
  const { playSound } = useSoundContext()
  const [currentBlock, setCurrentBlock] = useState(18234567)
  const [isRunning, setIsRunning] = useState(true)
  const [selectedCore, setSelectedCore] = useState<number | null>(null)

  const coreSlots: CoreSlot[] = [
    { id: 1, owner: "Acala", price: 125.5, duration: 2400, utilization: 87, status: "active" },
    { id: 2, owner: "Moonbeam", price: 98.2, duration: 1800, utilization: 92, status: "active" },
    { id: 3, owner: "Astar", price: 156.8, duration: 3600, utilization: 45, status: "idle" },
    { id: 4, owner: "Parallel", price: 203.1, duration: 2100, utilization: 78, status: "active" },
    { id: 5, owner: "Available", price: 0, duration: 0, utilization: 0, status: "reserved" },
    { id: 6, owner: "Bifrost", price: 89.7, duration: 1200, utilization: 95, status: "active" },
  ]

  useEffect(() => {
    if (!isRunning) return

    const interval = setInterval(() => {
      setCurrentBlock((prev) => prev + 1)
    }, 6000) // 6 second blocks

    return () => clearInterval(interval)
  }, [isRunning])

  const toggleBlockProduction = () => {
    setIsRunning(!isRunning)
    playSound(isRunning ? "pause" : "click")
  }

  const resetSimulation = () => {
    setCurrentBlock(18234567)
    setIsRunning(false)
    playSound("reset")
  }

  return (
    <div className="min-h-screen bg-midnight-void text-ghost-grey font-inter">
      {/* Header */}
      <header className="border-b border-toxic-slime/30 bg-midnight-void/95 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="text-ghost-grey hover:text-toxic-slime">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  back to hub
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-orbitron font-bold text-toxic-slime">coretime casino</h1>
                <p className="text-sm text-soda-chrome">agile core allocation roulette</p>
              </div>
            </div>
            <Badge variant="outline" className="border-amber-crt text-amber-crt font-vt323">
              coming soon
            </Badge>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Block Production Controls */}
        <div className="mb-8">
          <Card className="bg-midnight-void/80 border-toxic-slime/30">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="text-toxic-slime font-orbitron">Block Production Simulator</span>
                <div className="flex items-center space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={toggleBlockProduction}
                    className="border-laser-berry text-laser-berry hover:bg-laser-berry/10 bg-transparent"
                  >
                    {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={resetSimulation}
                    className="border-amber-crt text-amber-crt hover:bg-amber-crt/10 bg-transparent"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-vt323 text-aqua-glitch mb-2">#{currentBlock.toLocaleString()}</div>
                  <div className="text-sm text-soda-chrome">current block</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-vt323 text-laser-berry mb-2">{isRunning ? "PRODUCING" : "PAUSED"}</div>
                  <div className="text-sm text-soda-chrome">network status</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-vt323 text-toxic-slime mb-2">6.0s</div>
                  <div className="text-sm text-soda-chrome">block time</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Core Allocation Grid */}
        <div className="mb-8">
          <h2 className="text-xl font-orbitron font-bold text-toxic-slime mb-4">Core Allocation Market</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {coreSlots.map((core) => (
              <motion.div key={core.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Card
                  className={`bg-midnight-void/80 border-soda-chrome/30 cursor-pointer transition-all duration-300 ${
                    selectedCore === core.id ? "border-toxic-slime/50 bg-toxic-slime/5" : "hover:border-laser-berry/50"
                  }`}
                  onClick={() => {
                    setSelectedCore(selectedCore === core.id ? null : core.id)
                    playSound("click")
                  }}
                >
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center justify-between text-sm">
                      <span className="text-ghost-grey">Core #{core.id}</span>
                      <Badge
                        variant="outline"
                        className={`font-vt323 text-xs ${
                          core.status === "active"
                            ? "border-toxic-slime text-toxic-slime"
                            : core.status === "idle"
                              ? "border-amber-crt text-amber-crt"
                              : "border-laser-berry text-laser-berry"
                        }`}
                      >
                        {core.status}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-soda-chrome">Owner</span>
                        <span className="text-aqua-glitch font-vt323">{core.owner}</span>
                      </div>
                      {core.status !== "reserved" && (
                        <>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-soda-chrome">Price</span>
                            <span className="text-laser-berry font-vt323">{core.price} KSM</span>
                          </div>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-soda-chrome">Duration</span>
                            <span className="text-ghost-grey font-vt323">{core.duration}h</span>
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-soda-chrome">Utilization</span>
                              <span className="text-toxic-slime font-vt323">{core.utilization}%</span>
                            </div>
                            <Progress value={core.utilization} className="h-2 bg-midnight-void" />
                          </div>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Market Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-midnight-void/80 border-toxic-slime/30">
            <CardContent className="p-4 text-center">
              <Clock className="w-8 h-8 text-toxic-slime mx-auto mb-2" />
              <div className="text-2xl font-vt323 text-toxic-slime">2.4h</div>
              <div className="text-xs text-soda-chrome">avg lease time</div>
            </CardContent>
          </Card>
          <Card className="bg-midnight-void/80 border-laser-berry/30">
            <CardContent className="p-4 text-center">
              <Zap className="w-8 h-8 text-laser-berry mx-auto mb-2" />
              <div className="text-2xl font-vt323 text-laser-berry">145.2</div>
              <div className="text-xs text-soda-chrome">avg price (KSM)</div>
            </CardContent>
          </Card>
          <Card className="bg-midnight-void/80 border-aqua-glitch/30">
            <CardContent className="p-4 text-center">
              <TrendingUp className="w-8 h-8 text-aqua-glitch mx-auto mb-2" />
              <div className="text-2xl font-vt323 text-aqua-glitch">78%</div>
              <div className="text-xs text-soda-chrome">network utilization</div>
            </CardContent>
          </Card>
          <Card className="bg-midnight-void/80 border-amber-crt/30">
            <CardContent className="p-4 text-center">
              <Users className="w-8 h-8 text-amber-crt mx-auto mb-2" />
              <div className="text-2xl font-vt323 text-amber-crt">12</div>
              <div className="text-xs text-soda-chrome">active bidders</div>
            </CardContent>
          </Card>
        </div>

        {/* Coming Soon Notice */}
        <Card className="bg-midnight-void/80 border-laser-berry/30">
          <CardContent className="p-8 text-center">
            <motion.div
              animate={{
                textShadow: ["0 0 5px #ff006e", "0 0 20px #ff006e", "0 0 5px #ff006e"],
              }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              <h3 className="text-2xl font-orbitron font-bold text-laser-berry mb-4">Agile Coretime Casino</h3>
            </motion.div>
            <p className="text-soda-chrome mb-6 max-w-2xl mx-auto">
              Place your bets on blockspace! The coretime casino will let you gamble on core allocation, bid on
              execution time, and trade computational futures. Coming soon to a parachain near you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                className="bg-laser-berry text-midnight-void hover:bg-laser-berry/90 font-bold"
                onClick={() => playSound("click")}
              >
                Join Waitlist
              </Button>
              <Button
                variant="outline"
                className="border-toxic-slime text-toxic-slime hover:bg-toxic-slime/10 bg-transparent"
                onClick={() => playSound("hover")}
              >
                Read Whitepaper
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
