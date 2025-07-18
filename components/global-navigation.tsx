"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { SoundControl } from "@/components/sound-control"
import { WalletConnection } from "@/components/wallet-connection"
import { useSoundContext } from "@/components/sound-provider"

const navItems = [
  { name: "arcade", href: "/arcade" },
  { name: "bridge", href: "/bridge" },
  { name: "docs", href: "/docs" },
  { name: "chaos log", href: "/chaos-log" },
]

export function GlobalNavigation() {
  const { playSound } = useSoundContext()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [xp, setXp] = useState(0)
  const [level, setLevel] = useState(1)

  return (
    <header className="fixed top-0 w-full bg-midnight-void/95 backdrop-blur-sm border-b border-toxic-slime/30 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-4">
            <motion.div
              className="text-toxic-slime font-orbitron font-black text-xl tracking-tight cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={() => playSound("hover")}
            >
              kusamahub
            </motion.div>
            <Badge variant="outline" className="border-amber-crt text-amber-crt text-xs font-vt323">
              v1.0
            </Badge>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link key={item.name} href={item.href}>
                <motion.span
                  className="text-ghost-grey hover:text-toxic-slime transition-colors font-medium cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onMouseEnter={() => playSound("hover")}
                >
                  {item.name}
                </motion.span>
              </Link>
            ))}
          </nav>

          {/* Wallet & Controls */}
          <div className="flex items-center space-x-4">
            <SoundControl />
            
            <div className="hidden sm:flex items-center space-x-2 px-3 py-1 bg-laser-berry/10 border border-laser-berry/30 rounded-full">
              <span className="text-xs font-vt323">LVL {level}</span>
              <div className="w-12 h-2 bg-midnight-void rounded-full overflow-hidden">
                <div
                  className="h-full bg-toxic-slime transition-all duration-300"
                  style={{ width: `${xp % 100}%` }}
                />
              </div>
            </div>
            
            <WalletConnection />

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <motion.div animate={mobileMenuOpen ? { rotate: 180 } : { rotate: 0 }} transition={{ duration: 0.2 }}>
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </motion.div>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-midnight-void/98 border-t border-toxic-slime/30"
          >
            <div className="px-4 py-4 space-y-3">
              {navItems.map((item) => (
                <Link key={item.name} href={item.href}>
                  <motion.div
                    className="block text-ghost-grey hover:text-toxic-slime transition-colors font-medium cursor-pointer py-2"
                    whileHover={{ x: 10 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      playSound("click")
                      setMobileMenuOpen(false)
                    }}
                  >
                    {item.name}
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}