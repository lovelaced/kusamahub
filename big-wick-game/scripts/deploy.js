const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying BigWickGame to Paseo TestNet...");
  
  // Check network
  const network = await ethers.provider.getNetwork();
  console.log("Network:", network.name, "Chain ID:", network.chainId.toString());
  
  // Get deployer account
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with account:", deployer.address);
  
  // Check balance
  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("Account balance:", ethers.formatEther(balance), "PAS");
  
  if (balance === 0n) {
    console.error("❌ Account has no PAS tokens. Please get tokens from the faucet:");
    console.error("🔗 https://faucet.polkadot.io/?parachain=1111");
    process.exit(1);
  }
  
  // Deploy contract
  console.log("\n📦 Deploying BigWickGame contract...");
  const BigWickGame = await ethers.getContractFactory("BigWickGame");
  const bigWickGame = await BigWickGame.deploy();
  
  await bigWickGame.waitForDeployment();
  const contractAddress = await bigWickGame.getAddress();
  
  console.log("✅ BigWickGame deployed to:", contractAddress);
  console.log("🔍 View on block explorer:", `https://blockscout-passet-hub.parity-testnet.parity.io/address/${contractAddress}`);
  
  // Test basic functionality
  console.log("\n🧪 Testing basic functionality...");
  
  // Start a new game
  console.log("Starting new game...");
  const tx = await bigWickGame.startNewGame();
  await tx.wait();
  
  const currentGameId = await bigWickGame.currentGameId();
  console.log("✅ Game started with ID:", currentGameId.toString());
  
  // Get game details
  const game = await bigWickGame.games(currentGameId);
  console.log("Game details:", {
    gameId: game.gameId.toString(),
    startTime: new Date(Number(game.startTime) * 1000).toLocaleString(),
    endingPeriodStart: new Date(Number(game.endingPeriodStart) * 1000).toLocaleString(),
    endTime: new Date(Number(game.endTime) * 1000).toLocaleString(),
    totalPot: ethers.formatEther(game.totalPot) + " PAS",
    state: ["NotStarted", "StartingPeriod", "EndingPeriod", "Ended"][game.state]
  });
  
  // Contract deployed and game started - ready for user interaction
  console.log("\n✅ Contract ready for user interaction - no test bids placed");
  
  console.log("\n🎉 Deployment and testing completed successfully!");
  console.log("\n📋 Contract Information:");
  console.log("  - Address:", contractAddress);
  console.log("  - Network: Paseo TestNet");
  console.log("  - Owner:", deployer.address);
  console.log("  - Current Game ID:", currentGameId.toString());
  
  console.log("\n🔧 Usage:");
  console.log("  - View contract:", `https://blockscout-passet-hub.parity-testnet.parity.io/address/${contractAddress}`);
  console.log("  - Interact via scripts:", `npx hardhat run scripts/interact.js --network passetHub`);
  console.log("  - Start new game:", `bigWickGame.startNewGame()`);
  console.log("  - Place bid:", `bigWickGame.placeBid(gameId, { value: ethers.parseEther('0.1') })`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });