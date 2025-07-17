// .papi/descriptors/src/common.ts
var table = new Uint8Array(128);
for (let i = 0; i < 64; i++) table[i < 26 ? i + 65 : i < 52 ? i + 71 : i < 62 ? i - 4 : i * 4 - 205] = i;
var toBinary = (base64) => {
  const n = base64.length, bytes = new Uint8Array((n - Number(base64[n - 1] === "=") - Number(base64[n - 2] === "=")) * 3 / 4 | 0);
  for (let i2 = 0, j = 0; i2 < n; ) {
    const c0 = table[base64.charCodeAt(i2++)], c1 = table[base64.charCodeAt(i2++)];
    const c2 = table[base64.charCodeAt(i2++)], c3 = table[base64.charCodeAt(i2++)];
    bytes[j++] = c0 << 2 | c1 >> 4;
    bytes[j++] = c1 << 4 | c2 >> 2;
    bytes[j++] = c2 << 6 | c3;
  }
  return bytes;
};

// .papi/descriptors/src/wnd.ts
var descriptorValues = import("./descriptors-6FOXBQ4G.mjs").then((module) => module["Wnd"]);
var metadataTypes = import("./metadataTypes-EMBB3YKL.mjs").then(
  (module) => toBinary("default" in module ? module.default : module)
);
var asset = {};
var getMetadata = () => import("./wnd_metadata-TKFQLQLJ.mjs").then(
  (module) => toBinary("default" in module ? module.default : module)
);
var genesis = "0xe143f23803ac50e8f6f8e62695d1ce9e4e1d68aa36c1cd2cfd15340213f3423e";
var _allDescriptors = { descriptors: descriptorValues, metadataTypes, asset, getMetadata, genesis };
var wnd_default = _allDescriptors;

// .papi/descriptors/src/wndAssethub.ts
var descriptorValues2 = import("./descriptors-6FOXBQ4G.mjs").then((module) => module["WndAssethub"]);
var metadataTypes2 = import("./metadataTypes-EMBB3YKL.mjs").then(
  (module) => toBinary("default" in module ? module.default : module)
);
var asset2 = {};
var getMetadata2 = () => import("./wndAssethub_metadata-RSKY3TG4.mjs").then(
  (module) => toBinary("default" in module ? module.default : module)
);
var genesis2 = "0x67f9723393ef76214df0118c34bbbd3dbebc8ed46a10973a8c969d48fe7598c9";
var _allDescriptors2 = { descriptors: descriptorValues2, metadataTypes: metadataTypes2, asset: asset2, getMetadata: getMetadata2, genesis: genesis2 };
var wndAssethub_default = _allDescriptors2;

// .papi/descriptors/src/dot.ts
var descriptorValues3 = import("./descriptors-6FOXBQ4G.mjs").then((module) => module["Dot"]);
var metadataTypes3 = import("./metadataTypes-EMBB3YKL.mjs").then(
  (module) => toBinary("default" in module ? module.default : module)
);
var asset3 = {};
var getMetadata3 = () => import("./dot_metadata-OXNYSFJJ.mjs").then(
  (module) => toBinary("default" in module ? module.default : module)
);
var genesis3 = "0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3";
var _allDescriptors3 = { descriptors: descriptorValues3, metadataTypes: metadataTypes3, asset: asset3, getMetadata: getMetadata3, genesis: genesis3 };
var dot_default = _allDescriptors3;

// .papi/descriptors/src/ksm.ts
var descriptorValues4 = import("./descriptors-6FOXBQ4G.mjs").then((module) => module["Ksm"]);
var metadataTypes4 = import("./metadataTypes-EMBB3YKL.mjs").then(
  (module) => toBinary("default" in module ? module.default : module)
);
var asset4 = {};
var getMetadata4 = () => import("./ksm_metadata-YUF3CFRU.mjs").then(
  (module) => toBinary("default" in module ? module.default : module)
);
var genesis4 = "0xb0a8d493285c2df73290dfb7e61f870f17b41801197a149ca93654499ea3dafe";
var _allDescriptors4 = { descriptors: descriptorValues4, metadataTypes: metadataTypes4, asset: asset4, getMetadata: getMetadata4, genesis: genesis4 };
var ksm_default = _allDescriptors4;

