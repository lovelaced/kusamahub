"use client"

import { createClient } from "polkadot-api"
// @ts-ignore
import { ksm } from "@polkadot-api/descriptors"
import { getSmProvider } from "polkadot-api/sm-provider"

// Direct chain imports like kusama-transfer
export const ksmRelayChain = import("polkadot-api/chains/ksmcc3").then(
  async ({ chainSpec }) => {
    const { getSmoldot } = await import("../../smoldot")
    const smoldot = await getSmoldot()
    return smoldot.addChain({ chainSpec })
  }
)

export const ksmClient = createClient(getSmProvider(ksmRelayChain))
export const ksmApi = ksmClient.getTypedApi(ksm)