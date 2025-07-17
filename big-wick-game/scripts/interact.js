const { ethers } = require("hardhat");

async function main() {
  // Get the deployed contract
  const BigWickGame = await ethers.getContractFactory("BigWickGame");
  
  // If you have a deployed contract address, use:
  // const bigWickGame = BigWickGame.attach("CONTRACT_ADDRESS");
  
  // For local testing, deploy a new instance
  const bigWickGame = await BigWickGame.deploy();
  await bigWickGame.waitForDeployment();
  
  console.log("BigWickGame deployed to:", await bigWickGame.getAddress());
  
  // Start a new game
  console.log("\nStarting new game...");
  const tx = await bigWickGame.startNewGame();
  await tx.wait();
  
  const currentGameId = await bigWickGame.currentGameId();
  console.log("Current game ID:", currentGameId.toString());
  
  // Get game details
  const game = await bigWickGame.games(currentGameId);
  console.log("Game details:", {
    gameId: game.gameId.toString(),
    startTime: new Date(Number(game.startTime) * 1000).toISOString(),
    endingPeriodStart: new Date(Number(game.endingPeriodStart) * 1000).toISOString(),
    endTime: new Date(Number(game.endTime) * 1000).toISOString(),
    totalPot: ethers.formatEther(game.totalPot),
    state: game.state.toString()
  });
  
  // Get game state
  const gameState = await bigWickGame.getGameState(currentGameId);
  const stateNames = ["NotStarted", "StartingPeriod", "EndingPeriod", "Ended"];
  console.log("Game state:", stateNames[gameState]);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });