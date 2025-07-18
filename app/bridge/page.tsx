"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Zap, AlertTriangle, CheckCircle, Info, Loader2, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useSoundContext } from "@/components/sound-provider"
import { useExtension } from "@/contexts/extension-context"
import { useBalance } from "@/hooks/use-balance"
import { useTransfer } from "@/hooks/use-transfer"
import { CHAIN_NAMES, ASSET_DECIMALS, type ChainId, type AssetId } from "@/lib/blockchain"
import type { InjectedPolkadotAccount } from "polkadot-api/pjs-signer"

const chains: { id: ChainId; icon: string }[] = [
  { id: "ksm", icon: "🕸️" },
  { id: "ksmAh", icon: "💎" },
]

export default function Bridge() {
  const { playSound } = useSoundContext()
  const { extensions, selectedExtension, setSelectedExtension, accounts, isConnecting } = useExtension()
  const [selectedAccount, setSelectedAccount] = useState<InjectedPolkadotAccount | null>(null)
  const [step, setStep] = useState(1)
  const [sourceChain, setSourceChain] = useState<ChainId | "">("ksm")
  const [destChain, setDestChain] = useState<ChainId | "">("ksmAh")
  const [selectedAsset] = useState<AssetId>("KSM") // Only KSM for now
  const [amount, setAmount] = useState<string>("")
  const [recipientAddress, setRecipientAddress] = useState<string>("")
  
  // Real balance from blockchain
  const { balance: sourceBalance, isLoading: isBalanceLoading } = useBalance(
    selectedAccount,
    sourceChain as ChainId,
    selectedAsset
  )
  
  // Transfer hook
  const { prepareTransfer, submitTransfer, state: transferState, reset: resetTransfer } = useTransfer()
  const [showFeeDialog, setShowFeeDialog] = useState(false)

  // Convert balance to human readable format
  const formatBalance = (balance: bigint, decimals: number) => {
    const divisor = BigInt(10 ** decimals)
    const whole = balance / divisor
    const remainder = balance % divisor
    const decimal = remainder.toString().padStart(decimals, "0").slice(0, 4)
    return `${whole}.${decimal}`
  }

  const humanBalance = sourceChain && sourceBalance 
    ? formatBalance(sourceBalance, ASSET_DECIMALS[selectedAsset])
    : "0.0000"

  const canProceedStep1 = sourceChain && destChain && sourceChain !== destChain && selectedAccount
  const canProceedStep2 = selectedAsset && amount && Number.parseFloat(amount) > 0 && recipientAddress
  const canInitiateJump = step === 3 && canProceedStep1 && canProceedStep2

  const handleInitiateJump = async () => {
    if (!canInitiateJump || !selectedAccount) return

    const amountInSmallestUnit = BigInt(
      Math.floor(Number.parseFloat(amount) * 10 ** ASSET_DECIMALS[selectedAsset])
    )

    try {
      await prepareTransfer(
        selectedAccount,
        recipientAddress,
        amountInSmallestUnit,
        sourceChain as ChainId,
        destChain as ChainId,
        selectedAsset
      )
      setShowFeeDialog(true)
    } catch (error) {
      console.error("Failed to prepare transfer:", error)
    }
  }
  
  const handleSubmitTransfer = async () => {
    if (!selectedAccount) return
    
    try {
      await submitTransfer(selectedAccount)
    } catch (error) {
      console.error("Failed to submit transfer:", error)
    }
  }

  const resetFlow = () => {
    setStep(1)
    setSourceChain("")
    setDestChain("")
    setAmount("")
    setRecipientAddress("")
    resetTransfer()
  }

  // Auto-connect to extension if only one available
  useEffect(() => {
    if (extensions.length === 1 && !selectedExtension) {
      setSelectedExtension(extensions[0])
    }
  }, [extensions, selectedExtension, setSelectedExtension])

  // Auto-select first account when accounts change
  useEffect(() => {
    if (accounts.length > 0 && !selectedAccount) {
      setSelectedAccount(accounts[0])
    } else if (accounts.length === 0) {
      setSelectedAccount(null)
    }
  }, [accounts, selectedAccount])

  // Auto-fill recipient address with selected account address
  useEffect(() => {
    if (selectedAccount && !recipientAddress) {
      setRecipientAddress(selectedAccount.address)
    }
  }, [selectedAccount, recipientAddress])

  // Handle transfer state changes
  useEffect(() => {
    if (transferState.status === "finalized") {
      setShowFeeDialog(false)
      playSound("success")
    } else if (transferState.status === "error") {
      setShowFeeDialog(false)
      playSound("error")
    }
  }, [transferState.status, playSound])

  return (
    <div className="min-h-screen bg-midnight-void text-ghost-grey pt-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-orbitron font-black text-toxic-slime mb-4">
            kusama bridge
          </h1>
          <p className="text-soda-chrome font-vt323 text-lg">transfer ksm from relay chain to asset hub</p>
        </motion.div>

        {/* Wallet Connection */}
        {!selectedAccount && (
          <motion.div
            className="max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="bg-midnight-void border-2 border-toxic-slime/50 p-6">
              <div className="text-center space-y-4">
                <Wallet className="w-12 h-12 text-toxic-slime mx-auto" />
                <h3 className="font-orbitron font-bold text-xl text-ghost-grey">connect wallet</h3>
                <p className="text-soda-chrome font-vt323 text-sm">connect your wallet to bridge funds</p>
                
                {extensions.length === 0 ? (
                  <div className="text-amber-crt font-vt323 text-sm">
                    no polkadot wallets detected. install one to continue.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {extensions.length > 1 && (
                      <Select value={selectedExtension || ""} onValueChange={setSelectedExtension}>
                        <SelectTrigger className="bg-midnight-void border-soda-chrome/50 text-ghost-grey font-vt323">
                          <SelectValue placeholder="select wallet" />
                        </SelectTrigger>
                        <SelectContent className="bg-midnight-void border-soda-chrome/50">
                          {extensions.map((ext) => (
                            <SelectItem key={ext} value={ext} className="font-vt323">
                              {ext}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                    
                    {selectedExtension && accounts.length > 0 && (
                      <Select 
                        value={selectedAccount?.address || ""} 
                        onValueChange={(addr) => {
                          const account = accounts.find((a: InjectedPolkadotAccount) => a.address === addr)
                          if (account) setSelectedAccount(account)
                        }}
                      >
                        <SelectTrigger className="bg-midnight-void border-soda-chrome/50 text-ghost-grey font-vt323">
                          <SelectValue placeholder="select account" />
                        </SelectTrigger>
                        <SelectContent className="bg-midnight-void border-soda-chrome/50">
                          {accounts.map((account) => (
                            <SelectItem key={account.address} value={account.address} className="font-vt323">
                              <div className="flex items-center space-x-2">
                                <span>{account.name || "Unnamed Account"}</span>
                                <span className="text-xs text-soda-chrome">
                                  {account.address.slice(0, 6)}...{account.address.slice(-4)}
                                </span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                    
                    {isConnecting && (
                      <div className="flex items-center justify-center space-x-2 text-aqua-glitch">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span className="font-vt323 text-sm">connecting...</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </Card>
          </motion.div>
        )}

        {/* Main Flow */}
        {selectedAccount && (
          <motion.div
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="bg-midnight-void border-2 border-toxic-slime/50 p-6 relative overflow-hidden">
              {/* Winamp-style title bar */}
              <div className="flex items-center justify-between mb-6 pb-3 border-b border-soda-chrome/30">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-laser-berry rounded-full" />
                  <div className="w-3 h-3 bg-amber-crt rounded-full" />
                  <div className="w-3 h-3 bg-toxic-slime rounded-full" />
                </div>
                <span className="font-vt323 text-sm text-soda-chrome">BRIDGE.EXE</span>
                <div className="flex items-center space-x-1">
                  <div className="w-4 h-1 bg-soda-chrome/50" />
                  <div className="w-4 h-1 bg-soda-chrome/50" />
                  <div className="w-4 h-1 bg-soda-chrome/50" />
                </div>
              </div>

              {/* Step Indicator */}
              <div className="flex items-center justify-center mb-8">
                {[1, 2, 3].map((stepNum) => (
                  <div key={stepNum} className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-vt323 text-sm border-2 ${
                        step >= stepNum
                          ? "bg-toxic-slime text-midnight-void border-toxic-slime"
                          : "bg-transparent text-soda-chrome border-soda-chrome/50"
                      }`}
                    >
                      {stepNum}
                    </div>
                    {stepNum < 3 && (
                      <div className={`w-12 h-0.5 mx-2 ${step > stepNum ? "bg-toxic-slime" : "bg-soda-chrome/30"}`} />
                    )}
                  </div>
                ))}
              </div>

              {/* Step Content */}
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="text-center mb-6">
                      <h3 className="font-orbitron font-bold text-xl text-ghost-grey mb-2">pick chains</h3>
                      <p className="text-soda-chrome font-vt323 text-sm">select source and destination</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-vt323 text-ghost-grey mb-2">from</label>
                        <Select value={sourceChain} onValueChange={(val) => setSourceChain(val as ChainId)}>
                          <SelectTrigger className="bg-midnight-void border-soda-chrome/50 text-ghost-grey font-vt323">
                            <SelectValue placeholder="select source" />
                          </SelectTrigger>
                          <SelectContent className="bg-midnight-void border-soda-chrome/50">
                            {chains.map((chain) => (
                              <SelectItem key={chain.id} value={chain.id} className="font-vt323">
                                <div className="flex items-center space-x-2">
                                  <span>{chain.icon}</span>
                                  <span>{CHAIN_NAMES[chain.id]}</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="block text-sm font-vt323 text-ghost-grey mb-2">to</label>
                        <Select value={destChain} onValueChange={(val) => setDestChain(val as ChainId)}>
                          <SelectTrigger className="bg-midnight-void border-soda-chrome/50 text-ghost-grey font-vt323">
                            <SelectValue placeholder="select destination" />
                          </SelectTrigger>
                          <SelectContent className="bg-midnight-void border-soda-chrome/50">
                            {chains
                              .filter((chain) => chain.id !== sourceChain)
                              .map((chain) => (
                                <SelectItem key={chain.id} value={chain.id} className="font-vt323">
                                  <div className="flex items-center space-x-2">
                                    <span>{chain.icon}</span>
                                    <span>{CHAIN_NAMES[chain.id]}</span>
                                  </div>
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {sourceChain && (
                      <div className="text-center text-sm font-vt323 text-soda-chrome">
                        balance: {isBalanceLoading ? "loading..." : `${humanBalance} KSM`}
                      </div>
                    )}

                    {canProceedStep1 && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center">
                        <Button
                          onClick={() => setStep(2)}
                          className="bg-toxic-slime text-midnight-void hover:bg-toxic-slime/90 font-vt323 px-8"
                          onMouseEnter={() => playSound("hover")}
                        >
                          next step
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </motion.div>
                    )}
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="text-center mb-6">
                      <h3 className="font-orbitron font-bold text-xl text-ghost-grey mb-2">transfer details</h3>
                      <p className="text-soda-chrome font-vt323 text-sm">specify amount and recipient</p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-vt323 text-ghost-grey mb-2">amount</label>
                        <div className="relative">
                          <Input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="0.0"
                            className="bg-midnight-void border-soda-chrome/50 text-ghost-grey font-vt323 pr-16"
                            step="0.0001"
                            min="0"
                            max={humanBalance}
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              // Set max minus existential deposit
                              const maxAmount = Number(humanBalance) - 0.01
                              setAmount(maxAmount > 0 ? maxAmount.toString() : "0")
                            }}
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-aqua-glitch hover:text-aqua-glitch font-vt323 text-xs"
                          >
                            max
                          </Button>
                        </div>
                        <div className="text-xs font-vt323 text-soda-chrome mt-1">
                          balance: {humanBalance} KSM
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-vt323 text-ghost-grey mb-2">recipient address</label>
                        <Input
                          type="text"
                          value={recipientAddress}
                          onChange={(e) => setRecipientAddress(e.target.value)}
                          placeholder="Enter destination address"
                          className="bg-midnight-void border-soda-chrome/50 text-ghost-grey font-vt323"
                        />
                        <div className="text-xs font-vt323 text-soda-chrome mt-1">
                          must be a valid address on {destChain && CHAIN_NAMES[destChain]}
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <Button
                        onClick={() => setStep(1)}
                        variant="outline"
                        className="border-soda-chrome text-soda-chrome hover:bg-soda-chrome/10 font-vt323 bg-transparent"
                      >
                        back
                      </Button>
                      {canProceedStep2 && (
                        <Button
                          onClick={() => setStep(3)}
                          className="bg-toxic-slime text-midnight-void hover:bg-toxic-slime/90 font-vt323 flex-1"
                          onMouseEnter={() => playSound("hover")}
                        >
                          review transfer
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      )}
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="text-center mb-6">
                      <h3 className="font-orbitron font-bold text-xl text-ghost-grey mb-2">confirm transfer</h3>
                      <p className="text-soda-chrome font-vt323 text-sm">review details before initiating</p>
                    </div>

                    {/* Summary */}
                    <div className="bg-midnight-void/50 border border-soda-chrome/30 rounded p-4 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="font-vt323 text-soda-chrome">route:</span>
                        <div className="flex items-center space-x-2 font-vt323">
                          <span>{sourceChain && CHAIN_NAMES[sourceChain]}</span>
                          <ArrowRight className="w-4 h-4 text-aqua-glitch" />
                          <span>{destChain && CHAIN_NAMES[destChain]}</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-vt323 text-soda-chrome">amount:</span>
                        <span className="font-vt323 text-ghost-grey">{amount} KSM</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-vt323 text-soda-chrome">recipient:</span>
                        <span className="font-vt323 text-ghost-grey text-xs">
                          {recipientAddress.slice(0, 8)}...{recipientAddress.slice(-6)}
                        </span>
                      </div>
                    </div>

                    <div className="text-xs text-soda-chrome font-vt323 bg-amber-crt/10 border border-amber-crt/30 p-3 rounded">
                      xcm teleportation will burn tokens on source chain and mint on destination
                    </div>

                    <div className="flex space-x-3">
                      <Button
                        onClick={() => setStep(2)}
                        variant="outline"
                        className="border-soda-chrome text-soda-chrome hover:bg-soda-chrome/10 font-vt323 bg-transparent"
                        disabled={transferState.isLoading}
                      >
                        back
                      </Button>
                      <Button
                        onClick={handleInitiateJump}
                        disabled={!canInitiateJump || transferState.isLoading}
                        className="bg-toxic-slime text-midnight-void hover:bg-toxic-slime/90 font-vt323 flex-1 font-bold"
                        onMouseEnter={() => playSound("hover")}
                      >
                        <Zap className="w-4 h-4 mr-2" />
                        BRIDGE FUNDS
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>
        )}

        {/* Progress Modal */}
        <AnimatePresence>
          {transferState.isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-midnight-void/80 backdrop-blur-sm flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-midnight-void border-2 border-toxic-slime/50 rounded-lg p-8 max-w-md w-full mx-4"
              >
                <div className="text-center space-y-6">
                  <div className="text-toxic-slime font-orbitron font-bold text-xl">bridging funds...</div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between font-vt323 text-sm">
                      <span className="text-soda-chrome">[ {transferState.status} ]</span>
                    </div>
                    
                    {transferState.txHash && (
                      <div className="text-xs font-vt323 text-aqua-glitch break-all">
                        tx: {transferState.txHash}
                      </div>
                    )}
                  </div>

                  <div className="flex justify-center">
                    <Loader2 className="w-8 h-8 animate-spin text-aqua-glitch" />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success Modal */}
        <AnimatePresence>
          {transferState.status === "finalized" && transferState.txHash && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-midnight-void/80 backdrop-blur-sm flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-midnight-void border-2 border-toxic-slime/50 rounded-lg p-8 max-w-md w-full mx-4"
              >
                <div className="text-center space-y-6">
                  <CheckCircle className="w-16 h-16 text-toxic-slime mx-auto" />
                  <div>
                    <h3 className="font-orbitron font-bold text-xl text-toxic-slime mb-2">transfer successful!</h3>
                    <p className="text-soda-chrome font-vt323 text-sm">tokens teleported across chains</p>
                  </div>

                  <div className="bg-midnight-void/50 border border-soda-chrome/30 rounded p-3">
                    <div className="text-xs font-vt323 text-soda-chrome mb-1">tx hash:</div>
                    <div className="text-xs font-vt323 text-aqua-glitch break-all">{transferState.txHash}</div>
                  </div>

                  <div className="flex space-x-3">
                    <Button
                      onClick={() => window.open(`https://kusama.subscan.io/extrinsic/${transferState.txHash}`, "_blank")}
                      variant="outline"
                      className="border-aqua-glitch text-aqua-glitch hover:bg-aqua-glitch/10 font-vt323 bg-transparent"
                    >
                      view on explorer
                    </Button>
                    <Button
                      onClick={resetFlow}
                      className="bg-toxic-slime text-midnight-void hover:bg-toxic-slime/90 font-vt323 flex-1"
                      onMouseEnter={() => playSound("hover")}
                    >
                      bridge again
                    </Button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error Modal */}
        <AnimatePresence>
          {transferState.error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-midnight-void/80 backdrop-blur-sm flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-midnight-void border-2 border-laser-berry/50 rounded-lg p-8 max-w-md w-full mx-4"
              >
                <div className="text-center space-y-6">
                  <AlertTriangle className="w-16 h-16 text-laser-berry mx-auto" />
                  <div>
                    <h3 className="font-orbitron font-bold text-xl text-laser-berry mb-2">transfer failed</h3>
                    <p className="text-ghost-grey font-vt323 text-sm">{transferState.error}</p>
                  </div>

                  <div className="flex space-x-3">
                    <Button
                      onClick={resetTransfer}
                      variant="outline"
                      className="border-soda-chrome text-soda-chrome hover:bg-soda-chrome/10 font-vt323 bg-transparent"
                      onMouseEnter={() => playSound("hover")}
                    >
                      close
                    </Button>
                    <Button
                      onClick={() => {
                        resetTransfer()
                        handleInitiateJump()
                      }}
                      className="bg-laser-berry text-midnight-void hover:bg-laser-berry/90 font-vt323 flex-1"
                      onMouseEnter={() => playSound("hover")}
                    >
                      retry transfer
                    </Button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Fee Confirmation Dialog */}
        <AnimatePresence>
          {showFeeDialog && transferState.transaction && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-midnight-void/80 backdrop-blur-sm flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-midnight-void border-2 border-toxic-slime/50 rounded-lg p-8 max-w-md w-full mx-4"
              >
                <div className="space-y-6">
                  <div>
                    <h3 className="font-orbitron font-bold text-xl text-toxic-slime mb-2">confirm transfer</h3>
                    <p className="text-soda-chrome font-vt323 text-sm">review fees and submit transaction</p>
                  </div>

                  <div className="bg-midnight-void/50 border border-soda-chrome/30 rounded p-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-vt323 text-soda-chrome">amount:</span>
                      <span className="font-vt323 text-ghost-grey">{amount} KSM</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-vt323 text-soda-chrome">estimated fee:</span>
                      <span className="font-vt323 text-amber-crt">calculating...</span>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <Button
                      onClick={() => {
                        setShowFeeDialog(false)
                        resetTransfer()
                      }}
                      variant="outline"
                      className="border-soda-chrome text-soda-chrome hover:bg-soda-chrome/10 font-vt323 bg-transparent"
                      disabled={transferState.isLoading}
                    >
                      cancel
                    </Button>
                    <Button
                      onClick={handleSubmitTransfer}
                      disabled={transferState.isLoading}
                      className="bg-toxic-slime text-midnight-void hover:bg-toxic-slime/90 font-vt323 flex-1 font-bold"
                    >
                      {transferState.isLoading ? (
                        transferState.status === "signing" ? "signing..." :
                        transferState.status === "broadcasting" ? "broadcasting..." :
                        "processing..."
                      ) : (
                        "submit"
                      )}
                    </Button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}