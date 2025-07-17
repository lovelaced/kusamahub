"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Book, Code, Zap, Terminal, ExternalLink, Search, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

interface DocSection {
  id: string
  title: string
  description: string
  category: "getting-started" | "dapps" | "api" | "advanced"
  content: string
  codeExample?: string
  links?: Array<{ title: string; url: string }>
}

const docSections: DocSection[] = [
  {
    id: "intro",
    title: "Welcome to KusamaHub",
    description: "Your gateway to the Kusama ecosystem's most chaotic dApps",
    category: "getting-started",
    content: `KusamaHub is a collection of experimental dApps built on the Kusama network. Each application explores different aspects of decentralized gaming, DeFi, and governance.

Our philosophy: embrace chaos, experiment boldly, and build the future of Web3 gaming and finance.

Key Features:
• Fully on-chain gaming experiences
• Experimental DeFi mechanisms
• Governance prediction markets
• Real-time network monitoring
• Cyberpunk aesthetic throughout`,
    codeExample: `// Connect to Kusama network
import { ApiPromise, WsProvider } from '@polkadot/api'

const wsProvider = new WsProvider('wss://kusama-rpc.polkadot.io')
const api = await ApiPromise.create({ provider: wsProvider })

console.log('Connected to Kusama:', await api.rpc.system.chain())`,
  },
  {
    id: "data-heist",
    title: "Data Heist v2 - The Anatomy Map",
    description: "16×16 grid warfare with staking mechanics",
    category: "dapps",
    content: `Data Heist v2 is a territorial control game where players capture nodes on a 16×16 grid by staking KSM.

Game Mechanics:
• 256 nodes total, each with owner, stake, captureBlock, yieldDebt
• Capture requires newStake ≥ prevStake × 1.05 AND ≥ 0.05 KSM
• 5% burn tax on captures funds global yield bucket
• Yield: stake × 0.000001 per block (inflationless)
• 1% exit fee on surrender

Meta-game:
• Heat-maps reveal high-stake targets
• Players coordinate to raid whales
• Average node flips 3-6× per day
• Steady transaction churn maintains burn/drip balance`,
    codeExample: `// Capture a node
const captureNode = async (nodeId: string, stakeAmount: number) => {
  const tx = api.tx.dataHeist.capture(nodeId, stakeAmount)
  await tx.signAndSend(account, ({ status }) => {
    if (status.isInBlock) {
      console.log('Node captured! Burn tax applied.')
    }
  })
}`,
    links: [
      { title: "Play Data Heist v2", url: "/data-heist" },
      { title: "Game Rules", url: "#data-heist-rules" },
    ],
  },
  {
    id: "loot-tombola",
    title: "Loot Tombola - Daily Raffle",
    description: "Every transaction earns raffle tickets",
    category: "dapps",
    content: `Loot Tombola is a daily raffle system where every transaction on the network earns you tickets.

How it works:
• Every tx broadcast anywhere = 1 ticket
• Daily draw at 00:00 UTC
• Jackpot rolls over if no winner
• 10% house cut goes to dev fund
• Provably fair using block hash randomness

Economic Model:
• Self-sustaining through transaction fees
• Encourages network activity
• Rewards active participants
• Creates daily engagement cycles`,
    codeExample: `// Check ticket balance
const getTickets = async (address: string) => {
  const tickets = await api.query.lootTombola.tickets(address)
  return tickets.toNumber()
}

// Enter daily draw (automatic)
// Tickets earned from any on-chain activity`,
    links: [
      { title: "Play Loot Tombola", url: "/loot-tombola" },
      { title: "Check Tickets", url: "/loot-tombola#tickets" },
    ],
  },
  {
    id: "futarchy",
    title: "Futarchy Markets",
    description: "Prediction markets for governance outcomes",
    category: "dapps",
    content: `Futarchy Markets let you bet on governance outcomes, treasury burns, and network events.

Market Types:
• Referendum passage predictions
• Treasury burn amount forecasts
• Coretime sales volume bets
• Validator set size predictions

Mechanics:
• Buy YES/NO shares with KSM
• Prices reflect probability
• Automated settlement on outcome
• Market-driven consensus building

Benefits:
• Incentivized accuracy
• Price discovery for governance
• Hedging against policy changes
• Information aggregation`,
    codeExample: `// Place a bet on referendum outcome
const placeBet = async (marketId: string, side: 'yes' | 'no', amount: number) => {
  const tx = api.tx.futarchy.bet(marketId, side, amount)
  await tx.signAndSend(account)
}`,
    links: [
      { title: "Browse Markets", url: "/bingo" },
      { title: "Market Rules", url: "#futarchy-rules" },
    ],
  },
  {
    id: "api-reference",
    title: "API Reference",
    description: "Integrate with KusamaHub dApps",
    category: "api",
    content: `KusamaHub provides REST and WebSocket APIs for all dApps.

Base URL: https://api.kusamahub.com/v1

Authentication:
• API key required for write operations
• Read operations are public
• Rate limiting: 100 requests/minute

Endpoints:
• GET /dapps - List all dApps
• GET /dapps/{id}/stats - Get dApp statistics
• POST /dapps/{id}/interact - Submit transaction
• WS /live - Real-time updates`,
    codeExample: `// Fetch dApp statistics
const response = await fetch('https://api.kusamahub.com/v1/dapps/data-heist/stats')
const stats = await response.json()

console.log('Active nodes:', stats.activeNodes)
console.log('Total staked:', stats.totalStaked)

// WebSocket for live updates
const ws = new WebSocket('wss://api.kusamahub.com/v1/live')
ws.onmessage = (event) => {
  const update = JSON.parse(event.data)
  console.log('Live update:', update)
}`,
  },
  {
    id: "advanced-concepts",
    title: "Advanced Concepts",
    description: "Deep dive into KusamaHub architecture",
    category: "advanced",
    content: `Understanding the technical architecture behind KusamaHub's experimental dApps.

Substrate Integration:
• Custom pallets for each dApp
• On-chain randomness using VRF
• Cross-chain messaging via XCM
• Governance integration

Economic Design:
• Burn-and-mint tokenomics
• Incentive alignment mechanisms
• MEV resistance strategies
• Sustainable yield generation

Security Considerations:
• Formal verification of critical paths
• Economic security models
• Front-running protection
• Governance attack vectors`,
    codeExample: `// Custom pallet example
#[pallet::call]
impl<T: Config> Pallet<T> {
    #[pallet::weight(10_000)]
    pub fn capture_node(
        origin: OriginFor<T>,
        node_id: NodeId,
        stake_amount: BalanceOf<T>,
    ) -> DispatchResult {
        let who = ensure_signed(origin)?;
        
        // Validate capture conditions
        let node = Nodes::<T>::get(&node_id)
            .ok_or(Error::<T>::NodeNotFound)?;
            
        let min_stake = node.stake
            .saturating_mul(105u32.into())
            .saturating_div(100u32.into());
            
        ensure!(stake_amount >= min_stake, Error::<T>::InsufficientStake);
        
        // Apply burn tax
        let burn_amount = stake_amount
            .saturating_mul(5u32.into())
            .saturating_div(100u32.into());
            
        // Update node ownership
        Nodes::<T>::mutate(&node_id, |node| {
            node.owner = Some(who.clone());
            node.stake = stake_amount;
            node.capture_block = frame_system::Pallet::<T>::block_number();
        });
        
        Ok(())
    }
}`,
  },
]

