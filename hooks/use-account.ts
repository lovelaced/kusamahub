"use client"

import { useState, useEffect } from "react"
import { useExtension } from "@/contexts/extension-context"
import type { InjectedPolkadotAccount } from "polkadot-api/pjs-signer"

export function useAccount() {
  const { accounts } = useExtension()
  const [selectedAccount, setSelectedAccount] = useState<InjectedPolkadotAccount | null>(null)

  // Auto-select first account when accounts change
  useEffect(() => {
    if (accounts.length > 0 && !selectedAccount) {
      setSelectedAccount(accounts[0])
    } else if (accounts.length === 0) {
      setSelectedAccount(null)
    }
  }, [accounts, selectedAccount])

  return {
    accounts,
    selectedAccount,
    setSelectedAccount,
  }
}