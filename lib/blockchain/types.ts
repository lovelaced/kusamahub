import type { PolkadotSigner, SS58String, Transaction } from "polkadot-api"
import type { Observable } from "rxjs"

export type ChainId = "ksm" | "ksmAh"
export type AssetId = "KSM"

export type TeleportAsset = (
  from: PolkadotSigner,
  amount: bigint,
  to?: SS58String,
) => Transaction<any, any, any, any>

export interface AssetInChain {
  chain: ChainId
  symbol: string
  watchFreeBalance: (address: string) => Observable<bigint>
  teleport?: Record<ChainId, TeleportAsset>
}

export interface Chain {
  name: string
  assets: Record<AssetId, AssetInChain>
}