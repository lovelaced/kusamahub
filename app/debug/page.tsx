"use client"

import { useState, useEffect } from "react"
import { ksmClient, ksmApi } from "@/lib/blockchain"

export default function DebugPage() {
  const [status, setStatus] = useState("Initializing...")
  const [blockNumber, setBlockNumber] = useState<number | null>(null)

  useEffect(() => {
    const testConnection = async () => {
      try {
        setStatus("Connecting to Kusama...")
        
        // Test if we can get the chain info
        const chainInfo = await ksmClient.getChainSpecData()
        setStatus(`Connected to: ${chainInfo.name}`)
        
        // Subscribe to new blocks
        const unsub = ksmApi.query.System.Number.watchValue("best").subscribe({
          next: (block) => {
            setBlockNumber(Number(block))
          },
          error: (err) => {
            setStatus(`Error: ${err.message}`)
          }
        })
        
        return () => unsub.unsubscribe()
      } catch (error) {
        setStatus(`Failed to connect: ${error}`)
      }
    }
    
    testConnection()
  }, [])

  return (
    <div className="min-h-screen bg-midnight-void text-ghost-grey p-8">
      <h1 className="text-2xl font-bold mb-4">Blockchain Debug</h1>
      <p>Status: {status}</p>
      {blockNumber && <p>Current Block: #{blockNumber}</p>}
    </div>
  )
}