"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Zap, Shuffle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useSoundContext } from "@/components/sound-provider"

export default function KusamaHub() {
  const { playSound } = useSoundContext()
  const [xp, setXp] = useState(0)
  const [level, setLevel] = useState(1)
  const [zomboMode, setZomboMode] = useState(false)
  const [konamiSequence, setKonamiSequence] = useState<string[]>([])
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })
  const [cursorTrail, setCursorTrail] = useState<Array<{ x: number; y: number; id: number }>>([])
  const [currentHeadline, setCurrentHeadline] = useState("")

  const konamiCode = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "KeyB",
    "KeyA",
  ]

  const headlines = [
    "stop behaving. start blockraving.",
    "built different. built worse.",
    "blockspace vandalism encouraged.",
    "chain congestion as a service.",
    "where entropy meets equity.",
    "gas fees are cheaper than therapy.",
    "not audited, barely tested, 100% live.",
    "signed, sealed, delivered, degenerate.",
    "blockchain, but make it feral.",
    "blockspace abuse is self-care.",
    "microtransactions, macrochaos.",
    "verifiably irresponsible.",
    "no roadmap, just vibes.",
    "onchain, unhinged, unstoppable.",
    "regulations are suggestions. chaos is mandatory.",
    "bad ideas, onchain forever.",
    "code is law? we can't read.",
    "chaos as a public good.",
    "built with love. mostly spite.",
    "fully open-source. sorry in advance.",
  ]

  // Special headlines that need custom color splitting
  const specialHeadlines = {
    "fully open-source. sorry in advance.": {
      firstLine: "fully open-source.",
      secondLine: "sorry in advance.",
    },
    "not audited, barely tested, 100% live.": {
      firstLine: "not audited, barely tested,",
      secondLine: "100% live.",
    },
  }

  const marqueeText =
    "🔥 chaos arena v0.1 live // pixel pillage beta drops tomorrow // futarchy markets alpha testing // coretime casino coming soon 🔥"

  useEffect(() => {
    // Set random headline on mount
    const randomHeadline = headlines[Math.floor(Math.random() * headlines.length)]
    setCurrentHeadline(randomHeadline)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const newSequence = [...konamiSequence, e.code].slice(-10)
      setKonamiSequence(newSequence)

      if (newSequence.join(",") === konamiCode.join(",")) {
        setZomboMode(!zomboMode)
        setKonamiSequence([])
        playSound("konami")
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY })

      const newTrail = {
        x: e.clientX,
        y: e.clientY,
        id: Date.now(),
      }

      setCursorTrail((prev) => [...prev.slice(-8), newTrail])
    }

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [konamiSequence, zomboMode, playSound])

  useEffect(() => {
    const timer = setInterval(() => {
      setCursorTrail((prev) => prev.filter((dot) => Date.now() - dot.id < 500))
    }, 50)

    return () => clearInterval(timer)
  }, [])

  const splitHeadline = (headline: string) => {
    // Check if this headline has special splitting rules
    if (specialHeadlines[headline as keyof typeof specialHeadlines]) {
      return specialHeadlines[headline as keyof typeof specialHeadlines]
    }

    // Default splitting logic
    const words = headline.split(" ")
    const midpoint = Math.ceil(words.length / 2)
    const firstLine = words.slice(0, midpoint).join(" ")
    const secondLine = words.slice(midpoint).join(" ")
    return { firstLine, secondLine }
  }

  const { firstLine, secondLine } = splitHeadline(currentHeadline)

  return (
    <div
      className={`min-h-screen bg-midnight-void text-ghost-grey font-inter flex flex-col ${zomboMode ? "animate-pulse" : ""}`}
    >
      {/* Custom Cursor Trail */}
      <div className="fixed inset-0 pointer-events-none z-50">
        {cursorTrail.map((dot, index) => (
          <div
            key={dot.id}
            className="absolute w-2 h-2 bg-aqua-glitch rounded-full"
            style={{
              left: dot.x - 4,
              top: dot.y - 4,
              opacity: ((index + 1) / cursorTrail.length) * 0.6,
              transform: `scale(${(index + 1) / cursorTrail.length})`,
            }}
          />
        ))}
      </div>

      {/* Hero Canvas - Flex grow to take available space */}
      <section className="relative flex-1 flex items-center justify-center overflow-hidden pt-20">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0"
            style={{
              background: `conic-gradient(at 30% 120%, #00faff 25%, #ff006e 50%, #b6ff00 75%, transparent)`,
              animation: zomboMode ? "spin 10s linear infinite" : "spin 20s linear infinite",
            }}
          />
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 py-8">
          {/* Rotating Timecube */}
          <motion.div
            className="mb-8 flex justify-center"
            animate={{
              rotateY: 360,
              rotateX: zomboMode ? 360 : 0,
            }}
            transition={{
              duration: zomboMode ? 3 : 6,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          >
            <div className="w-32 h-32 relative">
              <div className="absolute inset-0 border-2 border-toxic-slime bg-toxic-slime/10 transform rotate-12" />
              <div className="absolute inset-0 border-2 border-laser-berry bg-laser-berry/10 transform -rotate-12" />
              <div className="absolute inset-0 border-2 border-aqua-glitch bg-aqua-glitch/10" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-vt323 text-2xl text-toxic-slime">HUB</span>
              </div>
            </div>
          </motion.div>

          {/* Randomized Headline */}
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-orbitron font-black mb-8 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-toxic-slime block">{firstLine}</span>
            <span className="text-laser-berry block">{secondLine}</span>
          </motion.h1>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Link href="/warp-drive">
              <Button
                size="lg"
                className="bg-toxic-slime text-midnight-void hover:bg-toxic-slime/90 font-bold px-8 py-4 text-lg"
                onClick={() => playSound("warp")}
              >
                <Zap className="w-5 h-5 mr-2" />
                initiate jump
              </Button>
            </Link>
            <Link href="/arcade">
              <Button
                size="lg"
                variant="outline"
                className="border-laser-berry text-laser-berry hover:bg-laser-berry/10 font-bold px-8 py-4 text-lg bg-transparent"
                onClick={() => playSound("click")}
              >
                <Shuffle className="w-5 h-5 mr-2" />
                random dapp
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* News Ticker - At the bottom */}
      <div className="bg-toxic-slime text-midnight-void py-3 overflow-hidden">
        <motion.div
          className="whitespace-nowrap font-vt323 text-lg font-bold"
          animate={{ x: zomboMode ? [0, -2000] : [0, -1000] }}
          transition={{
            duration: zomboMode ? 15 : 30,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          {marqueeText} {marqueeText} {marqueeText}
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="border-t border-soda-chrome/30 py-4 px-4 text-center bg-midnight-void/95">
        <p className="text-soda-chrome font-vt323 text-sm">
          powered by canaries // you can do anything at zombodotcom
        </p>
        {zomboMode && (
          <motion.p
            className="text-laser-berry font-vt323 text-lg mt-2"
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            🧟 you have entered zombo mode. you can DO anything. 🧟
          </motion.p>
        )}
      </footer>
    </div>
  )
}
