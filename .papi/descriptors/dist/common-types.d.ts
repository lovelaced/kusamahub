import { Enum, GetEnum, FixedSizeBinary, FixedSizeArray, Binary, SS58String, TxCallData } from "polkadot-api";
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
export type I5sesotjlssv2d = {
    "nonce": number;
    "consumers": number;
    "providers": number;
    "sufficients": number;
    "data": {
        "free": bigint;
        "reserved": bigint;
        "frozen": bigint;
        "flags": bigint;
    };
};
export type I6oe33imdmifj5 = AnonymousEnum<{
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
    "transfer_assets": Anonymize<I21d2olof7eb60>;
}>;
export type I21d2olof7eb60 = {
    "dest": XcmVersionedLocation;
    "beneficiary": XcmVersionedLocation;
    "assets": XcmVersionedAssets;
    "fee_asset_item": number;
    "weight_limit": XcmV3WeightLimit;
};
export type XcmVersionedLocation = Enum<{
    "V3": Anonymize<I4c0s5cioidn76>;
    "V4": Anonymize<I4c0s5cioidn76>;
    "V5": Anonymize<If9iqq7i64mur8>;
}>;
export declare const XcmVersionedLocation: GetEnum<XcmVersionedLocation>;
export type I4c0s5cioidn76 = {
    "parents": number;
    "interior": XcmV3Junctions;
};
export type XcmV3Junctions = Enum<{
    "Here": undefined;
    "X1": XcmV3Junction;
    "X2": FixedSizeArray<2, XcmV3Junction>;
    "X3": FixedSizeArray<3, XcmV3Junction>;
    "X4": FixedSizeArray<4, XcmV3Junction>;
    "X5": FixedSizeArray<5, XcmV3Junction>;
    "X6": FixedSizeArray<6, XcmV3Junction>;
    "X7": FixedSizeArray<7, XcmV3Junction>;
    "X8": FixedSizeArray<8, XcmV3Junction>;
}>;
export declare const XcmV3Junctions: GetEnum<XcmV3Junctions>;
export type XcmV3Junction = Enum<{
    "Parachain": number;
    "AccountId32": {
        "network"?: Anonymize<Idcq3vns9tgp5p>;
        "id": FixedSizeBinary<32>;
    };
    "AccountIndex64": {
        "network"?: Anonymize<Idcq3vns9tgp5p>;
        "index": bigint;
    };
    "AccountKey20": {
        "network"?: Anonymize<Idcq3vns9tgp5p>;
        "key": FixedSizeBinary<20>;
    };
    "PalletInstance": number;
    "GeneralIndex": bigint;
    "GeneralKey": Anonymize<I15lht6t53odo4>;
    "OnlyChild": undefined;
    "Plurality": Anonymize<I518fbtnclg1oc>;
    "GlobalConsensus": XcmV3JunctionNetworkId;
}>;
export declare const XcmV3Junction: GetEnum<XcmV3Junction>;
export type Idcq3vns9tgp5p = (XcmV3JunctionNetworkId) | undefined;
export type XcmV3JunctionNetworkId = Enum<{
    "ByGenesis": FixedSizeBinary<32>;
    "ByFork": Anonymize<I15vf5oinmcgps>;
    "Polkadot": undefined;
    "Kusama": undefined;
    "Westend": undefined;
    "Rococo": undefined;
    "Wococo": undefined;
    "Ethereum": Anonymize<I623eo8t3jrbeo>;
    "BitcoinCore": undefined;
    "BitcoinCash": undefined;
    "PolkadotBulletin": undefined;
}>;
export declare const XcmV3JunctionNetworkId: GetEnum<XcmV3JunctionNetworkId>;
export type I15vf5oinmcgps = {
    "block_number": bigint;
    "block_hash": FixedSizeBinary<32>;
};
export type I623eo8t3jrbeo = {
    "chain_id": bigint;
};
export type I15lht6t53odo4 = {
    "length": number;
    "data": FixedSizeBinary<32>;
};
export type I518fbtnclg1oc = {
    "id": XcmV3JunctionBodyId;
    "part": XcmV2JunctionBodyPart;
};
export type XcmV3JunctionBodyId = Enum<{
    "Unit": undefined;
    "Moniker": FixedSizeBinary<4>;
    "Index": number;
    "Executive": undefined;
    "Technical": undefined;
    "Legislative": undefined;
    "Judicial": undefined;
    "Defense": undefined;
    "Administration": undefined;
    "Treasury": undefined;
}>;
export declare const XcmV3JunctionBodyId: GetEnum<XcmV3JunctionBodyId>;
export type XcmV2JunctionBodyPart = Enum<{
    "Voice": undefined;
    "Members": Anonymize<Iafscmv8tjf0ou>;
    "Fraction": {
        "nom": number;
        "denom": number;
    };
    "AtLeastProportion": {
        "nom": number;
        "denom": number;
    };
    "MoreThanProportion": {
        "nom": number;
        "denom": number;
    };
}>;
export declare const XcmV2JunctionBodyPart: GetEnum<XcmV2JunctionBodyPart>;
export type Iafscmv8tjf0ou = {
    "count": number;
};
export type If9iqq7i64mur8 = {
    "parents": number;
    "interior": XcmV5Junctions;
};
export type XcmV5Junctions = Enum<{
    "Here": undefined;
    "X1": XcmV5Junction;
    "X2": FixedSizeArray<2, XcmV5Junction>;
    "X3": FixedSizeArray<3, XcmV5Junction>;
    "X4": FixedSizeArray<4, XcmV5Junction>;
    "X5": FixedSizeArray<5, XcmV5Junction>;
    "X6": FixedSizeArray<6, XcmV5Junction>;
    "X7": FixedSizeArray<7, XcmV5Junction>;
    "X8": FixedSizeArray<8, XcmV5Junction>;
}>;
export declare const XcmV5Junctions: GetEnum<XcmV5Junctions>;
export type XcmV5Junction = Enum<{
    "Parachain": number;
    "AccountId32": {
        "network"?: Anonymize<I97pd2rst02a7r>;
        "id": FixedSizeBinary<32>;
    };
    "AccountIndex64": {
        "network"?: Anonymize<I97pd2rst02a7r>;
        "index": bigint;
    };
    "AccountKey20": {
        "network"?: Anonymize<I97pd2rst02a7r>;
        "key": FixedSizeBinary<20>;
    };
    "PalletInstance": number;
    "GeneralIndex": bigint;
    "GeneralKey": Anonymize<I15lht6t53odo4>;
    "OnlyChild": undefined;
    "Plurality": Anonymize<I518fbtnclg1oc>;
    "GlobalConsensus": XcmV5NetworkId;
}>;
export declare const XcmV5Junction: GetEnum<XcmV5Junction>;
export type I97pd2rst02a7r = (XcmV5NetworkId) | undefined;
export type XcmV5NetworkId = Enum<{
    "ByGenesis": FixedSizeBinary<32>;
    "ByFork": Anonymize<I15vf5oinmcgps>;
    "Polkadot": undefined;
    "Kusama": undefined;
    "Ethereum": Anonymize<I623eo8t3jrbeo>;
    "BitcoinCore": undefined;
    "BitcoinCash": undefined;
    "PolkadotBulletin": undefined;
}>;
export declare const XcmV5NetworkId: GetEnum<XcmV5NetworkId>;
export type XcmVersionedAssets = Enum<{
    "V3": Anonymize<Iai6dhqiq3bach>;
    "V4": Anonymize<I50mli3hb64f9b>;
    "V5": Anonymize<I4npjalvhmfuj>;
}>;
export declare const XcmVersionedAssets: GetEnum<XcmVersionedAssets>;
export type Iai6dhqiq3bach = Array<Anonymize<Idcm24504c8bkk>>;
export type Idcm24504c8bkk = {
    "id": XcmV3MultiassetAssetId;
    "fun": XcmV3MultiassetFungibility;
};
export type XcmV3MultiassetAssetId = Enum<{
    "Concrete": Anonymize<I4c0s5cioidn76>;
    "Abstract": FixedSizeBinary<32>;
}>;
export declare const XcmV3MultiassetAssetId: GetEnum<XcmV3MultiassetAssetId>;
export type XcmV3MultiassetFungibility = Enum<{
    "Fungible": bigint;
    "NonFungible": XcmV3MultiassetAssetInstance;
}>;
export declare const XcmV3MultiassetFungibility: GetEnum<XcmV3MultiassetFungibility>;
export type XcmV3MultiassetAssetInstance = Enum<{
    "Undefined": undefined;
    "Index": bigint;
    "Array4": FixedSizeBinary<4>;
    "Array8": FixedSizeBinary<8>;
    "Array16": FixedSizeBinary<16>;
    "Array32": FixedSizeBinary<32>;
}>;
export declare const XcmV3MultiassetAssetInstance: GetEnum<XcmV3MultiassetAssetInstance>;
export type I50mli3hb64f9b = Array<Anonymize<Ia5l7mu5a6v49o>>;
export type Ia5l7mu5a6v49o = {
    "id": Anonymize<I4c0s5cioidn76>;
    "fun": XcmV3MultiassetFungibility;
};
export type I4npjalvhmfuj = Array<Anonymize<Iffh1nc5e1mod6>>;
export type Iffh1nc5e1mod6 = {
    "id": Anonymize<If9iqq7i64mur8>;
    "fun": XcmV3MultiassetFungibility;
};
export type XcmV3WeightLimit = Enum<{
    "Unlimited": undefined;
    "Limited": Anonymize<I4q39t5hn830vp>;
}>;
export declare const XcmV3WeightLimit: GetEnum<XcmV3WeightLimit>;
export type I4q39t5hn830vp = {
    "ref_time": bigint;
    "proof_size": bigint;
};
export type I1ut1enje04g2m = AnonymousEnum<{
    "System": Anonymize<Iekve0i6djpd9f>;
    "Babe": Anonymize<I1jeo0dpbkma5g>;
    "Timestamp": Anonymize<I7d75gqfg6jh9c>;
    "Indices": Anonymize<I67ac6i6ihmvpt>;
    "Balances": Anonymize<I9svldsp29mh87>;
    "Staking": Anonymize<Icm294co91mkfj>;
    "Parameters": Enum<{
        /**
         * Set the value of a parameter.
         *
         * The dispatch origin of this call must be `AdminOrigin` for the given `key`. Values be
         * deleted by setting them to `None`.
         */
        "set_parameter": {
            "key_value": Enum<{
                "Inflation": Anonymize<I5t0545elr3mi1>;
            }>;
        };
    }>;
    "Session": Anonymize<Iceajactc9a8pc>;
    "Grandpa": Anonymize<I5u9ggmn8umfqm>;
    "Utility": Enum<{
        /**
         * Send a batch of dispatch calls.
         *
         * May be called from any origin except `None`.
         *
         * - `calls`: The calls to be dispatched from the same origin. The number of call must not
         * exceed the constant: `batched_calls_limit` (available in constant metadata).
         *
         * If origin is root then the calls are dispatched without checking origin filter. (This
         * includes bypassing `frame_system::Config::BaseCallFilter`).
         *
         * ## Complexity
         * - O(C) where C is the number of calls to be batched.
         *
         * This will return `Ok` in all circumstances. To determine the success of the batch, an
         * event is deposited. If a call failed and the batch was interrupted, then the
         * `BatchInterrupted` event is deposited, along with the number of successful calls made
         * and the error of the failed call. If all were successful, then the `BatchCompleted`
         * event is deposited.
         */
        "batch": {
            "calls": Array<TxCallData>;
        };
        /**
         * Send a call through an indexed pseudonym of the sender.
         *
         * Filter from origin are passed along. The call will be dispatched with an origin which
         * use the same filter as the origin of this call.
         *
         * NOTE: If you need to ensure that any account-based filtering is not honored (i.e.
         * because you expect `proxy` to have been used prior in the call stack and you do not want
         * the call restrictions to apply to any sub-accounts), then use `as_multi_threshold_1`
         * in the Multisig pallet instead.
         *
         * NOTE: Prior to version *12, this was called `as_limited_sub`.
         *
         * The dispatch origin for this call must be _Signed_.
         */
        "as_derivative": {
            "index": number;
            "call": TxCallData;
        };
        /**
         * Send a batch of dispatch calls and atomically execute them.
         * The whole transaction will rollback and fail if any of the calls failed.
         *
         * May be called from any origin except `None`.
         *
         * - `calls`: The calls to be dispatched from the same origin. The number of call must not
         * exceed the constant: `batched_calls_limit` (available in constant metadata).
         *
         * If origin is root then the calls are dispatched without checking origin filter. (This
         * includes bypassing `frame_system::Config::BaseCallFilter`).
         *
         * ## Complexity
         * - O(C) where C is the number of calls to be batched.
         */
        "batch_all": {
            "calls": Array<TxCallData>;
        };
        /**
         * Dispatches a function call with a provided origin.
         *
         * The dispatch origin for this call must be _Root_.
         *
         * ## Complexity
         * - O(1).
         */
        "dispatch_as": {
            "as_origin": Anonymize<I16qqgglq4ega1>;
            "call": TxCallData;
        };
        /**
         * Send a batch of dispatch calls.
         * Unlike `batch`, it allows errors and won't interrupt.
         *
         * May be called from any origin except `None`.
         *
         * - `calls`: The calls to be dispatched from the same origin. The number of call must not
         * exceed the constant: `batched_calls_limit` (available in constant metadata).
         *
         * If origin is root then the calls are dispatch without checking origin filter. (This
         * includes bypassing `frame_system::Config::BaseCallFilter`).
         *
         * ## Complexity
         * - O(C) where C is the number of calls to be batched.
         */
        "force_batch": {
            "calls": Array<TxCallData>;
        };
        /**
         * Dispatch a function call with a specified weight.
         *
         * This function does not check the weight of the call, and instead allows the
         * Root origin to specify the weight of the call.
         *
         * The dispatch origin for this call must be _Root_.
         */
        "with_weight": Anonymize<I8jelntdlnkiac>;
        /**
         * Dispatch a fallback call in the event the main call fails to execute.
         * May be called from any origin except `None`.
         *
         * This function first attempts to dispatch the `main` call.
         * If the `main` call fails, the `fallback` is attemted.
         * if the fallback is successfully dispatched, the weights of both calls
         * are accumulated and an event containing the main call error is deposited.
         *
         * In the event of a fallback failure the whole call fails
         * with the weights returned.
         *
         * - `main`: The main call to be dispatched. This is the primary action to execute.
         * - `fallback`: The fallback call to be dispatched in case the `main` call fails.
         *
         * ## Dispatch Logic
         * - If the origin is `root`, both the main and fallback calls are executed without
         * applying any origin filters.
         * - If the origin is not `root`, the origin filter is applied to both the `main` and
         * `fallback` calls.
         *
         * ## Use Case
         * - Some use cases might involve submitting a `batch` type call in either main, fallback
         * or both.
         */
        "if_else": {
            "main": TxCallData;
            "fallback": TxCallData;
        };
        /**
         * Dispatches a function call with a provided origin.
         *
         * Almost the same as [`Pallet::dispatch_as`] but forwards any error of the inner call.
         *
         * The dispatch origin for this call must be _Root_.
         */
        "dispatch_as_fallible": {
            "as_origin": Anonymize<I16qqgglq4ega1>;
            "call": TxCallData;
        };
    }>;
    "Identity": Enum<{
        /**
         * Add a registrar to the system.
         *
         * The dispatch origin for this call must be `T::RegistrarOrigin`.
         *
         * - `account`: the account of the registrar.
         *
         * Emits `RegistrarAdded` if successful.
         */
        "add_registrar": Anonymize<Ic6cqd9g0t65v0>;
        /**
         * Set an account's identity information and reserve the appropriate deposit.
         *
         * If the account already has identity information, the deposit is taken as part payment
         * for the new deposit.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * - `info`: The identity information.
         *
         * Emits `IdentitySet` if successful.
         */
        "set_identity": {
            "info": {
                "additional": Array<FixedSizeArray<2, IdentityData>>;
                "display": IdentityData;
                "legal": IdentityData;
                "web": IdentityData;
                "riot": IdentityData;
                "email": IdentityData;
                "pgp_fingerprint"?: (FixedSizeBinary<20>) | undefined;
                "image": IdentityData;
                "twitter": IdentityData;
            };
        };
        /**
         * Set the sub-accounts of the sender.
         *
         * Payment: Any aggregate balance reserved by previous `set_subs` calls will be returned
         * and an amount `SubAccountDeposit` will be reserved for each item in `subs`.
         *
         * The dispatch origin for this call must be _Signed_ and the sender must have a registered
         * identity.
         *
         * - `subs`: The identity's (new) sub-accounts.
         */
        "set_subs": {
            "subs": Array<[SS58String, IdentityData]>;
        };
        /**
         * Clear an account's identity info and all sub-accounts and return all deposits.
         *
         * Payment: All reserved balances on the account are returned.
         *
         * The dispatch origin for this call must be _Signed_ and the sender must have a registered
         * identity.
         *
         * Emits `IdentityCleared` if successful.
         */
        "clear_identity": undefined;
        /**
         * Request a judgement from a registrar.
         *
         * Payment: At most `max_fee` will be reserved for payment to the registrar if judgement
         * given.
         *
         * The dispatch origin for this call must be _Signed_ and the sender must have a
         * registered identity.
         *
         * - `reg_index`: The index of the registrar whose judgement is requested.
         * - `max_fee`: The maximum fee that may be paid. This should just be auto-populated as:
         *
         * ```nocompile
         * Registrars::<T>::get().get(reg_index).unwrap().fee
         * ```
         *
         * Emits `JudgementRequested` if successful.
         */
        "request_judgement": {
            "reg_index": number;
            "max_fee": bigint;
        };
        /**
         * Cancel a previous request.
         *
         * Payment: A previously reserved deposit is returned on success.
         *
         * The dispatch origin for this call must be _Signed_ and the sender must have a
         * registered identity.
         *
         * - `reg_index`: The index of the registrar whose judgement is no longer requested.
         *
         * Emits `JudgementUnrequested` if successful.
         */
        "cancel_request": {
            "reg_index": number;
        };
        /**
         * Set the fee required for a judgement to be requested from a registrar.
         *
         * The dispatch origin for this call must be _Signed_ and the sender must be the account
         * of the registrar whose index is `index`.
         *
         * - `index`: the index of the registrar whose fee is to be set.
         * - `fee`: the new fee.
         */
        "set_fee": {
            "index": number;
            "fee": bigint;
        };
        /**
         * Change the account associated with a registrar.
         *
         * The dispatch origin for this call must be _Signed_ and the sender must be the account
         * of the registrar whose index is `index`.
         *
         * - `index`: the index of the registrar whose fee is to be set.
         * - `new`: the new account ID.
         */
        "set_account_id": Anonymize<I6o1er683vod1j>;
        /**
         * Set the field information for a registrar.
         *
         * The dispatch origin for this call must be _Signed_ and the sender must be the account
         * of the registrar whose index is `index`.
         *
         * - `index`: the index of the registrar whose fee is to be set.
         * - `fields`: the fields that the registrar concerns themselves with.
         */
        "set_fields": {
            "index": number;
            "fields": bigint;
        };
        /**
         * Provide a judgement for an account's identity.
         *
         * The dispatch origin for this call must be _Signed_ and the sender must be the account
         * of the registrar whose index is `reg_index`.
         *
         * - `reg_index`: the index of the registrar whose judgement is being made.
         * - `target`: the account whose identity the judgement is upon. This must be an account
         * with a registered identity.
         * - `judgement`: the judgement of the registrar of index `reg_index` about `target`.
         * - `identity`: The hash of the [`IdentityInformationProvider`] for that the judgement is
         * provided.
         *
         * Note: Judgements do not apply to a username.
         *
         * Emits `JudgementGiven` if successful.
         */
        "provide_judgement": {
            "reg_index": number;
            "target": MultiAddress;
            "judgement": IdentityJudgement;
            "identity": FixedSizeBinary<32>;
        };
        /**
         * Remove an account's identity and sub-account information and slash the deposits.
         *
         * Payment: Reserved balances from `set_subs` and `set_identity` are slashed and handled by
         * `Slash`. Verification request deposits are not returned; they should be cancelled
         * manually using `cancel_request`.
         *
         * The dispatch origin for this call must match `T::ForceOrigin`.
         *
         * - `target`: the account whose identity the judgement is upon. This must be an account
         * with a registered identity.
         *
         * Emits `IdentityKilled` if successful.
         */
        "kill_identity": Anonymize<Id9uqtigc0il3v>;
        /**
         * Add the given account to the sender's subs.
         *
         * Payment: Balance reserved by a previous `set_subs` call for one sub will be repatriated
         * to the sender.
         *
         * The dispatch origin for this call must be _Signed_ and the sender must have a registered
         * sub identity of `sub`.
         */
        "add_sub": {
            "sub": MultiAddress;
            "data": IdentityData;
        };
        /**
         * Alter the associated name of the given sub-account.
         *
         * The dispatch origin for this call must be _Signed_ and the sender must have a registered
         * sub identity of `sub`.
         */
        "rename_sub": {
            "sub": MultiAddress;
            "data": IdentityData;
        };
        /**
         * Remove the given account from the sender's subs.
         *
         * Payment: Balance reserved by a previous `set_subs` call for one sub will be repatriated
         * to the sender.
         *
         * The dispatch origin for this call must be _Signed_ and the sender must have a registered
         * sub identity of `sub`.
         */
        "remove_sub": {
            "sub": MultiAddress;
        };
        /**
         * Remove the sender as a sub-account.
         *
         * Payment: Balance reserved by a previous `set_subs` call for one sub will be repatriated
         * to the sender (*not* the original depositor).
         *
         * The dispatch origin for this call must be _Signed_ and the sender must have a registered
         * super-identity.
         *
         * NOTE: This should not normally be used, but is provided in the case that the non-
         * controller of an account is maliciously registered as a sub-account.
         */
        "quit_sub": undefined;
        /**
         * Add an `AccountId` with permission to grant usernames with a given `suffix` appended.
         *
         * The authority can grant up to `allocation` usernames. To top up the allocation or
         * change the account used to grant usernames, this call can be used with the updated
         * parameters to overwrite the existing configuration.
         */
        "add_username_authority": {
            "authority": MultiAddress;
            "suffix": Binary;
            "allocation": number;
        };
        /**
         * Remove `authority` from the username authorities.
         */
        "remove_username_authority": {
            "suffix": Binary;
            "authority": MultiAddress;
        };
        /**
         * Set the username for `who`. Must be called by a username authority.
         *
         * If `use_allocation` is set, the authority must have a username allocation available to
         * spend. Otherwise, the authority will need to put up a deposit for registering the
         * username.
         *
         * Users can either pre-sign their usernames or
         * accept them later.
         *
         * Usernames must:
         * - Only contain lowercase ASCII characters or digits.
         * - When combined with the suffix of the issuing authority be _less than_ the
         * `MaxUsernameLength`.
         */
        "set_username_for": {
            "who": MultiAddress;
            "username": Binary;
            "signature"?: Anonymize<I86cdjmsf3a81s>;
            "use_allocation": boolean;
        };
        /**
         * Accept a given username that an `authority` granted. The call must include the full
         * username, as in `username.suffix`.
         */
        "accept_username": {
            "username": Binary;
        };
        /**
         * Remove an expired username approval. The username was approved by an authority but never
         * accepted by the user and must now be beyond its expiration. The call must include the
         * full username, as in `username.suffix`.
         */
        "remove_expired_approval": {
            "username": Binary;
        };
        /**
         * Set a given username as the primary. The username should include the suffix.
         */
        "set_primary_username": {
            "username": Binary;
        };
        /**
         * Start the process of removing a username by placing it in the unbinding usernames map.
         * Once the grace period has passed, the username can be deleted by calling
         * [remove_username](crate::Call::remove_username).
         */
        "unbind_username": {
            "username": Binary;
        };
        /**
         * Permanently delete a username which has been unbinding for longer than the grace period.
         * Caller is refunded the fee if the username expired and the removal was successful.
         */
        "remove_username": {
            "username": Binary;
        };
        /**
         * Call with [ForceOrigin](crate::Config::ForceOrigin) privileges which deletes a username
         * and slashes any deposit associated with it.
         */
        "kill_username": {
            "username": Binary;
        };
    }>;
    "Recovery": Enum<{
        /**
         * Send a call through a recovered account.
         *
         * The dispatch origin for this call must be _Signed_ and registered to
         * be able to make calls on behalf of the recovered account.
         *
         * Parameters:
         * - `account`: The recovered account you want to make a call on-behalf-of.
         * - `call`: The call you want to make with the recovered account.
         */
        "as_recovered": {
            "account": MultiAddress;
            "call": TxCallData;
        };
        /**
         * Allow ROOT to bypass the recovery process and set a rescuer account
         * for a lost account directly.
         *
         * The dispatch origin for this call must be _ROOT_.
         *
         * Parameters:
         * - `lost`: The "lost account" to be recovered.
         * - `rescuer`: The "rescuer account" which can call as the lost account.
         */
        "set_recovered": Anonymize<I7pqmhr25d3dqq>;
        /**
         * Create a recovery configuration for your account. This makes your account recoverable.
         *
         * Payment: `ConfigDepositBase` + `FriendDepositFactor` * #_of_friends balance
         * will be reserved for storing the recovery configuration. This deposit is returned
         * in full when the user calls `remove_recovery`.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * Parameters:
         * - `friends`: A list of friends you trust to vouch for recovery attempts. Should be
         * ordered and contain no duplicate values.
         * - `threshold`: The number of friends that must vouch for a recovery attempt before the
         * account can be recovered. Should be less than or equal to the length of the list of
         * friends.
         * - `delay_period`: The number of blocks after a recovery attempt is initialized that
         * needs to pass before the account can be recovered.
         */
        "create_recovery": Anonymize<I6s6ihmfj6j5qq>;
        /**
         * Initiate the process for recovering a recoverable account.
         *
         * Payment: `RecoveryDeposit` balance will be reserved for initiating the
         * recovery process. This deposit will always be repatriated to the account
         * trying to be recovered. See `close_recovery`.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * Parameters:
         * - `account`: The lost account that you want to recover. This account needs to be
         * recoverable (i.e. have a recovery configuration).
         */
        "initiate_recovery": Anonymize<Ic6cqd9g0t65v0>;
        /**
         * Allow a "friend" of a recoverable account to vouch for an active recovery
         * process for that account.
         *
         * The dispatch origin for this call must be _Signed_ and must be a "friend"
         * for the recoverable account.
         *
         * Parameters:
         * - `lost`: The lost account that you want to recover.
         * - `rescuer`: The account trying to rescue the lost account that you want to vouch for.
         *
         * The combination of these two parameters must point to an active recovery
         * process.
         */
        "vouch_recovery": Anonymize<I7pqmhr25d3dqq>;
        /**
         * Allow a successful rescuer to claim their recovered account.
         *
         * The dispatch origin for this call must be _Signed_ and must be a "rescuer"
         * who has successfully completed the account recovery process: collected
         * `threshold` or more vouches, waited `delay_period` blocks since initiation.
         *
         * Parameters:
         * - `account`: The lost account that you want to claim has been successfully recovered by
         * you.
         */
        "claim_recovery": Anonymize<Ic6cqd9g0t65v0>;
        /**
         * As the controller of a recoverable account, close an active recovery
         * process for your account.
         *
         * Payment: By calling this function, the recoverable account will receive
         * the recovery deposit `RecoveryDeposit` placed by the rescuer.
         *
         * The dispatch origin for this call must be _Signed_ and must be a
         * recoverable account with an active recovery process for it.
         *
         * Parameters:
         * - `rescuer`: The account trying to rescue this recoverable account.
         */
        "close_recovery": Anonymize<I7ka1pdlbuevh2>;
        /**
         * Remove the recovery process for your account. Recovered accounts are still accessible.
         *
         * NOTE: The user must make sure to call `close_recovery` on all active
         * recovery attempts before calling this function else it will fail.
         *
         * Payment: By calling this function the recoverable account will unreserve
         * their recovery configuration deposit.
         * (`ConfigDepositBase` + `FriendDepositFactor` * #_of_friends)
         *
         * The dispatch origin for this call must be _Signed_ and must be a
         * recoverable account (i.e. has a recovery configuration).
         */
        "remove_recovery": undefined;
        /**
         * Cancel the ability to use `as_recovered` for `account`.
         *
         * The dispatch origin for this call must be _Signed_ and registered to
         * be able to make calls on behalf of the recovered account.
         *
         * Parameters:
         * - `account`: The recovered account you are able to call on-behalf-of.
         */
        "cancel_recovered": Anonymize<Ic6cqd9g0t65v0>;
        /**
         * Poke deposits for recovery configurations and / or active recoveries.
         *
         * This can be used by accounts to possibly lower their locked amount.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * Parameters:
         * - `maybe_account`: Optional recoverable account for which you have an active recovery
         * and want to adjust the deposit for the active recovery.
         *
         * This function checks both recovery configuration deposit and active recovery deposits
         * of the caller:
         * - If the caller has created a recovery configuration, checks and adjusts its deposit
         * - If the caller has initiated any active recoveries, and provides the account in
         * `maybe_account`, checks and adjusts those deposits
         *
         * If any deposit is updated, the difference will be reserved/unreserved from the caller's
         * account.
         *
         * The transaction is made free if any deposit is updated and paid otherwise.
         *
         * Emits `DepositPoked` if any deposit is updated.
         * Multiple events may be emitted in case both types of deposits are updated.
         */
        "poke_deposit": {
            "maybe_account"?: Anonymize<Ia0jlc0rcbskuk>;
        };
    }>;
    "Vesting": Anonymize<Icgf8vmtkbnu4u>;
    "Scheduler": Enum<{
        /**
         * Anonymously schedule a task.
         */
        "schedule": {
            "when": number;
            "maybe_periodic"?: Anonymize<Iep7au1720bm0e>;
            "priority": number;
            "call": TxCallData;
        };
        /**
         * Cancel an anonymously scheduled task.
         */
        "cancel": Anonymize<I5n4sebgkfr760>;
        /**
         * Schedule a named task.
         */
        "schedule_named": {
            "id": FixedSizeBinary<32>;
            "when": number;
            "maybe_periodic"?: Anonymize<Iep7au1720bm0e>;
            "priority": number;
            "call": TxCallData;
        };
        /**
         * Cancel a named scheduled task.
         */
        "cancel_named": Anonymize<Ifs1i5fk9cqvr6>;
        /**
         * Anonymously schedule a task after a delay.
         */
        "schedule_after": {
            "after": number;
            "maybe_periodic"?: Anonymize<Iep7au1720bm0e>;
            "priority": number;
            "call": TxCallData;
        };
        /**
         * Schedule a named task after a delay.
         */
        "schedule_named_after": {
            "id": FixedSizeBinary<32>;
            "after": number;
            "maybe_periodic"?: Anonymize<Iep7au1720bm0e>;
            "priority": number;
            "call": TxCallData;
        };
        /**
         * Set a retry configuration for a task so that, in case its scheduled run fails, it will
         * be retried after `period` blocks, for a total amount of `retries` retries or until it
         * succeeds.
         *
         * Tasks which need to be scheduled for a retry are still subject to weight metering and
         * agenda space, same as a regular task. If a periodic task fails, it will be scheduled
         * normally while the task is retrying.
         *
         * Tasks scheduled as a result of a retry for a periodic task are unnamed, non-periodic
         * clones of the original task. Their retry configuration will be derived from the
         * original task's configuration, but will have a lower value for `remaining` than the
         * original `total_retries`.
         */
        "set_retry": Anonymize<Ieg3fd8p4pkt10>;
        /**
         * Set a retry configuration for a named task so that, in case its scheduled run fails, it
         * will be retried after `period` blocks, for a total amount of `retries` retries or until
         * it succeeds.
         *
         * Tasks which need to be scheduled for a retry are still subject to weight metering and
         * agenda space, same as a regular task. If a periodic task fails, it will be scheduled
         * normally while the task is retrying.
         *
         * Tasks scheduled as a result of a retry for a periodic task are unnamed, non-periodic
         * clones of the original task. Their retry configuration will be derived from the
         * original task's configuration, but will have a lower value for `remaining` than the
         * original `total_retries`.
         */
        "set_retry_named": Anonymize<I8kg5ll427kfqq>;
        /**
         * Removes the retry configuration of a task.
         */
        "cancel_retry": Anonymize<I467333262q1l9>;
        /**
         * Cancel the retry configuration of a named task.
         */
        "cancel_retry_named": Anonymize<Ifs1i5fk9cqvr6>;
    }>;
    "Preimage": Anonymize<If81ks88t5mpk5>;
    "Sudo": Enum<{
        /**
         * Authenticates the sudo key and dispatches a function call with `Root` origin.
         */
        "sudo": Anonymize<If1sr4hm0el5a0>;
        /**
         * Authenticates the sudo key and dispatches a function call with `Root` origin.
         * This function does not check the weight of the call, and instead allows the
         * Sudo user to specify the weight of the call.
         *
         * The dispatch origin for this call must be _Signed_.
         */
        "sudo_unchecked_weight": Anonymize<I8jelntdlnkiac>;
        /**
         * Authenticates the current sudo key and sets the given AccountId (`new`) as the new sudo
         * key.
         */
        "set_key": Anonymize<I8k3rnvpeeh4hv>;
        /**
         * Authenticates the sudo key and dispatches a function call with `Signed` origin from
         * a given account.
         *
         * The dispatch origin for this call must be _Signed_.
         */
        "sudo_as": {
            "who": MultiAddress;
            "call": TxCallData;
        };
        /**
         * Permanently removes the sudo key.
         *
         * **This cannot be un-done.**
         */
        "remove_key": undefined;
    }>;
    "Proxy": Enum<{
        /**
         * Dispatch the given `call` from an account that the sender is authorised for through
         * `add_proxy`.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * Parameters:
         * - `real`: The account that the proxy will make a call on behalf of.
         * - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
         * - `call`: The call to be made by the `real` account.
         */
        "proxy": {
            "real": MultiAddress;
            "force_proxy_type"?: Anonymize<If6gdn1v27431a>;
            "call": TxCallData;
        };
        /**
         * Register a proxy account for the sender that is able to make calls on its behalf.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * Parameters:
         * - `proxy`: The account that the `caller` would like to make a proxy.
         * - `proxy_type`: The permissions allowed for this proxy account.
         * - `delay`: The announcement period required of the initial proxy. Will generally be
         * zero.
         */
        "add_proxy": {
            "delegate": MultiAddress;
            "proxy_type": Anonymize<I4usd2cn59lcla>;
            "delay": number;
        };
        /**
         * Unregister a proxy account for the sender.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * Parameters:
         * - `proxy`: The account that the `caller` would like to remove as a proxy.
         * - `proxy_type`: The permissions currently enabled for the removed proxy account.
         */
        "remove_proxy": {
            "delegate": MultiAddress;
            "proxy_type": Anonymize<I4usd2cn59lcla>;
            "delay": number;
        };
        /**
         * Unregister all proxy accounts for the sender.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * WARNING: This may be called on accounts created by `create_pure`, however if done, then
         * the unreserved fees will be inaccessible. **All access to this account will be lost.**
         */
        "remove_proxies": undefined;
        /**
         * Spawn a fresh new account that is guaranteed to be otherwise inaccessible, and
         * initialize it with a proxy of `proxy_type` for `origin` sender.
         *
         * Requires a `Signed` origin.
         *
         * - `proxy_type`: The type of the proxy that the sender will be registered as over the
         * new account. This will almost always be the most permissive `ProxyType` possible to
         * allow for maximum flexibility.
         * - `index`: A disambiguation index, in case this is called multiple times in the same
         * transaction (e.g. with `utility::batch`). Unless you're using `batch` you probably just
         * want to use `0`.
         * - `delay`: The announcement period required of the initial proxy. Will generally be
         * zero.
         *
         * Fails with `Duplicate` if this has already been called in this transaction, from the
         * same sender, with the same parameters.
         *
         * Fails if there are insufficient funds to pay for deposit.
         */
        "create_pure": {
            "proxy_type": Anonymize<I4usd2cn59lcla>;
            "delay": number;
            "index": number;
        };
        /**
         * Removes a previously spawned pure proxy.
         *
         * WARNING: **All access to this account will be lost.** Any funds held in it will be
         * inaccessible.
         *
         * Requires a `Signed` origin, and the sender account must have been created by a call to
         * `create_pure` with corresponding parameters.
         *
         * - `spawner`: The account that originally called `create_pure` to create this account.
         * - `index`: The disambiguation index originally passed to `create_pure`. Probably `0`.
         * - `proxy_type`: The proxy type originally passed to `create_pure`.
         * - `height`: The height of the chain when the call to `create_pure` was processed.
         * - `ext_index`: The extrinsic index in which the call to `create_pure` was processed.
         *
         * Fails with `NoPermission` in case the caller is not a previously created pure
         * account whose `create_pure` call has corresponding parameters.
         */
        "kill_pure": {
            "spawner": MultiAddress;
            "proxy_type": Anonymize<I4usd2cn59lcla>;
            "index": number;
            "height": number;
            "ext_index": number;
        };
        /**
         * Publish the hash of a proxy-call that will be made in the future.
         *
         * This must be called some number of blocks before the corresponding `proxy` is attempted
         * if the delay associated with the proxy relationship is greater than zero.
         *
         * No more than `MaxPending` announcements may be made at any one time.
         *
         * This will take a deposit of `AnnouncementDepositFactor` as well as
         * `AnnouncementDepositBase` if there are no other pending announcements.
         *
         * The dispatch origin for this call must be _Signed_ and a proxy of `real`.
         *
         * Parameters:
         * - `real`: The account that the proxy will make a call on behalf of.
         * - `call_hash`: The hash of the call to be made by the `real` account.
         */
        "announce": Anonymize<I2eb501t8s6hsq>;
        /**
         * Remove a given announcement.
         *
         * May be called by a proxy account to remove a call they previously announced and return
         * the deposit.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * Parameters:
         * - `real`: The account that the proxy will make a call on behalf of.
         * - `call_hash`: The hash of the call to be made by the `real` account.
         */
        "remove_announcement": Anonymize<I2eb501t8s6hsq>;
        /**
         * Remove the given announcement of a delegate.
         *
         * May be called by a target (proxied) account to remove a call that one of their delegates
         * (`delegate`) has announced they want to execute. The deposit is returned.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * Parameters:
         * - `delegate`: The account that previously announced the call.
         * - `call_hash`: The hash of the call to be made.
         */
        "reject_announcement": Anonymize<Ianmuoljk2sk1u>;
        /**
         * Dispatch the given `call` from an account that the sender is authorized for through
         * `add_proxy`.
         *
         * Removes any corresponding announcement(s).
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * Parameters:
         * - `real`: The account that the proxy will make a call on behalf of.
         * - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
         * - `call`: The call to be made by the `real` account.
         */
        "proxy_announced": {
            "delegate": MultiAddress;
            "real": MultiAddress;
            "force_proxy_type"?: Anonymize<If6gdn1v27431a>;
            "call": TxCallData;
        };
        /**
         * Poke / Adjust deposits made for proxies and announcements based on current values.
         * This can be used by accounts to possibly lower their locked amount.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * The transaction fee is waived if the deposit amount has changed.
         *
         * Emits `DepositPoked` if successful.
         */
        "poke_deposit": undefined;
    }>;
    "Multisig": Enum<{
        /**
         * Immediately dispatch a multi-signature call using a single approval from the caller.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * - `other_signatories`: The accounts (other than the sender) who are part of the
         * multi-signature, but do not participate in the approval process.
         * - `call`: The call to be executed.
         *
         * Result is equivalent to the dispatched result.
         *
         * ## Complexity
         * O(Z + C) where Z is the length of the call and C its execution weight.
         */
        "as_multi_threshold_1": {
            "other_signatories": Anonymize<Ia2lhg7l2hilo3>;
            "call": TxCallData;
        };
        /**
         * Register approval for a dispatch to be made from a deterministic composite account if
         * approved by a total of `threshold - 1` of `other_signatories`.
         *
         * If there are enough, then dispatch the call.
         *
         * Payment: `DepositBase` will be reserved if this is the first approval, plus
         * `threshold` times `DepositFactor`. It is returned once this dispatch happens or
         * is cancelled.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * - `threshold`: The total number of approvals for this dispatch before it is executed.
         * - `other_signatories`: The accounts (other than the sender) who can approve this
         * dispatch. May not be empty.
         * - `maybe_timepoint`: If this is the first approval, then this must be `None`. If it is
         * not the first approval, then it must be `Some`, with the timepoint (block number and
         * transaction index) of the first approval transaction.
         * - `call`: The call to be executed.
         *
         * NOTE: Unless this is the final approval, you will generally want to use
         * `approve_as_multi` instead, since it only requires a hash of the call.
         *
         * Result is equivalent to the dispatched result if `threshold` is exactly `1`. Otherwise
         * on success, result is `Ok` and the result from the interior call, if it was executed,
         * may be found in the deposited `MultisigExecuted` event.
         *
         * ## Complexity
         * - `O(S + Z + Call)`.
         * - Up to one balance-reserve or unreserve operation.
         * - One passthrough operation, one insert, both `O(S)` where `S` is the number of
         * signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
         * - One call encode & hash, both of complexity `O(Z)` where `Z` is tx-len.
         * - One encode & hash, both of complexity `O(S)`.
         * - Up to one binary search and insert (`O(logS + S)`).
         * - I/O: 1 read `O(S)`, up to 1 mutate `O(S)`. Up to one remove.
         * - One event.
         * - The weight of the `call`.
         * - Storage: inserts one item, value size bounded by `MaxSignatories`, with a deposit
         * taken for its lifetime of `DepositBase + threshold * DepositFactor`.
         */
        "as_multi": {
            "threshold": number;
            "other_signatories": Anonymize<Ia2lhg7l2hilo3>;
            "maybe_timepoint"?: Anonymize<I95jfd8j5cr5eh>;
            "call": TxCallData;
            "max_weight": Anonymize<I4q39t5hn830vp>;
        };
        /**
         * Register approval for a dispatch to be made from a deterministic composite account if
         * approved by a total of `threshold - 1` of `other_signatories`.
         *
         * Payment: `DepositBase` will be reserved if this is the first approval, plus
         * `threshold` times `DepositFactor`. It is returned once this dispatch happens or
         * is cancelled.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * - `threshold`: The total number of approvals for this dispatch before it is executed.
         * - `other_signatories`: The accounts (other than the sender) who can approve this
         * dispatch. May not be empty.
         * - `maybe_timepoint`: If this is the first approval, then this must be `None`. If it is
         * not the first approval, then it must be `Some`, with the timepoint (block number and
         * transaction index) of the first approval transaction.
         * - `call_hash`: The hash of the call to be executed.
         *
         * NOTE: If this is the final approval, you will want to use `as_multi` instead.
         *
         * ## Complexity
         * - `O(S)`.
         * - Up to one balance-reserve or unreserve operation.
         * - One passthrough operation, one insert, both `O(S)` where `S` is the number of
         * signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
         * - One encode & hash, both of complexity `O(S)`.
         * - Up to one binary search and insert (`O(logS + S)`).
         * - I/O: 1 read `O(S)`, up to 1 mutate `O(S)`. Up to one remove.
         * - One event.
         * - Storage: inserts one item, value size bounded by `MaxSignatories`, with a deposit
         * taken for its lifetime of `DepositBase + threshold * DepositFactor`.
         */
        "approve_as_multi": Anonymize<Ideaemvoneh309>;
        /**
         * Cancel a pre-existing, on-going multisig transaction. Any deposit reserved previously
         * for this operation will be unreserved on success.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * - `threshold`: The total number of approvals for this dispatch before it is executed.
         * - `other_signatories`: The accounts (other than the sender) who can approve this
         * dispatch. May not be empty.
         * - `timepoint`: The timepoint (block number and transaction index) of the first approval
         * transaction for this dispatch.
         * - `call_hash`: The hash of the call to be executed.
         *
         * ## Complexity
         * - `O(S)`.
         * - Up to one balance-reserve or unreserve operation.
         * - One passthrough operation, one insert, both `O(S)` where `S` is the number of
         * signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
         * - One encode & hash, both of complexity `O(S)`.
         * - One event.
         * - I/O: 1 read `O(S)`, one remove.
         * - Storage: removes one item.
         */
        "cancel_as_multi": Anonymize<I3d9o9d7epp66v>;
        /**
         * Poke the deposit reserved for an existing multisig operation.
         *
         * The dispatch origin for this call must be _Signed_ and must be the original depositor of
         * the multisig operation.
         *
         * The transaction fee is waived if the deposit amount has changed.
         *
         * - `threshold`: The total number of approvals needed for this multisig.
         * - `other_signatories`: The accounts (other than the sender) who are part of the
         * multisig.
         * - `call_hash`: The hash of the call this deposit is reserved for.
         *
         * Emits `DepositPoked` if successful.
         */
        "poke_deposit": Anonymize<I6lqh1vgb4mcja>;
    }>;
    "ElectionProviderMultiPhase": Enum<{
        /**
         * Submit a solution for the unsigned phase.
         *
         * The dispatch origin fo this call must be __none__.
         *
         * This submission is checked on the fly. Moreover, this unsigned solution is only
         * validated when submitted to the pool from the **local** node. Effectively, this means
         * that only active validators can submit this transaction when authoring a block (similar
         * to an inherent).
         *
         * To prevent any incorrect solution (and thus wasted time/weight), this transaction will
         * panic if the solution submitted by the validator is invalid in any way, effectively
         * putting their authoring reward at risk.
         *
         * No deposit or reward is associated with this submission.
         */
        "submit_unsigned": Anonymize<I31k9f0jol8ko4>;
        /**
         * Set a new value for `MinimumUntrustedScore`.
         *
         * Dispatch origin must be aligned with `T::ForceOrigin`.
         *
         * This check can be turned off by setting the value to `None`.
         */
        "set_minimum_untrusted_score": Anonymize<I80q14um2s2ckg>;
        /**
         * Set a solution in the queue, to be handed out to the client of this pallet in the next
         * call to `ElectionProvider::elect`.
         *
         * This can only be set by `T::ForceOrigin`, and only when the phase is `Emergency`.
         *
         * The solution is not checked for any feasibility and is assumed to be trustworthy, as any
         * feasibility check itself can in principle cause the election process to fail (due to
         * memory/weight constrains).
         */
        "set_emergency_election_result": Anonymize<I5qs1t1erfi7u8>;
        /**
         * Submit a solution for the signed phase.
         *
         * The dispatch origin fo this call must be __signed__.
         *
         * The solution is potentially queued, based on the claimed score and processed at the end
         * of the signed phase.
         *
         * A deposit is reserved and recorded for the solution. Based on the outcome, the solution
         * might be rewarded, slashed, or get all or a part of the deposit back.
         */
        "submit": Anonymize<I9et13knvdvgpb>;
        /**
         * Trigger the governance fallback.
         *
         * This can only be called when [`Phase::Emergency`] is enabled, as an alternative to
         * calling [`Call::set_emergency_election_result`].
         */
        "governance_fallback": undefined;
    }>;
    "VoterList": Anonymize<Ifvfo1l0vu2o7e>;
    "NominationPools": Anonymize<I57mljkkr28m9p>;
    "FastUnstake": Anonymize<I44snhj1gahvrd>;
    "ConvictionVoting": Anonymize<Ie5kd08tutk56t>;
    "Referenda": Enum<{
        /**
         * Propose a referendum on a privileged action.
         *
         * - `origin`: must be `SubmitOrigin` and the account must have `SubmissionDeposit` funds
         * available.
         * - `proposal_origin`: The origin from which the proposal should be executed.
         * - `proposal`: The proposal.
         * - `enactment_moment`: The moment that the proposal should be enacted.
         *
         * Emits `Submitted`.
         */
        "submit": {
            "proposal_origin": Anonymize<I16qqgglq4ega1>;
            "proposal": PreimagesBounded;
            "enactment_moment": TraitsScheduleDispatchTime;
        };
        /**
         * Post the Decision Deposit for a referendum.
         *
         * - `origin`: must be `Signed` and the account must have funds available for the
         * referendum's track's Decision Deposit.
         * - `index`: The index of the submitted referendum whose Decision Deposit is yet to be
         * posted.
         *
         * Emits `DecisionDepositPlaced`.
         */
        "place_decision_deposit": Anonymize<I666bl2fqjkejo>;
        /**
         * Refund the Decision Deposit for a closed referendum back to the depositor.
         *
         * - `origin`: must be `Signed` or `Root`.
         * - `index`: The index of a closed referendum whose Decision Deposit has not yet been
         * refunded.
         *
         * Emits `DecisionDepositRefunded`.
         */
        "refund_decision_deposit": Anonymize<I666bl2fqjkejo>;
        /**
         * Cancel an ongoing referendum.
         *
         * - `origin`: must be the `CancelOrigin`.
         * - `index`: The index of the referendum to be cancelled.
         *
         * Emits `Cancelled`.
         */
        "cancel": Anonymize<I666bl2fqjkejo>;
        /**
         * Cancel an ongoing referendum and slash the deposits.
         *
         * - `origin`: must be the `KillOrigin`.
         * - `index`: The index of the referendum to be cancelled.
         *
         * Emits `Killed` and `DepositSlashed`.
         */
        "kill": Anonymize<I666bl2fqjkejo>;
        /**
         * Advance a referendum onto its next logical state. Only used internally.
         *
         * - `origin`: must be `Root`.
         * - `index`: the referendum to be advanced.
         */
        "nudge_referendum": Anonymize<I666bl2fqjkejo>;
        /**
         * Advance a track onto its next logical state. Only used internally.
         *
         * - `origin`: must be `Root`.
         * - `track`: the track to be advanced.
         *
         * Action item for when there is now one fewer referendum in the deciding phase and the
         * `DecidingCount` is not yet updated. This means that we should either:
         * - begin deciding another referendum (and leave `DecidingCount` alone); or
         * - decrement `DecidingCount`.
         */
        "one_fewer_deciding": Anonymize<Icbio0e1f0034b>;
        /**
         * Refund the Submission Deposit for a closed referendum back to the depositor.
         *
         * - `origin`: must be `Signed` or `Root`.
         * - `index`: The index of a closed referendum whose Submission Deposit has not yet been
         * refunded.
         *
         * Emits `SubmissionDepositRefunded`.
         */
        "refund_submission_deposit": Anonymize<I666bl2fqjkejo>;
        /**
         * Set or clear metadata of a referendum.
         *
         * Parameters:
         * - `origin`: Must be `Signed` by a creator of a referendum or by anyone to clear a
         * metadata of a finished referendum.
         * - `index`:  The index of a referendum to set or clear metadata for.
         * - `maybe_hash`: The hash of an on-chain stored preimage. `None` to clear a metadata.
         */
        "set_metadata": Anonymize<I8c0vkqjjipnuj>;
    }>;
    "Whitelist": Enum<{
        "whitelist_call": Anonymize<I1adbcfi5uc62r>;
        "remove_whitelisted_call": Anonymize<I1adbcfi5uc62r>;
        "dispatch_whitelisted_call": Anonymize<Ibf6ucefn8fh49>;
        "dispatch_whitelisted_call_with_preimage": Anonymize<If1sr4hm0el5a0>;
    }>;
    "Treasury": Anonymize<I6jnp85onk3m8j>;
    "Configuration": Anonymize<I3ah0kpgrv4i88>;
    "ParasShared": undefined;
    "ParaInclusion": undefined;
    "ParaInherent": Anonymize<I1nu19212e8egv>;
    "Paras": Enum<{
        /**
         * Set the storage for the parachain validation code immediately.
         */
        "force_set_current_code": Anonymize<I1k3urvkqqshbc>;
        /**
         * Set the storage for the current parachain head data immediately.
         */
        "force_set_current_head": Anonymize<I2ff0ffsh15vej>;
        /**
         * Schedule an upgrade as if it was scheduled in the given relay parent block.
         */
        "force_schedule_code_upgrade": Anonymize<I1orfg86bkg123>;
        /**
         * Note a new block head for para within the context of the current block.
         */
        "force_note_new_head": Anonymize<I2ff0ffsh15vej>;
        /**
         * Put a parachain directly into the next session's action queue.
         * We can't queue it any sooner than this without going into the
         * initializer...
         */
        "force_queue_action": Anonymize<Iaus4cb3drhu9q>;
        /**
         * Adds the validation code to the storage.
         *
         * The code will not be added if it is already present. Additionally, if PVF pre-checking
         * is running for that code, it will be instantly accepted.
         *
         * Otherwise, the code will be added into the storage. Note that the code will be added
         * into storage with reference count 0. This is to account the fact that there are no users
         * for this code yet. The caller will have to make sure that this code eventually gets
         * used by some parachain or removed from the storage to avoid storage leaks. For the
         * latter prefer to use the `poke_unused_validation_code` dispatchable to raw storage
         * manipulation.
         *
         * This function is mainly meant to be used for upgrading parachains that do not follow
         * the go-ahead signal while the PVF pre-checking feature is enabled.
         */
        "add_trusted_validation_code": Anonymize<Ivnsat10lv9d6>;
        /**
         * Remove the validation code from the storage iff the reference count is 0.
         *
         * This is better than removing the storage directly, because it will not remove the code
         * that was suddenly got used by some parachain while this dispatchable was pending
         * dispatching.
         */
        "poke_unused_validation_code": Anonymize<Ibncli8qttt2c2>;
        /**
         * Includes a statement for a PVF pre-checking vote. Potentially, finalizes the vote and
         * enacts the results if that was the last vote before achieving the supermajority.
         */
        "include_pvf_check_statement": Anonymize<I33rft6ag34efs>;
        /**
         * Set the storage for the current parachain head data immediately.
         */
        "force_set_most_recent_context": Anonymize<I9tmok5kceg2bg>;
        /**
         * Remove an upgrade cooldown for a parachain.
         *
         * The cost for removing the cooldown earlier depends on the time left for the cooldown
         * multiplied by [`Config::CooldownRemovalMultiplier`]. The paid tokens are burned.
         */
        "remove_upgrade_cooldown": Anonymize<Iaus4cb3drhu9q>;
        /**
         * Sets the storage for the authorized current code hash of the parachain.
         * If not applied, it will be removed at the `System::block_number() + valid_period` block.
         *
         * This can be useful, when triggering `Paras::force_set_current_code(para, code)`
         * from a different chain than the one where the `Paras` pallet is deployed.
         *
         * The main purpose is to avoid transferring the entire `code` Wasm blob between chains.
         * Instead, we authorize `code_hash` with `root`, which can later be applied by
         * `Paras::apply_authorized_force_set_current_code(para, code)` by anyone.
         *
         * Authorizations are stored in an **overwriting manner**.
         */
        "authorize_force_set_current_code_hash": {
            "para": number;
            "new_code_hash": FixedSizeBinary<32>;
            "valid_period": number;
        };
        /**
         * Applies the already authorized current code for the parachain,
         * triggering the same functionality as `force_set_current_code`.
         */
        "apply_authorized_force_set_current_code": Anonymize<I1k3urvkqqshbc>;
    }>;
    "Initializer": Anonymize<Ieggtnkc96vvt7>;
    "Hrmp": Anonymize<I45adic8nko129>;
    "ParasDisputes": Anonymize<Ifkh1ep7g9h3rv>;
    "ParasSlashing": Anonymize<I7a6dbilbccifr>;
    "OnDemandAssignmentProvider": Anonymize<I1qq9dc763kccf>;
    "Registrar": Anonymize<Icclqj5sge2nc7>;
    "Slots": Anonymize<Iafhis924j14hg>;
    "ParasSudoWrapper": Anonymize<I8f92tvrsnq2cu>;
    "Auctions": Anonymize<I4a8qeimc5p3qn>;
    "Crowdloan": Anonymize<Iaj4q75nu5v2i2>;
    "AssignedSlots": Enum<{
        /**
         * Assign a permanent parachain slot and immediately create a lease for it.
         */
        "assign_perm_parachain_slot": Anonymize<Ic5b47dj4coa3r>;
        /**
         * Assign a temporary parachain slot. The function tries to create a lease for it
         * immediately if `SlotLeasePeriodStart::Current` is specified, and if the number
         * of currently active temporary slots is below `MaxTemporarySlotPerLeasePeriod`.
         */
        "assign_temp_parachain_slot": {
            "id": number;
            "lease_period_start": PolkadotRuntimeCommonAssignedSlotsSlotLeasePeriodStart;
        };
        /**
         * Unassign a permanent or temporary parachain slot
         */
        "unassign_parachain_slot": Anonymize<Ic5b47dj4coa3r>;
        /**
         * Sets the storage value [`MaxPermanentSlots`].
         */
        "set_max_permanent_slots": {
            "slots": number;
        };
        /**
         * Sets the storage value [`MaxTemporarySlots`].
         */
        "set_max_temporary_slots": {
            "slots": number;
        };
    }>;
    "Coretime": Anonymize<Ifr31g56am9igr>;
    "StakingAhClient": Enum<{
        "validator_set": {
            "report": {
                "new_validator_set": Anonymize<Ia2lhg7l2hilo3>;
                "id": number;
                "prune_up_to"?: Anonymize<I4arjljr6dpflb>;
                "leftover": boolean;
            };
        };
        /**
         * Allows governance to force set the operating mode of the pallet.
         */
        "set_mode": {
            "mode": Enum<{
                "Passive": undefined;
                "Buffered": undefined;
                "Active": undefined;
            }>;
        };
        /**
         * manually do what this pallet was meant to do at the end of the migration.
         */
        "force_on_migration_end": undefined;
    }>;
    "MultiBlockMigrations": Anonymize<I4oqb168b2d4er>;
    "XcmPallet": Anonymize<I6k1inef986368>;
    "MessageQueue": Anonymize<I3lic4llm6egbr>;
    "AssetRate": Anonymize<If582h5gr5gh6f>;
    "RootTesting": Enum<{
        /**
         * A dispatch that will fill the block weight up to the given ratio.
         */
        "fill_block": {
            "ratio": number;
        };
        "trigger_defensive": undefined;
    }>;
    "MetaTx": Enum<{
        /**
         * Dispatch a given meta transaction.
         *
         * - `_origin`: Can be any kind of origin.
         * - `meta_tx`: Meta Transaction with a target call to be dispatched.
         */
        "dispatch": {
            "meta_tx": {
                "call": TxCallData;
                "extension_version": number;
                "extension": [Enum<{
                    "Signed": {
                        "signature": MultiSignature;
                        "account": SS58String;
                    };
                    "Disabled": undefined;
                }>, undefined, undefined, undefined, undefined, undefined, ExtensionsCheckMortality, number, Enum<{
                    "Disabled": undefined;
                    "Enabled": undefined;
                }>];
            };
        };
    }>;
    "Beefy": Anonymize<Idmcmrk34p8gic>;
    "IdentityMigrator": Enum<{
        /**
         * Reap the `IdentityInfo` of `who` from the Identity pallet of `T`, unreserving any
         * deposits held and removing storage items associated with `who`.
         */
        "reap_identity": Anonymize<I4cbvqmqadhrea>;
        /**
         * Update the deposit of `who`. Meant to be called by the system with an XCM `Transact`
         * Instruction.
         */
        "poke_deposit": Anonymize<I4cbvqmqadhrea>;
    }>;
}>;
export type Iekve0i6djpd9f = AnonymousEnum<{
    /**
     * Make some on-chain remark.
     *
     * Can be executed by every `origin`.
     */
    "remark": {
        "remark": Binary;
    };
    /**
     * Set the number of pages in the WebAssembly environment's heap.
     */
    "set_heap_pages": {
        "pages": bigint;
    };
    /**
     * Set the new runtime code.
     */
    "set_code": {
        "code": Binary;
    };
    /**
     * Set the new runtime code without doing any checks of the given `code`.
     *
     * Note that runtime upgrades will not run if this is called with a not-increasing spec
     * version!
     */
    "set_code_without_checks": {
        "code": Binary;
    };
    /**
     * Set some items of storage.
     */
    "set_storage": {
        "items": Anonymize<I6pi5ou8r1hblk>;
    };
    /**
     * Kill some items from storage.
     */
    "kill_storage": {
        "keys": Anonymize<Itom7fk49o0c9>;
    };
    /**
     * Kill all storage items with a key that starts with the given prefix.
     *
     * **NOTE:** We rely on the Root origin to provide us the number of subkeys under
     * the prefix we are removing to accurately calculate the weight of this function.
     */
    "kill_prefix": {
        "prefix": Binary;
        "subkeys": number;
    };
    /**
     * Make some on-chain remark and emit event.
     */
    "remark_with_event": {
        "remark": Binary;
    };
    /**
     * Authorize an upgrade to a given `code_hash` for the runtime. The runtime can be supplied
     * later.
     *
     * This call requires Root origin.
     */
    "authorize_upgrade": Anonymize<Ib51vk42m1po4n>;
    /**
     * Authorize an upgrade to a given `code_hash` for the runtime. The runtime can be supplied
     * later.
     *
     * WARNING: This authorizes an upgrade that will take place without any safety checks, for
     * example that the spec name remains the same and that the version number increases. Not
     * recommended for normal use. Use `authorize_upgrade` instead.
     *
     * This call requires Root origin.
     */
    "authorize_upgrade_without_checks": Anonymize<Ib51vk42m1po4n>;
    /**
     * Provide the preimage (runtime binary) `code` for an upgrade that has been authorized.
     *
     * If the authorization required a version check, this call will ensure the spec name
     * remains unchanged and that the spec version has increased.
     *
     * Depending on the runtime's `OnSetCode` configuration, this function may directly apply
     * the new `code` in the same block or attempt to schedule the upgrade.
     *
     * All origins are allowed.
     */
    "apply_authorized_upgrade": {
        "code": Binary;
    };
}>;
export type I6pi5ou8r1hblk = Array<FixedSizeArray<2, Binary>>;
export type Itom7fk49o0c9 = Array<Binary>;
export type Ib51vk42m1po4n = {
    "code_hash": FixedSizeBinary<32>;
};
export type I1jeo0dpbkma5g = AnonymousEnum<{
    /**
     * Report authority equivocation/misbehavior. This method will verify
     * the equivocation proof and validate the given key ownership proof
     * against the extracted offender. If both are valid, the offence will
     * be reported.
     */
    "report_equivocation": {
        "equivocation_proof": {
            "offender": FixedSizeBinary<32>;
            "slot": bigint;
            "first_header": Anonymize<Ic952bubvq4k7d>;
            "second_header": Anonymize<Ic952bubvq4k7d>;
        };
        "key_owner_proof": Anonymize<I3ia7aufsoj0l1>;
    };
    /**
     * Report authority equivocation/misbehavior. This method will verify
     * the equivocation proof and validate the given key ownership proof
     * against the extracted offender. If both are valid, the offence will
     * be reported.
     * This extrinsic must be called unsigned and it is expected that only
     * block authors will call it (validated in `ValidateUnsigned`), as such
     * if the block author is defined it will be defined as the equivocation
     * reporter.
     */
    "report_equivocation_unsigned": {
        "equivocation_proof": {
            "offender": FixedSizeBinary<32>;
            "slot": bigint;
            "first_header": Anonymize<Ic952bubvq4k7d>;
            "second_header": Anonymize<Ic952bubvq4k7d>;
        };
        "key_owner_proof": Anonymize<I3ia7aufsoj0l1>;
    };
    /**
     * Plan an epoch config change. The epoch config change is recorded and will be enacted on
     * the next call to `enact_epoch_change`. The config will be activated one epoch after.
     * Multiple calls to this method will replace any existing planned config change that had
     * not been enacted yet.
     */
    "plan_config_change": {
        "config": BabeDigestsNextConfigDescriptor;
    };
}>;
export type Ic952bubvq4k7d = {
    "parent_hash": FixedSizeBinary<32>;
    "number": number;
    "state_root": FixedSizeBinary<32>;
    "extrinsics_root": FixedSizeBinary<32>;
    "digest": Array<DigestItem>;
};
export type DigestItem = Enum<{
    "PreRuntime": [FixedSizeBinary<4>, Binary];
    "Consensus": [FixedSizeBinary<4>, Binary];
    "Seal": [FixedSizeBinary<4>, Binary];
    "Other": Binary;
    "RuntimeEnvironmentUpdated": undefined;
}>;
export declare const DigestItem: GetEnum<DigestItem>;
export type I3ia7aufsoj0l1 = {
    "session": number;
    "trie_nodes": Anonymize<Itom7fk49o0c9>;
    "validator_count": number;
};
export type BabeDigestsNextConfigDescriptor = Enum<{
    "V1": {
        "c": FixedSizeArray<2, bigint>;
        "allowed_slots": BabeAllowedSlots;
    };
}>;
export declare const BabeDigestsNextConfigDescriptor: GetEnum<BabeDigestsNextConfigDescriptor>;
export type BabeAllowedSlots = Enum<{
    "PrimarySlots": undefined;
    "PrimaryAndSecondaryPlainSlots": undefined;
    "PrimaryAndSecondaryVRFSlots": undefined;
}>;
export declare const BabeAllowedSlots: GetEnum<BabeAllowedSlots>;
export type I7d75gqfg6jh9c = AnonymousEnum<{
    /**
     * Set the current time.
     *
     * This call should be invoked exactly once per block. It will panic at the finalization
     * phase, if this call hasn't been invoked by that time.
     *
     * The timestamp should be greater than the previous one by the amount specified by
     * [`Config::MinimumPeriod`].
     *
     * The dispatch origin for this call must be _None_.
     *
     * This dispatch class is _Mandatory_ to ensure it gets executed in the block. Be aware
     * that changing the complexity of this call could result exhausting the resources in a
     * block to execute any other calls.
     *
     * ## Complexity
     * - `O(1)` (Note that implementations of `OnTimestampSet` must also be `O(1)`)
     * - 1 storage read and 1 storage mutation (codec `O(1)` because of `DidUpdate::take` in
     * `on_finalize`)
     * - 1 event handler `on_timestamp_set`. Must be `O(1)`.
     */
    "set": {
        "now": bigint;
    };
}>;
export type I67ac6i6ihmvpt = AnonymousEnum<{
    /**
     * Assign an previously unassigned index.
     *
     * Payment: `Deposit` is reserved from the sender account.
     *
     * The dispatch origin for this call must be _Signed_.
     *
     * - `index`: the index to be claimed. This must not be in use.
     *
     * Emits `IndexAssigned` if successful.
     *
     * ## Complexity
     * - `O(1)`.
     */
    "claim": Anonymize<I666bl2fqjkejo>;
    /**
     * Assign an index already owned by the sender to another account. The balance reservation
     * is effectively transferred to the new account.
     *
     * The dispatch origin for this call must be _Signed_.
     *
     * - `index`: the index to be re-assigned. This must be owned by the sender.
     * - `new`: the new owner of the index. This function is a no-op if it is equal to sender.
     *
     * Emits `IndexAssigned` if successful.
     *
     * ## Complexity
     * - `O(1)`.
     */
    "transfer": Anonymize<I6o1er683vod1j>;
    /**
     * Free up an index owned by the sender.
     *
     * Payment: Any previous deposit placed for the index is unreserved in the sender account.
     *
     * The dispatch origin for this call must be _Signed_ and the sender must own the index.
     *
     * - `index`: the index to be freed. This must be owned by the sender.
     *
     * Emits `IndexFreed` if successful.
     *
     * ## Complexity
     * - `O(1)`.
     */
    "free": Anonymize<I666bl2fqjkejo>;
    /**
     * Force an index to an account. This doesn't require a deposit. If the index is already
     * held, then any deposit is reimbursed to its current owner.
     *
     * The dispatch origin for this call must be _Root_.
     *
     * - `index`: the index to be (re-)assigned.
     * - `new`: the new owner of the index. This function is a no-op if it is equal to sender.
     * - `freeze`: if set to `true`, will freeze the index so it cannot be transferred.
     *
     * Emits `IndexAssigned` if successful.
     *
     * ## Complexity
     * - `O(1)`.
     */
    "force_transfer": Anonymize<I5bq561t4gpfva>;
    /**
     * Freeze an index so it will always point to the sender account. This consumes the
     * deposit.
     *
     * The dispatch origin for this call must be _Signed_ and the signing account must have a
     * non-frozen account `index`.
     *
     * - `index`: the index to be frozen in place.
     *
     * Emits `IndexFrozen` if successful.
     *
     * ## Complexity
     * - `O(1)`.
     */
    "freeze": Anonymize<I666bl2fqjkejo>;
    /**
     * Poke the deposit reserved for an index.
     *
     * The dispatch origin for this call must be _Signed_ and the signing account must have a
     * non-frozen account `index`.
     *
     * The transaction fees is waived if the deposit is changed after poking/reconsideration.
     *
     * - `index`: the index whose deposit is to be poked/reconsidered.
     *
     * Emits `DepositPoked` if successful.
     */
    "poke_deposit": Anonymize<I666bl2fqjkejo>;
}>;
export type I666bl2fqjkejo = {
    "index": number;
};
export type I6o1er683vod1j = {
    "new": MultiAddress;
    "index": number;
};
export type MultiAddress = Enum<{
    "Id": SS58String;
    "Index": undefined;
    "Raw": Binary;
    "Address32": FixedSizeBinary<32>;
    "Address20": FixedSizeBinary<20>;
}>;
export declare const MultiAddress: GetEnum<MultiAddress>;
export type I5bq561t4gpfva = {
    "new": MultiAddress;
    "index": number;
    "freeze": boolean;
};
export type I9svldsp29mh87 = AnonymousEnum<{
    /**
     * Transfer some liquid free balance to another account.
     *
     * `transfer_allow_death` will set the `FreeBalance` of the sender and receiver.
     * If the sender's account is below the existential deposit as a result
     * of the transfer, the account will be reaped.
     *
     * The dispatch origin for this call must be `Signed` by the transactor.
     */
    "transfer_allow_death": {
        "dest": MultiAddress;
        "value": bigint;
    };
    /**
     * Exactly as `transfer_allow_death`, except the origin must be root and the source account
     * may be specified.
     */
    "force_transfer": {
        "source": MultiAddress;
        "dest": MultiAddress;
        "value": bigint;
    };
    /**
     * Same as the [`transfer_allow_death`] call, but with a check that the transfer will not
     * kill the origin account.
     *
     * 99% of the time you want [`transfer_allow_death`] instead.
     *
     * [`transfer_allow_death`]: struct.Pallet.html#method.transfer
     */
    "transfer_keep_alive": {
        "dest": MultiAddress;
        "value": bigint;
    };
    /**
     * Transfer the entire transferable balance from the caller account.
     *
     * NOTE: This function only attempts to transfer _transferable_ balances. This means that
     * any locked, reserved, or existential deposits (when `keep_alive` is `true`), will not be
     * transferred by this function. To ensure that this function results in a killed account,
     * you might need to prepare the account by removing any reference counters, storage
     * deposits, etc...
     *
     * The dispatch origin of this call must be Signed.
     *
     * - `dest`: The recipient of the transfer.
     * - `keep_alive`: A boolean to determine if the `transfer_all` operation should send all
     * of the funds the account has, causing the sender account to be killed (false), or
     * transfer everything except at least the existential deposit, which will guarantee to
     * keep the sender account alive (true).
     */
    "transfer_all": {
        "dest": MultiAddress;
        "keep_alive": boolean;
    };
    /**
     * Unreserve some balance from a user by force.
     *
     * Can only be called by ROOT.
     */
    "force_unreserve": {
        "who": MultiAddress;
        "amount": bigint;
    };
    /**
     * Upgrade a specified account.
     *
     * - `origin`: Must be `Signed`.
     * - `who`: The account to be upgraded.
     *
     * This will waive the transaction fee if at least all but 10% of the accounts needed to
     * be upgraded. (We let some not have to be upgraded just in order to allow for the
     * possibility of churn).
     */
    "upgrade_accounts": {
        "who": Anonymize<Ia2lhg7l2hilo3>;
    };
    /**
     * Set the regular balance of a given account.
     *
     * The dispatch origin for this call is `root`.
     */
    "force_set_balance": {
        "who": MultiAddress;
        "new_free": bigint;
    };
    /**
     * Adjust the total issuance in a saturating way.
     *
     * Can only be called by root and always needs a positive `delta`.
     *
     * # Example
     */
    "force_adjust_total_issuance": {
        "direction": BalancesAdjustmentDirection;
        "delta": bigint;
    };
    /**
     * Burn the specified liquid free balance from the origin account.
     *
     * If the origin's account ends up below the existential deposit as a result
     * of the burn and `keep_alive` is false, the account will be reaped.
     *
     * Unlike sending funds to a _burn_ address, which merely makes the funds inaccessible,
     * this `burn` operation will reduce total issuance by the amount _burned_.
     */
    "burn": {
        "value": bigint;
        "keep_alive": boolean;
    };
}>;
export type Ia2lhg7l2hilo3 = Array<SS58String>;
export type BalancesAdjustmentDirection = Enum<{
    "Increase": undefined;
    "Decrease": undefined;
}>;
export declare const BalancesAdjustmentDirection: GetEnum<BalancesAdjustmentDirection>;
export type Icm294co91mkfj = AnonymousEnum<{
    /**
     * Take the origin account as a stash and lock up `value` of its balance. `controller` will
     * be the account that controls it.
     *
     * `value` must be more than the `minimum_balance` specified by `T::Currency`.
     *
     * The dispatch origin for this call must be _Signed_ by the stash account.
     *
     * Emits `Bonded`.
     * ## Complexity
     * - Independent of the arguments. Moderate complexity.
     * - O(1).
     * - Three extra DB entries.
     *
     * NOTE: Two of the storage writes (`Self::bonded`, `Self::payee`) are _never_ cleaned
     * unless the `origin` falls below _existential deposit_ (or equal to 0) and gets removed
     * as dust.
     */
    "bond": Anonymize<I2eip8tc75dpje>;
    /**
     * Add some extra amount that have appeared in the stash `free_balance` into the balance up
     * for staking.
     *
     * The dispatch origin for this call must be _Signed_ by the stash, not the controller.
     *
     * Use this if there are additional funds in your stash account that you wish to bond.
     * Unlike [`bond`](Self::bond) or [`unbond`](Self::unbond) this function does not impose
     * any limitation on the amount that can be added.
     *
     * Emits `Bonded`.
     *
     * ## Complexity
     * - Independent of the arguments. Insignificant complexity.
     * - O(1).
     */
    "bond_extra": Anonymize<I564va64vtidbq>;
    /**
     * Schedule a portion of the stash to be unlocked ready for transfer out after the bond
     * period ends. If this leaves an amount actively bonded less than
     * [`asset::existential_deposit`], then it is increased to the full amount.
     *
     * The stash may be chilled if the ledger total amount falls to 0 after unbonding.
     *
     * The dispatch origin for this call must be _Signed_ by the controller, not the stash.
     *
     * Once the unlock period is done, you can call `withdraw_unbonded` to actually move
     * the funds out of management ready for transfer.
     *
     * No more than a limited number of unlocking chunks (see `MaxUnlockingChunks`)
     * can co-exists at the same time. If there are no unlocking chunks slots available
     * [`Call::withdraw_unbonded`] is called to remove some of the chunks (if possible).
     *
     * If a user encounters the `InsufficientBond` error when calling this extrinsic,
     * they should call `chill` first in order to free up their bonded funds.
     *
     * Emits `Unbonded`.
     *
     * See also [`Call::withdraw_unbonded`].
     */
    "unbond": Anonymize<Ie5v6njpckr05b>;
    /**
     * Remove any unlocked chunks from the `unlocking` queue from our management.
     *
     * This essentially frees up that balance to be used by the stash account to do whatever
     * it wants.
     *
     * The dispatch origin for this call must be _Signed_ by the controller.
     *
     * Emits `Withdrawn`.
     *
     * See also [`Call::unbond`].
     *
     * ## Parameters
     *
     * - `num_slashing_spans` indicates the number of metadata slashing spans to clear when
     * this call results in a complete removal of all the data related to the stash account.
     * In this case, the `num_slashing_spans` must be larger or equal to the number of
     * slashing spans associated with the stash account in the [`SlashingSpans`] storage type,
     * otherwise the call will fail. The call weight is directly proportional to
     * `num_slashing_spans`.
     *
     * ## Complexity
     * O(S) where S is the number of slashing spans to remove
     * NOTE: Weight annotation is the kill scenario, we refund otherwise.
     */
    "withdraw_unbonded": Anonymize<I328av3j0bgmjb>;
    /**
     * Declare the desire to validate for the origin controller.
     *
     * Effects will be felt at the beginning of the next era.
     *
     * The dispatch origin for this call must be _Signed_ by the controller, not the stash.
     */
    "validate": Anonymize<I4tuqm9ato907i>;
    /**
     * Declare the desire to nominate `targets` for the origin controller.
     *
     * Effects will be felt at the beginning of the next era.
     *
     * The dispatch origin for this call must be _Signed_ by the controller, not the stash.
     *
     * ## Complexity
     * - The transaction's complexity is proportional to the size of `targets` (N)
     * which is capped at CompactAssignments::LIMIT (T::MaxNominations).
     * - Both the reads and writes follow a similar pattern.
     */
    "nominate": Anonymize<Iagi89qt4h1lqg>;
    /**
     * Declare no desire to either validate or nominate.
     *
     * Effects will be felt at the beginning of the next era.
     *
     * The dispatch origin for this call must be _Signed_ by the controller, not the stash.
     *
     * ## Complexity
     * - Independent of the arguments. Insignificant complexity.
     * - Contains one read.
     * - Writes are limited to the `origin` account key.
     */
    "chill": undefined;
    /**
     * (Re-)set the payment target for a controller.
     *
     * Effects will be felt instantly (as soon as this function is completed successfully).
     *
     * The dispatch origin for this call must be _Signed_ by the controller, not the stash.
     *
     * ## Complexity
     * - O(1)
     * - Independent of the arguments. Insignificant complexity.
     * - Contains a limited number of reads.
     * - Writes are limited to the `origin` account key.
     * ---------
     */
    "set_payee": Anonymize<I9dgmcnuamt5p8>;
    /**
     * (Re-)sets the controller of a stash to the stash itself. This function previously
     * accepted a `controller` argument to set the controller to an account other than the
     * stash itself. This functionality has now been removed, now only setting the controller
     * to the stash, if it is not already.
     *
     * Effects will be felt instantly (as soon as this function is completed successfully).
     *
     * The dispatch origin for this call must be _Signed_ by the stash, not the controller.
     *
     * ## Complexity
     * O(1)
     * - Independent of the arguments. Insignificant complexity.
     * - Contains a limited number of reads.
     * - Writes are limited to the `origin` account key.
     */
    "set_controller": undefined;
    /**
     * Sets the ideal number of validators.
     *
     * The dispatch origin must be Root.
     *
     * ## Complexity
     * O(1)
     */
    "set_validator_count": Anonymize<I3vh014cqgmrfd>;
    /**
     * Increments the ideal number of validators up to maximum of
     * `ElectionProviderBase::MaxWinners`.
     *
     * The dispatch origin must be Root.
     *
     * ## Complexity
     * Same as [`Self::set_validator_count`].
     */
    "increase_validator_count": Anonymize<Ifhs60omlhvt3>;
    /**
     * Scale up the ideal number of validators by a factor up to maximum of
     * `ElectionProviderBase::MaxWinners`.
     *
     * The dispatch origin must be Root.
     *
     * ## Complexity
     * Same as [`Self::set_validator_count`].
     */
    "scale_validator_count": Anonymize<If34udpd5e57vi>;
    /**
     * Force there to be no new eras indefinitely.
     *
     * The dispatch origin must be Root.
     *
     * # Warning
     *
     * The election process starts multiple blocks before the end of the era.
     * Thus the election process may be ongoing when this is called. In this case the
     * election will continue until the next era is triggered.
     *
     * ## Complexity
     * - No arguments.
     * - Weight: O(1)
     */
    "force_no_eras": undefined;
    /**
     * Force there to be a new era at the end of the next session. After this, it will be
     * reset to normal (non-forced) behaviour.
     *
     * The dispatch origin must be Root.
     *
     * # Warning
     *
     * The election process starts multiple blocks before the end of the era.
     * If this is called just before a new era is triggered, the election process may not
     * have enough blocks to get a result.
     *
     * ## Complexity
     * - No arguments.
     * - Weight: O(1)
     */
    "force_new_era": undefined;
    /**
     * Set the validators who cannot be slashed (if any).
     *
     * The dispatch origin must be Root.
     */
    "set_invulnerables": Anonymize<I39t01nnod9109>;
    /**
     * Force a current staker to become completely unstaked, immediately.
     *
     * The dispatch origin must be Root.
     *
     * ## Parameters
     *
     * - `num_slashing_spans`: Refer to comments on [`Call::withdraw_unbonded`] for more
     * details.
     */
    "force_unstake": Anonymize<Ie5vbnd9198quk>;
    /**
     * Force there to be a new era at the end of sessions indefinitely.
     *
     * The dispatch origin must be Root.
     *
     * # Warning
     *
     * The election process starts multiple blocks before the end of the era.
     * If this is called just before a new era is triggered, the election process may not
     * have enough blocks to get a result.
     */
    "force_new_era_always": undefined;
    /**
     * Cancel enactment of a deferred slash.
     *
     * Can be called by the `T::AdminOrigin`.
     *
     * Parameters: era and indices of the slashes for that era to kill.
     * They **must** be sorted in ascending order, *and* unique.
     */
    "cancel_deferred_slash": Anonymize<I3h6murn8bd4v5>;
    /**
     * Pay out next page of the stakers behind a validator for the given era.
     *
     * - `validator_stash` is the stash account of the validator.
     * - `era` may be any era between `[current_era - history_depth; current_era]`.
     *
     * The origin of this call must be _Signed_. Any account can call this function, even if
     * it is not one of the stakers.
     *
     * The reward payout could be paged in case there are too many nominators backing the
     * `validator_stash`. This call will payout unpaid pages in an ascending order. To claim a
     * specific page, use `payout_stakers_by_page`.`
     *
     * If all pages are claimed, it returns an error `InvalidPage`.
     */
    "payout_stakers": Anonymize<I6k6jf8ncesuu3>;
    /**
     * Rebond a portion of the stash scheduled to be unlocked.
     *
     * The dispatch origin must be signed by the controller.
     *
     * ## Complexity
     * - Time complexity: O(L), where L is unlocking chunks
     * - Bounded by `MaxUnlockingChunks`.
     */
    "rebond": Anonymize<Ie5v6njpckr05b>;
    /**
     * Remove all data structures concerning a staker/stash once it is at a state where it can
     * be considered `dust` in the staking system. The requirements are:
     *
     * 1. the `total_balance` of the stash is below existential deposit.
     * 2. or, the `ledger.total` of the stash is below existential deposit.
     * 3. or, existential deposit is zero and either `total_balance` or `ledger.total` is zero.
     *
     * The former can happen in cases like a slash; the latter when a fully unbonded account
     * is still receiving staking rewards in `RewardDestination::Staked`.
     *
     * It can be called by anyone, as long as `stash` meets the above requirements.
     *
     * Refunds the transaction fees upon successful execution.
     *
     * ## Parameters
     *
     * - `num_slashing_spans`: Refer to comments on [`Call::withdraw_unbonded`] for more
     * details.
     */
    "reap_stash": Anonymize<Ie5vbnd9198quk>;
    /**
     * Remove the given nominations from the calling validator.
     *
     * Effects will be felt at the beginning of the next era.
     *
     * The dispatch origin for this call must be _Signed_ by the controller, not the stash.
     *
     * - `who`: A list of nominator stash accounts who are nominating this validator which
     * should no longer be nominating this validator.
     *
     * Note: Making this call only makes sense if you first set the validator preferences to
     * block any further nominations.
     */
    "kick": Anonymize<I3qhk481i120pk>;
    /**
     * Update the various staking configurations .
     *
     * * `min_nominator_bond`: The minimum active bond needed to be a nominator.
     * * `min_validator_bond`: The minimum active bond needed to be a validator.
     * * `max_nominator_count`: The max number of users who can be a nominator at once. When
     * set to `None`, no limit is enforced.
     * * `max_validator_count`: The max number of users who can be a validator at once. When
     * set to `None`, no limit is enforced.
     * * `chill_threshold`: The ratio of `max_nominator_count` or `max_validator_count` which
     * should be filled in order for the `chill_other` transaction to work.
     * * `min_commission`: The minimum amount of commission that each validators must maintain.
     * This is checked only upon calling `validate`. Existing validators are not affected.
     *
     * RuntimeOrigin must be Root to call this function.
     *
     * NOTE: Existing nominators and validators will not be affected by this update.
     * to kick people under the new limits, `chill_other` should be called.
     */
    "set_staking_configs": Anonymize<If1qr0kbbl298c>;
    /**
     * Declare a `controller` to stop participating as either a validator or nominator.
     *
     * Effects will be felt at the beginning of the next era.
     *
     * The dispatch origin for this call must be _Signed_, but can be called by anyone.
     *
     * If the caller is the same as the controller being targeted, then no further checks are
     * enforced, and this function behaves just like `chill`.
     *
     * If the caller is different than the controller being targeted, the following conditions
     * must be met:
     *
     * * `controller` must belong to a nominator who has become non-decodable,
     *
     * Or:
     *
     * * A `ChillThreshold` must be set and checked which defines how close to the max
     * nominators or validators we must reach before users can start chilling one-another.
     * * A `MaxNominatorCount` and `MaxValidatorCount` must be set which is used to determine
     * how close we are to the threshold.
     * * A `MinNominatorBond` and `MinValidatorBond` must be set and checked, which determines
     * if this is a person that should be chilled because they have not met the threshold
     * bond required.
     *
     * This can be helpful if bond requirements are updated, and we need to remove old users
     * who do not satisfy these requirements.
     */
    "chill_other": Anonymize<Idl3umm12u5pa>;
    /**
     * Force a validator to have at least the minimum commission. This will not affect a
     * validator who already has a commission greater than or equal to the minimum. Any account
     * can call this.
     */
    "force_apply_min_commission": Anonymize<I5ont0141q9ss5>;
    /**
     * Sets the minimum amount of commission that each validators must maintain.
     *
     * This call has lower privilege requirements than `set_staking_config` and can be called
     * by the `T::AdminOrigin`. Root can always call this.
     */
    "set_min_commission": Anonymize<I3vh014cqgmrfd>;
    /**
     * Pay out a page of the stakers behind a validator for the given era and page.
     *
     * - `validator_stash` is the stash account of the validator.
     * - `era` may be any era between `[current_era - history_depth; current_era]`.
     * - `page` is the page index of nominators to pay out with value between 0 and
     * `num_nominators / T::MaxExposurePageSize`.
     *
     * The origin of this call must be _Signed_. Any account can call this function, even if
     * it is not one of the stakers.
     *
     * If a validator has more than [`Config::MaxExposurePageSize`] nominators backing
     * them, then the list of nominators is paged, with each page being capped at
     * [`Config::MaxExposurePageSize`.] If a validator has more than one page of nominators,
     * the call needs to be made for each page separately in order for all the nominators
     * backing a validator to receive the reward. The nominators are not sorted across pages
     * and so it should not be assumed the highest staker would be on the topmost page and vice
     * versa. If rewards are not claimed in [`Config::HistoryDepth`] eras, they are lost.
     */
    "payout_stakers_by_page": Anonymize<Ie6j49utvii126>;
    /**
     * Migrates an account's `RewardDestination::Controller` to
     * `RewardDestination::Account(controller)`.
     *
     * Effects will be felt instantly (as soon as this function is completed successfully).
     *
     * This will waive the transaction fee if the `payee` is successfully migrated.
     */
    "update_payee": Anonymize<I3v6ks33uluhnj>;
    /**
     * Updates a batch of controller accounts to their corresponding stash account if they are
     * not the same. Ignores any controller accounts that do not exist, and does not operate if
     * the stash and controller are already the same.
     *
     * Effects will be felt instantly (as soon as this function is completed successfully).
     *
     * The dispatch origin must be `T::AdminOrigin`.
     */
    "deprecate_controller_batch": Anonymize<I3kiiim1cds68i>;
    /**
     * Restores the state of a ledger which is in an inconsistent state.
     *
     * The requirements to restore a ledger are the following:
     * * The stash is bonded; or
     * * The stash is not bonded but it has a staking lock left behind; or
     * * If the stash has an associated ledger and its state is inconsistent; or
     * * If the ledger is not corrupted *but* its staking lock is out of sync.
     *
     * The `maybe_*` input parameters will overwrite the corresponding data and metadata of the
     * ledger associated with the stash. If the input parameters are not set, the ledger will
     * be reset values from on-chain state.
     */
    "restore_ledger": Anonymize<I4k60mkh2r6jjg>;
    /**
     * Removes the legacy Staking locks if they exist.
     *
     * This removes the legacy lock on the stake with [`Config::OldCurrency`] and creates a
     * hold on it if needed. If all stake cannot be held, the best effort is made to hold as
     * much as possible. The remaining stake is forced withdrawn from the ledger.
     *
     * The fee is waived if the migration is successful.
     */
    "migrate_currency": Anonymize<Idl3umm12u5pa>;
    /**
     * This function allows governance to manually slash a validator and is a
     * **fallback mechanism**.
     *
     * The dispatch origin must be `T::AdminOrigin`.
     *
     * ## Parameters
     * - `validator_stash` - The stash account of the validator to slash.
     * - `era` - The era in which the validator was in the active set.
     * - `slash_fraction` - The percentage of the stake to slash, expressed as a Perbill.
     *
     * ## Behavior
     *
     * The slash will be applied using the standard slashing mechanics, respecting the
     * configured `SlashDeferDuration`.
     *
     * This means:
     * - If the validator was already slashed by a higher percentage for the same era, this
     * slash will have no additional effect.
     * - If the validator was previously slashed by a lower percentage, only the difference
     * will be applied.
     * - The slash will be deferred by `SlashDeferDuration` eras before being enacted.
     */
    "manual_slash": {
        "validator_stash": SS58String;
        "era": number;
        "slash_fraction": number;
    };
}>;
export type I2eip8tc75dpje = {
    "value": bigint;
    "payee": StakingRewardDestination;
};
export type StakingRewardDestination = Enum<{
    "Staked": undefined;
    "Stash": undefined;
    "Controller": undefined;
    "Account": SS58String;
    "None": undefined;
}>;
export declare const StakingRewardDestination: GetEnum<StakingRewardDestination>;
export type I564va64vtidbq = {
    "max_additional": bigint;
};
export type Ie5v6njpckr05b = {
    "value": bigint;
};
export type I328av3j0bgmjb = {
    "num_slashing_spans": number;
};
export type I4tuqm9ato907i = {
    "prefs": {
        "commission": number;
        "blocked": boolean;
    };
};
export type Iagi89qt4h1lqg = {
    "targets": Anonymize<I28gn91b2ttnbk>;
};
export type I28gn91b2ttnbk = Array<MultiAddress>;
export type I9dgmcnuamt5p8 = {
    "payee": StakingRewardDestination;
};
export type I3vh014cqgmrfd = {
    "new": number;
};
export type Ifhs60omlhvt3 = {
    "additional": number;
};
export type If34udpd5e57vi = {
    "factor": number;
};
export type I39t01nnod9109 = {
    "invulnerables": Anonymize<Ia2lhg7l2hilo3>;
};
export type Ie5vbnd9198quk = {
    "stash": SS58String;
    "num_slashing_spans": number;
};
export type I3h6murn8bd4v5 = {
    "era": number;
    "slash_indices": Anonymize<Icgljjb6j82uhn>;
};
export type Icgljjb6j82uhn = Array<number>;
export type I6k6jf8ncesuu3 = {
    "validator_stash": SS58String;
    "era": number;
};
export type I3qhk481i120pk = {
    "who": Anonymize<I28gn91b2ttnbk>;
};
export type If1qr0kbbl298c = {
    "min_nominator_bond": StakingPalletConfigOpBig;
    "min_validator_bond": StakingPalletConfigOpBig;
    "max_nominator_count": StakingPalletConfigOp;
    "max_validator_count": StakingPalletConfigOp;
    "chill_threshold": StakingPalletConfigOp;
    "min_commission": StakingPalletConfigOp;
    "max_staked_rewards": StakingPalletConfigOp;
};
export type StakingPalletConfigOpBig = Enum<{
    "Noop": undefined;
    "Set": bigint;
    "Remove": undefined;
}>;
export declare const StakingPalletConfigOpBig: GetEnum<StakingPalletConfigOpBig>;
export type StakingPalletConfigOp = Enum<{
    "Noop": undefined;
    "Set": number;
    "Remove": undefined;
}>;
export declare const StakingPalletConfigOp: GetEnum<StakingPalletConfigOp>;
export type Idl3umm12u5pa = {
    "stash": SS58String;
};
export type I5ont0141q9ss5 = {
    "validator_stash": SS58String;
};
export type Ie6j49utvii126 = {
    "validator_stash": SS58String;
    "era": number;
    "page": number;
};
export type I3v6ks33uluhnj = {
    "controller": SS58String;
};
export type I3kiiim1cds68i = {
    "controllers": Anonymize<Ia2lhg7l2hilo3>;
};
export type I4k60mkh2r6jjg = {
    "stash": SS58String;
    "maybe_controller"?: Anonymize<Ihfphjolmsqq1>;
    "maybe_total"?: Anonymize<I35p85j063s0il>;
    "maybe_unlocking"?: (Array<{
        "value": bigint;
        "era": number;
    }>) | undefined;
};
export type Ihfphjolmsqq1 = (SS58String) | undefined;
export type I35p85j063s0il = (bigint) | undefined;
export type I5t0545elr3mi1 = AnonymousEnum<{
    "MinInflation": FixedSizeArray<1, Anonymize<I35p85j063s0il>>;
    "MaxInflation": FixedSizeArray<1, Anonymize<I35p85j063s0il>>;
    "IdealStake": FixedSizeArray<1, Anonymize<I35p85j063s0il>>;
    "Falloff": FixedSizeArray<1, Anonymize<I35p85j063s0il>>;
    "UseAuctionSlots": FixedSizeArray<1, (boolean) | undefined>;
}>;
export type Iceajactc9a8pc = AnonymousEnum<{
    /**
     * Sets the session key(s) of the function caller to `keys`.
     * Allows an account to set its session key prior to becoming a validator.
     * This doesn't take effect until the next session.
     *
     * The dispatch origin of this function must be signed.
     *
     * ## Complexity
     * - `O(1)`. Actual cost depends on the number of length of `T::Keys::key_ids()` which is
     * fixed.
     */
    "set_keys": {
        "keys": {
            "grandpa": FixedSizeBinary<32>;
            "babe": FixedSizeBinary<32>;
            "para_validator": FixedSizeBinary<32>;
            "para_assignment": FixedSizeBinary<32>;
            "authority_discovery": FixedSizeBinary<32>;
            "beefy": FixedSizeBinary<33>;
        };
        "proof": Binary;
    };
    /**
     * Removes any session key(s) of the function caller.
     *
     * This doesn't take effect until the next session.
     *
     * The dispatch origin of this function must be Signed and the account must be either be
     * convertible to a validator ID using the chain's typical addressing system (this usually
     * means being a controller account) or directly convertible into a validator ID (which
     * usually means being a stash account).
     *
     * ## Complexity
     * - `O(1)` in number of key types. Actual cost depends on the number of length of
     * `T::Keys::key_ids()` which is fixed.
     */
    "purge_keys": undefined;
}>;
export type I5u9ggmn8umfqm = AnonymousEnum<{
    /**
     * Report voter equivocation/misbehavior. This method will verify the
     * equivocation proof and validate the given key ownership proof
     * against the extracted offender. If both are valid, the offence
     * will be reported.
     */
    "report_equivocation": {
        "equivocation_proof": {
            "set_id": bigint;
            "equivocation": GrandpaEquivocation;
        };
        "key_owner_proof": Anonymize<I3ia7aufsoj0l1>;
    };
    /**
     * Report voter equivocation/misbehavior. This method will verify the
     * equivocation proof and validate the given key ownership proof
     * against the extracted offender. If both are valid, the offence
     * will be reported.
     *
     * This extrinsic must be called unsigned and it is expected that only
     * block authors will call it (validated in `ValidateUnsigned`), as such
     * if the block author is defined it will be defined as the equivocation
     * reporter.
     */
    "report_equivocation_unsigned": {
        "equivocation_proof": {
            "set_id": bigint;
            "equivocation": GrandpaEquivocation;
        };
        "key_owner_proof": Anonymize<I3ia7aufsoj0l1>;
    };
    /**
     * Note that the current authority set of the GRANDPA finality gadget has stalled.
     *
     * This will trigger a forced authority set change at the beginning of the next session, to
     * be enacted `delay` blocks after that. The `delay` should be high enough to safely assume
     * that the block signalling the forced change will not be re-orged e.g. 1000 blocks.
     * The block production rate (which may be slowed down because of finality lagging) should
     * be taken into account when choosing the `delay`. The GRANDPA voters based on the new
     * authority will start voting on top of `best_finalized_block_number` for new finalized
     * blocks. `best_finalized_block_number` should be the highest of the latest finalized
     * block of all validators of the new authority set.
     *
     * Only callable by root.
     */
    "note_stalled": {
        "delay": number;
        "best_finalized_block_number": number;
    };
}>;
export type GrandpaEquivocation = Enum<{
    "Prevote": {
        "round_number": bigint;
        "identity": FixedSizeBinary<32>;
        "first": [{
            "target_hash": FixedSizeBinary<32>;
            "target_number": number;
        }, FixedSizeBinary<64>];
        "second": [{
            "target_hash": FixedSizeBinary<32>;
            "target_number": number;
        }, FixedSizeBinary<64>];
    };
    "Precommit": {
        "round_number": bigint;
        "identity": FixedSizeBinary<32>;
        "first": [{
            "target_hash": FixedSizeBinary<32>;
            "target_number": number;
        }, FixedSizeBinary<64>];
        "second": [{
            "target_hash": FixedSizeBinary<32>;
            "target_number": number;
        }, FixedSizeBinary<64>];
    };
}>;
export declare const GrandpaEquivocation: GetEnum<GrandpaEquivocation>;
export type I16qqgglq4ega1 = AnonymousEnum<{
    "system": Anonymize<I9gqitj4t615g3>;
    "Origins": WestendRuntimeGovernanceOriginsPalletCustomOriginsOrigin;
    "ParachainsOrigin": ParachainsOrigin;
    "XcmPallet": Anonymize<Icvilmd7qu30i4>;
}>;
export type I9gqitj4t615g3 = AnonymousEnum<{
    "Root": undefined;
    "Signed": SS58String;
    "None": undefined;
    "Authorized": undefined;
}>;
export type WestendRuntimeGovernanceOriginsPalletCustomOriginsOrigin = Enum<{
    "StakingAdmin": undefined;
    "Treasurer": undefined;
    "FellowshipAdmin": undefined;
    "GeneralAdmin": undefined;
    "AuctionAdmin": undefined;
    "LeaseAdmin": undefined;
    "ReferendumCanceller": undefined;
    "ReferendumKiller": undefined;
    "SmallTipper": undefined;
    "BigTipper": undefined;
    "SmallSpender": undefined;
    "MediumSpender": undefined;
    "BigSpender": undefined;
    "WhitelistedCaller": undefined;
    "FellowshipInitiates": undefined;
    "Fellows": undefined;
    "FellowshipExperts": undefined;
    "FellowshipMasters": undefined;
    "Fellowship1Dan": undefined;
    "Fellowship2Dan": undefined;
    "Fellowship3Dan": undefined;
    "Fellowship4Dan": undefined;
    "Fellowship5Dan": undefined;
    "Fellowship6Dan": undefined;
    "Fellowship7Dan": undefined;
    "Fellowship8Dan": undefined;
    "Fellowship9Dan": undefined;
}>;
export declare const WestendRuntimeGovernanceOriginsPalletCustomOriginsOrigin: GetEnum<WestendRuntimeGovernanceOriginsPalletCustomOriginsOrigin>;
export type ParachainsOrigin = Enum<{
    "Parachain": number;
}>;
export declare const ParachainsOrigin: GetEnum<ParachainsOrigin>;
export type Icvilmd7qu30i4 = AnonymousEnum<{
    "Xcm": Anonymize<If9iqq7i64mur8>;
    "Response": Anonymize<If9iqq7i64mur8>;
}>;
export type I8jelntdlnkiac = {
    "call": TxCallData;
    "weight": Anonymize<I4q39t5hn830vp>;
};
export type Ic6cqd9g0t65v0 = {
    "account": MultiAddress;
};
export type IdentityData = Enum<{
    "None": undefined;
    "Raw0": undefined;
    "Raw1": number;
    "Raw2": FixedSizeBinary<2>;
    "Raw3": FixedSizeBinary<3>;
    "Raw4": FixedSizeBinary<4>;
    "Raw5": FixedSizeBinary<5>;
    "Raw6": FixedSizeBinary<6>;
    "Raw7": FixedSizeBinary<7>;
    "Raw8": FixedSizeBinary<8>;
    "Raw9": FixedSizeBinary<9>;
    "Raw10": FixedSizeBinary<10>;
    "Raw11": FixedSizeBinary<11>;
    "Raw12": FixedSizeBinary<12>;
    "Raw13": FixedSizeBinary<13>;
    "Raw14": FixedSizeBinary<14>;
    "Raw15": FixedSizeBinary<15>;
    "Raw16": FixedSizeBinary<16>;
    "Raw17": FixedSizeBinary<17>;
    "Raw18": FixedSizeBinary<18>;
    "Raw19": FixedSizeBinary<19>;
    "Raw20": FixedSizeBinary<20>;
    "Raw21": FixedSizeBinary<21>;
    "Raw22": FixedSizeBinary<22>;
    "Raw23": FixedSizeBinary<23>;
    "Raw24": FixedSizeBinary<24>;
    "Raw25": FixedSizeBinary<25>;
    "Raw26": FixedSizeBinary<26>;
    "Raw27": FixedSizeBinary<27>;
    "Raw28": FixedSizeBinary<28>;
    "Raw29": FixedSizeBinary<29>;
    "Raw30": FixedSizeBinary<30>;
    "Raw31": FixedSizeBinary<31>;
    "Raw32": FixedSizeBinary<32>;
    "BlakeTwo256": FixedSizeBinary<32>;
    "Sha256": FixedSizeBinary<32>;
    "Keccak256": FixedSizeBinary<32>;
    "ShaThree256": FixedSizeBinary<32>;
}>;
export declare const IdentityData: GetEnum<IdentityData>;
export type IdentityJudgement = Enum<{
    "Unknown": undefined;
    "FeePaid": bigint;
    "Reasonable": undefined;
    "KnownGood": undefined;
    "OutOfDate": undefined;
    "LowQuality": undefined;
    "Erroneous": undefined;
}>;
export declare const IdentityJudgement: GetEnum<IdentityJudgement>;
export type Id9uqtigc0il3v = {
    "target": MultiAddress;
};
export type I86cdjmsf3a81s = (MultiSignature) | undefined;
export type MultiSignature = Enum<{
    "Ed25519": FixedSizeBinary<64>;
    "Sr25519": FixedSizeBinary<64>;
    "Ecdsa": FixedSizeBinary<65>;
}>;
export declare const MultiSignature: GetEnum<MultiSignature>;
export type I7pqmhr25d3dqq = {
    "lost": MultiAddress;
    "rescuer": MultiAddress;
};
export type I6s6ihmfj6j5qq = {
    "friends": Anonymize<Ia2lhg7l2hilo3>;
    "threshold": number;
    "delay_period": number;
};
export type I7ka1pdlbuevh2 = {
    "rescuer": MultiAddress;
};
export type Ia0jlc0rcbskuk = (MultiAddress) | undefined;
export type Icgf8vmtkbnu4u = AnonymousEnum<{
    /**
     * Unlock any vested funds of the sender account.
     *
     * The dispatch origin for this call must be _Signed_ and the sender must have funds still
     * locked under this pallet.
     *
     * Emits either `VestingCompleted` or `VestingUpdated`.
     *
     * ## Complexity
     * - `O(1)`.
     */
    "vest": undefined;
    /**
     * Unlock any vested funds of a `target` account.
     *
     * The dispatch origin for this call must be _Signed_.
     *
     * - `target`: The account whose vested funds should be unlocked. Must have funds still
     * locked under this pallet.
     *
     * Emits either `VestingCompleted` or `VestingUpdated`.
     *
     * ## Complexity
     * - `O(1)`.
     */
    "vest_other": Anonymize<Id9uqtigc0il3v>;
    /**
     * Create a vested transfer.
     *
     * The dispatch origin for this call must be _Signed_.
     *
     * - `target`: The account receiving the vested funds.
     * - `schedule`: The vesting schedule attached to the transfer.
     *
     * Emits `VestingCreated`.
     *
     * NOTE: This will unlock all schedules through the current block.
     *
     * ## Complexity
     * - `O(1)`.
     */
    "vested_transfer": {
        "target": MultiAddress;
        "schedule": Anonymize<I4aro1m78pdrtt>;
    };
    /**
     * Force a vested transfer.
     *
     * The dispatch origin for this call must be _Root_.
     *
     * - `source`: The account whose funds should be transferred.
     * - `target`: The account that should be transferred the vested funds.
     * - `schedule`: The vesting schedule attached to the transfer.
     *
     * Emits `VestingCreated`.
     *
     * NOTE: This will unlock all schedules through the current block.
     *
     * ## Complexity
     * - `O(1)`.
     */
    "force_vested_transfer": {
        "source": MultiAddress;
        "target": MultiAddress;
        "schedule": Anonymize<I4aro1m78pdrtt>;
    };
    /**
     * Merge two vesting schedules together, creating a new vesting schedule that unlocks over
     * the highest possible start and end blocks. If both schedules have already started the
     * current block will be used as the schedule start; with the caveat that if one schedule
     * is finished by the current block, the other will be treated as the new merged schedule,
     * unmodified.
     *
     * NOTE: If `schedule1_index == schedule2_index` this is a no-op.
     * NOTE: This will unlock all schedules through the current block prior to merging.
     * NOTE: If both schedules have ended by the current block, no new schedule will be created
     * and both will be removed.
     *
     * Merged schedule attributes:
     * - `starting_block`: `MAX(schedule1.starting_block, scheduled2.starting_block,
     * current_block)`.
     * - `ending_block`: `MAX(schedule1.ending_block, schedule2.ending_block)`.
     * - `locked`: `schedule1.locked_at(current_block) + schedule2.locked_at(current_block)`.
     *
     * The dispatch origin for this call must be _Signed_.
     *
     * - `schedule1_index`: index of the first schedule to merge.
     * - `schedule2_index`: index of the second schedule to merge.
     */
    "merge_schedules": {
        "schedule1_index": number;
        "schedule2_index": number;
    };
    /**
     * Force remove a vesting schedule
     *
     * The dispatch origin for this call must be _Root_.
     *
     * - `target`: An account that has a vesting schedule
     * - `schedule_index`: The vesting schedule index that should be removed
     */
    "force_remove_vesting_schedule": {
        "target": MultiAddress;
        "schedule_index": number;
    };
}>;
export type I4aro1m78pdrtt = {
    "locked": bigint;
    "per_block": bigint;
    "starting_block": number;
};
export type Iep7au1720bm0e = (Anonymize<I9jd27rnpm8ttv>) | undefined;
export type I9jd27rnpm8ttv = FixedSizeArray<2, number>;
export type I5n4sebgkfr760 = {
    "when": number;
    "index": number;
};
export type Ifs1i5fk9cqvr6 = {
    "id": FixedSizeBinary<32>;
};
export type Ieg3fd8p4pkt10 = {
    "task": Anonymize<I9jd27rnpm8ttv>;
    "retries": number;
    "period": number;
};
export type I8kg5ll427kfqq = {
    "id": FixedSizeBinary<32>;
    "retries": number;
    "period": number;
};
export type I467333262q1l9 = {
    "task": Anonymize<I9jd27rnpm8ttv>;
};
export type If81ks88t5mpk5 = AnonymousEnum<{
    /**
     * Register a preimage on-chain.
     *
     * If the preimage was previously requested, no fees or deposits are taken for providing
     * the preimage. Otherwise, a deposit is taken proportional to the size of the preimage.
     */
    "note_preimage": {
        "bytes": Binary;
    };
    /**
     * Clear an unrequested preimage from the runtime storage.
     *
     * If `len` is provided, then it will be a much cheaper operation.
     *
     * - `hash`: The hash of the preimage to be removed from the store.
     * - `len`: The length of the preimage of `hash`.
     */
    "unnote_preimage": Anonymize<I1jm8m1rh9e20v>;
    /**
     * Request a preimage be uploaded to the chain without paying any fees or deposits.
     *
     * If the preimage requests has already been provided on-chain, we unreserve any deposit
     * a user may have paid, and take the control of the preimage out of their hands.
     */
    "request_preimage": Anonymize<I1jm8m1rh9e20v>;
    /**
     * Clear a previously made request for a preimage.
     *
     * NOTE: THIS MUST NOT BE CALLED ON `hash` MORE TIMES THAN `request_preimage`.
     */
    "unrequest_preimage": Anonymize<I1jm8m1rh9e20v>;
    /**
     * Ensure that the bulk of pre-images is upgraded.
     *
     * The caller pays no fee if at least 90% of pre-images were successfully updated.
     */
    "ensure_updated": {
        "hashes": Anonymize<Ic5m5lp1oioo8r>;
    };
}>;
export type I1jm8m1rh9e20v = {
    "hash": FixedSizeBinary<32>;
};
export type Ic5m5lp1oioo8r = Array<FixedSizeBinary<32>>;
export type If1sr4hm0el5a0 = {
    "call": TxCallData;
};
export type I8k3rnvpeeh4hv = {
    "new": MultiAddress;
};
export type If6gdn1v27431a = (Anonymize<I4usd2cn59lcla>) | undefined;
export type I4usd2cn59lcla = AnonymousEnum<{
    "Any": undefined;
    "NonTransfer": undefined;
    "Governance": undefined;
    "Staking": undefined;
    "SudoBalances": undefined;
    "IdentityJudgement": undefined;
    "CancelProxy": undefined;
    "Auction": undefined;
    "NominationPools": undefined;
    "ParaRegistration": undefined;
}>;
export type I2eb501t8s6hsq = {
    "real": MultiAddress;
    "call_hash": FixedSizeBinary<32>;
};
export type Ianmuoljk2sk1u = {
    "delegate": MultiAddress;
    "call_hash": FixedSizeBinary<32>;
};
export type I95jfd8j5cr5eh = (Anonymize<Itvprrpb0nm3o>) | undefined;
export type Itvprrpb0nm3o = {
    "height": number;
    "index": number;
};
export type Ideaemvoneh309 = {
    "threshold": number;
    "other_signatories": Anonymize<Ia2lhg7l2hilo3>;
    "maybe_timepoint"?: Anonymize<I95jfd8j5cr5eh>;
    "call_hash": FixedSizeBinary<32>;
    "max_weight": Anonymize<I4q39t5hn830vp>;
};
export type I3d9o9d7epp66v = {
    "threshold": number;
    "other_signatories": Anonymize<Ia2lhg7l2hilo3>;
    "timepoint": Anonymize<Itvprrpb0nm3o>;
    "call_hash": FixedSizeBinary<32>;
};
export type I6lqh1vgb4mcja = {
    "threshold": number;
    "other_signatories": Anonymize<Ia2lhg7l2hilo3>;
    "call_hash": FixedSizeBinary<32>;
};
export type I31k9f0jol8ko4 = {
    "raw_solution": Anonymize<I7je4n92ump862>;
    "witness": Anonymize<Iasd2iat48n080>;
};
export type I7je4n92ump862 = {
    "solution": Anonymize<I1nvcsqg39g26j>;
    "score": Anonymize<I8s6n43okuj2b1>;
    "round": number;
};
export type I1nvcsqg39g26j = {
    "votes1": Anonymize<Iep4uo61810hfs>;
    "votes2": Anonymize<Ickjq69hlul8c3>;
    "votes3": Anonymize<Icf645ln9bi1bj>;
    "votes4": Anonymize<I8nospv7k5s457>;
    "votes5": Anonymize<Iig9pofg77rah>;
    "votes6": Anonymize<Irttjt9tghoc0>;
    "votes7": Anonymize<I3o5epjr2va0dl>;
    "votes8": Anonymize<I1gfnebceebqb5>;
    "votes9": Anonymize<Ibo38fh2dhj4it>;
    "votes10": Anonymize<Id4gvspmdh8h9l>;
    "votes11": Anonymize<I5be3ho5m1r68a>;
    "votes12": Anonymize<I7s2sh7cpuv56r>;
    "votes13": Anonymize<I5fq8855gfhmlo>;
    "votes14": Anonymize<I4mvok713k4g7o>;
    "votes15": Anonymize<I90tu9lmjmhfhd>;
    "votes16": Anonymize<I3cqaev9m4hn9m>;
};
export type Iep4uo61810hfs = Array<Anonymize<I5g2vv0ckl2m8b>>;
export type I5g2vv0ckl2m8b = [number, number];
export type Ickjq69hlul8c3 = Array<[number, Anonymize<I5g2vv0ckl2m8b>, number]>;
export type Icf645ln9bi1bj = Array<[number, FixedSizeArray<2, Anonymize<I5g2vv0ckl2m8b>>, number]>;
export type I8nospv7k5s457 = Array<[number, FixedSizeArray<3, Anonymize<I5g2vv0ckl2m8b>>, number]>;
export type Iig9pofg77rah = Array<[number, FixedSizeArray<4, Anonymize<I5g2vv0ckl2m8b>>, number]>;
export type Irttjt9tghoc0 = Array<[number, FixedSizeArray<5, Anonymize<I5g2vv0ckl2m8b>>, number]>;
export type I3o5epjr2va0dl = Array<[number, FixedSizeArray<6, Anonymize<I5g2vv0ckl2m8b>>, number]>;
export type I1gfnebceebqb5 = Array<[number, FixedSizeArray<7, Anonymize<I5g2vv0ckl2m8b>>, number]>;
export type Ibo38fh2dhj4it = Array<[number, FixedSizeArray<8, Anonymize<I5g2vv0ckl2m8b>>, number]>;
export type Id4gvspmdh8h9l = Array<[number, FixedSizeArray<9, Anonymize<I5g2vv0ckl2m8b>>, number]>;
export type I5be3ho5m1r68a = Array<[number, FixedSizeArray<10, Anonymize<I5g2vv0ckl2m8b>>, number]>;
export type I7s2sh7cpuv56r = Array<[number, FixedSizeArray<11, Anonymize<I5g2vv0ckl2m8b>>, number]>;
export type I5fq8855gfhmlo = Array<[number, FixedSizeArray<12, Anonymize<I5g2vv0ckl2m8b>>, number]>;
export type I4mvok713k4g7o = Array<[number, FixedSizeArray<13, Anonymize<I5g2vv0ckl2m8b>>, number]>;
export type I90tu9lmjmhfhd = Array<[number, FixedSizeArray<14, Anonymize<I5g2vv0ckl2m8b>>, number]>;
export type I3cqaev9m4hn9m = Array<[number, FixedSizeArray<15, Anonymize<I5g2vv0ckl2m8b>>, number]>;
export type I8s6n43okuj2b1 = {
    "minimal_stake": bigint;
    "sum_stake": bigint;
    "sum_stake_squared": bigint;
};
export type Iasd2iat48n080 = {
    "voters": number;
    "targets": number;
};
export type I80q14um2s2ckg = {
    "maybe_next_score"?: (Anonymize<I8s6n43okuj2b1>) | undefined;
};
export type I5qs1t1erfi7u8 = {
    "supports": Anonymize<I4bboqsv44evel>;
};
export type I4bboqsv44evel = Array<[SS58String, {
    "total": bigint;
    "voters": Array<Anonymize<I95l2k9b1re95f>>;
}]>;
export type I95l2k9b1re95f = [SS58String, bigint];
export type I9et13knvdvgpb = {
    "raw_solution": Anonymize<I7je4n92ump862>;
};
export type Ifvfo1l0vu2o7e = AnonymousEnum<{
    /**
     * Declare that some `dislocated` account has, through rewards or penalties, sufficiently
     * changed its score that it should properly fall into a different bag than its current
     * one.
     *
     * Anyone can call this function about any potentially dislocated account.
     *
     * Will always update the stored score of `dislocated` to the correct score, based on
     * `ScoreProvider`.
     *
     * If `dislocated` does not exists, it returns an error.
     */
    "rebag": {
        "dislocated": MultiAddress;
    };
    /**
     * Move the caller's Id directly in front of `lighter`.
     *
     * The dispatch origin for this call must be _Signed_ and can only be called by the Id of
     * the account going in front of `lighter`. Fee is payed by the origin under all
     * circumstances.
     *
     * Only works if:
     *
     * - both nodes are within the same bag,
     * - and `origin` has a greater `Score` than `lighter`.
     */
    "put_in_front_of": {
        "lighter": MultiAddress;
    };
    /**
     * Same as [`Pallet::put_in_front_of`], but it can be called by anyone.
     *
     * Fee is paid by the origin under all circumstances.
     */
    "put_in_front_of_other": {
        "heavier": MultiAddress;
        "lighter": MultiAddress;
    };
}>;
export type I57mljkkr28m9p = AnonymousEnum<{
    /**
     * Stake funds with a pool. The amount to bond is delegated (or transferred based on
     * [`adapter::StakeStrategyType`]) from the member to the pool account and immediately
     * increases the pool's bond.
     *
     * The method of transferring the amount to the pool account is determined by
     * [`adapter::StakeStrategyType`]. If the pool is configured to use
     * [`adapter::StakeStrategyType::Delegate`], the funds remain in the account of
     * the `origin`, while the pool gains the right to use these funds for staking.
     *
     * # Note
     *
     * * An account can only be a member of a single pool.
     * * An account cannot join the same pool multiple times.
     * * This call will *not* dust the member account, so the member must have at least
     * `existential deposit + amount` in their account.
     * * Only a pool with [`PoolState::Open`] can be joined
     */
    "join": Anonymize<Ieg1oc56mamrl5>;
    /**
     * Bond `extra` more funds from `origin` into the pool to which they already belong.
     *
     * Additional funds can come from either the free balance of the account, of from the
     * accumulated rewards, see [`BondExtra`].
     *
     * Bonding extra funds implies an automatic payout of all pending rewards as well.
     * See `bond_extra_other` to bond pending rewards of `other` members.
     */
    "bond_extra": {
        "extra": NominationPoolsBondExtra;
    };
    /**
     * A bonded member can use this to claim their payout based on the rewards that the pool
     * has accumulated since their last claimed payout (OR since joining if this is their first
     * time claiming rewards). The payout will be transferred to the member's account.
     *
     * The member will earn rewards pro rata based on the members stake vs the sum of the
     * members in the pools stake. Rewards do not "expire".
     *
     * See `claim_payout_other` to claim rewards on behalf of some `other` pool member.
     */
    "claim_payout": undefined;
    /**
     * Unbond up to `unbonding_points` of the `member_account`'s funds from the pool. It
     * implicitly collects the rewards one last time, since not doing so would mean some
     * rewards would be forfeited.
     *
     * Under certain conditions, this call can be dispatched permissionlessly (i.e. by any
     * account).
     *
     * # Conditions for a permissionless dispatch.
     *
     * * The pool is blocked and the caller is either the root or bouncer. This is refereed to
     * as a kick.
     * * The pool is destroying and the member is not the depositor.
     * * The pool is destroying, the member is the depositor and no other members are in the
     * pool.
     *
     * ## Conditions for permissioned dispatch (i.e. the caller is also the
     * `member_account`):
     *
     * * The caller is not the depositor.
     * * The caller is the depositor, the pool is destroying and no other members are in the
     * pool.
     *
     * # Note
     *
     * If there are too many unlocking chunks to unbond with the pool account,
     * [`Call::pool_withdraw_unbonded`] can be called to try and minimize unlocking chunks.
     * The [`StakingInterface::unbond`] will implicitly call [`Call::pool_withdraw_unbonded`]
     * to try to free chunks if necessary (ie. if unbound was called and no unlocking chunks
     * are available). However, it may not be possible to release the current unlocking chunks,
     * in which case, the result of this call will likely be the `NoMoreChunks` error from the
     * staking system.
     */
    "unbond": {
        "member_account": MultiAddress;
        "unbonding_points": bigint;
    };
    /**
     * Call `withdraw_unbonded` for the pools account. This call can be made by any account.
     *
     * This is useful if there are too many unlocking chunks to call `unbond`, and some
     * can be cleared by withdrawing. In the case there are too many unlocking chunks, the user
     * would probably see an error like `NoMoreChunks` emitted from the staking system when
     * they attempt to unbond.
     */
    "pool_withdraw_unbonded": {
        "pool_id": number;
        "num_slashing_spans": number;
    };
    /**
     * Withdraw unbonded funds from `member_account`. If no bonded funds can be unbonded, an
     * error is returned.
     *
     * Under certain conditions, this call can be dispatched permissionlessly (i.e. by any
     * account).
     *
     * # Conditions for a permissionless dispatch
     *
     * * The pool is in destroy mode and the target is not the depositor.
     * * The target is the depositor and they are the only member in the sub pools.
     * * The pool is blocked and the caller is either the root or bouncer.
     *
     * # Conditions for permissioned dispatch
     *
     * * The caller is the target and they are not the depositor.
     *
     * # Note
     *
     * - If the target is the depositor, the pool will be destroyed.
     * - If the pool has any pending slash, we also try to slash the member before letting them
     * withdraw. This calculation adds some weight overhead and is only defensive. In reality,
     * pool slashes must have been already applied via permissionless [`Call::apply_slash`].
     */
    "withdraw_unbonded": {
        "member_account": MultiAddress;
        "num_slashing_spans": number;
    };
    /**
     * Create a new delegation pool.
     *
     * # Arguments
     *
     * * `amount` - The amount of funds to delegate to the pool. This also acts of a sort of
     * deposit since the pools creator cannot fully unbond funds until the pool is being
     * destroyed.
     * * `index` - A disambiguation index for creating the account. Likely only useful when
     * creating multiple pools in the same extrinsic.
     * * `root` - The account to set as [`PoolRoles::root`].
     * * `nominator` - The account to set as the [`PoolRoles::nominator`].
     * * `bouncer` - The account to set as the [`PoolRoles::bouncer`].
     *
     * # Note
     *
     * In addition to `amount`, the caller will transfer the existential deposit; so the caller
     * needs at have at least `amount + existential_deposit` transferable.
     */
    "create": {
        "amount": bigint;
        "root": MultiAddress;
        "nominator": MultiAddress;
        "bouncer": MultiAddress;
    };
    /**
     * Create a new delegation pool with a previously used pool id
     *
     * # Arguments
     *
     * same as `create` with the inclusion of
     * * `pool_id` - `A valid PoolId.
     */
    "create_with_pool_id": {
        "amount": bigint;
        "root": MultiAddress;
        "nominator": MultiAddress;
        "bouncer": MultiAddress;
        "pool_id": number;
    };
    /**
     * Nominate on behalf of the pool.
     *
     * The dispatch origin of this call must be signed by the pool nominator or the pool
     * root role.
     *
     * This directly forwards the call to an implementation of `StakingInterface` (e.g.,
     * `pallet-staking`) through [`Config::StakeAdapter`], on behalf of the bonded pool.
     *
     * # Note
     *
     * In addition to a `root` or `nominator` role of `origin`, the pool's depositor needs to
     * have at least `depositor_min_bond` in the pool to start nominating.
     */
    "nominate": {
        "pool_id": number;
        "validators": Anonymize<Ia2lhg7l2hilo3>;
    };
    /**
     * Set a new state for the pool.
     *
     * If a pool is already in the `Destroying` state, then under no condition can its state
     * change again.
     *
     * The dispatch origin of this call must be either:
     *
     * 1. signed by the bouncer, or the root role of the pool,
     * 2. if the pool conditions to be open are NOT met (as described by `ok_to_be_open`), and
     * then the state of the pool can be permissionlessly changed to `Destroying`.
     */
    "set_state": {
        "pool_id": number;
        "state": NominationPoolsPoolState;
    };
    /**
     * Set a new metadata for the pool.
     *
     * The dispatch origin of this call must be signed by the bouncer, or the root role of the
     * pool.
     */
    "set_metadata": {
        "pool_id": number;
        "metadata": Binary;
    };
    /**
     * Update configurations for the nomination pools. The origin for this call must be
     * [`Config::AdminOrigin`].
     *
     * # Arguments
     *
     * * `min_join_bond` - Set [`MinJoinBond`].
     * * `min_create_bond` - Set [`MinCreateBond`].
     * * `max_pools` - Set [`MaxPools`].
     * * `max_members` - Set [`MaxPoolMembers`].
     * * `max_members_per_pool` - Set [`MaxPoolMembersPerPool`].
     * * `global_max_commission` - Set [`GlobalMaxCommission`].
     */
    "set_configs": {
        "min_join_bond": StakingPalletConfigOpBig;
        "min_create_bond": StakingPalletConfigOpBig;
        "max_pools": StakingPalletConfigOp;
        "max_members": StakingPalletConfigOp;
        "max_members_per_pool": StakingPalletConfigOp;
        "global_max_commission": StakingPalletConfigOp;
    };
    /**
     * Update the roles of the pool.
     *
     * The root is the only entity that can change any of the roles, including itself,
     * excluding the depositor, who can never change.
     *
     * It emits an event, notifying UIs of the role change. This event is quite relevant to
     * most pool members and they should be informed of changes to pool roles.
     */
    "update_roles": {
        "pool_id": number;
        "new_root": NominationPoolsConfigOp;
        "new_nominator": NominationPoolsConfigOp;
        "new_bouncer": NominationPoolsConfigOp;
    };
    /**
     * Chill on behalf of the pool.
     *
     * The dispatch origin of this call can be signed by the pool nominator or the pool
     * root role, same as [`Pallet::nominate`].
     *
     * This directly forwards the call to an implementation of `StakingInterface` (e.g.,
     * `pallet-staking`) through [`Config::StakeAdapter`], on behalf of the bonded pool.
     *
     * Under certain conditions, this call can be dispatched permissionlessly (i.e. by any
     * account).
     *
     * # Conditions for a permissionless dispatch:
     * * When pool depositor has less than `MinNominatorBond` staked, otherwise pool members
     * are unable to unbond.
     *
     * # Conditions for permissioned dispatch:
     * * The caller is the pool's nominator or root.
     */
    "chill": Anonymize<I931cottvong90>;
    /**
     * `origin` bonds funds from `extra` for some pool member `member` into their respective
     * pools.
     *
     * `origin` can bond extra funds from free balance or pending rewards when `origin ==
     * other`.
     *
     * In the case of `origin != other`, `origin` can only bond extra pending rewards of
     * `other` members assuming set_claim_permission for the given member is
     * `PermissionlessCompound` or `PermissionlessAll`.
     */
    "bond_extra_other": {
        "member": MultiAddress;
        "extra": NominationPoolsBondExtra;
    };
    /**
     * Allows a pool member to set a claim permission to allow or disallow permissionless
     * bonding and withdrawing.
     *
     * # Arguments
     *
     * * `origin` - Member of a pool.
     * * `permission` - The permission to be applied.
     */
    "set_claim_permission": {
        "permission": NominationPoolsClaimPermission;
    };
    /**
     * `origin` can claim payouts on some pool member `other`'s behalf.
     *
     * Pool member `other` must have a `PermissionlessWithdraw` or `PermissionlessAll` claim
     * permission for this call to be successful.
     */
    "claim_payout_other": {
        "other": SS58String;
    };
    /**
     * Set the commission of a pool.
     * Both a commission percentage and a commission payee must be provided in the `current`
     * tuple. Where a `current` of `None` is provided, any current commission will be removed.
     *
     * - If a `None` is supplied to `new_commission`, existing commission will be removed.
     */
    "set_commission": {
        "pool_id": number;
        "new_commission"?: ([number, SS58String]) | undefined;
    };
    /**
     * Set the maximum commission of a pool.
     *
     * - Initial max can be set to any `Perbill`, and only smaller values thereafter.
     * - Current commission will be lowered in the event it is higher than a new max
     * commission.
     */
    "set_commission_max": {
        "pool_id": number;
        "max_commission": number;
    };
    /**
     * Set the commission change rate for a pool.
     *
     * Initial change rate is not bounded, whereas subsequent updates can only be more
     * restrictive than the current.
     */
    "set_commission_change_rate": {
        "pool_id": number;
        "change_rate": {
            "max_increase": number;
            "min_delay": number;
        };
    };
    /**
     * Claim pending commission.
     *
     * The `root` role of the pool is _always_ allowed to claim the pool's commission.
     *
     * If the pool has set `CommissionClaimPermission::Permissionless`, then any account can
     * trigger the process of claiming the pool's commission.
     *
     * If the pool has set its `CommissionClaimPermission` to `Account(acc)`, then only
     * accounts
     * * `acc`, and
     * * the pool's root account
     *
     * may call this extrinsic on behalf of the pool.
     *
     * Pending commissions are paid out and added to the total claimed commission.
     * The total pending commission is reset to zero.
     */
    "claim_commission": Anonymize<I931cottvong90>;
    /**
     * Top up the deficit or withdraw the excess ED from the pool.
     *
     * When a pool is created, the pool depositor transfers ED to the reward account of the
     * pool. ED is subject to change and over time, the deposit in the reward account may be
     * insufficient to cover the ED deficit of the pool or vice-versa where there is excess
     * deposit to the pool. This call allows anyone to adjust the ED deposit of the
     * pool by either topping up the deficit or claiming the excess.
     */
    "adjust_pool_deposit": Anonymize<I931cottvong90>;
    /**
     * Set or remove a pool's commission claim permission.
     *
     * Determines who can claim the pool's pending commission. Only the `Root` role of the pool
     * is able to configure commission claim permissions.
     */
    "set_commission_claim_permission": {
        "pool_id": number;
        "permission"?: (NominationPoolsCommissionClaimPermission) | undefined;
    };
    /**
     * Apply a pending slash on a member.
     *
     * Fails unless [`crate::pallet::Config::StakeAdapter`] is of strategy type:
     * [`adapter::StakeStrategyType::Delegate`].
     *
     * The pending slash amount of the member must be equal or more than `ExistentialDeposit`.
     * This call can be dispatched permissionlessly (i.e. by any account). If the execution
     * is successful, fee is refunded and caller may be rewarded with a part of the slash
     * based on the [`crate::pallet::Config::StakeAdapter`] configuration.
     */
    "apply_slash": {
        "member_account": MultiAddress;
    };
    /**
     * Migrates delegated funds from the pool account to the `member_account`.
     *
     * Fails unless [`crate::pallet::Config::StakeAdapter`] is of strategy type:
     * [`adapter::StakeStrategyType::Delegate`].
     *
     * This is a permission-less call and refunds any fee if claim is successful.
     *
     * If the pool has migrated to delegation based staking, the staked tokens of pool members
     * can be moved and held in their own account. See [`adapter::DelegateStake`]
     */
    "migrate_delegation": {
        "member_account": MultiAddress;
    };
    /**
     * Migrate pool from [`adapter::StakeStrategyType::Transfer`] to
     * [`adapter::StakeStrategyType::Delegate`].
     *
     * Fails unless [`crate::pallet::Config::StakeAdapter`] is of strategy type:
     * [`adapter::StakeStrategyType::Delegate`].
     *
     * This call can be dispatched permissionlessly, and refunds any fee if successful.
     *
     * If the pool has already migrated to delegation based staking, this call will fail.
     */
    "migrate_pool_to_delegate_stake": Anonymize<I931cottvong90>;
}>;
export type Ieg1oc56mamrl5 = {
    "amount": bigint;
    "pool_id": number;
};
export type NominationPoolsBondExtra = Enum<{
    "FreeBalance": bigint;
    "Rewards": undefined;
}>;
export declare const NominationPoolsBondExtra: GetEnum<NominationPoolsBondExtra>;
export type NominationPoolsPoolState = Enum<{
    "Open": undefined;
    "Blocked": undefined;
    "Destroying": undefined;
}>;
export declare const NominationPoolsPoolState: GetEnum<NominationPoolsPoolState>;
export type NominationPoolsConfigOp = Enum<{
    "Noop": undefined;
    "Set": SS58String;
    "Remove": undefined;
}>;
export declare const NominationPoolsConfigOp: GetEnum<NominationPoolsConfigOp>;
export type I931cottvong90 = {
    "pool_id": number;
};
export type NominationPoolsClaimPermission = Enum<{
    "Permissioned": undefined;
    "PermissionlessCompound": undefined;
    "PermissionlessWithdraw": undefined;
    "PermissionlessAll": undefined;
}>;
export declare const NominationPoolsClaimPermission: GetEnum<NominationPoolsClaimPermission>;
export type NominationPoolsCommissionClaimPermission = Enum<{
    "Permissionless": undefined;
    "Account": SS58String;
}>;
export declare const NominationPoolsCommissionClaimPermission: GetEnum<NominationPoolsCommissionClaimPermission>;
export type I44snhj1gahvrd = AnonymousEnum<{
    /**
     * Register oneself for fast-unstake.
     *
     * ## Dispatch Origin
     *
     * The dispatch origin of this call must be *signed* by whoever is permitted to call
     * unbond funds by the staking system. See [`Config::Staking`].
     *
     * ## Details
     *
     * The stash associated with the origin must have no ongoing unlocking chunks. If
     * successful, this will fully unbond and chill the stash. Then, it will enqueue the stash
     * to be checked in further blocks.
     *
     * If by the time this is called, the stash is actually eligible for fast-unstake, then
     * they are guaranteed to remain eligible, because the call will chill them as well.
     *
     * If the check works, the entire staking data is removed, i.e. the stash is fully
     * unstaked.
     *
     * If the check fails, the stash remains chilled and waiting for being unbonded as in with
     * the normal staking system, but they lose part of their unbonding chunks due to consuming
     * the chain's resources.
     *
     * ## Events
     *
     * Some events from the staking and currency system might be emitted.
     */
    "register_fast_unstake": undefined;
    /**
     * Deregister oneself from the fast-unstake.
     *
     * ## Dispatch Origin
     *
     * The dispatch origin of this call must be *signed* by whoever is permitted to call
     * unbond funds by the staking system. See [`Config::Staking`].
     *
     * ## Details
     *
     * This is useful if one is registered, they are still waiting, and they change their mind.
     *
     * Note that the associated stash is still fully unbonded and chilled as a consequence of
     * calling [`Pallet::register_fast_unstake`]. Therefore, this should probably be followed
     * by a call to `rebond` in the staking system.
     *
     * ## Events
     *
     * Some events from the staking and currency system might be emitted.
     */
    "deregister": undefined;
    /**
     * Control the operation of this pallet.
     *
     * ## Dispatch Origin
     *
     * The dispatch origin of this call must be [`Config::ControlOrigin`].
     *
     * ## Details
     *
     * Can set the number of eras to check per block, and potentially other admin work.
     *
     * ## Events
     *
     * No events are emitted from this dispatch.
     */
    "control": {
        "eras_to_check": number;
    };
}>;
export type Ie5kd08tutk56t = AnonymousEnum<{
    /**
     * Vote in a poll. If `vote.is_aye()`, the vote is to enact the proposal;
     * otherwise it is a vote to keep the status quo.
     *
     * The dispatch origin of this call must be _Signed_.
     *
     * - `poll_index`: The index of the poll to vote for.
     * - `vote`: The vote configuration.
     *
     * Weight: `O(R)` where R is the number of polls the voter has voted on.
     */
    "vote": {
        "poll_index": number;
        "vote": ConvictionVotingVoteAccountVote;
    };
    /**
     * Delegate the voting power (with some given conviction) of the sending account for a
     * particular class of polls.
     *
     * The balance delegated is locked for as long as it's delegated, and thereafter for the
     * time appropriate for the conviction's lock period.
     *
     * The dispatch origin of this call must be _Signed_, and the signing account must either:
     * - be delegating already; or
     * - have no voting activity (if there is, then it will need to be removed through
     * `remove_vote`).
     *
     * - `to`: The account whose voting the `target` account's voting power will follow.
     * - `class`: The class of polls to delegate. To delegate multiple classes, multiple calls
     * to this function are required.
     * - `conviction`: The conviction that will be attached to the delegated votes. When the
     * account is undelegated, the funds will be locked for the corresponding period.
     * - `balance`: The amount of the account's balance to be used in delegating. This must not
     * be more than the account's current balance.
     *
     * Emits `Delegated`.
     *
     * Weight: `O(R)` where R is the number of polls the voter delegating to has
     * voted on. Weight is initially charged as if maximum votes, but is refunded later.
     */
    "delegate": {
        "class": number;
        "to": MultiAddress;
        "conviction": VotingConviction;
        "balance": bigint;
    };
    /**
     * Undelegate the voting power of the sending account for a particular class of polls.
     *
     * Tokens may be unlocked following once an amount of time consistent with the lock period
     * of the conviction with which the delegation was issued has passed.
     *
     * The dispatch origin of this call must be _Signed_ and the signing account must be
     * currently delegating.
     *
     * - `class`: The class of polls to remove the delegation from.
     *
     * Emits `Undelegated`.
     *
     * Weight: `O(R)` where R is the number of polls the voter delegating to has
     * voted on. Weight is initially charged as if maximum votes, but is refunded later.
     */
    "undelegate": {
        "class": number;
    };
    /**
     * Remove the lock caused by prior voting/delegating which has expired within a particular
     * class.
     *
     * The dispatch origin of this call must be _Signed_.
     *
     * - `class`: The class of polls to unlock.
     * - `target`: The account to remove the lock on.
     *
     * Weight: `O(R)` with R number of vote of target.
     */
    "unlock": {
        "class": number;
        "target": MultiAddress;
    };
    /**
     * Remove a vote for a poll.
     *
     * If:
     * - the poll was cancelled, or
     * - the poll is ongoing, or
     * - the poll has ended such that
     * - the vote of the account was in opposition to the result; or
     * - there was no conviction to the account's vote; or
     * - the account made a split vote
     * ...then the vote is removed cleanly and a following call to `unlock` may result in more
     * funds being available.
     *
     * If, however, the poll has ended and:
     * - it finished corresponding to the vote of the account, and
     * - the account made a standard vote with conviction, and
     * - the lock period of the conviction is not over
     * ...then the lock will be aggregated into the overall account's lock, which may involve
     * *overlocking* (where the two locks are combined into a single lock that is the maximum
     * of both the amount locked and the time is it locked for).
     *
     * The dispatch origin of this call must be _Signed_, and the signer must have a vote
     * registered for poll `index`.
     *
     * - `index`: The index of poll of the vote to be removed.
     * - `class`: Optional parameter, if given it indicates the class of the poll. For polls
     * which have finished or are cancelled, this must be `Some`.
     *
     * Weight: `O(R + log R)` where R is the number of polls that `target` has voted on.
     * Weight is calculated for the maximum number of vote.
     */
    "remove_vote": {
        "class"?: Anonymize<I4arjljr6dpflb>;
        "index": number;
    };
    /**
     * Remove a vote for a poll.
     *
     * If the `target` is equal to the signer, then this function is exactly equivalent to
     * `remove_vote`. If not equal to the signer, then the vote must have expired,
     * either because the poll was cancelled, because the voter lost the poll or
     * because the conviction period is over.
     *
     * The dispatch origin of this call must be _Signed_.
     *
     * - `target`: The account of the vote to be removed; this account must have voted for poll
     * `index`.
     * - `index`: The index of poll of the vote to be removed.
     * - `class`: The class of the poll.
     *
     * Weight: `O(R + log R)` where R is the number of polls that `target` has voted on.
     * Weight is calculated for the maximum number of vote.
     */
    "remove_other_vote": {
        "target": MultiAddress;
        "class": number;
        "index": number;
    };
}>;
export type ConvictionVotingVoteAccountVote = Enum<{
    "Standard": {
        "vote": number;
        "balance": bigint;
    };
    "Split": {
        "aye": bigint;
        "nay": bigint;
    };
    "SplitAbstain": {
        "aye": bigint;
        "nay": bigint;
        "abstain": bigint;
    };
}>;
export declare const ConvictionVotingVoteAccountVote: GetEnum<ConvictionVotingVoteAccountVote>;
export type VotingConviction = Enum<{
    "None": undefined;
    "Locked1x": undefined;
    "Locked2x": undefined;
    "Locked3x": undefined;
    "Locked4x": undefined;
    "Locked5x": undefined;
    "Locked6x": undefined;
}>;
export declare const VotingConviction: GetEnum<VotingConviction>;
export type I4arjljr6dpflb = (number) | undefined;
export type PreimagesBounded = Enum<{
    "Legacy": Anonymize<I1jm8m1rh9e20v>;
    "Inline": Binary;
    "Lookup": {
        "hash": FixedSizeBinary<32>;
        "len": number;
    };
}>;
export declare const PreimagesBounded: GetEnum<PreimagesBounded>;
export type TraitsScheduleDispatchTime = Enum<{
    "At": number;
    "After": number;
}>;
export declare const TraitsScheduleDispatchTime: GetEnum<TraitsScheduleDispatchTime>;
export type Icbio0e1f0034b = {
    "track": number;
};
export type I8c0vkqjjipnuj = {
    "index": number;
    "maybe_hash"?: Anonymize<I4s6vifaf8k998>;
};
export type I4s6vifaf8k998 = (FixedSizeBinary<32>) | undefined;
export type I1adbcfi5uc62r = {
    "call_hash": FixedSizeBinary<32>;
};
export type Ibf6ucefn8fh49 = {
    "call_hash": FixedSizeBinary<32>;
    "call_encoded_len": number;
    "call_weight_witness": Anonymize<I4q39t5hn830vp>;
};
export type I6jnp85onk3m8j = AnonymousEnum<{
    /**
     * Propose and approve a spend of treasury funds.
     *
     * ## Dispatch Origin
     *
     * Must be [`Config::SpendOrigin`] with the `Success` value being at least `amount`.
     *
     * ### Details
     * NOTE: For record-keeping purposes, the proposer is deemed to be equivalent to the
     * beneficiary.
     *
     * ### Parameters
     * - `amount`: The amount to be transferred from the treasury to the `beneficiary`.
     * - `beneficiary`: The destination account for the transfer.
     *
     * ## Events
     *
     * Emits [`Event::SpendApproved`] if successful.
     */
    "spend_local": Anonymize<Icnrv1mfbd3in1>;
    /**
     * Force a previously approved proposal to be removed from the approval queue.
     *
     * ## Dispatch Origin
     *
     * Must be [`Config::RejectOrigin`].
     *
     * ## Details
     *
     * The original deposit will no longer be returned.
     *
     * ### Parameters
     * - `proposal_id`: The index of a proposal
     *
     * ### Complexity
     * - O(A) where `A` is the number of approvals
     *
     * ### Errors
     * - [`Error::ProposalNotApproved`]: The `proposal_id` supplied was not found in the
     * approval queue, i.e., the proposal has not been approved. This could also mean the
     * proposal does not exist altogether, thus there is no way it would have been approved
     * in the first place.
     */
    "remove_approval": Anonymize<Icm9m0qeemu66d>;
    /**
     * Propose and approve a spend of treasury funds.
     *
     * ## Dispatch Origin
     *
     * Must be [`Config::SpendOrigin`] with the `Success` value being at least
     * `amount` of `asset_kind` in the native asset. The amount of `asset_kind` is converted
     * for assertion using the [`Config::BalanceConverter`].
     *
     * ## Details
     *
     * Create an approved spend for transferring a specific `amount` of `asset_kind` to a
     * designated beneficiary. The spend must be claimed using the `payout` dispatchable within
     * the [`Config::PayoutPeriod`].
     *
     * ### Parameters
     * - `asset_kind`: An indicator of the specific asset class to be spent.
     * - `amount`: The amount to be transferred from the treasury to the `beneficiary`.
     * - `beneficiary`: The beneficiary of the spend.
     * - `valid_from`: The block number from which the spend can be claimed. It can refer to
     * the past if the resulting spend has not yet expired according to the
     * [`Config::PayoutPeriod`]. If `None`, the spend can be claimed immediately after
     * approval.
     *
     * ## Events
     *
     * Emits [`Event::AssetSpendApproved`] if successful.
     */
    "spend": {
        "asset_kind": Anonymize<I2q3ri6itcjj5u>;
        "amount": bigint;
        "beneficiary": XcmVersionedLocation;
        "valid_from"?: Anonymize<I4arjljr6dpflb>;
    };
    /**
     * Claim a spend.
     *
     * ## Dispatch Origin
     *
     * Must be signed
     *
     * ## Details
     *
     * Spends must be claimed within some temporal bounds. A spend may be claimed within one
     * [`Config::PayoutPeriod`] from the `valid_from` block.
     * In case of a payout failure, the spend status must be updated with the `check_status`
     * dispatchable before retrying with the current function.
     *
     * ### Parameters
     * - `index`: The spend index.
     *
     * ## Events
     *
     * Emits [`Event::Paid`] if successful.
     */
    "payout": Anonymize<I666bl2fqjkejo>;
    /**
     * Check the status of the spend and remove it from the storage if processed.
     *
     * ## Dispatch Origin
     *
     * Must be signed.
     *
     * ## Details
     *
     * The status check is a prerequisite for retrying a failed payout.
     * If a spend has either succeeded or expired, it is removed from the storage by this
     * function. In such instances, transaction fees are refunded.
     *
     * ### Parameters
     * - `index`: The spend index.
     *
     * ## Events
     *
     * Emits [`Event::PaymentFailed`] if the spend payout has failed.
     * Emits [`Event::SpendProcessed`] if the spend payout has succeed.
     */
    "check_status": Anonymize<I666bl2fqjkejo>;
    /**
     * Void previously approved spend.
     *
     * ## Dispatch Origin
     *
     * Must be [`Config::RejectOrigin`].
     *
     * ## Details
     *
     * A spend void is only possible if the payout has not been attempted yet.
     *
     * ### Parameters
     * - `index`: The spend index.
     *
     * ## Events
     *
     * Emits [`Event::AssetSpendVoided`] if successful.
     */
    "void_spend": Anonymize<I666bl2fqjkejo>;
}>;
export type Icnrv1mfbd3in1 = {
    "amount": bigint;
    "beneficiary": MultiAddress;
};
export type Icm9m0qeemu66d = {
    "proposal_id": number;
};
export type I2q3ri6itcjj5u = AnonymousEnum<{
    "V3": {
        "location": Anonymize<I4c0s5cioidn76>;
        "asset_id": XcmV3MultiassetAssetId;
    };
    "V4": {
        "location": Anonymize<I4c0s5cioidn76>;
        "asset_id": Anonymize<I4c0s5cioidn76>;
    };
    "V5": {
        "location": Anonymize<If9iqq7i64mur8>;
        "asset_id": Anonymize<If9iqq7i64mur8>;
    };
}>;
export type I3ah0kpgrv4i88 = AnonymousEnum<{
    /**
     * Set the validation upgrade cooldown.
     */
    "set_validation_upgrade_cooldown": Anonymize<I3vh014cqgmrfd>;
    /**
     * Set the validation upgrade delay.
     */
    "set_validation_upgrade_delay": Anonymize<I3vh014cqgmrfd>;
    /**
     * Set the acceptance period for an included candidate.
     */
    "set_code_retention_period": Anonymize<I3vh014cqgmrfd>;
    /**
     * Set the max validation code size for incoming upgrades.
     */
    "set_max_code_size": Anonymize<I3vh014cqgmrfd>;
    /**
     * Set the max POV block size for incoming upgrades.
     */
    "set_max_pov_size": Anonymize<I3vh014cqgmrfd>;
    /**
     * Set the max head data size for paras.
     */
    "set_max_head_data_size": Anonymize<I3vh014cqgmrfd>;
    /**
     * Set the number of coretime execution cores.
     *
     * NOTE: that this configuration is managed by the coretime chain. Only manually change
     * this, if you really know what you are doing!
     */
    "set_coretime_cores": Anonymize<I3vh014cqgmrfd>;
    /**
     * Set the parachain validator-group rotation frequency
     */
    "set_group_rotation_frequency": Anonymize<I3vh014cqgmrfd>;
    /**
     * Set the availability period for paras.
     */
    "set_paras_availability_period": Anonymize<I3vh014cqgmrfd>;
    /**
     * Set the scheduling lookahead, in expected number of blocks at peak throughput.
     */
    "set_scheduling_lookahead": Anonymize<I3vh014cqgmrfd>;
    /**
     * Set the maximum number of validators to assign to any core.
     */
    "set_max_validators_per_core": {
        "new"?: Anonymize<I4arjljr6dpflb>;
    };
    /**
     * Set the maximum number of validators to use in parachain consensus.
     */
    "set_max_validators": {
        "new"?: Anonymize<I4arjljr6dpflb>;
    };
    /**
     * Set the dispute period, in number of sessions to keep for disputes.
     */
    "set_dispute_period": Anonymize<I3vh014cqgmrfd>;
    /**
     * Set the dispute post conclusion acceptance period.
     */
    "set_dispute_post_conclusion_acceptance_period": Anonymize<I3vh014cqgmrfd>;
    /**
     * Set the no show slots, in number of number of consensus slots.
     * Must be at least 1.
     */
    "set_no_show_slots": Anonymize<I3vh014cqgmrfd>;
    /**
     * Set the total number of delay tranches.
     */
    "set_n_delay_tranches": Anonymize<I3vh014cqgmrfd>;
    /**
     * Set the zeroth delay tranche width.
     */
    "set_zeroth_delay_tranche_width": Anonymize<I3vh014cqgmrfd>;
    /**
     * Set the number of validators needed to approve a block.
     */
    "set_needed_approvals": Anonymize<I3vh014cqgmrfd>;
    /**
     * Set the number of samples to do of the `RelayVRFModulo` approval assignment criterion.
     */
    "set_relay_vrf_modulo_samples": Anonymize<I3vh014cqgmrfd>;
    /**
     * Sets the maximum items that can present in a upward dispatch queue at once.
     */
    "set_max_upward_queue_count": Anonymize<I3vh014cqgmrfd>;
    /**
     * Sets the maximum total size of items that can present in a upward dispatch queue at
     * once.
     */
    "set_max_upward_queue_size": Anonymize<I3vh014cqgmrfd>;
    /**
     * Set the critical downward message size.
     */
    "set_max_downward_message_size": Anonymize<I3vh014cqgmrfd>;
    /**
     * Sets the maximum size of an upward message that can be sent by a candidate.
     */
    "set_max_upward_message_size": Anonymize<I3vh014cqgmrfd>;
    /**
     * Sets the maximum number of messages that a candidate can contain.
     */
    "set_max_upward_message_num_per_candidate": Anonymize<I3vh014cqgmrfd>;
    /**
     * Sets the number of sessions after which an HRMP open channel request expires.
     */
    "set_hrmp_open_request_ttl": Anonymize<I3vh014cqgmrfd>;
    /**
     * Sets the amount of funds that the sender should provide for opening an HRMP channel.
     */
    "set_hrmp_sender_deposit": {
        "new": bigint;
    };
    /**
     * Sets the amount of funds that the recipient should provide for accepting opening an HRMP
     * channel.
     */
    "set_hrmp_recipient_deposit": {
        "new": bigint;
    };
    /**
     * Sets the maximum number of messages allowed in an HRMP channel at once.
     */
    "set_hrmp_channel_max_capacity": Anonymize<I3vh014cqgmrfd>;
    /**
     * Sets the maximum total size of messages in bytes allowed in an HRMP channel at once.
     */
    "set_hrmp_channel_max_total_size": Anonymize<I3vh014cqgmrfd>;
    /**
     * Sets the maximum number of inbound HRMP channels a parachain is allowed to accept.
     */
    "set_hrmp_max_parachain_inbound_channels": Anonymize<I3vh014cqgmrfd>;
    /**
     * Sets the maximum size of a message that could ever be put into an HRMP channel.
     */
    "set_hrmp_channel_max_message_size": Anonymize<I3vh014cqgmrfd>;
    /**
     * Sets the maximum number of outbound HRMP channels a parachain is allowed to open.
     */
    "set_hrmp_max_parachain_outbound_channels": Anonymize<I3vh014cqgmrfd>;
    /**
     * Sets the maximum number of outbound HRMP messages can be sent by a candidate.
     */
    "set_hrmp_max_message_num_per_candidate": Anonymize<I3vh014cqgmrfd>;
    /**
     * Set the number of session changes after which a PVF pre-checking voting is rejected.
     */
    "set_pvf_voting_ttl": Anonymize<I3vh014cqgmrfd>;
    /**
     * Sets the minimum delay between announcing the upgrade block for a parachain until the
     * upgrade taking place.
     *
     * See the field documentation for information and constraints for the new value.
     */
    "set_minimum_validation_upgrade_delay": Anonymize<I3vh014cqgmrfd>;
    /**
     * Setting this to true will disable consistency checks for the configuration setters.
     * Use with caution.
     */
    "set_bypass_consistency_check": {
        "new": boolean;
    };
    /**
     * Set the asynchronous backing parameters.
     */
    "set_async_backing_params": {
        "new": {
            "max_candidate_depth": number;
            "allowed_ancestry_len": number;
        };
    };
    /**
     * Set PVF executor parameters.
     */
    "set_executor_params": {
        "new": Array<PolkadotPrimitivesV6ExecutorParamsExecutorParam>;
    };
    /**
     * Set the on demand (parathreads) base fee.
     */
    "set_on_demand_base_fee": {
        "new": bigint;
    };
    /**
     * Set the on demand (parathreads) fee variability.
     */
    "set_on_demand_fee_variability": Anonymize<I3vh014cqgmrfd>;
    /**
     * Set the on demand (parathreads) queue max size.
     */
    "set_on_demand_queue_max_size": Anonymize<I3vh014cqgmrfd>;
    /**
     * Set the on demand (parathreads) fee variability.
     */
    "set_on_demand_target_queue_utilization": Anonymize<I3vh014cqgmrfd>;
    /**
     * Set the minimum backing votes threshold.
     */
    "set_minimum_backing_votes": Anonymize<I3vh014cqgmrfd>;
    /**
     * Set/Unset a node feature.
     */
    "set_node_feature": {
        "index": number;
        "value": boolean;
    };
    /**
     * Set approval-voting-params.
     */
    "set_approval_voting_params": Anonymize<I3vh014cqgmrfd>;
    /**
     * Set scheduler-params.
     */
    "set_scheduler_params": {
        "new": {
            "group_rotation_frequency": number;
            "paras_availability_period": number;
            "max_validators_per_core"?: Anonymize<I4arjljr6dpflb>;
            "lookahead": number;
            "num_cores": number;
            "max_availability_timeouts": number;
            "on_demand_queue_max_size": number;
            "on_demand_target_queue_utilization": number;
            "on_demand_fee_variability": number;
            "on_demand_base_fee": bigint;
            "ttl": number;
        };
    };
}>;
export type PolkadotPrimitivesV6ExecutorParamsExecutorParam = Enum<{
    "MaxMemoryPages": number;
    "StackLogicalMax": number;
    "StackNativeMax": number;
    "PrecheckingMaxMemory": bigint;
    "PvfPrepTimeout": [PolkadotPrimitivesV6PvfPrepKind, bigint];
    "PvfExecTimeout": [PvfExecKind, bigint];
    "WasmExtBulkMemory": undefined;
}>;
export declare const PolkadotPrimitivesV6ExecutorParamsExecutorParam: GetEnum<PolkadotPrimitivesV6ExecutorParamsExecutorParam>;
export type PolkadotPrimitivesV6PvfPrepKind = Enum<{
    "Precheck": undefined;
    "Prepare": undefined;
}>;
export declare const PolkadotPrimitivesV6PvfPrepKind: GetEnum<PolkadotPrimitivesV6PvfPrepKind>;
export type PvfExecKind = Enum<{
    "Backing": undefined;
    "Approval": undefined;
}>;
export declare const PvfExecKind: GetEnum<PvfExecKind>;
export type I1nu19212e8egv = AnonymousEnum<{
    /**
     * Enter the paras inherent. This will process bitfields and backed candidates.
     */
    "enter": {
        "data": {
            "bitfields": Array<{
                "payload": Array<0 | 1>;
                "validator_index": number;
                "signature": FixedSizeBinary<64>;
            }>;
            "backed_candidates": Array<{
                "candidate": {
                    "descriptor": {
                        "para_id": number;
                        "relay_parent": FixedSizeBinary<32>;
                        "version": number;
                        "core_index": number;
                        "session_index": number;
                        "reserved1": FixedSizeBinary<25>;
                        "persisted_validation_data_hash": FixedSizeBinary<32>;
                        "pov_hash": FixedSizeBinary<32>;
                        "erasure_root": FixedSizeBinary<32>;
                        "reserved2": FixedSizeBinary<64>;
                        "para_head": FixedSizeBinary<32>;
                        "validation_code_hash": FixedSizeBinary<32>;
                    };
                    "commitments": {
                        "upward_messages": Anonymize<Itom7fk49o0c9>;
                        "horizontal_messages": Array<{
                            "recipient": number;
                            "data": Binary;
                        }>;
                        "new_validation_code"?: Anonymize<Iabpgqcjikia83>;
                        "head_data": Binary;
                        "processed_downward_messages": number;
                        "hrmp_watermark": number;
                    };
                };
                "validity_votes": Array<ValidityAttestation>;
                "validator_indices": Array<0 | 1>;
            }>;
            "disputes": Array<{
                "candidate_hash": FixedSizeBinary<32>;
                "session": number;
                "statements": Array<[PolkadotPrimitivesV6DisputeStatement, number, FixedSizeBinary<64>]>;
            }>;
            "parent_header": Anonymize<Ic952bubvq4k7d>;
        };
    };
}>;
export type Iabpgqcjikia83 = (Binary) | undefined;
export type ValidityAttestation = Enum<{
    "Implicit": FixedSizeBinary<64>;
    "Explicit": FixedSizeBinary<64>;
}>;
export declare const ValidityAttestation: GetEnum<ValidityAttestation>;
export type PolkadotPrimitivesV6DisputeStatement = Enum<{
    "Valid": PolkadotPrimitivesV6ValidDisputeStatementKind;
    "Invalid": InvalidDisputeStatementKind;
}>;
export declare const PolkadotPrimitivesV6DisputeStatement: GetEnum<PolkadotPrimitivesV6DisputeStatement>;
export type PolkadotPrimitivesV6ValidDisputeStatementKind = Enum<{
    "Explicit": undefined;
    "BackingSeconded": FixedSizeBinary<32>;
    "BackingValid": FixedSizeBinary<32>;
    "ApprovalChecking": undefined;
    "ApprovalCheckingMultipleCandidates": Anonymize<Ic5m5lp1oioo8r>;
}>;
export declare const PolkadotPrimitivesV6ValidDisputeStatementKind: GetEnum<PolkadotPrimitivesV6ValidDisputeStatementKind>;
export type InvalidDisputeStatementKind = Enum<{
    "Explicit": undefined;
}>;
export declare const InvalidDisputeStatementKind: GetEnum<InvalidDisputeStatementKind>;
export type I1k3urvkqqshbc = {
    "para": number;
    "new_code": Binary;
};
export type I2ff0ffsh15vej = {
    "para": number;
    "new_head": Binary;
};
export type I1orfg86bkg123 = {
    "para": number;
    "new_code": Binary;
    "relay_parent_number": number;
};
export type Iaus4cb3drhu9q = {
    "para": number;
};
export type Ivnsat10lv9d6 = {
    "validation_code": Binary;
};
export type Ibncli8qttt2c2 = {
    "validation_code_hash": FixedSizeBinary<32>;
};
export type I33rft6ag34efs = {
    "stmt": {
        "accept": boolean;
        "subject": FixedSizeBinary<32>;
        "session_index": number;
        "validator_index": number;
    };
    "signature": FixedSizeBinary<64>;
};
export type I9tmok5kceg2bg = {
    "para": number;
    "context": number;
};
export type Ieggtnkc96vvt7 = AnonymousEnum<{
    /**
     * Issue a signal to the consensus engine to forcibly act as though all parachain
     * blocks in all relay chain blocks up to and including the given number in the current
     * chain are valid and should be finalized.
     */
    "force_approve": {
        "up_to": number;
    };
}>;
export type I45adic8nko129 = AnonymousEnum<{
    /**
     * Initiate opening a channel from a parachain to a given recipient with given channel
     * parameters.
     *
     * - `proposed_max_capacity` - specifies how many messages can be in the channel at once.
     * - `proposed_max_message_size` - specifies the maximum size of the messages.
     *
     * These numbers are a subject to the relay-chain configuration limits.
     *
     * The channel can be opened only after the recipient confirms it and only on a session
     * change.
     */
    "hrmp_init_open_channel": {
        "recipient": number;
        "proposed_max_capacity": number;
        "proposed_max_message_size": number;
    };
    /**
     * Accept a pending open channel request from the given sender.
     *
     * The channel will be opened only on the next session boundary.
     */
    "hrmp_accept_open_channel": {
        "sender": number;
    };
    /**
     * Initiate unilateral closing of a channel. The origin must be either the sender or the
     * recipient in the channel being closed.
     *
     * The closure can only happen on a session change.
     */
    "hrmp_close_channel": {
        "channel_id": Anonymize<I50mrcbubp554e>;
    };
    /**
     * This extrinsic triggers the cleanup of all the HRMP storage items that a para may have.
     * Normally this happens once per session, but this allows you to trigger the cleanup
     * immediately for a specific parachain.
     *
     * Number of inbound and outbound channels for `para` must be provided as witness data.
     *
     * Origin must be the `ChannelManager`.
     */
    "force_clean_hrmp": {
        "para": number;
        "num_inbound": number;
        "num_outbound": number;
    };
    /**
     * Force process HRMP open channel requests.
     *
     * If there are pending HRMP open channel requests, you can use this function to process
     * all of those requests immediately.
     *
     * Total number of opening channels must be provided as witness data.
     *
     * Origin must be the `ChannelManager`.
     */
    "force_process_hrmp_open": {
        "channels": number;
    };
    /**
     * Force process HRMP close channel requests.
     *
     * If there are pending HRMP close channel requests, you can use this function to process
     * all of those requests immediately.
     *
     * Total number of closing channels must be provided as witness data.
     *
     * Origin must be the `ChannelManager`.
     */
    "force_process_hrmp_close": {
        "channels": number;
    };
    /**
     * This cancels a pending open channel request. It can be canceled by either of the sender
     * or the recipient for that request. The origin must be either of those.
     *
     * The cancellation happens immediately. It is not possible to cancel the request if it is
     * already accepted.
     *
     * Total number of open requests (i.e. `HrmpOpenChannelRequestsList`) must be provided as
     * witness data.
     */
    "hrmp_cancel_open_request": {
        "channel_id": Anonymize<I50mrcbubp554e>;
        "open_requests": number;
    };
    /**
     * Open a channel from a `sender` to a `recipient` `ParaId`. Although opened by governance,
     * the `max_capacity` and `max_message_size` are still subject to the Relay Chain's
     * configured limits.
     *
     * Expected use is when one (and only one) of the `ParaId`s involved in the channel is
     * governed by the system, e.g. a system parachain.
     *
     * Origin must be the `ChannelManager`.
     */
    "force_open_hrmp_channel": Anonymize<Ic3430470j4mbv>;
    /**
     * Establish an HRMP channel between two system chains. If the channel does not already
     * exist, the transaction fees will be refunded to the caller. The system does not take
     * deposits for channels between system chains, and automatically sets the message number
     * and size limits to the maximum allowed by the network's configuration.
     *
     * Arguments:
     *
     * - `sender`: A system chain, `ParaId`.
     * - `recipient`: A system chain, `ParaId`.
     *
     * Any signed origin can call this function, but _both_ inputs MUST be system chains. If
     * the channel does not exist yet, there is no fee.
     */
    "establish_system_channel": Anonymize<I50mrcbubp554e>;
    /**
     * Update the deposits held for an HRMP channel to the latest `Configuration`. Channels
     * with system chains do not require a deposit.
     *
     * Arguments:
     *
     * - `sender`: A chain, `ParaId`.
     * - `recipient`: A chain, `ParaId`.
     *
     * Any signed origin can call this function.
     */
    "poke_channel_deposits": Anonymize<I50mrcbubp554e>;
    /**
     * Establish a bidirectional HRMP channel between a parachain and a system chain.
     *
     * Arguments:
     *
     * - `target_system_chain`: A system chain, `ParaId`.
     *
     * The origin needs to be the parachain origin.
     */
    "establish_channel_with_system": {
        "target_system_chain": number;
    };
}>;
export type I50mrcbubp554e = {
    "sender": number;
    "recipient": number;
};
export type Ic3430470j4mbv = {
    "sender": number;
    "recipient": number;
    "max_capacity": number;
    "max_message_size": number;
};
export type Ifkh1ep7g9h3rv = AnonymousEnum<{
    "force_unfreeze": undefined;
}>;
export type I7a6dbilbccifr = AnonymousEnum<{
    "report_dispute_lost_unsigned": {
        "dispute_proof": {
            "time_slot": Anonymize<Iee37emj23tmbu>;
            "kind": Enum<{
                "ForInvalidBacked": undefined;
                "AgainstValid": undefined;
                "ForInvalidApproved": undefined;
            }>;
            "validator_index": number;
            "validator_id": FixedSizeBinary<32>;
        };
        "key_owner_proof": Anonymize<I3ia7aufsoj0l1>;
    };
}>;
export type Iee37emj23tmbu = {
    "session_index": number;
    "candidate_hash": FixedSizeBinary<32>;
};
export type I1qq9dc763kccf = AnonymousEnum<{
    /**
     * Create a single on demand core order.
     * Will use the spot price for the current block and will reap the account if needed.
     *
     * Parameters:
     * - `origin`: The sender of the call, funds will be withdrawn from this account.
     * - `max_amount`: The maximum balance to withdraw from the origin to place an order.
     * - `para_id`: A `ParaId` the origin wants to provide blockspace for.
     *
     * Errors:
     * - `InsufficientBalance`: from the Currency implementation
     * - `QueueFull`
     * - `SpotPriceHigherThanMaxAmount`
     *
     * Events:
     * - `OnDemandOrderPlaced`
     */
    "place_order_allow_death": Anonymize<Iaa7g3f5tlv3gf>;
    /**
     * Same as the [`place_order_allow_death`](Self::place_order_allow_death) call , but with a
     * check that placing the order will not reap the account.
     *
     * Parameters:
     * - `origin`: The sender of the call, funds will be withdrawn from this account.
     * - `max_amount`: The maximum balance to withdraw from the origin to place an order.
     * - `para_id`: A `ParaId` the origin wants to provide blockspace for.
     *
     * Errors:
     * - `InsufficientBalance`: from the Currency implementation
     * - `QueueFull`
     * - `SpotPriceHigherThanMaxAmount`
     *
     * Events:
     * - `OnDemandOrderPlaced`
     */
    "place_order_keep_alive": Anonymize<Iaa7g3f5tlv3gf>;
    /**
     * Create a single on demand core order with credits.
     * Will charge the owner's on-demand credit account the spot price for the current block.
     *
     * Parameters:
     * - `origin`: The sender of the call, on-demand credits will be withdrawn from this
     * account.
     * - `max_amount`: The maximum number of credits to spend from the origin to place an
     * order.
     * - `para_id`: A `ParaId` the origin wants to provide blockspace for.
     *
     * Errors:
     * - `InsufficientCredits`
     * - `QueueFull`
     * - `SpotPriceHigherThanMaxAmount`
     *
     * Events:
     * - `OnDemandOrderPlaced`
     */
    "place_order_with_credits": Anonymize<Iaa7g3f5tlv3gf>;
}>;
export type Iaa7g3f5tlv3gf = {
    "max_amount": bigint;
    "para_id": number;
};
export type Icclqj5sge2nc7 = AnonymousEnum<{
    /**
     * Register head data and validation code for a reserved Para Id.
     *
     * ## Arguments
     * - `origin`: Must be called by a `Signed` origin.
     * - `id`: The para ID. Must be owned/managed by the `origin` signing account.
     * - `genesis_head`: The genesis head data of the parachain/thread.
     * - `validation_code`: The initial validation code of the parachain/thread.
     *
     * ## Deposits/Fees
     * The account with the originating signature must reserve a deposit.
     *
     * The deposit is required to cover the costs associated with storing the genesis head
     * data and the validation code.
     * This accounts for the potential to store validation code of a size up to the
     * `max_code_size`, as defined in the configuration pallet
     *
     * Anything already reserved previously for this para ID is accounted for.
     *
     * ## Events
     * The `Registered` event is emitted in case of success.
     */
    "register": {
        "id": number;
        "genesis_head": Binary;
        "validation_code": Binary;
    };
    /**
     * Force the registration of a Para Id on the relay chain.
     *
     * This function must be called by a Root origin.
     *
     * The deposit taken can be specified for this registration. Any `ParaId`
     * can be registered, including sub-1000 IDs which are System Parachains.
     */
    "force_register": {
        "who": SS58String;
        "deposit": bigint;
        "id": number;
        "genesis_head": Binary;
        "validation_code": Binary;
    };
    /**
     * Deregister a Para Id, freeing all data and returning any deposit.
     *
     * The caller must be Root, the `para` owner, or the `para` itself. The para must be an
     * on-demand parachain.
     */
    "deregister": Anonymize<Ic5b47dj4coa3r>;
    /**
     * Swap a lease holding parachain with another parachain, either on-demand or lease
     * holding.
     *
     * The origin must be Root, the `para` owner, or the `para` itself.
     *
     * The swap will happen only if there is already an opposite swap pending. If there is not,
     * the swap will be stored in the pending swaps map, ready for a later confirmatory swap.
     *
     * The `ParaId`s remain mapped to the same head data and code so external code can rely on
     * `ParaId` to be a long-term identifier of a notional "parachain". However, their
     * scheduling info (i.e. whether they're an on-demand parachain or lease holding
     * parachain), auction information and the auction deposit are switched.
     */
    "swap": {
        "id": number;
        "other": number;
    };
    /**
     * Remove a manager lock from a para. This will allow the manager of a
     * previously locked para to deregister or swap a para without using governance.
     *
     * Can only be called by the Root origin or the parachain.
     */
    "remove_lock": Anonymize<Iaus4cb3drhu9q>;
    /**
     * Reserve a Para Id on the relay chain.
     *
     * This function will reserve a new Para Id to be owned/managed by the origin account.
     * The origin account is able to register head data and validation code using `register` to
     * create an on-demand parachain. Using the Slots pallet, an on-demand parachain can then
     * be upgraded to a lease holding parachain.
     *
     * ## Arguments
     * - `origin`: Must be called by a `Signed` origin. Becomes the manager/owner of the new
     * para ID.
     *
     * ## Deposits/Fees
     * The origin must reserve a deposit of `ParaDeposit` for the registration.
     *
     * ## Events
     * The `Reserved` event is emitted in case of success, which provides the ID reserved for
     * use.
     */
    "reserve": undefined;
    /**
     * Add a manager lock from a para. This will prevent the manager of a
     * para to deregister or swap a para.
     *
     * Can be called by Root, the parachain, or the parachain manager if the parachain is
     * unlocked.
     */
    "add_lock": Anonymize<Iaus4cb3drhu9q>;
    /**
     * Schedule a parachain upgrade.
     *
     * This will kick off a check of `new_code` by all validators. After the majority of the
     * validators have reported on the validity of the code, the code will either be enacted
     * or the upgrade will be rejected. If the code will be enacted, the current code of the
     * parachain will be overwritten directly. This means that any PoV will be checked by this
     * new code. The parachain itself will not be informed explicitly that the validation code
     * has changed.
     *
     * Can be called by Root, the parachain, or the parachain manager if the parachain is
     * unlocked.
     */
    "schedule_code_upgrade": Anonymize<I1k3urvkqqshbc>;
    /**
     * Set the parachain's current head.
     *
     * Can be called by Root, the parachain, or the parachain manager if the parachain is
     * unlocked.
     */
    "set_current_head": Anonymize<I2ff0ffsh15vej>;
}>;
export type Ic5b47dj4coa3r = {
    "id": number;
};
export type Iafhis924j14hg = AnonymousEnum<{
    /**
     * Just a connect into the `lease_out` call, in case Root wants to force some lease to
     * happen independently of any other on-chain mechanism to use it.
     *
     * The dispatch origin for this call must match `T::ForceOrigin`.
     */
    "force_lease": {
        "para": number;
        "leaser": SS58String;
        "amount": bigint;
        "period_begin": number;
        "period_count": number;
    };
    /**
     * Clear all leases for a Para Id, refunding any deposits back to the original owners.
     *
     * The dispatch origin for this call must match `T::ForceOrigin`.
     */
    "clear_all_leases": Anonymize<Iaus4cb3drhu9q>;
    /**
     * Try to onboard a parachain that has a lease for the current lease period.
     *
     * This function can be useful if there was some state issue with a para that should
     * have onboarded, but was unable to. As long as they have a lease period, we can
     * let them onboard from here.
     *
     * Origin must be signed, but can be called by anyone.
     */
    "trigger_onboard": Anonymize<Iaus4cb3drhu9q>;
}>;
export type I8f92tvrsnq2cu = AnonymousEnum<{
    /**
     * Schedule a para to be initialized at the start of the next session.
     *
     * This should only be used for TESTING and not on PRODUCTION chains. It automatically
     * assigns Coretime to the chain and increases the number of cores. Thus, there is no
     * running coretime chain required.
     */
    "sudo_schedule_para_initialize": {
        "id": number;
        "genesis": {
            "genesis_head": Binary;
            "validation_code": Binary;
            "para_kind": boolean;
        };
    };
    /**
     * Schedule a para to be cleaned up at the start of the next session.
     */
    "sudo_schedule_para_cleanup": Anonymize<Ic5b47dj4coa3r>;
    /**
     * Upgrade a parathread (on-demand parachain) to a lease holding parachain
     */
    "sudo_schedule_parathread_upgrade": Anonymize<Ic5b47dj4coa3r>;
    /**
     * Downgrade a lease holding parachain to an on-demand parachain
     */
    "sudo_schedule_parachain_downgrade": Anonymize<Ic5b47dj4coa3r>;
    /**
     * Send a downward XCM to the given para.
     *
     * The given parachain should exist and the payload should not exceed the preconfigured
     * size `config.max_downward_message_size`.
     */
    "sudo_queue_downward_xcm": {
        "id": number;
        "xcm": XcmVersionedXcm;
    };
    /**
     * Forcefully establish a channel from the sender to the recipient.
     *
     * This is equivalent to sending an `Hrmp::hrmp_init_open_channel` extrinsic followed by
     * `Hrmp::hrmp_accept_open_channel`.
     */
    "sudo_establish_hrmp_channel": Anonymize<Ic3430470j4mbv>;
}>;
export type XcmVersionedXcm = Enum<{
    "V3": Anonymize<Ianvng4e08j9ii>;
    "V4": Anonymize<Iegrepoo0c1jc5>;
    "V5": Anonymize<Ict03eedr8de9s>;
}>;
export declare const XcmVersionedXcm: GetEnum<XcmVersionedXcm>;
export type Ianvng4e08j9ii = Array<XcmV3Instruction>;
export type XcmV3Instruction = Enum<{
    "WithdrawAsset": Anonymize<Iai6dhqiq3bach>;
    "ReserveAssetDeposited": Anonymize<Iai6dhqiq3bach>;
    "ReceiveTeleportedAsset": Anonymize<Iai6dhqiq3bach>;
    "QueryResponse": {
        "query_id": bigint;
        "response": XcmV3Response;
        "max_weight": Anonymize<I4q39t5hn830vp>;
        "querier"?: Anonymize<Ia9cgf4r40b26h>;
    };
    "TransferAsset": {
        "assets": Anonymize<Iai6dhqiq3bach>;
        "beneficiary": Anonymize<I4c0s5cioidn76>;
    };
    "TransferReserveAsset": {
        "assets": Anonymize<Iai6dhqiq3bach>;
        "dest": Anonymize<I4c0s5cioidn76>;
        "xcm": Anonymize<Ianvng4e08j9ii>;
    };
    "Transact": Anonymize<I92p6l5cs3fr50>;
    "HrmpNewChannelOpenRequest": Anonymize<I5uhhrjqfuo4e5>;
    "HrmpChannelAccepted": Anonymize<Ifij4jam0o7sub>;
    "HrmpChannelClosing": Anonymize<Ieeb4svd9i8fji>;
    "ClearOrigin": undefined;
    "DescendOrigin": XcmV3Junctions;
    "ReportError": Anonymize<I4r3v6e91d1qbs>;
    "DepositAsset": {
        "assets": XcmV3MultiassetMultiAssetFilter;
        "beneficiary": Anonymize<I4c0s5cioidn76>;
    };
    "DepositReserveAsset": {
        "assets": XcmV3MultiassetMultiAssetFilter;
        "dest": Anonymize<I4c0s5cioidn76>;
        "xcm": Anonymize<Ianvng4e08j9ii>;
    };
    "ExchangeAsset": {
        "give": XcmV3MultiassetMultiAssetFilter;
        "want": Anonymize<Iai6dhqiq3bach>;
        "maximal": boolean;
    };
    "InitiateReserveWithdraw": {
        "assets": XcmV3MultiassetMultiAssetFilter;
        "reserve": Anonymize<I4c0s5cioidn76>;
        "xcm": Anonymize<Ianvng4e08j9ii>;
    };
    "InitiateTeleport": {
        "assets": XcmV3MultiassetMultiAssetFilter;
        "dest": Anonymize<I4c0s5cioidn76>;
        "xcm": Anonymize<Ianvng4e08j9ii>;
    };
    "ReportHolding": {
        "response_info": Anonymize<I4r3v6e91d1qbs>;
        "assets": XcmV3MultiassetMultiAssetFilter;
    };
    "BuyExecution": {
        "fees": Anonymize<Idcm24504c8bkk>;
        "weight_limit": XcmV3WeightLimit;
    };
    "RefundSurplus": undefined;
    "SetErrorHandler": Anonymize<Ianvng4e08j9ii>;
    "SetAppendix": Anonymize<Ianvng4e08j9ii>;
    "ClearError": undefined;
    "ClaimAsset": {
        "assets": Anonymize<Iai6dhqiq3bach>;
        "ticket": Anonymize<I4c0s5cioidn76>;
    };
    "Trap": bigint;
    "SubscribeVersion": Anonymize<Ieprdqqu7ildvr>;
    "UnsubscribeVersion": undefined;
    "BurnAsset": Anonymize<Iai6dhqiq3bach>;
    "ExpectAsset": Anonymize<Iai6dhqiq3bach>;
    "ExpectOrigin"?: Anonymize<Ia9cgf4r40b26h>;
    "ExpectError"?: Anonymize<I7sltvf8v2nure>;
    "ExpectTransactStatus": XcmV3MaybeErrorCode;
    "QueryPallet": Anonymize<Iba5bdbapp16oo>;
    "ExpectPallet": Anonymize<Id7mf37dkpgfjs>;
    "ReportTransactStatus": Anonymize<I4r3v6e91d1qbs>;
    "ClearTransactStatus": undefined;
    "UniversalOrigin": XcmV3Junction;
    "ExportMessage": {
        "network": XcmV3JunctionNetworkId;
        "destination": XcmV3Junctions;
        "xcm": Anonymize<Ianvng4e08j9ii>;
    };
    "LockAsset": {
        "asset": Anonymize<Idcm24504c8bkk>;
        "unlocker": Anonymize<I4c0s5cioidn76>;
    };
    "UnlockAsset": {
        "asset": Anonymize<Idcm24504c8bkk>;
        "target": Anonymize<I4c0s5cioidn76>;
    };
    "NoteUnlockable": {
        "asset": Anonymize<Idcm24504c8bkk>;
        "owner": Anonymize<I4c0s5cioidn76>;
    };
    "RequestUnlock": {
        "asset": Anonymize<Idcm24504c8bkk>;
        "locker": Anonymize<I4c0s5cioidn76>;
    };
    "SetFeesMode": Anonymize<I4nae9rsql8fa7>;
    "SetTopic": FixedSizeBinary<32>;
    "ClearTopic": undefined;
    "AliasOrigin": Anonymize<I4c0s5cioidn76>;
    "UnpaidExecution": Anonymize<I40d50jeai33oq>;
}>;
export declare const XcmV3Instruction: GetEnum<XcmV3Instruction>;
export type XcmV3Response = Enum<{
    "Null": undefined;
    "Assets": Anonymize<Iai6dhqiq3bach>;
    "ExecutionResult"?: Anonymize<I7sltvf8v2nure>;
    "Version": number;
    "PalletsInfo": Anonymize<I599u7h20b52at>;
    "DispatchResult": XcmV3MaybeErrorCode;
}>;
export declare const XcmV3Response: GetEnum<XcmV3Response>;
export type I7sltvf8v2nure = ([number, XcmV3TraitsError]) | undefined;
export type XcmV3TraitsError = Enum<{
    "Overflow": undefined;
    "Unimplemented": undefined;
    "UntrustedReserveLocation": undefined;
    "UntrustedTeleportLocation": undefined;
    "LocationFull": undefined;
    "LocationNotInvertible": undefined;
    "BadOrigin": undefined;
    "InvalidLocation": undefined;
    "AssetNotFound": undefined;
    "FailedToTransactAsset": undefined;
    "NotWithdrawable": undefined;
    "LocationCannotHold": undefined;
    "ExceedsMaxMessageSize": undefined;
    "DestinationUnsupported": undefined;
    "Transport": undefined;
    "Unroutable": undefined;
    "UnknownClaim": undefined;
    "FailedToDecode": undefined;
    "MaxWeightInvalid": undefined;
    "NotHoldingFees": undefined;
    "TooExpensive": undefined;
    "Trap": bigint;
    "ExpectationFalse": undefined;
    "PalletNotFound": undefined;
    "NameMismatch": undefined;
    "VersionIncompatible": undefined;
    "HoldingWouldOverflow": undefined;
    "ExportError": undefined;
    "ReanchorFailed": undefined;
    "NoDeal": undefined;
    "FeesNotMet": undefined;
    "LockError": undefined;
    "NoPermission": undefined;
    "Unanchored": undefined;
    "NotDepositable": undefined;
    "UnhandledXcmVersion": undefined;
    "WeightLimitReached": Anonymize<I4q39t5hn830vp>;
    "Barrier": undefined;
    "WeightNotComputable": undefined;
    "ExceedsStackLimit": undefined;
}>;
export declare const XcmV3TraitsError: GetEnum<XcmV3TraitsError>;
export type I599u7h20b52at = Array<{
    "index": number;
    "name": Binary;
    "module_name": Binary;
    "major": number;
    "minor": number;
    "patch": number;
}>;
export type XcmV3MaybeErrorCode = Enum<{
    "Success": undefined;
    "Error": Binary;
    "TruncatedError": Binary;
}>;
export declare const XcmV3MaybeErrorCode: GetEnum<XcmV3MaybeErrorCode>;
export type Ia9cgf4r40b26h = (Anonymize<I4c0s5cioidn76>) | undefined;
export type I92p6l5cs3fr50 = {
    "origin_kind": XcmV2OriginKind;
    "require_weight_at_most": Anonymize<I4q39t5hn830vp>;
    "call": Binary;
};
export type XcmV2OriginKind = Enum<{
    "Native": undefined;
    "SovereignAccount": undefined;
    "Superuser": undefined;
    "Xcm": undefined;
}>;
export declare const XcmV2OriginKind: GetEnum<XcmV2OriginKind>;
export type I5uhhrjqfuo4e5 = {
    "sender": number;
    "max_message_size": number;
    "max_capacity": number;
};
export type Ifij4jam0o7sub = {
    "recipient": number;
};
export type Ieeb4svd9i8fji = {
    "initiator": number;
    "sender": number;
    "recipient": number;
};
export type I4r3v6e91d1qbs = {
    "destination": Anonymize<I4c0s5cioidn76>;
    "query_id": bigint;
    "max_weight": Anonymize<I4q39t5hn830vp>;
};
export type XcmV3MultiassetMultiAssetFilter = Enum<{
    "Definite": Anonymize<Iai6dhqiq3bach>;
    "Wild": XcmV3MultiassetWildMultiAsset;
}>;
export declare const XcmV3MultiassetMultiAssetFilter: GetEnum<XcmV3MultiassetMultiAssetFilter>;
export type XcmV3MultiassetWildMultiAsset = Enum<{
    "All": undefined;
    "AllOf": {
        "id": XcmV3MultiassetAssetId;
        "fun": XcmV2MultiassetWildFungibility;
    };
    "AllCounted": number;
    "AllOfCounted": {
        "id": XcmV3MultiassetAssetId;
        "fun": XcmV2MultiassetWildFungibility;
        "count": number;
    };
}>;
export declare const XcmV3MultiassetWildMultiAsset: GetEnum<XcmV3MultiassetWildMultiAsset>;
export type XcmV2MultiassetWildFungibility = Enum<{
    "Fungible": undefined;
    "NonFungible": undefined;
}>;
export declare const XcmV2MultiassetWildFungibility: GetEnum<XcmV2MultiassetWildFungibility>;
export type Ieprdqqu7ildvr = {
    "query_id": bigint;
    "max_response_weight": Anonymize<I4q39t5hn830vp>;
};
export type Iba5bdbapp16oo = {
    "module_name": Binary;
    "response_info": Anonymize<I4r3v6e91d1qbs>;
};
export type Id7mf37dkpgfjs = {
    "index": number;
    "name": Binary;
    "module_name": Binary;
    "crate_major": number;
    "min_crate_minor": number;
};
export type I4nae9rsql8fa7 = {
    "jit_withdraw": boolean;
};
export type I40d50jeai33oq = {
    "weight_limit": XcmV3WeightLimit;
    "check_origin"?: Anonymize<Ia9cgf4r40b26h>;
};
export type Iegrepoo0c1jc5 = Array<XcmV4Instruction>;
export type XcmV4Instruction = Enum<{
    "WithdrawAsset": Anonymize<I50mli3hb64f9b>;
    "ReserveAssetDeposited": Anonymize<I50mli3hb64f9b>;
    "ReceiveTeleportedAsset": Anonymize<I50mli3hb64f9b>;
    "QueryResponse": {
        "query_id": bigint;
        "response": XcmV4Response;
        "max_weight": Anonymize<I4q39t5hn830vp>;
        "querier"?: Anonymize<Ia9cgf4r40b26h>;
    };
    "TransferAsset": {
        "assets": Anonymize<I50mli3hb64f9b>;
        "beneficiary": Anonymize<I4c0s5cioidn76>;
    };
    "TransferReserveAsset": {
        "assets": Anonymize<I50mli3hb64f9b>;
        "dest": Anonymize<I4c0s5cioidn76>;
        "xcm": Anonymize<Iegrepoo0c1jc5>;
    };
    "Transact": Anonymize<I92p6l5cs3fr50>;
    "HrmpNewChannelOpenRequest": Anonymize<I5uhhrjqfuo4e5>;
    "HrmpChannelAccepted": Anonymize<Ifij4jam0o7sub>;
    "HrmpChannelClosing": Anonymize<Ieeb4svd9i8fji>;
    "ClearOrigin": undefined;
    "DescendOrigin": XcmV3Junctions;
    "ReportError": Anonymize<I4r3v6e91d1qbs>;
    "DepositAsset": {
        "assets": XcmV4AssetAssetFilter;
        "beneficiary": Anonymize<I4c0s5cioidn76>;
    };
    "DepositReserveAsset": {
        "assets": XcmV4AssetAssetFilter;
        "dest": Anonymize<I4c0s5cioidn76>;
        "xcm": Anonymize<Iegrepoo0c1jc5>;
    };
    "ExchangeAsset": {
        "give": XcmV4AssetAssetFilter;
        "want": Anonymize<I50mli3hb64f9b>;
        "maximal": boolean;
    };
    "InitiateReserveWithdraw": {
        "assets": XcmV4AssetAssetFilter;
        "reserve": Anonymize<I4c0s5cioidn76>;
        "xcm": Anonymize<Iegrepoo0c1jc5>;
    };
    "InitiateTeleport": {
        "assets": XcmV4AssetAssetFilter;
        "dest": Anonymize<I4c0s5cioidn76>;
        "xcm": Anonymize<Iegrepoo0c1jc5>;
    };
    "ReportHolding": {
        "response_info": Anonymize<I4r3v6e91d1qbs>;
        "assets": XcmV4AssetAssetFilter;
    };
    "BuyExecution": {
        "fees": Anonymize<Ia5l7mu5a6v49o>;
        "weight_limit": XcmV3WeightLimit;
    };
    "RefundSurplus": undefined;
    "SetErrorHandler": Anonymize<Iegrepoo0c1jc5>;
    "SetAppendix": Anonymize<Iegrepoo0c1jc5>;
    "ClearError": undefined;
    "ClaimAsset": {
        "assets": Anonymize<I50mli3hb64f9b>;
        "ticket": Anonymize<I4c0s5cioidn76>;
    };
    "Trap": bigint;
    "SubscribeVersion": Anonymize<Ieprdqqu7ildvr>;
    "UnsubscribeVersion": undefined;
    "BurnAsset": Anonymize<I50mli3hb64f9b>;
    "ExpectAsset": Anonymize<I50mli3hb64f9b>;
    "ExpectOrigin"?: Anonymize<Ia9cgf4r40b26h>;
    "ExpectError"?: Anonymize<I7sltvf8v2nure>;
    "ExpectTransactStatus": XcmV3MaybeErrorCode;
    "QueryPallet": Anonymize<Iba5bdbapp16oo>;
    "ExpectPallet": Anonymize<Id7mf37dkpgfjs>;
    "ReportTransactStatus": Anonymize<I4r3v6e91d1qbs>;
    "ClearTransactStatus": undefined;
    "UniversalOrigin": XcmV3Junction;
    "ExportMessage": {
        "network": XcmV3JunctionNetworkId;
        "destination": XcmV3Junctions;
        "xcm": Anonymize<Iegrepoo0c1jc5>;
    };
    "LockAsset": {
        "asset": Anonymize<Ia5l7mu5a6v49o>;
        "unlocker": Anonymize<I4c0s5cioidn76>;
    };
    "UnlockAsset": {
        "asset": Anonymize<Ia5l7mu5a6v49o>;
        "target": Anonymize<I4c0s5cioidn76>;
    };
    "NoteUnlockable": {
        "asset": Anonymize<Ia5l7mu5a6v49o>;
        "owner": Anonymize<I4c0s5cioidn76>;
    };
    "RequestUnlock": {
        "asset": Anonymize<Ia5l7mu5a6v49o>;
        "locker": Anonymize<I4c0s5cioidn76>;
    };
    "SetFeesMode": Anonymize<I4nae9rsql8fa7>;
    "SetTopic": FixedSizeBinary<32>;
    "ClearTopic": undefined;
    "AliasOrigin": Anonymize<I4c0s5cioidn76>;
    "UnpaidExecution": Anonymize<I40d50jeai33oq>;
}>;
export declare const XcmV4Instruction: GetEnum<XcmV4Instruction>;
export type XcmV4Response = Enum<{
    "Null": undefined;
    "Assets": Anonymize<I50mli3hb64f9b>;
    "ExecutionResult"?: Anonymize<I7sltvf8v2nure>;
    "Version": number;
    "PalletsInfo": Anonymize<I599u7h20b52at>;
    "DispatchResult": XcmV3MaybeErrorCode;
}>;
export declare const XcmV4Response: GetEnum<XcmV4Response>;
export type XcmV4AssetAssetFilter = Enum<{
    "Definite": Anonymize<I50mli3hb64f9b>;
    "Wild": XcmV4AssetWildAsset;
}>;
export declare const XcmV4AssetAssetFilter: GetEnum<XcmV4AssetAssetFilter>;
export type XcmV4AssetWildAsset = Enum<{
    "All": undefined;
    "AllOf": {
        "id": Anonymize<I4c0s5cioidn76>;
        "fun": XcmV2MultiassetWildFungibility;
    };
    "AllCounted": number;
    "AllOfCounted": {
        "id": Anonymize<I4c0s5cioidn76>;
        "fun": XcmV2MultiassetWildFungibility;
        "count": number;
    };
}>;
export declare const XcmV4AssetWildAsset: GetEnum<XcmV4AssetWildAsset>;
export type Ict03eedr8de9s = Array<XcmV5Instruction>;
export type XcmV5Instruction = Enum<{
    "WithdrawAsset": Anonymize<I4npjalvhmfuj>;
    "ReserveAssetDeposited": Anonymize<I4npjalvhmfuj>;
    "ReceiveTeleportedAsset": Anonymize<I4npjalvhmfuj>;
    "QueryResponse": {
        "query_id": bigint;
        "response": Enum<{
            "Null": undefined;
            "Assets": Anonymize<I4npjalvhmfuj>;
            "ExecutionResult"?: Anonymize<I3l6ejee750fv1>;
            "Version": number;
            "PalletsInfo": Anonymize<I599u7h20b52at>;
            "DispatchResult": XcmV3MaybeErrorCode;
        }>;
        "max_weight": Anonymize<I4q39t5hn830vp>;
        "querier"?: Anonymize<I4pai6qnfk426l>;
    };
    "TransferAsset": {
        "assets": Anonymize<I4npjalvhmfuj>;
        "beneficiary": Anonymize<If9iqq7i64mur8>;
    };
    "TransferReserveAsset": {
        "assets": Anonymize<I4npjalvhmfuj>;
        "dest": Anonymize<If9iqq7i64mur8>;
        "xcm": Anonymize<Ict03eedr8de9s>;
    };
    "Transact": {
        "origin_kind": XcmV2OriginKind;
        "fallback_max_weight"?: (Anonymize<I4q39t5hn830vp>) | undefined;
        "call": Binary;
    };
    "HrmpNewChannelOpenRequest": Anonymize<I5uhhrjqfuo4e5>;
    "HrmpChannelAccepted": Anonymize<Ifij4jam0o7sub>;
    "HrmpChannelClosing": Anonymize<Ieeb4svd9i8fji>;
    "ClearOrigin": undefined;
    "DescendOrigin": XcmV5Junctions;
    "ReportError": Anonymize<I6vsmh07hrp1rc>;
    "DepositAsset": {
        "assets": XcmV5AssetFilter;
        "beneficiary": Anonymize<If9iqq7i64mur8>;
    };
    "DepositReserveAsset": {
        "assets": XcmV5AssetFilter;
        "dest": Anonymize<If9iqq7i64mur8>;
        "xcm": Anonymize<Ict03eedr8de9s>;
    };
    "ExchangeAsset": {
        "give": XcmV5AssetFilter;
        "want": Anonymize<I4npjalvhmfuj>;
        "maximal": boolean;
    };
    "InitiateReserveWithdraw": {
        "assets": XcmV5AssetFilter;
        "reserve": Anonymize<If9iqq7i64mur8>;
        "xcm": Anonymize<Ict03eedr8de9s>;
    };
    "InitiateTeleport": {
        "assets": XcmV5AssetFilter;
        "dest": Anonymize<If9iqq7i64mur8>;
        "xcm": Anonymize<Ict03eedr8de9s>;
    };
    "ReportHolding": {
        "response_info": Anonymize<I6vsmh07hrp1rc>;
        "assets": XcmV5AssetFilter;
    };
    "BuyExecution": {
        "fees": Anonymize<Iffh1nc5e1mod6>;
        "weight_limit": XcmV3WeightLimit;
    };
    "RefundSurplus": undefined;
    "SetErrorHandler": Anonymize<Ict03eedr8de9s>;
    "SetAppendix": Anonymize<Ict03eedr8de9s>;
    "ClearError": undefined;
    "ClaimAsset": {
        "assets": Anonymize<I4npjalvhmfuj>;
        "ticket": Anonymize<If9iqq7i64mur8>;
    };
    "Trap": bigint;
    "SubscribeVersion": Anonymize<Ieprdqqu7ildvr>;
    "UnsubscribeVersion": undefined;
    "BurnAsset": Anonymize<I4npjalvhmfuj>;
    "ExpectAsset": Anonymize<I4npjalvhmfuj>;
    "ExpectOrigin"?: Anonymize<I4pai6qnfk426l>;
    "ExpectError"?: Anonymize<I3l6ejee750fv1>;
    "ExpectTransactStatus": XcmV3MaybeErrorCode;
    "QueryPallet": {
        "module_name": Binary;
        "response_info": Anonymize<I6vsmh07hrp1rc>;
    };
    "ExpectPallet": Anonymize<Id7mf37dkpgfjs>;
    "ReportTransactStatus": Anonymize<I6vsmh07hrp1rc>;
    "ClearTransactStatus": undefined;
    "UniversalOrigin": XcmV5Junction;
    "ExportMessage": {
        "network": XcmV5NetworkId;
        "destination": XcmV5Junctions;
        "xcm": Anonymize<Ict03eedr8de9s>;
    };
    "LockAsset": {
        "asset": Anonymize<Iffh1nc5e1mod6>;
        "unlocker": Anonymize<If9iqq7i64mur8>;
    };
    "UnlockAsset": {
        "asset": Anonymize<Iffh1nc5e1mod6>;
        "target": Anonymize<If9iqq7i64mur8>;
    };
    "NoteUnlockable": {
        "asset": Anonymize<Iffh1nc5e1mod6>;
        "owner": Anonymize<If9iqq7i64mur8>;
    };
    "RequestUnlock": {
        "asset": Anonymize<Iffh1nc5e1mod6>;
        "locker": Anonymize<If9iqq7i64mur8>;
    };
    "SetFeesMode": Anonymize<I4nae9rsql8fa7>;
    "SetTopic": FixedSizeBinary<32>;
    "ClearTopic": undefined;
    "AliasOrigin": Anonymize<If9iqq7i64mur8>;
    "UnpaidExecution": {
        "weight_limit": XcmV3WeightLimit;
        "check_origin"?: Anonymize<I4pai6qnfk426l>;
    };
    "PayFees": {
        "asset": Anonymize<Iffh1nc5e1mod6>;
    };
    "InitiateTransfer": {
        "destination": Anonymize<If9iqq7i64mur8>;
        "remote_fees"?: (Anonymize<Ifhmc9e7vpeeig>) | undefined;
        "preserve_origin": boolean;
        "assets": Array<Anonymize<Ifhmc9e7vpeeig>>;
        "remote_xcm": Anonymize<Ict03eedr8de9s>;
    };
    "ExecuteWithOrigin": {
        "descendant_origin"?: (XcmV5Junctions) | undefined;
        "xcm": Anonymize<Ict03eedr8de9s>;
    };
    "SetHints": {
        "hints": Array<Enum<{
            "AssetClaimer": {
                "location": Anonymize<If9iqq7i64mur8>;
            };
        }>>;
    };
}>;
export declare const XcmV5Instruction: GetEnum<XcmV5Instruction>;
export type I3l6ejee750fv1 = ([number, Enum<{
    "Overflow": undefined;
    "Unimplemented": undefined;
    "UntrustedReserveLocation": undefined;
    "UntrustedTeleportLocation": undefined;
    "LocationFull": undefined;
    "LocationNotInvertible": undefined;
    "BadOrigin": undefined;
    "InvalidLocation": undefined;
    "AssetNotFound": undefined;
    "FailedToTransactAsset": undefined;
    "NotWithdrawable": undefined;
    "LocationCannotHold": undefined;
    "ExceedsMaxMessageSize": undefined;
    "DestinationUnsupported": undefined;
    "Transport": undefined;
    "Unroutable": undefined;
    "UnknownClaim": undefined;
    "FailedToDecode": undefined;
    "MaxWeightInvalid": undefined;
    "NotHoldingFees": undefined;
    "TooExpensive": undefined;
    "Trap": bigint;
    "ExpectationFalse": undefined;
    "PalletNotFound": undefined;
    "NameMismatch": undefined;
    "VersionIncompatible": undefined;
    "HoldingWouldOverflow": undefined;
    "ExportError": undefined;
    "ReanchorFailed": undefined;
    "NoDeal": undefined;
    "FeesNotMet": undefined;
    "LockError": undefined;
    "NoPermission": undefined;
    "Unanchored": undefined;
    "NotDepositable": undefined;
    "TooManyAssets": undefined;
    "UnhandledXcmVersion": undefined;
    "WeightLimitReached": Anonymize<I4q39t5hn830vp>;
    "Barrier": undefined;
    "WeightNotComputable": undefined;
    "ExceedsStackLimit": undefined;
}>]) | undefined;
export type I4pai6qnfk426l = (Anonymize<If9iqq7i64mur8>) | undefined;
export type I6vsmh07hrp1rc = {
    "destination": Anonymize<If9iqq7i64mur8>;
    "query_id": bigint;
    "max_weight": Anonymize<I4q39t5hn830vp>;
};
export type XcmV5AssetFilter = Enum<{
    "Definite": Anonymize<I4npjalvhmfuj>;
    "Wild": XcmV5WildAsset;
}>;
export declare const XcmV5AssetFilter: GetEnum<XcmV5AssetFilter>;
export type XcmV5WildAsset = Enum<{
    "All": undefined;
    "AllOf": {
        "id": Anonymize<If9iqq7i64mur8>;
        "fun": XcmV2MultiassetWildFungibility;
    };
    "AllCounted": number;
    "AllOfCounted": {
        "id": Anonymize<If9iqq7i64mur8>;
        "fun": XcmV2MultiassetWildFungibility;
        "count": number;
    };
}>;
export declare const XcmV5WildAsset: GetEnum<XcmV5WildAsset>;
export type Ifhmc9e7vpeeig = AnonymousEnum<{
    "Teleport": XcmV5AssetFilter;
    "ReserveDeposit": XcmV5AssetFilter;
    "ReserveWithdraw": XcmV5AssetFilter;
}>;
export type I4a8qeimc5p3qn = AnonymousEnum<{
    /**
     * Create a new auction.
     *
     * This can only happen when there isn't already an auction in progress and may only be
     * called by the root origin. Accepts the `duration` of this auction and the
     * `lease_period_index` of the initial lease period of the four that are to be auctioned.
     */
    "new_auction": {
        "duration": number;
        "lease_period_index": number;
    };
    /**
     * Make a new bid from an account (including a parachain account) for deploying a new
     * parachain.
     *
     * Multiple simultaneous bids from the same bidder are allowed only as long as all active
     * bids overlap each other (i.e. are mutually exclusive). Bids cannot be redacted.
     *
     * - `sub` is the sub-bidder ID, allowing for multiple competing bids to be made by (and
     * funded by) the same account.
     * - `auction_index` is the index of the auction to bid on. Should just be the present
     * value of `AuctionCounter`.
     * - `first_slot` is the first lease period index of the range to bid on. This is the
     * absolute lease period index value, not an auction-specific offset.
     * - `last_slot` is the last lease period index of the range to bid on. This is the
     * absolute lease period index value, not an auction-specific offset.
     * - `amount` is the amount to bid to be held as deposit for the parachain should the
     * bid win. This amount is held throughout the range.
     */
    "bid": {
        "para": number;
        "auction_index": number;
        "first_slot": number;
        "last_slot": number;
        "amount": bigint;
    };
    /**
     * Cancel an in-progress auction.
     *
     * Can only be called by Root origin.
     */
    "cancel_auction": undefined;
}>;
export type Iaj4q75nu5v2i2 = AnonymousEnum<{
    /**
     * Create a new crowdloaning campaign for a parachain slot with the given lease period
     * range.
     *
     * This applies a lock to your parachain configuration, ensuring that it cannot be changed
     * by the parachain manager.
     */
    "create": {
        "index": number;
        "cap": bigint;
        "first_period": number;
        "last_period": number;
        "end": number;
        "verifier"?: (MultiSigner) | undefined;
    };
    /**
     * Contribute to a crowd sale. This will transfer some balance over to fund a parachain
     * slot. It will be withdrawable when the crowdloan has ended and the funds are unused.
     */
    "contribute": {
        "index": number;
        "value": bigint;
        "signature"?: Anonymize<I86cdjmsf3a81s>;
    };
    /**
     * Withdraw full balance of a specific contributor.
     *
     * Origin must be signed, but can come from anyone.
     *
     * The fund must be either in, or ready for, retirement. For a fund to be *in* retirement,
     * then the retirement flag must be set. For a fund to be ready for retirement, then:
     * - it must not already be in retirement;
     * - the amount of raised funds must be bigger than the _free_ balance of the account;
     * - and either:
     * - the block number must be at least `end`; or
     * - the current lease period must be greater than the fund's `last_period`.
     *
     * In this case, the fund's retirement flag is set and its `end` is reset to the current
     * block number.
     *
     * - `who`: The account whose contribution should be withdrawn.
     * - `index`: The parachain to whose crowdloan the contribution was made.
     */
    "withdraw": {
        "who": SS58String;
        "index": number;
    };
    /**
     * Automatically refund contributors of an ended crowdloan.
     * Due to weight restrictions, this function may need to be called multiple
     * times to fully refund all users. We will refund `RemoveKeysLimit` users at a time.
     *
     * Origin must be signed, but can come from anyone.
     */
    "refund": Anonymize<I666bl2fqjkejo>;
    /**
     * Remove a fund after the retirement period has ended and all funds have been returned.
     */
    "dissolve": Anonymize<I666bl2fqjkejo>;
    /**
     * Edit the configuration for an in-progress crowdloan.
     *
     * Can only be called by Root origin.
     */
    "edit": {
        "index": number;
        "cap": bigint;
        "first_period": number;
        "last_period": number;
        "end": number;
        "verifier"?: (MultiSigner) | undefined;
    };
    /**
     * Add an optional memo to an existing crowdloan contribution.
     *
     * Origin must be Signed, and the user must have contributed to the crowdloan.
     */
    "add_memo": {
        "index": number;
        "memo": Binary;
    };
    /**
     * Poke the fund into `NewRaise`
     *
     * Origin must be Signed, and the fund has non-zero raise.
     */
    "poke": Anonymize<I666bl2fqjkejo>;
    /**
     * Contribute your entire balance to a crowd sale. This will transfer the entire balance of
     * a user over to fund a parachain slot. It will be withdrawable when the crowdloan has
     * ended and the funds are unused.
     */
    "contribute_all": {
        "index": number;
        "signature"?: Anonymize<I86cdjmsf3a81s>;
    };
}>;
export type MultiSigner = Enum<{
    "Ed25519": FixedSizeBinary<32>;
    "Sr25519": FixedSizeBinary<32>;
    "Ecdsa": FixedSizeBinary<33>;
}>;
export declare const MultiSigner: GetEnum<MultiSigner>;
export type PolkadotRuntimeCommonAssignedSlotsSlotLeasePeriodStart = Enum<{
    "Current": undefined;
    "Next": undefined;
}>;
export declare const PolkadotRuntimeCommonAssignedSlotsSlotLeasePeriodStart: GetEnum<PolkadotRuntimeCommonAssignedSlotsSlotLeasePeriodStart>;
export type Ifr31g56am9igr = AnonymousEnum<{
    /**
     * Request the configuration to be updated with the specified number of cores. Warning:
     * Since this only schedules a configuration update, it takes two sessions to come into
     * effect.
     *
     * - `origin`: Root or the Coretime Chain
     * - `count`: total number of cores
     */
    "request_core_count": Anonymize<Iafscmv8tjf0ou>;
    /**
     * Request to claim the instantaneous coretime sales revenue starting from the block it was
     * last claimed until and up to the block specified. The claimed amount value is sent back
     * to the Coretime chain in a `notify_revenue` message. At the same time, the amount is
     * teleported to the Coretime chain.
     */
    "request_revenue_at": Anonymize<Ibtsa3docbr9el>;
    "credit_account": {
        "who": SS58String;
        "amount": bigint;
    };
    /**
     * Receive instructions from the `ExternalBrokerOrigin`, detailing how a specific core is
     * to be used.
     *
     * Parameters:
     * -`origin`: The `ExternalBrokerOrigin`, assumed to be the coretime chain.
     * -`core`: The core that should be scheduled.
     * -`begin`: The starting blockheight of the instruction.
     * -`assignment`: How the blockspace should be utilised.
     * -`end_hint`: An optional hint as to when this particular set of instructions will end.
     */
    "assign_core": Anonymize<I2gpmmfdqv3cdc>;
}>;
export type Ibtsa3docbr9el = {
    "when": number;
};
export type I2gpmmfdqv3cdc = {
    "core": number;
    "begin": number;
    "assignment": Array<[BrokerCoretimeInterfaceCoreAssignment, number]>;
    "end_hint"?: Anonymize<I4arjljr6dpflb>;
};
export type BrokerCoretimeInterfaceCoreAssignment = Enum<{
    "Idle": undefined;
    "Pool": undefined;
    "Task": number;
}>;
export declare const BrokerCoretimeInterfaceCoreAssignment: GetEnum<BrokerCoretimeInterfaceCoreAssignment>;
export type I4oqb168b2d4er = AnonymousEnum<{
    /**
     * Allows root to set a cursor to forcefully start, stop or forward the migration process.
     *
     * Should normally not be needed and is only in place as emergency measure. Note that
     * restarting the migration process in this manner will not call the
     * [`MigrationStatusHandler::started`] hook or emit an `UpgradeStarted` event.
     */
    "force_set_cursor": {
        "cursor"?: (Enum<{
            "Active": {
                "index": number;
                "inner_cursor"?: Anonymize<Iabpgqcjikia83>;
                "started_at": number;
            };
            "Stuck": undefined;
        }>) | undefined;
    };
    /**
     * Allows root to set an active cursor to forcefully start/forward the migration process.
     *
     * This is an edge-case version of [`Self::force_set_cursor`] that allows to set the
     * `started_at` value to the next block number. Otherwise this would not be possible, since
     * `force_set_cursor` takes an absolute block number. Setting `started_at` to `None`
     * indicates that the current block number plus one should be used.
     */
    "force_set_active_cursor": {
        "index": number;
        "inner_cursor"?: Anonymize<Iabpgqcjikia83>;
        "started_at"?: Anonymize<I4arjljr6dpflb>;
    };
    /**
     * Forces the onboarding of the migrations.
     *
     * This process happens automatically on a runtime upgrade. It is in place as an emergency
     * measurement. The cursor needs to be `None` for this to succeed.
     */
    "force_onboard_mbms": undefined;
    /**
     * Clears the `Historic` set.
     *
     * `map_cursor` must be set to the last value that was returned by the
     * `HistoricCleared` event. The first time `None` can be used. `limit` must be chosen in a
     * way that will result in a sensible weight.
     */
    "clear_historic": {
        "selector": Enum<{
            "Specific": Anonymize<Itom7fk49o0c9>;
            "Wildcard": {
                "limit"?: Anonymize<I4arjljr6dpflb>;
                "previous_cursor"?: Anonymize<Iabpgqcjikia83>;
            };
        }>;
    };
}>;
export type I6k1inef986368 = AnonymousEnum<{
    "send": Anonymize<Ia5cotcvi888ln>;
    /**
     * Teleport some assets from the local chain to some destination chain.
     *
     * **This function is deprecated: Use `limited_teleport_assets` instead.**
     *
     * Fee payment on the destination side is made from the asset in the `assets` vector of
     * index `fee_asset_item`. The weight limit for fees is not provided and thus is unlimited,
     * with all fees taken as needed from the asset.
     *
     * - `origin`: Must be capable of withdrawing the `assets` and executing XCM.
     * - `dest`: Destination context for the assets. Will typically be `[Parent,
     * Parachain(..)]` to send from parachain to parachain, or `[Parachain(..)]` to send from
     * relay to parachain.
     * - `beneficiary`: A beneficiary location for the assets in the context of `dest`. Will
     * generally be an `AccountId32` value.
     * - `assets`: The assets to be withdrawn. This should include the assets used to pay the
     * fee on the `dest` chain.
     * - `fee_asset_item`: The index into `assets` of the item which should be used to pay
     * fees.
     */
    "teleport_assets": Anonymize<I21jsa919m88fd>;
    /**
     * Transfer some assets from the local chain to the destination chain through their local,
     * destination or remote reserve.
     *
     * `assets` must have same reserve location and may not be teleportable to `dest`.
     * - `assets` have local reserve: transfer assets to sovereign account of destination
     * chain and forward a notification XCM to `dest` to mint and deposit reserve-based
     * assets to `beneficiary`.
     * - `assets` have destination reserve: burn local assets and forward a notification to
     * `dest` chain to withdraw the reserve assets from this chain's sovereign account and
     * deposit them to `beneficiary`.
     * - `assets` have remote reserve: burn local assets, forward XCM to reserve chain to move
     * reserves from this chain's SA to `dest` chain's SA, and forward another XCM to `dest`
     * to mint and deposit reserve-based assets to `beneficiary`.
     *
     * **This function is deprecated: Use `limited_reserve_transfer_assets` instead.**
     *
     * Fee payment on the destination side is made from the asset in the `assets` vector of
     * index `fee_asset_item`. The weight limit for fees is not provided and thus is unlimited,
     * with all fees taken as needed from the asset.
     *
     * - `origin`: Must be capable of withdrawing the `assets` and executing XCM.
     * - `dest`: Destination context for the assets. Will typically be `[Parent,
     * Parachain(..)]` to send from parachain to parachain, or `[Parachain(..)]` to send from
     * relay to parachain.
     * - `beneficiary`: A beneficiary location for the assets in the context of `dest`. Will
     * generally be an `AccountId32` value.
     * - `assets`: The assets to be withdrawn. This should include the assets used to pay the
     * fee on the `dest` (and possibly reserve) chains.
     * - `fee_asset_item`: The index into `assets` of the item which should be used to pay
     * fees.
     */
    "reserve_transfer_assets": Anonymize<I21jsa919m88fd>;
    /**
     * Execute an XCM message from a local, signed, origin.
     *
     * An event is deposited indicating whether `msg` could be executed completely or only
     * partially.
     *
     * No more than `max_weight` will be used in its attempted execution. If this is less than
     * the maximum amount of weight that the message could take to be executed, then no
     * execution attempt will be made.
     */
    "execute": Anonymize<Iegif7m3upfe1k>;
    /**
     * Extoll that a particular destination can be communicated with through a particular
     * version of XCM.
     *
     * - `origin`: Must be an origin specified by AdminOrigin.
     * - `location`: The destination that is being described.
     * - `xcm_version`: The latest version of XCM that `location` supports.
     */
    "force_xcm_version": Anonymize<I9kt8c221c83ln>;
    /**
     * Set a safe XCM version (the version that XCM should be encoded with if the most recent
     * version a destination can accept is unknown).
     *
     * - `origin`: Must be an origin specified by AdminOrigin.
     * - `maybe_xcm_version`: The default XCM encoding version, or `None` to disable.
     */
    "force_default_xcm_version": Anonymize<Ic76kfh5ebqkpl>;
    /**
     * Ask a location to notify us regarding their XCM version and any changes to it.
     *
     * - `origin`: Must be an origin specified by AdminOrigin.
     * - `location`: The location to which we should subscribe for XCM version notifications.
     */
    "force_subscribe_version_notify": Anonymize<Icscpmubum33bq>;
    /**
     * Require that a particular destination should no longer notify us regarding any XCM
     * version changes.
     *
     * - `origin`: Must be an origin specified by AdminOrigin.
     * - `location`: The location to which we are currently subscribed for XCM version
     * notifications which we no longer desire.
     */
    "force_unsubscribe_version_notify": Anonymize<Icscpmubum33bq>;
    /**
     * Transfer some assets from the local chain to the destination chain through their local,
     * destination or remote reserve.
     *
     * `assets` must have same reserve location and may not be teleportable to `dest`.
     * - `assets` have local reserve: transfer assets to sovereign account of destination
     * chain and forward a notification XCM to `dest` to mint and deposit reserve-based
     * assets to `beneficiary`.
     * - `assets` have destination reserve: burn local assets and forward a notification to
     * `dest` chain to withdraw the reserve assets from this chain's sovereign account and
     * deposit them to `beneficiary`.
     * - `assets` have remote reserve: burn local assets, forward XCM to reserve chain to move
     * reserves from this chain's SA to `dest` chain's SA, and forward another XCM to `dest`
     * to mint and deposit reserve-based assets to `beneficiary`.
     *
     * Fee payment on the destination side is made from the asset in the `assets` vector of
     * index `fee_asset_item`, up to enough to pay for `weight_limit` of weight. If more weight
     * is needed than `weight_limit`, then the operation will fail and the sent assets may be
     * at risk.
     *
     * - `origin`: Must be capable of withdrawing the `assets` and executing XCM.
     * - `dest`: Destination context for the assets. Will typically be `[Parent,
     * Parachain(..)]` to send from parachain to parachain, or `[Parachain(..)]` to send from
     * relay to parachain.
     * - `beneficiary`: A beneficiary location for the assets in the context of `dest`. Will
     * generally be an `AccountId32` value.
     * - `assets`: The assets to be withdrawn. This should include the assets used to pay the
     * fee on the `dest` (and possibly reserve) chains.
     * - `fee_asset_item`: The index into `assets` of the item which should be used to pay
     * fees.
     * - `weight_limit`: The remote-side weight limit, if any, for the XCM fee purchase.
     */
    "limited_reserve_transfer_assets": Anonymize<I21d2olof7eb60>;
    /**
     * Teleport some assets from the local chain to some destination chain.
     *
     * Fee payment on the destination side is made from the asset in the `assets` vector of
     * index `fee_asset_item`, up to enough to pay for `weight_limit` of weight. If more weight
     * is needed than `weight_limit`, then the operation will fail and the sent assets may be
     * at risk.
     *
     * - `origin`: Must be capable of withdrawing the `assets` and executing XCM.
     * - `dest`: Destination context for the assets. Will typically be `[Parent,
     * Parachain(..)]` to send from parachain to parachain, or `[Parachain(..)]` to send from
     * relay to parachain.
     * - `beneficiary`: A beneficiary location for the assets in the context of `dest`. Will
     * generally be an `AccountId32` value.
     * - `assets`: The assets to be withdrawn. This should include the assets used to pay the
     * fee on the `dest` chain.
     * - `fee_asset_item`: The index into `assets` of the item which should be used to pay
     * fees.
     * - `weight_limit`: The remote-side weight limit, if any, for the XCM fee purchase.
     */
    "limited_teleport_assets": Anonymize<I21d2olof7eb60>;
    /**
     * Set or unset the global suspension state of the XCM executor.
     *
     * - `origin`: Must be an origin specified by AdminOrigin.
     * - `suspended`: `true` to suspend, `false` to resume.
     */
    "force_suspension": Anonymize<Ibgm4rnf22lal1>;
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
    "transfer_assets": Anonymize<I21d2olof7eb60>;
    /**
     * Claims assets trapped on this pallet because of leftover assets during XCM execution.
     *
     * - `origin`: Anyone can call this extrinsic.
     * - `assets`: The exact assets that were trapped. Use the version to specify what version
     * was the latest when they were trapped.
     * - `beneficiary`: The location/account where the claimed assets will be deposited.
     */
    "claim_assets": Anonymize<Ie68np0vpihith>;
    /**
     * Transfer assets from the local chain to the destination chain using explicit transfer
     * types for assets and fees.
     *
     * `assets` must have same reserve location or may be teleportable to `dest`. Caller must
     * provide the `assets_transfer_type` to be used for `assets`:
     * - `TransferType::LocalReserve`: transfer assets to sovereign account of destination
     * chain and forward a notification XCM to `dest` to mint and deposit reserve-based
     * assets to `beneficiary`.
     * - `TransferType::DestinationReserve`: burn local assets and forward a notification to
     * `dest` chain to withdraw the reserve assets from this chain's sovereign account and
     * deposit them to `beneficiary`.
     * - `TransferType::RemoteReserve(reserve)`: burn local assets, forward XCM to `reserve`
     * chain to move reserves from this chain's SA to `dest` chain's SA, and forward another
     * XCM to `dest` to mint and deposit reserve-based assets to `beneficiary`. Typically
     * the remote `reserve` is Asset Hub.
     * - `TransferType::Teleport`: burn local assets and forward XCM to `dest` chain to
     * mint/teleport assets and deposit them to `beneficiary`.
     *
     * On the destination chain, as well as any intermediary hops, `BuyExecution` is used to
     * buy execution using transferred `assets` identified by `remote_fees_id`.
     * Make sure enough of the specified `remote_fees_id` asset is included in the given list
     * of `assets`. `remote_fees_id` should be enough to pay for `weight_limit`. If more weight
     * is needed than `weight_limit`, then the operation will fail and the sent assets may be
     * at risk.
     *
     * `remote_fees_id` may use different transfer type than rest of `assets` and can be
     * specified through `fees_transfer_type`.
     *
     * The caller needs to specify what should happen to the transferred assets once they reach
     * the `dest` chain. This is done through the `custom_xcm_on_dest` parameter, which
     * contains the instructions to execute on `dest` as a final step.
     * This is usually as simple as:
     * `Xcm(vec![DepositAsset { assets: Wild(AllCounted(assets.len())), beneficiary }])`,
     * but could be something more exotic like sending the `assets` even further.
     *
     * - `origin`: Must be capable of withdrawing the `assets` and executing XCM.
     * - `dest`: Destination context for the assets. Will typically be `[Parent,
     * Parachain(..)]` to send from parachain to parachain, or `[Parachain(..)]` to send from
     * relay to parachain, or `(parents: 2, (GlobalConsensus(..), ..))` to send from
     * parachain across a bridge to another ecosystem destination.
     * - `assets`: The assets to be withdrawn. This should include the assets used to pay the
     * fee on the `dest` (and possibly reserve) chains.
     * - `assets_transfer_type`: The XCM `TransferType` used to transfer the `assets`.
     * - `remote_fees_id`: One of the included `assets` to be used to pay fees.
     * - `fees_transfer_type`: The XCM `TransferType` used to transfer the `fees` assets.
     * - `custom_xcm_on_dest`: The XCM to be executed on `dest` chain as the last step of the
     * transfer, which also determines what happens to the assets on the destination chain.
     * - `weight_limit`: The remote-side weight limit, if any, for the XCM fee purchase.
     */
    "transfer_assets_using_type_and_then": Anonymize<I9bnv6lu0crf1q>;
    /**
     * Authorize another `aliaser` location to alias into the local `origin` making this call.
     * The `aliaser` is only authorized until the provided `expiry` block number.
     * The call can also be used for a previously authorized alias in order to update its
     * `expiry` block number.
     *
     * Usually useful to allow your local account to be aliased into from a remote location
     * also under your control (like your account on another chain).
     *
     * WARNING: make sure the caller `origin` (you) trusts the `aliaser` location to act in
     * their/your name. Once authorized using this call, the `aliaser` can freely impersonate
     * `origin` in XCM programs executed on the local chain.
     */
    "add_authorized_alias": {
        "aliaser": XcmVersionedLocation;
        "expires"?: Anonymize<I35p85j063s0il>;
    };
    /**
     * Remove a previously authorized `aliaser` from the list of locations that can alias into
     * the local `origin` making this call.
     */
    "remove_authorized_alias": {
        "aliaser": XcmVersionedLocation;
    };
    /**
     * Remove all previously authorized `aliaser`s that can alias into the local `origin`
     * making this call.
     */
    "remove_all_authorized_aliases": undefined;
}>;
export type Ia5cotcvi888ln = {
    "dest": XcmVersionedLocation;
    "message": XcmVersionedXcm;
};
export type I21jsa919m88fd = {
    "dest": XcmVersionedLocation;
    "beneficiary": XcmVersionedLocation;
    "assets": XcmVersionedAssets;
    "fee_asset_item": number;
};
export type Iegif7m3upfe1k = {
    "message": XcmVersionedXcm;
    "max_weight": Anonymize<I4q39t5hn830vp>;
};
export type I9kt8c221c83ln = {
    "location": Anonymize<If9iqq7i64mur8>;
    "version": number;
};
export type Ic76kfh5ebqkpl = {
    "maybe_xcm_version"?: Anonymize<I4arjljr6dpflb>;
};
export type Icscpmubum33bq = {
    "location": XcmVersionedLocation;
};
export type Ibgm4rnf22lal1 = {
    "suspended": boolean;
};
export type Ie68np0vpihith = {
    "assets": XcmVersionedAssets;
    "beneficiary": XcmVersionedLocation;
};
export type I9bnv6lu0crf1q = {
    "dest": XcmVersionedLocation;
    "assets": XcmVersionedAssets;
    "assets_transfer_type": Enum<{
        "Teleport": undefined;
        "LocalReserve": undefined;
        "DestinationReserve": undefined;
        "RemoteReserve": XcmVersionedLocation;
    }>;
    "remote_fees_id": XcmVersionedAssetId;
    "fees_transfer_type": Enum<{
        "Teleport": undefined;
        "LocalReserve": undefined;
        "DestinationReserve": undefined;
        "RemoteReserve": XcmVersionedLocation;
    }>;
    "custom_xcm_on_dest": XcmVersionedXcm;
    "weight_limit": XcmV3WeightLimit;
};
export type XcmVersionedAssetId = Enum<{
    "V3": XcmV3MultiassetAssetId;
    "V4": Anonymize<I4c0s5cioidn76>;
    "V5": Anonymize<If9iqq7i64mur8>;
}>;
export declare const XcmVersionedAssetId: GetEnum<XcmVersionedAssetId>;
export type I3lic4llm6egbr = AnonymousEnum<{
    /**
     * Remove a page which has no more messages remaining to be processed or is stale.
     */
    "reap_page": {
        "message_origin": ParachainsInclusionAggregateMessageOrigin;
        "page_index": number;
    };
    /**
     * Execute an overweight message.
     *
     * Temporary processing errors will be propagated whereas permanent errors are treated
     * as success condition.
     *
     * - `origin`: Must be `Signed`.
     * - `message_origin`: The origin from which the message to be executed arrived.
     * - `page`: The page in the queue in which the message to be executed is sitting.
     * - `index`: The index into the queue of the message to be executed.
     * - `weight_limit`: The maximum amount of weight allowed to be consumed in the execution
     * of the message.
     *
     * Benchmark complexity considerations: O(index + weight_limit).
     */
    "execute_overweight": {
        "message_origin": ParachainsInclusionAggregateMessageOrigin;
        "page": number;
        "index": number;
        "weight_limit": Anonymize<I4q39t5hn830vp>;
    };
}>;
export type ParachainsInclusionAggregateMessageOrigin = Enum<{
    "Ump": ParachainsInclusionUmpQueueId;
}>;
export declare const ParachainsInclusionAggregateMessageOrigin: GetEnum<ParachainsInclusionAggregateMessageOrigin>;
export type ParachainsInclusionUmpQueueId = Enum<{
    "Para": number;
}>;
export declare const ParachainsInclusionUmpQueueId: GetEnum<ParachainsInclusionUmpQueueId>;
export type If582h5gr5gh6f = AnonymousEnum<{
    /**
     * Initialize a conversion rate to native balance for the given asset.
     *
     * ## Complexity
     * - O(1)
     */
    "create": {
        "asset_kind": Anonymize<I2q3ri6itcjj5u>;
        "rate": bigint;
    };
    /**
     * Update the conversion rate to native balance for the given asset.
     *
     * ## Complexity
     * - O(1)
     */
    "update": {
        "asset_kind": Anonymize<I2q3ri6itcjj5u>;
        "rate": bigint;
    };
    /**
     * Remove an existing conversion rate to native balance for the given asset.
     *
     * ## Complexity
     * - O(1)
     */
    "remove": {
        "asset_kind": Anonymize<I2q3ri6itcjj5u>;
    };
}>;
export type ExtensionsCheckMortality = Enum<{
    "Immortal": undefined;
    "Mortal1": number;
    "Mortal2": number;
    "Mortal3": number;
    "Mortal4": number;
    "Mortal5": number;
    "Mortal6": number;
    "Mortal7": number;
    "Mortal8": number;
    "Mortal9": number;
    "Mortal10": number;
    "Mortal11": number;
    "Mortal12": number;
    "Mortal13": number;
    "Mortal14": number;
    "Mortal15": number;
    "Mortal16": number;
    "Mortal17": number;
    "Mortal18": number;
    "Mortal19": number;
    "Mortal20": number;
    "Mortal21": number;
    "Mortal22": number;
    "Mortal23": number;
    "Mortal24": number;
    "Mortal25": number;
    "Mortal26": number;
    "Mortal27": number;
    "Mortal28": number;
    "Mortal29": number;
    "Mortal30": number;
    "Mortal31": number;
    "Mortal32": number;
    "Mortal33": number;
    "Mortal34": number;
    "Mortal35": number;
    "Mortal36": number;
    "Mortal37": number;
    "Mortal38": number;
    "Mortal39": number;
    "Mortal40": number;
    "Mortal41": number;
    "Mortal42": number;
    "Mortal43": number;
    "Mortal44": number;
    "Mortal45": number;
    "Mortal46": number;
    "Mortal47": number;
    "Mortal48": number;
    "Mortal49": number;
    "Mortal50": number;
    "Mortal51": number;
    "Mortal52": number;
    "Mortal53": number;
    "Mortal54": number;
    "Mortal55": number;
    "Mortal56": number;
    "Mortal57": number;
    "Mortal58": number;
    "Mortal59": number;
    "Mortal60": number;
    "Mortal61": number;
    "Mortal62": number;
    "Mortal63": number;
    "Mortal64": number;
    "Mortal65": number;
    "Mortal66": number;
    "Mortal67": number;
    "Mortal68": number;
    "Mortal69": number;
    "Mortal70": number;
    "Mortal71": number;
    "Mortal72": number;
    "Mortal73": number;
    "Mortal74": number;
    "Mortal75": number;
    "Mortal76": number;
    "Mortal77": number;
    "Mortal78": number;
    "Mortal79": number;
    "Mortal80": number;
    "Mortal81": number;
    "Mortal82": number;
    "Mortal83": number;
    "Mortal84": number;
    "Mortal85": number;
    "Mortal86": number;
    "Mortal87": number;
    "Mortal88": number;
    "Mortal89": number;
    "Mortal90": number;
    "Mortal91": number;
    "Mortal92": number;
    "Mortal93": number;
    "Mortal94": number;
    "Mortal95": number;
    "Mortal96": number;
    "Mortal97": number;
    "Mortal98": number;
    "Mortal99": number;
    "Mortal100": number;
    "Mortal101": number;
    "Mortal102": number;
    "Mortal103": number;
    "Mortal104": number;
    "Mortal105": number;
    "Mortal106": number;
    "Mortal107": number;
    "Mortal108": number;
    "Mortal109": number;
    "Mortal110": number;
    "Mortal111": number;
    "Mortal112": number;
    "Mortal113": number;
    "Mortal114": number;
    "Mortal115": number;
    "Mortal116": number;
    "Mortal117": number;
    "Mortal118": number;
    "Mortal119": number;
    "Mortal120": number;
    "Mortal121": number;
    "Mortal122": number;
    "Mortal123": number;
    "Mortal124": number;
    "Mortal125": number;
    "Mortal126": number;
    "Mortal127": number;
    "Mortal128": number;
    "Mortal129": number;
    "Mortal130": number;
    "Mortal131": number;
    "Mortal132": number;
    "Mortal133": number;
    "Mortal134": number;
    "Mortal135": number;
    "Mortal136": number;
    "Mortal137": number;
    "Mortal138": number;
    "Mortal139": number;
    "Mortal140": number;
    "Mortal141": number;
    "Mortal142": number;
    "Mortal143": number;
    "Mortal144": number;
    "Mortal145": number;
    "Mortal146": number;
    "Mortal147": number;
    "Mortal148": number;
    "Mortal149": number;
    "Mortal150": number;
    "Mortal151": number;
    "Mortal152": number;
    "Mortal153": number;
    "Mortal154": number;
    "Mortal155": number;
    "Mortal156": number;
    "Mortal157": number;
    "Mortal158": number;
    "Mortal159": number;
    "Mortal160": number;
    "Mortal161": number;
    "Mortal162": number;
    "Mortal163": number;
    "Mortal164": number;
    "Mortal165": number;
    "Mortal166": number;
    "Mortal167": number;
    "Mortal168": number;
    "Mortal169": number;
    "Mortal170": number;
    "Mortal171": number;
    "Mortal172": number;
    "Mortal173": number;
    "Mortal174": number;
    "Mortal175": number;
    "Mortal176": number;
    "Mortal177": number;
    "Mortal178": number;
    "Mortal179": number;
    "Mortal180": number;
    "Mortal181": number;
    "Mortal182": number;
    "Mortal183": number;
    "Mortal184": number;
    "Mortal185": number;
    "Mortal186": number;
    "Mortal187": number;
    "Mortal188": number;
    "Mortal189": number;
    "Mortal190": number;
    "Mortal191": number;
    "Mortal192": number;
    "Mortal193": number;
    "Mortal194": number;
    "Mortal195": number;
    "Mortal196": number;
    "Mortal197": number;
    "Mortal198": number;
    "Mortal199": number;
    "Mortal200": number;
    "Mortal201": number;
    "Mortal202": number;
    "Mortal203": number;
    "Mortal204": number;
    "Mortal205": number;
    "Mortal206": number;
    "Mortal207": number;
    "Mortal208": number;
    "Mortal209": number;
    "Mortal210": number;
    "Mortal211": number;
    "Mortal212": number;
    "Mortal213": number;
    "Mortal214": number;
    "Mortal215": number;
    "Mortal216": number;
    "Mortal217": number;
    "Mortal218": number;
    "Mortal219": number;
    "Mortal220": number;
    "Mortal221": number;
    "Mortal222": number;
    "Mortal223": number;
    "Mortal224": number;
    "Mortal225": number;
    "Mortal226": number;
    "Mortal227": number;
    "Mortal228": number;
    "Mortal229": number;
    "Mortal230": number;
    "Mortal231": number;
    "Mortal232": number;
    "Mortal233": number;
    "Mortal234": number;
    "Mortal235": number;
    "Mortal236": number;
    "Mortal237": number;
    "Mortal238": number;
    "Mortal239": number;
    "Mortal240": number;
    "Mortal241": number;
    "Mortal242": number;
    "Mortal243": number;
    "Mortal244": number;
    "Mortal245": number;
    "Mortal246": number;
    "Mortal247": number;
    "Mortal248": number;
    "Mortal249": number;
    "Mortal250": number;
    "Mortal251": number;
    "Mortal252": number;
    "Mortal253": number;
    "Mortal254": number;
    "Mortal255": number;
}>;
export declare const ExtensionsCheckMortality: GetEnum<ExtensionsCheckMortality>;
export type Idmcmrk34p8gic = AnonymousEnum<{
    /**
     * Report voter equivocation/misbehavior. This method will verify the
     * equivocation proof and validate the given key ownership proof
     * against the extracted offender. If both are valid, the offence
     * will be reported.
     */
    "report_double_voting": {
        "equivocation_proof": {
            "first": Anonymize<I3eao7ea0kppv8>;
            "second": Anonymize<I3eao7ea0kppv8>;
        };
        "key_owner_proof": Anonymize<I3ia7aufsoj0l1>;
    };
    /**
     * Report voter equivocation/misbehavior. This method will verify the
     * equivocation proof and validate the given key ownership proof
     * against the extracted offender. If both are valid, the offence
     * will be reported.
     *
     * This extrinsic must be called unsigned and it is expected that only
     * block authors will call it (validated in `ValidateUnsigned`), as such
     * if the block author is defined it will be defined as the equivocation
     * reporter.
     */
    "report_double_voting_unsigned": {
        "equivocation_proof": {
            "first": Anonymize<I3eao7ea0kppv8>;
            "second": Anonymize<I3eao7ea0kppv8>;
        };
        "key_owner_proof": Anonymize<I3ia7aufsoj0l1>;
    };
    /**
     * Reset BEEFY consensus by setting a new BEEFY genesis at `delay_in_blocks` blocks in the
     * future.
     *
     * Note: `delay_in_blocks` has to be at least 1.
     */
    "set_new_genesis": {
        "delay_in_blocks": number;
    };
    /**
     * Report fork voting equivocation. This method will verify the equivocation proof
     * and validate the given key ownership proof against the extracted offender.
     * If both are valid, the offence will be reported.
     */
    "report_fork_voting": {
        "equivocation_proof": {
            "vote": Anonymize<I3eao7ea0kppv8>;
            "ancestry_proof": {
                "prev_peaks": Anonymize<Ic5m5lp1oioo8r>;
                "prev_leaf_count": bigint;
                "leaf_count": bigint;
                "items": Array<[bigint, FixedSizeBinary<32>]>;
            };
            "header": Anonymize<Ic952bubvq4k7d>;
        };
        "key_owner_proof": Anonymize<I3ia7aufsoj0l1>;
    };
    /**
     * Report fork voting equivocation. This method will verify the equivocation proof
     * and validate the given key ownership proof against the extracted offender.
     * If both are valid, the offence will be reported.
     *
     * This extrinsic must be called unsigned and it is expected that only
     * block authors will call it (validated in `ValidateUnsigned`), as such
     * if the block author is defined it will be defined as the equivocation
     * reporter.
     */
    "report_fork_voting_unsigned": {
        "equivocation_proof": {
            "vote": Anonymize<I3eao7ea0kppv8>;
            "ancestry_proof": {
                "prev_peaks": Anonymize<Ic5m5lp1oioo8r>;
                "prev_leaf_count": bigint;
                "leaf_count": bigint;
                "items": Array<[bigint, FixedSizeBinary<32>]>;
            };
            "header": Anonymize<Ic952bubvq4k7d>;
        };
        "key_owner_proof": Anonymize<I3ia7aufsoj0l1>;
    };
    /**
     * Report future block voting equivocation. This method will verify the equivocation proof
     * and validate the given key ownership proof against the extracted offender.
     * If both are valid, the offence will be reported.
     */
    "report_future_block_voting": {
        "equivocation_proof": Anonymize<I3eao7ea0kppv8>;
        "key_owner_proof": Anonymize<I3ia7aufsoj0l1>;
    };
    /**
     * Report future block voting equivocation. This method will verify the equivocation proof
     * and validate the given key ownership proof against the extracted offender.
     * If both are valid, the offence will be reported.
     *
     * This extrinsic must be called unsigned and it is expected that only
     * block authors will call it (validated in `ValidateUnsigned`), as such
     * if the block author is defined it will be defined as the equivocation
     * reporter.
     */
    "report_future_block_voting_unsigned": {
        "equivocation_proof": Anonymize<I3eao7ea0kppv8>;
        "key_owner_proof": Anonymize<I3ia7aufsoj0l1>;
    };
}>;
export type I3eao7ea0kppv8 = {
    "commitment": {
        "payload": Array<[FixedSizeBinary<2>, Binary]>;
        "block_number": number;
        "validator_set_id": bigint;
    };
    "id": FixedSizeBinary<33>;
    "signature": FixedSizeBinary<65>;
};
export type I4cbvqmqadhrea = {
    "who": SS58String;
};
export type Iag3f1hum3p4c8 = {
    "balance": bigint;
    "status": Enum<{
        "Liquid": undefined;
        "Frozen": undefined;
        "Blocked": undefined;
    }>;
    "reason": Enum<{
        "Consumer": undefined;
        "Sufficient": undefined;
        "DepositHeld": bigint;
        "DepositRefunded": undefined;
        "DepositFrom": Anonymize<I95l2k9b1re95f>;
    }>;
};
export type I4v5g6i7bmt06o = [Anonymize<If9iqq7i64mur8>, SS58String];
export type Ibqpfutsmcg63l = AnonymousEnum<{
    "System": Anonymize<Iekve0i6djpd9f>;
    "ParachainSystem": Anonymize<I3u72uvpuo4qrt>;
    "Timestamp": Anonymize<I7d75gqfg6jh9c>;
    "ParachainInfo": undefined;
    "MultiBlockMigrations": Anonymize<I4oqb168b2d4er>;
    "Preimage": Anonymize<If81ks88t5mpk5>;
    "Scheduler": Enum<{
        /**
         * Anonymously schedule a task.
         */
        "schedule": {
            "when": number;
            "maybe_periodic"?: Anonymize<Iep7au1720bm0e>;
            "priority": number;
            "call": TxCallData;
        };
        /**
         * Cancel an anonymously scheduled task.
         */
        "cancel": Anonymize<I5n4sebgkfr760>;
        /**
         * Schedule a named task.
         */
        "schedule_named": {
            "id": FixedSizeBinary<32>;
            "when": number;
            "maybe_periodic"?: Anonymize<Iep7au1720bm0e>;
            "priority": number;
            "call": TxCallData;
        };
        /**
         * Cancel a named scheduled task.
         */
        "cancel_named": Anonymize<Ifs1i5fk9cqvr6>;
        /**
         * Anonymously schedule a task after a delay.
         */
        "schedule_after": {
            "after": number;
            "maybe_periodic"?: Anonymize<Iep7au1720bm0e>;
            "priority": number;
            "call": TxCallData;
        };
        /**
         * Schedule a named task after a delay.
         */
        "schedule_named_after": {
            "id": FixedSizeBinary<32>;
            "after": number;
            "maybe_periodic"?: Anonymize<Iep7au1720bm0e>;
            "priority": number;
            "call": TxCallData;
        };
        /**
         * Set a retry configuration for a task so that, in case its scheduled run fails, it will
         * be retried after `period` blocks, for a total amount of `retries` retries or until it
         * succeeds.
         *
         * Tasks which need to be scheduled for a retry are still subject to weight metering and
         * agenda space, same as a regular task. If a periodic task fails, it will be scheduled
         * normally while the task is retrying.
         *
         * Tasks scheduled as a result of a retry for a periodic task are unnamed, non-periodic
         * clones of the original task. Their retry configuration will be derived from the
         * original task's configuration, but will have a lower value for `remaining` than the
         * original `total_retries`.
         */
        "set_retry": Anonymize<Ieg3fd8p4pkt10>;
        /**
         * Set a retry configuration for a named task so that, in case its scheduled run fails, it
         * will be retried after `period` blocks, for a total amount of `retries` retries or until
         * it succeeds.
         *
         * Tasks which need to be scheduled for a retry are still subject to weight metering and
         * agenda space, same as a regular task. If a periodic task fails, it will be scheduled
         * normally while the task is retrying.
         *
         * Tasks scheduled as a result of a retry for a periodic task are unnamed, non-periodic
         * clones of the original task. Their retry configuration will be derived from the
         * original task's configuration, but will have a lower value for `remaining` than the
         * original `total_retries`.
         */
        "set_retry_named": Anonymize<I8kg5ll427kfqq>;
        /**
         * Removes the retry configuration of a task.
         */
        "cancel_retry": Anonymize<I467333262q1l9>;
        /**
         * Cancel the retry configuration of a named task.
         */
        "cancel_retry_named": Anonymize<Ifs1i5fk9cqvr6>;
    }>;
    "Sudo": Enum<{
        /**
         * Authenticates the sudo key and dispatches a function call with `Root` origin.
         */
        "sudo": Anonymize<I8l76461to7o6g>;
        /**
         * Authenticates the sudo key and dispatches a function call with `Root` origin.
         * This function does not check the weight of the call, and instead allows the
         * Sudo user to specify the weight of the call.
         *
         * The dispatch origin for this call must be _Signed_.
         */
        "sudo_unchecked_weight": Anonymize<I9ujc5mvue37b>;
        /**
         * Authenticates the current sudo key and sets the given AccountId (`new`) as the new sudo
         * key.
         */
        "set_key": Anonymize<I8k3rnvpeeh4hv>;
        /**
         * Authenticates the sudo key and dispatches a function call with `Signed` origin from
         * a given account.
         *
         * The dispatch origin for this call must be _Signed_.
         */
        "sudo_as": {
            "who": MultiAddress;
            "call": TxCallData;
        };
        /**
         * Permanently removes the sudo key.
         *
         * **This cannot be un-done.**
         */
        "remove_key": undefined;
    }>;
    "Balances": Anonymize<I9svldsp29mh87>;
    "Vesting": Anonymize<Icgf8vmtkbnu4u>;
    "CollatorSelection": Anonymize<I9dpq5287dur8b>;
    "Session": Anonymize<I77dda7hps0u37>;
    "XcmpQueue": Anonymize<Ib7tahn20bvsep>;
    "PolkadotXcm": Anonymize<I6k1inef986368>;
    "CumulusXcm": undefined;
    "ToRococoXcmRouter": Anonymize<I6epb28bkd5aqn>;
    "MessageQueue": Anonymize<Ic2uoe7jdksosp>;
    "SnowbridgeSystemFrontend": Anonymize<I15u4pbuusigel>;
    "Utility": Enum<{
        /**
         * Send a batch of dispatch calls.
         *
         * May be called from any origin except `None`.
         *
         * - `calls`: The calls to be dispatched from the same origin. The number of call must not
         * exceed the constant: `batched_calls_limit` (available in constant metadata).
         *
         * If origin is root then the calls are dispatched without checking origin filter. (This
         * includes bypassing `frame_system::Config::BaseCallFilter`).
         *
         * ## Complexity
         * - O(C) where C is the number of calls to be batched.
         *
         * This will return `Ok` in all circumstances. To determine the success of the batch, an
         * event is deposited. If a call failed and the batch was interrupted, then the
         * `BatchInterrupted` event is deposited, along with the number of successful calls made
         * and the error of the failed call. If all were successful, then the `BatchCompleted`
         * event is deposited.
         */
        "batch": {
            "calls": Array<TxCallData>;
        };
        /**
         * Send a call through an indexed pseudonym of the sender.
         *
         * Filter from origin are passed along. The call will be dispatched with an origin which
         * use the same filter as the origin of this call.
         *
         * NOTE: If you need to ensure that any account-based filtering is not honored (i.e.
         * because you expect `proxy` to have been used prior in the call stack and you do not want
         * the call restrictions to apply to any sub-accounts), then use `as_multi_threshold_1`
         * in the Multisig pallet instead.
         *
         * NOTE: Prior to version *12, this was called `as_limited_sub`.
         *
         * The dispatch origin for this call must be _Signed_.
         */
        "as_derivative": {
            "index": number;
            "call": TxCallData;
        };
        /**
         * Send a batch of dispatch calls and atomically execute them.
         * The whole transaction will rollback and fail if any of the calls failed.
         *
         * May be called from any origin except `None`.
         *
         * - `calls`: The calls to be dispatched from the same origin. The number of call must not
         * exceed the constant: `batched_calls_limit` (available in constant metadata).
         *
         * If origin is root then the calls are dispatched without checking origin filter. (This
         * includes bypassing `frame_system::Config::BaseCallFilter`).
         *
         * ## Complexity
         * - O(C) where C is the number of calls to be batched.
         */
        "batch_all": {
            "calls": Array<TxCallData>;
        };
        /**
         * Dispatches a function call with a provided origin.
         *
         * The dispatch origin for this call must be _Root_.
         *
         * ## Complexity
         * - O(1).
         */
        "dispatch_as": {
            "as_origin": Anonymize<I3fd3prasbku5o>;
            "call": TxCallData;
        };
        /**
         * Send a batch of dispatch calls.
         * Unlike `batch`, it allows errors and won't interrupt.
         *
         * May be called from any origin except `None`.
         *
         * - `calls`: The calls to be dispatched from the same origin. The number of call must not
         * exceed the constant: `batched_calls_limit` (available in constant metadata).
         *
         * If origin is root then the calls are dispatch without checking origin filter. (This
         * includes bypassing `frame_system::Config::BaseCallFilter`).
         *
         * ## Complexity
         * - O(C) where C is the number of calls to be batched.
         */
        "force_batch": {
            "calls": Array<TxCallData>;
        };
        /**
         * Dispatch a function call with a specified weight.
         *
         * This function does not check the weight of the call, and instead allows the
         * Root origin to specify the weight of the call.
         *
         * The dispatch origin for this call must be _Root_.
         */
        "with_weight": Anonymize<I9ujc5mvue37b>;
        /**
         * Dispatch a fallback call in the event the main call fails to execute.
         * May be called from any origin except `None`.
         *
         * This function first attempts to dispatch the `main` call.
         * If the `main` call fails, the `fallback` is attemted.
         * if the fallback is successfully dispatched, the weights of both calls
         * are accumulated and an event containing the main call error is deposited.
         *
         * In the event of a fallback failure the whole call fails
         * with the weights returned.
         *
         * - `main`: The main call to be dispatched. This is the primary action to execute.
         * - `fallback`: The fallback call to be dispatched in case the `main` call fails.
         *
         * ## Dispatch Logic
         * - If the origin is `root`, both the main and fallback calls are executed without
         * applying any origin filters.
         * - If the origin is not `root`, the origin filter is applied to both the `main` and
         * `fallback` calls.
         *
         * ## Use Case
         * - Some use cases might involve submitting a `batch` type call in either main, fallback
         * or both.
         */
        "if_else": {
            "main": TxCallData;
            "fallback": TxCallData;
        };
        /**
         * Dispatches a function call with a provided origin.
         *
         * Almost the same as [`Pallet::dispatch_as`] but forwards any error of the inner call.
         *
         * The dispatch origin for this call must be _Root_.
         */
        "dispatch_as_fallible": {
            "as_origin": Anonymize<I3fd3prasbku5o>;
            "call": TxCallData;
        };
    }>;
    "Multisig": Enum<{
        /**
         * Immediately dispatch a multi-signature call using a single approval from the caller.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * - `other_signatories`: The accounts (other than the sender) who are part of the
         * multi-signature, but do not participate in the approval process.
         * - `call`: The call to be executed.
         *
         * Result is equivalent to the dispatched result.
         *
         * ## Complexity
         * O(Z + C) where Z is the length of the call and C its execution weight.
         */
        "as_multi_threshold_1": {
            "other_signatories": Anonymize<Ia2lhg7l2hilo3>;
            "call": TxCallData;
        };
        /**
         * Register approval for a dispatch to be made from a deterministic composite account if
         * approved by a total of `threshold - 1` of `other_signatories`.
         *
         * If there are enough, then dispatch the call.
         *
         * Payment: `DepositBase` will be reserved if this is the first approval, plus
         * `threshold` times `DepositFactor`. It is returned once this dispatch happens or
         * is cancelled.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * - `threshold`: The total number of approvals for this dispatch before it is executed.
         * - `other_signatories`: The accounts (other than the sender) who can approve this
         * dispatch. May not be empty.
         * - `maybe_timepoint`: If this is the first approval, then this must be `None`. If it is
         * not the first approval, then it must be `Some`, with the timepoint (block number and
         * transaction index) of the first approval transaction.
         * - `call`: The call to be executed.
         *
         * NOTE: Unless this is the final approval, you will generally want to use
         * `approve_as_multi` instead, since it only requires a hash of the call.
         *
         * Result is equivalent to the dispatched result if `threshold` is exactly `1`. Otherwise
         * on success, result is `Ok` and the result from the interior call, if it was executed,
         * may be found in the deposited `MultisigExecuted` event.
         *
         * ## Complexity
         * - `O(S + Z + Call)`.
         * - Up to one balance-reserve or unreserve operation.
         * - One passthrough operation, one insert, both `O(S)` where `S` is the number of
         * signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
         * - One call encode & hash, both of complexity `O(Z)` where `Z` is tx-len.
         * - One encode & hash, both of complexity `O(S)`.
         * - Up to one binary search and insert (`O(logS + S)`).
         * - I/O: 1 read `O(S)`, up to 1 mutate `O(S)`. Up to one remove.
         * - One event.
         * - The weight of the `call`.
         * - Storage: inserts one item, value size bounded by `MaxSignatories`, with a deposit
         * taken for its lifetime of `DepositBase + threshold * DepositFactor`.
         */
        "as_multi": {
            "threshold": number;
            "other_signatories": Anonymize<Ia2lhg7l2hilo3>;
            "maybe_timepoint"?: Anonymize<I95jfd8j5cr5eh>;
            "call": TxCallData;
            "max_weight": Anonymize<I4q39t5hn830vp>;
        };
        /**
         * Register approval for a dispatch to be made from a deterministic composite account if
         * approved by a total of `threshold - 1` of `other_signatories`.
         *
         * Payment: `DepositBase` will be reserved if this is the first approval, plus
         * `threshold` times `DepositFactor`. It is returned once this dispatch happens or
         * is cancelled.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * - `threshold`: The total number of approvals for this dispatch before it is executed.
         * - `other_signatories`: The accounts (other than the sender) who can approve this
         * dispatch. May not be empty.
         * - `maybe_timepoint`: If this is the first approval, then this must be `None`. If it is
         * not the first approval, then it must be `Some`, with the timepoint (block number and
         * transaction index) of the first approval transaction.
         * - `call_hash`: The hash of the call to be executed.
         *
         * NOTE: If this is the final approval, you will want to use `as_multi` instead.
         *
         * ## Complexity
         * - `O(S)`.
         * - Up to one balance-reserve or unreserve operation.
         * - One passthrough operation, one insert, both `O(S)` where `S` is the number of
         * signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
         * - One encode & hash, both of complexity `O(S)`.
         * - Up to one binary search and insert (`O(logS + S)`).
         * - I/O: 1 read `O(S)`, up to 1 mutate `O(S)`. Up to one remove.
         * - One event.
         * - Storage: inserts one item, value size bounded by `MaxSignatories`, with a deposit
         * taken for its lifetime of `DepositBase + threshold * DepositFactor`.
         */
        "approve_as_multi": Anonymize<Ideaemvoneh309>;
        /**
         * Cancel a pre-existing, on-going multisig transaction. Any deposit reserved previously
         * for this operation will be unreserved on success.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * - `threshold`: The total number of approvals for this dispatch before it is executed.
         * - `other_signatories`: The accounts (other than the sender) who can approve this
         * dispatch. May not be empty.
         * - `timepoint`: The timepoint (block number and transaction index) of the first approval
         * transaction for this dispatch.
         * - `call_hash`: The hash of the call to be executed.
         *
         * ## Complexity
         * - `O(S)`.
         * - Up to one balance-reserve or unreserve operation.
         * - One passthrough operation, one insert, both `O(S)` where `S` is the number of
         * signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
         * - One encode & hash, both of complexity `O(S)`.
         * - One event.
         * - I/O: 1 read `O(S)`, one remove.
         * - Storage: removes one item.
         */
        "cancel_as_multi": Anonymize<I3d9o9d7epp66v>;
        /**
         * Poke the deposit reserved for an existing multisig operation.
         *
         * The dispatch origin for this call must be _Signed_ and must be the original depositor of
         * the multisig operation.
         *
         * The transaction fee is waived if the deposit amount has changed.
         *
         * - `threshold`: The total number of approvals needed for this multisig.
         * - `other_signatories`: The accounts (other than the sender) who are part of the
         * multisig.
         * - `call_hash`: The hash of the call this deposit is reserved for.
         *
         * Emits `DepositPoked` if successful.
         */
        "poke_deposit": Anonymize<I6lqh1vgb4mcja>;
    }>;
    "Proxy": Enum<{
        /**
         * Dispatch the given `call` from an account that the sender is authorised for through
         * `add_proxy`.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * Parameters:
         * - `real`: The account that the proxy will make a call on behalf of.
         * - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
         * - `call`: The call to be made by the `real` account.
         */
        "proxy": {
            "real": MultiAddress;
            "force_proxy_type"?: Anonymize<I9usgdlqbp0c7e>;
            "call": TxCallData;
        };
        /**
         * Register a proxy account for the sender that is able to make calls on its behalf.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * Parameters:
         * - `proxy`: The account that the `caller` would like to make a proxy.
         * - `proxy_type`: The permissions allowed for this proxy account.
         * - `delay`: The announcement period required of the initial proxy. Will generally be
         * zero.
         */
        "add_proxy": {
            "delegate": MultiAddress;
            "proxy_type": Anonymize<Iqcs55g6cq7gj>;
            "delay": number;
        };
        /**
         * Unregister a proxy account for the sender.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * Parameters:
         * - `proxy`: The account that the `caller` would like to remove as a proxy.
         * - `proxy_type`: The permissions currently enabled for the removed proxy account.
         */
        "remove_proxy": {
            "delegate": MultiAddress;
            "proxy_type": Anonymize<Iqcs55g6cq7gj>;
            "delay": number;
        };
        /**
         * Unregister all proxy accounts for the sender.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * WARNING: This may be called on accounts created by `create_pure`, however if done, then
         * the unreserved fees will be inaccessible. **All access to this account will be lost.**
         */
        "remove_proxies": undefined;
        /**
         * Spawn a fresh new account that is guaranteed to be otherwise inaccessible, and
         * initialize it with a proxy of `proxy_type` for `origin` sender.
         *
         * Requires a `Signed` origin.
         *
         * - `proxy_type`: The type of the proxy that the sender will be registered as over the
         * new account. This will almost always be the most permissive `ProxyType` possible to
         * allow for maximum flexibility.
         * - `index`: A disambiguation index, in case this is called multiple times in the same
         * transaction (e.g. with `utility::batch`). Unless you're using `batch` you probably just
         * want to use `0`.
         * - `delay`: The announcement period required of the initial proxy. Will generally be
         * zero.
         *
         * Fails with `Duplicate` if this has already been called in this transaction, from the
         * same sender, with the same parameters.
         *
         * Fails if there are insufficient funds to pay for deposit.
         */
        "create_pure": {
            "proxy_type": Anonymize<Iqcs55g6cq7gj>;
            "delay": number;
            "index": number;
        };
        /**
         * Removes a previously spawned pure proxy.
         *
         * WARNING: **All access to this account will be lost.** Any funds held in it will be
         * inaccessible.
         *
         * Requires a `Signed` origin, and the sender account must have been created by a call to
         * `create_pure` with corresponding parameters.
         *
         * - `spawner`: The account that originally called `create_pure` to create this account.
         * - `index`: The disambiguation index originally passed to `create_pure`. Probably `0`.
         * - `proxy_type`: The proxy type originally passed to `create_pure`.
         * - `height`: The height of the chain when the call to `create_pure` was processed.
         * - `ext_index`: The extrinsic index in which the call to `create_pure` was processed.
         *
         * Fails with `NoPermission` in case the caller is not a previously created pure
         * account whose `create_pure` call has corresponding parameters.
         */
        "kill_pure": {
            "spawner": MultiAddress;
            "proxy_type": Anonymize<Iqcs55g6cq7gj>;
            "index": number;
            "height": number;
            "ext_index": number;
        };
        /**
         * Publish the hash of a proxy-call that will be made in the future.
         *
         * This must be called some number of blocks before the corresponding `proxy` is attempted
         * if the delay associated with the proxy relationship is greater than zero.
         *
         * No more than `MaxPending` announcements may be made at any one time.
         *
         * This will take a deposit of `AnnouncementDepositFactor` as well as
         * `AnnouncementDepositBase` if there are no other pending announcements.
         *
         * The dispatch origin for this call must be _Signed_ and a proxy of `real`.
         *
         * Parameters:
         * - `real`: The account that the proxy will make a call on behalf of.
         * - `call_hash`: The hash of the call to be made by the `real` account.
         */
        "announce": Anonymize<I2eb501t8s6hsq>;
        /**
         * Remove a given announcement.
         *
         * May be called by a proxy account to remove a call they previously announced and return
         * the deposit.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * Parameters:
         * - `real`: The account that the proxy will make a call on behalf of.
         * - `call_hash`: The hash of the call to be made by the `real` account.
         */
        "remove_announcement": Anonymize<I2eb501t8s6hsq>;
        /**
         * Remove the given announcement of a delegate.
         *
         * May be called by a target (proxied) account to remove a call that one of their delegates
         * (`delegate`) has announced they want to execute. The deposit is returned.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * Parameters:
         * - `delegate`: The account that previously announced the call.
         * - `call_hash`: The hash of the call to be made.
         */
        "reject_announcement": Anonymize<Ianmuoljk2sk1u>;
        /**
         * Dispatch the given `call` from an account that the sender is authorized for through
         * `add_proxy`.
         *
         * Removes any corresponding announcement(s).
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * Parameters:
         * - `real`: The account that the proxy will make a call on behalf of.
         * - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
         * - `call`: The call to be made by the `real` account.
         */
        "proxy_announced": {
            "delegate": MultiAddress;
            "real": MultiAddress;
            "force_proxy_type"?: Anonymize<I9usgdlqbp0c7e>;
            "call": TxCallData;
        };
        /**
         * Poke / Adjust deposits made for proxies and announcements based on current values.
         * This can be used by accounts to possibly lower their locked amount.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * The transaction fee is waived if the deposit amount has changed.
         *
         * Emits `DepositPoked` if successful.
         */
        "poke_deposit": undefined;
    }>;
    "Indices": Anonymize<I67ac6i6ihmvpt>;
    "Assets": Anonymize<I84851acvod2ic>;
    "Uniques": Anonymize<Icu49uv7rfej74>;
    "Nfts": Anonymize<I1k4il7i5elhc7>;
    "ForeignAssets": Anonymize<I1botoq1mmhfag>;
    "NftFractionalization": Anonymize<Ifrervtb291iin>;
    "PoolAssets": Anonymize<I84851acvod2ic>;
    "AssetConversion": Anonymize<Ia06pia7pbkurh>;
    "Revive": Enum<{
        /**
         * A raw EVM transaction, typically dispatched by an Ethereum JSON-RPC server.
         *
         * # Parameters
         *
         * * `payload`: The encoded [`crate::evm::TransactionSigned`].
         * * `gas_limit`: The gas limit enforced during contract execution.
         * * `storage_deposit_limit`: The maximum balance that can be charged to the caller for
         * storage usage.
         *
         * # Note
         *
         * This call cannot be dispatched directly; attempting to do so will result in a failed
         * transaction. It serves as a wrapper for an Ethereum transaction. When submitted, the
         * runtime converts it into a [`sp_runtime::generic::CheckedExtrinsic`] by recovering the
         * signer and validating the transaction.
         */
        "eth_transact": Anonymize<Ida37oe44osb06>;
        /**
         * Makes a call to an account, optionally transferring some balance.
         *
         * # Parameters
         *
         * * `dest`: Address of the contract to call.
         * * `value`: The balance to transfer from the `origin` to `dest`.
         * * `gas_limit`: The gas limit enforced when executing the constructor.
         * * `storage_deposit_limit`: The maximum amount of balance that can be charged from the
         * caller to pay for the storage consumed.
         * * `data`: The input data to pass to the contract.
         *
         * * If the account is a smart-contract account, the associated code will be
         * executed and any value will be transferred.
         * * If the account is a regular account, any value will be transferred.
         * * If no account exists and the call value is not less than `existential_deposit`,
         * a regular account will be created and any value will be transferred.
         */
        "call": Anonymize<Idsg8aod8e8fqn>;
        /**
         * Instantiates a contract from a previously deployed vm binary.
         *
         * This function is identical to [`Self::instantiate_with_code`] but without the
         * code deployment step. Instead, the `code_hash` of an on-chain deployed vm binary
         * must be supplied.
         */
        "instantiate": Anonymize<I46nktn22m6hbi>;
        /**
         * Instantiates a new contract from the supplied `code` optionally transferring
         * some balance.
         *
         * This dispatchable has the same effect as calling [`Self::upload_code`] +
         * [`Self::instantiate`]. Bundling them together provides efficiency gains. Please
         * also check the documentation of [`Self::upload_code`].
         *
         * # Parameters
         *
         * * `value`: The balance to transfer from the `origin` to the newly created contract.
         * * `gas_limit`: The gas limit enforced when executing the constructor.
         * * `storage_deposit_limit`: The maximum amount of balance that can be charged/reserved
         * from the caller to pay for the storage consumed.
         * * `code`: The contract code to deploy in raw bytes.
         * * `data`: The input data to pass to the contract constructor.
         * * `salt`: Used for the address derivation. If `Some` is supplied then `CREATE2`
         * semantics are used. If `None` then `CRATE1` is used.
         *
         *
         * Instantiation is executed as follows:
         *
         * - The supplied `code` is deployed, and a `code_hash` is created for that code.
         * - If the `code_hash` already exists on the chain the underlying `code` will be shared.
         * - The destination address is computed based on the sender, code_hash and the salt.
         * - The smart-contract account is created at the computed address.
         * - The `value` is transferred to the new account.
         * - The `deploy` function is executed in the context of the newly-created account.
         */
        "instantiate_with_code": Anonymize<Ibgj1cthra7lte>;
        /**
         * Same as [`Self::instantiate_with_code`], but intended to be dispatched **only**
         * by an EVM transaction through the EVM compatibility layer.
         *
         * Calling this dispatchable ensures that the origin's nonce is bumped only once,
         * via the `CheckNonce` transaction extension. In contrast, [`Self::instantiate_with_code`]
         * also bumps the nonce after contract instantiation, since it may be invoked multiple
         * times within a batch call transaction.
         */
        "eth_instantiate_with_code": Anonymize<Iboosov053lfpm>;
        /**
         * Upload new `code` without instantiating a contract from it.
         *
         * If the code does not already exist a deposit is reserved from the caller
         * and unreserved only when [`Self::remove_code`] is called. The size of the reserve
         * depends on the size of the supplied `code`.
         *
         * # Note
         *
         * Anyone can instantiate a contract from any uploaded code and thus prevent its removal.
         * To avoid this situation a constructor could employ access control so that it can
         * only be instantiated by permissioned entities. The same is true when uploading
         * through [`Self::instantiate_with_code`].
         */
        "upload_code": Anonymize<I10ra4g1rl6k2f>;
        /**
         * Remove the code stored under `code_hash` and refund the deposit to its owner.
         *
         * A code can only be removed by its original uploader (its owner) and only if it is
         * not used by any contract.
         */
        "remove_code": Anonymize<Ib51vk42m1po4n>;
        /**
         * Privileged function that changes the code of an existing contract.
         *
         * This takes care of updating refcounts and all other necessary operations. Returns
         * an error if either the `code_hash` or `dest` do not exist.
         *
         * # Note
         *
         * This does **not** change the address of the contract in question. This means
         * that the contract address is no longer derived from its code hash after calling
         * this dispatchable.
         */
        "set_code": Anonymize<I1uihehkdsggvp>;
        /**
         * Register the callers account id so that it can be used in contract interactions.
         *
         * This will error if the origin is already mapped or is a eth native `Address20`. It will
         * take a deposit that can be released by calling [`Self::unmap_account`].
         */
        "map_account": undefined;
        /**
         * Unregister the callers account id in order to free the deposit.
         *
         * There is no reason to ever call this function other than freeing up the deposit.
         * This is only useful when the account should no longer be used.
         */
        "unmap_account": undefined;
        /**
         * Dispatch an `call` with the origin set to the callers fallback address.
         *
         * Every `AccountId32` can control its corresponding fallback account. The fallback account
         * is the `AccountId20` with the last 12 bytes set to `0xEE`. This is essentially a
         * recovery function in case an `AccountId20` was used without creating a mapping first.
         */
        "dispatch_as_fallback_account": Anonymize<I8l76461to7o6g>;
    }>;
    "AssetRewards": Anonymize<I6i7hgo4s9982m>;
    "StateTrieMigration": Anonymize<I39l72gdmkk30t>;
    "Staking": Enum<{
        /**
         * Take the origin account as a stash and lock up `value` of its balance. `controller` will
         * be the account that controls it.
         *
         * `value` must be more than the `minimum_balance` specified by `T::Currency`.
         *
         * The dispatch origin for this call must be _Signed_ by the stash account.
         *
         * Emits `Bonded`.
         *
         * NOTE: Two of the storage writes (`Self::bonded`, `Self::payee`) are _never_ cleaned
         * unless the `origin` falls below _existential deposit_ (or equal to 0) and gets removed
         * as dust.
         */
        "bond": Anonymize<I2eip8tc75dpje>;
        /**
         * Add some extra amount that have appeared in the stash `free_balance` into the balance up
         * for staking.
         *
         * The dispatch origin for this call must be _Signed_ by the stash, not the controller.
         *
         * Use this if there are additional funds in your stash account that you wish to bond.
         * Unlike [`bond`](Self::bond) or [`unbond`](Self::unbond) this function does not impose
         * any limitation on the amount that can be added.
         *
         * Emits `Bonded`.
         */
        "bond_extra": Anonymize<I564va64vtidbq>;
        /**
         * Schedule a portion of the stash to be unlocked ready for transfer out after the bond
         * period ends. If this leaves an amount actively bonded less than
         * [`asset::existential_deposit`], then it is increased to the full amount.
         *
         * The dispatch origin for this call must be _Signed_ by the controller, not the stash.
         *
         * Once the unlock period is done, you can call `withdraw_unbonded` to actually move
         * the funds out of management ready for transfer.
         *
         * No more than a limited number of unlocking chunks (see `MaxUnlockingChunks`)
         * can co-exists at the same time. If there are no unlocking chunks slots available
         * [`Call::withdraw_unbonded`] is called to remove some of the chunks (if possible).
         *
         * If a user encounters the `InsufficientBond` error when calling this extrinsic,
         * they should call `chill` first in order to free up their bonded funds.
         *
         * Emits `Unbonded`.
         *
         * See also [`Call::withdraw_unbonded`].
         */
        "unbond": Anonymize<Ie5v6njpckr05b>;
        /**
         * Remove any unlocked chunks from the `unlocking` queue from our management.
         *
         * This essentially frees up that balance to be used by the stash account to do whatever
         * it wants.
         *
         * The dispatch origin for this call must be _Signed_ by the controller.
         *
         * Emits `Withdrawn`.
         *
         * See also [`Call::unbond`].
         *
         * ## Parameters
         *
         * - `num_slashing_spans`: **Deprecated**. This parameter is retained for backward
         * compatibility. It no longer has any effect.
         */
        "withdraw_unbonded": Anonymize<I328av3j0bgmjb>;
        /**
         * Declare the desire to validate for the origin controller.
         *
         * Effects will be felt at the beginning of the next era.
         *
         * The dispatch origin for this call must be _Signed_ by the controller, not the stash.
         */
        "validate": Anonymize<I4tuqm9ato907i>;
        /**
         * Declare the desire to nominate `targets` for the origin controller.
         *
         * Effects will be felt at the beginning of the next era.
         *
         * The dispatch origin for this call must be _Signed_ by the controller, not the stash.
         */
        "nominate": Anonymize<Iagi89qt4h1lqg>;
        /**
         * Declare no desire to either validate or nominate.
         *
         * Effects will be felt at the beginning of the next era.
         *
         * The dispatch origin for this call must be _Signed_ by the controller, not the stash.
         *
         * ## Complexity
         * - Independent of the arguments. Insignificant complexity.
         * - Contains one read.
         * - Writes are limited to the `origin` account key.
         */
        "chill": undefined;
        /**
         * (Re-)set the payment target for a controller.
         *
         * Effects will be felt instantly (as soon as this function is completed successfully).
         *
         * The dispatch origin for this call must be _Signed_ by the controller, not the stash.
         */
        "set_payee": Anonymize<I9dgmcnuamt5p8>;
        /**
         * (Re-)sets the controller of a stash to the stash itself. This function previously
         * accepted a `controller` argument to set the controller to an account other than the
         * stash itself. This functionality has now been removed, now only setting the controller
         * to the stash, if it is not already.
         *
         * Effects will be felt instantly (as soon as this function is completed successfully).
         *
         * The dispatch origin for this call must be _Signed_ by the stash, not the controller.
         */
        "set_controller": undefined;
        /**
         * Sets the ideal number of validators.
         *
         * The dispatch origin must be Root.
         */
        "set_validator_count": Anonymize<I3vh014cqgmrfd>;
        /**
         * Increments the ideal number of validators up to maximum of
         * `T::MaxValidatorSet`.
         *
         * The dispatch origin must be Root.
         */
        "increase_validator_count": Anonymize<Ifhs60omlhvt3>;
        /**
         * Scale up the ideal number of validators by a factor up to maximum of
         * `T::MaxValidatorSet`.
         *
         * The dispatch origin must be Root.
         */
        "scale_validator_count": Anonymize<If34udpd5e57vi>;
        /**
         * Force there to be no new eras indefinitely.
         *
         * The dispatch origin must be Root.
         *
         * # Warning
         *
         * The election process starts multiple blocks before the end of the era.
         * Thus the election process may be ongoing when this is called. In this case the
         * election will continue until the next era is triggered.
         */
        "force_no_eras": undefined;
        /**
         * Force there to be a new era at the end of the next session. After this, it will be
         * reset to normal (non-forced) behaviour.
         *
         * The dispatch origin must be Root.
         *
         * # Warning
         *
         * The election process starts multiple blocks before the end of the era.
         * If this is called just before a new era is triggered, the election process may not
         * have enough blocks to get a result.
         */
        "force_new_era": undefined;
        /**
         * Set the validators who cannot be slashed (if any).
         *
         * The dispatch origin must be Root.
         */
        "set_invulnerables": Anonymize<I39t01nnod9109>;
        /**
         * Force a current staker to become completely unstaked, immediately.
         *
         * The dispatch origin must be Root.
         * ## Parameters
         *
         * - `stash`: The stash account to be unstaked.
         * - `num_slashing_spans`: **Deprecated**. This parameter is retained for backward
         * compatibility. It no longer has any effect.
         */
        "force_unstake": Anonymize<Ie5vbnd9198quk>;
        /**
         * Force there to be a new era at the end of sessions indefinitely.
         *
         * The dispatch origin must be Root.
         *
         * # Warning
         *
         * The election process starts multiple blocks before the end of the era.
         * If this is called just before a new era is triggered, the election process may not
         * have enough blocks to get a result.
         */
        "force_new_era_always": undefined;
        /**
         * Cancels scheduled slashes for a given era before they are applied.
         *
         * This function allows `T::AdminOrigin` to selectively remove pending slashes from
         * the `UnappliedSlashes` storage, preventing their enactment.
         *
         * ## Parameters
         * - `era`: The staking era for which slashes were deferred.
         * - `slash_keys`: A list of slash keys identifying the slashes to remove. This is a tuple
         * of `(stash, slash_fraction, page_index)`.
         */
        "cancel_deferred_slash": {
            "era": number;
            "slash_keys": Array<Anonymize<Id32h28hjj1tch>>;
        };
        /**
         * Pay out next page of the stakers behind a validator for the given era.
         *
         * - `validator_stash` is the stash account of the validator.
         * - `era` may be any era between `[current_era - history_depth; current_era]`.
         *
         * The origin of this call must be _Signed_. Any account can call this function, even if
         * it is not one of the stakers.
         *
         * The reward payout could be paged in case there are too many nominators backing the
         * `validator_stash`. This call will payout unpaid pages in an ascending order. To claim a
         * specific page, use `payout_stakers_by_page`.`
         *
         * If all pages are claimed, it returns an error `InvalidPage`.
         */
        "payout_stakers": Anonymize<I6k6jf8ncesuu3>;
        /**
         * Rebond a portion of the stash scheduled to be unlocked.
         *
         * The dispatch origin must be signed by the controller.
         */
        "rebond": Anonymize<Ie5v6njpckr05b>;
        /**
         * Remove all data structures concerning a staker/stash once it is at a state where it can
         * be considered `dust` in the staking system. The requirements are:
         *
         * 1. the `total_balance` of the stash is below minimum bond.
         * 2. or, the `ledger.total` of the stash is below minimum bond.
         * 3. or, existential deposit is zero and either `total_balance` or `ledger.total` is zero.
         *
         * The former can happen in cases like a slash; the latter when a fully unbonded account
         * is still receiving staking rewards in `RewardDestination::Staked`.
         *
         * It can be called by anyone, as long as `stash` meets the above requirements.
         *
         * Refunds the transaction fees upon successful execution.
         *
         * ## Parameters
         *
         * - `stash`: The stash account to be reaped.
         * - `num_slashing_spans`: **Deprecated**. This parameter is retained for backward
         * compatibility. It no longer has any effect.
         */
        "reap_stash": Anonymize<Ie5vbnd9198quk>;
        /**
         * Remove the given nominations from the calling validator.
         *
         * Effects will be felt at the beginning of the next era.
         *
         * The dispatch origin for this call must be _Signed_ by the controller, not the stash.
         *
         * - `who`: A list of nominator stash accounts who are nominating this validator which
         * should no longer be nominating this validator.
         *
         * Note: Making this call only makes sense if you first set the validator preferences to
         * block any further nominations.
         */
        "kick": Anonymize<I3qhk481i120pk>;
        /**
         * Update the various staking configurations .
         *
         * * `min_nominator_bond`: The minimum active bond needed to be a nominator.
         * * `min_validator_bond`: The minimum active bond needed to be a validator.
         * * `max_nominator_count`: The max number of users who can be a nominator at once. When
         * set to `None`, no limit is enforced.
         * * `max_validator_count`: The max number of users who can be a validator at once. When
         * set to `None`, no limit is enforced.
         * * `chill_threshold`: The ratio of `max_nominator_count` or `max_validator_count` which
         * should be filled in order for the `chill_other` transaction to work.
         * * `min_commission`: The minimum amount of commission that each validators must maintain.
         * This is checked only upon calling `validate`. Existing validators are not affected.
         *
         * RuntimeOrigin must be Root to call this function.
         *
         * NOTE: Existing nominators and validators will not be affected by this update.
         * to kick people under the new limits, `chill_other` should be called.
         */
        "set_staking_configs": Anonymize<If1qr0kbbl298c>;
        /**
         * Declare a `controller` to stop participating as either a validator or nominator.
         *
         * Effects will be felt at the beginning of the next era.
         *
         * The dispatch origin for this call must be _Signed_, but can be called by anyone.
         *
         * If the caller is the same as the controller being targeted, then no further checks are
         * enforced, and this function behaves just like `chill`.
         *
         * If the caller is different than the controller being targeted, the following conditions
         * must be met:
         *
         * * `controller` must belong to a nominator who has become non-decodable,
         *
         * Or:
         *
         * * A `ChillThreshold` must be set and checked which defines how close to the max
         * nominators or validators we must reach before users can start chilling one-another.
         * * A `MaxNominatorCount` and `MaxValidatorCount` must be set which is used to determine
         * how close we are to the threshold.
         * * A `MinNominatorBond` and `MinValidatorBond` must be set and checked, which determines
         * if this is a person that should be chilled because they have not met the threshold
         * bond required.
         *
         * This can be helpful if bond requirements are updated, and we need to remove old users
         * who do not satisfy these requirements.
         */
        "chill_other": Anonymize<Idl3umm12u5pa>;
        /**
         * Force a validator to have at least the minimum commission. This will not affect a
         * validator who already has a commission greater than or equal to the minimum. Any account
         * can call this.
         */
        "force_apply_min_commission": Anonymize<I5ont0141q9ss5>;
        /**
         * Sets the minimum amount of commission that each validators must maintain.
         *
         * This call has lower privilege requirements than `set_staking_config` and can be called
         * by the `T::AdminOrigin`. Root can always call this.
         */
        "set_min_commission": Anonymize<I3vh014cqgmrfd>;
        /**
         * Pay out a page of the stakers behind a validator for the given era and page.
         *
         * - `validator_stash` is the stash account of the validator.
         * - `era` may be any era between `[current_era - history_depth; current_era]`.
         * - `page` is the page index of nominators to pay out with value between 0 and
         * `num_nominators / T::MaxExposurePageSize`.
         *
         * The origin of this call must be _Signed_. Any account can call this function, even if
         * it is not one of the stakers.
         *
         * If a validator has more than [`Config::MaxExposurePageSize`] nominators backing
         * them, then the list of nominators is paged, with each page being capped at
         * [`Config::MaxExposurePageSize`.] If a validator has more than one page of nominators,
         * the call needs to be made for each page separately in order for all the nominators
         * backing a validator to receive the reward. The nominators are not sorted across pages
         * and so it should not be assumed the highest staker would be on the topmost page and vice
         * versa. If rewards are not claimed in [`Config::HistoryDepth`] eras, they are lost.
         */
        "payout_stakers_by_page": Anonymize<Ie6j49utvii126>;
        /**
         * Migrates an account's `RewardDestination::Controller` to
         * `RewardDestination::Account(controller)`.
         *
         * Effects will be felt instantly (as soon as this function is completed successfully).
         *
         * This will waive the transaction fee if the `payee` is successfully migrated.
         */
        "update_payee": Anonymize<I3v6ks33uluhnj>;
        /**
         * Updates a batch of controller accounts to their corresponding stash account if they are
         * not the same. Ignores any controller accounts that do not exist, and does not operate if
         * the stash and controller are already the same.
         *
         * Effects will be felt instantly (as soon as this function is completed successfully).
         *
         * The dispatch origin must be `T::AdminOrigin`.
         */
        "deprecate_controller_batch": Anonymize<I3kiiim1cds68i>;
        /**
         * Restores the state of a ledger which is in an inconsistent state.
         *
         * The requirements to restore a ledger are the following:
         * * The stash is bonded; or
         * * The stash is not bonded but it has a staking lock left behind; or
         * * If the stash has an associated ledger and its state is inconsistent; or
         * * If the ledger is not corrupted *but* its staking lock is out of sync.
         *
         * The `maybe_*` input parameters will overwrite the corresponding data and metadata of the
         * ledger associated with the stash. If the input parameters are not set, the ledger will
         * be reset values from on-chain state.
         */
        "restore_ledger": Anonymize<I4k60mkh2r6jjg>;
        /**
         * Migrates permissionlessly a stash from locks to holds.
         *
         * This removes the old lock on the stake and creates a hold on it atomically. If all
         * stake cannot be held, the best effort is made to hold as much as possible. The remaining
         * stake is removed from the ledger.
         *
         * The fee is waived if the migration is successful.
         */
        "migrate_currency": Anonymize<Idl3umm12u5pa>;
        /**
         * Manually applies a deferred slash for a given era.
         *
         * Normally, slashes are automatically applied shortly after the start of the `slash_era`.
         * This function exists as a **fallback mechanism** in case slashes were not applied due to
         * unexpected reasons. It allows anyone to manually apply an unapplied slash.
         *
         * ## Parameters
         * - `slash_era`: The staking era in which the slash was originally scheduled.
         * - `slash_key`: A unique identifier for the slash, represented as a tuple:
         * - `stash`: The stash account of the validator being slashed.
         * - `slash_fraction`: The fraction of the stake that was slashed.
         * - `page_index`: The index of the exposure page being processed.
         *
         * ## Behavior
         * - The function is **permissionless**—anyone can call it.
         * - The `slash_era` **must be the current era or a past era**. If it is in the future, the
         * call fails with `EraNotStarted`.
         * - The fee is waived if the slash is successfully applied.
         *
         * ## Future Improvement
         * - Implement an **off-chain worker (OCW) task** to automatically apply slashes when there
         * is unused block space, improving efficiency.
         */
        "apply_slash": {
            "slash_era": number;
            "slash_key": Anonymize<Id32h28hjj1tch>;
        };
    }>;
    "NominationPools": Anonymize<I57mljkkr28m9p>;
    "FastUnstake": Anonymize<I44snhj1gahvrd>;
    "VoterList": Anonymize<Ifvfo1l0vu2o7e>;
    "StakingRcClient": Enum<{
        /**
         * Called to indicate the start of a new session on the relay chain.
         */
        "relay_session_report": {
            "report": {
                "end_index": number;
                "validator_points": Array<Anonymize<I6ouflveob4eli>>;
                "activation_timestamp"?: ([bigint, number]) | undefined;
                "leftover": boolean;
            };
        };
        /**
         * Called to report one or more new offenses on the relay chain.
         */
        "relay_new_offence": {
            "slash_session": number;
            "offences": Array<{
                "offender": SS58String;
                "reporters": Anonymize<Ia2lhg7l2hilo3>;
                "slash_fraction": number;
            }>;
        };
    }>;
    "MultiBlockElection": Enum<{
        /**
         * Manage this pallet.
         *
         * The origin of this call must be [`Config::AdminOrigin`].
         *
         * See [`AdminOperation`] for various operations that are possible.
         */
        "manage": {
            "op": Enum<{
                "ForceRotateRound": undefined;
                "ForceSetPhase": Enum<{
                    "Off": undefined;
                    "Signed": number;
                    "SignedValidation": number;
                    "Unsigned": number;
                    "Snapshot": number;
                    "Done": undefined;
                    "Export": number;
                    "Emergency": undefined;
                }>;
                "EmergencySetSolution": [Anonymize<I4bboqsv44evel>, Anonymize<I8s6n43okuj2b1>];
                "EmergencyFallback": undefined;
                "SetMinUntrustedScore": Anonymize<I8s6n43okuj2b1>;
            }>;
        };
    }>;
    "MultiBlockElectionVerifier": undefined;
    "MultiBlockElectionUnsigned": Enum<{
        /**
         * Submit an unsigned solution.
         *
         * This works very much like an inherent, as only the validators are permitted to submit
         * anything. By default validators will compute this call in their `offchain_worker` hook
         * and try and submit it back.
         *
         * This is different from signed page submission mainly in that the solution page is
         * verified on the fly.
         *
         * The `paged_solution` may contain at most [`Config::MinerPages`] pages. They are
         * interpreted as msp -> lsp, as per [`crate::Pallet::msp_range_for`].
         *
         * For example, if `Pages = 4`, and `MinerPages = 2`, our full snapshot range would be [0,
         * 1, 2, 3], with 3 being msp. But, in this case, then the `paged_raw_solution.pages` is
         * expected to correspond to `[snapshot(2), snapshot(3)]`.
         */
        "submit_unsigned": {
            "paged_solution": {
                "solution_pages": Array<Anonymize<I1nvcsqg39g26j>>;
                "score": Anonymize<I8s6n43okuj2b1>;
                "round": number;
            };
        };
    }>;
    "MultiBlockElectionSigned": Enum<{
        /**
         * Register oneself for an upcoming signed election.
         */
        "register": {
            "claimed_score": Anonymize<I8s6n43okuj2b1>;
        };
        /**
         * Submit a single page of a solution.
         *
         * Must always come after [`Pallet::register`].
         *
         * `maybe_solution` can be set to `None` to erase the page.
         *
         * Collects deposits from the signed origin based on [`Config::DepositBase`] and
         * [`Config::DepositPerPage`].
         */
        "submit_page": {
            "page": number;
            "maybe_solution"?: (Anonymize<I1nvcsqg39g26j>) | undefined;
        };
        /**
         * Retract a submission.
         *
         * A portion of the deposit may be returned, based on the [`Config::BailoutGraceRatio`].
         *
         * This will fully remove the solution from storage.
         */
        "bail": undefined;
        /**
         * Clear the data of a submitter form an old round.
         *
         * The dispatch origin of this call must be signed, and the original submitter.
         *
         * This can only be called for submissions that end up being discarded, as in they are not
         * processed and they end up lingering in the queue.
         */
        "clear_old_round_data": {
            "round": number;
            "witness_pages": number;
        };
        /**
         * Set the invulnerable list.
         *
         * Dispatch origin must the the same as [`crate::Config::AdminOrigin`].
         */
        "set_invulnerables": {
            "inv": Anonymize<Ia2lhg7l2hilo3>;
        };
    }>;
    "ConvictionVoting": Anonymize<Ie5kd08tutk56t>;
    "Referenda": Enum<{
        /**
         * Propose a referendum on a privileged action.
         *
         * - `origin`: must be `SubmitOrigin` and the account must have `SubmissionDeposit` funds
         * available.
         * - `proposal_origin`: The origin from which the proposal should be executed.
         * - `proposal`: The proposal.
         * - `enactment_moment`: The moment that the proposal should be enacted.
         *
         * Emits `Submitted`.
         */
        "submit": {
            "proposal_origin": Anonymize<I3fd3prasbku5o>;
            "proposal": PreimagesBounded;
            "enactment_moment": TraitsScheduleDispatchTime;
        };
        /**
         * Post the Decision Deposit for a referendum.
         *
         * - `origin`: must be `Signed` and the account must have funds available for the
         * referendum's track's Decision Deposit.
         * - `index`: The index of the submitted referendum whose Decision Deposit is yet to be
         * posted.
         *
         * Emits `DecisionDepositPlaced`.
         */
        "place_decision_deposit": Anonymize<I666bl2fqjkejo>;
        /**
         * Refund the Decision Deposit for a closed referendum back to the depositor.
         *
         * - `origin`: must be `Signed` or `Root`.
         * - `index`: The index of a closed referendum whose Decision Deposit has not yet been
         * refunded.
         *
         * Emits `DecisionDepositRefunded`.
         */
        "refund_decision_deposit": Anonymize<I666bl2fqjkejo>;
        /**
         * Cancel an ongoing referendum.
         *
         * - `origin`: must be the `CancelOrigin`.
         * - `index`: The index of the referendum to be cancelled.
         *
         * Emits `Cancelled`.
         */
        "cancel": Anonymize<I666bl2fqjkejo>;
        /**
         * Cancel an ongoing referendum and slash the deposits.
         *
         * - `origin`: must be the `KillOrigin`.
         * - `index`: The index of the referendum to be cancelled.
         *
         * Emits `Killed` and `DepositSlashed`.
         */
        "kill": Anonymize<I666bl2fqjkejo>;
        /**
         * Advance a referendum onto its next logical state. Only used internally.
         *
         * - `origin`: must be `Root`.
         * - `index`: the referendum to be advanced.
         */
        "nudge_referendum": Anonymize<I666bl2fqjkejo>;
        /**
         * Advance a track onto its next logical state. Only used internally.
         *
         * - `origin`: must be `Root`.
         * - `track`: the track to be advanced.
         *
         * Action item for when there is now one fewer referendum in the deciding phase and the
         * `DecidingCount` is not yet updated. This means that we should either:
         * - begin deciding another referendum (and leave `DecidingCount` alone); or
         * - decrement `DecidingCount`.
         */
        "one_fewer_deciding": Anonymize<Icbio0e1f0034b>;
        /**
         * Refund the Submission Deposit for a closed referendum back to the depositor.
         *
         * - `origin`: must be `Signed` or `Root`.
         * - `index`: The index of a closed referendum whose Submission Deposit has not yet been
         * refunded.
         *
         * Emits `SubmissionDepositRefunded`.
         */
        "refund_submission_deposit": Anonymize<I666bl2fqjkejo>;
        /**
         * Set or clear metadata of a referendum.
         *
         * Parameters:
         * - `origin`: Must be `Signed` by a creator of a referendum or by anyone to clear a
         * metadata of a finished referendum.
         * - `index`:  The index of a referendum to set or clear metadata for.
         * - `maybe_hash`: The hash of an on-chain stored preimage. `None` to clear a metadata.
         */
        "set_metadata": Anonymize<I8c0vkqjjipnuj>;
    }>;
    "Whitelist": Enum<{
        "whitelist_call": Anonymize<I1adbcfi5uc62r>;
        "remove_whitelisted_call": Anonymize<I1adbcfi5uc62r>;
        "dispatch_whitelisted_call": Anonymize<Ibf6ucefn8fh49>;
        "dispatch_whitelisted_call_with_preimage": Anonymize<I8l76461to7o6g>;
    }>;
    "Treasury": Enum<{
        /**
         * Propose and approve a spend of treasury funds.
         *
         * ## Dispatch Origin
         *
         * Must be [`Config::SpendOrigin`] with the `Success` value being at least `amount`.
         *
         * ### Details
         * NOTE: For record-keeping purposes, the proposer is deemed to be equivalent to the
         * beneficiary.
         *
         * ### Parameters
         * - `amount`: The amount to be transferred from the treasury to the `beneficiary`.
         * - `beneficiary`: The destination account for the transfer.
         *
         * ## Events
         *
         * Emits [`Event::SpendApproved`] if successful.
         */
        "spend_local": Anonymize<Icnrv1mfbd3in1>;
        /**
         * Force a previously approved proposal to be removed from the approval queue.
         *
         * ## Dispatch Origin
         *
         * Must be [`Config::RejectOrigin`].
         *
         * ## Details
         *
         * The original deposit will no longer be returned.
         *
         * ### Parameters
         * - `proposal_id`: The index of a proposal
         *
         * ### Complexity
         * - O(A) where `A` is the number of approvals
         *
         * ### Errors
         * - [`Error::ProposalNotApproved`]: The `proposal_id` supplied was not found in the
         * approval queue, i.e., the proposal has not been approved. This could also mean the
         * proposal does not exist altogether, thus there is no way it would have been approved
         * in the first place.
         */
        "remove_approval": Anonymize<Icm9m0qeemu66d>;
        /**
         * Propose and approve a spend of treasury funds.
         *
         * ## Dispatch Origin
         *
         * Must be [`Config::SpendOrigin`] with the `Success` value being at least
         * `amount` of `asset_kind` in the native asset. The amount of `asset_kind` is converted
         * for assertion using the [`Config::BalanceConverter`].
         *
         * ## Details
         *
         * Create an approved spend for transferring a specific `amount` of `asset_kind` to a
         * designated beneficiary. The spend must be claimed using the `payout` dispatchable within
         * the [`Config::PayoutPeriod`].
         *
         * ### Parameters
         * - `asset_kind`: An indicator of the specific asset class to be spent.
         * - `amount`: The amount to be transferred from the treasury to the `beneficiary`.
         * - `beneficiary`: The beneficiary of the spend.
         * - `valid_from`: The block number from which the spend can be claimed. It can refer to
         * the past if the resulting spend has not yet expired according to the
         * [`Config::PayoutPeriod`]. If `None`, the spend can be claimed immediately after
         * approval.
         *
         * ## Events
         *
         * Emits [`Event::AssetSpendApproved`] if successful.
         */
        "spend": {
            "asset_kind": Anonymize<I2q3ri6itcjj5u>;
            "amount": bigint;
            "beneficiary": Enum<{
                "V4": {
                    "location": Anonymize<I4c0s5cioidn76>;
                    "account_id": Anonymize<I4c0s5cioidn76>;
                };
                "V5": {
                    "location": Anonymize<If9iqq7i64mur8>;
                    "account_id": Anonymize<If9iqq7i64mur8>;
                };
            }>;
            "valid_from"?: Anonymize<I4arjljr6dpflb>;
        };
        /**
         * Claim a spend.
         *
         * ## Dispatch Origin
         *
         * Must be signed
         *
         * ## Details
         *
         * Spends must be claimed within some temporal bounds. A spend may be claimed within one
         * [`Config::PayoutPeriod`] from the `valid_from` block.
         * In case of a payout failure, the spend status must be updated with the `check_status`
         * dispatchable before retrying with the current function.
         *
         * ### Parameters
         * - `index`: The spend index.
         *
         * ## Events
         *
         * Emits [`Event::Paid`] if successful.
         */
        "payout": Anonymize<I666bl2fqjkejo>;
        /**
         * Check the status of the spend and remove it from the storage if processed.
         *
         * ## Dispatch Origin
         *
         * Must be signed.
         *
         * ## Details
         *
         * The status check is a prerequisite for retrying a failed payout.
         * If a spend has either succeeded or expired, it is removed from the storage by this
         * function. In such instances, transaction fees are refunded.
         *
         * ### Parameters
         * - `index`: The spend index.
         *
         * ## Events
         *
         * Emits [`Event::PaymentFailed`] if the spend payout has failed.
         * Emits [`Event::SpendProcessed`] if the spend payout has succeed.
         */
        "check_status": Anonymize<I666bl2fqjkejo>;
        /**
         * Void previously approved spend.
         *
         * ## Dispatch Origin
         *
         * Must be [`Config::RejectOrigin`].
         *
         * ## Details
         *
         * A spend void is only possible if the payout has not been attempted yet.
         *
         * ### Parameters
         * - `index`: The spend index.
         *
         * ## Events
         *
         * Emits [`Event::AssetSpendVoided`] if successful.
         */
        "void_spend": Anonymize<I666bl2fqjkejo>;
    }>;
    "AssetRate": Anonymize<If582h5gr5gh6f>;
    "AssetConversionMigration": Anonymize<Ib85ihi0vt50bd>;
    "AhOps": Enum<{
        /**
         * Unreserve the deposit that was taken for creating a crowdloan.
         *
         * This can be called by any signed origin. It unreserves the lease deposit on the account
         * that won the lease auction. It can be unreserved once all leases expired. Note that it
         * will be called automatically from `withdraw_crowdloan_contribution` for the matching
         * crowdloan account.
         *
         * Solo bidder accounts that won lease auctions can use this to unreserve their amount.
         */
        "unreserve_lease_deposit": {
            "block": number;
            "depositor"?: Anonymize<Ihfphjolmsqq1>;
            "para_id": number;
        };
        /**
         * Withdraw the contribution of a finished crowdloan.
         *
         * A crowdloan contribution can be withdrawn if either:
         * - The crowdloan failed to in an auction and timed out
         * - Won an auction and all leases expired
         *
         * Can be called by any signed origin.
         */
        "withdraw_crowdloan_contribution": {
            "block": number;
            "depositor"?: Anonymize<Ihfphjolmsqq1>;
            "para_id": number;
        };
        /**
         * Unreserve the deposit that was taken for creating a crowdloan.
         *
         * This can be called once either:
         * - The crowdloan failed to win an auction and timed out
         * - Won an auction, all leases expired and all contributions are withdrawn
         *
         * Can be called by any signed origin. The condition that all contributions are withdrawn
         * is in place since the reserve acts as a storage deposit.
         */
        "unreserve_crowdloan_reserve": {
            "block": number;
            "depositor"?: Anonymize<Ihfphjolmsqq1>;
            "para_id": number;
        };
        /**
         * Try to migrate a parachain sovereign child account to its respective sibling.
         *
         * Takes the old and new account and migrates it only if they are as expected. An event of
         * `SovereignMigrated` will be emitted if the account was migrated successfully.
         *
         * Callable by any signed origin.
         */
        "migrate_parachain_sovereign_acc": {
            "from": SS58String;
            "to": SS58String;
        };
        /**
         * Try to migrate a parachain sovereign child account to its respective sibling.
         *
         * Takes the old and new account and migrates it only if they are as expected. An event of
         * `SovereignMigrated` will be emitted if the account was migrated successfully.
         *
         * Callable by any signed origin.
         */
        "migrate_parachain_sovereign_derived_acc": {
            "from": SS58String;
            "to": SS58String;
            "derivation": Anonymize<I6ouflveob4eli>;
        };
        /**
         * Force unreserve a named or unnamed reserve.
         */
        "force_unreserve": {
            "account": SS58String;
            "amount": bigint;
            "reason"?: (Enum<{
                "Preimage": PreimagePalletHoldReason;
                "Session": Enum<{
                    "Keys": undefined;
                }>;
                "PolkadotXcm": Enum<{
                    "AuthorizeAlias": undefined;
                }>;
                "NftFractionalization": Enum<{
                    "Fractionalized": undefined;
                }>;
                "Revive": Enum<{
                    "CodeUploadDepositReserve": undefined;
                    "StorageDepositReserve": undefined;
                    "AddressMapping": undefined;
                }>;
                "AssetRewards": Enum<{
                    "PoolCreation": undefined;
                }>;
                "StateTrieMigration": Enum<{
                    "SlashForMigrate": undefined;
                }>;
                "Staking": Enum<{
                    "Staking": undefined;
                }>;
                "DelegatedStaking": Enum<{
                    "StakingDelegation": undefined;
                }>;
                "MultiBlockElectionSigned": Enum<{
                    "SignedSubmission": undefined;
                }>;
            }>) | undefined;
        };
    }>;
}>;
export type I3u72uvpuo4qrt = AnonymousEnum<{
    /**
     * Set the current validation data.
     *
     * This should be invoked exactly once per block. It will panic at the finalization
     * phase if the call was not invoked.
     *
     * The dispatch origin for this call must be `Inherent`
     *
     * As a side effect, this function upgrades the current validation function
     * if the appropriate time has come.
     */
    "set_validation_data": {
        "data": {
            "validation_data": Anonymize<Ifn6q3equiq9qi>;
            "relay_chain_state": Anonymize<Itom7fk49o0c9>;
            "relay_parent_descendants": Array<Anonymize<Ic952bubvq4k7d>>;
            "collator_peer_id"?: Anonymize<Iabpgqcjikia83>;
        };
        "inbound_messages_data": {
            "downward_messages": {
                "full_messages": Anonymize<I6ljjd4b5fa4ov>;
                "hashed_messages": Array<Anonymize<Icqnh9ino03itn>>;
            };
            "horizontal_messages": {
                "full_messages": Array<[number, Anonymize<I409qo0sfkbh16>]>;
                "hashed_messages": Array<[number, Anonymize<Icqnh9ino03itn>]>;
            };
        };
    };
    "sudo_send_upward_message": Anonymize<Ifpj261e8s63m3>;
}>;
export type Ifn6q3equiq9qi = {
    "parent_head": Binary;
    "relay_parent_number": number;
    "relay_parent_storage_root": FixedSizeBinary<32>;
    "max_pov_size": number;
};
export type I6ljjd4b5fa4ov = Array<{
    "sent_at": number;
    "msg": Binary;
}>;
export type Icqnh9ino03itn = {
    "sent_at": number;
    "msg_hash": FixedSizeBinary<32>;
};
export type I409qo0sfkbh16 = {
    "sent_at": number;
    "data": Binary;
};
export type Ifpj261e8s63m3 = {
    "message": Binary;
};
export type I8l76461to7o6g = {
    "call": TxCallData;
};
export type I9ujc5mvue37b = {
    "call": TxCallData;
    "weight": Anonymize<I4q39t5hn830vp>;
};
export type I9dpq5287dur8b = AnonymousEnum<{
    /**
     * Set the list of invulnerable (fixed) collators. These collators must do some
     * preparation, namely to have registered session keys.
     *
     * The call will remove any accounts that have not registered keys from the set. That is,
     * it is non-atomic; the caller accepts all `AccountId`s passed in `new` _individually_ as
     * acceptable Invulnerables, and is not proposing a _set_ of new Invulnerables.
     *
     * This call does not maintain mutual exclusivity of `Invulnerables` and `Candidates`. It
     * is recommended to use a batch of `add_invulnerable` and `remove_invulnerable` instead. A
     * `batch_all` can also be used to enforce atomicity. If any candidates are included in
     * `new`, they should be removed with `remove_invulnerable_candidate` after execution.
     *
     * Must be called by the `UpdateOrigin`.
     */
    "set_invulnerables": {
        "new": Anonymize<Ia2lhg7l2hilo3>;
    };
    /**
     * Set the ideal number of non-invulnerable collators. If lowering this number, then the
     * number of running collators could be higher than this figure. Aside from that edge case,
     * there should be no other way to have more candidates than the desired number.
     *
     * The origin for this call must be the `UpdateOrigin`.
     */
    "set_desired_candidates": {
        "max": number;
    };
    /**
     * Set the candidacy bond amount.
     *
     * If the candidacy bond is increased by this call, all current candidates which have a
     * deposit lower than the new bond will be kicked from the list and get their deposits
     * back.
     *
     * The origin for this call must be the `UpdateOrigin`.
     */
    "set_candidacy_bond": {
        "bond": bigint;
    };
    /**
     * Register this account as a collator candidate. The account must (a) already have
     * registered session keys and (b) be able to reserve the `CandidacyBond`.
     *
     * This call is not available to `Invulnerable` collators.
     */
    "register_as_candidate": undefined;
    /**
     * Deregister `origin` as a collator candidate. Note that the collator can only leave on
     * session change. The `CandidacyBond` will be unreserved immediately.
     *
     * This call will fail if the total number of candidates would drop below
     * `MinEligibleCollators`.
     */
    "leave_intent": undefined;
    /**
     * Add a new account `who` to the list of `Invulnerables` collators. `who` must have
     * registered session keys. If `who` is a candidate, they will be removed.
     *
     * The origin for this call must be the `UpdateOrigin`.
     */
    "add_invulnerable": Anonymize<I4cbvqmqadhrea>;
    /**
     * Remove an account `who` from the list of `Invulnerables` collators. `Invulnerables` must
     * be sorted.
     *
     * The origin for this call must be the `UpdateOrigin`.
     */
    "remove_invulnerable": Anonymize<I4cbvqmqadhrea>;
    /**
     * Update the candidacy bond of collator candidate `origin` to a new amount `new_deposit`.
     *
     * Setting a `new_deposit` that is lower than the current deposit while `origin` is
     * occupying a top-`DesiredCandidates` slot is not allowed.
     *
     * This call will fail if `origin` is not a collator candidate, the updated bond is lower
     * than the minimum candidacy bond, and/or the amount cannot be reserved.
     */
    "update_bond": {
        "new_deposit": bigint;
    };
    /**
     * The caller `origin` replaces a candidate `target` in the collator candidate list by
     * reserving `deposit`. The amount `deposit` reserved by the caller must be greater than
     * the existing bond of the target it is trying to replace.
     *
     * This call will fail if the caller is already a collator candidate or invulnerable, the
     * caller does not have registered session keys, the target is not a collator candidate,
     * and/or the `deposit` amount cannot be reserved.
     */
    "take_candidate_slot": {
        "deposit": bigint;
        "target": SS58String;
    };
}>;
export type I77dda7hps0u37 = AnonymousEnum<{
    /**
     * Sets the session key(s) of the function caller to `keys`.
     * Allows an account to set its session key prior to becoming a validator.
     * This doesn't take effect until the next session.
     *
     * The dispatch origin of this function must be signed.
     *
     * ## Complexity
     * - `O(1)`. Actual cost depends on the number of length of `T::Keys::key_ids()` which is
     * fixed.
     */
    "set_keys": {
        "keys": FixedSizeBinary<32>;
        "proof": Binary;
    };
    /**
     * Removes any session key(s) of the function caller.
     *
     * This doesn't take effect until the next session.
     *
     * The dispatch origin of this function must be Signed and the account must be either be
     * convertible to a validator ID using the chain's typical addressing system (this usually
     * means being a controller account) or directly convertible into a validator ID (which
     * usually means being a stash account).
     *
     * ## Complexity
     * - `O(1)` in number of key types. Actual cost depends on the number of length of
     * `T::Keys::key_ids()` which is fixed.
     */
    "purge_keys": undefined;
}>;
export type Ib7tahn20bvsep = AnonymousEnum<{
    /**
     * Suspends all XCM executions for the XCMP queue, regardless of the sender's origin.
     *
     * - `origin`: Must pass `ControllerOrigin`.
     */
    "suspend_xcm_execution": undefined;
    /**
     * Resumes all XCM executions for the XCMP queue.
     *
     * Note that this function doesn't change the status of the in/out bound channels.
     *
     * - `origin`: Must pass `ControllerOrigin`.
     */
    "resume_xcm_execution": undefined;
    /**
     * Overwrites the number of pages which must be in the queue for the other side to be
     * told to suspend their sending.
     *
     * - `origin`: Must pass `Root`.
     * - `new`: Desired value for `QueueConfigData.suspend_value`
     */
    "update_suspend_threshold": Anonymize<I3vh014cqgmrfd>;
    /**
     * Overwrites the number of pages which must be in the queue after which we drop any
     * further messages from the channel.
     *
     * - `origin`: Must pass `Root`.
     * - `new`: Desired value for `QueueConfigData.drop_threshold`
     */
    "update_drop_threshold": Anonymize<I3vh014cqgmrfd>;
    /**
     * Overwrites the number of pages which the queue must be reduced to before it signals
     * that message sending may recommence after it has been suspended.
     *
     * - `origin`: Must pass `Root`.
     * - `new`: Desired value for `QueueConfigData.resume_threshold`
     */
    "update_resume_threshold": Anonymize<I3vh014cqgmrfd>;
}>;
export type I6epb28bkd5aqn = AnonymousEnum<{
    /**
     * Notification about congested bridge queue.
     */
    "report_bridge_status": {
        "bridge_id": FixedSizeBinary<32>;
        "is_congested": boolean;
    };
}>;
export type Ic2uoe7jdksosp = AnonymousEnum<{
    /**
     * Remove a page which has no more messages remaining to be processed or is stale.
     */
    "reap_page": {
        "message_origin": Anonymize<Iejeo53sea6n4q>;
        "page_index": number;
    };
    /**
     * Execute an overweight message.
     *
     * Temporary processing errors will be propagated whereas permanent errors are treated
     * as success condition.
     *
     * - `origin`: Must be `Signed`.
     * - `message_origin`: The origin from which the message to be executed arrived.
     * - `page`: The page in the queue in which the message to be executed is sitting.
     * - `index`: The index into the queue of the message to be executed.
     * - `weight_limit`: The maximum amount of weight allowed to be consumed in the execution
     * of the message.
     *
     * Benchmark complexity considerations: O(index + weight_limit).
     */
    "execute_overweight": {
        "message_origin": Anonymize<Iejeo53sea6n4q>;
        "page": number;
        "index": number;
        "weight_limit": Anonymize<I4q39t5hn830vp>;
    };
}>;
export type Iejeo53sea6n4q = AnonymousEnum<{
    "Here": undefined;
    "Parent": undefined;
    "Sibling": number;
}>;
export type I15u4pbuusigel = AnonymousEnum<{
    /**
     * Set the operating mode for exporting messages to Ethereum.
     */
    "set_operating_mode": {
        "mode": Enum<{
            "Normal": undefined;
            "Halted": undefined;
        }>;
    };
    /**
     * Initiates the registration for a Polkadot-native token as a wrapped ERC20 token on
     * Ethereum.
     * - `asset_id`: Location of the asset
     * - `metadata`: Metadata to include in the instantiated ERC20 contract on Ethereum
     *
     * All origins are allowed, however `asset_id` must be a location nested within the origin
     * consensus system.
     */
    "register_token": {
        "asset_id": XcmVersionedLocation;
        "metadata": {
            "name": Binary;
            "symbol": Binary;
            "decimals": number;
        };
        "fee_asset": Anonymize<Iffh1nc5e1mod6>;
    };
    /**
     * Add an additional relayer tip for a committed message identified by `message_id`.
     * The tip asset will be swapped for ether.
     */
    "add_tip": {
        "message_id": Enum<{
            "Inbound": bigint;
            "Outbound": bigint;
        }>;
        "asset": Anonymize<Iffh1nc5e1mod6>;
    };
}>;
export type I3fd3prasbku5o = AnonymousEnum<{
    "system": Anonymize<I9gqitj4t615g3>;
    "PolkadotXcm": Anonymize<Icvilmd7qu30i4>;
    "CumulusXcm": Anonymize<I3in0d0lb61qi8>;
    "Origins": Enum<{
        "StakingAdmin": undefined;
        "Treasurer": undefined;
        "FellowshipAdmin": undefined;
        "GeneralAdmin": undefined;
        "AuctionAdmin": undefined;
        "LeaseAdmin": undefined;
        "ReferendumCanceller": undefined;
        "ReferendumKiller": undefined;
        "SmallTipper": undefined;
        "BigTipper": undefined;
        "SmallSpender": undefined;
        "MediumSpender": undefined;
        "BigSpender": undefined;
        "WhitelistedCaller": undefined;
    }>;
}>;
export type I3in0d0lb61qi8 = AnonymousEnum<{
    "Relay": undefined;
    "SiblingParachain": number;
}>;
export type I9usgdlqbp0c7e = (Anonymize<Iqcs55g6cq7gj>) | undefined;
export type Iqcs55g6cq7gj = AnonymousEnum<{
    "Any": undefined;
    "NonTransfer": undefined;
    "CancelProxy": undefined;
    "Assets": undefined;
    "AssetOwner": undefined;
    "AssetManager": undefined;
    "Collator": undefined;
    "Governance": undefined;
    "Staking": undefined;
    "NominationPools": undefined;
    "OldSudoBalances": undefined;
    "OldIdentityJudgement": undefined;
    "OldAuction": undefined;
    "OldParaRegistration": undefined;
}>;
export type I84851acvod2ic = AnonymousEnum<{
    /**
     * Issue a new class of fungible assets from a public origin.
     *
     * This new asset class has no assets initially and its owner is the origin.
     *
     * The origin must conform to the configured `CreateOrigin` and have sufficient funds free.
     *
     * Funds of sender are reserved by `AssetDeposit`.
     *
     * Parameters:
     * - `id`: The identifier of the new asset. This must not be currently in use to identify
     * an existing asset. If [`NextAssetId`] is set, then this must be equal to it.
     * - `admin`: The admin of this class of assets. The admin is the initial address of each
     * member of the asset class's admin team.
     * - `min_balance`: The minimum balance of this new asset that any single account must
     * have. If an account's balance is reduced below this, then it collapses to zero.
     *
     * Emits `Created` event when successful.
     *
     * Weight: `O(1)`
     */
    "create": {
        "id": number;
        "admin": MultiAddress;
        "min_balance": bigint;
    };
    /**
     * Issue a new class of fungible assets from a privileged origin.
     *
     * This new asset class has no assets initially.
     *
     * The origin must conform to `ForceOrigin`.
     *
     * Unlike `create`, no funds are reserved.
     *
     * - `id`: The identifier of the new asset. This must not be currently in use to identify
     * an existing asset. If [`NextAssetId`] is set, then this must be equal to it.
     * - `owner`: The owner of this class of assets. The owner has full superuser permissions
     * over this asset, but may later change and configure the permissions using
     * `transfer_ownership` and `set_team`.
     * - `min_balance`: The minimum balance of this new asset that any single account must
     * have. If an account's balance is reduced below this, then it collapses to zero.
     *
     * Emits `ForceCreated` event when successful.
     *
     * Weight: `O(1)`
     */
    "force_create": {
        "id": number;
        "owner": MultiAddress;
        "is_sufficient": boolean;
        "min_balance": bigint;
    };
    /**
     * Start the process of destroying a fungible asset class.
     *
     * `start_destroy` is the first in a series of extrinsics that should be called, to allow
     * destruction of an asset class.
     *
     * The origin must conform to `ForceOrigin` or must be `Signed` by the asset's `owner`.
     *
     * - `id`: The identifier of the asset to be destroyed. This must identify an existing
     * asset.
     *
     * It will fail with either [`Error::ContainsHolds`] or [`Error::ContainsFreezes`] if
     * an account contains holds or freezes in place.
     */
    "start_destroy": Anonymize<Ic5b47dj4coa3r>;
    /**
     * Destroy all accounts associated with a given asset.
     *
     * `destroy_accounts` should only be called after `start_destroy` has been called, and the
     * asset is in a `Destroying` state.
     *
     * Due to weight restrictions, this function may need to be called multiple times to fully
     * destroy all accounts. It will destroy `RemoveItemsLimit` accounts at a time.
     *
     * - `id`: The identifier of the asset to be destroyed. This must identify an existing
     * asset.
     *
     * Each call emits the `Event::DestroyedAccounts` event.
     */
    "destroy_accounts": Anonymize<Ic5b47dj4coa3r>;
    /**
     * Destroy all approvals associated with a given asset up to the max (T::RemoveItemsLimit).
     *
     * `destroy_approvals` should only be called after `start_destroy` has been called, and the
     * asset is in a `Destroying` state.
     *
     * Due to weight restrictions, this function may need to be called multiple times to fully
     * destroy all approvals. It will destroy `RemoveItemsLimit` approvals at a time.
     *
     * - `id`: The identifier of the asset to be destroyed. This must identify an existing
     * asset.
     *
     * Each call emits the `Event::DestroyedApprovals` event.
     */
    "destroy_approvals": Anonymize<Ic5b47dj4coa3r>;
    /**
     * Complete destroying asset and unreserve currency.
     *
     * `finish_destroy` should only be called after `start_destroy` has been called, and the
     * asset is in a `Destroying` state. All accounts or approvals should be destroyed before
     * hand.
     *
     * - `id`: The identifier of the asset to be destroyed. This must identify an existing
     * asset.
     *
     * Each successful call emits the `Event::Destroyed` event.
     */
    "finish_destroy": Anonymize<Ic5b47dj4coa3r>;
    /**
     * Mint assets of a particular class.
     *
     * The origin must be Signed and the sender must be the Issuer of the asset `id`.
     *
     * - `id`: The identifier of the asset to have some amount minted.
     * - `beneficiary`: The account to be credited with the minted assets.
     * - `amount`: The amount of the asset to be minted.
     *
     * Emits `Issued` event when successful.
     *
     * Weight: `O(1)`
     * Modes: Pre-existing balance of `beneficiary`; Account pre-existence of `beneficiary`.
     */
    "mint": {
        "id": number;
        "beneficiary": MultiAddress;
        "amount": bigint;
    };
    /**
     * Reduce the balance of `who` by as much as possible up to `amount` assets of `id`.
     *
     * Origin must be Signed and the sender should be the Manager of the asset `id`.
     *
     * Bails with `NoAccount` if the `who` is already dead.
     *
     * - `id`: The identifier of the asset to have some amount burned.
     * - `who`: The account to be debited from.
     * - `amount`: The maximum amount by which `who`'s balance should be reduced.
     *
     * Emits `Burned` with the actual amount burned. If this takes the balance to below the
     * minimum for the asset, then the amount burned is increased to take it to zero.
     *
     * Weight: `O(1)`
     * Modes: Post-existence of `who`; Pre & post Zombie-status of `who`.
     */
    "burn": {
        "id": number;
        "who": MultiAddress;
        "amount": bigint;
    };
    /**
     * Move some assets from the sender account to another.
     *
     * Origin must be Signed.
     *
     * - `id`: The identifier of the asset to have some amount transferred.
     * - `target`: The account to be credited.
     * - `amount`: The amount by which the sender's balance of assets should be reduced and
     * `target`'s balance increased. The amount actually transferred may be slightly greater in
     * the case that the transfer would otherwise take the sender balance above zero but below
     * the minimum balance. Must be greater than zero.
     *
     * Emits `Transferred` with the actual amount transferred. If this takes the source balance
     * to below the minimum for the asset, then the amount transferred is increased to take it
     * to zero.
     *
     * Weight: `O(1)`
     * Modes: Pre-existence of `target`; Post-existence of sender; Account pre-existence of
     * `target`.
     */
    "transfer": {
        "id": number;
        "target": MultiAddress;
        "amount": bigint;
    };
    /**
     * Move some assets from the sender account to another, keeping the sender account alive.
     *
     * Origin must be Signed.
     *
     * - `id`: The identifier of the asset to have some amount transferred.
     * - `target`: The account to be credited.
     * - `amount`: The amount by which the sender's balance of assets should be reduced and
     * `target`'s balance increased. The amount actually transferred may be slightly greater in
     * the case that the transfer would otherwise take the sender balance above zero but below
     * the minimum balance. Must be greater than zero.
     *
     * Emits `Transferred` with the actual amount transferred. If this takes the source balance
     * to below the minimum for the asset, then the amount transferred is increased to take it
     * to zero.
     *
     * Weight: `O(1)`
     * Modes: Pre-existence of `target`; Post-existence of sender; Account pre-existence of
     * `target`.
     */
    "transfer_keep_alive": {
        "id": number;
        "target": MultiAddress;
        "amount": bigint;
    };
    /**
     * Move some assets from one account to another.
     *
     * Origin must be Signed and the sender should be the Admin of the asset `id`.
     *
     * - `id`: The identifier of the asset to have some amount transferred.
     * - `source`: The account to be debited.
     * - `dest`: The account to be credited.
     * - `amount`: The amount by which the `source`'s balance of assets should be reduced and
     * `dest`'s balance increased. The amount actually transferred may be slightly greater in
     * the case that the transfer would otherwise take the `source` balance above zero but
     * below the minimum balance. Must be greater than zero.
     *
     * Emits `Transferred` with the actual amount transferred. If this takes the source balance
     * to below the minimum for the asset, then the amount transferred is increased to take it
     * to zero.
     *
     * Weight: `O(1)`
     * Modes: Pre-existence of `dest`; Post-existence of `source`; Account pre-existence of
     * `dest`.
     */
    "force_transfer": {
        "id": number;
        "source": MultiAddress;
        "dest": MultiAddress;
        "amount": bigint;
    };
    /**
     * Disallow further unprivileged transfers of an asset `id` from an account `who`. `who`
     * must already exist as an entry in `Account`s of the asset. If you want to freeze an
     * account that does not have an entry, use `touch_other` first.
     *
     * Origin must be Signed and the sender should be the Freezer of the asset `id`.
     *
     * - `id`: The identifier of the asset to be frozen.
     * - `who`: The account to be frozen.
     *
     * Emits `Frozen`.
     *
     * Weight: `O(1)`
     */
    "freeze": {
        "id": number;
        "who": MultiAddress;
    };
    /**
     * Allow unprivileged transfers to and from an account again.
     *
     * Origin must be Signed and the sender should be the Admin of the asset `id`.
     *
     * - `id`: The identifier of the asset to be frozen.
     * - `who`: The account to be unfrozen.
     *
     * Emits `Thawed`.
     *
     * Weight: `O(1)`
     */
    "thaw": {
        "id": number;
        "who": MultiAddress;
    };
    /**
     * Disallow further unprivileged transfers for the asset class.
     *
     * Origin must be Signed and the sender should be the Freezer of the asset `id`.
     *
     * - `id`: The identifier of the asset to be frozen.
     *
     * Emits `Frozen`.
     *
     * Weight: `O(1)`
     */
    "freeze_asset": Anonymize<Ic5b47dj4coa3r>;
    /**
     * Allow unprivileged transfers for the asset again.
     *
     * Origin must be Signed and the sender should be the Admin of the asset `id`.
     *
     * - `id`: The identifier of the asset to be thawed.
     *
     * Emits `Thawed`.
     *
     * Weight: `O(1)`
     */
    "thaw_asset": Anonymize<Ic5b47dj4coa3r>;
    /**
     * Change the Owner of an asset.
     *
     * Origin must be Signed and the sender should be the Owner of the asset `id`.
     *
     * - `id`: The identifier of the asset.
     * - `owner`: The new Owner of this asset.
     *
     * Emits `OwnerChanged`.
     *
     * Weight: `O(1)`
     */
    "transfer_ownership": {
        "id": number;
        "owner": MultiAddress;
    };
    /**
     * Change the Issuer, Admin and Freezer of an asset.
     *
     * Origin must be Signed and the sender should be the Owner of the asset `id`.
     *
     * - `id`: The identifier of the asset to be frozen.
     * - `issuer`: The new Issuer of this asset.
     * - `admin`: The new Admin of this asset.
     * - `freezer`: The new Freezer of this asset.
     *
     * Emits `TeamChanged`.
     *
     * Weight: `O(1)`
     */
    "set_team": {
        "id": number;
        "issuer": MultiAddress;
        "admin": MultiAddress;
        "freezer": MultiAddress;
    };
    /**
     * Set the metadata for an asset.
     *
     * Origin must be Signed and the sender should be the Owner of the asset `id`.
     *
     * Funds of sender are reserved according to the formula:
     * `MetadataDepositBase + MetadataDepositPerByte * (name.len + symbol.len)` taking into
     * account any already reserved funds.
     *
     * - `id`: The identifier of the asset to update.
     * - `name`: The user friendly name of this asset. Limited in length by `StringLimit`.
     * - `symbol`: The exchange symbol for this asset. Limited in length by `StringLimit`.
     * - `decimals`: The number of decimals this asset uses to represent one unit.
     *
     * Emits `MetadataSet`.
     *
     * Weight: `O(1)`
     */
    "set_metadata": {
        "id": number;
        "name": Binary;
        "symbol": Binary;
        "decimals": number;
    };
    /**
     * Clear the metadata for an asset.
     *
     * Origin must be Signed and the sender should be the Owner of the asset `id`.
     *
     * Any deposit is freed for the asset owner.
     *
     * - `id`: The identifier of the asset to clear.
     *
     * Emits `MetadataCleared`.
     *
     * Weight: `O(1)`
     */
    "clear_metadata": Anonymize<Ic5b47dj4coa3r>;
    /**
     * Force the metadata for an asset to some value.
     *
     * Origin must be ForceOrigin.
     *
     * Any deposit is left alone.
     *
     * - `id`: The identifier of the asset to update.
     * - `name`: The user friendly name of this asset. Limited in length by `StringLimit`.
     * - `symbol`: The exchange symbol for this asset. Limited in length by `StringLimit`.
     * - `decimals`: The number of decimals this asset uses to represent one unit.
     *
     * Emits `MetadataSet`.
     *
     * Weight: `O(N + S)` where N and S are the length of the name and symbol respectively.
     */
    "force_set_metadata": {
        "id": number;
        "name": Binary;
        "symbol": Binary;
        "decimals": number;
        "is_frozen": boolean;
    };
    /**
     * Clear the metadata for an asset.
     *
     * Origin must be ForceOrigin.
     *
     * Any deposit is returned.
     *
     * - `id`: The identifier of the asset to clear.
     *
     * Emits `MetadataCleared`.
     *
     * Weight: `O(1)`
     */
    "force_clear_metadata": Anonymize<Ic5b47dj4coa3r>;
    /**
     * Alter the attributes of a given asset.
     *
     * Origin must be `ForceOrigin`.
     *
     * - `id`: The identifier of the asset.
     * - `owner`: The new Owner of this asset.
     * - `issuer`: The new Issuer of this asset.
     * - `admin`: The new Admin of this asset.
     * - `freezer`: The new Freezer of this asset.
     * - `min_balance`: The minimum balance of this new asset that any single account must
     * have. If an account's balance is reduced below this, then it collapses to zero.
     * - `is_sufficient`: Whether a non-zero balance of this asset is deposit of sufficient
     * value to account for the state bloat associated with its balance storage. If set to
     * `true`, then non-zero balances may be stored without a `consumer` reference (and thus
     * an ED in the Balances pallet or whatever else is used to control user-account state
     * growth).
     * - `is_frozen`: Whether this asset class is frozen except for permissioned/admin
     * instructions.
     *
     * Emits `AssetStatusChanged` with the identity of the asset.
     *
     * Weight: `O(1)`
     */
    "force_asset_status": {
        "id": number;
        "owner": MultiAddress;
        "issuer": MultiAddress;
        "admin": MultiAddress;
        "freezer": MultiAddress;
        "min_balance": bigint;
        "is_sufficient": boolean;
        "is_frozen": boolean;
    };
    /**
     * Approve an amount of asset for transfer by a delegated third-party account.
     *
     * Origin must be Signed.
     *
     * Ensures that `ApprovalDeposit` worth of `Currency` is reserved from signing account
     * for the purpose of holding the approval. If some non-zero amount of assets is already
     * approved from signing account to `delegate`, then it is topped up or unreserved to
     * meet the right value.
     *
     * NOTE: The signing account does not need to own `amount` of assets at the point of
     * making this call.
     *
     * - `id`: The identifier of the asset.
     * - `delegate`: The account to delegate permission to transfer asset.
     * - `amount`: The amount of asset that may be transferred by `delegate`. If there is
     * already an approval in place, then this acts additively.
     *
     * Emits `ApprovedTransfer` on success.
     *
     * Weight: `O(1)`
     */
    "approve_transfer": {
        "id": number;
        "delegate": MultiAddress;
        "amount": bigint;
    };
    /**
     * Cancel all of some asset approved for delegated transfer by a third-party account.
     *
     * Origin must be Signed and there must be an approval in place between signer and
     * `delegate`.
     *
     * Unreserves any deposit previously reserved by `approve_transfer` for the approval.
     *
     * - `id`: The identifier of the asset.
     * - `delegate`: The account delegated permission to transfer asset.
     *
     * Emits `ApprovalCancelled` on success.
     *
     * Weight: `O(1)`
     */
    "cancel_approval": {
        "id": number;
        "delegate": MultiAddress;
    };
    /**
     * Cancel all of some asset approved for delegated transfer by a third-party account.
     *
     * Origin must be either ForceOrigin or Signed origin with the signer being the Admin
     * account of the asset `id`.
     *
     * Unreserves any deposit previously reserved by `approve_transfer` for the approval.
     *
     * - `id`: The identifier of the asset.
     * - `delegate`: The account delegated permission to transfer asset.
     *
     * Emits `ApprovalCancelled` on success.
     *
     * Weight: `O(1)`
     */
    "force_cancel_approval": {
        "id": number;
        "owner": MultiAddress;
        "delegate": MultiAddress;
    };
    /**
     * Transfer some asset balance from a previously delegated account to some third-party
     * account.
     *
     * Origin must be Signed and there must be an approval in place by the `owner` to the
     * signer.
     *
     * If the entire amount approved for transfer is transferred, then any deposit previously
     * reserved by `approve_transfer` is unreserved.
     *
     * - `id`: The identifier of the asset.
     * - `owner`: The account which previously approved for a transfer of at least `amount` and
     * from which the asset balance will be withdrawn.
     * - `destination`: The account to which the asset balance of `amount` will be transferred.
     * - `amount`: The amount of assets to transfer.
     *
     * Emits `TransferredApproved` on success.
     *
     * Weight: `O(1)`
     */
    "transfer_approved": {
        "id": number;
        "owner": MultiAddress;
        "destination": MultiAddress;
        "amount": bigint;
    };
    /**
     * Create an asset account for non-provider assets.
     *
     * A deposit will be taken from the signer account.
     *
     * - `origin`: Must be Signed; the signer account must have sufficient funds for a deposit
     * to be taken.
     * - `id`: The identifier of the asset for the account to be created.
     *
     * Emits `Touched` event when successful.
     */
    "touch": Anonymize<Ic5b47dj4coa3r>;
    /**
     * Return the deposit (if any) of an asset account or a consumer reference (if any) of an
     * account.
     *
     * The origin must be Signed.
     *
     * - `id`: The identifier of the asset for which the caller would like the deposit
     * refunded.
     * - `allow_burn`: If `true` then assets may be destroyed in order to complete the refund.
     *
     * It will fail with either [`Error::ContainsHolds`] or [`Error::ContainsFreezes`] if
     * the asset account contains holds or freezes in place.
     *
     * Emits `Refunded` event when successful.
     */
    "refund": {
        "id": number;
        "allow_burn": boolean;
    };
    /**
     * Sets the minimum balance of an asset.
     *
     * Only works if there aren't any accounts that are holding the asset or if
     * the new value of `min_balance` is less than the old one.
     *
     * Origin must be Signed and the sender has to be the Owner of the
     * asset `id`.
     *
     * - `id`: The identifier of the asset.
     * - `min_balance`: The new value of `min_balance`.
     *
     * Emits `AssetMinBalanceChanged` event when successful.
     */
    "set_min_balance": {
        "id": number;
        "min_balance": bigint;
    };
    /**
     * Create an asset account for `who`.
     *
     * A deposit will be taken from the signer account.
     *
     * - `origin`: Must be Signed by `Freezer` or `Admin` of the asset `id`; the signer account
     * must have sufficient funds for a deposit to be taken.
     * - `id`: The identifier of the asset for the account to be created.
     * - `who`: The account to be created.
     *
     * Emits `Touched` event when successful.
     */
    "touch_other": {
        "id": number;
        "who": MultiAddress;
    };
    /**
     * Return the deposit (if any) of a target asset account. Useful if you are the depositor.
     *
     * The origin must be Signed and either the account owner, depositor, or asset `Admin`. In
     * order to burn a non-zero balance of the asset, the caller must be the account and should
     * use `refund`.
     *
     * - `id`: The identifier of the asset for the account holding a deposit.
     * - `who`: The account to refund.
     *
     * It will fail with either [`Error::ContainsHolds`] or [`Error::ContainsFreezes`] if
     * the asset account contains holds or freezes in place.
     *
     * Emits `Refunded` event when successful.
     */
    "refund_other": {
        "id": number;
        "who": MultiAddress;
    };
    /**
     * Disallow further unprivileged transfers of an asset `id` to and from an account `who`.
     *
     * Origin must be Signed and the sender should be the Freezer of the asset `id`.
     *
     * - `id`: The identifier of the account's asset.
     * - `who`: The account to be unblocked.
     *
     * Emits `Blocked`.
     *
     * Weight: `O(1)`
     */
    "block": {
        "id": number;
        "who": MultiAddress;
    };
    /**
     * Transfer the entire transferable balance from the caller asset account.
     *
     * NOTE: This function only attempts to transfer _transferable_ balances. This means that
     * any held, frozen, or minimum balance (when `keep_alive` is `true`), will not be
     * transferred by this function. To ensure that this function results in a killed account,
     * you might need to prepare the account by removing any reference counters, storage
     * deposits, etc...
     *
     * The dispatch origin of this call must be Signed.
     *
     * - `id`: The identifier of the asset for the account holding a deposit.
     * - `dest`: The recipient of the transfer.
     * - `keep_alive`: A boolean to determine if the `transfer_all` operation should send all
     * of the funds the asset account has, causing the sender asset account to be killed
     * (false), or transfer everything except at least the minimum balance, which will
     * guarantee to keep the sender asset account alive (true).
     */
    "transfer_all": {
        "id": number;
        "dest": MultiAddress;
        "keep_alive": boolean;
    };
}>;
export type Icu49uv7rfej74 = AnonymousEnum<{
    /**
     * Issue a new collection of non-fungible items from a public origin.
     *
     * This new collection has no items initially and its owner is the origin.
     *
     * The origin must conform to the configured `CreateOrigin` and have sufficient funds free.
     *
     * `ItemDeposit` funds of sender are reserved.
     *
     * Parameters:
     * - `collection`: The identifier of the new collection. This must not be currently in use.
     * - `admin`: The admin of this collection. The admin is the initial address of each
     * member of the collection's admin team.
     *
     * Emits `Created` event when successful.
     *
     * Weight: `O(1)`
     */
    "create": {
        "collection": number;
        "admin": MultiAddress;
    };
    /**
     * Issue a new collection of non-fungible items from a privileged origin.
     *
     * This new collection has no items initially.
     *
     * The origin must conform to `ForceOrigin`.
     *
     * Unlike `create`, no funds are reserved.
     *
     * - `collection`: The identifier of the new item. This must not be currently in use.
     * - `owner`: The owner of this collection of items. The owner has full superuser
     * permissions
     * over this item, but may later change and configure the permissions using
     * `transfer_ownership` and `set_team`.
     *
     * Emits `ForceCreated` event when successful.
     *
     * Weight: `O(1)`
     */
    "force_create": {
        "collection": number;
        "owner": MultiAddress;
        "free_holding": boolean;
    };
    /**
     * Destroy a collection of fungible items.
     *
     * The origin must conform to `ForceOrigin` or must be `Signed` and the sender must be the
     * owner of the `collection`.
     *
     * - `collection`: The identifier of the collection to be destroyed.
     * - `witness`: Information on the items minted in the collection. This must be
     * correct.
     *
     * Emits `Destroyed` event when successful.
     *
     * Weight: `O(n + m)` where:
     * - `n = witness.items`
     * - `m = witness.item_metadatas`
     * - `a = witness.attributes`
     */
    "destroy": {
        "collection": number;
        "witness": {
            "items": number;
            "item_metadatas": number;
            "attributes": number;
        };
    };
    /**
     * Mint an item of a particular collection.
     *
     * The origin must be Signed and the sender must be the Issuer of the `collection`.
     *
     * - `collection`: The collection of the item to be minted.
     * - `item`: The item value of the item to be minted.
     * - `beneficiary`: The initial owner of the minted item.
     *
     * Emits `Issued` event when successful.
     *
     * Weight: `O(1)`
     */
    "mint": {
        "collection": number;
        "item": number;
        "owner": MultiAddress;
    };
    /**
     * Destroy a single item.
     *
     * Origin must be Signed and the signing account must be either:
     * - the Admin of the `collection`;
     * - the Owner of the `item`;
     *
     * - `collection`: The collection of the item to be burned.
     * - `item`: The item of the item to be burned.
     * - `check_owner`: If `Some` then the operation will fail with `WrongOwner` unless the
     * item is owned by this value.
     *
     * Emits `Burned` with the actual amount burned.
     *
     * Weight: `O(1)`
     * Modes: `check_owner.is_some()`.
     */
    "burn": {
        "collection": number;
        "item": number;
        "check_owner"?: Anonymize<Ia0jlc0rcbskuk>;
    };
    /**
     * Move an item from the sender account to another.
     *
     * This resets the approved account of the item.
     *
     * Origin must be Signed and the signing account must be either:
     * - the Admin of the `collection`;
     * - the Owner of the `item`;
     * - the approved delegate for the `item` (in this case, the approval is reset).
     *
     * Arguments:
     * - `collection`: The collection of the item to be transferred.
     * - `item`: The item of the item to be transferred.
     * - `dest`: The account to receive ownership of the item.
     *
     * Emits `Transferred`.
     *
     * Weight: `O(1)`
     */
    "transfer": Anonymize<Ibgvkh96s68a66>;
    /**
     * Reevaluate the deposits on some items.
     *
     * Origin must be Signed and the sender should be the Owner of the `collection`.
     *
     * - `collection`: The collection to be frozen.
     * - `items`: The items of the collection whose deposits will be reevaluated.
     *
     * NOTE: This exists as a best-effort function. Any items which are unknown or
     * in the case that the owner account does not have reservable funds to pay for a
     * deposit increase are ignored. Generally the owner isn't going to call this on items
     * whose existing deposit is less than the refreshed deposit as it would only cost them,
     * so it's of little consequence.
     *
     * It will still return an error in the case that the collection is unknown of the signer
     * is not permitted to call it.
     *
     * Weight: `O(items.len())`
     */
    "redeposit": Anonymize<If9vko7pv0231m>;
    /**
     * Disallow further unprivileged transfer of an item.
     *
     * Origin must be Signed and the sender should be the Freezer of the `collection`.
     *
     * - `collection`: The collection of the item to be frozen.
     * - `item`: The item of the item to be frozen.
     *
     * Emits `Frozen`.
     *
     * Weight: `O(1)`
     */
    "freeze": Anonymize<Iafkqus0ohh6l6>;
    /**
     * Re-allow unprivileged transfer of an item.
     *
     * Origin must be Signed and the sender should be the Freezer of the `collection`.
     *
     * - `collection`: The collection of the item to be thawed.
     * - `item`: The item of the item to be thawed.
     *
     * Emits `Thawed`.
     *
     * Weight: `O(1)`
     */
    "thaw": Anonymize<Iafkqus0ohh6l6>;
    /**
     * Disallow further unprivileged transfers for a whole collection.
     *
     * Origin must be Signed and the sender should be the Freezer of the `collection`.
     *
     * - `collection`: The collection to be frozen.
     *
     * Emits `CollectionFrozen`.
     *
     * Weight: `O(1)`
     */
    "freeze_collection": Anonymize<I6cu7obfo0rr0o>;
    /**
     * Re-allow unprivileged transfers for a whole collection.
     *
     * Origin must be Signed and the sender should be the Admin of the `collection`.
     *
     * - `collection`: The collection to be thawed.
     *
     * Emits `CollectionThawed`.
     *
     * Weight: `O(1)`
     */
    "thaw_collection": Anonymize<I6cu7obfo0rr0o>;
    /**
     * Change the Owner of a collection.
     *
     * Origin must be Signed and the sender should be the Owner of the `collection`.
     *
     * - `collection`: The collection whose owner should be changed.
     * - `owner`: The new Owner of this collection. They must have called
     * `set_accept_ownership` with `collection` in order for this operation to succeed.
     *
     * Emits `OwnerChanged`.
     *
     * Weight: `O(1)`
     */
    "transfer_ownership": Anonymize<I736lv5q9m5bot>;
    /**
     * Change the Issuer, Admin and Freezer of a collection.
     *
     * Origin must be Signed and the sender should be the Owner of the `collection`.
     *
     * - `collection`: The collection whose team should be changed.
     * - `issuer`: The new Issuer of this collection.
     * - `admin`: The new Admin of this collection.
     * - `freezer`: The new Freezer of this collection.
     *
     * Emits `TeamChanged`.
     *
     * Weight: `O(1)`
     */
    "set_team": {
        "collection": number;
        "issuer": MultiAddress;
        "admin": MultiAddress;
        "freezer": MultiAddress;
    };
    /**
     * Approve an item to be transferred by a delegated third-party account.
     *
     * The origin must conform to `ForceOrigin` or must be `Signed` and the sender must be
     * either the owner of the `item` or the admin of the collection.
     *
     * - `collection`: The collection of the item to be approved for delegated transfer.
     * - `item`: The item of the item to be approved for delegated transfer.
     * - `delegate`: The account to delegate permission to transfer the item.
     *
     * Important NOTE: The `approved` account gets reset after each transfer.
     *
     * Emits `ApprovedTransfer` on success.
     *
     * Weight: `O(1)`
     */
    "approve_transfer": Anonymize<Ib92t90p616grb>;
    /**
     * Cancel the prior approval for the transfer of an item by a delegate.
     *
     * Origin must be either:
     * - the `Force` origin;
     * - `Signed` with the signer being the Admin of the `collection`;
     * - `Signed` with the signer being the Owner of the `item`;
     *
     * Arguments:
     * - `collection`: The collection of the item of whose approval will be cancelled.
     * - `item`: The item of the item of whose approval will be cancelled.
     * - `maybe_check_delegate`: If `Some` will ensure that the given account is the one to
     * which permission of transfer is delegated.
     *
     * Emits `ApprovalCancelled` on success.
     *
     * Weight: `O(1)`
     */
    "cancel_approval": {
        "collection": number;
        "item": number;
        "maybe_check_delegate"?: Anonymize<Ia0jlc0rcbskuk>;
    };
    /**
     * Alter the attributes of a given item.
     *
     * Origin must be `ForceOrigin`.
     *
     * - `collection`: The identifier of the item.
     * - `owner`: The new Owner of this item.
     * - `issuer`: The new Issuer of this item.
     * - `admin`: The new Admin of this item.
     * - `freezer`: The new Freezer of this item.
     * - `free_holding`: Whether a deposit is taken for holding an item of this collection.
     * - `is_frozen`: Whether this collection is frozen except for permissioned/admin
     * instructions.
     *
     * Emits `ItemStatusChanged` with the identity of the item.
     *
     * Weight: `O(1)`
     */
    "force_item_status": {
        "collection": number;
        "owner": MultiAddress;
        "issuer": MultiAddress;
        "admin": MultiAddress;
        "freezer": MultiAddress;
        "free_holding": boolean;
        "is_frozen": boolean;
    };
    /**
     * Set an attribute for a collection or item.
     *
     * Origin must be either `ForceOrigin` or Signed and the sender should be the Owner of the
     * `collection`.
     *
     * If the origin is Signed, then funds of signer are reserved according to the formula:
     * `MetadataDepositBase + DepositPerByte * (key.len + value.len)` taking into
     * account any already reserved funds.
     *
     * - `collection`: The identifier of the collection whose item's metadata to set.
     * - `maybe_item`: The identifier of the item whose metadata to set.
     * - `key`: The key of the attribute.
     * - `value`: The value to which to set the attribute.
     *
     * Emits `AttributeSet`.
     *
     * Weight: `O(1)`
     */
    "set_attribute": {
        "collection": number;
        "maybe_item"?: Anonymize<I4arjljr6dpflb>;
        "key": Binary;
        "value": Binary;
    };
    /**
     * Clear an attribute for a collection or item.
     *
     * Origin must be either `ForceOrigin` or Signed and the sender should be the Owner of the
     * `collection`.
     *
     * Any deposit is freed for the collection's owner.
     *
     * - `collection`: The identifier of the collection whose item's metadata to clear.
     * - `maybe_item`: The identifier of the item whose metadata to clear.
     * - `key`: The key of the attribute.
     *
     * Emits `AttributeCleared`.
     *
     * Weight: `O(1)`
     */
    "clear_attribute": {
        "collection": number;
        "maybe_item"?: Anonymize<I4arjljr6dpflb>;
        "key": Binary;
    };
    /**
     * Set the metadata for an item.
     *
     * Origin must be either `ForceOrigin` or Signed and the sender should be the Owner of the
     * `collection`.
     *
     * If the origin is Signed, then funds of signer are reserved according to the formula:
     * `MetadataDepositBase + DepositPerByte * data.len` taking into
     * account any already reserved funds.
     *
     * - `collection`: The identifier of the collection whose item's metadata to set.
     * - `item`: The identifier of the item whose metadata to set.
     * - `data`: The general information of this item. Limited in length by `StringLimit`.
     * - `is_frozen`: Whether the metadata should be frozen against further changes.
     *
     * Emits `MetadataSet`.
     *
     * Weight: `O(1)`
     */
    "set_metadata": {
        "collection": number;
        "item": number;
        "data": Binary;
        "is_frozen": boolean;
    };
    /**
     * Clear the metadata for an item.
     *
     * Origin must be either `ForceOrigin` or Signed and the sender should be the Owner of the
     * `item`.
     *
     * Any deposit is freed for the collection's owner.
     *
     * - `collection`: The identifier of the collection whose item's metadata to clear.
     * - `item`: The identifier of the item whose metadata to clear.
     *
     * Emits `MetadataCleared`.
     *
     * Weight: `O(1)`
     */
    "clear_metadata": Anonymize<Iafkqus0ohh6l6>;
    /**
     * Set the metadata for a collection.
     *
     * Origin must be either `ForceOrigin` or `Signed` and the sender should be the Owner of
     * the `collection`.
     *
     * If the origin is `Signed`, then funds of signer are reserved according to the formula:
     * `MetadataDepositBase + DepositPerByte * data.len` taking into
     * account any already reserved funds.
     *
     * - `collection`: The identifier of the item whose metadata to update.
     * - `data`: The general information of this item. Limited in length by `StringLimit`.
     * - `is_frozen`: Whether the metadata should be frozen against further changes.
     *
     * Emits `CollectionMetadataSet`.
     *
     * Weight: `O(1)`
     */
    "set_collection_metadata": {
        "collection": number;
        "data": Binary;
        "is_frozen": boolean;
    };
    /**
     * Clear the metadata for a collection.
     *
     * Origin must be either `ForceOrigin` or `Signed` and the sender should be the Owner of
     * the `collection`.
     *
     * Any deposit is freed for the collection's owner.
     *
     * - `collection`: The identifier of the collection whose metadata to clear.
     *
     * Emits `CollectionMetadataCleared`.
     *
     * Weight: `O(1)`
     */
    "clear_collection_metadata": Anonymize<I6cu7obfo0rr0o>;
    /**
     * Set (or reset) the acceptance of ownership for a particular account.
     *
     * Origin must be `Signed` and if `maybe_collection` is `Some`, then the signer must have a
     * provider reference.
     *
     * - `maybe_collection`: The identifier of the collection whose ownership the signer is
     * willing to accept, or if `None`, an indication that the signer is willing to accept no
     * ownership transferal.
     *
     * Emits `OwnershipAcceptanceChanged`.
     */
    "set_accept_ownership": Anonymize<Ibqooroq6rr5kr>;
    /**
     * Set the maximum amount of items a collection could have.
     *
     * Origin must be either `ForceOrigin` or `Signed` and the sender should be the Owner of
     * the `collection`.
     *
     * Note: This function can only succeed once per collection.
     *
     * - `collection`: The identifier of the collection to change.
     * - `max_supply`: The maximum amount of items a collection could have.
     *
     * Emits `CollectionMaxSupplySet` event when successful.
     */
    "set_collection_max_supply": Anonymize<I6h88h8vba22v8>;
    /**
     * Set (or reset) the price for an item.
     *
     * Origin must be Signed and must be the owner of the asset `item`.
     *
     * - `collection`: The collection of the item.
     * - `item`: The item to set the price for.
     * - `price`: The price for the item. Pass `None`, to reset the price.
     * - `buyer`: Restricts the buy operation to a specific account.
     *
     * Emits `ItemPriceSet` on success if the price is not `None`.
     * Emits `ItemPriceRemoved` on success if the price is `None`.
     */
    "set_price": Anonymize<Ia9cd4jqb5eecb>;
    /**
     * Allows to buy an item if it's up for sale.
     *
     * Origin must be Signed and must not be the owner of the `item`.
     *
     * - `collection`: The collection of the item.
     * - `item`: The item the sender wants to buy.
     * - `bid_price`: The price the sender is willing to pay.
     *
     * Emits `ItemBought` on success.
     */
    "buy_item": Anonymize<I19jiel1ftbcce>;
}>;
export type Ibgvkh96s68a66 = {
    "collection": number;
    "item": number;
    "dest": MultiAddress;
};
export type If9vko7pv0231m = {
    "collection": number;
    "items": Anonymize<Icgljjb6j82uhn>;
};
export type Iafkqus0ohh6l6 = {
    "collection": number;
    "item": number;
};
export type I6cu7obfo0rr0o = {
    "collection": number;
};
export type I736lv5q9m5bot = {
    "collection": number;
    "new_owner": MultiAddress;
};
export type Ib92t90p616grb = {
    "collection": number;
    "item": number;
    "delegate": MultiAddress;
};
export type Ibqooroq6rr5kr = {
    "maybe_collection"?: Anonymize<I4arjljr6dpflb>;
};
export type I6h88h8vba22v8 = {
    "collection": number;
    "max_supply": number;
};
export type Ia9cd4jqb5eecb = {
    "collection": number;
    "item": number;
    "price"?: Anonymize<I35p85j063s0il>;
    "whitelisted_buyer"?: Anonymize<Ia0jlc0rcbskuk>;
};
export type I19jiel1ftbcce = {
    "collection": number;
    "item": number;
    "bid_price": bigint;
};
export type I1k4il7i5elhc7 = AnonymousEnum<{
    /**
     * Issue a new collection of non-fungible items from a public origin.
     *
     * This new collection has no items initially and its owner is the origin.
     *
     * The origin must be Signed and the sender must have sufficient funds free.
     *
     * `CollectionDeposit` funds of sender are reserved.
     *
     * Parameters:
     * - `admin`: The admin of this collection. The admin is the initial address of each
     * member of the collection's admin team.
     *
     * Emits `Created` event when successful.
     *
     * Weight: `O(1)`
     */
    "create": {
        "admin": MultiAddress;
        "config": Anonymize<I72ndo6phms8ik>;
    };
    /**
     * Issue a new collection of non-fungible items from a privileged origin.
     *
     * This new collection has no items initially.
     *
     * The origin must conform to `ForceOrigin`.
     *
     * Unlike `create`, no funds are reserved.
     *
     * - `owner`: The owner of this collection of items. The owner has full superuser
     * permissions over this item, but may later change and configure the permissions using
     * `transfer_ownership` and `set_team`.
     *
     * Emits `ForceCreated` event when successful.
     *
     * Weight: `O(1)`
     */
    "force_create": {
        "owner": MultiAddress;
        "config": Anonymize<I72ndo6phms8ik>;
    };
    /**
     * Destroy a collection of fungible items.
     *
     * The origin must conform to `ForceOrigin` or must be `Signed` and the sender must be the
     * owner of the `collection`.
     *
     * NOTE: The collection must have 0 items to be destroyed.
     *
     * - `collection`: The identifier of the collection to be destroyed.
     * - `witness`: Information on the items minted in the collection. This must be
     * correct.
     *
     * Emits `Destroyed` event when successful.
     *
     * Weight: `O(m + c + a)` where:
     * - `m = witness.item_metadatas`
     * - `c = witness.item_configs`
     * - `a = witness.attributes`
     */
    "destroy": {
        "collection": number;
        "witness": {
            "item_metadatas": number;
            "item_configs": number;
            "attributes": number;
        };
    };
    /**
     * Mint an item of a particular collection.
     *
     * The origin must be Signed and the sender must comply with the `mint_settings` rules.
     *
     * - `collection`: The collection of the item to be minted.
     * - `item`: An identifier of the new item.
     * - `mint_to`: Account into which the item will be minted.
     * - `witness_data`: When the mint type is `HolderOf(collection_id)`, then the owned
     * item_id from that collection needs to be provided within the witness data object. If
     * the mint price is set, then it should be additionally confirmed in the `witness_data`.
     *
     * Note: the deposit will be taken from the `origin` and not the `owner` of the `item`.
     *
     * Emits `Issued` event when successful.
     *
     * Weight: `O(1)`
     */
    "mint": {
        "collection": number;
        "item": number;
        "mint_to": MultiAddress;
        "witness_data"?: ({
            "owned_item"?: Anonymize<I4arjljr6dpflb>;
            "mint_price"?: Anonymize<I35p85j063s0il>;
        }) | undefined;
    };
    /**
     * Mint an item of a particular collection from a privileged origin.
     *
     * The origin must conform to `ForceOrigin` or must be `Signed` and the sender must be the
     * Issuer of the `collection`.
     *
     * - `collection`: The collection of the item to be minted.
     * - `item`: An identifier of the new item.
     * - `mint_to`: Account into which the item will be minted.
     * - `item_config`: A config of the new item.
     *
     * Emits `Issued` event when successful.
     *
     * Weight: `O(1)`
     */
    "force_mint": {
        "collection": number;
        "item": number;
        "mint_to": MultiAddress;
        "item_config": bigint;
    };
    /**
     * Destroy a single item.
     *
     * The origin must conform to `ForceOrigin` or must be Signed and the signing account must
     * be the owner of the `item`.
     *
     * - `collection`: The collection of the item to be burned.
     * - `item`: The item to be burned.
     *
     * Emits `Burned`.
     *
     * Weight: `O(1)`
     */
    "burn": Anonymize<Iafkqus0ohh6l6>;
    /**
     * Move an item from the sender account to another.
     *
     * Origin must be Signed and the signing account must be either:
     * - the Owner of the `item`;
     * - the approved delegate for the `item` (in this case, the approval is reset).
     *
     * Arguments:
     * - `collection`: The collection of the item to be transferred.
     * - `item`: The item to be transferred.
     * - `dest`: The account to receive ownership of the item.
     *
     * Emits `Transferred`.
     *
     * Weight: `O(1)`
     */
    "transfer": Anonymize<Ibgvkh96s68a66>;
    /**
     * Re-evaluate the deposits on some items.
     *
     * Origin must be Signed and the sender should be the Owner of the `collection`.
     *
     * - `collection`: The collection of the items to be reevaluated.
     * - `items`: The items of the collection whose deposits will be reevaluated.
     *
     * NOTE: This exists as a best-effort function. Any items which are unknown or
     * in the case that the owner account does not have reservable funds to pay for a
     * deposit increase are ignored. Generally the owner isn't going to call this on items
     * whose existing deposit is less than the refreshed deposit as it would only cost them,
     * so it's of little consequence.
     *
     * It will still return an error in the case that the collection is unknown or the signer
     * is not permitted to call it.
     *
     * Weight: `O(items.len())`
     */
    "redeposit": Anonymize<If9vko7pv0231m>;
    /**
     * Disallow further unprivileged transfer of an item.
     *
     * Origin must be Signed and the sender should be the Freezer of the `collection`.
     *
     * - `collection`: The collection of the item to be changed.
     * - `item`: The item to become non-transferable.
     *
     * Emits `ItemTransferLocked`.
     *
     * Weight: `O(1)`
     */
    "lock_item_transfer": Anonymize<Iafkqus0ohh6l6>;
    /**
     * Re-allow unprivileged transfer of an item.
     *
     * Origin must be Signed and the sender should be the Freezer of the `collection`.
     *
     * - `collection`: The collection of the item to be changed.
     * - `item`: The item to become transferable.
     *
     * Emits `ItemTransferUnlocked`.
     *
     * Weight: `O(1)`
     */
    "unlock_item_transfer": Anonymize<Iafkqus0ohh6l6>;
    /**
     * Disallows specified settings for the whole collection.
     *
     * Origin must be Signed and the sender should be the Owner of the `collection`.
     *
     * - `collection`: The collection to be locked.
     * - `lock_settings`: The settings to be locked.
     *
     * Note: it's possible to only lock(set) the setting, but not to unset it.
     *
     * Emits `CollectionLocked`.
     *
     * Weight: `O(1)`
     */
    "lock_collection": {
        "collection": number;
        "lock_settings": bigint;
    };
    /**
     * Change the Owner of a collection.
     *
     * Origin must be Signed and the sender should be the Owner of the `collection`.
     *
     * - `collection`: The collection whose owner should be changed.
     * - `owner`: The new Owner of this collection. They must have called
     * `set_accept_ownership` with `collection` in order for this operation to succeed.
     *
     * Emits `OwnerChanged`.
     *
     * Weight: `O(1)`
     */
    "transfer_ownership": Anonymize<I736lv5q9m5bot>;
    /**
     * Change the Issuer, Admin and Freezer of a collection.
     *
     * Origin must be either `ForceOrigin` or Signed and the sender should be the Owner of the
     * `collection`.
     *
     * Note: by setting the role to `None` only the `ForceOrigin` will be able to change it
     * after to `Some(account)`.
     *
     * - `collection`: The collection whose team should be changed.
     * - `issuer`: The new Issuer of this collection.
     * - `admin`: The new Admin of this collection.
     * - `freezer`: The new Freezer of this collection.
     *
     * Emits `TeamChanged`.
     *
     * Weight: `O(1)`
     */
    "set_team": {
        "collection": number;
        "issuer"?: Anonymize<Ia0jlc0rcbskuk>;
        "admin"?: Anonymize<Ia0jlc0rcbskuk>;
        "freezer"?: Anonymize<Ia0jlc0rcbskuk>;
    };
    /**
     * Change the Owner of a collection.
     *
     * Origin must be `ForceOrigin`.
     *
     * - `collection`: The identifier of the collection.
     * - `owner`: The new Owner of this collection.
     *
     * Emits `OwnerChanged`.
     *
     * Weight: `O(1)`
     */
    "force_collection_owner": {
        "collection": number;
        "owner": MultiAddress;
    };
    /**
     * Change the config of a collection.
     *
     * Origin must be `ForceOrigin`.
     *
     * - `collection`: The identifier of the collection.
     * - `config`: The new config of this collection.
     *
     * Emits `CollectionConfigChanged`.
     *
     * Weight: `O(1)`
     */
    "force_collection_config": {
        "collection": number;
        "config": Anonymize<I72ndo6phms8ik>;
    };
    /**
     * Approve an item to be transferred by a delegated third-party account.
     *
     * Origin must be either `ForceOrigin` or Signed and the sender should be the Owner of the
     * `item`.
     *
     * - `collection`: The collection of the item to be approved for delegated transfer.
     * - `item`: The item to be approved for delegated transfer.
     * - `delegate`: The account to delegate permission to transfer the item.
     * - `maybe_deadline`: Optional deadline for the approval. Specified by providing the
     * number of blocks after which the approval will expire
     *
     * Emits `TransferApproved` on success.
     *
     * Weight: `O(1)`
     */
    "approve_transfer": {
        "collection": number;
        "item": number;
        "delegate": MultiAddress;
        "maybe_deadline"?: Anonymize<I4arjljr6dpflb>;
    };
    /**
     * Cancel one of the transfer approvals for a specific item.
     *
     * Origin must be either:
     * - the `Force` origin;
     * - `Signed` with the signer being the Owner of the `item`;
     *
     * Arguments:
     * - `collection`: The collection of the item of whose approval will be cancelled.
     * - `item`: The item of the collection of whose approval will be cancelled.
     * - `delegate`: The account that is going to loose their approval.
     *
     * Emits `ApprovalCancelled` on success.
     *
     * Weight: `O(1)`
     */
    "cancel_approval": Anonymize<Ib92t90p616grb>;
    /**
     * Cancel all the approvals of a specific item.
     *
     * Origin must be either:
     * - the `Force` origin;
     * - `Signed` with the signer being the Owner of the `item`;
     *
     * Arguments:
     * - `collection`: The collection of the item of whose approvals will be cleared.
     * - `item`: The item of the collection of whose approvals will be cleared.
     *
     * Emits `AllApprovalsCancelled` on success.
     *
     * Weight: `O(1)`
     */
    "clear_all_transfer_approvals": Anonymize<Iafkqus0ohh6l6>;
    /**
     * Disallows changing the metadata or attributes of the item.
     *
     * Origin must be either `ForceOrigin` or Signed and the sender should be the Admin
     * of the `collection`.
     *
     * - `collection`: The collection if the `item`.
     * - `item`: An item to be locked.
     * - `lock_metadata`: Specifies whether the metadata should be locked.
     * - `lock_attributes`: Specifies whether the attributes in the `CollectionOwner` namespace
     * should be locked.
     *
     * Note: `lock_attributes` affects the attributes in the `CollectionOwner` namespace only.
     * When the metadata or attributes are locked, it won't be possible the unlock them.
     *
     * Emits `ItemPropertiesLocked`.
     *
     * Weight: `O(1)`
     */
    "lock_item_properties": {
        "collection": number;
        "item": number;
        "lock_metadata": boolean;
        "lock_attributes": boolean;
    };
    /**
     * Set an attribute for a collection or item.
     *
     * Origin must be Signed and must conform to the namespace ruleset:
     * - `CollectionOwner` namespace could be modified by the `collection` Admin only;
     * - `ItemOwner` namespace could be modified by the `maybe_item` owner only. `maybe_item`
     * should be set in that case;
     * - `Account(AccountId)` namespace could be modified only when the `origin` was given a
     * permission to do so;
     *
     * The funds of `origin` are reserved according to the formula:
     * `AttributeDepositBase + DepositPerByte * (key.len + value.len)` taking into
     * account any already reserved funds.
     *
     * - `collection`: The identifier of the collection whose item's metadata to set.
     * - `maybe_item`: The identifier of the item whose metadata to set.
     * - `namespace`: Attribute's namespace.
     * - `key`: The key of the attribute.
     * - `value`: The value to which to set the attribute.
     *
     * Emits `AttributeSet`.
     *
     * Weight: `O(1)`
     */
    "set_attribute": {
        "collection": number;
        "maybe_item"?: Anonymize<I4arjljr6dpflb>;
        "namespace": Anonymize<If3jjadhmug6qc>;
        "key": Binary;
        "value": Binary;
    };
    /**
     * Force-set an attribute for a collection or item.
     *
     * Origin must be `ForceOrigin`.
     *
     * If the attribute already exists and it was set by another account, the deposit
     * will be returned to the previous owner.
     *
     * - `set_as`: An optional owner of the attribute.
     * - `collection`: The identifier of the collection whose item's metadata to set.
     * - `maybe_item`: The identifier of the item whose metadata to set.
     * - `namespace`: Attribute's namespace.
     * - `key`: The key of the attribute.
     * - `value`: The value to which to set the attribute.
     *
     * Emits `AttributeSet`.
     *
     * Weight: `O(1)`
     */
    "force_set_attribute": {
        "set_as"?: Anonymize<Ihfphjolmsqq1>;
        "collection": number;
        "maybe_item"?: Anonymize<I4arjljr6dpflb>;
        "namespace": Anonymize<If3jjadhmug6qc>;
        "key": Binary;
        "value": Binary;
    };
    /**
     * Clear an attribute for a collection or item.
     *
     * Origin must be either `ForceOrigin` or Signed and the sender should be the Owner of the
     * attribute.
     *
     * Any deposit is freed for the collection's owner.
     *
     * - `collection`: The identifier of the collection whose item's metadata to clear.
     * - `maybe_item`: The identifier of the item whose metadata to clear.
     * - `namespace`: Attribute's namespace.
     * - `key`: The key of the attribute.
     *
     * Emits `AttributeCleared`.
     *
     * Weight: `O(1)`
     */
    "clear_attribute": {
        "collection": number;
        "maybe_item"?: Anonymize<I4arjljr6dpflb>;
        "namespace": Anonymize<If3jjadhmug6qc>;
        "key": Binary;
    };
    /**
     * Approve item's attributes to be changed by a delegated third-party account.
     *
     * Origin must be Signed and must be an owner of the `item`.
     *
     * - `collection`: A collection of the item.
     * - `item`: The item that holds attributes.
     * - `delegate`: The account to delegate permission to change attributes of the item.
     *
     * Emits `ItemAttributesApprovalAdded` on success.
     */
    "approve_item_attributes": Anonymize<Ib92t90p616grb>;
    /**
     * Cancel the previously provided approval to change item's attributes.
     * All the previously set attributes by the `delegate` will be removed.
     *
     * Origin must be Signed and must be an owner of the `item`.
     *
     * - `collection`: Collection that the item is contained within.
     * - `item`: The item that holds attributes.
     * - `delegate`: The previously approved account to remove.
     *
     * Emits `ItemAttributesApprovalRemoved` on success.
     */
    "cancel_item_attributes_approval": {
        "collection": number;
        "item": number;
        "delegate": MultiAddress;
        "witness": number;
    };
    /**
     * Set the metadata for an item.
     *
     * Origin must be either `ForceOrigin` or Signed and the sender should be the Admin of the
     * `collection`.
     *
     * If the origin is Signed, then funds of signer are reserved according to the formula:
     * `MetadataDepositBase + DepositPerByte * data.len` taking into
     * account any already reserved funds.
     *
     * - `collection`: The identifier of the collection whose item's metadata to set.
     * - `item`: The identifier of the item whose metadata to set.
     * - `data`: The general information of this item. Limited in length by `StringLimit`.
     *
     * Emits `ItemMetadataSet`.
     *
     * Weight: `O(1)`
     */
    "set_metadata": {
        "collection": number;
        "item": number;
        "data": Binary;
    };
    /**
     * Clear the metadata for an item.
     *
     * Origin must be either `ForceOrigin` or Signed and the sender should be the Admin of the
     * `collection`.
     *
     * Any deposit is freed for the collection's owner.
     *
     * - `collection`: The identifier of the collection whose item's metadata to clear.
     * - `item`: The identifier of the item whose metadata to clear.
     *
     * Emits `ItemMetadataCleared`.
     *
     * Weight: `O(1)`
     */
    "clear_metadata": Anonymize<Iafkqus0ohh6l6>;
    /**
     * Set the metadata for a collection.
     *
     * Origin must be either `ForceOrigin` or `Signed` and the sender should be the Admin of
     * the `collection`.
     *
     * If the origin is `Signed`, then funds of signer are reserved according to the formula:
     * `MetadataDepositBase + DepositPerByte * data.len` taking into
     * account any already reserved funds.
     *
     * - `collection`: The identifier of the item whose metadata to update.
     * - `data`: The general information of this item. Limited in length by `StringLimit`.
     *
     * Emits `CollectionMetadataSet`.
     *
     * Weight: `O(1)`
     */
    "set_collection_metadata": {
        "collection": number;
        "data": Binary;
    };
    /**
     * Clear the metadata for a collection.
     *
     * Origin must be either `ForceOrigin` or `Signed` and the sender should be the Admin of
     * the `collection`.
     *
     * Any deposit is freed for the collection's owner.
     *
     * - `collection`: The identifier of the collection whose metadata to clear.
     *
     * Emits `CollectionMetadataCleared`.
     *
     * Weight: `O(1)`
     */
    "clear_collection_metadata": Anonymize<I6cu7obfo0rr0o>;
    /**
     * Set (or reset) the acceptance of ownership for a particular account.
     *
     * Origin must be `Signed` and if `maybe_collection` is `Some`, then the signer must have a
     * provider reference.
     *
     * - `maybe_collection`: The identifier of the collection whose ownership the signer is
     * willing to accept, or if `None`, an indication that the signer is willing to accept no
     * ownership transferal.
     *
     * Emits `OwnershipAcceptanceChanged`.
     */
    "set_accept_ownership": Anonymize<Ibqooroq6rr5kr>;
    /**
     * Set the maximum number of items a collection could have.
     *
     * Origin must be either `ForceOrigin` or `Signed` and the sender should be the Owner of
     * the `collection`.
     *
     * - `collection`: The identifier of the collection to change.
     * - `max_supply`: The maximum number of items a collection could have.
     *
     * Emits `CollectionMaxSupplySet` event when successful.
     */
    "set_collection_max_supply": Anonymize<I6h88h8vba22v8>;
    /**
     * Update mint settings.
     *
     * Origin must be either `ForceOrigin` or `Signed` and the sender should be the Issuer
     * of the `collection`.
     *
     * - `collection`: The identifier of the collection to change.
     * - `mint_settings`: The new mint settings.
     *
     * Emits `CollectionMintSettingsUpdated` event when successful.
     */
    "update_mint_settings": {
        "collection": number;
        "mint_settings": Anonymize<Ia3s8qquibn97v>;
    };
    /**
     * Set (or reset) the price for an item.
     *
     * Origin must be Signed and must be the owner of the `item`.
     *
     * - `collection`: The collection of the item.
     * - `item`: The item to set the price for.
     * - `price`: The price for the item. Pass `None`, to reset the price.
     * - `buyer`: Restricts the buy operation to a specific account.
     *
     * Emits `ItemPriceSet` on success if the price is not `None`.
     * Emits `ItemPriceRemoved` on success if the price is `None`.
     */
    "set_price": Anonymize<Ia9cd4jqb5eecb>;
    /**
     * Allows to buy an item if it's up for sale.
     *
     * Origin must be Signed and must not be the owner of the `item`.
     *
     * - `collection`: The collection of the item.
     * - `item`: The item the sender wants to buy.
     * - `bid_price`: The price the sender is willing to pay.
     *
     * Emits `ItemBought` on success.
     */
    "buy_item": Anonymize<I19jiel1ftbcce>;
    /**
     * Allows to pay the tips.
     *
     * Origin must be Signed.
     *
     * - `tips`: Tips array.
     *
     * Emits `TipSent` on every tip transfer.
     */
    "pay_tips": {
        "tips": Array<{
            "collection": number;
            "item": number;
            "receiver": SS58String;
            "amount": bigint;
        }>;
    };
    /**
     * Register a new atomic swap, declaring an intention to send an `item` in exchange for
     * `desired_item` from origin to target on the current blockchain.
     * The target can execute the swap during the specified `duration` of blocks (if set).
     * Additionally, the price could be set for the desired `item`.
     *
     * Origin must be Signed and must be an owner of the `item`.
     *
     * - `collection`: The collection of the item.
     * - `item`: The item an owner wants to give.
     * - `desired_collection`: The collection of the desired item.
     * - `desired_item`: The desired item an owner wants to receive.
     * - `maybe_price`: The price an owner is willing to pay or receive for the desired `item`.
     * - `duration`: A deadline for the swap. Specified by providing the number of blocks
     * after which the swap will expire.
     *
     * Emits `SwapCreated` on success.
     */
    "create_swap": {
        "offered_collection": number;
        "offered_item": number;
        "desired_collection": number;
        "maybe_desired_item"?: Anonymize<I4arjljr6dpflb>;
        "maybe_price"?: Anonymize<I6oogc1jbmmi81>;
        "duration": number;
    };
    /**
     * Cancel an atomic swap.
     *
     * Origin must be Signed.
     * Origin must be an owner of the `item` if the deadline hasn't expired.
     *
     * - `collection`: The collection of the item.
     * - `item`: The item an owner wants to give.
     *
     * Emits `SwapCancelled` on success.
     */
    "cancel_swap": {
        "offered_collection": number;
        "offered_item": number;
    };
    /**
     * Claim an atomic swap.
     * This method executes a pending swap, that was created by a counterpart before.
     *
     * Origin must be Signed and must be an owner of the `item`.
     *
     * - `send_collection`: The collection of the item to be sent.
     * - `send_item`: The item to be sent.
     * - `receive_collection`: The collection of the item to be received.
     * - `receive_item`: The item to be received.
     * - `witness_price`: A price that was previously agreed on.
     *
     * Emits `SwapClaimed` on success.
     */
    "claim_swap": {
        "send_collection": number;
        "send_item": number;
        "receive_collection": number;
        "receive_item": number;
        "witness_price"?: Anonymize<I6oogc1jbmmi81>;
    };
    /**
     * Mint an item by providing the pre-signed approval.
     *
     * Origin must be Signed.
     *
     * - `mint_data`: The pre-signed approval that consists of the information about the item,
     * its metadata, attributes, who can mint it (`None` for anyone) and until what block
     * number.
     * - `signature`: The signature of the `data` object.
     * - `signer`: The `data` object's signer. Should be an Issuer of the collection.
     *
     * Emits `Issued` on success.
     * Emits `AttributeSet` if the attributes were provided.
     * Emits `ItemMetadataSet` if the metadata was not empty.
     */
    "mint_pre_signed": {
        "mint_data": {
            "collection": number;
            "item": number;
            "attributes": Anonymize<I6pi5ou8r1hblk>;
            "metadata": Binary;
            "only_account"?: Anonymize<Ihfphjolmsqq1>;
            "deadline": number;
            "mint_price"?: Anonymize<I35p85j063s0il>;
        };
        "signature": MultiSignature;
        "signer": SS58String;
    };
    /**
     * Set attributes for an item by providing the pre-signed approval.
     *
     * Origin must be Signed and must be an owner of the `data.item`.
     *
     * - `data`: The pre-signed approval that consists of the information about the item,
     * attributes to update and until what block number.
     * - `signature`: The signature of the `data` object.
     * - `signer`: The `data` object's signer. Should be an Admin of the collection for the
     * `CollectionOwner` namespace.
     *
     * Emits `AttributeSet` for each provided attribute.
     * Emits `ItemAttributesApprovalAdded` if the approval wasn't set before.
     * Emits `PreSignedAttributesSet` on success.
     */
    "set_attributes_pre_signed": {
        "data": {
            "collection": number;
            "item": number;
            "attributes": Anonymize<I6pi5ou8r1hblk>;
            "namespace": Anonymize<If3jjadhmug6qc>;
            "deadline": number;
        };
        "signature": MultiSignature;
        "signer": SS58String;
    };
}>;
export type I72ndo6phms8ik = {
    "settings": bigint;
    "max_supply"?: Anonymize<I4arjljr6dpflb>;
    "mint_settings": Anonymize<Ia3s8qquibn97v>;
};
export type Ia3s8qquibn97v = {
    "mint_type": Enum<{
        "Issuer": undefined;
        "Public": undefined;
        "HolderOf": number;
    }>;
    "price"?: Anonymize<I35p85j063s0il>;
    "start_block"?: Anonymize<I4arjljr6dpflb>;
    "end_block"?: Anonymize<I4arjljr6dpflb>;
    "default_item_settings": bigint;
};
export type If3jjadhmug6qc = AnonymousEnum<{
    "Pallet": undefined;
    "CollectionOwner": undefined;
    "ItemOwner": undefined;
    "Account": SS58String;
}>;
export type I6oogc1jbmmi81 = ({
    "amount": bigint;
    "direction": Enum<{
        "Send": undefined;
        "Receive": undefined;
    }>;
}) | undefined;
export type I1botoq1mmhfag = AnonymousEnum<{
    /**
     * Issue a new class of fungible assets from a public origin.
     *
     * This new asset class has no assets initially and its owner is the origin.
     *
     * The origin must conform to the configured `CreateOrigin` and have sufficient funds free.
     *
     * Funds of sender are reserved by `AssetDeposit`.
     *
     * Parameters:
     * - `id`: The identifier of the new asset. This must not be currently in use to identify
     * an existing asset. If [`NextAssetId`] is set, then this must be equal to it.
     * - `admin`: The admin of this class of assets. The admin is the initial address of each
     * member of the asset class's admin team.
     * - `min_balance`: The minimum balance of this new asset that any single account must
     * have. If an account's balance is reduced below this, then it collapses to zero.
     *
     * Emits `Created` event when successful.
     *
     * Weight: `O(1)`
     */
    "create": {
        "id": Anonymize<If9iqq7i64mur8>;
        "admin": MultiAddress;
        "min_balance": bigint;
    };
    /**
     * Issue a new class of fungible assets from a privileged origin.
     *
     * This new asset class has no assets initially.
     *
     * The origin must conform to `ForceOrigin`.
     *
     * Unlike `create`, no funds are reserved.
     *
     * - `id`: The identifier of the new asset. This must not be currently in use to identify
     * an existing asset. If [`NextAssetId`] is set, then this must be equal to it.
     * - `owner`: The owner of this class of assets. The owner has full superuser permissions
     * over this asset, but may later change and configure the permissions using
     * `transfer_ownership` and `set_team`.
     * - `min_balance`: The minimum balance of this new asset that any single account must
     * have. If an account's balance is reduced below this, then it collapses to zero.
     *
     * Emits `ForceCreated` event when successful.
     *
     * Weight: `O(1)`
     */
    "force_create": {
        "id": Anonymize<If9iqq7i64mur8>;
        "owner": MultiAddress;
        "is_sufficient": boolean;
        "min_balance": bigint;
    };
    /**
     * Start the process of destroying a fungible asset class.
     *
     * `start_destroy` is the first in a series of extrinsics that should be called, to allow
     * destruction of an asset class.
     *
     * The origin must conform to `ForceOrigin` or must be `Signed` by the asset's `owner`.
     *
     * - `id`: The identifier of the asset to be destroyed. This must identify an existing
     * asset.
     *
     * It will fail with either [`Error::ContainsHolds`] or [`Error::ContainsFreezes`] if
     * an account contains holds or freezes in place.
     */
    "start_destroy": {
        "id": Anonymize<If9iqq7i64mur8>;
    };
    /**
     * Destroy all accounts associated with a given asset.
     *
     * `destroy_accounts` should only be called after `start_destroy` has been called, and the
     * asset is in a `Destroying` state.
     *
     * Due to weight restrictions, this function may need to be called multiple times to fully
     * destroy all accounts. It will destroy `RemoveItemsLimit` accounts at a time.
     *
     * - `id`: The identifier of the asset to be destroyed. This must identify an existing
     * asset.
     *
     * Each call emits the `Event::DestroyedAccounts` event.
     */
    "destroy_accounts": {
        "id": Anonymize<If9iqq7i64mur8>;
    };
    /**
     * Destroy all approvals associated with a given asset up to the max (T::RemoveItemsLimit).
     *
     * `destroy_approvals` should only be called after `start_destroy` has been called, and the
     * asset is in a `Destroying` state.
     *
     * Due to weight restrictions, this function may need to be called multiple times to fully
     * destroy all approvals. It will destroy `RemoveItemsLimit` approvals at a time.
     *
     * - `id`: The identifier of the asset to be destroyed. This must identify an existing
     * asset.
     *
     * Each call emits the `Event::DestroyedApprovals` event.
     */
    "destroy_approvals": {
        "id": Anonymize<If9iqq7i64mur8>;
    };
    /**
     * Complete destroying asset and unreserve currency.
     *
     * `finish_destroy` should only be called after `start_destroy` has been called, and the
     * asset is in a `Destroying` state. All accounts or approvals should be destroyed before
     * hand.
     *
     * - `id`: The identifier of the asset to be destroyed. This must identify an existing
     * asset.
     *
     * Each successful call emits the `Event::Destroyed` event.
     */
    "finish_destroy": {
        "id": Anonymize<If9iqq7i64mur8>;
    };
    /**
     * Mint assets of a particular class.
     *
     * The origin must be Signed and the sender must be the Issuer of the asset `id`.
     *
     * - `id`: The identifier of the asset to have some amount minted.
     * - `beneficiary`: The account to be credited with the minted assets.
     * - `amount`: The amount of the asset to be minted.
     *
     * Emits `Issued` event when successful.
     *
     * Weight: `O(1)`
     * Modes: Pre-existing balance of `beneficiary`; Account pre-existence of `beneficiary`.
     */
    "mint": {
        "id": Anonymize<If9iqq7i64mur8>;
        "beneficiary": MultiAddress;
        "amount": bigint;
    };
    /**
     * Reduce the balance of `who` by as much as possible up to `amount` assets of `id`.
     *
     * Origin must be Signed and the sender should be the Manager of the asset `id`.
     *
     * Bails with `NoAccount` if the `who` is already dead.
     *
     * - `id`: The identifier of the asset to have some amount burned.
     * - `who`: The account to be debited from.
     * - `amount`: The maximum amount by which `who`'s balance should be reduced.
     *
     * Emits `Burned` with the actual amount burned. If this takes the balance to below the
     * minimum for the asset, then the amount burned is increased to take it to zero.
     *
     * Weight: `O(1)`
     * Modes: Post-existence of `who`; Pre & post Zombie-status of `who`.
     */
    "burn": {
        "id": Anonymize<If9iqq7i64mur8>;
        "who": MultiAddress;
        "amount": bigint;
    };
    /**
     * Move some assets from the sender account to another.
     *
     * Origin must be Signed.
     *
     * - `id`: The identifier of the asset to have some amount transferred.
     * - `target`: The account to be credited.
     * - `amount`: The amount by which the sender's balance of assets should be reduced and
     * `target`'s balance increased. The amount actually transferred may be slightly greater in
     * the case that the transfer would otherwise take the sender balance above zero but below
     * the minimum balance. Must be greater than zero.
     *
     * Emits `Transferred` with the actual amount transferred. If this takes the source balance
     * to below the minimum for the asset, then the amount transferred is increased to take it
     * to zero.
     *
     * Weight: `O(1)`
     * Modes: Pre-existence of `target`; Post-existence of sender; Account pre-existence of
     * `target`.
     */
    "transfer": {
        "id": Anonymize<If9iqq7i64mur8>;
        "target": MultiAddress;
        "amount": bigint;
    };
    /**
     * Move some assets from the sender account to another, keeping the sender account alive.
     *
     * Origin must be Signed.
     *
     * - `id`: The identifier of the asset to have some amount transferred.
     * - `target`: The account to be credited.
     * - `amount`: The amount by which the sender's balance of assets should be reduced and
     * `target`'s balance increased. The amount actually transferred may be slightly greater in
     * the case that the transfer would otherwise take the sender balance above zero but below
     * the minimum balance. Must be greater than zero.
     *
     * Emits `Transferred` with the actual amount transferred. If this takes the source balance
     * to below the minimum for the asset, then the amount transferred is increased to take it
     * to zero.
     *
     * Weight: `O(1)`
     * Modes: Pre-existence of `target`; Post-existence of sender; Account pre-existence of
     * `target`.
     */
    "transfer_keep_alive": {
        "id": Anonymize<If9iqq7i64mur8>;
        "target": MultiAddress;
        "amount": bigint;
    };
    /**
     * Move some assets from one account to another.
     *
     * Origin must be Signed and the sender should be the Admin of the asset `id`.
     *
     * - `id`: The identifier of the asset to have some amount transferred.
     * - `source`: The account to be debited.
     * - `dest`: The account to be credited.
     * - `amount`: The amount by which the `source`'s balance of assets should be reduced and
     * `dest`'s balance increased. The amount actually transferred may be slightly greater in
     * the case that the transfer would otherwise take the `source` balance above zero but
     * below the minimum balance. Must be greater than zero.
     *
     * Emits `Transferred` with the actual amount transferred. If this takes the source balance
     * to below the minimum for the asset, then the amount transferred is increased to take it
     * to zero.
     *
     * Weight: `O(1)`
     * Modes: Pre-existence of `dest`; Post-existence of `source`; Account pre-existence of
     * `dest`.
     */
    "force_transfer": {
        "id": Anonymize<If9iqq7i64mur8>;
        "source": MultiAddress;
        "dest": MultiAddress;
        "amount": bigint;
    };
    /**
     * Disallow further unprivileged transfers of an asset `id` from an account `who`. `who`
     * must already exist as an entry in `Account`s of the asset. If you want to freeze an
     * account that does not have an entry, use `touch_other` first.
     *
     * Origin must be Signed and the sender should be the Freezer of the asset `id`.
     *
     * - `id`: The identifier of the asset to be frozen.
     * - `who`: The account to be frozen.
     *
     * Emits `Frozen`.
     *
     * Weight: `O(1)`
     */
    "freeze": {
        "id": Anonymize<If9iqq7i64mur8>;
        "who": MultiAddress;
    };
    /**
     * Allow unprivileged transfers to and from an account again.
     *
     * Origin must be Signed and the sender should be the Admin of the asset `id`.
     *
     * - `id`: The identifier of the asset to be frozen.
     * - `who`: The account to be unfrozen.
     *
     * Emits `Thawed`.
     *
     * Weight: `O(1)`
     */
    "thaw": {
        "id": Anonymize<If9iqq7i64mur8>;
        "who": MultiAddress;
    };
    /**
     * Disallow further unprivileged transfers for the asset class.
     *
     * Origin must be Signed and the sender should be the Freezer of the asset `id`.
     *
     * - `id`: The identifier of the asset to be frozen.
     *
     * Emits `Frozen`.
     *
     * Weight: `O(1)`
     */
    "freeze_asset": {
        "id": Anonymize<If9iqq7i64mur8>;
    };
    /**
     * Allow unprivileged transfers for the asset again.
     *
     * Origin must be Signed and the sender should be the Admin of the asset `id`.
     *
     * - `id`: The identifier of the asset to be thawed.
     *
     * Emits `Thawed`.
     *
     * Weight: `O(1)`
     */
    "thaw_asset": {
        "id": Anonymize<If9iqq7i64mur8>;
    };
    /**
     * Change the Owner of an asset.
     *
     * Origin must be Signed and the sender should be the Owner of the asset `id`.
     *
     * - `id`: The identifier of the asset.
     * - `owner`: The new Owner of this asset.
     *
     * Emits `OwnerChanged`.
     *
     * Weight: `O(1)`
     */
    "transfer_ownership": {
        "id": Anonymize<If9iqq7i64mur8>;
        "owner": MultiAddress;
    };
    /**
     * Change the Issuer, Admin and Freezer of an asset.
     *
     * Origin must be Signed and the sender should be the Owner of the asset `id`.
     *
     * - `id`: The identifier of the asset to be frozen.
     * - `issuer`: The new Issuer of this asset.
     * - `admin`: The new Admin of this asset.
     * - `freezer`: The new Freezer of this asset.
     *
     * Emits `TeamChanged`.
     *
     * Weight: `O(1)`
     */
    "set_team": {
        "id": Anonymize<If9iqq7i64mur8>;
        "issuer": MultiAddress;
        "admin": MultiAddress;
        "freezer": MultiAddress;
    };
    /**
     * Set the metadata for an asset.
     *
     * Origin must be Signed and the sender should be the Owner of the asset `id`.
     *
     * Funds of sender are reserved according to the formula:
     * `MetadataDepositBase + MetadataDepositPerByte * (name.len + symbol.len)` taking into
     * account any already reserved funds.
     *
     * - `id`: The identifier of the asset to update.
     * - `name`: The user friendly name of this asset. Limited in length by `StringLimit`.
     * - `symbol`: The exchange symbol for this asset. Limited in length by `StringLimit`.
     * - `decimals`: The number of decimals this asset uses to represent one unit.
     *
     * Emits `MetadataSet`.
     *
     * Weight: `O(1)`
     */
    "set_metadata": {
        "id": Anonymize<If9iqq7i64mur8>;
        "name": Binary;
        "symbol": Binary;
        "decimals": number;
    };
    /**
     * Clear the metadata for an asset.
     *
     * Origin must be Signed and the sender should be the Owner of the asset `id`.
     *
     * Any deposit is freed for the asset owner.
     *
     * - `id`: The identifier of the asset to clear.
     *
     * Emits `MetadataCleared`.
     *
     * Weight: `O(1)`
     */
    "clear_metadata": {
        "id": Anonymize<If9iqq7i64mur8>;
    };
    /**
     * Force the metadata for an asset to some value.
     *
     * Origin must be ForceOrigin.
     *
     * Any deposit is left alone.
     *
     * - `id`: The identifier of the asset to update.
     * - `name`: The user friendly name of this asset. Limited in length by `StringLimit`.
     * - `symbol`: The exchange symbol for this asset. Limited in length by `StringLimit`.
     * - `decimals`: The number of decimals this asset uses to represent one unit.
     *
     * Emits `MetadataSet`.
     *
     * Weight: `O(N + S)` where N and S are the length of the name and symbol respectively.
     */
    "force_set_metadata": {
        "id": Anonymize<If9iqq7i64mur8>;
        "name": Binary;
        "symbol": Binary;
        "decimals": number;
        "is_frozen": boolean;
    };
    /**
     * Clear the metadata for an asset.
     *
     * Origin must be ForceOrigin.
     *
     * Any deposit is returned.
     *
     * - `id`: The identifier of the asset to clear.
     *
     * Emits `MetadataCleared`.
     *
     * Weight: `O(1)`
     */
    "force_clear_metadata": {
        "id": Anonymize<If9iqq7i64mur8>;
    };
    /**
     * Alter the attributes of a given asset.
     *
     * Origin must be `ForceOrigin`.
     *
     * - `id`: The identifier of the asset.
     * - `owner`: The new Owner of this asset.
     * - `issuer`: The new Issuer of this asset.
     * - `admin`: The new Admin of this asset.
     * - `freezer`: The new Freezer of this asset.
     * - `min_balance`: The minimum balance of this new asset that any single account must
     * have. If an account's balance is reduced below this, then it collapses to zero.
     * - `is_sufficient`: Whether a non-zero balance of this asset is deposit of sufficient
     * value to account for the state bloat associated with its balance storage. If set to
     * `true`, then non-zero balances may be stored without a `consumer` reference (and thus
     * an ED in the Balances pallet or whatever else is used to control user-account state
     * growth).
     * - `is_frozen`: Whether this asset class is frozen except for permissioned/admin
     * instructions.
     *
     * Emits `AssetStatusChanged` with the identity of the asset.
     *
     * Weight: `O(1)`
     */
    "force_asset_status": {
        "id": Anonymize<If9iqq7i64mur8>;
        "owner": MultiAddress;
        "issuer": MultiAddress;
        "admin": MultiAddress;
        "freezer": MultiAddress;
        "min_balance": bigint;
        "is_sufficient": boolean;
        "is_frozen": boolean;
    };
    /**
     * Approve an amount of asset for transfer by a delegated third-party account.
     *
     * Origin must be Signed.
     *
     * Ensures that `ApprovalDeposit` worth of `Currency` is reserved from signing account
     * for the purpose of holding the approval. If some non-zero amount of assets is already
     * approved from signing account to `delegate`, then it is topped up or unreserved to
     * meet the right value.
     *
     * NOTE: The signing account does not need to own `amount` of assets at the point of
     * making this call.
     *
     * - `id`: The identifier of the asset.
     * - `delegate`: The account to delegate permission to transfer asset.
     * - `amount`: The amount of asset that may be transferred by `delegate`. If there is
     * already an approval in place, then this acts additively.
     *
     * Emits `ApprovedTransfer` on success.
     *
     * Weight: `O(1)`
     */
    "approve_transfer": {
        "id": Anonymize<If9iqq7i64mur8>;
        "delegate": MultiAddress;
        "amount": bigint;
    };
    /**
     * Cancel all of some asset approved for delegated transfer by a third-party account.
     *
     * Origin must be Signed and there must be an approval in place between signer and
     * `delegate`.
     *
     * Unreserves any deposit previously reserved by `approve_transfer` for the approval.
     *
     * - `id`: The identifier of the asset.
     * - `delegate`: The account delegated permission to transfer asset.
     *
     * Emits `ApprovalCancelled` on success.
     *
     * Weight: `O(1)`
     */
    "cancel_approval": {
        "id": Anonymize<If9iqq7i64mur8>;
        "delegate": MultiAddress;
    };
    /**
     * Cancel all of some asset approved for delegated transfer by a third-party account.
     *
     * Origin must be either ForceOrigin or Signed origin with the signer being the Admin
     * account of the asset `id`.
     *
     * Unreserves any deposit previously reserved by `approve_transfer` for the approval.
     *
     * - `id`: The identifier of the asset.
     * - `delegate`: The account delegated permission to transfer asset.
     *
     * Emits `ApprovalCancelled` on success.
     *
     * Weight: `O(1)`
     */
    "force_cancel_approval": {
        "id": Anonymize<If9iqq7i64mur8>;
        "owner": MultiAddress;
        "delegate": MultiAddress;
    };
    /**
     * Transfer some asset balance from a previously delegated account to some third-party
     * account.
     *
     * Origin must be Signed and there must be an approval in place by the `owner` to the
     * signer.
     *
     * If the entire amount approved for transfer is transferred, then any deposit previously
     * reserved by `approve_transfer` is unreserved.
     *
     * - `id`: The identifier of the asset.
     * - `owner`: The account which previously approved for a transfer of at least `amount` and
     * from which the asset balance will be withdrawn.
     * - `destination`: The account to which the asset balance of `amount` will be transferred.
     * - `amount`: The amount of assets to transfer.
     *
     * Emits `TransferredApproved` on success.
     *
     * Weight: `O(1)`
     */
    "transfer_approved": {
        "id": Anonymize<If9iqq7i64mur8>;
        "owner": MultiAddress;
        "destination": MultiAddress;
        "amount": bigint;
    };
    /**
     * Create an asset account for non-provider assets.
     *
     * A deposit will be taken from the signer account.
     *
     * - `origin`: Must be Signed; the signer account must have sufficient funds for a deposit
     * to be taken.
     * - `id`: The identifier of the asset for the account to be created.
     *
     * Emits `Touched` event when successful.
     */
    "touch": {
        "id": Anonymize<If9iqq7i64mur8>;
    };
    /**
     * Return the deposit (if any) of an asset account or a consumer reference (if any) of an
     * account.
     *
     * The origin must be Signed.
     *
     * - `id`: The identifier of the asset for which the caller would like the deposit
     * refunded.
     * - `allow_burn`: If `true` then assets may be destroyed in order to complete the refund.
     *
     * It will fail with either [`Error::ContainsHolds`] or [`Error::ContainsFreezes`] if
     * the asset account contains holds or freezes in place.
     *
     * Emits `Refunded` event when successful.
     */
    "refund": {
        "id": Anonymize<If9iqq7i64mur8>;
        "allow_burn": boolean;
    };
    /**
     * Sets the minimum balance of an asset.
     *
     * Only works if there aren't any accounts that are holding the asset or if
     * the new value of `min_balance` is less than the old one.
     *
     * Origin must be Signed and the sender has to be the Owner of the
     * asset `id`.
     *
     * - `id`: The identifier of the asset.
     * - `min_balance`: The new value of `min_balance`.
     *
     * Emits `AssetMinBalanceChanged` event when successful.
     */
    "set_min_balance": {
        "id": Anonymize<If9iqq7i64mur8>;
        "min_balance": bigint;
    };
    /**
     * Create an asset account for `who`.
     *
     * A deposit will be taken from the signer account.
     *
     * - `origin`: Must be Signed by `Freezer` or `Admin` of the asset `id`; the signer account
     * must have sufficient funds for a deposit to be taken.
     * - `id`: The identifier of the asset for the account to be created.
     * - `who`: The account to be created.
     *
     * Emits `Touched` event when successful.
     */
    "touch_other": {
        "id": Anonymize<If9iqq7i64mur8>;
        "who": MultiAddress;
    };
    /**
     * Return the deposit (if any) of a target asset account. Useful if you are the depositor.
     *
     * The origin must be Signed and either the account owner, depositor, or asset `Admin`. In
     * order to burn a non-zero balance of the asset, the caller must be the account and should
     * use `refund`.
     *
     * - `id`: The identifier of the asset for the account holding a deposit.
     * - `who`: The account to refund.
     *
     * It will fail with either [`Error::ContainsHolds`] or [`Error::ContainsFreezes`] if
     * the asset account contains holds or freezes in place.
     *
     * Emits `Refunded` event when successful.
     */
    "refund_other": {
        "id": Anonymize<If9iqq7i64mur8>;
        "who": MultiAddress;
    };
    /**
     * Disallow further unprivileged transfers of an asset `id` to and from an account `who`.
     *
     * Origin must be Signed and the sender should be the Freezer of the asset `id`.
     *
     * - `id`: The identifier of the account's asset.
     * - `who`: The account to be unblocked.
     *
     * Emits `Blocked`.
     *
     * Weight: `O(1)`
     */
    "block": {
        "id": Anonymize<If9iqq7i64mur8>;
        "who": MultiAddress;
    };
    /**
     * Transfer the entire transferable balance from the caller asset account.
     *
     * NOTE: This function only attempts to transfer _transferable_ balances. This means that
     * any held, frozen, or minimum balance (when `keep_alive` is `true`), will not be
     * transferred by this function. To ensure that this function results in a killed account,
     * you might need to prepare the account by removing any reference counters, storage
     * deposits, etc...
     *
     * The dispatch origin of this call must be Signed.
     *
     * - `id`: The identifier of the asset for the account holding a deposit.
     * - `dest`: The recipient of the transfer.
     * - `keep_alive`: A boolean to determine if the `transfer_all` operation should send all
     * of the funds the asset account has, causing the sender asset account to be killed
     * (false), or transfer everything except at least the minimum balance, which will
     * guarantee to keep the sender asset account alive (true).
     */
    "transfer_all": {
        "id": Anonymize<If9iqq7i64mur8>;
        "dest": MultiAddress;
        "keep_alive": boolean;
    };
}>;
export type Ifrervtb291iin = AnonymousEnum<{
    /**
     * Lock the NFT and mint a new fungible asset.
     *
     * The dispatch origin for this call must be Signed.
     * The origin must be the owner of the NFT they are trying to lock.
     *
     * `Deposit` funds of sender are reserved.
     *
     * - `nft_collection_id`: The ID used to identify the collection of the NFT.
     * Is used within the context of `pallet_nfts`.
     * - `nft_id`: The ID used to identify the NFT within the given collection.
     * Is used within the context of `pallet_nfts`.
     * - `asset_id`: The ID of the new asset. It must not exist.
     * Is used within the context of `pallet_assets`.
     * - `beneficiary`: The account that will receive the newly created asset.
     * - `fractions`: The total issuance of the newly created asset class.
     *
     * Emits `NftFractionalized` event when successful.
     */
    "fractionalize": {
        "nft_collection_id": number;
        "nft_id": number;
        "asset_id": number;
        "beneficiary": MultiAddress;
        "fractions": bigint;
    };
    /**
     * Burn the total issuance of the fungible asset and return (unlock) the locked NFT.
     *
     * The dispatch origin for this call must be Signed.
     *
     * `Deposit` funds will be returned to `asset_creator`.
     *
     * - `nft_collection_id`: The ID used to identify the collection of the NFT.
     * Is used within the context of `pallet_nfts`.
     * - `nft_id`: The ID used to identify the NFT within the given collection.
     * Is used within the context of `pallet_nfts`.
     * - `asset_id`: The ID of the asset being returned and destroyed. Must match
     * the original ID of the created asset, corresponding to the NFT.
     * Is used within the context of `pallet_assets`.
     * - `beneficiary`: The account that will receive the unified NFT.
     *
     * Emits `NftUnified` event when successful.
     */
    "unify": {
        "nft_collection_id": number;
        "nft_id": number;
        "asset_id": number;
        "beneficiary": MultiAddress;
    };
}>;
export type Ia06pia7pbkurh = AnonymousEnum<{
    /**
     * Creates an empty liquidity pool and an associated new `lp_token` asset
     * (the id of which is returned in the `Event::PoolCreated` event).
     *
     * Once a pool is created, someone may [`Pallet::add_liquidity`] to it.
     */
    "create_pool": Anonymize<I3ip09dj7i1e8n>;
    /**
     * Provide liquidity into the pool of `asset1` and `asset2`.
     * NOTE: an optimal amount of asset1 and asset2 will be calculated and
     * might be different than the provided `amount1_desired`/`amount2_desired`
     * thus you should provide the min amount you're happy to provide.
     * Params `amount1_min`/`amount2_min` represent that.
     * `mint_to` will be sent the liquidity tokens that represent this share of the pool.
     *
     * NOTE: when encountering an incorrect exchange rate and non-withdrawable pool liquidity,
     * batch an atomic call with [`Pallet::add_liquidity`] and
     * [`Pallet::swap_exact_tokens_for_tokens`] or [`Pallet::swap_tokens_for_exact_tokens`]
     * calls to render the liquidity withdrawable and rectify the exchange rate.
     *
     * Once liquidity is added, someone may successfully call
     * [`Pallet::swap_exact_tokens_for_tokens`].
     */
    "add_liquidity": {
        "asset1": Anonymize<If9iqq7i64mur8>;
        "asset2": Anonymize<If9iqq7i64mur8>;
        "amount1_desired": bigint;
        "amount2_desired": bigint;
        "amount1_min": bigint;
        "amount2_min": bigint;
        "mint_to": SS58String;
    };
    /**
     * Allows you to remove liquidity by providing the `lp_token_burn` tokens that will be
     * burned in the process. With the usage of `amount1_min_receive`/`amount2_min_receive`
     * it's possible to control the min amount of returned tokens you're happy with.
     */
    "remove_liquidity": {
        "asset1": Anonymize<If9iqq7i64mur8>;
        "asset2": Anonymize<If9iqq7i64mur8>;
        "lp_token_burn": bigint;
        "amount1_min_receive": bigint;
        "amount2_min_receive": bigint;
        "withdraw_to": SS58String;
    };
    /**
     * Swap the exact amount of `asset1` into `asset2`.
     * `amount_out_min` param allows you to specify the min amount of the `asset2`
     * you're happy to receive.
     *
     * [`AssetConversionApi::quote_price_exact_tokens_for_tokens`] runtime call can be called
     * for a quote.
     */
    "swap_exact_tokens_for_tokens": {
        "path": Anonymize<I40r0k8147eovg>;
        "amount_in": bigint;
        "amount_out_min": bigint;
        "send_to": SS58String;
        "keep_alive": boolean;
    };
    /**
     * Swap any amount of `asset1` to get the exact amount of `asset2`.
     * `amount_in_max` param allows to specify the max amount of the `asset1`
     * you're happy to provide.
     *
     * [`AssetConversionApi::quote_price_tokens_for_exact_tokens`] runtime call can be called
     * for a quote.
     */
    "swap_tokens_for_exact_tokens": {
        "path": Anonymize<I40r0k8147eovg>;
        "amount_out": bigint;
        "amount_in_max": bigint;
        "send_to": SS58String;
        "keep_alive": boolean;
    };
    /**
     * Touch an existing pool to fulfill prerequisites before providing liquidity, such as
     * ensuring that the pool's accounts are in place. It is typically useful when a pool
     * creator removes the pool's accounts and does not provide a liquidity. This action may
     * involve holding assets from the caller as a deposit for creating the pool's accounts.
     *
     * The origin must be Signed.
     *
     * - `asset1`: The asset ID of an existing pool with a pair (asset1, asset2).
     * - `asset2`: The asset ID of an existing pool with a pair (asset1, asset2).
     *
     * Emits `Touched` event when successful.
     */
    "touch": Anonymize<I3ip09dj7i1e8n>;
}>;
export type I3ip09dj7i1e8n = {
    "asset1": Anonymize<If9iqq7i64mur8>;
    "asset2": Anonymize<If9iqq7i64mur8>;
};
export type I40r0k8147eovg = Array<Anonymize<If9iqq7i64mur8>>;
export type Ida37oe44osb06 = {
    "payload": Binary;
};
export type Idsg8aod8e8fqn = {
    "dest": FixedSizeBinary<20>;
    "value": bigint;
    "gas_limit": Anonymize<I4q39t5hn830vp>;
    "storage_deposit_limit": bigint;
    "data": Binary;
};
export type I46nktn22m6hbi = {
    "value": bigint;
    "gas_limit": Anonymize<I4q39t5hn830vp>;
    "storage_deposit_limit": bigint;
    "code_hash": FixedSizeBinary<32>;
    "data": Binary;
    "salt"?: Anonymize<I4s6vifaf8k998>;
};
export type Ibgj1cthra7lte = {
    "value": bigint;
    "gas_limit": Anonymize<I4q39t5hn830vp>;
    "storage_deposit_limit": bigint;
    "code": Binary;
    "data": Binary;
    "salt"?: Anonymize<I4s6vifaf8k998>;
};
export type Iboosov053lfpm = {
    "value": bigint;
    "gas_limit": Anonymize<I4q39t5hn830vp>;
    "storage_deposit_limit": bigint;
    "code": Binary;
    "data": Binary;
};
export type I10ra4g1rl6k2f = {
    "code": Binary;
    "storage_deposit_limit": bigint;
};
export type I1uihehkdsggvp = {
    "dest": FixedSizeBinary<20>;
    "code_hash": FixedSizeBinary<32>;
};
export type I6i7hgo4s9982m = AnonymousEnum<{
    /**
     * Create a new reward pool.
     *
     * Parameters:
     * - `origin`: must be `Config::CreatePoolOrigin`;
     * - `staked_asset_id`: the asset to be staked in the pool;
     * - `reward_asset_id`: the asset to be distributed as rewards;
     * - `reward_rate_per_block`: the amount of reward tokens distributed per block;
     * - `expiry`: the block number at which the pool will cease to accumulate rewards. The
     * [`DispatchTime::After`] variant evaluated at the execution time.
     * - `admin`: the account allowed to extend the pool expiration, increase the rewards rate
     * and receive the unutilized reward tokens back after the pool completion. If `None`,
     * the caller is set as an admin.
     */
    "create_pool": {
        "staked_asset_id": Anonymize<If9iqq7i64mur8>;
        "reward_asset_id": Anonymize<If9iqq7i64mur8>;
        "reward_rate_per_block": bigint;
        "expiry": TraitsScheduleDispatchTime;
        "admin"?: Anonymize<Ihfphjolmsqq1>;
    };
    /**
     * Stake additional tokens in a pool.
     *
     * A freeze is placed on the staked tokens.
     */
    "stake": Anonymize<Ieg1oc56mamrl5>;
    /**
     * Unstake tokens from a pool.
     *
     * Removes the freeze on the staked tokens.
     *
     * Parameters:
     * - origin: must be the `staker` if the pool is still active. Otherwise, any account.
     * - pool_id: the pool to unstake from.
     * - amount: the amount of tokens to unstake.
     * - staker: the account to unstake from. If `None`, the caller is used.
     */
    "unstake": {
        "pool_id": number;
        "amount": bigint;
        "staker"?: Anonymize<Ihfphjolmsqq1>;
    };
    /**
     * Harvest unclaimed pool rewards.
     *
     * Parameters:
     * - origin: must be the `staker` if the pool is still active. Otherwise, any account.
     * - pool_id: the pool to harvest from.
     * - staker: the account for which to harvest rewards. If `None`, the caller is used.
     */
    "harvest_rewards": {
        "pool_id": number;
        "staker"?: Anonymize<Ihfphjolmsqq1>;
    };
    /**
     * Modify a pool reward rate.
     *
     * Currently the reward rate can only be increased.
     *
     * Only the pool admin may perform this operation.
     */
    "set_pool_reward_rate_per_block": {
        "pool_id": number;
        "new_reward_rate_per_block": bigint;
    };
    /**
     * Modify a pool admin.
     *
     * Only the pool admin may perform this operation.
     */
    "set_pool_admin": {
        "pool_id": number;
        "new_admin": SS58String;
    };
    /**
     * Set when the pool should expire.
     *
     * Currently the expiry block can only be extended.
     *
     * Only the pool admin may perform this operation.
     */
    "set_pool_expiry_block": {
        "pool_id": number;
        "new_expiry": TraitsScheduleDispatchTime;
    };
    /**
     * Convenience method to deposit reward tokens into a pool.
     *
     * This method is not strictly necessary (tokens could be transferred directly to the
     * pool pot address), but is provided for convenience so manual derivation of the
     * account id is not required.
     */
    "deposit_reward_tokens": Anonymize<Ieg1oc56mamrl5>;
    /**
     * Cleanup a pool.
     *
     * Origin must be the pool admin.
     *
     * Cleanup storage, release any associated storage cost and return the remaining reward
     * tokens to the admin.
     */
    "cleanup_pool": Anonymize<I931cottvong90>;
}>;
export type I39l72gdmkk30t = AnonymousEnum<{
    /**
     * Control the automatic migration.
     *
     * The dispatch origin of this call must be [`Config::ControlOrigin`].
     */
    "control_auto_migration": {
        "maybe_config"?: (Anonymize<I215mkl885p4da>) | undefined;
    };
    /**
     * Continue the migration for the given `limits`.
     *
     * The dispatch origin of this call can be any signed account.
     *
     * This transaction has NO MONETARY INCENTIVES. calling it will not reward anyone. Albeit,
     * Upon successful execution, the transaction fee is returned.
     *
     * The (potentially over-estimated) of the byte length of all the data read must be
     * provided for up-front fee-payment and weighing. In essence, the caller is guaranteeing
     * that executing the current `MigrationTask` with the given `limits` will not exceed
     * `real_size_upper` bytes of read data.
     *
     * The `witness_task` is merely a helper to prevent the caller from being slashed or
     * generally trigger a migration that they do not intend. This parameter is just a message
     * from caller, saying that they believed `witness_task` was the last state of the
     * migration, and they only wish for their transaction to do anything, if this assumption
     * holds. In case `witness_task` does not match, the transaction fails.
     *
     * Based on the documentation of [`MigrationTask::migrate_until_exhaustion`], the
     * recommended way of doing this is to pass a `limit` that only bounds `count`, as the
     * `size` limit can always be overwritten.
     */
    "continue_migrate": {
        "limits": Anonymize<I215mkl885p4da>;
        "real_size_upper": number;
        "witness_task": {
            "progress_top": Anonymize<I1ufmh6d8psvik>;
            "progress_child": Anonymize<I1ufmh6d8psvik>;
            "size": number;
            "top_items": number;
            "child_items": number;
        };
    };
    /**
     * Migrate the list of top keys by iterating each of them one by one.
     *
     * This does not affect the global migration process tracker ([`MigrationProcess`]), and
     * should only be used in case any keys are leftover due to a bug.
     */
    "migrate_custom_top": {
        "keys": Anonymize<Itom7fk49o0c9>;
        "witness_size": number;
    };
    /**
     * Migrate the list of child keys by iterating each of them one by one.
     *
     * All of the given child keys must be present under one `child_root`.
     *
     * This does not affect the global migration process tracker ([`MigrationProcess`]), and
     * should only be used in case any keys are leftover due to a bug.
     */
    "migrate_custom_child": {
        "root": Binary;
        "child_keys": Anonymize<Itom7fk49o0c9>;
        "total_size": number;
    };
    /**
     * Set the maximum limit of the signed migration.
     */
    "set_signed_max_limits": {
        "limits": Anonymize<I215mkl885p4da>;
    };
    /**
     * Forcefully set the progress the running migration.
     *
     * This is only useful in one case: the next key to migrate is too big to be migrated with
     * a signed account, in a parachain context, and we simply want to skip it. A reasonable
     * example of this would be `:code:`, which is both very expensive to migrate, and commonly
     * used, so probably it is already migrated.
     *
     * In case you mess things up, you can also, in principle, use this to reset the migration
     * process.
     */
    "force_set_progress": {
        "progress_top": Anonymize<I1ufmh6d8psvik>;
        "progress_child": Anonymize<I1ufmh6d8psvik>;
    };
}>;
export type I215mkl885p4da = {
    "size": number;
    "item": number;
};
export type I1ufmh6d8psvik = AnonymousEnum<{
    "ToStart": undefined;
    "LastKey": Binary;
    "Complete": undefined;
}>;
export type Id32h28hjj1tch = [SS58String, number, number];
export type I6ouflveob4eli = [SS58String, number];
export type Ib85ihi0vt50bd = AnonymousEnum<{
    /**
     * Migrates an existing pool to a new account ID derivation method for a given asset pair.
     * If the migration is successful, transaction fees are refunded to the caller.
     *
     * Must be signed.
     */
    "migrate_to_new_account": Anonymize<I3ip09dj7i1e8n>;
}>;
export type PreimagePalletHoldReason = Enum<{
    "Preimage": undefined;
}>;
export declare const PreimagePalletHoldReason: GetEnum<PreimagePalletHoldReason>;
export type Ic2a7pon8ahsec = AnonymousEnum<{
    "System": Anonymize<Iekve0i6djpd9f>;
    "Scheduler": Enum<{
        /**
         * Anonymously schedule a task.
         */
        "schedule": {
            "when": number;
            "maybe_periodic"?: Anonymize<Iep7au1720bm0e>;
            "priority": number;
            "call": TxCallData;
        };
        /**
         * Cancel an anonymously scheduled task.
         */
        "cancel": Anonymize<I5n4sebgkfr760>;
        /**
         * Schedule a named task.
         */
        "schedule_named": {
            "id": FixedSizeBinary<32>;
            "when": number;
            "maybe_periodic"?: Anonymize<Iep7au1720bm0e>;
            "priority": number;
            "call": TxCallData;
        };
        /**
         * Cancel a named scheduled task.
         */
        "cancel_named": Anonymize<Ifs1i5fk9cqvr6>;
        /**
         * Anonymously schedule a task after a delay.
         */
        "schedule_after": {
            "after": number;
            "maybe_periodic"?: Anonymize<Iep7au1720bm0e>;
            "priority": number;
            "call": TxCallData;
        };
        /**
         * Schedule a named task after a delay.
         */
        "schedule_named_after": {
            "id": FixedSizeBinary<32>;
            "after": number;
            "maybe_periodic"?: Anonymize<Iep7au1720bm0e>;
            "priority": number;
            "call": TxCallData;
        };
        /**
         * Set a retry configuration for a task so that, in case its scheduled run fails, it will
         * be retried after `period` blocks, for a total amount of `retries` retries or until it
         * succeeds.
         *
         * Tasks which need to be scheduled for a retry are still subject to weight metering and
         * agenda space, same as a regular task. If a periodic task fails, it will be scheduled
         * normally while the task is retrying.
         *
         * Tasks scheduled as a result of a retry for a periodic task are unnamed, non-periodic
         * clones of the original task. Their retry configuration will be derived from the
         * original task's configuration, but will have a lower value for `remaining` than the
         * original `total_retries`.
         */
        "set_retry": Anonymize<Ieg3fd8p4pkt10>;
        /**
         * Set a retry configuration for a named task so that, in case its scheduled run fails, it
         * will be retried after `period` blocks, for a total amount of `retries` retries or until
         * it succeeds.
         *
         * Tasks which need to be scheduled for a retry are still subject to weight metering and
         * agenda space, same as a regular task. If a periodic task fails, it will be scheduled
         * normally while the task is retrying.
         *
         * Tasks scheduled as a result of a retry for a periodic task are unnamed, non-periodic
         * clones of the original task. Their retry configuration will be derived from the
         * original task's configuration, but will have a lower value for `remaining` than the
         * original `total_retries`.
         */
        "set_retry_named": Anonymize<I8kg5ll427kfqq>;
        /**
         * Removes the retry configuration of a task.
         */
        "cancel_retry": Anonymize<I467333262q1l9>;
        /**
         * Cancel the retry configuration of a named task.
         */
        "cancel_retry_named": Anonymize<Ifs1i5fk9cqvr6>;
    }>;
    "Preimage": Anonymize<If81ks88t5mpk5>;
    "Babe": Anonymize<I1jeo0dpbkma5g>;
    "Timestamp": Anonymize<I7d75gqfg6jh9c>;
    "Indices": Anonymize<I67ac6i6ihmvpt>;
    "Balances": Anonymize<I9svldsp29mh87>;
    "Staking": Anonymize<Icm294co91mkfj>;
    "Session": Anonymize<Iceajactc9a8pc>;
    "Grandpa": Anonymize<I5u9ggmn8umfqm>;
    "Treasury": Anonymize<I6jnp85onk3m8j>;
    "ConvictionVoting": Anonymize<Ie5kd08tutk56t>;
    "Referenda": Anonymize<I8tu311hskajnl>;
    "Whitelist": Enum<{
        "whitelist_call": Anonymize<I1adbcfi5uc62r>;
        "remove_whitelisted_call": Anonymize<I1adbcfi5uc62r>;
        "dispatch_whitelisted_call": Anonymize<Ibf6ucefn8fh49>;
        "dispatch_whitelisted_call_with_preimage": {
            "call": TxCallData;
        };
    }>;
    "Claims": Anonymize<Id0dj18ct09hlp>;
    "Vesting": Anonymize<Icgf8vmtkbnu4u>;
    "Utility": Enum<{
        /**
         * Send a batch of dispatch calls.
         *
         * May be called from any origin except `None`.
         *
         * - `calls`: The calls to be dispatched from the same origin. The number of call must not
         * exceed the constant: `batched_calls_limit` (available in constant metadata).
         *
         * If origin is root then the calls are dispatched without checking origin filter. (This
         * includes bypassing `frame_system::Config::BaseCallFilter`).
         *
         * ## Complexity
         * - O(C) where C is the number of calls to be batched.
         *
         * This will return `Ok` in all circumstances. To determine the success of the batch, an
         * event is deposited. If a call failed and the batch was interrupted, then the
         * `BatchInterrupted` event is deposited, along with the number of successful calls made
         * and the error of the failed call. If all were successful, then the `BatchCompleted`
         * event is deposited.
         */
        "batch": {
            "calls": Array<TxCallData>;
        };
        /**
         * Send a call through an indexed pseudonym of the sender.
         *
         * Filter from origin are passed along. The call will be dispatched with an origin which
         * use the same filter as the origin of this call.
         *
         * NOTE: If you need to ensure that any account-based filtering is not honored (i.e.
         * because you expect `proxy` to have been used prior in the call stack and you do not want
         * the call restrictions to apply to any sub-accounts), then use `as_multi_threshold_1`
         * in the Multisig pallet instead.
         *
         * NOTE: Prior to version *12, this was called `as_limited_sub`.
         *
         * The dispatch origin for this call must be _Signed_.
         */
        "as_derivative": {
            "index": number;
            "call": TxCallData;
        };
        /**
         * Send a batch of dispatch calls and atomically execute them.
         * The whole transaction will rollback and fail if any of the calls failed.
         *
         * May be called from any origin except `None`.
         *
         * - `calls`: The calls to be dispatched from the same origin. The number of call must not
         * exceed the constant: `batched_calls_limit` (available in constant metadata).
         *
         * If origin is root then the calls are dispatched without checking origin filter. (This
         * includes bypassing `frame_system::Config::BaseCallFilter`).
         *
         * ## Complexity
         * - O(C) where C is the number of calls to be batched.
         */
        "batch_all": {
            "calls": Array<TxCallData>;
        };
        /**
         * Dispatches a function call with a provided origin.
         *
         * The dispatch origin for this call must be _Root_.
         *
         * ## Complexity
         * - O(1).
         */
        "dispatch_as": {
            "as_origin": Anonymize<Iarigqlp2c2plh>;
            "call": TxCallData;
        };
        /**
         * Send a batch of dispatch calls.
         * Unlike `batch`, it allows errors and won't interrupt.
         *
         * May be called from any origin except `None`.
         *
         * - `calls`: The calls to be dispatched from the same origin. The number of call must not
         * exceed the constant: `batched_calls_limit` (available in constant metadata).
         *
         * If origin is root then the calls are dispatch without checking origin filter. (This
         * includes bypassing `frame_system::Config::BaseCallFilter`).
         *
         * ## Complexity
         * - O(C) where C is the number of calls to be batched.
         */
        "force_batch": {
            "calls": Array<TxCallData>;
        };
        /**
         * Dispatch a function call with a specified weight.
         *
         * This function does not check the weight of the call, and instead allows the
         * Root origin to specify the weight of the call.
         *
         * The dispatch origin for this call must be _Root_.
         */
        "with_weight": {
            "call": TxCallData;
            "weight": Anonymize<I4q39t5hn830vp>;
        };
        /**
         * Dispatch a fallback call in the event the main call fails to execute.
         * May be called from any origin except `None`.
         *
         * This function first attempts to dispatch the `main` call.
         * If the `main` call fails, the `fallback` is attemted.
         * if the fallback is successfully dispatched, the weights of both calls
         * are accumulated and an event containing the main call error is deposited.
         *
         * In the event of a fallback failure the whole call fails
         * with the weights returned.
         *
         * - `main`: The main call to be dispatched. This is the primary action to execute.
         * - `fallback`: The fallback call to be dispatched in case the `main` call fails.
         *
         * ## Dispatch Logic
         * - If the origin is `root`, both the main and fallback calls are executed without
         * applying any origin filters.
         * - If the origin is not `root`, the origin filter is applied to both the `main` and
         * `fallback` calls.
         *
         * ## Use Case
         * - Some use cases might involve submitting a `batch` type call in either main, fallback
         * or both.
         */
        "if_else": {
            "main": TxCallData;
            "fallback": TxCallData;
        };
        /**
         * Dispatches a function call with a provided origin.
         *
         * Almost the same as [`Pallet::dispatch_as`] but forwards any error of the inner call.
         *
         * The dispatch origin for this call must be _Root_.
         */
        "dispatch_as_fallible": {
            "as_origin": Anonymize<Iarigqlp2c2plh>;
            "call": TxCallData;
        };
    }>;
    "Proxy": Enum<{
        /**
         * Dispatch the given `call` from an account that the sender is authorised for through
         * `add_proxy`.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * Parameters:
         * - `real`: The account that the proxy will make a call on behalf of.
         * - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
         * - `call`: The call to be made by the `real` account.
         */
        "proxy": {
            "real": MultiAddress;
            "force_proxy_type"?: Anonymize<I93g3hgcn0dpaj>;
            "call": TxCallData;
        };
        /**
         * Register a proxy account for the sender that is able to make calls on its behalf.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * Parameters:
         * - `proxy`: The account that the `caller` would like to make a proxy.
         * - `proxy_type`: The permissions allowed for this proxy account.
         * - `delay`: The announcement period required of the initial proxy. Will generally be
         * zero.
         */
        "add_proxy": Anonymize<Ib1tr5ljcskalg>;
        /**
         * Unregister a proxy account for the sender.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * Parameters:
         * - `proxy`: The account that the `caller` would like to remove as a proxy.
         * - `proxy_type`: The permissions currently enabled for the removed proxy account.
         */
        "remove_proxy": Anonymize<Ib1tr5ljcskalg>;
        /**
         * Unregister all proxy accounts for the sender.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * WARNING: This may be called on accounts created by `pure`, however if done, then
         * the unreserved fees will be inaccessible. **All access to this account will be lost.**
         */
        "remove_proxies": undefined;
        /**
         * Spawn a fresh new account that is guaranteed to be otherwise inaccessible, and
         * initialize it with a proxy of `proxy_type` for `origin` sender.
         *
         * Requires a `Signed` origin.
         *
         * - `proxy_type`: The type of the proxy that the sender will be registered as over the
         * new account. This will almost always be the most permissive `ProxyType` possible to
         * allow for maximum flexibility.
         * - `index`: A disambiguation index, in case this is called multiple times in the same
         * transaction (e.g. with `utility::batch`). Unless you're using `batch` you probably just
         * want to use `0`.
         * - `delay`: The announcement period required of the initial proxy. Will generally be
         * zero.
         *
         * Fails with `Duplicate` if this has already been called in this transaction, from the
         * same sender, with the same parameters.
         *
         * Fails if there are insufficient funds to pay for deposit.
         */
        "create_pure": Anonymize<I7l4hu9floq5js>;
        /**
         * Removes a previously spawned pure proxy.
         *
         * WARNING: **All access to this account will be lost.** Any funds held in it will be
         * inaccessible.
         *
         * Requires a `Signed` origin, and the sender account must have been created by a call to
         * `pure` with corresponding parameters.
         *
         * - `spawner`: The account that originally called `pure` to create this account.
         * - `index`: The disambiguation index originally passed to `pure`. Probably `0`.
         * - `proxy_type`: The proxy type originally passed to `pure`.
         * - `height`: The height of the chain when the call to `pure` was processed.
         * - `ext_index`: The extrinsic index in which the call to `pure` was processed.
         *
         * Fails with `NoPermission` in case the caller is not a previously created pure
         * account whose `pure` call has corresponding parameters.
         */
        "kill_pure": Anonymize<I5860vql6ga92>;
        /**
         * Publish the hash of a proxy-call that will be made in the future.
         *
         * This must be called some number of blocks before the corresponding `proxy` is attempted
         * if the delay associated with the proxy relationship is greater than zero.
         *
         * No more than `MaxPending` announcements may be made at any one time.
         *
         * This will take a deposit of `AnnouncementDepositFactor` as well as
         * `AnnouncementDepositBase` if there are no other pending announcements.
         *
         * The dispatch origin for this call must be _Signed_ and a proxy of `real`.
         *
         * Parameters:
         * - `real`: The account that the proxy will make a call on behalf of.
         * - `call_hash`: The hash of the call to be made by the `real` account.
         */
        "announce": Anonymize<I2eb501t8s6hsq>;
        /**
         * Remove a given announcement.
         *
         * May be called by a proxy account to remove a call they previously announced and return
         * the deposit.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * Parameters:
         * - `real`: The account that the proxy will make a call on behalf of.
         * - `call_hash`: The hash of the call to be made by the `real` account.
         */
        "remove_announcement": Anonymize<I2eb501t8s6hsq>;
        /**
         * Remove the given announcement of a delegate.
         *
         * May be called by a target (proxied) account to remove a call that one of their delegates
         * (`delegate`) has announced they want to execute. The deposit is returned.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * Parameters:
         * - `delegate`: The account that previously announced the call.
         * - `call_hash`: The hash of the call to be made.
         */
        "reject_announcement": Anonymize<Ianmuoljk2sk1u>;
        /**
         * Dispatch the given `call` from an account that the sender is authorized for through
         * `add_proxy`.
         *
         * Removes any corresponding announcement(s).
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * Parameters:
         * - `real`: The account that the proxy will make a call on behalf of.
         * - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
         * - `call`: The call to be made by the `real` account.
         */
        "proxy_announced": {
            "delegate": MultiAddress;
            "real": MultiAddress;
            "force_proxy_type"?: Anonymize<I93g3hgcn0dpaj>;
            "call": TxCallData;
        };
        /**
         * Poke / Adjust deposits made for proxies and announcements based on current values.
         * This can be used by accounts to possibly lower their locked amount.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * The transaction fee is waived if the deposit amount has changed.
         *
         * Emits `DepositPoked` if successful.
         */
        "poke_deposit": undefined;
    }>;
    "Multisig": Enum<{
        /**
         * Immediately dispatch a multi-signature call using a single approval from the caller.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * - `other_signatories`: The accounts (other than the sender) who are part of the
         * multi-signature, but do not participate in the approval process.
         * - `call`: The call to be executed.
         *
         * Result is equivalent to the dispatched result.
         *
         * ## Complexity
         * O(Z + C) where Z is the length of the call and C its execution weight.
         */
        "as_multi_threshold_1": {
            "other_signatories": Anonymize<Ia2lhg7l2hilo3>;
            "call": TxCallData;
        };
        /**
         * Register approval for a dispatch to be made from a deterministic composite account if
         * approved by a total of `threshold - 1` of `other_signatories`.
         *
         * If there are enough, then dispatch the call.
         *
         * Payment: `DepositBase` will be reserved if this is the first approval, plus
         * `threshold` times `DepositFactor`. It is returned once this dispatch happens or
         * is cancelled.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * - `threshold`: The total number of approvals for this dispatch before it is executed.
         * - `other_signatories`: The accounts (other than the sender) who can approve this
         * dispatch. May not be empty.
         * - `maybe_timepoint`: If this is the first approval, then this must be `None`. If it is
         * not the first approval, then it must be `Some`, with the timepoint (block number and
         * transaction index) of the first approval transaction.
         * - `call`: The call to be executed.
         *
         * NOTE: Unless this is the final approval, you will generally want to use
         * `approve_as_multi` instead, since it only requires a hash of the call.
         *
         * Result is equivalent to the dispatched result if `threshold` is exactly `1`. Otherwise
         * on success, result is `Ok` and the result from the interior call, if it was executed,
         * may be found in the deposited `MultisigExecuted` event.
         *
         * ## Complexity
         * - `O(S + Z + Call)`.
         * - Up to one balance-reserve or unreserve operation.
         * - One passthrough operation, one insert, both `O(S)` where `S` is the number of
         * signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
         * - One call encode & hash, both of complexity `O(Z)` where `Z` is tx-len.
         * - One encode & hash, both of complexity `O(S)`.
         * - Up to one binary search and insert (`O(logS + S)`).
         * - I/O: 1 read `O(S)`, up to 1 mutate `O(S)`. Up to one remove.
         * - One event.
         * - The weight of the `call`.
         * - Storage: inserts one item, value size bounded by `MaxSignatories`, with a deposit
         * taken for its lifetime of `DepositBase + threshold * DepositFactor`.
         */
        "as_multi": {
            "threshold": number;
            "other_signatories": Anonymize<Ia2lhg7l2hilo3>;
            "maybe_timepoint"?: Anonymize<I95jfd8j5cr5eh>;
            "call": TxCallData;
            "max_weight": Anonymize<I4q39t5hn830vp>;
        };
        /**
         * Register approval for a dispatch to be made from a deterministic composite account if
         * approved by a total of `threshold - 1` of `other_signatories`.
         *
         * Payment: `DepositBase` will be reserved if this is the first approval, plus
         * `threshold` times `DepositFactor`. It is returned once this dispatch happens or
         * is cancelled.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * - `threshold`: The total number of approvals for this dispatch before it is executed.
         * - `other_signatories`: The accounts (other than the sender) who can approve this
         * dispatch. May not be empty.
         * - `maybe_timepoint`: If this is the first approval, then this must be `None`. If it is
         * not the first approval, then it must be `Some`, with the timepoint (block number and
         * transaction index) of the first approval transaction.
         * - `call_hash`: The hash of the call to be executed.
         *
         * NOTE: If this is the final approval, you will want to use `as_multi` instead.
         *
         * ## Complexity
         * - `O(S)`.
         * - Up to one balance-reserve or unreserve operation.
         * - One passthrough operation, one insert, both `O(S)` where `S` is the number of
         * signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
         * - One encode & hash, both of complexity `O(S)`.
         * - Up to one binary search and insert (`O(logS + S)`).
         * - I/O: 1 read `O(S)`, up to 1 mutate `O(S)`. Up to one remove.
         * - One event.
         * - Storage: inserts one item, value size bounded by `MaxSignatories`, with a deposit
         * taken for its lifetime of `DepositBase + threshold * DepositFactor`.
         */
        "approve_as_multi": Anonymize<Ideaemvoneh309>;
        /**
         * Cancel a pre-existing, on-going multisig transaction. Any deposit reserved previously
         * for this operation will be unreserved on success.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * - `threshold`: The total number of approvals for this dispatch before it is executed.
         * - `other_signatories`: The accounts (other than the sender) who can approve this
         * dispatch. May not be empty.
         * - `timepoint`: The timepoint (block number and transaction index) of the first approval
         * transaction for this dispatch.
         * - `call_hash`: The hash of the call to be executed.
         *
         * ## Complexity
         * - `O(S)`.
         * - Up to one balance-reserve or unreserve operation.
         * - One passthrough operation, one insert, both `O(S)` where `S` is the number of
         * signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
         * - One encode & hash, both of complexity `O(S)`.
         * - One event.
         * - I/O: 1 read `O(S)`, one remove.
         * - Storage: removes one item.
         */
        "cancel_as_multi": Anonymize<I3d9o9d7epp66v>;
        /**
         * Poke the deposit reserved for an existing multisig operation.
         *
         * The dispatch origin for this call must be _Signed_ and must be the original depositor of
         * the multisig operation.
         *
         * The transaction fee is waived if the deposit amount has changed.
         *
         * - `threshold`: The total number of approvals needed for this multisig.
         * - `other_signatories`: The accounts (other than the sender) who are part of the
         * multisig.
         * - `call_hash`: The hash of the call this deposit is reserved for.
         *
         * Emits `DepositPoked` if successful.
         */
        "poke_deposit": Anonymize<I6lqh1vgb4mcja>;
    }>;
    "Bounties": Anonymize<I1nnef4ljub6d0>;
    "ChildBounties": Anonymize<I1b6drdhvt5hl9>;
    "ElectionProviderMultiPhase": Anonymize<I15soeogelbbbh>;
    "VoterList": Anonymize<Ifvfo1l0vu2o7e>;
    "NominationPools": Anonymize<I57mljkkr28m9p>;
    "FastUnstake": Anonymize<I44snhj1gahvrd>;
    "Configuration": Anonymize<I3ah0kpgrv4i88>;
    "ParasShared": undefined;
    "ParaInclusion": undefined;
    "ParaInherent": Anonymize<I1nu19212e8egv>;
    "Paras": Anonymize<Ie2dden5k4kk7t>;
    "Initializer": Anonymize<Ieggtnkc96vvt7>;
    "Hrmp": Anonymize<I45adic8nko129>;
    "ParasDisputes": Anonymize<Ifkh1ep7g9h3rv>;
    "ParasSlashing": Anonymize<I7a6dbilbccifr>;
    "OnDemand": Anonymize<I1qq9dc763kccf>;
    "Registrar": Anonymize<Icclqj5sge2nc7>;
    "Slots": Anonymize<Iafhis924j14hg>;
    "Auctions": Anonymize<I4a8qeimc5p3qn>;
    "Crowdloan": Anonymize<Iaj4q75nu5v2i2>;
    "Coretime": Anonymize<Ifr31g56am9igr>;
    "StateTrieMigration": Anonymize<I39l72gdmkk30t>;
    "XcmPallet": Anonymize<I6k1inef986368>;
    "MessageQueue": Anonymize<I3lic4llm6egbr>;
    "AssetRate": Anonymize<If582h5gr5gh6f>;
    "Beefy": Anonymize<Idmcmrk34p8gic>;
}>;
export type I8tu311hskajnl = AnonymousEnum<{
    /**
     * Propose a referendum on a privileged action.
     *
     * - `origin`: must be `SubmitOrigin` and the account must have `SubmissionDeposit` funds
     * available.
     * - `proposal_origin`: The origin from which the proposal should be executed.
     * - `proposal`: The proposal.
     * - `enactment_moment`: The moment that the proposal should be enacted.
     *
     * Emits `Submitted`.
     */
    "submit": {
        "proposal_origin": Anonymize<Iarigqlp2c2plh>;
        "proposal": PreimagesBounded;
        "enactment_moment": TraitsScheduleDispatchTime;
    };
    /**
     * Post the Decision Deposit for a referendum.
     *
     * - `origin`: must be `Signed` and the account must have funds available for the
     * referendum's track's Decision Deposit.
     * - `index`: The index of the submitted referendum whose Decision Deposit is yet to be
     * posted.
     *
     * Emits `DecisionDepositPlaced`.
     */
    "place_decision_deposit": Anonymize<I666bl2fqjkejo>;
    /**
     * Refund the Decision Deposit for a closed referendum back to the depositor.
     *
     * - `origin`: must be `Signed` or `Root`.
     * - `index`: The index of a closed referendum whose Decision Deposit has not yet been
     * refunded.
     *
     * Emits `DecisionDepositRefunded`.
     */
    "refund_decision_deposit": Anonymize<I666bl2fqjkejo>;
    /**
     * Cancel an ongoing referendum.
     *
     * - `origin`: must be the `CancelOrigin`.
     * - `index`: The index of the referendum to be cancelled.
     *
     * Emits `Cancelled`.
     */
    "cancel": Anonymize<I666bl2fqjkejo>;
    /**
     * Cancel an ongoing referendum and slash the deposits.
     *
     * - `origin`: must be the `KillOrigin`.
     * - `index`: The index of the referendum to be cancelled.
     *
     * Emits `Killed` and `DepositSlashed`.
     */
    "kill": Anonymize<I666bl2fqjkejo>;
    /**
     * Advance a referendum onto its next logical state. Only used internally.
     *
     * - `origin`: must be `Root`.
     * - `index`: the referendum to be advanced.
     */
    "nudge_referendum": Anonymize<I666bl2fqjkejo>;
    /**
     * Advance a track onto its next logical state. Only used internally.
     *
     * - `origin`: must be `Root`.
     * - `track`: the track to be advanced.
     *
     * Action item for when there is now one fewer referendum in the deciding phase and the
     * `DecidingCount` is not yet updated. This means that we should either:
     * - begin deciding another referendum (and leave `DecidingCount` alone); or
     * - decrement `DecidingCount`.
     */
    "one_fewer_deciding": Anonymize<Icbio0e1f0034b>;
    /**
     * Refund the Submission Deposit for a closed referendum back to the depositor.
     *
     * - `origin`: must be `Signed` or `Root`.
     * - `index`: The index of a closed referendum whose Submission Deposit has not yet been
     * refunded.
     *
     * Emits `SubmissionDepositRefunded`.
     */
    "refund_submission_deposit": Anonymize<I666bl2fqjkejo>;
    /**
     * Set or clear metadata of a referendum.
     *
     * Parameters:
     * - `origin`: Must be `Signed` by a creator of a referendum or by anyone to clear a
     * metadata of a finished referendum.
     * - `index`:  The index of a referendum to set or clear metadata for.
     * - `maybe_hash`: The hash of an on-chain stored preimage. `None` to clear a metadata.
     */
    "set_metadata": Anonymize<I8c0vkqjjipnuj>;
}>;
export type Iarigqlp2c2plh = AnonymousEnum<{
    "system": DispatchRawOrigin;
    "Origins": GovernanceOrigin;
    "ParachainsOrigin": ParachainsOrigin;
    "XcmPallet": Anonymize<Icvilmd7qu30i4>;
}>;
export type DispatchRawOrigin = Enum<{
    "Root": undefined;
    "Signed": SS58String;
    "None": undefined;
}>;
export declare const DispatchRawOrigin: GetEnum<DispatchRawOrigin>;
export type GovernanceOrigin = Enum<{
    "StakingAdmin": undefined;
    "Treasurer": undefined;
    "FellowshipAdmin": undefined;
    "GeneralAdmin": undefined;
    "AuctionAdmin": undefined;
    "LeaseAdmin": undefined;
    "ReferendumCanceller": undefined;
    "ReferendumKiller": undefined;
    "SmallTipper": undefined;
    "BigTipper": undefined;
    "SmallSpender": undefined;
    "MediumSpender": undefined;
    "BigSpender": undefined;
    "WhitelistedCaller": undefined;
    "WishForChange": undefined;
}>;
export declare const GovernanceOrigin: GetEnum<GovernanceOrigin>;
export type Id0dj18ct09hlp = AnonymousEnum<{
    /**
     * Make a claim to collect your DOTs.
     *
     * The dispatch origin for this call must be _None_.
     *
     * Unsigned Validation:
     * A call to claim is deemed valid if the signature provided matches
     * the expected signed message of:
     *
     * > Ethereum Signed Message:
     * > (configured prefix string)(address)
     *
     * and `address` matches the `dest` account.
     *
     * Parameters:
     * - `dest`: The destination account to payout the claim.
     * - `ethereum_signature`: The signature of an ethereum signed message matching the format
     * described above.
     *
     * <weight>
     * The weight of this call is invariant over the input parameters.
     * Weight includes logic to validate unsigned `claim` call.
     *
     * Total Complexity: O(1)
     * </weight>
     */
    "claim": {
        "dest": SS58String;
        "ethereum_signature": FixedSizeBinary<65>;
    };
    /**
     * Mint a new claim to collect DOTs.
     *
     * The dispatch origin for this call must be _Root_.
     *
     * Parameters:
     * - `who`: The Ethereum address allowed to collect this claim.
     * - `value`: The number of DOTs that will be claimed.
     * - `vesting_schedule`: An optional vesting schedule for these DOTs.
     *
     * <weight>
     * The weight of this call is invariant over the input parameters.
     * We assume worst case that both vesting and statement is being inserted.
     *
     * Total Complexity: O(1)
     * </weight>
     */
    "mint_claim": {
        "who": FixedSizeBinary<20>;
        "value": bigint;
        "vesting_schedule"?: ([bigint, bigint, number]) | undefined;
        "statement"?: (ClaimsStatementKind) | undefined;
    };
    /**
     * Make a claim to collect your DOTs by signing a statement.
     *
     * The dispatch origin for this call must be _None_.
     *
     * Unsigned Validation:
     * A call to `claim_attest` is deemed valid if the signature provided matches
     * the expected signed message of:
     *
     * > Ethereum Signed Message:
     * > (configured prefix string)(address)(statement)
     *
     * and `address` matches the `dest` account; the `statement` must match that which is
     * expected according to your purchase arrangement.
     *
     * Parameters:
     * - `dest`: The destination account to payout the claim.
     * - `ethereum_signature`: The signature of an ethereum signed message matching the format
     * described above.
     * - `statement`: The identity of the statement which is being attested to in the
     * signature.
     *
     * <weight>
     * The weight of this call is invariant over the input parameters.
     * Weight includes logic to validate unsigned `claim_attest` call.
     *
     * Total Complexity: O(1)
     * </weight>
     */
    "claim_attest": {
        "dest": SS58String;
        "ethereum_signature": FixedSizeBinary<65>;
        "statement": Binary;
    };
    /**
     * Attest to a statement, needed to finalize the claims process.
     *
     * WARNING: Insecure unless your chain includes `PrevalidateAttests` as a
     * `TransactionExtension`.
     *
     * Unsigned Validation:
     * A call to attest is deemed valid if the sender has a `Preclaim` registered
     * and provides a `statement` which is expected for the account.
     *
     * Parameters:
     * - `statement`: The identity of the statement which is being attested to in the
     * signature.
     *
     * <weight>
     * The weight of this call is invariant over the input parameters.
     * Weight includes logic to do pre-validation on `attest` call.
     *
     * Total Complexity: O(1)
     * </weight>
     */
    "attest": {
        "statement": Binary;
    };
    "move_claim": {
        "old": FixedSizeBinary<20>;
        "new": FixedSizeBinary<20>;
        "maybe_preclaim"?: Anonymize<Ihfphjolmsqq1>;
    };
}>;
export type ClaimsStatementKind = Enum<{
    "Regular": undefined;
    "Saft": undefined;
}>;
export declare const ClaimsStatementKind: GetEnum<ClaimsStatementKind>;
export type I93g3hgcn0dpaj = (Anonymize<I7adrgaqb51jb9>) | undefined;
export type I7adrgaqb51jb9 = AnonymousEnum<{
    "Any": undefined;
    "NonTransfer": undefined;
    "Governance": undefined;
    "Staking": undefined;
    "CancelProxy": undefined;
    "Auction": undefined;
    "NominationPools": undefined;
    "ParaRegistration": undefined;
}>;
export type Ib1tr5ljcskalg = {
    "delegate": MultiAddress;
    "proxy_type": Anonymize<I7adrgaqb51jb9>;
    "delay": number;
};
export type I7l4hu9floq5js = {
    "proxy_type": Anonymize<I7adrgaqb51jb9>;
    "delay": number;
    "index": number;
};
export type I5860vql6ga92 = {
    "spawner": MultiAddress;
    "proxy_type": Anonymize<I7adrgaqb51jb9>;
    "index": number;
    "height": number;
    "ext_index": number;
};
export type I1nnef4ljub6d0 = AnonymousEnum<{
    /**
     * Propose a new bounty.
     *
     * The dispatch origin for this call must be _Signed_.
     *
     * Payment: `TipReportDepositBase` will be reserved from the origin account, as well as
     * `DataDepositPerByte` for each byte in `reason`. It will be unreserved upon approval,
     * or slashed when rejected.
     *
     * - `curator`: The curator account whom will manage this bounty.
     * - `fee`: The curator fee.
     * - `value`: The total payment amount of this bounty, curator fee included.
     * - `description`: The description of this bounty.
     */
    "propose_bounty": {
        "value": bigint;
        "description": Binary;
    };
    /**
     * Approve a bounty proposal. At a later time, the bounty will be funded and become active
     * and the original deposit will be returned.
     *
     * May only be called from `T::SpendOrigin`.
     *
     * ## Complexity
     * - O(1).
     */
    "approve_bounty": {
        "bounty_id": number;
    };
    /**
     * Propose a curator to a funded bounty.
     *
     * May only be called from `T::SpendOrigin`.
     *
     * ## Complexity
     * - O(1).
     */
    "propose_curator": {
        "bounty_id": number;
        "curator": MultiAddress;
        "fee": bigint;
    };
    /**
     * Unassign curator from a bounty.
     *
     * This function can only be called by the `RejectOrigin` a signed origin.
     *
     * If this function is called by the `RejectOrigin`, we assume that the curator is
     * malicious or inactive. As a result, we will slash the curator when possible.
     *
     * If the origin is the curator, we take this as a sign they are unable to do their job and
     * they willingly give up. We could slash them, but for now we allow them to recover their
     * deposit and exit without issue. (We may want to change this if it is abused.)
     *
     * Finally, the origin can be anyone if and only if the curator is "inactive". This allows
     * anyone in the community to call out that a curator is not doing their due diligence, and
     * we should pick a new curator. In this case the curator should also be slashed.
     *
     * ## Complexity
     * - O(1).
     */
    "unassign_curator": {
        "bounty_id": number;
    };
    /**
     * Accept the curator role for a bounty.
     * A deposit will be reserved from curator and refund upon successful payout.
     *
     * May only be called from the curator.
     *
     * ## Complexity
     * - O(1).
     */
    "accept_curator": {
        "bounty_id": number;
    };
    /**
     * Award bounty to a beneficiary account. The beneficiary will be able to claim the funds
     * after a delay.
     *
     * The dispatch origin for this call must be the curator of this bounty.
     *
     * - `bounty_id`: Bounty ID to award.
     * - `beneficiary`: The beneficiary account whom will receive the payout.
     *
     * ## Complexity
     * - O(1).
     */
    "award_bounty": {
        "bounty_id": number;
        "beneficiary": MultiAddress;
    };
    /**
     * Claim the payout from an awarded bounty after payout delay.
     *
     * The dispatch origin for this call must be the beneficiary of this bounty.
     *
     * - `bounty_id`: Bounty ID to claim.
     *
     * ## Complexity
     * - O(1).
     */
    "claim_bounty": {
        "bounty_id": number;
    };
    /**
     * Cancel a proposed or active bounty. All the funds will be sent to treasury and
     * the curator deposit will be unreserved if possible.
     *
     * Only `T::RejectOrigin` is able to cancel a bounty.
     *
     * - `bounty_id`: Bounty ID to cancel.
     *
     * ## Complexity
     * - O(1).
     */
    "close_bounty": {
        "bounty_id": number;
    };
    /**
     * Extend the expiry time of an active bounty.
     *
     * The dispatch origin for this call must be the curator of this bounty.
     *
     * - `bounty_id`: Bounty ID to extend.
     * - `remark`: additional information.
     *
     * ## Complexity
     * - O(1).
     */
    "extend_bounty_expiry": {
        "bounty_id": number;
        "remark": Binary;
    };
    /**
     * Approve bountry and propose a curator simultaneously.
     * This call is a shortcut to calling `approve_bounty` and `propose_curator` separately.
     *
     * May only be called from `T::SpendOrigin`.
     *
     * - `bounty_id`: Bounty ID to approve.
     * - `curator`: The curator account whom will manage this bounty.
     * - `fee`: The curator fee.
     *
     * ## Complexity
     * - O(1).
     */
    "approve_bounty_with_curator": {
        "bounty_id": number;
        "curator": MultiAddress;
        "fee": bigint;
    };
}>;
export type I1b6drdhvt5hl9 = AnonymousEnum<{
    /**
     * Add a new child-bounty.
     *
     * The dispatch origin for this call must be the curator of parent
     * bounty and the parent bounty must be in "active" state.
     *
     * Child-bounty gets added successfully & fund gets transferred from
     * parent bounty to child-bounty account, if parent bounty has enough
     * funds, else the call fails.
     *
     * Upper bound to maximum number of active  child bounties that can be
     * added are managed via runtime trait config
     * [`Config::MaxActiveChildBountyCount`].
     *
     * If the call is success, the status of child-bounty is updated to
     * "Added".
     *
     * - `parent_bounty_id`: Index of parent bounty for which child-bounty is being added.
     * - `value`: Value for executing the proposal.
     * - `description`: Text description for the child-bounty.
     */
    "add_child_bounty": {
        "parent_bounty_id": number;
        "value": bigint;
        "description": Binary;
    };
    /**
     * Propose curator for funded child-bounty.
     *
     * The dispatch origin for this call must be curator of parent bounty.
     *
     * Parent bounty must be in active state, for this child-bounty call to
     * work.
     *
     * Child-bounty must be in "Added" state, for processing the call. And
     * state of child-bounty is moved to "CuratorProposed" on successful
     * call completion.
     *
     * - `parent_bounty_id`: Index of parent bounty.
     * - `child_bounty_id`: Index of child bounty.
     * - `curator`: Address of child-bounty curator.
     * - `fee`: payment fee to child-bounty curator for execution.
     */
    "propose_curator": {
        "parent_bounty_id": number;
        "child_bounty_id": number;
        "curator": MultiAddress;
        "fee": bigint;
    };
    /**
     * Accept the curator role for the child-bounty.
     *
     * The dispatch origin for this call must be the curator of this
     * child-bounty.
     *
     * A deposit will be reserved from the curator and refund upon
     * successful payout or cancellation.
     *
     * Fee for curator is deducted from curator fee of parent bounty.
     *
     * Parent bounty must be in active state, for this child-bounty call to
     * work.
     *
     * Child-bounty must be in "CuratorProposed" state, for processing the
     * call. And state of child-bounty is moved to "Active" on successful
     * call completion.
     *
     * - `parent_bounty_id`: Index of parent bounty.
     * - `child_bounty_id`: Index of child bounty.
     */
    "accept_curator": {
        "parent_bounty_id": number;
        "child_bounty_id": number;
    };
    /**
     * Unassign curator from a child-bounty.
     *
     * The dispatch origin for this call can be either `RejectOrigin`, or
     * the curator of the parent bounty, or any signed origin.
     *
     * For the origin other than T::RejectOrigin and the child-bounty
     * curator, parent bounty must be in active state, for this call to
     * work. We allow child-bounty curator and T::RejectOrigin to execute
     * this call irrespective of the parent bounty state.
     *
     * If this function is called by the `RejectOrigin` or the
     * parent bounty curator, we assume that the child-bounty curator is
     * malicious or inactive. As a result, child-bounty curator deposit is
     * slashed.
     *
     * If the origin is the child-bounty curator, we take this as a sign
     * that they are unable to do their job, and are willingly giving up.
     * We could slash the deposit, but for now we allow them to unreserve
     * their deposit and exit without issue. (We may want to change this if
     * it is abused.)
     *
     * Finally, the origin can be anyone iff the child-bounty curator is
     * "inactive". Expiry update due of parent bounty is used to estimate
     * inactive state of child-bounty curator.
     *
     * This allows anyone in the community to call out that a child-bounty
     * curator is not doing their due diligence, and we should pick a new
     * one. In this case the child-bounty curator deposit is slashed.
     *
     * State of child-bounty is moved to Added state on successful call
     * completion.
     *
     * - `parent_bounty_id`: Index of parent bounty.
     * - `child_bounty_id`: Index of child bounty.
     */
    "unassign_curator": {
        "parent_bounty_id": number;
        "child_bounty_id": number;
    };
    /**
     * Award child-bounty to a beneficiary.
     *
     * The beneficiary will be able to claim the funds after a delay.
     *
     * The dispatch origin for this call must be the parent curator or
     * curator of this child-bounty.
     *
     * Parent bounty must be in active state, for this child-bounty call to
     * work.
     *
     * Child-bounty must be in active state, for processing the call. And
     * state of child-bounty is moved to "PendingPayout" on successful call
     * completion.
     *
     * - `parent_bounty_id`: Index of parent bounty.
     * - `child_bounty_id`: Index of child bounty.
     * - `beneficiary`: Beneficiary account.
     */
    "award_child_bounty": {
        "parent_bounty_id": number;
        "child_bounty_id": number;
        "beneficiary": MultiAddress;
    };
    /**
     * Claim the payout from an awarded child-bounty after payout delay.
     *
     * The dispatch origin for this call may be any signed origin.
     *
     * Call works independent of parent bounty state, No need for parent
     * bounty to be in active state.
     *
     * The Beneficiary is paid out with agreed bounty value. Curator fee is
     * paid & curator deposit is unreserved.
     *
     * Child-bounty must be in "PendingPayout" state, for processing the
     * call. And instance of child-bounty is removed from the state on
     * successful call completion.
     *
     * - `parent_bounty_id`: Index of parent bounty.
     * - `child_bounty_id`: Index of child bounty.
     */
    "claim_child_bounty": {
        "parent_bounty_id": number;
        "child_bounty_id": number;
    };
    /**
     * Cancel a proposed or active child-bounty. Child-bounty account funds
     * are transferred to parent bounty account. The child-bounty curator
     * deposit may be unreserved if possible.
     *
     * The dispatch origin for this call must be either parent curator or
     * `T::RejectOrigin`.
     *
     * If the state of child-bounty is `Active`, curator deposit is
     * unreserved.
     *
     * If the state of child-bounty is `PendingPayout`, call fails &
     * returns `PendingPayout` error.
     *
     * For the origin other than T::RejectOrigin, parent bounty must be in
     * active state, for this child-bounty call to work. For origin
     * T::RejectOrigin execution is forced.
     *
     * Instance of child-bounty is removed from the state on successful
     * call completion.
     *
     * - `parent_bounty_id`: Index of parent bounty.
     * - `child_bounty_id`: Index of child bounty.
     */
    "close_child_bounty": {
        "parent_bounty_id": number;
        "child_bounty_id": number;
    };
}>;
export type I15soeogelbbbh = AnonymousEnum<{
    /**
     * Submit a solution for the unsigned phase.
     *
     * The dispatch origin fo this call must be __none__.
     *
     * This submission is checked on the fly. Moreover, this unsigned solution is only
     * validated when submitted to the pool from the **local** node. Effectively, this means
     * that only active validators can submit this transaction when authoring a block (similar
     * to an inherent).
     *
     * To prevent any incorrect solution (and thus wasted time/weight), this transaction will
     * panic if the solution submitted by the validator is invalid in any way, effectively
     * putting their authoring reward at risk.
     *
     * No deposit or reward is associated with this submission.
     */
    "submit_unsigned": Anonymize<I31k9f0jol8ko4>;
    /**
     * Set a new value for `MinimumUntrustedScore`.
     *
     * Dispatch origin must be aligned with `T::ForceOrigin`.
     *
     * This check can be turned off by setting the value to `None`.
     */
    "set_minimum_untrusted_score": Anonymize<I80q14um2s2ckg>;
    /**
     * Set a solution in the queue, to be handed out to the client of this pallet in the next
     * call to `ElectionProvider::elect`.
     *
     * This can only be set by `T::ForceOrigin`, and only when the phase is `Emergency`.
     *
     * The solution is not checked for any feasibility and is assumed to be trustworthy, as any
     * feasibility check itself can in principle cause the election process to fail (due to
     * memory/weight constrains).
     */
    "set_emergency_election_result": Anonymize<I5qs1t1erfi7u8>;
    /**
     * Submit a solution for the signed phase.
     *
     * The dispatch origin fo this call must be __signed__.
     *
     * The solution is potentially queued, based on the claimed score and processed at the end
     * of the signed phase.
     *
     * A deposit is reserved and recorded for the solution. Based on the outcome, the solution
     * might be rewarded, slashed, or get all or a part of the deposit back.
     */
    "submit": Anonymize<I9et13knvdvgpb>;
    /**
     * Trigger the governance fallback.
     *
     * This can only be called when [`Phase::Emergency`] is enabled, as an alternative to
     * calling [`Call::set_emergency_election_result`].
     */
    "governance_fallback": Anonymize<Ifsme8miqq9006>;
}>;
export type Ifsme8miqq9006 = {
    "maybe_max_voters"?: Anonymize<I4arjljr6dpflb>;
    "maybe_max_targets"?: Anonymize<I4arjljr6dpflb>;
};
export type Ie2dden5k4kk7t = AnonymousEnum<{
    /**
     * Set the storage for the parachain validation code immediately.
     */
    "force_set_current_code": Anonymize<I1k3urvkqqshbc>;
    /**
     * Set the storage for the current parachain head data immediately.
     */
    "force_set_current_head": Anonymize<I2ff0ffsh15vej>;
    /**
     * Schedule an upgrade as if it was scheduled in the given relay parent block.
     */
    "force_schedule_code_upgrade": Anonymize<I1orfg86bkg123>;
    /**
     * Note a new block head for para within the context of the current block.
     */
    "force_note_new_head": Anonymize<I2ff0ffsh15vej>;
    /**
     * Put a parachain directly into the next session's action queue.
     * We can't queue it any sooner than this without going into the
     * initializer...
     */
    "force_queue_action": Anonymize<Iaus4cb3drhu9q>;
    /**
     * Adds the validation code to the storage.
     *
     * The code will not be added if it is already present. Additionally, if PVF pre-checking
     * is running for that code, it will be instantly accepted.
     *
     * Otherwise, the code will be added into the storage. Note that the code will be added
     * into storage with reference count 0. This is to account the fact that there are no users
     * for this code yet. The caller will have to make sure that this code eventually gets
     * used by some parachain or removed from the storage to avoid storage leaks. For the
     * latter prefer to use the `poke_unused_validation_code` dispatchable to raw storage
     * manipulation.
     *
     * This function is mainly meant to be used for upgrading parachains that do not follow
     * the go-ahead signal while the PVF pre-checking feature is enabled.
     */
    "add_trusted_validation_code": Anonymize<Ivnsat10lv9d6>;
    /**
     * Remove the validation code from the storage iff the reference count is 0.
     *
     * This is better than removing the storage directly, because it will not remove the code
     * that was suddenly got used by some parachain while this dispatchable was pending
     * dispatching.
     */
    "poke_unused_validation_code": Anonymize<Ibncli8qttt2c2>;
    /**
     * Includes a statement for a PVF pre-checking vote. Potentially, finalizes the vote and
     * enacts the results if that was the last vote before achieving the supermajority.
     */
    "include_pvf_check_statement": Anonymize<I33rft6ag34efs>;
    /**
     * Set the storage for the current parachain head data immediately.
     */
    "force_set_most_recent_context": Anonymize<I9tmok5kceg2bg>;
}>;
export type I766dsrsdk5kal = AnonymousEnum<{
    "System": Anonymize<Iekve0i6djpd9f>;
    "Babe": Anonymize<I1jeo0dpbkma5g>;
    "Timestamp": Anonymize<I7d75gqfg6jh9c>;
    "Indices": Anonymize<I67ac6i6ihmvpt>;
    "Balances": Anonymize<I9svldsp29mh87>;
    "Staking": Anonymize<Icm294co91mkfj>;
    "Session": Anonymize<Iceajactc9a8pc>;
    "Grandpa": Anonymize<I5u9ggmn8umfqm>;
    "Treasury": Anonymize<I6jnp85onk3m8j>;
    "ConvictionVoting": Anonymize<Ie5kd08tutk56t>;
    "Referenda": Enum<{
        /**
         * Propose a referendum on a privileged action.
         *
         * - `origin`: must be `SubmitOrigin` and the account must have `SubmissionDeposit` funds
         * available.
         * - `proposal_origin`: The origin from which the proposal should be executed.
         * - `proposal`: The proposal.
         * - `enactment_moment`: The moment that the proposal should be enacted.
         *
         * Emits `Submitted`.
         */
        "submit": {
            "proposal_origin": Anonymize<I8ciua774oe5di>;
            "proposal": PreimagesBounded;
            "enactment_moment": TraitsScheduleDispatchTime;
        };
        /**
         * Post the Decision Deposit for a referendum.
         *
         * - `origin`: must be `Signed` and the account must have funds available for the
         * referendum's track's Decision Deposit.
         * - `index`: The index of the submitted referendum whose Decision Deposit is yet to be
         * posted.
         *
         * Emits `DecisionDepositPlaced`.
         */
        "place_decision_deposit": Anonymize<I666bl2fqjkejo>;
        /**
         * Refund the Decision Deposit for a closed referendum back to the depositor.
         *
         * - `origin`: must be `Signed` or `Root`.
         * - `index`: The index of a closed referendum whose Decision Deposit has not yet been
         * refunded.
         *
         * Emits `DecisionDepositRefunded`.
         */
        "refund_decision_deposit": Anonymize<I666bl2fqjkejo>;
        /**
         * Cancel an ongoing referendum.
         *
         * - `origin`: must be the `CancelOrigin`.
         * - `index`: The index of the referendum to be cancelled.
         *
         * Emits `Cancelled`.
         */
        "cancel": Anonymize<I666bl2fqjkejo>;
        /**
         * Cancel an ongoing referendum and slash the deposits.
         *
         * - `origin`: must be the `KillOrigin`.
         * - `index`: The index of the referendum to be cancelled.
         *
         * Emits `Killed` and `DepositSlashed`.
         */
        "kill": Anonymize<I666bl2fqjkejo>;
        /**
         * Advance a referendum onto its next logical state. Only used internally.
         *
         * - `origin`: must be `Root`.
         * - `index`: the referendum to be advanced.
         */
        "nudge_referendum": Anonymize<I666bl2fqjkejo>;
        /**
         * Advance a track onto its next logical state. Only used internally.
         *
         * - `origin`: must be `Root`.
         * - `track`: the track to be advanced.
         *
         * Action item for when there is now one fewer referendum in the deciding phase and the
         * `DecidingCount` is not yet updated. This means that we should either:
         * - begin deciding another referendum (and leave `DecidingCount` alone); or
         * - decrement `DecidingCount`.
         */
        "one_fewer_deciding": Anonymize<Icbio0e1f0034b>;
        /**
         * Refund the Submission Deposit for a closed referendum back to the depositor.
         *
         * - `origin`: must be `Signed` or `Root`.
         * - `index`: The index of a closed referendum whose Submission Deposit has not yet been
         * refunded.
         *
         * Emits `SubmissionDepositRefunded`.
         */
        "refund_submission_deposit": Anonymize<I666bl2fqjkejo>;
        /**
         * Set or clear metadata of a referendum.
         *
         * Parameters:
         * - `origin`: Must be `Signed` by a creator of a referendum or by anyone to clear a
         * metadata of a finished referendum.
         * - `index`:  The index of a referendum to set or clear metadata for.
         * - `maybe_hash`: The hash of an on-chain stored preimage. `None` to clear a metadata.
         */
        "set_metadata": Anonymize<I8c0vkqjjipnuj>;
    }>;
    "FellowshipCollective": Enum<{
        /**
         * Introduce a new member.
         *
         * - `origin`: Must be the `AddOrigin`.
         * - `who`: Account of non-member which will become a member.
         *
         * Weight: `O(1)`
         */
        "add_member": {
            "who": MultiAddress;
        };
        /**
         * Increment the rank of an existing member by one.
         *
         * - `origin`: Must be the `PromoteOrigin`.
         * - `who`: Account of existing member.
         *
         * Weight: `O(1)`
         */
        "promote_member": {
            "who": MultiAddress;
        };
        /**
         * Decrement the rank of an existing member by one. If the member is already at rank zero,
         * then they are removed entirely.
         *
         * - `origin`: Must be the `DemoteOrigin`.
         * - `who`: Account of existing member of rank greater than zero.
         *
         * Weight: `O(1)`, less if the member's index is highest in its rank.
         */
        "demote_member": {
            "who": MultiAddress;
        };
        /**
         * Remove the member entirely.
         *
         * - `origin`: Must be the `RemoveOrigin`.
         * - `who`: Account of existing member of rank greater than zero.
         * - `min_rank`: The rank of the member or greater.
         *
         * Weight: `O(min_rank)`.
         */
        "remove_member": {
            "who": MultiAddress;
            "min_rank": number;
        };
        /**
         * Add an aye or nay vote for the sender to the given proposal.
         *
         * - `origin`: Must be `Signed` by a member account.
         * - `poll`: Index of a poll which is ongoing.
         * - `aye`: `true` if the vote is to approve the proposal, `false` otherwise.
         *
         * Transaction fees are be waived if the member is voting on any particular proposal
         * for the first time and the call is successful. Subsequent vote changes will charge a
         * fee.
         *
         * Weight: `O(1)`, less if there was no previous vote on the poll by the member.
         */
        "vote": {
            "poll": number;
            "aye": boolean;
        };
        /**
         * Remove votes from the given poll. It must have ended.
         *
         * - `origin`: Must be `Signed` by any account.
         * - `poll_index`: Index of a poll which is completed and for which votes continue to
         * exist.
         * - `max`: Maximum number of vote items from remove in this call.
         *
         * Transaction fees are waived if the operation is successful.
         *
         * Weight `O(max)` (less if there are fewer items to remove than `max`).
         */
        "cleanup_poll": {
            "poll_index": number;
            "max": number;
        };
        /**
         * Exchanges a member with a new account and the same existing rank.
         *
         * - `origin`: Must be the `ExchangeOrigin`.
         * - `who`: Account of existing member of rank greater than zero to be exchanged.
         * - `new_who`: New Account of existing member of rank greater than zero to exchanged to.
         */
        "exchange_member": {
            "who": MultiAddress;
            "new_who": MultiAddress;
        };
    }>;
    "FellowshipReferenda": Enum<{
        /**
         * Propose a referendum on a privileged action.
         *
         * - `origin`: must be `SubmitOrigin` and the account must have `SubmissionDeposit` funds
         * available.
         * - `proposal_origin`: The origin from which the proposal should be executed.
         * - `proposal`: The proposal.
         * - `enactment_moment`: The moment that the proposal should be enacted.
         *
         * Emits `Submitted`.
         */
        "submit": {
            "proposal_origin": Anonymize<I8ciua774oe5di>;
            "proposal": PreimagesBounded;
            "enactment_moment": TraitsScheduleDispatchTime;
        };
        /**
         * Post the Decision Deposit for a referendum.
         *
         * - `origin`: must be `Signed` and the account must have funds available for the
         * referendum's track's Decision Deposit.
         * - `index`: The index of the submitted referendum whose Decision Deposit is yet to be
         * posted.
         *
         * Emits `DecisionDepositPlaced`.
         */
        "place_decision_deposit": Anonymize<I666bl2fqjkejo>;
        /**
         * Refund the Decision Deposit for a closed referendum back to the depositor.
         *
         * - `origin`: must be `Signed` or `Root`.
         * - `index`: The index of a closed referendum whose Decision Deposit has not yet been
         * refunded.
         *
         * Emits `DecisionDepositRefunded`.
         */
        "refund_decision_deposit": Anonymize<I666bl2fqjkejo>;
        /**
         * Cancel an ongoing referendum.
         *
         * - `origin`: must be the `CancelOrigin`.
         * - `index`: The index of the referendum to be cancelled.
         *
         * Emits `Cancelled`.
         */
        "cancel": Anonymize<I666bl2fqjkejo>;
        /**
         * Cancel an ongoing referendum and slash the deposits.
         *
         * - `origin`: must be the `KillOrigin`.
         * - `index`: The index of the referendum to be cancelled.
         *
         * Emits `Killed` and `DepositSlashed`.
         */
        "kill": Anonymize<I666bl2fqjkejo>;
        /**
         * Advance a referendum onto its next logical state. Only used internally.
         *
         * - `origin`: must be `Root`.
         * - `index`: the referendum to be advanced.
         */
        "nudge_referendum": Anonymize<I666bl2fqjkejo>;
        /**
         * Advance a track onto its next logical state. Only used internally.
         *
         * - `origin`: must be `Root`.
         * - `track`: the track to be advanced.
         *
         * Action item for when there is now one fewer referendum in the deciding phase and the
         * `DecidingCount` is not yet updated. This means that we should either:
         * - begin deciding another referendum (and leave `DecidingCount` alone); or
         * - decrement `DecidingCount`.
         */
        "one_fewer_deciding": Anonymize<Icbio0e1f0034b>;
        /**
         * Refund the Submission Deposit for a closed referendum back to the depositor.
         *
         * - `origin`: must be `Signed` or `Root`.
         * - `index`: The index of a closed referendum whose Submission Deposit has not yet been
         * refunded.
         *
         * Emits `SubmissionDepositRefunded`.
         */
        "refund_submission_deposit": Anonymize<I666bl2fqjkejo>;
        /**
         * Set or clear metadata of a referendum.
         *
         * Parameters:
         * - `origin`: Must be `Signed` by a creator of a referendum or by anyone to clear a
         * metadata of a finished referendum.
         * - `index`:  The index of a referendum to set or clear metadata for.
         * - `maybe_hash`: The hash of an on-chain stored preimage. `None` to clear a metadata.
         */
        "set_metadata": Anonymize<I8c0vkqjjipnuj>;
    }>;
    "Whitelist": Enum<{
        "whitelist_call": Anonymize<I1adbcfi5uc62r>;
        "remove_whitelisted_call": Anonymize<I1adbcfi5uc62r>;
        "dispatch_whitelisted_call": Anonymize<Ibf6ucefn8fh49>;
        "dispatch_whitelisted_call_with_preimage": {
            "call": TxCallData;
        };
    }>;
    "Parameters": Enum<{
        /**
         * Set the value of a parameter.
         *
         * The dispatch origin of this call must be `AdminOrigin` for the given `key`. Values be
         * deleted by setting them to `None`.
         */
        "set_parameter": {
            "key_value": Enum<{
                "Inflation": Anonymize<I5t0545elr3mi1>;
                "Treasury": Enum<{
                    "BurnPortion": FixedSizeArray<1, Anonymize<I4arjljr6dpflb>>;
                    "BurnDestination": FixedSizeArray<1, (Anonymize<Ihfphjolmsqq1>) | undefined>;
                }>;
            }>;
        };
    }>;
    "Claims": Anonymize<Id0dj18ct09hlp>;
    "Utility": Enum<{
        /**
         * Send a batch of dispatch calls.
         *
         * May be called from any origin except `None`.
         *
         * - `calls`: The calls to be dispatched from the same origin. The number of call must not
         * exceed the constant: `batched_calls_limit` (available in constant metadata).
         *
         * If origin is root then the calls are dispatched without checking origin filter. (This
         * includes bypassing `frame_system::Config::BaseCallFilter`).
         *
         * ## Complexity
         * - O(C) where C is the number of calls to be batched.
         *
         * This will return `Ok` in all circumstances. To determine the success of the batch, an
         * event is deposited. If a call failed and the batch was interrupted, then the
         * `BatchInterrupted` event is deposited, along with the number of successful calls made
         * and the error of the failed call. If all were successful, then the `BatchCompleted`
         * event is deposited.
         */
        "batch": {
            "calls": Array<TxCallData>;
        };
        /**
         * Send a call through an indexed pseudonym of the sender.
         *
         * Filter from origin are passed along. The call will be dispatched with an origin which
         * use the same filter as the origin of this call.
         *
         * NOTE: If you need to ensure that any account-based filtering is not honored (i.e.
         * because you expect `proxy` to have been used prior in the call stack and you do not want
         * the call restrictions to apply to any sub-accounts), then use `as_multi_threshold_1`
         * in the Multisig pallet instead.
         *
         * NOTE: Prior to version *12, this was called `as_limited_sub`.
         *
         * The dispatch origin for this call must be _Signed_.
         */
        "as_derivative": {
            "index": number;
            "call": TxCallData;
        };
        /**
         * Send a batch of dispatch calls and atomically execute them.
         * The whole transaction will rollback and fail if any of the calls failed.
         *
         * May be called from any origin except `None`.
         *
         * - `calls`: The calls to be dispatched from the same origin. The number of call must not
         * exceed the constant: `batched_calls_limit` (available in constant metadata).
         *
         * If origin is root then the calls are dispatched without checking origin filter. (This
         * includes bypassing `frame_system::Config::BaseCallFilter`).
         *
         * ## Complexity
         * - O(C) where C is the number of calls to be batched.
         */
        "batch_all": {
            "calls": Array<TxCallData>;
        };
        /**
         * Dispatches a function call with a provided origin.
         *
         * The dispatch origin for this call must be _Root_.
         *
         * ## Complexity
         * - O(1).
         */
        "dispatch_as": {
            "as_origin": Anonymize<I8ciua774oe5di>;
            "call": TxCallData;
        };
        /**
         * Send a batch of dispatch calls.
         * Unlike `batch`, it allows errors and won't interrupt.
         *
         * May be called from any origin except `None`.
         *
         * - `calls`: The calls to be dispatched from the same origin. The number of call must not
         * exceed the constant: `batched_calls_limit` (available in constant metadata).
         *
         * If origin is root then the calls are dispatch without checking origin filter. (This
         * includes bypassing `frame_system::Config::BaseCallFilter`).
         *
         * ## Complexity
         * - O(C) where C is the number of calls to be batched.
         */
        "force_batch": {
            "calls": Array<TxCallData>;
        };
        /**
         * Dispatch a function call with a specified weight.
         *
         * This function does not check the weight of the call, and instead allows the
         * Root origin to specify the weight of the call.
         *
         * The dispatch origin for this call must be _Root_.
         */
        "with_weight": {
            "call": TxCallData;
            "weight": Anonymize<I4q39t5hn830vp>;
        };
        /**
         * Dispatch a fallback call in the event the main call fails to execute.
         * May be called from any origin except `None`.
         *
         * This function first attempts to dispatch the `main` call.
         * If the `main` call fails, the `fallback` is attemted.
         * if the fallback is successfully dispatched, the weights of both calls
         * are accumulated and an event containing the main call error is deposited.
         *
         * In the event of a fallback failure the whole call fails
         * with the weights returned.
         *
         * - `main`: The main call to be dispatched. This is the primary action to execute.
         * - `fallback`: The fallback call to be dispatched in case the `main` call fails.
         *
         * ## Dispatch Logic
         * - If the origin is `root`, both the main and fallback calls are executed without
         * applying any origin filters.
         * - If the origin is not `root`, the origin filter is applied to both the `main` and
         * `fallback` calls.
         *
         * ## Use Case
         * - Some use cases might involve submitting a `batch` type call in either main, fallback
         * or both.
         */
        "if_else": {
            "main": TxCallData;
            "fallback": TxCallData;
        };
        /**
         * Dispatches a function call with a provided origin.
         *
         * Almost the same as [`Pallet::dispatch_as`] but forwards any error of the inner call.
         *
         * The dispatch origin for this call must be _Root_.
         */
        "dispatch_as_fallible": {
            "as_origin": Anonymize<I8ciua774oe5di>;
            "call": TxCallData;
        };
    }>;
    "Society": Enum<{
        /**
         * A user outside of the society can make a bid for entry.
         *
         * Payment: The group's Candidate Deposit will be reserved for making a bid. It is returned
         * when the bid becomes a member, or if the bid calls `unbid`.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * Parameters:
         * - `value`: A one time payment the bid would like to receive when joining the society.
         */
        "bid": Anonymize<Ie5v6njpckr05b>;
        /**
         * A bidder can remove their bid for entry into society.
         * By doing so, they will have their candidate deposit returned or
         * they will unvouch their voucher.
         *
         * Payment: The bid deposit is unreserved if the user made a bid.
         *
         * The dispatch origin for this call must be _Signed_ and a bidder.
         */
        "unbid": undefined;
        /**
         * As a member, vouch for someone to join society by placing a bid on their behalf.
         *
         * There is no deposit required to vouch for a new bid, but a member can only vouch for
         * one bid at a time. If the bid becomes a suspended candidate and ultimately rejected by
         * the suspension judgement origin, the member will be banned from vouching again.
         *
         * As a vouching member, you can claim a tip if the candidate is accepted. This tip will
         * be paid as a portion of the reward the member will receive for joining the society.
         *
         * The dispatch origin for this call must be _Signed_ and a member.
         *
         * Parameters:
         * - `who`: The user who you would like to vouch for.
         * - `value`: The total reward to be paid between you and the candidate if they become
         * a member in the society.
         * - `tip`: Your cut of the total `value` payout when the candidate is inducted into
         * the society. Tips larger than `value` will be saturated upon payout.
         */
        "vouch": {
            "who": MultiAddress;
            "value": bigint;
            "tip": bigint;
        };
        /**
         * As a vouching member, unvouch a bid. This only works while vouched user is
         * only a bidder (and not a candidate).
         *
         * The dispatch origin for this call must be _Signed_ and a vouching member.
         *
         * Parameters:
         * - `pos`: Position in the `Bids` vector of the bid who should be unvouched.
         */
        "unvouch": undefined;
        /**
         * As a member, vote on a candidate.
         *
         * The dispatch origin for this call must be _Signed_ and a member.
         *
         * Parameters:
         * - `candidate`: The candidate that the member would like to bid on.
         * - `approve`: A boolean which says if the candidate should be approved (`true`) or
         * rejected (`false`).
         */
        "vote": {
            "candidate": MultiAddress;
            "approve": boolean;
        };
        /**
         * As a member, vote on the defender.
         *
         * The dispatch origin for this call must be _Signed_ and a member.
         *
         * Parameters:
         * - `approve`: A boolean which says if the candidate should be
         * approved (`true`) or rejected (`false`).
         */
        "defender_vote": {
            "approve": boolean;
        };
        /**
         * Transfer the first matured payout for the sender and remove it from the records.
         *
         * NOTE: This extrinsic needs to be called multiple times to claim multiple matured
         * payouts.
         *
         * Payment: The member will receive a payment equal to their first matured
         * payout to their free balance.
         *
         * The dispatch origin for this call must be _Signed_ and a member with
         * payouts remaining.
         */
        "payout": undefined;
        /**
         * Repay the payment previously given to the member with the signed origin, remove any
         * pending payments, and elevate them from rank 0 to rank 1.
         */
        "waive_repay": {
            "amount": bigint;
        };
        /**
         * Found the society.
         *
         * This is done as a discrete action in order to allow for the
         * pallet to be included into a running chain and can only be done once.
         *
         * The dispatch origin for this call must be from the _FounderSetOrigin_.
         *
         * Parameters:
         * - `founder` - The first member and head of the newly founded society.
         * - `max_members` - The initial max number of members for the society.
         * - `max_intake` - The maximum number of candidates per intake period.
         * - `max_strikes`: The maximum number of strikes a member may get before they become
         * suspended and may only be reinstated by the founder.
         * - `candidate_deposit`: The deposit required to make a bid for membership of the group.
         * - `rules` - The rules of this society concerning membership.
         *
         * Complexity: O(1)
         */
        "found_society": {
            "founder": MultiAddress;
            "max_members": number;
            "max_intake": number;
            "max_strikes": number;
            "candidate_deposit": bigint;
            "rules": Binary;
        };
        /**
         * Dissolve the society and remove all members.
         *
         * The dispatch origin for this call must be Signed, and the signing account must be both
         * the `Founder` and the `Head`. This implies that it may only be done when there is one
         * member.
         */
        "dissolve": undefined;
        /**
         * Allow suspension judgement origin to make judgement on a suspended member.
         *
         * If a suspended member is forgiven, we simply add them back as a member, not affecting
         * any of the existing storage items for that member.
         *
         * If a suspended member is rejected, remove all associated storage items, including
         * their payouts, and remove any vouched bids they currently have.
         *
         * The dispatch origin for this call must be Signed from the Founder.
         *
         * Parameters:
         * - `who` - The suspended member to be judged.
         * - `forgive` - A boolean representing whether the suspension judgement origin forgives
         * (`true`) or rejects (`false`) a suspended member.
         */
        "judge_suspended_member": {
            "who": MultiAddress;
            "forgive": boolean;
        };
        /**
         * Change the maximum number of members in society and the maximum number of new candidates
         * in a single intake period.
         *
         * The dispatch origin for this call must be Signed by the Founder.
         *
         * Parameters:
         * - `max_members` - The maximum number of members for the society. This must be no less
         * than the current number of members.
         * - `max_intake` - The maximum number of candidates per intake period.
         * - `max_strikes`: The maximum number of strikes a member may get before they become
         * suspended and may only be reinstated by the founder.
         * - `candidate_deposit`: The deposit required to make a bid for membership of the group.
         */
        "set_parameters": {
            "max_members": number;
            "max_intake": number;
            "max_strikes": number;
            "candidate_deposit": bigint;
        };
        /**
         * Punish the skeptic with a strike if they did not vote on a candidate. Callable by the
         * candidate.
         */
        "punish_skeptic": undefined;
        /**
         * Transform an approved candidate into a member. Callable only by the
         * the candidate, and only after the period for voting has ended.
         */
        "claim_membership": undefined;
        /**
         * Transform an approved candidate into a member. Callable only by the Signed origin of the
         * Founder, only after the period for voting has ended and only when the candidate is not
         * clearly rejected.
         */
        "bestow_membership": {
            "candidate": SS58String;
        };
        /**
         * Remove the candidate's application from the society. Callable only by the Signed origin
         * of the Founder, only after the period for voting has ended, and only when they do not
         * have a clear approval.
         *
         * Any bid deposit is lost and voucher is banned.
         */
        "kick_candidate": {
            "candidate": SS58String;
        };
        /**
         * Remove the candidate's application from the society. Callable only by the candidate.
         *
         * Any bid deposit is lost and voucher is banned.
         */
        "resign_candidacy": undefined;
        /**
         * Remove a `candidate`'s failed application from the society. Callable by any
         * signed origin but only at the end of the subsequent round and only for
         * a candidate with more rejections than approvals.
         *
         * The bid deposit is lost and the voucher is banned.
         */
        "drop_candidate": {
            "candidate": SS58String;
        };
        /**
         * Remove up to `max` stale votes for the given `candidate`.
         *
         * May be called by any Signed origin, but only after the candidate's candidacy is ended.
         */
        "cleanup_candidacy": {
            "candidate": SS58String;
            "max": number;
        };
        /**
         * Remove up to `max` stale votes for the defender in the given `challenge_round`.
         *
         * May be called by any Signed origin, but only after the challenge round is ended.
         */
        "cleanup_challenge": {
            "challenge_round": number;
            "max": number;
        };
    }>;
    "Recovery": Enum<{
        /**
         * Send a call through a recovered account.
         *
         * The dispatch origin for this call must be _Signed_ and registered to
         * be able to make calls on behalf of the recovered account.
         *
         * Parameters:
         * - `account`: The recovered account you want to make a call on-behalf-of.
         * - `call`: The call you want to make with the recovered account.
         */
        "as_recovered": {
            "account": MultiAddress;
            "call": TxCallData;
        };
        /**
         * Allow ROOT to bypass the recovery process and set a rescuer account
         * for a lost account directly.
         *
         * The dispatch origin for this call must be _ROOT_.
         *
         * Parameters:
         * - `lost`: The "lost account" to be recovered.
         * - `rescuer`: The "rescuer account" which can call as the lost account.
         */
        "set_recovered": Anonymize<I7pqmhr25d3dqq>;
        /**
         * Create a recovery configuration for your account. This makes your account recoverable.
         *
         * Payment: `ConfigDepositBase` + `FriendDepositFactor` * #_of_friends balance
         * will be reserved for storing the recovery configuration. This deposit is returned
         * in full when the user calls `remove_recovery`.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * Parameters:
         * - `friends`: A list of friends you trust to vouch for recovery attempts. Should be
         * ordered and contain no duplicate values.
         * - `threshold`: The number of friends that must vouch for a recovery attempt before the
         * account can be recovered. Should be less than or equal to the length of the list of
         * friends.
         * - `delay_period`: The number of blocks after a recovery attempt is initialized that
         * needs to pass before the account can be recovered.
         */
        "create_recovery": Anonymize<I6s6ihmfj6j5qq>;
        /**
         * Initiate the process for recovering a recoverable account.
         *
         * Payment: `RecoveryDeposit` balance will be reserved for initiating the
         * recovery process. This deposit will always be repatriated to the account
         * trying to be recovered. See `close_recovery`.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * Parameters:
         * - `account`: The lost account that you want to recover. This account needs to be
         * recoverable (i.e. have a recovery configuration).
         */
        "initiate_recovery": Anonymize<Ic6cqd9g0t65v0>;
        /**
         * Allow a "friend" of a recoverable account to vouch for an active recovery
         * process for that account.
         *
         * The dispatch origin for this call must be _Signed_ and must be a "friend"
         * for the recoverable account.
         *
         * Parameters:
         * - `lost`: The lost account that you want to recover.
         * - `rescuer`: The account trying to rescue the lost account that you want to vouch for.
         *
         * The combination of these two parameters must point to an active recovery
         * process.
         */
        "vouch_recovery": Anonymize<I7pqmhr25d3dqq>;
        /**
         * Allow a successful rescuer to claim their recovered account.
         *
         * The dispatch origin for this call must be _Signed_ and must be a "rescuer"
         * who has successfully completed the account recovery process: collected
         * `threshold` or more vouches, waited `delay_period` blocks since initiation.
         *
         * Parameters:
         * - `account`: The lost account that you want to claim has been successfully recovered by
         * you.
         */
        "claim_recovery": Anonymize<Ic6cqd9g0t65v0>;
        /**
         * As the controller of a recoverable account, close an active recovery
         * process for your account.
         *
         * Payment: By calling this function, the recoverable account will receive
         * the recovery deposit `RecoveryDeposit` placed by the rescuer.
         *
         * The dispatch origin for this call must be _Signed_ and must be a
         * recoverable account with an active recovery process for it.
         *
         * Parameters:
         * - `rescuer`: The account trying to rescue this recoverable account.
         */
        "close_recovery": Anonymize<I7ka1pdlbuevh2>;
        /**
         * Remove the recovery process for your account. Recovered accounts are still accessible.
         *
         * NOTE: The user must make sure to call `close_recovery` on all active
         * recovery attempts before calling this function else it will fail.
         *
         * Payment: By calling this function the recoverable account will unreserve
         * their recovery configuration deposit.
         * (`ConfigDepositBase` + `FriendDepositFactor` * #_of_friends)
         *
         * The dispatch origin for this call must be _Signed_ and must be a
         * recoverable account (i.e. has a recovery configuration).
         */
        "remove_recovery": undefined;
        /**
         * Cancel the ability to use `as_recovered` for `account`.
         *
         * The dispatch origin for this call must be _Signed_ and registered to
         * be able to make calls on behalf of the recovered account.
         *
         * Parameters:
         * - `account`: The recovered account you are able to call on-behalf-of.
         */
        "cancel_recovered": Anonymize<Ic6cqd9g0t65v0>;
    }>;
    "Vesting": Anonymize<Icgf8vmtkbnu4u>;
    "Scheduler": Enum<{
        /**
         * Anonymously schedule a task.
         */
        "schedule": {
            "when": number;
            "maybe_periodic"?: Anonymize<Iep7au1720bm0e>;
            "priority": number;
            "call": TxCallData;
        };
        /**
         * Cancel an anonymously scheduled task.
         */
        "cancel": Anonymize<I5n4sebgkfr760>;
        /**
         * Schedule a named task.
         */
        "schedule_named": {
            "id": FixedSizeBinary<32>;
            "when": number;
            "maybe_periodic"?: Anonymize<Iep7au1720bm0e>;
            "priority": number;
            "call": TxCallData;
        };
        /**
         * Cancel a named scheduled task.
         */
        "cancel_named": Anonymize<Ifs1i5fk9cqvr6>;
        /**
         * Anonymously schedule a task after a delay.
         */
        "schedule_after": {
            "after": number;
            "maybe_periodic"?: Anonymize<Iep7au1720bm0e>;
            "priority": number;
            "call": TxCallData;
        };
        /**
         * Schedule a named task after a delay.
         */
        "schedule_named_after": {
            "id": FixedSizeBinary<32>;
            "after": number;
            "maybe_periodic"?: Anonymize<Iep7au1720bm0e>;
            "priority": number;
            "call": TxCallData;
        };
        /**
         * Set a retry configuration for a task so that, in case its scheduled run fails, it will
         * be retried after `period` blocks, for a total amount of `retries` retries or until it
         * succeeds.
         *
         * Tasks which need to be scheduled for a retry are still subject to weight metering and
         * agenda space, same as a regular task. If a periodic task fails, it will be scheduled
         * normally while the task is retrying.
         *
         * Tasks scheduled as a result of a retry for a periodic task are unnamed, non-periodic
         * clones of the original task. Their retry configuration will be derived from the
         * original task's configuration, but will have a lower value for `remaining` than the
         * original `total_retries`.
         */
        "set_retry": Anonymize<Ieg3fd8p4pkt10>;
        /**
         * Set a retry configuration for a named task so that, in case its scheduled run fails, it
         * will be retried after `period` blocks, for a total amount of `retries` retries or until
         * it succeeds.
         *
         * Tasks which need to be scheduled for a retry are still subject to weight metering and
         * agenda space, same as a regular task. If a periodic task fails, it will be scheduled
         * normally while the task is retrying.
         *
         * Tasks scheduled as a result of a retry for a periodic task are unnamed, non-periodic
         * clones of the original task. Their retry configuration will be derived from the
         * original task's configuration, but will have a lower value for `remaining` than the
         * original `total_retries`.
         */
        "set_retry_named": Anonymize<I8kg5ll427kfqq>;
        /**
         * Removes the retry configuration of a task.
         */
        "cancel_retry": Anonymize<I467333262q1l9>;
        /**
         * Cancel the retry configuration of a named task.
         */
        "cancel_retry_named": Anonymize<Ifs1i5fk9cqvr6>;
    }>;
    "Proxy": Enum<{
        /**
         * Dispatch the given `call` from an account that the sender is authorised for through
         * `add_proxy`.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * Parameters:
         * - `real`: The account that the proxy will make a call on behalf of.
         * - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
         * - `call`: The call to be made by the `real` account.
         */
        "proxy": {
            "real": MultiAddress;
            "force_proxy_type"?: Anonymize<I4sv79c6siq7sq>;
            "call": TxCallData;
        };
        /**
         * Register a proxy account for the sender that is able to make calls on its behalf.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * Parameters:
         * - `proxy`: The account that the `caller` would like to make a proxy.
         * - `proxy_type`: The permissions allowed for this proxy account.
         * - `delay`: The announcement period required of the initial proxy. Will generally be
         * zero.
         */
        "add_proxy": {
            "delegate": MultiAddress;
            "proxy_type": Anonymize<Inpglg3f6qcjg>;
            "delay": number;
        };
        /**
         * Unregister a proxy account for the sender.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * Parameters:
         * - `proxy`: The account that the `caller` would like to remove as a proxy.
         * - `proxy_type`: The permissions currently enabled for the removed proxy account.
         */
        "remove_proxy": {
            "delegate": MultiAddress;
            "proxy_type": Anonymize<Inpglg3f6qcjg>;
            "delay": number;
        };
        /**
         * Unregister all proxy accounts for the sender.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * WARNING: This may be called on accounts created by `pure`, however if done, then
         * the unreserved fees will be inaccessible. **All access to this account will be lost.**
         */
        "remove_proxies": undefined;
        /**
         * Spawn a fresh new account that is guaranteed to be otherwise inaccessible, and
         * initialize it with a proxy of `proxy_type` for `origin` sender.
         *
         * Requires a `Signed` origin.
         *
         * - `proxy_type`: The type of the proxy that the sender will be registered as over the
         * new account. This will almost always be the most permissive `ProxyType` possible to
         * allow for maximum flexibility.
         * - `index`: A disambiguation index, in case this is called multiple times in the same
         * transaction (e.g. with `utility::batch`). Unless you're using `batch` you probably just
         * want to use `0`.
         * - `delay`: The announcement period required of the initial proxy. Will generally be
         * zero.
         *
         * Fails with `Duplicate` if this has already been called in this transaction, from the
         * same sender, with the same parameters.
         *
         * Fails if there are insufficient funds to pay for deposit.
         */
        "create_pure": {
            "proxy_type": Anonymize<Inpglg3f6qcjg>;
            "delay": number;
            "index": number;
        };
        /**
         * Removes a previously spawned pure proxy.
         *
         * WARNING: **All access to this account will be lost.** Any funds held in it will be
         * inaccessible.
         *
         * Requires a `Signed` origin, and the sender account must have been created by a call to
         * `pure` with corresponding parameters.
         *
         * - `spawner`: The account that originally called `pure` to create this account.
         * - `index`: The disambiguation index originally passed to `pure`. Probably `0`.
         * - `proxy_type`: The proxy type originally passed to `pure`.
         * - `height`: The height of the chain when the call to `pure` was processed.
         * - `ext_index`: The extrinsic index in which the call to `pure` was processed.
         *
         * Fails with `NoPermission` in case the caller is not a previously created pure
         * account whose `pure` call has corresponding parameters.
         */
        "kill_pure": {
            "spawner": MultiAddress;
            "proxy_type": Anonymize<Inpglg3f6qcjg>;
            "index": number;
            "height": number;
            "ext_index": number;
        };
        /**
         * Publish the hash of a proxy-call that will be made in the future.
         *
         * This must be called some number of blocks before the corresponding `proxy` is attempted
         * if the delay associated with the proxy relationship is greater than zero.
         *
         * No more than `MaxPending` announcements may be made at any one time.
         *
         * This will take a deposit of `AnnouncementDepositFactor` as well as
         * `AnnouncementDepositBase` if there are no other pending announcements.
         *
         * The dispatch origin for this call must be _Signed_ and a proxy of `real`.
         *
         * Parameters:
         * - `real`: The account that the proxy will make a call on behalf of.
         * - `call_hash`: The hash of the call to be made by the `real` account.
         */
        "announce": Anonymize<I2eb501t8s6hsq>;
        /**
         * Remove a given announcement.
         *
         * May be called by a proxy account to remove a call they previously announced and return
         * the deposit.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * Parameters:
         * - `real`: The account that the proxy will make a call on behalf of.
         * - `call_hash`: The hash of the call to be made by the `real` account.
         */
        "remove_announcement": Anonymize<I2eb501t8s6hsq>;
        /**
         * Remove the given announcement of a delegate.
         *
         * May be called by a target (proxied) account to remove a call that one of their delegates
         * (`delegate`) has announced they want to execute. The deposit is returned.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * Parameters:
         * - `delegate`: The account that previously announced the call.
         * - `call_hash`: The hash of the call to be made.
         */
        "reject_announcement": Anonymize<Ianmuoljk2sk1u>;
        /**
         * Dispatch the given `call` from an account that the sender is authorized for through
         * `add_proxy`.
         *
         * Removes any corresponding announcement(s).
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * Parameters:
         * - `real`: The account that the proxy will make a call on behalf of.
         * - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
         * - `call`: The call to be made by the `real` account.
         */
        "proxy_announced": {
            "delegate": MultiAddress;
            "real": MultiAddress;
            "force_proxy_type"?: Anonymize<I4sv79c6siq7sq>;
            "call": TxCallData;
        };
        /**
         * Poke / Adjust deposits made for proxies and announcements based on current values.
         * This can be used by accounts to possibly lower their locked amount.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * The transaction fee is waived if the deposit amount has changed.
         *
         * Emits `DepositPoked` if successful.
         */
        "poke_deposit": undefined;
    }>;
    "Multisig": Enum<{
        /**
         * Immediately dispatch a multi-signature call using a single approval from the caller.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * - `other_signatories`: The accounts (other than the sender) who are part of the
         * multi-signature, but do not participate in the approval process.
         * - `call`: The call to be executed.
         *
         * Result is equivalent to the dispatched result.
         *
         * ## Complexity
         * O(Z + C) where Z is the length of the call and C its execution weight.
         */
        "as_multi_threshold_1": {
            "other_signatories": Anonymize<Ia2lhg7l2hilo3>;
            "call": TxCallData;
        };
        /**
         * Register approval for a dispatch to be made from a deterministic composite account if
         * approved by a total of `threshold - 1` of `other_signatories`.
         *
         * If there are enough, then dispatch the call.
         *
         * Payment: `DepositBase` will be reserved if this is the first approval, plus
         * `threshold` times `DepositFactor`. It is returned once this dispatch happens or
         * is cancelled.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * - `threshold`: The total number of approvals for this dispatch before it is executed.
         * - `other_signatories`: The accounts (other than the sender) who can approve this
         * dispatch. May not be empty.
         * - `maybe_timepoint`: If this is the first approval, then this must be `None`. If it is
         * not the first approval, then it must be `Some`, with the timepoint (block number and
         * transaction index) of the first approval transaction.
         * - `call`: The call to be executed.
         *
         * NOTE: Unless this is the final approval, you will generally want to use
         * `approve_as_multi` instead, since it only requires a hash of the call.
         *
         * Result is equivalent to the dispatched result if `threshold` is exactly `1`. Otherwise
         * on success, result is `Ok` and the result from the interior call, if it was executed,
         * may be found in the deposited `MultisigExecuted` event.
         *
         * ## Complexity
         * - `O(S + Z + Call)`.
         * - Up to one balance-reserve or unreserve operation.
         * - One passthrough operation, one insert, both `O(S)` where `S` is the number of
         * signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
         * - One call encode & hash, both of complexity `O(Z)` where `Z` is tx-len.
         * - One encode & hash, both of complexity `O(S)`.
         * - Up to one binary search and insert (`O(logS + S)`).
         * - I/O: 1 read `O(S)`, up to 1 mutate `O(S)`. Up to one remove.
         * - One event.
         * - The weight of the `call`.
         * - Storage: inserts one item, value size bounded by `MaxSignatories`, with a deposit
         * taken for its lifetime of `DepositBase + threshold * DepositFactor`.
         */
        "as_multi": {
            "threshold": number;
            "other_signatories": Anonymize<Ia2lhg7l2hilo3>;
            "maybe_timepoint"?: Anonymize<I95jfd8j5cr5eh>;
            "call": TxCallData;
            "max_weight": Anonymize<I4q39t5hn830vp>;
        };
        /**
         * Register approval for a dispatch to be made from a deterministic composite account if
         * approved by a total of `threshold - 1` of `other_signatories`.
         *
         * Payment: `DepositBase` will be reserved if this is the first approval, plus
         * `threshold` times `DepositFactor`. It is returned once this dispatch happens or
         * is cancelled.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * - `threshold`: The total number of approvals for this dispatch before it is executed.
         * - `other_signatories`: The accounts (other than the sender) who can approve this
         * dispatch. May not be empty.
         * - `maybe_timepoint`: If this is the first approval, then this must be `None`. If it is
         * not the first approval, then it must be `Some`, with the timepoint (block number and
         * transaction index) of the first approval transaction.
         * - `call_hash`: The hash of the call to be executed.
         *
         * NOTE: If this is the final approval, you will want to use `as_multi` instead.
         *
         * ## Complexity
         * - `O(S)`.
         * - Up to one balance-reserve or unreserve operation.
         * - One passthrough operation, one insert, both `O(S)` where `S` is the number of
         * signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
         * - One encode & hash, both of complexity `O(S)`.
         * - Up to one binary search and insert (`O(logS + S)`).
         * - I/O: 1 read `O(S)`, up to 1 mutate `O(S)`. Up to one remove.
         * - One event.
         * - Storage: inserts one item, value size bounded by `MaxSignatories`, with a deposit
         * taken for its lifetime of `DepositBase + threshold * DepositFactor`.
         */
        "approve_as_multi": Anonymize<Ideaemvoneh309>;
        /**
         * Cancel a pre-existing, on-going multisig transaction. Any deposit reserved previously
         * for this operation will be unreserved on success.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * - `threshold`: The total number of approvals for this dispatch before it is executed.
         * - `other_signatories`: The accounts (other than the sender) who can approve this
         * dispatch. May not be empty.
         * - `timepoint`: The timepoint (block number and transaction index) of the first approval
         * transaction for this dispatch.
         * - `call_hash`: The hash of the call to be executed.
         *
         * ## Complexity
         * - `O(S)`.
         * - Up to one balance-reserve or unreserve operation.
         * - One passthrough operation, one insert, both `O(S)` where `S` is the number of
         * signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
         * - One encode & hash, both of complexity `O(S)`.
         * - One event.
         * - I/O: 1 read `O(S)`, one remove.
         * - Storage: removes one item.
         */
        "cancel_as_multi": Anonymize<I3d9o9d7epp66v>;
        /**
         * Poke the deposit reserved for an existing multisig operation.
         *
         * The dispatch origin for this call must be _Signed_ and must be the original depositor of
         * the multisig operation.
         *
         * The transaction fee is waived if the deposit amount has changed.
         *
         * - `threshold`: The total number of approvals needed for this multisig.
         * - `other_signatories`: The accounts (other than the sender) who are part of the
         * multisig.
         * - `call_hash`: The hash of the call this deposit is reserved for.
         *
         * Emits `DepositPoked` if successful.
         */
        "poke_deposit": Anonymize<I6lqh1vgb4mcja>;
    }>;
    "Preimage": Anonymize<If81ks88t5mpk5>;
    "Bounties": Anonymize<I1nnef4ljub6d0>;
    "ChildBounties": Anonymize<I1b6drdhvt5hl9>;
    "ElectionProviderMultiPhase": Enum<{
        /**
         * Submit a solution for the unsigned phase.
         *
         * The dispatch origin fo this call must be __none__.
         *
         * This submission is checked on the fly. Moreover, this unsigned solution is only
         * validated when submitted to the pool from the **local** node. Effectively, this means
         * that only active validators can submit this transaction when authoring a block (similar
         * to an inherent).
         *
         * To prevent any incorrect solution (and thus wasted time/weight), this transaction will
         * panic if the solution submitted by the validator is invalid in any way, effectively
         * putting their authoring reward at risk.
         *
         * No deposit or reward is associated with this submission.
         */
        "submit_unsigned": {
            "raw_solution": Anonymize<I6s33laenmuupn>;
            "witness": Anonymize<Iasd2iat48n080>;
        };
        /**
         * Set a new value for `MinimumUntrustedScore`.
         *
         * Dispatch origin must be aligned with `T::ForceOrigin`.
         *
         * This check can be turned off by setting the value to `None`.
         */
        "set_minimum_untrusted_score": Anonymize<I80q14um2s2ckg>;
        /**
         * Set a solution in the queue, to be handed out to the client of this pallet in the next
         * call to `ElectionProvider::elect`.
         *
         * This can only be set by `T::ForceOrigin`, and only when the phase is `Emergency`.
         *
         * The solution is not checked for any feasibility and is assumed to be trustworthy, as any
         * feasibility check itself can in principle cause the election process to fail (due to
         * memory/weight constrains).
         */
        "set_emergency_election_result": Anonymize<I5qs1t1erfi7u8>;
        /**
         * Submit a solution for the signed phase.
         *
         * The dispatch origin fo this call must be __signed__.
         *
         * The solution is potentially queued, based on the claimed score and processed at the end
         * of the signed phase.
         *
         * A deposit is reserved and recorded for the solution. Based on the outcome, the solution
         * might be rewarded, slashed, or get all or a part of the deposit back.
         */
        "submit": {
            "raw_solution": Anonymize<I6s33laenmuupn>;
        };
        /**
         * Trigger the governance fallback.
         *
         * This can only be called when [`Phase::Emergency`] is enabled, as an alternative to
         * calling [`Call::set_emergency_election_result`].
         */
        "governance_fallback": Anonymize<Ifsme8miqq9006>;
    }>;
    "Nis": Enum<{
        /**
         * Place a bid.
         *
         * Origin must be Signed, and account must have at least `amount` in free balance.
         *
         * - `amount`: The amount of the bid; these funds will be reserved, and if/when
         * consolidated, removed. Must be at least `MinBid`.
         * - `duration`: The number of periods before which the newly consolidated bid may be
         * thawed. Must be greater than 1 and no more than `QueueCount`.
         *
         * Complexities:
         * - `Queues[duration].len()` (just take max).
         */
        "place_bid": {
            "amount": bigint;
            "duration": number;
        };
        /**
         * Retract a previously placed bid.
         *
         * Origin must be Signed, and the account should have previously issued a still-active bid
         * of `amount` for `duration`.
         *
         * - `amount`: The amount of the previous bid.
         * - `duration`: The duration of the previous bid.
         */
        "retract_bid": {
            "amount": bigint;
            "duration": number;
        };
        /**
         * Ensure we have sufficient funding for all potential payouts.
         *
         * - `origin`: Must be accepted by `FundOrigin`.
         */
        "fund_deficit": undefined;
        /**
         * Reduce or remove an outstanding receipt, placing the according proportion of funds into
         * the account of the owner.
         *
         * - `origin`: Must be Signed and the account must be the owner of the receipt `index` as
         * well as any fungible counterpart.
         * - `index`: The index of the receipt.
         * - `portion`: If `Some`, then only the given portion of the receipt should be thawed. If
         * `None`, then all of it should be.
         */
        "thaw_private": {
            "index": number;
            "maybe_proportion"?: Anonymize<I35p85j063s0il>;
        };
        /**
         * Reduce or remove an outstanding receipt, placing the according proportion of funds into
         * the account of the owner.
         *
         * - `origin`: Must be Signed and the account must be the owner of the fungible counterpart
         * for receipt `index`.
         * - `index`: The index of the receipt.
         */
        "thaw_communal": Anonymize<I666bl2fqjkejo>;
        /**
         * Make a private receipt communal and create fungible counterparts for its owner.
         */
        "communify": Anonymize<I666bl2fqjkejo>;
        /**
         * Make a communal receipt private and burn fungible counterparts from its owner.
         */
        "privatize": Anonymize<I666bl2fqjkejo>;
    }>;
    "NisCounterpartBalances": Anonymize<I9svldsp29mh87>;
    "VoterList": Anonymize<Ifvfo1l0vu2o7e>;
    "NominationPools": Anonymize<I57mljkkr28m9p>;
    "FastUnstake": Anonymize<I44snhj1gahvrd>;
    "Configuration": Anonymize<I3ah0kpgrv4i88>;
    "ParasShared": undefined;
    "ParaInclusion": undefined;
    "ParaInherent": Anonymize<I1nu19212e8egv>;
    "Paras": Anonymize<Ie2dden5k4kk7t>;
    "Initializer": Anonymize<Ieggtnkc96vvt7>;
    "Hrmp": Anonymize<I45adic8nko129>;
    "ParasDisputes": Anonymize<Ifkh1ep7g9h3rv>;
    "ParasSlashing": Anonymize<I7a6dbilbccifr>;
    "OnDemandAssignmentProvider": Anonymize<I1qq9dc763kccf>;
    "Registrar": Anonymize<Icclqj5sge2nc7>;
    "Slots": Anonymize<Iafhis924j14hg>;
    "Auctions": Anonymize<I4a8qeimc5p3qn>;
    "Crowdloan": Anonymize<Iaj4q75nu5v2i2>;
    "Coretime": Anonymize<Ifr31g56am9igr>;
    "XcmPallet": Anonymize<I6k1inef986368>;
    "MessageQueue": Anonymize<I3lic4llm6egbr>;
    "AssetRate": Anonymize<If582h5gr5gh6f>;
    "Beefy": Anonymize<Idmcmrk34p8gic>;
}>;
export type I8ciua774oe5di = AnonymousEnum<{
    "system": DispatchRawOrigin;
    "Origins": Enum<{
        "StakingAdmin": undefined;
        "Treasurer": undefined;
        "FellowshipAdmin": undefined;
        "GeneralAdmin": undefined;
        "AuctionAdmin": undefined;
        "LeaseAdmin": undefined;
        "ReferendumCanceller": undefined;
        "ReferendumKiller": undefined;
        "SmallTipper": undefined;
        "BigTipper": undefined;
        "SmallSpender": undefined;
        "MediumSpender": undefined;
        "BigSpender": undefined;
        "WhitelistedCaller": undefined;
        "FellowshipInitiates": undefined;
        "Fellows": undefined;
        "FellowshipExperts": undefined;
        "FellowshipMasters": undefined;
        "Fellowship1Dan": undefined;
        "Fellowship2Dan": undefined;
        "Fellowship3Dan": undefined;
        "Fellowship4Dan": undefined;
        "Fellowship5Dan": undefined;
        "Fellowship6Dan": undefined;
        "Fellowship7Dan": undefined;
        "Fellowship8Dan": undefined;
        "Fellowship9Dan": undefined;
        "WishForChange": undefined;
    }>;
    "ParachainsOrigin": ParachainsOrigin;
    "XcmPallet": Anonymize<Icvilmd7qu30i4>;
}>;
export type I4sv79c6siq7sq = (Anonymize<Inpglg3f6qcjg>) | undefined;
export type Inpglg3f6qcjg = AnonymousEnum<{
    "Any": undefined;
    "NonTransfer": undefined;
    "Governance": undefined;
    "Staking": undefined;
    "CancelProxy": undefined;
    "Auction": undefined;
    "Society": undefined;
    "NominationPools": undefined;
    "Spokesperson": undefined;
    "ParaRegistration": undefined;
}>;
export type I6s33laenmuupn = {
    "solution": {
        "votes1": Anonymize<Iep4uo61810hfs>;
        "votes2": Anonymize<Ickjq69hlul8c3>;
        "votes3": Anonymize<Icf645ln9bi1bj>;
        "votes4": Anonymize<I8nospv7k5s457>;
        "votes5": Anonymize<Iig9pofg77rah>;
        "votes6": Anonymize<Irttjt9tghoc0>;
        "votes7": Anonymize<I3o5epjr2va0dl>;
        "votes8": Anonymize<I1gfnebceebqb5>;
        "votes9": Anonymize<Ibo38fh2dhj4it>;
        "votes10": Anonymize<Id4gvspmdh8h9l>;
        "votes11": Anonymize<I5be3ho5m1r68a>;
        "votes12": Anonymize<I7s2sh7cpuv56r>;
        "votes13": Anonymize<I5fq8855gfhmlo>;
        "votes14": Anonymize<I4mvok713k4g7o>;
        "votes15": Anonymize<I90tu9lmjmhfhd>;
        "votes16": Anonymize<I3cqaev9m4hn9m>;
        "votes17": Array<[number, FixedSizeArray<16, Anonymize<I5g2vv0ckl2m8b>>, number]>;
        "votes18": Array<[number, FixedSizeArray<17, Anonymize<I5g2vv0ckl2m8b>>, number]>;
        "votes19": Array<[number, FixedSizeArray<18, Anonymize<I5g2vv0ckl2m8b>>, number]>;
        "votes20": Array<[number, FixedSizeArray<19, Anonymize<I5g2vv0ckl2m8b>>, number]>;
        "votes21": Array<[number, FixedSizeArray<20, Anonymize<I5g2vv0ckl2m8b>>, number]>;
        "votes22": Array<[number, FixedSizeArray<21, Anonymize<I5g2vv0ckl2m8b>>, number]>;
        "votes23": Array<[number, FixedSizeArray<22, Anonymize<I5g2vv0ckl2m8b>>, number]>;
        "votes24": Array<[number, FixedSizeArray<23, Anonymize<I5g2vv0ckl2m8b>>, number]>;
    };
    "score": Anonymize<I8s6n43okuj2b1>;
    "round": number;
};
export type I7rv8d2nr55kkq = [Anonymize<I4c0s5cioidn76>, SS58String];
export type I1skq4cjkab59v = AnonymousEnum<{
    "System": Anonymize<Iekve0i6djpd9f>;
    "ParachainSystem": Anonymize<I5kev21p7u6ajb>;
    "Timestamp": Anonymize<I7d75gqfg6jh9c>;
    "ParachainInfo": undefined;
    "Balances": Anonymize<I9svldsp29mh87>;
    "Vesting": Anonymize<Icgf8vmtkbnu4u>;
    "CollatorSelection": Anonymize<I9dpq5287dur8b>;
    "Session": Anonymize<I77dda7hps0u37>;
    "XcmpQueue": Anonymize<Ib7tahn20bvsep>;
    "PolkadotXcm": Anonymize<I4up31a3q8cjhp>;
    "CumulusXcm": undefined;
    "ToKusamaXcmRouter": Anonymize<I6epb28bkd5aqn>;
    "MessageQueue": Anonymize<Ic2uoe7jdksosp>;
    "Utility": Enum<{
        /**
         * Send a batch of dispatch calls.
         *
         * May be called from any origin except `None`.
         *
         * - `calls`: The calls to be dispatched from the same origin. The number of call must not
         * exceed the constant: `batched_calls_limit` (available in constant metadata).
         *
         * If origin is root then the calls are dispatched without checking origin filter. (This
         * includes bypassing `frame_system::Config::BaseCallFilter`).
         *
         * ## Complexity
         * - O(C) where C is the number of calls to be batched.
         *
         * This will return `Ok` in all circumstances. To determine the success of the batch, an
         * event is deposited. If a call failed and the batch was interrupted, then the
         * `BatchInterrupted` event is deposited, along with the number of successful calls made
         * and the error of the failed call. If all were successful, then the `BatchCompleted`
         * event is deposited.
         */
        "batch": {
            "calls": Array<TxCallData>;
        };
        /**
         * Send a call through an indexed pseudonym of the sender.
         *
         * Filter from origin are passed along. The call will be dispatched with an origin which
         * use the same filter as the origin of this call.
         *
         * NOTE: If you need to ensure that any account-based filtering is not honored (i.e.
         * because you expect `proxy` to have been used prior in the call stack and you do not want
         * the call restrictions to apply to any sub-accounts), then use `as_multi_threshold_1`
         * in the Multisig pallet instead.
         *
         * NOTE: Prior to version *12, this was called `as_limited_sub`.
         *
         * The dispatch origin for this call must be _Signed_.
         */
        "as_derivative": {
            "index": number;
            "call": TxCallData;
        };
        /**
         * Send a batch of dispatch calls and atomically execute them.
         * The whole transaction will rollback and fail if any of the calls failed.
         *
         * May be called from any origin except `None`.
         *
         * - `calls`: The calls to be dispatched from the same origin. The number of call must not
         * exceed the constant: `batched_calls_limit` (available in constant metadata).
         *
         * If origin is root then the calls are dispatched without checking origin filter. (This
         * includes bypassing `frame_system::Config::BaseCallFilter`).
         *
         * ## Complexity
         * - O(C) where C is the number of calls to be batched.
         */
        "batch_all": {
            "calls": Array<TxCallData>;
        };
        /**
         * Dispatches a function call with a provided origin.
         *
         * The dispatch origin for this call must be _Root_.
         *
         * ## Complexity
         * - O(1).
         */
        "dispatch_as": {
            "as_origin": Anonymize<I42ficri7uep20>;
            "call": TxCallData;
        };
        /**
         * Send a batch of dispatch calls.
         * Unlike `batch`, it allows errors and won't interrupt.
         *
         * May be called from any origin except `None`.
         *
         * - `calls`: The calls to be dispatched from the same origin. The number of call must not
         * exceed the constant: `batched_calls_limit` (available in constant metadata).
         *
         * If origin is root then the calls are dispatch without checking origin filter. (This
         * includes bypassing `frame_system::Config::BaseCallFilter`).
         *
         * ## Complexity
         * - O(C) where C is the number of calls to be batched.
         */
        "force_batch": {
            "calls": Array<TxCallData>;
        };
        /**
         * Dispatch a function call with a specified weight.
         *
         * This function does not check the weight of the call, and instead allows the
         * Root origin to specify the weight of the call.
         *
         * The dispatch origin for this call must be _Root_.
         */
        "with_weight": {
            "call": TxCallData;
            "weight": Anonymize<I4q39t5hn830vp>;
        };
    }>;
    "Multisig": Enum<{
        /**
         * Immediately dispatch a multi-signature call using a single approval from the caller.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * - `other_signatories`: The accounts (other than the sender) who are part of the
         * multi-signature, but do not participate in the approval process.
         * - `call`: The call to be executed.
         *
         * Result is equivalent to the dispatched result.
         *
         * ## Complexity
         * O(Z + C) where Z is the length of the call and C its execution weight.
         */
        "as_multi_threshold_1": {
            "other_signatories": Anonymize<Ia2lhg7l2hilo3>;
            "call": TxCallData;
        };
        /**
         * Register approval for a dispatch to be made from a deterministic composite account if
         * approved by a total of `threshold - 1` of `other_signatories`.
         *
         * If there are enough, then dispatch the call.
         *
         * Payment: `DepositBase` will be reserved if this is the first approval, plus
         * `threshold` times `DepositFactor`. It is returned once this dispatch happens or
         * is cancelled.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * - `threshold`: The total number of approvals for this dispatch before it is executed.
         * - `other_signatories`: The accounts (other than the sender) who can approve this
         * dispatch. May not be empty.
         * - `maybe_timepoint`: If this is the first approval, then this must be `None`. If it is
         * not the first approval, then it must be `Some`, with the timepoint (block number and
         * transaction index) of the first approval transaction.
         * - `call`: The call to be executed.
         *
         * NOTE: Unless this is the final approval, you will generally want to use
         * `approve_as_multi` instead, since it only requires a hash of the call.
         *
         * Result is equivalent to the dispatched result if `threshold` is exactly `1`. Otherwise
         * on success, result is `Ok` and the result from the interior call, if it was executed,
         * may be found in the deposited `MultisigExecuted` event.
         *
         * ## Complexity
         * - `O(S + Z + Call)`.
         * - Up to one balance-reserve or unreserve operation.
         * - One passthrough operation, one insert, both `O(S)` where `S` is the number of
         * signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
         * - One call encode & hash, both of complexity `O(Z)` where `Z` is tx-len.
         * - One encode & hash, both of complexity `O(S)`.
         * - Up to one binary search and insert (`O(logS + S)`).
         * - I/O: 1 read `O(S)`, up to 1 mutate `O(S)`. Up to one remove.
         * - One event.
         * - The weight of the `call`.
         * - Storage: inserts one item, value size bounded by `MaxSignatories`, with a deposit
         * taken for its lifetime of `DepositBase + threshold * DepositFactor`.
         */
        "as_multi": {
            "threshold": number;
            "other_signatories": Anonymize<Ia2lhg7l2hilo3>;
            "maybe_timepoint"?: Anonymize<I95jfd8j5cr5eh>;
            "call": TxCallData;
            "max_weight": Anonymize<I4q39t5hn830vp>;
        };
        /**
         * Register approval for a dispatch to be made from a deterministic composite account if
         * approved by a total of `threshold - 1` of `other_signatories`.
         *
         * Payment: `DepositBase` will be reserved if this is the first approval, plus
         * `threshold` times `DepositFactor`. It is returned once this dispatch happens or
         * is cancelled.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * - `threshold`: The total number of approvals for this dispatch before it is executed.
         * - `other_signatories`: The accounts (other than the sender) who can approve this
         * dispatch. May not be empty.
         * - `maybe_timepoint`: If this is the first approval, then this must be `None`. If it is
         * not the first approval, then it must be `Some`, with the timepoint (block number and
         * transaction index) of the first approval transaction.
         * - `call_hash`: The hash of the call to be executed.
         *
         * NOTE: If this is the final approval, you will want to use `as_multi` instead.
         *
         * ## Complexity
         * - `O(S)`.
         * - Up to one balance-reserve or unreserve operation.
         * - One passthrough operation, one insert, both `O(S)` where `S` is the number of
         * signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
         * - One encode & hash, both of complexity `O(S)`.
         * - Up to one binary search and insert (`O(logS + S)`).
         * - I/O: 1 read `O(S)`, up to 1 mutate `O(S)`. Up to one remove.
         * - One event.
         * - Storage: inserts one item, value size bounded by `MaxSignatories`, with a deposit
         * taken for its lifetime of `DepositBase + threshold * DepositFactor`.
         */
        "approve_as_multi": Anonymize<Ideaemvoneh309>;
        /**
         * Cancel a pre-existing, on-going multisig transaction. Any deposit reserved previously
         * for this operation will be unreserved on success.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * - `threshold`: The total number of approvals for this dispatch before it is executed.
         * - `other_signatories`: The accounts (other than the sender) who can approve this
         * dispatch. May not be empty.
         * - `timepoint`: The timepoint (block number and transaction index) of the first approval
         * transaction for this dispatch.
         * - `call_hash`: The hash of the call to be executed.
         *
         * ## Complexity
         * - `O(S)`.
         * - Up to one balance-reserve or unreserve operation.
         * - One passthrough operation, one insert, both `O(S)` where `S` is the number of
         * signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
         * - One encode & hash, both of complexity `O(S)`.
         * - One event.
         * - I/O: 1 read `O(S)`, one remove.
         * - Storage: removes one item.
         */
        "cancel_as_multi": Anonymize<I3d9o9d7epp66v>;
    }>;
    "Proxy": Enum<{
        /**
         * Dispatch the given `call` from an account that the sender is authorised for through
         * `add_proxy`.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * Parameters:
         * - `real`: The account that the proxy will make a call on behalf of.
         * - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
         * - `call`: The call to be made by the `real` account.
         */
        "proxy": {
            "real": MultiAddress;
            "force_proxy_type"?: Anonymize<I7rk1n3vg3et43>;
            "call": TxCallData;
        };
        /**
         * Register a proxy account for the sender that is able to make calls on its behalf.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * Parameters:
         * - `proxy`: The account that the `caller` would like to make a proxy.
         * - `proxy_type`: The permissions allowed for this proxy account.
         * - `delay`: The announcement period required of the initial proxy. Will generally be
         * zero.
         */
        "add_proxy": Anonymize<Iovrcu9bfelfq>;
        /**
         * Unregister a proxy account for the sender.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * Parameters:
         * - `proxy`: The account that the `caller` would like to remove as a proxy.
         * - `proxy_type`: The permissions currently enabled for the removed proxy account.
         */
        "remove_proxy": Anonymize<Iovrcu9bfelfq>;
        /**
         * Unregister all proxy accounts for the sender.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * WARNING: This may be called on accounts created by `pure`, however if done, then
         * the unreserved fees will be inaccessible. **All access to this account will be lost.**
         */
        "remove_proxies": undefined;
        /**
         * Spawn a fresh new account that is guaranteed to be otherwise inaccessible, and
         * initialize it with a proxy of `proxy_type` for `origin` sender.
         *
         * Requires a `Signed` origin.
         *
         * - `proxy_type`: The type of the proxy that the sender will be registered as over the
         * new account. This will almost always be the most permissive `ProxyType` possible to
         * allow for maximum flexibility.
         * - `index`: A disambiguation index, in case this is called multiple times in the same
         * transaction (e.g. with `utility::batch`). Unless you're using `batch` you probably just
         * want to use `0`.
         * - `delay`: The announcement period required of the initial proxy. Will generally be
         * zero.
         *
         * Fails with `Duplicate` if this has already been called in this transaction, from the
         * same sender, with the same parameters.
         *
         * Fails if there are insufficient funds to pay for deposit.
         */
        "create_pure": Anonymize<Iefr8jgtgfk8um>;
        /**
         * Removes a previously spawned pure proxy.
         *
         * WARNING: **All access to this account will be lost.** Any funds held in it will be
         * inaccessible.
         *
         * Requires a `Signed` origin, and the sender account must have been created by a call to
         * `pure` with corresponding parameters.
         *
         * - `spawner`: The account that originally called `pure` to create this account.
         * - `index`: The disambiguation index originally passed to `pure`. Probably `0`.
         * - `proxy_type`: The proxy type originally passed to `pure`.
         * - `height`: The height of the chain when the call to `pure` was processed.
         * - `ext_index`: The extrinsic index in which the call to `pure` was processed.
         *
         * Fails with `NoPermission` in case the caller is not a previously created pure
         * account whose `pure` call has corresponding parameters.
         */
        "kill_pure": Anonymize<I3j05hul54uj7q>;
        /**
         * Publish the hash of a proxy-call that will be made in the future.
         *
         * This must be called some number of blocks before the corresponding `proxy` is attempted
         * if the delay associated with the proxy relationship is greater than zero.
         *
         * No more than `MaxPending` announcements may be made at any one time.
         *
         * This will take a deposit of `AnnouncementDepositFactor` as well as
         * `AnnouncementDepositBase` if there are no other pending announcements.
         *
         * The dispatch origin for this call must be _Signed_ and a proxy of `real`.
         *
         * Parameters:
         * - `real`: The account that the proxy will make a call on behalf of.
         * - `call_hash`: The hash of the call to be made by the `real` account.
         */
        "announce": Anonymize<I2eb501t8s6hsq>;
        /**
         * Remove a given announcement.
         *
         * May be called by a proxy account to remove a call they previously announced and return
         * the deposit.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * Parameters:
         * - `real`: The account that the proxy will make a call on behalf of.
         * - `call_hash`: The hash of the call to be made by the `real` account.
         */
        "remove_announcement": Anonymize<I2eb501t8s6hsq>;
        /**
         * Remove the given announcement of a delegate.
         *
         * May be called by a target (proxied) account to remove a call that one of their delegates
         * (`delegate`) has announced they want to execute. The deposit is returned.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * Parameters:
         * - `delegate`: The account that previously announced the call.
         * - `call_hash`: The hash of the call to be made.
         */
        "reject_announcement": Anonymize<Ianmuoljk2sk1u>;
        /**
         * Dispatch the given `call` from an account that the sender is authorized for through
         * `add_proxy`.
         *
         * Removes any corresponding announcement(s).
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * Parameters:
         * - `real`: The account that the proxy will make a call on behalf of.
         * - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
         * - `call`: The call to be made by the `real` account.
         */
        "proxy_announced": {
            "delegate": MultiAddress;
            "real": MultiAddress;
            "force_proxy_type"?: Anonymize<I7rk1n3vg3et43>;
            "call": TxCallData;
        };
    }>;
    "Assets": Anonymize<I84851acvod2ic>;
    "Uniques": Anonymize<Icu49uv7rfej74>;
    "Nfts": Anonymize<I1k4il7i5elhc7>;
    "ForeignAssets": Anonymize<I8ktel4pq9nbjk>;
    "PoolAssets": Anonymize<I84851acvod2ic>;
    "AssetConversion": Anonymize<I9eemk0c7gip8o>;
    "StateTrieMigration": Anonymize<I39l72gdmkk30t>;
}>;
export type I5kev21p7u6ajb = AnonymousEnum<{
    /**
     * Set the current validation data.
     *
     * This should be invoked exactly once per block. It will panic at the finalization
     * phase if the call was not invoked.
     *
     * The dispatch origin for this call must be `Inherent`
     *
     * As a side effect, this function upgrades the current validation function
     * if the appropriate time has come.
     */
    "set_validation_data": {
        "data": {
            "validation_data": Anonymize<Ifn6q3equiq9qi>;
            "relay_chain_state": Anonymize<Itom7fk49o0c9>;
            "downward_messages": Anonymize<I6ljjd4b5fa4ov>;
            "horizontal_messages": Array<[number, Array<Anonymize<I409qo0sfkbh16>>]>;
        };
    };
    "sudo_send_upward_message": Anonymize<Ifpj261e8s63m3>;
}>;
export type I4up31a3q8cjhp = AnonymousEnum<{
    "send": Anonymize<Ia5cotcvi888ln>;
    /**
     * Teleport some assets from the local chain to some destination chain.
     *
     * **This function is deprecated: Use `limited_teleport_assets` instead.**
     *
     * Fee payment on the destination side is made from the asset in the `assets` vector of
     * index `fee_asset_item`. The weight limit for fees is not provided and thus is unlimited,
     * with all fees taken as needed from the asset.
     *
     * - `origin`: Must be capable of withdrawing the `assets` and executing XCM.
     * - `dest`: Destination context for the assets. Will typically be `[Parent,
     * Parachain(..)]` to send from parachain to parachain, or `[Parachain(..)]` to send from
     * relay to parachain.
     * - `beneficiary`: A beneficiary location for the assets in the context of `dest`. Will
     * generally be an `AccountId32` value.
     * - `assets`: The assets to be withdrawn. This should include the assets used to pay the
     * fee on the `dest` chain.
     * - `fee_asset_item`: The index into `assets` of the item which should be used to pay
     * fees.
     */
    "teleport_assets": Anonymize<I21jsa919m88fd>;
    /**
     * Transfer some assets from the local chain to the destination chain through their local,
     * destination or remote reserve.
     *
     * `assets` must have same reserve location and may not be teleportable to `dest`.
     * - `assets` have local reserve: transfer assets to sovereign account of destination
     * chain and forward a notification XCM to `dest` to mint and deposit reserve-based
     * assets to `beneficiary`.
     * - `assets` have destination reserve: burn local assets and forward a notification to
     * `dest` chain to withdraw the reserve assets from this chain's sovereign account and
     * deposit them to `beneficiary`.
     * - `assets` have remote reserve: burn local assets, forward XCM to reserve chain to move
     * reserves from this chain's SA to `dest` chain's SA, and forward another XCM to `dest`
     * to mint and deposit reserve-based assets to `beneficiary`.
     *
     * **This function is deprecated: Use `limited_reserve_transfer_assets` instead.**
     *
     * Fee payment on the destination side is made from the asset in the `assets` vector of
     * index `fee_asset_item`. The weight limit for fees is not provided and thus is unlimited,
     * with all fees taken as needed from the asset.
     *
     * - `origin`: Must be capable of withdrawing the `assets` and executing XCM.
     * - `dest`: Destination context for the assets. Will typically be `[Parent,
     * Parachain(..)]` to send from parachain to parachain, or `[Parachain(..)]` to send from
     * relay to parachain.
     * - `beneficiary`: A beneficiary location for the assets in the context of `dest`. Will
     * generally be an `AccountId32` value.
     * - `assets`: The assets to be withdrawn. This should include the assets used to pay the
     * fee on the `dest` (and possibly reserve) chains.
     * - `fee_asset_item`: The index into `assets` of the item which should be used to pay
     * fees.
     */
    "reserve_transfer_assets": Anonymize<I21jsa919m88fd>;
    /**
     * Execute an XCM message from a local, signed, origin.
     *
     * An event is deposited indicating whether `msg` could be executed completely or only
     * partially.
     *
     * No more than `max_weight` will be used in its attempted execution. If this is less than
     * the maximum amount of weight that the message could take to be executed, then no
     * execution attempt will be made.
     */
    "execute": Anonymize<Iegif7m3upfe1k>;
    /**
     * Extoll that a particular destination can be communicated with through a particular
     * version of XCM.
     *
     * - `origin`: Must be an origin specified by AdminOrigin.
     * - `location`: The destination that is being described.
     * - `xcm_version`: The latest version of XCM that `location` supports.
     */
    "force_xcm_version": Anonymize<I9kt8c221c83ln>;
    /**
     * Set a safe XCM version (the version that XCM should be encoded with if the most recent
     * version a destination can accept is unknown).
     *
     * - `origin`: Must be an origin specified by AdminOrigin.
     * - `maybe_xcm_version`: The default XCM encoding version, or `None` to disable.
     */
    "force_default_xcm_version": Anonymize<Ic76kfh5ebqkpl>;
    /**
     * Ask a location to notify us regarding their XCM version and any changes to it.
     *
     * - `origin`: Must be an origin specified by AdminOrigin.
     * - `location`: The location to which we should subscribe for XCM version notifications.
     */
    "force_subscribe_version_notify": Anonymize<Icscpmubum33bq>;
    /**
     * Require that a particular destination should no longer notify us regarding any XCM
     * version changes.
     *
     * - `origin`: Must be an origin specified by AdminOrigin.
     * - `location`: The location to which we are currently subscribed for XCM version
     * notifications which we no longer desire.
     */
    "force_unsubscribe_version_notify": Anonymize<Icscpmubum33bq>;
    /**
     * Transfer some assets from the local chain to the destination chain through their local,
     * destination or remote reserve.
     *
     * `assets` must have same reserve location and may not be teleportable to `dest`.
     * - `assets` have local reserve: transfer assets to sovereign account of destination
     * chain and forward a notification XCM to `dest` to mint and deposit reserve-based
     * assets to `beneficiary`.
     * - `assets` have destination reserve: burn local assets and forward a notification to
     * `dest` chain to withdraw the reserve assets from this chain's sovereign account and
     * deposit them to `beneficiary`.
     * - `assets` have remote reserve: burn local assets, forward XCM to reserve chain to move
     * reserves from this chain's SA to `dest` chain's SA, and forward another XCM to `dest`
     * to mint and deposit reserve-based assets to `beneficiary`.
     *
     * Fee payment on the destination side is made from the asset in the `assets` vector of
     * index `fee_asset_item`, up to enough to pay for `weight_limit` of weight. If more weight
     * is needed than `weight_limit`, then the operation will fail and the sent assets may be
     * at risk.
     *
     * - `origin`: Must be capable of withdrawing the `assets` and executing XCM.
     * - `dest`: Destination context for the assets. Will typically be `[Parent,
     * Parachain(..)]` to send from parachain to parachain, or `[Parachain(..)]` to send from
     * relay to parachain.
     * - `beneficiary`: A beneficiary location for the assets in the context of `dest`. Will
     * generally be an `AccountId32` value.
     * - `assets`: The assets to be withdrawn. This should include the assets used to pay the
     * fee on the `dest` (and possibly reserve) chains.
     * - `fee_asset_item`: The index into `assets` of the item which should be used to pay
     * fees.
     * - `weight_limit`: The remote-side weight limit, if any, for the XCM fee purchase.
     */
    "limited_reserve_transfer_assets": Anonymize<I21d2olof7eb60>;
    /**
     * Teleport some assets from the local chain to some destination chain.
     *
     * Fee payment on the destination side is made from the asset in the `assets` vector of
     * index `fee_asset_item`, up to enough to pay for `weight_limit` of weight. If more weight
     * is needed than `weight_limit`, then the operation will fail and the sent assets may be
     * at risk.
     *
     * - `origin`: Must be capable of withdrawing the `assets` and executing XCM.
     * - `dest`: Destination context for the assets. Will typically be `[Parent,
     * Parachain(..)]` to send from parachain to parachain, or `[Parachain(..)]` to send from
     * relay to parachain.
     * - `beneficiary`: A beneficiary location for the assets in the context of `dest`. Will
     * generally be an `AccountId32` value.
     * - `assets`: The assets to be withdrawn. This should include the assets used to pay the
     * fee on the `dest` chain.
     * - `fee_asset_item`: The index into `assets` of the item which should be used to pay
     * fees.
     * - `weight_limit`: The remote-side weight limit, if any, for the XCM fee purchase.
     */
    "limited_teleport_assets": Anonymize<I21d2olof7eb60>;
    /**
     * Set or unset the global suspension state of the XCM executor.
     *
     * - `origin`: Must be an origin specified by AdminOrigin.
     * - `suspended`: `true` to suspend, `false` to resume.
     */
    "force_suspension": Anonymize<Ibgm4rnf22lal1>;
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
    "transfer_assets": Anonymize<I21d2olof7eb60>;
    /**
     * Claims assets trapped on this pallet because of leftover assets during XCM execution.
     *
     * - `origin`: Anyone can call this extrinsic.
     * - `assets`: The exact assets that were trapped. Use the version to specify what version
     * was the latest when they were trapped.
     * - `beneficiary`: The location/account where the claimed assets will be deposited.
     */
    "claim_assets": Anonymize<Ie68np0vpihith>;
    /**
     * Transfer assets from the local chain to the destination chain using explicit transfer
     * types for assets and fees.
     *
     * `assets` must have same reserve location or may be teleportable to `dest`. Caller must
     * provide the `assets_transfer_type` to be used for `assets`:
     * - `TransferType::LocalReserve`: transfer assets to sovereign account of destination
     * chain and forward a notification XCM to `dest` to mint and deposit reserve-based
     * assets to `beneficiary`.
     * - `TransferType::DestinationReserve`: burn local assets and forward a notification to
     * `dest` chain to withdraw the reserve assets from this chain's sovereign account and
     * deposit them to `beneficiary`.
     * - `TransferType::RemoteReserve(reserve)`: burn local assets, forward XCM to `reserve`
     * chain to move reserves from this chain's SA to `dest` chain's SA, and forward another
     * XCM to `dest` to mint and deposit reserve-based assets to `beneficiary`. Typically
     * the remote `reserve` is Asset Hub.
     * - `TransferType::Teleport`: burn local assets and forward XCM to `dest` chain to
     * mint/teleport assets and deposit them to `beneficiary`.
     *
     * On the destination chain, as well as any intermediary hops, `BuyExecution` is used to
     * buy execution using transferred `assets` identified by `remote_fees_id`.
     * Make sure enough of the specified `remote_fees_id` asset is included in the given list
     * of `assets`. `remote_fees_id` should be enough to pay for `weight_limit`. If more weight
     * is needed than `weight_limit`, then the operation will fail and the sent assets may be
     * at risk.
     *
     * `remote_fees_id` may use different transfer type than rest of `assets` and can be
     * specified through `fees_transfer_type`.
     *
     * The caller needs to specify what should happen to the transferred assets once they reach
     * the `dest` chain. This is done through the `custom_xcm_on_dest` parameter, which
     * contains the instructions to execute on `dest` as a final step.
     * This is usually as simple as:
     * `Xcm(vec![DepositAsset { assets: Wild(AllCounted(assets.len())), beneficiary }])`,
     * but could be something more exotic like sending the `assets` even further.
     *
     * - `origin`: Must be capable of withdrawing the `assets` and executing XCM.
     * - `dest`: Destination context for the assets. Will typically be `[Parent,
     * Parachain(..)]` to send from parachain to parachain, or `[Parachain(..)]` to send from
     * relay to parachain, or `(parents: 2, (GlobalConsensus(..), ..))` to send from
     * parachain across a bridge to another ecosystem destination.
     * - `assets`: The assets to be withdrawn. This should include the assets used to pay the
     * fee on the `dest` (and possibly reserve) chains.
     * - `assets_transfer_type`: The XCM `TransferType` used to transfer the `assets`.
     * - `remote_fees_id`: One of the included `assets` to be used to pay fees.
     * - `fees_transfer_type`: The XCM `TransferType` used to transfer the `fees` assets.
     * - `custom_xcm_on_dest`: The XCM to be executed on `dest` chain as the last step of the
     * transfer, which also determines what happens to the assets on the destination chain.
     * - `weight_limit`: The remote-side weight limit, if any, for the XCM fee purchase.
     */
    "transfer_assets_using_type_and_then": Anonymize<I9bnv6lu0crf1q>;
}>;
export type I42ficri7uep20 = AnonymousEnum<{
    "system": DispatchRawOrigin;
    "PolkadotXcm": Anonymize<Icvilmd7qu30i4>;
    "CumulusXcm": Anonymize<I3in0d0lb61qi8>;
}>;
export type I7rk1n3vg3et43 = (Anonymize<I5ftepkjop3g1u>) | undefined;
export type I5ftepkjop3g1u = AnonymousEnum<{
    "Any": undefined;
    "NonTransfer": undefined;
    "CancelProxy": undefined;
    "Assets": undefined;
    "AssetOwner": undefined;
    "AssetManager": undefined;
    "Collator": undefined;
}>;
export type Iovrcu9bfelfq = {
    "delegate": MultiAddress;
    "proxy_type": Anonymize<I5ftepkjop3g1u>;
    "delay": number;
};
export type Iefr8jgtgfk8um = {
    "proxy_type": Anonymize<I5ftepkjop3g1u>;
    "delay": number;
    "index": number;
};
export type I3j05hul54uj7q = {
    "spawner": MultiAddress;
    "proxy_type": Anonymize<I5ftepkjop3g1u>;
    "index": number;
    "height": number;
    "ext_index": number;
};
export type I8ktel4pq9nbjk = AnonymousEnum<{
    /**
     * Issue a new class of fungible assets from a public origin.
     *
     * This new asset class has no assets initially and its owner is the origin.
     *
     * The origin must conform to the configured `CreateOrigin` and have sufficient funds free.
     *
     * Funds of sender are reserved by `AssetDeposit`.
     *
     * Parameters:
     * - `id`: The identifier of the new asset. This must not be currently in use to identify
     * an existing asset. If [`NextAssetId`] is set, then this must be equal to it.
     * - `admin`: The admin of this class of assets. The admin is the initial address of each
     * member of the asset class's admin team.
     * - `min_balance`: The minimum balance of this new asset that any single account must
     * have. If an account's balance is reduced below this, then it collapses to zero.
     *
     * Emits `Created` event when successful.
     *
     * Weight: `O(1)`
     */
    "create": {
        "id": Anonymize<I4c0s5cioidn76>;
        "admin": MultiAddress;
        "min_balance": bigint;
    };
    /**
     * Issue a new class of fungible assets from a privileged origin.
     *
     * This new asset class has no assets initially.
     *
     * The origin must conform to `ForceOrigin`.
     *
     * Unlike `create`, no funds are reserved.
     *
     * - `id`: The identifier of the new asset. This must not be currently in use to identify
     * an existing asset. If [`NextAssetId`] is set, then this must be equal to it.
     * - `owner`: The owner of this class of assets. The owner has full superuser permissions
     * over this asset, but may later change and configure the permissions using
     * `transfer_ownership` and `set_team`.
     * - `min_balance`: The minimum balance of this new asset that any single account must
     * have. If an account's balance is reduced below this, then it collapses to zero.
     *
     * Emits `ForceCreated` event when successful.
     *
     * Weight: `O(1)`
     */
    "force_create": {
        "id": Anonymize<I4c0s5cioidn76>;
        "owner": MultiAddress;
        "is_sufficient": boolean;
        "min_balance": bigint;
    };
    /**
     * Start the process of destroying a fungible asset class.
     *
     * `start_destroy` is the first in a series of extrinsics that should be called, to allow
     * destruction of an asset class.
     *
     * The origin must conform to `ForceOrigin` or must be `Signed` by the asset's `owner`.
     *
     * - `id`: The identifier of the asset to be destroyed. This must identify an existing
     * asset.
     */
    "start_destroy": {
        "id": Anonymize<I4c0s5cioidn76>;
    };
    /**
     * Destroy all accounts associated with a given asset.
     *
     * `destroy_accounts` should only be called after `start_destroy` has been called, and the
     * asset is in a `Destroying` state.
     *
     * Due to weight restrictions, this function may need to be called multiple times to fully
     * destroy all accounts. It will destroy `RemoveItemsLimit` accounts at a time.
     *
     * - `id`: The identifier of the asset to be destroyed. This must identify an existing
     * asset.
     *
     * Each call emits the `Event::DestroyedAccounts` event.
     */
    "destroy_accounts": {
        "id": Anonymize<I4c0s5cioidn76>;
    };
    /**
     * Destroy all approvals associated with a given asset up to the max (T::RemoveItemsLimit).
     *
     * `destroy_approvals` should only be called after `start_destroy` has been called, and the
     * asset is in a `Destroying` state.
     *
     * Due to weight restrictions, this function may need to be called multiple times to fully
     * destroy all approvals. It will destroy `RemoveItemsLimit` approvals at a time.
     *
     * - `id`: The identifier of the asset to be destroyed. This must identify an existing
     * asset.
     *
     * Each call emits the `Event::DestroyedApprovals` event.
     */
    "destroy_approvals": {
        "id": Anonymize<I4c0s5cioidn76>;
    };
    /**
     * Complete destroying asset and unreserve currency.
     *
     * `finish_destroy` should only be called after `start_destroy` has been called, and the
     * asset is in a `Destroying` state. All accounts or approvals should be destroyed before
     * hand.
     *
     * - `id`: The identifier of the asset to be destroyed. This must identify an existing
     * asset.
     *
     * Each successful call emits the `Event::Destroyed` event.
     */
    "finish_destroy": {
        "id": Anonymize<I4c0s5cioidn76>;
    };
    /**
     * Mint assets of a particular class.
     *
     * The origin must be Signed and the sender must be the Issuer of the asset `id`.
     *
     * - `id`: The identifier of the asset to have some amount minted.
     * - `beneficiary`: The account to be credited with the minted assets.
     * - `amount`: The amount of the asset to be minted.
     *
     * Emits `Issued` event when successful.
     *
     * Weight: `O(1)`
     * Modes: Pre-existing balance of `beneficiary`; Account pre-existence of `beneficiary`.
     */
    "mint": {
        "id": Anonymize<I4c0s5cioidn76>;
        "beneficiary": MultiAddress;
        "amount": bigint;
    };
    /**
     * Reduce the balance of `who` by as much as possible up to `amount` assets of `id`.
     *
     * Origin must be Signed and the sender should be the Manager of the asset `id`.
     *
     * Bails with `NoAccount` if the `who` is already dead.
     *
     * - `id`: The identifier of the asset to have some amount burned.
     * - `who`: The account to be debited from.
     * - `amount`: The maximum amount by which `who`'s balance should be reduced.
     *
     * Emits `Burned` with the actual amount burned. If this takes the balance to below the
     * minimum for the asset, then the amount burned is increased to take it to zero.
     *
     * Weight: `O(1)`
     * Modes: Post-existence of `who`; Pre & post Zombie-status of `who`.
     */
    "burn": {
        "id": Anonymize<I4c0s5cioidn76>;
        "who": MultiAddress;
        "amount": bigint;
    };
    /**
     * Move some assets from the sender account to another.
     *
     * Origin must be Signed.
     *
     * - `id`: The identifier of the asset to have some amount transferred.
     * - `target`: The account to be credited.
     * - `amount`: The amount by which the sender's balance of assets should be reduced and
     * `target`'s balance increased. The amount actually transferred may be slightly greater in
     * the case that the transfer would otherwise take the sender balance above zero but below
     * the minimum balance. Must be greater than zero.
     *
     * Emits `Transferred` with the actual amount transferred. If this takes the source balance
     * to below the minimum for the asset, then the amount transferred is increased to take it
     * to zero.
     *
     * Weight: `O(1)`
     * Modes: Pre-existence of `target`; Post-existence of sender; Account pre-existence of
     * `target`.
     */
    "transfer": {
        "id": Anonymize<I4c0s5cioidn76>;
        "target": MultiAddress;
        "amount": bigint;
    };
    /**
     * Move some assets from the sender account to another, keeping the sender account alive.
     *
     * Origin must be Signed.
     *
     * - `id`: The identifier of the asset to have some amount transferred.
     * - `target`: The account to be credited.
     * - `amount`: The amount by which the sender's balance of assets should be reduced and
     * `target`'s balance increased. The amount actually transferred may be slightly greater in
     * the case that the transfer would otherwise take the sender balance above zero but below
     * the minimum balance. Must be greater than zero.
     *
     * Emits `Transferred` with the actual amount transferred. If this takes the source balance
     * to below the minimum for the asset, then the amount transferred is increased to take it
     * to zero.
     *
     * Weight: `O(1)`
     * Modes: Pre-existence of `target`; Post-existence of sender; Account pre-existence of
     * `target`.
     */
    "transfer_keep_alive": {
        "id": Anonymize<I4c0s5cioidn76>;
        "target": MultiAddress;
        "amount": bigint;
    };
    /**
     * Move some assets from one account to another.
     *
     * Origin must be Signed and the sender should be the Admin of the asset `id`.
     *
     * - `id`: The identifier of the asset to have some amount transferred.
     * - `source`: The account to be debited.
     * - `dest`: The account to be credited.
     * - `amount`: The amount by which the `source`'s balance of assets should be reduced and
     * `dest`'s balance increased. The amount actually transferred may be slightly greater in
     * the case that the transfer would otherwise take the `source` balance above zero but
     * below the minimum balance. Must be greater than zero.
     *
     * Emits `Transferred` with the actual amount transferred. If this takes the source balance
     * to below the minimum for the asset, then the amount transferred is increased to take it
     * to zero.
     *
     * Weight: `O(1)`
     * Modes: Pre-existence of `dest`; Post-existence of `source`; Account pre-existence of
     * `dest`.
     */
    "force_transfer": {
        "id": Anonymize<I4c0s5cioidn76>;
        "source": MultiAddress;
        "dest": MultiAddress;
        "amount": bigint;
    };
    /**
     * Disallow further unprivileged transfers of an asset `id` from an account `who`. `who`
     * must already exist as an entry in `Account`s of the asset. If you want to freeze an
     * account that does not have an entry, use `touch_other` first.
     *
     * Origin must be Signed and the sender should be the Freezer of the asset `id`.
     *
     * - `id`: The identifier of the asset to be frozen.
     * - `who`: The account to be frozen.
     *
     * Emits `Frozen`.
     *
     * Weight: `O(1)`
     */
    "freeze": {
        "id": Anonymize<I4c0s5cioidn76>;
        "who": MultiAddress;
    };
    /**
     * Allow unprivileged transfers to and from an account again.
     *
     * Origin must be Signed and the sender should be the Admin of the asset `id`.
     *
     * - `id`: The identifier of the asset to be frozen.
     * - `who`: The account to be unfrozen.
     *
     * Emits `Thawed`.
     *
     * Weight: `O(1)`
     */
    "thaw": {
        "id": Anonymize<I4c0s5cioidn76>;
        "who": MultiAddress;
    };
    /**
     * Disallow further unprivileged transfers for the asset class.
     *
     * Origin must be Signed and the sender should be the Freezer of the asset `id`.
     *
     * - `id`: The identifier of the asset to be frozen.
     *
     * Emits `Frozen`.
     *
     * Weight: `O(1)`
     */
    "freeze_asset": {
        "id": Anonymize<I4c0s5cioidn76>;
    };
    /**
     * Allow unprivileged transfers for the asset again.
     *
     * Origin must be Signed and the sender should be the Admin of the asset `id`.
     *
     * - `id`: The identifier of the asset to be thawed.
     *
     * Emits `Thawed`.
     *
     * Weight: `O(1)`
     */
    "thaw_asset": {
        "id": Anonymize<I4c0s5cioidn76>;
    };
    /**
     * Change the Owner of an asset.
     *
     * Origin must be Signed and the sender should be the Owner of the asset `id`.
     *
     * - `id`: The identifier of the asset.
     * - `owner`: The new Owner of this asset.
     *
     * Emits `OwnerChanged`.
     *
     * Weight: `O(1)`
     */
    "transfer_ownership": {
        "id": Anonymize<I4c0s5cioidn76>;
        "owner": MultiAddress;
    };
    /**
     * Change the Issuer, Admin and Freezer of an asset.
     *
     * Origin must be Signed and the sender should be the Owner of the asset `id`.
     *
     * - `id`: The identifier of the asset to be frozen.
     * - `issuer`: The new Issuer of this asset.
     * - `admin`: The new Admin of this asset.
     * - `freezer`: The new Freezer of this asset.
     *
     * Emits `TeamChanged`.
     *
     * Weight: `O(1)`
     */
    "set_team": {
        "id": Anonymize<I4c0s5cioidn76>;
        "issuer": MultiAddress;
        "admin": MultiAddress;
        "freezer": MultiAddress;
    };
    /**
     * Set the metadata for an asset.
     *
     * Origin must be Signed and the sender should be the Owner of the asset `id`.
     *
     * Funds of sender are reserved according to the formula:
     * `MetadataDepositBase + MetadataDepositPerByte * (name.len + symbol.len)` taking into
     * account any already reserved funds.
     *
     * - `id`: The identifier of the asset to update.
     * - `name`: The user friendly name of this asset. Limited in length by `StringLimit`.
     * - `symbol`: The exchange symbol for this asset. Limited in length by `StringLimit`.
     * - `decimals`: The number of decimals this asset uses to represent one unit.
     *
     * Emits `MetadataSet`.
     *
     * Weight: `O(1)`
     */
    "set_metadata": {
        "id": Anonymize<I4c0s5cioidn76>;
        "name": Binary;
        "symbol": Binary;
        "decimals": number;
    };
    /**
     * Clear the metadata for an asset.
     *
     * Origin must be Signed and the sender should be the Owner of the asset `id`.
     *
     * Any deposit is freed for the asset owner.
     *
     * - `id`: The identifier of the asset to clear.
     *
     * Emits `MetadataCleared`.
     *
     * Weight: `O(1)`
     */
    "clear_metadata": {
        "id": Anonymize<I4c0s5cioidn76>;
    };
    /**
     * Force the metadata for an asset to some value.
     *
     * Origin must be ForceOrigin.
     *
     * Any deposit is left alone.
     *
     * - `id`: The identifier of the asset to update.
     * - `name`: The user friendly name of this asset. Limited in length by `StringLimit`.
     * - `symbol`: The exchange symbol for this asset. Limited in length by `StringLimit`.
     * - `decimals`: The number of decimals this asset uses to represent one unit.
     *
     * Emits `MetadataSet`.
     *
     * Weight: `O(N + S)` where N and S are the length of the name and symbol respectively.
     */
    "force_set_metadata": {
        "id": Anonymize<I4c0s5cioidn76>;
        "name": Binary;
        "symbol": Binary;
        "decimals": number;
        "is_frozen": boolean;
    };
    /**
     * Clear the metadata for an asset.
     *
     * Origin must be ForceOrigin.
     *
     * Any deposit is returned.
     *
     * - `id`: The identifier of the asset to clear.
     *
     * Emits `MetadataCleared`.
     *
     * Weight: `O(1)`
     */
    "force_clear_metadata": {
        "id": Anonymize<I4c0s5cioidn76>;
    };
    /**
     * Alter the attributes of a given asset.
     *
     * Origin must be `ForceOrigin`.
     *
     * - `id`: The identifier of the asset.
     * - `owner`: The new Owner of this asset.
     * - `issuer`: The new Issuer of this asset.
     * - `admin`: The new Admin of this asset.
     * - `freezer`: The new Freezer of this asset.
     * - `min_balance`: The minimum balance of this new asset that any single account must
     * have. If an account's balance is reduced below this, then it collapses to zero.
     * - `is_sufficient`: Whether a non-zero balance of this asset is deposit of sufficient
     * value to account for the state bloat associated with its balance storage. If set to
     * `true`, then non-zero balances may be stored without a `consumer` reference (and thus
     * an ED in the Balances pallet or whatever else is used to control user-account state
     * growth).
     * - `is_frozen`: Whether this asset class is frozen except for permissioned/admin
     * instructions.
     *
     * Emits `AssetStatusChanged` with the identity of the asset.
     *
     * Weight: `O(1)`
     */
    "force_asset_status": {
        "id": Anonymize<I4c0s5cioidn76>;
        "owner": MultiAddress;
        "issuer": MultiAddress;
        "admin": MultiAddress;
        "freezer": MultiAddress;
        "min_balance": bigint;
        "is_sufficient": boolean;
        "is_frozen": boolean;
    };
    /**
     * Approve an amount of asset for transfer by a delegated third-party account.
     *
     * Origin must be Signed.
     *
     * Ensures that `ApprovalDeposit` worth of `Currency` is reserved from signing account
     * for the purpose of holding the approval. If some non-zero amount of assets is already
     * approved from signing account to `delegate`, then it is topped up or unreserved to
     * meet the right value.
     *
     * NOTE: The signing account does not need to own `amount` of assets at the point of
     * making this call.
     *
     * - `id`: The identifier of the asset.
     * - `delegate`: The account to delegate permission to transfer asset.
     * - `amount`: The amount of asset that may be transferred by `delegate`. If there is
     * already an approval in place, then this acts additively.
     *
     * Emits `ApprovedTransfer` on success.
     *
     * Weight: `O(1)`
     */
    "approve_transfer": {
        "id": Anonymize<I4c0s5cioidn76>;
        "delegate": MultiAddress;
        "amount": bigint;
    };
    /**
     * Cancel all of some asset approved for delegated transfer by a third-party account.
     *
     * Origin must be Signed and there must be an approval in place between signer and
     * `delegate`.
     *
     * Unreserves any deposit previously reserved by `approve_transfer` for the approval.
     *
     * - `id`: The identifier of the asset.
     * - `delegate`: The account delegated permission to transfer asset.
     *
     * Emits `ApprovalCancelled` on success.
     *
     * Weight: `O(1)`
     */
    "cancel_approval": {
        "id": Anonymize<I4c0s5cioidn76>;
        "delegate": MultiAddress;
    };
    /**
     * Cancel all of some asset approved for delegated transfer by a third-party account.
     *
     * Origin must be either ForceOrigin or Signed origin with the signer being the Admin
     * account of the asset `id`.
     *
     * Unreserves any deposit previously reserved by `approve_transfer` for the approval.
     *
     * - `id`: The identifier of the asset.
     * - `delegate`: The account delegated permission to transfer asset.
     *
     * Emits `ApprovalCancelled` on success.
     *
     * Weight: `O(1)`
     */
    "force_cancel_approval": {
        "id": Anonymize<I4c0s5cioidn76>;
        "owner": MultiAddress;
        "delegate": MultiAddress;
    };
    /**
     * Transfer some asset balance from a previously delegated account to some third-party
     * account.
     *
     * Origin must be Signed and there must be an approval in place by the `owner` to the
     * signer.
     *
     * If the entire amount approved for transfer is transferred, then any deposit previously
     * reserved by `approve_transfer` is unreserved.
     *
     * - `id`: The identifier of the asset.
     * - `owner`: The account which previously approved for a transfer of at least `amount` and
     * from which the asset balance will be withdrawn.
     * - `destination`: The account to which the asset balance of `amount` will be transferred.
     * - `amount`: The amount of assets to transfer.
     *
     * Emits `TransferredApproved` on success.
     *
     * Weight: `O(1)`
     */
    "transfer_approved": {
        "id": Anonymize<I4c0s5cioidn76>;
        "owner": MultiAddress;
        "destination": MultiAddress;
        "amount": bigint;
    };
    /**
     * Create an asset account for non-provider assets.
     *
     * A deposit will be taken from the signer account.
     *
     * - `origin`: Must be Signed; the signer account must have sufficient funds for a deposit
     * to be taken.
     * - `id`: The identifier of the asset for the account to be created.
     *
     * Emits `Touched` event when successful.
     */
    "touch": {
        "id": Anonymize<I4c0s5cioidn76>;
    };
    /**
     * Return the deposit (if any) of an asset account or a consumer reference (if any) of an
     * account.
     *
     * The origin must be Signed.
     *
     * - `id`: The identifier of the asset for which the caller would like the deposit
     * refunded.
     * - `allow_burn`: If `true` then assets may be destroyed in order to complete the refund.
     *
     * Emits `Refunded` event when successful.
     */
    "refund": {
        "id": Anonymize<I4c0s5cioidn76>;
        "allow_burn": boolean;
    };
    /**
     * Sets the minimum balance of an asset.
     *
     * Only works if there aren't any accounts that are holding the asset or if
     * the new value of `min_balance` is less than the old one.
     *
     * Origin must be Signed and the sender has to be the Owner of the
     * asset `id`.
     *
     * - `id`: The identifier of the asset.
     * - `min_balance`: The new value of `min_balance`.
     *
     * Emits `AssetMinBalanceChanged` event when successful.
     */
    "set_min_balance": {
        "id": Anonymize<I4c0s5cioidn76>;
        "min_balance": bigint;
    };
    /**
     * Create an asset account for `who`.
     *
     * A deposit will be taken from the signer account.
     *
     * - `origin`: Must be Signed by `Freezer` or `Admin` of the asset `id`; the signer account
     * must have sufficient funds for a deposit to be taken.
     * - `id`: The identifier of the asset for the account to be created.
     * - `who`: The account to be created.
     *
     * Emits `Touched` event when successful.
     */
    "touch_other": {
        "id": Anonymize<I4c0s5cioidn76>;
        "who": MultiAddress;
    };
    /**
     * Return the deposit (if any) of a target asset account. Useful if you are the depositor.
     *
     * The origin must be Signed and either the account owner, depositor, or asset `Admin`. In
     * order to burn a non-zero balance of the asset, the caller must be the account and should
     * use `refund`.
     *
     * - `id`: The identifier of the asset for the account holding a deposit.
     * - `who`: The account to refund.
     *
     * Emits `Refunded` event when successful.
     */
    "refund_other": {
        "id": Anonymize<I4c0s5cioidn76>;
        "who": MultiAddress;
    };
    /**
     * Disallow further unprivileged transfers of an asset `id` to and from an account `who`.
     *
     * Origin must be Signed and the sender should be the Freezer of the asset `id`.
     *
     * - `id`: The identifier of the account's asset.
     * - `who`: The account to be unblocked.
     *
     * Emits `Blocked`.
     *
     * Weight: `O(1)`
     */
    "block": {
        "id": Anonymize<I4c0s5cioidn76>;
        "who": MultiAddress;
    };
    /**
     * Transfer the entire transferable balance from the caller asset account.
     *
     * NOTE: This function only attempts to transfer _transferable_ balances. This means that
     * any held, frozen, or minimum balance (when `keep_alive` is `true`), will not be
     * transferred by this function. To ensure that this function results in a killed account,
     * you might need to prepare the account by removing any reference counters, storage
     * deposits, etc...
     *
     * The dispatch origin of this call must be Signed.
     *
     * - `id`: The identifier of the asset for the account holding a deposit.
     * - `dest`: The recipient of the transfer.
     * - `keep_alive`: A boolean to determine if the `transfer_all` operation should send all
     * of the funds the asset account has, causing the sender asset account to be killed
     * (false), or transfer everything except at least the minimum balance, which will
     * guarantee to keep the sender asset account alive (true).
     */
    "transfer_all": {
        "id": Anonymize<I4c0s5cioidn76>;
        "dest": MultiAddress;
        "keep_alive": boolean;
    };
}>;
export type I9eemk0c7gip8o = AnonymousEnum<{
    /**
     * Creates an empty liquidity pool and an associated new `lp_token` asset
     * (the id of which is returned in the `Event::PoolCreated` event).
     *
     * Once a pool is created, someone may [`Pallet::add_liquidity`] to it.
     */
    "create_pool": {
        "asset1": Anonymize<I4c0s5cioidn76>;
        "asset2": Anonymize<I4c0s5cioidn76>;
    };
    /**
     * Provide liquidity into the pool of `asset1` and `asset2`.
     * NOTE: an optimal amount of asset1 and asset2 will be calculated and
     * might be different than the provided `amount1_desired`/`amount2_desired`
     * thus you should provide the min amount you're happy to provide.
     * Params `amount1_min`/`amount2_min` represent that.
     * `mint_to` will be sent the liquidity tokens that represent this share of the pool.
     *
     * NOTE: when encountering an incorrect exchange rate and non-withdrawable pool liquidity,
     * batch an atomic call with [`Pallet::add_liquidity`] and
     * [`Pallet::swap_exact_tokens_for_tokens`] or [`Pallet::swap_tokens_for_exact_tokens`]
     * calls to render the liquidity withdrawable and rectify the exchange rate.
     *
     * Once liquidity is added, someone may successfully call
     * [`Pallet::swap_exact_tokens_for_tokens`].
     */
    "add_liquidity": {
        "asset1": Anonymize<I4c0s5cioidn76>;
        "asset2": Anonymize<I4c0s5cioidn76>;
        "amount1_desired": bigint;
        "amount2_desired": bigint;
        "amount1_min": bigint;
        "amount2_min": bigint;
        "mint_to": SS58String;
    };
    /**
     * Allows you to remove liquidity by providing the `lp_token_burn` tokens that will be
     * burned in the process. With the usage of `amount1_min_receive`/`amount2_min_receive`
     * it's possible to control the min amount of returned tokens you're happy with.
     */
    "remove_liquidity": {
        "asset1": Anonymize<I4c0s5cioidn76>;
        "asset2": Anonymize<I4c0s5cioidn76>;
        "lp_token_burn": bigint;
        "amount1_min_receive": bigint;
        "amount2_min_receive": bigint;
        "withdraw_to": SS58String;
    };
    /**
     * Swap the exact amount of `asset1` into `asset2`.
     * `amount_out_min` param allows you to specify the min amount of the `asset2`
     * you're happy to receive.
     *
     * [`AssetConversionApi::quote_price_exact_tokens_for_tokens`] runtime call can be called
     * for a quote.
     */
    "swap_exact_tokens_for_tokens": {
        "path": Anonymize<Ia88a8r9e89e2p>;
        "amount_in": bigint;
        "amount_out_min": bigint;
        "send_to": SS58String;
        "keep_alive": boolean;
    };
    /**
     * Swap any amount of `asset1` to get the exact amount of `asset2`.
     * `amount_in_max` param allows to specify the max amount of the `asset1`
     * you're happy to provide.
     *
     * [`AssetConversionApi::quote_price_tokens_for_exact_tokens`] runtime call can be called
     * for a quote.
     */
    "swap_tokens_for_exact_tokens": {
        "path": Anonymize<Ia88a8r9e89e2p>;
        "amount_out": bigint;
        "amount_in_max": bigint;
        "send_to": SS58String;
        "keep_alive": boolean;
    };
    /**
     * Touch an existing pool to fulfill prerequisites before providing liquidity, such as
     * ensuring that the pool's accounts are in place. It is typically useful when a pool
     * creator removes the pool's accounts and does not provide a liquidity. This action may
     * involve holding assets from the caller as a deposit for creating the pool's accounts.
     *
     * The origin must be Signed.
     *
     * - `asset1`: The asset ID of an existing pool with a pair (asset1, asset2).
     * - `asset2`: The asset ID of an existing pool with a pair (asset1, asset2).
     *
     * Emits `Touched` event when successful.
     */
    "touch": {
        "asset1": Anonymize<I4c0s5cioidn76>;
        "asset2": Anonymize<I4c0s5cioidn76>;
    };
}>;
export type Ia88a8r9e89e2p = Array<Anonymize<I4c0s5cioidn76>>;
export type I2oc6gv9a1tkss = AnonymousEnum<{
    "System": Anonymize<Iekve0i6djpd9f>;
    "ParachainSystem": Anonymize<I5kev21p7u6ajb>;
    "Timestamp": Anonymize<I7d75gqfg6jh9c>;
    "ParachainInfo": undefined;
    "Balances": Anonymize<I9svldsp29mh87>;
    "Vesting": Anonymize<Icgf8vmtkbnu4u>;
    "CollatorSelection": Anonymize<I9dpq5287dur8b>;
    "Session": Anonymize<I77dda7hps0u37>;
    "XcmpQueue": Anonymize<Ib7tahn20bvsep>;
    "PolkadotXcm": Anonymize<I6k1inef986368>;
    "CumulusXcm": undefined;
    "ToPolkadotXcmRouter": Anonymize<I6epb28bkd5aqn>;
    "MessageQueue": Anonymize<Ic2uoe7jdksosp>;
    "Utility": Enum<{
        /**
         * Send a batch of dispatch calls.
         *
         * May be called from any origin except `None`.
         *
         * - `calls`: The calls to be dispatched from the same origin. The number of call must not
         * exceed the constant: `batched_calls_limit` (available in constant metadata).
         *
         * If origin is root then the calls are dispatched without checking origin filter. (This
         * includes bypassing `frame_system::Config::BaseCallFilter`).
         *
         * ## Complexity
         * - O(C) where C is the number of calls to be batched.
         *
         * This will return `Ok` in all circumstances. To determine the success of the batch, an
         * event is deposited. If a call failed and the batch was interrupted, then the
         * `BatchInterrupted` event is deposited, along with the number of successful calls made
         * and the error of the failed call. If all were successful, then the `BatchCompleted`
         * event is deposited.
         */
        "batch": {
            "calls": Array<TxCallData>;
        };
        /**
         * Send a call through an indexed pseudonym of the sender.
         *
         * Filter from origin are passed along. The call will be dispatched with an origin which
         * use the same filter as the origin of this call.
         *
         * NOTE: If you need to ensure that any account-based filtering is not honored (i.e.
         * because you expect `proxy` to have been used prior in the call stack and you do not want
         * the call restrictions to apply to any sub-accounts), then use `as_multi_threshold_1`
         * in the Multisig pallet instead.
         *
         * NOTE: Prior to version *12, this was called `as_limited_sub`.
         *
         * The dispatch origin for this call must be _Signed_.
         */
        "as_derivative": {
            "index": number;
            "call": TxCallData;
        };
        /**
         * Send a batch of dispatch calls and atomically execute them.
         * The whole transaction will rollback and fail if any of the calls failed.
         *
         * May be called from any origin except `None`.
         *
         * - `calls`: The calls to be dispatched from the same origin. The number of call must not
         * exceed the constant: `batched_calls_limit` (available in constant metadata).
         *
         * If origin is root then the calls are dispatched without checking origin filter. (This
         * includes bypassing `frame_system::Config::BaseCallFilter`).
         *
         * ## Complexity
         * - O(C) where C is the number of calls to be batched.
         */
        "batch_all": {
            "calls": Array<TxCallData>;
        };
        /**
         * Dispatches a function call with a provided origin.
         *
         * The dispatch origin for this call must be _Root_.
         *
         * ## Complexity
         * - O(1).
         */
        "dispatch_as": {
            "as_origin": Anonymize<I42ficri7uep20>;
            "call": TxCallData;
        };
        /**
         * Send a batch of dispatch calls.
         * Unlike `batch`, it allows errors and won't interrupt.
         *
         * May be called from any origin except `None`.
         *
         * - `calls`: The calls to be dispatched from the same origin. The number of call must not
         * exceed the constant: `batched_calls_limit` (available in constant metadata).
         *
         * If origin is root then the calls are dispatch without checking origin filter. (This
         * includes bypassing `frame_system::Config::BaseCallFilter`).
         *
         * ## Complexity
         * - O(C) where C is the number of calls to be batched.
         */
        "force_batch": {
            "calls": Array<TxCallData>;
        };
        /**
         * Dispatch a function call with a specified weight.
         *
         * This function does not check the weight of the call, and instead allows the
         * Root origin to specify the weight of the call.
         *
         * The dispatch origin for this call must be _Root_.
         */
        "with_weight": {
            "call": TxCallData;
            "weight": Anonymize<I4q39t5hn830vp>;
        };
        /**
         * Dispatch a fallback call in the event the main call fails to execute.
         * May be called from any origin except `None`.
         *
         * This function first attempts to dispatch the `main` call.
         * If the `main` call fails, the `fallback` is attemted.
         * if the fallback is successfully dispatched, the weights of both calls
         * are accumulated and an event containing the main call error is deposited.
         *
         * In the event of a fallback failure the whole call fails
         * with the weights returned.
         *
         * - `main`: The main call to be dispatched. This is the primary action to execute.
         * - `fallback`: The fallback call to be dispatched in case the `main` call fails.
         *
         * ## Dispatch Logic
         * - If the origin is `root`, both the main and fallback calls are executed without
         * applying any origin filters.
         * - If the origin is not `root`, the origin filter is applied to both the `main` and
         * `fallback` calls.
         *
         * ## Use Case
         * - Some use cases might involve submitting a `batch` type call in either main, fallback
         * or both.
         */
        "if_else": {
            "main": TxCallData;
            "fallback": TxCallData;
        };
        /**
         * Dispatches a function call with a provided origin.
         *
         * Almost the same as [`Pallet::dispatch_as`] but forwards any error of the inner call.
         *
         * The dispatch origin for this call must be _Root_.
         */
        "dispatch_as_fallible": {
            "as_origin": Anonymize<I42ficri7uep20>;
            "call": TxCallData;
        };
    }>;
    "Multisig": Enum<{
        /**
         * Immediately dispatch a multi-signature call using a single approval from the caller.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * - `other_signatories`: The accounts (other than the sender) who are part of the
         * multi-signature, but do not participate in the approval process.
         * - `call`: The call to be executed.
         *
         * Result is equivalent to the dispatched result.
         *
         * ## Complexity
         * O(Z + C) where Z is the length of the call and C its execution weight.
         */
        "as_multi_threshold_1": {
            "other_signatories": Anonymize<Ia2lhg7l2hilo3>;
            "call": TxCallData;
        };
        /**
         * Register approval for a dispatch to be made from a deterministic composite account if
         * approved by a total of `threshold - 1` of `other_signatories`.
         *
         * If there are enough, then dispatch the call.
         *
         * Payment: `DepositBase` will be reserved if this is the first approval, plus
         * `threshold` times `DepositFactor`. It is returned once this dispatch happens or
         * is cancelled.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * - `threshold`: The total number of approvals for this dispatch before it is executed.
         * - `other_signatories`: The accounts (other than the sender) who can approve this
         * dispatch. May not be empty.
         * - `maybe_timepoint`: If this is the first approval, then this must be `None`. If it is
         * not the first approval, then it must be `Some`, with the timepoint (block number and
         * transaction index) of the first approval transaction.
         * - `call`: The call to be executed.
         *
         * NOTE: Unless this is the final approval, you will generally want to use
         * `approve_as_multi` instead, since it only requires a hash of the call.
         *
         * Result is equivalent to the dispatched result if `threshold` is exactly `1`. Otherwise
         * on success, result is `Ok` and the result from the interior call, if it was executed,
         * may be found in the deposited `MultisigExecuted` event.
         *
         * ## Complexity
         * - `O(S + Z + Call)`.
         * - Up to one balance-reserve or unreserve operation.
         * - One passthrough operation, one insert, both `O(S)` where `S` is the number of
         * signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
         * - One call encode & hash, both of complexity `O(Z)` where `Z` is tx-len.
         * - One encode & hash, both of complexity `O(S)`.
         * - Up to one binary search and insert (`O(logS + S)`).
         * - I/O: 1 read `O(S)`, up to 1 mutate `O(S)`. Up to one remove.
         * - One event.
         * - The weight of the `call`.
         * - Storage: inserts one item, value size bounded by `MaxSignatories`, with a deposit
         * taken for its lifetime of `DepositBase + threshold * DepositFactor`.
         */
        "as_multi": {
            "threshold": number;
            "other_signatories": Anonymize<Ia2lhg7l2hilo3>;
            "maybe_timepoint"?: Anonymize<I95jfd8j5cr5eh>;
            "call": TxCallData;
            "max_weight": Anonymize<I4q39t5hn830vp>;
        };
        /**
         * Register approval for a dispatch to be made from a deterministic composite account if
         * approved by a total of `threshold - 1` of `other_signatories`.
         *
         * Payment: `DepositBase` will be reserved if this is the first approval, plus
         * `threshold` times `DepositFactor`. It is returned once this dispatch happens or
         * is cancelled.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * - `threshold`: The total number of approvals for this dispatch before it is executed.
         * - `other_signatories`: The accounts (other than the sender) who can approve this
         * dispatch. May not be empty.
         * - `maybe_timepoint`: If this is the first approval, then this must be `None`. If it is
         * not the first approval, then it must be `Some`, with the timepoint (block number and
         * transaction index) of the first approval transaction.
         * - `call_hash`: The hash of the call to be executed.
         *
         * NOTE: If this is the final approval, you will want to use `as_multi` instead.
         *
         * ## Complexity
         * - `O(S)`.
         * - Up to one balance-reserve or unreserve operation.
         * - One passthrough operation, one insert, both `O(S)` where `S` is the number of
         * signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
         * - One encode & hash, both of complexity `O(S)`.
         * - Up to one binary search and insert (`O(logS + S)`).
         * - I/O: 1 read `O(S)`, up to 1 mutate `O(S)`. Up to one remove.
         * - One event.
         * - Storage: inserts one item, value size bounded by `MaxSignatories`, with a deposit
         * taken for its lifetime of `DepositBase + threshold * DepositFactor`.
         */
        "approve_as_multi": Anonymize<Ideaemvoneh309>;
        /**
         * Cancel a pre-existing, on-going multisig transaction. Any deposit reserved previously
         * for this operation will be unreserved on success.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * - `threshold`: The total number of approvals for this dispatch before it is executed.
         * - `other_signatories`: The accounts (other than the sender) who can approve this
         * dispatch. May not be empty.
         * - `timepoint`: The timepoint (block number and transaction index) of the first approval
         * transaction for this dispatch.
         * - `call_hash`: The hash of the call to be executed.
         *
         * ## Complexity
         * - `O(S)`.
         * - Up to one balance-reserve or unreserve operation.
         * - One passthrough operation, one insert, both `O(S)` where `S` is the number of
         * signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
         * - One encode & hash, both of complexity `O(S)`.
         * - One event.
         * - I/O: 1 read `O(S)`, one remove.
         * - Storage: removes one item.
         */
        "cancel_as_multi": Anonymize<I3d9o9d7epp66v>;
        /**
         * Poke the deposit reserved for an existing multisig operation.
         *
         * The dispatch origin for this call must be _Signed_ and must be the original depositor of
         * the multisig operation.
         *
         * The transaction fee is waived if the deposit amount has changed.
         *
         * - `threshold`: The total number of approvals needed for this multisig.
         * - `other_signatories`: The accounts (other than the sender) who are part of the
         * multisig.
         * - `call_hash`: The hash of the call this deposit is reserved for.
         *
         * Emits `DepositPoked` if successful.
         */
        "poke_deposit": Anonymize<I6lqh1vgb4mcja>;
    }>;
    "Proxy": Enum<{
        /**
         * Dispatch the given `call` from an account that the sender is authorised for through
         * `add_proxy`.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * Parameters:
         * - `real`: The account that the proxy will make a call on behalf of.
         * - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
         * - `call`: The call to be made by the `real` account.
         */
        "proxy": Anonymize<I9gs1u3cup4mna>;
        /**
         * Register a proxy account for the sender that is able to make calls on its behalf.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * Parameters:
         * - `proxy`: The account that the `caller` would like to make a proxy.
         * - `proxy_type`: The permissions allowed for this proxy account.
         * - `delay`: The announcement period required of the initial proxy. Will generally be
         * zero.
         */
        "add_proxy": Anonymize<Iovrcu9bfelfq>;
        /**
         * Unregister a proxy account for the sender.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * Parameters:
         * - `proxy`: The account that the `caller` would like to remove as a proxy.
         * - `proxy_type`: The permissions currently enabled for the removed proxy account.
         */
        "remove_proxy": Anonymize<Iovrcu9bfelfq>;
        /**
         * Unregister all proxy accounts for the sender.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * WARNING: This may be called on accounts created by `pure`, however if done, then
         * the unreserved fees will be inaccessible. **All access to this account will be lost.**
         */
        "remove_proxies": undefined;
        /**
         * Spawn a fresh new account that is guaranteed to be otherwise inaccessible, and
         * initialize it with a proxy of `proxy_type` for `origin` sender.
         *
         * Requires a `Signed` origin.
         *
         * - `proxy_type`: The type of the proxy that the sender will be registered as over the
         * new account. This will almost always be the most permissive `ProxyType` possible to
         * allow for maximum flexibility.
         * - `index`: A disambiguation index, in case this is called multiple times in the same
         * transaction (e.g. with `utility::batch`). Unless you're using `batch` you probably just
         * want to use `0`.
         * - `delay`: The announcement period required of the initial proxy. Will generally be
         * zero.
         *
         * Fails with `Duplicate` if this has already been called in this transaction, from the
         * same sender, with the same parameters.
         *
         * Fails if there are insufficient funds to pay for deposit.
         */
        "create_pure": Anonymize<Iefr8jgtgfk8um>;
        /**
         * Removes a previously spawned pure proxy.
         *
         * WARNING: **All access to this account will be lost.** Any funds held in it will be
         * inaccessible.
         *
         * Requires a `Signed` origin, and the sender account must have been created by a call to
         * `pure` with corresponding parameters.
         *
         * - `spawner`: The account that originally called `pure` to create this account.
         * - `index`: The disambiguation index originally passed to `pure`. Probably `0`.
         * - `proxy_type`: The proxy type originally passed to `pure`.
         * - `height`: The height of the chain when the call to `pure` was processed.
         * - `ext_index`: The extrinsic index in which the call to `pure` was processed.
         *
         * Fails with `NoPermission` in case the caller is not a previously created pure
         * account whose `pure` call has corresponding parameters.
         */
        "kill_pure": Anonymize<I3j05hul54uj7q>;
        /**
         * Publish the hash of a proxy-call that will be made in the future.
         *
         * This must be called some number of blocks before the corresponding `proxy` is attempted
         * if the delay associated with the proxy relationship is greater than zero.
         *
         * No more than `MaxPending` announcements may be made at any one time.
         *
         * This will take a deposit of `AnnouncementDepositFactor` as well as
         * `AnnouncementDepositBase` if there are no other pending announcements.
         *
         * The dispatch origin for this call must be _Signed_ and a proxy of `real`.
         *
         * Parameters:
         * - `real`: The account that the proxy will make a call on behalf of.
         * - `call_hash`: The hash of the call to be made by the `real` account.
         */
        "announce": Anonymize<I2eb501t8s6hsq>;
        /**
         * Remove a given announcement.
         *
         * May be called by a proxy account to remove a call they previously announced and return
         * the deposit.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * Parameters:
         * - `real`: The account that the proxy will make a call on behalf of.
         * - `call_hash`: The hash of the call to be made by the `real` account.
         */
        "remove_announcement": Anonymize<I2eb501t8s6hsq>;
        /**
         * Remove the given announcement of a delegate.
         *
         * May be called by a target (proxied) account to remove a call that one of their delegates
         * (`delegate`) has announced they want to execute. The deposit is returned.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * Parameters:
         * - `delegate`: The account that previously announced the call.
         * - `call_hash`: The hash of the call to be made.
         */
        "reject_announcement": Anonymize<Ianmuoljk2sk1u>;
        /**
         * Dispatch the given `call` from an account that the sender is authorized for through
         * `add_proxy`.
         *
         * Removes any corresponding announcement(s).
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * Parameters:
         * - `real`: The account that the proxy will make a call on behalf of.
         * - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
         * - `call`: The call to be made by the `real` account.
         */
        "proxy_announced": {
            "delegate": MultiAddress;
            "real": MultiAddress;
            "force_proxy_type"?: Anonymize<I7rk1n3vg3et43>;
            "call": TxCallData;
        };
        /**
         * Poke / Adjust deposits made for proxies and announcements based on current values.
         * This can be used by accounts to possibly lower their locked amount.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * The transaction fee is waived if the deposit amount has changed.
         *
         * Emits `DepositPoked` if successful.
         */
        "poke_deposit": undefined;
    }>;
    "RemoteProxyRelayChain": Enum<{
        /**
         * Dispatch the given `call` from an account that the sender is authorised on a remote
         * chain.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * Parameters:
         * - `real`: The account that the proxy will make a call on behalf of.
         * - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
         * - `call`: The call to be made by the `real` account.
         * - `proof`: The proof from the remote chain about the existence of the proxy.
         */
        "remote_proxy": {
            "real": MultiAddress;
            "force_proxy_type"?: Anonymize<I7rk1n3vg3et43>;
            "call": TxCallData;
            "proof": Anonymize<Ib1odc96d5o47>;
        };
        /**
         * Register a given remote proxy proof in the current [`dispatch_context`].
         *
         * The registered remote proof can then be used later in the same context to execute a
         * remote proxy call. This is for example useful when having a multisig operation. The
         * multisig call can use [`Self::remote_proxy_with_registered_proof`] to get an approval by
         * the members of the multisig. The final execution of the multisig call should be at least
         * a batch of `register_remote_proxy_proof` and the multisig call that uses
         * `remote_proxy_with_registered_proof`. This way the final approver can use a recent proof
         * to prove the existence of the remote proxy. Otherwise it would require the multisig
         * members to approve the call in [`Config::MaxStorageRootsToKeep`] amount of time.
         *
         * It is supported to register multiple proofs, but the proofs need to be consumed in the
         * reverse order as they were registered. Basically this means last in, first out.
         *
         * The [`dispatch_context`] spans the entire lifetime of a transaction and every call in
         * the transaction gets access to the same context.
         *
         * # Example
         *
         * ```ignore
         * batch([
         * register_remote_proxy_proof,
         * as_multisig(remote_proxy_with_registered_proof(transfer))
         * ])
         * ```
         *
         * As `proofs` can not be verified indefinitely (the time the storage roots are stored is
         * limited) this function provides the possibility to provide a "fresh proof" at time of
         * dispatch. As in the example above, this could be useful for multisig operation that
         * depend on multiple members to approve a certain action, which can take multiple days.
         */
        "register_remote_proxy_proof": {
            "proof": Anonymize<Ib1odc96d5o47>;
        };
        /**
         * Dispatch the given `call` from an account that the sender is authorised on a remote
         * chain.
         *
         * The dispatch origin for this call must be _Signed_. The difference to
         * [`Self::remote_proxy`] is that the proof nees to registered before using
         * [`Self::register_remote_proxy_proof`] (see for more information).
         *
         * Parameters:
         * - `real`: The account that the proxy will make a call on behalf of.
         * - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
         * - `call`: The call to be made by the `real` account.
         */
        "remote_proxy_with_registered_proof": Anonymize<I9gs1u3cup4mna>;
    }>;
    "Assets": Anonymize<I84851acvod2ic>;
    "Uniques": Anonymize<Icu49uv7rfej74>;
    "Nfts": Anonymize<I1k4il7i5elhc7>;
    "ForeignAssets": Anonymize<I8ktel4pq9nbjk>;
    "NftFractionalization": Anonymize<Ifrervtb291iin>;
    "PoolAssets": Anonymize<I84851acvod2ic>;
    "AssetConversion": Anonymize<I9eemk0c7gip8o>;
    "Revive": Enum<{
        /**
         * A raw EVM transaction, typically dispatched by an Ethereum JSON-RPC server.
         *
         * # Parameters
         *
         * * `payload`: The encoded [`crate::evm::TransactionSigned`].
         * * `gas_limit`: The gas limit enforced during contract execution.
         * * `storage_deposit_limit`: The maximum balance that can be charged to the caller for
         * storage usage.
         *
         * # Note
         *
         * This call cannot be dispatched directly; attempting to do so will result in a failed
         * transaction. It serves as a wrapper for an Ethereum transaction. When submitted, the
         * runtime converts it into a [`sp_runtime::generic::CheckedExtrinsic`] by recovering the
         * signer and validating the transaction.
         */
        "eth_transact": Anonymize<Ida37oe44osb06>;
        /**
         * Makes a call to an account, optionally transferring some balance.
         *
         * # Parameters
         *
         * * `dest`: Address of the contract to call.
         * * `value`: The balance to transfer from the `origin` to `dest`.
         * * `gas_limit`: The gas limit enforced when executing the constructor.
         * * `storage_deposit_limit`: The maximum amount of balance that can be charged from the
         * caller to pay for the storage consumed.
         * * `data`: The input data to pass to the contract.
         *
         * * If the account is a smart-contract account, the associated code will be
         * executed and any value will be transferred.
         * * If the account is a regular account, any value will be transferred.
         * * If no account exists and the call value is not less than `existential_deposit`,
         * a regular account will be created and any value will be transferred.
         */
        "call": Anonymize<Idsg8aod8e8fqn>;
        /**
         * Instantiates a contract from a previously deployed wasm binary.
         *
         * This function is identical to [`Self::instantiate_with_code`] but without the
         * code deployment step. Instead, the `code_hash` of an on-chain deployed wasm binary
         * must be supplied.
         */
        "instantiate": Anonymize<I46nktn22m6hbi>;
        /**
         * Instantiates a new contract from the supplied `code` optionally transferring
         * some balance.
         *
         * This dispatchable has the same effect as calling [`Self::upload_code`] +
         * [`Self::instantiate`]. Bundling them together provides efficiency gains. Please
         * also check the documentation of [`Self::upload_code`].
         *
         * # Parameters
         *
         * * `value`: The balance to transfer from the `origin` to the newly created contract.
         * * `gas_limit`: The gas limit enforced when executing the constructor.
         * * `storage_deposit_limit`: The maximum amount of balance that can be charged/reserved
         * from the caller to pay for the storage consumed.
         * * `code`: The contract code to deploy in raw bytes.
         * * `data`: The input data to pass to the contract constructor.
         * * `salt`: Used for the address derivation. If `Some` is supplied then `CREATE2`
         * semantics are used. If `None` then `CRATE1` is used.
         *
         *
         * Instantiation is executed as follows:
         *
         * - The supplied `code` is deployed, and a `code_hash` is created for that code.
         * - If the `code_hash` already exists on the chain the underlying `code` will be shared.
         * - The destination address is computed based on the sender, code_hash and the salt.
         * - The smart-contract account is created at the computed address.
         * - The `value` is transferred to the new account.
         * - The `deploy` function is executed in the context of the newly-created account.
         */
        "instantiate_with_code": Anonymize<Ibgj1cthra7lte>;
        /**
         * Upload new `code` without instantiating a contract from it.
         *
         * If the code does not already exist a deposit is reserved from the caller
         * and unreserved only when [`Self::remove_code`] is called. The size of the reserve
         * depends on the size of the supplied `code`.
         *
         * # Note
         *
         * Anyone can instantiate a contract from any uploaded code and thus prevent its removal.
         * To avoid this situation a constructor could employ access control so that it can
         * only be instantiated by permissioned entities. The same is true when uploading
         * through [`Self::instantiate_with_code`].
         */
        "upload_code": Anonymize<I10ra4g1rl6k2f>;
        /**
         * Remove the code stored under `code_hash` and refund the deposit to its owner.
         *
         * A code can only be removed by its original uploader (its owner) and only if it is
         * not used by any contract.
         */
        "remove_code": Anonymize<Ib51vk42m1po4n>;
        /**
         * Privileged function that changes the code of an existing contract.
         *
         * This takes care of updating refcounts and all other necessary operations. Returns
         * an error if either the `code_hash` or `dest` do not exist.
         *
         * # Note
         *
         * This does **not** change the address of the contract in question. This means
         * that the contract address is no longer derived from its code hash after calling
         * this dispatchable.
         */
        "set_code": Anonymize<I1uihehkdsggvp>;
        /**
         * Register the callers account id so that it can be used in contract interactions.
         *
         * This will error if the origin is already mapped or is a eth native `Address20`. It will
         * take a deposit that can be released by calling [`Self::unmap_account`].
         */
        "map_account": undefined;
        /**
         * Unregister the callers account id in order to free the deposit.
         *
         * There is no reason to ever call this function other than freeing up the deposit.
         * This is only useful when the account should no longer be used.
         */
        "unmap_account": undefined;
        /**
         * Dispatch an `call` with the origin set to the callers fallback address.
         *
         * Every `AccountId32` can control its corresponding fallback account. The fallback account
         * is the `AccountId20` with the last 12 bytes set to `0xEE`. This is essentially a
         * recovery function in case an `AccountId20` was used without creating a mapping first.
         */
        "dispatch_as_fallback_account": {
            "call": TxCallData;
        };
    }>;
    "StateTrieMigration": Anonymize<I39l72gdmkk30t>;
}>;
export type I9gs1u3cup4mna = {
    "real": MultiAddress;
    "force_proxy_type"?: Anonymize<I7rk1n3vg3et43>;
    "call": TxCallData;
};
export type Ib1odc96d5o47 = AnonymousEnum<{
    "RelayChain": {
        "proof": Anonymize<Itom7fk49o0c9>;
        "block": number;
    };
}>;
export type Ia0v3r2qmg79ve = AnonymousEnum<{
    "System": Anonymize<Iekve0i6djpd9f>;
    "Scheduler": Enum<{
        /**
         * Anonymously schedule a task.
         */
        "schedule": {
            "when": number;
            "maybe_periodic"?: Anonymize<Iep7au1720bm0e>;
            "priority": number;
            "call": TxCallData;
        };
        /**
         * Cancel an anonymously scheduled task.
         */
        "cancel": Anonymize<I5n4sebgkfr760>;
        /**
         * Schedule a named task.
         */
        "schedule_named": {
            "id": FixedSizeBinary<32>;
            "when": number;
            "maybe_periodic"?: Anonymize<Iep7au1720bm0e>;
            "priority": number;
            "call": TxCallData;
        };
        /**
         * Cancel a named scheduled task.
         */
        "cancel_named": Anonymize<Ifs1i5fk9cqvr6>;
        /**
         * Anonymously schedule a task after a delay.
         */
        "schedule_after": {
            "after": number;
            "maybe_periodic"?: Anonymize<Iep7au1720bm0e>;
            "priority": number;
            "call": TxCallData;
        };
        /**
         * Schedule a named task after a delay.
         */
        "schedule_named_after": {
            "id": FixedSizeBinary<32>;
            "after": number;
            "maybe_periodic"?: Anonymize<Iep7au1720bm0e>;
            "priority": number;
            "call": TxCallData;
        };
        /**
         * Set a retry configuration for a task so that, in case its scheduled run fails, it will
         * be retried after `period` blocks, for a total amount of `retries` retries or until it
         * succeeds.
         *
         * Tasks which need to be scheduled for a retry are still subject to weight metering and
         * agenda space, same as a regular task. If a periodic task fails, it will be scheduled
         * normally while the task is retrying.
         *
         * Tasks scheduled as a result of a retry for a periodic task are unnamed, non-periodic
         * clones of the original task. Their retry configuration will be derived from the
         * original task's configuration, but will have a lower value for `remaining` than the
         * original `total_retries`.
         */
        "set_retry": Anonymize<Ieg3fd8p4pkt10>;
        /**
         * Set a retry configuration for a named task so that, in case its scheduled run fails, it
         * will be retried after `period` blocks, for a total amount of `retries` retries or until
         * it succeeds.
         *
         * Tasks which need to be scheduled for a retry are still subject to weight metering and
         * agenda space, same as a regular task. If a periodic task fails, it will be scheduled
         * normally while the task is retrying.
         *
         * Tasks scheduled as a result of a retry for a periodic task are unnamed, non-periodic
         * clones of the original task. Their retry configuration will be derived from the
         * original task's configuration, but will have a lower value for `remaining` than the
         * original `total_retries`.
         */
        "set_retry_named": Anonymize<I8kg5ll427kfqq>;
        /**
         * Removes the retry configuration of a task.
         */
        "cancel_retry": Anonymize<I467333262q1l9>;
        /**
         * Cancel the retry configuration of a named task.
         */
        "cancel_retry_named": Anonymize<Ifs1i5fk9cqvr6>;
    }>;
    "Preimage": Anonymize<If81ks88t5mpk5>;
    "Babe": Anonymize<I1jeo0dpbkma5g>;
    "Timestamp": Anonymize<I7d75gqfg6jh9c>;
    "Indices": Enum<{
        /**
         * Assign an previously unassigned index.
         *
         * Payment: `Deposit` is reserved from the sender account.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * - `index`: the index to be claimed. This must not be in use.
         *
         * Emits `IndexAssigned` if successful.
         *
         * ## Complexity
         * - `O(1)`.
         */
        "claim": Anonymize<I666bl2fqjkejo>;
        /**
         * Assign an index already owned by the sender to another account. The balance reservation
         * is effectively transferred to the new account.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * - `index`: the index to be re-assigned. This must be owned by the sender.
         * - `new`: the new owner of the index. This function is a no-op if it is equal to sender.
         *
         * Emits `IndexAssigned` if successful.
         *
         * ## Complexity
         * - `O(1)`.
         */
        "transfer": Anonymize<I6o1er683vod1j>;
        /**
         * Free up an index owned by the sender.
         *
         * Payment: Any previous deposit placed for the index is unreserved in the sender account.
         *
         * The dispatch origin for this call must be _Signed_ and the sender must own the index.
         *
         * - `index`: the index to be freed. This must be owned by the sender.
         *
         * Emits `IndexFreed` if successful.
         *
         * ## Complexity
         * - `O(1)`.
         */
        "free": Anonymize<I666bl2fqjkejo>;
        /**
         * Force an index to an account. This doesn't require a deposit. If the index is already
         * held, then any deposit is reimbursed to its current owner.
         *
         * The dispatch origin for this call must be _Root_.
         *
         * - `index`: the index to be (re-)assigned.
         * - `new`: the new owner of the index. This function is a no-op if it is equal to sender.
         * - `freeze`: if set to `true`, will freeze the index so it cannot be transferred.
         *
         * Emits `IndexAssigned` if successful.
         *
         * ## Complexity
         * - `O(1)`.
         */
        "force_transfer": Anonymize<I5bq561t4gpfva>;
        /**
         * Freeze an index so it will always point to the sender account. This consumes the
         * deposit.
         *
         * The dispatch origin for this call must be _Signed_ and the signing account must have a
         * non-frozen account `index`.
         *
         * - `index`: the index to be frozen in place.
         *
         * Emits `IndexFrozen` if successful.
         *
         * ## Complexity
         * - `O(1)`.
         */
        "freeze": Anonymize<I666bl2fqjkejo>;
    }>;
    "Balances": Anonymize<I9svldsp29mh87>;
    "Staking": Enum<{
        /**
         * Take the origin account as a stash and lock up `value` of its balance. `controller` will
         * be the account that controls it.
         *
         * `value` must be more than the `minimum_balance` specified by `T::Currency`.
         *
         * The dispatch origin for this call must be _Signed_ by the stash account.
         *
         * Emits `Bonded`.
         * ## Complexity
         * - Independent of the arguments. Moderate complexity.
         * - O(1).
         * - Three extra DB entries.
         *
         * NOTE: Two of the storage writes (`Self::bonded`, `Self::payee`) are _never_ cleaned
         * unless the `origin` falls below _existential deposit_ (or equal to 0) and gets removed
         * as dust.
         */
        "bond": Anonymize<I2eip8tc75dpje>;
        /**
         * Add some extra amount that have appeared in the stash `free_balance` into the balance up
         * for staking.
         *
         * The dispatch origin for this call must be _Signed_ by the stash, not the controller.
         *
         * Use this if there are additional funds in your stash account that you wish to bond.
         * Unlike [`bond`](Self::bond) or [`unbond`](Self::unbond) this function does not impose
         * any limitation on the amount that can be added.
         *
         * Emits `Bonded`.
         *
         * ## Complexity
         * - Independent of the arguments. Insignificant complexity.
         * - O(1).
         */
        "bond_extra": Anonymize<I564va64vtidbq>;
        /**
         * Schedule a portion of the stash to be unlocked ready for transfer out after the bond
         * period ends. If this leaves an amount actively bonded less than
         * [`asset::existential_deposit`], then it is increased to the full amount.
         *
         * The dispatch origin for this call must be _Signed_ by the controller, not the stash.
         *
         * Once the unlock period is done, you can call `withdraw_unbonded` to actually move
         * the funds out of management ready for transfer.
         *
         * No more than a limited number of unlocking chunks (see `MaxUnlockingChunks`)
         * can co-exists at the same time. If there are no unlocking chunks slots available
         * [`Call::withdraw_unbonded`] is called to remove some of the chunks (if possible).
         *
         * If a user encounters the `InsufficientBond` error when calling this extrinsic,
         * they should call `chill` first in order to free up their bonded funds.
         *
         * Emits `Unbonded`.
         *
         * See also [`Call::withdraw_unbonded`].
         */
        "unbond": Anonymize<Ie5v6njpckr05b>;
        /**
         * Remove any unlocked chunks from the `unlocking` queue from our management.
         *
         * This essentially frees up that balance to be used by the stash account to do whatever
         * it wants.
         *
         * The dispatch origin for this call must be _Signed_ by the controller.
         *
         * Emits `Withdrawn`.
         *
         * See also [`Call::unbond`].
         *
         * ## Parameters
         *
         * - `num_slashing_spans` indicates the number of metadata slashing spans to clear when
         * this call results in a complete removal of all the data related to the stash account.
         * In this case, the `num_slashing_spans` must be larger or equal to the number of
         * slashing spans associated with the stash account in the [`SlashingSpans`] storage type,
         * otherwise the call will fail. The call weight is directly proportional to
         * `num_slashing_spans`.
         *
         * ## Complexity
         * O(S) where S is the number of slashing spans to remove
         * NOTE: Weight annotation is the kill scenario, we refund otherwise.
         */
        "withdraw_unbonded": Anonymize<I328av3j0bgmjb>;
        /**
         * Declare the desire to validate for the origin controller.
         *
         * Effects will be felt at the beginning of the next era.
         *
         * The dispatch origin for this call must be _Signed_ by the controller, not the stash.
         */
        "validate": Anonymize<I4tuqm9ato907i>;
        /**
         * Declare the desire to nominate `targets` for the origin controller.
         *
         * Effects will be felt at the beginning of the next era.
         *
         * The dispatch origin for this call must be _Signed_ by the controller, not the stash.
         *
         * ## Complexity
         * - The transaction's complexity is proportional to the size of `targets` (N)
         * which is capped at CompactAssignments::LIMIT (T::MaxNominations).
         * - Both the reads and writes follow a similar pattern.
         */
        "nominate": Anonymize<Iagi89qt4h1lqg>;
        /**
         * Declare no desire to either validate or nominate.
         *
         * Effects will be felt at the beginning of the next era.
         *
         * The dispatch origin for this call must be _Signed_ by the controller, not the stash.
         *
         * ## Complexity
         * - Independent of the arguments. Insignificant complexity.
         * - Contains one read.
         * - Writes are limited to the `origin` account key.
         */
        "chill": undefined;
        /**
         * (Re-)set the payment target for a controller.
         *
         * Effects will be felt instantly (as soon as this function is completed successfully).
         *
         * The dispatch origin for this call must be _Signed_ by the controller, not the stash.
         *
         * ## Complexity
         * - O(1)
         * - Independent of the arguments. Insignificant complexity.
         * - Contains a limited number of reads.
         * - Writes are limited to the `origin` account key.
         * ---------
         */
        "set_payee": Anonymize<I9dgmcnuamt5p8>;
        /**
         * (Re-)sets the controller of a stash to the stash itself. This function previously
         * accepted a `controller` argument to set the controller to an account other than the
         * stash itself. This functionality has now been removed, now only setting the controller
         * to the stash, if it is not already.
         *
         * Effects will be felt instantly (as soon as this function is completed successfully).
         *
         * The dispatch origin for this call must be _Signed_ by the stash, not the controller.
         *
         * ## Complexity
         * O(1)
         * - Independent of the arguments. Insignificant complexity.
         * - Contains a limited number of reads.
         * - Writes are limited to the `origin` account key.
         */
        "set_controller": undefined;
        /**
         * Sets the ideal number of validators.
         *
         * The dispatch origin must be Root.
         *
         * ## Complexity
         * O(1)
         */
        "set_validator_count": Anonymize<I3vh014cqgmrfd>;
        /**
         * Increments the ideal number of validators up to maximum of
         * `ElectionProviderBase::MaxWinners`.
         *
         * The dispatch origin must be Root.
         *
         * ## Complexity
         * Same as [`Self::set_validator_count`].
         */
        "increase_validator_count": Anonymize<Ifhs60omlhvt3>;
        /**
         * Scale up the ideal number of validators by a factor up to maximum of
         * `ElectionProviderBase::MaxWinners`.
         *
         * The dispatch origin must be Root.
         *
         * ## Complexity
         * Same as [`Self::set_validator_count`].
         */
        "scale_validator_count": Anonymize<If34udpd5e57vi>;
        /**
         * Force there to be no new eras indefinitely.
         *
         * The dispatch origin must be Root.
         *
         * # Warning
         *
         * The election process starts multiple blocks before the end of the era.
         * Thus the election process may be ongoing when this is called. In this case the
         * election will continue until the next era is triggered.
         *
         * ## Complexity
         * - No arguments.
         * - Weight: O(1)
         */
        "force_no_eras": undefined;
        /**
         * Force there to be a new era at the end of the next session. After this, it will be
         * reset to normal (non-forced) behaviour.
         *
         * The dispatch origin must be Root.
         *
         * # Warning
         *
         * The election process starts multiple blocks before the end of the era.
         * If this is called just before a new era is triggered, the election process may not
         * have enough blocks to get a result.
         *
         * ## Complexity
         * - No arguments.
         * - Weight: O(1)
         */
        "force_new_era": undefined;
        /**
         * Set the validators who cannot be slashed (if any).
         *
         * The dispatch origin must be Root.
         */
        "set_invulnerables": Anonymize<I39t01nnod9109>;
        /**
         * Force a current staker to become completely unstaked, immediately.
         *
         * The dispatch origin must be Root.
         *
         * ## Parameters
         *
         * - `num_slashing_spans`: Refer to comments on [`Call::withdraw_unbonded`] for more
         * details.
         */
        "force_unstake": Anonymize<Ie5vbnd9198quk>;
        /**
         * Force there to be a new era at the end of sessions indefinitely.
         *
         * The dispatch origin must be Root.
         *
         * # Warning
         *
         * The election process starts multiple blocks before the end of the era.
         * If this is called just before a new era is triggered, the election process may not
         * have enough blocks to get a result.
         */
        "force_new_era_always": undefined;
        /**
         * Cancel enactment of a deferred slash.
         *
         * Can be called by the `T::AdminOrigin`.
         *
         * Parameters: era and indices of the slashes for that era to kill.
         */
        "cancel_deferred_slash": Anonymize<I3h6murn8bd4v5>;
        /**
         * Pay out next page of the stakers behind a validator for the given era.
         *
         * - `validator_stash` is the stash account of the validator.
         * - `era` may be any era between `[current_era - history_depth; current_era]`.
         *
         * The origin of this call must be _Signed_. Any account can call this function, even if
         * it is not one of the stakers.
         *
         * The reward payout could be paged in case there are too many nominators backing the
         * `validator_stash`. This call will payout unpaid pages in an ascending order. To claim a
         * specific page, use `payout_stakers_by_page`.`
         *
         * If all pages are claimed, it returns an error `InvalidPage`.
         */
        "payout_stakers": Anonymize<I6k6jf8ncesuu3>;
        /**
         * Rebond a portion of the stash scheduled to be unlocked.
         *
         * The dispatch origin must be signed by the controller.
         *
         * ## Complexity
         * - Time complexity: O(L), where L is unlocking chunks
         * - Bounded by `MaxUnlockingChunks`.
         */
        "rebond": Anonymize<Ie5v6njpckr05b>;
        /**
         * Remove all data structures concerning a staker/stash once it is at a state where it can
         * be considered `dust` in the staking system. The requirements are:
         *
         * 1. the `total_balance` of the stash is below existential deposit.
         * 2. or, the `ledger.total` of the stash is below existential deposit.
         * 3. or, existential deposit is zero and either `total_balance` or `ledger.total` is zero.
         *
         * The former can happen in cases like a slash; the latter when a fully unbonded account
         * is still receiving staking rewards in `RewardDestination::Staked`.
         *
         * It can be called by anyone, as long as `stash` meets the above requirements.
         *
         * Refunds the transaction fees upon successful execution.
         *
         * ## Parameters
         *
         * - `num_slashing_spans`: Refer to comments on [`Call::withdraw_unbonded`] for more
         * details.
         */
        "reap_stash": Anonymize<Ie5vbnd9198quk>;
        /**
         * Remove the given nominations from the calling validator.
         *
         * Effects will be felt at the beginning of the next era.
         *
         * The dispatch origin for this call must be _Signed_ by the controller, not the stash.
         *
         * - `who`: A list of nominator stash accounts who are nominating this validator which
         * should no longer be nominating this validator.
         *
         * Note: Making this call only makes sense if you first set the validator preferences to
         * block any further nominations.
         */
        "kick": Anonymize<I3qhk481i120pk>;
        /**
         * Update the various staking configurations .
         *
         * * `min_nominator_bond`: The minimum active bond needed to be a nominator.
         * * `min_validator_bond`: The minimum active bond needed to be a validator.
         * * `max_nominator_count`: The max number of users who can be a nominator at once. When
         * set to `None`, no limit is enforced.
         * * `max_validator_count`: The max number of users who can be a validator at once. When
         * set to `None`, no limit is enforced.
         * * `chill_threshold`: The ratio of `max_nominator_count` or `max_validator_count` which
         * should be filled in order for the `chill_other` transaction to work.
         * * `min_commission`: The minimum amount of commission that each validators must maintain.
         * This is checked only upon calling `validate`. Existing validators are not affected.
         *
         * RuntimeOrigin must be Root to call this function.
         *
         * NOTE: Existing nominators and validators will not be affected by this update.
         * to kick people under the new limits, `chill_other` should be called.
         */
        "set_staking_configs": Anonymize<If1qr0kbbl298c>;
        /**
         * Declare a `controller` to stop participating as either a validator or nominator.
         *
         * Effects will be felt at the beginning of the next era.
         *
         * The dispatch origin for this call must be _Signed_, but can be called by anyone.
         *
         * If the caller is the same as the controller being targeted, then no further checks are
         * enforced, and this function behaves just like `chill`.
         *
         * If the caller is different than the controller being targeted, the following conditions
         * must be met:
         *
         * * `controller` must belong to a nominator who has become non-decodable,
         *
         * Or:
         *
         * * A `ChillThreshold` must be set and checked which defines how close to the max
         * nominators or validators we must reach before users can start chilling one-another.
         * * A `MaxNominatorCount` and `MaxValidatorCount` must be set which is used to determine
         * how close we are to the threshold.
         * * A `MinNominatorBond` and `MinValidatorBond` must be set and checked, which determines
         * if this is a person that should be chilled because they have not met the threshold
         * bond required.
         *
         * This can be helpful if bond requirements are updated, and we need to remove old users
         * who do not satisfy these requirements.
         */
        "chill_other": Anonymize<Idl3umm12u5pa>;
        /**
         * Force a validator to have at least the minimum commission. This will not affect a
         * validator who already has a commission greater than or equal to the minimum. Any account
         * can call this.
         */
        "force_apply_min_commission": Anonymize<I5ont0141q9ss5>;
        /**
         * Sets the minimum amount of commission that each validators must maintain.
         *
         * This call has lower privilege requirements than `set_staking_config` and can be called
         * by the `T::AdminOrigin`. Root can always call this.
         */
        "set_min_commission": Anonymize<I3vh014cqgmrfd>;
        /**
         * Pay out a page of the stakers behind a validator for the given era and page.
         *
         * - `validator_stash` is the stash account of the validator.
         * - `era` may be any era between `[current_era - history_depth; current_era]`.
         * - `page` is the page index of nominators to pay out with value between 0 and
         * `num_nominators / T::MaxExposurePageSize`.
         *
         * The origin of this call must be _Signed_. Any account can call this function, even if
         * it is not one of the stakers.
         *
         * If a validator has more than [`Config::MaxExposurePageSize`] nominators backing
         * them, then the list of nominators is paged, with each page being capped at
         * [`Config::MaxExposurePageSize`.] If a validator has more than one page of nominators,
         * the call needs to be made for each page separately in order for all the nominators
         * backing a validator to receive the reward. The nominators are not sorted across pages
         * and so it should not be assumed the highest staker would be on the topmost page and vice
         * versa. If rewards are not claimed in [`Config::HistoryDepth`] eras, they are lost.
         */
        "payout_stakers_by_page": Anonymize<Ie6j49utvii126>;
        /**
         * Migrates an account's `RewardDestination::Controller` to
         * `RewardDestination::Account(controller)`.
         *
         * Effects will be felt instantly (as soon as this function is completed successfully).
         *
         * This will waive the transaction fee if the `payee` is successfully migrated.
         */
        "update_payee": Anonymize<I3v6ks33uluhnj>;
        /**
         * Updates a batch of controller accounts to their corresponding stash account if they are
         * not the same. Ignores any controller accounts that do not exist, and does not operate if
         * the stash and controller are already the same.
         *
         * Effects will be felt instantly (as soon as this function is completed successfully).
         *
         * The dispatch origin must be `T::AdminOrigin`.
         */
        "deprecate_controller_batch": Anonymize<I3kiiim1cds68i>;
        /**
         * Restores the state of a ledger which is in an inconsistent state.
         *
         * The requirements to restore a ledger are the following:
         * * The stash is bonded; or
         * * The stash is not bonded but it has a staking lock left behind; or
         * * If the stash has an associated ledger and its state is inconsistent; or
         * * If the ledger is not corrupted *but* its staking lock is out of sync.
         *
         * The `maybe_*` input parameters will overwrite the corresponding data and metadata of the
         * ledger associated with the stash. If the input parameters are not set, the ledger will
         * be reset values from on-chain state.
         */
        "restore_ledger": Anonymize<I4k60mkh2r6jjg>;
        /**
         * Adjusts the staking ledger by withdrawing any excess staked amount.
         *
         * This function corrects cases where a user's recorded stake in the ledger
         * exceeds their actual staked funds. This situation can arise due to cases such as
         * external slashing by another pallet, leading to an inconsistency between the ledger
         * and the actual stake.
         */
        "withdraw_overstake": Anonymize<Idl3umm12u5pa>;
    }>;
    "Session": Anonymize<Iceajactc9a8pc>;
    "Grandpa": Anonymize<I5u9ggmn8umfqm>;
    "Treasury": Anonymize<I6jnp85onk3m8j>;
    "ConvictionVoting": Anonymize<Ie5kd08tutk56t>;
    "Referenda": Anonymize<I8tu311hskajnl>;
    "Whitelist": Enum<{
        "whitelist_call": Anonymize<I1adbcfi5uc62r>;
        "remove_whitelisted_call": Anonymize<I1adbcfi5uc62r>;
        "dispatch_whitelisted_call": Anonymize<Ibf6ucefn8fh49>;
        "dispatch_whitelisted_call_with_preimage": Anonymize<I2rrem89iuotjh>;
    }>;
    "Claims": Anonymize<Id0dj18ct09hlp>;
    "Vesting": Anonymize<Icgf8vmtkbnu4u>;
    "Utility": Enum<{
        /**
         * Send a batch of dispatch calls.
         *
         * May be called from any origin except `None`.
         *
         * - `calls`: The calls to be dispatched from the same origin. The number of call must not
         * exceed the constant: `batched_calls_limit` (available in constant metadata).
         *
         * If origin is root then the calls are dispatched without checking origin filter. (This
         * includes bypassing `frame_system::Config::BaseCallFilter`).
         *
         * ## Complexity
         * - O(C) where C is the number of calls to be batched.
         *
         * This will return `Ok` in all circumstances. To determine the success of the batch, an
         * event is deposited. If a call failed and the batch was interrupted, then the
         * `BatchInterrupted` event is deposited, along with the number of successful calls made
         * and the error of the failed call. If all were successful, then the `BatchCompleted`
         * event is deposited.
         */
        "batch": {
            "calls": Array<TxCallData>;
        };
        /**
         * Send a call through an indexed pseudonym of the sender.
         *
         * Filter from origin are passed along. The call will be dispatched with an origin which
         * use the same filter as the origin of this call.
         *
         * NOTE: If you need to ensure that any account-based filtering is not honored (i.e.
         * because you expect `proxy` to have been used prior in the call stack and you do not want
         * the call restrictions to apply to any sub-accounts), then use `as_multi_threshold_1`
         * in the Multisig pallet instead.
         *
         * NOTE: Prior to version *12, this was called `as_limited_sub`.
         *
         * The dispatch origin for this call must be _Signed_.
         */
        "as_derivative": {
            "index": number;
            "call": TxCallData;
        };
        /**
         * Send a batch of dispatch calls and atomically execute them.
         * The whole transaction will rollback and fail if any of the calls failed.
         *
         * May be called from any origin except `None`.
         *
         * - `calls`: The calls to be dispatched from the same origin. The number of call must not
         * exceed the constant: `batched_calls_limit` (available in constant metadata).
         *
         * If origin is root then the calls are dispatched without checking origin filter. (This
         * includes bypassing `frame_system::Config::BaseCallFilter`).
         *
         * ## Complexity
         * - O(C) where C is the number of calls to be batched.
         */
        "batch_all": {
            "calls": Array<TxCallData>;
        };
        /**
         * Dispatches a function call with a provided origin.
         *
         * The dispatch origin for this call must be _Root_.
         *
         * ## Complexity
         * - O(1).
         */
        "dispatch_as": {
            "as_origin": Anonymize<Iarigqlp2c2plh>;
            "call": TxCallData;
        };
        /**
         * Send a batch of dispatch calls.
         * Unlike `batch`, it allows errors and won't interrupt.
         *
         * May be called from any origin except `None`.
         *
         * - `calls`: The calls to be dispatched from the same origin. The number of call must not
         * exceed the constant: `batched_calls_limit` (available in constant metadata).
         *
         * If origin is root then the calls are dispatch without checking origin filter. (This
         * includes bypassing `frame_system::Config::BaseCallFilter`).
         *
         * ## Complexity
         * - O(C) where C is the number of calls to be batched.
         */
        "force_batch": {
            "calls": Array<TxCallData>;
        };
        /**
         * Dispatch a function call with a specified weight.
         *
         * This function does not check the weight of the call, and instead allows the
         * Root origin to specify the weight of the call.
         *
         * The dispatch origin for this call must be _Root_.
         */
        "with_weight": Anonymize<I9m4n27oh67jnn>;
    }>;
    "Proxy": Enum<{
        /**
         * Dispatch the given `call` from an account that the sender is authorised for through
         * `add_proxy`.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * Parameters:
         * - `real`: The account that the proxy will make a call on behalf of.
         * - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
         * - `call`: The call to be made by the `real` account.
         */
        "proxy": {
            "real": MultiAddress;
            "force_proxy_type"?: Anonymize<I93g3hgcn0dpaj>;
            "call": TxCallData;
        };
        /**
         * Register a proxy account for the sender that is able to make calls on its behalf.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * Parameters:
         * - `proxy`: The account that the `caller` would like to make a proxy.
         * - `proxy_type`: The permissions allowed for this proxy account.
         * - `delay`: The announcement period required of the initial proxy. Will generally be
         * zero.
         */
        "add_proxy": Anonymize<Ib1tr5ljcskalg>;
        /**
         * Unregister a proxy account for the sender.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * Parameters:
         * - `proxy`: The account that the `caller` would like to remove as a proxy.
         * - `proxy_type`: The permissions currently enabled for the removed proxy account.
         */
        "remove_proxy": Anonymize<Ib1tr5ljcskalg>;
        /**
         * Unregister all proxy accounts for the sender.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * WARNING: This may be called on accounts created by `pure`, however if done, then
         * the unreserved fees will be inaccessible. **All access to this account will be lost.**
         */
        "remove_proxies": undefined;
        /**
         * Spawn a fresh new account that is guaranteed to be otherwise inaccessible, and
         * initialize it with a proxy of `proxy_type` for `origin` sender.
         *
         * Requires a `Signed` origin.
         *
         * - `proxy_type`: The type of the proxy that the sender will be registered as over the
         * new account. This will almost always be the most permissive `ProxyType` possible to
         * allow for maximum flexibility.
         * - `index`: A disambiguation index, in case this is called multiple times in the same
         * transaction (e.g. with `utility::batch`). Unless you're using `batch` you probably just
         * want to use `0`.
         * - `delay`: The announcement period required of the initial proxy. Will generally be
         * zero.
         *
         * Fails with `Duplicate` if this has already been called in this transaction, from the
         * same sender, with the same parameters.
         *
         * Fails if there are insufficient funds to pay for deposit.
         */
        "create_pure": Anonymize<I7l4hu9floq5js>;
        /**
         * Removes a previously spawned pure proxy.
         *
         * WARNING: **All access to this account will be lost.** Any funds held in it will be
         * inaccessible.
         *
         * Requires a `Signed` origin, and the sender account must have been created by a call to
         * `pure` with corresponding parameters.
         *
         * - `spawner`: The account that originally called `pure` to create this account.
         * - `index`: The disambiguation index originally passed to `pure`. Probably `0`.
         * - `proxy_type`: The proxy type originally passed to `pure`.
         * - `height`: The height of the chain when the call to `pure` was processed.
         * - `ext_index`: The extrinsic index in which the call to `pure` was processed.
         *
         * Fails with `NoPermission` in case the caller is not a previously created pure
         * account whose `pure` call has corresponding parameters.
         */
        "kill_pure": Anonymize<I5860vql6ga92>;
        /**
         * Publish the hash of a proxy-call that will be made in the future.
         *
         * This must be called some number of blocks before the corresponding `proxy` is attempted
         * if the delay associated with the proxy relationship is greater than zero.
         *
         * No more than `MaxPending` announcements may be made at any one time.
         *
         * This will take a deposit of `AnnouncementDepositFactor` as well as
         * `AnnouncementDepositBase` if there are no other pending announcements.
         *
         * The dispatch origin for this call must be _Signed_ and a proxy of `real`.
         *
         * Parameters:
         * - `real`: The account that the proxy will make a call on behalf of.
         * - `call_hash`: The hash of the call to be made by the `real` account.
         */
        "announce": Anonymize<I2eb501t8s6hsq>;
        /**
         * Remove a given announcement.
         *
         * May be called by a proxy account to remove a call they previously announced and return
         * the deposit.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * Parameters:
         * - `real`: The account that the proxy will make a call on behalf of.
         * - `call_hash`: The hash of the call to be made by the `real` account.
         */
        "remove_announcement": Anonymize<I2eb501t8s6hsq>;
        /**
         * Remove the given announcement of a delegate.
         *
         * May be called by a target (proxied) account to remove a call that one of their delegates
         * (`delegate`) has announced they want to execute. The deposit is returned.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * Parameters:
         * - `delegate`: The account that previously announced the call.
         * - `call_hash`: The hash of the call to be made.
         */
        "reject_announcement": Anonymize<Ianmuoljk2sk1u>;
        /**
         * Dispatch the given `call` from an account that the sender is authorized for through
         * `add_proxy`.
         *
         * Removes any corresponding announcement(s).
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * Parameters:
         * - `real`: The account that the proxy will make a call on behalf of.
         * - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
         * - `call`: The call to be made by the `real` account.
         */
        "proxy_announced": {
            "delegate": MultiAddress;
            "real": MultiAddress;
            "force_proxy_type"?: Anonymize<I93g3hgcn0dpaj>;
            "call": TxCallData;
        };
    }>;
    "Multisig": Enum<{
        /**
         * Immediately dispatch a multi-signature call using a single approval from the caller.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * - `other_signatories`: The accounts (other than the sender) who are part of the
         * multi-signature, but do not participate in the approval process.
         * - `call`: The call to be executed.
         *
         * Result is equivalent to the dispatched result.
         *
         * ## Complexity
         * O(Z + C) where Z is the length of the call and C its execution weight.
         */
        "as_multi_threshold_1": {
            "other_signatories": Anonymize<Ia2lhg7l2hilo3>;
            "call": TxCallData;
        };
        /**
         * Register approval for a dispatch to be made from a deterministic composite account if
         * approved by a total of `threshold - 1` of `other_signatories`.
         *
         * If there are enough, then dispatch the call.
         *
         * Payment: `DepositBase` will be reserved if this is the first approval, plus
         * `threshold` times `DepositFactor`. It is returned once this dispatch happens or
         * is cancelled.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * - `threshold`: The total number of approvals for this dispatch before it is executed.
         * - `other_signatories`: The accounts (other than the sender) who can approve this
         * dispatch. May not be empty.
         * - `maybe_timepoint`: If this is the first approval, then this must be `None`. If it is
         * not the first approval, then it must be `Some`, with the timepoint (block number and
         * transaction index) of the first approval transaction.
         * - `call`: The call to be executed.
         *
         * NOTE: Unless this is the final approval, you will generally want to use
         * `approve_as_multi` instead, since it only requires a hash of the call.
         *
         * Result is equivalent to the dispatched result if `threshold` is exactly `1`. Otherwise
         * on success, result is `Ok` and the result from the interior call, if it was executed,
         * may be found in the deposited `MultisigExecuted` event.
         *
         * ## Complexity
         * - `O(S + Z + Call)`.
         * - Up to one balance-reserve or unreserve operation.
         * - One passthrough operation, one insert, both `O(S)` where `S` is the number of
         * signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
         * - One call encode & hash, both of complexity `O(Z)` where `Z` is tx-len.
         * - One encode & hash, both of complexity `O(S)`.
         * - Up to one binary search and insert (`O(logS + S)`).
         * - I/O: 1 read `O(S)`, up to 1 mutate `O(S)`. Up to one remove.
         * - One event.
         * - The weight of the `call`.
         * - Storage: inserts one item, value size bounded by `MaxSignatories`, with a deposit
         * taken for its lifetime of `DepositBase + threshold * DepositFactor`.
         */
        "as_multi": {
            "threshold": number;
            "other_signatories": Anonymize<Ia2lhg7l2hilo3>;
            "maybe_timepoint"?: Anonymize<I95jfd8j5cr5eh>;
            "call": TxCallData;
            "max_weight": Anonymize<I4q39t5hn830vp>;
        };
        /**
         * Register approval for a dispatch to be made from a deterministic composite account if
         * approved by a total of `threshold - 1` of `other_signatories`.
         *
         * Payment: `DepositBase` will be reserved if this is the first approval, plus
         * `threshold` times `DepositFactor`. It is returned once this dispatch happens or
         * is cancelled.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * - `threshold`: The total number of approvals for this dispatch before it is executed.
         * - `other_signatories`: The accounts (other than the sender) who can approve this
         * dispatch. May not be empty.
         * - `maybe_timepoint`: If this is the first approval, then this must be `None`. If it is
         * not the first approval, then it must be `Some`, with the timepoint (block number and
         * transaction index) of the first approval transaction.
         * - `call_hash`: The hash of the call to be executed.
         *
         * NOTE: If this is the final approval, you will want to use `as_multi` instead.
         *
         * ## Complexity
         * - `O(S)`.
         * - Up to one balance-reserve or unreserve operation.
         * - One passthrough operation, one insert, both `O(S)` where `S` is the number of
         * signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
         * - One encode & hash, both of complexity `O(S)`.
         * - Up to one binary search and insert (`O(logS + S)`).
         * - I/O: 1 read `O(S)`, up to 1 mutate `O(S)`. Up to one remove.
         * - One event.
         * - Storage: inserts one item, value size bounded by `MaxSignatories`, with a deposit
         * taken for its lifetime of `DepositBase + threshold * DepositFactor`.
         */
        "approve_as_multi": Anonymize<Ideaemvoneh309>;
        /**
         * Cancel a pre-existing, on-going multisig transaction. Any deposit reserved previously
         * for this operation will be unreserved on success.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * - `threshold`: The total number of approvals for this dispatch before it is executed.
         * - `other_signatories`: The accounts (other than the sender) who can approve this
         * dispatch. May not be empty.
         * - `timepoint`: The timepoint (block number and transaction index) of the first approval
         * transaction for this dispatch.
         * - `call_hash`: The hash of the call to be executed.
         *
         * ## Complexity
         * - `O(S)`.
         * - Up to one balance-reserve or unreserve operation.
         * - One passthrough operation, one insert, both `O(S)` where `S` is the number of
         * signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
         * - One encode & hash, both of complexity `O(S)`.
         * - One event.
         * - I/O: 1 read `O(S)`, one remove.
         * - Storage: removes one item.
         */
        "cancel_as_multi": Anonymize<I3d9o9d7epp66v>;
    }>;
    "Bounties": Anonymize<I1nnef4ljub6d0>;
    "ChildBounties": Anonymize<I1b6drdhvt5hl9>;
    "ElectionProviderMultiPhase": Anonymize<I15soeogelbbbh>;
    "VoterList": Anonymize<Ifvfo1l0vu2o7e>;
    "NominationPools": Anonymize<I57mljkkr28m9p>;
    "FastUnstake": Anonymize<I44snhj1gahvrd>;
    "Configuration": Anonymize<I3ah0kpgrv4i88>;
    "ParasShared": undefined;
    "ParaInclusion": undefined;
    "ParaInherent": Anonymize<I1nu19212e8egv>;
    "Paras": Anonymize<Ie2dden5k4kk7t>;
    "Initializer": Anonymize<Ieggtnkc96vvt7>;
    "Hrmp": Anonymize<I45adic8nko129>;
    "ParasDisputes": Anonymize<Ifkh1ep7g9h3rv>;
    "ParasSlashing": Enum<{
        "report_dispute_lost_unsigned": {
            "dispute_proof": {
                "time_slot": Anonymize<Iee37emj23tmbu>;
                "kind": SlashingOffenceKind;
                "validator_index": number;
                "validator_id": FixedSizeBinary<32>;
            };
            "key_owner_proof": Anonymize<I3ia7aufsoj0l1>;
        };
    }>;
    "OnDemand": Enum<{
        /**
         * Create a single on demand core order.
         * Will use the spot price for the current block and will reap the account if needed.
         *
         * Parameters:
         * - `origin`: The sender of the call, funds will be withdrawn from this account.
         * - `max_amount`: The maximum balance to withdraw from the origin to place an order.
         * - `para_id`: A `ParaId` the origin wants to provide blockspace for.
         *
         * Errors:
         * - `InsufficientBalance`: from the Currency implementation
         * - `QueueFull`
         * - `SpotPriceHigherThanMaxAmount`
         *
         * Events:
         * - `OnDemandOrderPlaced`
         */
        "place_order_allow_death": Anonymize<Iaa7g3f5tlv3gf>;
        /**
         * Same as the [`place_order_allow_death`](Self::place_order_allow_death) call , but with a
         * check that placing the order will not reap the account.
         *
         * Parameters:
         * - `origin`: The sender of the call, funds will be withdrawn from this account.
         * - `max_amount`: The maximum balance to withdraw from the origin to place an order.
         * - `para_id`: A `ParaId` the origin wants to provide blockspace for.
         *
         * Errors:
         * - `InsufficientBalance`: from the Currency implementation
         * - `QueueFull`
         * - `SpotPriceHigherThanMaxAmount`
         *
         * Events:
         * - `OnDemandOrderPlaced`
         */
        "place_order_keep_alive": Anonymize<Iaa7g3f5tlv3gf>;
    }>;
    "Registrar": Anonymize<Icclqj5sge2nc7>;
    "Slots": Anonymize<Iafhis924j14hg>;
    "Auctions": Anonymize<I4a8qeimc5p3qn>;
    "Crowdloan": Anonymize<Iaj4q75nu5v2i2>;
    "Coretime": Enum<{
        /**
         * Request the configuration to be updated with the specified number of cores. Warning:
         * Since this only schedules a configuration update, it takes two sessions to come into
         * effect.
         *
         * - `origin`: Root or the Coretime Chain
         * - `count`: total number of cores
         */
        "request_core_count": Anonymize<Iafscmv8tjf0ou>;
        /**
         * Request to claim the instantaneous coretime sales revenue starting from the block it was
         * last claimed until and up to the block specified. The claimed amount value is sent back
         * to the Coretime chain in a `notify_revenue` message. At the same time, the amount is
         * teleported to the Coretime chain.
         */
        "request_revenue_at": Anonymize<Ibtsa3docbr9el>;
        /**
         * Receive instructions from the `ExternalBrokerOrigin`, detailing how a specific core is
         * to be used.
         *
         * Parameters:
         * -`origin`: The `ExternalBrokerOrigin`, assumed to be the coretime chain.
         * -`core`: The core that should be scheduled.
         * -`begin`: The starting blockheight of the instruction.
         * -`assignment`: How the blockspace should be utilised.
         * -`end_hint`: An optional hint as to when this particular set of instructions will end.
         */
        "assign_core": Anonymize<I2gpmmfdqv3cdc>;
    }>;
    "StateTrieMigration": Anonymize<I39l72gdmkk30t>;
    "XcmPallet": Anonymize<I4up31a3q8cjhp>;
    "MessageQueue": Anonymize<I3lic4llm6egbr>;
    "AssetRate": Anonymize<If582h5gr5gh6f>;
    "Beefy": Anonymize<Idmcmrk34p8gic>;
    "ParaSudoWrapper": Anonymize<I8f92tvrsnq2cu>;
    "Sudo": Enum<{
        /**
         * Authenticates the sudo key and dispatches a function call with `Root` origin.
         */
        "sudo": Anonymize<I2rrem89iuotjh>;
        /**
         * Authenticates the sudo key and dispatches a function call with `Root` origin.
         * This function does not check the weight of the call, and instead allows the
         * Sudo user to specify the weight of the call.
         *
         * The dispatch origin for this call must be _Signed_.
         */
        "sudo_unchecked_weight": Anonymize<I9m4n27oh67jnn>;
        /**
         * Authenticates the current sudo key and sets the given AccountId (`new`) as the new sudo
         * key.
         */
        "set_key": Anonymize<I8k3rnvpeeh4hv>;
        /**
         * Authenticates the sudo key and dispatches a function call with `Signed` origin from
         * a given account.
         *
         * The dispatch origin for this call must be _Signed_.
         */
        "sudo_as": {
            "who": MultiAddress;
            "call": TxCallData;
        };
        /**
         * Permanently removes the sudo key.
         *
         * **This cannot be un-done.**
         */
        "remove_key": undefined;
    }>;
}>;
export type I2rrem89iuotjh = {
    "call": TxCallData;
};
export type I9m4n27oh67jnn = {
    "call": TxCallData;
    "weight": Anonymize<I4q39t5hn830vp>;
};
export type SlashingOffenceKind = Enum<{
    "ForInvalid": undefined;
    "AgainstValid": undefined;
}>;
export declare const SlashingOffenceKind: GetEnum<SlashingOffenceKind>;
export type Iallru7ip92v91 = AnonymousEnum<{
    "System": Anonymize<Iekve0i6djpd9f>;
    "ParachainSystem": Anonymize<I5kev21p7u6ajb>;
    "Timestamp": Anonymize<I7d75gqfg6jh9c>;
    "ParachainInfo": undefined;
    "Balances": Anonymize<I9svldsp29mh87>;
    "Vesting": Anonymize<Icgf8vmtkbnu4u>;
    "CollatorSelection": Anonymize<I9dpq5287dur8b>;
    "Session": Anonymize<I77dda7hps0u37>;
    "XcmpQueue": Anonymize<Ib7tahn20bvsep>;
    "PolkadotXcm": Anonymize<I4up31a3q8cjhp>;
    "CumulusXcm": undefined;
    "ToKusamaXcmRouter": Anonymize<I6epb28bkd5aqn>;
    "MessageQueue": Anonymize<Ic2uoe7jdksosp>;
    "Utility": Enum<{
        /**
         * Send a batch of dispatch calls.
         *
         * May be called from any origin except `None`.
         *
         * - `calls`: The calls to be dispatched from the same origin. The number of call must not
         * exceed the constant: `batched_calls_limit` (available in constant metadata).
         *
         * If origin is root then the calls are dispatched without checking origin filter. (This
         * includes bypassing `frame_system::Config::BaseCallFilter`).
         *
         * ## Complexity
         * - O(C) where C is the number of calls to be batched.
         *
         * This will return `Ok` in all circumstances. To determine the success of the batch, an
         * event is deposited. If a call failed and the batch was interrupted, then the
         * `BatchInterrupted` event is deposited, along with the number of successful calls made
         * and the error of the failed call. If all were successful, then the `BatchCompleted`
         * event is deposited.
         */
        "batch": {
            "calls": Array<TxCallData>;
        };
        /**
         * Send a call through an indexed pseudonym of the sender.
         *
         * Filter from origin are passed along. The call will be dispatched with an origin which
         * use the same filter as the origin of this call.
         *
         * NOTE: If you need to ensure that any account-based filtering is not honored (i.e.
         * because you expect `proxy` to have been used prior in the call stack and you do not want
         * the call restrictions to apply to any sub-accounts), then use `as_multi_threshold_1`
         * in the Multisig pallet instead.
         *
         * NOTE: Prior to version *12, this was called `as_limited_sub`.
         *
         * The dispatch origin for this call must be _Signed_.
         */
        "as_derivative": {
            "index": number;
            "call": TxCallData;
        };
        /**
         * Send a batch of dispatch calls and atomically execute them.
         * The whole transaction will rollback and fail if any of the calls failed.
         *
         * May be called from any origin except `None`.
         *
         * - `calls`: The calls to be dispatched from the same origin. The number of call must not
         * exceed the constant: `batched_calls_limit` (available in constant metadata).
         *
         * If origin is root then the calls are dispatched without checking origin filter. (This
         * includes bypassing `frame_system::Config::BaseCallFilter`).
         *
         * ## Complexity
         * - O(C) where C is the number of calls to be batched.
         */
        "batch_all": {
            "calls": Array<TxCallData>;
        };
        /**
         * Dispatches a function call with a provided origin.
         *
         * The dispatch origin for this call must be _Root_.
         *
         * ## Complexity
         * - O(1).
         */
        "dispatch_as": {
            "as_origin": Anonymize<I42ficri7uep20>;
            "call": TxCallData;
        };
        /**
         * Send a batch of dispatch calls.
         * Unlike `batch`, it allows errors and won't interrupt.
         *
         * May be called from any origin except `None`.
         *
         * - `calls`: The calls to be dispatched from the same origin. The number of call must not
         * exceed the constant: `batched_calls_limit` (available in constant metadata).
         *
         * If origin is root then the calls are dispatch without checking origin filter. (This
         * includes bypassing `frame_system::Config::BaseCallFilter`).
         *
         * ## Complexity
         * - O(C) where C is the number of calls to be batched.
         */
        "force_batch": {
            "calls": Array<TxCallData>;
        };
        /**
         * Dispatch a function call with a specified weight.
         *
         * This function does not check the weight of the call, and instead allows the
         * Root origin to specify the weight of the call.
         *
         * The dispatch origin for this call must be _Root_.
         */
        "with_weight": Anonymize<I6uphldr306rb2>;
    }>;
    "Multisig": Enum<{
        /**
         * Immediately dispatch a multi-signature call using a single approval from the caller.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * - `other_signatories`: The accounts (other than the sender) who are part of the
         * multi-signature, but do not participate in the approval process.
         * - `call`: The call to be executed.
         *
         * Result is equivalent to the dispatched result.
         *
         * ## Complexity
         * O(Z + C) where Z is the length of the call and C its execution weight.
         */
        "as_multi_threshold_1": {
            "other_signatories": Anonymize<Ia2lhg7l2hilo3>;
            "call": TxCallData;
        };
        /**
         * Register approval for a dispatch to be made from a deterministic composite account if
         * approved by a total of `threshold - 1` of `other_signatories`.
         *
         * If there are enough, then dispatch the call.
         *
         * Payment: `DepositBase` will be reserved if this is the first approval, plus
         * `threshold` times `DepositFactor`. It is returned once this dispatch happens or
         * is cancelled.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * - `threshold`: The total number of approvals for this dispatch before it is executed.
         * - `other_signatories`: The accounts (other than the sender) who can approve this
         * dispatch. May not be empty.
         * - `maybe_timepoint`: If this is the first approval, then this must be `None`. If it is
         * not the first approval, then it must be `Some`, with the timepoint (block number and
         * transaction index) of the first approval transaction.
         * - `call`: The call to be executed.
         *
         * NOTE: Unless this is the final approval, you will generally want to use
         * `approve_as_multi` instead, since it only requires a hash of the call.
         *
         * Result is equivalent to the dispatched result if `threshold` is exactly `1`. Otherwise
         * on success, result is `Ok` and the result from the interior call, if it was executed,
         * may be found in the deposited `MultisigExecuted` event.
         *
         * ## Complexity
         * - `O(S + Z + Call)`.
         * - Up to one balance-reserve or unreserve operation.
         * - One passthrough operation, one insert, both `O(S)` where `S` is the number of
         * signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
         * - One call encode & hash, both of complexity `O(Z)` where `Z` is tx-len.
         * - One encode & hash, both of complexity `O(S)`.
         * - Up to one binary search and insert (`O(logS + S)`).
         * - I/O: 1 read `O(S)`, up to 1 mutate `O(S)`. Up to one remove.
         * - One event.
         * - The weight of the `call`.
         * - Storage: inserts one item, value size bounded by `MaxSignatories`, with a deposit
         * taken for its lifetime of `DepositBase + threshold * DepositFactor`.
         */
        "as_multi": {
            "threshold": number;
            "other_signatories": Anonymize<Ia2lhg7l2hilo3>;
            "maybe_timepoint"?: Anonymize<I95jfd8j5cr5eh>;
            "call": TxCallData;
            "max_weight": Anonymize<I4q39t5hn830vp>;
        };
        /**
         * Register approval for a dispatch to be made from a deterministic composite account if
         * approved by a total of `threshold - 1` of `other_signatories`.
         *
         * Payment: `DepositBase` will be reserved if this is the first approval, plus
         * `threshold` times `DepositFactor`. It is returned once this dispatch happens or
         * is cancelled.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * - `threshold`: The total number of approvals for this dispatch before it is executed.
         * - `other_signatories`: The accounts (other than the sender) who can approve this
         * dispatch. May not be empty.
         * - `maybe_timepoint`: If this is the first approval, then this must be `None`. If it is
         * not the first approval, then it must be `Some`, with the timepoint (block number and
         * transaction index) of the first approval transaction.
         * - `call_hash`: The hash of the call to be executed.
         *
         * NOTE: If this is the final approval, you will want to use `as_multi` instead.
         *
         * ## Complexity
         * - `O(S)`.
         * - Up to one balance-reserve or unreserve operation.
         * - One passthrough operation, one insert, both `O(S)` where `S` is the number of
         * signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
         * - One encode & hash, both of complexity `O(S)`.
         * - Up to one binary search and insert (`O(logS + S)`).
         * - I/O: 1 read `O(S)`, up to 1 mutate `O(S)`. Up to one remove.
         * - One event.
         * - Storage: inserts one item, value size bounded by `MaxSignatories`, with a deposit
         * taken for its lifetime of `DepositBase + threshold * DepositFactor`.
         */
        "approve_as_multi": Anonymize<Ideaemvoneh309>;
        /**
         * Cancel a pre-existing, on-going multisig transaction. Any deposit reserved previously
         * for this operation will be unreserved on success.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * - `threshold`: The total number of approvals for this dispatch before it is executed.
         * - `other_signatories`: The accounts (other than the sender) who can approve this
         * dispatch. May not be empty.
         * - `timepoint`: The timepoint (block number and transaction index) of the first approval
         * transaction for this dispatch.
         * - `call_hash`: The hash of the call to be executed.
         *
         * ## Complexity
         * - `O(S)`.
         * - Up to one balance-reserve or unreserve operation.
         * - One passthrough operation, one insert, both `O(S)` where `S` is the number of
         * signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
         * - One encode & hash, both of complexity `O(S)`.
         * - One event.
         * - I/O: 1 read `O(S)`, one remove.
         * - Storage: removes one item.
         */
        "cancel_as_multi": Anonymize<I3d9o9d7epp66v>;
    }>;
    "Proxy": Enum<{
        /**
         * Dispatch the given `call` from an account that the sender is authorised for through
         * `add_proxy`.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * Parameters:
         * - `real`: The account that the proxy will make a call on behalf of.
         * - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
         * - `call`: The call to be made by the `real` account.
         */
        "proxy": {
            "real": MultiAddress;
            "force_proxy_type"?: Anonymize<I7rk1n3vg3et43>;
            "call": TxCallData;
        };
        /**
         * Register a proxy account for the sender that is able to make calls on its behalf.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * Parameters:
         * - `proxy`: The account that the `caller` would like to make a proxy.
         * - `proxy_type`: The permissions allowed for this proxy account.
         * - `delay`: The announcement period required of the initial proxy. Will generally be
         * zero.
         */
        "add_proxy": Anonymize<Iovrcu9bfelfq>;
        /**
         * Unregister a proxy account for the sender.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * Parameters:
         * - `proxy`: The account that the `caller` would like to remove as a proxy.
         * - `proxy_type`: The permissions currently enabled for the removed proxy account.
         */
        "remove_proxy": Anonymize<Iovrcu9bfelfq>;
        /**
         * Unregister all proxy accounts for the sender.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * WARNING: This may be called on accounts created by `pure`, however if done, then
         * the unreserved fees will be inaccessible. **All access to this account will be lost.**
         */
        "remove_proxies": undefined;
        /**
         * Spawn a fresh new account that is guaranteed to be otherwise inaccessible, and
         * initialize it with a proxy of `proxy_type` for `origin` sender.
         *
         * Requires a `Signed` origin.
         *
         * - `proxy_type`: The type of the proxy that the sender will be registered as over the
         * new account. This will almost always be the most permissive `ProxyType` possible to
         * allow for maximum flexibility.
         * - `index`: A disambiguation index, in case this is called multiple times in the same
         * transaction (e.g. with `utility::batch`). Unless you're using `batch` you probably just
         * want to use `0`.
         * - `delay`: The announcement period required of the initial proxy. Will generally be
         * zero.
         *
         * Fails with `Duplicate` if this has already been called in this transaction, from the
         * same sender, with the same parameters.
         *
         * Fails if there are insufficient funds to pay for deposit.
         */
        "create_pure": Anonymize<Iefr8jgtgfk8um>;
        /**
         * Removes a previously spawned pure proxy.
         *
         * WARNING: **All access to this account will be lost.** Any funds held in it will be
         * inaccessible.
         *
         * Requires a `Signed` origin, and the sender account must have been created by a call to
         * `pure` with corresponding parameters.
         *
         * - `spawner`: The account that originally called `pure` to create this account.
         * - `index`: The disambiguation index originally passed to `pure`. Probably `0`.
         * - `proxy_type`: The proxy type originally passed to `pure`.
         * - `height`: The height of the chain when the call to `pure` was processed.
         * - `ext_index`: The extrinsic index in which the call to `pure` was processed.
         *
         * Fails with `NoPermission` in case the caller is not a previously created pure
         * account whose `pure` call has corresponding parameters.
         */
        "kill_pure": Anonymize<I3j05hul54uj7q>;
        /**
         * Publish the hash of a proxy-call that will be made in the future.
         *
         * This must be called some number of blocks before the corresponding `proxy` is attempted
         * if the delay associated with the proxy relationship is greater than zero.
         *
         * No more than `MaxPending` announcements may be made at any one time.
         *
         * This will take a deposit of `AnnouncementDepositFactor` as well as
         * `AnnouncementDepositBase` if there are no other pending announcements.
         *
         * The dispatch origin for this call must be _Signed_ and a proxy of `real`.
         *
         * Parameters:
         * - `real`: The account that the proxy will make a call on behalf of.
         * - `call_hash`: The hash of the call to be made by the `real` account.
         */
        "announce": Anonymize<I2eb501t8s6hsq>;
        /**
         * Remove a given announcement.
         *
         * May be called by a proxy account to remove a call they previously announced and return
         * the deposit.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * Parameters:
         * - `real`: The account that the proxy will make a call on behalf of.
         * - `call_hash`: The hash of the call to be made by the `real` account.
         */
        "remove_announcement": Anonymize<I2eb501t8s6hsq>;
        /**
         * Remove the given announcement of a delegate.
         *
         * May be called by a target (proxied) account to remove a call that one of their delegates
         * (`delegate`) has announced they want to execute. The deposit is returned.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * Parameters:
         * - `delegate`: The account that previously announced the call.
         * - `call_hash`: The hash of the call to be made.
         */
        "reject_announcement": Anonymize<Ianmuoljk2sk1u>;
        /**
         * Dispatch the given `call` from an account that the sender is authorized for through
         * `add_proxy`.
         *
         * Removes any corresponding announcement(s).
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * Parameters:
         * - `real`: The account that the proxy will make a call on behalf of.
         * - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
         * - `call`: The call to be made by the `real` account.
         */
        "proxy_announced": {
            "delegate": MultiAddress;
            "real": MultiAddress;
            "force_proxy_type"?: Anonymize<I7rk1n3vg3et43>;
            "call": TxCallData;
        };
    }>;
    "Assets": Anonymize<I84851acvod2ic>;
    "Uniques": Anonymize<Icu49uv7rfej74>;
    "Nfts": Anonymize<I1k4il7i5elhc7>;
    "ForeignAssets": Anonymize<I8ktel4pq9nbjk>;
    "PoolAssets": Anonymize<I84851acvod2ic>;
    "AssetConversion": Anonymize<I9eemk0c7gip8o>;
    "StateTrieMigration": Anonymize<I39l72gdmkk30t>;
    "Sudo": Enum<{
        /**
         * Authenticates the sudo key and dispatches a function call with `Root` origin.
         */
        "sudo": {
            "call": TxCallData;
        };
        /**
         * Authenticates the sudo key and dispatches a function call with `Root` origin.
         * This function does not check the weight of the call, and instead allows the
         * Sudo user to specify the weight of the call.
         *
         * The dispatch origin for this call must be _Signed_.
         */
        "sudo_unchecked_weight": Anonymize<I6uphldr306rb2>;
        /**
         * Authenticates the current sudo key and sets the given AccountId (`new`) as the new sudo
         * key.
         */
        "set_key": Anonymize<I8k3rnvpeeh4hv>;
        /**
         * Authenticates the sudo key and dispatches a function call with `Signed` origin from
         * a given account.
         *
         * The dispatch origin for this call must be _Signed_.
         */
        "sudo_as": {
            "who": MultiAddress;
            "call": TxCallData;
        };
        /**
         * Permanently removes the sudo key.
         *
         * **This cannot be un-done.**
         */
        "remove_key": undefined;
    }>;
}>;
export type I6uphldr306rb2 = {
    "call": TxCallData;
    "weight": Anonymize<I4q39t5hn830vp>;
};
export type Ib75rrtlhu6kc2 = AnonymousEnum<{
    "System": Anonymize<Iekve0i6djpd9f>;
    "ParachainSystem": Anonymize<I3u72uvpuo4qrt>;
    "Timestamp": Anonymize<I7d75gqfg6jh9c>;
    "ParachainInfo": undefined;
    "MultiBlockMigrations": Anonymize<I4oqb168b2d4er>;
    "Balances": Anonymize<I9svldsp29mh87>;
    "CollatorSelection": Anonymize<I9dpq5287dur8b>;
    "Session": Anonymize<I77dda7hps0u37>;
    "XcmpQueue": Anonymize<Ib7tahn20bvsep>;
    "PolkadotXcm": Anonymize<I6k1inef986368>;
    "CumulusXcm": undefined;
    "ToRococoXcmRouter": Anonymize<I6epb28bkd5aqn>;
    "MessageQueue": Anonymize<Ic2uoe7jdksosp>;
    "SnowbridgeSystemFrontend": Anonymize<I15u4pbuusigel>;
    "Utility": Enum<{
        /**
         * Send a batch of dispatch calls.
         *
         * May be called from any origin except `None`.
         *
         * - `calls`: The calls to be dispatched from the same origin. The number of call must not
         * exceed the constant: `batched_calls_limit` (available in constant metadata).
         *
         * If origin is root then the calls are dispatched without checking origin filter. (This
         * includes bypassing `frame_system::Config::BaseCallFilter`).
         *
         * ## Complexity
         * - O(C) where C is the number of calls to be batched.
         *
         * This will return `Ok` in all circumstances. To determine the success of the batch, an
         * event is deposited. If a call failed and the batch was interrupted, then the
         * `BatchInterrupted` event is deposited, along with the number of successful calls made
         * and the error of the failed call. If all were successful, then the `BatchCompleted`
         * event is deposited.
         */
        "batch": {
            "calls": Array<TxCallData>;
        };
        /**
         * Send a call through an indexed pseudonym of the sender.
         *
         * Filter from origin are passed along. The call will be dispatched with an origin which
         * use the same filter as the origin of this call.
         *
         * NOTE: If you need to ensure that any account-based filtering is not honored (i.e.
         * because you expect `proxy` to have been used prior in the call stack and you do not want
         * the call restrictions to apply to any sub-accounts), then use `as_multi_threshold_1`
         * in the Multisig pallet instead.
         *
         * NOTE: Prior to version *12, this was called `as_limited_sub`.
         *
         * The dispatch origin for this call must be _Signed_.
         */
        "as_derivative": {
            "index": number;
            "call": TxCallData;
        };
        /**
         * Send a batch of dispatch calls and atomically execute them.
         * The whole transaction will rollback and fail if any of the calls failed.
         *
         * May be called from any origin except `None`.
         *
         * - `calls`: The calls to be dispatched from the same origin. The number of call must not
         * exceed the constant: `batched_calls_limit` (available in constant metadata).
         *
         * If origin is root then the calls are dispatched without checking origin filter. (This
         * includes bypassing `frame_system::Config::BaseCallFilter`).
         *
         * ## Complexity
         * - O(C) where C is the number of calls to be batched.
         */
        "batch_all": {
            "calls": Array<TxCallData>;
        };
        /**
         * Dispatches a function call with a provided origin.
         *
         * The dispatch origin for this call must be _Root_.
         *
         * ## Complexity
         * - O(1).
         */
        "dispatch_as": {
            "as_origin": Enum<{
                "system": Anonymize<I9gqitj4t615g3>;
                "PolkadotXcm": Anonymize<Icvilmd7qu30i4>;
                "CumulusXcm": Anonymize<I3in0d0lb61qi8>;
            }>;
            "call": TxCallData;
        };
        /**
         * Send a batch of dispatch calls.
         * Unlike `batch`, it allows errors and won't interrupt.
         *
         * May be called from any origin except `None`.
         *
         * - `calls`: The calls to be dispatched from the same origin. The number of call must not
         * exceed the constant: `batched_calls_limit` (available in constant metadata).
         *
         * If origin is root then the calls are dispatch without checking origin filter. (This
         * includes bypassing `frame_system::Config::BaseCallFilter`).
         *
         * ## Complexity
         * - O(C) where C is the number of calls to be batched.
         */
        "force_batch": {
            "calls": Array<TxCallData>;
        };
        /**
         * Dispatch a function call with a specified weight.
         *
         * This function does not check the weight of the call, and instead allows the
         * Root origin to specify the weight of the call.
         *
         * The dispatch origin for this call must be _Root_.
         */
        "with_weight": Anonymize<Iccejkmm89935k>;
        /**
         * Dispatch a fallback call in the event the main call fails to execute.
         * May be called from any origin except `None`.
         *
         * This function first attempts to dispatch the `main` call.
         * If the `main` call fails, the `fallback` is attemted.
         * if the fallback is successfully dispatched, the weights of both calls
         * are accumulated and an event containing the main call error is deposited.
         *
         * In the event of a fallback failure the whole call fails
         * with the weights returned.
         *
         * - `main`: The main call to be dispatched. This is the primary action to execute.
         * - `fallback`: The fallback call to be dispatched in case the `main` call fails.
         *
         * ## Dispatch Logic
         * - If the origin is `root`, both the main and fallback calls are executed without
         * applying any origin filters.
         * - If the origin is not `root`, the origin filter is applied to both the `main` and
         * `fallback` calls.
         *
         * ## Use Case
         * - Some use cases might involve submitting a `batch` type call in either main, fallback
         * or both.
         */
        "if_else": {
            "main": TxCallData;
            "fallback": TxCallData;
        };
        /**
         * Dispatches a function call with a provided origin.
         *
         * Almost the same as [`Pallet::dispatch_as`] but forwards any error of the inner call.
         *
         * The dispatch origin for this call must be _Root_.
         */
        "dispatch_as_fallible": {
            "as_origin": Enum<{
                "system": Anonymize<I9gqitj4t615g3>;
                "PolkadotXcm": Anonymize<Icvilmd7qu30i4>;
                "CumulusXcm": Anonymize<I3in0d0lb61qi8>;
            }>;
            "call": TxCallData;
        };
    }>;
    "Multisig": Enum<{
        /**
         * Immediately dispatch a multi-signature call using a single approval from the caller.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * - `other_signatories`: The accounts (other than the sender) who are part of the
         * multi-signature, but do not participate in the approval process.
         * - `call`: The call to be executed.
         *
         * Result is equivalent to the dispatched result.
         *
         * ## Complexity
         * O(Z + C) where Z is the length of the call and C its execution weight.
         */
        "as_multi_threshold_1": {
            "other_signatories": Anonymize<Ia2lhg7l2hilo3>;
            "call": TxCallData;
        };
        /**
         * Register approval for a dispatch to be made from a deterministic composite account if
         * approved by a total of `threshold - 1` of `other_signatories`.
         *
         * If there are enough, then dispatch the call.
         *
         * Payment: `DepositBase` will be reserved if this is the first approval, plus
         * `threshold` times `DepositFactor`. It is returned once this dispatch happens or
         * is cancelled.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * - `threshold`: The total number of approvals for this dispatch before it is executed.
         * - `other_signatories`: The accounts (other than the sender) who can approve this
         * dispatch. May not be empty.
         * - `maybe_timepoint`: If this is the first approval, then this must be `None`. If it is
         * not the first approval, then it must be `Some`, with the timepoint (block number and
         * transaction index) of the first approval transaction.
         * - `call`: The call to be executed.
         *
         * NOTE: Unless this is the final approval, you will generally want to use
         * `approve_as_multi` instead, since it only requires a hash of the call.
         *
         * Result is equivalent to the dispatched result if `threshold` is exactly `1`. Otherwise
         * on success, result is `Ok` and the result from the interior call, if it was executed,
         * may be found in the deposited `MultisigExecuted` event.
         *
         * ## Complexity
         * - `O(S + Z + Call)`.
         * - Up to one balance-reserve or unreserve operation.
         * - One passthrough operation, one insert, both `O(S)` where `S` is the number of
         * signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
         * - One call encode & hash, both of complexity `O(Z)` where `Z` is tx-len.
         * - One encode & hash, both of complexity `O(S)`.
         * - Up to one binary search and insert (`O(logS + S)`).
         * - I/O: 1 read `O(S)`, up to 1 mutate `O(S)`. Up to one remove.
         * - One event.
         * - The weight of the `call`.
         * - Storage: inserts one item, value size bounded by `MaxSignatories`, with a deposit
         * taken for its lifetime of `DepositBase + threshold * DepositFactor`.
         */
        "as_multi": {
            "threshold": number;
            "other_signatories": Anonymize<Ia2lhg7l2hilo3>;
            "maybe_timepoint"?: Anonymize<I95jfd8j5cr5eh>;
            "call": TxCallData;
            "max_weight": Anonymize<I4q39t5hn830vp>;
        };
        /**
         * Register approval for a dispatch to be made from a deterministic composite account if
         * approved by a total of `threshold - 1` of `other_signatories`.
         *
         * Payment: `DepositBase` will be reserved if this is the first approval, plus
         * `threshold` times `DepositFactor`. It is returned once this dispatch happens or
         * is cancelled.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * - `threshold`: The total number of approvals for this dispatch before it is executed.
         * - `other_signatories`: The accounts (other than the sender) who can approve this
         * dispatch. May not be empty.
         * - `maybe_timepoint`: If this is the first approval, then this must be `None`. If it is
         * not the first approval, then it must be `Some`, with the timepoint (block number and
         * transaction index) of the first approval transaction.
         * - `call_hash`: The hash of the call to be executed.
         *
         * NOTE: If this is the final approval, you will want to use `as_multi` instead.
         *
         * ## Complexity
         * - `O(S)`.
         * - Up to one balance-reserve or unreserve operation.
         * - One passthrough operation, one insert, both `O(S)` where `S` is the number of
         * signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
         * - One encode & hash, both of complexity `O(S)`.
         * - Up to one binary search and insert (`O(logS + S)`).
         * - I/O: 1 read `O(S)`, up to 1 mutate `O(S)`. Up to one remove.
         * - One event.
         * - Storage: inserts one item, value size bounded by `MaxSignatories`, with a deposit
         * taken for its lifetime of `DepositBase + threshold * DepositFactor`.
         */
        "approve_as_multi": Anonymize<Ideaemvoneh309>;
        /**
         * Cancel a pre-existing, on-going multisig transaction. Any deposit reserved previously
         * for this operation will be unreserved on success.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * - `threshold`: The total number of approvals for this dispatch before it is executed.
         * - `other_signatories`: The accounts (other than the sender) who can approve this
         * dispatch. May not be empty.
         * - `timepoint`: The timepoint (block number and transaction index) of the first approval
         * transaction for this dispatch.
         * - `call_hash`: The hash of the call to be executed.
         *
         * ## Complexity
         * - `O(S)`.
         * - Up to one balance-reserve or unreserve operation.
         * - One passthrough operation, one insert, both `O(S)` where `S` is the number of
         * signatories. `S` is capped by `MaxSignatories`, with weight being proportional.
         * - One encode & hash, both of complexity `O(S)`.
         * - One event.
         * - I/O: 1 read `O(S)`, one remove.
         * - Storage: removes one item.
         */
        "cancel_as_multi": Anonymize<I3d9o9d7epp66v>;
        /**
         * Poke the deposit reserved for an existing multisig operation.
         *
         * The dispatch origin for this call must be _Signed_ and must be the original depositor of
         * the multisig operation.
         *
         * The transaction fee is waived if the deposit amount has changed.
         *
         * - `threshold`: The total number of approvals needed for this multisig.
         * - `other_signatories`: The accounts (other than the sender) who are part of the
         * multisig.
         * - `call_hash`: The hash of the call this deposit is reserved for.
         *
         * Emits `DepositPoked` if successful.
         */
        "poke_deposit": Anonymize<I6lqh1vgb4mcja>;
    }>;
    "Proxy": Enum<{
        /**
         * Dispatch the given `call` from an account that the sender is authorised for through
         * `add_proxy`.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * Parameters:
         * - `real`: The account that the proxy will make a call on behalf of.
         * - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
         * - `call`: The call to be made by the `real` account.
         */
        "proxy": {
            "real": MultiAddress;
            "force_proxy_type"?: Anonymize<I7rk1n3vg3et43>;
            "call": TxCallData;
        };
        /**
         * Register a proxy account for the sender that is able to make calls on its behalf.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * Parameters:
         * - `proxy`: The account that the `caller` would like to make a proxy.
         * - `proxy_type`: The permissions allowed for this proxy account.
         * - `delay`: The announcement period required of the initial proxy. Will generally be
         * zero.
         */
        "add_proxy": Anonymize<Iovrcu9bfelfq>;
        /**
         * Unregister a proxy account for the sender.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * Parameters:
         * - `proxy`: The account that the `caller` would like to remove as a proxy.
         * - `proxy_type`: The permissions currently enabled for the removed proxy account.
         */
        "remove_proxy": Anonymize<Iovrcu9bfelfq>;
        /**
         * Unregister all proxy accounts for the sender.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * WARNING: This may be called on accounts created by `create_pure`, however if done, then
         * the unreserved fees will be inaccessible. **All access to this account will be lost.**
         */
        "remove_proxies": undefined;
        /**
         * Spawn a fresh new account that is guaranteed to be otherwise inaccessible, and
         * initialize it with a proxy of `proxy_type` for `origin` sender.
         *
         * Requires a `Signed` origin.
         *
         * - `proxy_type`: The type of the proxy that the sender will be registered as over the
         * new account. This will almost always be the most permissive `ProxyType` possible to
         * allow for maximum flexibility.
         * - `index`: A disambiguation index, in case this is called multiple times in the same
         * transaction (e.g. with `utility::batch`). Unless you're using `batch` you probably just
         * want to use `0`.
         * - `delay`: The announcement period required of the initial proxy. Will generally be
         * zero.
         *
         * Fails with `Duplicate` if this has already been called in this transaction, from the
         * same sender, with the same parameters.
         *
         * Fails if there are insufficient funds to pay for deposit.
         */
        "create_pure": Anonymize<Iefr8jgtgfk8um>;
        /**
         * Removes a previously spawned pure proxy.
         *
         * WARNING: **All access to this account will be lost.** Any funds held in it will be
         * inaccessible.
         *
         * Requires a `Signed` origin, and the sender account must have been created by a call to
         * `create_pure` with corresponding parameters.
         *
         * - `spawner`: The account that originally called `create_pure` to create this account.
         * - `index`: The disambiguation index originally passed to `create_pure`. Probably `0`.
         * - `proxy_type`: The proxy type originally passed to `create_pure`.
         * - `height`: The height of the chain when the call to `create_pure` was processed.
         * - `ext_index`: The extrinsic index in which the call to `create_pure` was processed.
         *
         * Fails with `NoPermission` in case the caller is not a previously created pure
         * account whose `create_pure` call has corresponding parameters.
         */
        "kill_pure": Anonymize<I3j05hul54uj7q>;
        /**
         * Publish the hash of a proxy-call that will be made in the future.
         *
         * This must be called some number of blocks before the corresponding `proxy` is attempted
         * if the delay associated with the proxy relationship is greater than zero.
         *
         * No more than `MaxPending` announcements may be made at any one time.
         *
         * This will take a deposit of `AnnouncementDepositFactor` as well as
         * `AnnouncementDepositBase` if there are no other pending announcements.
         *
         * The dispatch origin for this call must be _Signed_ and a proxy of `real`.
         *
         * Parameters:
         * - `real`: The account that the proxy will make a call on behalf of.
         * - `call_hash`: The hash of the call to be made by the `real` account.
         */
        "announce": Anonymize<I2eb501t8s6hsq>;
        /**
         * Remove a given announcement.
         *
         * May be called by a proxy account to remove a call they previously announced and return
         * the deposit.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * Parameters:
         * - `real`: The account that the proxy will make a call on behalf of.
         * - `call_hash`: The hash of the call to be made by the `real` account.
         */
        "remove_announcement": Anonymize<I2eb501t8s6hsq>;
        /**
         * Remove the given announcement of a delegate.
         *
         * May be called by a target (proxied) account to remove a call that one of their delegates
         * (`delegate`) has announced they want to execute. The deposit is returned.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * Parameters:
         * - `delegate`: The account that previously announced the call.
         * - `call_hash`: The hash of the call to be made.
         */
        "reject_announcement": Anonymize<Ianmuoljk2sk1u>;
        /**
         * Dispatch the given `call` from an account that the sender is authorized for through
         * `add_proxy`.
         *
         * Removes any corresponding announcement(s).
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * Parameters:
         * - `real`: The account that the proxy will make a call on behalf of.
         * - `force_proxy_type`: Specify the exact proxy type to be used and checked for this call.
         * - `call`: The call to be made by the `real` account.
         */
        "proxy_announced": {
            "delegate": MultiAddress;
            "real": MultiAddress;
            "force_proxy_type"?: Anonymize<I7rk1n3vg3et43>;
            "call": TxCallData;
        };
        /**
         * Poke / Adjust deposits made for proxies and announcements based on current values.
         * This can be used by accounts to possibly lower their locked amount.
         *
         * The dispatch origin for this call must be _Signed_.
         *
         * The transaction fee is waived if the deposit amount has changed.
         *
         * Emits `DepositPoked` if successful.
         */
        "poke_deposit": undefined;
    }>;
    "Assets": Anonymize<I84851acvod2ic>;
    "Uniques": Anonymize<Icu49uv7rfej74>;
    "Nfts": Anonymize<I1k4il7i5elhc7>;
    "ForeignAssets": Anonymize<I1botoq1mmhfag>;
    "NftFractionalization": Anonymize<Ifrervtb291iin>;
    "PoolAssets": Anonymize<I84851acvod2ic>;
    "AssetConversion": Anonymize<Ia06pia7pbkurh>;
    "Revive": Enum<{
        /**
         * A raw EVM transaction, typically dispatched by an Ethereum JSON-RPC server.
         *
         * # Parameters
         *
         * * `payload`: The encoded [`crate::evm::TransactionSigned`].
         * * `gas_limit`: The gas limit enforced during contract execution.
         * * `storage_deposit_limit`: The maximum balance that can be charged to the caller for
         * storage usage.
         *
         * # Note
         *
         * This call cannot be dispatched directly; attempting to do so will result in a failed
         * transaction. It serves as a wrapper for an Ethereum transaction. When submitted, the
         * runtime converts it into a [`sp_runtime::generic::CheckedExtrinsic`] by recovering the
         * signer and validating the transaction.
         */
        "eth_transact": Anonymize<Ida37oe44osb06>;
        /**
         * Makes a call to an account, optionally transferring some balance.
         *
         * # Parameters
         *
         * * `dest`: Address of the contract to call.
         * * `value`: The balance to transfer from the `origin` to `dest`.
         * * `gas_limit`: The gas limit enforced when executing the constructor.
         * * `storage_deposit_limit`: The maximum amount of balance that can be charged from the
         * caller to pay for the storage consumed.
         * * `data`: The input data to pass to the contract.
         *
         * * If the account is a smart-contract account, the associated code will be
         * executed and any value will be transferred.
         * * If the account is a regular account, any value will be transferred.
         * * If no account exists and the call value is not less than `existential_deposit`,
         * a regular account will be created and any value will be transferred.
         */
        "call": Anonymize<Idsg8aod8e8fqn>;
        /**
         * Instantiates a contract from a previously deployed vm binary.
         *
         * This function is identical to [`Self::instantiate_with_code`] but without the
         * code deployment step. Instead, the `code_hash` of an on-chain deployed vm binary
         * must be supplied.
         */
        "instantiate": Anonymize<I46nktn22m6hbi>;
        /**
         * Instantiates a new contract from the supplied `code` optionally transferring
         * some balance.
         *
         * This dispatchable has the same effect as calling [`Self::upload_code`] +
         * [`Self::instantiate`]. Bundling them together provides efficiency gains. Please
         * also check the documentation of [`Self::upload_code`].
         *
         * # Parameters
         *
         * * `value`: The balance to transfer from the `origin` to the newly created contract.
         * * `gas_limit`: The gas limit enforced when executing the constructor.
         * * `storage_deposit_limit`: The maximum amount of balance that can be charged/reserved
         * from the caller to pay for the storage consumed.
         * * `code`: The contract code to deploy in raw bytes.
         * * `data`: The input data to pass to the contract constructor.
         * * `salt`: Used for the address derivation. If `Some` is supplied then `CREATE2`
         * semantics are used. If `None` then `CRATE1` is used.
         *
         *
         * Instantiation is executed as follows:
         *
         * - The supplied `code` is deployed, and a `code_hash` is created for that code.
         * - If the `code_hash` already exists on the chain the underlying `code` will be shared.
         * - The destination address is computed based on the sender, code_hash and the salt.
         * - The smart-contract account is created at the computed address.
         * - The `value` is transferred to the new account.
         * - The `deploy` function is executed in the context of the newly-created account.
         */
        "instantiate_with_code": Anonymize<Ibgj1cthra7lte>;
        /**
         * Same as [`Self::instantiate_with_code`], but intended to be dispatched **only**
         * by an EVM transaction through the EVM compatibility layer.
         *
         * Calling this dispatchable ensures that the origin's nonce is bumped only once,
         * via the `CheckNonce` transaction extension. In contrast, [`Self::instantiate_with_code`]
         * also bumps the nonce after contract instantiation, since it may be invoked multiple
         * times within a batch call transaction.
         */
        "eth_instantiate_with_code": Anonymize<Iboosov053lfpm>;
        /**
         * Upload new `code` without instantiating a contract from it.
         *
         * If the code does not already exist a deposit is reserved from the caller
         * and unreserved only when [`Self::remove_code`] is called. The size of the reserve
         * depends on the size of the supplied `code`.
         *
         * # Note
         *
         * Anyone can instantiate a contract from any uploaded code and thus prevent its removal.
         * To avoid this situation a constructor could employ access control so that it can
         * only be instantiated by permissioned entities. The same is true when uploading
         * through [`Self::instantiate_with_code`].
         */
        "upload_code": Anonymize<I10ra4g1rl6k2f>;
        /**
         * Remove the code stored under `code_hash` and refund the deposit to its owner.
         *
         * A code can only be removed by its original uploader (its owner) and only if it is
         * not used by any contract.
         */
        "remove_code": Anonymize<Ib51vk42m1po4n>;
        /**
         * Privileged function that changes the code of an existing contract.
         *
         * This takes care of updating refcounts and all other necessary operations. Returns
         * an error if either the `code_hash` or `dest` do not exist.
         *
         * # Note
         *
         * This does **not** change the address of the contract in question. This means
         * that the contract address is no longer derived from its code hash after calling
         * this dispatchable.
         */
        "set_code": Anonymize<I1uihehkdsggvp>;
        /**
         * Register the callers account id so that it can be used in contract interactions.
         *
         * This will error if the origin is already mapped or is a eth native `Address20`. It will
         * take a deposit that can be released by calling [`Self::unmap_account`].
         */
        "map_account": undefined;
        /**
         * Unregister the callers account id in order to free the deposit.
         *
         * There is no reason to ever call this function other than freeing up the deposit.
         * This is only useful when the account should no longer be used.
         */
        "unmap_account": undefined;
        /**
         * Dispatch an `call` with the origin set to the callers fallback address.
         *
         * Every `AccountId32` can control its corresponding fallback account. The fallback account
         * is the `AccountId20` with the last 12 bytes set to `0xEE`. This is essentially a
         * recovery function in case an `AccountId20` was used without creating a mapping first.
         */
        "dispatch_as_fallback_account": Anonymize<Ifamf61etmhhdq>;
    }>;
    "AssetRewards": Anonymize<I6i7hgo4s9982m>;
    "StateTrieMigration": Anonymize<I39l72gdmkk30t>;
    "AssetConversionMigration": Anonymize<Ib85ihi0vt50bd>;
    "Sudo": Enum<{
        /**
         * Authenticates the sudo key and dispatches a function call with `Root` origin.
         */
        "sudo": Anonymize<Ifamf61etmhhdq>;
        /**
         * Authenticates the sudo key and dispatches a function call with `Root` origin.
         * This function does not check the weight of the call, and instead allows the
         * Sudo user to specify the weight of the call.
         *
         * The dispatch origin for this call must be _Signed_.
         */
        "sudo_unchecked_weight": Anonymize<Iccejkmm89935k>;
        /**
         * Authenticates the current sudo key and sets the given AccountId (`new`) as the new sudo
         * key.
         */
        "set_key": Anonymize<I8k3rnvpeeh4hv>;
        /**
         * Authenticates the sudo key and dispatches a function call with `Signed` origin from
         * a given account.
         *
         * The dispatch origin for this call must be _Signed_.
         */
        "sudo_as": {
            "who": MultiAddress;
            "call": TxCallData;
        };
        /**
         * Permanently removes the sudo key.
         *
         * **This cannot be un-done.**
         */
        "remove_key": undefined;
    }>;
}>;
export type Iccejkmm89935k = {
    "call": TxCallData;
    "weight": Anonymize<I4q39t5hn830vp>;
};
export type Ifamf61etmhhdq = {
    "call": TxCallData;
};
export {};
