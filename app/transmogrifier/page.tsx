"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowDown, Zap, ExternalLink, Copy, CheckCircle, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useSoundContext } from "@/components/sound-provider"

export default function Transmogrifier() {
  const { playSound } = useSoundContext()
  const [amount, setAmount] = useState("")
  const [evmAddress, setEvmAddress] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [txHash, setTxHash] = useState("")
  const [error, setError] = useState("")
  const [rate, setRate] = useState(0.9985)
  const [fee, setFee] = useState(0.001)
  const [copied, setCopied] = useState(false)

  const ksmBalance = 4.2069
  const estimatedOutput = Number.parseFloat(amount) * rate || 0
  const canTransmogrify =
    amount && evmAddress && Number.parseFloat(amount) > 0 && Number.parseFloat(amount) <= ksmBalance

  // Mock rate updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRate(0.9985 + (Math.random() - 0.5) * 0.001)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const handleTransmogrify = async () => {
    if (!canTransmogrify) return

    setIsProcessing(true)
    setError("")
    setTxHash("")
    playSound("transmogrify")

    try {
      // Simulate processing
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // Random failure chance
      if (Math.random() < 0.15) {
        throw new Error("trenchcoat ripped. ksm escaped into the void.")
      }

      setTxHash("0x" + Math.random().toString(16).substr(2, 64))
      playSound("success")
    } catch (err) {
      setError(err instanceof Error ? err.message : "something yeeted off-chain. try again or scream.")
      playSound("error")
    } finally {
      setIsProcessing(false)
    }
  }

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const addTokenToWallet = () => {
    // Mock add token to wallet
    console.log("Adding wKSM token to wallet...")
  }

  const reset = () => {
    setAmount("")
    setEvmAddress("")
    setTxHash("")
    setError("")
  }

  return (
    <div className="min-h-screen bg-midnight-void text-ghost-grey pt-20 px-4 relative overflow-hidden">
      {/* CRT Scanlines Overlay */}
      <div className="fixed inset-0 pointer-events-none z-10 opacity-20">
        <div
          className="w-full h-full"
          style={{
            background: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(0, 255, 0, 0.03) 2px,
              rgba(0, 255, 0, 0.03) 4px
            )`,
          }}
        />
      </div>

      <div className="max-w-2xl mx-auto relative z-20">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-orbitron font-black text-toxic-slime mb-4">transmogrifier</h1>
          <p className="text-soda-chrome font-vt323 text-lg">stuff ksm into an evm trenchcoat</p>
          <div className="flex items-center justify-center space-x-4 mt-4">
            <Badge variant="outline" className="border-amber-crt text-amber-crt font-vt323">
              rate: {rate.toFixed(4)}
            </Badge>
            <Badge variant="outline" className="border-laser-berry text-laser-berry font-vt323">
              fee: {fee} KSM
            </Badge>
          </div>
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="bg-midnight-void/90 border-2 border-toxic-slime/50 p-8 relative backdrop-blur-sm">
            {/* CRT Monitor Effect */}
            <div className="absolute inset-0 rounded-lg overflow-hidden">
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  background: `radial-gradient(ellipse at center, transparent 0%, rgba(0, 255, 0, 0.1) 100%)`,
                }}
              />
            </div>

            <div className="relative z-10 space-y-6">
              {!txHash && !error && (
                <>
                  {/* Amount Input */}
                  <div className="space-y-2">
                    <label className="block text-sm font-vt323 text-ghost-grey">amount to transmogrify</label>
                    <div className="relative">
                      <Input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.0"
                        className="bg-midnight-void/50 border-soda-chrome/50 text-ghost-grey font-vt323 text-lg pr-20"
                        step="0.0001"
                        min="0"
                        max={ksmBalance}
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center space-x-2">
                        <span className="text-soda-chrome font-vt323 text-sm">KSM</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setAmount(ksmBalance.toString())}
                          className="text-aqua-glitch hover:text-aqua-glitch font-vt323 text-xs h-6 px-2"
                        >
                          max
                        </Button>
                      </div>
                    </div>
                    <div className="text-xs text-soda-chrome font-vt323">balance: {ksmBalance.toFixed(4)} KSM</div>
                  </div>

                  {/* Arrow */}
                  <div className="flex justify-center">
                    <motion.div
                      animate={{ y: [0, 5, 0] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      className="text-aqua-glitch"
                    >
                      <ArrowDown className="w-8 h-8" />
                    </motion.div>
                  </div>

                  {/* EVM Address Input */}
                  <div className="space-y-2">
                    <label className="block text-sm font-vt323 text-ghost-grey">evm destination</label>
                    <Input
                      value={evmAddress}
                      onChange={(e) => setEvmAddress(e.target.value)}
                      placeholder="0x..."
                      className="bg-midnight-void/50 border-soda-chrome/50 text-ghost-grey font-vt323"
                    />
                    <div className="text-xs text-soda-chrome font-vt323">
                      {evmAddress && evmAddress.length === 42 ? "✓ valid address" : "enter ethereum address"}
                    </div>
                  </div>

                  {/* Rate Info */}
                  {amount && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-midnight-void/50 border border-soda-chrome/30 rounded p-4 space-y-2"
                    >
                      <div className="flex justify-between font-vt323 text-sm">
                        <span className="text-soda-chrome">you send:</span>
                        <span className="text-ghost-grey">{amount} KSM</span>
                      </div>
                      <div className="flex justify-between font-vt323 text-sm">
                        <span className="text-soda-chrome">you receive:</span>
                        <span className="text-toxic-slime">{estimatedOutput.toFixed(4)} wKSM</span>
                      </div>
                      <div className="flex justify-between font-vt323 text-sm">
                        <span className="text-soda-chrome">network fee:</span>
                        <span className="text-amber-crt">{fee} KSM</span>
                      </div>
                    </motion.div>
                  )}

                  {/* Disclaimer */}
                  <div className="bg-amber-crt/10 border border-amber-crt/30 p-3 rounded">
                    <p className="text-xs font-vt323 text-amber-crt">wrapped ksm ≠ security blanket. still chaos.</p>
                  </div>

                  {/* Action Button */}
                  <Button
                    onClick={handleTransmogrify}
                    disabled={!canTransmogrify || isProcessing}
                    className="w-full bg-toxic-slime text-midnight-void hover:bg-toxic-slime/90 font-vt323 font-bold text-lg py-3"
                    onMouseEnter={() => playSound("hover")}
                  >
                    {isProcessing ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        className="mr-2"
                      >
                        🌀
                      </motion.div>
                    ) : (
                      <Zap className="w-5 h-5 mr-2" />
                    )}
                    {isProcessing ? "stuffing into trenchcoat..." : "stuff it in the trenchcoat"}
                  </Button>
                </>
              )}

              {/* Success State */}
              {txHash && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center space-y-6"
                >
                  {/* Token Animation */}
                  <div className="relative h-32 flex items-center justify-center">
                    <motion.div
                      initial={{ x: -50, opacity: 1 }}
                      animate={{ x: 0, opacity: 0 }}
                      transition={{ duration: 1 }}
                      className="absolute text-4xl"
                    >
                      🪙
                    </motion.div>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                      className="text-6xl"
                    >
                      🌀
                    </motion.div>
                    <motion.div
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 1, duration: 1 }}
                      className="absolute text-4xl"
                    >
                      💎
                    </motion.div>
                  </div>

                  <div>
                    <CheckCircle className="w-16 h-16 text-toxic-slime mx-auto mb-4" />
                    <h3 className="font-orbitron font-bold text-xl text-toxic-slime mb-2">
                      transmogrification complete!
                    </h3>
                    <p className="text-soda-chrome font-vt323">fresh erc-20 just landed in your evm crib.</p>
                  </div>

                  <div className="bg-midnight-void/50 border border-soda-chrome/30 rounded p-4">
                    <div className="text-xs font-vt323 text-soda-chrome mb-2">tx hash:</div>
                    <div className="flex items-center space-x-2">
                      <code className="text-xs font-vt323 text-aqua-glitch break-all flex-1">{txHash}</code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(txHash)}
                        className="text-soda-chrome hover:text-ghost-grey"
                      >
                        {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <Button
                      onClick={() => window.open(`https://etherscan.io/tx/${txHash}`, "_blank")}
                      variant="outline"
                      className="border-aqua-glitch text-aqua-glitch hover:bg-aqua-glitch/10 font-vt323 bg-transparent"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      peep the tx
                    </Button>
                    <Button
                      onClick={addTokenToWallet}
                      variant="outline"
                      className="border-laser-berry text-laser-berry hover:bg-laser-berry/10 font-vt323 bg-transparent"
                    >
                      add wKSM token
                    </Button>
                    <Button
                      onClick={reset}
                      className="bg-toxic-slime text-midnight-void hover:bg-toxic-slime/90 font-vt323 flex-1"
                    >
                      transmogrify again
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Error State */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center space-y-6"
                >
                  <AlertTriangle className="w-16 h-16 text-laser-berry mx-auto" />
                  <div>
                    <h3 className="font-orbitron font-bold text-xl text-laser-berry mb-2">uh-oh</h3>
                    <p className="text-ghost-grey font-vt323">{error}</p>
                  </div>

                  <div className="flex space-x-3">
                    <Button
                      onClick={() => setError("")}
                      variant="outline"
                      className="border-soda-chrome text-soda-chrome hover:bg-soda-chrome/10 font-vt323 bg-transparent"
                    >
                      nah bail
                    </Button>
                    <Button
                      onClick={() => {
                        setError("")
                        handleTransmogrify()
                      }}
                      className="bg-laser-berry text-midnight-void hover:bg-laser-berry/90 font-vt323 flex-1"
                    >
                      retry transmogrify
                    </Button>
                  </div>
                </motion.div>
              )}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
