"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Wallet, Power, ChevronDown, Copy, ExternalLink, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useExtension } from "@/contexts/extension-context"
import { useSoundContext } from "@/components/sound-provider"
import type { InjectedPolkadotAccount } from "polkadot-api/pjs-signer"

export function WalletConnection() {
  const { playSound } = useSoundContext()
  const { extensions, selectedExtension, setSelectedExtension, accounts, isConnecting } = useExtension()
  const [selectedAccount, setSelectedAccount] = useState<InjectedPolkadotAccount | null>(null)
  const [copied, setCopied] = useState(false)
  const [glitchEffect, setGlitchEffect] = useState(false)

  // Auto-select first account when accounts change
  useEffect(() => {
    if (accounts.length > 0 && !selectedAccount) {
      setSelectedAccount(accounts[0])
    } else if (accounts.length === 0) {
      setSelectedAccount(null)
    }
  }, [accounts, selectedAccount])

  // Auto-connect if only one extension is available
  useEffect(() => {
    if (extensions.length === 1 && !selectedExtension) {
      setSelectedExtension(extensions[0])
    }
  }, [extensions, selectedExtension, setSelectedExtension])

  const handleCopyAddress = async () => {
    if (!selectedAccount) return
    
    try {
      await navigator.clipboard.writeText(selectedAccount.address)
      setCopied(true)
      playSound("click")
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error("Failed to copy address:", error)
    }
  }

  const handleDisconnect = () => {
    setSelectedExtension(null)
    setSelectedAccount(null)
    playSound("click")
  }

  const handleAccountSwitch = (account: InjectedPolkadotAccount) => {
    setSelectedAccount(account)
    playSound("click")
  }

  const handleConnect = () => {
    setGlitchEffect(true)
    playSound("click")
    setTimeout(() => setGlitchEffect(false), 300)
    
    if (extensions.length === 1) {
      setSelectedExtension(extensions[0])
    }
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  // No wallet detected
  if (extensions.length === 0) {
    return (
      <Button
        variant="outline"
        className="border-amber-crt text-amber-crt hover:bg-amber-crt/10 font-vt323"
        onClick={() => window.open("https://polkadot.js.org/extension/", "_blank")}
        onMouseEnter={() => playSound("hover")}
      >
        <Wallet className="w-4 h-4 mr-2" />
        install wallet
      </Button>
    )
  }

  // Wallet connected with account
  if (selectedAccount) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="bg-toxic-slime/10 border-toxic-slime text-toxic-slime hover:bg-toxic-slime/20 font-vt323 group"
            onMouseEnter={() => playSound("hover")}
          >
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-toxic-slime rounded-full animate-pulse" />
              <span className="hidden sm:inline">{selectedAccount.name || "Unnamed"}</span>
              <span className="text-xs opacity-70">{formatAddress(selectedAccount.address)}</span>
              <ChevronDown className="w-4 h-4 transition-transform group-data-[state=open]:rotate-180" />
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          align="end" 
          className="w-64 bg-midnight-void/95 border-toxic-slime/50 backdrop-blur-sm"
        >
          <DropdownMenuLabel className="font-vt323 text-toxic-slime">
            wallet control panel
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-toxic-slime/20" />
          
          {/* Current Account Info */}
          <div className="px-2 py-3 space-y-2">
            <div className="text-xs font-vt323 text-soda-chrome">active account</div>
            <div className="bg-midnight-void/50 border border-soda-chrome/30 rounded p-2">
              <div className="font-vt323 text-ghost-grey">{selectedAccount.name || "Unnamed"}</div>
              <div className="font-vt323 text-xs text-soda-chrome/70 mt-1">
                {selectedAccount.address}
              </div>
            </div>
          </div>

          {/* Account Actions */}
          <DropdownMenuItem
            className="font-vt323 cursor-pointer hover:bg-toxic-slime/10 hover:text-toxic-slime"
            onClick={handleCopyAddress}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-2" />
                copy address
              </>
            )}
          </DropdownMenuItem>

          <DropdownMenuItem
            className="font-vt323 cursor-pointer hover:bg-aqua-glitch/10 hover:text-aqua-glitch"
            onClick={() => window.open(`https://kusama.subscan.io/account/${selectedAccount.address}`, "_blank")}
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            view on explorer
          </DropdownMenuItem>

          {/* Switch Account */}
          {accounts.length > 1 && (
            <>
              <DropdownMenuSeparator className="bg-toxic-slime/20" />
              <DropdownMenuLabel className="font-vt323 text-soda-chrome text-xs">
                switch account
              </DropdownMenuLabel>
              {accounts
                .filter((acc) => acc.address !== selectedAccount.address)
                .map((account) => (
                  <DropdownMenuItem
                    key={account.address}
                    className="font-vt323 cursor-pointer hover:bg-toxic-slime/10 hover:text-toxic-slime"
                    onClick={() => handleAccountSwitch(account)}
                  >
                    <div className="flex flex-col">
                      <span>{account.name || "Unnamed"}</span>
                      <span className="text-xs opacity-60">{formatAddress(account.address)}</span>
                    </div>
                  </DropdownMenuItem>
                ))}
            </>
          )}

          <DropdownMenuSeparator className="bg-toxic-slime/20" />
          
          {/* Disconnect */}
          <DropdownMenuItem
            className="font-vt323 cursor-pointer hover:bg-laser-berry/10 hover:text-laser-berry"
            onClick={handleDisconnect}
          >
            <Power className="w-4 h-4 mr-2" />
            disconnect
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  // Multiple wallets detected, need selection
  if (extensions.length > 1 && !selectedExtension) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className={`bg-toxic-slime text-midnight-void hover:bg-toxic-slime/90 font-vt323 font-bold ${
              glitchEffect ? "animate-glitch" : ""
            }`}
            onMouseEnter={() => playSound("hover")}
          >
            <Wallet className="w-4 h-4 mr-2" />
            jack in
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          align="end" 
          className="w-56 bg-midnight-void/95 border-toxic-slime/50 backdrop-blur-sm"
        >
          <DropdownMenuLabel className="font-vt323 text-toxic-slime">
            select wallet
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-toxic-slime/20" />
          {extensions.map((ext) => (
            <DropdownMenuItem
              key={ext}
              className="font-vt323 cursor-pointer hover:bg-toxic-slime/10 hover:text-toxic-slime"
              onClick={() => {
                setSelectedExtension(ext)
                playSound("click")
              }}
            >
              <Wallet className="w-4 h-4 mr-2" />
              {ext}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  // Connecting or single wallet
  return (
    <Button
      className={`bg-toxic-slime text-midnight-void hover:bg-toxic-slime/90 font-vt323 font-bold ${
        glitchEffect ? "animate-glitch" : ""
      }`}
      onClick={handleConnect}
      onMouseEnter={() => playSound("hover")}
      disabled={isConnecting}
    >
      <Wallet className="w-4 h-4 mr-2" />
      {isConnecting ? "connecting..." : "jack in"}
    </Button>
  )
}