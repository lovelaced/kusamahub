"use client"

import type React from "react"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion } from "framer-motion"
import { Play, Pause, RotateCcw, Zap, Crown, Wallet, Loader2, AlertCircle, ZoomIn, ZoomOut, Move } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Slider } from "@/components/ui/slider"
import { Toggle } from "@/components/ui/toggle"
import { useSoundContext } from "@/components/sound-provider"
import { ethers } from "ethers"
import { CONTRACT_ADDRESS, CONTRACT_ABI, NETWORK_CONFIG, CANVAS_CONFIG } from "@/lib/contracts/pixel-pillage"

interface Pixel {
  x: number
  y: number
  color: string
  owner: string
  timestamp: number
  blockHeight: number
}

// Color palette - DotPix uses full RGB colors, not indices
const colorPalette = [
  { hex: "#FFFFFF", name: "white" },
  { hex: "#E4E4E4", name: "light grey" },
  { hex: "#888888", name: "grey" },
  { hex: "#222222", name: "black" },
  { hex: "#FFA7D1", name: "pink" },
  { hex: "#E50000", name: "red" },
  { hex: "#E59500", name: "orange" },
  { hex: "#A06A42", name: "brown" },
  { hex: "#E5D900", name: "yellow" },
  { hex: "#94E044", name: "lime" },
  { hex: "#02BE01", name: "green" },
  { hex: "#00D3DD", name: "cyan" },
  { hex: "#0083C7", name: "blue" },
  { hex: "#0000EA", name: "dark blue" },
  { hex: "#CF6EE4", name: "purple" },
  { hex: "#820080", name: "dark purple" },
  // Cyberpunk theme colors
  { hex: "#b6ff00", name: "toxic slime" },
  { hex: "#ff006e", name: "laser berry" },
  { hex: "#00faff", name: "aqua glitch" },
  { hex: "#ffbe00", name: "amber crt" },
]

declare global {
  interface Window {
    ethereum?: any
  }
}