// .papi/descriptors/src/dotAh.ts
var descriptorValues5 = import("./descriptors-6FOXBQ4G.mjs").then((module) => module["DotAh"]);
var metadataTypes5 = import("./metadataTypes-EMBB3YKL.mjs").then(
  (module) => toBinary("default" in module ? module.default : module)
);
var asset5 = {};
var getMetadata5 = () => import("./dotAh_metadata-C4CFX46V.mjs").then(
  (module) => toBinary("default" in module ? module.default : module)
);
var genesis5 = "0x68d56f15f85d3136970ec16946040bc1752654e906147f7e43e9d539d7c3de2f";
var _allDescriptors5 = { descriptors: descriptorValues5, metadataTypes: metadataTypes5, asset: asset5, getMetadata: getMetadata5, genesis: genesis5 };
var dotAh_default = _allDescriptors5;

// .papi/descriptors/src/ksmAh.ts
var descriptorValues6 = import("./descriptors-6FOXBQ4G.mjs").then((module) => module["KsmAh"]);
var metadataTypes6 = import("./metadataTypes-EMBB3YKL.mjs").then(
  (module) => toBinary("default" in module ? module.default : module)
);
var asset6 = {};
var getMetadata6 = () => import("./ksmAh_metadata-OJPEM4LQ.mjs").then(
  (module) => toBinary("default" in module ? module.default : module)
);
var genesis6 = "0x48239ef607d7928874027a43a67689209727dfb3d3dc5e5b03a39bdc2eda771a";
var _allDescriptors6 = { descriptors: descriptorValues6, metadataTypes: metadataTypes6, asset: asset6, getMetadata: getMetadata6, genesis: genesis6 };
var ksmAh_default = _allDescriptors6;

// .papi/descriptors/src/pas.ts
var descriptorValues7 = import("./descriptors-6FOXBQ4G.mjs").then((module) => module["Pas"]);
var metadataTypes7 = import("./metadataTypes-EMBB3YKL.mjs").then(
  (module) => toBinary("default" in module ? module.default : module)
);
var asset7 = {};
var getMetadata7 = () => import("./pas_metadata-G4QYQDVV.mjs").then(
  (module) => toBinary("default" in module ? module.default : module)
);
var genesis7 = "0x77afd6190f1554ad45fd0d31aee62aacc33c6db0ea801129acb813f913e0764f";
var _allDescriptors7 = { descriptors: descriptorValues7, metadataTypes: metadataTypes7, asset: asset7, getMetadata: getMetadata7, genesis: genesis7 };
var pas_default = _allDescriptors7;

// .papi/descriptors/src/pasAh.ts
var descriptorValues8 = import("./descriptors-6FOXBQ4G.mjs").then((module) => module["PasAh"]);
var metadataTypes8 = import("./metadataTypes-EMBB3YKL.mjs").then(
  (module) => toBinary("default" in module ? module.default : module)
);
var asset8 = {};
var getMetadata8 = () => import("./pasAh_metadata-AQGMQMMT.mjs").then(
  (module) => toBinary("default" in module ? module.default : module)
);
var genesis8 = "0xd6eec26135305a8ad257a20d003357284c8aa03d0bdb2b357ab0a22371e11ef2";
var _allDescriptors8 = { descriptors: descriptorValues8, metadataTypes: metadataTypes8, asset: asset8, getMetadata: getMetadata8, genesis: genesis8 };
var pasAh_default = _allDescriptors8;

// .papi/descriptors/src/passet.ts
var descriptorValues9 = import("./descriptors-6FOXBQ4G.mjs").then((module) => module["Passet"]);
var metadataTypes9 = import("./metadataTypes-EMBB3YKL.mjs").then(
  (module) => toBinary("default" in module ? module.default : module)
);
var asset9 = {};
var getMetadata9 = () => import("./passet_metadata-UDMSFKVI.mjs").then(
  (module) => toBinary("default" in module ? module.default : module)
);
var genesis9 = "0xfd974cf9eaf028f5e44b9fdd1949ab039c6cf9cc54449b0b60d71b042e79aeb6";
var _allDescriptors9 = { descriptors: descriptorValues9, metadataTypes: metadataTypes9, asset: asset9, getMetadata: getMetadata9, genesis: genesis9 };
var passet_default = _allDescriptors9;

