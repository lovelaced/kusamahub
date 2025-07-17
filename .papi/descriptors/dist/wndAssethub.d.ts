import { StorageDescriptor, PlainDescriptor, TxDescriptor, Enum, ApisFromDef, QueryFromPalletsDef, TxFromPalletsDef, EventsFromPalletsDef, ErrorsFromPalletsDef, ConstFromPalletsDef, ViewFnsFromPalletsDef, SS58String, Binary, FixedSizeBinary, FixedSizeArray } from "polkadot-api";
import { I5sesotjlssv2d, Iag3f1hum3p4c8, I4v5g6i7bmt06o, I21d2olof7eb60, Ibqpfutsmcg63l, If9iqq7i64mur8 } from "./common-types";
type AnonymousEnum<T extends {}> = T & {
    __anonymous: true;
};
type MyTuple<T> = [T, ...T[]];
type SeparateUndefined<T> = undefined extends T ? undefined | Exclude<T, undefined> : T;
type Anonymize<T> = SeparateUndefined<T extends FixedSizeBinary<infer L> ? number extends L ? Binary : FixedSizeBinary<L> : T extends string | number | bigint | boolean | void | undefined | null | symbol | Uint8Array | Enum<any> ? T : T extends AnonymousEnum<infer V> ? Enum<V> : T extends MyTuple<any> ? {
    [K in keyof T]: T[K];
} : T extends [] ? [] : T extends FixedSizeArray<infer L, infer T> ? number extends L ? Array<T> : FixedSizeArray<L, T> : {
    [K in keyof T & string]: T[K];
}>;
type IStorage = {
    System: {
        /**
         * The full account information for a particular account ID.
         */
        Account: StorageDescriptor<[Key: SS58String], Anonymize<I5sesotjlssv2d>, false, never>;
    };
    ForeignAssets: {
        /**
         * The holdings of a specific account for a specific asset.
         */
        Account: StorageDescriptor<Anonymize<I4v5g6i7bmt06o>, Anonymize<Iag3f1hum3p4c8>, true, never>;
    };
};
type ICalls = {
    PolkadotXcm: {
        /**
         * Transfer some assets from the local chain to the destination chain through their local,
         * destination or remote reserve, or through teleports.
         *
         * Fee payment on the destination side is made from the asset in the `assets` vector of
         * index `fee_asset_item` (hence referred to as `fees`), up to enough to pay for
         * `weight_limit` of weight. If more weight is needed than `weight_limit`, then the
         * operation will fail and the sent assets may be at risk.
         *
         * `assets` (excluding `fees`) must have same reserve location or otherwise be teleportable
         * to `dest`, no limitations imposed on `fees`.
         * - for local reserve: transfer assets to sovereign account of destination chain and
         * forward a notification XCM to `dest` to mint and deposit reserve-based assets to
         * `beneficiary`.
         * - for destination reserve: burn local assets and forward a notification to `dest` chain
         * to withdraw the reserve assets from this chain's sovereign account and deposit them
         * to `beneficiary`.
         * - for remote reserve: burn local assets, forward XCM to reserve chain to move reserves
         * from this chain's SA to `dest` chain's SA, and forward another XCM to `dest` to mint
         * and deposit reserve-based assets to `beneficiary`.
         * - for teleports: burn local assets and forward XCM to `dest` chain to mint/teleport
         * assets and deposit them to `beneficiary`.
         *
         * - `origin`: Must be capable of withdrawing the `assets` and executing XCM.
         * - `dest`: Destination context for the assets. Will typically be `X2(Parent,
         * Parachain(..))` to send from parachain to parachain, or `X1(Parachain(..))` to send
         * from relay to parachain.
         * - `beneficiary`: A beneficiary location for the assets in the context of `dest`. Will
         * generally be an `AccountId32` value.
         * - `assets`: The assets to be withdrawn. This should include the assets used to pay the
         * fee on the `dest` (and possibly reserve) chains.
         * - `fee_asset_item`: The index into `assets` of the item which should be used to pay
         * fees.
         * - `weight_limit`: The remote-side weight limit, if any, for the XCM fee purchase.
         */
        transfer_assets: TxDescriptor<Anonymize<I21d2olof7eb60>>;
    };
};
type IEvent = {};
type IError = {};
type IConstants = {
    Balances: {
        /**
         * The minimum amount required to keep an account open. MUST BE GREATER THAN ZERO!
         *
         * If you *really* need it to be zero, you can enable the feature `insecure_zero_ed` for
         * this pallet. However, you do so at your own risk: this will open up a major DoS vector.
         * In case you have multiple sources of provider references, you may also get unexpected
         * behaviour if you set this to zero.
         *
         * Bottom line: Do yourself a favour and make it at least one!
         */
        ExistentialDeposit: PlainDescriptor<bigint>;
    };
};
type IViewFns = {};
type IRuntimeCalls = {};
type IAsset = PlainDescriptor<Anonymize<If9iqq7i64mur8>>;
export type WndAssethubDispatchError = unknown;
type PalletsTypedef = {
    __storage: IStorage;
    __tx: ICalls;
    __event: IEvent;
    __error: IError;
    __const: IConstants;
    __view: IViewFns;
};
type IDescriptors = {
    descriptors: {
        pallets: PalletsTypedef;
        apis: IRuntimeCalls;
    } & Promise<any>;
    metadataTypes: Promise<Uint8Array>;
    asset: IAsset;
    getMetadata: () => Promise<Uint8Array>;
    genesis: string | undefined;
};
declare const _allDescriptors: IDescriptors;
export default _allDescriptors;
export type WndAssethubApis = ApisFromDef<IRuntimeCalls>;
export type WndAssethubQueries = QueryFromPalletsDef<PalletsTypedef>;
export type WndAssethubCalls = TxFromPalletsDef<PalletsTypedef>;
export type WndAssethubEvents = EventsFromPalletsDef<PalletsTypedef>;
export type WndAssethubErrors = ErrorsFromPalletsDef<PalletsTypedef>;
export type WndAssethubConstants = ConstFromPalletsDef<PalletsTypedef>;
export type WndAssethubViewFns = ViewFnsFromPalletsDef<PalletsTypedef>;
export type WndAssethubCallData = Anonymize<Ibqpfutsmcg63l> & {
    value: {
        type: string;
    };
};
export type WndAssethubWhitelistEntry = PalletKey | ApiKey<IRuntimeCalls> | `query.${NestedKey<PalletsTypedef['__storage']>}` | `tx.${NestedKey<PalletsTypedef['__tx']>}` | `event.${NestedKey<PalletsTypedef['__event']>}` | `error.${NestedKey<PalletsTypedef['__error']>}` | `const.${NestedKey<PalletsTypedef['__const']>}` | `view.${NestedKey<PalletsTypedef['__view']>}`;
type PalletKey = `*.${keyof (IStorage & ICalls & IEvent & IError & IConstants & IRuntimeCalls & IViewFns)}`;
type NestedKey<D extends Record<string, Record<string, any>>> = "*" | {
    [P in keyof D & string]: `${P}.*` | {
        [N in keyof D[P] & string]: `${P}.${N}`;
    }[keyof D[P] & string];
}[keyof D & string];
type ApiKey<D extends Record<string, Record<string, any>>> = "api.*" | {
    [P in keyof D & string]: `api.${P}.*` | {
        [N in keyof D[P] & string]: `api.${P}.${N}`;
    }[keyof D[P] & string];
}[keyof D & string];
