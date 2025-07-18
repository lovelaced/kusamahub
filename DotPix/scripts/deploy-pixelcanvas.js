/**
 * PixelCanvas Deployment Script
 * 
 * This script deploys the optimized PixelCanvas contract to PASEO testnet.
 * The contract features:
 * - Gas-optimized storage (67% reduction)
 * - Batch pixel placement (up to 100 pixels)
 * - Real-time event emission for frontend updates
 * - Reentrancy protection and fee distribution
 */

const { ethers } = require("hardhat");

async function main() {
  console.log("🚀 Starting PixelCanvas deployment to PASEO...");
  console.log("=" * 50);
  
  // Get the deployer account
  const [deployer] = await ethers.getSigners();
  console.log("📝 Deploying with account:", deployer.address);
  
  // Check balance
  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("💰 Account balance:", ethers.formatEther(balance), "PAS");
  
  if (balance < ethers.parseEther("0.1")) {
    console.log("⚠️  Warning: Low balance. Ensure you have enough PAS for deployment.");
  }
  
  // Get recipient address (defaults to deployer)
  const recipient = process.env.RECIPIENT_ADDRESS || deployer.address;
  console.log("🎯 Fee recipient:", recipient);
  
  console.log("\n📋 Contract Configuration:");
  console.log("  - Canvas Size: 2000x2000 pixels (4M total)");
  console.log("  - Base Fee: 0.001 PAS per pixel");
  console.log("  - Batch Size: Up to 100 pixels");
  console.log("  - Fee Distribution: 49% burned, 51% to recipient");
  console.log("  - Storage: Gas-optimized packed pixel data");
  
  try {
    console.log("\n🔨 Compiling contracts...");
    
    // Get the contract factory
    const PixelCanvas = await ethers.getContractFactory("PixelCanvas");
    
    console.log("📦 Deploying PixelCanvas contract...");
    
    // Deploy the contract
    const pixelCanvas = await PixelCanvas.deploy(recipient, {
      // Add some buffer gas to ensure deployment succeeds
      gasLimit: 3000000
    });
    
    console.log("⏳ Waiting for deployment confirmation...");
    await pixelCanvas.waitForDeployment();
    
    const contractAddress = await pixelCanvas.getAddress();
    
    console.log("\n🎉 PixelCanvas deployed successfully!");
    console.log("=" * 50);
    console.log("📍 Contract Address:", contractAddress);
    console.log("🎯 Recipient Address:", recipient);
    console.log("⛽ Network: PASEO Testnet (Chain ID: 420420422)");
    console.log("🔗 Explorer: https://blockscout-passet-hub.parity-testnet.parity.io/address/" + contractAddress);
    
    // Test basic functionality
    console.log("\n🧪 Testing basic functionality...");
    
    try {
      // Test constants
      const canvasWidth = await pixelCanvas.CANVAS_WIDTH();
      const canvasHeight = await pixelCanvas.CANVAS_HEIGHT();
      const baseFee = await pixelCanvas.BASE_PIXEL_FEE();
      
      console.log("✓ Canvas dimensions:", canvasWidth.toString(), "x", canvasHeight.toString());
      console.log("✓ Base pixel fee:", ethers.formatEther(baseFee), "PAS");
      
      // Test fee calculation
      const singleFee = await pixelCanvas.calculatePixelFee(1);
      const batchFee5 = await pixelCanvas.calculatePixelFee(5);
      const batchFee10 = await pixelCanvas.calculatePixelFee(10);
      
      console.log("✓ 1 pixel fee:", ethers.formatEther(singleFee), "PAS");
      console.log("✓ 5 pixel fee:", ethers.formatEther(batchFee5), "PAS");
      console.log("✓ 10 pixel fee:", ethers.formatEther(batchFee10), "PAS");
      
      // Test coordinate conversion
      const pixelId = await pixelCanvas.getPixelId(100, 200);
      const [x, y] = await pixelCanvas.getPixelCoordinates(pixelId);
      
      console.log("✓ Coordinate conversion test: (100, 200) -> ID", pixelId.toString(), "-> (", x.toString(), ",", y.toString(), ")");
      
      console.log("\n🔥 Ready for frontend integration!");
      console.log("Update your .env file:");
      console.log(`VITE_CONTRACT_ADDRESS=${contractAddress}`);
      
    } catch (testError) {
      console.log("⚠️  Basic functionality test failed:", testError.message);
      console.log("Contract deployed but may need investigation.");
    }
    
  } catch (error) {
    console.error("❌ Deployment failed:");
    console.error(error.message);
    
    if (error.message.includes("insufficient funds")) {
      console.log("\n💡 Solution: Get more PAS tokens from the faucet:");
      console.log("   https://faucet.polkadot.io/?parachain=1111");
    } else if (error.message.includes("nonce too high")) {
      console.log("\n💡 Solution: Reset your MetaMask account nonce or wait a moment and retry.");
    } else if (error.message.includes("gas")) {
      console.log("\n💡 Solution: The contract might be too large. Check compiler optimizations.");
    }
    
    process.exitCode = 1;
  }
}

// Run the deployment
main().catch((error) => {
  console.error("💥 Unhandled error:", error);
  process.exitCode = 1;
});