"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Droplets, Zap, Bell, Sprout } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { useSoundContext } from "@/components/sound-provider"

interface Plant {
  id: string
  name: string
  stage: "seed" | "sprout" | "growing" | "mature" | "flowering"
  health: number
  lastWatered: Date
  lastFertilized: Date
  totalYield: number
  dailyYield: number
  emoji: string
}

const stageEmojis = {
  seed: "🌰",
  sprout: "🌱",
  growing: "🌿",
  mature: "🌳",
  flowering: "🌸",
}

const stageNames = {
  seed: "seed",
  sprout: "sprout",
  growing: "growing",
  mature: "mature",
  flowering: "flowering",
}

export default function GlitchGarden() {
  const { playSound } = useSoundContext()
  const [plants, setPlants] = useState<Plant[]>([
    {
      id: "1",
      name: "chaos fern",
      stage: "growing",
      health: 85,
      lastWatered: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      lastFertilized: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      totalYield: 12.45,
      dailyYield: 0.89,
      emoji: "🌿",
    },
    {
      id: "2",
      name: "pixel bloom",
      stage: "mature",
      health: 92,
      lastWatered: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
      lastFertilized: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
      totalYield: 28.91,
      dailyYield: 1.34,
      emoji: "🌸",
    },
    {
      id: "3",
      name: "glitch moss",
      stage: "sprout",
      health: 67,
      lastWatered: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
      lastFertilized: new Date(Date.now() - 48 * 60 * 60 * 1000), // 2 days ago
      totalYield: 3.21,
      dailyYield: 0.23,
      emoji: "🌱",
    },
  ])

  const [selectedPlant, setSelectedPlant] = useState<string | null>(null)
  const [fertilizerAmount, setFertilizerAmount] = useState([0.05])
  const [gasPrice, setGasPrice] = useState(0.0234)
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [totalPortfolioValue, setTotalPortfolioValue] = useState(0)

  // Calculate portfolio value
  useEffect(() => {
    const total = plants.reduce((sum, plant) => sum + plant.totalYield, 0)
    setTotalPortfolioValue(total)
  }, [plants])

  // Simulate gas price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setGasPrice(0.02 + Math.random() * 0.02)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const getTimeUntilNextWater = (plant: Plant) => {
    const fourHours = 4 * 60 * 60 * 1000
    const nextWater = plant.lastWatered.getTime() + fourHours
    const now = Date.now()
    const diff = Math.max(0, nextWater - now)

    const hours = Math.floor(diff / (60 * 60 * 1000))
    const minutes = Math.floor((diff % (60 * 60 * 1000)) / (60 * 1000))

    return { hours, minutes, canWater: diff === 0 }
  }

  const getHealthColor = (health: number) => {
    if (health >= 80) return "text-toxic-slime"
    if (health >= 60) return "text-amber-crt"
    return "text-laser-berry"
  }

  const getStageColor = (stage: string) => {
    switch (stage) {
      case "seed":
        return "text-soda-chrome"
      case "sprout":
        return "text-aqua-glitch"
      case "growing":
        return "text-toxic-slime"
      case "mature":
        return "text-amber-crt"
      case "flowering":
        return "text-laser-berry"
      default:
        return "text-ghost-grey"
    }
  }

  const waterPlant = (plantId: string) => {
    setPlants(
      plants.map((plant) => {
        if (plant.id === plantId) {
          const newHealth = Math.min(100, plant.health + 15)
          playSound("success")
          return {
            ...plant,
            health: newHealth,
            lastWatered: new Date(),
          }
        }
        return plant
      }),
    )
  }

  const fertilizePlant = (plantId: string) => {
    const cost = fertilizerAmount[0]
    const gasCost = (gasPrice * 21000) / 1e18 // Rough estimate
    const totalCost = cost + gasCost

    if (totalCost > 0.1) {
      alert("Cost exceeds 0.1 KSM limit!")
      return
    }

    setPlants(
      plants.map((plant) => {
        if (plant.id === plantId) {
          const healthBoost = cost * 100 // 1 KSM = 100 health points
          const yieldBoost = cost * 2 // 1 KSM = 2x daily yield multiplier

          playSound("click")
          return {
            ...plant,
            health: Math.min(100, plant.health + healthBoost),
            dailyYield: plant.dailyYield + yieldBoost,
            lastFertilized: new Date(),
          }
        }
        return plant
      }),
    )
  }

  const plantNewSeed = () => {
    const newPlant: Plant = {
      id: Date.now().toString(),
      name: `plant ${plants.length + 1}`,
      stage: "seed",
      health: 100,
      lastWatered: new Date(),
      lastFertilized: new Date(),
      totalYield: 0,
      dailyYield: 0.1,
      emoji: "🌰",
    }

    setPlants([...plants, newPlant])
    playSound("success")
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
          <h1 className="text-4xl md:text-6xl font-orbitron font-black text-toxic-slime mb-4">glitch garden</h1>
          <p className="text-soda-chrome font-vt323 text-lg">idle grower // water every 4h, fertilize optional</p>
        </motion.div>

        {/* Portfolio Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-midnight-void border-2 border-toxic-slime/30 p-4">
            <div className="text-center">
              <div className="text-2xl mb-1">🌱</div>
              <div className="text-sm text-soda-chrome mb-1">total plants</div>
              <div className="text-xl font-vt323 text-toxic-slime">{plants.length}</div>
            </div>
          </Card>

          <Card className="bg-midnight-void border-2 border-amber-crt/30 p-4">
            <div className="text-center">
              <div className="text-2xl mb-1">💰</div>
              <div className="text-sm text-soda-chrome mb-1">portfolio value</div>
              <div className="text-xl font-vt323 text-amber-crt">{totalPortfolioValue.toFixed(2)} KSM</div>
            </div>
          </Card>

          <Card className="bg-midnight-void border-2 border-aqua-glitch/30 p-4">
            <div className="text-center">
              <div className="text-2xl mb-1">📈</div>
              <div className="text-sm text-soda-chrome mb-1">daily yield</div>
              <div className="text-xl font-vt323 text-aqua-glitch">
                {plants.reduce((sum, plant) => sum + plant.dailyYield, 0).toFixed(2)} KSM
              </div>
            </div>
          </Card>

          <Card className="bg-midnight-void border-2 border-laser-berry/30 p-4">
            <div className="text-center">
              <div className="text-2xl mb-1">⛽</div>
              <div className="text-sm text-soda-chrome mb-1">gas price</div>
              <div className="text-xl font-vt323 text-laser-berry">{gasPrice.toFixed(4)} KSM</div>
            </div>
          </Card>
        </div>

        {/* Controls */}
        <Card className="bg-midnight-void border-2 border-soda-chrome/30 p-6 mb-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <Button
                onClick={plantNewSeed}
                className="bg-toxic-slime text-midnight-void hover:bg-toxic-slime/90 font-vt323"
              >
                <Sprout className="w-4 h-4 mr-2" />
                plant seed
              </Button>

              <div className="flex items-center space-x-2">
                <Bell className="w-4 h-4 text-soda-chrome" />
                <span className="text-sm font-vt323">notifications</span>
                <Switch checked={notificationsEnabled} onCheckedChange={setNotificationsEnabled} />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-sm font-vt323 text-soda-chrome">fertilizer amount:</div>
              <div className="w-32">
                <Slider
                  value={fertilizerAmount}
                  onValueChange={setFertilizerAmount}
                  max={0.1}
                  min={0.01}
                  step={0.01}
                  className="w-full"
                />
              </div>
              <div className="text-sm font-vt323 text-aqua-glitch min-w-[80px]">
                {fertilizerAmount[0].toFixed(3)} KSM
              </div>
            </div>
          </div>
        </Card>

        {/* Plant Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plants.map((plant) => {
            const waterTime = getTimeUntilNextWater(plant)
            const fertilizerCost = fertilizerAmount[0] + (gasPrice * 21000) / 1e18

            return (
              <motion.div
                key={plant.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="bg-midnight-void border-2 border-soda-chrome/30 p-6 hover:border-toxic-slime/50 transition-all duration-300">
                  {/* Plant Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="text-3xl">{plant.emoji}</div>
                      <div>
                        <h3 className="font-orbitron font-bold text-lg text-ghost-grey">{plant.name}</h3>
                        <Badge variant="outline" className={`font-vt323 text-xs ${getStageColor(plant.stage)}`}>
                          {stageNames[plant.stage]}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-lg font-vt323 ${getHealthColor(plant.health)}`}>{plant.health}%</div>
                      <div className="text-xs text-soda-chrome">health</div>
                    </div>
                  </div>

                  {/* Health Bar */}
                  <div className="mb-4">
                    <Progress value={plant.health} className="h-2" />
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div>
                      <div className="text-soda-chrome">total yield</div>
                      <div className="font-vt323 text-toxic-slime">{plant.totalYield.toFixed(2)} KSM</div>
                    </div>
                    <div>
                      <div className="text-soda-chrome">daily yield</div>
                      <div className="font-vt323 text-aqua-glitch">{plant.dailyYield.toFixed(3)} KSM</div>
                    </div>
                  </div>

                  {/* Water Status */}
                  <div className="mb-4 p-3 bg-aqua-glitch/10 rounded border border-aqua-glitch/30">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Droplets className="w-4 h-4 text-aqua-glitch" />
                        <span className="text-sm font-vt323">
                          {waterTime.canWater
                            ? "ready to water!"
                            : `water in ${waterTime.hours}h ${waterTime.minutes}m`}
                        </span>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => waterPlant(plant.id)}
                        disabled={!waterTime.canWater}
                        className="bg-aqua-glitch text-midnight-void hover:bg-aqua-glitch/90 font-vt323 disabled:opacity-50"
                      >
                        <Droplets className="w-3 h-3 mr-1" />
                        water
                      </Button>
                    </div>
                  </div>

                  {/* Fertilizer */}
                  <div className="p-3 bg-amber-crt/10 rounded border border-amber-crt/30">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Zap className="w-4 h-4 text-amber-crt" />
                        <span className="text-sm font-vt323">fertilize</span>
                      </div>
                      <div className="text-xs text-soda-chrome">
                        cost: {fertilizerCost.toFixed(4)} KSM
                        {fertilizerCost > 0.1 && <span className="text-laser-berry ml-1">⚠️ over limit</span>}
                      </div>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => fertilizePlant(plant.id)}
                      disabled={fertilizerCost > 0.1}
                      className="w-full bg-amber-crt text-midnight-void hover:bg-amber-crt/90 font-vt323 disabled:opacity-50"
                    >
                      <Zap className="w-3 h-3 mr-1" />
                      fertilize (+{(fertilizerAmount[0] * 100).toFixed(0)}% health, +
                      {(fertilizerAmount[0] * 2).toFixed(2)} yield)
                    </Button>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Yield Table */}
        <Card className="bg-midnight-void border-2 border-toxic-slime/30 p-6 mt-8">
          <h3 className="font-orbitron font-bold text-xl text-toxic-slime mb-4">compounding yield table</h3>

          <div className="overflow-x-auto">
            <table className="w-full font-vt323">
              <thead>
                <tr className="border-b border-soda-chrome/30">
                  <th className="text-left py-2 text-soda-chrome">plant</th>
                  <th className="text-left py-2 text-soda-chrome">stage</th>
                  <th className="text-left py-2 text-soda-chrome">health</th>
                  <th className="text-left py-2 text-soda-chrome">daily yield</th>
                  <th className="text-left py-2 text-soda-chrome">total earned</th>
                  <th className="text-left py-2 text-soda-chrome">last action</th>
                </tr>
              </thead>
              <tbody>
                {plants.map((plant) => (
                  <tr key={plant.id} className="border-b border-soda-chrome/10">
                    <td className="py-2 text-ghost-grey">
                      <div className="flex items-center space-x-2">
                        <span>{plant.emoji}</span>
                        <span>{plant.name}</span>
                      </div>
                    </td>
                    <td className={`py-2 ${getStageColor(plant.stage)}`}>{stageNames[plant.stage]}</td>
                    <td className={`py-2 ${getHealthColor(plant.health)}`}>{plant.health}%</td>
                    <td className="py-2 text-aqua-glitch">{plant.dailyYield.toFixed(3)} KSM</td>
                    <td className="py-2 text-toxic-slime">{plant.totalYield.toFixed(2)} KSM</td>
                    <td className="py-2 text-soda-chrome text-xs">
                      {Math.floor((Date.now() - plant.lastWatered.getTime()) / (60 * 60 * 1000))}h ago
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 p-3 bg-laser-berry/10 rounded border border-laser-berry/30">
            <div className="text-center font-vt323 text-laser-berry">
              ⚠️ plants lose health over time. water every 4h or lose progress!
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
