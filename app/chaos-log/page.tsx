"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Terminal, Zap, AlertTriangle, CheckCircle, Filter, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface LogEntry {
  id: string
  timestamp: Date
  level: "info" | "warning" | "error" | "success"
  category: "system" | "network" | "governance" | "user" | "dapp"
  message: string
  details?: string
  txHash?: string
  blockNumber?: number
}

const mockLogs: LogEntry[] = [
  {
    id: "1",
    timestamp: new Date(Date.now() - 1000 * 60 * 2),
    level: "success",
    category: "dapp",
    message: "Data Heist v2: Node 4a captured by 0xwhale420",
    details: "Stake: 2.45 KSM, Burn tax: 0.123 KSM",
    txHash: "0x1234...5678",
    blockNumber: 1234567,
  },
  {
    id: "2",
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    level: "info",
    category: "network",
    message: "New block finalized #1234566",
    details: "Validator: Kusama-Validator-01, 23 extrinsics",
    blockNumber: 1234566,
  },
  {
    id: "3",
    timestamp: new Date(Date.now() - 1000 * 60 * 8),
    level: "warning",
    category: "governance",
    message: "Referendum #47 voting period ending soon",
    details: "12 hours remaining, current turnout: 23.4%",
  },
  {
    id: "4",
    timestamp: new Date(Date.now() - 1000 * 60 * 12),
    level: "error",
    category: "system",
    message: "RPC connection timeout to kusama-rpc-01",
    details: "Failover to kusama-rpc-02 successful",
  },
  {
    id: "5",
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    level: "success",
    category: "dapp",
    message: "Loot Tombola: Daily draw completed",
    details: "Winner: 0xlucky88, Prize: 45.67 KSM",
    txHash: "0xabcd...efgh",
  },
  {
    id: "6",
    timestamp: new Date(Date.now() - 1000 * 60 * 18),
    level: "info",
    category: "user",
    message: "New user registration: 0xnewbie123",
    details: "Wallet connected, initial balance: 0.1 KSM",
  },
  {
    id: "7",
    timestamp: new Date(Date.now() - 1000 * 60 * 25),
    level: "warning",
    category: "network",
    message: "High network congestion detected",
    details: "Avg block time: 8.2s (target: 6s), mempool: 1,247 txs",
  },
  {
    id: "8",
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    level: "success",
    category: "governance",
    message: "Treasury proposal #156 approved",
    details: "Amount: 500 KSM, Beneficiary: Dev Team Alpha",
    txHash: "0x9876...5432",
  },
]

