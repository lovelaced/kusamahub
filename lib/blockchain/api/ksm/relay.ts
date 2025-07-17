"use client"

import { ksmApi } from "../clients/ksm"
import { fromRelayToAssetHub, watchAccoutFreeBalance } from "../../common"
import type { AssetInChain } from "../../types"

export const ksmRelayChain: AssetInChain = {
  chain: "ksm",
  symbol: "KSM",
  watchFreeBalance: watchAccoutFreeBalance(ksmApi),
  teleport: {
    ksmAh: fromRelayToAssetHub(ksmApi.tx.XcmPallet.transfer_assets),
  },
}