# BIG WICK Game - Deployment Guide

## Prerequisites

1. **Node.js** (v18 or higher)
2. **npm** or **yarn**
3. **Paseo TestNet account** with PAS tokens
4. **Private key** for your TestNet account

## Setup Steps

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the project root:

```bash
# Copy the example and edit
cp .env.example .env
```

Edit `.env` and add your private key:

```env
PRIVATE_KEY=your_private_key_here_without_0x_prefix
REPORT_GAS=true
```

**⚠️ Important Security Notes:**
- Never commit your `.env` file to version control
- Never share your private key
- Only use TestNet accounts, never mainnet keys
- The `.env` file is already in `.gitignore`

### 3. Get TestNet Tokens

You need PAS tokens to deploy and interact with the contract:

1. Visit the faucet: https://faucet.polkadot.io/?parachain=1111
2. Enter your account address
3. Request PAS tokens
4. Wait for confirmation

### 4. Test Your Setup

Compile the contract to ensure everything is working:

```bash
npm run compile
```

Run tests to verify the contract:

```bash
npm test
```

## Deployment Options

### Option 1: Simple Deployment (Recommended)

Use the custom deployment script that includes testing:

```bash
npm run deploy:paseo
```

This script will:
- Check your account balance
- Deploy the contract
- Start a test game
- Place a test bid
- Display all relevant information

### Option 2: Hardhat Ignition Deployment

Use Hardhat's Ignition system:

```bash
npm run deploy:paseo:ignition
```

This provides more advanced deployment features but requires manual testing.

## Network Configuration

The project is configured for Paseo TestNet with these settings:

- **Network**: Polkadot Hub TestNet (Paseo)
- **Chain ID**: 420420422 (0x1911f0a6)
- **RPC URL**: https://testnet-passet-hub-eth-rpc.polkadot.io
- **Block Explorer**: https://blockscout-passet-hub.parity-testnet.parity.io
- **Currency**: PAS
- **PolkaVM**: Enabled

## Post-Deployment

### 1. Verify Deployment

After deployment, you'll see output like:

```
✅ BigWickGame deployed to: 0x1234567890abcdef...
🔍 View on block explorer: https://blockscout-passet-hub.parity-testnet.parity.io/address/0x1234567890abcdef...
```

### 2. Interact with Contract

Use the interaction script to test your deployed contract:

```bash
npm run interact:paseo
```

### 3. Manual Testing

You can manually test the contract functions:

1. **Start a new game** (owner only)
2. **Place bids** from different accounts
3. **Wait for game to end** (or use time manipulation in tests)
4. **End the game** and determine winner
5. **Withdraw prizes**

## Contract Functions

### Owner Functions
- `startNewGame()` - Start a new auction game
- `withdrawTreasury()` - Withdraw accumulated treasury funds
- `emergencyEndGame(gameId)` - Emergency end a game

### Player Functions
- `placeBid(gameId)` - Place a bid (payable)
- `withdraw()` - Withdraw won prizes
- `getPlayerBid(gameId, player)` - View player's bid information

### View Functions
- `getGameState(gameId)` - Get current game state
- `getGamePlayers(gameId)` - Get list of players
- `getGamePlayerCount(gameId)` - Get player count
- `games(gameId)` - Get full game information

## Game Flow

1. **Owner starts game** → 2-day starting period begins
2. **Players place bids** → Bids accumulate for each player
3. **Ending period starts** → 5-day candle auction period
4. **Game ends** → Anyone can call `endGame()` after 7 days total
5. **Winner determined** → Based on highest bid before random candle end
6. **Prizes distributed** → 90% to winner, 10% to treasury
7. **Players withdraw** → Winners call `withdraw()` to get prizes

## Security Considerations

- Contract uses withdrawal pattern to prevent reentrancy attacks
- All funds are held in the contract until withdrawal
- Emergency functions available for owner intervention
- Comprehensive input validation and error handling

## Troubleshooting

### Common Issues

1. **"Account has no PAS tokens"**
   - Get tokens from faucet: https://faucet.polkadot.io/?parachain=1111
   - Wait for confirmation before deploying

2. **"Cannot find value for PRIVATE_KEY"**
   - Ensure `.env` file exists and contains your private key
   - Check that private key is without `0x` prefix

3. **"initcode is too big"**
   - Contract is optimized for Paseo's 100KB limit
   - If you modified the contract, ensure it's still under the limit

4. **"CodeRejected" error**
   - Ensure `polkavm: true` is set in network config
   - Check that you're using the correct Solidity version (0.8.28)

5. **Network connection issues**
   - Verify RPC URL is accessible
   - Check if Paseo TestNet is operational

### Getting Help

1. Check the README.md for general information
2. Review the contract source code and tests
3. Test on local network first using `npm run deploy:local`
4. Use block explorer to verify transactions

## Next Steps

After successful deployment:

1. **Test thoroughly** with multiple accounts
2. **Document contract address** for frontend integration
3. **Monitor gas usage** and optimize if needed
4. **Consider security audit** before mainnet deployment
5. **Build frontend** to interact with the contract

## Contract Addresses

Keep track of your deployed contracts:

```
Paseo TestNet: 0x... (add your deployed address here)
```

## Additional Resources

- [Paseo TestNet Documentation](https://wiki.polkadot.network/docs/learn-parachains-test-networks)
- [Hardhat Documentation](https://hardhat.org/docs)
- [Solidity Documentation](https://docs.soliditylang.org/)
- [Block Explorer](https://blockscout-passet-hub.parity-testnet.parity.io)