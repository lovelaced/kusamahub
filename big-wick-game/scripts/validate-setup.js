const { ethers } = require("hardhat");
require("dotenv").config();

async function validateSetup() {
  console.log("🔍 Validating BIG WICK Game setup for Paseo TestNet...\n");
  
  let hasErrors = false;
  
  // Check environment variables
  console.log("1. Checking environment variables...");
  if (!process.env.PRIVATE_KEY) {
    console.error("❌ PRIVATE_KEY not found in .env file");
    console.error("   Please add your private key to .env file (without 0x prefix)");
    hasErrors = true;
  } else {
    console.log("✅ PRIVATE_KEY found in .env file");
    
    // Validate private key format
    const privateKey = process.env.PRIVATE_KEY;
    if (privateKey.startsWith('0x')) {
      console.error("❌ PRIVATE_KEY should not include '0x' prefix");
      console.error("   Please remove '0x' from your private key in .env file");
      hasErrors = true;
    } else if (privateKey.length !== 64) {
      console.error("❌ PRIVATE_KEY appears to be invalid length");
      console.error("   Expected 64 characters, got", privateKey.length);
      hasErrors = true;
    } else {
      console.log("✅ PRIVATE_KEY format appears valid");
    }
  }
  
  // Check network configuration
  console.log("\n2. Checking network configuration...");
  try {
    const network = await ethers.provider.getNetwork();
    console.log("✅ Network connection successful");
    console.log("   Network:", network.name || "unknown");
    console.log("   Chain ID:", network.chainId.toString());
    
    // Check if we're on Paseo TestNet
    if (network.chainId.toString() === "420420422") {
      console.log("✅ Connected to Paseo TestNet");
    } else {
      console.log("⚠️  Not connected to Paseo TestNet (Chain ID: 420420422)");
      console.log("   Current chain ID:", network.chainId.toString());
    }
  } catch (error) {
    console.error("❌ Network connection failed:", error.message);
    hasErrors = true;
  }
  
  // Check account and balance
  console.log("\n3. Checking account and balance...");
  try {
    const [signer] = await ethers.getSigners();
    const address = signer.address;
    const balance = await ethers.provider.getBalance(address);
    
    console.log("✅ Account accessible:", address);
    console.log("   Balance:", ethers.formatEther(balance), "PAS");
    
    if (balance === 0n) {
      console.error("❌ Account has no PAS tokens");
      console.error("   Please get tokens from: https://faucet.polkadot.io/?parachain=1111");
      hasErrors = true;
    } else {
      console.log("✅ Account has sufficient balance for deployment");
    }
  } catch (error) {
    console.error("❌ Account access failed:", error.message);
    hasErrors = true;
  }
  
  // Check contract compilation
  console.log("\n4. Checking contract compilation...");
  try {
    const BigWickGame = await ethers.getContractFactory("BigWickGame");
    console.log("✅ Contract compilation successful");
    console.log("   Contract ready for deployment");
  } catch (error) {
    console.error("❌ Contract compilation failed:", error.message);
    console.error("   Run 'npm run compile' to compile the contract");
    hasErrors = true;
  }
  
  // Check dependencies
  console.log("\n5. Checking dependencies...");
  try {
    const packageJson = require("../package.json");
    const requiredDeps = [
      "@parity/hardhat-polkadot",
      "@nomicfoundation/hardhat-toolbox",
      "solc",
      "dotenv"
    ];
    
    let missingDeps = [];
    for (const dep of requiredDeps) {
      if (!packageJson.dependencies?.[dep] && !packageJson.devDependencies?.[dep]) {
        missingDeps.push(dep);
      }
    }
    
    if (missingDeps.length > 0) {
      console.error("❌ Missing dependencies:", missingDeps.join(", "));
      console.error("   Run 'npm install' to install missing dependencies");
      hasErrors = true;
    } else {
      console.log("✅ All required dependencies are installed");
    }
  } catch (error) {
    console.error("❌ Could not check dependencies:", error.message);
    hasErrors = true;
  }
  
  // Final summary
  console.log("\n" + "=".repeat(60));
  if (hasErrors) {
    console.error("❌ Setup validation failed");
    console.error("   Please fix the issues above before deploying");
    console.log("\n💡 Quick fixes:");
    console.log("   - Add private key to .env file");
    console.log("   - Get PAS tokens from faucet");
    console.log("   - Run 'npm install' if dependencies are missing");
    console.log("   - Run 'npm run compile' to compile contracts");
    process.exit(1);
  } else {
    console.log("✅ All checks passed! Ready for deployment");
    console.log("\n🚀 You can now deploy with:");
    console.log("   npm run deploy:paseo");
    console.log("\n📋 For detailed instructions, see DEPLOYMENT.md");
  }
}

// Only run validation if this script is executed directly
if (require.main === module) {
  validateSetup().catch((error) => {
    console.error("❌ Validation failed:", error);
    process.exit(1);
  });
}

module.exports = { validateSetup };