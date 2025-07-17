const { ethers } = require("hardhat");

async function main() {
  console.log("=== SIMPLE DEPLOYMENT TEST ===");
  
  const [deployer] = await ethers.getSigners();
  console.log("Deployer:", deployer.address);
  
  // Test network connection
  const network = await ethers.provider.getNetwork();
  console.log("Network:", network.name, "Chain ID:", network.chainId.toString());
  
  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("Balance:", ethers.formatEther(balance), "PAS");
  
  // Get contract factory
  const PixelCanvas = await ethers.getContractFactory("PixelCanvas");
  const recipient = deployer.address;
  
  console.log("\nAttempting deployment...");
  
  try {
    const contract = await PixelCanvas.deploy(recipient, {
      gasLimit: 3000000,
      gasPrice: ethers.parseUnits("1", "gwei")
    });
    
    console.log("Deploy transaction sent:", contract.deploymentTransaction().hash);
    
    // Wait for confirmation
    const receipt = await contract.deploymentTransaction().wait();
    console.log("Deployment confirmed in block:", receipt.blockNumber);
    
    const address = await contract.getAddress();
    console.log("Contract deployed at:", address);
    
    // Test basic function
    const canvasWidth = await contract.CANVAS_WIDTH();
    console.log("Canvas width:", canvasWidth.toString());
    
  } catch (error) {
    console.error("Deployment error:", error.message);
    
    // Try to understand the error
    if (error.code === 'UNPREDICTABLE_GAS_LIMIT') {
      console.log("Gas limit unpredictable - trying lower gas limit");
    } else if (error.code === 'INSUFFICIENT_FUNDS') {
      console.log("Insufficient funds for gas");
    } else if (error.message.includes('Invalid Transaction')) {
      console.log("Transaction format invalid - checking network compatibility");
    }
  }
}

main();