// .papi/descriptors/src/common-types.ts
import { _Enum } from "polkadot-api";
var XcmVersionedLocation = _Enum;
var XcmV3Junctions = _Enum;
var XcmV3Junction = _Enum;
var XcmV3JunctionNetworkId = _Enum;
var XcmV3JunctionBodyId = _Enum;
var XcmV2JunctionBodyPart = _Enum;
var XcmV5Junctions = _Enum;
var XcmV5Junction = _Enum;
var XcmV5NetworkId = _Enum;
var XcmVersionedAssets = _Enum;
var XcmV3MultiassetAssetId = _Enum;
var XcmV3MultiassetFungibility = _Enum;
var XcmV3MultiassetAssetInstance = _Enum;
var XcmV3WeightLimit = _Enum;
var DigestItem = _Enum;
var BabeDigestsNextConfigDescriptor = _Enum;
var BabeAllowedSlots = _Enum;
var MultiAddress = _Enum;
var BalancesAdjustmentDirection = _Enum;
var StakingRewardDestination = _Enum;
var StakingPalletConfigOpBig = _Enum;
var StakingPalletConfigOp = _Enum;
var GrandpaEquivocation = _Enum;
var WestendRuntimeGovernanceOriginsPalletCustomOriginsOrigin = _Enum;
var ParachainsOrigin = _Enum;
var IdentityData = _Enum;
var IdentityJudgement = _Enum;
var MultiSignature = _Enum;
var NominationPoolsBondExtra = _Enum;
var NominationPoolsPoolState = _Enum;
var NominationPoolsConfigOp = _Enum;
var NominationPoolsClaimPermission = _Enum;
var NominationPoolsCommissionClaimPermission = _Enum;
var ConvictionVotingVoteAccountVote = _Enum;
var VotingConviction = _Enum;
var PreimagesBounded = _Enum;
var TraitsScheduleDispatchTime = _Enum;
var PolkadotPrimitivesV6ExecutorParamsExecutorParam = _Enum;
var PolkadotPrimitivesV6PvfPrepKind = _Enum;
var PvfExecKind = _Enum;
var ValidityAttestation = _Enum;
var PolkadotPrimitivesV6DisputeStatement = _Enum;
var PolkadotPrimitivesV6ValidDisputeStatementKind = _Enum;
var InvalidDisputeStatementKind = _Enum;
var XcmVersionedXcm = _Enum;
var XcmV3Instruction = _Enum;
var XcmV3Response = _Enum;
var XcmV3TraitsError = _Enum;
var XcmV3MaybeErrorCode = _Enum;
var XcmV2OriginKind = _Enum;
var XcmV3MultiassetMultiAssetFilter = _Enum;
var XcmV3MultiassetWildMultiAsset = _Enum;
var XcmV2MultiassetWildFungibility = _Enum;
var XcmV4Instruction = _Enum;
var XcmV4Response = _Enum;
var XcmV4AssetAssetFilter = _Enum;
var XcmV4AssetWildAsset = _Enum;
var XcmV5Instruction = _Enum;
var XcmV5AssetFilter = _Enum;
var XcmV5WildAsset = _Enum;
var MultiSigner = _Enum;
var PolkadotRuntimeCommonAssignedSlotsSlotLeasePeriodStart = _Enum;
var BrokerCoretimeInterfaceCoreAssignment = _Enum;
var XcmVersionedAssetId = _Enum;
var ParachainsInclusionAggregateMessageOrigin = _Enum;
var ParachainsInclusionUmpQueueId = _Enum;
var ExtensionsCheckMortality = _Enum;
var PreimagePalletHoldReason = _Enum;
var DispatchRawOrigin = _Enum;
var GovernanceOrigin = _Enum;
var ClaimsStatementKind = _Enum;
var SlashingOffenceKind = _Enum;

