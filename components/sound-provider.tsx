"use client"

import type React from "react"
import { createContext, useContext } from "react"
import { useSound } from "@/hooks/use-sound"

interface SoundContextType {
  config: {
    volume: number
    enabled: boolean
    ambientEnabled: boolean
  }
  playSound: (soundId: string, options?: { volume?: number; pitch?: number }) => void
  startAmbient: (soundId?: string) => void
  stopAmbient: () => void
  setVolume: (volume: number) => void
  toggleSound: () => void
  toggleAmbient: () => void
}

const SoundContext = createContext<SoundContextType | null>(null)

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const soundHook = useSound()

  return <SoundContext.Provider value={soundHook}>{children}</SoundContext.Provider>
}

export function useSoundContext() {
  const context = useContext(SoundContext)
  if (!context) {
    throw new Error("useSoundContext must be used within a SoundProvider")
  }
  return context
}
