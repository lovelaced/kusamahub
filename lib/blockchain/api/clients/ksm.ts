"use client"

import { createClient } from "polkadot-api"
// @ts-ignore
import { ksm } from "@polkadot-api/descriptors"
import { getSmProvider } from "polkadot-api/sm-provider"

// Lazy initialization to avoid SSR issues
let ksmRelayChainPromise: Promise<any> | null = null
let ksmClientInstance: any = null
let ksmApiInstance: any = null

export const getKsmRelayChain = () => {
  if (!ksmRelayChainPromise) {
    ksmRelayChainPromise = import("polkadot-api/chains/ksmcc3").then(
      async ({ chainSpec }) => {
        const { getSmoldot } = await import("../../smoldot")
        const smoldot = await getSmoldot()
        return smoldot.addChain({ chainSpec })
      }
    )
  }
  return ksmRelayChainPromise
}

export const ksmClient = (() => {
  if (typeof window === "undefined") {
    // Return a proxy that throws on access during SSR
    return new Proxy({}, {
      get() {
        throw new Error("ksmClient can only be used in the browser")
      }
    })
  }
  if (!ksmClientInstance) {
    ksmClientInstance = createClient(getSmProvider(getKsmRelayChain()))
  }
  return ksmClientInstance
})()

export const ksmApi = (() => {
  if (typeof window === "undefined") {
    // Return a proxy that throws on access during SSR
    return new Proxy({}, {
      get() {
        throw new Error("ksmApi can only be used in the browser")
      }
    })
  }
  if (!ksmApiInstance) {
    ksmApiInstance = ksmClient.getTypedApi(ksm)
  }
  return ksmApiInstance
})()