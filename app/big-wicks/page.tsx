"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Flame, Clock, Trophy, Users, AlertCircle, Wallet, TrendingUp, Sparkles, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ethers } from "ethers"
import { CONTRACT_ADDRESS, CONTRACT_ABI, NETWORK_CONFIG } from "@/lib/contracts/big-wick-game"

interface GameData {
  gameId: number
  startTime: number
  endingPeriodStart: number
  endTime: number
  totalPot: bigint
  treasuryFund: bigint
  winner: string
  state: number
  candleEnd: number
  finalized: boolean
}

interface PlayerData {
  totalBid: bigint
  bidCount: number
  lastBidTime: number
  exists: boolean
}

interface BidEvent {
  player: string
  amount: bigint
  totalBid: bigint
  timestamp: number
  txHash: string
}

declare global {
  interface Window {
    ethereum?: any
  }
}

const GameStates = ["Not Started", "Starting Period", "Ending Period", "Ended"]

export default function BigWicksGame() {
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null)
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null)
  const [contract, setContract] = useState<ethers.Contract | null>(null)
  const [userAddress, setUserAddress] = useState<string>("")
  const [isOwner, setIsOwner] = useState(false)
  const [connected, setConnected] = useState(false)
  
  // Game state
  const [currentGameId, setCurrentGameId] = useState<number>(0)
  const [gameData, setGameData] = useState<GameData | null>(null)
  const [playerData, setPlayerData] = useState<PlayerData | null>(null)
  const [playerCount, setPlayerCount] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState<string>("")
  const [gamePhase, setGamePhase] = useState<string>("Not Started")
  
  // UI state
  const [bidAmount, setBidAmount] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [leaderboard, setLeaderboard] = useState<{ address: string; totalBid: bigint }[]>([])
  const [bidHistory, setBidHistory] = useState<BidEvent[]>([])
  const [pendingWithdrawal, setPendingWithdrawal] = useState<bigint>(BigInt(0))

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

      // Check if owner
      const owner = await contr.owner()
      setIsOwner(owner.toLowerCase() === userAddr.toLowerCase())

      setSuccess("Wallet connected successfully!")
      setTimeout(() => setSuccess(""), 3000)
    } catch (err: any) {
      setError(`Failed to connect wallet: ${err.message}`)
    }
  }

  // Refresh game data
  const refreshGameData = async () => {
    if (!contract) return

    try {
      let gameId
      try {
        gameId = await contract.currentGameId()
      } catch (err) {
        console.log("No active game yet")
        setCurrentGameId(0)
        setGamePhase("Not Started")
        return
      }
      
      setCurrentGameId(Number(gameId))

      if (gameId > 0) {
        const game = await contract.games(gameId)
        const gameState = await contract.getGameState(gameId)
        const players = await contract.getGamePlayerCount(gameId)
        
        setGameData({
          gameId: Number(game.gameId),
          startTime: Number(game.startTime),
          endingPeriodStart: Number(game.endingPeriodStart),
          endTime: Number(game.endTime),
          totalPot: game.totalPot,
          treasuryFund: game.treasuryFund,
          winner: game.winner,
          state: Number(gameState),
          candleEnd: Number(game.candleEnd),
          finalized: game.finalized
        })
        
        setPlayerCount(Number(players))
        setGamePhase(GameStates[Number(gameState)])

        // Get player data
        if (userAddress) {
          const pData = await contract.gamePlayers(gameId, userAddress)
          setPlayerData({
            totalBid: pData.totalBid,
            bidCount: Number(pData.bidCount),
            lastBidTime: Number(pData.lastBidTime),
            exists: pData.exists
          })

          // Check pending withdrawals
          const pending = await contract.pendingWithdrawals(userAddress)
          setPendingWithdrawal(pending)
        }

        // Get leaderboard
        try {
          const [addresses, bids] = await contract.getTopPlayers(gameId, 10)
          const lb = addresses.map((addr: string, i: number) => ({
            address: addr,
            totalBid: bids[i]
          }))
          setLeaderboard(lb)
        } catch (e) {
          console.error("Error fetching leaderboard:", e)
        }
      }
    } catch (err: any) {
      console.error("Error refreshing game data:", err)
    }
  }

  // Place bid
  const placeBid = async () => {
    if (!contract || !currentGameId || !bidAmount) return

    setLoading(true)
    setError("")
    
    try {
      const tx = await contract.placeBid(currentGameId, {
        value: ethers.parseEther(bidAmount)
      })
      
      setSuccess("Bid placed! Waiting for confirmation...")
      await tx.wait()
      
      setSuccess("Bid confirmed! 🎉")
      setBidAmount("")
      await refreshGameData()
      
      setTimeout(() => setSuccess(""), 3000)
    } catch (err: any) {
      setError(`Failed to place bid: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  // Start new game (owner only)
  const startNewGame = async () => {
    if (!contract || !isOwner) return

    setLoading(true)
    setError("")
    
    try {
      const tx = await contract.startNewGame()
      setSuccess("Starting new game...")
      await tx.wait()
      
      setSuccess("New game started! 🚀")
      await refreshGameData()
      
      setTimeout(() => setSuccess(""), 3000)
    } catch (err: any) {
      setError(`Failed to start game: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  // End game
  const endGame = async () => {
    if (!contract || !currentGameId) return

    setLoading(true)
    setError("")
    
    try {
      const tx = await contract.endGame(currentGameId)
      setSuccess("Ending game...")
      await tx.wait()
      
      setSuccess("Game ended! Winner determined 🏆")
      await refreshGameData()
      
      setTimeout(() => setSuccess(""), 3000)
    } catch (err: any) {
      setError(`Failed to end game: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  // Withdraw winnings
  const withdraw = async () => {
    if (!contract) return

    setLoading(true)
    setError("")
    
    try {
      const tx = await contract.withdraw()
      setSuccess("Withdrawing funds...")
      await tx.wait()
      
      setSuccess("Withdrawal successful! 💰")
      await refreshGameData()
      
      setTimeout(() => setSuccess(""), 3000)
    } catch (err: any) {
      setError(`Failed to withdraw: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  // Update time remaining
  useEffect(() => {
    if (!gameData) return

    const updateTimer = () => {
      const now = Math.floor(Date.now() / 1000)
      let targetTime = 0
      let label = ""

      if (gameData.state === 1) { // Starting Period
        targetTime = gameData.endingPeriodStart
        label = "Ending period starts in: "
      } else if (gameData.state === 2) { // Ending Period
        targetTime = gameData.endTime
        label = "Game ends in: "
      }

      if (targetTime > now) {
        const diff = targetTime - now
        const days = Math.floor(diff / 86400)
        const hours = Math.floor((diff % 86400) / 3600)
        const minutes = Math.floor((diff % 3600) / 60)
        const seconds = diff % 60

        setTimeRemaining(
          label + 
          (days > 0 ? `${days}d ` : "") +
          `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
        )
      } else {
        setTimeRemaining(gameData.state === 3 ? "Game Ended" : "Waiting...")
      }
    }

    updateTimer()
    const interval = setInterval(updateTimer, 1000)
    return () => clearInterval(interval)
  }, [gameData])

  // Auto-refresh
  useEffect(() => {
    if (connected) {
      refreshGameData()
      const interval = setInterval(refreshGameData, 10000)
      return () => clearInterval(interval)
    }
  }, [connected, contract])

  // Listen for events
  useEffect(() => {
    if (!contract || !currentGameId) return

    const handleBidPlaced = (gameId: bigint, player: string, amount: bigint, totalBid: bigint, event: any) => {
      if (Number(gameId) === currentGameId) {
        setBidHistory(prev => [{
          player,
          amount,
          totalBid,
          timestamp: Date.now(),
          txHash: event.log.transactionHash
        }, ...prev].slice(0, 20))
        refreshGameData()
      }
    }

    contract.on("BidPlaced", handleBidPlaced)
    return () => {
      contract.off("BidPlaced", handleBidPlaced)
    }
  }, [contract, currentGameId])

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
          <h1 className="text-4xl md:text-6xl font-orbitron font-black text-toxic-slime mb-4">
            big wicks 🕯️
          </h1>
          <p className="text-soda-chrome font-vt323 text-lg mb-2">
            candle auction game • winner takes 90% • treasury gets 10%
          </p>
          <p className="text-ghost-grey font-vt323 text-sm">
            bid high • bid often • but timing is everything
          </p>
        </motion.div>

        {/* Alerts */}
        {error && (
          <Alert className="mb-4 border-laser-berry bg-laser-berry/10">
            <AlertCircle className="h-4 w-4 text-laser-berry" />
            <AlertTitle className="text-laser-berry">Error</AlertTitle>
            <AlertDescription className="text-ghost-grey">{error}</AlertDescription>
          </Alert>
        )}
        
        {success && (
          <Alert className="mb-4 border-toxic-slime bg-toxic-slime/10">
            <Sparkles className="h-4 w-4 text-toxic-slime" />
            <AlertTitle className="text-toxic-slime">Success</AlertTitle>
            <AlertDescription className="text-ghost-grey">{success}</AlertDescription>
          </Alert>
        )}

        {/* Connect Wallet */}
        {!connected && (
          <Card className="mb-8 bg-midnight-void/80 border-soda-chrome/30">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Wallet className="w-16 h-16 text-toxic-slime mb-4" />
              <h3 className="text-xl font-orbitron text-toxic-slime mb-2">Connect Your Wallet</h3>
              <p className="text-soda-chrome mb-4">Connect to Polkadot Hub TestNet to play</p>
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Game Panel */}
            <div className="lg:col-span-2 space-y-6">
              {/* Game Status */}
              <Card className="bg-midnight-void/80 border-soda-chrome/30">
                <CardHeader>
                  <CardTitle className="text-toxic-slime font-orbitron flex items-center">
                    <Flame className="w-5 h-5 mr-2" />
                    {currentGameId > 0 ? `Game #${currentGameId} Status` : "No Active Game"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-soda-chrome text-sm font-vt323">Phase</p>
                      <p className="text-toxic-slime font-orbitron text-lg">{gamePhase}</p>
                    </div>
                    <div>
                      <p className="text-soda-chrome text-sm font-vt323">Players</p>
                      <p className="text-aqua-glitch font-orbitron text-lg">{playerCount}</p>
                    </div>
                    <div>
                      <p className="text-soda-chrome text-sm font-vt323">Total Pot</p>
                      <p className="text-laser-berry font-orbitron text-lg">
                        {gameData ? ethers.formatEther(gameData.totalPot) : "0"} PAS
                      </p>
                    </div>
                    <div>
                      <p className="text-soda-chrome text-sm font-vt323">Treasury</p>
                      <p className="text-amber-crt font-orbitron text-lg">
                        {gameData ? ethers.formatEther(gameData.treasuryFund) : "0"} PAS
                      </p>
                    </div>
                  </div>

                  {gameData && gameData.state !== 3 && (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-soda-chrome font-vt323 flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {timeRemaining}
                        </span>
                        <Badge variant="outline" className="text-toxic-slime border-toxic-slime">
                          {gameData.state === 1 ? "Starting Period" : "Ending Period (Candle Active)"}
                        </Badge>
                      </div>
                      <Progress 
                        value={
                          gameData.state === 1
                            ? ((Date.now() / 1000 - gameData.startTime) / (gameData.endingPeriodStart - gameData.startTime)) * 100
                            : ((Date.now() / 1000 - gameData.endingPeriodStart) / (gameData.endTime - gameData.endingPeriodStart)) * 100
                        }
                        className="h-2"
                      />
                    </div>
                  )}

                  {gameData && gameData.state === 3 && gameData.winner !== "0x0000000000000000000000000000000000000000" && (
                    <div className="bg-toxic-slime/10 rounded-lg p-4 border border-toxic-slime/30">
                      <div className="flex items-center">
                        <Trophy className="w-8 h-8 text-toxic-slime mr-3" />
                        <div>
                          <p className="text-toxic-slime font-orbitron text-lg">Winner!</p>
                          <p className="text-soda-chrome font-mono text-sm">{gameData.winner}</p>
                          <p className="text-ghost-grey font-vt323">
                            Won {ethers.formatEther(gameData.totalPot * BigInt(90) / BigInt(100))} PAS
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {currentGameId === 0 && (
                    <div className="bg-soda-chrome/10 rounded-lg p-4 border border-soda-chrome/30 text-center">
                      <p className="text-soda-chrome font-vt323 text-lg">No game is currently active</p>
                      {isOwner && (
                        <p className="text-ghost-grey font-vt323 text-sm mt-2">
                          As the contract owner, you can start the first game using the admin controls below
                        </p>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Place Bid */}
              {gameData && (gameData.state === 1 || gameData.state === 2) && (
                <Card className="bg-midnight-void/80 border-soda-chrome/30">
                  <CardHeader>
                    <CardTitle className="text-aqua-glitch font-orbitron flex items-center">
                      <Zap className="w-5 h-5 mr-2" />
                      Place Your Bid
                    </CardTitle>
                    <CardDescription className="text-soda-chrome">
                      Bid to increase your chances of winning the pot
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="bid-amount" className="text-soda-chrome">Bid Amount (PAS)</Label>
                      <div className="flex gap-2 mt-1">
                        <Input
                          id="bid-amount"
                          type="number"
                          step="0.01"
                          min="0"
                          value={bidAmount}
                          onChange={(e) => setBidAmount(e.target.value)}
                          placeholder="0.0"
                          className="bg-midnight-void border-soda-chrome/50 text-ghost-grey"
                        />
                        <Button
                          onClick={placeBid}
                          disabled={loading || !bidAmount || parseFloat(bidAmount) <= 0}
                          className="bg-aqua-glitch text-midnight-void hover:bg-aqua-glitch/80"
                        >
                          {loading ? "Bidding..." : "Place Bid"}
                        </Button>
                      </div>
                    </div>

                    {playerData && playerData.exists && (
                      <div className="bg-midnight-void/50 rounded-lg p-3 border border-soda-chrome/20">
                        <p className="text-soda-chrome font-vt323 text-sm">Your Stats</p>
                        <div className="grid grid-cols-3 gap-2 mt-2">
                          <div>
                            <p className="text-ghost-grey text-xs">Total Bid</p>
                            <p className="text-toxic-slime font-mono text-sm">
                              {ethers.formatEther(playerData.totalBid)} PAS
                            </p>
                          </div>
                          <div>
                            <p className="text-ghost-grey text-xs">Bid Count</p>
                            <p className="text-aqua-glitch font-mono text-sm">{playerData.bidCount}</p>
                          </div>
                          <div>
                            <p className="text-ghost-grey text-xs">Last Bid</p>
                            <p className="text-laser-berry font-mono text-sm">
                              {new Date(playerData.lastBidTime * 1000).toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Admin Controls */}
              {isOwner && (
                <Card className="bg-midnight-void/80 border-amber-crt/30">
                  <CardHeader>
                    <CardTitle className="text-amber-crt font-orbitron">Admin Controls</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {(!gameData || gameData.state === 3) && (
                      <Button
                        onClick={startNewGame}
                        disabled={loading}
                        className="w-full bg-toxic-slime text-midnight-void hover:bg-toxic-slime/80"
                      >
                        Start New Game
                      </Button>
                    )}
                    {gameData && gameData.state !== 3 && Date.now() / 1000 > gameData.endTime && (
                      <Button
                        onClick={endGame}
                        disabled={loading}
                        className="w-full bg-laser-berry text-white hover:bg-laser-berry/80"
                      >
                        End Game & Determine Winner
                      </Button>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Pending Withdrawal */}
              {pendingWithdrawal > BigInt(0) && (
                <Card className="bg-toxic-slime/10 border-toxic-slime">
                  <CardContent className="flex items-center justify-between py-4">
                    <div>
                      <p className="text-toxic-slime font-orbitron">You have winnings to claim!</p>
                      <p className="text-ghost-grey font-vt323">
                        {ethers.formatEther(pendingWithdrawal)} PAS available
                      </p>
                    </div>
                    <Button
                      onClick={withdraw}
                      disabled={loading}
                      className="bg-toxic-slime text-midnight-void hover:bg-toxic-slime/80"
                    >
                      Withdraw
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Side Panel */}
            <div className="space-y-6">
              {/* Leaderboard */}
              <Card className="bg-midnight-void/80 border-soda-chrome/30">
                <CardHeader>
                  <CardTitle className="text-laser-berry font-orbitron flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Leaderboard
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-64">
                    {leaderboard.length > 0 ? (
                      <div className="space-y-2">
                        {leaderboard.map((player, index) => (
                          <div
                            key={player.address}
                            className="flex items-center justify-between p-2 rounded bg-midnight-void/50 border border-soda-chrome/20"
                          >
                            <div className="flex items-center">
                              <span className={`font-orbitron mr-2 ${
                                index === 0 ? "text-toxic-slime" :
                                index === 1 ? "text-aqua-glitch" :
                                index === 2 ? "text-laser-berry" :
                                "text-soda-chrome"
                              }`}>
                                #{index + 1}
                              </span>
                              <span className="text-ghost-grey font-mono text-xs">
                                {player.address.slice(0, 6)}...{player.address.slice(-4)}
                              </span>
                            </div>
                            <span className="text-toxic-slime font-mono text-sm">
                              {ethers.formatEther(player.totalBid)} PAS
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-center text-soda-chrome py-8">No bids yet</p>
                    )}
                  </ScrollArea>
                </CardContent>
              </Card>

              {/* Recent Bids */}
              <Card className="bg-midnight-void/80 border-soda-chrome/30">
                <CardHeader>
                  <CardTitle className="text-aqua-glitch font-orbitron flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    Recent Bids
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-64">
                    {bidHistory.length > 0 ? (
                      <div className="space-y-2">
                        {bidHistory.map((bid, index) => (
                          <div
                            key={`${bid.txHash}-${index}`}
                            className="p-2 rounded bg-midnight-void/50 border border-soda-chrome/20"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-ghost-grey font-mono text-xs">
                                {bid.player.slice(0, 6)}...{bid.player.slice(-4)}
                              </span>
                              <span className="text-toxic-slime font-mono text-sm">
                                +{ethers.formatEther(bid.amount)} PAS
                              </span>
                            </div>
                            <p className="text-soda-chrome text-xs font-vt323 mt-1">
                              Total: {ethers.formatEther(bid.totalBid)} PAS
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-center text-soda-chrome py-8">No recent bids</p>
                    )}
                  </ScrollArea>
                </CardContent>
              </Card>

              {/* Game Rules */}
              <Card className="bg-midnight-void/80 border-soda-chrome/30">
                <CardHeader>
                  <CardTitle className="text-amber-crt font-orbitron">Game Rules</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-ghost-grey">
                  <p>• <span className="text-toxic-slime">Starting Period:</span> 2 days</p>
                  <p>• <span className="text-aqua-glitch">Ending Period:</span> 5 days (candle active)</p>
                  <p>• <span className="text-laser-berry">Winner Prize:</span> 90% of total pot</p>
                  <p>• <span className="text-amber-crt">Treasury:</span> 10% of total pot</p>
                  <Separator className="my-2" />
                  <p className="text-soda-chrome font-vt323">
                    The winner is determined retroactively based on who had the highest bid at a random point during the ending period!
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}