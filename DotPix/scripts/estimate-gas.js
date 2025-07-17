const { ethers } = require("hardhat");

async function main() {
  console.log("=== GAS ESTIMATION ===");
  
  const [deployer] = await ethers.getSigners();
  const recipient = deployer.address;
  
  const PixelCanvas = await ethers.getContractFactory("PixelCanvas");
  
  try {
    console.log("Estimating deployment gas...");
    const deploymentTx = await PixelCanvas.getDeployTransaction(recipient);
    const gasEstimate = await ethers.provider.estimateGas(deploymentTx);
    console.log("Gas estimate:", gasEstimate.toString());
    
    const gasPrice = await ethers.provider.getFeeData();
    console.log("Gas price:", gasPrice.gasPrice ? gasPrice.gasPrice.toString() : "N/A");
    
    const cost = gasEstimate * (gasPrice.gasPrice || 1n);
    console.log("Estimated cost:", ethers.formatEther(cost), "PAS");
    
    // Check bytecode size
    const bytecode = PixelCanvas.bytecode;
    console.log("Bytecode size:", bytecode.length / 2, "bytes");
    
  } catch (error) {
    console.error("Gas estimation failed:", error);
  }
}

main();