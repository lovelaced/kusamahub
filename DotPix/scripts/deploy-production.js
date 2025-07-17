const { ethers } = require("hardhat");

async function main() {
  console.log("=== PRODUCTION PIXELCANVAS DEPLOYMENT ===");
  
  const [deployer] = await ethers.getSigners();
  console.log("Deployer:", deployer.address);
  
  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("Balance:", ethers.formatEther(balance), "PAS");
  
  const PixelCanvasV2 = await ethers.getContractFactory("PixelCanvasV2");
  const recipient = deployer.address;
  
  try {
    console.log("Deploying PixelCanvasV2...");
    const contract = await PixelCanvasV2.deploy(recipient);
    
    console.log("Transaction hash:", contract.deploymentTransaction().hash);
    console.log("Waiting for deployment confirmation...");
    
    await contract.waitForDeployment();
    const address = await contract.getAddress();
    
    console.log("✅ PixelCanvasV2 deployed successfully!");
    console.log("Contract address:", address);
    
    // Verify deployment
    console.log("\n=== DEPLOYMENT VERIFICATION ===");
    const owner = await contract.owner();
    const contractRecipient = await contract.recipient();
    const canvasWidth = await contract.CANVAS_WIDTH();
    const canvasHeight = await contract.CANVAS_HEIGHT();
    const baseFee = await contract.BASE_PIXEL_FEE();
    
    console.log("Owner:", owner);
    console.log("Recipient:", contractRecipient);
    console.log("Canvas dimensions:", canvasWidth.toString(), "x", canvasHeight.toString());
    console.log("Base fee:", ethers.formatEther(baseFee), "PAS");
    
    // Test basic functionality
    console.log("\n=== FUNCTIONALITY TEST ===");
    const pixelId = await contract.getPixelId(0, 0);
    console.log("Pixel ID for (0,0):", pixelId.toString());
    
    const fee = await contract.calculatePixelFee(1);
    console.log("Fee for 1 pixel:", ethers.formatEther(fee), "PAS");
    
    const batchFee = await contract.calculatePixelFee(5);
    console.log("Fee for 5 pixels:", ethers.formatEther(batchFee), "PAS");
    
    // Save deployment information
    const deploymentInfo = {
      contractAddress: address,
      contractName: "PixelCanvasV2",
      network: "passetHub",
      chainId: "420420422",
      deployer: deployer.address,
      recipient: recipient,
      owner: owner,
      canvasSize: `${canvasWidth}x${canvasHeight}`,
      baseFee: ethers.formatEther(baseFee),
      timestamp: new Date().toISOString(),
      transactionHash: contract.deploymentTransaction().hash,
      blockNumber: (await contract.deploymentTransaction().wait()).blockNumber,
      gasUsed: (await contract.deploymentTransaction().wait()).gasUsed.toString()
    };
    
    const fs = require('fs');
    fs.writeFileSync('deployment-info.json', JSON.stringify(deploymentInfo, null, 2));
    console.log("\nDeployment info saved to deployment-info.json");
    
    return address;
    
  } catch (error) {
    console.error("❌ Deployment failed:", error.message);
    throw error;
  }
}

main()
  .then((address) => {
    console.log("\n🎉 DEPLOYMENT COMPLETE!");
    console.log("Contract Address:", address);
    console.log("Block Explorer:", `https://blockscout-passet-hub.parity-testnet.parity.io/address/${address}`);
    console.log("\n=== NEXT STEPS ===");
    console.log("1. Update frontend environment:");
    console.log(`   echo "VITE_CONTRACT_ADDRESS=${address}" > frontend/.env`);
    console.log("2. Run integration tests");
    console.log("3. Deploy frontend to production");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Fatal error:", error.message);
    process.exit(1);
  });