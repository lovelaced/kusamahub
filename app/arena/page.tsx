"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Zap, Skull, Trophy, Eye, Swords, Heart, Shield, Flame } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { useSoundContext } from "@/components/sound-provider"

interface Creature {
  id: string
  name: string
  hp: number
  maxHp: number
  attack: number
  defense: number
  speed: number
  color: string
  x: number
  y: number
  owner: string
  isAlive: boolean
}

interface Battle {
  id: string
  creature1: Creature
  creature2: Creature
  winner?: string
  blockHeight: number
  timestamp: number
}

const creatureNames = [
  "glitch goblin",
  "void viper",
  "chaos chicken",
  "pixel phantom",
  "neon nightmare",
  "byte beast",
  "crypto cryptid",
  "digital demon",
  "quantum quokka",
  "substrate spider",
]

const creatureColors = [
  "#b6ff00", // toxic slime
  "#ff006e", // laser berry
  "#00faff", // aqua glitch
  "#ffbe00", // amber crt
  "#d9d9d9", // ghost grey
]

export default function Arena() {
  const { playSound } = useSoundContext()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [stakeAmount, setStakeAmount] = useState([0.1])
  const [myCreature, setMyCreature] = useState<Creature | null>(null)
  const [currentBattle, setCurrentBattle] = useState<Battle | null>(null)
  const [recentBattles, setRecentBattles] = useState<Battle[]>([])
  const [blockHeight, setBlockHeight] = useState(1234567)
  const [isSpawning, setIsSpawning] = useState(false)
  const [battleLog, setBattleLog] = useState<string[]>([])
  const [spectatorMode, setSpectatorMode] = useState(false)

  // Mock block height updates
  useEffect(() => {
    const interval = setInterval(() => {
      setBlockHeight((prev) => prev + 1)
    }, 6000) // New block every 6 seconds

    return () => clearInterval(interval)
  }, [])

  // Auto-battle when new block arrives
  useEffect(() => {
    if (currentBattle && !currentBattle.winner) {
      processBattleTurn()
    }
  }, [blockHeight])

  const generateCreature = (owner: string, stake: number): Creature => {
    const blockHash = `0x${blockHeight.toString(16).padStart(64, "0")}`
    const seed = Number.parseInt(blockHash.slice(-8), 16)

    // Stats based on stake amount and block hash
    const baseStats = Math.floor(stake * 100)
    const hp = baseStats + (seed % 50)
    const attack = Math.floor(baseStats * 0.8) + ((seed >> 8) % 30)
    const defense = Math.floor(baseStats * 0.6) + ((seed >> 16) % 25)
    const speed = Math.floor(baseStats * 0.4) + ((seed >> 24) % 20)

    return {
      id: `creature_${Date.now()}`,
      name: creatureNames[seed % creatureNames.length],
      hp,
      maxHp: hp,
      attack,
      defense,
      speed,
      color: creatureColors[seed % creatureColors.length],
      x: owner === "player" ? 100 : 500,
      y: 200,
      owner,
      isAlive: true,
    }
  }

  const spawnCreature = async () => {
    setIsSpawning(true)
    setBattleLog([])
    playSound("spawn")

    // Simulate spawning animation
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const creature = generateCreature("player", stakeAmount[0])
    setMyCreature(creature)

    // Generate opponent
    const opponent = generateCreature("ai", 0.05 + Math.random() * 0.5)

    const battle: Battle = {
      id: `battle_${Date.now()}`,
      creature1: creature,
      creature2: opponent,
      blockHeight,
      timestamp: Date.now(),
    }

    setCurrentBattle(battle)
    setBattleLog([
      `${creature.name} spawned with ${creature.hp} HP!`,
      `wild ${opponent.name} appeared!`,
      "battle begins on next block...",
    ])

    setIsSpawning(false)
  }

  const processBattleTurn = () => {
    if (!currentBattle || currentBattle.winner) return

    playSound("battle")

    const { creature1, creature2 } = currentBattle
    const newLog = [...battleLog]

    // Determine turn order by speed
    const attacker = creature1.speed >= creature2.speed ? creature1 : creature2
    const defender = attacker === creature1 ? creature2 : creature1

    // Calculate damage
    const baseDamage = attacker.attack
    const defense = defender.defense
    const damage = Math.max(1, baseDamage - Math.floor(defense / 2) + Math.floor(Math.random() * 10))

    defender.hp = Math.max(0, defender.hp - damage)
    newLog.push(`${attacker.name} deals ${damage} damage to ${defender.name}!`)

    if (defender.hp <= 0) {
      defender.isAlive = false
      const winner = attacker === creature1 ? "player" : "ai"
      currentBattle.winner = winner

      if (winner === "player") {
        playSound("success")
        newLog.push("💀 victory! loot beamed to wallet faster than a dhl van on adderall.")
      } else {
        playSound("error")
        newLog.push("💀 abomination yeeted into void. memorabilia nft minted anyway.")
      }

      setRecentBattles((prev) => [currentBattle, ...prev.slice(0, 5)])
    } else {
      newLog.push(`${defender.name} has ${defender.hp}/${defender.maxHp} HP remaining`)
    }

    setBattleLog(newLog)
    setCurrentBattle({ ...currentBattle })
  }

  const resetArena = () => {
    setMyCreature(null)
    setCurrentBattle(null)
    setBattleLog([])
  }

  // Canvas rendering
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.fillStyle = "#050006"
    ctx.fillRect(0, 0, 600, 400)

    // Draw grid
    ctx.strokeStyle = "#8c8c8c20"
    ctx.lineWidth = 1
    for (let i = 0; i < 600; i += 20) {
      ctx.beginPath()
      ctx.moveTo(i, 0)
      ctx.lineTo(i, 400)
      ctx.stroke()
    }
    for (let i = 0; i < 400; i += 20) {
      ctx.beginPath()
      ctx.moveTo(0, i)
      ctx.lineTo(600, i)
      ctx.stroke()
    }

    // Draw creatures
    if (currentBattle) {
      ;[currentBattle.creature1, currentBattle.creature2].forEach((creature) => {
        if (!creature.isAlive) return

        // Draw creature as 16x16 pixel blob
        ctx.fillStyle = creature.color
        ctx.fillRect(creature.x - 8, creature.y - 8, 16, 16)

        // Add some pixel details
        ctx.fillStyle = creature.color + "80"
        ctx.fillRect(creature.x - 6, creature.y - 6, 4, 4)
        ctx.fillRect(creature.x + 2, creature.y - 6, 4, 4)
        ctx.fillRect(creature.x - 2, creature.y + 2, 4, 4)

        // HP bar above creature
        const barWidth = 40
        const barHeight = 4
        const hpPercent = creature.hp / creature.maxHp

        ctx.fillStyle = "#8c8c8c"
        ctx.fillRect(creature.x - barWidth / 2, creature.y - 20, barWidth, barHeight)

        ctx.fillStyle = hpPercent > 0.5 ? "#b6ff00" : hpPercent > 0.25 ? "#ffbe00" : "#ff006e"
        ctx.fillRect(creature.x - barWidth / 2, creature.y - 20, barWidth * hpPercent, barHeight)

        // Name label
        ctx.fillStyle = "#d9d9d9"
        ctx.font = "8px monospace"
        ctx.textAlign = "center"
        ctx.fillText(creature.name, creature.x, creature.y - 25)
      })
    }

    // Draw battle effects
    if (currentBattle && !currentBattle.winner && battleLog.length > 3) {
      // Add some battle sparks
      for (let i = 0; i < 5; i++) {
        ctx.fillStyle = "#00faff"
        const x = 250 + Math.random() * 100
        const y = 180 + Math.random() * 40
        ctx.fillRect(x, y, 2, 2)
      }
    }
  }, [currentBattle, battleLog])

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
          <h1 className="text-4xl md:text-6xl font-orbitron font-black text-toxic-slime mb-4">chaos arena</h1>
          <p className="text-soda-chrome font-vt323 text-lg">auto-battler mayhem // stake ksm, spawn abomination</p>
          <div className="flex items-center justify-center space-x-4 mt-4">
            <Badge variant="outline" className="border-amber-crt text-amber-crt font-vt323">
              block {blockHeight.toLocaleString()}
            </Badge>
            <Badge variant="outline" className="border-aqua-glitch text-aqua-glitch font-vt323">
              {recentBattles.length} battles today
            </Badge>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Arena Canvas */}
          <div className="lg:col-span-2">
            <Card className="bg-midnight-void border-2 border-toxic-slime/50 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-orbitron font-bold text-lg text-ghost-grey">battle arena</h3>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSpectatorMode(!spectatorMode)}
                    className="text-aqua-glitch hover:text-aqua-glitch font-vt323"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    spectate
                  </Button>
                </div>
              </div>

              <div className="relative">
                <canvas
                  ref={canvasRef}
                  width={600}
                  height={400}
                  className="border border-soda-chrome/30 rounded bg-midnight-void w-full max-w-full"
                  style={{ imageRendering: "pixelated" }}
                />

                {isSpawning && (
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center bg-midnight-void/80 rounded"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="text-center">
                      <motion.div
                        className="text-4xl mb-2"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      >
                        🌀
                      </motion.div>
                      <p className="font-vt323 text-toxic-slime">spawning abomination...</p>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Battle Log */}
              <div className="mt-4 bg-midnight-void/50 border border-soda-chrome/30 rounded p-4 h-32 overflow-y-auto">
                <div className="space-y-1">
                  {battleLog.length === 0 ? (
                    <p className="text-soda-chrome font-vt323 text-sm">arena is quiet... too quiet.</p>
                  ) : (
                    battleLog.map((log, index) => (
                      <motion.p
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-ghost-grey font-vt323 text-sm"
                      >
                        {log}
                      </motion.p>
                    ))
                  )}
                </div>
              </div>
            </Card>
          </div>

          {/* Controls & Stats */}
          <div className="space-y-6">
            {/* Spawn Controls */}
            <Card className="bg-midnight-void border-2 border-laser-berry/50 p-6">
              <h3 className="font-orbitron font-bold text-lg text-ghost-grey mb-4">spawn creature</h3>

              {!myCreature ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-vt323 text-ghost-grey mb-2">
                      stake amount: {stakeAmount[0].toFixed(3)} KSM
                    </label>
                    <Slider
                      value={stakeAmount}
                      onValueChange={setStakeAmount}
                      max={2}
                      min={0.05}
                      step={0.01}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs font-vt323 text-soda-chrome mt-1">
                      <span>0.05</span>
                      <span>2.0</span>
                    </div>
                  </div>

                  <div className="bg-amber-crt/10 border border-amber-crt/30 p-3 rounded">
                    <p className="text-xs font-vt323 text-amber-crt">
                      higher stakes = stronger creatures. stats seeded by block hash.
                    </p>
                  </div>

                  <Button
                    onClick={spawnCreature}
                    disabled={isSpawning}
                    className="w-full bg-toxic-slime text-midnight-void hover:bg-toxic-slime/90 font-vt323 font-bold"
                    onMouseEnter={() => playSound("hover")}
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    drop {stakeAmount[0].toFixed(3)} ksm, spawn abomination
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-2 rounded" style={{ backgroundColor: myCreature.color }} />
                    <h4 className="font-vt323 text-lg text-ghost-grey">{myCreature.name}</h4>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs font-vt323">
                    <div className="flex items-center space-x-1">
                      <Heart className="w-3 h-3 text-laser-berry" />
                      <span>
                        HP: {myCreature.hp}/{myCreature.maxHp}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Swords className="w-3 h-3 text-amber-crt" />
                      <span>ATK: {myCreature.attack}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Shield className="w-3 h-3 text-aqua-glitch" />
                      <span>DEF: {myCreature.defense}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Flame className="w-3 h-3 text-toxic-slime" />
                      <span>SPD: {myCreature.speed}</span>
                    </div>
                  </div>

                  {currentBattle?.winner && (
                    <Button
                      onClick={resetArena}
                      className="w-full bg-laser-berry text-midnight-void hover:bg-laser-berry/90 font-vt323"
                    >
                      spawn new abomination
                    </Button>
                  )}
                </div>
              )}
            </Card>

            {/* Recent Battles */}
            <Card className="bg-midnight-void border-2 border-aqua-glitch/50 p-6">
              <h3 className="font-orbitron font-bold text-lg text-ghost-grey mb-4">spectator feed</h3>

              <div className="space-y-3">
                {recentBattles.length === 0 ? (
                  <p className="text-soda-chrome font-vt323 text-sm text-center py-4">
                    no battles yet. be the first to spill digital blood.
                  </p>
                ) : (
                  recentBattles.map((battle) => (
                    <motion.div
                      key={battle.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-midnight-void/50 border border-soda-chrome/30 rounded p-3"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          {battle.winner === "player" ? (
                            <Trophy className="w-4 h-4 text-toxic-slime" />
                          ) : (
                            <Skull className="w-4 h-4 text-laser-berry" />
                          )}
                          <span className="font-vt323 text-xs text-ghost-grey">
                            block {battle.blockHeight.toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <div className="font-vt323 text-xs text-soda-chrome">
                        {battle.creature1.name} vs {battle.creature2.name}
                      </div>
                      <div className="font-vt323 text-xs text-aqua-glitch">
                        winner: {battle.winner === "player" ? battle.creature1.name : battle.creature2.name}
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
