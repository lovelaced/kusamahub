"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Zap, Target, TrendingUp, Users, Eye, Grid3X3, Flame, Trophy, ArrowDownRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useSound } from "@/hooks/use-sound"
import { useToast } from "@/hooks/use-toast"

interface Node {
  id: string
  x: number
  y: number
  owner: string | null
  stake: number
  captureBlock: number
  yieldDebt: number
  lastYield: number
}

interface GameStats {
  totalNodes: number
  capturedNodes: number
  totalStaked: number
  yieldBucket: number
  totalBurned: number
  avgFlipsPerDay: number
  topStakers: Array<{ address: string; totalStake: number; nodeCount: number }>
}

interface ViewMode {
  type: "stake" | "owner" | "activity"
  label: string
  icon: React.ComponentType<{ className?: string }>
}

const viewModes: ViewMode[] = [
  { type: "stake", label: "stake heat", icon: Flame },
  { type: "owner", label: "territory", icon: Users },
  { type: "activity", label: "flux map", icon: Zap },
]

// Mock data - in real app this would come from blockchain
const generateMockNodes = (): Node[] => {
  const nodes: Node[] = []
  for (let x = 0; x < 16; x++) {
    for (let y = 0; y < 16; y++) {
      const id = `${x.toString(16)}${y.toString(16)}`
      const hasOwner = Math.random() > 0.3
      nodes.push({
        id,
        x,
        y,
        owner: hasOwner ? `0x${Math.random().toString(16).substr(2, 8)}` : null,
        stake: hasOwner ? Math.random() * 10 + 0.05 : 0,
        captureBlock: hasOwner ? Math.floor(Math.random() * 1000) + 1000 : 0,
        yieldDebt: hasOwner ? Math.random() * 0.001 : 0,
        lastYield: hasOwner ? Date.now() - Math.random() * 86400000 : 0,
      })
    }
  }
  return nodes
}

const mockStats: GameStats = {
  totalNodes: 256,
  capturedNodes: 178,
  totalStaked: 1247.83,
  yieldBucket: 23.45,
  totalBurned: 156.92,
  avgFlipsPerDay: 4.2,
  topStakers: [
    { address: "0xwhale420", totalStake: 89.34, nodeCount: 23 },
    { address: "0xsquid88", totalStake: 67.12, nodeCount: 18 },
    { address: "0xvoid99", totalStake: 45.67, nodeCount: 15 },
  ],
}

