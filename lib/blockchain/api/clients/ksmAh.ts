"use client"

import { createClient } from "polkadot-api"
// @ts-ignore
import { ksmAh } from "@polkadot-api/descriptors"
import { getSmProvider } from "polkadot-api/sm-provider"
import { ksmRelayChain } from "./ksm"

const smoldotParaChain = Promise.all([
  ksmRelayChain,
  import("polkadot-api/chains/ksmcc3_asset_hub"),
]).then(async ([relayChain, { chainSpec }]) => {
  const { getSmoldot } = await import("../../smoldot")
  const smoldot = await getSmoldot()
  return smoldot.addChain({ chainSpec, potentialRelayChains: [relayChain] })
})

export const ksmAhClient = createClient(getSmProvider(smoldotParaChain))
export const ksmAhApi = ksmAhClient.getTypedApi(ksmAh)