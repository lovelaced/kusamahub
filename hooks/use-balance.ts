"use client"

import { useState, useEffect } from "react"
import { getAssetInChain, type ChainId, type AssetId } from "@/lib/blockchain"
import type { InjectedPolkadotAccount } from "polkadot-api/pjs-signer"

export function useBalance(
  account: InjectedPolkadotAccount | null,
  chainId: ChainId,
  assetId: AssetId
) {
  const [balance, setBalance] = useState<bigint>(0n)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!account || !chainId) {
      setBalance(0n)
      return
    }

    const assetInChain = getAssetInChain(chainId, assetId)
    if (!assetInChain) {
      setError("Asset not found in chain")
      return
    }

    setIsLoading(true)
    setError(null)

    const subscription = assetInChain
      .watchFreeBalance(account.address)
      .subscribe({
        next: (balance: bigint) => {
          setBalance(balance)
          setIsLoading(false)
        },
        error: (err: any) => {
          console.error("Balance error:", err)
          setError(err.message)
          setIsLoading(false)
          setBalance(0n)
        },
      })

    return () => {
      subscription.unsubscribe()
    }
  }, [account?.address, chainId, assetId])

  return { balance, isLoading, error }
}