"use client"

import { useState, useEffect, useRef, useCallback } from "react"

interface SoundConfig {
  volume: number
  enabled: boolean
  ambientEnabled: boolean
}

interface SoundEffect {
  id: string
  url: string
  volume?: number
  loop?: boolean
}

const soundEffects: SoundEffect[] = [
  { id: "click", url: "/sounds/click.wav", volume: 0.3 },
  { id: "hover", url: "/sounds/hover.wav", volume: 0.2 },
  { id: "success", url: "/sounds/success.wav", volume: 0.4 },
  { id: "error", url: "/sounds/error.wav", volume: 0.4 },
  { id: "notification", url: "/sounds/notification.wav", volume: 0.3 },
  { id: "warp", url: "/sounds/warp.wav", volume: 0.5 },
  { id: "spawn", url: "/sounds/spawn.wav", volume: 0.4 },
  { id: "battle", url: "/sounds/battle.wav", volume: 0.3 },
  { id: "pixel", url: "/sounds/pixel.wav", volume: 0.2 },
  { id: "transmogrify", url: "/sounds/transmogrify.wav", volume: 0.5 },
  { id: "konami", url: "/sounds/konami.wav", volume: 0.6 },
  { id: "ambient", url: "/sounds/ambient.mp3", volume: 0.1, loop: true },
  { id: "chaos", url: "/sounds/chaos.mp3", volume: 0.15, loop: true },
]

