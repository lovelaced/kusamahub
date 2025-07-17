const { ethers } = require("hardhat");

async function main() {
  console.log("=== PIXELCANVAS DEPLOYMENT ===");
  
  const [deployer] = await ethers.getSigners();
  console.log("Deployer:", deployer.address);
  
  const PixelCanvas = await ethers.getContractFactory("PixelCanvas");
  const recipient = deployer.address;
  
  console.log("Recipient:", recipient);
  
  try {
    // Check if address is valid
    if (!ethers.isAddress(recipient)) {
      throw new Error("Invalid recipient address");
    }
    
    console.log("Deploying PixelCanvas...");
    
    // Deploy with specific gas settings
    const contract = await PixelCanvas.deploy(recipient, {
      gasLimit: 5000000,
      maxFeePerGas: ethers.parseUnits("10", "gwei"),
      maxPriorityFeePerGas: ethers.parseUnits("1", "gwei")
    });
    
    console.log("Transaction hash:", contract.deploymentTransaction().hash);
    console.log("Waiting for deployment...");
    
    await contract.waitForDeployment();
    const address = await contract.getAddress();
    
    console.log("✅ PixelCanvas deployed at:", address);
    
    // Verify deployment
    console.log("Verifying deployment...");
    const owner = await contract.owner();
    const contractRecipient = await contract.recipient();
    const canvasWidth = await contract.CANVAS_WIDTH();
    const canvasHeight = await contract.CANVAS_HEIGHT();
    
    console.log("Owner:", owner);
    console.log("Recipient:", contractRecipient);
    console.log("Canvas size:", canvasWidth.toString(), "x", canvasHeight.toString());
    
    // Save deployment info
    const deploymentInfo = {
      contractAddress: address,
      network: "passetHub",
      chainId: "420420422",
      deployer: deployer.address,
      recipient: recipient,
      timestamp: new Date().toISOString(),
      transactionHash: contract.deploymentTransaction().hash,
      blockNumber: (await contract.deploymentTransaction().wait()).blockNumber
    };
    
    const fs = require('fs');
    fs.writeFileSync('deployment-info.json', JSON.stringify(deploymentInfo, null, 2));
    
    console.log("\n🎉 DEPLOYMENT SUCCESSFUL!");
    console.log("Contract Address:", address);
    console.log("Block Explorer:", `https://blockscout-passet-hub.parity-testnet.parity.io/address/${address}`);
    
    return address;
    
  } catch (error) {
    console.error("❌ Deployment failed:", error);
    
    // Detailed error analysis
    if (error.code === 'CALL_EXCEPTION') {
      console.error("Contract call failed - check constructor parameters");
    } else if (error.code === 'INSUFFICIENT_FUNDS') {
      console.error("Insufficient funds for deployment");
    } else if (error.message.includes('Invalid Transaction')) {
      console.error("Transaction format invalid - possible network compatibility issue");
    } else if (error.message.includes('gas')) {
      console.error("Gas-related error - try adjusting gas limit");
    }
    
    throw error;
  }
}

main()
  .then((address) => {
    console.log("\n=== NEXT STEPS ===");
    console.log("1. Update frontend .env:", `VITE_CONTRACT_ADDRESS=${address}`);
    console.log("2. Run integration tests");
    console.log("3. Deploy frontend with contract address");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Fatal deployment error:", error.message);
    process.exit(1);
  });