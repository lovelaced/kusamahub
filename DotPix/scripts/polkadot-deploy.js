const { ethers } = require("hardhat");

async function main() {
  console.log("=== POLKADOT DEPLOYMENT ===");
  
  const [deployer] = await ethers.getSigners();
  const recipient = deployer.address;
  
  console.log("Deployer:", deployer.address);
  console.log("Recipient:", recipient);
  
  const PixelCanvas = await ethers.getContractFactory("PixelCanvas");
  
  try {
    console.log("Deploying with PolkaVM settings...");
    
    const contract = await PixelCanvas.deploy(recipient, {
      gasLimit: 5000000,
      // No gasPrice specification - let network handle it
    });
    
    console.log("Transaction hash:", contract.deploymentTransaction().hash);
    console.log("Waiting for deployment...");
    
    await contract.waitForDeployment();
    const address = await contract.getAddress();
    
    console.log("✅ SUCCESS! Contract deployed at:", address);
    
    // Save deployment info
    const deploymentInfo = {
      contractAddress: address,
      network: "passetHub",
      chainId: "420420422",
      deployer: deployer.address,
      recipient: recipient,
      timestamp: new Date().toISOString(),
      transactionHash: contract.deploymentTransaction().hash
    };
    
    const fs = require('fs');
    fs.writeFileSync('deployment-info.json', JSON.stringify(deploymentInfo, null, 2));
    console.log("Deployment info saved to deployment-info.json");
    
    return address;
    
  } catch (error) {
    console.error("Deployment failed:", error);
    throw error;
  }
}

main()
  .then((address) => {
    console.log("\n=== DEPLOYMENT COMPLETE ===");
    console.log("Contract Address:", address);
    console.log("Block Explorer:", `https://blockscout-passet-hub.parity-testnet.parity.io/address/${address}`);
  })
  .catch((error) => {
    console.error("Fatal error:", error);
    process.exit(1);
  });