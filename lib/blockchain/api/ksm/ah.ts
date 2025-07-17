"use client"

import { fromAssetHubToRelay, watchAccoutFreeBalance } from "../../common"
import type { AssetInChain } from "../../types"

export const ksmAssetHub: AssetInChain = {
  chain: "ksmAh",
  symbol: "KSM",
  get watchFreeBalance() {
    // Lazy load ksmAhApi only when accessed
    const { ksmAhApi } = require("../clients/ksmAh")
    return watchAccoutFreeBalance(ksmAhApi)
  },
  get teleport() {
    // Lazy load ksmAhApi only when accessed
    const { ksmAhApi } = require("../clients/ksmAh")
    return {
      ksm: fromAssetHubToRelay(ksmAhApi.tx.PolkadotXcm.transfer_assets),
    }
  },
}