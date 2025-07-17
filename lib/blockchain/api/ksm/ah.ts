"use client"

import { ksmAhApi } from "../clients/ksmAh"
import { fromAssetHubToRelay, watchAccoutFreeBalance } from "../../common"
import type { AssetInChain } from "../../types"

export const ksmAssetHub: AssetInChain = {
  chain: "ksmAh",
  symbol: "KSM",
  watchFreeBalance: watchAccoutFreeBalance(ksmAhApi),
  teleport: {
    ksm: fromAssetHubToRelay(ksmAhApi.tx.PolkadotXcm.transfer_assets),
  },
}