export function useSound() {
  const [config, setConfig] = useState<SoundConfig>({
    volume: 0.7,
    enabled: false,
    ambientEnabled: false,
  })

  const audioContextRef = useRef<AudioContext | null>(null)
  const soundBuffersRef = useRef<Map<string, AudioBuffer>>(new Map())
  const ambientSourceRef = useRef<AudioBufferSourceNode | null>(null)
  const gainNodeRef = useRef<GainNode | null>(null)

  // Initialize Web Audio API
  useEffect(() => {
    if (typeof window === "undefined") return

    const initAudio = async () => {
      try {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
        gainNodeRef.current = audioContextRef.current.createGain()
        gainNodeRef.current.connect(audioContextRef.current.destination)
        gainNodeRef.current.gain.value = config.volume

        // Load sound effects
        await loadSounds()
      } catch (error) {
        console.warn("Audio initialization failed:", error)
      }
    }

    if (config.enabled) {
      initAudio()
    }

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }
  }, [config.enabled])

  // Load sound buffers
  const loadSounds = async () => {
    if (!audioContextRef.current) return

    const loadPromises = soundEffects.map(async (sound) => {
      try {
        // For demo purposes, we'll create synthetic sounds
        const buffer = createSyntheticSound(sound.id, audioContextRef.current!)
        soundBuffersRef.current.set(sound.id, buffer)
      } catch (error) {
        console.warn(`Failed to load sound: ${sound.id}`, error)
      }
    })

    await Promise.all(loadPromises)
  }

  // Create synthetic 8-bit style sounds
  const createSyntheticSound = (soundId: string, audioContext: AudioContext): AudioBuffer => {
    let duration = 0.2
    let frequency = 440
    let type: OscillatorType = "square"

    switch (soundId) {
      case "click":
        frequency = 800
        duration = 0.1
        type = "square"
        break
      case "hover":
        frequency = 600
        duration = 0.05
        type = "sine"
        break
      case "success":
        frequency = 523.25 // C5
        duration = 0.3
        type = "triangle"
        break
      case "error":
        frequency = 220
        duration = 0.4
        type = "sawtooth"
        break
      case "notification":
        frequency = 880
        duration = 0.15
        type = "square"
        break
      case "warp":
        frequency = 200
        duration = 0.8
        type = "sawtooth"
        break
      case "spawn":
        frequency = 1000
        duration = 0.5
        type = "triangle"
        break
      case "battle":
        frequency = 150
        duration = 0.3
        type = "square"
        break
      case "pixel":
        frequency = 1200
        duration = 0.05
        type = "square"
        break
      case "transmogrify":
        frequency = 300
        duration = 1.0
        type = "sawtooth"
        break
      case "konami":
        frequency = 659.25 // E5
        duration = 0.6
        type = "triangle"
        break
      case "ambient":
      case "chaos":
        return createAmbientBuffer(audioContext, soundId === "chaos")
    }

    const sampleRate = audioContext.sampleRate
    const buffer = audioContext.createBuffer(1, duration * sampleRate, sampleRate)
    const data = buffer.getChannelData(0)

    for (let i = 0; i < buffer.length; i++) {
      const t = i / sampleRate
      let sample = 0

      if (type === "sine") {
        sample = Math.sin(2 * Math.PI * frequency * t)
      } else if (type === "square") {
        sample = Math.sin(2 * Math.PI * frequency * t) > 0 ? 1 : -1
      } else if (type === "triangle") {
        sample = (2 / Math.PI) * Math.asin(Math.sin(2 * Math.PI * frequency * t))
      } else if (type === "sawtooth") {
        sample = 2 * (t * frequency - Math.floor(t * frequency + 0.5))
      }

      // Apply envelope
      const envelope = Math.exp(-t * 3) // Exponential decay
      data[i] = sample * envelope * 0.3
    }

    return buffer
  }

  // Create ambient background buffer
  const createAmbientBuffer = (audioContext: AudioContext, isChaos: boolean): AudioBuffer => {
    const duration = 30 // 30 second loop
    const sampleRate = audioContext.sampleRate
    const buffer = audioContext.createBuffer(2, duration * sampleRate, sampleRate)

    for (let channel = 0; channel < 2; channel++) {
      const data = buffer.getChannelData(channel)

      for (let i = 0; i < buffer.length; i++) {
        const t = i / sampleRate
        let sample = 0

        if (isChaos) {
          // Chaotic ambient with multiple frequencies
          sample += 0.1 * Math.sin(2 * Math.PI * 60 * t) // Deep bass
          sample += 0.05 * Math.sin(2 * Math.PI * 120 * t + Math.sin(t * 0.5)) // Modulated mid
          sample += 0.03 * Math.sin(2 * Math.PI * 240 * t + Math.sin(t * 0.3)) // High freq
          sample += 0.02 * (Math.random() - 0.5) // Noise
        } else {
          // Calm ambient
          sample += 0.08 * Math.sin(2 * Math.PI * 80 * t)
          sample += 0.04 * Math.sin(2 * Math.PI * 160 * t + Math.sin(t * 0.2))
          sample += 0.02 * Math.sin(2 * Math.PI * 320 * t + Math.sin(t * 0.1))
        }

        // Apply slow fade in/out for seamless looping
        const fadeTime = 2 // 2 seconds
        let envelope = 1
        if (t < fadeTime) {
          envelope = t / fadeTime
        } else if (t > duration - fadeTime) {
          envelope = (duration - t) / fadeTime
        }

        data[i] = sample * envelope
      }
    }

    return buffer
  }

  // Play sound effect
  const playSound = useCallback(
    (soundId: string, options?: { volume?: number; pitch?: number }) => {
      if (!config.enabled || !audioContextRef.current || !gainNodeRef.current) return

      const buffer = soundBuffersRef.current.get(soundId)
      if (!buffer) return

      try {
        const source = audioContextRef.current.createBufferSource()
        const gainNode = audioContextRef.current.createGain()

        source.buffer = buffer
        source.connect(gainNode)
        gainNode.connect(gainNodeRef.current)

        // Apply options
        const soundConfig = soundEffects.find((s) => s.id === soundId)
        const volume = (options?.volume ?? soundConfig?.volume ?? 1) * config.volume
        gainNode.gain.value = volume

        if (options?.pitch) {
          source.playbackRate.value = options.pitch
        }

        source.start()
      } catch (error) {
        console.warn(`Failed to play sound: ${soundId}`, error)
      }
    },
    [config.enabled, config.volume],
  )

  // Start ambient audio
  const startAmbient = useCallback(
    (soundId = "ambient") => {
      if (!config.ambientEnabled || !audioContextRef.current || !gainNodeRef.current) return

      stopAmbient() // Stop any existing ambient

      const buffer = soundBuffersRef.current.get(soundId)
      if (!buffer) return

      try {
        const source = audioContextRef.current.createBufferSource()
        const gainNode = audioContextRef.current.createGain()

        source.buffer = buffer
        source.loop = true
        source.connect(gainNode)
        gainNode.connect(gainNodeRef.current)

        const soundConfig = soundEffects.find((s) => s.id === soundId)
        const volume = (soundConfig?.volume ?? 0.1) * config.volume
        gainNode.gain.value = volume

        source.start()
        ambientSourceRef.current = source
      } catch (error) {
        console.warn(`Failed to start ambient: ${soundId}`, error)
      }
    },
    [config.ambientEnabled, config.volume],
  )

  // Stop ambient audio
  const stopAmbient = useCallback(() => {
    if (ambientSourceRef.current) {
      try {
        ambientSourceRef.current.stop()
      } catch (error) {
        // Source might already be stopped
      }
      ambientSourceRef.current = null
    }
  }, [])

  // Update volume
  const setVolume = useCallback((volume: number) => {
    setConfig((prev) => ({ ...prev, volume }))
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = volume
    }
  }, [])

  // Toggle sound
  const toggleSound = useCallback(() => {
    setConfig((prev) => ({ ...prev, enabled: !prev.enabled }))
  }, [])

  // Toggle ambient
  const toggleAmbient = useCallback(() => {
    setConfig((prev) => {
      const newAmbientEnabled = !prev.ambientEnabled
      if (!newAmbientEnabled) {
        stopAmbient()
      }
      return { ...prev, ambientEnabled: newAmbientEnabled }
    })
  }, [stopAmbient])

  // Start ambient when enabled
  useEffect(() => {
    if (config.ambientEnabled && config.enabled) {
      startAmbient()
    } else {
      stopAmbient()
    }
  }, [config.ambientEnabled, config.enabled, startAmbient, stopAmbient])

  return {
    config,
    playSound,
    startAmbient,
    stopAmbient,
    setVolume,
    toggleSound,
    toggleAmbient,
  }
}
