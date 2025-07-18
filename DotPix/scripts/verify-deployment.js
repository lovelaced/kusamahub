async function main() {
  console.log("🔍 Verifying PixelCanvas deployment...");
  
  const contractAddress = "0xb4596f85e131F8E022ccB9d463DB3382186d9FC9";
  
  // Get contract instance
  const PixelCanvas = await ethers.getContractFactory("PixelCanvas");
  const contract = PixelCanvas.attach(contractAddress);
  
  console.log("📍 Contract Address:", contractAddress);
  
  try {
    // Test basic contract functions
    const canvasWidth = await contract.CANVAS_WIDTH();
    const canvasHeight = await contract.CANVAS_HEIGHT();
    const totalPixels = await contract.TOTAL_PIXELS();
    const baseFee = await contract.BASE_PIXEL_FEE();
    const owner = await contract.owner();
    const recipient = await contract.recipient();
    
    console.log("✅ Contract verification successful!");
    console.log("📐 Canvas Width:", canvasWidth.toString());
    console.log("📐 Canvas Height:", canvasHeight.toString());
    console.log("🖼️  Total Pixels:", totalPixels.toString());
    console.log("💳 Base Fee:", ethers.formatEther(baseFee), "PAS");
    console.log("👤 Owner:", owner);
    console.log("💰 Recipient:", recipient);
    
    // Test coordinate functions
    const pixelId = await contract.getPixelId(100, 200);
    const [x, y] = await contract.getPixelCoordinates(pixelId);
    console.log("🧮 Coordinate test (100, 200) -> Pixel ID:", pixelId.toString());
    console.log("🧮 Reverse test Pixel ID", pixelId.toString(), "-> (", x.toString(), ",", y.toString(), ")");
    
    // Test fee calculation
    const fee1 = await contract.calculatePixelFee(1);
    const fee5 = await contract.calculatePixelFee(5);
    const fee10 = await contract.calculatePixelFee(10);
    
    console.log("💳 Fee for 1 pixel:", ethers.formatEther(fee1), "PAS");
    console.log("💳 Fee for 5 pixels:", ethers.formatEther(fee5), "PAS");
    console.log("💳 Fee for 10 pixels:", ethers.formatEther(fee10), "PAS");
    
    console.log("\n✅ All verification tests passed!");
    return true;
    
  } catch (error) {
    console.error("❌ Verification failed:", error.message);
    return false;
  }
}

main()
  .then((success) => {
    if (success) {
      console.log("\n🎉 Contract verification completed successfully");
    } else {
      console.log("\n❌ Contract verification failed");
    }
    process.exit(success ? 0 : 1);
  })
  .catch((error) => {
    console.error("❌ Verification script error:", error);
    process.exit(1);
  });