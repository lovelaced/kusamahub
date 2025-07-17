import type { ChainId, AssetId, Chain } from "./types"
import { ksmRelayChain } from "./api/ksm/relay"
import { ksmAssetHub } from "./api/ksm/ah"

export const CHAIN_NAMES: Record<ChainId, string> = {
  ksm: "Kusama",
  ksmAh: "Asset Hub",
}

export const ASSET_DECIMALS: Record<AssetId, number> = {
  KSM: 12,
}

export const chains: Record<ChainId, Chain> = {
  ksm: {
    name: CHAIN_NAMES.ksm,
    assets: {
      KSM: ksmRelayChain,
    },
  },
  ksmAh: {
    name: CHAIN_NAMES.ksmAh,
    assets: {
      KSM: ksmAssetHub,
    },
  },
}

export const getAssetInChain = (
  chainId: ChainId,
  assetId: AssetId,
) => chains[chainId]?.assets[assetId]