// .papi/descriptors/src/index.ts
var metadatas = {
  ["0x042cc8527e4b901f1f11b7e32ad9462ce5a1443947119c85c235d1887492519b"]: wnd_default,
  ["0x32f20119c34bc0bf270e9c43bd6d4e9ae3dcbaaaf8e1bb4cd49c79dea58a7efe"]: wndAssethub_default,
  ["0xe260d17fcfa34f10503c91148a7bc2fd820e356295d2e18f828b5fa4190d47f7"]: dot_default,
  ["0x4c843d1c1b5ce542fcc0e9cc1439ad3384e5753da24d2747c4aa24162a202449"]: ksm_default,
  ["0x6e20bc52aaaafd1de82ba7d2a3c0fa39193787e240b93608489cf72a4c46a584"]: dotAh_default,
  ["0x8356dd03a2a5521b9339ce0c6b2a56d3edf83f0ca7262e9edabb695df770a0f6"]: ksmAh_default,
  ["0xcc4b027a0dbb5e0f389dd8418c41012d618290a22f84af8411c8fd20b2738304"]: pas_default,
  ["0xb7f52ff9b4fb5124568a5b8cbfcebba2bc9318bcb5916b69457c10bc6a2d0ac5"]: pasAh_default,
  ["0x87d8a4f006f8d55b05a81e32c8594acabb4f95dbeae1b724edc9ecf2289dc7af"]: passet_default
};
var getMetadata10 = async (codeHash) => {
  try {
    return await metadatas[codeHash].getMetadata();
  } catch {
  }
  return null;
};
export {
  BabeAllowedSlots,
  BabeDigestsNextConfigDescriptor,
  BalancesAdjustmentDirection,
  BrokerCoretimeInterfaceCoreAssignment,
  ClaimsStatementKind,
  ConvictionVotingVoteAccountVote,
  DigestItem,
  DispatchRawOrigin,
  ExtensionsCheckMortality,
  GovernanceOrigin,
  GrandpaEquivocation,
  IdentityData,
  IdentityJudgement,
  InvalidDisputeStatementKind,
  MultiAddress,
  MultiSignature,
  MultiSigner,
  NominationPoolsBondExtra,
  NominationPoolsClaimPermission,
  NominationPoolsCommissionClaimPermission,
  NominationPoolsConfigOp,
  NominationPoolsPoolState,
  ParachainsInclusionAggregateMessageOrigin,
  ParachainsInclusionUmpQueueId,
  ParachainsOrigin,
  PolkadotPrimitivesV6DisputeStatement,
  PolkadotPrimitivesV6ExecutorParamsExecutorParam,
  PolkadotPrimitivesV6PvfPrepKind,
  PolkadotPrimitivesV6ValidDisputeStatementKind,
  PolkadotRuntimeCommonAssignedSlotsSlotLeasePeriodStart,
  PreimagePalletHoldReason,
  PreimagesBounded,
  PvfExecKind,
  SlashingOffenceKind,
  StakingPalletConfigOp,
  StakingPalletConfigOpBig,
  StakingRewardDestination,
  TraitsScheduleDispatchTime,
  ValidityAttestation,
  VotingConviction,
  WestendRuntimeGovernanceOriginsPalletCustomOriginsOrigin,
  XcmV2JunctionBodyPart,
  XcmV2MultiassetWildFungibility,
  XcmV2OriginKind,
  XcmV3Instruction,
  XcmV3Junction,
  XcmV3JunctionBodyId,
  XcmV3JunctionNetworkId,
  XcmV3Junctions,
  XcmV3MaybeErrorCode,
  XcmV3MultiassetAssetId,
  XcmV3MultiassetAssetInstance,
  XcmV3MultiassetFungibility,
  XcmV3MultiassetMultiAssetFilter,
  XcmV3MultiassetWildMultiAsset,
  XcmV3Response,
  XcmV3TraitsError,
  XcmV3WeightLimit,
  XcmV4AssetAssetFilter,
  XcmV4AssetWildAsset,
  XcmV4Instruction,
  XcmV4Response,
  XcmV5AssetFilter,
  XcmV5Instruction,
  XcmV5Junction,
  XcmV5Junctions,
  XcmV5NetworkId,
  XcmV5WildAsset,
  XcmVersionedAssetId,
  XcmVersionedAssets,
  XcmVersionedLocation,
  XcmVersionedXcm,
  dot_default as dot,
  dotAh_default as dotAh,
  getMetadata10 as getMetadata,
  ksm_default as ksm,
  ksmAh_default as ksmAh,
  pas_default as pas,
  pasAh_default as pasAh,
  passet_default as passet,
  wnd_default as wnd,
  wndAssethub_default as wndAssethub
};
