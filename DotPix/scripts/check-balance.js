const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  
  console.log("=== PASEO DEPLOYMENT VERIFICATION ===");
  console.log("Network:", hre.network.name);
  console.log("Deployer Address:", deployer.address);
  
  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("Account Balance:", ethers.formatEther(balance), "PAS");
  
  const network = await ethers.provider.getNetwork();
  console.log("Chain ID:", network.chainId.toString());
  console.log("Chain Name:", network.name);
  
  // Check if balance is sufficient for deployment
  const minBalance = ethers.parseEther("0.01"); // 0.01 PAS minimum
  if (balance < minBalance) {
    console.error("❌ Insufficient balance for deployment!");
    console.error("Please get PAS tokens from: https://faucet.polkadot.io/?parachain=1111");
    process.exit(1);
  }
  
  console.log("✅ Account ready for deployment");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Verification failed:", error);
    process.exit(1);
  });