"use client"

import { fromRelayToAssetHub, watchAccoutFreeBalance } from "../../common"
import type { AssetInChain } from "../../types"

// Lazy initialization to avoid SSR issues
let ksmRelayChainInstance: AssetInChain | null = null

export const ksmRelayChain: AssetInChain = {
  chain: "ksm",
  symbol: "KSM",
  get watchFreeBalance() {
    // Lazy load ksmApi only when accessed
    const { ksmApi } = require("../clients/ksm")
    return watchAccoutFreeBalance(ksmApi)
  },
  get teleport() {
    // Lazy load ksmApi only when accessed
    const { ksmApi } = require("../clients/ksm")
    return {
      ksmAh: fromRelayToAssetHub(ksmApi.tx.XcmPallet.transfer_assets),
    }
  },
}