export default function PixelPillage() {
  const { playSound } = useSoundContext()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null)
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null)
  const [contract, setContract] = useState<ethers.Contract | null>(null)
  const [userAddress, setUserAddress] = useState<string>("")
  const [connected, setConnected] = useState(false)
  
  // Canvas state
  const [pixels, setPixels] = useState<Map<string, Pixel>>(new Map())
  const [selectedPixels, setSelectedPixels] = useState<Set<string>>(new Set())
  const [selectedColor, setSelectedColor] = useState(colorPalette[16]) // Default to toxic slime
  const [isPlacing, setIsPlacing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  
  // View state
  const [zoom, setZoom] = useState(10) // Start zoomed in like dot-pixel
  const [panOffset, setPanOffset] = useState({ x: 50, y: 50 }) // Start slightly panned in
  const [isPanning, setIsPanning] = useState(false)
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 })
  const [showGrid, setShowGrid] = useState(true)
  const [hoveredPixel, setHoveredPixel] = useState<{ x: number; y: number } | null>(null)
  const [, forceUpdate] = useState({})
  
  // Stats
  const [totalPixelsPlaced, setTotalPixelsPlaced] = useState(0)
  const [userPixelCount, setUserPixelCount] = useState(0)
  const [estimatedFee, setEstimatedFee] = useState("0")

  // Connect wallet
  const connectWallet = async () => {
    try {
      setError("")
      if (typeof window.ethereum === "undefined") {
        setError("MetaMask is not installed. Please install MetaMask to use this dApp.")
        return
      }

      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
      const userAddr = accounts[0]
      setUserAddress(userAddr)

      const prov = new ethers.BrowserProvider(window.ethereum)
      const sign = await prov.getSigner()
      setProvider(prov)
      setSigner(sign)

      // Switch to correct network
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: NETWORK_CONFIG.chainId }],
        })
      } catch (switchError: any) {
        if (switchError.code === 4902) {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [NETWORK_CONFIG],
          })
        }
      }

      const contr = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, sign)
      setContract(contr)
      setConnected(true)

      setSuccess("Wallet connected successfully!")
      setTimeout(() => setSuccess(""), 3000)
    } catch (err: any) {
      setError(`Failed to connect wallet: ${err.message}`)
    }
  }

  // Load canvas data from blockchain
  const loadCanvasData = async () => {
    if (!contract || !provider) return
    
    setLoading(true)
    try {
      console.log('Loading canvas data from blockchain events...')
      
      // Get all PixelPlaced and BatchPixelsPlaced events from block 0 to latest
      const pixelPlacedFilter = contract.filters.PixelPlaced()
      const batchPixelsPlacedFilter = contract.filters.BatchPixelsPlaced()
      
      // Query past events (from block 0 to latest for full historical data)
      const [singleEvents, batchEvents] = await Promise.all([
        contract.queryFilter(pixelPlacedFilter, 0, 'latest'),
        contract.queryFilter(batchPixelsPlacedFilter, 0, 'latest')
      ])
      
      console.log(`Found ${singleEvents.length} single pixel events and ${batchEvents.length} batch events`)
      
      const newPixels = new Map<string, Pixel>()
      
      // Process single pixel events
      for (const event of singleEvents) {
        const args = event.args
        if (args) {
          const pixelId = Number(args.pixelId)
          // Calculate coordinates directly from pixelId to avoid extra contract calls
          const x = pixelId % CANVAS_CONFIG.width
          const y = Math.floor(pixelId / CANVAS_CONFIG.width)
          const key = `${x}-${y}`
          
          // Convert uint32 color to hex
          const colorHex = `#${args.color.toString(16).padStart(6, '0')}`
          
          newPixels.set(key, {
            x,
            y,
            color: colorHex,
            owner: args.owner,
            timestamp: Number(args.timestamp) * 1000,
            blockHeight: event.blockNumber,
          })
        }
      }
      
      // Process batch pixel events
      for (const event of batchEvents) {
        const args = event.args
        if (args) {
          const owner = args.owner
          const pixelIds = args.pixelIds
          const colors = args.colors
          const timestamp = Number(args.timestamp) * 1000
          
          for (let i = 0; i < pixelIds.length; i++) {
            const pixelId = Number(pixelIds[i])
            const color = Number(colors[i])
            
            // Calculate coordinates directly from pixelId
            const x = pixelId % CANVAS_CONFIG.width
            const y = Math.floor(pixelId / CANVAS_CONFIG.width)
            const key = `${x}-${y}`
            
            // Convert uint32 color to hex
            const colorHex = `#${color.toString(16).padStart(6, '0')}`
            
            newPixels.set(key, {
              x,
              y,
              color: colorHex,
              owner,
              timestamp,
              blockHeight: event.blockNumber,
            })
          }
        }
      }
      
      console.log(`Loaded ${newPixels.size} pixels from blockchain`)
      setPixels(newPixels)
      setTotalPixelsPlaced(newPixels.size)
      
      if (userAddress) {
        const userPixels = Array.from(newPixels.values()).filter(
          p => p.owner.toLowerCase() === userAddress.toLowerCase()
        )
        setUserPixelCount(userPixels.length)
      }
    } catch (err: any) {
      console.error("Error loading canvas:", err)
      setError("Failed to load canvas data")
    } finally {
      setLoading(false)
    }
  }

  // Load canvas when connected
  useEffect(() => {
    if (connected) {
      loadCanvasData()
    }
  }, [connected, contract])

  // Listen for new pixel events
  useEffect(() => {
    if (!contract) return

    const handlePixelPlaced = async (pixelId: bigint, owner: string, color: number, fee: bigint, timestamp: bigint, event: any) => {
      try {
        // Calculate coordinates directly from pixelId to avoid extra contract calls
        const x = Number(pixelId) % CANVAS_CONFIG.width
        const y = Math.floor(Number(pixelId) / CANVAS_CONFIG.width)
        const key = `${x}-${y}`
        
        // Convert uint32 color to hex
        const colorHex = `#${color.toString(16).padStart(6, '0')}`
        
        setPixels(prev => {
          const newPixels = new Map(prev)
          newPixels.set(key, {
            x,
            y,
            color: colorHex,
            owner,
            timestamp: Number(timestamp) * 1000,
            blockHeight: event.blockNumber,
          })
          return newPixels
        })
        
        if (owner.toLowerCase() === userAddress.toLowerCase()) {
          setUserPixelCount(prev => prev + 1)
        }
        setTotalPixelsPlaced(prev => prev + 1)
      } catch (err) {
        console.error("Error handling pixel placed event:", err)
      }
    }

    const handleBatchPixelsPlaced = async (owner: string, pixelIds: bigint[], colors: number[], totalFee: bigint, timestamp: bigint, event: any) => {
      try {
        setPixels(prev => {
          const newPixels = new Map(prev)
          
          for (let i = 0; i < pixelIds.length; i++) {
            const pixelId = Number(pixelIds[i])
            const color = colors[i]
            
            // Calculate coordinates directly from pixelId
            const x = pixelId % CANVAS_CONFIG.width
            const y = Math.floor(pixelId / CANVAS_CONFIG.width)
            const key = `${x}-${y}`
            
            // Convert uint32 color to hex
            const colorHex = `#${color.toString(16).padStart(6, '0')}`
            
            newPixels.set(key, {
              x,
              y,
              color: colorHex,
              owner,
              timestamp: Number(timestamp) * 1000,
              blockHeight: event.blockNumber,
            })
          }
          
          return newPixels
        })
        
        if (owner.toLowerCase() === userAddress.toLowerCase()) {
          setUserPixelCount(prev => prev + pixelIds.length)
        }
        setTotalPixelsPlaced(prev => prev + pixelIds.length)
      } catch (err) {
        console.error("Error handling batch pixels placed event:", err)
      }
    }

    contract.on("PixelPlaced", handlePixelPlaced)
    contract.on("BatchPixelsPlaced", handleBatchPixelsPlaced)
    
    return () => {
      contract.off("PixelPlaced", handlePixelPlaced)
      contract.off("BatchPixelsPlaced", handleBatchPixelsPlaced)
    }
  }, [contract, userAddress])

  // Calculate fee for selected pixels
  useEffect(() => {
    const calculateFee = async () => {
      if (!contract || selectedPixels.size === 0) {
        setEstimatedFee("0")
        return
      }
      
      try {
        const fee = await contract.calculatePixelFee(selectedPixels.size)
        setEstimatedFee(ethers.formatEther(fee))
      } catch (err) {
        console.error("Error calculating fee:", err)
      }
    }
    
    calculateFee()
  }, [contract, selectedPixels.size])

  // Draw canvas
  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas with white background for better visibility
    ctx.fillStyle = "#ffffff"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    // Save the current transform
    ctx.save()
    
    // Apply pan and zoom
    ctx.translate(panOffset.x, panOffset.y)
    ctx.scale(zoom, zoom)
    
    // Disable smoothing for crisp pixel rendering
    ctx.imageSmoothingEnabled = false

    // Draw grid if enabled
    // Draw advanced grid with zoom-responsive visibility  
    if (showGrid && zoom > 3) {
      // Dynamic grid styling based on zoom level
      ctx.strokeStyle = zoom > 8 ? '#d0d0d0' : '#e8e8e8'
      ctx.lineWidth = zoom > 8 ? 1 / zoom : 0.5 / zoom
      
      // Calculate visible area for viewport culling
      const viewLeft = Math.max(0, Math.floor(-panOffset.x / zoom))
      const viewTop = Math.max(0, Math.floor(-panOffset.y / zoom))
      const viewRight = Math.min(CANVAS_CONFIG.width, Math.floor((canvas.width - panOffset.x) / zoom))
      const viewBottom = Math.min(CANVAS_CONFIG.height, Math.floor((canvas.height - panOffset.y) / zoom))
      
      // Draw only visible vertical lines
      for (let x = Math.max(0, viewLeft); x <= Math.min(CANVAS_CONFIG.width, viewRight); x++) {
        ctx.beginPath()
        ctx.moveTo(x, Math.max(0, viewTop))
        ctx.lineTo(x, Math.min(CANVAS_CONFIG.height, viewBottom))
        ctx.stroke()
      }
      
      // Draw only visible horizontal lines
      for (let y = Math.max(0, viewTop); y <= Math.min(CANVAS_CONFIG.height, viewBottom); y++) {
        ctx.beginPath()
        ctx.moveTo(Math.max(0, viewLeft), y)
        ctx.lineTo(Math.min(CANVAS_CONFIG.width, viewRight), y)
        ctx.stroke()
      }
    }

    // Draw pixels with viewport culling for performance
    const viewLeft = Math.max(0, Math.floor(-panOffset.x / zoom))
    const viewTop = Math.max(0, Math.floor(-panOffset.y / zoom))
    const viewRight = Math.min(CANVAS_CONFIG.width, Math.floor((canvas.width - panOffset.x) / zoom))
    const viewBottom = Math.min(CANVAS_CONFIG.height, Math.floor((canvas.height - panOffset.y) / zoom))
    
    // Only render pixels in the visible area
    for (let y = Math.max(0, viewTop); y < Math.min(CANVAS_CONFIG.height, viewBottom); y++) {
      for (let x = Math.max(0, viewLeft); x < Math.min(CANVAS_CONFIG.width, viewRight); x++) {
        const key = `${x}-${y}`
        const pixel = pixels.get(key)
        
        if (pixel && pixel.color !== '#ffffff') {
          ctx.fillStyle = pixel.color
          ctx.fillRect(x, y, 1, 1)
        }
      }
    }

    // Highlight selected pixels
    selectedPixels.forEach(key => {
      const [x, y] = key.split('-').map(Number)
      if (x >= viewLeft && x <= viewRight && y >= viewTop && y <= viewBottom) {
        ctx.fillStyle = selectedColor.hex
        ctx.globalAlpha = 0.8
        ctx.fillRect(x, y, 1, 1)
        
        // Add selection border
        ctx.strokeStyle = '#4ecdc4'
        ctx.lineWidth = 0.1
        ctx.globalAlpha = 1
        ctx.strokeRect(x, y, 1, 1)
      }
    })
    
    // Highlight hovered pixel
    if (hoveredPixel) {
      const x = hoveredPixel.x
      const y = hoveredPixel.y
      if (x >= viewLeft && x <= viewRight && y >= viewTop && y <= viewBottom) {
        ctx.strokeStyle = '#666666'
        ctx.lineWidth = 0.15
        ctx.setLineDash([0.3, 0.3])
        ctx.strokeRect(x, y, 1, 1)
        ctx.setLineDash([])
      }
    }
    
    // Draw canvas border
    ctx.strokeStyle = '#333333'
    ctx.lineWidth = 2 / zoom
    ctx.strokeRect(0, 0, CANVAS_CONFIG.width, CANVAS_CONFIG.height)
    
    ctx.restore()
  }, [pixels, selectedPixels, hoveredPixel, showGrid, zoom, panOffset])

  // Resize canvas to container and redraw
  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const resizeCanvas = () => {
      canvas.width = container.clientWidth
      canvas.height = container.clientHeight
      drawCanvas()
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    return () => window.removeEventListener('resize', resizeCanvas)
  }, [drawCanvas])

  useEffect(() => {
    drawCanvas()
  }, [drawCanvas])

  // Handle canvas interaction
  const getPixelFromMouse = useCallback((e: React.MouseEvent): { x: number; y: number } | null => {
    const canvas = canvasRef.current
    if (!canvas) return null

    const rect = canvas.getBoundingClientRect()
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    // Convert to canvas coordinates
    const canvasX = (mouseX - panOffset.x) / zoom
    const canvasY = (mouseY - panOffset.y) / zoom

    // Convert to pixel coordinates
    const pixelX = Math.floor(canvasX)
    const pixelY = Math.floor(canvasY)

    if (pixelX >= 0 && pixelX < CANVAS_CONFIG.width && 
        pixelY >= 0 && pixelY < CANVAS_CONFIG.height) {
      return { x: pixelX, y: pixelY }
    }

    return null
  }, [zoom, panOffset])

  const handleCanvasMouseDown = useCallback((event: React.MouseEvent<HTMLCanvasElement>) => {
    if (event.button === 0) { // Left click
      const pixel = getPixelFromMouse(event)
      if (pixel) {
        const key = `${pixel.x}-${pixel.y}`
        
        if (event.shiftKey || selectedPixels.size > 0) {
          // Multi-select mode
          setSelectedPixels(prev => {
            const newSet = new Set(prev)
            if (newSet.has(key)) {
              newSet.delete(key)
            } else if (newSet.size < CANVAS_CONFIG.maxBatchSize) {
              newSet.add(key)
            }
            return newSet
          })
        } else {
          // Single select mode
          setSelectedPixels(new Set([key]))
        }
        
        playSound("click")
      }
    } else if (event.button === 1 || event.button === 2) { // Middle or right click for panning
      event.preventDefault()
      event.stopPropagation()
      
      setIsPanning(true)
      setLastMousePos({ x: event.clientX, y: event.clientY })
    }
  }, [getPixelFromMouse, selectedPixels.size, playSound])

  const handleCanvasMouseMove = useCallback((event: React.MouseEvent<HTMLCanvasElement>) => {
    if (isPanning) {
      const deltaX = event.clientX - lastMousePos.x
      const deltaY = event.clientY - lastMousePos.y
      
      // Apply sensitivity dampening (0.7 = 70% of original movement)
      const sensitivity = 0.7
      
      // Direct pixel movement with sensitivity adjustment
      setPanOffset(prev => {
        const newOffset = {
          x: prev.x + (deltaX * sensitivity),
          y: prev.y + (deltaY * sensitivity)
        }
        // Force immediate re-render
        requestAnimationFrame(() => {
          forceUpdate({})
        })
        return newOffset
      })
      
      setLastMousePos({ x: event.clientX, y: event.clientY })
    } else {
      const pixel = getPixelFromMouse(event)
      setHoveredPixel(pixel)
    }
  }, [isPanning, lastMousePos, getPixelFromMouse])

  const handleCanvasMouseUp = useCallback((event?: React.MouseEvent<HTMLCanvasElement>) => {
    if (isPanning) {
      setIsPanning(false)
    }
  }, [isPanning])


  // BULLETPROOF scroll prevention using native capture phase event handling
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Native wheel handler that intercepts ALL wheel events in capture phase
    const handleWheelCapture = (e: WheelEvent) => {
      // IMMEDIATELY stop all event propagation 
      e.preventDefault()
      e.stopPropagation()
      e.stopImmediatePropagation()
      
      const canvas = canvasRef.current
      if (!canvas) return false

      const rect = canvas.getBoundingClientRect()
      const mouseX = e.clientX - rect.left
      const mouseY = e.clientY - rect.top

      // Only apply zoom if cursor is within canvas bounds
      if (mouseX >= 0 && mouseX <= rect.width && mouseY >= 0 && mouseY <= rect.height) {
        const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1
        const newZoom = Math.max(0.05, Math.min(20, zoom * zoomFactor))

        if (newZoom !== zoom) {
          // Zoom towards mouse position
          const zoomPointX = (mouseX - panOffset.x) / zoom
          const zoomPointY = (mouseY - panOffset.y) / zoom

          setPanOffset(prev => ({
            x: mouseX - zoomPointX * newZoom,
            y: mouseY - zoomPointY * newZoom
          }))

          setZoom(newZoom)
        }
      }
      
      return false // Extra safety
    }

    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isPanning) {
        e.preventDefault()
        e.stopPropagation()
        
        const deltaX = e.clientX - lastMousePos.x
        const deltaY = e.clientY - lastMousePos.y
        
        // Apply sensitivity dampening (0.7 = 70% of original movement)
        const sensitivity = 0.7
        
        setPanOffset(prev => {
          const newOffset = {
            x: prev.x + (deltaX * sensitivity),
            y: prev.y + (deltaY * sensitivity)
          }
          // Force immediate re-render for real-time panning
          requestAnimationFrame(() => {
            forceUpdate({})
          })
          return newOffset
        })
        
        setLastMousePos({ x: e.clientX, y: e.clientY })
      }
    }
    
    const handleGlobalMouseUp = (e: MouseEvent) => {
      if (isPanning) {
        e.preventDefault()
        setIsPanning(false)
      }
    }
    
    const handleContextMenu = (e: Event) => {
      if (e.target === canvasRef.current) {
        e.preventDefault()
      }
    }
    
    // Capture phase wheel events BEFORE they can trigger page scroll
    container.addEventListener('wheel', handleWheelCapture, { 
      passive: false,
      capture: true 
    })
    
    if (isPanning) {
      document.addEventListener('mousemove', handleGlobalMouseMove, { passive: false })
      document.addEventListener('mouseup', handleGlobalMouseUp, { passive: false })
    }
    
    document.addEventListener('contextmenu', handleContextMenu)
    
    return () => {
      container.removeEventListener('wheel', handleWheelCapture, { capture: true })
      document.removeEventListener('mousemove', handleGlobalMouseMove)
      document.removeEventListener('mouseup', handleGlobalMouseUp)
      document.removeEventListener('contextmenu', handleContextMenu)
    }
  }, [isPanning, lastMousePos, zoom, panOffset])

  // Place pixels
  const placePixels = async () => {
    if (!contract || selectedPixels.size === 0) return

    setIsPlacing(true)
    setError("")
    
    try {
      const pixelArray = Array.from(selectedPixels).map(key => {
        const [x, y] = key.split('-').map(Number)
        return { x, y }
      })
      
      // Convert hex color to uint32
      const colorInt = parseInt(selectedColor.hex.replace('#', ''), 16)
      
      if (pixelArray.length === 1) {
        // Single pixel - get pixelId from coordinates
        const pixelId = await contract.getPixelId(pixelArray[0].x, pixelArray[0].y)
        const fee = await contract.calculatePixelFee(1)
        
        const tx = await contract.placePixel(
          pixelId,
          colorInt,
          { value: fee }
        )
        
        setSuccess("Placing pixel...")
        await tx.wait()
      } else {
        // Batch pixels - convert coordinates to pixelIds
        const pixelIds = await Promise.all(
          pixelArray.map(p => contract.getPixelId(p.x, p.y))
        )
        const colors = new Array(pixelArray.length).fill(colorInt)
        
        const fee = await contract.calculatePixelFee(pixelArray.length)
        
        const tx = await contract.placePixelsBatch(
          pixelIds,
          colors,
          { value: fee }
        )
        
        setSuccess(`Placing ${pixelArray.length} pixels...`)
        await tx.wait()
      }
      
      playSound("success")
      setSuccess("Pixels placed successfully! 🎨")
      setSelectedPixels(new Set())
      
      setTimeout(() => setSuccess(""), 3000)
    } catch (err: any) {
      playSound("error")
      setError(`Failed to place pixels: ${err.message}`)
    } finally {
      setIsPlacing(false)
    }
  }

  // Get leaderboard data
  const getLeaderboard = () => {
    const ownerCounts = new Map<string, number>()
    
    pixels.forEach(pixel => {
      const count = ownerCounts.get(pixel.owner) || 0
      ownerCounts.set(pixel.owner, count + 1)
    })
    
    return Array.from(ownerCounts.entries())
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([address, count]) => ({ address, pixels: count }))
  }

  const leaderboard = getLeaderboard()

  return (
    <div className="min-h-screen bg-midnight-void text-ghost-grey pt-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-orbitron font-black text-toxic-slime mb-4">pixel pillage</h1>
          <p className="text-soda-chrome font-vt323 text-lg mb-2">
            {CANVAS_CONFIG.width}×{CANVAS_CONFIG.height} collaborative canvas • claim your pixels on-chain
          </p>
          <p className="text-ghost-grey font-vt323 text-sm">
            right-click to pan • scroll to zoom • shift+click for multi-select
          </p>
        </motion.div>

        {/* Alerts */}
        {error && (
          <Alert className="mb-4 max-w-2xl mx-auto border-laser-berry bg-laser-berry/10">
            <AlertCircle className="h-4 w-4 text-laser-berry" />
            <AlertTitle className="text-laser-berry">Error</AlertTitle>
            <AlertDescription className="text-ghost-grey">{error}</AlertDescription>
          </Alert>
        )}
        
        {success && (
          <Alert className="mb-4 max-w-2xl mx-auto border-toxic-slime bg-toxic-slime/10">
            <Zap className="h-4 w-4 text-toxic-slime" />
            <AlertTitle className="text-toxic-slime">Success</AlertTitle>
            <AlertDescription className="text-ghost-grey">{success}</AlertDescription>
          </Alert>
        )}

        {/* Connect Wallet */}
        {!connected && (
          <Card className="mb-8 max-w-2xl mx-auto bg-midnight-void/80 border-soda-chrome/30">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Wallet className="w-16 h-16 text-toxic-slime mb-4" />
              <h3 className="text-xl font-orbitron text-toxic-slime mb-2">Connect Your Wallet</h3>
              <p className="text-soda-chrome mb-4">Connect to Paseo TestNet to start placing pixels</p>
              <Button
                onClick={connectWallet}
                size="lg"
                className="bg-toxic-slime text-midnight-void hover:bg-toxic-slime/80"
              >
                <Wallet className="w-4 h-4 mr-2" />
                Connect MetaMask
              </Button>
            </CardContent>
          </Card>
        )}

        {connected && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Canvas */}
            <div className="lg:col-span-3 order-2 lg:order-1">
              <Card className="bg-midnight-void/80 border-soda-chrome/30">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-toxic-slime font-orbitron flex items-center">
                      <Move className="w-5 h-5 mr-2" />
                      Canvas View
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                      <Toggle
                        pressed={showGrid}
                        onPressedChange={setShowGrid}
                        size="sm"
                        className="data-[state=on]:bg-toxic-slime/20 data-[state=on]:text-toxic-slime"
                      >
                        Grid
                      </Toggle>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setZoom(Math.min(20, zoom * 1.2))}
                        className="text-aqua-glitch hover:text-aqua-glitch"
                      >
                        <ZoomIn className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setZoom(Math.max(0.1, zoom * 0.8))}
                        className="text-aqua-glitch hover:text-aqua-glitch"
                      >
                        <ZoomOut className="w-4 h-4" />
                      </Button>
                      <span className="text-xs font-vt323 text-soda-chrome">
                        {Math.round(zoom * 100)}%
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div 
                    className="relative bg-midnight-void rounded-lg border border-soda-chrome/30" 
                    style={{ 
                      overflow: 'hidden', 
                      touchAction: 'none',
                      minHeight: '600px'
                    }} 
                    ref={containerRef}
                  >
                    {loading && (
                      <div className="absolute inset-0 bg-midnight-void/80 flex items-center justify-center z-10">
                        <div className="text-center">
                          <Loader2 className="w-8 h-8 animate-spin text-toxic-slime mx-auto mb-2" />
                          <p className="text-soda-chrome font-vt323">loading canvas data...</p>
                        </div>
                      </div>
                    )}
                    
                    <canvas
                      ref={canvasRef}
                      width={CANVAS_CONFIG.width}
                      height={CANVAS_CONFIG.height}
                      onMouseDown={handleCanvasMouseDown}
                      onMouseMove={handleCanvasMouseMove}
                      onMouseUp={handleCanvasMouseUp}
                      onMouseLeave={handleCanvasMouseUp}
                      //className="cursor-crosshair"
                      className="cursor-crosshair w-full"
                      style={{
                        height: '600px',
                        minHeight: '400px',
                        maxHeight: '80vh',
                        imageRendering: 'pixelated',
                        display: 'block',
                        touchAction: 'none'
                      }}
                    />

                    {hoveredPixel && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute top-2 left-2 bg-midnight-void/90 border border-toxic-slime/50 rounded p-2 text-xs font-vt323 pointer-events-none"
                      >
                        <div>pixel ({hoveredPixel.x}, {hoveredPixel.y})</div>
                        {(() => {
                          const key = `${hoveredPixel.x}-${hoveredPixel.y}`
                          const pixel = pixels.get(key)
                          return pixel ? (
                            <div className="text-soda-chrome mt-1">
                              owner: {pixel.owner.slice(0, 6)}...{pixel.owner.slice(-4)}
                            </div>
                          ) : (
                            <div className="text-aqua-glitch mt-1">unclaimed</div>
                          )
                        })()}
                      </motion.div>
                    )}
                  </div>

                  {selectedPixels.size > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-vt323 text-soda-chrome">
                          {selectedPixels.size} pixel{selectedPixels.size > 1 ? 's' : ''} selected
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedPixels(new Set())}
                          className="text-laser-berry hover:text-laser-berry font-vt323"
                        >
                          clear selection
                        </Button>
                      </div>
                      
                      <div className="bg-midnight-void/50 border border-soda-chrome/30 rounded p-3">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-vt323 text-soda-chrome">estimated cost:</span>
                          <span className="text-sm font-vt323 text-toxic-slime">{estimatedFee} PAS</span>
                        </div>
                      </div>
                      
                      <Button
                        onClick={placePixels}
                        disabled={isPlacing || selectedPixels.size === 0}
                        className="w-full bg-toxic-slime text-midnight-void hover:bg-toxic-slime/90 font-vt323"
                      >
                        <Zap className="w-4 h-4 mr-2" />
                        {isPlacing ? "placing pixels..." : `place ${selectedPixels.size} pixel${selectedPixels.size > 1 ? 's' : ''}`}
                      </Button>
                      
                      {selectedPixels.size > 1 && (
                        <p className="text-xs text-amber-crt font-vt323 text-center">
                          batch placement saves gas! ({CANVAS_CONFIG.maxBatchSize} max)
                        </p>
                      )}
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6 order-1 lg:order-2">
              {/* Color Palette */}
              <Card className="bg-midnight-void/80 border-soda-chrome/30">
                <CardHeader>
                  <CardTitle className="text-laser-berry font-orbitron text-lg">Color Palette</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-4 gap-2">
                    {colorPalette.map((color) => (
                      <motion.button
                        key={color.hex}
                        onClick={() => {
                          setSelectedColor(color)
                          playSound("click")
                        }}
                        className={`w-full aspect-square rounded border-2 transition-all relative group ${
                          selectedColor.hex === color.hex ? "border-toxic-slime scale-110" : "border-soda-chrome/30"
                        }`}
                        style={{ backgroundColor: color.hex }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onMouseEnter={() => playSound("hover")}
                      >
                        <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-midnight-void/80 text-xs font-vt323 text-ghost-grey rounded">
                          {color.name}
                        </span>
                      </motion.button>
                    ))}
                  </div>
                  <div className="mt-3 text-xs font-vt323 text-soda-chrome">
                    selected: <span className="text-ghost-grey">{selectedColor.name}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Leaderboard */}
              <Card className="bg-midnight-void/80 border-soda-chrome/30">
                <CardHeader>
                  <CardTitle className="text-aqua-glitch font-orbitron text-lg flex items-center">
                    <Crown className="w-5 h-5 mr-2" />
                    Pixel Lords
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {leaderboard.length > 0 ? (
                    <div className="space-y-2">
                      {leaderboard.map((user, index) => (
                        <motion.div
                          key={user.address}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="flex items-center justify-between p-2 rounded bg-midnight-void/50 border border-soda-chrome/20"
                        >
                          <div className="flex items-center space-x-2">
                            <span className={`font-orbitron text-sm ${
                              index === 0 ? "text-toxic-slime" :
                              index === 1 ? "text-aqua-glitch" :
                              index === 2 ? "text-laser-berry" :
                              "text-soda-chrome"
                            }`}>
                              #{index + 1}
                            </span>
                            <span className="font-vt323 text-xs text-ghost-grey">
                              {user.address.slice(0, 6)}...{user.address.slice(-4)}
                            </span>
                          </div>
                          <span className="font-vt323 text-sm text-toxic-slime">
                            {user.pixels}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-soda-chrome font-vt323 py-8">No pixels placed yet</p>
                  )}
                </CardContent>
              </Card>

              {/* Stats */}
              <Card className="bg-midnight-void/80 border-soda-chrome/30">
                <CardHeader>
                  <CardTitle className="text-amber-crt font-orbitron text-lg">Canvas Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 font-vt323 text-sm">
                    <div className="flex justify-between">
                      <span className="text-soda-chrome">canvas size:</span>
                      <span className="text-ghost-grey">{CANVAS_CONFIG.width}×{CANVAS_CONFIG.height}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-soda-chrome">total pixels:</span>
                      <span className="text-ghost-grey">{totalPixelsPlaced.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-soda-chrome">coverage:</span>
                      <span className="text-ghost-grey">
                        {((totalPixelsPlaced / (CANVAS_CONFIG.width * CANVAS_CONFIG.height)) * 100).toFixed(2)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-soda-chrome">your pixels:</span>
                      <span className="text-toxic-slime">{userPixelCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-soda-chrome">base fee:</span>
                      <span className="text-ghost-grey">{CANVAS_CONFIG.basePixelFee} PAS</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-soda-chrome">burn rate:</span>
                      <span className="text-laser-berry">{CANVAS_CONFIG.burnPercentage}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}