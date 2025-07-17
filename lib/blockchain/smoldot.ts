// For Next.js compatibility, we need to handle worker initialization differently
let smoldotInstance: any = null

export const getSmoldot = async () => {
  if (typeof window === "undefined") {
    throw new Error("Smoldot can only be initialized in the browser")
  }
  
  if (!smoldotInstance) {
    try {
      // Dynamically import the necessary modules
      const { startFromWorker } = await import("polkadot-api/smoldot/from-worker")
      
      // Try to import the worker as a module first (for Vite-like environments)
      try {
        // @ts-ignore - This import syntax is handled by bundlers
        const SmoldotWorker = await import("polkadot-api/smoldot/worker?worker")
        const worker = new SmoldotWorker.default()
        smoldotInstance = startFromWorker(worker)
      } catch (e) {
        // Fallback: Create worker from URL (for standard Next.js)
        const worker = new Worker('/smoldot-worker.js')
        smoldotInstance = startFromWorker(worker)
      }
    } catch (error) {
      console.error("Failed to initialize Smoldot worker:", error)
      throw error
    }
  }
  
  return smoldotInstance
}