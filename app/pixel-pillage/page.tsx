"use client"

import type React from "react"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion } from "framer-motion"
import { Play, Pause, RotateCcw, Zap, Crown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useSoundContext } from "@/components/sound-provider"

interface Pixel {
  x: number
  y: number
  color: string
  owner: string
  timestamp: number
  blockHeight: number
}

interface PixelEvent {
  x: number
  y: number
  color: string
  owner: string
  timestamp: number
  char: string
}

const toxicPalette = [
  "#b6ff00", // toxic slime
  "#ff006e", // laser berry
  "#00faff", // aqua glitch
  "#ffbe00", // amber crt
  "#d9d9d9", // ghost grey
  "#8c8c8c", // soda chrome
  "#050006", // midnight void
  "#ffffff", // pure white
]

const leaderboardData = [
  { address: "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY", pixels: 420, avatar: "🦄" },
  { address: "5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty", pixels: 337, avatar: "🐙" },
  { address: "5FLSigC9HGRKVhB9FiEo4Y3koPsNmBmLJbpXg2mp1hXcS59Y", pixels: 256, avatar: "🤖" },
  { address: "5DAAnrj7VHTznn2AWBemMuyBwZWs6FNFjdyVXUeYum3PTXFy", pixels: 189, avatar: "👾" },
  { address: "5HGjWAeFDfFCWPsjFQdVV2Msvz2XtMktvgocEZcCj68kUMaw", pixels: 142, avatar: "🎮" },
]

