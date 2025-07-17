# BIG WICK Game

A blockchain-based candle auction game inspired by Polkadot parachain auctions, deployed on Polkadot Hub TestNet (Paseo).

## Overview

BIG WICK is a competitive auction game where players bid for a prize pot using a "candle auction" mechanism. Unlike traditional auctions, the ending time is determined retroactively using randomness, creating an exciting and fair gaming experience.

## Game Mechanics

### Auction Phases
1. **Starting Period**: 2 days - Players can place bids, but no candle mechanism is active
2. **Ending Period**: 5 days - The candle auction period where the game could end at any point
3. **Ended**: Game is finished and winner determined

### Key Features
- **Cumulative Bidding**: Players can place multiple bids that accumulate
- **Candle Auction**: Winner is determined based on bids placed before a randomly selected "candle end" time
- **Prize Distribution**: 90% to winner, 10% to treasury
- **Withdrawal Pattern**: Secure prize distribution using withdrawal mechanism

## Smart Contract Details

### Core Functions

- `startNewGame()`: Owner can start a new game
- `placeBid(gameId)`: Players can place bids (payable)
- `endGame(gameId)`: Anyone can end the game after the time period
- `withdraw()`: Winners can withdraw their prizes
- `withdrawTreasury()`: Owner can withdraw treasury funds

### Game States

- `NotStarted`: No game is active
- `StartingPeriod`: Game is in the 2-day starting phase
- `EndingPeriod`: Game is in the 5-day ending phase
- `Ended`: Game has concluded

## Development Setup

### Prerequisites

- Node.js v18+
- npm or yarn

### Installation

```bash
npm install
```

### Configuration

The project uses Hardhat with the Parity Polkadot plugin for deployment to Paseo TestNet.

### Testing

Run all tests:
```bash
npm test
```

### Compilation

```bash
npm run compile
```

### Configuration

1. Copy the environment file and configure your private key:
```bash
cp .env.example .env
# Edit .env and add your private key
```

2. Get PAS tokens from the faucet:
```bash
# Visit: https://faucet.polkadot.io/?parachain=1111
```

### Deployment

Local deployment:
```bash
npm run deploy:local
```

Paseo TestNet deployment:
```bash
# Deploy with comprehensive testing
npm run deploy:paseo

# Or use Hardhat Ignition
npm run deploy:paseo:ignition
```

**📋 For detailed deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md)**

### Interaction

```bash
npm run interact
```

## Project Structure

```
big-wick-game/
├── contracts/
│   └── BigWickGame.sol          # Main game contract
├── test/
│   └── BigWickGame.test.js      # Comprehensive tests
├── scripts/
│   └── interact.js              # Interaction script
├── ignition/
│   └── modules/
│       └── BigWickGame.js       # Deployment module
├── hardhat.config.js            # Hardhat configuration
└── package.json
```

## Contract Architecture

### State Variables

- `currentGameId`: ID of the current game
- `games`: Mapping of game ID to Game struct
- `gamePlayers`: Mapping of game ID to player data
- `gamePlayerList`: Array of players for each game
- `pendingWithdrawals`: Withdrawal pattern for secure prize distribution

### Events

- `GameStarted`: Emitted when a new game begins
- `BidPlaced`: Emitted when a player places a bid
- `GameEnded`: Emitted when a game concludes
- `CandleEndDetermined`: Emitted when the random candle end is determined
- `WithdrawalReady`: Emitted when funds are ready for withdrawal

## Security Features

- **Withdrawal Pattern**: Prevents reentrancy attacks
- **Owner Controls**: Only owner can start games and access treasury
- **Input Validation**: Comprehensive checks for all inputs
- **Emergency Functions**: Owner can emergency end games if needed

## Gas Optimization

The contract is optimized for Paseo TestNet's ~100KB bytecode limit:
- Minimal external dependencies
- Efficient storage patterns
- Optimized loops and calculations

## Testing

The project includes comprehensive tests covering:
- Game lifecycle management
- Bidding mechanics
- State transitions
- Winner determination
- Prize distribution
- Security features
- Edge cases

## Future Enhancements

- VRF integration for true randomness
- Frontend UI development
- Multi-token support
- Advanced analytics
- Social features

## License

MIT License

## Contributing

1. Fork the repository
2. Create a feature branch
3. Add tests for new features
4. Ensure all tests pass
5. Submit a pull request

## Support

For issues and questions, please create an issue in the repository.