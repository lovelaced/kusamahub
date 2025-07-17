const { ethers } = require("hardhat");

async function main() {
  console.log("=== DOTPIX PASEO DEPLOYMENT ===");
  
  // Get the deployer account
  const [deployer] = await ethers.getSigners();
  console.log("Deploying from account:", deployer.address);
  
  // Check balance
  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("Account balance:", ethers.formatEther(balance), "PAS");
  
  // Deploy contract
  const recipient = deployer.address; // Use deployer as recipient for simplicity
  console.log("Fee recipient address:", recipient);
  
  console.log("\nDeploying PixelCanvas contract...");
  const PixelCanvas = await ethers.getContractFactory("PixelCanvas");
  
  // Deploy with higher gas limit
  const pixelCanvas = await PixelCanvas.deploy(recipient, {
    gasLimit: 5000000
  });
  
  console.log("Transaction hash:", pixelCanvas.deploymentTransaction().hash);
  console.log("Waiting for deployment confirmation...");
  
  // Wait for deployment
  await pixelCanvas.waitForDeployment();
  const contractAddress = await pixelCanvas.getAddress();
  
  console.log("\n🎉 DEPLOYMENT SUCCESSFUL!");
  console.log("Contract deployed to:", contractAddress);
  console.log("Owner:", await pixelCanvas.owner());
  console.log("Recipient:", await pixelCanvas.recipient());
  console.log("Canvas dimensions:", await pixelCanvas.CANVAS_WIDTH(), "x", await pixelCanvas.CANVAS_HEIGHT());
  
  // Save deployment info
  const deploymentInfo = {
    contractAddress,
    deploymentTransaction: pixelCanvas.deploymentTransaction().hash,
    network: "passetHub",
    chainId: "420420422",
    deployer: deployer.address,
    recipient: recipient,
    timestamp: new Date().toISOString()
  };
  
  const fs = require('fs');
  fs.writeFileSync('deployment-info.json', JSON.stringify(deploymentInfo, null, 2));
  console.log("Deployment info saved to deployment-info.json");
  
  console.log("\n=== NEXT STEPS ===");
  console.log("1. Verify on block explorer:", `https://blockscout-passet-hub.parity-testnet.parity.io/address/${contractAddress}`);
  console.log("2. Update frontend .env with:", `VITE_CONTRACT_ADDRESS=${contractAddress}`);
  console.log("3. Run integration tests");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Deployment failed:", error);
    process.exit(1);
  });