export default function ChaosLog() {
  const [logs, setLogs] = useState<LogEntry[]>(mockLogs)
  const [filteredLogs, setFilteredLogs] = useState<LogEntry[]>(mockLogs)
  const [searchTerm, setSearchTerm] = useState("")
  const [levelFilter, setLevelFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [autoScroll, setAutoScroll] = useState(true)

  // Simulate real-time log updates
  useEffect(() => {
    const interval = setInterval(() => {
      const newLog: LogEntry = {
        id: Date.now().toString(),
        timestamp: new Date(),
        level: ["info", "warning", "error", "success"][Math.floor(Math.random() * 4)] as LogEntry["level"],
        category: ["system", "network", "governance", "user", "dapp"][
          Math.floor(Math.random() * 5)
        ] as LogEntry["category"],
        message: [
          "Block finalized",
          "Transaction processed",
          "User action completed",
          "System health check",
          "Network event detected",
        ][Math.floor(Math.random() * 5)],
        details: "Simulated log entry for demo purposes",
        blockNumber: Math.floor(Math.random() * 1000000) + 1234000,
      }

      setLogs((prev) => [newLog, ...prev].slice(0, 100)) // Keep only last 100 logs
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // Filter logs based on search and filters
  useEffect(() => {
    let filtered = logs

    if (searchTerm) {
      filtered = filtered.filter(
        (log) =>
          log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
          log.details?.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (levelFilter !== "all") {
      filtered = filtered.filter((log) => log.level === levelFilter)
    }

    if (categoryFilter !== "all") {
      filtered = filtered.filter((log) => log.category === categoryFilter)
    }

    setFilteredLogs(filtered)
  }, [logs, searchTerm, levelFilter, categoryFilter])

  const getLevelColor = (level: LogEntry["level"]) => {
    switch (level) {
      case "success":
        return "text-toxic-slime border-toxic-slime"
      case "warning":
        return "text-amber-crt border-amber-crt"
      case "error":
        return "text-laser-berry border-laser-berry"
      case "info":
        return "text-aqua-glitch border-aqua-glitch"
      default:
        return "text-ghost-grey border-ghost-grey"
    }
  }

  const getLevelIcon = (level: LogEntry["level"]) => {
    switch (level) {
      case "success":
        return <CheckCircle className="w-4 h-4" />
      case "warning":
        return <AlertTriangle className="w-4 h-4" />
      case "error":
        return <AlertTriangle className="w-4 h-4" />
      case "info":
        return <Zap className="w-4 h-4" />
      default:
        return <Terminal className="w-4 h-4" />
    }
  }

  const getCategoryColor = (category: LogEntry["category"]) => {
    switch (category) {
      case "system":
        return "bg-laser-berry/20 text-laser-berry"
      case "network":
        return "bg-aqua-glitch/20 text-aqua-glitch"
      case "governance":
        return "bg-amber-crt/20 text-amber-crt"
      case "user":
        return "bg-toxic-slime/20 text-toxic-slime"
      case "dapp":
        return "bg-soda-chrome/20 text-soda-chrome"
      default:
        return "bg-ghost-grey/20 text-ghost-grey"
    }
  }

  const formatTimestamp = (timestamp: Date) => {
    return timestamp.toLocaleTimeString() + "." + timestamp.getMilliseconds().toString().padStart(3, "0")
  }

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date()
    const diff = now.getTime() - timestamp.getTime()
    const minutes = Math.floor(diff / 60000)
    const seconds = Math.floor((diff % 60000) / 1000)

    if (minutes > 0) return `${minutes}m ${seconds}s ago`
    return `${seconds}s ago`
  }

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
          <h1 className="text-4xl md:text-6xl font-orbitron font-black text-toxic-slime mb-4">chaos log</h1>
          <p className="text-soda-chrome font-vt323 text-lg mb-2">real-time system events</p>
          <p className="text-ghost-grey font-vt323 text-sm">
            network activity • governance events • dapp interactions • system diagnostics
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          {["success", "info", "warning", "error"].map((level) => {
            const count = logs.filter((log) => log.level === level).length
            return (
              <Card key={level} className="bg-midnight-void/80 border-soda-chrome/30">
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-soda-chrome font-vt323">{level}</p>
                      <p className={`text-lg font-orbitron ${getLevelColor(level as LogEntry["level"]).split(" ")[0]}`}>{count}</p>
                    </div>
                    <div className={getLevelColor(level as LogEntry["level"]).split(" ")[0]}>{getLevelIcon(level as LogEntry["level"])}</div>
                  </div>
                </CardContent>
              </Card>
            )
          })}

          <Card className="bg-midnight-void/80 border-soda-chrome/30">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-soda-chrome font-vt323">total</p>
                  <p className="text-lg font-orbitron text-ghost-grey">{logs.length}</p>
                </div>
                <Terminal className="w-5 h-5 text-ghost-grey" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="bg-midnight-void/80 border-soda-chrome/30 mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-soda-chrome" />
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="search logs..."
                  className="bg-midnight-void border-soda-chrome/50 text-ghost-grey font-vt323 pl-10"
                />
              </div>

              <Select value={levelFilter} onValueChange={setLevelFilter}>
                <SelectTrigger className="w-32 bg-midnight-void border-soda-chrome/50 text-ghost-grey font-vt323">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-midnight-void border-soda-chrome/50">
                  <SelectItem value="all" className="font-vt323">
                    all levels
                  </SelectItem>
                  <SelectItem value="success" className="font-vt323">
                    success
                  </SelectItem>
                  <SelectItem value="info" className="font-vt323">
                    info
                  </SelectItem>
                  <SelectItem value="warning" className="font-vt323">
                    warning
                  </SelectItem>
                  <SelectItem value="error" className="font-vt323">
                    error
                  </SelectItem>
                </SelectContent>
              </Select>

              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-32 bg-midnight-void border-soda-chrome/50 text-ghost-grey font-vt323">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-midnight-void border-soda-chrome/50">
                  <SelectItem value="all" className="font-vt323">
                    all categories
                  </SelectItem>
                  <SelectItem value="system" className="font-vt323">
                    system
                  </SelectItem>
                  <SelectItem value="network" className="font-vt323">
                    network
                  </SelectItem>
                  <SelectItem value="governance" className="font-vt323">
                    governance
                  </SelectItem>
                  <SelectItem value="user" className="font-vt323">
                    user
                  </SelectItem>
                  <SelectItem value="dapp" className="font-vt323">
                    dapp
                  </SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant={autoScroll ? "default" : "outline"}
                size="sm"
                onClick={() => setAutoScroll(!autoScroll)}
                className={`font-vt323 ${
                  !autoScroll ? "border-soda-chrome text-soda-chrome hover:bg-soda-chrome/10 bg-transparent" : ""
                }`}
              >
                <Filter className="w-4 h-4 mr-2" />
                auto-scroll
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Log Entries */}
        <Card className="bg-midnight-void/80 border-soda-chrome/30">
          <CardHeader>
            <CardTitle className="text-toxic-slime font-orbitron flex items-center">
              <Terminal className="w-5 h-5 mr-2" />
              live feed ({filteredLogs.length} entries)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="max-h-96 overflow-y-auto font-mono text-sm">
              {filteredLogs.map((log, index) => (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-soda-chrome/20 p-4 hover:bg-midnight-void/50 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className={`flex items-center ${getLevelColor(log.level)}`}>{getLevelIcon(log.level)}</div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-soda-chrome font-vt323 text-xs">{formatTimestamp(log.timestamp)}</span>
                        <Badge className={`${getCategoryColor(log.category)} font-vt323 text-xs`}>{log.category}</Badge>
                        <span className="text-ghost-grey/50 font-vt323 text-xs">{formatTimeAgo(log.timestamp)}</span>
                      </div>

                      <p className="text-ghost-grey mb-1">{log.message}</p>

                      {log.details && <p className="text-soda-chrome text-xs">{log.details}</p>}

                      <div className="flex items-center gap-4 mt-2 text-xs">
                        {log.blockNumber && (
                          <span className="text-aqua-glitch font-vt323">block #{log.blockNumber.toLocaleString()}</span>
                        )}
                        {log.txHash && <span className="text-amber-crt font-vt323">tx: {log.txHash}</span>}
                      </div>
                    </div>

                    <div className="text-xs text-soda-chrome/50 font-vt323">
                      #{(filteredLogs.length - index).toString().padStart(3, "0")}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Terminal Commands */}
        <Card className="mt-6 bg-midnight-void/80 border-soda-chrome/30">
          <CardHeader>
            <CardTitle className="text-amber-crt font-orbitron">terminal commands</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm font-vt323">
              <div>
                <h4 className="text-toxic-slime font-bold mb-2">log filtering</h4>
                <ul className="space-y-1 text-ghost-grey">
                  <li>• grep -i "error" logs</li>
                  <li>• tail -f system.log</li>
                  <li>• filter by category</li>
                  <li>• search message content</li>
                </ul>
              </div>
              <div>
                <h4 className="text-aqua-glitch font-bold mb-2">real-time monitoring</h4>
                <ul className="space-y-1 text-ghost-grey">
                  <li>• auto-refresh enabled</li>
                  <li>• websocket connection</li>
                  <li>• 5-second intervals</li>
                  <li>• max 100 entries</li>
                </ul>
              </div>
              <div>
                <h4 className="text-laser-berry font-bold mb-2">event sources</h4>
                <ul className="space-y-1 text-ghost-grey">
                  <li>• substrate node events</li>
                  <li>• dapp interactions</li>
                  <li>• governance activities</li>
                  <li>• system diagnostics</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
