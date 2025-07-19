# PvP Grid Frontend

A simple, responsive web interface for the PvP Grid blockchain game.

## Features

- **Modern UI**: Dark theme with gradient accents
- **Responsive Design**: Works on desktop and mobile devices
- **Real-time Updates**: Automatically updates when tiles are selected
- **Wallet Integration**: Easy MetaMask connection
- **Game Stats**: Track your tiles, games played, and wins
- **Recent Winners**: Display of recent game winners

## Setup

1. **Update Contract Address**:
   Edit `app.js` and update the `CONTRACT_ADDRESS` variable with your deployed contract address:
   ```javascript
   const CONTRACT_ADDRESS = "0xYOUR_CONTRACT_ADDRESS_HERE";
   ```

2. **Add Full Contract ABI**:
   Replace the simplified ABI in `app.js` with your full contract ABI from the compilation artifacts.

3. **Serve the Files**:
   You can use any web server to serve the files. For example:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js http-server
   npx http-server
   
   # Using Live Server in VS Code
   # Right-click index.html and select "Open with Live Server"
   ```

4. **Connect to Paseo TestNet**:
   The app will automatically prompt users to connect to Paseo TestNet when they connect their wallet.

## UI Components

### Header
- Logo/Title
- Wallet connection button
- Connected wallet address display

### Game Info Cards
- Current game ID and progress
- Prize pool breakdown (90% winner, 10% team)
- Entry fee information

### Game Grid
- 4x4 grid (16 tiles)
- Visual indicators for:
  - Available tiles (gray)
  - Selected tiles (purple gradient)
  - Your tiles (green gradient)
  - Winner tile (gold with pulse animation)

### Player Stats
- Number of tiles owned in current game
- Total games played
- Total games won

### Recent Winners
- Display of last 5 game winners
- Shows winner address and prize amount

## Customization

### Colors
Edit `styles.css` to change the color scheme:
- Primary gradient: `#667eea` to `#764ba2`
- Success color: `#10b981`
- Background: `#0a0b0d`
- Card background: `#1a1d24`

### Grid Size
While the smart contract is fixed at 4x4, you can adjust the visual size by modifying:
```css
.grid-wrapper {
    max-width: 500px; /* Change this value */
}
```

### Animations
The winner tile has a pulse animation. Customize in `styles.css`:
```css
@keyframes pulse {
    /* Modify animation properties */
}
```

## Development Tips

1. **Testing**: Use a test account with PAS tokens from the faucet
2. **Console Logs**: Check browser console for contract events and errors
3. **Mobile Testing**: Use browser developer tools to test responsive design
4. **Gas Estimation**: The app uses default gas limits; adjust if needed

## Troubleshooting

- **Wallet Not Connecting**: Ensure MetaMask is installed and unlocked
- **Wrong Network**: App will prompt to switch to Paseo automatically
- **Transaction Failed**: Check you have enough PAS for gas and entry fee
- **UI Not Updating**: Refresh the page or check console for errors

## Future Enhancements

- Add sound effects for tile selection and winning
- Implement tile selection animations
- Add game history/statistics page
- Create leaderboard functionality
- Add multi-language support
- Implement dark/light theme toggle