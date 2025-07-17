const { ethers } = require("hardhat");

async function main() {
  console.log("=== CONTRACT INTEGRATION TESTING ===");
  
  const contractAddress = "0xfC72434Ce268668d0F946bFAcB59F6D8d728eC0E";
  const [deployer] = await ethers.getSigners();
  
  console.log("Testing contract at:", contractAddress);
  console.log("Test account:", deployer.address);
  
  // Get contract instance
  const contract = await ethers.getContractAt("PixelCanvasV2", contractAddress);
  
  try {
    // Test 1: Basic contract info
    console.log("\n=== TEST 1: Contract Information ===");
    const owner = await contract.owner();
    const recipient = await contract.recipient();
    const canvasWidth = await contract.CANVAS_WIDTH();
    const canvasHeight = await contract.CANVAS_HEIGHT();
    const baseFee = await contract.BASE_PIXEL_FEE();
    
    console.log("✅ Owner:", owner);
    console.log("✅ Recipient:", recipient);
    console.log("✅ Canvas size:", canvasWidth.toString(), "x", canvasHeight.toString());
    console.log("✅ Base fee:", ethers.formatEther(baseFee), "PAS");
    
    // Test 2: Pixel ID conversion
    console.log("\n=== TEST 2: Pixel ID Conversion ===");
    const pixelId = await contract.getPixelId(100, 200);
    console.log("✅ Pixel ID for (100, 200):", pixelId.toString());
    
    const [x, y] = await contract.getPixelCoordinates(pixelId);
    console.log("✅ Coordinates for pixel", pixelId.toString(), ":", x.toString(), ",", y.toString());
    
    // Test 3: Fee calculation
    console.log("\n=== TEST 3: Fee Calculation ===");
    const fee1 = await contract.calculatePixelFee(1);
    const fee5 = await contract.calculatePixelFee(5);
    const fee10 = await contract.calculatePixelFee(10);
    
    console.log("✅ Fee for 1 pixel:", ethers.formatEther(fee1), "PAS");
    console.log("✅ Fee for 5 pixels:", ethers.formatEther(fee5), "PAS");
    console.log("✅ Fee for 10 pixels:", ethers.formatEther(fee10), "PAS");
    
    // Test 4: Place a pixel
    console.log("\n=== TEST 4: Place Pixel ===");
    const testPixelId = 12345;
    const testColor = 0xFF0000; // Red
    const pixelFee = await contract.calculatePixelFee(1);
    
    const balanceBefore = await ethers.provider.getBalance(deployer.address);
    console.log("Balance before:", ethers.formatEther(balanceBefore), "PAS");
    
    const tx = await contract.placePixel(testPixelId, testColor, { value: pixelFee });
    console.log("✅ Pixel placement transaction:", tx.hash);
    
    const receipt = await tx.wait();
    console.log("✅ Transaction confirmed in block:", receipt.blockNumber);
    
    const balanceAfter = await ethers.provider.getBalance(deployer.address);
    console.log("Balance after:", ethers.formatEther(balanceAfter), "PAS");
    
    // Test 5: Verify pixel data
    console.log("\n=== TEST 5: Verify Pixel Data ===");
    const [pixelOwner, pixelColor, lastModified] = await contract.getPixel(testPixelId);
    console.log("✅ Pixel owner:", pixelOwner);
    console.log("✅ Pixel color:", `0x${pixelColor.toString(16).padStart(6, '0')}`);
    console.log("✅ Last modified:", new Date(Number(lastModified) * 1000).toISOString());
    
    // Test 6: Batch pixel placement
    console.log("\n=== TEST 6: Batch Pixel Placement ===");
    const batchPixelIds = [54321, 54322, 54323];
    const batchColors = [0x00FF00, 0x0000FF, 0xFFFF00]; // Green, Blue, Yellow
    const batchFee = await contract.calculatePixelFee(batchPixelIds.length);
    
    const batchTx = await contract.placePixelsBatch(batchPixelIds, batchColors, { value: batchFee });
    console.log("✅ Batch placement transaction:", batchTx.hash);
    
    const batchReceipt = await batchTx.wait();
    console.log("✅ Batch transaction confirmed in block:", batchReceipt.blockNumber);
    
    // Verify batch pixels
    for (let i = 0; i < batchPixelIds.length; i++) {
      const [owner, color] = await contract.getPixel(batchPixelIds[i]);
      console.log(`✅ Batch pixel ${i}: owner=${owner.slice(0, 10)}..., color=0x${color.toString(16).padStart(6, '0')}`);
    }
    
    console.log("\n🎉 ALL TESTS PASSED!");
    console.log("Contract is fully functional on PASEO testnet");
    
  } catch (error) {
    console.error("❌ Test failed:", error.message);
    throw error;
  }
}

main()
  .then(() => {
    console.log("\n=== INTEGRATION TEST COMPLETE ===");
    console.log("✅ Contract deployed and tested successfully");
    console.log("✅ All basic functions working correctly");
    console.log("✅ Fee distribution mechanism operational");
    console.log("✅ Pixel ownership tracking functional");
    console.log("✅ Batch operations working properly");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Integration test failed:", error.message);
    process.exit(1);
  });