export default function DataHeist() {
  const { playSound } = useSound()
  const { toast } = useToast()
  const [nodes, setNodes] = useState<Node[]>([])
  const [selectedNode, setSelectedNode] = useState<Node | null>(null)
  const [viewMode, setViewMode] = useState<ViewMode["type"]>("stake")
  const [stakeAmount, setStakeAmount] = useState("")
  const [userAddress] = useState("0xuser123") // Mock user address
  const [stats, setStats] = useState<GameStats>(mockStats)
  const [isCapturing, setIsCapturing] = useState(false)

  useEffect(() => {
    setNodes(generateMockNodes())

    // Simulate real-time updates
    const interval = setInterval(() => {
      setNodes((prev) =>
        prev.map((node) => {
          if (node.owner && Math.random() < 0.001) {
            // Random yield update
            return {
              ...node,
              yieldDebt: node.yieldDebt + node.stake * 0.000001,
              lastYield: Date.now(),
            }
          }
          return node
        }),
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const getNodeColor = (node: Node) => {
    if (!node.owner) return "bg-midnight-void/50 border-soda-chrome/30"

    switch (viewMode) {
      case "stake":
        const intensity = Math.min(node.stake / 10, 1)
        if (intensity > 0.8) return "bg-laser-berry border-laser-berry"
        if (intensity > 0.5) return "bg-amber-crt border-amber-crt"
        if (intensity > 0.2) return "bg-toxic-slime border-toxic-slime"
        return "bg-aqua-glitch/50 border-aqua-glitch"

      case "owner":
        const colors = [
          "bg-toxic-slime border-toxic-slime",
          "bg-laser-berry border-laser-berry",
          "bg-aqua-glitch border-aqua-glitch",
          "bg-amber-crt border-amber-crt",
        ]
        const hash = node.owner.split("").reduce((a, b) => a + b.charCodeAt(0), 0)
        return colors[hash % colors.length]

      case "activity":
        const timeSinceYield = Date.now() - node.lastYield
        if (timeSinceYield < 300000) return "bg-toxic-slime border-toxic-slime animate-pulse"
        if (timeSinceYield < 3600000) return "bg-amber-crt border-amber-crt"
        return "bg-soda-chrome/50 border-soda-chrome"

      default:
        return "bg-soda-chrome/50 border-soda-chrome"
    }
  }

  const handleNodeClick = (node: Node) => {
    setSelectedNode(node)
    playSound("click")
  }

  const handleCapture = async () => {
    if (!selectedNode || !stakeAmount) return

    const newStake = Number.parseFloat(stakeAmount)
    const minStake = selectedNode.owner ? selectedNode.stake * 1.05 : 0.05

    if (newStake < minStake) {
      toast({
        title: "insufficient stake",
        description: `minimum required: ${minStake.toFixed(3)} KSM`,
        variant: "destructive",
      })
      return
    }

    setIsCapturing(true)
    playSound("warp")

    // Simulate transaction
    setTimeout(() => {
      const burnAmount = newStake * 0.05

      setNodes((prev) =>
        prev.map((n) =>
          n.id === selectedNode.id ? { ...n, owner: userAddress, stake: newStake, captureBlock: Date.now() } : n,
        ),
      )

      setStats((prev) => ({
        ...prev,
        totalStaked: prev.totalStaked + newStake - selectedNode.stake,
        yieldBucket: prev.yieldBucket + burnAmount,
        totalBurned: prev.totalBurned + burnAmount,
        capturedNodes: selectedNode.owner ? prev.capturedNodes : prev.capturedNodes + 1,
      }))

      toast({
        title: "you jacked node " + selectedNode.id,
        description: `pay the 5% karma tax: ${burnAmount.toFixed(3)} KSM burned`,
        variant: "default",
      })

      setSelectedNode(null)
      setStakeAmount("")
      setIsCapturing(false)
      playSound("success")
    }, 2000)
  }

  const handleSurrender = async () => {
    if (!selectedNode || selectedNode.owner !== userAddress) return

    setIsCapturing(true)
    playSound("error")

    setTimeout(() => {
      const exitFee = selectedNode.stake * 0.01
      const returnAmount = selectedNode.stake - exitFee

      setNodes((prev) =>
        prev.map((n) =>
          n.id === selectedNode.id ? { ...n, owner: null, stake: 0, captureBlock: 0, yieldDebt: 0 } : n,
        ),
      )

      setStats((prev) => ({
        ...prev,
        totalStaked: prev.totalStaked - selectedNode.stake,
        totalBurned: prev.totalBurned + exitFee,
        capturedNodes: prev.capturedNodes - 1,
      }))

      toast({
        title: "node surrendered",
        description: `returned ${returnAmount.toFixed(3)} KSM (1% exit fee burned)`,
        variant: "default",
      })

      setSelectedNode(null)
      setIsCapturing(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-midnight-void text-ghost-grey p-6">
      {/* Header */}
      <div className="mb-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-6">
          <h1 className="text-5xl font-orbitron font-bold text-toxic-slime mb-2">DATA HEIST v2</h1>
          <p className="text-xl text-laser-berry font-vt323">the anatomy map</p>
          <p className="text-soda-chrome font-vt323 mt-2">
            16×16 grid warfare • capture nodes • stake ksm • earn yield • 5% burn tax funds the drip
          </p>
        </motion.div>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-midnight-void/80 border-toxic-slime/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-soda-chrome font-vt323">captured</p>
                  <p className="text-lg font-orbitron text-toxic-slime">
                    {stats.capturedNodes}/{stats.totalNodes}
                  </p>
                </div>
                <Target className="w-5 h-5 text-toxic-slime" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-midnight-void/80 border-amber-crt/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-soda-chrome font-vt323">total staked</p>
                  <p className="text-lg font-orbitron text-amber-crt">{stats.totalStaked.toFixed(1)} KSM</p>
                </div>
                <TrendingUp className="w-5 h-5 text-amber-crt" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-midnight-void/80 border-laser-berry/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-soda-chrome font-vt323">yield bucket</p>
                  <p className="text-lg font-orbitron text-laser-berry">{stats.yieldBucket.toFixed(2)} KSM</p>
                </div>
                <Flame className="w-5 h-5 text-laser-berry" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-midnight-void/80 border-aqua-glitch/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-soda-chrome font-vt323">avg flips/day</p>
                  <p className="text-lg font-orbitron text-aqua-glitch">{stats.avgFlipsPerDay.toFixed(1)}</p>
                </div>
                <Zap className="w-5 h-5 text-aqua-glitch" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* View Mode Controls */}
        <div className="flex justify-center mb-6">
          <div className="flex bg-midnight-void/50 border border-soda-chrome/30 rounded-lg p-1">
            {viewModes.map((mode) => {
              const Icon = mode.icon
              return (
                <Button
                  key={mode.type}
                  variant={viewMode === mode.type ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode(mode.type)}
                  className={`font-vt323 ${
                    viewMode === mode.type
                      ? "bg-toxic-slime text-midnight-void"
                      : "text-soda-chrome hover:text-toxic-slime"
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {mode.label}
                </Button>
              )
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Main Grid */}
        <div className="xl:col-span-3">
          <Card className="bg-midnight-void/80 border-soda-chrome/30 p-6">
            <div className="grid grid-cols-16 gap-1 max-w-4xl mx-auto">
              {nodes.map((node) => (
                <motion.button
                  key={node.id}
                  className={`
                    aspect-square border-2 rounded-sm transition-all duration-200 hover:scale-110
                    ${getNodeColor(node)}
                    ${selectedNode?.id === node.id ? "ring-2 ring-toxic-slime ring-offset-1 ring-offset-midnight-void" : ""}
                  `}
                  onClick={() => handleNodeClick(node)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  title={`Node ${node.id} • ${node.owner ? `${node.stake.toFixed(3)} KSM` : "unclaimed"}`}
                />
              ))}
            </div>
          </Card>
        </div>

        {/* Side Panel */}
        <div className="space-y-6">
          {/* Node Details */}
          {selectedNode && (
            <Card className="bg-midnight-void/80 border-toxic-slime/30">
              <CardHeader>
                <CardTitle className="text-toxic-slime font-orbitron flex items-center">
                  <Grid3X3 className="w-5 h-5 mr-2" />
                  node {selectedNode.id}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-soda-chrome font-vt323">owner:</span>
                    <span className="text-ghost-grey font-mono">
                      {selectedNode.owner ? `${selectedNode.owner.slice(0, 8)}...` : "unclaimed"}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-soda-chrome font-vt323">stake:</span>
                    <span className="text-amber-crt font-mono">{selectedNode.stake.toFixed(3)} KSM</span>
                  </div>

                  {selectedNode.owner && (
                    <div className="flex justify-between text-sm">
                      <span className="text-soda-chrome font-vt323">yield debt:</span>
                      <span className="text-toxic-slime font-mono">{selectedNode.yieldDebt.toFixed(6)} KSM</span>
                    </div>
                  )}
                </div>

                {/* Capture Interface */}
                {selectedNode.owner !== userAddress && (
                  <div className="space-y-3 pt-4 border-t border-soda-chrome/30">
                    <div>
                      <label className="text-sm text-soda-chrome font-vt323 block mb-2">stake amount (KSM)</label>
                      <Input
                        type="number"
                        step="0.001"
                        min={selectedNode.owner ? (selectedNode.stake * 1.05).toFixed(3) : "0.05"}
                        value={stakeAmount}
                        onChange={(e) => setStakeAmount(e.target.value)}
                        placeholder={`min: ${selectedNode.owner ? (selectedNode.stake * 1.05).toFixed(3) : "0.05"}`}
                        className="bg-midnight-void border-soda-chrome/50 text-ghost-grey font-mono"
                      />
                    </div>

                    <Button
                      onClick={handleCapture}
                      disabled={isCapturing || !stakeAmount}
                      className="w-full bg-laser-berry text-midnight-void hover:bg-laser-berry/90 font-vt323"
                    >
                      {isCapturing ? (
                        <>
                          <Zap className="w-4 h-4 mr-2 animate-spin" />
                          jacking...
                        </>
                      ) : (
                        <>
                          <Target className="w-4 h-4 mr-2" />
                          jack it
                        </>
                      )}
                    </Button>

                    {stakeAmount && (
                      <div className="text-xs text-soda-chrome font-vt323 bg-midnight-void/50 p-2 rounded">
                        burn tax: {(Number.parseFloat(stakeAmount || "0") * 0.05).toFixed(3)} KSM
                      </div>
                    )}
                  </div>
                )}

                {/* Surrender Interface */}
                {selectedNode.owner === userAddress && (
                  <div className="space-y-3 pt-4 border-t border-soda-chrome/30">
                    <Button
                      onClick={handleSurrender}
                      disabled={isCapturing}
                      variant="outline"
                      className="w-full border-amber-crt text-amber-crt hover:bg-amber-crt/10 font-vt323 bg-transparent"
                    >
                      {isCapturing ? (
                        <>
                          <Zap className="w-4 h-4 mr-2 animate-spin" />
                          surrendering...
                        </>
                      ) : (
                        <>
                          <ArrowDownRight className="w-4 h-4 mr-2" />
                          surrender node
                        </>
                      )}
                    </Button>

                    <div className="text-xs text-soda-chrome font-vt323 bg-midnight-void/50 p-2 rounded">
                      return: {(selectedNode.stake * 0.99).toFixed(3)} KSM (1% exit fee)
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Leaderboard */}
          <Card className="bg-midnight-void/80 border-amber-crt/30">
            <CardHeader>
              <CardTitle className="text-amber-crt font-orbitron flex items-center">
                <Trophy className="w-5 h-5 mr-2" />
                top squatters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {stats.topStakers.map((staker, index) => (
                  <div key={staker.address} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="w-6 h-6 p-0 flex items-center justify-center text-xs">
                        {index + 1}
                      </Badge>
                      <span className="text-ghost-grey font-mono text-sm">{staker.address}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-amber-crt font-mono text-sm">{staker.totalStake.toFixed(1)} KSM</div>
                      <div className="text-soda-chrome font-vt323 text-xs">{staker.nodeCount} nodes</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Game Rules */}
          <Card className="bg-midnight-void/80 border-aqua-glitch/30">
            <CardHeader>
              <CardTitle className="text-aqua-glitch font-orbitron flex items-center">
                <Eye className="w-5 h-5 mr-2" />
                the rules
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-xs font-vt323 text-soda-chrome">
                <p>• capture: stake ≥ prev × 1.05 or ≥ 0.05 KSM</p>
                <p>• yield: stake × 0.000001 per block</p>
                <p>• burn tax: 5% of new stake → yield bucket</p>
                <p>• exit fee: 1% of stake → burned</p>
                <p>• gang up on whales for maximum chaos</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