export default function Documentation() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedSection, setSelectedSection] = useState<DocSection | null>(null)

  const categories = [
    { value: "all", label: "all docs", icon: Book },
    { value: "getting-started", label: "getting started", icon: Zap },
    { value: "dapps", label: "dapps", icon: Terminal },
    { value: "api", label: "api", icon: Code },
    { value: "advanced", label: "advanced", icon: ExternalLink },
  ]

  const filteredSections = docSections.filter((section) => {
    const matchesSearch =
      section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      section.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      section.content.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = selectedCategory === "all" || section.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "getting-started":
        return "bg-toxic-slime/20 text-toxic-slime"
      case "dapps":
        return "bg-laser-berry/20 text-laser-berry"
      case "api":
        return "bg-aqua-glitch/20 text-aqua-glitch"
      case "advanced":
        return "bg-amber-crt/20 text-amber-crt"
      default:
        return "bg-ghost-grey/20 text-ghost-grey"
    }
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
          <h1 className="text-4xl md:text-6xl font-orbitron font-black text-toxic-slime mb-4">documentation</h1>
          <p className="text-soda-chrome font-vt323 text-lg mb-2">technical guides & api reference</p>
          <p className="text-ghost-grey font-vt323 text-sm">learn to build • integrate apis • understand the chaos</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-midnight-void/80 border-soda-chrome/30 sticky top-24">
              <CardHeader>
                <CardTitle className="text-toxic-slime font-orbitron text-lg">navigation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-soda-chrome" />
                  <Input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="search docs..."
                    className="bg-midnight-void border-soda-chrome/50 text-ghost-grey font-vt323 pl-10"
                  />
                </div>

                {/* Category Filter */}
                <div className="space-y-2">
                  {categories.map((category) => {
                    const Icon = category.icon
                    return (
                      <Button
                        key={category.value}
                        variant={selectedCategory === category.value ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setSelectedCategory(category.value)}
                        className={`w-full justify-start font-vt323 ${
                          selectedCategory === category.value
                            ? "bg-toxic-slime text-midnight-void"
                            : "text-soda-chrome hover:text-toxic-slime"
                        }`}
                      >
                        <Icon className="w-4 h-4 mr-2" />
                        {category.label}
                      </Button>
                    )
                  })}
                </div>

                {/* Section List */}
                <div className="space-y-1 pt-4 border-t border-soda-chrome/30">
                  {filteredSections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setSelectedSection(section)}
                      className={`w-full text-left p-2 rounded text-sm transition-colors ${
                        selectedSection?.id === section.id
                          ? "bg-toxic-slime/20 text-toxic-slime"
                          : "text-ghost-grey hover:text-toxic-slime hover:bg-toxic-slime/10"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-vt323">{section.title}</span>
                        <ChevronRight className="w-3 h-3" />
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {selectedSection ? (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
                <Card className="bg-midnight-void/80 border-soda-chrome/30">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-toxic-slime font-orbitron text-2xl mb-2">
                          {selectedSection.title}
                        </CardTitle>
                        <p className="text-soda-chrome mb-3">{selectedSection.description}</p>
                        <Badge className={`${getCategoryColor(selectedSection.category)} font-vt323`}>
                          {selectedSection.category.replace("-", " ")}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Content */}
                    <div className="prose prose-invert max-w-none">
                      <div className="text-ghost-grey whitespace-pre-line leading-relaxed">
                        {selectedSection.content}
                      </div>
                    </div>

                    {/* Code Example */}
                    {selectedSection.codeExample && (
                      <div>
                        <h4 className="text-aqua-glitch font-orbitron mb-3">Code Example</h4>
                        <div className="bg-midnight-void/50 border border-soda-chrome/30 rounded-lg p-4 overflow-x-auto">
                          <pre className="text-sm text-ghost-grey font-mono">
                            <code>{selectedSection.codeExample}</code>
                          </pre>
                        </div>
                      </div>
                    )}

                    {/* Links */}
                    {selectedSection.links && (
                      <div>
                        <h4 className="text-laser-berry font-orbitron mb-3">Related Links</h4>
                        <div className="space-y-2">
                          {selectedSection.links.map((link, index) => (
                            <a
                              key={index}
                              href={link.url}
                              className="flex items-center text-aqua-glitch hover:text-aqua-glitch/80 transition-colors"
                            >
                              <ExternalLink className="w-4 h-4 mr-2" />
                              <span className="font-vt323">{link.title}</span>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              /* Overview Grid */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredSections.map((section, index) => (
                  <motion.div
                    key={section.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card
                      className="bg-midnight-void/80 border-soda-chrome/30 hover:border-toxic-slime/50 transition-all duration-300 cursor-pointer h-full"
                      onClick={() => setSelectedSection(section)}
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-toxic-slime font-orbitron text-lg mb-2">
                              {section.title}
                            </CardTitle>
                            <p className="text-soda-chrome text-sm mb-3">{section.description}</p>
                            <Badge className={`${getCategoryColor(section.category)} font-vt323 text-xs`}>
                              {section.category.replace("-", " ")}
                            </Badge>
                          </div>
                          <ChevronRight className="w-5 h-5 text-soda-chrome" />
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-ghost-grey text-sm line-clamp-3">{section.content.split("\n")[0]}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Quick Links */}
        <Card className="mt-8 bg-midnight-void/80 border-soda-chrome/30">
          <CardHeader>
            <CardTitle className="text-amber-crt font-orbitron">quick links</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <a
                href="/data-heist"
                className="flex items-center text-toxic-slime hover:text-toxic-slime/80 transition-colors"
              >
                <Terminal className="w-4 h-4 mr-2" />
                <span className="font-vt323">Data Heist v2</span>
              </a>
              <a
                href="/loot-tombola"
                className="flex items-center text-laser-berry hover:text-laser-berry/80 transition-colors"
              >
                <Zap className="w-4 h-4 mr-2" />
                <span className="font-vt323">Loot Tombola</span>
              </a>
              <a
                href="/bingo"
                className="flex items-center text-aqua-glitch hover:text-aqua-glitch/80 transition-colors"
              >
                <Book className="w-4 h-4 mr-2" />
                <span className="font-vt323">Futarchy Markets</span>
              </a>
              <a
                href="/chaos-log"
                className="flex items-center text-amber-crt hover:text-amber-crt/80 transition-colors"
              >
                <Code className="w-4 h-4 mr-2" />
                <span className="font-vt323">Chaos Log</span>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
