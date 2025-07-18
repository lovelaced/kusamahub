# KusamaHub TimeCube 🌀

> **stop behaving. start blockraving.**

A chaotic collection of Kusama-native dapps that embrace the network's experimental spirit. Built with anarchic competence and zero corporate polish.

## What is this madness?

KusamaHub is where serious DeFi meets unserious UX. We're building the tools Kusama deserves - functional, weird, and unapologetically experimental. Think of it as the digital equivalent of a late-night hackathon that never ended.

### Current Headlines (randomized on each visit):
- "blockchain, but make it feral."
- "blockspace abuse is self-care."
- "microtransactions, macrochaos."
- "verifiably irresponsible."
- "no roadmap, just vibes."
- "onchain, unhinged, unstoppable."
- "regulations are suggestions. chaos is mandatory."
- "bad ideas, onchain forever."
- "code is law? we can't read."
- "chaos as a public good."
- "built with love. mostly spite."
- "fully open-source. sorry in advance."
- "not audited, barely tested, 100% live."
- "signed, sealed, delivered, degenerate."
- "gas fees are cheaper than therapy."
- "where entropy meets equity."
- "chain congestion as a service."
- "blockspace vandalism encouraged."
- "built different. built worse."
- "stop behaving. start blockraving."

## Live Dapps

### 🎨 Pixel Pillage
**Status: LIVE**
- Collaborative 128x128 pixel canvas
- Every pixel costs micro-KSM
- Time-lapse shows ASCII rain history
- Pure digital vandalism

### 🕯️ Big Wicks
**Status: LIVE**
- Candle auction jackpots
- Bid on mystery prize pools
- Flame burns down randomly
- Last bidder when candle dies wins all
- Pure adrenaline gambling

## Coming Soon™

### 🌀 Warp Drive
Cross-chain asset teleportation with Winamp equalizer UI. Supports Kusama, Statemine, Karura, Moonriver.

### 🔄 KSM Transmogrifier
Stuff KSM into EVM trenchcoat. CRT monitor UI with green scanlines. Portal animation on success.

### 🎰 Loot Tombola
Every tx you broadcast anywhere drops 1 ticket. Draw at 00:00, jackpot rolls over. 10% house cut → dev fund.

### 🌱 Glitch Garden
Water plant every 4h, fertilize optional. Compounding yield table. Lose progress if you slack.

### 🗺️ Data Heist v2
16×16 grid warfare. Capture nodes, stake KSM, earn yield. 5% burn tax funds the drip. Gang up on whales.

### 🎯 Futarchy Markets
Prediction markets for governance outcomes. Bet KSM on referendum results, governance decisions, treasury burns.

### 🎡 Kusama Khaos
Spin wheel of active validators. Bet on slash events. Chaos theory meets consensus mechanisms.

### ⚰️ NFT Graveyard
Burn worthless NFTs for KSM rewards. ASCII tombstones mark the fallen. Memorial wall of shame.

### 🎵 Block Beats
Compose 8-bit tracks using block hashes as seeds. Mint beats as NFTs. Collaborative albums.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS + Custom cyberpunk theme
- **UI Components**: shadcn/ui (heavily customized)
- **Animations**: Framer Motion
- **Fonts**: Orbitron, VT323, Inter
- **Icons**: Lucide React
- **Blockchain**: 
  - polkadot-api v1.15 (TypeScript-first Polkadot client)
  - Smoldot light client (trustless blockchain connection)
  - XCM for cross-chain transfers
  - Browser wallet extensions via pjs-signer

## Color Palette

