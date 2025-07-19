# PvP Grid Game

A blockchain-based 4x4 grid lottery game where players compete for a prize pool.

## Game Rules

1. **Grid Size**: 4x4 (16 tiles total)
2. **Entry Fee**: 1 PAS per tile
3. **Prize Distribution**: 
   - Winner: 90% of prize pool (14.4 PAS with full grid)
   - Team/Developer: 10% of prize pool (1.6 PAS with full grid)
4. **Winner Selection**: Randomly selected using blockchain randomness after all tiles are filled

## How It Works

1. Players select tiles by calling `selectTile(tileIndex)` with 1 PAS
2. Each player can select multiple tiles (up to 8 tiles max per player)
3. Once all 16 tiles are selected, anyone can call `determineWinner()`
4. The winner is determined using the block hash of the block after the last tile selection
5. Prize is automatically distributed to the winner and team wallet

## Contracts

### PvPGrid.sol
Basic implementation with core functionality:
- Single tile selection
- Automatic winner determination
- Admin functions for fee updates

### PvPGridEnhanced.sol
Enhanced version with additional features:
- Multiple tile selection in one transaction
- Player statistics tracking
- Minimum player requirements
- Emergency winner determination
- Pause functionality
- Refund mechanism if minimum players not met

## Deployment

### Prerequisites
```bash
npm install
```

### Set Private Key
```bash
npx hardhat vars set PRIVATE_KEY
```

### Deploy to Paseo TestNet
```bash
# Set team wallet address
export TEAM_WALLET=0xYourTeamWalletAddress

# Deploy contracts
npx hardhat run scripts/deploy.js --network passetHub

# Or use Ignition (requires parameters file)
npx hardhat ignition deploy ./ignition/modules/PvPGrid.js --network passetHub --parameters ./parameters.json
```

### Deploy to Local Network
```bash
# Start local node
npx hardhat node

# In another terminal
npx hardhat run scripts/deploy.js --network localhost
```

## Testing

```bash
npx hardhat test
```

## Contract Functions

### Player Functions
- `selectTile(uint256 tileIndex)` - Select a single tile (requires 1 PAS)
- `selectMultipleTiles(uint256[] tileIndexes)` - Select multiple tiles (Enhanced version only)
- `determineWinner()` - Determine the winner (callable by anyone after grid is full)

### View Functions
- `getGrid()` - Get current grid state
- `getTileOwner(uint256 tileIndex)` - Get owner of specific tile
- `isGameComplete()` - Check if all tiles are selected
- `canDetermineWinner()` - Check if winner can be determined
- `getAvailableTiles()` - Get list of available tile indexes (Enhanced version)

### Admin Functions
- `updateEntryFee(uint256 _newFee)` - Update entry fee (only between games)
- `updateGameFee(uint256 _newFee)` - Update platform fee percentage
- `updateTeamWallet(address _newWallet)` - Update team wallet address
- `setPaused(bool _paused)` - Pause/unpause contract (Enhanced version)

## Security Considerations

1. **Randomness**: Uses future block hash to prevent manipulation by last player
2. **Reentrancy Protection**: Enhanced version includes reentrancy guards
3. **Player Limits**: Maximum 8 tiles per player to prevent monopolization
4. **Emergency Functions**: Admin can determine winner if block hash expires
5. **Refund Mechanism**: Automatic refunds if minimum player count not met

## Gas Optimization

The contracts are optimized for Paseo TestNet's 100KB bytecode limit:
- Minimal external dependencies
- Custom implementations instead of OpenZeppelin
- Efficient data structures
- Optimized compiler settings

## License

MIT