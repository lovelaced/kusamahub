const hre = require("hardhat");

async function main() {
  console.log("Deploying PvPGrid contracts...");

  // Get deployment parameters
  const entryFee = hre.ethers.parseEther("1"); // 1 PAS entry fee
  const gameFee = 1000; // 10% platform fee (1000 basis points)
  
  // IMPORTANT: Set your team wallet address here
  // You can use your own address or a separate team address
  // NOTE: Team wallet to be changed prior to mainnet deployment
  const teamWallet = process.env.TEAM_WALLET || "0x446b7036fCbfa3378b6fCDF66c7269d6473434bb";
  
  if (teamWallet === "0x0000000000000000000000000000000000000000") {
    console.error("\n❌ ERROR: You must set a team wallet address!");
    console.error("\nOption 1 - Use environment variable:");
    console.error("export TEAM_WALLET=0xYourWalletAddress");
    console.error("\nOption 2 - Edit this file directly:");
    console.error("Replace the default address in line 8 with your wallet address");
    console.error("\nThe team wallet will receive 10% of all game fees (1.6 PAS per full game)");
    process.exit(1);
  }

  // Deploy basic version
  const PvPGrid = await hre.ethers.getContractFactory("PvPGrid");
  const pvpGrid = await PvPGrid.deploy(entryFee, gameFee, teamWallet);
  await pvpGrid.waitForDeployment();
  const pvpGridAddress = await pvpGrid.getAddress();

  console.log(`PvPGrid deployed to: ${pvpGridAddress}`);
  console.log(`Entry fee: ${hre.ethers.formatEther(entryFee)} PAS`);
  console.log(`Game fee: ${gameFee / 100}%`);
  console.log(`Team wallet: ${teamWallet}`);

  // Deploy enhanced version (optional)
  const deployEnhanced = process.env.DEPLOY_ENHANCED === "true";
  
  if (deployEnhanced) {
    const PvPGridEnhanced = await hre.ethers.getContractFactory("PvPGridEnhanced");
    const pvpGridEnhanced = await PvPGridEnhanced.deploy(entryFee, gameFee, teamWallet);
    await pvpGridEnhanced.waitForDeployment();
    const enhancedAddress = await pvpGridEnhanced.getAddress();

    console.log(`PvPGridEnhanced deployed to: ${enhancedAddress}`);
  }

  // Create deployments directory if it doesn't exist
  const fs = require("fs");
  if (!fs.existsSync("deployments")) {
    fs.mkdirSync("deployments");
  }

  // Save deployment info
  const deploymentInfo = {
    network: hre.network.name,
    contracts: {
      PvPGrid: pvpGridAddress,
      ...(deployEnhanced && { PvPGridEnhanced: enhancedAddress }),
    },
    parameters: {
      entryFee: hre.ethers.formatEther(entryFee) + " PAS",
      gameFee: gameFee / 100 + "%",
      teamWallet: teamWallet,
    },
    deployedAt: new Date().toISOString(),
  };

  fs.writeFileSync(
    `deployments/${hre.network.name}.json`,
    JSON.stringify(deploymentInfo, null, 2)
  );

  console.log("\nDeployment complete!");
  console.log("Deployment info saved to:", `deployments/${hre.network.name}.json`);
  
  // Provide instructions for interacting with the contract
  console.log("\n=== How to interact with the contract ===");
  console.log("1. Players call selectTile(tileIndex) with 1 PAS to select a tile (0-15)");
  console.log("2. When all 16 tiles are selected, anyone can call determineWinner()");
  console.log("3. Winner gets 90% of the prize pool (14.4 PAS)");
  console.log("4. Team wallet gets 10% of the prize pool (1.6 PAS)");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});