"use client"

import { useState } from "react"
import { Volume2, VolumeX, Music, Settings, Play, Square } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useSoundContext } from "./sound-provider"

export function SoundControl() {
  const { config, playSound, setVolume, toggleSound, toggleAmbient, startAmbient } = useSoundContext()
  const [showPanel, setShowPanel] = useState(false)

  const soundEffects = [
    { id: "click", name: "click", color: "bg-aqua-glitch" },
    { id: "hover", name: "hover", color: "bg-soda-chrome" },
    { id: "success", name: "success", color: "bg-toxic-slime" },
    { id: "error", name: "error", color: "bg-laser-berry" },
    { id: "warp", name: "warp", color: "bg-amber-crt" },
    { id: "spawn", name: "spawn", color: "bg-aqua-glitch" },
    { id: "battle", name: "battle", color: "bg-laser-berry" },
    { id: "pixel", name: "pixel", color: "bg-toxic-slime" },
    { id: "transmogrify", name: "transmog", color: "bg-amber-crt" },
    { id: "konami", name: "konami", color: "bg-laser-berry" },
  ]

  return (
    <div className="flex items-center space-x-2">
      {/* Quick Toggle */}
      <Button
        variant="outline"
        size="sm"
        onClick={toggleSound}
        className="border-soda-chrome text-soda-chrome hover:bg-soda-chrome/10 bg-transparent"
      >
        {config.enabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
      </Button>

      {/* Sound Panel Dialog */}
      <Dialog open={showPanel} onOpenChange={setShowPanel}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="border-amber-crt text-amber-crt hover:bg-amber-crt/10 bg-transparent"
          >
            <Settings className="w-4 h-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-midnight-void border-toxic-slime/50 text-ghost-grey max-w-md">
          <DialogHeader>
            <DialogTitle className="font-orbitron text-toxic-slime">
              <div className="font-vt323 text-xs text-amber-crt mb-2">
                ╔══════════════════════════════════════╗
                <br />║ SOUND.EXE ║<br />║ retro audio system ║<br />
                ╚══════════════════════════════════════╝
              </div>
              audio control panel
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Status */}
            <div className="flex items-center justify-between">
              <span className="font-vt323 text-soda-chrome">system status</span>
              <Badge
                variant="outline"
                className={`font-vt323 ${
                  config.enabled ? "border-toxic-slime text-toxic-slime" : "border-laser-berry text-laser-berry"
                }`}
              >
                {config.enabled ? "online" : "offline"}
              </Badge>
            </div>

            {/* Master Volume */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-vt323 text-aqua-glitch">master volume</span>
                <span className="font-vt323 text-soda-chrome text-sm">{Math.round(config.volume * 100)}%</span>
              </div>
              <Slider
                value={[config.volume * 100]}
                onValueChange={(value) => setVolume(value[0] / 100)}
                max={100}
                step={5}
                className="w-full"
                disabled={!config.enabled}
              />
            </div>

            {/* Ambient Control */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-vt323 text-amber-crt">ambient mode</span>
                <Badge
                  variant="outline"
                  className={`font-vt323 ${
                    config.ambientEnabled
                      ? "border-toxic-slime text-toxic-slime"
                      : "border-soda-chrome text-soda-chrome"
                  }`}
                >
                  {config.ambientEnabled ? "active" : "inactive"}
                </Badge>
              </div>

              <div className="flex space-x-2">
                <Button
                  onClick={toggleAmbient}
                  disabled={!config.enabled}
                  className="flex-1 bg-aqua-glitch text-midnight-void hover:bg-aqua-glitch/90 font-vt323"
                >
                  {config.ambientEnabled ? <Square className="w-4 h-4 mr-1" /> : <Play className="w-4 h-4 mr-1" />}
                  {config.ambientEnabled ? "stop" : "chill"}
                </Button>
                <Button
                  onClick={() => {
                    if (!config.ambientEnabled) toggleAmbient()
                    startAmbient("chaos")
                  }}
                  disabled={!config.enabled}
                  className="flex-1 bg-laser-berry text-midnight-void hover:bg-laser-berry/90 font-vt323"
                >
                  <Music className="w-4 h-4 mr-1" />
                  chaos
                </Button>
              </div>
            </div>

            {/* Sound Test Grid */}
            <div className="space-y-2">
              <span className="font-vt323 text-soda-chrome">sound test</span>
              <div className="grid grid-cols-5 gap-2">
                {soundEffects.map((sound) => (
                  <Button
                    key={sound.id}
                    onClick={() => playSound(sound.id)}
                    disabled={!config.enabled}
                    className={`${sound.color} text-midnight-void hover:opacity-90 font-vt323 text-xs p-2 h-auto`}
                  >
                    {sound.name}
                  </Button>
                ))}
              </div>
            </div>

            {/* Info */}
            <div className="bg-soda-chrome/10 border border-soda-chrome/30 rounded p-3">
              <p className="text-xs font-vt323 text-soda-chrome">
                8-bit audio generated via web audio api. no external files needed. sounds auto-trigger on ui
                interactions when enabled.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
