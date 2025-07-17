# BIG WICK Game - Frontend

A minimal MVP web interface for the BIG WICK candle auction game on Paseo TestNet.

## Features

- **Wallet Connection**: Connect MetaMask to interact with the game
- **Game Status**: View current game state, prize pot, and player count
- **Timeline**: Visual timeline showing game phases (Starting Period → Ending Period → Ended)
- **Bidding**: Place bids during active games
- **Leaderboard**: View top bidders in real-time
- **Admin Controls**: Owner can start games, end games, and withdraw treasury
- **Responsive Design**: Works on desktop and mobile

## Setup

1. **Install MetaMask**: Make sure you have MetaMask extension installed
2. **Add Paseo TestNet**: The app will automatically prompt to add/switch to Paseo TestNet
3. **Get PAS Tokens**: Visit https://faucet.polkadot.io/?parachain=1111 to get test tokens
4. **Start Server**: Run `npm run serve` from the project root
5. **Open Browser**: Navigate to http://localhost:3000

## Network Configuration

The app automatically configures MetaMask with:
- **Chain ID**: 420420422 (0x1911f0a6)
- **Network**: Polkadot Hub TestNet
- **Currency**: PAS
- **RPC**: https://testnet-passet-hub-eth-rpc.polkadot.io
- **Explorer**: https://blockscout-passet-hub.parity-testnet.parity.io

## Usage

### For Players
1. **Connect Wallet**: Click "Connect MetaMask" and approve the connection
2. **View Game**: See current game status, timeline, and leaderboard
3. **Place Bids**: Enter bid amount and click "Place Bid" during active games
4. **Track Progress**: Monitor your total bids and ranking

### For Admin (Contract Owner)
1. **Start Game**: Click "Start New Game" to begin a new auction
2. **End Game**: Click "End Current Game" after the time period expires
3. **Withdraw**: Click "Withdraw Treasury" to collect the 10% treasury funds

## Game Mechanics

- **Starting Period**: 2 days of regular bidding
- **Ending Period**: 5 days of candle auction (can end at any random time)
- **Cumulative Bids**: Multiple bids from the same player are added together
- **Prize Distribution**: 90% to winner, 10% to treasury
- **Winner Selection**: Player with highest total bid before the random "candle end" time

## Technical Details

### Contract Integration
- Uses Ethers.js v6 for blockchain interaction
- Automatically refreshes game data every 10 seconds
- Handles MetaMask connection and network switching
- Provides real-time updates during active games

### Security
- All sensitive operations require MetaMask confirmation
- Network validation ensures connection to correct testnet
- Error handling for failed transactions
- Input validation for bid amounts

## Files

- `index.html`: Main HTML structure
- `styles.css`: Responsive CSS styling
- `app.js`: JavaScript application logic
- `contract-abi.js`: Contract ABI and configuration
- `server.js`: Local development server

## Browser Support

- Chrome/Chromium with MetaMask
- Firefox with MetaMask
- Safari with MetaMask
- Edge with MetaMask

## Troubleshooting

### Common Issues

1. **MetaMask not detected**: Ensure MetaMask extension is installed and enabled
2. **Wrong network**: App will prompt to switch to Paseo TestNet
3. **No PAS tokens**: Get tokens from the faucet before placing bids
4. **Transaction failed**: Check you have enough PAS for gas fees
5. **Game not loading**: Refresh the page and ensure wallet is connected

### Error Messages

- "MetaMask is not installed": Install MetaMask browser extension
- "Failed to connect wallet": Try refreshing and connecting again
- "Failed to place bid": Check bid amount and account balance
- "Game has ended": Cannot place bids after game ends

## Development

To modify the frontend:

1. Edit the HTML structure in `index.html`
2. Update styling in `styles.css`
3. Modify functionality in `app.js`
4. Test changes by running `npm run serve`

The frontend is vanilla JavaScript for simplicity and can be easily extended with frameworks like React or Vue.js if needed.

## Next Steps

Potential enhancements:
- Real-time WebSocket updates
- More detailed game history
- Mobile app version
- Advanced charting/visualization
- Social features and sharing