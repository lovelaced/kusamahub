const { ethers } = require("hardhat");

async function main() {
  console.log("=== WRITING 'N4DRO' ON CANVAS (SIMPLE) ===");
  
  const contractAddress = "0xfC72434Ce268668d0F946bFAcB59F6D8d728eC0E";
  const [deployer] = await ethers.getSigners();
  
  console.log("Contract:", contractAddress);
  console.log("Writer:", deployer.address);
  
  const contract = await ethers.getContractAt("PixelCanvasV2", contractAddress);
  
  // Let's just write a simple "HI" for testing
  // Starting at position 500, 500
  const startX = 500;
  const startY = 500;
  const color = 0xFF0000; // Red
  
  // Simple 3x5 letters
  const letterH = [
    [1,0,1],
    [1,0,1],
    [1,1,1],
    [1,0,1],
    [1,0,1]
  ];
  
  const letterI = [
    [1,1,1],
    [0,1,0],
    [0,1,0],
    [0,1,0],
    [1,1,1]
  ];
  
  console.log("\nWriting 'HI' on canvas...");
  console.log(`Position: (${startX}, ${startY})`);
  console.log(`Color: #${color.toString(16).padStart(6, '0')}`);
  
  let pixelsPlaced = 0;
  let totalCost = 0n;
  
  try {
    // Place letter H
    console.log("\nPlacing letter 'H'...");
    for (let row = 0; row < letterH.length; row++) {
      for (let col = 0; col < letterH[row].length; col++) {
        if (letterH[row][col] === 1) {
          const x = startX + col;
          const y = startY + row;
          const pixelId = await contract.getPixelId(x, y);
          
          console.log(`  Placing pixel at (${x}, ${y})...`);
          const fee = await contract.calculatePixelFee(1);
          
          const tx = await contract.placePixel(pixelId, color, { value: fee });
          await tx.wait();
          
          pixelsPlaced++;
          totalCost += fee;
        }
      }
    }
    
    // Place letter I (with spacing)
    console.log("\nPlacing letter 'I'...");
    const letterIStartX = startX + 5; // 5 pixels spacing
    
    for (let row = 0; row < letterI.length; row++) {
      for (let col = 0; col < letterI[row].length; col++) {
        if (letterI[row][col] === 1) {
          const x = letterIStartX + col;
          const y = startY + row;
          const pixelId = await contract.getPixelId(x, y);
          
          console.log(`  Placing pixel at (${x}, ${y})...`);
          const fee = await contract.calculatePixelFee(1);
          
          const tx = await contract.placePixel(pixelId, color, { value: fee });
          await tx.wait();
          
          pixelsPlaced++;
          totalCost += fee;
        }
      }
    }
    
    console.log("\n✅ 'HI' successfully written on canvas!");
    console.log(`Total pixels placed: ${pixelsPlaced}`);
    console.log(`Total cost: ${ethers.formatEther(totalCost)} PAS`);
    
    // Visual representation
    console.log("\nVisual representation:");
    console.log("H     I");
    console.log("█ █   ███");
    console.log("█ █    █");
    console.log("███    █");
    console.log("█ █    █");
    console.log("█ █   ███");
    
  } catch (error) {
    console.error("❌ Error placing pixels:", error.message);
    throw error;
  }
}

main()
  .then(() => {
    console.log("\n=== SCRIPT COMPLETE ===");
    console.log("Check the canvas at position (500, 500) for the text!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Script failed:", error);
    process.exit(1);
  });