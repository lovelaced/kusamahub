const { ethers } = require("hardhat");

async function main() {
  console.log("=== TEST CONTRACT DEPLOYMENT ===");
  
  const [deployer] = await ethers.getSigners();
  console.log("Deployer:", deployer.address);
  
  const TestContract = await ethers.getContractFactory("TestContract");
  
  try {
    console.log("Deploying simple test contract...");
    const contract = await TestContract.deploy();
    
    console.log("Transaction hash:", contract.deploymentTransaction().hash);
    await contract.waitForDeployment();
    
    const address = await contract.getAddress();
    console.log("✅ Test contract deployed at:", address);
    
    // Test function call
    const value = await contract.value();
    console.log("Initial value:", value.toString());
    
  } catch (error) {
    console.error("❌ Test deployment failed:", error.message);
    
    // Check error details
    if (error.data) {
      console.log("Error data:", error.data);
    }
    if (error.reason) {
      console.log("Error reason:", error.reason);
    }
  }
}

main();