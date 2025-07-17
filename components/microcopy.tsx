"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Info, AlertTriangle, CheckCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function InfoTooltip({ children, content }: { children: React.ReactNode; content: string }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="sm" className="h-auto p-1 text-soda-chrome hover:text-aqua-glitch">
            {children}
          </Button>
        </TooltipTrigger>
        <TooltipContent className="bg-midnight-void border-aqua-glitch text-ghost-grey max-w-xs">
          <p className="text-xs font-vt323">{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export function LoadingSpinner({ message = "buffering chaos… 56 kbit vibes." }: { message?: string }) {
  return (
    <div className="flex items-center space-x-2 text-amber-crt">
      <Loader2 className="w-4 h-4 animate-spin" />
      <span className="font-vt323 text-sm">{message}</span>
    </div>
  )
}

export function SuccessMessage({ message = "boom. block hashed. enjoy the spoils." }: { message?: string }) {
  return (
    <div className="flex items-center space-x-2 text-toxic-slime bg-toxic-slime/10 px-3 py-2 rounded border border-toxic-slime/30">
      <CheckCircle className="w-4 h-4" />
      <span className="font-vt323 text-sm">{message}</span>
    </div>
  )
}

export function ErrorMessage({ message = "something yeeted off-chain. try again or scream." }: { message?: string }) {
  return (
    <div className="flex items-center space-x-2 text-laser-berry bg-laser-berry/10 px-3 py-2 rounded border border-laser-berry/30">
      <AlertTriangle className="w-4 h-4" />
      <span className="font-vt323 text-sm">{message}</span>
    </div>
  )
}

export function EmptyState({ message = "this place is quieter than a dad-chain." }: { message?: string }) {
  return (
    <div className="text-center py-12">
      <div className="text-6xl mb-4 opacity-20">¯\_(ツ)_/¯</div>
      <p className="text-soda-chrome font-vt323">{message}</p>
    </div>
  )
}

export function ConfirmDialog({
  action,
  onConfirm,
  onCancel,
  message = "you sure? once we warp, no backsies.",
}: {
  action: string
  onConfirm: () => void
  onCancel: () => void
  message?: string
}) {
  return (
    <div className="bg-midnight-void/95 border border-laser-berry/50 p-6 rounded-lg max-w-sm">
      <p className="text-ghost-grey mb-4 font-vt323">{message}</p>
      <div className="flex space-x-3">
        <Button onClick={onConfirm} className="bg-toxic-slime text-midnight-void hover:bg-toxic-slime/90 font-vt323">
          send it
        </Button>
        <Button
          onClick={onCancel}
          variant="outline"
          className="border-soda-chrome text-soda-chrome hover:bg-soda-chrome/10 font-vt323 bg-transparent"
        >
          nah bail
        </Button>
      </div>
    </div>
  )
}

export function WalletConnectDrawer() {
  const [selectedTab, setSelectedTab] = useState<"substrate" | "evm">("substrate")

  return (
    <div className="bg-midnight-void border border-toxic-slime/30 rounded-lg p-6 max-w-md">
      <h3 className="font-orbitron font-bold text-lg text-toxic-slime mb-4">choose your flavor of private key</h3>

      <div className="flex space-x-2 mb-4">
        <Button
          variant={selectedTab === "substrate" ? "default" : "outline"}
          onClick={() => setSelectedTab("substrate")}
          className="font-vt323"
        >
          substrate
        </Button>
        <Button
          variant={selectedTab === "evm" ? "default" : "outline"}
          onClick={() => setSelectedTab("evm")}
          className="font-vt323"
        >
          evm
        </Button>
      </div>

      {selectedTab === "substrate" ? (
        <div className="space-y-3">
          <p className="text-ghost-grey text-sm font-vt323">polkadot{".js"}? classy. connect & flex.</p>
          <Button className="w-full bg-toxic-slime text-midnight-void hover:bg-toxic-slime/90 font-vt323">
            patch cable
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-soda-chrome text-sm font-vt323">
            no metamask rn. chrome store is, like, two clicks that way.
          </p>
          <Button disabled className="w-full font-vt323">
            install metamask
          </Button>
        </div>
      )}
    </div>
  )
}

export function BridgeFeeTooltip() {
  return (
    <InfoTooltip content="bridging tax pays the interdimensional tollbooth trolls.">
      <Info className="w-4 h-4" />
    </InfoTooltip>
  )
}

export function TransmogrifierDisclaimer() {
  return (
    <div className="bg-amber-crt/10 border border-amber-crt/30 p-3 rounded text-xs font-vt323 text-amber-crt">
      wrapped ksm ≠ security blanket. still chaos.
    </div>
  )
}

interface MicrocopyProps {
  phrases: string[]
  className?: string
  speed?: number
}

export function Microcopy({ phrases, className = "", speed = 2000 }: MicrocopyProps) {
  const [currentPhrase, setCurrentPhrase] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false)
      setTimeout(() => {
        setCurrentPhrase((prev) => (prev + 1) % phrases.length)
        setIsVisible(true)
      }, 200)
    }, speed)

    return () => clearInterval(interval)
  }, [phrases.length, speed])

  return (
    <span className={`transition-opacity duration-200 ${isVisible ? "opacity-100" : "opacity-0"} ${className}`}>
      {phrases[currentPhrase]}
    </span>
  )
}
