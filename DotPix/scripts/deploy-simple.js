const { ethers } = require("hardhat");

async function main() {
  console.log("=== SIMPLE PIXELCANVAS DEPLOYMENT ===");
  
  const [deployer] = await ethers.getSigners();
  console.log("Deployer:", deployer.address);
  
  const SimplePixelCanvas = await ethers.getContractFactory("SimplePixelCanvas");
  const recipient = deployer.address;
  
  try {
    console.log("Deploying SimplePixelCanvas...");
    const contract = await SimplePixelCanvas.deploy(recipient);
    
    console.log("Transaction hash:", contract.deploymentTransaction().hash);
    await contract.waitForDeployment();
    
    const address = await contract.getAddress();
    console.log("✅ SimplePixelCanvas deployed at:", address);
    
    // Test basic functionality
    const owner = await contract.owner();
    const canvasWidth = await contract.CANVAS_WIDTH();
    console.log("Owner:", owner);
    console.log("Canvas width:", canvasWidth.toString());
    
    return address;
    
  } catch (error) {
    console.error("❌ Deployment failed:", error.message);
    throw error;
  }
}

main();