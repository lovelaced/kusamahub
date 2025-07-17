"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { 
  getInjectedExtensions, 
  connectInjectedExtension,
  type InjectedPolkadotAccount 
} from "polkadot-api/pjs-signer"

interface ExtensionContextType {
  extensions: string[]
  selectedExtension: string | null
  setSelectedExtension: (extension: string | null) => void
  accounts: InjectedPolkadotAccount[]
  isConnecting: boolean
}

const ExtensionContext = createContext<ExtensionContextType | null>(null)

export function ExtensionProvider({ children }: { children: React.ReactNode }) {
  const [extensions, setExtensions] = useState<string[]>([])
  const [selectedExtension, setSelectedExtension] = useState<string | null>(null)
  const [accounts, setAccounts] = useState<InjectedPolkadotAccount[]>([])
  const [isConnecting, setIsConnecting] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return
    
    const injectedExtensions = getInjectedExtensions()
    setExtensions(injectedExtensions)
    
    // Auto-connect if only one extension is available
    if (injectedExtensions.length === 1) {
      setSelectedExtension(injectedExtensions[0])
    }
  }, [])

  useEffect(() => {
    if (!selectedExtension) {
      setAccounts([])
      return
    }

    let disconnectAccounts: (() => void) | null = null
    setIsConnecting(true)

    connectInjectedExtension(selectedExtension)
      .then((extension) => {
        disconnectAccounts = extension.subscribe((accounts) => {
          setAccounts(accounts)
          setIsConnecting(false)
        })
      })
      .catch((error) => {
        console.error("Failed to connect extension:", error)
        setIsConnecting(false)
      })

    return () => {
      disconnectAccounts?.()
    }
  }, [selectedExtension])

  return (
    <ExtensionContext.Provider
      value={{
        extensions,
        selectedExtension,
        setSelectedExtension,
        accounts,
        isConnecting,
      }}
    >
      {children}
    </ExtensionContext.Provider>
  )
}

export function useExtension() {
  const context = useContext(ExtensionContext)
  if (!context) {
    throw new Error("useExtension must be used within ExtensionProvider")
  }
  return context
}