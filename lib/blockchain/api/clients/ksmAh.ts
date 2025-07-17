"use client"

import { createClient } from "polkadot-api"
// @ts-ignore
import { ksmAh } from "@polkadot-api/descriptors"
import { getSmProvider } from "polkadot-api/sm-provider"
import { getKsmRelayChain } from "./ksm"

// Lazy initialization to avoid SSR issues
let smoldotParaChainPromise: Promise<any> | null = null
let ksmAhClientInstance: any = null
let ksmAhApiInstance: any = null

const getSmoldotParaChain = () => {
  if (!smoldotParaChainPromise) {
    smoldotParaChainPromise = Promise.all([
      getKsmRelayChain(),
      import("polkadot-api/chains/ksmcc3_asset_hub"),
    ]).then(async ([relayChain, { chainSpec }]) => {
      const { getSmoldot } = await import("../../smoldot")
      const smoldot = await getSmoldot()
      return smoldot.addChain({ chainSpec, potentialRelayChains: [relayChain] })
    })
  }
  return smoldotParaChainPromise
}

export const ksmAhClient = (() => {
  if (typeof window === "undefined") {
    // Return a proxy that throws on access during SSR
    return new Proxy({}, {
      get() {
        throw new Error("ksmAhClient can only be used in the browser")
      }
    })
  }
  if (!ksmAhClientInstance) {
    ksmAhClientInstance = createClient(getSmProvider(getSmoldotParaChain()))
  }
  return ksmAhClientInstance
})()

export const ksmAhApi = (() => {
  if (typeof window === "undefined") {
    // Return a proxy that throws on access during SSR
    return new Proxy({}, {
      get() {
        throw new Error("ksmAhApi can only be used in the browser")
      }
    })
  }
  if (!ksmAhApiInstance) {
    ksmAhApiInstance = ksmAhClient.getTypedApi(ksmAh)
  }
  return ksmAhApiInstance
})()