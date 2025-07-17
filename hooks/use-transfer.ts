"use client"

import { useState } from "react"
import { getAssetInChain, type ChainId, type AssetId } from "@/lib/blockchain"
import type { InjectedPolkadotAccount } from "polkadot-api/pjs-signer"
import type { Transaction } from "polkadot-api"

export interface TransferState {
  isLoading: boolean
  error: string | null
  txHash: string | null
  status: "idle" | "preparing" | "signing" | "broadcasting" | "finalized" | "error"
  transaction: Transaction<any, any, any, any> | null
}

export function useTransfer() {
  const [state, setState] = useState<TransferState>({
    isLoading: false,
    error: null,
    txHash: null,
    status: "idle",
    transaction: null,
  })

  const prepareTransfer = async (
    from: InjectedPolkadotAccount,
    to: string,
    amount: bigint,
    sourceChain: ChainId,
    destChain: ChainId,
    assetId: AssetId
  ) => {
    setState({
      isLoading: true,
      error: null,
      txHash: null,
      status: "preparing",
      transaction: null,
    })

    try {
      const assetInChain = getAssetInChain(sourceChain, assetId)
      if (!assetInChain) {
        throw new Error(`Asset ${assetId} not found in chain ${sourceChain}`)
      }

      if (!assetInChain.teleport?.[destChain]) {
        throw new Error(`Cannot teleport from ${sourceChain} to ${destChain}`)
      }

      // Get the transaction
      const tx = await assetInChain.teleport[destChain](
        from.polkadotSigner,
        amount,
        to
      )

      setState({
        isLoading: false,
        error: null,
        txHash: null,
        status: "idle",
        transaction: tx,
      })

      return tx
    } catch (error) {
      setState({
        isLoading: false,
        error: error instanceof Error ? error.message : "Unknown error",
        txHash: null,
        status: "error",
        transaction: null,
      })
      throw error
    }
  }

  const submitTransfer = async (account: InjectedPolkadotAccount) => {
    if (!state.transaction) {
      throw new Error("No transaction prepared")
    }

    setState(prev => ({
      ...prev,
      isLoading: true,
      status: "signing",
    }))

    try {
      const subscription = state.transaction
        .signSubmitAndWatch(account.polkadotSigner)
        .subscribe({
          next: (event) => {
            switch (event.type) {
              case "signed":
                setState(prev => ({
                  ...prev,
                  status: "signing",
                }))
                break
              case "broadcasted":
                setState(prev => ({
                  ...prev,
                  status: "broadcasting",
                  txHash: event.txHash,
                }))
                break
              case "finalized":
                setState({
                  isLoading: false,
                  error: null,
                  txHash: event.txHash,
                  status: "finalized",
                  transaction: null,
                })
                subscription.unsubscribe()
                break
            }
          },
          error: (error: any) => {
            setState({
              isLoading: false,
              error: error.message || "Transaction failed",
              txHash: null,
              status: "error",
              transaction: null,
            })
          },
        })

      return () => subscription.unsubscribe()
    } catch (error) {
      setState({
        isLoading: false,
        error: error instanceof Error ? error.message : "Unknown error",
        txHash: null,
        status: "error",
        transaction: null,
      })
      throw error
    }
  }

  const reset = () => {
    setState({
      isLoading: false,
      error: null,
      txHash: null,
      status: "idle",
      transaction: null,
    })
  }

  return { prepareTransfer, submitTransfer, state, reset }
}