import {
  XcmV3Junction,
  XcmV3Junctions,
  XcmVersionedAssets,
  XcmVersionedLocation,
  XcmV3WeightLimit,
  XcmV3MultiassetFungibility,
} from "@polkadot-api/descriptors"
import {
  AccountId,
  Binary,
  PolkadotSigner,
  SS58String,
  Transaction,
} from "polkadot-api"
import { Observable, combineLatest, map, from, catchError, of } from "rxjs"
import type { TeleportAsset } from "./types"

const encodeAccount = AccountId().enc

export const getBeneficiary = (address: string | Uint8Array) =>
  XcmVersionedLocation.V4({
    parents: 0,
    interior: XcmV3Junctions.X1(
      XcmV3Junction.AccountId32({
        network: undefined,
        id: Binary.fromBytes(
          address instanceof Uint8Array ? address : encodeAccount(address),
        ),
      }),
    ),
  })

export const getNativeAsset = (amount: bigint, parents = 0) =>
  XcmVersionedAssets.V4([
    {
      id: {
        parents,
        interior: XcmV3Junctions.Here(),
      },
      fun: XcmV3MultiassetFungibility.Fungible(amount),
    },
  ])

export const watchAccoutFreeBalance = (api: {
  query: {
    System: {
      Account: {
        watchValue: (account: string, flag?: string) => Observable<any>
      }
    }
  }
  constants: {
    Balances: {
      ExistentialDeposit: () => Promise<bigint>
    }
  }
}) => {
  const edPromise = api.constants.Balances.ExistentialDeposit()
  return (account: string) =>
    combineLatest([
      from(edPromise),
      api.query.System.Account.watchValue(account, "best").pipe(
        catchError((error) => {
          console.error("Error watching account balance:", error)
          return of({ data: { free: 0n, frozen: 0n, reserved: 0n } })
        })
      ),
    ]).pipe(
      map(([ed, { data }]) => {
        const spendableBalance =
          data.free -
          (data.frozen - data.reserved > ed ? data.frozen - data.reserved : ed)
        return spendableBalance > 0n ? spendableBalance : 0n
      }),
      catchError((error) => {
        console.error("Error calculating balance:", error)
        return of(0n)
      })
    )
}

type TransferAssetsArgs = {
  dest: XcmVersionedLocation
  beneficiary: XcmVersionedLocation
  assets: XcmVersionedAssets
  fee_asset_item: number
  weight_limit?: XcmV3WeightLimit
}

export const fromRelayToAssetHub =
  (
    fn: (
      data: TransferAssetsArgs,
    ) => Transaction<any, any, any, any>,
  ): TeleportAsset =>
  (from: PolkadotSigner, amount: bigint, to?: SS58String) => {
    const dest = XcmVersionedLocation.V4({
      parents: 0,
      interior: XcmV3Junctions.X1(XcmV3Junction.Parachain(1000)),
    })

    const beneficiary = getBeneficiary(to ?? from.publicKey)
    const assets = getNativeAsset(amount)

    return fn({
      dest,
      beneficiary,
      assets,
      fee_asset_item: 0,
      weight_limit: XcmV3WeightLimit.Unlimited(),
    })
  }

export const fromAssetHubToRelay =
  (
    fn: (
      data: TransferAssetsArgs,
    ) => Transaction<any, any, any, any>,
  ): TeleportAsset =>
  (from: PolkadotSigner, amount: bigint, to?: SS58String) => {
    const dest = XcmVersionedLocation.V4({
      parents: 1,
      interior: XcmV3Junctions.Here(),
    })

    const beneficiary = getBeneficiary(to ?? from.publicKey)
    const assets = getNativeAsset(amount, 1)

    return fn({
      dest,
      beneficiary,
      assets,
      fee_asset_item: 0,
      weight_limit: XcmV3WeightLimit.Unlimited(),
    })
  }