// Whitelist entries for PAPI code generation
const ksmWhitelist = [
  "tx.XcmPallet.transfer_assets",
  "query.System.Account",
  "const.Balances.ExistentialDeposit",
]

const ksmAhWhitelist = [
  "tx.PolkadotXcm.transfer_assets",
  "query.System.Account",
  "const.Balances.ExistentialDeposit",
]

export const whitelist = [...ksmWhitelist, ...ksmAhWhitelist]