\`\`\`css
--toxic-slime: #b6ff00    /* Primary accent */
--laser-berry: #ff006e    /* Secondary accent */
--aqua-glitch: #00faff    /* Tertiary accent */
--amber-crt: #ffbe00      /* Warning/highlight */
--midnight-void: #050006  /* Background */
--ghost-grey: #d9d9d9     /* Text */
--soda-chrome: #8c8c8c    /* Muted text */
\`\`\`

## Features

### 🎮 Interactive Elements
- Custom cursor with particle trails
- Konami code activation (↑↑↓↓←→←→BA)
- Zombo mode (you are on your way to zombo com)
- Sound effects and ambient audio
- Winamp-style window decorations

### 🎨 Visual Design
- CRT scanlines and retro effects
- ASCII art throughout interfaces
- Neon glow effects (epilepsy-safe)
- Responsive pixel-perfect layouts
- Animated marquee banners

### 🔊 Audio Experience
- Contextual sound effects
- Ambient background tracks
- User-controlled audio settings
- Web Audio API integration

## Prerequisites

Before you dive into the chaos, make sure you have:

- **Node.js** v18+ (v21 recommended)
- **pnpm** package manager (install via `npm install -g pnpm`)
- **Polkadot wallet extension** (Talisman, SubWallet, or Polkadot.js)
- **Some KSM** for testing transfers (get test KSM from faucets if needed)

## Getting Started

\`\`\`bash
# Clone the chaos
git clone https://github.com/your-username/kusamahub-site.git
cd kusamahub-site

# Install dependencies
pnpm install

# The postinstall script will fail on first run - this is expected
# It tries to generate chain descriptors which aren't needed for dev

# Start the development server
pnpm dev

# Open http://localhost:3000 and embrace the chaos
\`\`\`

## Running the Warp Drive (Cross-chain Transfers)

The Warp Drive feature enables real KSM transfers between Kusama and Asset Hub using XCM:

1. **Install a Polkadot Wallet Extension**
   - [Talisman](https://talisman.xyz/) (Recommended)
   - [SubWallet](https://subwallet.app/)
   - [Polkadot.js Extension](https://polkadot.js.org/extension/)

2. **Connect Your Wallet**
   - Navigate to http://localhost:3000/bridge
   - Click on the wallet connection prompt
   - Select your extension and authorize the connection
   - Choose an account with KSM balance

3. **Make a Transfer**
   - Select source chain (Kusama or Asset Hub)
   - Select destination chain (must be different)
   - Enter amount (leave some for fees)
   - Enter recipient address
   - Review and confirm the transaction
   - Sign with your wallet when prompted

### Troubleshooting Blockchain Features

**Balance not showing?**
- Wait 10-30 seconds for the light client to sync
- Check browser console for connection errors
- Ensure you have KSM on the selected chain
- Try refreshing the page

**Transfer failing?**
- Ensure you have enough KSM for fees (~0.01 KSM)
- Verify recipient address is valid for destination chain
- Check that amount doesn't exceed balance minus existential deposit
- Look for specific errors in wallet popup

**Smoldot worker errors?**
- The worker file is automatically loaded from public directory
- Clear browser cache if you see worker loading errors
- Check that port 3000/3001 isn't blocked by firewall

## Project Structure

\`\`\`
app/
├── arcade/          # Dapp discovery and launcher
├── big-wicks/       # Candle auction jackpots
├── pixel-pillage/   # Collaborative canvas
├── glitch-garden/   # Idle farming game
├── data-heist/      # Grid territory game
├── loot-tombola/    # Daily raffle system
├── bridge/          # KSM bridge to Asset Hub (LIVE with real transfers)
├── transmogrifier/  # EVM wrapper tool
├── bingo/           # Futarchy prediction markets
├── docs/            # Documentation and guides
└── globals.css      # Custom CSS and animations

components/
├── ui/              # shadcn/ui components
├── sound-provider/  # Audio context and controls
├── custom-cursor/   # Interactive cursor effects
└── microcopy/       # Anarchic competence voice

contexts/
└── extension-context.tsx  # Wallet connection management

hooks/
├── use-sound.ts     # Audio management
├── use-toast.ts     # Notification system
├── use-account.ts   # Account selection
├── use-balance.ts   # Real-time balance monitoring
└── use-transfer.ts  # XCM transfer management

lib/
└── blockchain/
    ├── api/         # Chain-specific implementations
    │   ├── clients/ # Polkadot API client instances
    │   └── ksm/     # Kusama & Asset Hub configs
    ├── common.ts    # XCM utilities and helpers
    ├── chains.ts    # Chain configurations
    ├── types.ts     # TypeScript definitions
    └── smoldot.ts   # Light client initialization

public/
└── smoldot-worker.js  # Web Worker for light client

.papi/
└── descriptors/       # Generated chain type definitions
\`\`\`

## Environment Variables

No environment variables are required! The app uses:
- Smoldot light client for trustless blockchain connection
- Browser wallet extensions for account management
- No API keys or RPC endpoints needed

Optional variables for future features:
\`\`\`bash
# Analytics (if you want to track chaos)
NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id
\`\`\`

## Contributing

We welcome contributions that embrace the chaos while maintaining functionality. 

### Guidelines:
- **Anarchic competence**: Build things that work, but with personality
- **No corporate speak**: Keep copy weird and human
- **Embrace the glitch**: Perfect is the enemy of interesting
- **Test on Kusama**: If it works on mainnet, it's probably too safe

### Development Principles:
1. **Functionality first**: It must work before it can be weird
2. **User experience**: Chaos should be intentional, not accidental
3. **Performance**: Fast and weird beats slow and pretty
4. **Accessibility**: Everyone deserves access to the chaos

## Deployment

### Vercel (Recommended)
\`\`\`bash
# Deploy to Vercel
pnpm build
vercel --prod
\`\`\`

### Self-hosted
\`\`\`bash
# Build for production
pnpm build

# Start production server
pnpm start
\`\`\`

## Roadmap

- [ ] Wallet integration (Polkadot.js, Talisman, SubWallet)
- [ ] Real blockchain interactions
- [ ] Mobile app (React Native)
- [ ] Browser extension
- [ ] Hardware wallet support
- [ ] Multi-language support (chaos is universal)

## Disclaimers

⚠️ **Not audited, barely tested, 100% live.**

This software is provided "as is" without warranty of any kind. Use at your own risk. We're not responsible for:
- Lost funds (check your addresses twice)
- Existential dread (comes with the territory)
- Addiction to chaos (seek help if needed)
- Spontaneous blockchain enlightenment (side effects may vary)

## License

MIT License - Because information wants to be free, and so does chaos.

---

*Built with love. Mostly spite.*

**fully open-source. sorry in advance.**