export default function PixelPillage() {
  const { playSound } = useSoundContext()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [pixels, setPixels] = useState<Pixel[]>([])
  const [selectedPixel, setSelectedPixel] = useState<{ x: number; y: number } | null>(null)
  const [selectedColor, setSelectedColor] = useState(toxicPalette[0])
  const [isPlacing, setIsPlacing] = useState(false)
  const [showTimeLapse, setShowTimeLapse] = useState(false)
  const [timeLapseEvents, setTimeLapseEvents] = useState<PixelEvent[]>([])
  const [timeLapseIndex, setTimeLapseIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [blockHeight, setBlockHeight] = useState(1234567)
  const [zoom, setZoom] = useState(4)

  // Mock wallet address
  const walletAddress = "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY"

  // Initialize canvas with some random pixels
  useEffect(() => {
    const initialPixels: Pixel[] = []
    const initialEvents: PixelEvent[] = []

    for (let i = 0; i < 200; i++) {
      const x = Math.floor(Math.random() * 128)
      const y = Math.floor(Math.random() * 128)
      const color = toxicPalette[Math.floor(Math.random() * toxicPalette.length)]
      const timestamp = Date.now() - Math.random() * 86400000 // Random time in last 24h
      const blockHeight = 1234567 - Math.floor(Math.random() * 1000)

      const pixel: Pixel = {
        x,
        y,
        color,
        owner: leaderboardData[Math.floor(Math.random() * leaderboardData.length)].address,
        timestamp,
        blockHeight,
      }

      initialPixels.push(pixel)

      // Create ASCII rain event
      const chars = ["█", "▓", "▒", "░", "●", "◆", "▲", "♦"]
      initialEvents.push({
        ...pixel,
        char: chars[Math.floor(Math.random() * chars.length)],
      })
    }

    setPixels(initialPixels)
    setTimeLapseEvents(initialEvents.sort((a, b) => a.timestamp - b.timestamp))
  }, [])

  // Mock block height updates
  useEffect(() => {
    const interval = setInterval(() => {
      setBlockHeight((prev) => prev + 1)
    }, 6000)

    return () => clearInterval(interval)
  }, [])

  // Draw canvas
  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.fillStyle = "#050006"
    ctx.fillRect(0, 0, 128, 128)

    // Draw pixels
    pixels.forEach((pixel) => {
      ctx.fillStyle = pixel.color
      ctx.fillRect(pixel.x, pixel.y, 1, 1)
    })

    // Highlight selected pixel
    if (selectedPixel) {
      ctx.strokeStyle = "#ffffff"
      ctx.lineWidth = 0.5
      ctx.strokeRect(selectedPixel.x - 0.5, selectedPixel.y - 0.5, 2, 2)
    }
  }, [pixels, selectedPixel])

  useEffect(() => {
    drawCanvas()
  }, [drawCanvas])

  // Handle canvas click
  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const scaleX = 128 / rect.width
    const scaleY = 128 / rect.height

    const x = Math.floor((event.clientX - rect.left) * scaleX)
    const y = Math.floor((event.clientY - rect.top) * scaleY)

    setSelectedPixel({ x, y })
  }

  // Place pixel
  const placePixel = async () => {
    if (!selectedPixel) return

    setIsPlacing(true)
    playSound("pixel")

    // Simulate transaction
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const newPixel: Pixel = {
      x: selectedPixel.x,
      y: selectedPixel.y,
      color: selectedColor,
      owner: walletAddress,
      timestamp: Date.now(),
      blockHeight,
    }

    // Remove existing pixel at this position
    setPixels((prev) => prev.filter((p) => !(p.x === selectedPixel.x && p.y === selectedPixel.y)))

    // Add new pixel
    setPixels((prev) => [...prev, newPixel])

    // Add to time-lapse events
    const chars = ["█", "▓", "▒", "░", "●", "◆", "▲", "♦"]
    const newEvent: PixelEvent = {
      ...newPixel,
      char: chars[Math.floor(Math.random() * chars.length)],
    }
    setTimeLapseEvents((prev) => [...prev, newEvent].sort((a, b) => a.timestamp - b.timestamp))

    playSound("success")
    setSelectedPixel(null)
    setIsPlacing(false)
  }

  // Time-lapse playback
  useEffect(() => {
    if (!isPlaying || !showTimeLapse) return

    const interval = setInterval(() => {
      setTimeLapseIndex((prev) => {
        if (prev >= timeLapseEvents.length - 1) {
          setIsPlaying(false)
          return prev
        }
        return prev + 1
      })
    }, 100)

    return () => clearInterval(interval)
  }, [isPlaying, showTimeLapse, timeLapseEvents.length])

  // Draw ASCII rain
  const drawASCIIRain = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.fillStyle = "#050006"
    ctx.fillRect(0, 0, 128, 128)

    // Draw events up to current index
    const eventsToShow = timeLapseEvents.slice(0, timeLapseIndex + 1)

    ctx.font = "1px monospace"
    ctx.textAlign = "center"

    eventsToShow.forEach((event, index) => {
      const opacity = Math.max(0.3, 1 - (timeLapseIndex - index) / 50)
      ctx.fillStyle =
        event.color +
        Math.floor(opacity * 255)
          .toString(16)
          .padStart(2, "0")
      ctx.fillText(event.char, event.x + 0.5, event.y + 0.8)
    })
  }, [timeLapseEvents, timeLapseIndex])

  useEffect(() => {
    if (showTimeLapse) {
      drawASCIIRain()
    } else {
      drawCanvas()
    }
  }, [showTimeLapse, drawASCIIRain, drawCanvas])

  const resetTimeLapse = () => {
    setTimeLapseIndex(0)
    setIsPlaying(false)
  }

  const existingPixel = pixels.find((p) => p.x === selectedPixel?.x && p.y === selectedPixel?.y)

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
          <h1 className="text-4xl md:text-6xl font-orbitron font-black text-toxic-slime mb-4">pixel pillage</h1>
          <p className="text-soda-chrome font-vt323 text-lg">shared canvas chaos // every pixel a revolution</p>
          <div className="flex items-center justify-center space-x-4 mt-4">
            <Badge variant="outline" className="border-amber-crt text-amber-crt font-vt323">
              block {blockHeight.toLocaleString()}
            </Badge>
            <Badge variant="outline" className="border-aqua-glitch text-aqua-glitch font-vt323">
              {pixels.length} pixels placed
            </Badge>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Canvas */}
          <div className="lg:col-span-3">
            <Card className="bg-midnight-void border-2 border-toxic-slime/50 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-orbitron font-bold text-lg text-ghost-grey">128×128 canvas</h3>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setShowTimeLapse(!showTimeLapse)
                      if (!showTimeLapse) resetTimeLapse()
                    }}
                    className="text-aqua-glitch hover:text-aqua-glitch font-vt323"
                  >
                    <RotateCcw className="w-4 h-4 mr-1" />
                    rewind the vandalism
                  </Button>
                </div>
              </div>

              <div className="relative">
                <canvas
                  ref={canvasRef}
                  width={128}
                  height={128}
                  onClick={handleCanvasClick}
                  className="border border-soda-chrome/30 rounded bg-midnight-void cursor-crosshair"
                  style={{
                    width: "100%",
                    maxWidth: "512px",
                    height: "auto",
                    imageRendering: "pixelated",
                  }}
                />

                {selectedPixel && !showTimeLapse && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute top-2 left-2 bg-midnight-void/90 border border-toxic-slime/50 rounded p-2 text-xs font-vt323"
                  >
                    pixel ({selectedPixel.x}, {selectedPixel.y})
                    {existingPixel && (
                      <div className="text-soda-chrome">
                        owned by {existingPixel.owner.slice(0, 6)}...{existingPixel.owner.slice(-4)}
                      </div>
                    )}
                  </motion.div>
                )}

                {showTimeLapse && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 bg-midnight-void/80 flex items-center justify-center rounded"
                  >
                    <div className="text-center space-y-4">
                      <div className="text-toxic-slime font-vt323 text-lg">ascii rain playback</div>
                      <div className="text-soda-chrome font-vt323 text-sm">
                        {timeLapseIndex + 1} / {timeLapseEvents.length} events
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setIsPlaying(!isPlaying)}
                          className="text-aqua-glitch hover:text-aqua-glitch"
                        >
                          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={resetTimeLapse}
                          className="text-laser-berry hover:text-laser-berry"
                        >
                          <RotateCcw className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {selectedPixel && !showTimeLapse && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 flex items-center justify-between"
                >
                  <div className="text-xs text-soda-chrome font-vt323">overwrite responsibly-ish. cost: 0.0001 KSM</div>
                  <Button
                    onClick={placePixel}
                    disabled={isPlacing}
                    className="bg-toxic-slime text-midnight-void hover:bg-toxic-slime/90 font-vt323"
                  >
                    <Zap className="w-4 h-4 mr-1" />
                    {isPlacing ? "placing..." : "place pixel"}
                  </Button>
                </motion.div>
              )}
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Color Palette */}
            <Card className="bg-midnight-void border-2 border-laser-berry/50 p-6">
              <h3 className="font-orbitron font-bold text-lg text-ghost-grey mb-4">toxic palette</h3>
              <div className="grid grid-cols-4 gap-2">
                {toxicPalette.map((color) => (
                  <motion.button
                    key={color}
                    onClick={() => {
                      setSelectedColor(color)
                      playSound("click")
                    }}
                    className={`w-8 h-8 rounded border-2 transition-all ${
                      selectedColor === color ? "border-toxic-slime scale-110" : "border-soda-chrome/30"
                    }`}
                    style={{ backgroundColor: color }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onMouseEnter={() => playSound("hover")}
                  />
                ))}
              </div>
              <div className="mt-3 text-xs font-vt323 text-soda-chrome">selected: {selectedColor}</div>
            </Card>

            {/* Leaderboard */}
            <Card className="bg-midnight-void border-2 border-aqua-glitch/50 p-6">
              <h3 className="font-orbitron font-bold text-lg text-ghost-grey mb-4">pixel lords</h3>
              <div className="space-y-3">
                {leaderboardData.map((user, index) => (
                  <motion.div
                    key={user.address}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-3 bg-midnight-void/50 border border-soda-chrome/30 rounded p-3"
                  >
                    <div className="flex items-center space-x-2">
                      {index === 0 && <Crown className="w-4 h-4 text-toxic-slime" />}
                      <motion.div
                        className="text-lg"
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: index * 0.5 }}
                      >
                        {user.avatar}
                      </motion.div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-vt323 text-xs text-ghost-grey truncate">
                        {user.address.slice(0, 8)}...{user.address.slice(-6)}
                      </div>
                      <div className="font-vt323 text-xs text-aqua-glitch">{user.pixels} pixels</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>

            {/* Stats */}
            <Card className="bg-midnight-void border-2 border-amber-crt/50 p-6">
              <h3 className="font-orbitron font-bold text-lg text-ghost-grey mb-4">canvas stats</h3>
              <div className="space-y-3 font-vt323 text-sm">
                <div className="flex justify-between">
                  <span className="text-soda-chrome">total pixels:</span>
                  <span className="text-ghost-grey">{pixels.length}/16,384</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-soda-chrome">coverage:</span>
                  <span className="text-ghost-grey">{((pixels.length / 16384) * 100).toFixed(1)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-soda-chrome">your pixels:</span>
                  <span className="text-toxic-slime">{pixels.filter((p) => p.owner === walletAddress).length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-soda-chrome">last update:</span>
                  <span className="text-ghost-grey">block {blockHeight.toLocaleString()}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
